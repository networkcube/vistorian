/// <reference path="../../core/networkcube.d.ts"/>
/// <reference path="../widgets/widgets.d.ts" />


// DATA
var dgraph: networkcube.DynamicGraph = networkcube.getDynamicGraph();
networkcube.setDefaultEventListener(updateEventHandler);
networkcube.addEventListener('timeRange', timeRangeHandler);


var nodes = dgraph.nodes().toArray();
var links = dgraph.links().toArray();
var times = dgraph.times().toArray();
var linkTypes = dgraph.links().linkTypes();

// VIS PARAMETERS
var WIDTH = window.innerWidth;
var TABLE_LEFT = 200
var ROW_HEIGHT = 11;
var COL_WIDTH = 10;
var LINK_OPACITY=.1
var TABLE_TOP = 100;
var LINK_ANCHOR_RADIUS = 2;
var NODE_LABEL_COLOR = '#777'
var NODE_LABEL_WEIGHT = 100
var LABEL_ORDER
var CELL_WIDTH_MAX = 30
var CELL_WIDTH_MIN = 1
var cell_width = 13



// VIS ELEMENTS
var svg;
var nodeYPosFunction = d3.scale.linear();
var timeXFunction = d3.scale.linear();
var linkTypeOffset = d3.scale.linear().range([0,ROW_HEIGHT]);
var bar;
var nodeLabels
var row


// STATES
var egoNode = -1 // Empty by default
var isShownNoneEgoLinks = true;
var yearOffset = 0
var timeStartId = times[0].id();
var timeEndId = times[times.length-1].id();


// VIS FUNCTIONS
var lineFunction = d3.svg.line()
    .x((d)=>{ return d.x; })
    .y((d)=>{ return d.y; })
    .interpolate("basis");


// UI SETUP

var defs;

$('#menu').append('\
            <select id="labelOrdering" onchange="reorderLabels()">\
                <option value="data">As appear in table</option>\
                <option value="alphanumerical">Alphanumerical</option>\
                <option value="degree">Number of connections</option>\
            </select>\
            '); 

var timeSlider:TimeSlider = new TimeSlider(dgraph, WIDTH-100-TABLE_LEFT);

this.visualize();

function visualize(){
    
    // SET UP GLOBAL PARAMETERS
    nodeYPosFunction.domain([0,nodes.length-1])
        .range([ROW_HEIGHT+TABLE_TOP, ROW_HEIGHT*nodes.length + 150])
    timeXFunction.domain([0,times.length-1])
        .range([TABLE_LEFT+cell_width, times.length*cell_width])
    linkTypeOffset.domain([-1,linkTypes.length]);
  
    
    // create svg
    svg = d3.select('#visDiv').append('svg')
        .attr('width', WIDTH)
        .attr('height', ROW_HEIGHT*nodes.length + 200)
    timeSlider.appendTo(svg, TABLE_LEFT);

    
    defs = svg.append('svg:defs')
    defs.append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 12)
        .attr('markerHeight', 12)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-3L10,0L0,3L2,0')
        .attr('stroke-width', '0px')
        .attr('fill', '#000')
        .attr('transform', 'translate(-5, 0)')
        
    // DRAW NODESs
    row = svg.selectAll('.row')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'row')
        .on('mouseover', (d, i) => {
            console.log('mouseover')
            networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
        })
        .on('mouseout', (d, i) => {
            networkcube.highlight('reset');
        })
        .on('click', (d, i) => {
            var selections = d.getSelections();
            var currentSelection = this.dgraph.getCurrentSelection();
            for (var j = 0; j < selections.length; j++) {
                if (selections[j] == currentSelection) {
                    networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [d] });
                    return;
                }
            }
            networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
        }); 
    row.append('rect')
        .attr('x', TABLE_LEFT+5)
        .attr('y', (d)=>nodeYPosFunction(nodes.indexOf(d)))
        .attr('width', WIDTH-TABLE_LEFT)
        .attr('height', ROW_HEIGHT+2)
        .attr('id', (d,i)=>'bar-'+i)
        .attr('class', (d,i)=>'rowBar rowBar-' + (i%2==0?'even':'odd'))
        
    row.append('text')
        .attr('x', TABLE_LEFT)
        .attr('y', (d)=>nodeYPosFunction(nodes.indexOf(d)) + ROW_HEIGHT)
        .text((d)=>{return d.label() + '('+d.neighbors().size()+')';})
        .attr('class', 'nodeLabel')
        .style('font-weight', NODE_LABEL_WEIGHT)
        .style('fill', NODE_LABEL_COLOR)



    // TIME LABELS
    svg.selectAll('.timeLabel')
        .data(times)
        .enter()
        .append('text')
            .attr('transform', (d,i)=>{
                return 'translate('+this.timeXFunction(i)+', '+(TABLE_TOP) +')rotate(-90)';
            })
            .text((d:networkcube.Time)=>{
                return formatAtGranularity(d.time(), 7) + '-' + formatAtGranularity(d.time(), 6);
            })
            .attr('class', 'timeLabel')
            .style('font-weight', NODE_LABEL_WEIGHT)
            .style('fill', NODE_LABEL_COLOR)
            .on('mouseover', (d, i) => {
                networkcube.highlight('set', <networkcube.ElementCompound>{ times: [d] });
            })
            .on('mouseout', (d, i) => {
                networkcube.highlight('reset');
            })
            .on('click', (d, i) => {
                var selections = d.getSelections();
                var currentSelection = this.dgraph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', <networkcube.ElementCompound>{ times: [d] });
                        return;
                    }
                }
                networkcube.selection('add', <networkcube.ElementCompound>{ times: [d] });
            });  
        
        
     // VISUALIZE LINKS
     var link = svg.selectAll('.link')
        .data(links).enter()
        .append('g')
        .attr('transform', (d:networkcube.Link)=>{
//            return 'translate('+(this.timeXFunction(d.times().toArray()[0].id())+ linkTypeOffset(this.linkTypes.indexOf(d.linkType()))) + ',0)'
            return 'translate('+this.timeXFunction(d.times().toArray()[0].id()) + ','+linkTypeOffset(this.linkTypes.indexOf(d.linkType()))+ ')';
        })
        .attr('class', 'link')    
        .on('mouseover', (d, i) => {
            console.log('mouseover')
            networkcube.highlight('set', <networkcube.ElementCompound>{ links: [d] });
            // networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d.source, d.target] });
        })
        .on('mouseout', (d, i) => {
            networkcube.highlight('reset');
        })
        .on('click', (d, i) => {
            var selections = d.getSelections();
            var currentSelection = this.dgraph.getCurrentSelection();
            for (var j = 0; j < selections.length; j++) {
                if (selections[j] == currentSelection) {
                    networkcube.selection('remove', <networkcube.ElementCompound>{ links: [d] });
                    return;
                }
            }
            networkcube.selection('add', <networkcube.ElementCompound>{ links: [d] });
        });        
       
     
     // start anchor
     link.append('circle')
        .attr('cx', 0)       
        .attr('cy', (d)=>this.nodeYPosFunction(this.nodes.indexOf(d.source)))
        .attr('r', LINK_ANCHOR_RADIUS)      
        .attr('class', 'linkAnchor startAnchor')      
        .style('fill', (d)=> d.getSelections()[0].color )      
    // end anchor
    link.append('circle')
        .attr('cx', 0)       
        .attr('cy', (d)=>this.nodeYPosFunction(this.nodes.indexOf(d.target)))
        .attr('r', LINK_ANCHOR_RADIUS)      
        .attr('class', 'linkAnchor endAnchor')      
        .style('fill', (d)=> d.getSelections()[0].color )      
            
     link.append('path')   
         .attr('d', (d)=>makeArcPath(d))
        .attr("class", "arc")
        .style('marker-end', (d:networkcube.Link)=>'url('+d.directed()?'#end-arrow':'none'+')')
        .style('stroke-width',1)
        .style('stroke',(d:networkcube.Link)=>{
            return d.getSelections()[0].color})
        
        
        
}


// UPDATES

function timeRangeHandler(m:networkcube.TimeRangeMessage){    // start:networkcube.Time, end:networkcube.Time, single:networkcube.Time){
    
    var start = dgraph.time(m.startId)
    var end = dgraph.time(m.endId)
    var single = dgraph.time(m.singleId)

    timeSlider.set(start, end);

    // update timeXFunction
    cell_width = Math.min( CELL_WIDTH_MAX, Math.max(CELL_WIDTH_MIN, (WIDTH - TABLE_LEFT)/(end.id() - start.id())));
    console.log('cell_width:', cell_width);
    timeXFunction
        .domain([start.id(), end.id()])
        .range([TABLE_LEFT+cell_width, times.length*cell_width])

    timeStartId = start.id();
    timeEndId = end.id();
    
    // update link positions
    d3.selectAll('.link')
        .style('visibility', (d:networkcube.Link)=>
        d.times().toArray()[0].id() >= timeStartId 
        && d.times().toArray()[0].id() < timeEndId
        ?'visible':'hidden')
        .attr('transform', (d)=>
            'translate('+timeXFunction(d.times().toArray()[0].id()) + ','+linkTypeOffset(linkTypes.indexOf(d.linkType()))+ ')'
        )

    // update time positions
    d3.selectAll('.timeLabel')
        .style('visibility', (d:networkcube.Link)=>
            d.id() >= timeStartId 
            && d.id() < timeEndId
            ?'visible':'hidden')
        .attr('transform', (d)=>
           'translate('+timeXFunction(d.id())+', '+(TABLE_TOP) +')rotate(-90)'
        )


}

function updateEventHandler(m:networkcube.Message){

    if(m.type == networkcube.MESSAGE_SELECTION_FILTER){
        var s = dgraph.getSelection((<networkcube.FilterSelectionMessage>m).selectionId);
        nodes = dgraph.nodes().filter((n:networkcube.Node)=>!n.inSelection(s)).toArray();
        nodeYPosFunction.domain([0, nodes.length]);    
        updateFilter();
    }

    updateLinks();
    updateNodes();
    // updateTimes();
}

function updateLinks(){

    d3.selectAll('.arc')
        .style('stroke-width', (d)=>
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?2:1)
        .style('opacity', (d:networkcube.Link)=>
            !d.isVisible()?0:
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?1:.5)
        .style('stroke', (d:networkcube.Link)=>d.getSelections()[0].showColor?d.getSelections()[0].color:'#999')

    d3.selectAll('.linkAnchor')
        .attr('r', (d)=>
            d.isHighlighted() 
            || d.source.isHighlighted()  
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?LINK_ANCHOR_RADIUS+1:LINK_ANCHOR_RADIUS)
        .style('opacity', (d:networkcube.Link)=>
            !d.isVisible()?0:
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?1:.5)
        .style('fill', (d:networkcube.Link)=>d.getSelections()[0].showColor?d.getSelections()[0].color:'#999')
}

function updateFilter(){
    
    d3.selectAll('.nodeLabel')
        .data(nodes)
        .exit()
        .transition()
            .style('opacity', (n)=>0)
    d3.selectAll('.rowBar')
        .data(nodes)
        .exit()
        .transition()
            .style('opacity', (n)=>0)
            
            
    d3.selectAll('.arc')
        .data(links)
        .filter((l)=>nodes.indexOf(l.source) == -1 || nodes.indexOf(l.target) == -1 )
        .transition()
            .style('opacity', (n)=>0)
    d3.selectAll('.arc')
        .data(links)
        .filter((l)=>nodes.indexOf(l.source) > -1 && nodes.indexOf(l.target) > -1 )
        .transition()
            .style('opacity', (n)=>LINK_OPACITY)
                
    d3.selectAll('.linkAnchor')
        .data(links)
        .filter((l)=>nodes.indexOf(l.source) == -1 || nodes.indexOf(l.target) == -1 )
        .transition()
            .style('opacity', (n)=>0)

    d3.selectAll('.linkAnchor')
        .data(links)
        .filter((l)=>nodes.indexOf(l.source) > -1 && nodes.indexOf(l.target) > -1 )
        .transition()
            .style('opacity', (n)=>1)
    
}

function updateNodes(){
    d3.selectAll('.nodeLabel')
        .style('font-weight', (d)=>d.isHighlighted() || d.links().highlighted().size()>0 || d.neighbors().highlighted().size()>0 ?900:NODE_LABEL_WEIGHT)
        .style('text-decoration', (d)=>d.isHighlighted()?'underline':'none')
        .style('fill', (d:networkcube.Node)=>{
            var color = undefined;
            if (d.isSelected()) {
                color = networkcube.getPriorityColor(d);
            }
            if (!color)
                color = NODE_LABEL_COLOR;
            return color;
        })

         
    d3.selectAll('.rowBar')
        .style('stroke', (d,i)=>nodes[i].isHighlighted() ?'#777':'none')
}

function updateOrdering(){
    d3.selectAll('.nodeLabel')
        .transition().duration(1000)
        .attr('y', (d)=> nodeYPosFunction(nodes.indexOf(d)) + ROW_HEIGHT)

    d3.selectAll('.arc')
        .attr('d', (d)=>makeArcPath(d))

    d3.selectAll('.startAnchor')
        .attr('cy', (d)=>this.nodeYPosFunction(this.nodes.indexOf(d.source)))
    d3.selectAll('.endAnchor')
        .attr('cy', (d)=>this.nodeYPosFunction(this.nodes.indexOf(d.target)))
}



function updateTimes(){

    d3.selectAll('.timeLabel')
        .style('font-weight', (d)=>
            d.isHighlighted() 
            || d.links().highlighted().size() 
            || d.links().sources().highlighted().size() > 0  
            || d.links().targets().highlighted().size() > 0  
            ?900:NODE_LABEL_WEIGHT)
        .style('text-decoration', (d)=>
            d.isHighlighted()
            || d.links().highlighted().size() > 0 
            ?'underline':'none')
        .style('fill', (d)=>d.isHighlighted()
            || d.links().highlighted().size() > 0 
            ?'#000':NODE_LABEL_COLOR)
}










/// HELPER

function reorderLabels(){
        var menu = document.getElementById('labelOrdering');
        LABEL_ORDER = menu.options[menu.selectedIndex].value
        console.log('Node order:', LABEL_ORDER)
        if(LABEL_ORDER == 'alphanumerical'){
            nodes.sort(compareFunc);
        }else if(LABEL_ORDER == 'data'){
            nodes = dgraph.nodes().toArray();
        }else if(LABEL_ORDER == 'degree'){
            nodes.sort(function(a,b){
                return b.neighbors().length - a.neighbors().length})
        }else if(LABEL_ORDER == 'similarity'){
            // nodes = dgraph.nodes().toArray();
            var config: networkcube.OrderingConfiguration = new networkcube.OrderingConfiguration();
            config.start = times[0];
            config.end = times[times.length-1];
            config.nodes = dgraph.nodes().visible().toArray();
            config.links = dgraph.links().presentIn(config.start, config.end).visible().toArray();
            var nodeOrder = networkcube.orderNodes(dgraph, config);
            nodes = []
            for(var i=0 ; i<nodeOrder.length ; i++){
                nodes.push(dgraph.node(nodeOrder[i]));
            }
        }
        updateOrdering()
}

function compareFunc(a,b) {
    return a.label() < b.label()?-1:1;
}

function formatAtGranularity(time, granualarity: number) {
        switch (granualarity) {
            case 0: return time.millisecond();
            case 1: return time.second();
            case 2: return time.minute();
            case 3: return time.hour();
            case 4: return time.day();
            case 5: return time.week();
            case 6: return time.month() + 1;
            case 7: return time.year();
        }
    }
    
function makeArcPath(link:networkcube.Link){
    var x = 100;
    var y1 = this.nodeYPosFunction(this.nodes.indexOf(link.source));
    var y2 = this.nodeYPosFunction(this.nodes.indexOf(link.target));
    return lineFunction([
        { "x": 0,   "y": y1},
        { "x": 0+Math.abs(y1-y2)/5 + linkTypeOffset(this.linkTypes.indexOf(link.linkType())),   "y": y1 + (y2-y1)/10},
        { "x": 0+Math.abs(y1-y2)/5 + linkTypeOffset(this.linkTypes.indexOf(link.linkType())),   "y": y2 - (y2-y1)/10},
        { "x": 0,   "y": y2},
    ])
}


// function showEgoNetwork(d, i, visualObject){
//     egoNode = i;
//     if(i < 0 || i == currentNodeOrder.length -1){
//         egoNode = -1
//     }else{
//         egoNode = i;
//         $('#egoDisplay').html('Ego Network for ' + nodeLabels[egoNode])
//     }
//     visualizeCells()

//     d3.selectAll('.personlabel')
//         .attr('class', 'personlabel')

//     for(var i=0 ; i<nodeLabels[0].length ; i++){
//         if(nodeLabels[0][i].__data__ == egoNode){
//             d3.select(nodeLabels[0][i])
//                 .attr('class', 'personlabel egolabel')
//         }
//     }
// }

// d3.select('body').on("keydown", keyDown)






















// var year;
// var other;
// var type
// var neighbors = []

// // DRAW currentNodeOrder



// var p1, p2
// for(var i=0 ; i<linkTable.length ; i++)
//     {
//         linkTable[i][DATE] = moment(linkTable[i][DATE]).year();
//         year = linkTable[i][DATE]
//         // console.log('year', year)
//         minYear = Math.min(minYear, year)
//         maxYear = Math.max(maxYear, year)

//         p1 = linkTable[i][NAME1]
//         p2 = linkTable[i][NAME2]

//         if(p1.length < 1
//         || p2.length < 1)
//             continue

//         if(currentNodeOrder.indexOf(p1) == -1){
//             currentNodeOrder.push(p1)
//             neighbors[p1] = []
//         }

//         if(currentNodeOrder.indexOf(p2) == -1){
//             currentNodeOrder.push(p2)
//             neighbors[p2] = []
//         }

//         neighbors[p1].push(p2)
//         neighbors[p2].push(p1)

//         linkTable[i][TYPE] = linkTable[i][TYPE];
//         type = linkTable[i][TYPE];
//         if(type.length == 0){
//             linkTable[i][TYPE] = 'none'
//             type = 'none'
//         }
//         if(types.indexOf(type) == -1)
//             types.push(type)
//     }

//     // obtain node labels
//     var nodeLabels = [];
//     for(var i=0 ; i<nodeTable.length ; i++){
//         nodeLabels.push(nodeTable[i][data.nodeSchema.label])
//     }

//     dataOrder = currentNodeOrder.slice();
//     WIDTH = COL_WIDTH * (maxYear - minYear)
//     var timeXFunction = d3.scale.linear().range([TABLE_LEFT, WIDTH+TABLE_LEFT-30])


//     nodeYPosFunction.range([TABLE_TOP, ROW_HEIGHT * currentNodeOrder.length])
//     nodeYPosFunction.domain([0, currentNodeOrder.length-1])

//     var TABLE_HEIGTH = currentNodeOrder.length * ROW_HEIGHT + 100;
//       // PREPARE VISU
//     var svg = d3.select('#svgDiv')
//         .append('svg')
//         .attr('width', WIDTH + TABLE_LEFT + 300)
//         .attr('height', TABLE_HEIGTH)

//     var defs = svg.append('svg:defs')
//     defs.append('svg:marker')
//         .attr('id', 'end-arrow')
//         .attr('viewBox', '0 -5 10 10')
//         .attr('refX', 6)
//         .attr('markerWidth', 10)
//         .attr('markerHeight', 10)
//         .attr('orient', 'auto')
//         .append('svg:path')
//         .attr('d', 'M0,-3L10,0L0,3L2,0')
//         .attr('stroke-width', '0px')
//         .attr('fill', '#000')
//         // .attr('opacity', .5)
//         .attr('transform', 'translate(-5, 0)')

//     var currentHover
//     function visualizePersonLabels()
//     {
//         personlabels = svg.selectAll('.personlabel')
//             .data(currentNodeOrder).enter()
//             .append('text')
//             .attr('x', TABLE_LEFT - 10)
//             .attr('y', function(d,i){return nodeYPosFunction(i) + ROW_HEIGHT -2})
//             .text(function(d,i){return nodeLabels[d] + ' ('+ neighbors[d].length +')'})
//             .attr('class', 'personlabel')
//             .style('text-anchor', 'end')
//             .on('mouseover', function(d,i){
//                 highlightNode(d);
//             })
//             .on('click', function(d,i){
//                 if(egoNode==d)
//                     showEgoNetwork(null,-1);
//                 else
//                     showEgoNetwork(d,i);
//             })

//         svg.selectAll('.personBar')
//             .data(currentNodeOrder.filter(function(d,i){
//                 return (i % 2 == 0)})).enter()
//             .append('rect')
//                 .attr('x', TABLE_LEFT)
//                 .attr('y', function(d,i){return nodeYPosFunction(i*2)})
//                 .attr('height', ROW_HEIGHT)
//                 .attr('width', WIDTH)
//                 .attr('class', 'personBar')
//     }
//     visualizePersonLabels()
//     var visibileRelationTypes = types.slice(0);



//     // HOVER BAR
//     bar = svg.append('g')
//         // .attr('x', TABLE_LEFT)
//         // .attr('y', TABLE_TOP)
//         .attr('transform', 'translate('+TABLE_LEFT+', '+TABLE_TOP+')')

//     bar.append('rect')
//         .attr('height', ROW_HEIGHT)
//         .attr('width', WIDTH)
//         .style('fill', 'none')
//         .style('stroke', '#000')
//         .style('stroke-width', '.5');


//     W_CELL = WIDTH / (maxYear - minYear +1)
//     timeXFunction.domain([minYear+yearOffset, maxYear+yearOffset])

//     var H_CELL
//     function visualizeCells(){

//         d3.selectAll('.cell').remove()

//         // CREATE EGO-CELLS (connections related to ego)
//         H_CELL = ROW_HEIGHT/types.length;
//         var cells = svg.selectAll('cell')
//             .data(linkTable.filter(function(row,i){
//                 return row[NAME1] == egoNode
//                     || row[NAME2] == egoNode
//                 }))

//         cells.enter()
//             .append('rect').attr('class','cell')
//                 .attr('x', function(row,i){
//                     return timeXFunction(row[DATE])
//                 })
//                 .attr('y', function(row,i){
//                     if(row[NAME1]== egoNode)
//                         other = row[NAME2]
//                     else
//                         other = row[NAME1]
//                     return nodeYPosFunction(currentNodeOrder.indexOf(other)) + types.indexOf(row[TYPE]) * H_CELL
//                 })
//                 .attr('width', W_CELL)
//                 .attr('height', H_CELL)
//                 .style('fill', function(row,i){return linkColors(types.indexOf(row[TYPE]))})
//                 .style('opacity', function(d){
//                     return d[DATE] >= minYear+yearOffset? 1:0
//                 })
//                 .attr('class', 'cell')
//                 .on('mouseover', function(row, i){
//                     var other
//                     if(row[NAME1] == egoNode){
//                         other = row[NAME2]
//                     }else{
//                         other = row[NAME1]
//                     }

//                     bar.attr('transform', 'translate('+TABLE_LEFT+','+nodeYPosFunction(currentNodeOrder.indexOf(other)) + ')')
//                         .style('opacity', 1)

//                 })

//         cells.exit().remove()

//         // NON-EGO connections
//         // TODO
//         var relG
//         d3.selectAll('.nonEgoRelation').remove()
//         if(isShownNoneEgoLinks){
//             for(var i=0 ; i < linkTable.length ; i++){
//                 if(linkTable[i][NAME1] == egoNode
//                 || linkTable[i][NAME2] == egoNode)
//                     continue;

//                 var t = types.indexOf(linkTable[i][TYPE]);
//                 var x = timeXFunction(linkTable[i][DATE]) + W_CELL - 2
//                 var y1 = nodeYPosFunction(currentNodeOrder.indexOf(linkTable[i][NAME1])) + t*H_CELL
//                 var y2 = nodeYPosFunction(currentNodeOrder.indexOf(linkTable[i][NAME2])) + t*H_CELL

//                 relG = svg.append('g')
//                     .datum(linkTable[i])
//                     .attr('class', 'nonEgoRelation')
//                     .attr('transform', 'translate('+x+',0)')
//                     .style('opacity', function(d){
//                         return d[DATE] >= minYear+yearOffset? 1:0
//                     })

//                 var lineData = [
//                     { "x": 0,   "y": y1},
//                     { "x": 0+Math.abs(y1-y2)/5,   "y": y1 + (y2-y1)/10},
//                     { "x": 0+Math.abs(y1-y2)/5,   "y": y2 - (y2-y1)/10},
//                     { "x": 0,   "y": y2},
//                 ]

//                 var lineFunction = d3.svg.line()
//                     .x(function(d) { return d.x; })
//                     .y(function(d) { return d.y; })
//                     .interpolate("basis");

//                 relG.append('circle')
//                     .datum(linkTable[i])
//                     .attr('cx', 0)
//                     .attr('cy', y1)
//                     .attr('r', 2)
//                     .style('fill', linkColors(t))
//                     // .attr('class', 'nonEgoRelation')
//                     .style('opacity', function(d,i){
//                         return visibileRelationTypes.indexOf(d[TYPE])>-1? 1 : 0
//                     })


//                 relG.append('circle')
//                     .datum(linkTable[i])
//                     .attr('cx', 0)
//                     .attr('cy', y2)
//                     .attr('r', 2)
//                     // .attr('class', 'nonEgoRelation')
//                     .style('fill', linkColors(t))
//                     .style('opacity', function(d,i){
//                         return visibileRelationTypes.indexOf(d[TYPE])>-1?
//                             1 : 0
//                     })


//                 relG.append("path")
//                     .datum(linkTable[i])
//                     .attr("d", lineFunction(lineData))
//                     .attr("class", "arc")
//                     .style('stroke', linkColors(t))
//                     .style('opacity', function(d,i){
//                         return visibileRelationTypes.indexOf(d[TYPE])>-1?
//                             LINK_OPACITY : 0
//                     })

//             }
//         }
//     }

//     // Draw year back/forth
//     // svg.append('path')
//     svg.insert("path", ":first-child")
//         .attr('d', 'M0,-3L-7,0L0,3')
//         .attr('transform', 'translate('+(TABLE_LEFT-40)+', '+(TABLE_TOP-20)+')scale(2.5)')
//         .style('fill', '#777')
//         .on('click', function(){
//             updateYearOffset(-5)
//         })

//     svg.append('path')
//         .attr('d', 'M0,-3L+7,0L0,3')
//         .attr('transform', 'translate('+(TABLE_LEFT-30)+', '+(TABLE_TOP-20)+')scale(2.5)')
//         .style('fill', '#777')
//         .on('click', function(){
//             updateYearOffset(5)
//         })

//     // DRAW YEAR TICKS
//     for(var year=minYear ; year <= maxYear ; year++){

//         svg.append('text')
//             .datum(year)
//             .attr('x', timeXFunction(year)+2)
//             .attr('y', TABLE_TOP + COL_WIDTH-3)
//             .text(year)
//             .attr('class', 'timelabel top')
//             .attr('transform', 'rotate(-90,'+timeXFunction(year)+','+(TABLE_TOP)+')')


//         svg.append('text')
//             .datum(year)
//             .attr('x', timeXFunction(year))
//             .attr('y', nodeYPosFunction(currentNodeOrder.length) + COL_WIDTH)
//             .text(year)
//             .attr('class', 'timelabel bottom')
//             .style('text-anchor', 'end')
//             .attr('transform', 'rotate(-90,'+timeXFunction(year)+','+(nodeYPosFunction(currentNodeOrder.length) + 3)+')')


//         // bar.append('text')
//         //     .attr('x', timeXFunction(year) - TABLE_LEFT)
//         //     .attr('y', -5)
//         //     .text(year)
//         //     .attr('class', 'timelabel')

//         svg.append('line')
//             .datum(year)
//             .attr('x1', timeXFunction(year))
//             .attr('x2', timeXFunction(year))
//             .attr('y1', TABLE_TOP)
//             .attr('y2', (currentNodeOrder.length+1) * ROW_HEIGHT)
//             .style('stroke', '#000')
//             .style('opacity', '.1')

//     }
//     visualizeCells();

//     // function setRelationTypeVisibility(relType, b){
//     //     d3.selectAll('.cell')
//     //         .filter(function(d){
//     //             console.log(d)
//     //             return d[TYPE] == relType})
//     //         .style('opacity', function(d){
//     //             return b ?
//     //                 (d[DATE] >= minYear+yearOffset? 1:0)
//     //                     : 0
//     //         })
//     //     d3.selectAll('.nonEgoRelation')
//     //         .filter(function(d){
//     //             return d[TYPE] == relType})
//     //         .style('opacity', function(d){
//     //             return b ?
//     //                 (d[DATE] >= minYear+yearOffset? RELATION_OPACITY : 0)
//     //                     : 0
//     //         })
//     // }

//     function changeNonEgoRelationVisibility(){
//         isShownNoneEgoLinks = !isShownNoneEgoLinks;
//         visualizeCells()
//     }

//     function reorderLabels(){
//         var menu = document.getElementById('labelOrdering');
//         LABEL_ORDER = menu.options[menu.selectedIndex].value
//         console.log('Node order:', LABEL_ORDER)
//         if(LABEL_ORDER == 'alphanumerical'){

//             currentNodeOrder.sort(compareFunc);
//         }else if(LABEL_ORDER == 'data'){
//             currentNodeOrder = dataOrder;
//         }else if(LABEL_ORDER == 'degree'){
//             currentNodeOrder.sort(function(a,b){
//                 return neighbors[b].length - neighbors[a].length})
//         }

//         d3.selectAll('.personlabel')
//             .transition().duration(1000)
//             .attr('y', function(d,i){return nodeYPosFunction(currentNodeOrder.indexOf(d)) + ROW_HEIGHT -2})

//         visualizeCells()
//     }

//     function compareFunc(a,b) {
//         console.log(nodeLabels[a], nodeLabels[b]);
//         return nodeLabels[a] < nodeLabels[b]?-1:1;
//     }

//     function keyDown(event){
//         d3.event.stopPropagation();
//         var k = d3.event.keyCode;
//         if(k == 40){ // DOWN
//             console.log('DOWN')
//             egoIndex++
//             showEgoNetwork(currentNodeOrder[egoIndex], egoIndex)
//         }else if(k == 38){ // UP
//             egoIndex--
//             showEgoNetwork(currentNodeOrder[egoIndex], egoIndex)
//         }
//     }


//     function updateRelationOpacity(){
//         LINK_OPACITY = parseFloat($('#relOpacity').val())
//         d3.selectAll('.arc')
//             .style('opacity', function(d){
//                 return visibileRelationTypes.indexOf(d[TYPE])>-1?
//                     LINK_OPACITY : 0
//             })
//     }

//     function updateYearOffset(change){
//         yearOffset += change
//         if(yearOffset < 0){
//             yearOffset = 0
//             return
//         }

//         timeXFunction.domain([minYear+yearOffset, maxYear+yearOffset])


//         d3.selectAll('.timelabel')
//             .attr('visibility', function(d){
//                 return d >= minYear+yearOffset? 'inline':'hidden'
//             })

//         d3.selectAll('.timelabel.top')
//             .attr('x', function(d){return timeXFunction(d)+2; })
//             .attr('transform', function(d){
//                 return 'rotate(-90,'+timeXFunction(d)+','+(TABLE_TOP)+')'
//             })
//         d3.selectAll('.timelabel.bottom')
//             .attr('x', function(d){return timeXFunction(d);})
//             .attr('transform', function(d){
//                 return  'rotate(-90,'+timeXFunction(d)+','+(nodeYPosFunction(currentNodeOrder.length) + 3)+')'
//             })

//         d3.selectAll('.line')
//             .style('opacity', function(d){
//                 return d >= minYear+yearOffset? 1:0
//             })

//         d3.selectAll('.cell')
//             .attr('x', function(d){
//                 return timeXFunction(d[DATE])
//             })
//             .style('opacity', function(d){
//                 return d[DATE] >= minYear+yearOffset? 1:0
//             })


//         d3.selectAll('.nonEgoRelation')
//             .style('opacity', function(d){
//                 return d[DATE] >= minYear+yearOffset? 1:0
//             })
//             .attr('transform', function(d){
//                 var x = timeXFunction(d[DATE]) + W_CELL - 2
//                 return 'translate('+x+',0)'
//             })
//     }
    
    
    
//     // EVENT HANDLER
//     function updateEvent(event){
//     }
    
//     function highlightNode(d, highlight){
//         currentHover = d
        
//         // set names
//        personlabels
//             .style('text-decoration', function(d,i){
//                 if(d == currentHover){
//                     return 'underline';
//                 }else{
//                     return 'none';
//                 }
//             })
        
//         // set bar
//         bar.attr('transform', 'translate('+TABLE_LEFT+','+nodeYPosFunction(currentNodeOrder.indexOf(d))+ ')')
//             .style('opacity', 1);
        
//         // set arcs
//         d3.selectAll('.arc')
//             .style('opacity', function(d){
//                 return d[NAME1] == currentHover || d[NAME2] == currentHover ?
//                     1 : (visibileRelationTypes.indexOf(d[TYPE]>-1)?
//                         LINK_OPACITY : 0)
//             })        
//             .style('stroke-width', function(d){
//                 return d[NAME1] == currentHover || d[NAME2] == currentHover ?
//                     1.5 : 1
//             })
//     }

