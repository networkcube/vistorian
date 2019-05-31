/// <reference path='../scripts/three.d.ts' />
/// <reference path='./dynamicgraph.ts' />
var networkcube;
(function (networkcube) {
    function getPriorityColor(element) {
        var j = 0;
        var selections = element.getSelections();
        while (!selections[j].showColor) {
            j++;
            if (j == selections.length) {
                j = -1;
                return;
            }
        }
        return element.getSelections()[j].color;
    }
    networkcube.getPriorityColor = getPriorityColor;
    function sortByPriority(s1, s2) {
        return s1.priority - s2.priority;
    }
    networkcube.sortByPriority = sortByPriority;
    function getUrlVars() {
        var vars = {};
        var params = window.location.search.replace("?", "").split('&');
        var tmp, value;
        params.forEach(function (item) {
            tmp = item.split("=");
            value = decodeURIComponent(tmp[1]);
            vars[tmp[0]] = value;
        });
        return vars;
    }
    networkcube.getUrlVars = getUrlVars;
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    networkcube.capitalizeFirstLetter = capitalizeFirstLetter;
    function isValidIndex(v) {
        return v != undefined && v > -1;
    }
    networkcube.isValidIndex = isValidIndex;
    function array(value, size) {
        var array = [];
        while (size--)
            array[size] = value;
        return array;
    }
    networkcube.array = array;
    function doubleArray(size1, size2, value) {
        var array = [];
        if (value == undefined)
            value = [];
        var a = [];
        if (size2) {
            while (size2--)
                a[size2] = value;
        }
        while (size1--)
            array[size1] = a.slice(0);
        return array;
    }
    networkcube.doubleArray = doubleArray;
    function isBefore(t1, t2) {
        return t1.time < t2.time;
    }
    networkcube.isBefore = isBefore;
    function isAfter(t1, t2) {
        return t1.time > t2.time;
    }
    networkcube.isAfter = isAfter;
    function hex2Rgb(hex) {
        return [hexToR(hex), hexToG(hex), hexToB(hex)];
    }
    networkcube.hex2Rgb = hex2Rgb;
    function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16); }
    function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16); }
    function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16); }
    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h; }
    function hex2web(v) {
        v = v + '';
        return v.replace('0x', '#');
    }
    networkcube.hex2web = hex2web;
    function hex2RgbNormalized(hex) {
        return [hexToR(hex) / 255, hexToG(hex) / 255, hexToB(hex) / 255];
    }
    networkcube.hex2RgbNormalized = hex2RgbNormalized;
    function getType(elements) {
        if (elements.length == 0)
            return;
        var type;
        if (elements[0] instanceof networkcube.Node)
            type = 'node';
        else if (elements[0] instanceof networkcube.Link) {
            type = 'link';
        }
        else if (elements[0] instanceof networkcube.Time) {
            type = 'time';
        }
        else if (elements[0] instanceof networkcube.NodePair) {
            type = 'nodePair';
        }
        else if (elements[0] instanceof networkcube.LinkType) {
            type = 'linkType';
        }
        else if (typeof elements[0] == 'number') {
            type = 'number';
        }
        return type;
    }
    networkcube.getType = getType;
    function areEqualShallow(a, b) {
        for (var key in a) {
            if (!(key in b) || a[key] !== b[key]) {
                return false;
            }
        }
        for (var key in b) {
            if (!(key in a) || a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    networkcube.areEqualShallow = areEqualShallow;
    function compareTypesShallow(a, b) {
        if (a == null || b == null)
            return a == b;
        if (typeof a != typeof b)
            return false;
        else if (typeof a != 'object')
            return true;
        else if (a.constructor !== b.constructor)
            return false;
        else {
            return true;
        }
    }
    networkcube.compareTypesShallow = compareTypesShallow;
    function compareTypesDeep(a, b, depth) {
        var result = true;
        if (a == null || b == null)
            return a == b;
        if (typeof a != typeof b)
            return false;
        else if (typeof a != 'object')
            return true;
        else if (a.constructor !== b.constructor)
            return false;
        else {
            if (depth > 0) {
                for (var key in a) {
                    if (key in b
                        && a.hasOwnProperty(key)
                        && b.hasOwnProperty(key)
                        && !compareTypesDeep(a[key], b[key], depth - 1)) {
                        console.log("compareFailed for key", key, a[key], b[key]);
                        result = false;
                    }
                }
            }
            return result;
        }
    }
    networkcube.compareTypesDeep = compareTypesDeep;
    function copyPropsShallow(source, target) {
        for (var p in source) {
            if (source.hasOwnProperty(p))
                target[p] = source[p];
        }
        return target;
    }
    networkcube.copyPropsShallow = copyPropsShallow;
    function copyTimeseriesPropsShallow(source, target) {
        for (var q in source) {
            if (source.hasOwnProperty(q)) {
                for (var p in source[q]) {
                    if (source[q].hasOwnProperty(p)) {
                        target[q][p] = source[q][p];
                    }
                }
            }
        }
        return target;
    }
    networkcube.copyTimeseriesPropsShallow = copyTimeseriesPropsShallow;
    function copyArray(arr, ctorFunc) {
        var arrayClone = [];
        for (var elem in arr) {
            arrayClone.push(copyPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }
    networkcube.copyArray = copyArray;
    function copyTimeSeries(arr, ctorFunc) {
        var arrayClone = [];
        for (var elem in arr) {
            arrayClone.push(copyTimeseriesPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }
    networkcube.copyTimeSeries = copyTimeSeries;
    var Box = (function () {
        function Box(x1, y1, x2, y2) {
            this.x1 = Math.min(x1, x2);
            this.x2 = Math.max(x1, x2);
            this.y1 = Math.min(y1, y2);
            this.y2 = Math.max(y1, y2);
        }
        Object.defineProperty(Box.prototype, "width", {
            get: function () {
                return this.x2 - this.x1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "height", {
            get: function () {
                return this.y2 - this.y1;
            },
            enumerable: true,
            configurable: true
        });
        Box.prototype.isPoint = function () {
            return (this.width == 0) && (this.height == 0);
        };
        return Box;
    })();
    networkcube.Box = Box;
    function inBox(x, y, box) {
        return (x > box.x1
            && x < box.x2
            && y > box.y1
            && y < box.y2);
    }
    networkcube.inBox = inBox;
    function isSame(a, b) {
        if (a.length != b.length)
            return false;
        var found = true;
        for (var i = 0; i < a.length; i++) {
            found = false;
            for (var j = 0; j < b.length; j++) {
                if (a[i] == b[j])
                    found = true;
            }
            if (!found)
                return false;
        }
        return true;
    }
    networkcube.isSame = isSame;
    //     export function toScreen(x: number, y: number) {
    //         var vector = new THREE.Vector3();
    //         var projector = new THREE.Projector();
    //         projector.projectVector(vector.setFromMatrixPosition(object.matrixWorld), camera);
    // 
    //         vector.x = (vector.x * widthHalf) + widthHalf;
    //         vector.y = - (vector.y * heightHalf) + heightHalf;
    //     }
    function sortNumber(a, b) {
        return a - b;
    }
    networkcube.sortNumber = sortNumber;
    var ElementCompound = (function () {
        function ElementCompound() {
            this.nodes = [];
            this.links = [];
            this.times = [];
            this.nodePairs = [];
            this.locations = [];
        }
        return ElementCompound;
    })();
    networkcube.ElementCompound = ElementCompound;
    var IDCompound = (function () {
        function IDCompound() {
            this.nodeIds = [];
            this.linkIds = [];
            this.timeIds = [];
            this.nodePairIds = [];
            this.locationIds = [];
        }
        return IDCompound;
    })();
    networkcube.IDCompound = IDCompound;
    function cloneCompound(compound) {
        var result = new IDCompound();
        if (compound.nodeIds) {
            result.nodeIds = [];
            for (var i = 0; i < compound.nodeIds.length; i++) {
                result.nodeIds.push(compound.nodeIds[i]);
            }
        }
        if (compound.linkIds) {
            result.linkIds = [];
            for (var i = 0; i < compound.linkIds.length; i++) {
                result.linkIds.push(compound.linkIds[i]);
            }
        }
        if (compound.nodePairIds) {
            result.nodePairIds = [];
            for (var i = 0; i < compound.nodePairIds.length; i++) {
                result.nodePairIds.push(compound.nodePairIds[i]);
            }
        }
        if (compound.timeIds) {
            result.timeIds = [];
            for (var i = 0; i < compound.timeIds.length; i++) {
                result.timeIds.push(compound.timeIds[i]);
            }
        }
        return result;
    }
    networkcube.cloneCompound = cloneCompound;
    function makeIdCompound(elements) {
        var result = new IDCompound;
        if (elements != undefined) {
            if (elements.nodes) {
                result.nodeIds = elements.nodes.map(function (n, i) { return n.id(); });
            }
            if (elements.links) {
                result.linkIds = elements.links.map(function (n, i) { return n.id(); });
            }
            if (elements.times) {
                result.timeIds = elements.times.map(function (n, i) { return n.id(); });
            }
            if (elements.nodePairs) {
                result.nodePairIds = elements.nodePairs.map(function (n, i) { return n.id(); });
            }
        }
        return result;
    }
    networkcube.makeIdCompound = makeIdCompound;
    function makeElementCompound(elements, g) {
        var result = new ElementCompound;
        if (elements != undefined) {
            if (elements.nodeIds) {
                result.nodes = elements.nodeIds.map(function (id, i) { return g.node(id); });
            }
            if (elements.linkIds) {
                result.links = elements.linkIds.map(function (id, i) { return g.link(id); });
            }
            if (elements.timeIds) {
                result.times = elements.timeIds.map(function (id, i) { return g.time(id); });
            }
            if (elements.nodePairIds) {
                result.nodePairs = elements.nodePairIds.map(function (id, i) { return g.nodePair(id); });
            }
        }
        return result;
    }
    networkcube.makeElementCompound = makeElementCompound;
    function attributeSort(a, b, attributeName, asc) {
        var value = a.attr(attributeName);
        var result;
        if (typeof value == 'string') {
            result = a.attr(attributeName).localeCompare(b.attr(attributeName));
        }
        else if (typeof value == 'number') {
            result = b.attr(attributeName) - a.attr(attributeName);
        }
        else {
            result = 0;
        }
        if (asc == false) {
            result = -result;
        }
        return result;
    }
    networkcube.attributeSort = attributeSort;
    function formatAtGranularity(time, granualarity) {
        switch (granualarity) {
            case 0: return time.millisecond();
            case 1: return time.second();
            case 2: return time.minute();
            case 3: return time.hour();
            case 4: return time.day();
            case 5: return time.week();
            case 6: return time.month() + 1;
            case 7: return time.year();
        }
    }
    networkcube.formatAtGranularity = formatAtGranularity;
    function arraysEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    networkcube.arraysEqual = arraysEqual;
    function encapsulate(array, attrName) {
        if (attrName == undefined) {
            attrName = 'element';
        }
        var a = [];
        var o;
        for (var i = 0; i < array.length; i++) {
            o = {
                index: i
            };
            o[attrName] = array[i];
            a.push(o);
        }
        return a;
    }
    networkcube.encapsulate = encapsulate;
    function isPointInPolyArray(poly, pt) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) && (c = !c);
        return c;
    }
    networkcube.isPointInPolyArray = isPointInPolyArray;
    function formatTimeAtGranularity(time, granualarity) {
        var momentTime = moment(time.unixTime());
        switch (granualarity) {
            case 0: return momentTime.millisecond();
            case 1: return momentTime.second();
            case 2: return momentTime.minute();
            case 3: return momentTime.hour();
            case 4: return momentTime.day();
            case 5: return momentTime.week();
            case 6: return momentTime.month() + 1;
            default: return momentTime.year();
        }
    }
    networkcube.formatTimeAtGranularity = formatTimeAtGranularity;
    function exportPNG(canvas, name) {
        var dataURL = canvas.toDataURL('image/jpg', 1);
        var blob = dataURItoBlob(dataURL);
        // window.open(dataURL);
        var fileNameToSaveAs = name + '_' + new Date().toUTCString() + '.png';
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(blob);
        downloadLink.click();
    }
    networkcube.exportPNG = exportPNG;
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
})(networkcube || (networkcube = {}));
