///-----------------------------------------------------------------------------------------------------------------
/// brainView.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - manages a 3D view of the brain, with support for brushing and linking.
///-----------------------------------------------------------------------------------------------------------------
/// <reference path="../../core/networkcube.d.ts"/>
/// <reference path="../widgets/widgets.d.ts" />
/// <reference path="../utils/animations.d.ts" />


var SPHERE_RADIUS = 2;
var COLOR_LINK = 0x333333;
var COLOR_NODE = 0x666666;
var COLOR_HIGHLIGHT = 0xff0000;

var OPACITY_LINE_DEFAULT = .5;

var LINK_WIDTH_FACTOR = 10;

var DURATION: number = 500;


class NBounds {
    left: number;
    top: number;
    constructor(v: number) {
        this.left = v;
        this.top = v;
    }
}

var width: number = window.innerWidth;
var height: number = window.innerHeight;

var urlVars: Object = networkcube.getUrlVars();


// GET DATA
var _graph: networkcube.DynamicGraph = networkcube.getDynamicGraph();
var startTime: networkcube.Time = _graph.startTime;
var endTime: networkcube.Time = _graph.endTime;

// EVENT HANDLERS
networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);


// data
var brainModel;
var nodes = _graph.nodes().toArray();
var links = _graph.links().toArray();
//var _windowCount = endTime.id - startTime.id;
var _correlations = _graph.links();

// colors
var _defaultColor = 0x293d66;
var _overColor = 0xe31a1c;

// current state
var _subjectSelection: number;
var _currentTime: number;

var _ctx: CanvasRenderingContext2D;
var _drawTimer = 0;

// create timeslider
var timeSvg = d3.select('#menubar')
    .append('svg')
    .attr('width', width)
    .attr('height', 50);

var linkWtFilterWidth = width - 150;
var linkWtFilterSvg = d3.select('#footerbar')
    .append('svg')
    .style('float', 'right')
    .attr('width', linkWtFilterWidth)
    .attr('height', 50);

var vector; // mous vector
var canvasWidth: number = width;
var canvasHeight: number = height - $('#menubar').height() - $('#footerbar').height();

// layoutView();

// function layoutView() {
//     //---- size CANVAS ----
//     jQuery("#nodelinkArea")
//         .attr("width", canvasWidth)
//         .attr("height", canvasHeight)

//     //
//     // //---- size OUTER height ----
//     // jQuery("#outer")
//     //     .css("height", canvasHeight)
// }

//// 3D brain

// hard coded data

// 3D elements
var container: any;
var camera: any;
var scene: any;
var renderer: any;
var controls: any;
var canvas: any;

// indexes to retrieve 3D objects
var links3D: any;
var node3DIndices: any;

var nodes3D = [];
var timeSlider: TimeSlider;
var linkWeightFilterSlider: RangeSlider;

var transition: animations.Transition;

load3DBrain();

function load3DBrain() {
    init();
    animate();
}

function init() {

    var container = document.createElement('div');
    $('#maindiv').append(container);

    camera = new THREE.PerspectiveCamera(45,
        canvasWidth / canvasHeight, 1, 2000)
    camera.position.z = 300;

    controls = new (<any>THREE).TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];
    controls.enabled = false;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0x1f1f1f);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0x1f1f1f);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);


    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        //console.log(item, loaded, total);
    };

    // brainsurface model
    var loader = new (<any>THREE).OBJLoader(manager);
    //loader.load('BrainMesh_ch2.obj', loadBrainSurface);
    loader.load('BrainMesh_ICBM152_smoothed.obj', loadBrainSurface);

    //ROIs
    createNodeLink3D();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0xFFFFFF, 1);
    canvas = renderer.domElement;
    $('#menubar').after(canvas);
    canvas.addEventListener('mousemove', (function (thisclass) {
        return function (e) {
            thisclass.mousemove(e)
        }
    })(this));
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('mouseover', mouseOver);
    canvas.addEventListener('click', click);


    // attach timeslider
    timeSlider = new TimeSlider(_graph, width - 50);
    timeSlider.appendTo(timeSvg);

    linkWeightFilterSlider = new RangeSlider(50, 25, linkWtFilterWidth - 100, -1, 1, 0.5, true);
    linkWeightFilterSlider.appendTo(linkWtFilterSvg);
    linkWeightFilterSlider.setDragEndCallBack((min, max) => {
        updateEvent(null);
    });
    $('#invertFilter').click(function (e) {
        linkWeightFilterSlider.setIsInverted($('#invertFilter').prop('checked'));
        updateEvent(null);
    });
}

function createNodeLink3D() {

    // create spheres for each ROIs and position in MNI space
    node3DIndices = [];
    var nodesColors = [];
    //#293d66;
    var defaultColor = new THREE.Color(COLOR_NODE);
    var node: networkcube.Node  ;
    // assign positions
    for (var i = 0; i < nodes.length; i++) {
        nodesColors[i] = defaultColor;
        node = nodes[i];
        var location = node.locations().last();
        node.x = location.x();
        node.y = location.y();
        node.z = location.z();
        node.radius = location.radius();

        var ROIMaterial = new THREE.MeshBasicMaterial({ color: COLOR_NODE, shading: THREE.NoShading });
        var radius = SPHERE_RADIUS;
        if (node.radius)
            radius = node.radius;
        var node3D = new THREE.Mesh(new THREE.SphereGeometry(node.radius, 20, 20), ROIMaterial);
        node3D.position.set(node.x, node.y, node.z);

        // keep index to update node color/visibility later
        node3DIndices.push(scene.children.length);
        nodes3D.push(node3D)
        node['mesh'] = node3D;
        scene.add(node3D);
    }

    // create correlations objects
    links3D = [];
    var link;
    for (var i = 0; i < links.length; i++) {
        link = links[i];
        var u = link.source
        var v = link.target;
        var corrValue = link.weights(startTime, endTime).mean()

        if (!corrValue || corrValue < 0)
            continue;

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(u.x, u.y, u.z));
        geometry.vertices.push(new THREE.Vector3(v.x, v.y, v.z));

        var correlationMaterial = new THREE.LineBasicMaterial({
            color: COLOR_LINK,
            transparent: true,
            opacity: OPACITY_LINE_DEFAULT,
            linewidth: corrValue * LINK_WIDTH_FACTOR
        })

        var line = new THREE.Line(geometry, correlationMaterial);
        //keep index to update the links later
        links3D.push(line);
        scene.add(line);
    }

}

function isOutsideLinkWeightFilter(v: number): boolean {
    if (linkWeightFilterSlider.isInverted) {
        if (v > linkWeightFilterSlider.min && v < linkWeightFilterSlider.max)
            return true;
        else
            return false;

    } else {
        if (v < linkWeightFilterSlider.min || v > linkWeightFilterSlider.max)
            return true;
        else
            return false;
    }
}

function updateLinks() {
    var corrValue: number;
    var link: networkcube.Link;
    var color;
    for (var i = 0; i < links3D.length; i++) {
        link = links[i];
        // we use the values mean to determine whether to display the link
        var linkIsVisible: boolean = true;
        if (!link.isVisible()) {
            linkIsVisible = false;
        } else if (isOutsideLinkWeightFilter(link.weights(startTime, endTime).mean())) {
            linkIsVisible = false;
        }

        if (!linkIsVisible) {
            // remove from display
            if (links3D[i].material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(
                    links3D[i],
                    0,
                    DURATION
                ));
            }
            continue;
        }
        // test whether not present already
        if (links3D[i].material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(
                links3D[i],
                OPACITY_LINE_DEFAULT,
                DURATION
            ));
        }

        // corrValue = link.weights(startTime, endTime).mean()
        // if (!corrValue || corrValue < 0)
        //     continue;

        links3D[i].material.linewidth = corrValue * LINK_WIDTH_FACTOR;
        if (link.isHighlighted()) {
            color = COLOR_HIGHLIGHT;
        } else if (link.isSelected()) {
            color = networkcube.getPriorityColor(link);
            if (!color)
                color = COLOR_LINK;
        } else {
            color = COLOR_LINK;
        }

        links3D[i].material.color = new THREE.Color(color);
    }
}

function updateNodes() {

    var node: networkcube.Node;
    var color;
    var n3d;
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        n3d = node['mesh'];


        // CHECK AND UPDATE VISIBILITY
        if (!node.isVisible()) {
            n3d.material.opacity = 0;
            n3d.material.transparent = true;
            continue;
        }

        // test whether not present already
        if (n3d.material.opacity == 0) {
            n3d.material.opacity = 1;
            n3d.material.transparent = false;
        }

        if (node.isHighlighted()) {
            color = COLOR_HIGHLIGHT
        } else if (node.isSelected()) {
            color = networkcube.getPriorityColor(node);
            if (!color) {
                color = COLOR_NODE;
            }
        } else {
            color = COLOR_NODE;
        }
        n3d.material.color = new THREE.Color(color);
    }
}

function loadBrainSurface(object) {

    object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            child.material
                = new THREE.MeshLambertMaterial({
                    color: 0xbbbbbb,
                    transparent: true,
                    opacity: 0.1,
                    side: THREE.DoubleSide
                });
        }

    });

    object.position.set(0, 0, 0);
    brainModel = object;
    scene.add(object);
}

function animate(): void {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {

    renderer.render(scene, camera);
}

function mousemove(event) {

    // Ray cast to detect if user hovers ROI
    vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var dir = new THREE.Vector3();

    vector.set(
        ((event.clientX - 10) / canvasWidth) * 2 - 1,
        - ((event.clientY - (height - canvasHeight) - 11) / canvasHeight) * 2 + 1,
        0.5); // z = 0.5 important!

    vector.unproject(camera);

    raycaster.set(camera.position,
        vector.sub(camera.position).normalize());

    var hoveredLinks;
    // Look for intersected links
    var intersected = raycaster.intersectObjects(links3D);
    var index
    if (intersected.length > 0) {
        for (var i = 0; i < intersected.length; i++) {
            index = links3D.indexOf(intersected[i].object)
            hoveredLinks = [links[index]];
        }
    }

    // Look for intersected nodes
    var hoveredNodes;
    intersected = raycaster.intersectObjects(nodes3D);
    if (intersected.length > 0) {
        for (var i = 0; i < intersected.length; i++) {
            index = nodes3D.indexOf(intersected[i].object)
            hoveredNodes = [nodes[index]];
            if (!nodes[index].isHighlighted()) {
                $('#brainROIlabel').remove();

                //draw ROI label text
                var text2 = document.createElement('div');
                text2.setAttribute('id', 'brainROIlabel')
                text2.style.position = 'absolute';
                text2.innerHTML = nodes[index].label();
                text2.style.top = (event.clientY - 10) + 'px';
                text2.style.left = (event.clientX + 20) + 'px';
                text2.style.fontSize = "20px";
                document.body.appendChild(text2);
            }
        }
    } else {
        $('#brainROIlabel').remove();
    }
    networkcube.highlight('set', <networkcube.ElementCompound>{ links: hoveredLinks });
    networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: hoveredNodes });

    renderer.render(scene, camera);
}

function click() {

    // test for which nodes must be added to selection
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isHighlighted()) {
            // if(nodes[i].isSelected()){
            //     networkcube.selection('remove', {nodeIds: [nodes[i].map((n,i)=>n.id)]});
            // }else{
            //     networkcube.selection('add', {nodes: [nodes[i].map((n,i)=>n.id)]});
            // }
            if (!nodes[i].isSelected()) {
                // if this element has not been selected yet,
                // add it to current selection.
                networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [nodes[i]] });
            } else {
                var selections = nodes[i].getSelections();
                var currentSelection = _graph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [nodes[i]] });
                        return;
                    }
                }
                // current selection has not been found among already
                // assigned selections, hence add this selection
                networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [nodes[i]] });
            }
        }
    }

    // test for which links must be added to selection
    for (var i = 0; i < links.length; i++) {
        if (links[i].isHighlighted()) {
            // if(links[i].isSelected()){
            //     networkcube.selection('remove', {links: [links[i]]});
            // }else{
            //     networkcube.selection('add', {links: [links[i]]});
            // }
            if (!links[i].isSelected()) {
                // if this element has not been selected yet,
                // add it to current selection.
                networkcube.selection('add', <networkcube.ElementCompound>{ links: [links[i]] });
            } else {
                var selections = links[i].getSelections();
                var currentSelection = _graph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', <networkcube.ElementCompound>{ links: [links[i]] });
                        return;
                    }
                }
                // current selection has not been found among already
                // assigned selections, hence add this selection
                networkcube.selection('add', <networkcube.ElementCompound>{ links: [links[i]] });
            }
        }
    }
}


function setFrontLook() {
    controls.reset();
    camera.position.set(0, 300, -50);
    render();
}
function setSideLook() {
    controls.reset();
    camera.position.set(-300, 0, 0);
    render();
}
function setTopLook() {
    controls.reset();
    camera.rotation.set(90 * Math.PI / 180, 0, 0)
    camera.position.set(0, 0, 300);
    render();
}

function showBrain() {
    console.log("brainview::showBrain" + $('#brainModel').prop("checked"));
    if ($('#brainModel').prop("checked"))
        scene.add(brainModel);
    else
        scene.remove(brainModel);
    render();
}


function timeRangeHandler(m: networkcube.TimeRangeMessage) {
    startTime = _graph.time(m.startId);
    endTime = _graph.time(m.endId);
    updateLinks();
    timeSlider.set(startTime, endTime);
}

// Disables trackball controls, otherwise bugs
function mouseOut() {
    console.log('mouseOut')
    controls.enabled = false;
}
// Enables trackball controls again after mouse out
function mouseOver() {
    console.log('mouseOver')
    controls.enabled = true;
}




// NETWORKCUBE EVENTS

function updateEvent(m: networkcube.Message) {

    transition = new animations.Transition(render);

    updateLinks();
    updateNodes();

    transition.start();

    render();
}
