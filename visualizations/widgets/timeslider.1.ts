/// <reference path="./slider.ts"/>
/// <reference path="../../core/networkcube.d.ts" />
/// <reference path="./ui.ts" />


class TimeSlider {


    /** VISUALIZATION  PARAMETERS */

    MARGIN_SLIDER_RIGHT: number = 30;
    MARGIN_SLIDER_LEFT: number = 10;
    TICK_GAP: number = 2;
    TICK_LABEL_GAP: number = 20;
    SLIDER_TOP: number = 25;


    /** GLOBAL VARIABLES */

    dgraph: networkcube.DynamicGraph;
    slider: SmartSlider;
    times: networkcube.Time[];
    sliderWidth: number;
    widgetWidth: number;
    callBack = undefined;
  
    // function that is called when this time slider's time is changed
    propagateButton: networkcube.RadioButton;

    labelStart: D3.Selection;
    labelEnd: D3.Selection;

    tickScale: Function;
    tickHeightFunction: Function;

    constructor(dgraph: networkcube.DynamicGraph, width: number, callBack?:Function) {
        this.dgraph = dgraph;
        this.times = dgraph.times().toArray();
        this.widgetWidth = width;

        this.sliderWidth = width - this.MARGIN_SLIDER_RIGHT + 5 - this.MARGIN_SLIDER_LEFT - 5;
        this.slider = new SmartSlider(this.MARGIN_SLIDER_LEFT, this.SLIDER_TOP, this.sliderWidth, 0, this.times.length - 1, 1);

        if(callBack)
            this.callBack = callBack

        this.tickScale = d3.time.scale.utc()
            .range([this.MARGIN_SLIDER_LEFT, this.MARGIN_SLIDER_LEFT + this.sliderWidth])
            .domain([new Date(dgraph.time(0).unixTime()), new Date(dgraph.times().last().unixTime())]);
        this.tickHeightFunction = d3.scale.linear()
            .range([4, this.SLIDER_TOP - 10])
            .domain([dgraph.gran_min, dgraph.gran_max]);
    }

    appendTo(svg: D3.Selection, x?: number, y?: number) {

        if (!x) x = 0
        if (!y) y = 0

        var g = svg.append('g')
            .attr('transform', 'translate(' + x + ',' + y + ')')

        g.append("g")
            .attr('transform', 'translate(0,' + this.SLIDER_TOP + ')')
            .attr("class", "x axis")
            .call(d3.svg.axis().scale(this.tickScale).orient("top"));

        
        this.labelStart = g.append('text')
            .attr('y', this.SLIDER_TOP + 20)
            .style('opacity', 0)
            .style('font-family', 'Helvetica')
            .style('font-weigth', '100')
            .style('font-size', '8pt')
            .style('text-anchor', 'end')
            .text('')
            .style('user-select', 'none')
            .style('-webkit-user-select', 'none')
            .style('-khtml-user-select', 'none')
            .style('-moz-user-select', 'none')
            .style('-o-user-select', 'none')
            .style('user-select', 'none')

        this.labelEnd = g.append('text')
            .style('opacity', 0)
            .attr('y', this.SLIDER_TOP + 20)
            .style('font-family', 'Helvetica')
            .style('font-weigth', '100')
            .style('font-size', '8pt')
            .style('text-anchor', 'start')
            .text('')
            .style('user-select', 'none')
            .style('-webkit-user-select', 'none')
            .style('-khtml-user-select', 'none')
            .style('-moz-user-select', 'none')
            .style('-o-user-select', 'none')
            .style('user-select', 'none')

        this.slider.appendTo(g);
        this.slider.setDragEndCallBack((min, max, single) => {
            this.updateTime(min, max, single);
        });

        this.propagateButton = new networkcube.RadioButton('#000000', 'Syncronize Time')
        this.propagateButton.appendTo(this.sliderWidth + 15, this.SLIDER_TOP + 8, g)
    }


    drawTickmarks(granularity: number, tickTimes: networkcube.Time[], svg: D3.Selection) {
        var time: networkcube.Time;
        var displayLabelSpacing: number = 1; // display every label
        while (Math.floor(this.sliderWidth / this.TICK_LABEL_GAP) < (tickTimes.length / displayLabelSpacing) && displayLabelSpacing < 100) {
            displayLabelSpacing++;
        }

        for (var i = 0; i < tickTimes.length; i++) {

            if ((i % displayLabelSpacing) == 0) {
                svg.append('text')
                    .attr('x', this.tickScale(tickTimes[i].unixTime()))
                    .attr('y', this.SLIDER_TOP - this.tickHeightFunction(granularity))
                    .text(this.formatAtGranularity(tickTimes[i].time(), granularity))
                    .attr('id', 'timelabel_' + granularity + '_' + i)
                    .attr('class', 'timelabel')
                    .style('opacity', .5)
                    .style('font-family', 'Helvetica')
                    .style('font-weigth', '100')
                    .style('font-size', '7pt');

                // console.log((granularity - this.dgraph.gran_min))
                // console.log('->',((this.dgraph.gran_max - this.dgraph.gran_min))/((granularity - this.dgraph.gran_min)+1));
                svg.append('line')
                    .attr('x1', this.tickScale(tickTimes[i].unixTime()))
                    .attr('x2', this.tickScale(tickTimes[i].unixTime()))
                    .attr('y1', this.SLIDER_TOP)
                    .attr('y2', this.SLIDER_TOP - this.tickHeightFunction(granularity))
                    .style('stroke', '#bbb');
                // .style('opacity', 1.5 -((this.dgraph.gran_max - this.dgraph.gran_min))/((granularity - this.dgraph.gran_min)+1))
            }
        }
    }

    formatAtGranularity(time, granualarity: number) {
        switch (granualarity) {
            case 0: return time.millisecond();
            case 1: return time.second();
            case 2: return time.minute();
            case 3: return time.hour();
            case 4: return time.day();
            case 5: return time.week();
            case 6: return time.month() + 1;
            default: return time.year();
        }
    }

    formatForGranularities(time, gran_min: number, gran_max: number) {
        var formatString: string = ''
        var format: string;
        while (gran_max >= gran_min) {
            formatString += this.getGranularityFormattingString(gran_max, (gran_max > gran_min));
            gran_max--;
        }
        return time.format(formatString.trim());
    }

    getGranularityFormattingString(granualarity, separator: boolean) {
        switch (granualarity) {
            case 0: return 'SSS';
            case 1: return 'ss' + (separator ? '.' : '');
            case 2: return 'mm' + (separator ? ':' : '');
            case 3: return 'hh' + (separator ? '' : '');
            case 4: return 'DD' + (separator ? ' ' : '');
            case 6: return 'MM' + (separator ? '-' : '');
            default: return 'YYYY' + (separator ? '-' : '');
        }
    }


    updateTime(min: number, max: number, single:number) {
        //var format = this.tickScale.tickFormat();
        var format = function(d) { return d.toDateString(); };

        min = Math.max(Math.round(min), 0);
        max = Math.min(Math.round(max), this.times.length-1);
        single = Math.round(single);

        this.labelStart
            .attr('x', this.slider.valueRange.invert(min)+ 10)
            .style('opacity', 1)
            //.text(this.formatForGranularities(this.times[min].time(), this.dgraph.gran_min, this.dgraph.gran_max));
            .text(format(new Date(this.times[min].unixTime())));

        this.labelEnd
            .attr('x', this.slider.valueRange.invert(max)+ 10)
            .style('opacity', 1)
            //.text(this.formatForGranularities(this.times[max].time(), this.dgraph.gran_min, this.dgraph.gran_max));
            .text(format(new Date(this.times[max].unixTime())));


        if(this.callBack)
            this.callBack(this.times[min], this.times[max], this.times[single], this.propagateButton.isChecked());
        else
            networkcube.timeRange(this.times[min], this.times[max], this.times[single], this.propagateButton.isChecked());
    }


    set(start: networkcube.Time, end: networkcube.Time) {
        this.slider.set(start.id(), end.id())
    }




}
