var Slider = (function () {
    function Slider(x, y, width, minValue, maxValue, stepWidth) {
        this.BAR_WIDTH = 5;
        this.RADIUS_HANDLE = 5;
        this.LEFT = this.RADIUS_HANDLE;
        this.RIGHT = this.RADIUS_HANDLE;
        this.HEIGHT = 10;
        this.TOP = 0;
        this.x = x;
        this.y = y;
        this.width = width;
        this.min = minValue;
        this.max = maxValue;
        this.value = this.min;
        this.stepWidth = stepWidth;
    }
    Slider.prototype.setDragEndCallBack = function (fn) {
        this.dragEndCallBackFn = fn;
    };
    Slider.prototype.appendTo = function (svg) {
        var _this = this;
        this.svg = svg;
        this.rect = this.svg[0][0].getBoundingClientRect();
        this.valueRange = d3.scale.linear()
            .domain([0, this.width])
            .range([this.min, this.max]);
        this.drag = d3.behavior.drag()
            .origin(Object)
            .on("dragstart", function () { _this.dragStart(); })
            .on("drag", function () { _this.dragMove(); });
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
        this.knob = this.g.append("circle")
            .attr("id", "#sliderKnob")
            .attr("r", this.RADIUS_HANDLE)
            .attr("cx", this.LEFT)
            .attr("cy", this.TOP)
            .attr("fill", "#777")
            .call(this.drag);
    };
    Slider.prototype.dragStart = function () {
        this.dragStartXMouse = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()));
        this.dragObj = d3.event.sourceEvent.target;
    };
    Slider.prototype.dragMove = function () {
        d3.select(this.dragObj).attr("cx", Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())));
        this.dragEnd();
    };
    Slider.prototype.dragEnd = function () {
        this.value = this.valueRange(this.knob.attr("cx"));
        this.dragEndCallBackFn(this.value);
    };
    Slider.prototype.getRelX = function () {
        return d3.event.sourceEvent.pageX - this.LEFT - this.x - this.rect.left;
    };
    Slider.prototype.set = function (value) {
        this.knob.attr("cx", this.valueRange.invert(value));
    };
    return Slider;
}());
var networkcube;
(function (networkcube) {
    function makeSlider(d3parent, label, width, height, value, min, max, f) {
        var slider = new Slider(5, height - 5, width, min, max, .01);
        var svg = d3parent.append('svg')
            .attr('width', width + 20)
            .attr('height', height);
        svg.append('text')
            .attr('x', 10)
            .attr('y', height - 15)
            .text(label)
            .attr('class', 'sliderLabel');
        slider.appendTo(svg);
        slider.set(value);
        slider.setDragEndCallBack(f);
    }
    networkcube.makeSlider = makeSlider;
    var RadioButton = (function () {
        function RadioButton(color, text) {
            this.checked = false;
            this.RADIUS = 7;
            this.color = color;
            this.text = text;
        }
        RadioButton.prototype.appendTo = function (x, y, svg) {
            var _this = this;
            var g = svg.append('g')
                .attr('transform', 'translate(' + x + ',' + y + ')');
            this.circle = g.append('circle')
                .attr('r', this.RADIUS)
                .attr('fill', '#ffffff')
                .attr('stroke', this.color)
                .attr('stroke-width', 1)
                .attr('cx', this.RADIUS * 2)
                .attr('cy', 0);
            if (this.text) {
                this.label = g.append('text')
                    .attr('x', this.RADIUS * 1.4)
                    .attr('y', 5)
                    .style('font-family', 'Helvetica')
                    .style('font-size', '9pt')
                    .style('user-select', 'none')
                    .text(this.text[0])
                    .on('click', function () {
                    console.log(_this.checked);
                    _this.checked = !_this.checked;
                    if (_this.checked) {
                        _this.circle.attr('fill', _this.color);
                        _this.label.attr('fill', '#ffffff');
                    }
                    else {
                        _this.circle.attr('fill', '#ffffff');
                        _this.label.attr('fill', _this.color);
                    }
                    if (_this.clickHandler) {
                        _this.clickHandler();
                    }
                });
            }
        };
        RadioButton.prototype.isChecked = function () {
            return this.checked;
        };
        RadioButton.prototype.addClickHandler = function (f) {
            this.clickHandler = f;
        };
        return RadioButton;
    }());
    networkcube.RadioButton = RadioButton;
    function makeCheckBox(d3parent, label, callback) {
        d3parent.append('input')
            .attr('type', 'checkbox')
            .on('change', callback);
        d3parent.append('b').attr('class', 'sliderLabel').html(label);
    }
    networkcube.makeCheckBox = makeCheckBox;
    function makeButton(d3parent, label, callback) {
        d3parent.append('input')
            .attr('type', 'button')
            .attr('value', label)
            .on('click', callback);
    }
    networkcube.makeButton = makeButton;
})(networkcube || (networkcube = {}));
var TimeSlider = (function () {
    function TimeSlider(dgraph, width, callBack) {
        this.MARGIN_SLIDER_RIGHT = 30;
        this.MARGIN_SLIDER_LEFT = 10;
        this.TICK_GAP = 2;
        this.TICK_LABEL_GAP = 40;
        this.SLIDER_TOP = 25;
        this.HEIGHT = 200;
        this.callBack = undefined;
        this.dgraph = dgraph;
        this.times = dgraph.times().toArray();
        this.widgetWidth = width;
        this.sliderWidth = width - this.MARGIN_SLIDER_RIGHT + 5 - this.MARGIN_SLIDER_LEFT - 5;
        var lastDummyYear = this.times[this.times.length - 1].moment();
        var minGran = dgraph.gran_min;
        var minGranName = '';
        switch (minGran) {
            case 1:
                minGranName = 'milliseconds';
                break;
            case 2:
                minGranName = 'secondss';
                break;
            case 3:
                minGranName = 'minutes';
                break;
            case 4:
                minGranName = 'hours';
                break;
            case 5:
                minGranName = 'days';
                break;
            case 5:
                minGranName = 'weeks';
                break;
            case 6:
                minGranName = 'months';
                break;
            case 7:
                minGranName = 'years';
                break;
            case 8:
                minGranName = 'decades';
                break;
            case 9:
                minGranName = 'centuries';
                break;
            case 10:
                minGranName = 'millenia';
                break;
        }
        console.log('minGran', minGranName);
        lastDummyYear.add(1, minGranName);
        console.log('unixTime', lastDummyYear.valueOf());
        console.log('unixTime', lastDummyYear.valueOf());
        this.slider = new SmartSlider(this.MARGIN_SLIDER_LEFT, this.SLIDER_TOP, this.sliderWidth, this.times[0].unixTime(), lastDummyYear.valueOf(), 1);
        if (callBack)
            this.callBack = callBack;
        this.tickScale = d3.time.scale.utc()
            .range([this.MARGIN_SLIDER_LEFT, this.MARGIN_SLIDER_LEFT + this.sliderWidth])
            .domain([dgraph.time(0).unixTime(), lastDummyYear.valueOf()]);
        this.tickHeightFunction = d3.scale.linear()
            .range([4, this.SLIDER_TOP - 10])
            .domain([dgraph.gran_min, dgraph.gran_max]);
    }
    TimeSlider.prototype.appendTo = function (svg, x, y) {
        var _this = this;
        if (!x)
            x = 0;
        if (!y)
            y = 0;
        var g = svg.append('g')
            .attr('transform', 'translate(' + x + ',' + y + ')');
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
            .style('user-select', 'none');
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
            .style('user-select', 'none');
        this.slider.appendTo(g);
        this.slider.setDragEndCallBack(function (min, max, single) { return _this.updateTime(min, max, single); });
        this.propagateButton = new networkcube.RadioButton('#000000', 'Syncronize Time');
        this.propagateButton.appendTo(this.sliderWidth + 15, this.SLIDER_TOP + 8, g);
    };
    TimeSlider.prototype.drawTickmarks = function (granularity, tickTimes, svg) {
        var time;
        var displayLabelSpacing = 1;
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
                svg.append('line')
                    .attr('x1', this.tickScale(tickTimes[i].unixTime()))
                    .attr('x2', this.tickScale(tickTimes[i].unixTime()))
                    .attr('y1', this.SLIDER_TOP)
                    .attr('y2', this.SLIDER_TOP - this.tickHeightFunction(granularity))
                    .style('stroke', '#bbb');
            }
        }
    };
    TimeSlider.prototype.formatAtGranularity = function (time, granualarity) {
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
    };
    TimeSlider.prototype.formatForGranularities = function (time, gran_min, gran_max) {
        var formatString = '';
        var format;
        while (gran_max >= gran_min) {
            formatString += this.getGranularityFormattingString(gran_max, (gran_max > gran_min));
            gran_max--;
        }
        return time.format(formatString.trim());
    };
    TimeSlider.prototype.getGranularityFormattingString = function (granualarity, separator) {
        switch (granualarity) {
            case 0: return 'SSS';
            case 1: return 'ss' + (separator ? '.' : '');
            case 2: return 'mm' + (separator ? ':' : '');
            case 3: return 'hh' + (separator ? '' : '');
            case 4: return 'DD' + (separator ? ' ' : '');
            case 6: return 'MM' + (separator ? '-' : '');
            default: return 'YYYY' + (separator ? '-' : '');
        }
    };
    TimeSlider.prototype.updateTime = function (minUnix, maxUnix, single) {
        var format = function (d) { return d.toDateString(); };
        single = Math.round(single);
        this.labelStart
            .attr('x', this.slider.valueRange.invert(minUnix) + 10)
            .style('opacity', 1)
            .text(format(new Date(minUnix)));
        this.labelEnd
            .attr('x', this.slider.valueRange.invert(maxUnix) + 10)
            .style('opacity', 1)
            .text(format(new Date(maxUnix)));
        if (this.callBack != undefined)
            this.callBack(minUnix, maxUnix, this.propagateButton.isChecked());
        else
            networkcube.timeRange(minUnix, maxUnix, this.times[single], this.propagateButton.isChecked());
    };
    TimeSlider.prototype.set = function (startUnix, endUnix) {
        this.slider.set(startUnix, endUnix);
    };
    return TimeSlider;
}());
var SmartSlider = (function () {
    function SmartSlider(x, y, width, minValue, maxValue, stepWidth, tickMarks) {
        this.BAR_WIDTH = 15;
        this.RADIUS_HANDLE = 5;
        this.LEFT = 0;
        this.RIGHT = 0;
        this.HEIGHT = 10;
        this.TOP = 0;
        this.isInverted = false;
        this.singleTimeStepX = 0;
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
    SmartSlider.prototype.setDragEndCallBack = function (fn) {
        this.dragEndCallBackFn = fn;
    };
    SmartSlider.prototype.appendTo = function (svg) {
        var _this = this;
        this.svg = svg;
        this.rect = this.svg[0][0].getBoundingClientRect();
        this.valueRange = d3.scale.linear()
            .domain([0, this.width])
            .range([this.min, this.max]);
        this.drag = d3.behavior.drag()
            .origin(Object)
            .on("dragstart", function () { _this.dragStart(); })
            .on("drag", function () { _this.dragMove(); });
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
        }
        else {
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
    };
    SmartSlider.prototype.dragStart = function () {
        this.dragStartXMouse = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()));
        this.dragObj = d3.event.sourceEvent.target;
        if (this.isInverted) {
            var minPos = parseInt(this.circleMin.attr('cx'));
            var maxPos = parseInt(this.circleMax.attr('cx'));
            if (this.dragStartXMouse < minPos) {
                this.dragStartXBar = this.LEFT;
                this.currentBarLength = minPos - this.LEFT;
            }
            else if (this.dragStartXMouse < maxPos) {
                this.dragStartXBar = minPos;
                this.currentBarLength = maxPos - minPos;
            }
            else {
                this.dragStartXBar = maxPos;
                this.currentBarLength = this.width - this.RIGHT - maxPos;
            }
        }
        else {
            this.dragStartXBar = parseInt(this.bar0.attr('x'));
            this.currentBarLength = parseInt(this.bar0.attr('width'));
        }
    };
    SmartSlider.prototype.dragMove = function () {
        if (!this.isInverted && this.dragObj.id == this.bar0.attr('id')) {
            var xOffset = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())) - this.dragStartXMouse;
            var x1 = Math.max(this.LEFT, Math.min(this.width - this.RIGHT - this.currentBarLength, this.dragStartXBar + xOffset));
            this.bar0.attr('x', x1);
            this.circleMin.attr("cx", x1);
            this.circleMax.attr("cx", x1 + this.currentBarLength);
        }
        else if (this.isInverted
            && (this.dragObj.id == this.bar0.attr('id')
                || this.dragObj.id == this.bar1.attr('id'))) {
            return;
        }
        else if (this.dragObj == this.circleSingle) {
            this.singleTimeStepX = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()));
            d3.select(this.dragObj).attr("transform", 'translate(' + this.singleTimeStepX + ', 0)');
        }
        else {
            d3.select(this.dragObj).attr("cx", Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())));
            if (this.isInverted) {
                this.bar0
                    .attr('x', this.LEFT)
                    .attr('width', this.circleMin.attr('cx') - this.LEFT);
                this.bar1
                    .attr('x', this.circleMax.attr('cx'))
                    .attr('width', this.width - (this.RIGHT * 2) - this.circleMax.attr('cx'));
            }
            else {
                this.bar0.attr('x', this.circleMin.attr('cx'))
                    .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
            }
        }
        this.dragEnd();
    };
    SmartSlider.prototype.dragEnd = function () {
        this.min = this.valueRange(this.circleMin.attr("cx"));
        this.max = this.valueRange(this.circleMax.attr("cx"));
        this.dragEndCallBackFn(this.min, this.max, this.valueRange(this.singleTimeStepX));
    };
    SmartSlider.prototype.getRelX = function () {
        return d3.event.sourceEvent.pageX - this.LEFT - this.x - this.rect.left;
    };
    SmartSlider.prototype.set = function (min, max) {
        this.circleMin.attr("cx", this.valueRange.invert(min));
        this.circleMax.attr("cx", this.valueRange.invert(max));
        if (this.isInverted) {
            this.bar0
                .attr('x', this.LEFT)
                .attr('width', this.circleMin.attr('cx'));
            this.bar1
                .attr('x', this.circleMax.attr('cx'))
                .attr('width', this.width - (this.RIGHT * 2) - this.circleMax.attr('cx'));
        }
        else {
            this.bar0
                .attr('x', this.circleMin.attr('cx'))
                .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
        }
    };
    SmartSlider.prototype.setIsInverted = function (inv) {
        if (inv == this.isInverted)
            return;
        this.isInverted = inv;
        if (this.isInverted) {
            this.bar1 = this.g.insert('rect', '#bar0')
                .attr('x', this.RIGHT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', 0)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar1');
        }
        else {
            this.bar1.remove();
        }
        this.set(this.min, this.max);
    };
    return SmartSlider;
}());
var Timeline = (function () {
    function Timeline(webgl, network, x, y, width, height) {
        this.TICK_MIN_DIST = 13;
        this.LABEL_MIN_DIST = 13;
        this.timeObjects = [];
        this.tick_minGran_visible_prev = -1;
        this.x = x;
        this.y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.webgl = webgl;
        this.network = network;
        this.visualize();
    }
    Timeline.prototype.visualize = function () {
        var _this = this;
        this.granules = networkcube.GRANULARITY;
        var times = this.network.times().toArray();
        this.minGran = this.network.getMinGranularity();
        this.maxGran = this.granules.length - 1;
        var unix_start = times[0].unixTime();
        var unix_end = times[times.length - 1].unixTime();
        var start = moment(unix_start + '', 'x').startOf(this.granules[this.minGran]);
        var end = moment(unix_end + '', 'x').startOf(this.granules[this.minGran]);
        var numTimes = Math.ceil(Math.abs(start.diff(end, this.granules[this.minGran] + 's')));
        this.maxGran = Math.min(this.maxGran, this.granules.length - 1);
        var granularity_levels = ((this.maxGran - this.minGran) + 1);
        var granularity_height = this.HEIGHT / granularity_levels;
        var prev = moment(unix_start + '', 'x');
        var prevprev = moment((unix_start - 86400000) + '', 'x');
        this.timeObjects.push(prev);
        for (var i = 1; i < numTimes; i++) {
            prev = moment(prev);
            prev.add(1, this.granules[this.minGran] + 's');
            this.timeObjects.push(prev);
        }
        this.timeGranularities = [];
        var granularitySet;
        var y1, y2;
        var to1, to2;
        for (var i = 0; i < this.timeObjects.length; i++) {
            granularitySet = false;
            if (i == 0)
                to1 = prevprev;
            else
                to1 = this.timeObjects[i - 1];
            to2 = this.timeObjects[i];
            for (var gran = this.maxGran; gran >= this.minGran && !granularitySet; gran--) {
                if (gran > 7) {
                    y1 = to1.get(this.granules[7]) + '';
                    y2 = to2.get(this.granules[7]) + '';
                    if (y1[y1.length - 4] != y2[y2.length - 4]) {
                        this.timeGranularities.push(10);
                        granularitySet = true;
                    }
                    else if (y1[y1.length - 3] != y2[y2.length - 3]) {
                        this.timeGranularities.push(9);
                        granularitySet = true;
                    }
                    else if (y1[y1.length - 2] != y2[y2.length - 2]) {
                        this.timeGranularities.push(8);
                        granularitySet = true;
                    }
                }
                else if (to1.get(this.granules[gran]) != to2.get(this.granules[gran])) {
                    this.timeGranularities.push(gran);
                    granularitySet = true;
                }
            }
        }
        this.position_x = d3.scale.linear()
            .domain([0, this.timeGranularities.length - 1])
            .range([this.x + 1, this.x + this.WIDTH - 1]);
        this.position_y = d3.scale.linear()
            .domain([this.minGran - 1, this.maxGran])
            .range([-this.HEIGHT, 0]);
        this.label_opacity = d3.scale.linear()
            .domain([this.minGran - 1, this.maxGran])
            .range([.2, 1]);
        this.tickmarks = this.webgl.selectAll()
            .data(this.timeGranularities)
            .append('line')
            .attr('x1', function (d, i) { return _this.position_x(i); })
            .attr('x2', function (d, i) { return _this.position_x(i); })
            .attr('y1', function (d, i) { return _this.position_y(d); })
            .attr('y2', function (d, i) { return -_this.HEIGHT; })
            .style('stroke', '#000')
            .style('opacity', .1);
        this.highlightPointer = this.webgl.selectAll()
            .data([0])
            .append('line')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', -this.HEIGHT)
            .style('stroke', '#f00')
            .style('opacity', 0);
        this.highlightLabel = this.webgl.selectAll()
            .data([0])
            .append('text')
            .attr('x', 0)
            .attr('y', -6)
            .style('fill', '#f00')
            .style('font-size', 10)
            .style('opacity', 0);
        this.updateWithIds(0, this.timeObjects.length - 1);
    };
    Timeline.prototype.update = function (startUnix, endUnix) {
        var startId, endId;
        for (var i = 0; i < this.timeObjects.length; i++) {
            if ((this.timeObjects[i].unix() * 1000) > startUnix) {
                startId = i - 1;
                break;
            }
        }
        for (i = startId; i < this.timeObjects.length; i++) {
            if ((this.timeObjects[i].unix() * 1000) > endUnix) {
                endId = i;
                break;
            }
        }
        if (endId == undefined) {
            endId = this.timeObjects.length - 1;
        }
        this.updateWithIds(startId, endId);
    };
    Timeline.prototype.updateWithIds = function (minTimeId, maxTimeId) {
        var _this = this;
        this.minTimeId = minTimeId;
        this.maxTimeId = maxTimeId;
        this.position_x.domain([minTimeId, maxTimeId]);
        var ticksFitting = Math.floor(this.WIDTH / this.TICK_MIN_DIST);
        console.log('ticksFitting', ticksFitting);
        var minTime = this.timeObjects[this.minTimeId];
        var maxTime = this.timeObjects[this.maxTimeId];
        var requiredTicks;
        var t1, t2;
        this.tick_minGran_visible = undefined;
        for (var g = this.minGran; g < this.maxGran && this.tick_minGran_visible == undefined; g++) {
            t1 = moment(minTime).startOf(this.granules[g]);
            t2 = moment(maxTime).startOf(this.granules[g]);
            if (g <= 7) {
                requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[g]);
            }
            else {
                if (g == 8)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7]) / 10;
                if (g == 9)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7]) / 100;
                if (g == 10)
                    requiredTicks = moment.duration(t2.diff(t1)).as(this.granules[7]) / 1000;
            }
            if (requiredTicks <= ticksFitting) {
                this.tick_minGran_visible = g;
            }
        }
        this.label_minGran_visible = this.tick_minGran_visible;
        this.label_opacity
            .domain([this.tick_minGran_visible - 1, this.maxGran]);
        if (this.tick_minGran_visible_prev != this.tick_minGran_visible) {
            console.log('re-create time labels');
            if (this.timeLabels != undefined)
                this.timeLabels.removeAll();
            this.timeLabels = this.webgl.selectAll()
                .data(this.timeObjects)
                .filter(function (d, i) {
                var visible = _this.timeGranularities[i] >= _this.tick_minGran_visible;
                return visible;
            })
                .append('text')
                .attr('x', function (d, i) { return _this.position_x(_this.timeObjects.indexOf(d)) + 8; })
                .attr('y', function (d, i) { return -_this.HEIGHT + 17; })
                .text(function (d, i) { return _this.formatTime(_this.timeObjects.indexOf(d)); })
                .attr('z', 1)
                .style('fill', '#000')
                .attr('rotation', 90)
                .style('font-size', 10)
                .style('opacity', .1);
            console.log('time labels created:', this.timeLabels.length);
        }
        this.tick_minGran_visible_prev = this.tick_minGran_visible;
        this.tickmarks
            .style('opacity', function (d, i) {
            var visible = i == 0
                || i >= _this.minTimeId
                    && i <= _this.maxTimeId
                    && _this.timeGranularities[i] >= _this.tick_minGran_visible
                ? _this.label_opacity(_this.timeGranularities[i])
                : 0;
            return visible;
        })
            .attr('x1', function (d, i) { return _this.position_x(i); })
            .attr('x2', function (d, i) { return _this.position_x(i); })
            .style('stroke-width', function (d, i) { return _this.label_opacity(_this.timeGranularities[i]) * 4; });
        this.timeLabels
            .style('opacity', function (d, i) {
            var globalId = _this.timeObjects.indexOf(d);
            var visible = globalId >= _this.minTimeId
                && globalId <= _this.maxTimeId
                && _this.timeGranularities[globalId] >= _this.label_minGran_visible;
            return visible ? 1 : 0;
        })
            .attr('x', function (d, i) {
            var globalId = _this.timeObjects.indexOf(d);
            return _this.position_x(globalId) + 8;
        });
        if (this.highlightId != undefined) {
            this.highlightPointer
                .attr('x1', this.position_x(this.highlightId))
                .attr('x2', this.position_x(this.highlightId));
            this.highlightLabel
                .attr('x', this.position_x(this.highlightId) + 37);
        }
    };
    Timeline.prototype.formatTime = function (index) {
        var t = this.timeObjects[index];
        var g = Math.min(Math.max(this.tick_minGran_visible, this.timeGranularities[index]), 7);
        return networkcube.formatAtGranularity(t, g);
    };
    Timeline.prototype.highlight = function (unixTime) {
        if (unixTime == undefined) {
            this.highlightPointer
                .style('opacity', 0);
            this.highlightId = undefined;
        }
        for (var i = 0; i < this.timeObjects.length; i++) {
            if ((this.timeObjects[i].unix() * 1000) > unixTime) {
                this.highlightId = i - 1;
                break;
            }
        }
        if (this.highlightId == undefined) {
            this.highlightId = this.timeObjects.length - 1;
        }
        this.highlightPointer
            .attr('x1', this.position_x(this.highlightId))
            .attr('x2', this.position_x(this.highlightId))
            .style('opacity', 1);
        this.highlightLabel
            .style('opacity', 1)
            .attr('x', this.position_x(this.highlightId) + 37)
            .text(this.timeObjects[this.highlightId].format('DD/MM/YYYY'));
    };
    return Timeline;
}());
var RangeSlider = (function () {
    function RangeSlider(x, y, width, minValue, maxValue, stepWidth, tickMarks) {
        this.BAR_WIDTH = 5;
        this.RADIUS_HANDLE = 4;
        this.LEFT = this.RADIUS_HANDLE;
        this.RIGHT = this.RADIUS_HANDLE;
        this.HEIGHT = 10;
        this.TOP = 0;
        this.isInverted = false;
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
    RangeSlider.prototype.setDragEndCallBack = function (fn) {
        this.dragEndCallBackFn = fn;
    };
    RangeSlider.prototype.appendTo = function (svg) {
        var _this = this;
        this.svg = svg;
        this.rect = this.svg[0][0].getBoundingClientRect();
        this.valueRange = d3.scale.linear()
            .domain([0, this.width])
            .range([this.min, this.max]);
        this.drag = d3.behavior.drag()
            .origin(Object)
            .on("dragstart", function () { _this.dragStart(); })
            .on("drag", function () { _this.dragMove(); });
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
        }
        else {
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
    };
    RangeSlider.prototype.dragStart = function () {
        this.dragStartXMouse = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX()));
        this.dragObj = d3.event.sourceEvent.target;
        if (this.isInverted) {
            var minPos = parseInt(this.circleMin.attr('cx'));
            var maxPos = parseInt(this.circleMax.attr('cx'));
            if (this.dragStartXMouse < minPos) {
                this.dragStartXBar = this.LEFT;
                this.currentBarLength = minPos - this.LEFT;
            }
            else if (this.dragStartXMouse < maxPos) {
                this.dragStartXBar = minPos;
                this.currentBarLength = maxPos - minPos;
            }
            else {
                this.dragStartXBar = maxPos;
                this.currentBarLength = this.width - this.RIGHT - maxPos;
            }
        }
        else {
            this.dragStartXBar = parseInt(this.bar0.attr('x'));
            this.currentBarLength = parseInt(this.bar0.attr('width'));
        }
    };
    RangeSlider.prototype.dragMove = function () {
        if (!this.isInverted && this.dragObj.id == this.bar0.attr('id')) {
            var xOffset = Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())) - this.dragStartXMouse;
            var x1 = Math.max(this.LEFT, Math.min(this.width - this.RIGHT - this.currentBarLength, this.dragStartXBar + xOffset));
            this.bar0.attr('x', x1);
            this.circleMin.attr("cx", x1);
            this.circleMax.attr("cx", x1 + this.currentBarLength);
        }
        else if (this.isInverted
            && (this.dragObj.id == this.bar0.attr('id')
                || this.dragObj.id == this.bar1.attr('id'))) {
            return;
        }
        else {
            d3.select(this.dragObj).attr("cx", Math.max(this.LEFT, Math.min(this.width - this.RIGHT, this.getRelX())));
            if (this.isInverted) {
                this.bar0
                    .attr('x', this.LEFT)
                    .attr('width', this.circleMin.attr('cx') - this.LEFT);
                this.bar1
                    .attr('x', this.circleMax.attr('cx'))
                    .attr('width', this.width - (this.RIGHT * 2) - this.circleMax.attr('cx'));
            }
            else {
                this.bar0.attr('x', this.circleMin.attr('cx'))
                    .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
            }
        }
        this.dragEnd();
    };
    RangeSlider.prototype.dragEnd = function () {
        this.min = this.valueRange(this.circleMin.attr("cx"));
        this.max = this.valueRange(this.circleMax.attr("cx"));
        this.dragEndCallBackFn(this.min, this.max);
    };
    RangeSlider.prototype.getRelX = function () {
        return d3.event.sourceEvent.pageX - this.LEFT - this.x - this.rect.left;
    };
    RangeSlider.prototype.set = function (min, max) {
        this.circleMin.attr("cx", this.valueRange.invert(min));
        this.circleMax.attr("cx", this.valueRange.invert(max));
        if (this.isInverted) {
            this.bar0
                .attr('x', this.LEFT)
                .attr('width', this.circleMin.attr('cx'));
            this.bar1
                .attr('x', this.circleMax.attr('cx'))
                .attr('width', this.width - (this.RIGHT * 2) - this.circleMax.attr('cx'));
        }
        else {
            this.bar0
                .attr('x', this.circleMin.attr('cx'))
                .attr('width', this.circleMax.attr('cx') - this.circleMin.attr('cx'));
        }
    };
    RangeSlider.prototype.setIsInverted = function (inv) {
        if (inv == this.isInverted)
            return;
        this.isInverted = inv;
        if (this.isInverted) {
            this.bar1 = this.g.insert('rect', '#bar0')
                .attr('x', this.RIGHT)
                .attr('y', this.TOP)
                .attr('height', this.BAR_WIDTH)
                .attr('width', 0)
                .style('fill', '#bbb')
                .call(this.drag)
                .attr('id', 'bar1');
        }
        else {
            this.bar1.remove();
        }
        this.set(this.min, this.max);
    };
    return RangeSlider;
}());
//# sourceMappingURL=widgets.js.map