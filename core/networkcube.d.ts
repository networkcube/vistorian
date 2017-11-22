/// <reference path="scripts/three.d.ts" />
/// <reference path="scripts/moment.d.ts" />
/// <reference path="scripts/d3.d.ts" />
/// <reference path="scripts/lz-string.d.ts" />
/// <reference path="scripts/jquery.d.ts" />
declare var netClustering: {
    version: string;
};
declare var LZString: {
    compressToBase64: (o: any) => string;
    decompressFromBase64: (r: any) => string;
    compressToUTF16: (o: any) => string;
    decompressFromUTF16: (o: any) => string;
    compressToUint8Array: (o: any) => Uint8Array;
    decompressFromUint8Array: (o: any) => string;
    compressToEncodedURIComponent: (o: any) => string;
    decompressFromEncodedURIComponent: (r: any) => string;
    compress: (o: any) => string;
    _compress: (o: any, r: any, n: any) => string;
    decompress: (o: any) => string;
    _decompress: (o: any, n: any, e: any) => string;
};
declare var BSpline: (points: any, degree: any, copy: any) => void;
declare module colorSchemes {
    var schema1: string[];
    var schema2: string[];
    var schema3: string[];
    var schema4: string[];
    var schema5: string[];
    var schema6: string[];
}
declare module networkcube {
    function getPriorityColor(element: BasicElement): string;
    function sortByPriority(s1: any, s2: any): number;
    function getUrlVars(): Object;
    function capitalizeFirstLetter(string: string): string;
    function isValidIndex(v: number): boolean;
    function array(value: any, size: number): any[];
    function doubleArray(size1: number, size2?: number, value?: any): any[];
    function isBefore(t1: Time, t2: networkcube.Time): boolean;
    function isAfter(t1: Time, t2: Time): boolean;
    function hex2Rgb(hex: string): number[];
    function hex2web(v: any): any;
    function hex2RgbNormalized(hex: string): number[];
    function getType(elements: any[]): string;
    function areEqualShallow(a: any, b: any): boolean;
    function compareTypesShallow(a: any, b: any): boolean;
    function compareTypesDeep(a: any, b: any, depth: number): boolean;
    function copyPropsShallow(source: any, target: any): any;
    function copyTimeseriesPropsShallow(source: any, target: any): any;
    function copyArray<TElement>(arr: any[], ctorFunc: () => TElement): TElement[];
    function copyTimeSeries<TElement>(arr: any[], ctorFunc: () => TElement): TElement[];
    class Box {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
        constructor(x1: number, y1: number, x2: number, y2: number);
        width: number;
        height: number;
        isPoint(): boolean;
    }
    function inBox(x: any, y: any, box: Box): boolean;
    function isSame(a: any[], b: any[]): boolean;
    function sortNumber(a: any, b: any): number;
    class ElementCompound {
        nodes: Node[];
        links: Link[];
        times: Time[];
        nodePairs: NodePair[];
        locations: Location[];
    }
    class IDCompound {
        nodeIds: number[];
        linkIds: number[];
        timeIds: number[];
        nodePairIds: number[];
        locationIds: number[];
    }
    function cloneCompound(compound: IDCompound): IDCompound;
    function makeIdCompound(elements: ElementCompound): IDCompound;
    function makeElementCompound(elements: IDCompound, g: DynamicGraph): ElementCompound;
    function attributeSort(a: BasicElement, b: BasicElement, attributeName: string, asc?: boolean): number;
    function formatAtGranularity(time: any, granualarity: number): any;
    function arraysEqual(a: any, b: any): boolean;
    function encapsulate(array: any[], attrName?: string): Object[];
    function isPointInPolyArray(poly: number[][], pt: number[]): boolean;
    function formatTimeAtGranularity(time: networkcube.Time, granualarity: number): number;
    function exportPNG(canvas: any, name: string): void;
}
declare module networkcube {
    class BasicElement {
        _id: number;
        type: string;
        g: DynamicGraph;
        constructor(id: number, type: string, dynamicGraph: DynamicGraph);
        id(): number;
        attr(attr: string): any;
        getSelections(): Selection[];
        addToSelection(b: Selection): void;
        removeFromSelection(b: any): void;
        inSelection(s: Selection): boolean;
        isSelected(selection?: Selection): boolean;
        isHighlighted(): boolean;
        isFiltered(): boolean;
        isVisible(): boolean;
        presentIn(start: Time, end?: Time): boolean;
    }
    class Time extends BasicElement {
        constructor(id: number, dynamicGraph: DynamicGraph);
        time(): Moment;
        moment(): Moment;
        label(): String;
        unixTime(): number;
        links(): LinkQuery;
        year(): number;
        month(): number;
        week(): number;
        day(): number;
        hour(): number;
        minute(): number;
        second(): number;
        millisecond(): number;
        format(format: any): string;
    }
    class Node extends BasicElement {
        constructor(id: number, graph: DynamicGraph);
        label(): string;
        nodeType(): string;
        neighbors(t1?: Time, t2?: Time): NodeQuery;
        inNeighbors(t1?: Time, t2?: Time): NodeQuery;
        outNeighbors(t1?: Time, t2?: Time): NodeQuery;
        links(t1?: Time, t2?: Time): LinkQuery;
        inLinks(t1?: Time, t2?: Time): LinkQuery;
        outLinks(t1?: Time, t2?: Time): LinkQuery;
        locations(t1?: Time, t2?: Time): LocationQuery;
        locationSerie(t1?: Time, t2?: Time): ScalarTimeSeries<Location>;
        linksBetween(n: Node): LinkQuery;
    }
    class Link extends BasicElement {
        constructor(id: number, graph: DynamicGraph);
        linkType(): string;
        source: Node;
        target: Node;
        nodePair(): NodePair;
        directed(): boolean;
        other(n: Node): Node;
        weights(start?: Time, end?: Time): NumberQuery;
        presentIn(start: Time, end?: Time): boolean;
        times(): TimeQuery;
    }
    class NodePair extends BasicElement {
        constructor(id: number, graph: DynamicGraph);
        source: Node;
        target: Node;
        links(): LinkQuery;
        nodeType(): string;
        presentIn(start: Time, end?: Time): boolean;
    }
    class Location extends BasicElement {
        constructor(id: number, graph: DynamicGraph);
        label(): String;
        longitude(): number;
        latitude(): number;
        x(): number;
        y(): number;
        z(): number;
        radius(): number;
    }
    class ScalarTimeSeries<T> {
        serie: Object;
        period(t1: Time, t2: Time): ScalarTimeSeries<T>;
        set(t: Time, element: T): void;
        get(t: Time): T;
        size(): number;
        toArray(removeDuplicates?: boolean): T[];
    }
    class ArrayTimeSeries<T> {
        serie: Object;
        period(t1: Time, t2: Time): ArrayTimeSeries<T>;
        add(t: Time, element: T): void;
        get(t: Time): T[];
        toArray(): T[][];
        toFlatArray(removeDuplicates?: boolean): T[];
    }
    class Query {
        _elements: number[];
        constructor(elements?: number[]);
        contains(element: number): boolean;
        addUnique(element: number): void;
        add(element: number): void;
        addAll(elements: number[]): void;
        addAllUnique(elements: number[]): void;
        length: number;
        size(): number;
        ids(): number[];
        removeDuplicates(): Query;
        generic_intersection(q: Query): Query;
    }
    class NumberQuery extends Query {
        clone(): number[];
        min(): number;
        max(): number;
        mean(): number;
        sum(): number;
        toArray(): number[];
        get(index: number): number;
        forEach(f: Function): NumberQuery;
    }
    class StringQuery {
        _elements: string[];
        constructor(elements?: string[]);
        contains(element: string): boolean;
        addUnique(element: string): void;
        add(element: string): void;
        addAll(elements: string[]): void;
        addAllUnique(elements: string[]): void;
        length: number;
        size(): number;
        toArray(): string[];
        forEach(f: Function): StringQuery;
    }
    class GraphElementQuery extends Query {
        g: DynamicGraph;
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        generic_filter(filter: Function): any[];
        generic_selected(): any[];
        generic_visible(): any[];
        generic_highlighted(): any[];
        generic_presentIn(start: Time, end?: Time): any[];
        generic_sort(attrName: string, asc?: boolean): GraphElementQuery;
        generic_removeDuplicates(): GraphElementQuery;
    }
    class NodeQuery extends GraphElementQuery {
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        contains(n: Node): boolean;
        highlighted(): NodeQuery;
        visible(): NodeQuery;
        selected(): NodeQuery;
        filter(filter: Function): NodeQuery;
        presentIn(t1: Time, t2: Time): NodeQuery;
        sort(attributeName: string, asc?: boolean): NodeQuery;
        label(): StringQuery;
        neighbors(t1?: Time, t2?: Time): NodeQuery;
        links(t1?: Time, t2?: Time): LinkQuery;
        locations(t1?: Time, t2?: Time): LocationQuery;
        nodeTypes(): StringQuery;
        get(i: number): Node;
        last(): Node;
        toArray(): Node[];
        createAttribute(attrName: string, f: Function): NodeQuery;
        intersection(q: NodeQuery): NodeQuery;
        removeDuplicates(): NodeQuery;
        forEach(f: Function): NodeQuery;
    }
    class LinkQuery extends GraphElementQuery {
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        contains(l: Link): boolean;
        highlighted(): LinkQuery;
        visible(): LinkQuery;
        selected(): LinkQuery;
        filter(filter: Function): LinkQuery;
        presentIn(t1: Time, t2?: Time): LinkQuery;
        sort(attributeName: string): LinkQuery;
        get(i: number): Link;
        last(): Link;
        toArray(): Link[];
        weights(start?: Time, end?: Time): NumberQuery;
        createAttribute(attrName: string, f: Function): LinkQuery;
        linkTypes(): String[];
        sources(): NodeQuery;
        targets(): NodeQuery;
        intersection(q: LinkQuery): LinkQuery;
        removeDuplicates(): LinkQuery;
        forEach(f: Function): LinkQuery;
    }
    class NodePairQuery extends GraphElementQuery {
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        contains(n: NodePair): boolean;
        highlighted(): NodePairQuery;
        visible(): NodePairQuery;
        selected(): NodePairQuery;
        filter(filter: Function): NodePairQuery;
        presentIn(t1: Time, t2: Time): NodePairQuery;
        sort(attributeName: string): NodePairQuery;
        get(i: number): NodePair;
        last(): Link;
        toArray(): NodePair[];
        createAttribute(attrName: string, f: Function): NodePairQuery;
        intersection(q: NodePairQuery): NodePairQuery;
        removeDuplicates(): NodePairQuery;
        forEach(f: Function): NodePairQuery;
    }
    class TimeQuery extends GraphElementQuery {
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        contains(t: Time): boolean;
        highlighted(): TimeQuery;
        visible(): TimeQuery;
        selected(): TimeQuery;
        filter(filter: Function): TimeQuery;
        presentIn(t1: Time, t2: Time): TimeQuery;
        sort(attributeName: string): TimeQuery;
        links(): LinkQuery;
        get(i: number): Time;
        last(): Time;
        toArray(): Time[];
        createAttribute(attrName: string, f: Function): TimeQuery;
        unixTimes(): number[];
        intersection(q: TimeQuery): TimeQuery;
        forEach(f: Function): TimeQuery;
    }
    class LocationQuery extends GraphElementQuery {
        elementType: string;
        constructor(elements: any[], g: DynamicGraph);
        contains(l: Location): boolean;
        highlighted(): LocationQuery;
        visible(): LocationQuery;
        selected(): LocationQuery;
        filter(filter: Function): LocationQuery;
        presentIn(t1: Time, t2: Time): LocationQuery;
        sort(attributeName: string): LocationQuery;
        get(i: number): Location;
        last(): Location;
        toArray(): Location[];
        createAttribute(attrName: string, f: Function): LocationQuery;
        intersection(q: LocationQuery): LocationQuery;
        removeDuplicates(): LocationQuery;
        forEach(f: Function): LocationQuery;
    }
    class Motif {
        nodes: Node[];
        links: Link[];
        times: Time[];
        constructor(nodes: Node[], links: Link[]);
        print(): void;
    }
    class MotifTemplate {
        nodes: number[];
        links: number[][];
        constructor(nodes: number[], links: number[][]);
    }
    class MotifSequence {
        motifs: Motif[];
        push(m: Motif): void;
    }
}
declare module networkcube {
    var GRANULARITY: string[];
    var DGRAPH_SUB: string;
    var DGRAPH_SER_VERBOSE_LOGGING: boolean;
    function dgraphReviver(dgraph: DynamicGraph, key: any, value: any): any;
    function dgraphReplacer(key: string, value: any): any;
    class DynamicGraph {
        BOOKMARK_COLORS: D3.Scale.OrdinalScale;
        selectionColor_pointer: number;
        name: string;
        gran_min: number;
        gran_max: number;
        minWeight: number;
        maxWeight: number;
        _nodes: Node[];
        _links: Link[];
        _nodePairs: NodePair[];
        _locations: Location[];
        _times: Time[];
        timeObjects: any[];
        nodeOrders: Ordering[];
        matrix: number[][];
        nodeArrays: NodeArray;
        linkArrays: LinkArray;
        nodePairArrays: NodePairArray;
        timeArrays: TimeArray;
        linkTypeArrays: LinkTypeArray;
        nodeTypeArrays: NodeTypeArray;
        locationArrays: LocationArray;
        attributeArrays: Object;
        highlightArrays: IDCompound;
        currentSelection_id: number;
        defaultLinkSelection: Selection;
        defaultNodeSelection: Selection;
        selections: Selection[];
        attr(field: string, id: number, type: string): any;
        gran_min_NAME: string;
        gran_max_NAME: string;
        minWeight_NAME: string;
        maxWeight_NAME: string;
        matrix_NAME: string;
        nodeArrays_NAME: string;
        linkArrays_NAME: string;
        nodePairArrays_NAME: string;
        timeArrays_NAME: string;
        linkTypeArrays_NAME: string;
        nodeTypeArrays_NAME: string;
        locationArrays_NAME: string;
        standardArrayReplacer(key: string, value: any): any;
        static timeReviver(k: string, v: any, s: DynamicGraph): any;
        static nodeArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static linkArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static nodePairArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static timeArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static linkTypeArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static nodeTypeArrayReviver(k: string, v: any, s: DynamicGraph): any;
        static locationArrayReviver(k: string, v: any, s: DynamicGraph): any;
        loadDynamicGraph(dataMgr: DataManager, dataSetName: string): void;
        saveDynamicGraph(dataMgr: DataManager): void;
        delete(dataMgr: DataManager): void;
        debugCompareTo(other: DynamicGraph): boolean;
        initDynamicGraph(data: DataSet): void;
        createSelections(shouldCreateArrays: boolean): void;
        private createGraphObjects(shouldCreateTimes, shouldCreateLinkTypes);
        nodeAttr(attr: string, id: number): any;
        linkAttr(attr: string, id: number): any;
        pairAttr(attr: string, id: number): any;
        timeAttr(attr: string, id: number): any;
        startTime: Time;
        endTime: Time;
        highlight(action: string, idCompound?: IDCompound): void;
        selection(action: string, idCompound: IDCompound, selectionId?: number): void;
        addToAttributeArraysSelection(selection: Selection, type: string, id: number): void;
        removeFromAttributeArraysSelection(selection: Selection, type: string, id: number): void;
        addElementToSelection(selection: Selection, e: BasicElement): void;
        addToSelectionByTypeAndId(selection: Selection, type: string, id: number): void;
        removeElementFromSelection(selection: Selection, e: BasicElement): void;
        removeFromSelectionByTypeAndId(selection: Selection, type: string, id: number): void;
        getSelectionsByTypeAndId(type: string, id: number): Selection[];
        filterSelection(selectionId: number, filter: boolean): void;
        isFiltered(id: number, type: string): boolean;
        isHighlighted(id: number, type: string): boolean;
        getHighlightedIds(type: string): any;
        setCurrentSelection(id: number): void;
        getCurrentSelection(): Selection;
        addSelection(id: number, color: string, acceptedType: string, priority: number): void;
        createSelection(type: string): Selection;
        deleteSelection(selectionId: number): void;
        setSelectionColor(id: number, color: string): void;
        getSelections(type?: string): Selection[];
        getSelection(id: number): Selection;
        clearSelections(): void;
        getTimeIdForUnixTime(unixTime: number): number;
        addNodeOrdering(name: string, order: number[]): void;
        setNodeOrdering(name: string, order: number[]): void;
        removeNodeOrdering(name: string, order: number[]): void;
        getNodeOrder(name: string): Ordering;
        nodes(): NodeQuery;
        links(): LinkQuery;
        times(): TimeQuery;
        locations(): LocationQuery;
        nodePairs(): NodePairQuery;
        linksBetween(n1: Node, n2: Node): LinkQuery;
        get(type: string, id: number): BasicElement;
        getAll(type: string): GraphElementQuery;
        node(id: number): Node;
        link(id: number): Link;
        time(id: number): Time;
        location(id: number): Location;
        nodePair(id: number): NodePair;
        getMinGranularity(): number;
        getMaxGranularity(): number;
    }
    class Selection {
        name: string;
        elementIds: number[];
        acceptedType: string;
        color: string;
        id: number;
        showColor: boolean;
        filter: boolean;
        priority: number;
        constructor(id: number, acceptedType: string);
        acceptsType(type: string): boolean;
    }
    class AttributeArray {
        id: number[];
        length: number;
    }
    class NodeArray extends AttributeArray {
        id: number[];
        label: string[];
        outLinks: ArrayTimeSeries<number>[];
        inLinks: ArrayTimeSeries<number>[];
        links: ArrayTimeSeries<number>[];
        outNeighbors: ArrayTimeSeries<number>[];
        inNeighbors: ArrayTimeSeries<number>[];
        neighbors: ArrayTimeSeries<number>[];
        selections: Selection[][];
        attributes: Object[];
        locations: ScalarTimeSeries<number>[];
        filter: boolean[];
        nodeType: string[];
    }
    class LinkArray extends AttributeArray {
        source: number[];
        target: number[];
        linkType: string[];
        directed: boolean[];
        nodePair: number[];
        presence: number[][];
        weights: ScalarTimeSeries<number>[];
        selections: Selection[][];
        filter: boolean[];
        attributes: Object;
    }
    class NodePairArray extends AttributeArray {
        source: number[];
        target: number[];
        links: number[][];
        selections: Selection[][];
        filter: boolean[];
    }
    class TimeArray extends AttributeArray {
        id: number[];
        momentTime: Moment[];
        label: string[];
        unixTime: number[];
        selections: Selection[][];
        filter: boolean[];
        links: number[][];
    }
    class LinkTypeArray extends AttributeArray {
        name: string[];
        count: string[];
        color: string[];
        filter: boolean[];
    }
    class NodeTypeArray extends AttributeArray {
        name: string[];
        count: string[];
        color: string[];
        filter: boolean[];
    }
    class LocationArray extends AttributeArray {
        id: number[];
        label: string[];
        longitude: number[];
        latitude: number[];
        x: number[];
        y: number[];
        z: number[];
        radius: number[];
    }
    class LinkType implements LegendElement {
        id: number;
        name: string;
        color: string;
        constructor(id: number, name: string, color: string);
    }
    class NodeType implements LegendElement {
        id: number;
        name: string;
        color: string;
        constructor(id: number, name: string, color: string);
    }
    interface LegendElement {
        name: string;
        color: string;
    }
    class Ordering {
        name: string;
        order: number[];
        constructor(name: string, order: number[]);
    }
}
declare module networkcube {
    interface DataManagerOptions {
        keepOnlyOneSession?: boolean;
    }
    class DataManager {
        constructor(options?: DataManagerOptions);
        setOptions(options: DataManagerOptions): void;
        dynamicGraph: DynamicGraph;
        keepOnlyOneSession: boolean;
        session: string;
        sessionDataPrefix: string;
        clearSessionData(session: string): void;
        clearAllSessionData(): void;
        isSessionCached(session: string, dataSetName: string): boolean;
        importData(session: string, data: DataSet): void;
        SEP: string;
        saveToStorage<T>(dataName: string, valueName: string, value: T, replacer?: (key: string, value: any) => any): void;
        getFromStorage<TResult>(dataName: string, valueName: string, reviver?: (key: any, value: any, state: any) => any, state?: any): TResult;
        removeFromStorage(dataName: string, valueName: string): void;
        getGraph(session: string, dataname: string): DynamicGraph;
        isSchemaWellDefined(data: DataSet): boolean;
    }
    function getDefaultNodeSchema(): NodeSchema;
    function getDefaultLinkSchema(): LinkSchema;
    function getDefaultLocationSchema(): LocationSchema;
    class DataSet {
        name: string;
        nodeTable: any[];
        linkTable: any[];
        locationTable: any[];
        nodeSchema: NodeSchema;
        linkSchema: LinkSchema;
        locationSchema: LocationSchema;
        selections: Selection[];
        timeFormat: string;
        constructor(params?: any);
    }
    class TableSchema {
        name: string;
        constructor(name: string);
    }
    class NodeSchema extends TableSchema {
        id: number;
        label: number;
        time: number;
        location: number;
        nodeType: number;
        constructor(id: number);
    }
    class LinkSchema extends TableSchema {
        id: number;
        source: number;
        target: number;
        weight: number;
        linkType: number;
        directed: number;
        time: number;
        constructor(id: number, source: number, target: number);
    }
    class LocationSchema extends TableSchema {
        id: number;
        label: number;
        geoname: number;
        longitude: number;
        latitude: number;
        x: number;
        y: number;
        z: number;
        radius: number;
        constructor(id: number, label: number, geoname?: number, longitude?: number, latitude?: number, x?: number, y?: number, z?: number, radius?: number);
    }
}
declare module networkcube {
    function findTemplate(nodes: networkcube.Node[], template: networkcube.MotifTemplate, config?: Object): void;
    function findClusters(nodes: any, config?: Object): any[];
    function findCliques(nodes: any, config?: Object): any[];
    function findFullEgoNetwork(nodes: Node[], config?: Object): Motif[];
    function findStars(nodes: Node[], config?: Object): Motif[];
    function findTriangles(nodes: Node[], config?: Object): Motif[];
}
declare module networkcube {
    function findDegree(nodes: Node[]): Motif[];
}
declare module networkcube {
    function loadDyson(url: string, callback: Function): void;
    function loadLinkTable(url: string, callBack: Function, linkSchema: networkcube.LinkSchema, delimiter: string, timeFormat?: string): void;
    function loadXML(url: string, callBack: Function): void;
    function loadJson(url: string, callBack: Function, dataName?: string): void;
    function loadJsonList(url: string, callBack: Function): void;
    function loadNCube(url: string, callBack: Function): void;
    function loadPajek(url: string, callBack: Function): void;
    function loadMat(url: string, callBack: Function): void;
    function loadGEDCOM(url: string, callBack: Function): void;
    function loadLinkList(url: string, callBack: Function): void;
    function loadMatrix(url: string, callBack: Function): void;
    function exportCSV(graph: any): string;
    function downloadText(text: string, filename: string): void;
}
declare module networkcube {
    function searchForTerm(term: string, dgraph: DynamicGraph, type?: string): IDCompound;
    interface IFilter {
        test(o: any): boolean;
    }
}
declare module networkcube {
    var MESSAGE_HIGHLIGHT: string;
    var MESSAGE_SELECTION: string;
    var MESSAGE_TIME_RANGE: string;
    var MESSAGE_SELECTION_CREATE: string;
    var MESSAGE_SELECTION_DELETE: string;
    var MESSAGE_SELECTION_SET_CURRENT: string;
    var MESSAGE_SELECTION_COLORING: string;
    var MESSAGE_SELECTION_SET_COLORING_VISIBILITY: string;
    var MESSAGE_SELECTION_FILTER: string;
    var MESSAGE_SELECTION_PRIORITY: string;
    var MESSAGE_SEARCH_RESULT: string;
    function addEventListener(messageType: string, handler: Function): void;
    function setDefaultEventListener(handler: Function): void;
    class Message {
        id: number;
        type: string;
        constructor(type: string);
    }
    function sendMessage(type: string, body: Object): void;
    function highlight(action: string, elementCompound?: ElementCompound): void;
    class HighlightMessage extends Message {
        action: string;
        idCompound: IDCompound;
        constructor(action: string, idCompound?: IDCompound);
    }
    function selection(action: string, compound: ElementCompound, selectionId?: number): void;
    class SelectionMessage extends Message {
        action: string;
        selectionId: number;
        idCompound: IDCompound;
        constructor(action: string, idCompound: IDCompound, selectionId?: number);
    }
    function timeRange(startUnix: number, endUnix: number, single: Time, propagate?: boolean): void;
    class TimeRangeMessage extends Message {
        startUnix: number;
        endUnix: number;
        constructor(start: number, end: number);
    }
    function createSelection(type: string, name: string): Selection;
    class CreateSelectionMessage extends Message {
        selection: Selection;
        constructor(b: Selection);
    }
    function setCurrentSelection(b: Selection): void;
    class SetCurrentSelectionIdMessage extends Message {
        selectionId: number;
        constructor(b: Selection);
    }
    function showSelectionColor(selection: Selection, showColor: boolean): void;
    class ShowSelectionColorMessage extends Message {
        selectionId: number;
        showColor: boolean;
        constructor(selection: Selection, showColor: boolean);
    }
    function filterSelection(selection: Selection, filter: boolean): void;
    class FilterSelectionMessage extends Message {
        selectionId: number;
        filter: boolean;
        constructor(selection: Selection, filter: boolean);
    }
    function swapPriority(s1: Selection, s2: Selection): void;
    class SelectionPriorityMessage extends Message {
        selectionId1: number;
        selectionId2: number;
        priority1: number;
        priority2: number;
        filter: string;
        constructor(s1: Selection, s2: Selection, p1: number, p2: number);
    }
    function deleteSelection(selection: Selection): void;
    class DeleteSelectionMessage extends Message {
        selectionId: number;
        constructor(selection: Selection);
    }
    function setSelectionColor(s: Selection, color: string): void;
    function search(term: string, type?: string): void;
    class SearchResultMessage extends Message {
        idCompound: IDCompound;
        searchTerm: string;
        constructor(searchTerm: string, idCompound: IDCompound);
    }
    function distributeMessage(message: Message, ownView?: boolean): void;
}
declare module networkcube {
    function orderNodes(graph: DynamicGraph, config?: OrderingConfiguration): number[];
    class OrderingConfiguration {
        start: Time;
        end: Time;
        nodes: Node[];
        links: Link[];
        algorithm: string[];
        distance: string[];
    }
}
declare module networkcube {
    var TIME_FORMAT: string;
    function timeFormat(): string;
    function setSession(sessionName: string): void;
    function setDataManagerOptions(options: DataManagerOptions): void;
    function isSessionCached(session: string, dataSetName: string): boolean;
    function importData(sessionName: string, data: DataSet): void;
    function deleteData(dataSetName: string): void;
    function clearAllDataManagerSessionCaches(): void;
    function getDynamicGraph(dataName?: string, session?: string): DynamicGraph;
    function openVisualizationWindow(session: string, visUri: string, dataName: string): void;
    function openVisualizationTab(session: string, visUri: string, dataName: string): void;
    function createTabVisualizations(parentId: string, visSpec: Object[], session: string, dataName: string, width: number, height: number, visParams?: Object): void;
    function switchVisTab(evt: any, visName: any): void;
    function createVisualizationIFrame(parentId: string, visUri: string, session: string, dataName: string, width: number, height: number, visParams?: Object): JQuery;
    function getURLString(dataName: string): string;
    enum OrderType {
        Local = 0,
        Global = 1,
        Data = 2,
    }
}
declare module glutils {
    function makeAlphaBuffer(array: number[], stretch: number): Float32Array;
    function addBufferedHatchedRect(vertexArray: number[][], x: number, y: number, z: number, width: number, height: number, colorArray: number[][], c: number[]): void;
    function addBufferedRect(vertexArray: number[][], x: number, y: number, z: number, width: number, height: number, colorArray: number[][], c: number[]): void;
    function addBufferedCirlce(vertexArray: number[][], x: number, y: number, z: number, radius: number, colorArray: number[][], c: number[]): void;
    function addBufferedDiamond(vertexArray: number[][], x: number, y: number, z: number, width: number, height: number, colorArray: number[][], c: number[]): void;
    function createRectFrame(w: number, h: number, color: number, lineThickness: number): THREE.Line;
    function createDiagonalCross(w: number, h: number, color: number, lineThickness: number): THREE.Line;
    function makeBuffer3f(array: number[][]): Float32Array;
    function makeBuffer4f(array: number[][]): Float32Array;
    function updateBuffer(buffer: number[], array: number[][], size: number): void;
    function createText(string: string, x: number, y: number, z: number, size: number, color: any, weight?: string, align?: string): THREE.Mesh;
    function getMousePos(canvas: any, x: any, y: any): {
        x: number;
        y: number;
    };
    class WebGL {
        scene: THREE.Scene;
        camera: THREE.OrthographicCamera;
        renderer: THREE.WebGLRenderer;
        canvas: any;
        geometry: THREE.BufferGeometry;
        interactor: WebGLInteractor;
        elementQueries: WebGLElementQuery[];
        constructor(params?: Object);
        render(): void;
        selectAll(): WebGLElementQuery;
        enableZoom(b?: boolean): void;
        enablePanning(b: boolean): void;
        enableHorizontalPanning(b: boolean): void;
    }
    function initWebGL(parentId: string, width: number, height: number, params?: Object): WebGL;
    function setWebGL(scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer, canvas: any): void;
    function selectAll(): WebGLElementQuery;
    class WebGLElementQuery {
        dataElements: Object[];
        visualElements: Object[];
        mesh: THREE.Mesh;
        children: Object[];
        scene: THREE.Scene;
        mouseOverHandler: Function;
        mouseMoveHandler: Function;
        mouseOutHandler: Function;
        mouseDownHandler: Function;
        mouseUpHandler: Function;
        clickHandler: Function;
        x: number[];
        y: number[];
        z: number[];
        r: number[];
        fill: number[];
        stroke: number[];
        strokewidth: number[];
        opacity: number[];
        shape: string;
        updateAttributes: boolean;
        updateStyle: boolean;
        IS_SHADER: boolean;
        constructor();
        data(arr: Object[]): WebGLElementQuery;
        append(shape: string): WebGLElementQuery;
        push(e: any): WebGLElementQuery;
        getData(i: any): any;
        getVisual(i: any): any;
        length: number;
        filter(f: Function): WebGLElementQuery;
        attr(name: string, v: any): WebGLElementQuery;
        style(name: string, v: any): WebGLElementQuery;
        set(): WebGLElementQuery;
        text(v: any): WebGLElementQuery;
        on(event: string, f: Function): WebGLElementQuery;
        call(method: string, dataElement: any, event: any): WebGLElementQuery;
        setAttr(element: THREE.Mesh, attr: string, v: any, index: number): void;
        removeAll(): void;
    }
    class WebGLInteractor {
        scene: any;
        canvas: any;
        camera: any;
        raycaster: any;
        mouse: any[];
        mouseStart: any[];
        mouseDown: boolean;
        cameraStart: any[];
        panOffset: any[];
        lastIntersectedSelections: any[];
        lastIntersectedElements: any[];
        isPanEnabled: boolean;
        isHorizontalPanEnabled: boolean;
        isLassoEnabled: boolean;
        lassoPoints: any[];
        lassoStartHandler: Function;
        lassoMoveHandler: Function;
        lassoEndHandler: Function;
        mouseOverSelections: WebGLElementQuery[];
        mouseMoveSelections: WebGLElementQuery[];
        mouseOutSelections: WebGLElementQuery[];
        mouseDownSelections: WebGLElementQuery[];
        mouseUpSelections: WebGLElementQuery[];
        clickSelections: WebGLElementQuery[];
        constructor(scene: THREE.Scene, canvas: HTMLCanvasElement, camera: THREE.Camera);
        register(selection: WebGLElementQuery, method: string): void;
        addEventListener(eventName: String, f: Function): void;
        mouseMoveHandler(e: any): void;
        clickHandler(e: any): void;
        mouseDownHandler(e: any): void;
        mouseUpHandler(e: any): void;
        intersect(selection: WebGLElementQuery, mousex: any, mousey: any): any[];
        intersectCircles(selection: WebGLElementQuery): any[];
        intersectRects(selection: WebGLElementQuery): any[];
        intersectPaths(selection: WebGLElementQuery): any[];
    }
    function mouseToWorldCoordinates(mouseX: any, mouseY: any): any[];
    function curve(points: any[]): any[];
    class CheckBox {
        selected: boolean;
        changeCallBack: Function;
        circle: any;
        frame: any;
        constructor();
        attr(attrName: string, value: any): glutils.CheckBox;
        on(eventType: string, fn: Function): void;
    }
}
declare var THREEx: any;
declare module geometry {
    function length(v1: any): number;
    function normalize(v: number[]): number[];
    function setLength(v: number[], l: number): number[];
}
