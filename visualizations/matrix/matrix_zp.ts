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
      this.setMargin(v);
    }
    setMargin(v: number){
      this.left = v;
      this.top = v;
    }
}

interface Box{
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

class MatrixMenu{
  private elem: JQuery;
  private matrix: Matrix;
  constructor(elem: JQuery, matrix: Matrix){
    this.elem = elem;
    this.matrix= matrix;
    this.init();
  }
  init(){
    this.elem.append(
      `Zoom:  <input id="cellSizeBox" type="range" 
      name="cellSizeBox" min="3" max="20" 
      onchange="matrix.updateCellSize()" 
      value="` + this.matrix.cellSize + '"/>');
    this.elem.append('<br/>');
    this.elem.append('<label>Label ordering:</label>');
    var orderingMenu = $("#networkcube-matrix-menu")
      .append('<select id="labelOrdering" onchange="reorderHandler()"></select>')
    $('#labelOrdering').append('<option value="none">---</option>');
    $('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
    $('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
    $('#labelOrdering').append('<option value="degree">Node degree</option>');
    $('#labelOrdering').append('<option value="similarity">Similarity</option>');

    this.elem.append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');

    //$('#dataName').text(this.matrix.dgraphName());
  }
}

class MatrixTimeSlider{
  private elem: JQuery;
  private matrix: Matrix;
  private width: number;
  private height: number;
  private svg: any;
  constructor(elem: JQuery, matrix: Matrix, width: number){
    this.elem = elem;
    this.matrix= matrix;
    this.width = width - 20;
    this.height = 50;
    this.init();
  }
  init(){
    this.svg = d3.select(this.elem.get(0))
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)

    var timeSlider: any = new TimeSlider(matrix.dgraph, vizWidth);
    timeSlider.appendTo(this.svg);

  }
}

class MatrixLabels{
  private elem: JQuery;
  private width: number;
  private height: number;
  private margin: NMargin;
  private matrix: Matrix;
  public svg: any;
  public _foreignObject: any;
  constructor(width: number, height: number,
              elem: JQuery, matrix: Matirx){
    this.width = width;
    this.height = height;
    this.margin = matrix.plotMargin;
    this.elem = elem;
    this.matrix = matrix;
    this.init();
  }

  init(){
    this.svg = d3.select(this.elem.get(0))
      .append('svg')
      .attr('id', 'networkcube-matrix-visSvg')
      .attr('width', this.width )
      .attr('height', this.height);
    this._foreignObject = this.svg.append('foreignObject')
      .attr('id', 'networkcube-matrix-visCanvasFO')
      .attr('x', this.margin.left)
      .attr('y', this.margin.top)
      .attr('width', this.width - this.margin.left )
      .attr('height', this.height - this.margin.top);
  }

  get foreignObject(){
    return this._foreignObject;
  }

}

class MatrixVisualization{
  private elem: any;
  public width: number;
  public height: number;
  private matrix: Matrix;
  private cellSize: number;
  private canvas: HTMLCanvasElement;
  private view: D3.Selection;
  private zoom: D3.Behavior.Zoom;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private vertexPositions: number[][];
  private vertexColors: number[][];
  private shaderMaterial: THREE.ShaderMaterial;
  private cellHighlightFrames: THREE.Mesh[]; 
  private cellSelectionFrames: THREE.Mesh[];
  private linkWeightScale: D3.Scale.LinearScale;
  
  private data:  {[id: number]: {[id: number]: networkcube.NodePair}};
  constructor(width: number, height: number, 
              elem: HTMLElement, matrix: Matirx){
    this.width = width;
    this.height = height;
    this.elem = elem;
    this.matrix = matrix;
    this.cellSize = matrix.cellSize;
    this.cellHighlightFrames = networkcube.array(undefined, matrix.numberOfLinks());
    this.cellSelectionFrames = networkcube.array(undefined,  matrix.numberOfLinks());
    this.linkWeightScale = d3.scale.linear().range([0, matrix.maxWeight()]);
    this.init();
  }
  init(){
    this.initWebGL();
    this.elem.node().appendChild(this.canvas);
    this.view = d3.select(this.canvas);
    this.zoom = d3.behavior.zoom()
        .scaleExtent([0.2, 4])
        .on('zoom', this.zoomed);
    this.view.call(this.zoom);
    this.initGeometry();

  }

  initWebGL(){
    this.scene = new THREE.Scene();
    // camera
    this.camera = new THREE.OrthographicCamera(
        this.width / -2,
        this.width / 2,
        this.height/ 2,
        this.height / -2,
        0, 1000)

    this.scene.add(this.camera);
    this.camera.position.x = this.width / 2;
    this.camera.position.y = -this.height / 2;
    this.camera.position.z = 100;

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0xffffff, 1);

    // raycaster
    var raycaster: THREE.Raycaster = new THREE.Raycaster()

    // position canvas element containing cells
    this.canvas = this.renderer.domElement;
    
    // set canvas listeners
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.canvas.addEventListener('mouseup', this.mouseUpHandler);
    this.canvas.addEventListener('click', this.clickHandler);

    // init glutils renderer for D3 wrapper
    glutils.setWebGL(this.scene, this.camera, this.renderer, this.canvas);
  }

  initGeometry(){
    var vertexShaderProgram = `
      attribute vec4 customColor;
      varying vec4 vColor;
      void main() {
        vColor = customColor;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );
      }`;
    var fragmentShaderProgram = `
      varying vec4 vColor;
      void main() {
        gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);
      }`;
    
    var attributes = {
        customColor: { type: 'c', value: [] }
    }

    // SHADERS
    this.shaderMaterial = new THREE.ShaderMaterial({
        attributes: attributes,
        vertexShader: vertexShaderProgram,
        fragmentShader: fragmentShaderProgram,
    });
    this.shaderMaterial.blending = THREE.NormalBlending;
    this.shaderMaterial.depthTest = true;
    this.shaderMaterial.transparent = true;
    this.shaderMaterial.side = THREE.DoubleSide;

    this.geometry = new THREE.BufferGeometry();
  }
  render() {
      var d = new Date();
      var begin = d.getTime()
      this.renderer.render(this.scene, this.camera)
      d = new Date();
       console.log('>>>> RENDERED ', (d.getTime() - begin), ' ms.');
  }

  updateData(data:  {[id: number]: {[id: number]: networkcube.NodePair}}){
    this.data = data;
    this.vertexPositions = [];
    this.vertexColors = [];

    if (this.geometry) {
        this.scene.remove(this.mesh);
    }
    
    //this.linksPos = {};

    for(var row in this.data){
        for( var col in data[row]){
           this.addCell(row, col, data[row][col]);
        }
    }


    // CREATE + ADD MESH
    this.geometry.addAttribute('position', new THREE.BufferAttribute(glutils.makeBuffer3f(this.vertexPositions), 3));

    this.geometry.addAttribute('customColor', new THREE.BufferAttribute(glutils.makeBuffer4f(this.vertexColors), 4));
    this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.geometry.attributes['customColor'].needsUpdate = true;

    this.scene.add(this.mesh);
    this.render();

  }

  addCell(row: number, col: number, pair: networkcube.NodePair){
    
    var links: networkcube.Link[];
    var e: networkcube.Link;
    var x, y, z: number;
    var linkNum: number;
    var seg: number;
    var meanWeight: number;
    var color: THREE.Color;
    var c: number;
    var webColor: string;

    links = pair.links().toArray();
    linkNum = links.length;
    seg = this.cellSize / linkNum;
    z = 1;

    for (var j = 0; j < links.length; j++) {
      e = links[j];

      x = this.cellSize/2 + col * this.cellSize - this.cellSize / 2 + seg * j + seg / 2;
      y = this.cellSize/2 + row * this.cellSize;
      webColor = networkcube.getPriorityColor(e);
      if (!webColor)
          webColor = '#000000';
      
      meanWeight = e.weights()? e.weights(this.matrix.startTime, this.matrix.endTime).mean(): 1;
      color = new THREE.Color(webColor);
      c = this.linkWeightScale(Math.abs(meanWeight));
      if (meanWeight > 0) {
          glutils.addBufferedRect(this.vertexPositions, x, -y, 0, seg - 1, this.cellSize - 1, this.vertexColors, [color.r, color.g, color.b, c])
      } else{ 
          glutils.addBufferedDiamond(this.vertexPositions, x, -y, 0, seg - 1, this.cellSize - 1, this.vertexColors, [color.r, color.g, color.b, c])
      }
      
    }

  }
  
  mouseMoveHandler(e: Event){
  }
  mouseDownHandler(e: Event){
  }
  mouseUpHandler(e: Event){
  }
  clickHandler(e: Event){
    console.log("click");
  }
  zoomed(){
    console.log("zoomed");
  }
}

class Matrix{

  private matrixVis: MatrixVisualization;
  private _dgraph: networkcube.DynamicGraph;
  public startTime: networkcube.Time;
  public endTime: networkcube.Time;
  private nodeOrder: number[];
  private bbox: Box;
  private _offset: number[];
  private _scale: number;
  private _cellSize;
  private initialCellSize;
  private hoveredLinks: networkcube.Link[];
  private labelLength: number;
  public plotMargin: NMargin;

  constructor(){
    this._dgraph = networkcube.getDynamicGraph();
    this.startTime = this.dgraph.startTime;
    this.endTime = this.dgraph.endTime;
    this.nodeOrder = this._dgraph.nodes().ids();
    this.bbox = {x0: 0, x1: 0, y0: 0, y1: 0};
    this._offset = [0, 0];
    this._scale = 1;
    this._cellSize = 12;
    this.initialCellSize = this._cellSize;;
    this.hoveredLinks = [];
    this.longestLabelLength();
    this.plotMargin = new NMargin(0);
    this.calculatePlotMargin();
  }

  get dgraph(){
    return this._dgraph;
  }
    
  get cellSize(){
    return this._cellSize;
  }

  set offset(offset){
    this._offset = offset;
  }
  
  set scale(scale){
    this._scale = scale;
    this._cellSize = this.initialCellSize/this._scale;

  }
  
  dgraphName(){
    return this._dgraph.name;
  }

  numberOfLinks(){
    return this._dgraph.links().length;
  }

  maxWeight(){
    return this._dgraph.links().weights().max();
  }


  setVis(matrixVis: MatrixVisualization){
    this.matrixVis = matrixVis;
    this.updateVisibleBox();
  }

  longestLabelLength(){
    if(this.dgraph){
      var longestLabelNode = this.dgraph.nodes().toArray().reduce(
        function(p, v, i, arr) {
          if (p == null || p.label() == null || 
              (v.label() && v.label().length > p.label().length))
            return v;
          else
            return p;
        });
    }
    this.labelLength = longestLabelNode ? longestLabelNode.label().length : 8;
  }
  calculatePlotMargin(){
    this.plotMargin.setMargin((this.labelLength * 0.5) * this.cellSize);
  }

  updateVisibleBox(){
    this.bbox.x0 = -Math.floor(this._offset[0]/this._cellSize);
    this.bbox.y0 = -Math.floor(this._offset[1]/this._cellSize);
    this.bbox.x1 = this.bbox.x0 + Math.floor(this.matrixVis.width/this._cellSize);
    this.bbox.y1 = this.bbox.y0 + Math.floor(this.matrixVis.height/this._cellSize);
    this.updateVisibleData();
  }

  updateVisibleData(){
    var leftNodes = this.dgraph.nodes().visible().toArray();
    leftNodes = leftNodes.filter( d => 
                                    this.nodeOrder[d.id()] >= this.bbox.y0 && 
                                    this.nodeOrder[d.id()] <= this.bbox.y1);
    var topNodes = this.dgraph.nodes().visible().toArray();
    topNodes = topNodes.filter( d => 
                                  this.nodeOrder[d.id()] >= this.bbox.x0 && 
                                  this.nodeOrder[d.id()] <= this.bbox.x1);
    
    var visibleData: {[id: number]: {[id: number]: networkcube.NodePair}} = {};
    var tmpHash: {[id: number]: Boolean} = {};
    var col: number;
    var node: networkcube.Node;

    for(var row = 0; row<leftNodes.length; row++){
      node = leftNodes[row];
      for(var link of node.links().toArray()){
        if(!tmpHash[link.nodePair().id()]){
          tmpHash[link.nodePair().id()] = true;
          var neighbor = link.target;
          if(neighbor.isVisible() &&
             this.nodeOrder[neighbor.id()] >= this.bbox.x0 &&
             this.nodeOrder[neighbor.id()] <= this.bbox.x1){
            if(!visibleData[row])  visibleData[row] = {};
            col = this.nodeOrder[neighbor.id()] - this.bbox.x0;
            visibleData[row][col] = link.nodePair();
          }
        }
      }
    }

    console.log(visibleData);
    this.matrixVis.updateData(visibleData);

  }

  
}


var vizWidth: number = window.innerWidth - 10;
var vizHeight: number = window.innerHeight - 115;
var appendToBody = domId => {return  $('<div id='+ domId +'></div>').appendTo('body')};
var menuJQ = appendToBody("networkcube-matrix-menu");
var tsJQ = appendToBody("networkcube-matrix-timelineDiv'")
var labJQ = appendToBody("networkcube-matrix-visDiv");


var matrix = new Matrix();
var matrixMenu = new MatrixMenu(menuJQ, matrix);
var matrixTimeSlider = new MatrixTimeSlider(tsJQ, matrix, vizWidth);
var matrixLabels = new MatrixLabels(vizWidth, vizHeight, labJQ, matrix);
var bbox =  matrixLabels.foreignObject.node().getBBox();
var matrixVis = new MatrixVisualization(bbox.width, bbox.height, matrixLabels.foreignObject,  matrix);

matrix.setVis(matrixVis);


