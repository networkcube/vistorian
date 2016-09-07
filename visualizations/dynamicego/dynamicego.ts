/// <reference path="../../core/networkcube.d.ts"/>
/// <reference path="../widgets/widgets.d.ts" />

// DATA
var dgraph: networkcube.DynamicGraph = networkcube.getDynamicGraph();
networkcube.setDefaultEventListener(updateEventHandler);
networkcube.addEventListener('timeRange', timeRangeHandler);


var nodes = dgraph.nodes().toArray();
var links = dgraph.links().toArray();
var times = dgraph.times().toArray();
var linkTypes = dgraph.links().linkTypes();

// VIS PARAMETERS
var WIDTH = window.innerWidth;
var TABLE_LEFT = 200
var TABLE_RIGHT = 100
var ROW_HEIGHT = 13;
var COL_WIDTH = 10;
var LINK_OPACITY= .2
var NODE_OPACITY= .6
var LINK_ANCHOR_RADIUS = 3;
var ANCHOR_END_DIAMETER = 3;
var ANCHOR_START_DIAMETER = 2;
var NODE_LABEL_COLOR = '#000'
var NODE_LABEL_WEIGHT = 300
var LABEL_ORDER
var CIRCLE_SEGMENTS = 7;
var SCROLL_CHUNK = 2;
var TIME_TICK_GAP_MAX = 12;
var TIMELABEL_OPACITY = .3;
var MARGIN_TOP = 70;
var TABLE_TOP = 50;



// VIS ELEMENTS
var svg;
var nodeYPosFunction = d3.scale.linear();
var timeXFunction = d3.scale.linear();
// var linkTypeOffset = d3.scale.linear().range([0,ROW_HEIGHT]);
// var linkTypeOffset = d3.scale.linear().range([ROW_HEIGHT/2,ROW_HEIGHT/2]);
var bar;
var row
var startAnchors:glutils.WebGLElementQuery<networkcube.Link,THREE.Mesh>;
var endAnchors:glutils.WebGLElementQuery<networkcube.Link,THREE.Mesh>;
var arcs:glutils.WebGLElementQuery<networkcube.Link,THREE.Mesh>;
var tickTimes = []
// var timeLabels:glutils.WebGLElementQuery<networkcube.Time,THREE.Mesh>;
var timeLabelHoverFields;
var egoNode:networkcube.Node;

// STATES
var isShownNoneEgoLinks = true;
var yearOffset = 0
var timeStartId = times[0].id();
var timeEndId = times[times.length-1].id();
var nodesScrollStart = 0;
var cell_width = 13
var granualarity = dgraph.getMinGranularity();
var globalNodeOrder = nodes.slice(0);
var currentNodeOrder=[]
for(var i=0 ; i<globalNodeOrder.length ; i++){
    currentNodeOrder.push(i);
}

// VIS FUNCTIONS
var lineFunction = d3.svg.line()
    .x((d)=>{ return d.x; })
    .y((d)=>{ return d.y; })
    .interpolate("basis");


// UI SETUP


var HEIGHT = window.innerHeight;
$('#visDiv').append('<svg id="visSvg"><foreignObject id="visCanvasFO"></foreignObject></svg>');
// $('#visCanvasFO').append(canvas);
d3.select('#visCanvasFO')
    .attr('x', TABLE_LEFT)
    .attr('y', MARGIN_TOP)
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    
    
/////////////
/// WEBGL ///
/////////////

// var vertexShaderProgram = "attribute vec4 customColor;varying vec4 vColor;void main() {vColor = customColor;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );}";
// var fragmentShaderProgram = "varying vec4 vColor;void main() {gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);}";

var webgl = glutils.initWebGL('visCanvasFO', WIDTH, HEIGHT);
webgl.enablePanning(false);
webgl.camera.position.x = WIDTH/2;
webgl.camera.position.y = -HEIGHT/2;
webgl.camera.position.z = 1000;


// VERTICAL SCROLL EVENT
window.addEventListener("mousewheel", mouseWheelHandler, false);

$('#menu').append('\
            <select id="labelOrdering" onchange="updateGlobalOrder()">\
                <option value="data">As appear in table</option>\
                <option value="alphanumerical">Alphanumerical</option>\
                <option value="degree">Number of connections</option>\
            </select>\
            '); 

var timeSlider:TimeSlider = new TimeSlider(dgraph, WIDTH-100-TABLE_LEFT);

// init webgl raycaster
this.visualize();

function visualize(){
    
    // SET UP GLOBAL PARAMETERS
    cell_width = (WIDTH-TABLE_LEFT-TABLE_RIGHT) / times.length;
    nodeYPosFunction.domain([0,nodes.length-1])
        .range([TABLE_TOP+ROW_HEIGHT, TABLE_TOP+ROW_HEIGHT*nodes.length])

    timeXFunction.domain([0,times.length-1])
        .range([cell_width, times.length*cell_width])
    
    // linkTypeOffset.domain([0,linkTypes.length-1]);
    // linkTypeOffset.domain([0,linkTypes.length-1]);
    
    
    // create svg
    // for timeslider and labels only
    svg = d3.select('#visSvg')
        .attr('width', WIDTH)
        .attr('height', ROW_HEIGHT*nodes.length + 200)
    timeSlider.appendTo(svg, TABLE_LEFT);


    createNodes()
    createTimes()
    createLinks()

    webgl.render();
}

var rowBars;
function createNodes(){   

    // DRAW NODES
    row = svg.selectAll('.nodeLabel')
        .data(nodes)
        .enter()
        .append('text')
            .attr('x', TABLE_LEFT)
            .attr('y', (d)=>MARGIN_TOP+nodeYPosFunction(currentNodeOrder[d.id()]) + ROW_HEIGHT-5)
            .text((d)=>{ return d.label() + ' ('+d.neighbors().size()+')';})
            .attr('class', 'nodeLabel')
            .style('font-weight', NODE_LABEL_WEIGHT)
            .style('fill', NODE_LABEL_COLOR)
            .on('mouseover', (d, i) => {
                networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
            })
            .on('mouseout', (d, i) => {
                networkcube.highlight('reset');
            })
            .on('click', (d, i) => {
                showEgoNetwork(d)
            }); 

    
    // draw row bars
    rowBars = glutils.selectAll()
        .data(nodes.slice(0))
        .filter((d,i)=> i%2==0 )
        .append('rect')
        .attr('x', 5)
        .attr('y', (d,i)=>-nodeYPosFunction(i*2))
        .attr('width', WIDTH-TABLE_LEFT-TABLE_RIGHT)
        .attr('height', ROW_HEIGHT)
        .style('fill', (d,i)=>i%3==2?0xdddddd:0xeeeeee)
        .style('stroke', (d,i)=>i%3==2?0xdddddd:0xeeeeee)

}

function createTimes(){
          
    // timeLabels = glutils.selectAll()
    //     .data(times)
    //     .append('text')
    //         .attr('x', (d,i)=> this.timeXFunction(i))
    //         .attr('y', (d)=> -TABLE_TOP + getTimeFormatted(d).length*8/2)
    //         .attr('z', 1)
    //         .style('fill', (d)=>NODE_LABEL_COLOR)
    //         .attr('rotation', 90)
    //         .style('font-size',10)
    //         .style('opacity',0)
    //         .text((d:networkcube.Time)=>{
    //             return getTimeFormatted(d);
    //         })
    
    timeLabelHoverFields = glutils.selectAll()
        .data(times)
        .append('rect')
            .attr('x', (d,i)=> this.timeXFunction(i)-6)
            .attr('y', (d)=> -TABLE_TOP + getTimeFormatted(d).length*8)
            .attr('z', 2)
            // .style('fill', '#ff0000')
            .style('opacity', 0)
            .attr('width', 12)
            .attr('height', (d)=> getTimeFormatted(d).length*8)
            .on('mouseover', (d, i) => {
                console.log('mouse over time !!!')
                networkcube.highlight('set', <networkcube.ElementCompound>{ times: [d] });
            })
            .on('mouseout', (d, i) => {
                networkcube.highlight('reset');
            })
            // .on('click', (d, i) => {
            //     var selections = d.getSelections();
            //     var currentSelection = this.dgraph.getCurrentSelection();
            //     for (var j = 0; j < selections.length; j++) {
            //         if (selections[j] == currentSelection) {
            //             networkcube.selection('remove', <networkcube.ElementCompound>{ times: [d] });
            //             return;
            //         }
            //     }
            //     networkcube.selection('add', <networkcube.ElementCompound>{ times: [d] });
            // });  
     
     updateTimeGranularity();
    
}

function getTimeFormatted(d){
    return networkcube.formatAtGranularity(d.time(), 7) + '-' + networkcube.formatAtGranularity(d.time(), 6)
}

function createLinks(){ 
        
        var l:networkcube.Link;
        var geometry;
        var material
        var c, curve;
        var points;
        var x, y1, y2;
        var p;
        var splineObject;
        var yOffset;
        
        // CREATE ANCHORS
        startAnchors = glutils.selectAll().data(links);
        startAnchors.append('circle')
            .attr('x', (l,i)=>this.timeXFunction(l.times().toArray()[0].id()))
            .attr('y', (l,i)=>{
                y1 = this.nodeYPosFunction(currentNodeOrder[l.source.id()]);
                // yOffset = linkTypeOffset(this.linkTypes.indexOf(l.linkType()));
                yOffset = ROW_HEIGHT/2;
                return  -(y1 + yOffset)-ANCHOR_START_DIAMETER/2;
            })
            .attr('r', ANCHOR_START_DIAMETER)
            .style('fill', (l)=>l.getSelections()[0].color)
            .on('mouseover', (d, i) => {
                networkcube.highlight('set', <networkcube.ElementCompound>{ links: [d] });
            })
            .on('mouseout', (d, i) => {
                networkcube.highlight('reset');
            })
        // CREATE ANCHORS
        endAnchors = glutils.selectAll().data(links);
        endAnchors.append('circle')
            .attr('x', (l,i)=>this.timeXFunction(l.times().toArray()[0].id()))
            .attr('y', (l,i)=>{
                y2 = this.nodeYPosFunction(currentNodeOrder[l.target.id()]);
                // yOffset = linkTypeOffset(this.linkTypes.indexOf(l.linkType()));
                yOffset = ROW_HEIGHT/2;
                return  -(y2 + yOffset)+ANCHOR_END_DIAMETER/2;
            })
            .attr('r', ANCHOR_END_DIAMETER)
            .style('fill', (l)=>l.getSelections()[0].color)
            .on('mouseover', (d, i) => {
                networkcube.highlight('set', <networkcube.ElementCompound>{ links: [d] });
            })
            .on('mouseout', (d, i) => {
                networkcube.highlight('reset');
            })
 
         // CREATE ARCS
         arcs = glutils.selectAll()
            .data(links)
            .append('path')
            .attr('d', (l)=>makeArcPath(l))
            .attr('x', (l,i)=>this.timeXFunction(l.times().toArray()[0].id()))
            // .attr('y', (l,i)=>-linkTypeOffset(this.linkTypes.indexOf(l.linkType())))
            .attr('y', (l,i)=>-ROW_HEIGHT/2)
            .attr('z', 10)
            .style('stroke', (l)=> l.getSelections()[0].color)
            .style('stroke-width', 1)
            .style('opacity', .3)
            .on('mouseover', (d, i) => {
                console.log('mouseover arc!!!')
                networkcube.highlight('set', <networkcube.ElementCompound>{ links: [d] });
            })
            .on('mouseout', (d, i) => {
                console.log('mouseout arc :()')
                networkcube.highlight('reset');
            })
    }


// UPDATES

function timeRangeHandler(m:networkcube.TimeRangeMessage){    
    
    var start = dgraph.time(m.startId)
    var end = dgraph.time(m.endId)

    timeSlider.set(start, end);

    // update timeXFunction
    cell_width = (WIDTH - TABLE_LEFT - TABLE_RIGHT)/(end.id() - start.id())
    timeXFunction
        .domain([start.id(), end.id()])
        .range([cell_width, (end.id()-start.id()) * cell_width])
        
    timeStartId = start.id();
    timeEndId = end.id();
    
    // update link positions
    arcs   
        .attr('x', (l,i) => timeXFunction(l.times().toArray()[0].id()))
        .style('opacity', (l,i)=>timeXFunction(l.times().toArray()[0].id())<5?0:1)

    startAnchors   
        .attr('x', (l,i)=>timeXFunction(l.times().toArray()[0].id()))
        .style('opacity', (l,i)=>timeXFunction(l.times().toArray()[0].id())<5?0:1)

    endAnchors   
        .attr('x', (l,i)=>timeXFunction(l.times().toArray()[0].id()))
        .style('opacity', (l,i)=>timeXFunction(l.times().toArray()[0].id())<5?0:1)
    
    updateLinks();
    
    // update time positions and visibility
    
    // timeLabels
    //     .attr('x', (d,i) => timeXFunction(d.id()))
    //     .style('opacity', (d)=> d.id()<timeStartId || d.id()>timeEndId ? 0:TIMELABEL_OPACITY)
    // timeLabelHoverFields
    //     .attr('x', (d,i) => timeXFunction(d.id())-6)
    
    // need to change granularity? 
    // var num_ticks = Math.floor((WIDTH-TABLE_LEFT-TABLE_RIGHT) / cell_width);

    
    updateTimeGranularity()

    webgl.render();
}

function updateTimeGranularity(){
    
    tickTimes = dgraph.times().toArray();
    granualarity = dgraph.getMinGranularity();
    var tick_width = cell_width
    var allWidth = tickTimes.length * tick_width; 
    while (
        tickTimes.length > 0 
        && granualarity <= dgraph.getMaxGranularity()
        && tick_width < TIME_TICK_GAP_MAX) {
        granualarity++;
        tickTimes = [];
        var curr_t = times[0].time();
        var id = 1;
        var count = 0
        var d
        while (id < times.length) {
            if (granualarity == 1) {
                if (times[id].time().second() != curr_t.second()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 2) {
                if (times[id].time().minute() != curr_t.minute()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 3) {
                if (times[id].time().hour() != curr_t.hour()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 4) {
                if (times[id].time().day() != curr_t.day()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 5) {
                if (times[id].time().week() != curr_t.week()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 6) {
                if (times[id].time().month() != curr_t.month()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            } else if (granualarity == 7) {
                if (times[id].time().year() != curr_t.year()) {
                    curr_t = times[id].time();
                    tickTimes.push(times[id])
                }
            }
            id++;
        }
        tick_width = allWidth / tickTimes.length;
        
    }    
   
    updateTimes(); 
}

function updateEventHandler(m:networkcube.Message){
    if(m.type == networkcube.MESSAGE_SELECTION_FILTER){
        updateCurrentOrder();
        return;
    }else{        
        updateLinks();
        updateNodes();
        updateTimes();
        webgl.render();
    }

}

function updateCurrentOrder(){
    currentNodeOrder = []
    for(var i=0 ; i <this.nodes.length ; i++){
        currentNodeOrder.push(-1);    
    }
    var rank=0
    var n;
    for(var i=0 ; i <globalNodeOrder.length ; i++){
        // console.log('rank', rank)
        if(globalNodeOrder[i].isVisible()){
            // console.log('\trank', rank)
            currentNodeOrder[globalNodeOrder[i].id()] = rank
            rank++;
        }
    }
    console.log('currentNodeOrder', currentNodeOrder)
 
    nodeYPosFunction.domain([0, rank])
        .range([TABLE_TOP+ROW_HEIGHT, TABLE_TOP+ROW_HEIGHT*(rank - nodesScrollStart)])

 
    updateNodePositions(1000);
    updateLinkPositions();
    updateLinks();
    webgl.render();
}

function updateLinks(){
    // console.log('nodesScrollStart', nodesScrollStart)
    arcs
        .style('stroke-width', (d)=>
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?2:1)
        .style('opacity', (d:networkcube.Link)=>
            !d.isVisible()
            || currentNodeOrder[d.source.id()] < nodesScrollStart
            || currentNodeOrder[d.target.id()] < nodesScrollStart
            || d.times().get(0).id() < timeStartId 
            || d.times().get(0).id() > timeEndId 
            ?0:
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?1:.5)
        .style('stroke', (d:networkcube.Link)=>d.getSelections()[0].showColor?d.getSelections()[0].color:'#999')

    endAnchors
        .attr('r', (d)=>
            d.isHighlighted() 
            || d.source.isHighlighted()  
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?LINK_ANCHOR_RADIUS+1:LINK_ANCHOR_RADIUS)
        .style('opacity', (d:networkcube.Link)=>
            !d.isVisible()
            // || currentNodeOrder[d.source.id()] < nodesScrollStart
            || currentNodeOrder[d.target.id()] < nodesScrollStart
            || d.times().get(0).id() < timeStartId 
            || d.times().get(0).id() > timeEndId 
            ?0:
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?1:.5)
        .style('fill', (d:networkcube.Link)=>d.getSelections()[0].showColor?d.getSelections()[0].color:'#999')

    startAnchors
        .style('opacity', (d:networkcube.Link)=>
            !d.isVisible()
            || currentNodeOrder[d.source.id()] < nodesScrollStart
            // || currentNodeOrder[d.target.id()] < nodesScrollStart
            || d.times().get(0).id() < timeStartId 
            || d.times().get(0).id() > timeEndId 
            ?0:
            d.isHighlighted() 
            || d.source.isHighlighted() 
            || d.target.isHighlighted()
            || d.times().highlighted().size() > 0
            ?1:.5)
        .style('fill', (d:networkcube.Link)=>d.getSelections()[0].showColor?d.getSelections()[0].color:'#999')
}

function updateNodes()
{
    d3.selectAll('.nodeLabel')
        .style('font-weight', (d)=>d.isHighlighted() || d.links().highlighted().size()>0 || d.neighbors().highlighted().size()>0 ?900:NODE_LABEL_WEIGHT)
        .style('text-decoration', (d)=>d.isHighlighted()?'underline':'none')
        .style('fill', (d:networkcube.Node)=>{
            var color = undefined;
            if (d.isSelected()) {
                color = networkcube.getPriorityColor(d);
            }
            if (!color)
                color = NODE_LABEL_COLOR;
            return color;
        })
        .style('opacity', (n)=>currentNodeOrder[n.id()]>=nodesScrollStart?n==egoNode?1:NODE_OPACITY:0)
        .text((n)=>egoNode==n?'EGO-->' + n.label()+' ('+n.neighbors().size() + ')': n.label()+' ('+n.neighbors().size() + ')')
}

function updateNodePositions(duration:number){
    d3.selectAll('.nodeLabel')
        .transition().duration(duration)
        .attr('y', (d)=>MARGIN_TOP+nodeYPosFunction(currentNodeOrder[d.id()]) + ROW_HEIGHT -5)
        // .style('opacity', (n)=>currentNodeOrder[n.id()]>=nodesScrollStart?1:0)
        .style('opacity', (n)=>currentNodeOrder[n.id()]>=nodesScrollStart?n==egoNode?1:NODE_OPACITY:0)

}
function updateLinkPositions(){
    var y1,y2, yOffset, points;
    startAnchors
        .attr('y', (l,i)=>{
            y1 = this.nodeYPosFunction(currentNodeOrder[l.source.id()]);
            // yOffset = linkTypeOffset(this.linkTypes.indexOf(l.linkType()));
            yOffset = ROW_HEIGHT/2;
            return  -(y1 + yOffset)-ANCHOR_START_DIAMETER/2;
        })
    endAnchors
        .attr('y', (l,i)=>{
            y2 = this.nodeYPosFunction(currentNodeOrder[l.target.id()]);
            // yOffset = linkTypeOffset(this.linkTypes.indexOf(l.linkType()));
            yOffset = ROW_HEIGHT/2;
            return  -(y2 + yOffset)+ANCHOR_END_DIAMETER/2;
        })
     arcs
        .attr('d', (l)=>makeArcPath(l))     
}



function updateTimes(){

    // timeLabels
    //     .style('fill', (d)=>d.isHighlighted()
    //         || d.links().highlighted().size() > 0 
    //         || d.links().sources().highlighted().size() > 0  
    //         || d.links().targets().highlighted().size() > 0  
    //         ?'#000':NODE_LABEL_COLOR)
    //     .style('opacity', (d)=>
    //         d.id()>=timeStartId
    //         && d.id()<= timeEndId
    //         && (d.links().highlighted().size() > 0 
    //         || d.isHighlighted())
    //         || tickTimes.indexOf(d) > -1
    //         ?1:
    //             d.links().highlighted().size() == 0?TIMELABEL_OPACITY:0
    //     )
}



function mouseWheelHandler(event){
    event.preventDefault();

    if(
        event.wheelDelta == 0
    || nodesScrollStart >= nodes.length-5 && event.wheelDelta < 0
    || nodesScrollStart == 0 && event.wheelDelta > 0){
        return;
    }

    var dir = event.wheelDelta>0?-1:1;
    nodesScrollStart += SCROLL_CHUNK * dir
    nodesScrollStart = Math.max(0,Math.min(nodes.length-1, nodesScrollStart))
    
    nodeYPosFunction.domain([nodesScrollStart, nodes.length-1])
        .range([TABLE_TOP+ROW_HEIGHT, TABLE_TOP+ROW_HEIGHT*(nodes.length - nodesScrollStart)])

    rowBars
        .attr('y', (d,i)=>-nodeYPosFunction(i*2))
        .style('opacity', (d,i)=> (i*2)<(nodesScrollStart) || i*2 > globalNodeOrder.length ?0:1)
           
    updateLinkPositions();
    updateNodePositions(0);    
    updateLinks();
    updateNodes();
    webgl.render();
}





/// HELPER


function updateGlobalOrder(validNodes?:networkcube.Node[])
{
        if(validNodes == undefined)
            globalNodeOrder = dgraph.nodes().toArray();
        else
            globalNodeOrder = validNodes;
            

        var menu = document.getElementById('labelOrdering');
        LABEL_ORDER = menu.options[menu.selectedIndex].value;
        if(LABEL_ORDER == 'alphanumerical'){
            globalNodeOrder.sort(compareFunc);
        }else if(LABEL_ORDER == 'data'){
            // already in data ordering
        }else if(LABEL_ORDER == 'degree'){
            globalNodeOrder.sort(function(a,b){
                return b.neighbors().length - a.neighbors().length})
        }else if(LABEL_ORDER == 'similarity'){
            var config: networkcube.OrderingConfiguration = new networkcube.OrderingConfiguration();
            config.start = times[0];
            config.end = times[times.length-1];
            config.nodes = globalNodeOrder
            config.links = dgraph.links().presentIn(config.start, config.end).visible().toArray();
            var nodeOrder = networkcube.orderNodes(dgraph, config);
            globalNodeOrder = []
            for(var i=0 ; i<nodeOrder.length ; i++){
                globalNodeOrder.push(dgraph.node(nodeOrder[i]));
            }
        }
        console.log('globalNodeOrder', globalNodeOrder)
        updateCurrentOrder();
}

function compareFunc(a,b) {
    return a.label() < b.label()?-1:1;
}
    
function makeArcPath(link:networkcube.Link):Object[]{
    var y1p = nodeYPosFunction(currentNodeOrder[link.source.id()]);
    var y2p = nodeYPosFunction(currentNodeOrder[link.target.id()]);
    var y1 = Math.min(y1p,y2p)
    var y2 = Math.max(y2p,y1p)
    var points = [];
    points.push({x: 0, y:-y1})
    points.push({x: 0+Math.abs(y1-y2)/5, y:-(y1 + (y2-y1)/6)})
    points.push({x: 0+Math.abs(y1-y2)/5, y:-(y2 - (y2-y1)/6)})
    points.push({x: 0, y:-y2})
    
    var vectors = []
    for(var i=0 ; i < points.length ; i++){
        vectors.push(new THREE.Vector2(points[i].x, points[i].y))
    }
    return glutils.curve(points);
}


function showEgoNetwork(n:networkcube.Node){
    if(egoNode == n){
        egoNode = undefined;
        updateGlobalOrder()
    }else{
        egoNode = n;
        var a = egoNode.neighbors().removeDuplicates().toArray()
        if(a.indexOf(egoNode) == -1)
            a.push(egoNode);
        updateGlobalOrder(a)        
    }
    d3.selectAll('.nodeLabel')
        .style('opacity', (n)=>currentNodeOrder[n.id()]>=nodesScrollStart?n==egoNode?1:NODE_OPACITY:0)
    
    rowBars
        .attr('y', (d,i)=>-nodeYPosFunction(i*2))
        .style('opacity', (d,i)=> (i*2)<(nodesScrollStart) || i*2 > globalNodeOrder.length ?0:1)

}

