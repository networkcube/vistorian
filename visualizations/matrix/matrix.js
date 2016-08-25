var _this = this;
var COLOR_HIGHLIGHT = 0x000000;
var COLOR_SELECTION = 0xff0000;
var COLOR_CELL_DEFAULT = 0x000000;
var COLOR_CELL_FILTER = 0xdddddd;
var NMargin = (function () {
    function NMargin(v) {
        this.left = v;
        this.top = v;
    }
    return NMargin;
})();
var vizWidth;
var vizHeight;
var urlVars = networkcube.getUrlVars();
vizWidth = window.innerWidth;
vizHeight = window.innerHeight;
var margin = new NMargin(10);
var dgraph = networkcube.getDynamicGraph();
var startTime = dgraph.startTime;
var endTime = dgraph.endTime;
var nodeOrder = [];
var guidelines = [];
var cellsize = 12;
var hoveredLinks = [];
var longestLabelNode = dgraph.nodes().toArray().reduce(function (p, v, i, arr) {
    if (p == null || p.label() == null || (v.label() && v.label().length > p.label().length))
        return v;
    else
        return p;
});
var labelLength = longestLabelNode ? longestLabelNode.label().length : 8;
var plotMargin = calculatePlotMargin();
$('body').append('<div id="menu"></div>');
$('#menu').append('Zoom:  <input id="cellSizeBox" type="range" name="cellSizeBox" min="3" max="20" onchange="updateCellSize()" value="12"/>');
$("#menu").append('<br/>');
$("#menu").append('<label>Label ordering:</label>');
var orderingMenu = $("#menu").append('<select id="labelOrdering" onchange="reorderHandler()"></select>');
$('#labelOrdering').append('<option value="none">---</option>');
$('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
$('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
$('#labelOrdering').append('<option value="degree">Node degree</option>');
$('#labelOrdering').append('<option value="similarity">Similarity</option>');
$('#menu').append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');
$('#dataName').text(dgraph.name);
networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);
window.addEventListener("mousewheel", function (e) {
    event.preventDefault();
    if (event.wheelDelta > 0)
        cellsize *= Math.abs(event.wheelDelta / 100);
    else
        cellsize /= Math.abs(event.wheelDelta / 100);
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
}, false);
$('body').append('<div id="timelineDiv"></div>');
var timeSvg = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', vizWidth)
    .attr('height', 50);
var timeSlider = new TimeSlider(dgraph, vizWidth);
timeSlider.appendTo(timeSvg);
var linkWeightScale = d3.scale.linear().range([0.1, 1]);
var totalWidth = Math.max(Math.max(cellsize * dgraph.nodes().length + 50, window.innerWidth), window.innerHeight);
$('body').append('<div id="visDiv"><svg id="visSvg"><foreignObject id="visCanvasFO"></foreignObject></svg></div>');
var svg = d3.select('#visSvg')
    .attr('width', totalWidth + plotMargin.left)
    .attr('height', totalWidth + plotMargin.top);
nodeOrder = dgraph.nodes().ids();
var vertexShaderProgram = "attribute vec4 customColor;varying vec4 vColor;void main() {vColor = customColor;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );}";
var fragmentShaderProgram = "varying vec4 vColor;void main() {gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);}";
var scene;
var camera;
var renderer;
var geometry;
var mesh;
var attributes = {
    customColor: { type: 'c', value: [] }
};
var shaderMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: vertexShaderProgram,
    fragmentShader: fragmentShaderProgram,
    linewidth: 2
});
shaderMaterial.blending = THREE.NormalBlending;
shaderMaterial.depthTest = true;
shaderMaterial.transparent = true;
shaderMaterial.side = THREE.DoubleSide;
var crosses = [];
scene = new THREE.Scene();
var canvasWidth = totalWidth + plotMargin.left;
camera = new THREE.OrthographicCamera(canvasWidth / -2, canvasWidth / 2, canvasWidth / 2, canvasWidth / -2, 0, 1000);
scene.add(camera);
camera.position.x = canvasWidth / 2;
camera.position.y = -canvasWidth / 2;
camera.position.z = 100;
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvasWidth, canvasWidth);
renderer.setClearColor(0xffffff, 1);
var raycaster = new THREE.Raycaster();
var canvas = renderer.domElement;
canvas.addEventListener('mousemove', function (e) {
    _this.mouseMoveHandler(e);
});
canvas.addEventListener('mousedown', function (e) {
    _this.mouseDownHandler(e);
});
canvas.addEventListener('mouseup', function (e) {
    _this.mouseUpHandler(e);
});
canvas.addEventListener('click', function (e) {
    _this.clickHandler(e);
});
glutils.setWebGL(scene, camera, renderer, canvas);
var cellLabelBackground = glutils.selectAll()
    .data([{ id: 0 }])
    .append('rect')
    .attr('width', 70)
    .attr('height', 22)
    .attr('x', 0)
    .attr('y', 0)
    .style('fill', 0xffffff)
    .style('stroke', 0xffffff)
    .style('opacity', 0);
var cellLabel = glutils.selectAll()
    .data([{ id: 0 }])
    .append('text')
    .style('opacity', 0)
    .attr('z', 2)
    .style('font-size', 12);
$('#visCanvasFO').append(canvas);
d3.select('#visCanvasFO')
    .attr('x', plotMargin.left)
    .attr('y', plotMargin.top)
    .attr('width', totalWidth + plotMargin.left)
    .attr('height', totalWidth + plotMargin.top);
geometry = new THREE.BufferGeometry();
var vertexColors = [];
var cellHighlightFrames = networkcube.array(undefined, dgraph.links().length);
var cellSelectionFrames = networkcube.array(undefined, dgraph.links().length);
var d = [];
var di = -1;
var UpdateOptions;
(function (UpdateOptions) {
    UpdateOptions[UpdateOptions["Nodes"] = 1] = "Nodes";
    UpdateOptions[UpdateOptions["Links"] = 2] = "Links";
    UpdateOptions[UpdateOptions["Geometry"] = 4] = "Geometry";
    UpdateOptions[UpdateOptions["NodeOrdering"] = 15] = "NodeOrdering";
    UpdateOptions[UpdateOptions["PlotLocation"] = 23] = "PlotLocation";
    UpdateOptions[UpdateOptions["Standard"] = 7] = "Standard";
    UpdateOptions[UpdateOptions["All"] = 65535] = "All";
})(UpdateOptions || (UpdateOptions = {}));
updateAll(UpdateOptions.All);
function calculatePlotMargin() {
    return new NMargin(((labelLength * 0.75) + 1) * cellsize);
}
function updateAll(updateOptions) {
    if ((updateOptions & UpdateOptions.PlotLocation) == UpdateOptions.PlotLocation) {
        plotMargin = calculatePlotMargin();
        d3.select('#visCanvasFO')
            .attr('x', plotMargin.left)
            .attr('y', plotMargin.top);
    }
    if ((updateOptions & UpdateOptions.NodeOrdering) == UpdateOptions.NodeOrdering)
        reorderWorker();
    if ((updateOptions & UpdateOptions.Geometry) == UpdateOptions.Geometry)
        updateGeometry();
    if ((updateOptions & UpdateOptions.Links) == UpdateOptions.Links)
        updateLinks();
    if ((updateOptions & UpdateOptions.Nodes) == UpdateOptions.Nodes)
        updateNodes();
    render();
}
function updateGeometry() {
    d = [];
    var vertexPositions = [];
    vertexColors = [];
    if (geometry) {
        scene.remove(mesh);
    }
    for (var i = 0; i < crosses.length; i++) {
        scene.remove(crosses[i]);
    }
    var e, row, col;
    var c;
    var x, y, z;
    var color_web;
    var color;
    var pairs = dgraph.nodePairs().toArray();
    var links;
    var pair;
    var linkNum;
    var seg;
    var presentLinks;
    var c;
    var meanWeight;
    linkWeightScale.domain([
        0,
        dgraph.links().weights().max()
    ]);
    var highlightFrames;
    var selectionFrames;
    var frame;
    var frame2;
    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i];
        links = pair.links().toArray();
        linkNum = links.length;
        seg = cellsize / linkNum;
        if (!pair.source.isVisible()
            || !pair.target.isVisible()) {
            continue;
        }
        row = nodeOrder[pair.source.id()];
        col = nodeOrder[pair.target.id()];
        var color2;
        var cross;
        for (var j = 0; j < links.length; j++) {
            e = links[j];
            x = 10 + col * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = 10 + row * cellsize;
            z = 1;
            e.x = x;
            e.y = y;
            if (e.weights() != undefined) {
                meanWeight = e.weights(startTime, endTime).mean();
            }
            else {
                meanWeight = 1;
            }
            color = new THREE.Color(0, 0, 0);
            c = linkWeightScale(Math.abs(meanWeight));
            if (meanWeight > 0) {
                glutils.addBufferedRect(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c]);
            }
            else {
                glutils.addBufferedDiamond(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c]);
            }
            highlightFrames = new THREE.Mesh();
            frame = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_HIGHLIGHT, 1);
            frame.position.x = x;
            frame.position.y = -y;
            frame.position.z = 10;
            highlightFrames.add(frame);
            cellHighlightFrames[e.id()] = highlightFrames;
            selectionFrames = new THREE.Mesh();
            frame = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_SELECTION, 2);
            frame.position.x = x;
            frame.position.y = -y;
            frame.position.z = 9;
            selectionFrames.add(frame);
            cellSelectionFrames[e.id()] = selectionFrames;
            x = 10 + row * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = 10 + col * cellsize;
            z = 1;
            if (meanWeight > 0) {
                glutils.addBufferedRect(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c]);
            }
            else {
                glutils.addBufferedDiamond(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c]);
            }
            frame2 = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_HIGHLIGHT, 1);
            frame2.position.x = x;
            frame2.position.y = -y;
            frame2.position.z = 10;
            highlightFrames.add(frame2);
            frame2 = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_SELECTION, 2);
            frame2.position.x = x;
            frame2.position.y = -y;
            frame.position.z = 9;
            selectionFrames.add(frame2);
        }
    }
    geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(glutils.makeBuffer3f(vertexPositions), 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(glutils.makeBuffer4f(vertexColors), 4));
    mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    for (var i = 0; i < guidelines.length; i++) {
        scene.remove(guidelines[i]);
    }
    var num = dgraph.nodes().visible().length;
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(num * cellsize, 0, 0));
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -num * cellsize, 0));
    var m;
    var mat = new THREE.LineBasicMaterial({ color: 0xeeeeee, linewidth: 1 });
    var x, y;
    for (var i = 0; i <= num; i++) {
        x = 10 + col * cellsize - cellsize / 2;
        y = 10 + row * cellsize;
        m = new THREE.Line(geometry1, mat);
        m.position.set(10 - cellsize / 2, -(10 + i * cellsize - cellsize / 2), 0);
        scene.add(m);
        guidelines.push(m);
        m = new THREE.Line(geometry2, mat);
        m.position.set(10 + i * cellsize - cellsize / 2, -(10 - cellsize / 2), 0);
        scene.add(m);
        guidelines.push(m);
    }
}
function updateNodes() {
    var _this = this;
    var color;
    var labelsLeft = svg.selectAll('.labelsLeft')
        .data(dgraph.nodes().visible().toArray());
    labelsLeft.enter().append('text')
        .attr('id', function (d, i) { return 'nodeLabel_left_' + i; })
        .attr('class', 'labelsLeft nodeLabel')
        .attr('text-anchor', 'end')
        .attr('x', plotMargin.left - 10)
        .attr('y', function (d, i) { return plotMargin.top + cellsize * nodeOrder[d.id()] + cellsize; })
        .on('mouseover', function (d, i) {
        networkcube.highlight('set', { nodes: [d] });
    })
        .on('mouseout', function (d, i) {
        networkcube.highlight('reset');
    })
        .on('click', function (d, i) {
        var selections = d.getSelections();
        var currentSelection = _this.dgraph.getCurrentSelection();
        for (var j = 0; j < selections.length; j++) {
            if (selections[j] == currentSelection) {
                networkcube.selection('remove', { nodes: [d] });
                return;
            }
        }
        networkcube.selection('add', { nodes: [d] });
    });
    labelsLeft.exit().remove();
    labelsLeft
        .text(function (d, i) { return d.label(); })
        .attr('x', plotMargin.left - 10)
        .attr('y', function (d, i) {
        return plotMargin.top + cellsize * nodeOrder[d.id()] + 12;
    });
    var labelsTop = svg.selectAll('.labelsTop')
        .data(dgraph.nodes().visible().toArray());
    labelsTop.enter().append('text')
        .attr('id', function (d, i) { return 'nodeLabel_top_' + i; })
        .attr('class', 'labelsTop nodeLabel')
        .text(function (d, i) { return d.label(); })
        .attr('x', function (d, i) { return plotMargin.left + cellsize * nodeOrder[d.id()] + cellsize; })
        .attr('y', plotMargin.left - 10)
        .attr('transform', function (d, i) { return 'rotate(-90, ' + (plotMargin.top + cellsize * i + cellsize) + ', ' + (plotMargin.left - 10) + ')'; })
        .on('mouseover', function (d, i) {
        networkcube.highlight('set', { nodes: [d] });
    })
        .on('mouseout', function (d, i) {
        networkcube.highlight('reset');
    })
        .on('click', function (d, i) {
        var selections = d.getSelections();
        var currentSelection = _this.dgraph.getCurrentSelection();
        for (var j = 0; j < selections.length; j++) {
            if (selections[j] == currentSelection) {
                networkcube.selection('remove', { nodes: [d] });
                return;
            }
        }
        networkcube.selection('add', { nodes: [d] });
    });
    labelsTop.exit().remove();
    labelsTop
        .text(function (d, i) { return d.label(); })
        .attr('x', function (d, i) {
        return plotMargin.left + cellsize * nodeOrder[d.id()] + 12;
    })
        .attr('y', plotMargin.top - 10)
        .attr('transform', function (d, i) { return 'rotate(-90, ' + (plotMargin.top + cellsize * nodeOrder[d.id()] + 12) + ', ' + (plotMargin.left - 10) + ')'; });
    svg.selectAll('.nodeLabel')
        .style('fill', function (d) {
        color = undefined;
        if (d.isSelected()) {
            color = networkcube.getPriorityColor(d);
        }
        if (!color)
            color = '#000000';
        return color;
    })
        .style('font-weight', function (d) {
        if (d.isHighlighted()) {
            return 900;
        }
        return 100;
    })
        .style('font-size', cellsize);
    var highlightedLinks = dgraph.links().highlighted().toArray();
    for (var i = 0; i < highlightedLinks.length; i++) {
        if (!highlightedLinks[i].isVisible())
            continue;
        d3.selectAll('#nodeLabel_left_' + highlightedLinks[i].source.id())
            .style('font-weight', 900);
        d3.selectAll('#nodeLabel_top_' + highlightedLinks[i].target.id())
            .style('font-weight', 900);
        d3.selectAll('#nodeLabel_top_' + highlightedLinks[i].source.id())
            .style('font-weight', 900);
        d3.selectAll('#nodeLabel_left_' + highlightedLinks[i].target.id())
            .style('font-weight', 900);
    }
}
var linkLabel;
function updateLinks() {
    var frame;
    var selections;
    var webColor;
    var glColor, glColor2;
    var links;
    var pairs = dgraph.nodePairs().toArray();
    var l;
    var alpha;
    var vertexColors = [];
    for (var j = 0; j < pairs.length; j++) {
        links = pairs[j].links().toArray();
        for (var i = 0; i < links.length; i++) {
            l = links[i];
            scene.remove(cellHighlightFrames[l.id()]);
            webColor = networkcube.getPriorityColor(l);
            if (!webColor)
                webColor = '#000000';
            if (!l.isVisible()) {
                alpha = 0;
            }
            else {
                if ((l.isHighlighted()
                    || l.source.isHighlighted()
                    || l.target.isHighlighted())
                    && l.source.isVisible()
                    && l.target.isVisible()) {
                    scene.add(cellHighlightFrames[l.id()]);
                }
                alpha = linkWeightScale(Math.abs(l.weights(startTime, endTime).mean()));
                if (!alpha) {
                    alpha = 0;
                }
            }
            glColor = new THREE.Color(webColor);
            vertexColors.push([glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha]);
            vertexColors.push([glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha], [glColor.r, glColor.g, glColor.b, alpha]);
        }
    }
    glutils.updateBuffer(geometry.attributes['customColor'].array, vertexColors, 4);
    geometry.attributes['customColor'].needsUpdate = true;
}
function render() {
    var d = new Date();
    var begin = d.getTime();
    renderer.render(scene, camera);
    d = new Date();
}
function timeRangeHandler(m) {
    startTime = dgraph.time(m.startId);
    endTime = dgraph.time(m.endId);
    timeSlider.set(startTime, endTime);
    updateAll(UpdateOptions.Standard);
}
function updateCellSize() {
    cellsize = parseInt(document.getElementById("cellSizeBox").value);
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
}
var links;
var l;
var mx;
var my;
var previousHoveredLinks = [];
var mouseDown = false;
var mouseDownPos = { x: 0, y: 0 };
function mouseMoveHandler(e) {
    var mpos = glutils.getMousePos(canvas, e.clientX, e.clientY);
    var mx = mpos.x;
    var my = mpos.y;
    previousHoveredLinks = hoveredLinks;
    hoveredLinks = [];
    links = dgraph.links().toArray().filter(function (v, i, arr) {
        if (!v.source.isVisible() || !v.target.isVisible())
            return false;
        else
            return true;
    });
    if (!mouseDown) {
        for (var i = 0; i < links.length; i++) {
            l = links[i];
            if (mx > l.x - cellsize / 2
                && mx < l.x + cellsize / 2
                && my > l.y - cellsize / 2
                && my < l.y + cellsize / 2) {
                hoveredLinks.push(l);
                break;
            }
        }
        if (hoveredLinks.length == 0) {
            for (var i = 0; i < links.length; i++) {
                l = links[i];
                if (my > l.x - cellsize / 2
                    && my < l.x + cellsize / 2
                    && mx > l.y - cellsize / 2
                    && mx < l.y + cellsize / 2) {
                    hoveredLinks.push(l);
                    break;
                }
            }
        }
    }
    else {
        var box = new networkcube.Box(mx, my, mouseDownPos.x, mouseDownPos.y);
        for (var i = 0; i < links.length; i++) {
            l = links[i];
            if (networkcube.inBox(l.x, l.y, box)) {
                hoveredLinks.push(l);
            }
        }
        for (var i = 0; i < links.length; i++) {
            l = links[i];
            if (networkcube.inBox(l.y, l.x, box)) {
                hoveredLinks.push(l);
            }
        }
    }
    if (hoveredLinks.length > 0 && !networkcube.isSame(hoveredLinks, previousHoveredLinks)) {
        console.log('999');
        cellLabel
            .attr('x', mx + 40)
            .attr('y', -my)
            .style('opacity', 1)
            .text(getCellWeightLabel(hoveredLinks[0]));
        cellLabelBackground
            .attr('x', mx + 10)
            .attr('y', -my + 11)
            .style('opacity', .8);
        networkcube.highlight('set', { links: hoveredLinks });
    }
    else if (hoveredLinks.length == 0 && dgraph.links().highlighted().length > 0) {
        networkcube.highlight('reset');
    }
}
function mouseDownHandler(e) {
    mouseDown = true;
    mouseDownPos = glutils.getMousePos(canvas, e.clientX, e.clientY);
}
function mouseUpHandler(e) {
    mouseDown = false;
    if (!networkcube.isSame(hoveredLinks, previousHoveredLinks)) {
        if (hoveredLinks.length > 0) {
            if (!hoveredLinks[0].isSelected()) {
                networkcube.selection('add', { links: hoveredLinks });
            }
            else {
                var selections = hoveredLinks[0].getSelections();
                var currentSelection = this.dgraph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', { links: hoveredLinks });
                        return;
                    }
                }
                networkcube.selection('add', { links: hoveredLinks });
            }
        }
    }
}
function clickHandler(e) {
    console.log('click', hoveredLinks.length);
    if (hoveredLinks.length > 0) {
        if (!hoveredLinks[0].isSelected()) {
            networkcube.selection('add', { links: hoveredLinks });
        }
        else {
            var selections = hoveredLinks[0].getSelections();
            var currentSelection = this.dgraph.getCurrentSelection();
            for (var j = 0; j < selections.length; j++) {
                if (selections[j] == currentSelection) {
                    networkcube.selection('remove', { links: hoveredLinks });
                    return;
                }
            }
            networkcube.selection('add', { links: hoveredLinks });
        }
    }
}
function updateEvent(m) {
    var opts = UpdateOptions.Links | UpdateOptions.Nodes;
    if (m.type == 'filter'
        || m.type == 'timeRange') {
        opts |= UpdateOptions.Geometry | UpdateOptions.NodeOrdering;
    }
    updateAll(opts);
}
function reorderHandler() {
    updateAll(UpdateOptions.All);
}
function reorderWorker() {
    var menu = document.getElementById('labelOrdering');
    var orderType = menu.options[menu.selectedIndex].value;
    if (orderType == 'alphanumerical') {
        var nodes2 = dgraph.nodes().visible().sort('label').toArray();
        nodeOrder = [];
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    }
    else if (orderType == 'reverse-alpha') {
        var nodes2 = dgraph.nodes().visible().sort('label', false).toArray();
        nodeOrder = [];
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    }
    else if (orderType == 'degree') {
        var nodes2 = dgraph.nodes().visible()
            .createAttribute('degree', function (n) {
            return n.neighbors().length;
        })
            .sort('degree').toArray();
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    }
    else if (orderType == 'similarity') {
        var config = new networkcube.OrderingConfiguration();
        config.start = startTime;
        config.end = endTime;
        config.nodes = dgraph.nodes().visible().toArray();
        config.links = dgraph.links().presentIn(startTime, endTime).visible().toArray();
        nodeOrder = networkcube.orderNodes(dgraph, config);
    }
    else {
        var visibleNodes = dgraph.nodes().visible().toArray();
        nodeOrder = [];
        for (var i = 0; i < visibleNodes.length; i++) {
            nodeOrder[visibleNodes[i].id()] = i;
        }
    }
}
function getCellWeightLabel(l) {
    var val = hoveredLinks[0].weights(startTime, endTime).get(0);
    return Math.round(val * 1000) / 1000;
}
//# sourceMappingURL=matrix.js.map