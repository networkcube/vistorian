/// <reference path="../../core/scripts/d3.d.ts"/>

class SmartSlider {

    /* VISUALIZATION PARAMETERS */
    BAR_WIDTH: number = 15;
    RADIUS_HANDLE: number = 5;

    // LEFT: number = this.RADIUS_HANDLE;
    // RIGHT: number = this.RADIUS_HANDLE;
    LEFT: number = 0;
    RIGHT: number = 0;
    HEIGHT: number = 10;
    TOP: number = 0;

    max: number;
    min: number;
    stepWidth: number;
    hasTickmarks: boolean;
    isInverted: boolean = false;

    svg: D3.Selection;
    x: number;
    y: number;
    width: number;
    g: D3.Selection;

    dragEndCallBackFn: Function;

    constructor(
        x: number,
        y: number,
        width: number,
        minValue: number,
        maxValue: number,
        stepWidth: number,
        tickMarks?: boolean) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.min = minValue;
        this.max = maxValue;
        this.stepWidth = stepWidth;

        if (tickMarks != undefined)
            this.hasTickmarks = tickMarks;
        else
            this.hasTickmarks = false;
    }

    setDragEndCallBack(fn: Function) {
        this.dragEndCallBackFn = fn;
    }


    valueRange: D3.Scale.QuantitiveScale;
    val2spaceScale: D3.Scale.QuantitiveScale;

    drag: D3.Behavior.Drag;
    bar0: D3.Selection;
    bar1: D3.Selection;
    circleMin;
    circleMax;
    circleSingle;
    rect;
    singleTimeStepX = 0;

    appendTo(svg: D3.Selection) {

        this.svg = svg;

        this.rect = this.svg[0][0].getBoundingClientRect();

        this.valueRange = d3.scale.linear()
            .domain([0, this.width])
            .range([this.min, this.max])


        this.drag = d3.behavior.drag()
            .origin(Object)
            .on("dragstart", () => { this.dragStart() })
            .on("drag", () => { this.dragMove() });

        this.svg = svg;

        this.g = svg.append("g")
            .attr("height", this.HEIGHT)
            .attr("width", this.width)
            .attr("transform", "translate(" + this.x + "," + this.y + ")");

        this.g.append("line")
            .attr("x1", this.LEFT)
            .attr("y1", this.TOP)
            .attr("x2", this.width - this.RIGHT - this.LEFT)
            .attr("y2", this.TOP)
            .style("stroke", "#aaa");

        if (this.hasTickmarks) {
            this.val2spaceScale = d3.scale.linear()
                .domain([this.min, this.max])
                .range([this.LEFT, this.width - this.RIGHT - this.LEFT]);

            for (var i = this.min; i <= this.max; i += this.stepWidth) {
                var x = this.val2spaceScale(i);
                this.g.append("line")
                    .attr('class', 'rangeTick')
                    .attr("x1", x)
                    .attr("y1", this.TOP)
                    .attr("x2", x)
                    .attr("y2", this.TOP + 20)
                    .style('stroke', '#bbb');

                this.g.append('text')
                    .attr('class', 'rangeTickText')
                    .attr('x', x)
                    .attr('y', this.TOP + 20)
                    .text(i.toFixed(1))
                    .style('opacity', .5)
                    .style('font-family', 'Helvetica')
                    .style('font-weigth', '100')
                    .style('font-size', '7pt');
            }
        }

        if (this.isInverted) {
            this.bar0 = this.g.append('rect')
                .attr('x', this.LEFT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', 0)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar0');
            this.bar1 = this.g.append('rect')
                .attr('x', this.RIGHT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', 0)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar1');
        } else {
            this.bar0 = this.g.append('rect')
                .attr('x', this.LEFT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', this.width - this.RIGHT - this.LEFT)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar0');
            this.bar1 = null;
        }


            
        this.circleMin = this.g.append("circle")
            .attr("id", "sliderKnobMin")
            .attr("r", this.RADIUS_HANDLE)
            .attr("cx", this.LEFT)
            .attr("cy", this.TOP + this.BAR_WIDTH)
            .attr("fill", "#777")
            .call(this.drag);

        this.circleMax = this.g.append("circle")
            .attr("id", "sliderKnobMax")
            .attr("r", this.RADIUS_HANDLE)
            .attr("cx", this.width - this.RIGHT)
            .attr("cy", this.TOP + this.BAR_WIDTH)
            .attr("fill", "#777")
            .call(this.drag);
            
        // this.circleSingle = this.g
        //     .append('svg:path')
        //     .attr('d', 'M0,0L4,4L4,15L-4,15L-4,4L0,0')
        //     .attr('fill', '#777')
        //     .attr("id", "sliderKnobSingle")
        //     .call(this.drag);
            
    }

    dragStartXMouse: number;
    dragStartXBar: number;
    dragObj;
    currentBarLength: number;

    dragStart() {
        this.dragStartXMouse = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()));
        this.dragObj = d3.event.sourceEvent.target;
        if (this.isInverted) {
            // determine whether we are left of min, in between, or right of max
            // the startxbar is the left end of whichever segment we are in, 
            // and the barlength is same
            var minPos: number = parseInt(this.circleMin.attr('cx'));
            var maxPos: number = parseInt(this.circleMax.attr('cx'));
            if (this.dragStartXMouse < minPos) {
                this.dragStartXBar = this.LEFT;
                this.currentBarLength = minPos - this.LEFT;
            } else if (this.dragStartXMouse < maxPos) {
                this.dragStartXBar = minPos;
                this.currentBarLength = maxPos - minPos;
            } else {
                this.dragStartXBar = maxPos;
                this.currentBarLength = this.width - this.RIGHT - maxPos;
            }
        } else {
            this.dragStartXBar = parseInt(this.bar0.attr('x'));
            this.currentBarLength = parseInt(this.bar0.attr('width'));
        }
    }

    dragMove() {
        // if we are dragging the entire bar
        if (!this.isInverted && this.dragObj.id == this.bar0.attr('id')) {
            var xOffset = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())) - this.dragStartXMouse;
            var x1 = Math.max(this.LEFT, Math.min(this.width - this.RIGHT - this.currentBarLength, this.dragStartXBar + xOffset))
            this.bar0.attr('x', x1)
            this.circleMin.attr("cx", x1)
            this.circleMax.attr("cx", x1 + this.currentBarLength);
            // or else we are dragging one of the circles.
        } else if (this.isInverted
            && (this.dragObj.id == this.bar0.attr('id')
                || this.dragObj.id == this.bar1.attr('id'))) {
            // when inverted, dragging bars does nothing
            return;
        } else if(this.dragObj == this.circleSingle){
            // move the one time steper
            this.singleTimeStepX = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()))
            d3.select(this.dragObj).attr("transform", 'translate('+this.singleTimeStepX+', 0)');
        } else {
            d3.select(this.dragObj).attr("cx", Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())));
            if (this.isInverted) {
                this.bar0
                    .attr('x', this.LEFT)
                    .attr('width', this.circleMin.attr('cx') - this.LEFT);
                this.bar1
                    .attr('x', this.circleMax.attr('cx'))
                    .attr('width', this.width - (this.RIGHT*2) - this.circleMax.attr('cx'));
            } else {
                this.bar0.attr('x', this.circleMin.attr('cx'))
                    .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
            }
        }
        this.dragEnd();
    }


    dragEnd() {
        this.min = this.valueRange(this.circleMin.attr("cx"));
        this.max = this.valueRange(this.circleMax.attr("cx"));
        this.dragEndCallBackFn(this.min, this.max, this.valueRange(this.singleTimeStepX));
    }


    getRelX(): number {
        return d3.event.sourceEvent.pageX - this.LEFT - this.x - this.rect.left
    }



    set(min: number, max: number) {
        // seems like this would make sense, 
        // this.min = min;
        // this.max = max;
        this.circleMin.attr("cx", this.valueRange.invert(min));
        this.circleMax.attr("cx", this.valueRange.invert(max));
        // inverted support
        if (this.isInverted) {
            this.bar0
                .attr('x', this.LEFT)
                .attr('width', this.circleMin.attr('cx'));
            this.bar1
                .attr('x', this.circleMax.attr('cx'))
                .attr('width', this.width - (this.RIGHT*2) - this.circleMax.attr('cx'));
        } else {
            this.bar0
                .attr('x', this.circleMin.attr('cx'))
                .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
        }
    }

    setIsInverted(inv: boolean): void {
        if (inv == this.isInverted)
            return;

        this.isInverted = inv;

        if (this.isInverted) {
            // create bar1, set positions of both
            this.bar1 = this.g.insert('rect','#bar0')
                .attr('x', this.RIGHT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', 0)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar1');
        } else {
            this.bar1.remove();
        }
        this.set(this.min, this.max);
    }
}
