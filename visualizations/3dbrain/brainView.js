var SPHERE_RADIUS = 2;
var COLOR_LINK = 0x333333;
var COLOR_NODE = 0x666666;
var COLOR_HIGHLIGHT = 0xff0000;
var OPACITY_LINE_DEFAULT = .5;
var LINK_WIDTH_FACTOR = 10;
var DURATION = 500;
var NBounds = (function () {
    function NBounds(v) {
        this.left = v;
        this.top = v;
    }
    return NBounds;
}());
var width = window.innerWidth;
var height = window.innerHeight;
var urlVars = networkcube.getUrlVars();
var _graph = networkcube.getDynamicGraph();
var startTime = _graph.startTime;
var endTime = _graph.endTime;
networkcube.setDefaultEventListener(updateEvent);
networkcube.addEventListener('timeRange', timeRangeHandler);
var brainModel;
var nodes = _graph.nodes().toArray();
var links = _graph.links().toArray();
var _correlations = _graph.links();
var _defaultColor = 0x293d66;
var _overColor = 0xe31a1c;
var _subjectSelection;
var _currentTime;
var _ctx;
var _drawTimer = 0;
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
var vector;
var canvasWidth = width;
var canvasHeight = height - $('#menubar').height() - $('#footerbar').height();
var container;
var camera;
var scene;
var renderer;
var controls;
var canvas;
var links3D;
var node3DIndices;
var nodes3D = [];
var timeSlider;
var linkWeightFilterSlider;
var transition;
load3DBrain();
function load3DBrain() {
    init();
    animate();
}
function init() {
    var container = document.createElement('div');
    $('#maindiv').append(container);
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 2000);
    camera.position.z = 300;
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
    controls.enabled = false;
    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0x1f1f1f);
    scene.add(ambient);
    var directionalLight = new THREE.DirectionalLight(0x1f1f1f);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);
    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
    };
    var loader = new THREE.OBJLoader(manager);
    loader.load('BrainMesh_ICBM152_smoothed.obj', loadBrainSurface);
    createNodeLink3D();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0xFFFFFF, 1);
    canvas = renderer.domElement;
    $('#menubar').after(canvas);
    canvas.addEventListener('mousemove', (function (thisclass) {
        return function (e) {
            thisclass.mousemove(e);
        };
    })(this));
    canvas.addEventListener('mouseout', mouseOut);
    canvas.addEventListener('mouseover', mouseOver);
    canvas.addEventListener('click', click);
    timeSlider = new TimeSlider(_graph, width - 50);
    timeSlider.appendTo(timeSvg);
    linkWeightFilterSlider = new RangeSlider(50, 25, linkWtFilterWidth - 100, -1, 1, 0.5, true);
    linkWeightFilterSlider.appendTo(linkWtFilterSvg);
    linkWeightFilterSlider.setDragEndCallBack(function (min, max) {
        updateEvent(null);
    });
    $('#invertFilter').click(function (e) {
        linkWeightFilterSlider.setIsInverted($('#invertFilter').prop('checked'));
        updateEvent(null);
    });
}
function createNodeLink3D() {
    node3DIndices = [];
    var nodesColors = [];
    var defaultColor = new THREE.Color(COLOR_NODE);
    var node;
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
        node3DIndices.push(scene.children.length);
        nodes3D.push(node3D);
        node['mesh'] = node3D;
        scene.add(node3D);
    }
    links3D = [];
    var link;
    for (var i = 0; i < links.length; i++) {
        link = links[i];
        var u = link.source;
        var v = link.target;
        var corrValue = link.weights(startTime, endTime).mean();
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
        });
        var line = new THREE.Line(geometry, correlationMaterial);
        links3D.push(line);
        scene.add(line);
    }
}
function isOutsideLinkWeightFilter(v) {
    if (linkWeightFilterSlider.isInverted) {
        if (v > linkWeightFilterSlider.min && v < linkWeightFilterSlider.max)
            return true;
        else
            return false;
    }
    else {
        if (v < linkWeightFilterSlider.min || v > linkWeightFilterSlider.max)
            return true;
        else
            return false;
    }
}
function updateLinks() {
    var corrValue;
    var link;
    var color;
    for (var i = 0; i < links3D.length; i++) {
        link = links[i];
        var linkIsVisible = true;
        if (!link.isVisible()) {
            linkIsVisible = false;
        }
        else if (isOutsideLinkWeightFilter(link.weights(startTime, endTime).mean())) {
            linkIsVisible = false;
        }
        if (!linkIsVisible) {
            if (links3D[i].material.opacity > 0) {
                transition.add(new animations.OpacityAnimation(links3D[i], 0, DURATION));
            }
            continue;
        }
        if (links3D[i].material.opacity == 0) {
            transition.add(new animations.OpacityAnimation(links3D[i], OPACITY_LINE_DEFAULT, DURATION));
        }
        links3D[i].material.linewidth = corrValue * LINK_WIDTH_FACTOR;
        if (link.isHighlighted()) {
            color = COLOR_HIGHLIGHT;
        }
        else if (link.isSelected()) {
            color = networkcube.getPriorityColor(link);
            if (!color)
                color = COLOR_LINK;
        }
        else {
            color = COLOR_LINK;
        }
        links3D[i].material.color = new THREE.Color(color);
    }
}
function updateNodes() {
    var node;
    var color;
    var n3d;
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        n3d = node['mesh'];
        if (!node.isVisible()) {
            n3d.material.opacity = 0;
            n3d.material.transparent = true;
            continue;
        }
        if (n3d.material.opacity == 0) {
            n3d.material.opacity = 1;
            n3d.material.transparent = false;
        }
        if (node.isHighlighted()) {
            color = COLOR_HIGHLIGHT;
        }
        else if (node.isSelected()) {
            color = networkcube.getPriorityColor(node);
            if (!color) {
                color = COLOR_NODE;
            }
        }
        else {
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
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}
function render() {
    renderer.render(scene, camera);
}
function mousemove(event) {
    vector = new THREE.Vector3();
    var raycaster = new THREE.Raycaster();
    var dir = new THREE.Vector3();
    vector.set(((event.clientX - 10) / canvasWidth) * 2 - 1, -((event.clientY - (height - canvasHeight) - 11) / canvasHeight) * 2 + 1, 0.5);
    vector.unproject(camera);
    raycaster.set(camera.position, vector.sub(camera.position).normalize());
    var hoveredLinks;
    var intersected = raycaster.intersectObjects(links3D);
    var index;
    if (intersected.length > 0) {
        for (var i = 0; i < intersected.length; i++) {
            index = links3D.indexOf(intersected[i].object);
            hoveredLinks = [links[index]];
        }
    }
    var hoveredNodes;
    intersected = raycaster.intersectObjects(nodes3D);
    if (intersected.length > 0) {
        for (var i = 0; i < intersected.length; i++) {
            index = nodes3D.indexOf(intersected[i].object);
            hoveredNodes = [nodes[index]];
            if (!nodes[index].isHighlighted()) {
                $('#brainROIlabel').remove();
                var text2 = document.createElement('div');
                text2.setAttribute('id', 'brainROIlabel');
                text2.style.position = 'absolute';
                text2.innerHTML = nodes[index].label();
                text2.style.top = (event.clientY - 10) + 'px';
                text2.style.left = (event.clientX + 20) + 'px';
                text2.style.fontSize = "20px";
                document.body.appendChild(text2);
            }
        }
    }
    else {
        $('#brainROIlabel').remove();
    }
    networkcube.highlight('set', { links: hoveredLinks });
    networkcube.highlight('set', { nodes: hoveredNodes });
    renderer.render(scene, camera);
}
function click() {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].isHighlighted()) {
            if (!nodes[i].isSelected()) {
                networkcube.selection('add', { nodes: [nodes[i]] });
            }
            else {
                var selections = nodes[i].getSelections();
                var currentSelection = _graph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', { nodes: [nodes[i]] });
                        return;
                    }
                }
                networkcube.selection('add', { nodes: [nodes[i]] });
            }
        }
    }
    for (var i = 0; i < links.length; i++) {
        if (links[i].isHighlighted()) {
            if (!links[i].isSelected()) {
                networkcube.selection('add', { links: [links[i]] });
            }
            else {
                var selections = links[i].getSelections();
                var currentSelection = _graph.getCurrentSelection();
                for (var j = 0; j < selections.length; j++) {
                    if (selections[j] == currentSelection) {
                        networkcube.selection('remove', { links: [links[i]] });
                        return;
                    }
                }
                networkcube.selection('add', { links: [links[i]] });
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
    camera.rotation.set(90 * Math.PI / 180, 0, 0);
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
function timeRangeHandler(m) {
    startTime = _graph.time(m.startId);
    endTime = _graph.time(m.endId);
    updateLinks();
    timeSlider.set(startTime, endTime);
}
function mouseOut() {
    console.log('mouseOut');
    controls.enabled = false;
}
function mouseOver() {
    console.log('mouseOver');
    controls.enabled = true;
}
function updateEvent(m) {
    transition = new animations.Transition(render);
    updateLinks();
    updateNodes();
    transition.start();
    render();
}

//# sourceMappingURL=brainView.js.map
