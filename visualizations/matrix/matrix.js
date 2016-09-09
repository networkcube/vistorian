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
}());
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
var firstLeftVisible = 0;
var firstTopVisible = 0;
var bbox = { x0: 0, x1: 0, y0: 0, y1: 0 };
var leftLabelOffset = 0;
var topLabelOffset = 0;
var guidelines = [];
var initialCellSize = 12;
var cellsize = initialCellSize;
var hoveredLinks = [];
var longestLabelNode = dgraph.nodes().toArray().reduce(function (p, v, i, arr) {
    if (p == null || p.label() == null || (v.label() && v.label().length > p.label().length))
        return v;
    else
        return p;
});
var labelLength = longestLabelNode ? longestLabelNode.label().length : 8;
var plotMargin = calculatePlotMargin();
$('body').append('<div id="networkcube-matrix-menu"></div>');
<<<<<<< HEAD
$('#networkcube-matrix-menu').append('Zoom:  <input id="cellSizeBox" type="range" name="cellSizeBox" min="3" max="20" onchange="updateCellSize()" value="' + initialCellSize + '"/>');
=======
$('#networkcube-matrix-menu').append('Zoom:  <input id="cellSizeBox" type="range" name="cellSizeBox" min="3" max="20" onchange="updateCellSize()" value="12"/>');
>>>>>>> dev
$("#networkcube-matrix-menu").append('<br/>');
$("#networkcube-matrix-menu").append('<label>Label ordering:</label>');
var orderingMenu = $("#networkcube-matrix-menu").append('<select id="labelOrdering" onchange="reorderHandler()"></select>');
$('#labelOrdering').append('<option value="none">---</option>');
$('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
$('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
$('#labelOrdering').append('<option value="degree">Node degree</option>');
$('#labelOrdering').append('<option value="similarity">Similarity</option>');
$('#networkcube-matrix-menu').append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');
$('#dataName').text(dgraph.name);
networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);
<<<<<<< HEAD
=======
window.addEventListener("mousewheel", function (e) {
    event.preventDefault();
    if (event.wheelDelta > 0)
        cellsize *= Math.abs(event.wheelDelta / 100);
    else
        cellsize /= Math.abs(event.wheelDelta / 100);
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
}, false);
>>>>>>> dev
$('body').append('<div id="networkcube-matrix-timelineDiv"></div>');
var timeSvg = d3.select('#networkcube-matrix-timelineDiv')
    .append('svg')
    .attr('width', vizWidth - 20)
    .attr('height', 50);
var timeSlider = new TimeSlider(dgraph, vizWidth);
timeSlider.appendTo(timeSvg);
var linkWeightScale = d3.scale.linear().range([0.1, 1]);
<<<<<<< HEAD
var totalWidth = window.innerWidth - 10;
var totalHeight = window.innerHeight - 110;
$('body').append('<div id="networkcube-matrix-visDiv"><svg id="networkcube-matrix-visSvg"><foreignObject id="networkcube-matrix-visCanvasFO"></foreignObject></svg></div>');
var svg = d3.select('#networkcube-matrix-visSvg')
    .attr('width', totalWidth)
    .attr('height', totalHeight);
=======
var totalWidth = Math.max(Math.max(cellsize * dgraph.nodes().length + 50, window.innerWidth), window.innerHeight);
$('body').append('<div id="networkcube-matrix-visDiv"><svg id="networkcube-matrix-visSvg"><foreignObject id="networkcube-matrix-visCanvasFO"></foreignObject></svg></div>');
var svg = d3.select('#networkcube-matrix-visSvg')
    .attr('width', totalWidth + plotMargin.left)
    .attr('height', totalWidth + plotMargin.top);
>>>>>>> dev
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
var canvasWidth = totalWidth - plotMargin.left;
var canvasHeight = totalHeight - plotMargin.top;
camera = new THREE.OrthographicCamera(canvasWidth / -2, canvasWidth / 2, canvasHeight / 2, canvasHeight / -2, 0, 1000);
scene.add(camera);
camera.position.x = canvasWidth / 2;
camera.position.y = -canvasHeight / 2;
camera.position.z = 100;
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvasWidth, canvasHeight);
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
<<<<<<< HEAD
    .style('font-size', initialCellSize);
=======
    .style('font-size', 12);
>>>>>>> dev
$('#networkcube-matrix-visCanvasFO').append(canvas);
d3.select('#networkcube-matrix-visCanvasFO')
    .attr('x', plotMargin.left)
    .attr('y', plotMargin.top)
    .attr('width', totalWidth)
    .attr('height', totalHeight);
var view = d3.select(canvas);
zoom = d3.behavior.zoom()
    .scaleExtent([0.2, 4])
    .on('zoom', zoomed);
view.call(zoom);
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
    UpdateOptions[UpdateOptions["PlotLocation"] = 19] = "PlotLocation";
    UpdateOptions[UpdateOptions["Standard"] = 7] = "Standard";
    UpdateOptions[UpdateOptions["All"] = 65535] = "All";
})(UpdateOptions || (UpdateOptions = {}));
updateAll(UpdateOptions.All);
function calculatePlotMargin() {
    return new NMargin(((labelLength * 0.75) + 1) * cellsize);
}
function updateAll(updateOptions) {
    if ((updateOptions & UpdateOptions.PlotLocation) == UpdateOptions.PlotLocation) {
<<<<<<< HEAD
        updatePlot();
=======
        plotMargin = calculatePlotMargin();
        d3.select('#networkcube-matrix-visCanvasFO')
            .attr('x', plotMargin.left)
            .attr('y', plotMargin.top);
>>>>>>> dev
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
    var savedCellSize = cellsize;
    cellsize = initialCellSize;
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
            x = cellsize / 2 + col * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = cellsize / 2 + row * cellsize;
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
            x = cellsize / 2 + row * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = cellsize / 2 + col * cellsize;
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
        x = cellsize / 2 + col * cellsize - cellsize / 2;
        y = cellsize / 2 + row * cellsize;
        m = new THREE.Line(geometry1, mat);
        m.position.set(cellsize / 2 - cellsize / 2, -(cellsize / 2 + i * cellsize - cellsize / 2), 0);
        scene.add(m);
        guidelines.push(m);
        m = new THREE.Line(geometry2, mat);
        m.position.set(cellsize / 2 + i * cellsize - cellsize / 2, -(cellsize / 2 - cellsize / 2), 0);
        scene.add(m);
        guidelines.push(m);
    }
    cellsize = savedCellSize;
}
function zoomed() {
    var x, y, z, _ref;
    z = zoom.scale();
    _ref = zoom.translate(), x = _ref[0], y = _ref[1];
    x = -x + canvasWidth / 2;
    y = y - canvasHeight / 2;
    camera.position.set(x, y, 100);
    camera.zoom = z;
    camera.position.set(x / z, y / z, 100);
    camera.updateProjectionMatrix();
    cellsize = z * initialCellSize;
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
    return render();
}
function visibleBox(w, h, cs, ref) {
    var box = { x0: 0, x1: 0, y0: 0, y1: 0 };
    box.x0 = -Math.floor(ref[0] / cs);
    box.y0 = -Math.floor(ref[1] / cs);
    box.x1 = box.x0 + Math.floor(w / cs);
    box.y1 = box.y0 + Math.floor(h / cs);
    return box;
}
function updatePlot() {
    $("#cellSizeBox").val(cellsize);
    var _ref = zoom.translate();
    bbox = visibleBox(canvasWidth, canvasHeight, cellsize, _ref);
    topLabelOffset = (_ref[0] / cellsize + bbox.x0) * cellsize;
    leftLabelOffset = (_ref[1] / cellsize + bbox.y0) * cellsize;
}
function updateNodes() {
    var _this = this;
    var color;
    var leftNodes = dgraph.nodes().visible().toArray();
    leftNodes = leftNodes.filter(function (d) { return nodeOrder[d.id()] >= bbox.y0 && nodeOrder[d.id()] <= bbox.y1; });
    var labelsLeft = svg.selectAll('.labelsLeft')
        .data(leftNodes);
    var leftLabelPosition = function (nodeId) { return plotMargin.top + leftLabelOffset + cellsize * (nodeOrder[nodeId] - bbox.y0) + cellsize; };
    labelsLeft.enter().append('text')
        .attr('id', function (d, i) { return 'nodeLabel_left_' + d.id(); })
        .attr('class', 'labelsLeft nodeLabel')
        .attr('text-anchor', 'end')
        .attr('x', plotMargin.left - 10)
        .attr('y', function (d, i) { return leftLabelPosition(d.id()); })
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
        .attr('id', function (d, i) { return 'nodeLabel_left_' + d.id(); })
        .text(function (d, i) { return d.label(); })
        .attr('x', plotMargin.left - 10)
        .attr('y', function (d, i) {
        return leftLabelPosition(d.id());
    });
    var topNodes = dgraph.nodes().visible().toArray();
    topNodes = topNodes.filter(function (d) { return nodeOrder[d.id()] >= bbox.x0 && nodeOrder[d.id()] <= bbox.x1; });
    console.log(leftNodes.length);
    console.log(topNodes.length);
    var labelsTop = svg.selectAll('.labelsTop')
        .data(topNodes);
    var topLabelPosition = function (nodeId) { return plotMargin.left + topLabelOffset + cellsize * (nodeOrder[nodeId] - bbox.x0) + cellsize; };
    labelsTop.enter().append('text')
        .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
        .attr('class', 'labelsTop nodeLabel')
        .text(function (d, i) { return d.label(); })
        .attr('x', function (d, i) { return topLabelPosition(d.id()); })
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
        .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
        .text(function (d, i) { return d.label(); })
        .attr('x', function (d, i) {
        return topLabelPosition(d.id());
    })
        .attr('y', plotMargin.top - 10)
        .attr('transform', function (d, i) { return 'rotate(-90, ' + (plotMargin.top + topLabelOffset + cellsize * (nodeOrder[d.id()] - bbox.x0) + cellsize) + ', ' + (plotMargin.left - 10) + ')'; });
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
    cellsize = parseInt($("#cellSizeBox").val());
    var z = cellsize / initialCellSize;
    zoom.scale(z).event(view);
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
}
function transformToOriginal(pos) {
    var z, tr;
    var newPos = { x: 0, y: 0 };
    z = zoom.scale();
    tr = zoom.translate();
    newPos.x = (pos.x - tr[0]) / z;
    newPos.y = (pos.y - tr[1]) / z;
    return newPos;
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
    mpos = transformToOriginal(mpos);
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
            if (mx > l.x - initialCellSize / 2
                && mx < l.x + initialCellSize / 2
                && my > l.y - initialCellSize / 2
                && my < l.y + initialCellSize / 2) {
                hoveredLinks.push(l);
                break;
            }
        }
        if (hoveredLinks.length == 0) {
            for (var i = 0; i < links.length; i++) {
                l = links[i];
                if (my > l.x - initialCellSize / 2
                    && my < l.x + initialCellSize / 2
                    && mx > l.y - initialCellSize / 2
                    && mx < l.y + initialCellSize / 2) {
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
    var z = zoom.scale();
    if (hoveredLinks.length > 0 && !networkcube.isSame(hoveredLinks, previousHoveredLinks)) {
        console.log('999');
        cellLabel
            .attr('x', mx + 40 / z)
            .attr('y', -my)
            .style('opacity', 1)
            .text(getCellWeightLabel(hoveredLinks[0]))
            .style('font-size', initialCellSize / z);
        cellLabelBackground
            .attr('x', mx + 10 / z)
            .attr('y', -my + 11 / z)
            .attr("width", 70 / z)
            .attr("height", 22 / z)
            .style('opacity', .8);
        networkcube.highlight('set', { links: hoveredLinks });
    }
    else if (hoveredLinks.length == 0 && dgraph.links().highlighted().length > 0) {
        networkcube.highlight('reset');
    }
}
function mouseDownHandler(e) {
    if (e.shiftKey) {
        view.on('mousedown.zoom', null);
        mouseDown = true;
        mouseDownPos = glutils.getMousePos(canvas, e.clientX, e.clientY);
        mouseDownPos = transformToOriginal(mouseDownPos);
    }
}
function mouseUpHandler(e) {
    mouseDown = false;
    view.call(zoom);
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