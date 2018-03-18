var COLOR_DEFAULT_LINK = '#999999';
var COLOR_DEFAULT_NODE = '#999999';
var COLOR_HIGHLIGHT = '#ff8800';
var INNER_OPACITY = .8;
var NODE_UNPOSITIONED_OPACITY = .4;
var LOCATION_MARKER_WIDTH = 10;
var OVERLAP_FRACTION = .3;
var NODE_SIZE = 4;
var OUT_OF_TIME_NODES_OPACITY = 0;
var LABEL_OFFSET_X = 20;
var SHOW_NON_PLACE = true;
var width = window.innerWidth;
var height = window.innerHeight - 100;
var margin = { left: 20, top: 20 };
var TIMELINE_HEIGHT = 50;
var MENU_HEIGHT = 50;
var dgraph = networkcube.getDynamicGraph();
var links = dgraph.links().toArray();
var times = dgraph.times().toArray();
var locations = dgraph.locations().toArray();
for (var i = 0; i < locations.length; i++) {
    locations[i]['npos'] = [];
}
var time_start = dgraph.time(0);
var time_end = dgraph.times().last();
var mapCanvas = d3.select('#visDiv').node();
$(mapCanvas).css('width', '100%');
$(mapCanvas).css('height', $(window).height() - 60);
var emptyNodePositions = {};
var nodePositionObjects = [];
var nodePositionObjectsLookupTable = [];
var NodePositionObject = (function () {
    function NodePositionObject() {
        this.timeIds = [];
        this.fixedPosition = true;
        this.inLinks = [];
        this.outLinks = [];
        this.inNeighbors = [];
        this.outNeighbors = [];
    }
    return NodePositionObject;
}());
var overlay;
var map;
var linkWeightScale = d3.scale.linear().range([0, 2]);
linkWeightScale.domain([
    0,
    dgraph.links().weights().max()
]);
networkcube.setDefaultEventListener(updateEvent);
var color = d3.scale.category20();
dgraph.nodes().toArray().forEach(function (n) {
    n['width'] = n.attr('label').length * 5 + 10,
        n['height'] = 10;
});
var nodeSizeFunction = d3.scale.linear()
    .domain([0, 100])
    .range([NODE_SIZE, NODE_SIZE]);
var svg;
var line;
var visualNodes;
var visualLinks;
var vNodeLabels;
var vNodeLabelBackgrounds;
var geoProjection;
var layer;
var locationsPanelDiv;
var locationDisplayTimeoutHandle = -1;
var prevIntersectedLink;
var prevIntersectedNode;
var intersectedLink;
var intersectedNode;
var prevDist;
var f;
var F = 1000;
function init() {
    var _this = this;
    var mapOptions = {
        center: new google.maps.LatLng(48.8588589, 2.3470599),
        zoom: 5,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        draggableCursor: 'cooperative',
        styles: [
            {
                "featureType": "landscape", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "poi", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "road.highway", "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "road.local", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "transit", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative.province", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative.locality", "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    { "lightness": 60 }
                ]
            },
            {
                "featureType": "water", "elementType": "labels", "stylers": [
                    { "visibility": "off" },
                ]
            },
            {
                "featureType": "water", "elementType": "geometry", "stylers": [
                    { "lightness": 100 },
                ]
            },
            {
                featureType: "administrative.country", elementType: "labels", stylers: [
                    { visibility: "off" }
                ]
            },
        ]
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    map.addListener('zoom_changed', function () {
        $('#weirdDiv').css('width', window.innerWidth * Math.random());
        $('#weirdDiv').parent().parent().css('width', window.innerWidth * Math.random());
    });
    var lastPanUpdate = window.performance.now();
    map.addListener('center_changed', function (e) {
        var current = window.performance.now();
        var delta = current - lastPanUpdate;
        if (delta < 1000) {
            var pps = (1000 / delta).toFixed(0);
        }
        lastPanUpdate = current;
        $('#weirdDiv').css('width', window.innerWidth * Math.random());
        $('#weirdDiv').parent().parent().css('width', window.innerWidth * Math.random());
        var northWest = { x: map.getBounds().getSouthWest().lng(), y: map.getBounds().getNorthEast().lat() };
    });
    overlay = new google.maps.OverlayView();
    overlay.onAdd = function () {
        layer = document.createElement('div');
        $(layer).attr('id', 'weirdDiv');
        $(layer).css('width', '100%');
        locationsPanelDiv = document.createElement('div');
        $(locationsPanelDiv).attr('id', 'locationsPanel').addClass('hidden');
        this.getPanes().overlayLayer.appendChild(layer);
        this.getPanes().overlayLayer.appendChild(locationsPanelDiv);
        function hideLocationsWindow() {
            $(locationsPanelDiv).addClass('hidden').removeClass('shown');
        }
        map.addListener('mouseout', function (ev) {
            hideLocationsWindow();
        });
        geoProjection = this.getProjection();
        svg = d3.select(layer).append("svg:svg")
            .attr('id', 'svgOverlay')
            .style('overflow', 'visible');
        var locationMarker = svg.selectAll('.locationMarker')
            .data(locations)
            .enter()
            .append('g')
            .attr('class', 'locationMarker');
        locationMarker.append('rect')
            .attr('width', LOCATION_MARKER_WIDTH)
            .attr('height', LOCATION_MARKER_WIDTH)
            .attr('x', -LOCATION_MARKER_WIDTH / 2)
            .attr('y', -LOCATION_MARKER_WIDTH / 2)
            .style('opacity', .4);
        var defs = svg.append('svg:defs');
        defs.append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 6)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-3L10,0L0,3L2,0')
            .attr('stroke-width', '0px')
            .attr('fill', '#555')
            .attr('opacity', .5)
            .attr('transform', 'translate(-5, 0)');
        var grad = defs.append('svg:linearGradient')
            .attr('id', 'line-gradient');
        grad.append('svg:stop')
            .attr('offset', 0)
            .attr('stop-color', '#000');
        grad.append('svg:stop')
            .attr('offset', .5)
            .attr('stop-color', '#000');
        grad.append('svg:stop')
            .attr('offset', 1)
            .attr('stop-color', '#eee');
        svg = svg.append('g');
        line = d3.svg.line()
            .x(function (d) { return d.x; })
            .y(function (d) { return d.y; })
            .interpolate("basis");
        visualLinks = svg.selectAll(".link")
            .data(dgraph.links().toArray())
            .enter()
            .append("path")
            .attr("class", "link")
            .style('fill', 'none')
            .on('mouseover', function (d, i) {
            networkcube.highlight('set', { links: [d] });
        })
            .on('mouseout', function (d) {
            networkcube.highlight('reset');
        });
        var npo;
        var nodes = dgraph.nodes().toArray();
        var n, positions;
        var googleLatLng;
        var serie;
        for (var i = 0; i < nodes.length; i++) {
            n = nodes[i];
            positions = n.locationSerie().serie;
            serie = new networkcube.ScalarTimeSeries();
            nodePositionObjectsLookupTable.push(serie);
            for (var tId in positions) {
                googleLatLng = new google.maps.LatLng(positions[tId].latitude(), positions[tId].longitude());
                npo = getNodePositionObjectsForLocation(n, positions[tId].longitude(), positions[tId].latitude());
                npo.location = positions[tId];
                if (positions[tId].npos.indexOf(npo) == -1) {
                    positions[tId].npos.push(npo);
                }
                npo.geoPos = googleLatLng;
                npo.timeIds.push(parseInt(tId));
                serie.set(dgraph.time(parseInt(tId)), npo);
            }
        }
        var loc;
        visualLinks
            .each(function (link) {
            link.sourceNPO = getNodePositionObjectAtTime(link.source, link.times().get(0).id());
            link.sourceNPO.outLinks.push(link);
            link.targetNPO = getNodePositionObjectAtTime(link.target, link.times().get(0).id());
            link.targetNPO.inLinks.push(link);
            link.sourceNPO.outNeighbors.push(link.targetNPO);
            link.targetNPO.inNeighbors.push(link.sourceNPO);
        });
        visualNodes = svg.selectAll(".node")
            .data(nodePositionObjects)
            .enter()
            .append('g');
        visualNodes.append("circle")
            .attr("class", "nodeCircle")
            .attr("r", function (d) {
            return nodeSizeFunction(d.node.neighbors().length);
        });
        vNodeLabelBackgrounds = visualNodes.append("rect")
            .attr("class", "nodeLabelBackground")
            .attr('rx', 2)
            .attr('ry', 2)
            .attr('x', LABEL_OFFSET_X)
            .attr('y', -7)
            .attr("width", function (d) { return getTextWidth(createNodeLabel(d)); })
            .attr("height", 18)
            .attr('visibility', 'hidden');
        vNodeLabels = visualNodes.append('text')
            .text(function (d) { return createNodeLabel(d); })
            .attr('x', LABEL_OFFSET_X + 2)
            .attr('y', 7)
            .attr('class', 'nodeLabel')
            .attr('visibility', 'hidden');
        updateNodeDisplacementVectors();
        updateNodePositions();
        updateLinks();
        updateNodes();
    };
    map.addListener('mousemove', function (ev) {
        if (locationDisplayTimeoutHandle >= 0) {
            window.clearTimeout(locationDisplayTimeoutHandle);
        }
        var minDist = .5 * F;
        var mouse = { x: ev.latLng.lng() * F, y: ev.latLng.lat() * F };
        var pos;
        intersectedNode = undefined;
        var projection = overlay.getProjection();
        var d;
        for (var i = 0; i < nodePositionObjects.length; i++) {
            pos = projection.fromDivPixelToLatLng({ x: nodePositionObjects[i].x, y: nodePositionObjects[i].y });
            pos = { x: pos.lng() * F, y: pos.lat() * F };
            d = Math.hypot(mouse.x - pos.x, mouse.y - pos.y);
            if (isNaN(d))
                continue;
            if (d < minDist) {
                intersectedNode = nodePositionObjects[i].node;
                minDist = d;
            }
        }
        intersectedLink = undefined;
        if (intersectedNode == undefined) {
            var l;
            var sourceNPO, targetNPO;
            var sourcePoint, targetPoint;
            for (var i = 0; i < _this.links.length; i++) {
                l = _this.links[i];
                if (!l.isVisible())
                    continue;
                sourceNPO = l.sourceNPO;
                if (sourceNPO == undefined) {
                    sourcePoint = { x: 0, y: 0 };
                }
                else {
                    sourcePoint = projection.fromDivPixelToLatLng({ x: sourceNPO.x, y: sourceNPO.y });
                    sourcePoint = { x: sourcePoint.lng() * F, y: sourcePoint.lat() * F };
                }
                targetNPO = l.targetNPO;
                if (targetNPO == undefined) {
                    targetPoint = { x: 0, y: 0 };
                }
                else {
                    targetPoint = projection.fromDivPixelToLatLng({ x: targetNPO.x, y: targetNPO.y });
                    targetPoint = { x: targetPoint.lng() * F, y: targetPoint.lat() * F };
                }
                d = distToSegmentSquared(mouse, sourcePoint, targetPoint);
                if (isNaN(d))
                    continue;
                if (d < minDist) {
                    intersectedLink = l;
                    minDist = d;
                }
            }
        }
        if (prevIntersectedNode != intersectedNode) {
            networkcube.highlight('reset');
            if (intersectedNode != undefined) {
                networkcube.highlight('set', { nodes: [intersectedNode] });
            }
        }
        prevIntersectedNode = intersectedNode;
        if (prevIntersectedLink != intersectedLink) {
            networkcube.highlight('reset');
            if (intersectedLink != undefined) {
                intersectedNode == undefined;
                networkcube.highlight('set', { links: [intersectedLink] });
            }
        }
        prevIntersectedLink = intersectedLink;
        if (intersectedLink == undefined && intersectedNode == undefined) {
            _this.displayLocationsWindow(overlay.getProjection(), ev.pixel, ev.latLng);
        }
    });
    overlay.draw = function () {
        updateGeoNodePositions();
        updateNodePositions();
        updateLocationMarkers();
    };
    overlay.setMap(map);
}
function createNodeLabel(npo) {
    var locationLabel;
    if (npo.location == undefined || npo.location.label() == undefined)
        locationLabel = '';
    else
        locationLabel = npo.location.label() + ', ';
    return npo.node.label() + ' (' + moment(dgraph.time(npo.timeIds[0]).unixTime()).format('MM/DD/YYYY') + ')';
}
var hittestRect = null;
var hittestRadius = 20;
function displayLocationsWindow(currentProjection, point, latLng) {
    var projection = currentProjection;
    if (hittestRect != null && !hittestRect.contains(projection.fromContainerPixelToLatLng(point))) {
        $(locationsPanelDiv).addClass('hidden').removeClass('shown');
    }
    var southwest = new google.maps.Point(point.x - hittestRadius, point.y + hittestRadius);
    var northeast = new google.maps.Point(point.x + hittestRadius, point.y - hittestRadius);
    hittestRect = new google.maps.LatLngBounds(projection.fromContainerPixelToLatLng(southwest), projection.fromContainerPixelToLatLng(northeast));
    var foundLocations = [];
    locations.forEach(function (v, i, arr) {
        var latlng = new google.maps.LatLng(v.latitude(), v.longitude());
        if (hittestRect.contains(latlng))
            foundLocations.push(v);
    });
    var foundNodes;
    if (foundLocations.length > 0) {
        foundNodes = hittestNodeGeoPositions(hittestRect);
    }
    else {
        return false;
    }
    var locationGroups = [];
    foundLocations.forEach(function (v, i, arr) {
        locationGroups.push({
            loc: v,
            nodes: foundNodes.filter(function (v2, i2, arr2) {
                var nodeLoc = getNodeLocation(v2);
                return nodeLoc !== null && nodeLoc.label() == v.label();
            })
        });
    });
    var panelContents;
    $(locationsPanelDiv).html('');
    var locListItemSelection = d3.select(locationsPanelDiv)
        .selectAll('.locListItem')
        .data(locationGroups)
        .enter()
        .append('div')
        .attr('class', 'locListItem');
    locListItemSelection
        .append('p')
        .attr('class', 'locpara')
        .append('nobr')
        .text(function (d) { return d.loc.label(); });
    locListItemSelection
        .selectAll('.nodeListItem')
        .data(function (d, i) { return d.nodes; })
        .enter()
        .append('p')
        .attr('class', 'nodeListItem')
        .append('nobr')
        .text(function (d) { return d.label(); });
    var translatePoint = projection.fromLatLngToDivPixel(latLng);
    translatePoint.x += 20;
    translatePoint.y -= 30;
    $(locationsPanelDiv)
        .css('left', translatePoint.x.toString() + 'px')
        .css('top', translatePoint.y.toString() + 'px')
        .addClass('shown').removeClass('hidden');
    return true;
}
function hittestNodeGeoPositions(bounds) {
    var pos;
    var result = [];
    var n, locations;
    var llpos;
    for (var i = 0; i < dgraph.nodes().length; i++) {
        n = dgraph.node(i);
        locations = n.locations(time_start, time_end).toArray();
        for (var j = 0; j < locations.length; j++) {
            llpos = new google.maps.LatLng(locations[j].latitude(), locations[j].longitude());
            if (bounds.contains(llpos))
                result.push(dgraph.node(i));
        }
    }
    return result;
}
function getNodeRelevantLocation(node) {
    if (node.locations().length == 0)
        return null;
    else
        return node.locations().last();
}
function getNodeLatLng(node) {
    if (node.locations().length == 0) {
        return new google.maps.LatLng(0, 0);
    }
    else {
        return new google.maps.LatLng(node.locations().last().latitude(), node.locations().last().longitude());
    }
}
function getNodeLocation(node) {
    if (node.locations().length == 0) {
        return null;
    }
    else {
        return node.locations().last();
    }
}
function updateGeoNodePositions() {
    var pos;
    var npo;
    for (var i = 0; i < this.nodePositionObjects.length; i++) {
        npo = this.nodePositionObjects[i];
        pos = geoProjection.fromLatLngToDivPixel(npo.geoPos);
        if (pos.x == undefined) {
            npo.xOrig = 0;
            npo.yOrig = 0;
        }
        else {
            npo.xOrig = pos.x;
            npo.yOrig = pos.y;
        }
    }
}
function updateLinks() {
    visualLinks
        .transition().duration(100)
        .style('stroke', function (d) {
        var color = networkcube.getPriorityColor(d);
        if (!color)
            color = COLOR_DEFAULT_LINK;
        return color;
    })
        .attr('opacity', function (d) {
        var visible = d.isVisible();
        if (!visible || !d.presentIn(time_start, time_end))
            return 0;
        if (intersectedLink != undefined) {
            if (intersectedLink == d)
                return 1;
            else
                return INNER_OPACITY * .3;
        }
        return d.isHighlighted()
            || d.source.isHighlighted()
            || d.target.isHighlighted() ?
            Math.min(1, INNER_OPACITY + .2) : INNER_OPACITY;
    })
        .style('stroke-width', function (d) {
        var weight = linkWeightScale(d.weights(time_start, time_end).mean());
        if (weight < 0) {
            weight = -weight;
            d3.select(this).attr('stroke-dasharray', '1,2');
        }
        else {
            d3.select(this).attr('stroke-dasharray', '0');
        }
        if (d.isHighlighted())
            weight *= 2;
        return weight;
    });
}
var visibleLabels = [];
function updateNodes() {
    visibleLabels = [];
    visualNodes
        .attr('opacity', function (d) {
        if (!d.node.isVisible())
            return 0;
        return d.timeIds[0] <= time_end.id() && d.timeIds[d.timeIds.length - 1] >= time_start.id() ?
            1
            : OUT_OF_TIME_NODES_OPACITY;
    });
    svg.selectAll(".nodeCircle")
        .classed('highlighted', function (n) {
        return n.node.isHighlighted()
            || n.node.links().highlighted().length > 0
            || n.node.neighbors().highlighted().length > 0;
    })
        .style('fill', function (d) {
        var color;
        if (d.node.isHighlighted()) {
            color = COLOR_HIGHLIGHT;
        }
        else {
            color = networkcube.getPriorityColor(d.node);
        }
        if (!color)
            color = COLOR_DEFAULT_NODE;
        return color;
    })
        .style('opacity', function (d) {
        if (!d.node.isVisible())
            return 0;
        return d.timeIds[0] <= time_end.id() && d.timeIds[d.timeIds.length - 1] >= time_start.id() ?
            d.fixedPosition ?
                1 :
                NODE_UNPOSITIONED_OPACITY
            : OUT_OF_TIME_NODES_OPACITY;
    });
    vNodeLabels
        .attr('visibility', function (n) {
        var visible = n.node.isHighlighted()
            || intersectedLink && n == intersectedLink.sourceNPO
            || intersectedLink && n == intersectedLink.targetNPO;
        var npo1, npo2;
        if (visible) {
            for (var i = 0; i < visibleLabels.length; i++) {
                npo1 = n;
                npo2 = visibleLabels[i];
                var l1 = npo1.x + LABEL_OFFSET_X;
                var r1 = npo1.x + LABEL_OFFSET_X + npo1.node.label().length * 8;
                var t1 = npo1.y - 7;
                var b1 = npo1.y + 7;
                var l2 = npo2.x + LABEL_OFFSET_X;
                var r2 = npo2.x + LABEL_OFFSET_X + npo2.node.label().length * 8;
                var t2 = npo2.y - 7;
                var b2 = npo2.y + 7;
                visible = r1 < l2 || r2 < l1 || t1 > b2 || t2 > b1;
                if (visible) {
                    continue;
                }
                if (npo1.node == npo2.node) {
                    break;
                }
                else {
                    var leftFlip = npo1;
                    var rightFlip = npo2;
                    if (l1 > l2) {
                        rightFlip = npo1;
                        leftFlip = npo2;
                    }
                    vNodeLabels
                        .filter(function (n) { return n == rightFlip; })
                        .attr('x', LABEL_OFFSET_X)
                        .attr('text-anchor', 'start');
                    vNodeLabels
                        .filter(function (n) { return n == leftFlip; })
                        .attr('x', -LABEL_OFFSET_X)
                        .attr('text-anchor', 'end');
                    vNodeLabelBackgrounds
                        .filter(function (n) { return n == rightFlip; })
                        .attr('x', LABEL_OFFSET_X)
                        .attr('text-anchor', 'start')
                        .attr('visibility', 'visible');
                    vNodeLabelBackgrounds
                        .filter(function (n) { return n == leftFlip; })
                        .attr('x', function (d) { return -LABEL_OFFSET_X - getTextWidth(createNodeLabel(d)); })
                        .attr('text-anchor', 'end')
                        .attr('visibility', 'visible');
                    visible = true;
                }
            }
        }
        if (visible)
            visibleLabels.push(n);
        return visible ? 'visible' : 'hidden';
    });
    vNodeLabelBackgrounds
        .filter(function (m) { return visibleLabels.indexOf(m) > -1; })
        .attr('visibility', 'visible');
    vNodeLabelBackgrounds
        .filter(function (m) { return visibleLabels.indexOf(m) == -1; })
        .attr('visibility', 'hidden');
}
function updateLocationMarkers() {
    d3.selectAll('.locationMarker')
        .attr("transform", function (d) {
        var pos = new google.maps.LatLng(d.latitude(), d.longitude());
        var pixelpos = geoProjection.fromLatLngToDivPixel(pos);
        return 'translate(' + (pixelpos.x) + ',' + (pixelpos.y) + ')';
    });
}
function updateLinkPaths() {
    var path, dir, offset, center;
    var link;
    var sourceNPO, targetNPO;
    var EDGE_GAP = 5;
    var cx1, cy1, cx2, cy2;
    for (var i = 0; i < dgraph.links().length; i++) {
        link = dgraph.link(i);
        sourceNPO = link.sourceNPO;
        if (sourceNPO == undefined)
            sourceNPO = { x: 0, y: 0 };
        targetNPO = link.targetNPO;
        if (targetNPO == undefined)
            targetNPO = { x: 0, y: 0 };
        dir = {
            x: targetNPO.x - sourceNPO.x,
            y: targetNPO.y - sourceNPO.y
        };
        offset = stretchVector([-dir.y, dir.x], EDGE_GAP);
        center = {
            x: sourceNPO.x + dir.x / 2,
            y: sourceNPO.y + dir.y / 2
        };
        if (sourceNPO.x == targetNPO.x
            && sourceNPO.y == targetNPO.y) {
            cx1 = center.x + 30 + Math.random() * 30;
            cy1 = center.y - 10 + Math.random() * 30;
            cx2 = center.x + 10 + Math.random() * 30;
            cy2 = center.y - 30 + Math.random() * 30;
            link['path'] = [
                { x: sourceNPO.x, y: sourceNPO.y },
                { x: cx1, y: cy1 },
                { x: cx2, y: cy2 },
                { x: targetNPO.x, y: targetNPO.y }
            ];
        }
        else {
            cx1 = center.x;
            cy1 = center.y;
            cx2 = cx1;
            cy2 = cy1;
            link['path'] = [
                { x: sourceNPO.x, y: sourceNPO.y },
                { x: targetNPO.x, y: targetNPO.y }
            ];
        }
    }
    visualLinks
        .attr("d", function (d) { return line(d.path); });
}
function showLabel(i, b) {
    if (b) {
        d3.select('#nodeLabelBackground_' + i)
            .attr('visibility', 'visible');
        d3.select('#nodeLabel_' + i)
            .attr('visibility', 'visible');
    }
    else {
        d3.select('#nodeLabelBackground_' + i)
            .attr('visibility', 'hidden');
        d3.select('#nodeLabel_' + i)
            .attr('visibility', 'hidden');
    }
}
function setRelationTypeVisibility(relType, b) {
    d3.selectAll('.link')
        .filter(function (d) {
        return d.type == relType;
    })
        .style('opacity', function (d) {
        return b ? 1 : 0;
    });
}
var timeSvg = d3.select('#timelineDiv')
    .append('svg')
    .attr('width', width)
    .attr('height', TIMELINE_HEIGHT);
var OVERLAP_SLIDER_WIDTH = 100;
if (dgraph.times().size() > 1) {
    var timeSlider = new TimeSlider(dgraph, width - OVERLAP_SLIDER_WIDTH - 20);
    timeSlider.appendTo(timeSvg);
    networkcube.addEventListener('timeRange', timeChangedHandler);
}
var menuDiv = d3.select('#menuDiv');
networkcube.makeSlider(menuDiv, 'Node Overlap', 100, MENU_HEIGHT, OVERLAP_FRACTION, -.05, 3, function (value) {
    OVERLAP_FRACTION = value;
    updateNodePositions();
});
var menuDiv = d3.select('#menuDiv');
networkcube.makeSlider(menuDiv, 'Link Opacity', 100, MENU_HEIGHT, INNER_OPACITY, 0, 1, function (value) {
    INNER_OPACITY = value;
    updateLinks();
});
var menuDiv = d3.select('#menuDiv');
networkcube.makeSlider(menuDiv, 'Opacity of Positionless Nodes', 200, MENU_HEIGHT, INNER_OPACITY, 0, 1, function (value) {
    NODE_UNPOSITIONED_OPACITY = value;
    updateNodes();
});
function stretchVector(vec, finalLength) {
    var len = 0;
    for (var i = 0; i < vec.length; i++) {
        len += Math.pow(vec[i], 2);
    }
    len = Math.sqrt(len);
    for (var i = 0; i < vec.length; i++) {
        vec[i] = vec[i] / len * finalLength;
    }
    return vec;
}
function timeChangedHandler(m) {
    time_start = times[0];
    time_end = times[times.length - 1];
    for (var i = 0; i < times.length; i++) {
        if (times[i].unixTime() > m.startUnix) {
            time_start = times[i - 1];
            break;
        }
    }
    for (i; i < times.length; i++) {
        if (times[i].unixTime() > m.endUnix) {
            time_end = times[i - 1];
            break;
        }
    }
    timeSlider.set(m.startUnix, m.endUnix);
    updateNodeDisplacementVectors();
    updateNodePositions();
    updateNodes();
    updateLinks();
}
function updateEvent(m) {
    if (m && m.type == 'timeRange' && dgraph.times().size() > 1) {
        time_start = dgraph.time(m.startId);
        time_end = dgraph.time(m.endId);
        timeSlider.set(time_start, time_end);
    }
    updateLinks();
    updateNodes();
}
function reorderLabels() {
    console.log('updateEvents');
}
function updateNodePositions() {
    var npo;
    for (var i = 0; i < nodePositionObjects.length; i++) {
        npo = nodePositionObjects[i];
        npo.x = npo.xOrig + npo.displacementVector[0] * OVERLAP_FRACTION;
        npo.y = npo.yOrig + npo.displacementVector[1] * OVERLAP_FRACTION;
    }
    for (var i = 0; i < nodePositionObjects.length; i++) {
        if (!nodePositionObjects[i].fixedPosition) {
            npo = nodePositionObjects[i];
            var x_bar = 0;
            var y_bar = 0;
            for (var j = 0; j < npo.inNeighbors.length; j++) {
                x_bar += npo.inNeighbors[j].x;
                y_bar += npo.inNeighbors[j].y;
            }
            for (var j = 0; j < npo.outNeighbors.length; j++) {
                x_bar += npo.outNeighbors[j].x;
                y_bar += npo.outNeighbors[j].y;
            }
            x_bar /= (npo.inNeighbors.length + npo.outNeighbors.length);
            y_bar /= (npo.inNeighbors.length + npo.outNeighbors.length);
            var x_vec = npo.x - x_bar;
            var y_vec = npo.y - y_bar;
            var d = Math.sqrt(x_vec * x_vec + y_vec * y_vec);
            if (d == 0) {
                d = 1;
            }
            x_vec /= d;
            y_vec /= d;
            npo.x = x_bar + 200 * x_vec;
            npo.y = y_bar + 200 * y_vec;
        }
    }
    visualNodes
        .attr("transform", function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
    });
    updateLinkPaths();
}
function updateNodeDisplacementVectors() {
    var l;
    var localNPOs;
    for (var i = 0; i < locations.length; i++) {
        l = locations[i];
        localNPOs = [];
        for (var j = 0; j < l.npos.length; j++) {
            if (l.npos[j].timeIds[0] <= time_end.id()
                && l.npos[j].timeIds[l.npos[j].timeIds.length - 1] >= time_start.id()) {
                localNPOs.push(l.npos[j]);
            }
        }
        if (localNPOs.length == 1) {
            localNPOs[0].displacementVector[0] = 0;
            localNPOs[0].displacementVector[1] = 0;
        }
        else {
            var alpha = Math.PI * 2 / localNPOs.length;
            var npo;
            var radius = localNPOs.length * NODE_SIZE / Math.PI;
            for (var j = 0; j < localNPOs.length; j++) {
                npo = localNPOs[j];
                npo.displacementVector[0] = Math.sin(alpha * j) * radius;
                npo.displacementVector[1] = Math.cos(alpha * j) * radius;
            }
        }
    }
}
function getNodePositionObjectsForLocation(n, long, lat) {
    var s = this.nodePositionObjectsLookupTable[n.id()];
    var npo;
    long = Math.round(long * 100) / 100;
    lat = Math.round(lat * 100) / 100;
    var a, b;
    if (s != undefined) {
        for (var t in s.serie) {
            a = Math.round(s.serie[t].geoPos.lng() * 100) / 100;
            b = Math.round(s.serie[t].geoPos.lat() * 100) / 100;
            if (a == long && b == lat) {
                return s.serie[t];
            }
        }
    }
    npo = new NodePositionObject();
    npo.node = n,
        npo.x = 0,
        npo.y = 0,
        npo.xOrig = 0,
        npo.yOrig = 0,
        npo.displaced = false;
    npo.displacementVector = [0, 0];
    nodePositionObjects.push(npo);
    return npo;
}
function getNodePositionObjectAtTime(n, tId) {
    var s = this.nodePositionObjectsLookupTable[n.id()];
    var npo;
    if (s.serie[tId] == undefined) {
        if (emptyNodePositions[n.id()] != undefined) {
            npo = emptyNodePositions[n.id()];
        }
        else {
            npo = new NodePositionObject();
            npo.x = 0;
            npo.y = 0;
            npo.timeIds.push(tId);
            npo.xOrig = 0;
            npo.yOrig = 0;
            npo.node = n;
            npo.geoPos = new google.maps.LatLng(0, 0);
            npo.displaced = false;
            npo.displacementVector = [0, 0];
            npo.fixedPosition = false;
            nodePositionObjects.push(npo);
            emptyNodePositions[n.id()] = npo;
        }
    }
    else {
        npo = s.serie[tId];
    }
    return npo;
}
function sqr(x) {
    return x * x;
}
function dist2(v, w) {
    return sqr(v.x - w.x) + sqr(v.y - w.y);
}
function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 == 0)
        return dist2(p, v);
    var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    if (t < 0)
        return dist2(p, v);
    if (t > 1)
        return dist2(p, w);
    return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
}
function getTextWidth(s) {
    return s.length * 8.8;
}
$(document).ready(function () { init(); });
