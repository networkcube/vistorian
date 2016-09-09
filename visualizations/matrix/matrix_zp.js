var COLOR_HIGHLIGHT = 0x000000;
var COLOR_SELECTION = 0xff0000;
var COLOR_CELL_DEFAULT = 0x000000;
var COLOR_CELL_FILTER = 0xdddddd;
var NMargin = (function () {
    function NMargin(v) {
        this.setMargin(v);
    }
    NMargin.prototype.setMargin = function (v) {
        this.left = v;
        this.top = v;
    };
    return NMargin;
}());
var MatrixMenu = (function () {
    function MatrixMenu(elem, matrix) {
        this.elem = elem;
        this.matrix = matrix;
        this.init();
    }
    MatrixMenu.prototype.init = function () {
        this.elem.append("Zoom:  <input id=\"cellSizeBox\" type=\"range\" \n      name=\"cellSizeBox\" min=\"3\" max=\"20\" \n      onchange=\"matrix.updateCellSize()\" \n      value=\"" + this.matrix.cellSize + '"/>');
        this.elem.append('<br/>');
        this.elem.append('<label>Label ordering:</label>');
        var orderingMenu = $("#networkcube-matrix-menu")
            .append('<select id="labelOrdering" onchange="reorderHandler()"></select>');
        $('#labelOrdering').append('<option value="none">---</option>');
        $('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
        $('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
        $('#labelOrdering').append('<option value="degree">Node degree</option>');
        $('#labelOrdering').append('<option value="similarity">Similarity</option>');
        this.elem.append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');
    };
    return MatrixMenu;
}());
var MatrixTimeSlider = (function () {
    function MatrixTimeSlider(elem, matrix, width) {
        this.elem = elem;
        this.matrix = matrix;
        this.width = width - 20;
        this.height = 50;
        this.init();
    }
    MatrixTimeSlider.prototype.init = function () {
        this.svg = d3.select(this.elem.get(0))
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        var timeSlider = new TimeSlider(matrix.dgraph, vizWidth);
        timeSlider.appendTo(this.svg);
    };
    return MatrixTimeSlider;
}());
var MatrixLabels = (function () {
    function MatrixLabels(width, height, elem, matrix) {
        this.width = width;
        this.height = height;
        this.margin = matrix.plotMargin;
        this.elem = elem;
        this.matrix = matrix;
        this.init();
    }
    MatrixLabels.prototype.init = function () {
        this.svg = d3.select(this.elem.get(0))
            .append('svg')
            .attr('id', 'networkcube-matrix-visSvg')
            .attr('width', this.width)
            .attr('height', this.height);
        this._foreignObject = this.svg.append('foreignObject')
            .attr('id', 'networkcube-matrix-visCanvasFO')
            .attr('x', this.margin.left)
            .attr('y', this.margin.top)
            .attr('width', this.width - this.margin.left)
            .attr('height', this.height - this.margin.top);
    };
    Object.defineProperty(MatrixLabels.prototype, "foreignObject", {
        get: function () {
            return this._foreignObject;
        },
        enumerable: true,
        configurable: true
    });
    return MatrixLabels;
}());
var MatrixVisualization = (function () {
    function MatrixVisualization(width, height, elem, matrix) {
        this.width = width;
        this.height = height;
        this.elem = elem;
        this.matrix = matrix;
        this.cellSize = matrix.cellSize;
        this.cellHighlightFrames = networkcube.array(undefined, matrix.numberOfLinks());
        this.cellSelectionFrames = networkcube.array(undefined, matrix.numberOfLinks());
        this.linkWeightScale = d3.scale.linear().range([0, matrix.maxWeight()]);
        this.init();
    }
    MatrixVisualization.prototype.init = function () {
        this.initWebGL();
        this.elem.node().appendChild(this.canvas);
        this.view = d3.select(this.canvas);
        this.zoom = d3.behavior.zoom()
            .scaleExtent([0.2, 4])
            .on('zoom', this.zoomed);
        this.view.call(this.zoom);
        this.initGeometry();
    };
    MatrixVisualization.prototype.initWebGL = function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 0, 1000);
        this.scene.add(this.camera);
        this.camera.position.x = this.width / 2;
        this.camera.position.y = -this.height / 2;
        this.camera.position.z = 100;
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xffffff, 1);
        var raycaster = new THREE.Raycaster();
        this.canvas = this.renderer.domElement;
        this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.canvas.addEventListener('mousedown', this.mouseDownHandler);
        this.canvas.addEventListener('mouseup', this.mouseUpHandler);
        this.canvas.addEventListener('click', this.clickHandler);
        glutils.setWebGL(this.scene, this.camera, this.renderer, this.canvas);
    };
    MatrixVisualization.prototype.initGeometry = function () {
        var vertexShaderProgram = "\n      attribute vec4 customColor;\n      varying vec4 vColor;\n      void main() {\n        vColor = customColor;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\n      }";
        var fragmentShaderProgram = "\n      varying vec4 vColor;\n      void main() {\n        gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);\n      }";
        var attributes = {
            customColor: { type: 'c', value: [] }
        };
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
    };
    MatrixVisualization.prototype.render = function () {
        var d = new Date();
        var begin = d.getTime();
        this.renderer.render(this.scene, this.camera);
        d = new Date();
        console.log('>>>> RENDERED ', (d.getTime() - begin), ' ms.');
    };
    MatrixVisualization.prototype.updateData = function (data) {
        this.data = data;
        this.vertexPositions = [];
        this.vertexColors = [];
        if (this.geometry) {
            this.scene.remove(this.mesh);
        }
        for (var row in this.data) {
            for (var col in data[row]) {
                this.addCell(row, col, data[row][col]);
            }
        }
        this.geometry.addAttribute('position', new THREE.BufferAttribute(glutils.makeBuffer3f(this.vertexPositions), 3));
        this.geometry.addAttribute('customColor', new THREE.BufferAttribute(glutils.makeBuffer4f(this.vertexColors), 4));
        this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
        this.geometry.attributes['customColor'].needsUpdate = true;
        this.scene.add(this.mesh);
        this.render();
    };
    MatrixVisualization.prototype.addCell = function (row, col, pair) {
        var links;
        var e;
        var x, y, z;
        var linkNum;
        var seg;
        var meanWeight;
        var color;
        var c;
        var webColor;
        links = pair.links().toArray();
        linkNum = links.length;
        seg = this.cellSize / linkNum;
        z = 1;
        for (var j = 0; j < links.length; j++) {
            e = links[j];
            x = this.cellSize / 2 + col * this.cellSize - this.cellSize / 2 + seg * j + seg / 2;
            y = this.cellSize / 2 + row * this.cellSize;
            webColor = networkcube.getPriorityColor(e);
            if (!webColor)
                webColor = '#000000';
            meanWeight = e.weights() ? e.weights(this.matrix.startTime, this.matrix.endTime).mean() : 1;
            color = new THREE.Color(webColor);
            c = this.linkWeightScale(Math.abs(meanWeight));
            if (meanWeight > 0) {
                glutils.addBufferedRect(this.vertexPositions, x, -y, 0, seg - 1, this.cellSize - 1, this.vertexColors, [color.r, color.g, color.b, c]);
            }
            else {
                glutils.addBufferedDiamond(this.vertexPositions, x, -y, 0, seg - 1, this.cellSize - 1, this.vertexColors, [color.r, color.g, color.b, c]);
            }
        }
    };
    MatrixVisualization.prototype.mouseMoveHandler = function (e) {
    };
    MatrixVisualization.prototype.mouseDownHandler = function (e) {
    };
    MatrixVisualization.prototype.mouseUpHandler = function (e) {
    };
    MatrixVisualization.prototype.clickHandler = function (e) {
        console.log("click");
    };
    MatrixVisualization.prototype.zoomed = function () {
        console.log("zoomed");
    };
    return MatrixVisualization;
}());
var Matrix = (function () {
    function Matrix() {
        this._dgraph = networkcube.getDynamicGraph();
        this.startTime = this.dgraph.startTime;
        this.endTime = this.dgraph.endTime;
        this.nodeOrder = this._dgraph.nodes().ids();
        this.bbox = { x0: 0, x1: 0, y0: 0, y1: 0 };
        this._offset = [0, 0];
        this._scale = 1;
        this._cellSize = 12;
        this.initialCellSize = this._cellSize;
        ;
        this.hoveredLinks = [];
        this.longestLabelLength();
        this.plotMargin = new NMargin(0);
        this.calculatePlotMargin();
    }
    Object.defineProperty(Matrix.prototype, "dgraph", {
        get: function () {
            return this._dgraph;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "cellSize", {
        get: function () {
            return this._cellSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "offset", {
        set: function (offset) {
            this._offset = offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Matrix.prototype, "scale", {
        set: function (scale) {
            this._scale = scale;
            this._cellSize = this.initialCellSize / this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.dgraphName = function () {
        return this._dgraph.name;
    };
    Matrix.prototype.numberOfLinks = function () {
        return this._dgraph.links().length;
    };
    Matrix.prototype.maxWeight = function () {
        return this._dgraph.links().weights().max();
    };
    Matrix.prototype.setVis = function (matrixVis) {
        this.matrixVis = matrixVis;
        this.updateVisibleBox();
    };
    Matrix.prototype.longestLabelLength = function () {
        if (this.dgraph) {
            var longestLabelNode = this.dgraph.nodes().toArray().reduce(function (p, v, i, arr) {
                if (p == null || p.label() == null ||
                    (v.label() && v.label().length > p.label().length))
                    return v;
                else
                    return p;
            });
        }
        this.labelLength = longestLabelNode ? longestLabelNode.label().length : 8;
    };
    Matrix.prototype.calculatePlotMargin = function () {
        this.plotMargin.setMargin((this.labelLength * 0.5) * this.cellSize);
    };
    Matrix.prototype.updateVisibleBox = function () {
        this.bbox.x0 = -Math.floor(this._offset[0] / this._cellSize);
        this.bbox.y0 = -Math.floor(this._offset[1] / this._cellSize);
        this.bbox.x1 = this.bbox.x0 + Math.floor(this.matrixVis.width / this._cellSize);
        this.bbox.y1 = this.bbox.y0 + Math.floor(this.matrixVis.height / this._cellSize);
        this.updateVisibleData();
    };
    Matrix.prototype.updateVisibleData = function () {
        var _this = this;
        var leftNodes = this.dgraph.nodes().visible().toArray();
        leftNodes = leftNodes.filter(function (d) {
            return _this.nodeOrder[d.id()] >= _this.bbox.y0 &&
                _this.nodeOrder[d.id()] <= _this.bbox.y1;
        });
        var topNodes = this.dgraph.nodes().visible().toArray();
        topNodes = topNodes.filter(function (d) {
            return _this.nodeOrder[d.id()] >= _this.bbox.x0 &&
                _this.nodeOrder[d.id()] <= _this.bbox.x1;
        });
        var visibleData = {};
        var tmpHash = {};
        var col;
        var node;
        for (var row = 0; row < leftNodes.length; row++) {
            node = leftNodes[row];
            for (var _i = 0, _a = node.links().toArray(); _i < _a.length; _i++) {
                var link = _a[_i];
                if (!tmpHash[link.nodePair().id()]) {
                    tmpHash[link.nodePair().id()] = true;
                    var neighbor = link.target;
                    if (neighbor.isVisible() &&
                        this.nodeOrder[neighbor.id()] >= this.bbox.x0 &&
                        this.nodeOrder[neighbor.id()] <= this.bbox.x1) {
                        if (!visibleData[row])
                            visibleData[row] = {};
                        col = this.nodeOrder[neighbor.id()] - this.bbox.x0;
                        visibleData[row][col] = link.nodePair();
                    }
                }
            }
        }
        console.log(visibleData);
        this.matrixVis.updateData(visibleData);
    };
    return Matrix;
}());
var vizWidth = window.innerWidth - 10;
var vizHeight = window.innerHeight - 115;
var appendToBody = function (domId) { return $('<div id=' + domId + '></div>').appendTo('body'); };
var menuJQ = appendToBody("networkcube-matrix-menu");
var tsJQ = appendToBody("networkcube-matrix-timelineDiv'");
var labJQ = appendToBody("networkcube-matrix-visDiv");
var matrix = new Matrix();
var matrixMenu = new MatrixMenu(menuJQ, matrix);
var matrixTimeSlider = new MatrixTimeSlider(tsJQ, matrix, vizWidth);
var matrixLabels = new MatrixLabels(vizWidth, vizHeight, labJQ, matrix);
var bbox = matrixLabels.foreignObject.node().getBBox();
var matrixVis = new MatrixVisualization(bbox.width, bbox.height, matrixLabels.foreignObject, matrix);
matrix.setVis(matrixVis);
//# sourceMappingURL=matrix_zp.js.map