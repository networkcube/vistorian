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
        this.elem.append("Zoom:  <input id=\"cellSizeBox\" type=\"range\" \n      name=\"cellSizeBox\" min=\"3\" max=\"20\" \n      value=\"" + this.matrix.cellSize + '"/>');
        $('#cellSizeBox').change(this.updateCellSize);
        this.elem.append('<br/>');
        this.elem.append('<label>Label ordering:</label>');
        var orderingMenu = $("#networkcube-matrix-menu")
            .append('<select id="labelOrdering"></select>');
        $('#labelOrdering').change(this.reorderHandler);
        $('#labelOrdering').append('<option value="none">---</option>');
        $('#labelOrdering').append('<option value="alphanumerical">Alphanumerical</option>');
        $('#labelOrdering').append('<option value="reverse-alpha">Reverse Alphanumerical</option>');
        $('#labelOrdering').append('<option value="degree">Node degree</option>');
        $('#labelOrdering').append('<option value="similarity">Similarity</option>');
        this.elem.append('<input value="Re-run" type="button" onclick="reorderHandler()"/>');
    };
    MatrixMenu.prototype.updateCellSize = function () {
        var value = $('#cellSizeBox').val();
        matrix.updateCellSize(value);
    };
    MatrixMenu.prototype.reorderHandler = function () {
        var orderType = $('#labelOrdering').val();
        matrix.reorderWorker(orderType);
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
    function MatrixLabels(svg, margin, matrix) {
        this.svg = svg;
        this.matrix = matrix;
        this.margin = margin;
        this.cellSize = 0;
        this.init();
    }
    MatrixLabels.prototype.init = function () {
    };
    MatrixLabels.prototype.updateData = function (leftNodes, topNodes, cellSize, nodeOrder, leftLabelOffset, topLabelOffset, bbox) {
        var _this = this;
        this.cellSize = cellSize;
        var labelsLeft = this.svg.selectAll('.labelsLeft')
            .data(leftNodes);
        var leftLabelPosition = function (nodeId) { return _this.margin.top + leftLabelOffset + cellSize * (nodeOrder[nodeId] - bbox.y0) + cellSize; };
        labelsLeft.enter().append('text')
            .attr('id', function (d, i) { return 'nodeLabel_left_' + d.id(); })
            .attr('class', 'labelsLeft nodeLabel')
            .attr('text-anchor', 'end')
            .attr('x', this.margin.left - 10)
            .attr('y', function (d, i) { return leftLabelPosition(d.id()); })
            .on('mouseover', function (d, i) {
            networkcube.highlight('set', { nodes: [d] });
        })
            .on('mouseout', function (d, i) {
            networkcube.highlight('reset');
        })
            .on('click', function (d, i) {
            _this.matrix.nodeClicked(d);
        });
        labelsLeft.exit().remove();
        labelsLeft
            .attr('id', function (d, i) { return 'nodeLabel_left_' + d.id(); })
            .text(function (d, i) { return d.label(); })
            .attr('x', this.margin.left - 10)
            .attr('y', function (d, i) {
            return leftLabelPosition(d.id());
        });
        var labelsTop = this.svg.selectAll('.labelsTop')
            .data(topNodes);
        var topLabelPosition = function (nodeId) { return _this.margin.left + topLabelOffset + cellSize * (nodeOrder[nodeId] - bbox.x0) + cellSize; };
        labelsTop.enter().append('text')
            .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
            .attr('class', 'labelsTop nodeLabel')
            .text(function (d, i) { return d.label(); })
            .attr('x', function (d, i) { return topLabelPosition(d.id()); })
            .attr('y', this.margin.left - 10)
            .attr('transform', function (d, i) { return 'rotate(-90, ' + (_this.margin.top + cellSize * i + cellSize) + ', ' + (_this.margin.left - 10) + ')'; })
            .on('mouseover', function (d, i) {
            networkcube.highlight('set', { nodes: [d] });
        })
            .on('mouseout', function (d, i) {
            networkcube.highlight('reset');
        })
            .on('click', function (d, i) {
            _this.matrix.nodeClicked(d);
        });
        labelsTop.exit().remove();
        labelsTop
            .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
            .text(function (d, i) { return d.label(); })
            .attr('x', function (d, i) {
            return topLabelPosition(d.id());
        })
            .attr('y', this.margin.top - 10)
            .attr('transform', function (d, i) { return 'rotate(-90, ' + (_this.margin.top + topLabelOffset + cellSize * (nodeOrder[d.id()] - bbox.x0) + cellSize) + ', ' + (_this.margin.left - 10) + ')'; });
        this.updateSelectedNodes();
    };
    MatrixLabels.prototype.updateSelectedNodes = function () {
        this.svg.selectAll('.nodeLabel')
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
            .style('font-size', this.cellSize);
    };
    return MatrixLabels;
}());
var MatrixVisualization = (function () {
    function MatrixVisualization(width, height, elem, matrix) {
        var _this = this;
        this.mouseMoveHandler = function (e) {
            var mpos = glutils.getMousePos(_this.canvas, e.clientX, e.clientY);
            for (var _i = 0, _a = _this.hoveredLinks; _i < _a.length; _i++) {
                var id = _a[_i];
                if (_this.cellHighlightFrames[id])
                    for (var _b = 0, _c = _this.cellHighlightFrames[id]; _b < _c.length; _b++) {
                        var frame = _c[_b];
                        _this.scene.remove(frame);
                    }
            }
            _this.hoveredLinks = [];
            var cell = _this.posToCell(mpos);
            if (!_this.mouseDown) {
                _this.highlightLink(cell);
            }
            else {
                var box = { x0: 0, y0: 0, x1: 0, y1: 0 };
                box.x0 = Math.min(cell.col, _this.mouseDownCell.col);
                box.x1 = Math.max(cell.col, _this.mouseDownCell.col);
                box.y0 = Math.min(cell.row, _this.mouseDownCell.row);
                box.y1 = Math.max(cell.row, _this.mouseDownCell.row);
                for (var c = box.x0; c <= box.x1; c++) {
                    for (var r = box.y0; r <= box.y1; r++) {
                        var ch = { row: r, col: c };
                        _this.highlightLink(ch);
                    }
                }
            }
        };
        this.mouseDownHandler = function (e) {
            if (e.shiftKey) {
                _this.view.on('mousedown.zoom', null);
                _this.mouseDown = true;
                _this.mouseDownPos = glutils.getMousePos(_this.canvas, e.clientX, e.clientY);
                _this.mouseDownCell = _this.posToCell(_this.mouseDownPos);
            }
        };
        this.mouseUpHandler = function (e) {
            _this.mouseDown = false;
            _this.view.call(_this.zoom);
            for (var _i = 0, _a = _this.hoveredLinks; _i < _a.length; _i++) {
                var id = _a[_i];
                for (var _b = 0, _c = _this.cellHighlightFrames[id]; _b < _c.length; _b++) {
                    var frame = _c[_b];
                    _this.scene.remove(frame);
                }
            }
            _this.hoveredLinks = [];
        };
        this.zoomed = function () {
            var z, tr;
            z = _this.zoom.scale();
            tr = _this.zoom.translate();
            _this.updateTransform(z, tr);
        };
        this.width = width;
        this.height = height;
        this.elem = elem;
        this.matrix = matrix;
        this.nrows = 0;
        this.ncols = 0;
        this.scale = 1;
        this.tr = [0, 0];
        this.offset = [0, 0];
        this.guideLines = [];
        this.hoveredLinks = [];
        this.mouseDownCell = { row: 0, col: 0 };
        this.cellHighlightFrames = networkcube.array(undefined, matrix.numberOfLinks());
        this.cellSelectionFrames = networkcube.array(undefined, matrix.numberOfLinks());
        this.linkWeightScale = d3.scale.linear().range([0.1, 1])
            .domain([0, matrix.maxWeight()]);
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
        this.cellSize = this.matrix.cellSize;
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
    MatrixVisualization.prototype.updateData = function (data, nrows, ncols, cellSize, offset) {
        this.data = data;
        this.nrows = nrows;
        this.ncols = ncols;
        this.offset = offset;
        this.cellSize = cellSize;
        if (this.geometry) {
            this.scene.remove(this.mesh);
        }
        for (var _i = 0, _a = this.hoveredLinks; _i < _a.length; _i++) {
            var id = _a[_i];
            if (this.cellHighlightFrames[id])
                for (var _b = 0, _c = this.cellHighlightFrames[id]; _b < _c.length; _b++) {
                    var frame = _c[_b];
                    this.scene.remove(frame);
                }
        }
        this.updateGuideLines();
        this.vertexPositions = [];
        this.vertexColors = [];
        this.highlightFrames = [];
        this.cellHighlightFrames = [];
        this.linksPos = {};
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
        var alpha;
        var color;
        links = pair.links().toArray();
        linkNum = links.length;
        seg = this.cellSize / linkNum;
        z = 1;
        for (var j = 0; j < links.length; j++) {
            e = links[j];
            var webColor = networkcube.getPriorityColor(e);
            if (!webColor)
                webColor = '#000000';
            meanWeight = e.weights() ? e.weights(this.matrix.startTime, this.matrix.endTime).mean() : 1;
            color = new THREE.Color(webColor);
            alpha = this.linkWeightScale(Math.abs(meanWeight));
            x = col * this.cellSize + seg * j + seg / 2 + this.offset[0];
            y = row * this.cellSize + this.cellSize / 2 + this.offset[1];
            this.paintCell(e.id(), x, y, seg, [color.r, color.g, color.b, alpha], meanWeight > 0);
            if (!this.linksPos[row])
                this.linksPos[row] = {};
            if (!this.linksPos[row][col])
                this.linksPos[row][col] = [];
            this.linksPos[row][col].push(e.id());
        }
    };
    MatrixVisualization.prototype.paintCell = function (id, x, y, w, color, positive) {
        var h = this.cellSize;
        var highlightFrames = new THREE.Mesh();
        var selectionFrames = new THREE.Mesh();
        var frame;
        if (positive) {
            glutils.addBufferedRect(this.vertexPositions, x, -y, 0, w - 1, h - 1, this.vertexColors, color);
        }
        else {
            glutils.addBufferedDiamond(this.vertexPositions, x, -y, 0, w - 1, h - 1, this.vertexColors, color);
        }
        frame = glutils.createRectFrame(w - 1, h - 1, COLOR_HIGHLIGHT, 1);
        frame.position.x = x;
        frame.position.y = -y;
        frame.position.z = 10;
        highlightFrames.add(frame);
        if (!this.cellHighlightFrames[id])
            this.cellHighlightFrames[id] = [];
        this.cellHighlightFrames[id].push(highlightFrames);
        frame = glutils.createRectFrame(w - 1, h - 1, COLOR_SELECTION, 2);
        frame.position.x = x;
        frame.position.y = -y;
        frame.position.z = 9;
        selectionFrames.add(frame);
        this.cellSelectionFrames[id] = selectionFrames;
    };
    MatrixVisualization.prototype.updateGuideLines = function () {
        for (var i = 0; i < this.guideLines.length; i++) {
            this.scene.remove(this.guideLines[i]);
        }
        if (!this.data)
            return;
        console.log("update guidelines");
        var w = this.ncols * this.cellSize;
        var h = this.nrows * this.cellSize;
        var geometry1 = new THREE.Geometry();
        geometry1.vertices.push(new THREE.Vector3(this.offset[0], 0, 0), new THREE.Vector3(w + this.offset[0], 0, 0));
        var geometry2 = new THREE.Geometry();
        geometry2.vertices.push(new THREE.Vector3(0, -this.offset[1], 0), new THREE.Vector3(0, -h - this.offset[1], 0));
        var m, pos;
        var mat = new THREE.LineBasicMaterial({ color: 0xeeeeee, linewidth: 1 });
        var x, y;
        var j = 0;
        for (var i = 0; i <= h; i += this.cellSize) {
            pos = j * this.cellSize + this.offset[1];
            m = new THREE.Line(geometry1, mat);
            m.position.set(0, -pos, 0);
            this.scene.add(m);
            this.guideLines.push(m);
            j++;
        }
        j = 0;
        for (var i = 0; i <= w; i += this.cellSize) {
            pos = j * this.cellSize + this.offset[0];
            m = new THREE.Line(geometry2, mat);
            m.position.set(pos, 0, 0);
            this.scene.add(m);
            this.guideLines.push(m);
            j++;
        }
    };
    MatrixVisualization.prototype.highlightLink = function (cell) {
        var row = cell.row;
        var col = cell.col;
        var id;
        if (this.linksPos[row]) {
            if (this.linksPos[row][col]) {
                for (var _i = 0, _a = this.linksPos[row][col]; _i < _a.length; _i++) {
                    var id_1 = _a[_i];
                    for (var _b = 0, _c = this.cellHighlightFrames[id_1]; _b < _c.length; _b++) {
                        var frame = _c[_b];
                        this.scene.add(frame);
                    }
                    this.hoveredLinks.push(id_1);
                }
                this.render();
            }
        }
    };
    MatrixVisualization.prototype.posToCell = function (pos) {
        var row = Math.round((pos.y - this.offset[1] - this.cellSize / 2) / this.cellSize);
        var col = Math.round((pos.x - this.offset[0] - this.cellSize / 2) / this.cellSize);
        return { row: row, col: col };
    };
    MatrixVisualization.prototype.clickHandler = function (e) {
        console.log("click");
    };
    MatrixVisualization.prototype.updateTransform = function (z, tr) {
        tr[0] = Math.min(0, tr[0]);
        tr[1] = Math.min(0, tr[1]);
        this.zoom.scale(z);
        this.zoom.translate(tr);
        this.matrix.updateTransform(z, tr);
    };
    return MatrixVisualization;
}());
var Matrix = (function () {
    function Matrix() {
        var _this = this;
        this.timeRangeHandler = function (m) {
            _this.startTime = _this._dgraph.time(m.startId);
            _this.endTime = _this._dgraph.time(m.endId);
            _this.updateVisibleData();
        };
        this._dgraph = networkcube.getDynamicGraph();
        this.startTime = this.dgraph.startTime;
        this.endTime = this.dgraph.endTime;
        this.nodeOrder = this._dgraph.nodes().ids();
        this.bbox = { x0: 0, x1: 0, y0: 0, y1: 0 };
        this._tr = [0, 0];
        this.offset = [0, 0];
        this._scale = 1;
        this.initialCellSize = 12;
        this._cellSize = this.initialCellSize;
        this.hoveredLinks = [];
        this.longestLabelLength();
        this.margin = new NMargin(0);
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
    Matrix.prototype.updateCellSize = function (value) {
        var scale = value / this.initialCellSize;
        var tr = [this._tr[0] * scale / this._scale, this._tr[1] * scale / this._scale];
        this.matrixVis.updateTransform(scale, tr);
    };
    Matrix.prototype.updateTransform = function (scale, tr) {
        this._scale = scale;
        this._tr = tr;
        this._cellSize = this._scale * this.initialCellSize;
        this.updateVisibleData();
    };
    Matrix.prototype.dgraphName = function () {
        return this._dgraph.name;
    };
    Matrix.prototype.numberOfLinks = function () {
        return this._dgraph.links().length;
    };
    Matrix.prototype.maxWeight = function () {
        return this._dgraph.links().weights().max();
    };
    Matrix.prototype.reorderWorker = function (orderType) {
        if (orderType == 'alphanumerical') {
            var nodes2 = this._dgraph.nodes().visible().sort('label').toArray();
            this.nodeOrder = [];
            for (var i = 0; i < nodes2.length; i++) {
                this.nodeOrder[nodes2[i].id()] = i;
            }
        }
        else if (orderType == 'reverse-alpha') {
            var nodes2 = this._dgraph.nodes().visible().sort('label', false).toArray();
            this.nodeOrder = [];
            for (var i = 0; i < nodes2.length; i++) {
                this.nodeOrder[nodes2[i].id()] = i;
            }
        }
        else if (orderType == 'degree') {
            var nodes2 = this._dgraph.nodes().visible()
                .createAttribute('degree', function (n) {
                return n.neighbors().length;
            })
                .sort('degree').toArray();
            for (var i = 0; i < nodes2.length; i++) {
                this.nodeOrder[nodes2[i].id()] = i;
            }
        }
        else if (orderType == 'similarity') {
            var config = new networkcube.OrderingConfiguration();
            config.start = this.startTime;
            config.end = this.endTime;
            config.nodes = this._dgraph.nodes().visible().toArray();
            config.links = this._dgraph.links().presentIn(this.startTime, this.endTime).visible().toArray();
            this.nodeOrder = networkcube.orderNodes(this._dgraph, config);
        }
        else {
            var visibleNodes = this._dgraph.nodes().visible().toArray();
            this.nodeOrder = [];
            for (var i = 0; i < visibleNodes.length; i++) {
                this.nodeOrder[visibleNodes[i].id()] = i;
            }
        }
        this.updateVisibleData();
    };
    Matrix.prototype.setVis = function (matrixVis) {
        this.matrixVis = matrixVis;
        this.updateTransform(1, [0, 0]);
    };
    Matrix.prototype.setLabels = function (matrixLabels) {
        this.labelsVis = matrixLabels;
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
        this.margin.setMargin((this.labelLength * 0.5) * this.cellSize);
    };
    Matrix.prototype.updateVisibleBox = function () {
        this.bbox.x0 = -Math.floor(this._tr[0] / this._cellSize);
        this.bbox.y0 = -Math.floor(this._tr[1] / this._cellSize);
        this.bbox.x1 = this.bbox.x0 + Math.floor(this.matrixVis.width / this._cellSize);
        this.bbox.y1 = this.bbox.y0 + Math.floor(this.matrixVis.height / this._cellSize);
        this.offset[0] = (this._tr[0] / this._cellSize + this.bbox.x0) * this._cellSize;
        this.offset[1] = (this._tr[1] / this._cellSize + this.bbox.y0) * this._cellSize;
    };
    Matrix.prototype.updateVisibleData = function () {
        var _this = this;
        this.updateVisibleBox();
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
        var row, col;
        var node;
        for (var i = 0; i < leftNodes.length; i++) {
            node = leftNodes[i];
            if (node.isVisible()) {
                row = this.nodeOrder[node.id()] - this.bbox.y0;
                for (var _i = 0, _a = node.links().toArray(); _i < _a.length; _i++) {
                    var link = _a[_i];
                    tmpHash[link.nodePair().id()] = true;
                    var neighbor = link.source.id() == node.id() ? link.target : link.source;
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
        this.matrixVis.updateData(visibleData, leftNodes.length, topNodes.length, this.cellSize, this.offset);
        if (this.labelsVis) {
            this.labelsVis.updateData(leftNodes, topNodes, this.cellSize, this.nodeOrder, this.offset[0], this.offset[1], this.bbox);
        }
    };
    Matrix.prototype.nodeClicked = function (d) {
        var selections = d.getSelections();
        var currentSelection = this.dgraph.getCurrentSelection();
        for (var j = 0; j < selections.length; j++) {
            if (selections[j] == currentSelection) {
                networkcube.selection('remove', { nodes: [d] });
                return;
            }
        }
        networkcube.selection('add', { nodes: [d] });
        this.labelsVis.updateSelectedNodes();
    };
    return Matrix;
}());
var matrix = new Matrix();
var vizWidth = window.innerWidth - 10;
var vizHeight = window.innerHeight - 115;
var appendToBody = function (domId) { return $('<div id=' + domId + '></div>').appendTo('body'); };
var menuJQ = appendToBody("networkcube-matrix-menu");
var tsJQ = appendToBody("networkcube-matrix-timelineDiv'");
var labJQ = appendToBody("networkcube-matrix-visDiv");
var svg = d3.select(labJQ.get(0))
    .append('svg')
    .attr('id', 'networkcube-matrix-visSvg')
    .attr('width', vizWidth)
    .attr('height', vizHeight);
var foreignObject = svg.append('foreignObject')
    .attr('id', 'networkcube-matrix-visCanvasFO')
    .attr('x', matrix.margin.left)
    .attr('y', matrix.margin.top)
    .attr('width', vizWidth - matrix.margin.left)
    .attr('height', vizHeight - matrix.margin.top);
var bbox = foreignObject.node().getBBox();
var matrixMenu = new MatrixMenu(menuJQ, matrix);
var matrixTimeSlider = new MatrixTimeSlider(tsJQ, matrix, vizWidth);
var matrixLabels = new MatrixLabels(svg, matrix.margin, matrix);
var matrixVis = new MatrixVisualization(bbox.width, bbox.height, foreignObject, matrix);
matrix.setLabels(matrixLabels);
matrix.setVis(matrixVis);
networkcube.addEventListener('timeRange', matrix.timeRangeHandler);
//# sourceMappingURL=matrix_zp.js.map