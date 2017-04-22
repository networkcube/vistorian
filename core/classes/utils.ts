/// <reference path='../scripts/three.d.ts' />
/// <reference path='./dynamicgraph.ts' />
module networkcube {


    export function getPriorityColor(element: BasicElement): string {

        var j = 0
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


    export function sortByPriority(s1, s2) {
        return s1.priority - s2.priority;
    }


    export function getUrlVars(): Object {
        var vars: Object = {};
        var params = window.location.search.replace("?", "").split('&');
        var tmp, value;
        params.forEach(function(item) {
            tmp = item.split("=");
            value = decodeURIComponent(tmp[1]);
            vars[tmp[0]] = value;
        });
        return vars;
    }

    export function capitalizeFirstLetter(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    export function isValidIndex(v: number): boolean {
        return v != undefined && v > -1;
    }

    export function array(value: any, size: number): any[] {
        var array: any[] = []
        while (size--) array[size] = value;
        return array;
    }
    export function doubleArray(size1: number, size2?: number, value?: any): any[] {
        var array: any[] = []
        if (value == undefined)
            value = []
        var a: any[] = [];

        if (size2) {
            while (size2--) a[size2] = value;
        }
        while (size1--) array[size1] = a.slice(0);

        return array;
    }

    export function isBefore(t1: Time, t2: networkcube.Time): boolean {
        return t1.time < t2.time;
    }
    export function isAfter(t1: Time, t2: Time): boolean {
        return t1.time > t2.time;
    }

    export function hex2Rgb(hex: string): number[] {
        return [hexToR(hex), hexToG(hex), hexToB(hex)]
    }
    function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16); }
    function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16); }
    function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16); }
    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h; }

    export function hex2web(v) {
        v = v + '';
        return v.replace('0x', '#');
    }

    export function hex2RgbNormalized(hex: string): number[] {
        return [hexToR(hex) / 255, hexToG(hex) / 255, hexToB(hex) / 255]
    }


    export function getType(elements: any[]): string {

        if (elements.length == 0)
            return;
        var type: string;
        if (elements[0] instanceof Node)
            type = 'node';
        else
            if (elements[0] instanceof Link) {
                type = 'link';
            } else
                if (elements[0] instanceof Time) {
                    type = 'time';
                } else
                    if (elements[0] instanceof NodePair) {
                        type = 'nodePair';
                    } else
                        if (elements[0] instanceof LinkType) {
                            type = 'linkType';
                        } else
                            if (typeof elements[0] == 'number') {
                                type = 'number';
                            }

        return type;
    }

    export function areEqualShallow(a: any, b: any): boolean {
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

    export function compareTypesShallow(a: any, b: any): boolean {
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

    export function compareTypesDeep(a: any, b: any, depth: number): boolean {
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

    export function copyPropsShallow(source: any, target: any): any {
        for (var p in source) {
            if (source.hasOwnProperty(p))
                target[p] = source[p];
        }
        return target;
    }
    export function copyTimeseriesPropsShallow(source: any, target: any): any {
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

    export function copyArray<TElement>(arr: any[], ctorFunc: () => TElement): TElement[] {
        var arrayClone: TElement[] = [];
        for (var elem in arr) {
            arrayClone.push(copyPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }
    export function copyTimeSeries<TElement>(arr: any[], ctorFunc: () => TElement): TElement[] {
        var arrayClone: TElement[] = [];
        for (var elem in arr) {
            arrayClone.push(copyTimeseriesPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }

    export class Box {
        x1: number;
        x2: number;
        y1: number;
        y2: number;

        constructor(x1: number, y1: number, x2: number, y2: number) {

            this.x1 = Math.min(x1, x2);
            this.x2 = Math.max(x1, x2);
            this.y1 = Math.min(y1, y2);
            this.y2 = Math.max(y1, y2);
        }

        get width(): number {
            return this.x2 - this.x1;
        }
        get height(): number {
            return this.y2 - this.y1;
        }
        isPoint(): boolean {
            return (this.width == 0) && (this.height == 0);
        }
    }

    export function inBox(x, y, box: Box): boolean {
        return (x > box.x1
            && x < box.x2
            && y > box.y1
            && y < box.y2)
    }


    export function isSame(a: any[], b: any[]): boolean {
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


    //     export function toScreen(x: number, y: number) {
    //         var vector = new THREE.Vector3();
    //         var projector = new THREE.Projector();
    //         projector.projectVector(vector.setFromMatrixPosition(object.matrixWorld), camera);
    // 
    //         vector.x = (vector.x * widthHalf) + widthHalf;
    //         vector.y = - (vector.y * heightHalf) + heightHalf;
    //     }

    export function sortNumber(a, b) {
        return a - b;
    }

    export class ElementCompound {
        nodes: Node[] = [];
        links: Link[] = [];
        times: Time[] = [];
        nodePairs: NodePair[] = [];
        locations: Location[] = [];
    }
    export class IDCompound {
        nodeIds: number[] = [];
        linkIds: number[] = [];
        timeIds: number[] = [];
        nodePairIds: number[] = [];
        locationIds: number[] = [];
    }



    export function cloneCompound(compound: IDCompound): IDCompound {
        var result: IDCompound = new IDCompound();
        if (compound.nodeIds) {
            result.nodeIds = [];
            for (var i = 0; i < compound.nodeIds.length; i++) {
                result.nodeIds.push(compound.nodeIds[i])
            }
        }
        if (compound.linkIds) {
            result.linkIds = [];
            for (var i = 0; i < compound.linkIds.length; i++) {
                result.linkIds.push(compound.linkIds[i])
            }
        }
        if (compound.nodePairIds) {
            result.nodePairIds = [];
            for (var i = 0; i < compound.nodePairIds.length; i++) {
                result.nodePairIds.push(compound.nodePairIds[i])
            }
        }
        if (compound.timeIds) {
            result.timeIds = [];
            for (var i = 0; i < compound.timeIds.length; i++) {
                result.timeIds.push(compound.timeIds[i])
            }
        }
        return result;
    }

    export function makeIdCompound(elements: ElementCompound): IDCompound {
        var result: IDCompound = new IDCompound;
        if (elements != undefined) {
            if (elements.nodes) {
                result.nodeIds = elements.nodes.map((n, i) => n.id());
            }
            if (elements.links) {
                result.linkIds = elements.links.map((n, i) => n.id());
            }
            if (elements.times) {
                result.timeIds = elements.times.map((n, i) => n.id());
            }
            if (elements.nodePairs) {
                result.nodePairIds = elements.nodePairs.map((n, i) => n.id());
            }
        }
        return result;
    }
    export function makeElementCompound(elements: IDCompound, g:DynamicGraph): ElementCompound {
        var result: ElementCompound = new ElementCompound;
        if (elements != undefined) {
            if (elements.nodeIds) {
                result.nodes = elements.nodeIds.map((id, i) => g.node(id));
            }
            if (elements.linkIds) {
                result.links = elements.linkIds.map((id, i) => g.link(id));
            }
            if (elements.timeIds) {
                result.times = elements.timeIds.map((id, i) => g.time(id));
            }
            if (elements.nodePairIds) {
                result.nodePairs = elements.nodePairIds.map((id, i) => g.nodePair(id));
            }
        }
        return result;
    }

    export function attributeSort(a: BasicElement, b: BasicElement, attributeName: string, asc?: boolean): number {
        var value = a.attr(attributeName);
        var result;
        if (typeof value == 'string') {
            result = a.attr(attributeName).localeCompare(b.attr(attributeName));
        }
        else if (typeof value == 'number') {
            result = b.attr(attributeName) - a.attr(attributeName);
        } else {
            result = 0;
        }

        if (asc == false) {
            result = -result;
        }
        return result;
    }
    
     export function formatAtGranularity(time, granualarity: number) {
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

    export function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    export function encapsulate(array:any[], attrName?:string):Object[]{
        if(attrName == undefined){
            attrName = 'element';   
        }
        var a = []
        var o:Object;
        for(var i=0 ; i < array.length ; i++){
            o = {
                index:i, 
            }
            o[attrName] = array[i];
            a.push(o);
        }
        return a;
    }

    export function isPointInPolyArray(poly:number[][], pt:number[]){ 
        for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) && (c = !c); return c; 
    } 
    

    export function formatTimeAtGranularity(time:networkcube.Time, granualarity: number) {
        var momentTime = moment(time.unixTime())
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


    export function exportPNG(canvas, name:string)
    {
        var dataURL = canvas.toDataURL('image/jpg', 1);
        var blob = dataURItoBlob(dataURL);
        // window.open(dataURL);

        var fileNameToSaveAs = name + '_' + new Date().toUTCString() + '.png';
        var downloadLink = document.createElement("a")
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(blob);
        downloadLink.click();
    } 

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

        return new Blob([ia], {type:mimeString});
    }



}
