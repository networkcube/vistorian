/// <reference path="../../core/networkcube.d.ts" />


class Timeline{

    TICK_MIN_DIST = 13;
    LABEL_MIN_DIST = 13

    WIDTH:number;
    HEIGHT:number;
    webgl:glutils.WebGL;
    network:networkcube.DynamicGraph;
    x:number;
    y:number;

    position_x;
    position_y;
    label_opacity

    minTimeId;
    maxTimeId;

    timeObjects:Moment[] = [];
    highlightPointer;
    highlightLabel;

    minGran:number;
    maxGran:number;

    granules;

    tickmarks:glutils.WebGLElementQuery;
    timeLabels:glutils.WebGLElementQuery;

    tick_minGran_visible
    tick_minGran_visible_prev = -1;
    
    label_minGran_visible

    constructor(webgl:glutils.WebGL, 
    network:networkcube.DynamicGraph, 
    x:number, y:number, 
    width:number, height:number)
    {
        this.x = x;
        this.y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.webgl = webgl;
        this.network = network;
        this.visualize();
    }

    timeGranularities;
    visualize(){

         
        this.granules = networkcube.GRANULARITY;
        var times = this.network.times().toArray();
        this.minGran = this.network.getMinGranularity();
        // this.maxGran = this.network.getMaxGranularity();
        this.maxGran = this.granules.length-1

        // create non-indexed times
        var unix_start = times[0].unixTime();
        var unix_end = times[times.length-1].unixTime();
        var start = moment(unix_start + '', 'x').startOf(this.granules[this.minGran]);
        var end = moment(unix_end + '', 'x').startOf(this.granules[this.minGran]);
        var numTimes = Math.ceil(Math.abs(start.diff(end, this.granules[this.minGran] + 's')));
        this.maxGran = Math.min(this.maxGran, this.granules.length-1);
        var granularity_levels = ((this.maxGran - this.minGran) +1);
        var granularity_height = this.HEIGHT/ granularity_levels;

        // create all timeObjects (UTC)
        var prev = moment(unix_start+'', 'x');
        var prevprev = moment((unix_start - 86400000)+'', 'x'); // substract one day
        // bb: check why 'substract' is not working:
        // prevprev.substract(1, this.granules[this.minGran] + 's');
        this.timeObjects.push(prev);
        for(var i=1 ; i < numTimes ; i++){
            prev = moment(prev)
            prev.add(1, this.granules[this.minGran] + 's')
            this.timeObjects.push(prev)
        }


        this.timeGranularities = []
        // set granularity for first time step: 

        var granularitySet:boolean
        var y1, y2;
        var to1, to2
        // console.log('this.timeObjects.length', this.timeObjects.length)
        for(var i = 0 ; i < this.timeObjects.length ; i++){
            granularitySet = false
            if(i==0)
                to1 = prevprev;
            else    
                to1 = this.timeObjects[i-1]
            to2 = this.timeObjects[i];
            for(var gran = this.maxGran ; gran >= this.minGran && !granularitySet ; gran--){
                if(gran > 7){
                    y1 = to1.get(this.granules[7])+'';  
                    y2 = to2.get(this.granules[7])+'';

                    // test for millenia
                    if(y1[y1.length-4] != y2[y2.length-4]){
                        this.timeGranularities.push(10);
                        granularitySet = true;  
                    }  
                    // test for centuries
                    else if(y1[y1.length-3] != y2[y2.length-3]){
                        this.timeGranularities.push(9);
                        granularitySet = true;  
                    }    
                    // test for decades
                    else if(y1[y1.length-2] != y2[y2.length-2]){
                        this.timeGranularities.push(8);
                        granularitySet = true;  
                    }    
                }else 
                if(to1.get(this.granules[gran]) != to2.get(this.granules[gran])){
                    this.timeGranularities.push(gran);
                    granularitySet = true;
                }
            }  
        }

        // create mapping functions
        this.position_x = d3.scale.linear()
            .domain([0, this.timeGranularities.length-1])
            .range([this.x+1, this.x + this.WIDTH-1]);
        this.position_y = d3.scale.linear()
            .domain([this.minGran-1, this.maxGran])
            .range([-this.HEIGHT, 0]);
        this.label_opacity = d3.scale.linear()
            .domain([this.minGran-1, this.maxGran])
            .range([.2, 1]);

        // Draw tickmarks
        this.tickmarks = this.webgl.selectAll()
            .data(this.timeGranularities)
            .append('line')
                .attr('x1',(d,i)=> this.position_x(i))
                .attr('x2',(d,i)=> this.position_x(i))
                .attr('y1',(d,i)=> this.position_y(d))
                .attr('y2',(d,i)=> -this.HEIGHT)
                .style('stroke', '#000')
                .style('opacity', .1)


        // create highlight pointer
        this.highlightPointer = this.webgl.selectAll()
            .data([0])
            .append('line')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', -this.HEIGHT)
                .style('stroke', '#f00')
                .style('opacity', 0)
         this.highlightLabel = this.webgl.selectAll()
            .data([0])
            .append('text')
                .attr('x', 0)
                .attr('y', -6)
                .style('fill', '#f00')
                .style('font-size', 10)
                .style('opacity', 0)
       
        
        
        this.updateWithIds(0 ,this.timeObjects.length-1)


        
    }

    update(startUnix, endUnix){
        // search for start:
        var startId, endId;
        for(var i= 0 ; i <this.timeObjects.length ; i++){
            if((this.timeObjects[i].unix()*1000) > startUnix){
                startId = i-1;
                break;
            }
        }
        for(i = startId ; i <this.timeObjects.length ; i++){
            if((this.timeObjects[i].unix()*1000) > endUnix){
                endId = i;
                break;
            }
        }
        if(endId==undefined){
            endId = this.timeObjects.length-1
        }
        // console.log('start, end', startId, endId)
        this.updateWithIds(startId, endId)
    }
    
    updateWithIds(minTimeId, maxTimeId)
    {
        // console.log('updateWithId', minTimeId, maxTimeId)

        this.minTimeId = minTimeId;
        this.maxTimeId = maxTimeId;
        // set range function domain
        this.position_x.domain([minTimeId, maxTimeId]);  

        var ticksFitting = Math.floor(this.WIDTH / this.TICK_MIN_DIST);
        console.log('ticksFitting',ticksFitting)
        var minTime = this.timeObjects[this.minTimeId];
        var maxTime = this.timeObjects[this.maxTimeId];
        var requiredTicks:number
        var t1, t2
        this.tick_minGran_visible = undefined;
        for(var g=this.minGran ; g < this.maxGran && this.tick_minGran_visible == undefined ; g++){
            // calculate how many times of this granularity can fit.
            t1 = moment(minTime).startOf(this.granules[g])
            t2 = moment(maxTime).startOf(this.granules[g])
            if(g <= 7){
                requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[g])
            }else{
                if(g == 8)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7])/10
                if(g == 9)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7])/100
                if(g == 10)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7])/1000
            }  
            
            if(requiredTicks <= ticksFitting){
                this.tick_minGran_visible = g;
            }
        }

        this.label_minGran_visible = this.tick_minGran_visible

        // this.position_y
        //     .domain([this.tick_minGran_visible-1, this.maxGran])
        this.label_opacity
            .domain([this.tick_minGran_visible-1, this.maxGran])

        if(this.tick_minGran_visible_prev != this.tick_minGran_visible){


            console.log('re-create time labels')
            // re-create labels
            if(this.timeLabels != undefined)
                this.timeLabels.removeAll();

            this.timeLabels = this.webgl.selectAll()
                .data(this.timeObjects)
                .filter((d,i)=>{
                    var visible = 
                    this.timeGranularities[i] >= this.tick_minGran_visible;
                    return visible;
                })           
                .append('text')
                    .attr('x',(d,i)=> this.position_x(this.timeObjects.indexOf(d))+8)
                    .attr('y',(d,i)=> -this.HEIGHT+17)
                    .text((d,i) => this.formatTime(this.timeObjects.indexOf(d)))
                    .attr('z', 1)
                    .style('fill', '#000')
                    .attr('rotation', 90)
                    .style('font-size', 10)
                    // .style('opacity', (d,i)=>this.label_opacity(this.timeGranularities[this.timeObjects.indexOf(d)]))
                    .style('opacity', .1)
            
            console.log('time labels created:', this.timeLabels.length )

        }
        this.tick_minGran_visible_prev = this.tick_minGran_visible;

        // console.log('this.minGran_visible',this.granules[this.tick_minGran_visible])
        this.tickmarks
            .style('opacity', (d,i)=>{
                var visible = 
                    i==0 
                    || i >= this.minTimeId 
                    && i <= this.maxTimeId 
                    && this.timeGranularities[i] >= this.tick_minGran_visible 
                    ? this.label_opacity(this.timeGranularities[i]) 
                    : 0;
                return visible;
            })
            .attr('x1',(d,i)=> this.position_x(i))
            .attr('x2',(d,i)=> this.position_x(i))
            // .attr('y1',(d,i)=> { this.position_y(d) })
            // .attr('y2',(d,i)=> -this.HEIGHT)
            .style('stroke-width', (d,i)=>this.label_opacity(this.timeGranularities[i])*4)
            

        // update labels
        this.timeLabels
            .style('opacity', (d,i)=>{
                var globalId = this.timeObjects.indexOf(d)
                var visible = 
                    globalId >= this.minTimeId 
                    && globalId <= this.maxTimeId
                    && this.timeGranularities[globalId] >= this.label_minGran_visible 
                return visible? 1 : 0;
            })           
            .attr('x',(d,i)=> {
                var globalId = this.timeObjects.indexOf(d)
                return this.position_x(globalId) +8;
            })

        // update highlightPointer
        if(this.highlightId != undefined){
            this.highlightPointer
                .attr('x1', this.position_x(this.highlightId))
                .attr('x2', this.position_x(this.highlightId))
                
            this.highlightLabel
                .attr('x', this.position_x(this.highlightId) + 37)
        }      
    }

    formatTime(index):string{
        var t = this.timeObjects[index];
        var g = Math.min(Math.max(this.tick_minGran_visible, this.timeGranularities[index]), 7);

        return networkcube.formatAtGranularity(t, g)
    }

    highlightId:number
    highlight(unixTime?:number){

        if(unixTime==undefined){
            this.highlightPointer
                .style('opacity', 0)
            this.highlightId = undefined;
        }

        for(var i= 0 ; i <this.timeObjects.length ; i++){
            if((this.timeObjects[i].unix()*1000) > unixTime){
                this.highlightId = i-1;
                break;
            }
        }
        if(this.highlightId==undefined){
            this.highlightId = this.timeObjects.length-1
        }
        
        this.highlightPointer
            .attr('x1', this.position_x(this.highlightId))
            .attr('x2', this.position_x(this.highlightId))
            .style('opacity', 1)
            
        this.highlightLabel
            .style('opacity', 1)
            .attr('x', this.position_x(this.highlightId)+37)
            .text(this.timeObjects[this.highlightId].format('DD/MM/YYYY'))      

    }


}