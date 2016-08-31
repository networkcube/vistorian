/// <reference path="../../core/scripts/three.d.ts"/>
/// <reference path="../../core/helper/glutils.ts"/>
/// <reference path="../../core/networkcube.d.ts" />
/// <reference path="../../core/scripts/jquery.d.ts"/>
/// <reference path="../../core/scripts/d3.d.ts"/>
/// <reference path="../widgets/widgets.d.ts" />



var COLOR_HIGHLIGHT = 0x000000;
var COLOR_SELECTION = 0xff0000;
var COLOR_CELL_DEFAULT = 0x000000;
var COLOR_CELL_FILTER = 0xdddddd;


// FIXED VISUAL PARAMETERS

class NMargin {
    left: number;
    top: number;
    constructor(v: number) {
        this.left = v;
        this.top = v;
    }
}

var vizWidth: number;
var vizHeight: number;

var urlVars = networkcube.getUrlVars();
vizWidth = window.innerWidth;
vizHeight = window.innerHeight;

var margin = new NMargin(10);

// GET DATA

var dgraph: networkcube.DynamicGraph = networkcube.getDynamicGraph();
var startTime: networkcube.Time = dgraph.startTime;
var endTime: networkcube.Time = dgraph.endTime;

// DO SOME TESTS
// var n = dgraph.node(1);
// console.log('>>>>>>>>>>>>>>>>>')
// console.log('n', n);
// console.log('n.neighbors().length', n.neighbors().length);
// console.log('n.neighbors(startTime).length', n.neighbors(startTime).length);
// console.log('n.neighbors(startTime, endTime).length', n.neighbors(startTime, endTime).length);
// console.log('<<<<<<<<<<<<<<<<<')

// VISUAL STATES

var nodeOrder: number[] = [];
//var nodeOrderVisible: number[] = [];

// function updateNodeOrderVisible() {
//     nodeOrderVisible = nodeOrder.filter(function(v, i, arr): boolean {
//         return dgraph.node(v).isVisible();
//     });
// }
// function setNodeOrder(nodeIds: number[]): void {
//     nodeOrder = nodeIds;
//     updateNodeOrderVisible();
// }


var firstLeftVisible: number = 0; // first left label completely visible
var firstTopVisible: number = 0; // first top label completely visible
var leftLabelOffset: number = 0; // first left label completely visible
var topLabelOffset: number = 0; // first top label completely visible

var guidelines = []

var initialCellSize: number = 12;
var cellsize: number = initialCellSize;
var hoveredLinks: networkcube.Link[] = [];

// for issue# 59, we needed to be a bit more clever in 
// calculating plotMargin. We used to just assume 100. Now we
// assume cellSize* how ever many characters we want
var longestLabelNode = dgraph.nodes().toArray().reduce(function(p, v, i, arr) {
    if (p == null || p.label() == null || (v.label() && v.label().length > p.label().length))
        return v;
    else
        return p;
});
var labelLength = longestLabelNode ? longestLabelNode.label().length : 8;
// labelLength would be roughly the right value if the label were composed
// of all 'M's. But it probably isn't the case. The right way to do this would
// be to actually measure the laid-out text of all of these. You could do that, maybe
// with canvas.measureText, but for now we will just guesstimate, by guessing 60%
var plotMargin = calculatePlotMargin();

// PREPARE MENU
$('body').append('<div id="networkcube-matrix-menu"></div>');
$('#networkcube-matrix-menu').append('Zoom:  <input id="cellSizeBox" type="range" name="cellSizeBox" min="3" max="20" onchange="updateCellSize()" value="' + initialCellSize + '"/>')
$("#networkcube-matrix-menu").append('<br/>');
$("#networkcube-matrix-menu").append('<label>Label ordering:</label>');
var orderingMenu = $("#networkcube-matrix-menu").append('<select id="labelOrdering" onchange="reorderHandler()"></select>')
$('#labelOrdering').append('<option value="none">---</option>');
$('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
$('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
$('#labelOrdering').append('<option value="degree">Node degree</option>');
$('#labelOrdering').append('<option value="similarity">Similarity</option>');

$('#networkcube-matrix-menu').append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');


$('#dataName').text(dgraph.name);

// register for message listeners
networkcube.setDefaultEventListener(updateEvent)
networkcube.addEventListener('timeRange', timeRangeHandler);


//window.addEventListener("mousewheel", (e)=>{
//    event.preventDefault();
//    if(event.wheelDelta > 0)
//        cellsize *= Math.abs(event.wheelDelta/100);
//    else
//        cellsize /= Math.abs(event.wheelDelta/100);
//        
//    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
//    
//}, false);
//
//


// SVG STUFF
$('body').append('<div id="networkcube-matrix-timelineDiv"></div>');
var timeSvg = d3.select('#networkcube-matrix-timelineDiv')
    .append('svg')
    .attr('width', vizWidth)
    .attr('height', 50)

var timeSlider: any = new TimeSlider(dgraph, vizWidth);
timeSlider.appendTo(timeSvg);

var linkWeightScale = d3.scale.linear().range([0.1, 1]);
var totalWidth =  window.innerWidth - plotMargin.left; // Math.min(cellsize * dgraph.nodes().length + 50, window.innerWidth);
var totalHeight = window.innerHeight - plotMargin.top - 120; //Math.min(cellsize * dgraph.nodes().length + 50, window.innerHeight);

$('body').append('<div id="networkcube-matrix-visDiv"><svg id="networkcube-matrix-visSvg"><foreignObject id="networkcube-matrix-visCanvasFO"></foreignObject></svg></div>');
var svg = d3.select('#networkcube-matrix-visSvg')
    .attr('width', totalWidth + plotMargin.left)
    .attr('height', totalHeight + plotMargin.top);


nodeOrder = dgraph.nodes().ids();


// dgraph.setNodeOrder(networkcube.OrderType.Local);
// setNodeOrder(graph.getNodeOrder());
// console.log('nodeOrder2', nodeOrder)


// Draw labels
// svg.selectAll('.labelsLeft')
//     .data(dgraph.nodes().visible().toArray())
//     .enter()
//     .append('text')
//     .attr('id', (d, i) => { return 'nodeLabel_left_' + i; })
//     .attr('class', 'labelsLeft nodeLabel')
//     .attr('text-anchor', 'end')
//     .text((d, i) => { return d.label(); })
//     .attr('x', plotMargin.left - 10)
//     .attr('y', (d, i) => { return plotMargin.top + cellsize * i + cellsize; })
//     .on('mouseover', (d, i) => {
//         networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
//     })
//     .on('mouseout', (d, i) => {
//         networkcube.highlight('reset');
//     })Height   .on('click', (d, i) => {
//         var selections = d.getSelections();
//         var currentSelection = this.dgraph.getCurrentSelection();
//         for (var j = 0; j < selections.length; j++) {
//             if (selections[j] == currentSelection) {
//                 networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [d] });
//                 return;
//             }
//         }
//         networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
//     });

// svg.selectAll('.labelsTop')
//     .data(dgraph.nodes().toArray())
//     .enter()
//     .append('text')
//     .attr('id', (d, i) => { return 'nodeLabel_top_' + i; })
//     .attr('class', 'labelsTop nodeLabel')
//     .text((d, i) => { return d.label(); })
//     .attr('x', (d, i) => { return plotMargin.left + cellsize * i + cellsize; })
//     .attr('y', plotMargin.left - 10)
//     .attr('transform', (d, i) => { return 'rotate(-90, ' + (plotMargin.top + cellsize * i + cellsize) + ', ' + (plotMargin.left - 10) + ')' })
//     .on('mouseover', (d, i) => {
//         networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
//     })
//     .on('mouseout', (d, i) => {
//         networkcube.highlight('reset');
//     })
//     .on('click', (d, i) => {
//         var selections = d.getSelections();
//         var currentSelection = this.dgraph.getCurrentSelection();
//         for (var j = 0; j < selections.length; j++) {
//             if (selections[j] == currentSelection) {
//                 networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [d] });
//                 return;
//             }
//         }
//         networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
//     });

// WEB GL
var vertexShaderProgram = "attribute vec4 customColor;varying vec4 vColor;void main() {vColor = customColor;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );}";
var fragmentShaderProgram = "varying vec4 vColor;void main() {gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);}";

var scene: THREE.Scene;
var camera: THREE.OrthographicCamera;
var renderer: THREE.WebGLRenderer;
var geometry: THREE.BufferGeometry;
var mesh: THREE.Mesh;

// SHADERS
var attributes = {
    customColor: { type: 'c', value: [] }
}
var shaderMaterial: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    attributes: attributes,
    vertexShader: vertexShaderProgram,
    fragmentShader: fragmentShaderProgram,
    // blending: THREE.NormalBlending,
    // depthTest: true,
    // transparent: true,
    // side: THREE.DoubleSide,
    linewidth: 2
});
shaderMaterial.blending = THREE.NormalBlending;
shaderMaterial.depthTest = true;
shaderMaterial.transparent = true;
shaderMaterial.side = THREE.DoubleSide;


// var labelsTop: THREE.Mesh[] = networkcube.array(undefined, nodeOrder.length);
// var labelsLeft: THREE.Mesh[] = networkcube.array(undefined, nodeOrder.length);
var crosses = [];


// scene
scene = new THREE.Scene();

// var canvasWidth = cellsize * dgraph.nodes().length + 50;
var canvasWidth = totalWidth;
    // .attr('width', totalWidth + plotMargin.left)
    // .attr('height', totalWidth + plotMargin.top);

var canvasHeight = totalHeight - plotMargin.top;


// camera
camera = new THREE.OrthographicCamera(
    canvasWidth / -2,
    canvasWidth / 2,
    canvasHeight/ 2,
    canvasHeight / -2,
    0, 1000)

scene.add(camera);
camera.position.x = canvasWidth / 2;
camera.position.y = -canvasHeight / 2;
camera.position.z = 100;

// renderer
renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(canvasWidth, canvasHeight)
renderer.setClearColor(0xffffff, 1);

// raycaster
var raycaster: THREE.Raycaster = new THREE.Raycaster()

// position canvas element containing cells
var canvas = renderer.domElement;
// set canvas listeners
canvas.addEventListener('mousemove', (e) => {
    this.mouseMoveHandler(e);
})
canvas.addEventListener('mousedown', (e) => {
    this.mouseDownHandler(e);
})
canvas.addEventListener('mouseup', (e) => {
    this.mouseUpHandler(e);
})
canvas.addEventListener('click', (e) => {
    this.clickHandler(e);
})


// init glutils renderer for D3 wrapper
glutils.setWebGL(scene, camera, renderer, canvas);
var cellLabelBackground = glutils.selectAll()
    .data([{id:0}])
    .append('rect')
        .attr('width',70)
        .attr('height',22)    
        .attr('x', 0)
        .attr('y', 0)    
        .style('fill', 0xffffff)
        .style('stroke', 0xffffff)
        .style('opacity', 0)
    
var cellLabel = glutils.selectAll()
    .data([{id:0}])
    .append('text')
        .style('opacity', 0)
        .attr('z', 2)
        .style('font-size', initialCellSize)

$('#networkcube-matrix-visCanvasFO').append(canvas);
d3.select('#networkcube-matrix-visCanvasFO')
    .attr('x', plotMargin.left)
    .attr('y', plotMargin.top)
    .attr('width', totalWidth )
    .attr('height', totalHeight);

var view = d3.select(canvas);
zoom = d3.behavior.zoom()
        .scaleExtent([0.2, 4])
        .on('zoom', zoomed);
view.call(zoom);


// geometry and mesh
geometry = new THREE.BufferGeometry();

var vertexColors: number[][] = [];
var cellHighlightFrames: THREE.Mesh[] = networkcube.array(undefined, dgraph.links().length);
var cellSelectionFrames: THREE.Mesh[] = networkcube.array(undefined, dgraph.links().length);


var d: Date[] = []
var di: number = -1;

enum UpdateOptions {
    Nodes = 1 << 0,
    Links = 1 << 1,
    Geometry = 1 << 2,
    NodeOrdering = Nodes | Geometry | Links | 1 << 3,
    PlotLocation = Nodes |  Links | 1 << 4,
    Standard = Geometry | Links | Nodes,
    All = 0xffff
}

updateAll(UpdateOptions.All);

function calculatePlotMargin(): NMargin {
    return new NMargin(((labelLength * 0.75) + 1) * cellsize);
}

function updateAll(updateOptions: UpdateOptions): void {

    if ((updateOptions & UpdateOptions.PlotLocation) == UpdateOptions.PlotLocation) {
        // bbach: removed since distracting.
        updatePlot();
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
    //console.log('updateGeometry');
    d = [];
    var vertexPositions: number[][] = [];
    vertexColors = [];

    if (geometry) {
        scene.remove(mesh);
    }

    for (var i = 0; i < crosses.length; i++) {
        scene.remove(crosses[i]);
    }

    var e: networkcube.Link, row: number, col: number
    var c: number;
    var x, y, z: number;
    var color_web: string;
    var color: THREE.Color;
    // var pairs:networkcube.NodePair[] = dgraph.getNodePairs().presentIn(startTime, endTime).elements;
    var pairs: networkcube.NodePair[] = dgraph.nodePairs().toArray();
    var links: networkcube.Link[];
    var pair: networkcube.NodePair;
    var linkNum: number;
    var seg: number;
    var presentLinks: networkcube.Link;
    var c: number;
    var meanWeight: number;
    linkWeightScale.domain([
        0,
        dgraph.links().weights().max()
    ]);

    // d.push(new Date());
    var highlightFrames: THREE.Mesh;
    var selectionFrames: THREE.Mesh;
    var frame: THREE.Line;
    var frame2: THREE.Line;
    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i];

        // select links present in the interval.
        links = pair.links().toArray()//.presentIn(startTime, endTime).elements();
        // console.log('links:', links.length);

        linkNum = links.length;
        seg = cellsize / linkNum;

        // if the source or target is not shown, 
        // then we are not going to render anything
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

            x = cellsize/2 + col * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = cellsize/2 + row * cellsize;
            z = 1;

            e.x = x;
            e.y = y;

            if (e.weights() != undefined) {
                meanWeight = e.weights(startTime, endTime).mean();
            } else {
                meanWeight = 1;
            }

            // console.log('meanWeight', meanWeight);

            color = new THREE.Color(0, 0, 0);
            c = linkWeightScale(Math.abs(meanWeight));
            // c = Math.random();
            if (meanWeight > 0) {
                glutils.addBufferedRect(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c])
            } else {
                glutils.addBufferedDiamond(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c])
            }


            // highlight frame
            highlightFrames = new THREE.Mesh();
            frame = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_HIGHLIGHT, 1)
            frame.position.x = x;
            frame.position.y = -y;
            frame.position.z = 10;
            highlightFrames.add(frame);
            cellHighlightFrames[e.id()] = highlightFrames;

            // selection frame
            selectionFrames = new THREE.Mesh();
            frame = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_SELECTION, 2)
            frame.position.x = x;
            frame.position.y = -y;
            frame.position.z = 9;
            selectionFrames.add(frame);
            cellSelectionFrames[e.id()] = selectionFrames;


            // if(e.directed){
            x = cellsize/2 + row * cellsize - cellsize / 2 + seg * j + seg / 2;
            y = cellsize/2 + col * cellsize;
            z = 1;

            if (meanWeight > 0) {
                glutils.addBufferedRect(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c])
            } else {
                glutils.addBufferedDiamond(vertexPositions, x, -y, 0, seg - 1, cellsize - 1, vertexColors, [color.r, color.g, color.b, c])
            }

            // highlight frame
            frame2 = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_HIGHLIGHT, 1)
            frame2.position.x = x;
            frame2.position.y = -y;
            frame2.position.z = 10;
            highlightFrames.add(frame2);

            // selection frame
            frame2 = glutils.createRectFrame(seg - 1, cellsize - 1, COLOR_SELECTION, 2)
            frame2.position.x = x;
            frame2.position.y = -y;
            frame.position.z = 9;
            selectionFrames.add(frame2);

            // }
        }
    }
    // d.push(new Date());
    // console.log('d', (d.length-1), (d[d.length-1].getTime() - d[0].getTime()),  'msec' );

    geometry = new THREE.BufferGeometry();

    // CREATE + ADD MESH
    geometry.addAttribute('position', new THREE.BufferAttribute(glutils.makeBuffer3f(vertexPositions), 3));

    geometry.addAttribute('customColor', new THREE.BufferAttribute(glutils.makeBuffer4f(vertexColors), 4));
    mesh = new THREE.Mesh(geometry, shaderMaterial);

    scene.add(mesh);
   
    
    // CREATE GUIDELINES

    for(var i=0 ; i <guidelines.length ; i++){
        scene.remove(guidelines[i]);
    }    

    var num = dgraph.nodes().visible().length;
    var geometry1 = new THREE.Geometry();
    geometry1.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( num * cellsize, 0, 0)
    )
    var geometry2 = new THREE.Geometry();
    geometry2.vertices.push(
        new THREE.Vector3( 0, 0, 0 ),
        new THREE.Vector3( 0, -num * cellsize , 0 )
    )
    var m;
    var mat = new THREE.LineBasicMaterial( {color: 0xeeeeee, linewidth:1} );
    var x,y;
    for(var i=0 ; i <=num ; i++){
        x = cellsize/2 + col * cellsize - cellsize / 2
        y = cellsize/2 + row * cellsize;
        m = new THREE.Line(geometry1, mat)
        m.position.set(cellsize/2 - cellsize/2, -(cellsize/2 + i * cellsize - cellsize/2), 0)     
        scene.add(m);
        guidelines.push(m)
        m = new THREE.Line(geometry2, mat)
        m.position.set(cellsize/2 + i * cellsize - cellsize/2, -( cellsize/2 -cellsize/2), 0)     
        scene.add(m);
        guidelines.push(m)
    }
    
  cellsize = savedCellSize;

}

function zoomed() {
  var x: number, y: number, z: number, _ref: number[];
  z = zoom.scale();
  _ref = zoom.translate(), x = _ref[0], y = _ref[1];
  //return window.requestAnimationFrame(function() {
    x = -x + canvasWidth / 2;
    y = y - canvasHeight / 2;
    camera.position.set(x, y, 100);
    camera.zoom = z;
    camera.position.set(x/z, y/z, 100);
    camera.updateProjectionMatrix();
    cellsize = z * initialCellSize;
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
    return render();
  //});
}


function updatePlot() {
  plotMargin = calculatePlotMargin();
  // update the location of the links canvas
  d3.select('#networkcube-matrix-visCanvasFO')
      .attr('x', plotMargin.left)
      .attr('y', plotMargin.top);

  document.getElementById("cellSizeBox").value = cellsize;

  var _ref :number[];
  _ref = zoom.translate();

  firstTopVisible =  -Math.floor(_ref[0]/cellsize);
  firstLeftVisible = -Math.floor(_ref[1]/cellsize);

  topLabelOffset =  (_ref[0]/cellsize + firstTopVisible)*cellsize;
  leftLabelOffset = (_ref[1]/cellsize + firstLeftVisible)*cellsize;
  
}

function updateNodes() {
    var color;

    var leftNodes = dgraph.nodes().visible().toArray();
    leftNodes = leftNodes.filter( d => nodeOrder[d.id()] >= firstLeftVisible);

    var labelsLeft = svg.selectAll('.labelsLeft')
        .data(leftNodes);

    labelsLeft.enter().append('text')
        .attr('id', (d, i) => { return 'nodeLabel_left_' + i; })
        .attr('class', 'labelsLeft nodeLabel')
        .attr('text-anchor', 'end')
        .attr('x', plotMargin.left - 10)
        .attr('y', (d, i) => { return plotMargin.top + leftLabelOffset +  cellsize * (nodeOrder[d.id()] - firstLeftVisible) + cellsize; })
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
        });

    labelsLeft.exit().remove();

    labelsLeft
        .text((d, i) => { return d.label(); })
        .attr('x', plotMargin.left - 10)
        .attr('y', (d, i) => {
            return plotMargin.top + leftLabelOffset +  cellsize * (nodeOrder[d.id()]- firstLeftVisible) + cellsize;
        });

    var topNodes = dgraph.nodes().visible().toArray();
    topNodes = topNodes.filter( d => nodeOrder[d.id()] >= firstTopVisible);
    
    var labelsTop = svg.selectAll('.labelsTop')
        .data(topNodes);

    labelsTop.enter().append('text')
        .attr('id', (d, i) => { return 'nodeLabel_top_' + i; })
        .attr('class', 'labelsTop nodeLabel')
        .text((d, i) => { return d.label(); })
        .attr('x', (d, i) => { return plotMargin.left + topLabelOffset + cellsize * (nodeOrder[d.id()] - firstTopVisible) + cellsize; })
        .attr('y', plotMargin.left - 10)
        .attr('transform', (d, i) => { return 'rotate(-90, ' + (plotMargin.top + cellsize * i + cellsize) + ', ' + (plotMargin.left - 10) + ')' })
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
        });

    labelsTop.exit().remove();
    labelsTop
        .text((d, i) => { return d.label(); })
        .attr('x', (d, i) => {
            return plotMargin.left + topLabelOffset +  cellsize * (nodeOrder[d.id()] - firstTopVisible) + cellsize;
        })
        .attr('y', plotMargin.top - 10)
        .attr('transform', (d, i) => { return 'rotate(-90, ' + (plotMargin.top + topLabelOffset + cellsize * (nodeOrder[d.id()]-firstTopVisible) + cellsize) + ', ' + (plotMargin.left - 10) + ')' })

    svg.selectAll('.nodeLabel')
        .style('fill', function(d) {
            color = undefined;
            if (d.isSelected()) {
                color = networkcube.getPriorityColor(d);
            }
            if (!color)
                color = '#000000';
            return color;
        })
        .style('font-weight', function(d) {
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

    // // scale labels if cell size gets too small.
    // https://github.com/nathalieriche/networkcube-dev/issues/60
    // says that we should scale the fontsize under all circums
    // if(cellsize < 18){
    //     svg.selectAll('.nodeLabel')
    //         .style('font-size', cellsize);
    // }
}


var linkLabel
function updateLinks() {
    //console.log("updateLinks()");

    var frame: THREE.Line;
    var selections;

    var webColor: string;
    var glColor, glColor2: THREE.Color;
    // var links: networkcube.Link[] = dgraph.links().toArray();
    var links:networkcube.Link[];
    var pairs: networkcube.NodePair[] = dgraph.nodePairs().toArray();
    var l: networkcube.Link;
    var alpha: number;
    var vertexColors: number[][] = [];

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
            } else {
                if ((l.isHighlighted()
                    || l.source.isHighlighted()
                    || l.target.isHighlighted())
                    && l.source.isVisible()
                    && l.target.isVisible()) {
                    scene.add(cellHighlightFrames[l.id()]);
                } 
                // else {
                //     scene.remove(cellHighlightFrames[l.id()]);
                // }
                alpha = linkWeightScale(Math.abs(l.weights(startTime, endTime).mean()));
                if (!alpha) {
                    alpha = 0;
                }
            }
            glColor = new THREE.Color(webColor);
            vertexColors.push(
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha]
            );
            vertexColors.push(
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha],
                [glColor.r, glColor.g, glColor.b, alpha]
            );
        }
    }
        
    // console.log('vertexColors.length/4', vertexColors.length/4)
    glutils.updateBuffer(geometry.attributes['customColor'].array, vertexColors, 4);
    geometry.attributes['customColor'].needsUpdate = true;
    
    
    // show link label if required
}

function render() {
    var d = new Date();
    var begin = d.getTime()
    renderer.render(scene, camera)
    d = new Date();
    // console.log('>>>> RENDERED ', (d.getTime() - begin), ' ms.');
}


function timeRangeHandler(m: networkcube.TimeRangeMessage) {
    startTime = dgraph.time(m.startId);
    endTime = dgraph.time(m.endId);
    timeSlider.set(startTime, endTime);

    // I think we might have to do the full node re-render because the time range will
    // impact link visibility which will impact ordering if the ordering is by similarity
    updateAll(UpdateOptions.Standard);
}

function updateCellSize() {
    cellsize = parseInt((<HTMLInputElement>document.getElementById("cellSizeBox")).value);
    zoom.scale(cellsize/initialCellSize).event(view);
    updateAll(UpdateOptions.PlotLocation | UpdateOptions.Nodes);
}

function transformToOriginal(pos){
  var z: number, tr: number[];
  var newPos = {x: 0, y: 0};
  z = zoom.scale();
  tr = zoom.translate();
  newPos.x = (pos.x - tr[0])/z;
  newPos.y = (pos.y - tr[1])/z;
  return newPos; 
}


// INTERACTION + LISTENERS
var links: networkcube.Link[];
var l: networkcube.Link;
var mx: number;
var my: number;
var previousHoveredLinks: networkcube.Link[] = [];
var mouseDown: boolean = false;
var mouseDownPos = { x: 0, y: 0 };

function mouseMoveHandler(e) {
    var mpos = glutils.getMousePos(canvas, e.clientX, e.clientY);
    mpos = transformToOriginal(mpos);
    var mx = mpos.x;
    var my = mpos.y;
    
    // CHECK FOR ELEMEMTS TO  HIGLHIGHT

    // links
    previousHoveredLinks = hoveredLinks
    hoveredLinks = [];

    links = dgraph.links().toArray().filter(function(v, i, arr): boolean {
        if (!v.source.isVisible() || !v.target.isVisible())
            return false;
        else
            return true;
    });

    if (!mouseDown) {

        // check for single hovered cell
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
    } else { // mouseDown

        // get links under lasso rectangle
        var box: networkcube.Box = new networkcube.Box(mx, my, mouseDownPos.x, mouseDownPos.y)
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
        console.log('999')
        cellLabel
            .attr('x', mx + 40)
            .attr('y', -my)
            .style('opacity', 1)
            .text(getCellWeightLabel(hoveredLinks[0]))
        cellLabelBackground
            .attr('x', mx + 10)
            .attr('y', -my + 11)
            .style('opacity', .8)
            
        networkcube.highlight('set', <networkcube.ElementCompound>{ links: hoveredLinks });
    } else if (hoveredLinks.length == 0 && dgraph.links().highlighted().length > 0) {
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
            // if(hoveredLinks[0].isSelected()){
            //     networkcube.selection('remove', {links: hoveredLinks});
            // }else{
            //     networkcube.selection('add', {links: hoveredLinks});
            // }
            if (!hoveredLinks[0].isSelected()) {
                // if this element has not been selected yet,
                // add it to current selection.
                networkcube.selection('add', <networkcube.ElementCompound>{ links: hoveredLinks });
            } else {
                var selections = hoveredLinks[0].getSelections();
                var currentSelection = this.dgraph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', <networkcube.ElementCompound>{ links: hoveredLinks });
                        return;
                    }
                }
                // current selection has not been found among already
                // assigned selections, hence add this selection
                networkcube.selection('add', <networkcube.ElementCompound>{ links: hoveredLinks });
            }
        }
    }
}

function clickHandler(e) {
    console.log('click', hoveredLinks.length)
    if (hoveredLinks.length > 0) {
        // if(hoveredLinks[0].isSelected()){
        //     networkcube.selection('remove', {links: hoveredLinks});
        // }else{
        //     networkcube.selection('add', {links: hoveredLinks});
        // }
        if (!hoveredLinks[0].isSelected()) {
            // if this element has not been selected yet,
            // add it to current selection.
            networkcube.selection('add', <networkcube.ElementCompound>{ links: hoveredLinks });
        } else {
            var selections = hoveredLinks[0].getSelections();
            var currentSelection = this.dgraph.getCurrentSelection();
            for (var j = 0; j < selections.length; j++) {
                if (selections[j] == currentSelection) {
                    networkcube.selection('remove', <networkcube.ElementCompound>{ links: hoveredLinks });
                    return;
                }
            }
            // current selection has not been found among already
            // assigned selections, hence add this selection
            networkcube.selection('add', <networkcube.ElementCompound>{ links: hoveredLinks });
        }
    }
}

// function timesliderCallback(min: networkcube.Time, max: networkcube.Time, propagate: boolean) {
//     networkcube.timeRange(min, max, propagate);
// }


// NETWORKCUBE EVENTS

function updateEvent(m: networkcube.Message) {
    var opts: UpdateOptions = UpdateOptions.Links | UpdateOptions.Nodes;

    // bb: commented this out because it caused reorderin
    // each time you hide/show a set of links/link selection.
    if (
        // m.type == 'selectionFilter'
        // || 
        m.type == 'filter'
        || m.type == 'timeRange') {
        opts |= UpdateOptions.Geometry | UpdateOptions.NodeOrdering;
    }

    updateAll(opts);
}



/// REORDERING

function reorderHandler(): void {
    updateAll(UpdateOptions.All);
}

function reorderWorker(): void {
    var menu = <HTMLSelectElement>document.getElementById('labelOrdering');
    var orderType = (<HTMLOptionElement>menu.options[menu.selectedIndex]).value;

    if (orderType == 'alphanumerical') {
        var nodes2 = dgraph.nodes().visible().sort('label').toArray();
        nodeOrder = [];
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    } else if (orderType == 'reverse-alpha') {
        var nodes2 = dgraph.nodes().visible().sort('label', false).toArray();
        nodeOrder = [];
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    } else if (orderType == 'degree') {
        var nodes2 = dgraph.nodes().visible()
            .createAttribute('degree', (n) => {
                return n.neighbors().length;
            })
            .sort('degree').toArray();
        for (var i = 0; i < nodes2.length; i++) {
            nodeOrder[nodes2[i].id()] = i;
        }
    } else if (orderType == 'similarity') {
        var config: networkcube.OrderingConfiguration = new networkcube.OrderingConfiguration();
        config.start = startTime;
        config.end = endTime;
        config.nodes = dgraph.nodes().visible().toArray();
        config.links = dgraph.links().presentIn(startTime, endTime).visible().toArray();
        // console.log('config.links.length', config.links.length);
        nodeOrder = networkcube.orderNodes(dgraph, config);
    } else {
        var visibleNodes = dgraph.nodes().visible().toArray();
        nodeOrder = [];
        for (var i = 0; i < visibleNodes.length; i++) {
            nodeOrder[visibleNodes[i].id()] = i;
        }
    }

}



// function neighborCount(n1:Node, n2:Node):number{   
//     var d1:number = networkcube.query([n1]).attr('neighbors').length;
//     var d2:number = networkcube.query([n2]).attr('neighbors').length;
//     console.log('d1, d2', d1, d2);
//     return d2-d1;
// }



// function updateWindowSize(){
//     width = window.innerWidth;
//     height = window.innerHeight;
//     console.log(width, height);

//     timeSvg.attr('width', width)

//     svg.attr('width', width)
//         .attr('height', height) 

//     renderer.setSize(width, height);
// }



function getCellWeightLabel(l:networkcube.Link){
    var val = hoveredLinks[0].weights(startTime, endTime).get(0);    
    return Math.round(val * 1000) / 1000;
}
