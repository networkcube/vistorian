/// <reference path="../../core/networkcube.d.ts" />
/// <reference path="features.ts" />
/// <reference path="clustering.ts" />
/// <reference path="sorting.ts" />
/// <reference path="../widgets/widgets.d.ts" />
/// <reference path="../utils/animations.d.ts" />




var COLOR_DEFAULT = new THREE.Color(0x000000);
var COLOR_HIGHLIGHT = new THREE.Color(0xff8800);

var OPACITY_DIM: number = .5;

var DURATION: number = 500;

var FONT_SIZE_NODE_LABEL: number = 11;



class NBounds {
    x: number;
    y: number;
    constructor(v1: number, v2?: number) {
        this.x = v1;
        if (v2 == undefined)
            this.y = v1;
        else
            this.y = v2;
    }
}

var width: number;
var height: number;
var urlVars = networkcube.getUrlVars();
if (urlVars['width'])
    this.width = parseInt(urlVars['width']);
else
    this.width = window.innerWidth - 30;
if (urlVars['height'])
    this.height = parseInt(urlVars['height']);
else
    this.height = window.innerHeight - 100;

console.log('>>>', width);

var plotMargin: NBounds = new NBounds(80, 0)
var plotWidth: number = this.width - plotMargin.x * 2;
var plotHeight: number;


// VISUAL STATES
var HIGHT_ROW_DEFAULT: number = 20;
var rowHeight: number = HIGHT_ROW_DEFAULT;
var rowSpacing: number = 0;

// GET DATA
var dgraph: networkcube.DynamicGraph = networkcube.getDynamicGraph();

// times shown/selected in other visualizations
var startTime: networkcube.Time = dgraph.startTime;
var endTime: networkcube.Time = dgraph.endTime;

// times visible at this visualization
var startTimeZoom: networkcube.Time = dgraph.startTime;
var endTimeZoom: networkcube.Time = dgraph.endTime;

plotHeight = rowHeight * dgraph.links().length;
height = plotHeight;


networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);



$('#dataName').text(dgraph.name);

// SVG STUFF
// Timeline
var timeSvg = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', width)
    .attr('height', 50)

var timeSlider: TimeSlider = new TimeSlider(dgraph, plotWidth + 45);
timeSlider.appendTo(timeSvg, plotMargin.x - 10, 0);

timeSvg.append('text')
    .text('Time Range:')
    .attr('x', 0)
    .attr('y', 35)
    .style('font-family', 'Helvetica')
    .style('opacity', 0.5)
    .style('font-size', '10pt')


var timeSvg2 = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', width)
    .attr('height', 50)

var timeZoomSlider: TimeSlider = new TimeSlider(dgraph, plotWidth + 45, timezoomCallback);
timeZoomSlider.appendTo(timeSvg2, plotMargin.x - 10, 0);

timeSvg2.append('text')
    .text('Time Zoom:')
    .attr('x', 0)
    .attr('y', 35)
    .style('font-family', 'Helvetica')
    .style('opacity', 0.5)
    .style('font-size', '10pt')



var linkWeightScale = d3.scale.linear().range([0, (rowHeight - rowSpacing) / 2]);

var svg = d3.select('#visSvg')
    .attr('width', width)
    .attr('height', height)

// order is the reordered array of links ids
// rank gives the position of a link given its id
var order = [];
var rank = [];
// default order of links by id
for (var i = 0; i < dgraph.links().length; i++) {
    order[i] = { id: i, value: i };
    rank[i] = i;
}

var visibleRank: number[];



sortBySimilarity(4);




// Draw labels
var rows = svg.selectAll('.row')
    .data(dgraph.links().toArray())
    .enter()
    .append('g')
    .attr('class', 'row')
    .attr('transform', (d, i) => {
        return 'translate(0, ' + (plotMargin.y + rowHeight * (visibleRank[i] + .6)) + ')';
    });

rows.append('text')
    .datum(function (d) { return d.source; })
    .attr('class', 'labelsLeft nodeLabel')
    .attr('text-anchor', 'end')
    .text((d, i) => { return d.label(); })
    .attr('x', plotMargin.x - 10)
    .on('mouseover', (d, i) => {
        networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
    })
    .on('mouseout', (d, i) => {
        networkcube.highlight('reset');
    })
    .on('click', (d, i) => {
        if (!d.isSelected()) {
            // if this element has not been selected yet,
            // add it to current selection.
            networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
        } else {
            var selections = d.getSelections();
            var currentSelection = this.dgraph.getCurrentSelection();
            for (var j = 0; j < selections.length; j++) {
                if (selections[j] == currentSelection) {
                    networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [d] });
                    return;
                }
            }
            // current selection has not been found among already
            // assigned selections, hence add this selection
            networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
        }
    })
    .style('font-size', FONT_SIZE_NODE_LABEL);

rows.append('text')
    .datum(function (d) { return d.target; })
    .attr('class', 'labelsRight nodeLabel')
    .attr('text-anchor', 'start')
    .text((d, i) => { return d.label(); })
    .attr('x', plotMargin.x + plotWidth + 10)
    .on('mouseover', (d, i) => {
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
    })
    .style('font-size', FONT_SIZE_NODE_LABEL);


// WEB GL

var scene: THREE.Scene;
var camera: THREE.OrthographicCamera;
var renderer: THREE.WebGLRenderer;
var geometry: THREE.BufferGeometry;
var mesh: THREE.Mesh;

// SHADERS`
var attributes = {
    customColor: { type: 'c', value: [] }
}
var shaderMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    blending: THREE.NormalBlending,
    depthTest: true,
    transparent: true,
    side: THREE.DoubleSide,
    linewidth: 2
});

// scene
var scene = new THREE.Scene();

// camera
var camera = new THREE.OrthographicCamera(
    plotWidth / -2,
    plotWidth / 2,
    plotHeight / 2,
    plotHeight / -2,
    0, 11);

scene.add(camera);
camera.position.x = plotWidth / 2;
camera.position.y = -plotHeight / 2;
camera.position.z = 10;

// renderer
renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(plotWidth, plotHeight)
renderer.setClearColor(0xffffff, 1);

// position canvas element containing cells
var canvas: HTMLCanvasElement = renderer.domElement;
canvas.width = plotWidth;
canvas.height = plotHeight;


// set canvas listeners
canvas.addEventListener('mousemove', (e) => { this.mouseMove(e); })
canvas.addEventListener('click', click);

$('#visCanvasFO').append(canvas);
d3.select('#visCanvasFO')
    .attr('x', plotMargin.x)
    .attr('y', plotMargin.y)
    .attr('width', plotWidth)
    .attr('height', plotHeight)


// geometry and mesh
// var geometry:THREE.Geometry = new THREE.Geometry();

var vertexColors: number[][] = [];
var material = new THREE.LineBasicMaterial({ color: 0x000000 });
class WaveShape {
    positive;
    negative;
}
var waveShapes: WaveShape[] = [];
var stepWidth: number;
var stretchFactorX = 1;
var stretchFactorY = 1;

var waveHighlightFrames: THREE.Mesh[] = []
var waveSelectionFrames: THREE.Mesh[] = []


// CREATE DIM LAYER RECTANGLES
var rectLength = plotWidth;
var dimLayerLeft = new THREE.Shape();
dimLayerLeft.moveTo(0, 0);
dimLayerLeft.lineTo(0, -plotHeight);
dimLayerLeft.lineTo(-rectLength, -plotHeight);
dimLayerLeft.lineTo(-rectLength, 0);
// dimLayerLeft.lineTo( 0, 0, 1);
dimLayerLeft.lineTo(0, 0);

var rectGeomLeft = new THREE.ShapeGeometry(dimLayerLeft);
var rectMeshLeft = new THREE.Mesh(rectGeomLeft, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
rectMeshLeft.position.set(0, 0, 1)
rectMeshLeft.material.opacity = OPACITY_DIM;
scene.add(rectMeshLeft);

var dimLayerRight = new THREE.Shape();
dimLayerRight.moveTo(0, 0);
dimLayerRight.lineTo(0, -plotHeight);
dimLayerRight.lineTo(rectLength, -plotHeight);
dimLayerRight.lineTo(rectLength, 0);
// dimLayerRight.lineTo( 0, 0, 1);
dimLayerRight.lineTo(0, 0);

var rectGeomRight = new THREE.ShapeGeometry(dimLayerRight);
var rectMeshRight = new THREE.Mesh(rectGeomRight, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
rectMeshRight.position.set(plotWidth, 0, 1)
rectMeshRight.material.opacity = OPACITY_DIM;
scene.add(rectMeshRight);

update();

function update() {

    updateLinkGeometry();
    updateLinks();
    updateNodes();
    render();
}

function updateLinkGeometry() {

    // var curve:THREE.Curve;
    // var path:THREE.Path;
    var splineObject: THREE.Line;
    var pointsPositiveTop: THREE.Vector2[];
    var pointsNegativeTop: THREE.Vector2[];
    var pointsPositiveBottom: THREE.Vector2[];
    var pointsNegativeBottom: THREE.Vector2[];
    var link: networkcube.Link;
    var weights: number[];
    var waveShape: WaveShape;
    // var geometry:THREE.Geometry;
    stepWidth = plotWidth / (endTime.id() - startTime.id());

    // stepWidth = 1;
    linkWeightScale.domain([0, Math.max(dgraph.links().weights().max(), dgraph.links().weights().min())]);
    for (var i = 0; i < waveShapes.length; i++) {
        if (waveShapes[i].positive)
            scene.remove(waveShapes[i].positive);
        if (waveShapes[i].negative)
            scene.remove(waveShapes[i].negative);
    }
    waveShapes = [];

    var isPositive: boolean;
    for (var i = 0; i < dgraph.links().length; i++) {

        link = dgraph.link(order[i].id);
        weights = link.weights(startTime, endTime).toArray();
        // create points
        pointsPositiveTop = [];
        pointsNegativeTop = [];
        pointsPositiveBottom = [];
        pointsNegativeBottom = [];

        isPositive = weights[0] >= 0;
        waveShape = new WaveShape();
        waveShapes.push(waveShape);

        pointsNegativeTop.push(new THREE.Vector2(0, 0));
        pointsNegativeBottom.push(new THREE.Vector2(0, 0));
        pointsPositiveTop.push(new THREE.Vector2(0, 0));
        pointsPositiveBottom.push(new THREE.Vector2(0, 0));


        for (var j = 0; j < weights.length; j++) {

            if (weights[j] == undefined) {
                // console.error('undefined')
                weights[j] = 0.1;
            }
            // console.log(weights[j])
            if (weights[j] >= 0 != isPositive) {

                // when changes from pos to neg or vice versa, insert base line point.
                pointsNegativeTop.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsNegativeBottom.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsPositiveTop.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                pointsPositiveBottom.push(new THREE.Vector2(stepWidth * (j - 1), 0));
                isPositive = weights[j] >= 0;
            }
            if (weights[j] >= 0) {
                pointsPositiveTop.push(new THREE.Vector2(stepWidth * j, linkWeightScale(weights[j])));
                pointsPositiveBottom.push(new THREE.Vector2(stepWidth * j, -linkWeightScale(weights[j])));
            } else {
                pointsNegativeTop.push(new THREE.Vector2(stepWidth * j, linkWeightScale(-weights[j])));
                pointsNegativeBottom.push(new THREE.Vector2(stepWidth * j, -linkWeightScale(-weights[j])));
            }
        }
        pointsNegativeTop.push(new THREE.Vector2(stepWidth * j, 0));
        pointsNegativeBottom.push(new THREE.Vector2(stepWidth * j, 0));
        pointsPositiveTop.push(new THREE.Vector2(stepWidth * j, 0));
        pointsPositiveBottom.push(new THREE.Vector2(stepWidth * j, 0));


        if (pointsNegativeTop.length > 0) {
            // Create negative value curve without filling

            var curve = new THREE.SplineCurve(pointsNegativeTop.concat(pointsNegativeBottom.reverse()));
            // var curve = new THREE.SplineCurve(pointsPositiveTop.concat(pointsPositiveBottom.reverse());
            var path = new THREE.Path(curve.points);
            var geometry = path.createPointsGeometry();
            var material = new THREE.LineBasicMaterial({ color: COLOR_DEFAULT.getHex() });

            splineObject = new THREE.Line(geometry, material);
            // splineObject.position.y = -rowHeight*i-rowHeight/2;
            waveShape.negative = splineObject;
            this.scene.add(splineObject);
        }

        // // create positive value curve with black filling
        if (pointsPositiveTop.length > 0) {

            // create upper shape segments
            var curve = new THREE.SplineCurve(pointsPositiveTop);
            var shape = new THREE.Shape(curve.points);
            var geometry = new THREE.ShapeGeometry(shape);
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: COLOR_DEFAULT.getHex() }));

            // create lower shape segments
            curve = new THREE.SplineCurve(pointsPositiveBottom);
            shape = new THREE.Shape(curve.points);
            var geometry2 = new THREE.ShapeGeometry(shape);


            // merge both geometries
            // THREE.GeometryUtils.merge(geometry, geometry2);
            geometry.merge(geometry2);
            // create and add mesh
            // mesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [ new THREE.MeshLambertMaterial( { color: 0xeeeeee } )] );
            mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: COLOR_DEFAULT.getHex() }));
            // mesh.position.y = -rowHeight*i-rowHeight/2;
            waveShape.positive = mesh;
            this.scene.add(mesh);
        }
    }
}

// update links after highlight or selection
var transition: animations.Transition;

function updateLinks() {
    var links = dgraph.links().toArray();
    var l: networkcube.Link;
    var j;
    transition = new animations.Transition(render)
    var color;
    var selections;
    for (var i = 0; i < links.length; i++) {
        l = links[i];

        // CHECK AND UPDATE VISIBILITY
        if (!l.isVisible()
            || !l.source.isVisible()
            || !l.target.isVisible()) {
            // remove from display
            if (waveShapes[l.id()].positive && waveShapes[l.id()].positive.material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(
                    waveShapes[l.id()].positive,
                    0,
                    DURATION
                ));
            }
            if (waveShapes[l.id()].negative && waveShapes[l.id()].negative.material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(
                    waveShapes[l.id()].negative,
                    0,
                    DURATION
                ));
            }
            continue;
        }
        // test whether not present already
        if (waveShapes[l.id()].positive && waveShapes[l.id()].positive.material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(
                waveShapes[l.id()].positive,
                1,
                DURATION
            ));
        }
        if (waveShapes[l.id()].negative && waveShapes[l.id()].negative.material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(
                waveShapes[l.id()].negative,
                1,
                DURATION
            ));
        }


        // update highlight and selection color
        color = undefined;
        if (l.isHighlighted()) {
            color = COLOR_HIGHLIGHT.getStyle();
        } else if (l.isSelected()) {
            color = networkcube.getPriorityColor(l);
        }
        if (!color)
            color = COLOR_DEFAULT.getHex();

        // set color
        if (waveShapes[l.id()].positive) {
            waveShapes[l.id()].positive.material.color = new THREE.Color(color);
        }
        if (waveShapes[l.id()].negative) {
            waveShapes[l.id()].negative.material.color = new THREE.Color(color);
        }
        // update wave position (e.g. after reordering):
        if (waveShapes[l.id()].positive) {
            transition.add(new animations.TranslationAnimation(
                waveShapes[l.id()].positive,
                waveShapes[l.id()].positive.position.x,
                -(rowHeight * visibleRank[l.id()] + rowHeight / 2),
                // 0,
                DURATION));
            // waveShapes[i].positive.position.y = -rowHeight*rank[i]-rowHeight/2;
        }
        if (waveShapes[l.id()].negative) {
            transition.add(new animations.TranslationAnimation(
                waveShapes[l.id()].negative,
                waveShapes[l.id()].negative.position.x,
                -(rowHeight * visibleRank[l.id()] + rowHeight / 2),
                // 0,
                DURATION));
            // waveShapes[i].negative.position.y = -rowHeight*rank[i]-rowHeight/2;
        }
    }

    transition.start();

    // update labels:
    d3.selectAll('.row')
        .attr('transform', (d, i) => {
            var pos_i = visibleRank[d.id()];
            if (pos_i > -1)
                return 'translate(0, ' + (plotMargin.y + rowHeight * (pos_i + .5) + 6) + ')';
            return 'translate(0, -100)'; // if not visible
        })
    // .transition()
    // .duration(500)
    // .style('opacity', function(d,i) {
    //     if (!d.isVisible()) {
    //         return 0;
    //     }
    //     else{
    //         return 1;
    //     }
    // });


}

function updateNodes() {
    var color;
    var size;
    var n;
    d3.selectAll('.nodeLabel')
        .style('fill', function (d) {
            color = undefined;
            if (d.isHighlighted()) {
                color = COLOR_HIGHLIGHT.getStyle();
            } else if (d.isSelected()) {
                color = networkcube.getPriorityColor(d);
            }
            if (!color)
                color = COLOR_DEFAULT.getStyle();
            return color;
        })
        .style('font-size', function (d) {
            if (d.isHighlighted()) {
                size = 13;
            } else {
                size = 10;
            }
            return size;
        })

}



function render() {
    // var d = new Date();
    // var begin = d.getTime()
    renderer.render(scene, camera)
    // d = new Date();
    // console.log('>>>> RENDERED ', (d.getTime() - begin), ' ms.');
}

var orderTimer: number;


function updateRowHeight() {
    rowHeight = parseInt(document.getElementById("rowHeightInput").value);
    stretchFactorY = rowHeight / HIGHT_ROW_DEFAULT;
    // update row heights
    for (var i = 0; i < waveShapes.length; i++) {
        if (waveShapes[i].positive) {
            waveShapes[i].positive.scale.y = stretchFactorY;
            waveShapes[i].positive.position.y = -rowHeight * visibleRank[i] - rowHeight / 2;
        }
        if (waveShapes[i].negative) {
            waveShapes[i].negative.scale.y = stretchFactorY;
            waveShapes[i].negative.position.y = -rowHeight * visibleRank[i] - rowHeight / 2;
        }
    }
    render();

    d3.selectAll('.row')
        .attr('transform', (d, i) => {
            return 'translate(0, ' + (plotMargin.y + rowHeight * (visibleRank[i] + .5) + 6) + ')';
        });

}

function updateRowOrdering() {
    // reorder will be launched after time has been left alone for a wile
    clearTimeout(this.orderTimer);
    this.orderTimer = setTimeout((e) => {
        console.log("sort");
        sortBySimilarity(4);
        updateLinks();
        render();
        this.orderTimer = null;
    }, 500);
}

function dscsort(a, b) {
    return b.value - a.value;
}

function ascsort(a, b) {
    return a.value - b.value;
}

function sortBySimilarity(referenceIndex) {
    var data: number[][] = [];
    for (var i = 0; i < dgraph.links().length; i++) {
        var link = dgraph.link(i);
        data[i] = link.weights(startTime, endTime).toArray();
    }
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (!data[i][j] || data[i][j] == undefined)
                data[i][j] = 0;
        }
    }
    var similarity = Sorting.sortBySimilarity(data, referenceIndex, "euclidean");
    for (var i = 0; i < order.length; i++) {
        order[i].value = similarity[order[i].id];
    }
    order.sort(this.dscsort);

    var str = "";
    for (var i = 0; i < order.length; i++) {
        rank[order[i].id] = i;
        str += order[i].id + ' ';
    }

    updateVisibleRank();
}

function updateVisibleRank() {
    var link;
    var orderedLinks = dgraph.links().toArray().slice(0, dgraph.links().length);
    orderedLinks.sort(byRank);

    visibleRank = networkcube.array(-1, orderedLinks.length);

    var visibleRankCount = 0;
    for (var i = 0; i < orderedLinks.length; i++) {
        link = orderedLinks[i]
        if (link.isVisible() && link.source.isVisible() && link.target.isVisible()) {
            visibleRank[link.id()] = visibleRankCount++;
        }
    }
}


function timezoomCallback(min: networkcube.Time, max: networkcube.Time, single:networkcube.Time, propagate: boolean) {

    stretchFactorX = dgraph.times().length / (endTimeZoom.id() - startTimeZoom.id());

    if ((endTimeZoom.id() - startTimeZoom.id()) != (max.id() - min.id())) {
        for (var i = 0; i < waveShapes.length; i++) {
            if (waveShapes[i].positive)
                waveShapes[i].positive.scale.x = stretchFactorX;
            if (waveShapes[i].negative)
                waveShapes[i].negative.scale.x = stretchFactorX;
        }
    }
    camera.position.x = plotWidth / 2 + (min.id() * stepWidth * stretchFactorX);

    startTimeZoom = min;
    endTimeZoom = max;

    render();
    updateRowOrdering();
    updateTimeSelection();

    timeZoomSlider.set(startTimeZoom, endTimeZoom)
}

// updates the time band in the background to indicate selected times.
function updateTimeSelection() {
    rectMeshLeft.position.x = (plotWidth / dgraph.times().length) * startTime.id() * stretchFactorX;
    rectMeshLeft.scale.x = stretchFactorX;
    rectMeshRight.position.x = (plotWidth / dgraph.times().length) * endTime.id() * stretchFactorX;
    rectMeshRight.scale.x = stretchFactorX;
}


// NETWORK CUBE HANDLERS


function updateEvent(m: networkcube.Message) {

    if (m.type == 'filter' || m.type == 'selectionFilter') {
        // not necessary every time!
        updateVisibleRank();
    }

    updateLinks()
    updateNodes()
    render();
}


function timeRangeHandler(m: networkcube.TimeRangeMessage) {
    startTime = dgraph.time(m.startId)
    endTime = dgraph.time(m.endId)

    timeSlider.set(startTime, endTime)
    updateTimeSelection();

    updateRowOrdering();

    render();
}




// INTERACTION + LISTENERS
var hoveredLink: networkcube.Link;
var lastClickMoment = window.performance.now();

function mouseMove(e) {
    // sometimes we send a highlight too soon after a click, and
    // the selection gets lost, because this message will erase the
    // previous one. So we are going to give it some breathing room
    // Hopefully this is enough time for the other windows to get their
    // events from 'storage' and process them. else there are more 
    // robust ways of doing it, but they would require more clever code.
    if (window.performance.now() - lastClickMoment < 400) {
        return;
    }
    hoveredLink = undefined;
    var mpos = glutils.getMousePos(canvas, e.clientX, e.clientY)

    var hoveredLinkId = visibleRank.indexOf(Math.floor(mpos.y / rowHeight));

    if (dgraph.link(hoveredLinkId)) {
        hoveredLink = dgraph.link(hoveredLinkId);
        networkcube.highlight('set',
            <networkcube.ElementCompound>{
                links: [hoveredLink],
            });
    } else {
        networkcube.highlight('reset');
    }
}

function click(e) {
    lastClickMoment = window.performance.now();

    if (hoveredLink) {
        if (!hoveredLink.isSelected(dgraph.getCurrentSelection())) {
            console.log('adding to selection', hoveredLink.source.label(), hoveredLink.target.label());
            networkcube.selection('add', <networkcube.ElementCompound>{ links: [hoveredLink] });
        } else {
            networkcube.selection('remove', <networkcube.ElementCompound>{ links: [hoveredLink] });
        }
    }
}


function byRank(a, b) {
    return rank[a.id()] - rank[b.id()];
}
