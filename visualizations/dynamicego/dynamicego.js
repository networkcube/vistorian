var dgraph = networkcube.getDynamicGraph();
networkcube.setDefaultEventListener(updateEventHandler);
networkcube.addEventListener('timeRange', timeRangeHandler);
var nodes = dgraph.nodes().toArray();
var links = dgraph.links().toArray();
var times = dgraph.times().toArray();
var linkTypes = dgraph.links().linkTypes();
var WIDTH = window.innerWidth;
var TABLE_MARGIN_LEFT = 200;
var TABLE_PADDING_LEFT = 5;
var TABLE_RIGHT = 100;
var ROW_HEIGHT = 13;
var COL_WIDTH = 10;
var NODE_OPACITY = .6;
var ANCHOR_END_DIAMETER = 2;
var ANCHOR_START_DIAMETER = 4;
var LINK_OPACITY_DEFAULT = .2;
var LINK_OPACITY_HIGHLIGHTED = 1;
var NODE_LABEL_COLOR = '#000';
var NODE_LABEL_WEIGHT = 300;
var LABEL_ORDER;
var CIRCLE_SEGMENTS = 7;
var SCROLL_CHUNK = 2;
var TIME_TICK_GAP_MAX = 12;
var TIMELABEL_OPACITY = .3;
var MARGIN_TOP = 70;
var TABLE_TOP = 50;
var svg;
var nodeYPosFunction = d3.scale.linear();
var timeXFunction = d3.scale.linear();
var bar;
var nodeLabel;
var startAnchors;
var endAnchors;
var arcs;
var tickTimes = [];
var timeLabelHoverFields;
var egoNode;
var isShownNoneEgoLinks = true;
var yearOffset = 0;
var startUnix = times[0].unixTime();
var endUnix = times[times.length - 1].unixTime();
var nodesScrollStart = 0;
var granualarity = dgraph.getMinGranularity();
var globalNodeOrder = nodes.slice(0);
var currentNodeOrder = [];
for (var i = 0; i < globalNodeOrder.length; i++) {
    currentNodeOrder.push(i);
}
var lineFunction = d3.svg.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .interpolate("basis");
var HEIGHT = window.innerHeight;
$('#visDiv').append('<svg id="visSvg"><foreignObject id="visCanvasFO"></foreignObject></svg>');
d3.select('#visCanvasFO')
    .attr('x', TABLE_MARGIN_LEFT)
    .attr('y', MARGIN_TOP)
    .attr('width', WIDTH)
    .attr('height', HEIGHT);
var webgl = glutils.initWebGL('visCanvasFO', WIDTH, HEIGHT);
webgl.enablePanning(false);
webgl.camera.position.x = WIDTH / 2;
webgl.camera.position.y = -HEIGHT / 2;
webgl.camera.position.z = 1000;
var timeline = new Timeline(webgl, dgraph, TABLE_PADDING_LEFT - 1, 0, WIDTH - TABLE_MARGIN_LEFT - TABLE_RIGHT, TABLE_TOP);
window.addEventListener("mousewheel", mouseWheelHandler, false);
$('#menu').append('\
            <select id="labelOrdering" onchange="updateGlobalOrder()">\
                <option value="data">As appear in table</option>\
                <option value="alphanumerical">Alphanumerical</option>\
                <option value="degree">Number of connections</option>\
            </select>\
            ');
var timeSlider = new TimeSlider(dgraph, WIDTH - 100 - TABLE_MARGIN_LEFT);
this.visualize();
function visualize() {
    nodeYPosFunction.domain([0, nodes.length - 1])
        .range([TABLE_TOP + ROW_HEIGHT, TABLE_TOP + ROW_HEIGHT * nodes.length]);
    startUnix = times[0].unixTime();
    endUnix = times[times.length - 1].unixTime();
    console.log('timeXFunction(startUnix)', timeXFunction(startUnix));
    timeXFunction
        .domain([startUnix, endUnix])
        .range([5, WIDTH - TABLE_MARGIN_LEFT - TABLE_RIGHT]);
    svg = d3.select('#visSvg')
        .attr('width', WIDTH)
        .attr('height', ROW_HEIGHT * nodes.length + 200);
    timeSlider.appendTo(svg, TABLE_MARGIN_LEFT);
    createNodes();
    createTimes();
    createLinks();
    webgl.render();
}
var rowBars;
function createNodes() {
    nodeLabel = svg.selectAll('.nodeLabel')
        .data(nodes)
        .enter()
        .append('text')
        .attr('x', TABLE_MARGIN_LEFT - 5)
        .attr('y', function (d) {
        return MARGIN_TOP + nodeYPosFunction(currentNodeOrder[d.id()]) + ROW_HEIGHT - 5;
    })
        .text(function (d) { return d.label() + ' (' + d.neighbors().size() + ')'; })
        .attr('class', 'nodeLabel')
        .style('font-weight', NODE_LABEL_WEIGHT)
        .style('fill', NODE_LABEL_COLOR)
        .on('mouseover', function (d, i) {
        networkcube.highlight('set', { nodes: [d] });
    })
        .on('mouseout', function (d, i) {
        networkcube.highlight('reset');
    })
        .on('click', function (d, i) {
        showEgoNetwork(d);
    });
    rowBars = glutils.selectAll()
        .data(nodes.slice(0))
        .filter(function (d, i) { return i % 2 == 0; })
        .append('rect')
        .attr('x', TABLE_PADDING_LEFT)
        .attr('y', function (d, i) { return -nodeYPosFunction(i * 2); })
        .attr('width', WIDTH - TABLE_MARGIN_LEFT - TABLE_RIGHT)
        .attr('height', ROW_HEIGHT)
        .style('fill', function (d, i) { return i % 3 == 2 ? 0xdddddd : 0xeeeeee; })
        .style('stroke', function (d, i) { return i % 3 == 2 ? 0xdddddd : 0xeeeeee; });
}
function createTimes() {
    var _this = this;
    timeLabelHoverFields = glutils.selectAll()
        .data(times)
        .append('rect')
        .attr('x', function (d, i) { return _this.timeXFunction(d.unixTime()) - 6; })
        .attr('y', function (d) { return -TABLE_TOP + getTimeFormatted(d).length * 8; })
        .attr('z', 2)
        .style('opacity', 0)
        .attr('width', 12)
        .attr('height', function (d) { return getTimeFormatted(d).length * 8; })
        .on('mouseover', function (d, i) {
        networkcube.highlight('set', { times: [d] });
    })
        .on('mouseout', function (d, i) {
        networkcube.highlight('reset');
    });
}
function getTimeFormatted(d) {
    return networkcube.formatAtGranularity(d.time(), 7) + '-' + networkcube.formatAtGranularity(d.time(), 6);
}
function createLinks() {
    var _this = this;
    var l;
    var geometry;
    var material;
    var c, curve;
    var points;
    var x, y1, y2;
    var p;
    var splineObject;
    var yOffset;
    startAnchors = webgl.selectAll()
        .data(links);
    startAnchors
        .append('circle')
        .attr('x', function (l, i) {
        return timeXFunction(l.times().toArray()[0].unixTime());
    })
        .attr('y', function (l, i) {
        y1 = _this.nodeYPosFunction(currentNodeOrder[l.source.id()]);
        yOffset = ROW_HEIGHT / 2;
        return -(y1 + yOffset);
    })
        .attr('z', 2)
        .attr('r', ANCHOR_START_DIAMETER)
        .style('fill', function (l) { return l.getSelections()[0].color; });
    endAnchors = glutils.selectAll().data(links);
    endAnchors.append('circle')
        .attr('x', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()); })
        .attr('y', function (l, i) {
        y2 = _this.nodeYPosFunction(currentNodeOrder[l.target.id()]);
        yOffset = ROW_HEIGHT / 2;
        return -(y2 + yOffset);
    })
        .attr('z', 2)
        .attr('r', ANCHOR_END_DIAMETER)
        .style('fill', function (l) { return l.getSelections()[0].color; });
    arcs = glutils.selectAll()
        .data(links)
        .append('path')
        .attr('d', function (l) { return makeArcPath(l); })
        .attr('x', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()); })
        .attr('y', function (l, i) { return -ROW_HEIGHT / 2; })
        .attr('z', 10)
        .style('stroke', function (l) { return l.getSelections()[0].color; })
        .style('stroke-width', 1)
        .style('opacity', .3)
        .on('mouseover', function (d, i) {
        console.log('mouse over year', d.times().get(0).format('DD/MM, YYYY'));
        networkcube.highlight('set', { links: [d] });
        timeline.highlight(d.times().get(0).unixTime());
    })
        .on('mouseout', function (d, i) {
        networkcube.highlight('reset');
    });
}
function timeRangeHandler(m) {
    startUnix = m.startUnix;
    endUnix = m.endUnix;
    timeSlider.set(startUnix, endUnix);
    timeXFunction
        .domain([startUnix, endUnix]);
    arcs
        .attr('x', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()); })
        .style('opacity', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()) < 5 ? 0 : 1; });
    startAnchors
        .attr('x', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()); })
        .style('opacity', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()) < 5 ? 0 : 1; });
    endAnchors
        .attr('x', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()); })
        .style('opacity', function (l, i) { return timeXFunction(l.times().toArray()[0].unixTime()) < 5 ? 0 : 1; });
    updateLinks();
    timeline.update(startUnix, endUnix);
    webgl.render();
}
function updateEventHandler(m) {
    if (m.type == networkcube.MESSAGE_SELECTION_FILTER) {
        updateCurrentOrder();
        return;
    }
    else {
        updateLinks();
        updateNodes();
        webgl.render();
    }
}
function updateCurrentOrder() {
    currentNodeOrder = [];
    for (var i = 0; i < this.nodes.length; i++) {
        currentNodeOrder.push(-1);
    }
    var rank = 0;
    var n;
    for (var i = 0; i < globalNodeOrder.length; i++) {
        if (globalNodeOrder[i].isVisible()) {
            currentNodeOrder[globalNodeOrder[i].id()] = rank;
            rank++;
        }
    }
    console.log('currentNodeOrder', currentNodeOrder);
    nodeYPosFunction.domain([0, rank])
        .range([TABLE_TOP + ROW_HEIGHT, TABLE_TOP + ROW_HEIGHT * (rank - nodesScrollStart)]);
    updateNodePositions(1000);
    updateLinkPositions();
    updateLinks();
    webgl.render();
}
function updateLinks() {
    arcs
        .style('stroke-width', function (d) {
        return d.isHighlighted()
            || d.source.isHighlighted()
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ? 2 : 1;
    })
        .style('opacity', function (d) {
        return !d.isVisible()
            || currentNodeOrder[d.source.id()] < nodesScrollStart
            || currentNodeOrder[d.target.id()] < nodesScrollStart
            || d.times().get(0).unixTime() < startUnix
            || d.times().get(0).unixTime() > endUnix
            ? 0 :
            d.isHighlighted()
                || d.source.isHighlighted()
                || d.target.isHighlighted()
                || d.times().highlighted().size() > 0
                ? LINK_OPACITY_HIGHLIGHTED
                : LINK_OPACITY_DEFAULT;
    })
        .style('stroke', function (d) { return d.getSelections()[0].showColor ? d.getSelections()[0].color : '#999'; });
    endAnchors
        .style('opacity', function (d) {
        return !d.isVisible()
            || currentNodeOrder[d.target.id()] < nodesScrollStart
            || d.times().get(0).unixTime() < startUnix
            || d.times().get(0).unixTime() > endUnix
            ? 0
            : d.isHighlighted()
                || d.source.isHighlighted()
                || d.target.isHighlighted()
                || d.times().highlighted().size() > 0
                ? LINK_OPACITY_HIGHLIGHTED
                : LINK_OPACITY_DEFAULT;
    })
        .style('fill', function (d) { return d.getSelections()[0].showColor ? d.getSelections()[0].color : '#999'; });
    startAnchors
        .style('opacity', function (d) {
        return !d.isVisible()
            || currentNodeOrder[d.source.id()] < nodesScrollStart
            || d.times().get(0).unixTime() < startUnix
            || d.times().get(0).unixTime() > endUnix
            ? 0
            : d.isHighlighted()
                || d.source.isHighlighted()
                || d.target.isHighlighted()
                || d.times().highlighted().size() > 0
                ? LINK_OPACITY_HIGHLIGHTED
                : LINK_OPACITY_DEFAULT;
    })
        .style('fill', function (d) { return d.getSelections()[0].showColor ? d.getSelections()[0].color : '#999'; });
}
function updateNodes() {
    d3.selectAll('.nodeLabel')
        .style('font-weight', function (d) { return d.isHighlighted() || d.links().highlighted().size() > 0 || d.neighbors().highlighted().size() > 0 ? 900 : NODE_LABEL_WEIGHT; })
        .style('text-decoration', function (d) { return d.isHighlighted() ? 'underline' : 'none'; })
        .style('fill', function (d) {
        var color = undefined;
        if (d.isSelected()) {
            color = networkcube.getPriorityColor(d);
        }
        if (!color)
            color = NODE_LABEL_COLOR;
        return color;
    })
        .style('opacity', function (n) { return currentNodeOrder[n.id()] >= nodesScrollStart ? n == egoNode ? 1 : NODE_OPACITY : 0; })
        .text(function (n) { return egoNode == n ? 'EGO-->' + n.label() + ' (' + n.neighbors().size() + ')' : n.label() + ' (' + n.neighbors().size() + ')'; });
}
function updateNodePositions(duration) {
    d3.selectAll('.nodeLabel')
        .transition().duration(duration)
        .attr('y', function (d) { return MARGIN_TOP + nodeYPosFunction(currentNodeOrder[d.id()]) + ROW_HEIGHT - 5; })
        .style('opacity', function (n) { return currentNodeOrder[n.id()] >= nodesScrollStart ? n == egoNode ? 1 : NODE_OPACITY : 0; });
}
function updateLinkPositions() {
    var _this = this;
    var y1, y2, yOffset, points;
    startAnchors
        .attr('y', function (l, i) {
        y1 = _this.nodeYPosFunction(currentNodeOrder[l.source.id()]);
        yOffset = ROW_HEIGHT / 2;
        return -(y1 + yOffset) + ANCHOR_START_DIAMETER / 2;
    });
    endAnchors
        .attr('y', function (l, i) {
        y2 = _this.nodeYPosFunction(currentNodeOrder[l.target.id()]);
        yOffset = ROW_HEIGHT / 2;
        return -(y2 + yOffset) + ANCHOR_END_DIAMETER / 2;
    });
    arcs
        .attr('d', function (l) { return makeArcPath(l); });
}
function mouseWheelHandler(event) {
    event.preventDefault();
    if (event.wheelDelta == 0
        || nodesScrollStart >= nodes.length - 5 && event.wheelDelta < 0
        || nodesScrollStart == 0 && event.wheelDelta > 0) {
        return;
    }
    var dir = event.wheelDelta > 0 ? -1 : 1;
    nodesScrollStart += SCROLL_CHUNK * dir;
    nodesScrollStart = Math.max(0, Math.min(nodes.length - 1, nodesScrollStart));
    nodeYPosFunction.domain([nodesScrollStart, nodes.length - 1])
        .range([TABLE_TOP + ROW_HEIGHT, TABLE_TOP + ROW_HEIGHT * (nodes.length - nodesScrollStart)]);
    rowBars
        .attr('y', function (d, i) { return -nodeYPosFunction(i * 2); })
        .style('opacity', function (d, i) { return (i * 2) < (nodesScrollStart) || i * 2 > globalNodeOrder.length ? 0 : 1; });
    updateLinkPositions();
    updateNodePositions(0);
    updateLinks();
    updateNodes();
    webgl.render();
}
function updateGlobalOrder(validNodes) {
    if (validNodes == undefined)
        globalNodeOrder = dgraph.nodes().toArray();
    else
        globalNodeOrder = validNodes;
    var menu = document.getElementById('labelOrdering');
    LABEL_ORDER = menu.options[menu.selectedIndex].value;
    if (LABEL_ORDER == 'alphanumerical') {
        globalNodeOrder.sort(compareFunc);
    }
    else if (LABEL_ORDER == 'data') {
    }
    else if (LABEL_ORDER == 'degree') {
        globalNodeOrder.sort(function (a, b) {
            return b.neighbors().length - a.neighbors().length;
        });
    }
    else if (LABEL_ORDER == 'similarity') {
        var config = new networkcube.OrderingConfiguration();
        config.start = times[0];
        config.end = times[times.length - 1];
        config.nodes = globalNodeOrder;
        config.links = dgraph.links().presentIn(config.start, config.end).visible().toArray();
        var nodeOrder = networkcube.orderNodes(dgraph, config);
        globalNodeOrder = [];
        for (var i = 0; i < nodeOrder.length; i++) {
            globalNodeOrder.push(dgraph.node(nodeOrder[i]));
        }
    }
    console.log('globalNodeOrder', globalNodeOrder);
    updateCurrentOrder();
}
function compareFunc(a, b) {
    return a.label() < b.label() ? -1 : 1;
}
function makeArcPath(link) {
    var y1p = nodeYPosFunction(currentNodeOrder[link.source.id()]);
    var y2p = nodeYPosFunction(currentNodeOrder[link.target.id()]);
    var y1 = Math.min(y1p, y2p);
    var y2 = Math.max(y2p, y1p);
    var points = [];
    points.push({ x: 0, y: -y1 });
    points.push({ x: 0 + Math.abs(y1 - y2) / 5, y: -(y1 + (y2 - y1) / 6) });
    points.push({ x: 0 + Math.abs(y1 - y2) / 5, y: -(y2 - (y2 - y1) / 6) });
    points.push({ x: 0, y: -y2 });
    var vectors = [];
    for (var i = 0; i < points.length; i++) {
        vectors.push(new THREE.Vector2(points[i].x, points[i].y));
    }
    return glutils.curve(points);
}
function showEgoNetwork(n) {
    if (egoNode == n) {
        egoNode = undefined;
        updateGlobalOrder();
    }
    else {
        egoNode = n;
        var a = egoNode.neighbors().removeDuplicates().toArray();
        if (a.indexOf(egoNode) == -1)
            a.push(egoNode);
        updateGlobalOrder(a);
    }
    d3.selectAll('.nodeLabel')
        .style('opacity', function (n) { return currentNodeOrder[n.id()] >= nodesScrollStart ? n == egoNode ? 1 : NODE_OPACITY : 0; });
    rowBars
        .attr('y', function (d, i) { return -nodeYPosFunction(i * 2); })
        .style('opacity', function (d, i) { return (i * 2) < (nodesScrollStart) || i * 2 > globalNodeOrder.length ? 0 : 1; });
}
