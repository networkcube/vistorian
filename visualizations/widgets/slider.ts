/// <reference path="../../core/scripts/d3.d.ts"/>

class Slider {

    /* VISUALIZATION PARAMETERS */
    BAR_WIDTH: number = 5;
    RADIUS_HANDLE: number = 5;

    LEFT: number = this.RADIUS_HANDLE;
    RIGHT: number = this.RADIUS_HANDLE;
    HEIGHT: number = 10;
    TOP: number = 0;

    max: number;
    min: number;
    value: number;
    stepWidth: number;

    svg: D3.Selection;
    x: number;
    y: number;
    width: number;
    g: D3.Selection;

    dragEndCallBackFn: Function;

    constructor(x: number, y: number, width: number, minValue: number, maxValue: number, stepWidth: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.min = minValue;
        this.max = maxValue;
        this.value = this.min;
        this.stepWidth = stepWidth;
    }

    setDragEndCallBack(fn: Function) {
        this.dragEndCallBackFn = fn;
    }


    valueRange;
    drag;
    bar;
    knob;
    rect;
    appendTo(svg: D3.Selection) {

        this.svg = svg;

        this.rect = this.svg[0][0].getBoundingClientRect();

        this.valueRange = d3.scale.linear()
            .domain([0, this.width])
            .range([this.min, this.max])


        this.drag = d3.behavior.drag()
            .origin(Object)
            .on("dragstart", () => { this.dragStart() })
            .on("drag", () => { this.dragMove() })

        this.svg = svg;

        this.g = svg.append("g")
            .attr("height", this.HEIGHT)
            .attr("width", this.width)
            .attr("transform", "translate(" + this.x + "," + this.y + ")")

        this.g.append("line")
            .attr("x1", this.LEFT)
            .attr("y1", this.TOP)
            .attr("x2", this.width - this.RIGHT - this.LEFT)
            .attr("y2", this.TOP)
            .style("stroke", "#aaa")

        this.knob = this.g.append("circle")
            .attr("id", "#sliderKnob")
            .attr("r", this.RADIUS_HANDLE)
            .attr("cx", this.LEFT)
            .attr("cy", this.TOP)
            .attr("fill", "#777")
            .call(this.drag);
    }

    dragStartXMouse;
    dragStartXBar;
    dragObj;
    currentBarLength;
    dragStart() {
        this.dragStartXMouse = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()))
        this.dragObj = d3.event.sourceEvent.target
    }

    dragMove() {
        d3.select(this.dragObj).attr("cx", Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())));
        this.dragEnd()
    }


    dragEnd() {
        this.value = this.valueRange(this.knob.attr("cx"));
        this.dragEndCallBackFn(this.value);
    }


    getRelX(): number {
        return d3.event.sourceEvent.pageX - this.LEFT - this.x - this.rect.left
    }



    set(value: number) {
        this.knob.attr("cx", this.valueRange.invert(value));
    }


}
