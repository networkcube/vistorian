/// <reference path="../../core/scripts/three.d.ts"/>
/// <reference path="../../core/helper/glutils.ts"/>
/// <reference path="../../core/networkcube.d.ts" />
/// <reference path="../../core/scripts/jquery.d.ts"/>
/// <reference path="../../core/scripts/d3.d.ts"/>
/// <reference path="../widgets/widgets.d.ts" />



const COLOR_HIGHLIGHT = 0x000000;
const COLOR_SELECTION = 0xff0000;
// let COLOR_CELL_DEFAULT = 0x000000;
// let COLOR_CELL_FILTER = 0xdddddd;


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

interface Pos{
  x: number;
  y: number;
}

interface Cell{
  row: number;
  col: number;
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
      value="` + this.matrix.cellSize + '"/>');
    $('#cellSizeBox').change(this.updateCellSize);
    this.elem.append('<br/>');
    this.elem.append('<label>Label ordering:</label>');
    let orderingMenu = $("#networkcube-matrix-menu")
      .append('<select id="labelOrdering"></select>')
  

    //$("#networkcube-matrix-menu").append('<a class="manual-button" target="_blank" href="https://github.com/networkcube/networkcube/wiki/Visualization-Manual#matrix-visualization-matrix"  onclick="trace_help()">Manual</a>');
    // VS: Clicks on Manual
    $("#networkcube-matrix-menu")
      .append('<a class="manual-button" target="_blank" href="https://github.com/networkcube/networkcube/wiki/Visualization-Manual#matrix-visualization-matrix" onclick="trace_help()">Manual</a>');

    $('#labelOrdering').change(this.reorderHandler);
    $('#labelOrdering').append('<option value="none">---</option>');
    $('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
    $('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
    $('#labelOrdering').append('<option value="degree">Node degree</option>');
    $('#labelOrdering').append('<option value="similarity">Similarity</option>');

    this.elem.append('<input value="Re-run" id="reorderBtn" type="button"/>');
    $('#reorderBtn').click(this.reorderHandler);

    //$('#dataName').text(this.matrix.dgraphName());
  }
  updateCellSize(){
    let value: number = $('#cellSizeBox').val();
    matrix.updateCellSize(value);
  }
  reorderHandler(){
    let orderType: string = $('#labelOrdering').val();
    matrix.reorderWorker(orderType);
  }
  setScale(val: number){
    $('#cellSizeBox').val(val);
  }
}

class MatrixTimeSlider{
  private elem: JQuery;
  private matrix: Matrix;
  private width: number;
  private height: number;
  private svg: any;
  private timeSlider: TimeSlider;
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

    this.timeSlider = new TimeSlider(matrix.dgraph, vizWidth);
    this.timeSlider.appendTo(this.svg);

  }
  set(sT:number, eT:number){
    this.timeSlider.set(sT, eT);
  }
}

class CellLabel{
  private cellLabelBackground;
  private cellLabel;
  constructor(){
   this.cellLabelBackground = glutils.selectAll()
      .data([{id:0}])
      .append('text')
      .style('opacity', 0)
      .attr('z', -1)
      .style('font-size', 12)
      .style('stroke', '#fff')
      .style('stroke-width', 2.5)
       
      
   this.cellLabel = glutils.selectAll()
      .data([{id:0}])
      .append('text')
      .style('opacity', 0)
      .attr('z', -1)
      .style('font-size', 12)
    }
  hideCellLabel(){
    this.cellLabelBackground.style('opacity', 0);
    this.cellLabel.attr('z', -1)
      .style('opacity', 0);
  }
  updateCellLabel(mx: number, my: number, val: number, fw: number){

    this.cellLabel
      .attr('x', mx + 40)
      .attr('y', -my)
      .style('opacity', 1)
      .text(val? val: 0)
      .attr('z', 2)
      .style('font-size', fw);
    this.cellLabelBackground
      .attr('x', mx + 40)
      .attr('y', -my)
      .style('opacity', 1)
      .text(val? val: 0)
      .attr('z', 2)
      .style('font-size', fw);
    // this.cellLabelBackground
    //   .attr('x', mx + 10)
    //   .attr('y', -my + 11)
    //   .attr("width",70)
    //   .attr("height", 22)
    //   .style('opacity', .8);
  }
}
class MatrixOverview{
  private width: number;
  private height: number;
  private matrix: Matrix;
  private svg: D3.Selection;
  private ratio: number;
  private canvasRatio: number;
  private focusColor: string;
  private focus: D3.Selection;
  private context: D3.Selection;
  private contextImg: D3.Selection;
  private contextPattern: D3.Selection;
  private zoom: D3.Behavior.Zoom;

  constructor(svg: D3.Selection,
              width: number,
              height: number,
              matrix: Matrix){
    this.svg = svg;
    this.matrix = matrix;
    this.width = width;
    this.height = height;
    this.ratio = 1;
    this.canvasRatio = 1;
    this.init();
  }
  init(){

    this.focusColor = "#ccc";


    let g = this.svg.append('g');
    this.contextPattern = g.append("defs")
      .append("pattern")
      .attr("id", "bg")
      .attr('patternUnits', 'userSpaceOnUse')
      .attr("width", this.width)
      .attr("height", this.height);


    this.contextImg = this.contextPattern.append("image")
      .attr("width", this.width)
      .attr("height", this.height);


    this.context = g.append("rect")
      .attr("class", "context")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("stroke", "#aaa")
      .attr("fill", "white");
    g = this.svg.append('g');
    this.focus = g.append("rect")
      .attr("class", "focus")
      .attr("fill", this.focusColor)
      .attr("fill-opacity", .2);

    this.zoom = d3.behavior.zoom()
      // .scaleExtent([0.2, 4])
      .on('zoom', this.zoomed);

    this.focus.call(this.zoom);

  }

  private zoomed = () =>{
    let z: number, tr: number[];
    z = this.zoom.scale();
    tr = this.zoom.translate();
    this.updateTransform(z, tr);
  }

  setCanvasRatio(canvasRatio: number){
    this.canvasRatio = 1;
    let w = this.canvasRatio>1? this.width*this.canvasRatio: this.width;
    let h = this.canvasRatio<1? this.height*this.canvasRatio: this.height;
    this.contextPattern.attr("width", w)
      .attr("height", h);
    this.contextImg.attr("width", w)
      .attr("height", h);
  }

  updateTransform(z, tr){
    tr[0] = -tr[0]*this.ratio;
    tr[1] = -tr[1]*this.ratio;
    this.matrix.updateTransform(z, tr);
  }
  updateFocus(matrixX0: number, matrixY0: number,
              visibleW: number, visibleH: number,
              r: number,
              z: number, tr: number[]){
    tr[0] = -tr[0]/this.ratio;
    tr[1] = -tr[1]/this.ratio;
    this.ratio = r/this.height;
    this.zoom.scale(z);
    this.zoom.translate(tr);

    let focusX = matrixX0*this.width;
    let focusY = matrixY0*this.height;
    let focusWidth = Math.min(visibleW*this.width, this.width);
    let focusHeight = Math.min(visibleH*this.height, this.height);
    focusWidth = (focusX + focusWidth) > this.width? this.width-focusX: focusWidth;
    focusHeight = (focusY + focusHeight) > this.height? this.height-focusY: focusHeight;
    this.focus.attr("width", focusWidth)
      .attr("height", focusHeight)
      .attr("x", focusX)
      .attr("y", focusY);
  }
  updateOverviewImage(dataImg){
    this.contextImg.attr("xlink:href", dataImg);
    this.context.attr("fill", "url(#bg)");
  }

}

class MatrixLabels{
  private width: number;
  private height: number;
  private margin: NMargin;
  private matrix: Matrix;
  private cellSize: number;
  public svg: D3.Selection;
  constructor(svg: D3.Selection,
              margin: NMargin,
              matrix: Matrix){
    this.svg = svg;
    this.matrix = matrix;
    this.margin = margin;
    this.cellSize = 0;
  }

  updateData(leftNodes: networkcube.Node[], topNodes: networkcube.Node[],
             cellSize: number, nodeOrder: number[],
             leftLabelOffset: number, topLabelOffset: number,
             bbox: Box){

    this.cellSize = cellSize;

    let labelsLeft = this.svg.selectAll('.labelsLeft')
      .data(leftNodes);

    let leftLabelPosition = nodeId => this.margin.top + leftLabelOffset +  cellSize * (nodeOrder[nodeId] - bbox.y0) + cellSize/2;

    labelsLeft.enter().append('text')
      .attr('id', (d, i) => { return 'nodeLabel_left_' + d.id(); })
      .attr('class', 'labelsLeft nodeLabel')
      .attr('text-anchor', 'end')
      .attr('alignment-baseline', 'middle')
      .attr('x', this.margin.left - 10)
      .attr('y', (d, i) => { return leftLabelPosition(d.id())})
      .on('mouseover', (d, i) => {
        networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: [d] });
      })
      .on('mouseout', (d, i) => {
        networkcube.highlight('reset');
      })
      .on('click', (d, i) => {
        this.matrix.nodeClicked(d);
      });

    labelsLeft.exit().remove();

    labelsLeft
      .attr('id', (d, i) => { return 'nodeLabel_left_' + d.id(); })
      .text((d, i) => { return d.label(); })
      .attr('x', this.margin.left - 10)
      .attr('y', (d, i) => {
        return leftLabelPosition(d.id());
      });

    let labelsTop = this.svg.selectAll('.labelsTop')
      .data(topNodes);

    let topLabelPosition = nodeId => this.margin.left + topLabelOffset + cellSize * (nodeOrder[nodeId] - bbox.x0) + cellSize/2;

    labelsTop.enter().append('text')
      .attr('id', (d, i) => { return 'nodeLabel_top_' + d.id(); })
      .attr('class', 'labelsTop nodeLabel')
      .text((d, i) => { return d.label(); })
      .attr('x', (d, i) => { return topLabelPosition(d.id())  })
      .attr('y', this.margin.left - 10)
      .attr('transform', (d, i) => { return 'rotate(-90, ' + (this.margin.top + cellSize * i + cellSize/2) + ', ' + (this.margin.left - 10) + ')' })
      .on('mouseover', (d, i) => {
        this.matrix.highlightNodes([d.id()]);
      })
      .on('mouseout', (d, i) => {
        this.matrix.highlightNodes([]);
      })
      .on('click', (d, i) => {
        this.matrix.nodeClicked(d);
      });

    labelsTop.exit().remove();
    labelsTop
      .attr('id', (d, i) => { return 'nodeLabel_top_' + d.id(); })
      .text((d, i) => { return d.label(); })
      .attr('alignment-baseline', 'middle')
      .attr('x', (d, i) => {
        return topLabelPosition(d.id());
      })
      .attr('y', this.margin.top - 10)
      .attr('transform', (d, i) => { return 'rotate(-90, ' + (this.margin.top + topLabelOffset + cellSize * (nodeOrder[d.id()]- bbox.x0) + cellSize/2) + ', ' + (this.margin.left - 10) + ')' });

    this.updateHighlightedNodes();
  }

  updateHighlightedNodes(highlightedLinks: number[] = []){
    let color: string;
    this.svg.selectAll('.nodeLabel')
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
        if (d.isHighlighted() ) {
          return 900;
        }
        return 100;
      })
      .style('font-size', Math.min(this.cellSize, 20));

    for (let i = 0; i < highlightedLinks.length; i++) {
      d3.selectAll('#nodeLabel_left_' + highlightedLinks[i])
        .style('font-weight', 900);
      d3.selectAll('#nodeLabel_top_' + highlightedLinks[i])
        .style('font-weight', 900);
    }
  }

}

class MatrixVisualization{
  private elem: any;
  public width: number;
  public height: number;
  private matrix: Matrix;
  private cellSize: number;
  private scale: number;
  private tr: number[];
  private offset: number[];
  private nrows: number;
  private ncols: number;
  private linksPos: {[row: number]: {[col: number]: number[]}};
  private mouseDown: Boolean;
  private mouseDownPos: Pos;
  private mouseDownCell: Cell;
  private toHoverLinks: number[];
  private hoveredLinks: number[];
  private previousHoveredLinks: number[];
  private canvas: HTMLCanvasElement;
  private view: D3.Selection;
  private zoom: D3.Behavior.Zoom;
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private mesh: THREE.Mesh;
  private guideLines: THREE.LineBasicMaterial[];
  private vertexPositions: number[][];
  private vertexColors: number[][];
  private shaderMaterial: THREE.ShaderMaterial;
  private cellHighlightFrames: {[id: number]: THREE.Mesh[]};
  private cellSelectionFrames: THREE.Mesh[];
  private linkWeightScale: D3.Scale.LinearScale;
  private bufferTexture: THREE.WebGLRenderTarget;


  private data:  {[id: number]: {[id: number]: networkcube.NodePair}};
  constructor(elem: D3.Selection,
              width: number, height: number,
              matrix: Matrix){
    this.width = width;
    this.height = height;
    this.elem = elem;
    this.matrix = matrix;
    this.nrows = 0;
    this.ncols = 0;
    this.scale = 1;
    this.tr = [0,0];
    this.offset = [0, 0];
    this.guideLines = [];
    this.hoveredLinks = [];
    this.previousHoveredLinks = [];
    this.mouseDownCell = {row: 0, col: 0};
    this.cellHighlightFrames = networkcube.array(undefined, matrix.numberOfLinks());
    this.cellSelectionFrames = networkcube.array(undefined,  matrix.numberOfLinks());
    this.linkWeightScale = d3.scale.linear().range([0.1, 1])
      .domain([0, matrix.maxWeight()]);
    this.init();
  }
  init(){
    this.initWebGL();
    this.elem.node().appendChild(this.canvas);
    this.view = d3.select(this.canvas);
    this.zoom = d3.behavior.zoom()
      //.scaleExtent([0.2, 4])
      .on('zoom', this.zoomed);
    this.view.call(this.zoom);
    this.initGeometry();
    this.cellSize = this.matrix.cellSize;

  }
  webgl:glutils.WebGL;
  initWebGL(){
    this.webgl = glutils.initWebGL('visCanvasFO', this.width, this.height);
    this.webgl.enablePanning(false);
    this.webgl.camera.position.x = this.width/2;
    this.webgl.camera.position.y = -this.height/2;
    this.webgl.camera.position.z = 1000;

    this.canvas = this.webgl.canvas;
    this.scene = this.webgl.scene;
    this.camera = this.webgl.camera;
    this.renderer = this.webgl.renderer;
    
    this.initTextureFramebuffer();


    this.webgl.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    this.webgl.canvas.addEventListener('mousedown', this.mouseDownHandler);
    this.webgl.canvas.addEventListener('mouseup', this.mouseUpHandler);
    this.webgl.canvas.addEventListener('click', this.clickHandler);


    // this.scene = new THREE.Scene();
    // // camera
    // // this.camera = new THREE.OrthographicCamera(
    // //   this.width / -2,
    // //   this.width / 2,
    // //   this.height/ 2,
    // //   this.height / -2,
    // //   0, 1000)
    // // this.scene.add(this.camera);
    // this.camera.position.x = this.width / 2;
    // this.camera.position.y = -this.height / 2;
    // this.camera.position.z = 100;

    // // renderer
    // this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor(0xffffff, 1);

    // this.initTextureFramebuffer();

    // // position canvas element containing cells
    // this.canvas = this.renderer.domElement;

    // // set canvas listeners
    // this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
    // this.canvas.addEventListener('mousedown', this.mouseDownHandler);
    // this.canvas.addEventListener('mouseup', this.mouseUpHandler);
    // this.canvas.addEventListener('click', this.clickHandler);

    // // init glutils renderer for D3 wrapper
    // glutils.setWebGL(this.scene, this.camera, this.renderer, this.canvas);
  }

  initTextureFramebuffer() {
    this.bufferTexture = new THREE.WebGLRenderTarget( 256, 256, { minFilter: THREE.NearestMipMapNearestFilter, magFilter: THREE.LinearFilter });
  }

  initGeometry(){
    let vertexShaderProgram = `
      attribute vec4 customColor;
      varying vec4 vColor;
      void main() {
        vColor = customColor;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );
      }`;
    let fragmentShaderProgram = `
      varying vec4 vColor;
      void main() {
        gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);
      }`;

    let attributes = {
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
    let d = new Date();
    let begin = d.getTime();
    this.renderer.render(this.scene, this.camera)
    d = new Date();
    // console.log('>>>> RENDERED ', (d.getTime() - begin), ' ms.');
  }

  updateData(data:  {[id: number]: {[id: number]: networkcube.NodePair}},
             nrows: number, ncols: number,
             cellSize: number,
             offset: number[],
             scale: number,
             tr: number[],
             getImageData: boolean
  ){
    this.data = data;
    this.nrows = nrows;
    this.ncols = ncols;
    this.offset = offset;
    this.cellSize = cellSize;
    this.zoom.scale(scale);
    this.zoom.translate(tr);

    if (this.geometry){
      this.scene.remove(this.mesh);
    }
    for(let id of this.hoveredLinks){
      if(this.cellHighlightFrames[id])
        for(let frame of this.cellHighlightFrames[id])
          this.scene.remove(frame);
    }
    for(let i=0 ; i<this.guideLines.length ; i++){
      this.scene.remove(this.guideLines[i]);
    }



    this.vertexPositions = [];
    this.vertexColors = [];
    this.cellHighlightFrames = [];
    this.linksPos = {};

    for(let row in this.data){
      for( let col in data[row]){
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
    if(getImageData){


      let smallDim = Math.min(this.height, this.width);

      this.resizeCanvas(smallDim, smallDim);
      //
      // this.renderer.render(this.scene, this.camera, this.bufferTexture);
      // // Read the contents of the framebuffer
      //
      // console.log(this.bufferTexture);
      // // this.bufferTexture.__webglTexture.flipY = false;
      //
      // var dat = new Uint8Array(this.bufferTexture.width * this.bufferTexture.height * 4);
      //
      //
      // this.renderer.readRenderTargetPixels(this.bufferTexture, 0, 0, this.bufferTexture.width, this.bufferTexture.height, dat);
      //
      // // Create a 2D canvas to store the result
      // var canvas = document.createElement('canvas');
      // canvas.width = this.bufferTexture.width;
      // canvas.height = this.bufferTexture.height;
      // var context = canvas.getContext('2d');
      //
      // // Copy the pixels to a 2D canvas
      // var imageData = context.createImageData(this.bufferTexture.width, this.bufferTexture.height);
      // imageData.data.set(dat);
      // context.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);


      this.matrix.hideCellLabel();
      this.render();

      // let imgData = this.canvas.toDataURL();
      let imgData = this.canvas.toDataURL();
      this.matrix.updateOverviewImage(imgData);

      this.resizeCanvas(this.width, this.height);

    }
    this.updateGuideLines();
    this.render();
  }


  resizeCanvas(width: number, height: number){

    this.camera.position.x = width / 2;
    this.camera.position.y = -height / 2;
    this.camera.left = width / -2;
    this.camera.right = width / 2;
    this.camera.top = height/ 2;
    this.camera.bottom = height/ -2;
    this.camera.updateProjectionMatrix ();
    this.renderer.setSize(width, height);
  }

  addCell(row: number, col: number, pair: networkcube.NodePair){
    let links: networkcube.Link[];
    let e: networkcube.Link;
    let x, y, z: number;
    let linkNum: number;
    let seg: number;
    let meanWeight: number;
    let alpha: number;
    let color: THREE.Color;

    links = pair.links().toArray();
    linkNum = links.length;
    seg = this.cellSize / linkNum;
    z = 1;

    for (let j = 0; j < links.length; j++) {
      e = links[j];

      let webColor: string = networkcube.getPriorityColor(e);
      if (!webColor)
        webColor = '#000000';
      meanWeight = e.weights()? e.weights(this.matrix.startTime, this.matrix.endTime).mean(): 1;
      color = new THREE.Color(webColor);
      alpha = this.linkWeightScale(Math.abs(meanWeight));
      if(!e.isVisible())  
        alpha = 0;

      x = col * this.cellSize + seg * j + seg / 2 + this.offset[0];
      y = row * this.cellSize + this.cellSize/2 + this.offset[1];
      this.paintCell(e.id(), x, y, seg, [color.r, color.g, color.b, alpha], meanWeight>0);

      if(!this.linksPos[row]) this.linksPos[row] = {};
      if(!this.linksPos[row][col]) this.linksPos[row][col] = [];
      this.linksPos[row][col].push(e.id());

      //x = this.cellSize/2 + row * this.cellSize - this.cellSize / 2 + seg * j + seg / 2;
      //y = this.cellSize/2 + col * this.cellSize;
      //this.paintCell(e.id(), x, y, seg, [color.r, color.g, color.b, alpha], meanWeight>0);
    }

  }

  paintCell(id: number, x: number, y: number, w: number,
            color: number[], positive: Boolean){
    let h: number = this.cellSize;
    let highlightFrames: THREE.Mesh = new THREE.Mesh();
    let selectionFrames: THREE.Mesh = new THREE.Mesh();
    let frame: THREE.Line;

    if (positive) {
      glutils.addBufferedRect(this.vertexPositions, x, -y, 0, w - 1, h - 1,
        this.vertexColors, color);
    } else{
      glutils.addBufferedDiamond(this.vertexPositions, x, -y, 0, w - 1, h - 1,
        this.vertexColors, color);
    }
    // highlight frame
    frame = glutils.createRectFrame(w - 1, h - 1, COLOR_HIGHLIGHT, 1)
    frame.position.x = x;
    frame.position.y = -y;
    frame.position.z = 10;
    highlightFrames.add(frame);
    if(!this.cellHighlightFrames[id]) this.cellHighlightFrames[id] = [];
    this.cellHighlightFrames[id].push(highlightFrames);

    // selection frame
    frame = glutils.createRectFrame(w - 1, h - 1, COLOR_SELECTION, 2)
    frame.position.x = x;
    frame.position.y = -y;
    frame.position.z = 9;
    selectionFrames.add(frame);
    this.cellSelectionFrames[id] = selectionFrames;

  }
  updateGuideLines(){
    this.guideLines = [];

    if(!this.data) return;
    // console.log("update guidelines")

    let w = this.ncols*this.cellSize;
    let h = this.nrows*this.cellSize;

    let geometry1 = new THREE.Geometry();
    geometry1.vertices.push(
      new THREE.Vector3( this.offset[0], 0, 0 ),
      new THREE.Vector3( w+this.offset[0], 0, 0)
    )
    let geometry2 = new THREE.Geometry();
    geometry2.vertices.push(
      new THREE.Vector3( 0, -this.offset[1], 0 ),
      new THREE.Vector3( 0, -h-this.offset[1] , 0 )
    )
    let m, pos;
    let mat = new THREE.LineBasicMaterial( {color: 0xeeeeee, linewidth:1} );
    let x,y;
    let j = 0;
    for(let i=0; i <=h; i+=this.cellSize){
      pos =  j * this.cellSize + this.offset[1];
      m = new THREE.Line(geometry1, mat)
      m.position.set(0, -pos, 0);
      this.scene.add(m);
      this.guideLines.push(m);
      j++;
    }
    j = 0;
    for(let i=0 ; i <=w; i+=this.cellSize){
      pos =  j * this.cellSize + this.offset[0];
      m = new THREE.Line(geometry2, mat);
      m.position.set(pos, 0, 0);
      this.scene.add(m);
      this.guideLines.push(m);
      j++;
    }

  }

  highlightLink(cell: Cell){
    let row = cell.row;
    let col = cell.col;
    let id: number;
    if(this.linksPos[row]){
      if(this.linksPos[row][col]){
        for(let id of this.linksPos[row][col]){
          this.toHoverLinks.push(id);
        }
        //this.render();
      }
    }
  }

  posToCell(pos: Pos){
    let row = Math.round((pos.y-this.offset[1]-this.cellSize/2)/this.cellSize);
    let col = Math.round((pos.x-this.offset[0]-this.cellSize/2)/this.cellSize);
    return {row: row, col: col};
  }

  private mouseMoveHandler = (e: MouseEvent)=>{
    let mpos: Pos = glutils.getMousePos(this.canvas, e.clientX, e.clientY);

    this.toHoverLinks = [];

    let cell = this.posToCell(mpos);

    if (!this.mouseDown) {
      this.highlightLink(cell);
    }else{
      let box: Box = {x0: 0, y0: 0, x1: 0, y1: 0};
      box.x0 = Math.min(cell.col, this.mouseDownCell.col);
      box.x1 = Math.max(cell.col, this.mouseDownCell.col);
      box.y0 = Math.min(cell.row, this.mouseDownCell.row);
      box.y1 = Math.max(cell.row, this.mouseDownCell.row);

      for(let c=box.x0; c<=box.x1; c++){
        for(let r=box.y0; r<=box.y1; r++){
          let ch = {row: r, col: c};
          this.highlightLink(ch);
        }
      }
    }
    if(this.toHoverLinks.length > 0){
      this.matrix.highlightLinks(this.toHoverLinks);
      this.matrix.updateCellLabel(this.toHoverLinks[0], mpos.x, mpos.y);
    }else{
      this.matrix.highlightLinks([]);
      this.matrix.updateCellLabel(-1, -1000, -1000);
    }
  }

  updateHighlightedLinks(hoveredLinks: number[] = undefined){
    this.previousHoveredLinks = this.hoveredLinks;
    this.hoveredLinks = hoveredLinks;
    for(let id of this.previousHoveredLinks){
      if(this.cellHighlightFrames[id])
        for(let frame of this.cellHighlightFrames[id])
          this.scene.remove(frame);
    }
    for(let id of this.hoveredLinks){
      if(this.cellHighlightFrames[id])
        for(let frame of this.cellHighlightFrames[id])
          this.scene.add(frame);
    }
    this.render();
  }
  private mouseDownHandler = (e: MouseEvent)=>{
    if (e.shiftKey) {
      this.view.on('mousedown.zoom',null);
      this.mouseDown = true;
      this.mouseDownPos = glutils.getMousePos(this.canvas, e.clientX, e.clientY);
      this.mouseDownCell = this.posToCell(this.mouseDownPos);
    }
  }
  private mouseUpHandler = (e: Event)=>{
    this.mouseDown = false;
    this.view.call(this.zoom);
    for(let id of this.hoveredLinks){
      if(this.cellHighlightFrames[id])
        for(let frame of this.cellHighlightFrames[id])
          this.scene.remove(frame);
    }
    this.hoveredLinks = [];
  }
  clickHandler(e: Event){
    console.log("click");
  }
  private zoomed = () =>{
    let z: number, tr: number[];
    z = this.zoom.scale();
    tr = this.zoom.translate();
    this.updateTransform(z, tr);
  }

  updateTransform(z, tr){
    tr[0] = Math.min(0, tr[0]);
    tr[1] = Math.min(0, tr[1]);
    this.zoom.scale(z);
    this.zoom.translate(tr);
    this.matrix.updateTransform(z, tr);
  }
}



class Matrix{

  private visualization: MatrixVisualization;
  private labels: MatrixLabels;
  private cellLabel: CellLabel;
  private menu: MatrixMenu;
  private timeSlider: MatrixTimeSlider;
  private overview: MatrixOverview;
  private _dgraph: networkcube.DynamicGraph;
  private times: networkcube.Time[];
  public startTime: networkcube.Time;
  public endTime: networkcube.Time;
  private nodeOrder: number[];
  private bbox: Box;
  private createOverviewImage: boolean;
  private offset: number[];
  private _tr: number[];
  private _scale: number;
  private _cellSize;
  private initialCellSize;
  private hoveredLinks: networkcube.Link[];
  private labelLength: number;
  public margin: NMargin;

  constructor(){
    this._dgraph = networkcube.getDynamicGraph();
    this.startTime = this.dgraph.startTime;
    this.endTime = this.dgraph.endTime;
    this.times = this._dgraph.times().toArray()
    this.nodeOrder = this._dgraph.nodes().ids();
    this.bbox = {x0: 0, x1: 0, y0: 0, y1: 0};
    this._tr = [0, 0];
    this.offset = [0, 0];
    this._scale = 1;
    this.createOverviewImage = false;
    this.initialCellSize = 12;
    this._cellSize = this.initialCellSize;
    this.hoveredLinks = [];
    this.longestLabelLength();
    this.margin = new NMargin(0);
    this.calculatePlotMargin();
    networkcube.setDefaultEventListener(this.updateEvent);
    networkcube.addEventListener('timeRange', this.timeRangeHandler)
  }

  get dgraph(){
    return this._dgraph;
  }

  get cellSize(){
    return this._cellSize;
  }

  getOverviewScale(){
    let totalNodes = this.dgraph.nodes().visible().length;
    let cs = Math.min(this.visualization.height, this.visualization.width)/totalNodes;
    let scale = cs/this.initialCellSize;
    return scale;
  }
  setVis(matrixVis: MatrixVisualization){
    this.visualization = matrixVis;
    // this.overview.setCanvasRatio(this.visualization.width/this.visualization.height);
    this.resetTransform();
  }
  setLabels(matrixLabels: MatrixLabels){
    this.labels = matrixLabels;
  }
  setCellLabel(cellLabel: CellLabel){
    this.cellLabel = cellLabel;
  }
  setOverview(overview: MatrixOverview){
    this.overview = overview;
  }
  setMenu(menu: MatrixMenu){
    this.menu = menu;
  }
  setTimeSlider(timeSlider: MatrixTimeSlider){
    this.timeSlider = timeSlider;
  }
  updateOverviewImage(dataImg){
    this.overview.updateOverviewImage(dataImg);
  }

  hideCellLabel(){
    this.cellLabel.hideCellLabel();
  }

  updateCellSize(value: number){
    let scale = value/this.initialCellSize;
    let tr = [this._tr[0]*scale/this._scale, this._tr[1]*scale/this._scale];
    this.visualization.updateTransform(scale, tr);
  }
  resetTransform(){
    let scale = this.getOverviewScale();
    this.createOverviewImage = true;
    this.updateTransform(scale, [0, 0]);
    this.createOverviewImage = false;
  }
  updateTransform(scale, tr){
    this._scale = scale;
    this._tr = tr;
    this._tr[0] = Math.min(this._tr[0], 0);
    this._tr[1] = Math.min(this._tr[1], 0);
    this._cellSize = this._scale*this.initialCellSize;
    if(this.menu)
      this.menu.setScale(this._cellSize);
    this.updateVisibleData();
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

  reorderWorker(orderType: string){
    if (orderType == 'alphanumerical') {
      let nodes2 = this._dgraph.nodes().visible().sort('label').toArray();
      this.nodeOrder = [];
      for (let i = 0; i < nodes2.length; i++) {
        this.nodeOrder[nodes2[i].id()] = i;
      }
    } else if (orderType == 'reverse-alpha') {
      let nodes2 = this._dgraph.nodes().visible().sort('label', false).toArray();
      this.nodeOrder = [];
      for (let i = 0; i < nodes2.length; i++) {
        this.nodeOrder[nodes2[i].id()] = i;
      }
    } else if (orderType == 'degree') {
      let nodes2 = this._dgraph.nodes().visible()
        .createAttribute('degree', (n) => {
          return n.neighbors().length;
        })
        .sort('degree').toArray();
      for (let i = 0; i < nodes2.length; i++) {
        this.nodeOrder[nodes2[i].id()] = i;
      }
    } else if (orderType == 'similarity') {
      let config: networkcube.OrderingConfiguration = new networkcube.OrderingConfiguration();
      config.start = this.startTime;
      config.end = this.endTime;
      config.nodes = this._dgraph.nodes().visible().toArray();
      config.links = this._dgraph.links().presentIn(this.startTime, this.endTime).visible().toArray();
      this.nodeOrder = networkcube.orderNodes(this._dgraph, config);
    } else {
      let visibleNodes = this._dgraph.nodes().visible().toArray();
      this.nodeOrder = [];
      for (let i = 0; i < visibleNodes.length; i++) {
        this.nodeOrder[visibleNodes[i].id()] = i;
      }
    }

    this.resetTransform();

  }


  longestLabelLength(){
    // let longestLabelNode;
    // if(this.dgraph){
    //   longestLabelNode = this.dgraph.nodes().toArray().reduce(
    //     function(p, v, i, arr) {
    //       if (p == null || p.label() == null ||
    //         (v.label() && v.label().length > p.label().length))
    //         return v;
    //       else
    //         return p;
    //     });
    // }
    // this.labelLength = longestLabelNode ? longestLabelNode.label().length+8 : 8;
    // this.labelLength = Math.min(this.labelLength, 30);
    this.labelLength = 30;
  }
  calculatePlotMargin(){
    this.margin.setMargin((this.labelLength * 0.5) * this.cellSize);
  }


  updateVisibleBox(){
    this.bbox.x0 = -Math.floor(this._tr[0]/this._cellSize);
    this.bbox.y0 = -Math.floor(this._tr[1]/this._cellSize);
    this.bbox.x1 = this.bbox.x0 + Math.floor(this.visualization.width/this._cellSize);
    this.bbox.y1 = this.bbox.y0 + Math.floor(this.visualization.height/this._cellSize);

    this.offset[0] = (this._tr[0]/this._cellSize + this.bbox.x0)*this._cellSize;
    this.offset[1] = (this._tr[1]/this._cellSize + this.bbox.y0)*this._cellSize;
  }

  updateVisibleData(){
    // console.log("updateVis");
    this.updateVisibleBox();
    let leftNodes = this.dgraph.nodes().visible().toArray();
    leftNodes = leftNodes.filter( d =>
    this.nodeOrder[d.id()] >= this.bbox.y0 &&
    this.nodeOrder[d.id()] <= this.bbox.y1);
    let topNodes = this.dgraph.nodes().visible().toArray();
    topNodes = topNodes.filter( d =>
    this.nodeOrder[d.id()] >= this.bbox.x0 &&
    this.nodeOrder[d.id()] <= this.bbox.x1);

    let visibleData: {[id: number]: {[id: number]: networkcube.NodePair}} = {};
    let row, col: number;
    let node: networkcube.Node;

    for(let i = 0; i<leftNodes.length; i++){
      node = leftNodes[i];
      if(node.isVisible()){
        row = this.nodeOrder[node.id()] - this.bbox.y0;
        for(let link of node.links().toArray()){
          let neighbor = link.source.id() == node.id()?link.target: link.source;
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
    this.visualization.updateData(visibleData,
                leftNodes.length, topNodes.length,
                this.cellSize,
                this.offset, this._scale, this._tr,
                this.createOverviewImage);

    if(this.overview){
      let totalNodes = this.dgraph.nodes().visible().length;
      let widthRatio = (this.bbox.x1 - this.bbox.x0)/totalNodes;
      let heightRatio = (this.bbox.y1 - this.bbox.y0)/totalNodes;
      let ratio = totalNodes*this.cellSize;
      this.overview.updateFocus(this.bbox.x0/totalNodes, this.bbox.y0/totalNodes,
                                widthRatio, heightRatio,
                                ratio, this._scale, this._tr);
    }

    if(this.labels){
      this.labels.updateData(leftNodes, topNodes, this.cellSize, this.nodeOrder,
        this.offset[1], this.offset[0], this.bbox);
    }
  }
  highlightLinks(highlightedIds: number[]){
    if(highlightedIds.length>0){
      let highlightedLinks: networkcube.Link[] = highlightedIds.map(
        (d) => this._dgraph.link(d));
      networkcube.highlight('set', <networkcube.ElementCompound>{ links: highlightedLinks });
    }else
      networkcube.highlight('reset');
  }
  nodeClicked(d: networkcube.Node){
    let selections = d.getSelections();
    let currentSelection = this._dgraph.getCurrentSelection();
    for (let j = 0; j < selections.length; j++) {
      if (selections[j] == currentSelection) {
        networkcube.selection('remove', <networkcube.ElementCompound>{ nodes: [d] });
        return;
      }
    }
    networkcube.selection('add', <networkcube.ElementCompound>{ nodes: [d] });
    this.labels.updateHighlightedNodes();
  }
  highlightNodes(highlightedIds: number[]){
    if(highlightedIds.length>0){
      let highlightedNodes: networkcube.Node[] = highlightedIds.map(
        (d) => this._dgraph.node(d));
      networkcube.highlight('set', <networkcube.ElementCompound>{ nodes: highlightedNodes });
    }else
      networkcube.highlight('reset');
  }
  updateCellLabel(linkId: number, mx: number, my: number)
  {
    if(linkId < 0){
      this.cellLabel.updateCellLabel(-1000, -1000, null, 0);
      return;
    }
    let link = this._dgraph.link(linkId);
    let val = link.weights(this.startTime, this.endTime).get(0);
    val = Math.round(val * 1000)/1000;
    let z = this._scale;
    let fw = this.initialCellSize;
    this.cellLabel.updateCellLabel(mx, my, val, fw);

  }
  updateEvent = () => {

    let highlightedNodesIds = [];
    let highlightedLinksIds = [];

    let highlightedLinks = this._dgraph.links().highlighted().toArray();
    if(highlightedLinks.length>0){
      for (let i = 0; i < highlightedLinks.length; i++) {
        if (!highlightedLinks[i].isVisible())
          continue;
        highlightedNodesIds.push(highlightedLinks[i].source.id());
        highlightedNodesIds.push(highlightedLinks[i].target.id());
        highlightedLinksIds.push(highlightedLinks[i].id());
      }

    }else{
      let highlightedNodes = this._dgraph.nodes().highlighted().toArray();
      for (let i = 0; i < highlightedNodes.length; i++) {
        let node = highlightedNodes[i];
        if(node.isVisible()){
          for(let link of node.links().toArray()){
            let neighbor = link.source.id() == node.id()?link.target: link.source;
            if(neighbor.isVisible())
            // &&
            //this.nodeOrder[neighbor.id()] >= this.bbox.x0 &&
            //  this.nodeOrder[neighbor.id()] <= this.bbox.x1){
              highlightedLinksIds.push(link.id());
            //}
          }
        }
      }
    }

    // show/hide visible/filtered links

    this.updateVisibleData();

    this.labels.updateHighlightedNodes(highlightedNodesIds);
    this.visualization.updateHighlightedLinks(highlightedLinksIds);
  }

  timeRangeHandler = (m: networkcube.TimeRangeMessage) => {

      this.startTime = this.times[0];
      this.endTime = this.times[this.times.length-1];
      for(var i= 0 ; i < this.times.length ; i++){
            if(this.times[i].unixTime() > m.startUnix){
                this.startTime = this.times[i-1];
                break;
            }
      }
      for(i ; i < this.times.length ; i++){
          if(this.times[i].unixTime() > m.endUnix){
              this.endTime = this.times[i-1];
              break;
          }
      }
      // this.startTime = this._dgraph.time(m.startId);
      // this.endTime = this._dgraph.time(m.endId);
      // this.timeSlider.set(this.startTime, this.endTime);
      this.timeSlider.set(m.startUnix, m.endUnix);

      this.updateVisibleData();
  }

}


let matrix = new Matrix();

let vizWidth: number = window.innerWidth - 10;
let vizHeight: number = window.innerHeight - 115;
let appendToBody = domId => {return  $('<div id='+ domId +'></div>').appendTo('body')};
let menuJQ = appendToBody("networkcube-matrix-menu");
let tsJQ = appendToBody("networkcube-matrix-timelineDiv'")
let labJQ = appendToBody("networkcube-matrix-visDiv");

let svg = d3.select(labJQ.get(0))
  .append('svg')
  .attr('id', 'networkcube-matrix-visSvg')
  .attr('width', vizWidth)
  .attr('height', vizHeight);
let foreignObject: D3.Selection = svg.append('foreignObject')
  .attr('id', 'networkcube-matrix-visCanvasFO')
  .attr('x', matrix.margin.left)
  .attr('y', matrix.margin.top)
  .attr('width', vizWidth - matrix.margin.left )
  .attr('height', vizHeight - matrix.margin.top);
let bbox =  foreignObject.node().getBBox();

let matrixMenu = new MatrixMenu(menuJQ, matrix);
let matrixTimeSlider = new MatrixTimeSlider(tsJQ, matrix, vizWidth);
let matrixLabels = new MatrixLabels(svg, matrix.margin, matrix);
let matrixVis = new MatrixVisualization(foreignObject, bbox.width, bbox.height,  matrix);
let matrixOverview = new MatrixOverview(svg, matrix.margin.left-2, matrix.margin.top-2, matrix);
let cellLabel = new CellLabel();


matrix.setLabels(matrixLabels);
matrix.setMenu(matrixMenu);
matrix.setTimeSlider(matrixTimeSlider);
matrix.setCellLabel(cellLabel);
matrix.setOverview(matrixOverview);
matrix.setVis(matrixVis);
networkcube.addEventListener('timeRange', matrix.timeRangeHandler);


