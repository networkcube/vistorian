var COLOR_HIGHLIGHT = 0x000000;
var COLOR_SELECTION = 0xff0000;
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
    };
    MatrixMenu.prototype.updateCellSize = function () {
        var value = $('#cellSizeBox').val();
        matrix.updateCellSize(value);
    };
    MatrixMenu.prototype.reorderHandler = function () {
        var orderType = $('#labelOrdering').val();
        matrix.reorderWorker(orderType);
    };
    MatrixMenu.prototype.setScale = function (val) {
        $('#cellSizeBox').val(val);
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
        this.timeSlider = new TimeSlider(matrix.dgraph, vizWidth);
        this.timeSlider.appendTo(this.svg);
    };
    MatrixTimeSlider.prototype.set = function (sT, eT) {
        this.timeSlider.set(sT, eT);
    };
    return MatrixTimeSlider;
}());
var CellLabel = (function () {
    function CellLabel() {
        this.cellLabelBackground = glutils.selectAll()
            .data([{ id: 0 }])
            .append('text')
            .style('opacity', 0)
            .attr('z', -1)
            .style('font-size', 12)
            .style('stroke', '#fff')
            .style('stroke-width', 2.5);
        this.cellLabel = glutils.selectAll()
            .data([{ id: 0 }])
            .append('text')
            .style('opacity', 0)
            .attr('z', -1)
            .style('font-size', 12);
    }
    CellLabel.prototype.hideCellLabel = function () {
        this.cellLabelBackground.style('opacity', 0);
        this.cellLabel.attr('z', -1)
            .style('opacity', 0);
    };
    CellLabel.prototype.updateCellLabel = function (mx, my, val, fw) {
        this.cellLabel
            .attr('x', mx + 40)
            .attr('y', -my)
            .style('opacity', 1)
            .text(val ? val : 0)
            .attr('z', 2)
            .style('font-size', fw);
        this.cellLabelBackground
            .attr('x', mx + 40)
            .attr('y', -my)
            .style('opacity', 1)
            .text(val ? val : 0)
            .attr('z', 2)
            .style('font-size', fw);
    };
    return CellLabel;
}());
var MatrixOverview = (function () {
    function MatrixOverview(svg, width, height, matrix) {
        var _this = this;
        this.zoomed = function () {
            var z, tr;
            z = _this.zoom.scale();
            tr = _this.zoom.translate();
            _this.updateTransform(z, tr);
        };
        this.svg = svg;
        this.matrix = matrix;
        this.width = width;
        this.height = height;
        this.ratio = 1;
        this.canvasRatio = 1;
        this.init();
    }
    MatrixOverview.prototype.init = function () {
        this.focusColor = "#ccc";
        var g = this.svg.append('g');
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
            .on('zoom', this.zoomed);
        this.focus.call(this.zoom);
    };
    MatrixOverview.prototype.setCanvasRatio = function (canvasRatio) {
        this.canvasRatio = 1;
        var w = this.canvasRatio > 1 ? this.width * this.canvasRatio : this.width;
        var h = this.canvasRatio < 1 ? this.height * this.canvasRatio : this.height;
        this.contextPattern.attr("width", w)
            .attr("height", h);
        this.contextImg.attr("width", w)
            .attr("height", h);
    };
    MatrixOverview.prototype.updateTransform = function (z, tr) {
        tr[0] = -tr[0] * this.ratio;
        tr[1] = -tr[1] * this.ratio;
        this.matrix.updateTransform(z, tr);
    };
    MatrixOverview.prototype.updateFocus = function (matrixX0, matrixY0, visibleW, visibleH, r, z, tr) {
        tr[0] = -tr[0] / this.ratio;
        tr[1] = -tr[1] / this.ratio;
        this.ratio = r / this.height;
        this.zoom.scale(z);
        this.zoom.translate(tr);
        var focusX = matrixX0 * this.width;
        var focusY = matrixY0 * this.height;
        var focusWidth = Math.min(visibleW * this.width, this.width);
        var focusHeight = Math.min(visibleH * this.height, this.height);
        focusWidth = (focusX + focusWidth) > this.width ? this.width - focusX : focusWidth;
        focusHeight = (focusY + focusHeight) > this.height ? this.height - focusY : focusHeight;
        this.focus.attr("width", focusWidth)
            .attr("height", focusHeight)
            .attr("x", focusX)
            .attr("y", focusY);
    };
    MatrixOverview.prototype.updateOverviewImage = function (dataImg) {
        this.contextImg.attr("xlink:href", dataImg);
        this.context.attr("fill", "url(#bg)");
    };
    return MatrixOverview;
}());
var MatrixLabels = (function () {
    function MatrixLabels(svg, margin, matrix) {
        this.svg = svg;
        this.matrix = matrix;
        this.margin = margin;
        this.cellSize = 0;
    }
    MatrixLabels.prototype.updateData = function (leftNodes, topNodes, cellSize, nodeOrder, leftLabelOffset, topLabelOffset, bbox) {
        var _this = this;
        this.cellSize = cellSize;
        var labelsLeft = this.svg.selectAll('.labelsLeft')
            .data(leftNodes);
        var leftLabelPosition = function (nodeId) { return _this.margin.top + leftLabelOffset + cellSize * (nodeOrder[nodeId] - bbox.y0) + cellSize / 2; };
        labelsLeft.enter().append('text')
            .attr('id', function (d, i) { return 'nodeLabel_left_' + d.id(); })
            .attr('class', 'labelsLeft nodeLabel')
            .attr('text-anchor', 'end')
            .attr('alignment-baseline', 'middle')
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
        var topLabelPosition = function (nodeId) { return _this.margin.left + topLabelOffset + cellSize * (nodeOrder[nodeId] - bbox.x0) + cellSize / 2; };
        labelsTop.enter().append('text')
            .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
            .attr('class', 'labelsTop nodeLabel')
            .text(function (d, i) { return d.label(); })
            .attr('x', function (d, i) { return topLabelPosition(d.id()); })
            .attr('y', this.margin.left - 10)
            .attr('transform', function (d, i) { return 'rotate(-90, ' + (_this.margin.top + cellSize * i + cellSize / 2) + ', ' + (_this.margin.left - 10) + ')'; })
            .on('mouseover', function (d, i) {
            _this.matrix.highlightNodes([d.id()]);
        })
            .on('mouseout', function (d, i) {
            _this.matrix.highlightNodes([]);
        })
            .on('click', function (d, i) {
            _this.matrix.nodeClicked(d);
        });
        labelsTop.exit().remove();
        labelsTop
            .attr('id', function (d, i) { return 'nodeLabel_top_' + d.id(); })
            .text(function (d, i) { return d.label(); })
            .attr('alignment-baseline', 'middle')
            .attr('x', function (d, i) {
            return topLabelPosition(d.id());
        })
            .attr('y', this.margin.top - 10)
            .attr('transform', function (d, i) { return 'rotate(-90, ' + (_this.margin.top + topLabelOffset + cellSize * (nodeOrder[d.id()] - bbox.x0) + cellSize / 2) + ', ' + (_this.margin.left - 10) + ')'; });
        this.updateHighlightedNodes();
    };
    MatrixLabels.prototype.updateHighlightedNodes = function (highlightedLinks) {
        if (highlightedLinks === void 0) { highlightedLinks = []; }
        var color;
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
            .style('font-size', Math.min(this.cellSize, 20));
        for (var i_1 = 0; i_1 < highlightedLinks.length; i_1++) {
            d3.selectAll('#nodeLabel_left_' + highlightedLinks[i_1])
                .style('font-weight', 900);
            d3.selectAll('#nodeLabel_top_' + highlightedLinks[i_1])
                .style('font-weight', 900);
        }
    };
    return MatrixLabels;
}());
var MatrixVisualization = (function () {
    function MatrixVisualization(elem, width, height, matrix) {
        var _this = this;
        this.mouseMoveHandler = function (e) {
            var mpos = glutils.getMousePos(_this.canvas, e.clientX, e.clientY);
            _this.toHoverLinks = [];
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
            if (_this.toHoverLinks.length > 0) {
                _this.matrix.highlightLinks(_this.toHoverLinks);
                _this.matrix.updateCellLabel(_this.toHoverLinks[0], mpos.x, mpos.y);
            }
            else {
                _this.matrix.highlightLinks([]);
                _this.matrix.updateCellLabel(-1, -1000, -1000);
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
                if (_this.cellHighlightFrames[id])
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
        this.previousHoveredLinks = [];
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
            .on('zoom', this.zoomed);
        this.view.call(this.zoom);
        this.initGeometry();
        this.cellSize = this.matrix.cellSize;
    };
    MatrixVisualization.prototype.initWebGL = function () {
        this.webgl = glutils.initWebGL('visCanvasFO', this.width, this.height);
        this.webgl.enablePanning(false);
        this.webgl.camera.position.x = this.width / 2;
        this.webgl.camera.position.y = -this.height / 2;
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
    };
    MatrixVisualization.prototype.initTextureFramebuffer = function () {
        this.bufferTexture = new THREE.WebGLRenderTarget(256, 256, { minFilter: THREE.NearestMipMapNearestFilter, magFilter: THREE.LinearFilter });
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
    };
    MatrixVisualization.prototype.updateData = function (data, nrows, ncols, cellSize, offset, scale, tr, getImageData) {
        this.data = data;
        this.nrows = nrows;
        this.ncols = ncols;
        this.offset = offset;
        this.cellSize = cellSize;
        this.zoom.scale(scale);
        this.zoom.translate(tr);
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
        for (var i_2 = 0; i_2 < this.guideLines.length; i_2++) {
            this.scene.remove(this.guideLines[i_2]);
        }
        this.vertexPositions = [];
        this.vertexColors = [];
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
        if (getImageData) {
            var smallDim = Math.min(this.height, this.width);
            this.resizeCanvas(smallDim, smallDim);
            this.matrix.hideCellLabel();
            this.render();
            var imgData = this.canvas.toDataURL();
            this.matrix.updateOverviewImage(imgData);
            this.resizeCanvas(this.width, this.height);
        }
        this.updateGuideLines();
        this.render();
    };
    MatrixVisualization.prototype.resizeCanvas = function (width, height) {
        this.camera.position.x = width / 2;
        this.camera.position.y = -height / 2;
        this.camera.left = width / -2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = height / -2;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
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
            if (!e.isVisible())
                alpha = 0;
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
        this.guideLines = [];
        if (!this.data)
            return;
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
        for (var i_3 = 0; i_3 <= h; i_3 += this.cellSize) {
            pos = j * this.cellSize + this.offset[1];
            m = new THREE.Line(geometry1, mat);
            m.position.set(0, -pos, 0);
            this.scene.add(m);
            this.guideLines.push(m);
            j++;
        }
        j = 0;
        for (var i_4 = 0; i_4 <= w; i_4 += this.cellSize) {
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
                    this.toHoverLinks.push(id_1);
                }
            }
        }
    };
    MatrixVisualization.prototype.posToCell = function (pos) {
        var row = Math.round((pos.y - this.offset[1] - this.cellSize / 2) / this.cellSize);
        var col = Math.round((pos.x - this.offset[0] - this.cellSize / 2) / this.cellSize);
        return { row: row, col: col };
    };
    MatrixVisualization.prototype.updateHighlightedLinks = function (hoveredLinks) {
        if (hoveredLinks === void 0) { hoveredLinks = undefined; }
        this.previousHoveredLinks = this.hoveredLinks;
        this.hoveredLinks = hoveredLinks;
        for (var _i = 0, _a = this.previousHoveredLinks; _i < _a.length; _i++) {
            var id = _a[_i];
            if (this.cellHighlightFrames[id])
                for (var _b = 0, _c = this.cellHighlightFrames[id]; _b < _c.length; _b++) {
                    var frame = _c[_b];
                    this.scene.remove(frame);
                }
        }
        for (var _d = 0, _e = this.hoveredLinks; _d < _e.length; _d++) {
            var id = _e[_d];
            if (this.cellHighlightFrames[id])
                for (var _f = 0, _g = this.cellHighlightFrames[id]; _f < _g.length; _f++) {
                    var frame = _g[_f];
                    this.scene.add(frame);
                }
        }
        this.render();
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
        this.updateEvent = function () {
            var highlightedNodesIds = [];
            var highlightedLinksIds = [];
            var highlightedLinks = _this._dgraph.links().highlighted().toArray();
            if (highlightedLinks.length > 0) {
                for (var i_5 = 0; i_5 < highlightedLinks.length; i_5++) {
                    if (!highlightedLinks[i_5].isVisible())
                        continue;
                    highlightedNodesIds.push(highlightedLinks[i_5].source.id());
                    highlightedNodesIds.push(highlightedLinks[i_5].target.id());
                    highlightedLinksIds.push(highlightedLinks[i_5].id());
                }
            }
            else {
                var highlightedNodes = _this._dgraph.nodes().highlighted().toArray();
                for (var i_6 = 0; i_6 < highlightedNodes.length; i_6++) {
                    var node = highlightedNodes[i_6];
                    if (node.isVisible()) {
                        for (var _i = 0, _a = node.links().toArray(); _i < _a.length; _i++) {
                            var link = _a[_i];
                            var neighbor = link.source.id() == node.id() ? link.target : link.source;
                            if (neighbor.isVisible())
                                highlightedLinksIds.push(link.id());
                        }
                    }
                }
            }
            _this.updateVisibleData();
            _this.labels.updateHighlightedNodes(highlightedNodesIds);
            _this.visualization.updateHighlightedLinks(highlightedLinksIds);
        };
        this.timeRangeHandler = function (m) {
            _this.startTime = _this.times[0];
            _this.endTime = _this.times[_this.times.length - 1];
            for (var i = 0; i < _this.times.length; i++) {
                if (_this.times[i].unixTime() > m.startUnix) {
                    _this.startTime = _this.times[i - 1];
                    break;
                }
            }
            for (i; i < _this.times.length; i++) {
                if (_this.times[i].unixTime() > m.endUnix) {
                    _this.endTime = _this.times[i - 1];
                    break;
                }
            }
            _this.timeSlider.set(m.startUnix, m.endUnix);
            _this.updateVisibleData();
        };
        this._dgraph = networkcube.getDynamicGraph();
        this.startTime = this.dgraph.startTime;
        this.endTime = this.dgraph.endTime;
        this.times = this._dgraph.times().toArray();
        this.nodeOrder = this._dgraph.nodes().ids();
        this.bbox = { x0: 0, x1: 0, y0: 0, y1: 0 };
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
        networkcube.addEventListener('timeRange', this.timeRangeHandler);
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
    Matrix.prototype.getOverviewScale = function () {
        var totalNodes = this.dgraph.nodes().visible().length;
        var cs = Math.min(this.visualization.height, this.visualization.width) / totalNodes;
        var scale = cs / this.initialCellSize;
        return scale;
    };
    Matrix.prototype.setVis = function (matrixVis) {
        this.visualization = matrixVis;
        this.resetTransform();
    };
    Matrix.prototype.setLabels = function (matrixLabels) {
        this.labels = matrixLabels;
    };
    Matrix.prototype.setCellLabel = function (cellLabel) {
        this.cellLabel = cellLabel;
    };
    Matrix.prototype.setOverview = function (overview) {
        this.overview = overview;
    };
    Matrix.prototype.setMenu = function (menu) {
        this.menu = menu;
    };
    Matrix.prototype.setTimeSlider = function (timeSlider) {
        this.timeSlider = timeSlider;
    };
    Matrix.prototype.updateOverviewImage = function (dataImg) {
        this.overview.updateOverviewImage(dataImg);
    };
    Matrix.prototype.hideCellLabel = function () {
        this.cellLabel.hideCellLabel();
    };
    Matrix.prototype.updateCellSize = function (value) {
        var scale = value / this.initialCellSize;
        var tr = [this._tr[0] * scale / this._scale, this._tr[1] * scale / this._scale];
        this.visualization.updateTransform(scale, tr);
    };
    Matrix.prototype.resetTransform = function () {
        var scale = this.getOverviewScale();
        this.createOverviewImage = true;
        this.updateTransform(scale, [0, 0]);
        this.createOverviewImage = false;
    };
    Matrix.prototype.updateTransform = function (scale, tr) {
        this._scale = scale;
        this._tr = tr;
        this._tr[0] = Math.min(this._tr[0], 0);
        this._tr[1] = Math.min(this._tr[1], 0);
        this._cellSize = this._scale * this.initialCellSize;
        if (this.menu)
            this.menu.setScale(this._cellSize);
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
            for (var i_7 = 0; i_7 < nodes2.length; i_7++) {
                this.nodeOrder[nodes2[i_7].id()] = i_7;
            }
        }
        else if (orderType == 'reverse-alpha') {
            var nodes2 = this._dgraph.nodes().visible().sort('label', false).toArray();
            this.nodeOrder = [];
            for (var i_8 = 0; i_8 < nodes2.length; i_8++) {
                this.nodeOrder[nodes2[i_8].id()] = i_8;
            }
        }
        else if (orderType == 'degree') {
            var nodes2 = this._dgraph.nodes().visible()
                .createAttribute('degree', function (n) {
                return n.neighbors().length;
            })
                .sort('degree').toArray();
            for (var i_9 = 0; i_9 < nodes2.length; i_9++) {
                this.nodeOrder[nodes2[i_9].id()] = i_9;
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
            for (var i_10 = 0; i_10 < visibleNodes.length; i_10++) {
                this.nodeOrder[visibleNodes[i_10].id()] = i_10;
            }
        }
        this.resetTransform();
    };
    Matrix.prototype.longestLabelLength = function () {
        this.labelLength = 30;
    };
    Matrix.prototype.calculatePlotMargin = function () {
        this.margin.setMargin((this.labelLength * 0.5) * this.cellSize);
    };
    Matrix.prototype.updateVisibleBox = function () {
        this.bbox.x0 = -Math.floor(this._tr[0] / this._cellSize);
        this.bbox.y0 = -Math.floor(this._tr[1] / this._cellSize);
        this.bbox.x1 = this.bbox.x0 + Math.floor(this.visualization.width / this._cellSize);
        this.bbox.y1 = this.bbox.y0 + Math.floor(this.visualization.height / this._cellSize);
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
        var row, col;
        var node;
        for (var i_11 = 0; i_11 < leftNodes.length; i_11++) {
            node = leftNodes[i_11];
            if (node.isVisible()) {
                row = this.nodeOrder[node.id()] - this.bbox.y0;
                for (var _i = 0, _a = node.links().toArray(); _i < _a.length; _i++) {
                    var link = _a[_i];
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
        this.visualization.updateData(visibleData, leftNodes.length, topNodes.length, this.cellSize, this.offset, this._scale, this._tr, this.createOverviewImage);
        if (this.overview) {
            var totalNodes = this.dgraph.nodes().visible().length;
            var widthRatio = (this.bbox.x1 - this.bbox.x0) / totalNodes;
            var heightRatio = (this.bbox.y1 - this.bbox.y0) / totalNodes;
            var ratio = totalNodes * this.cellSize;
            this.overview.updateFocus(this.bbox.x0 / totalNodes, this.bbox.y0 / totalNodes, widthRatio, heightRatio, ratio, this._scale, this._tr);
        }
        if (this.labels) {
            this.labels.updateData(leftNodes, topNodes, this.cellSize, this.nodeOrder, this.offset[1], this.offset[0], this.bbox);
        }
    };
    Matrix.prototype.highlightLinks = function (highlightedIds) {
        var _this = this;
        if (highlightedIds.length > 0) {
            var highlightedLinks = highlightedIds.map(function (d) { return _this._dgraph.link(d); });
            networkcube.highlight('set', { links: highlightedLinks });
        }
        else
            networkcube.highlight('reset');
    };
    Matrix.prototype.nodeClicked = function (d) {
        var selections = d.getSelections();
        var currentSelection = this._dgraph.getCurrentSelection();
        for (var j = 0; j < selections.length; j++) {
            if (selections[j] == currentSelection) {
                networkcube.selection('remove', { nodes: [d] });
                return;
            }
        }
        networkcube.selection('add', { nodes: [d] });
        this.labels.updateHighlightedNodes();
    };
    Matrix.prototype.highlightNodes = function (highlightedIds) {
        var _this = this;
        if (highlightedIds.length > 0) {
            var highlightedNodes = highlightedIds.map(function (d) { return _this._dgraph.node(d); });
            networkcube.highlight('set', { nodes: highlightedNodes });
        }
        else
            networkcube.highlight('reset');
    };
    Matrix.prototype.updateCellLabel = function (linkId, mx, my) {
        if (linkId < 0) {
            this.cellLabel.updateCellLabel(-1000, -1000, null, 0);
            return;
        }
        var link = this._dgraph.link(linkId);
        var val = link.weights(this.startTime, this.endTime).get(0);
        val = Math.round(val * 1000) / 1000;
        var z = this._scale;
        var fw = this.initialCellSize;
        this.cellLabel.updateCellLabel(mx, my, val, fw);
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
var matrixVis = new MatrixVisualization(foreignObject, bbox.width, bbox.height, matrix);
var matrixOverview = new MatrixOverview(svg, matrix.margin.left - 2, matrix.margin.top - 2, matrix);
var cellLabel = new CellLabel();
matrix.setLabels(matrixLabels);
matrix.setMenu(matrixMenu);
matrix.setTimeSlider(matrixTimeSlider);
matrix.setCellLabel(cellLabel);
matrix.setOverview(matrixOverview);
matrix.setVis(matrixVis);
networkcube.addEventListener('timeRange', matrix.timeRangeHandler);
