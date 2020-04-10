var glutils;
(function (glutils) {
    function makeAlphaBuffer(array, stretch) {
        var buffer = new Float32Array(array.length * stretch);
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < stretch; j++) {
                buffer[i * stretch + j] = array[i];
            }
        }
        return buffer;
    }
    glutils.makeAlphaBuffer = makeAlphaBuffer;
    function addBufferedHatchedRect(vertexArray, x, y, z, width, height, colorArray, c) {
        var HATCH_NUM = 3;
        var LINE_WIDTH = 1;
        var hatchWidth = width / HATCH_NUM;
        width = width / 2;
        height = height / 2;
        var startX = x + width;
        var startY = y - height;
        for (var i = 1; i <= HATCH_NUM; i++) {
            vertexArray.push([startX - hatchWidth * i, startY, z], [startX - hatchWidth * i + LINE_WIDTH, startY, z], [startX, startY + hatchWidth * i + LINE_WIDTH, z], [startX, startY + hatchWidth * i + LINE_WIDTH, z], [startX, startY + hatchWidth * i, z], [startX - hatchWidth * i, startY, z]);
            colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
        }
    }
    glutils.addBufferedHatchedRect = addBufferedHatchedRect;
    function addBufferedRect(vertexArray, x, y, z, width, height, colorArray, c) {
        width = width / 2;
        height = height / 2;
        vertexArray.push([x - width, y - height, z], [x + width, y - height, z], [x + width, y + height, z], [x + width, y + height, z], [x - width, y + height, z], [x - width, y - height, z]);
        colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
    }
    glutils.addBufferedRect = addBufferedRect;
    function addBufferedCirlce(vertexArray, x, y, z, radius, colorArray, c) {
        var segments = 11;
        var angle = Math.PI / (segments / 2);
        for (var i = 0; i < segments; i++) {
            vertexArray.push([x + Math.cos(i * angle) * radius, y + Math.sin(i * angle) * radius, z], [x + Math.cos((i + 1) * angle) * radius, y + Math.sin((i + 1) * angle) * radius, z], [x, y, z]);
            colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
        }
    }
    glutils.addBufferedCirlce = addBufferedCirlce;
    function addBufferedDiamond(vertexArray, x, y, z, width, height, colorArray, c) {
        width = width / 2;
        height = height / 2;
        vertexArray.push([x - width, y, z], [x, y - height, z], [x + width, y, z], [x + width, y, z], [x, y + height, z], [x - width, y, z]);
        colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
    }
    glutils.addBufferedDiamond = addBufferedDiamond;
    function createRectFrame(w, h, color, lineThickness) {
        w = w / 2;
        h = h / 2;
        var geom = new THREE.Geometry();
        geom.vertices = [
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(w, -h, 0),
            new THREE.Vector3(-w, -h, 0)
        ];
        var material = new THREE.LineBasicMaterial({
            color: color,
        });
        return new THREE.Line(geom, material);
    }
    glutils.createRectFrame = createRectFrame;
    function createDiagonalCross(w, h, color, lineThickness) {
        w = w / 2;
        h = h / 2;
        var geom = new THREE.Geometry();
        geom.vertices = [
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(w, -h, 0),
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, -h, 0)
        ];
        var material = new THREE.LineBasicMaterial({
            color: color,
            linewidth: lineThickness,
        });
        return new THREE.Line(geom, material);
    }
    glutils.createDiagonalCross = createDiagonalCross;
    function makeBuffer3f(array) {
        var buffer = new Float32Array(array.length * 3);
        for (var i = 0; i < array.length; i++) {
            buffer[i * 3 + 0] = array[i][0];
            buffer[i * 3 + 1] = array[i][1];
            buffer[i * 3 + 2] = array[i][2];
        }
        return buffer;
    }
    glutils.makeBuffer3f = makeBuffer3f;
    function makeBuffer4f(array) {
        var buffer = new Float32Array(array.length * 4);
        for (var i = 0; i < array.length; i++) {
            buffer[i * 4 + 0] = array[i][0];
            buffer[i * 4 + 1] = array[i][1];
            buffer[i * 4 + 2] = array[i][2];
            buffer[i * 4 + 3] = array[i][3];
        }
        return buffer;
    }
    glutils.makeBuffer4f = makeBuffer4f;
    function updateBuffer(buffer, array, size) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < size; j++) {
                buffer[i * size + j] = array[i][j];
            }
        }
    }
    glutils.updateBuffer = updateBuffer;
    function createText(string, x, y, z, size, color, weight, align) {
        if (weight === void 0) { weight = 'normal'; }
        if (align === void 0) { align = 'left'; }
        var textGeom = new THREE.TextGeometry(string, {
            size: size,
            height: 1,
            weight: weight,
            curveSegments: 1,
            font: 'helvetiker'
        });
        var textMaterial = new THREE.MeshBasicMaterial({ color: color });
        var label = new THREE.Mesh(textGeom, textMaterial);
        if (align == 'right') {
            label.geometry.computeBoundingBox();
            var bounds = label.geometry.boundingBox;
            x -= bounds.max.x - bounds.min.x;
        }
        label.position.set(x, y, z);
        return label;
    }
    glutils.createText = createText;
    function getMousePos(canvas, x, y) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: x - rect.left,
            y: y - rect.top
        };
    }
    glutils.getMousePos = getMousePos;
    var txtCanvas = document.createElement("canvas");
    var WebGL = (function () {
        function WebGL(params) {
            this.elementQueries = [];
            txtCanvas = document.createElement("canvas");
            txtCanvas.setAttribute('id', 'textCanvas');
        }
        WebGL.prototype.render = function () {
            for (var i = 0; i < this.elementQueries.length; i++) {
                if (this.elementQueries[i].updateAttributes || this.elementQueries[i].updateStyle) {
                    this.elementQueries[i].set();
                }
            }
            this.renderer.render(this.scene, this.camera);
        };
        WebGL.prototype.selectAll = function () {
            return glutils.selectAll();
        };
        WebGL.prototype.enableZoom = function (b) {
            if (b) {
                window.addEventListener("mousewheel", mouseWheel, false);
                function mouseWheel(event) {
                    event.preventDefault();
                    webgl.camera.zoom += event.wheelDelta / 1000;
                    webgl.camera.zoom = Math.max(0.1, webgl.camera.zoom);
                    webgl.camera.updateProjectionMatrix();
                    webgl.render();
                }
            }
            else {
                window.addEventListener("mousewheel", mouseWheel, false);
            }
        };
        WebGL.prototype.enablePanning = function (b) {
            this.interactor.isPanEnabled = b;
        };
        WebGL.prototype.enableHorizontalPanning = function (b) {
            this.interactor.isHorizontalPanEnabled = b;
        };
        return WebGL;
    }());
    glutils.WebGL = WebGL;
    var webgl;
    function initWebGL(parentId, width, height, params) {
        webgl = new WebGL(params);
        webgl.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 1000);
        webgl.scene = new THREE.Scene();
        webgl.scene.add(webgl.camera);
        webgl.camera.position.z = 100;
        webgl.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true
        });
        webgl.renderer.setSize(width, height);
        webgl.renderer.setClearColor(0xffffff, 1);
        webgl.canvas = webgl.renderer.domElement;
        $("#" + parentId).append(webgl.canvas);
        webgl.interactor = new WebGLInteractor(webgl.scene, webgl.canvas, webgl.camera);
        var light = new THREE.PointLight(0x000000, 1, 100);
        light.position.set(0, 0, 1000);
        webgl.scene.add(light);
        return webgl;
    }
    glutils.initWebGL = initWebGL;
    function setWebGL(scene, camera, renderer, canvas) {
        webgl = new WebGL();
        webgl.camera = camera;
        webgl.scene = scene;
        webgl.renderer = renderer;
    }
    glutils.setWebGL = setWebGL;
    function selectAll() {
        var q = new glutils.WebGLElementQuery();
        webgl.elementQueries.push(q);
        return q;
    }
    glutils.selectAll = selectAll;
    var WebGLElementQuery = (function () {
        function WebGLElementQuery() {
            this.dataElements = [];
            this.visualElements = [];
            this.children = [];
            this.x = [];
            this.y = [];
            this.z = [];
            this.r = [];
            this.fill = [];
            this.stroke = [];
            this.strokewidth = [];
            this.opacity = [];
            this.updateAttributes = false;
            this.updateStyle = false;
            this.IS_SHADER = false;
            this.scene = webgl.scene;
        }
        WebGLElementQuery.prototype.data = function (arr) {
            this.dataElements = arr.slice(0);
            return this;
        };
        WebGLElementQuery.prototype.append = function (shape) {
            var elements = [];
            switch (shape) {
                case 'circle':
                    createCirclesWithBuffers(this, this.scene);
                    break;
                case 'path':
                    elements = createPaths(this.dataElements, this.scene);
                    break;
                case 'line':
                    elements = createLines(this.dataElements, this.scene);
                    break;
                case 'rect':
                    elements = createRectangles(this.dataElements, this.scene);
                    break;
                case 'text':
                    elements = createWebGLText(this.dataElements, this.scene);
                    break;
                case 'polygon':
                    elements = createPolygons(this.dataElements, this.scene);
                    break;
                default: console.error('Shape', shape, 'does not exist.');
            }
            if (!this.IS_SHADER) {
                for (var i = 0; i < elements.length; i++) {
                    this.x.push(0);
                    this.y.push(0);
                    this.z.push(0);
                }
            }
            this.shape = shape;
            this.visualElements = elements;
            return this;
        };
        WebGLElementQuery.prototype.push = function (e) {
            this.dataElements.push(e);
            return this;
        };
        WebGLElementQuery.prototype.getData = function (i) {
            return this.dataElements[this.visualElements.indexOf(i)];
        };
        WebGLElementQuery.prototype.getVisual = function (i) {
            return this.visualElements[this.dataElements.indexOf(i)];
        };
        Object.defineProperty(WebGLElementQuery.prototype, "length", {
            get: function () {
                return this.dataElements.length;
            },
            enumerable: true,
            configurable: true
        });
        WebGLElementQuery.prototype.filter = function (f) {
            var arr = [];
            var visArr = [];
            for (var i = 0; i < this.dataElements.length; i++) {
                if (f(this.dataElements[i], i)) {
                    arr.push(this.dataElements[i]);
                    visArr.push(this.visualElements[i]);
                }
            }
            var q = new WebGLElementQuery()
                .data(arr);
            q.visualElements = visArr;
            return q;
        };
        WebGLElementQuery.prototype.attr = function (name, v) {
            var l = this.visualElements.length;
            if (this.IS_SHADER) {
                for (var i = 0; i < this.dataElements.length; i++) {
                    this[name][i] = v instanceof Function ? v(this.dataElements[i], i) : v;
                }
            }
            else {
                for (var i = 0; i < l; i++) {
                    this.setAttr(this.visualElements[i], name, v instanceof Function ? v(this.dataElements[i], i) : v, i);
                    if (this.visualElements[i].hasOwnProperty('wireframe')) {
                        this.setAttr(this.visualElements[i].wireframe, name, v instanceof Function ? v(this.dataElements[i], i) : v, i);
                    }
                }
            }
            this.updateAttributes = true;
            return this;
        };
        WebGLElementQuery.prototype.style = function (name, v) {
            var l = this.visualElements.length;
            if (this.IS_SHADER) {
                name = name.replace('-', '');
                for (var i = 0; i < this.dataElements.length; i++) {
                    this[name][i] = v instanceof Function ? v(this.dataElements[i], i) : v;
                }
            }
            else {
                for (var i = 0; i < l; i++) {
                    setStyle(this.visualElements[i], name, v instanceof Function ? v(this.dataElements[i], i) : v, this);
                }
            }
            this.updateStyle = true;
            return this;
        };
        WebGLElementQuery.prototype.set = function () {
            if (!this.IS_SHADER)
                return this;
            var l = this.visualElements.length;
            var vertexPositionBuffer = [];
            var vertexColorBuffer = [];
            var c;
            if (this.shape == 'circle') {
                for (var i = 0; i < this.dataElements.length; i++) {
                    c = new THREE.Color(this.fill[i]);
                    addBufferedCirlce(vertexPositionBuffer, this.x[i], this.y[i], this.z[i], this.r[i], vertexColorBuffer, [c.r, c.g, c.b, this.opacity[i]]);
                }
            }
            var geometry = this.mesh.geometry;
            geometry.addAttribute('position', new THREE.BufferAttribute(makeBuffer3f(vertexPositionBuffer), 3));
            geometry.addAttribute('customColor', new THREE.BufferAttribute(makeBuffer4f(vertexColorBuffer), 4));
            geometry.needsUpdate = true;
            geometry.verticesNeedUpdate = true;
            this.mesh.material.needsUpdate = true;
            this.updateAttributes = false;
            this.updateStyle = false;
            return this;
        };
        WebGLElementQuery.prototype.text = function (v) {
            var l = this.visualElements.length;
            for (var i = 0; i < l; i++) {
                this.visualElements[i]['text'] = v instanceof Function ? v(this.dataElements[i], i) : v;
                if (this.visualElements[i]['text'] == undefined)
                    continue;
                setText(this.visualElements[i], this.visualElements[i]['text']);
            }
            return this;
        };
        WebGLElementQuery.prototype.on = function (event, f) {
            switch (event) {
                case 'mouseover':
                    this.mouseOverHandler = f;
                    break;
                case 'mousemove':
                    this.mouseMoveHandler = f;
                    break;
                case 'mouseout':
                    this.mouseOutHandler = f;
                    break;
                case 'mousedown':
                    this.mouseDownHandler = f;
                    break;
                case 'mouseup':
                    this.mouseUpHandler = f;
                    break;
                case 'click':
                    this.clickHandler = f;
                    break;
            }
            webgl.interactor.register(this, event);
            return this;
        };
        WebGLElementQuery.prototype.call = function (method, dataElement, event) {
            var i = this.dataElements.indexOf(dataElement);
            switch (method) {
                case 'mouseover':
                    this.mouseOverHandler(dataElement, i, event);
                    break;
                case 'mousemove':
                    this.mouseMoveHandler(dataElement, i, event);
                    break;
                case 'mouseout':
                    this.mouseOutHandler(dataElement, i, event);
                    break;
                case 'mousedown':
                    this.mouseDownHandler(dataElement, i, event);
                    break;
                case 'mouseup':
                    this.mouseUpHandler(dataElement, i, event);
                    break;
                case 'click':
                    this.clickHandler(dataElement, i, event);
                    break;
            }
            return this;
        };
        WebGLElementQuery.prototype.setAttr = function (element, attr, v, index) {
            switch (attr) {
                case 'x':
                    element.position.x = v;
                    this.x[index] = v;
                    break;
                case 'y':
                    element.position.y = v;
                    this.y[index] = v;
                    break;
                case 'z':
                    element.position.z = v;
                    this.z[index] = v;
                    break;
                case 'x1':
                    setX1(element, v);
                    break;
                case 'y1':
                    setY1(element, v);
                    break;
                case 'x2':
                    setX2(element, v);
                    break;
                case 'y2':
                    setY2(element, v);
                    break;
                case 'r':
                    element.scale.set(v, v, v);
                    break;
                case 'width':
                    element.scale.setX(v);
                    break;
                case 'height':
                    element.scale.setY(v);
                    break;
                case 'depth':
                    element.scale.setZ(v);
                    break;
                case 'd':
                    createPath(element, v);
                    break;
                case 'points':
                    createPolygon(element, v);
                    break;
                case 'rotation':
                    element.rotation.z = v * Math.PI / 180;
                    break;
                case 'scaleX':
                    element.scale.x = v;
                    break;
                case 'scaleY':
                    element.scale.y = v;
                    break;
                default: console.error('Attribute', attr, 'does not exist.');
            }
            element.geometry.verticesNeedUpdate = true;
            element.geometry.elementsNeedUpdate = true;
            element.geometry.lineDistancesNeedUpdate = true;
        };
        WebGLElementQuery.prototype.removeAll = function () {
            for (var i = 0; i < this.visualElements.length; i++) {
                if (this.visualElements[i].wireframe)
                    this.scene.remove(this.visualElements[i].wireframe);
                this.scene.remove(this.visualElements[i]);
            }
        };
        return WebGLElementQuery;
    }());
    glutils.WebGLElementQuery = WebGLElementQuery;
    function setStyle(element, attr, v, query) {
        switch (attr) {
            case 'fill':
                if (query.shape == 'text')
                    setText(element, element['text'], { color: v });
                else
                    element.material.color = new THREE.Color(v);
                break;
            case 'stroke':
                if (element.hasOwnProperty('wireframe')) {
                    element.wireframe.material.color = new THREE.Color(v);
                }
                else {
                    element.material.color = new THREE.Color(v);
                }
                break;
            case 'opacity':
                element.material.opacity = v;
                if (element.hasOwnProperty('wireframe'))
                    element.wireframe.material.opacity = v;
                break;
            case 'stroke-width':
                if (element.hasOwnProperty('wireframe'))
                    element.wireframe.material.linewidth = v;
                else
                    element.material.linewidth = v;
                break;
            case 'font-size':
                element.scale.x = v / 30;
                element.scale.y = v / 30;
                element.geometry.verticesNeedUpdate = true;
                break;
            default: console.error('Style', attr, 'does not exist.');
        }
        element.material.needsUpdate = true;
        if (element.hasOwnProperty('wireframe'))
            element.wireframe.material.needsUpdate = true;
    }
    function setText(mesh, text, parConfig) {
        var config = parConfig;
        if (config == undefined) {
            config = {};
        }
        if (config.color == undefined)
            config.color = '#000000';
        mesh['text'] = text;
        var backgroundMargin = 10;
        var txtCanvas = document.createElement("canvas");
        var context = txtCanvas.getContext("2d");
        var SIZE = 30;
        context.font = SIZE + "pt Helvetica";
        var WIDTH = context.measureText(text).width;
        txtCanvas.width = WIDTH;
        txtCanvas.height = SIZE;
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = config.color;
        context.font = SIZE + "pt Helvetica";
        context.fillText(text, 0, txtCanvas.height / 2);
        var tex = new THREE.Texture(txtCanvas);
        tex.minFilter = THREE.LinearFilter;
        tex.flipY = true;
        tex.needsUpdate = true;
        mesh.material.map = tex;
        mesh.material.transparent = true;
        mesh.material.needsUpdate = true;
        mesh.geometry = new THREE.PlaneGeometry(WIDTH, SIZE);
        mesh.geometry.needsUpdate = true;
        mesh.geometry.verticesNeedUpdate = true;
        mesh.needsUpdate = true;
    }
    function setX1(mesh, v) {
        mesh.geometry.vertices[0].x = v;
    }
    function setY1(mesh, v) {
        mesh.geometry.vertices[0].y = v;
    }
    function setX2(mesh, v) {
        mesh.geometry.vertices[1].x = v;
    }
    function setY2(mesh, v) {
        mesh.geometry.vertices[1].y = v;
    }
    function createG(dataElements, scene) {
        var visualElements = [];
        for (var i = 0; i < dataElements.length; i++) {
            visualElements.push(new GroupElement());
        }
        return visualElements;
    }
    var GroupElement = (function () {
        function GroupElement() {
            this.position = { x: 0, y: 0, z: 0 };
            this.children = [];
        }
        return GroupElement;
    }());
    function createCirclesNoShader(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c;
        for (var i = 0; i < dataElements.length; i++) {
            material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true });
            geometry = new THREE.CircleGeometry(1, 10);
            geometry.dynamic = true;
            c = new THREE.Mesh(geometry, material);
            visualElements.push(c);
            c.position.set(0, 0, 1);
            c.scale.set(10, 10, 1);
            scene.add(c);
        }
        return visualElements;
    }
    var vertexShaderProgram = "\
        attribute vec4 customColor;\
        varying vec4 vColor;\
        void main() {\
            vColor = customColor;\
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\
        }";
    var fragmentShaderProgram = "\
        varying vec4 vColor;\
        void main() {\
            gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);\
        }";
    function createCirclesWithBuffers(query, scene) {
        var dataElements = query.dataElements;
        query.IS_SHADER = true;
        var attributes = {
            customColor: { type: 'c', value: [] }
        };
        var shaderMaterial = new THREE.ShaderMaterial({
            attributes: attributes,
            vertexShader: vertexShaderProgram,
            fragmentShader: fragmentShaderProgram,
            linewidth: 2
        });
        shaderMaterial.blending = THREE.NormalBlending;
        shaderMaterial.depthTest = true;
        shaderMaterial.transparent = true;
        shaderMaterial.side = THREE.DoubleSide;
        var visualElements = [];
        var c;
        var vertexPositionBuffer = [];
        var vertexColorBuffer = [];
        var geometry = new THREE.BufferGeometry();
        addBufferedRect([], 0, 0, 0, 10, 10, [], [0, 0, 1, .5]);
        for (var i = 0; i < dataElements.length; i++) {
            query.x.push(0);
            query.y.push(0);
            query.z.push(0);
            query.r.push(0);
            query.fill.push('0x000000');
            query.stroke.push('0x000000');
            query.strokewidth.push(1);
            query.opacity.push(1);
        }
        geometry.addAttribute('position', new THREE.BufferAttribute(makeBuffer3f([]), 3));
        geometry.addAttribute('customColor', new THREE.BufferAttribute(makeBuffer4f([]), 4));
        query.mesh = new THREE.Mesh(geometry, shaderMaterial);
        query.mesh.position.set(0, 0, 1);
        scene.add(query.mesh);
        return query;
    }
    function createRectangles(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c;
        for (var i = 0; i < dataElements.length; i++) {
            var rectShape = new THREE.Shape();
            rectShape.moveTo(0, 0);
            rectShape.lineTo(0, -1);
            rectShape.lineTo(1, -1);
            rectShape.lineTo(1, 0);
            rectShape.lineTo(0, 0);
            geometry = new THREE.ShapeGeometry(rectShape);
            c = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 1);
            visualElements.push(c);
            scene.add(c);
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1, 0), new THREE.Vector3(1, -1, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0));
            var wireframe = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, linewidth: 1 }));
            c['wireframe'] = wireframe;
            wireframe.position.set(0, 0, 1.1);
            scene.add(wireframe);
        }
        return visualElements;
    }
    function createPaths(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            c = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createPolygons(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            c = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, side: THREE.DoubleSide }));
            c.doubleSided = true;
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createLines(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0));
            c = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createWebGLText(dataElements, scene) {
        var visualElements = [];
        var mesh;
        for (var i = 0; i < dataElements.length; i++) {
            mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 100), new THREE.MeshBasicMaterial());
            mesh.doubleSided = true;
            visualElements.push(mesh);
            scene.add(mesh);
        }
        return visualElements;
    }
    function createPath(mesh, points) {
        mesh.geometry.vertices = [];
        for (var i = 0; i < points.length; i++) {
            mesh.geometry.vertices.push(new THREE.Vector3(points[i].x, points[i].y, 0));
        }
        mesh.geometry.verticesNeedUpdate = true;
    }
    function createPolygon(mesh, points) {
        var vectors = [];
        var shape = new THREE.Shape(points);
        mesh.geometry = new THREE.ShapeGeometry(shape);
        mesh.geometry.verticesNeedUpdate = true;
    }
    var WebGLInteractor = (function () {
        function WebGLInteractor(scene, canvas, camera) {
            var _this = this;
            this.mouse = [];
            this.mouseStart = [];
            this.mouseDown = false;
            this.cameraStart = [];
            this.panOffset = [];
            this.lastIntersectedSelections = [];
            this.lastIntersectedElements = [];
            this.isPanEnabled = true;
            this.isHorizontalPanEnabled = true;
            this.isLassoEnabled = true;
            this.lassoPoints = [];
            this.mouseOverSelections = [];
            this.mouseMoveSelections = [];
            this.mouseOutSelections = [];
            this.mouseDownSelections = [];
            this.mouseUpSelections = [];
            this.clickSelections = [];
            this.scene = scene;
            this.canvas = canvas;
            this.camera = camera;
            this.mouse = [0, 0];
            canvas.addEventListener('mousemove', function (e) {
                _this.mouseMoveHandler(e);
            });
            canvas.addEventListener('mousedown', function (e) {
                _this.mouseDownHandler(e);
            });
            canvas.addEventListener('mouseup', function (e) {
                _this.mouseUpHandler(e);
            });
            canvas.addEventListener('click', function (e) {
                _this.clickHandler(e);
            });
        }
        WebGLInteractor.prototype.register = function (selection, method) {
            switch (method) {
                case 'mouseover':
                    this.mouseOverSelections.push(selection);
                    break;
                case 'mousemove':
                    this.mouseMoveSelections.push(selection);
                    break;
                case 'mouseout':
                    this.mouseOutSelections.push(selection);
                    break;
                case 'mousedown':
                    this.mouseDownSelections.push(selection);
                    break;
                case 'mouseup':
                    this.mouseUpSelections.push(selection);
                    break;
                case 'click':
                    this.clickSelections.push(selection);
                    break;
            }
        };
        WebGLInteractor.prototype.addEventListener = function (eventName, f) {
            if (eventName == 'lassoStart')
                this.lassoStartHandler = f;
            if (eventName == 'lassoEnd')
                this.lassoEndHandler = f;
            if (eventName == 'lassoMove')
                this.lassoMoveHandler = f;
        };
        WebGLInteractor.prototype.mouseMoveHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            if (this.isLassoEnabled && e.which == 2) {
                this.lassoPoints.push(this.mouse);
                if (this.lassoMoveHandler)
                    this.lassoMoveHandler(this.lassoPoints);
            }
            else {
                var intersectedVisualElements = [];
                for (var i = 0; i < this.lastIntersectedSelections.length; i++) {
                    for (var j = 0; j < this.lastIntersectedElements[i].length; j++) {
                        this.lastIntersectedSelections[i].call('mouseout', this.lastIntersectedElements[i][j]);
                    }
                }
                this.lastIntersectedSelections = [];
                this.lastIntersectedElements = [];
                var nothingIntersected = true;
                for (var i = 0; i < this.mouseOverSelections.length; i++) {
                    intersectedVisualElements = this.intersect(this.mouseOverSelections[i], this.mouse[0], this.mouse[1]);
                    if (intersectedVisualElements.length > 0) {
                        this.lastIntersectedElements.push(intersectedVisualElements);
                        this.lastIntersectedSelections.push(this.mouseOverSelections[i]);
                    }
                    for (var j = 0; j < intersectedVisualElements.length; j++) {
                        this.mouseOverSelections[i].call('mouseover', intersectedVisualElements[j], e);
                    }
                    if (intersectedVisualElements.length > 0)
                        nothingIntersected = false;
                }
                for (var i = 0; i < this.mouseMoveSelections.length; i++) {
                    intersectedVisualElements = this.intersect(this.mouseMoveSelections[i], this.mouse[0], this.mouse[1]);
                    for (var j = 0; j < intersectedVisualElements.length; j++) {
                        this.mouseMoveSelections[i].call('mousemove', intersectedVisualElements[j], e);
                    }
                    if (intersectedVisualElements.length > 0)
                        nothingIntersected = false;
                }
                if (nothingIntersected && this.mouseDown) {
                    if (this.isPanEnabled) {
                        this.panOffset = [e.clientX - this.mouseStart[0], e.clientY - this.mouseStart[1]];
                        if (this.isHorizontalPanEnabled)
                            webgl.camera.position.x = this.cameraStart[0] - this.panOffset[0] / webgl.camera.zoom;
                        webgl.camera.position.y = this.cameraStart[1] + this.panOffset[1] / webgl.camera.zoom;
                        webgl.render();
                    }
                }
            }
        };
        WebGLInteractor.prototype.clickHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            var intersectedVisualElements = [];
            for (var i = 0; i < this.clickSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.clickSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.clickSelections[i].call('click', intersectedVisualElements[j], e);
                }
            }
            this.mouseDown = false;
        };
        WebGLInteractor.prototype.mouseDownHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            this.mouseStart = [e.clientX, e.clientY];
            this.cameraStart = [webgl.camera.position.x, webgl.camera.position.y];
            this.mouseDown = true;
            var intersectedVisualElements = [];
            for (var i = 0; i < this.mouseDownSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.mouseDownSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.mouseDownSelections[i].call('mousedown', intersectedVisualElements[j], e);
                }
            }
            this.lassoPoints = [];
            this.lassoPoints.push(this.mouse);
            if (this.lassoStartHandler && e.which == 2) {
                this.lassoStartHandler(this.lassoPoints);
            }
        };
        WebGLInteractor.prototype.mouseUpHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            var intersectedVisualElements = [];
            for (var i = 0; i < this.mouseUpSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.mouseUpSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.mouseUpSelections[i].call('mouseup', intersectedVisualElements[j], e);
                }
            }
            this.mouseDown = false;
            if (this.lassoEndHandler && e.which == 2) {
                this.lassoEndHandler(this.lassoPoints);
            }
        };
        WebGLInteractor.prototype.intersect = function (selection, mousex, mousey) {
            switch (selection.shape) {
                case 'circle':
                    return this.intersectCircles(selection);
                    break;
                case 'rect':
                    return this.intersectRects(selection);
                    break;
                case 'path':
                    return this.intersectPaths(selection);
                    break;
                case 'text':
                    return this.intersectRects(selection);
                    break;
            }
            return [];
        };
        WebGLInteractor.prototype.intersectCircles = function (selection) {
            var intersectedElements = [];
            var d;
            for (var i = 0; i < selection.dataElements.length; i++) {
                d = Math.sqrt(Math.pow(this.mouse[0] - selection.x[i], 2) + Math.pow(this.mouse[1] - selection.y[i], 2));
                if (d <= selection.r[i])
                    intersectedElements.push(selection.dataElements[i]);
            }
            return intersectedElements;
        };
        WebGLInteractor.prototype.intersectRects = function (selection) {
            var intersectedElements = [];
            var d;
            var e;
            for (var i = 0; i < selection.visualElements.length; i++) {
                e = selection.visualElements[i];
                if (this.mouse[0] >= e.position.x && this.mouse[0] <= e.position.x + e.geometry.vertices[0].x * e.scale.x
                    && this.mouse[1] <= e.position.y && this.mouse[1] >= e.position.y + e.geometry.vertices[1].y * e.scale.y)
                    intersectedElements.push(selection.dataElements[i]);
            }
            return intersectedElements;
        };
        WebGLInteractor.prototype.intersectPaths = function (selection) {
            var intersectedElements = [];
            var e;
            var v1, v2;
            var x, y;
            var found = false;
            for (var i = 0; i < selection.visualElements.length; i++) {
                e = selection.visualElements[i];
                for (var j = 1; j < e.geometry.vertices.length; j++) {
                    v1 = e.geometry.vertices[j - 1];
                    v1 = { x: v1.x + selection.x[i],
                        y: v1.y + selection.y[i]
                    };
                    v2 = e.geometry.vertices[j];
                    v2 = { x: v2.x + selection.x[i],
                        y: v2.y + selection.y[i]
                    };
                    if (distToSegmentSquared({ x: this.mouse[0], y: this.mouse[1] }, v1, v2) < 3) {
                        intersectedElements.push(selection.dataElements[i]);
                        found = true;
                        break;
                    }
                }
                if (found)
                    break;
            }
            return intersectedElements;
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
        };
        return WebGLInteractor;
    }());
    glutils.WebGLInteractor = WebGLInteractor;
    function mouseToWorldCoordinates(mouseX, mouseY) {
        var rect = webgl.canvas.getBoundingClientRect();
        var x = webgl.camera.position.x + webgl.camera.left / webgl.camera.zoom + (mouseX - rect.left) / webgl.camera.zoom;
        var y = webgl.camera.position.y + webgl.camera.top / webgl.camera.zoom - (mouseY - rect.top) / webgl.camera.zoom;
        return [x, y];
    }
    glutils.mouseToWorldCoordinates = mouseToWorldCoordinates;
    function curve(points) {
        var arrayPoints = [];
        for (var i = 0; i < points.length; i++) {
            if (!isNaN(points[i].x))
                arrayPoints.push([points[i].x, points[i].y]);
        }
        var spline = new BSpline(arrayPoints, 3);
        var curvePoints = [];
        for (var t = 0; t <= 1; t += 0.01) {
            var p = spline.calcAt(t);
            curvePoints.push({ x: p[0], y: p[1] });
        }
        return curvePoints;
    }
    glutils.curve = curve;
    var CheckBox = (function () {
        function CheckBox() {
            var _this = this;
            this.selected = false;
            this.frame = selectAll()
                .data([0])
                .append('circle')
                .attr('r', 5)
                .style('fill', '#fff')
                .style('stroke', '#000000')
                .on('click', function () {
                _this.selected = !_this.selected;
                _this.circle.style('opacity', _this.selected ? 1 : 0);
                if (_this.changeCallBack != undefined)
                    _this.changeCallBack();
            });
            this.circle = selectAll()
                .data([0]);
        }
        CheckBox.prototype.attr = function (attrName, value) {
            switch (attrName) {
                case 'x':
                    this.frame.attr('x', value);
                    return this;
                case 'y':
                    this.frame.attr('y', value);
                    return this;
            }
        };
        CheckBox.prototype.on = function (eventType, fn) {
            switch (eventType) {
                case 'change': this.changeCallBack = fn;
            }
        };
        return CheckBox;
    }());
    glutils.CheckBox = CheckBox;
})(glutils || (glutils = {}));
var THREEx = THREEx || {};
THREEx.DynamicTexture = function (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    var context = canvas.getContext('2d');
    this.context = context;
    var texture = new THREE.Texture(canvas);
    this.texture = texture;
};
THREEx.DynamicTexture.prototype.clear = function (fillStyle) {
    if (fillStyle !== undefined) {
        this.context.fillStyle = fillStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.texture.needsUpdate = true;
    return this;
};
THREEx.DynamicTexture.prototype.drawText = function (text, x, y, fillStyle, contextFont) {
    if (contextFont !== undefined)
        this.context.font = contextFont;
    if (x === undefined || x === null) {
        var textSize = this.context.measureText(text);
        x = (this.canvas.width - textSize.width) / 2;
    }
    this.context.fillStyle = fillStyle;
    this.context.fillText(text, x, y);
    this.texture.needsUpdate = true;
    return this;
};
THREEx.DynamicTexture.prototype.drawTextCooked = function (text, options) {
    var context = this.context;
    var canvas = this.canvas;
    options = options || {};
    var params = {
        margin: options.margin !== undefined ? options.margin : 0.1,
        lineHeight: options.lineHeight !== undefined ? options.lineHeight : 0.1,
        align: options.align !== undefined ? options.align : 'left',
        fillStyle: options.fillStyle !== undefined ? options.fillStyle : 'black',
    };
    context.save();
    context.fillStyle = params.fillStyle;
    var y = (params.lineHeight + params.margin) * canvas.height;
    while (text.length > 0) {
        var maxText = computeMaxTextLength(text);
        text = text.substr(maxText.length);
        var textSize = context.measureText(maxText);
        if (params.align === 'left') {
            var x = params.margin * canvas.width;
        }
        else if (params.align === 'right') {
            var x = (1 - params.margin) * canvas.width - textSize.width;
        }
        else if (params.align === 'center') {
            var x = (canvas.width - textSize.width) / 2;
        }
        else
            console.assert(false);
        this.context.fillText(maxText, x, y);
        y += params.lineHeight * canvas.height;
    }
    context.restore();
    this.texture.needsUpdate = true;
    return this;
    function computeMaxTextLength(text) {
        var maxText = '';
        var maxWidth = (1 - params.margin * 2) * canvas.width;
        while (maxText.length !== text.length) {
            var textSize = context.measureText(maxText);
            if (textSize.width > maxWidth)
                break;
            maxText += text.substr(maxText.length, 1);
        }
        return maxText;
    }
};
THREEx.DynamicTexture.prototype.drawImage = function () {
    this.context.drawImage.apply(this.context, arguments);
    this.texture.needsUpdate = true;
    return this;
};
var geometry;
(function (geometry) {
    function length(v1) {
        return Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    }
    geometry.length = length;
    function normalize(v) {
        var l = length(v);
        return [v[0] / l, v[1] / l];
    }
    geometry.normalize = normalize;
    function setLength(v, l) {
        var len = length(v);
        return [l * v[0] / len, l * v[1] / len];
    }
    geometry.setLength = setLength;
})(geometry || (geometry = {}));
