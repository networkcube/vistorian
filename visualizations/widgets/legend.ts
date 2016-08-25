class Legend{

    data:any[]

    margin={
        left:10,
        top:20
    }

    height:number

    constructor(data:networkcube.LegendElement[], handlerFunction?:Function){
        this.data = data;
    }

    setClickCallBack(handlerFunction){
        this.clickCallBack = handlerFunction;
    }

    legendEntries;

    clickCallBack:Function;

    appendTo(svg:SVGSVGElement){


        this.legendEntries = d3.select'#legendSvg')
            .selectAll('.legend')
            .data(this.data)
            .enter().append('g')
            .attr('transform', (d,i)=>{
                return 'translate('+this.margin.left+','+(this.margin.top+i*20)+')'
            })
        this.height = this.margin.top+this.data.length*20

        $(svg).height(this.height);


        this.legendEntries.append('circle')
            .attr('r', 5)
            .style('opacity', .7)
            .style('fill', function(d){
                if(d.color)
                    return d.color;
                else
                    return '#000';
                })
            .style('stroke', function(d){
                if(d.color)
                    return d.color;
                else
                    return '#000';
                })
            .style('stroke-width', 2)
            .on('click', this.clickCallBack);

        this.legendEntries.append('text')
            .text(function(d){
                return d.name;
            })
            .attr('x', 20)
            .attr('y', 5)
    }



}
