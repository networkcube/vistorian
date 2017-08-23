/// <reference path="./colors.ts" />
/// <reference path="../scripts/moment.d.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./datamanager.ts" />
/// <reference path="../scripts/d3.d.ts" />
/// <reference path="./queries.ts" />

module networkcube {

    export var GRANULARITY: string[] = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century', 'millenium'];

    export var DGRAPH_SUB: string = "[*dgraph*]";
    export var DGRAPH_SER_VERBOSE_LOGGING = false;

    export function dgraphReviver(dgraph: DynamicGraph, key: any, value: any): any {
        if (value == DGRAPH_SUB)
            return dgraph;
        else
            return value;
    }

    export function dgraphReplacer(key: string, value: any): any {
        // don't write out graph, as this would cause cycles
        if (DGRAPH_SER_VERBOSE_LOGGING) {
            console.log("dgraphReplacer", key, value);
        }
        if (value instanceof DynamicGraph) {
            console.log("dgraphReplacer found a DynamicGraph property", key);
            return DGRAPH_SUB;
        }
        return value;
    }

    export class DynamicGraph {

        // BOOKMARK_COLORS: string[] = colorSchemes.schema5;
        BOOKMARK_COLORS = d3.scale.category10();
        selectionColor_pointer: number = 0;

        //data: DataSet;
        name: string;

        // data meta data
        gran_min: number;
        gran_max: number;

        minWeight:number = 10000000;
        maxWeight:number = -10000000;

        _nodes: Node[] = [];
        _links: Link[] = [];
        _nodePairs: NodePair[] = [];
        _locations: Location[] = [];
        // Contains all time objects for this dynamic graph
        _times: Time[] = [];
        // linkTypes: LinkType[] = [];
        timeObjects = []

        nodeOrders: Ordering[];

        // Matrix for fast access to node pairs (link)
        matrix: number[][] = []; // fast access to node pairs.

        // node attributes
        nodeArrays: NodeArray = new NodeArray();

        // link attributes
        linkArrays: LinkArray = new LinkArray();

        // node pair attributes
        nodePairArrays: NodePairArray = new NodePairArray();

        // time attributes
        timeArrays: TimeArray = new TimeArray();

        // array for relation types
        linkTypeArrays: LinkTypeArray = new LinkTypeArray();

        // array for node types
        nodeTypeArrays: NodeTypeArray = new NodeTypeArray();

        // array for locations
        locationArrays: LocationArray = new LocationArray();

        // points to all object arrays. For convenience
        attributeArrays: Object = {
            node: this.nodeArrays,
            link: this.linkArrays,
            time: this.timeArrays,
            nodePair: this.nodePairArrays,
            linkType: this.linkTypeArrays,
            nodeType: this.nodeTypeArrays,
            location: this.locationArrays
        }

        // highlighted objects
        highlightArrays: IDCompound = new IDCompound();

        currentSelection_id: number = 0;
        defaultLinkSelection: Selection;
        defaultNodeSelection: Selection;
        selections: Selection[] = [];

        // ACCESSOR FUNCTIONS
        // universal accesor
        attr(field: string, id: number, type: string) {
            var r: any;
            try {
                r = this.attributeArrays[type][field][id]
            } catch (e) {
                r = undefined;
            }
            return r;
        }

        // storage keys /////////////////////////////////
        //
        gran_min_NAME: string = "gran_min";
        gran_max_NAME: string = "gran_max_NAME";

        minWeight_NAME: string = "minWeight_NAME";
        maxWeight_NAME: string = "maxWeight_NAME";

        matrix_NAME: string = "matrix_NAME";

        nodeArrays_NAME: string = "nodeArrays_NAME";
        linkArrays_NAME: string = "linkArrays_NAME";
        nodePairArrays_NAME: string = "nodePairArrays_NAME";
        timeArrays_NAME: string = "timeArrays_NAME";
        linkTypeArrays_NAME: string = "linkTypeArrays_NAME";
        nodeTypeArrays_NAME: string = "nodeTypeArrays_NAME";
        locationArrays_NAME: string = "locationArrays_NAME";
        //
        // end storage keys //////////////////////////////



        // FUNCTIONS

        standardArrayReplacer(key: string, value: any): any {
            // don't write out graph, as this would cause cycles
            if (value instanceof DynamicGraph) {
                console.log("standardReplacer found a DynamicGraph property", key);
                return DGRAPH_SUB;
            }
            // don't write out selection, because we must preserve it independently
            // from the graph
            else if (key == 'selections')
                return undefined;

            return value;
        }
        static timeReviver(k: string, v: any, s: DynamicGraph): any {
            if (k == '') {
                return copyPropsShallow(v, new Time(v.id, s));
            } else {
                return dgraphReviver(s, k, v);
            }
        }

        static nodeArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new NodeArray());
                // case 'nodeType':
                // return copyTimeSeries(v, function() { return new ScalarTimeSeries<string>(); });
                case 'outLinks':
                case 'inLinks':
                case 'links':
                    return copyTimeSeries(v, function () { return new ArrayTimeSeries<number>(); });
                case 'outNeighbors':
                case 'inNeighbors':
                case 'neighbors':
                    return copyTimeSeries(v, function () { return new ArrayTimeSeries<number>(); });
                case 'locations':
                    return copyTimeSeries(v, function () { return new ScalarTimeSeries<number>(); });
                default:
                    return v;
            }
        }

        static linkArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new LinkArray());
                case 'weights':
                    return copyTimeSeries(v, function () { return new ScalarTimeSeries<number>(); });
                default:
                    return v;
            }
        }

        static nodePairArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new NodePairArray());
                default:
                    return v;
            }
        }

        static timeArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new TimeArray());
                case 'time':
                    var vAsArray: string[] = v;
                    return vAsArray.map(function (s, i) { return moment(s); });
                default:
                    return v;
            }
        }

        static linkTypeArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new LinkTypeArray());
                default:
                    return v;
            }
        }
        static nodeTypeArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new NodeTypeArray());
                default:
                    return v;
            }
        }

        static locationArrayReviver(k: string, v: any, s: DynamicGraph): any {
            switch (k) {
                case '':
                    return copyPropsShallow(v, new LocationArray());
                default:
                    return v;
            }
        }

        loadDynamicGraph(dataMgr: DataManager, dataSetName: string): void {
            this.clearSelections();
            //this.data = dataSet;
            this.name = dataSetName;
            var thisGraph = this;

            // CACHEGRAPH : load from storage the entire state of the graph
            this.gran_min = dataMgr.getFromStorage<number>(this.name, this.gran_min_NAME);
            console.log('this.gran_min', this.gran_min);
            this.gran_max = dataMgr.getFromStorage<number>(this.name, this.gran_max_NAME);

            this.minWeight = dataMgr.getFromStorage<number>(this.name, this.minWeight_NAME);
            this.maxWeight = dataMgr.getFromStorage<number>(this.name, this.maxWeight_NAME);

            this.matrix = dataMgr.getFromStorage<number[][]>(this.name, this.matrix_NAME);

            this.nodeArrays = dataMgr.getFromStorage<NodeArray>(this.name, this.nodeArrays_NAME, DynamicGraph.nodeArrayReviver);
            this.linkArrays = dataMgr.getFromStorage<LinkArray>(this.name, this.linkArrays_NAME, DynamicGraph.linkArrayReviver);

            this.nodePairArrays = dataMgr.getFromStorage<NodePairArray>(this.name, this.nodePairArrays_NAME, DynamicGraph.nodePairArrayReviver);
            this.timeArrays = dataMgr.getFromStorage<TimeArray>(this.name, this.timeArrays_NAME, DynamicGraph.timeArrayReviver);
            if (! ('timeArrays' in this) || !this.timeArrays ) {
                console.log('No timeArrays');
                this.timeArrays = new TimeArray();
            }
            else if ('momentTime' in this.timeArrays && 'unixTime' in this.timeArrays) {
                var ta = this.timeArrays['momentTime'];
                for (var i = 0; i < ta.length; i++) {
                    ta[i] = moment.utc(this.timeArrays['unixTime'][i]);
                }
            }
            else if ('unixTime' in this.timeArrays) {
                console.log('No time in timeArrays');
                this.timeArrays['momentTime'] = this.timeArrays['unixTime'].map(moment.utc);
            }
            else {
                console.log('No time or unixTime in timeArrays');
                this.timeArrays['momentTime'] = []
            }

            this.linkTypeArrays = dataMgr.getFromStorage<LinkTypeArray>(this.name, this.linkTypeArrays_NAME, DynamicGraph.linkTypeArrayReviver);
            this.nodeTypeArrays = dataMgr.getFromStorage<NodeTypeArray>(this.name, this.nodeTypeArrays_NAME, DynamicGraph.nodeTypeArrayReviver);

            this.locationArrays = dataMgr.getFromStorage<LocationArray>(this.name, this.locationArrays_NAME, DynamicGraph.locationArrayReviver);
            // points to all object arrays. For convenience
            this.attributeArrays = {
                node: this.nodeArrays,
                link: this.linkArrays,
                time: this.timeArrays,
                nodePair: this.nodePairArrays,
                linkType: this.linkTypeArrays,
                nodeType: this.nodeTypeArrays,
                location: this.locationArrays
            };

            // rather than persist all of the state of windowGraph
            // as well, we simply reinitialize from our persisted state.
            // perhaps we need to serialize this as well.
            // inits the WindowGraph for this dynamic graph, i.e.
            // the all-aggregated graph.
            this.createGraphObjects(true, true);


            // init the selections which are currently null
            // this.nodeArrays.selections=[];
            // this.nodeArrays.selections.push([]);
            // this.timeArrays.selections=[];
            // this.timeArrays.selections.push([]);
            // this.linkArrays.selections=[];
            // this.linkArrays.selections.push([]);
            // this.nodePairArrays.selections=[];
            // this.nodePairArrays.selections.push([]);
            this.createSelections(true);

        }

        saveDynamicGraph(dataMgr: DataManager): void {
            // CACHEGRAPH : persist the entire state of the dynamic graph
            dataMgr.saveToStorage(this.name, this.gran_min_NAME, this.gran_min);
            dataMgr.saveToStorage(this.name, this.gran_max_NAME, this.gran_max);
            dataMgr.saveToStorage(this.name, this.minWeight_NAME, this.minWeight);
            dataMgr.saveToStorage(this.name, this.maxWeight_NAME, this.maxWeight);

            dataMgr.saveToStorage(this.name, this.matrix_NAME, this.matrix);
            dataMgr.saveToStorage(this.name, this.nodeArrays_NAME, this.nodeArrays, this.standardArrayReplacer);
            // when we tried to persist the entire linkArrays, javascript threw an
            // exception, so for now we will simply try to save out the parts. 
            dataMgr.saveToStorage(this.name, this.linkArrays_NAME, this.linkArrays, this.standardArrayReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"source", this.linkArrays.source, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"target", this.linkArrays.target, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"linkType", this.linkArrays.linkType, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"directed", this.linkArrays.directed, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"nodePair", this.linkArrays.nodePair, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"presence", this.linkArrays.presence, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"weights", this.linkArrays.weights, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"filter", this.linkArrays.filter, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"attributes", this.linkArrays.attributes, this.standardReplacer);

            dataMgr.saveToStorage(this.name, this.nodePairArrays_NAME, this.nodePairArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.timeArrays_NAME, this.timeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.linkTypeArrays_NAME, this.linkTypeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.nodeTypeArrays_NAME, this.nodeTypeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.locationArrays_NAME, this.locationArrays, this.standardArrayReplacer);
        }

        // Removes this graph from the cache.
        delete(dataMgr: DataManager){
            dataMgr.removeFromStorage(this.name, this.gran_min_NAME);
            dataMgr.removeFromStorage(this.name, this.gran_max_NAME);
            dataMgr.removeFromStorage(this.name, this.minWeight_NAME);
            dataMgr.removeFromStorage(this.name, this.maxWeight_NAME);

            dataMgr.removeFromStorage(this.name, this.matrix_NAME);
            dataMgr.removeFromStorage(this.name, this.nodeArrays_NAME);
            // when we tried to persist the entire linkArrays, javascript threw an
            // exception, so for now we will simply try to save out the parts. 
            dataMgr.removeFromStorage(this.name, this.linkArrays_NAME);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"source", this.linkArrays.source, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"target", this.linkArrays.target, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"linkType", this.linkArrays.linkType, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"directed", this.linkArrays.directed, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"nodePair", this.linkArrays.nodePair, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"presence", this.linkArrays.presence, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"weights", this.linkArrays.weights, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"filter", this.linkArrays.filter, this.standardReplacer);
            // dataMgr.saveToStorage(this.name, this.linkArrays_NAME+"attributes", this.linkArrays.attributes, this.standardReplacer);

            dataMgr.removeFromStorage(this.name, this.nodePairArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.timeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.linkTypeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.nodeTypeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.locationArrays_NAME);
            
        }

        debugCompareTo(other: DynamicGraph): boolean {
            var result: boolean = true;

            if (this.name != other.name) {
                console.log("name different");
                result = false;
            }
            // CACHEGRAPH compare every aspect of this one to the other one
            if (this.gran_min != other.gran_min) {
                console.log("gran_min different", this.gran_min, other.gran_min);
                result = false;
            }
            if (this.gran_max != other.gran_max) {
                console.log("gran_max different", this.gran_max, other.gran_max);
                result = false;
            }

            if (this._nodes.length != other._nodes.length
                || !compareTypesDeep(this._nodes, other._nodes, 2)) {
                console.log("nodes different");
                result = false;
            }
            if (this._links.length != other._links.length
                || !compareTypesDeep(this._links, other._links, 2)) {
                console.log("links different");
                result = false;
            }
            if (this._nodePairs.length != other._nodePairs.length
                || !compareTypesDeep(this._nodePairs, other._nodePairs, 2)) {
                console.log("nodePairs different");
                result = false;
            }
            if (this._locations.length != other._locations.length
                || !compareTypesDeep(this._locations, other._locations, 2)) {
                console.log("locations different");
                result = false;
            }
            if (this._times.length != other._times.length
                || !compareTypesDeep(this._times, other._times, 2)) {
                console.log("times different");
                result = false;
            }
            // if (this.linkTypes.length != other.linkTypes.length
            //     || !compareTypesDeep(this.linkTypes, other.linkTypes, 2)) {
            //     console.log("linkTypes different", this.linkTypes, other.linkTypes);
            //     result = false;
            // }


            if ((this.nodeOrders && this.nodeOrders.length != other.nodeOrders.length)
                || !compareTypesDeep(this.nodeOrders, other.nodeOrders, 2)) {
                console.log("nodeOrders different", this.nodeOrders, other.nodeOrders);
                result = false;
            }

            if (this.matrix.length != other.matrix.length
                || !compareTypesDeep(this.matrix, other.matrix, 2)) {
                console.log("matrix different", this.matrix, other.matrix);
                result = false;
            }

            if (this.nodeArrays.length != other.nodeArrays.length
                || !compareTypesDeep(this.nodeArrays, other.nodeArrays, 2)) {
                console.log("nodeArrays different", this.nodeArrays, other.nodeArrays);
                result = false;
            }

            if (this.linkArrays.length != other.linkArrays.length
                || !compareTypesDeep(this.linkArrays, other.linkArrays, 2)) {
                console.log("linkArrays different", this.linkArrays, other.linkArrays);
                result = false;
            }

            if (this.nodePairArrays.length != other.nodePairArrays.length
                || !compareTypesDeep(this.nodePairArrays, other.nodePairArrays, 2)) {
                console.log("nodePairArrays different", this.nodePairArrays, other.nodePairArrays);
                result = false;
            }

            if (this.timeArrays.length != other.timeArrays.length
                || !compareTypesDeep(this.timeArrays, other.timeArrays, 2)) {
                console.log("timeArrays different", this.timeArrays, other.timeArrays);
                result = false;
            }

            if (this.linkTypeArrays.length != other.linkTypeArrays.length
                || !compareTypesDeep(this.linkTypeArrays, other.linkTypeArrays, 2)) {
                console.log("linkTypeArrays different", this.linkTypeArrays, other.linkTypeArrays);
                result = false;
            }

            if (this.nodeTypeArrays.length != other.nodeTypeArrays.length
                || !compareTypesDeep(this.nodeTypeArrays, other.nodeTypeArrays, 2)) {
                console.log("nodeTypeArrays different", this.nodeTypeArrays, other.nodeTypeArrays);
                result = false;
            }

            if (this.locationArrays.length != other.locationArrays.length
                || !compareTypesDeep(this.locationArrays, other.locationArrays, 2)) {
                console.log("locationArrays different", this.locationArrays, other.locationArrays);
                result = false;
            }

            if (this.defaultLinkSelection.elementIds.length != other.defaultLinkSelection.elementIds.length
                || !compareTypesDeep(this.defaultLinkSelection, other.defaultLinkSelection, 2)) {
                console.log("defaultLinkSelection different", this.defaultLinkSelection, other.defaultLinkSelection);
                result = false;
            }

            if (this.defaultNodeSelection.elementIds.length != other.defaultNodeSelection.elementIds.length
                || !compareTypesDeep(this.defaultNodeSelection, other.defaultNodeSelection, 2)) {
                console.log("defaultNodeSelection different", this.defaultNodeSelection, other.defaultNodeSelection);
                result = false;
            }

            if (this.selections.length != other.selections.length
                || !compareTypesDeep(this.selections, other.selections, 2)) {
                console.log("selections different", this.selections, other.selections);
                result = false;
            }

            return result;
        }

        // creates this graph and fills node, link and time arrays from
        // data tables.
        initDynamicGraph(data: DataSet): void {

            this.clearSelections();
            // console.log('[dynamicgraph.ts] Create dynamic graph for ', data.name, data)

            //this.data = data;
            this.name = data.name;

            // fill node, link arrays and time

            // CREATE TIME OBJECT for all events
            this.gran_min = 0;
            this.gran_max = 0;

            if (isValidIndex(data.linkSchema.time)) {
                var timeLabels: number[] = [];
                var timeLabel: string;
                var unixTimes: number[] = [];
                var unixTime: number;

                // get unix times for all times
                for (var i = 0; i < data.linkTable.length; i++) {
                    timeLabel = data.linkTable[i][data.linkSchema.time];
                    unixTime = parseInt(moment(timeLabel, TIME_FORMAT).format('x'));
                    if(unixTime == undefined)
                        continue;

                    if (unixTimes.indexOf(unixTime) == -1) {
                        unixTimes.push(unixTime);
                    }
                    // console.log('PARSE LINK ROW: ', unixTime, data.linkTable[i] )
                }
                // obtain granularity
                unixTimes.sort(sortNumber)
                // console.log('>> timeArray:', timeArray)

                var diff = 99999999999999;
                for (var i = 0; i < unixTimes.length - 2; i++) {
                    diff = Math.min(diff, unixTimes[i + 1] - unixTimes[i]);
                }

                var diff_min = diff;
                if (diff >= 1000) this.gran_min = 1;
                if (diff >= 1000 * 60) this.gran_min = 2;
                if (diff >= 1000 * 60 * 60) this.gran_min = 3;
                if (diff >= 1000 * 60 * 60 * 24) this.gran_min = 4;
                if (diff >= 1000 * 60 * 60 * 24 * 7) this.gran_min = 5;
                if (diff >= 1000 * 60 * 60 * 24 * 30) this.gran_min = 6;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12) this.gran_min = 7;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 10) this.gran_min = 8;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 100) this.gran_min = 9;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 1000) this.gran_min = 10;

                diff = unixTimes[unixTimes.length - 1] - unixTimes[0];
                this.gran_max = 0;
                if (diff >= 1000) this.gran_max = 1;
                if (diff >= 1000 * 60) this.gran_max = 2;
                if (diff >= 1000 * 60 * 60) this.gran_max = 3;
                if (diff >= 1000 * 60 * 60 * 24) this.gran_max = 4;
                if (diff >= 1000 * 60 * 60 * 24 * 7) this.gran_max = 5;
                if (diff >= 1000 * 60 * 60 * 24 * 30) this.gran_max = 6;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12) this.gran_max = 7;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 10) this.gran_max = 8;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 100) this.gran_max = 9;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 1000) this.gran_max = 10;

                console.log('[Dynamic Graph] Minimal granularity', GRANULARITY[this.gran_min]);
                console.log('[Dynamic Graph] Maximal granularity', GRANULARITY[this.gran_max]);

                // create one time object for every time point of gran_min, between start and end time.
                // [bb] deprecated
                // var start = moment(unixTimes[0] + '', 'x').startOf(GRANULARITY[this.gran_min]);
                // var end = moment(unixTimes[unixTimes.length - 1] + '', 'x').startOf(GRANULARITY[this.gran_min]);
                // var numTimes = Math.ceil(Math.abs(start.diff(end, GRANULARITY[this.gran_min] + 's')));

                // var curr_t = start;
                // this._times = [];
                for (var i = 0; i < unixTimes.length; i++) {
                    this.timeArrays.id.push(i);
                    this.timeArrays.momentTime.push(moment(unixTimes[i]));
                    this.timeArrays.label.push(this.timeArrays.momentTime[i].format(TIME_FORMAT));
                    this.timeArrays.unixTime.push(unixTimes[i]);
                    this.timeArrays.selections.push([]);
                    this.timeArrays.filter.push(false)
                    this.timeArrays.links.push([]);

                    // create time objects  
                    this._times.push(new Time(i, this));
                    // curr_t = start.add(1, GRANULARITY[this.gran_min] + 's');
                }
                console.log('#TIMES:', this._times.length);
                console.log('   minTime',  this.timeArrays.label[0])
                console.log('   maxTime',  this.timeArrays.label[this.timeArrays.length -1])

                // Now, all existing times with events and potentially
                // attributes associated, have been created. 
                // Below, we create a simple array of moment.moments
                // for any possible time unit for every aggregation level. 
                // In fact, those structures are created on-demand, i.e. 
                // the first time they are needed. 
                // Here, we only create the meta-structure
                for(var g=0 ; g <= networkcube.GRANULARITY.length; g++){
                    this.timeObjects.push([])
                }
            } 
            
            // if no valid have been found:
            if(this.timeArrays.length == 0){
                // null time object that represents one time step for the entire graph, i.e. a static graph
                this.timeArrays.id.push(0);
                this.timeArrays.momentTime.push(moment(0));
                this.timeArrays.unixTime.push(0);
                this.timeArrays.selections.push([]);
                this.timeArrays.filter.push(false)
                this.timeArrays.links.push([])
                this._times.push(new Time(0, this));
            }

            // from here on, there is at least one time object present.


            // CREATE LOCATIONS
            var id_loc;
            var location: Location;

            // if there is a location table, then there needs to be locationSchema
            console.assert(!data.locationTable || isValidIndex(data.locationSchema.id));

            if (data.locationTable) {
                for (var i = 0; i < data.locationTable.length; i++) {
                    this.locationArrays.id.push(data.locationTable[i][data.locationSchema.id]);
                    this.locationArrays.label.push(data.locationTable[i][data.locationSchema.label]);
                    this.locationArrays.longitude.push(data.locationTable[i][data.locationSchema.longitude]);
                    this.locationArrays.latitude.push(data.locationTable[i][data.locationSchema.latitude]);
                    this.locationArrays.x.push(data.locationTable[i][data.locationSchema.x]);
                    this.locationArrays.y.push(data.locationTable[i][data.locationSchema.y]);
                    this.locationArrays.z.push(data.locationTable[i][data.locationSchema.z]);
                    this.locationArrays.radius.push(data.locationTable[i][data.locationSchema.radius]);
                }
            }
            if ('id' in this.locationArrays)
                console.log('locations', this.locationArrays.id.length);


            // CREATE NODES
            var row: any[];
            var nodeId_data; // node id in data set
            var nodeId_table; // node id in table
            var attribute: any;
            var time:Time;
            console.assert(data.nodeTable.length == 0 || isValidIndex(data.nodeSchema.id),
                'either there is no nodeTable data, or we have a schema for the nodetable');

            var nodeUserProperties = []
            // Get user-properties on links, if exist
            for(var prop in data.nodeSchema){
                if(data.nodeSchema.hasOwnProperty(prop)
                && prop != 'id'
                && prop != 'label'
                && prop != 'time'
                && prop != 'name'
                && prop != 'nodeType'
                && prop != 'location'
                && prop != 'constructor'){
                    // console.log('user-prop found for nodes', prop)
                    nodeUserProperties.push(prop);
                    // create property
                    this.nodeArrays[prop] = [] 
                }
            }

            // console.log('data.nodeTable.length', data.nodeTable.length)
            for (var i = 0; i < data.nodeTable.length; i++) {
                row = data.nodeTable[i];

                // check if id already exists
                nodeId_data = row[data.nodeSchema.id];
                nodeId_table = this.nodeArrays.id.indexOf(nodeId_data);
                if (nodeId_table == -1) {
                    nodeId_table = this.nodeArrays.id.length;
                    this.nodeArrays.id.push(nodeId_data);
                    this.nodeArrays.nodeType.push('');
                    this.nodeArrays.outLinks.push(new ArrayTimeSeries<number>());
                    this.nodeArrays.inLinks.push(new ArrayTimeSeries<number>());
                    this.nodeArrays.links.push(new ArrayTimeSeries<number>());      // both, in and out
                    this.nodeArrays.outNeighbors.push(new ArrayTimeSeries<number>());
                    this.nodeArrays.inNeighbors.push(new ArrayTimeSeries<number>());
                    this.nodeArrays.neighbors.push(new ArrayTimeSeries<number>());
                    this.nodeArrays.selections.push([]);
                    this.nodeArrays.filter.push(false);
                    this.nodeArrays.locations.push(new ScalarTimeSeries<number>());
                    this.nodeArrays.attributes.push(new Object());
                    if (isValidIndex(data.nodeSchema.label)) {
                        this.nodeArrays.label.push(row[data.nodeSchema.label]);
                    } else {
                        this.nodeArrays.label.push(row[data.nodeSchema.id]);
                    }
                }

                // get time        
                // if (isValidIndex(data.nodeSchema.time)) {
                if (isValidIndex(data.nodeSchema.time)) {
                    timeLabel = row[data.nodeSchema.time];
                    if (timeLabel == undefined) {//} || timeStamp.indexOf('null')) {
                        time = this._times[0];
                    } else {
                        time = this._times[this.getTimeIdForUnixTime(parseInt(moment(timeLabel, TIME_FORMAT).format('x')))];
                    }
                } else {
                    time = this._times[0];
                }
                if(time == undefined)
                    time = this._times[0];

                // check locations
                if (isValidIndex(data.nodeSchema.location)) {
                    var locId = row[data.nodeSchema.location];
                    console.log('locId', locId)
                    if (locId == null || locId == undefined || locId == -1)
                        continue;
                    this.nodeArrays.locations[nodeId_data].set(time, locId);
                }

                // gather node type
                if (isValidIndex(data.nodeSchema.nodeType)) {
                    typeName = data.nodeTable[i][data.nodeSchema.nodeType]
                    typeId = this.nodeTypeArrays.name.indexOf(typeName)
                    if (typeId < 0) {
                        typeId = this.nodeTypeArrays.length;
                        this.nodeTypeArrays.id.push(typeId)
                        this.nodeTypeArrays.name.push(typeName)
                    }
                    this.nodeArrays.nodeType[nodeId_table] = typeName;
                    data.nodeTable[i][data.nodeSchema.nodeType] = typeId;
                }

                // gather user-properties: 
                for( var p=0 ; p < nodeUserProperties.length ; p++){
                    prop = nodeUserProperties[p];
                    this.nodeArrays[prop].push(row[data.nodeSchema[prop]]);
                }


                // see if temporal information is available
                // if(data.nodeSchema.time && data.nodeSchema.time > -1){
                //     for(var field in data.nodeSchema){
                //         if (field != undefined
                //             && data.nodeSchema.hasOwnProperty(field)
                //             && data.©nodeSchema[field] > -1
                //             && field != 'label'
                //             && field != 'time'
                //             && field != 'locations'
                //             && field != 'id'
                //             ){  
                //                 if(this.nodeArrays.attributes[nodeId_table][field] == undefined){
                //                     this.nodeArrays.attributes[nodeId_table][field] = new ScalarTimeSeries();    
                //                 }
                //                 timeLabel = data.nodeTable[i][data.nodeSchema.time];
                //                 if(timeLabel == undefined)
                //                     continue;
                //                 timeStamp = parseInt(moment(timeLabel, networkcube.TIME_FORMAT).format('x'));
                //                 time = this.times[this.getTimeIdForTimeStamp(timeStamp)];
                //                 this.nodeArrays[field][nodeId_table].set(time, row[data.nodeSchema[field]]);

                //             // //in case of locations:
                //             // if(field == 'location'){
                //             //     if(typeof row[data.nodeSchema[field]] == 'number'){
                //             //         id_loc = row[data.nodeSchema[field]];         
                //             //     }
                //             // }
                //          }
                //     }     
                // }else{
                //     // no time information available on nodes
                //     for(var field in data.nodeSchema){
                //         if (field != undefined
                //             && data.nodeSchema.hasOwnProperty(field)
                //             && data.nodeSchema[field] > -1
                //             && field != 'label'
                //             && field != 'time'
                //             && field != 'id'
                //             && field != 'locations'
                //             )
                //         {
                //             // check for non temporal information
                //             if(this.nodeArrays.attributes[nodeId_table][field] == undefined){
                //                 this.nodeArrays.attributes[nodeId_table][field] = new ScalarTimeSeries();    
                //             }
                //             // eternal attributes are assigned no time.
                //             this.nodeArrays[field][nodeId_table].set(undefined, row[data.nodeSchema[field]]); 
                //         }
                //     }
                // }
            }

            // create matrix and initialize with -1, i.e. nodes are not connected.
            if ('id' in this.nodeArrays) {
                for (var i = 0; i < this.nodeArrays.id.length; i++) {
                    this.matrix.push(array(undefined, this.nodeArrays.id.length));
                }
            }


            // CREATE LINKS

            var s: number, t: number;
            var id: number;
            var timeId: number;
            var nodePairId: number;
            var linkId: number;
            var typeName: string;
            var typeId: number;

            var linkUserProperties = []
            // Get user-properties on links, if exist
            for(var prop in data.linkSchema){
                if(data.linkSchema.hasOwnProperty(prop)
                && prop != 'id'
                && prop != 'linkType'
                && prop != 'time'
                && prop != 'name'
                && prop != 'source'
                && prop != 'target'
                && prop != 'weight'
                && prop != 'directed'){
                    // console.log('user-prop found for links', prop)
                    linkUserProperties.push(prop);
                    // create property
                    this.linkArrays[prop] = [] 
                }
            }
            console.log('linkUserProperties', linkUserProperties)


            console.assert(data.linkTable.length == 0 || (
                isValidIndex(data.linkSchema.id)
                && isValidIndex(data.linkSchema.source)
                && isValidIndex(data.linkSchema.target)),
                'either there are no links, or the linkschema is defined');
                
            for (var i = 0; i < data.linkTable.length; i++) {
                row = data.linkTable[i];
                linkId = row[data.linkSchema.id];
                // console.log('[initDynamicGraph] row', row, linkId)
                this.linkArrays.directed.push(false); // this is default and can be overwritten in the following.

                // check if linkId, i.e. link exists
                if (this.linkArrays.id.indexOf(linkId) == -1) {
                    // init new link
                    this.linkArrays.id[linkId] = linkId;
                    this.linkArrays.source[linkId] = row[data.linkSchema.source];
                    this.linkArrays.target[linkId] = row[data.linkSchema.target];
                    this.linkArrays.linkType[linkId] = row[data.linkSchema.linkType];
                    this.linkArrays.directed[linkId] = row[data.linkSchema.directed];
                    this.linkArrays.weights[linkId] = new ScalarTimeSeries<number>();
                    this.linkArrays.presence[linkId] = [];
                    this.linkArrays.selections.push([]);
                    this.linkArrays.nodePair.push(undefined);
                    this.linkArrays.filter.push(false);
                }

                // must agree with version in main.ts
                var TIME_FORMAT: string = 'YYYY-MM-DD hh:mm:ss';

                // set time information
                if (isValidIndex(data.linkSchema.time)) {
                    timeLabel = data.linkTable[i][data.linkSchema.time];
                    unixTime = parseInt(moment(timeLabel, TIME_FORMAT).format('x'));
                    timeId = this.getTimeIdForUnixTime(unixTime);
                } else {
                    timeId = 0;    
                }
                if(timeId == undefined)
                    timeId = 0;

                time = this._times[timeId];
                this.linkArrays.presence[linkId].push(timeId);

                // set weight if applies
                // console.log('data.linkSchema.weight', data.linkSchema.weight)
                if (isValidIndex(data.linkSchema.weight) && data.linkTable[i][data.linkSchema.weight] != undefined) 
                {
                    this.linkArrays.weights[linkId].set(time, parseFloat(data.linkTable[i][data.linkSchema.weight]))
                    this.minWeight = Math.min(this.minWeight, data.linkTable[i][data.linkSchema.weight])
                    this.maxWeight = Math.max(this.maxWeight, data.linkTable[i][data.linkSchema.weight])
                } else {
                    // set one = presence 
                    this.minWeight = 0
                    this.maxWeight = 1
                    this.linkArrays.weights[linkId].set(time, 1)
                }

                // add graph specific information
                s = this.nodeArrays.id.indexOf(row[data.linkSchema.source]);
                t = this.nodeArrays.id.indexOf(row[data.linkSchema.target]);
                this.nodeArrays.neighbors[s].add(time, t);
                this.nodeArrays.neighbors[t].add(time, s);

                this.nodeArrays.links[s].add(time, linkId);
                this.nodeArrays.links[t].add(time, linkId);

                // for directed links, fill the in/out arrays
                if (this.linkArrays.directed[i]) {
                    this.nodeArrays.outNeighbors[s].add(time, t);
                    this.nodeArrays.inNeighbors[t].add(time, s);

                    this.nodeArrays.outLinks[s].add(time, linkId);
                    this.nodeArrays.inLinks[t].add(time, linkId);
                }

                //link pairs
                // a node pair is stored in a matrix structure for easy access.
                // For every direction (s,t) and (t,s), an individual link pair
                // exists. If an underlying link is undirected, it is referenced
                // in both node pairs.
                // console.log('here');
                nodePairId = this.matrix[s][t];
                if (!isValidIndex(nodePairId)) {
                    // console.log('create new node pair', s, t);
                    nodePairId = this.nodePairArrays.length;
                    this.matrix[s][t] = nodePairId;
                    this.nodePairArrays.id.push(nodePairId);
                    this.nodePairArrays.source.push(s);
                    this.nodePairArrays.target.push(t);
                    this.nodePairArrays.links.push([]);
                    this.nodePairArrays.selections.push([]);
                    this.nodePairArrays.filter.push(false);
                }
                // add link only, if not already exist
                if (this.nodePairArrays.links[nodePairId].indexOf(linkId) == -1) {
                    this.nodePairArrays.links[nodePairId].push(linkId);
                    this.linkArrays.nodePair[linkId] = nodePairId;
                }

                if (this.linkArrays.directed[i]) {
                    nodePairId = this.matrix[t][s];
                    if (!nodePairId) {
                        nodePairId = this.nodePairArrays.id.length;
                        this.matrix[t][s] = nodePairId;
                        this.nodePairArrays.id.push(nodePairId);
                        this.nodePairArrays.source.push(t);
                        this.nodePairArrays.target.push(s);
                        this.nodePairArrays.links.push(networkcube.doubleArray(this._times.length));
                    }
                    // add link only, if not already exist
                    if (this.nodePairArrays.links[nodePairId].indexOf(linkId) == -1) {
                        this.nodePairArrays.links[nodePairId].push(linkId);
                        this.linkArrays.nodePair[linkId] = nodePairId;
                    }
                }

                // gather link types
                if (isValidIndex(data.linkSchema.linkType)) {
                    typeName = data.linkTable[i][data.linkSchema.linkType]
                    typeId = this.linkTypeArrays.name.indexOf(typeName)
                    if (typeId < 0) {
                        typeId = this.linkTypeArrays.length;
                        this.linkTypeArrays.id.push(typeId)
                        this.linkTypeArrays.name.push(typeName)
                    }
                    data.linkTable[i][data.linkSchema.linkType] = typeId;
                    // this.linkArrays.linkType[i] = typeId;
                    // console.log('this.linkArrays.type[i]', i, this.linkArrays.type[i]);
                }

                // gather user-properties: 
                for( var p=0 ; p < linkUserProperties.length ; p++){
                    prop = linkUserProperties[p];
                    this.linkArrays[prop].push(row[data.linkSchema[prop]]);
                }
            }

            // For every time, store a pointer to all its links: 
            // var allLinks = links().toArray();
            // var allTimes = this.g.times().toArray();
            for (var i = 0; i < this.linkArrays.length; i++) {
                for (var j = 0; j < this.timeArrays.length; j++) {
                    if (this.linkArrays.weights[i].serie.hasOwnProperty(this.timeArrays.id[j].toString())) {
                        this.timeArrays.links[j].push(this.linkArrays.id[i]);
                    }
                }
            }


            // for(var i=0 ; i<this.linkArrays.id.length ; i++)    
            //     console.log('this.linkArrays.value', this.linkArrays.weights[i].serie[0]) 



            // create color map for link types
            var linkTypeCount: number = this.linkTypeArrays.length;

            // colorScale;
            // if (linkTypeCount <= 10) {
            //     colorScale = d3.scale.category10();
            // } else {
            //     colorScale = d3.scale.category20();
            // }

            // // create color map for node types
            // var nodeTypeCount: number = this.nodeTypeArrays.length;
            // var colorScale;
            // if (nodeTypeCount == 1) {
            //     colorScale = (v)=>'#fff';
            // }else if (nodeTypeCount <= 10) {
            //     colorScale = d3.scale.category10();
            // } else {
            //     colorScale = d3.scale.category20();
            // }

            // for (var i = 0; i < this.linkTypeArrays.name.length; i++) {
            //     this.linkTypeArrays.color.push(colorScale(i));
            //     this.linkTypes.push(new LinkType(
            //         this.linkTypeArrays.id[i],
            //         this.linkTypeArrays.name[i],
            //         this.linkTypeArrays.color[i]
            //     ))
            // }


            console.log('[Dynamic Graph] Dynamic Graph created: ', this.nodeArrays.length);
            console.log('[Dynamic Graph]    - Nodes: ', this.nodeArrays.length);
            console.log('[Dynamic Graph]    - Edges: ', this.linkArrays.length);
            console.log('[Dynamic Graph]    - Times: ', this.timeArrays.length);
            console.log('[Dynamic Graph]    - Link types: ', this.linkTypeArrays.length);
            console.log('[Dynamic Graph]    - Node Pairs: ', this.nodePairArrays.length);


            console.log('>>>this.nodeArrays["neighbors"][0]', this.nodeArrays['neighbors'][0])

            // inits the WindowGraph for this dynamic graph, i.e.
            // the all-aggregated graph.
            this.createGraphObjects(true, true); //false, false);

            this.createSelections(false);
        }

        createSelections(shouldCreateArrays: boolean): void {
            // CREATE SELECTIONS
            if (shouldCreateArrays) {
                if (! ('nodeArrays' in this && this.nodeArrays)) {
                    this.nodeArrays = new NodeArray();
                    this.linkArrays = new LinkArray();
                    this.timeArrays = new TimeArray();
                    this.nodePairArrays = new NodePairArray();
                }
                this.nodeArrays.selections = new Array(this.nodeArrays.length);
                for (var i = 0; i < this.nodeArrays.selections.length; i++) {
                    this.nodeArrays.selections[i] = [];
                }

                this.linkArrays.selections = new Array(this.linkArrays.length);
                for (var i = 0; i < this.linkArrays.selections.length; i++) {
                    this.linkArrays.selections[i] = [];
                }

                this.timeArrays.selections = new Array(this.timeArrays.length);
                for (var i = 0; i < this.timeArrays.selections.length; i++) {
                    this.timeArrays.selections[i] = [];
                }

                this.nodePairArrays.selections = new Array(this.nodePairArrays.length);
                for (var i = 0; i < this.nodePairArrays.selections.length; i++) {
                    this.nodePairArrays.selections[i] = [];
                }
            }

            // create default selections for each type
            this.defaultNodeSelection = this.createSelection('node');
            this.defaultNodeSelection.name = 'Unselected';
            for (var i = 0; i < this._nodes.length; i++) {
                this.defaultNodeSelection.elementIds.push(i);
                this.addToAttributeArraysSelection(this.defaultNodeSelection, 'node', this._nodes[i].id());
            }
            this.defaultNodeSelection.color = '#000000';
            this.defaultNodeSelection.showColor = false;
            this.defaultNodeSelection.priority = 10000;
            this.selectionColor_pointer--;


            this.defaultLinkSelection = this.createSelection('link');
            this.defaultLinkSelection.name = 'Unselected';
            for (var i = 0; i < this._links.length; i++) {
                this.defaultLinkSelection.elementIds.push(i);
                this.addToAttributeArraysSelection(this.defaultLinkSelection, 'link', this._links[i].id());
            }
            this.defaultLinkSelection.color = '#000000';
            this.defaultLinkSelection.showColor = false;
            this.defaultLinkSelection.priority = 10000;
            this.selectionColor_pointer--;

            // create selections for node types
            var types: string[] = []
            var type, index;
            var selection: Selection;
            var nodeSelections: Selection[] = [];

            for (var i = 0; i < this.nodeArrays.nodeType.length; i++) {
                type = this.nodeArrays.nodeType[i];
                if (type == undefined || type.length == 0 || type == 'undefined')
                    continue;
                index = types.indexOf(type);
                if (index == -1) {
                    selection = this.createSelection('node');
                    selection.name = type;
                    nodeSelections.push(selection)
                    types.push(type);
                } else {
                    selection = nodeSelections[index];
                }
                this.addElementToSelection(selection, this._nodes[i]);
                // this.addToSelection(selection, this._nodes[i].id(), 'node');
            }
            if (nodeSelections.length == 1) {
                // console.log('nodeSelections[0]:', nodeSelections[0])
                nodeSelections[0].color = '#444';
            }




            // create selections for link type
            types = [];
            var linkSelections: Selection[] = [];
            for (var i = 0; i < this.linkArrays.linkType.length; i++) {
                type = this.linkArrays.linkType[i];
                if (!type || type == 'undefined')
                    continue;
                index = types.indexOf(type);
                if (index == -1) {
                    selection = this.createSelection('link');
                    selection.name = type;
                    linkSelections.push(selection)
                    types.push(type);
                } else {
                    selection = linkSelections[index];
                }
                this.addElementToSelection(selection, this._links[i]);
                // this.addToSelection(selection, this._links[i].id(), 'link');
            }
            if (linkSelections.length == 1)
                linkSelections[0].color = '#444';


            // create selections for node type
            // types = [];
            // var nodeSelections: Selection[] = [];
            // for (var i = 0; i < this.nodeArrays.nodeType.length; i++) {
            //     type = this.nodeArrays.nodeType[i];
            //     if (!type || type == 'undefined')
            //         continue;
            //     index = types.indexOf(type);
            //     if (index == -1) {
            //         selection = this.createSelection('node');
            //         selection.name = type;
            //         nodeSelections.push(selection)
            //         types.push(type);
            //     } else {
            //         selection = nodeSelections[index];
            //     }
            //     this.addElementToSelection(selection, this._nodes[i]);
            //     // this.addToSelection(selection, this._links[i].id(), 'link');
            // }

            this.currentSelection_id = 0;

        }



        // GRAPH API //////////////////

        /**
         *
         * Returns a window graph for the passed time point
         * or period
         * @param  {any}    start First time point of this graph
         * @param  {any}    end   Last time point of this graph.
         * @return {[type]}       [description]
         */
        // getGraph(start: Time, end?: Time): WindowGraph {
        //     var g: WindowGraph = new WindowGraph();
        //     return this.createGraph(g, start, end);
        // }

        // Creates a new graph with all nodes and edges from start to end.
        // CACHEGRAPH : this code needs to be leveraged to initialize all of the fields from 
        // windowGraph that are now part of this class
        private createGraphObjects(shouldCreateTimes: boolean, shouldCreateLinkTypes): void {

            // measure time:
            console.log('[DynamicNetwork:createGraph()] >>> ')
            var d = Date.now();

            // POPULATE WINDOW GRAPH

            // populate locations
            if (this.locationArrays && 'id' in this.locationArrays) {
                for (var i = 0; i < this.locationArrays.id.length; i++) {
                    // console.log('create location', this.locationArrays.id[i]);
                    this._locations.push(new Location(this.locationArrays.id[i], this));
                }
            }
            else {
                this.locationArrays = new LocationArray();
            }

            // Populate nodes
            // console.log('populate nodes:');
            var nodes: Node[] = [];
            var locations;
            if ('nodeArrays' in this && this.nodeArrays) {
                for (var i = 0; i < this.nodeArrays.id.length; i++) {
                    nodes.push(new Node(i, this));
                }
            }

            // Populate links
            var links: Link[] = [];
            var link: Link;
            var source: Node, target: Node;
            if ('linkArrays' in this && this.linkArrays) {
                for (var i = 0; i < this.linkArrays.source.length; i++) {
                    // console.log('link present', presence, end.time, start.time);

                    link = new Link(i, this);
                    links.push(link);

                    // link.source = nodes[this.nodeArrays.id.indexOf(this.linkArrays.source[i])];
                    // link.target = nodes[this.nodeArrays.id.indexOf(this.linkArrays.target[i])];
                    // // link nodes
                    // source = link.source;
                    // target = link.target;
                    // // console.log(source, target);
                    // source.neighbors.push(target);
                    // target.neighbors.push(source);
                    // source.links.push(link);
                    // target.links.push(link);

                    // source.outLinks.push(link);
                    // target.inLinks.push(link);

                    // source.outNeighbors.push(source);
                    // target.inNeighbors.push(target);

                    // if (!this.linkAttr('directed', i)) {
                    //     source.inLinks.push(link);
                    //     target.outLinks.push(link);

                    //     source.inNeighbors.push(source);
                    //     target.outNeighbors.push(target);
                    // }
                }
            }

            // Populate node pairs
            // var nodePairs: NodePair[] = []
            var s: number, t: number;
            var pairLinks: number[];
            var pair: NodePair;
            var pairLinkId: number;
            var thisGraphNodePairIds: number[] = [];
            if ('nodePairArrays' in this && this.nodePairArrays) {
                for (var i = 0; i < this.nodePairArrays.length; i++) {
                    pairLinks = this.nodePairArrays.links[i];
                    this._nodePairs.push(new NodePair(i, this));
                    // for (var j = 0; j < pairLinks.length; j++) {
                    //     pairLinkId = pairLinks[j];
                    //     pair = undefined;
                    //     for (var k = 0; k < nodePairs.length; k++) {
                    //         if (nodePairs[k].id == i) {
                    //             pair = nodePairs[k];
                    //             break;
                    //         }
                    //     }
                    //     if (!pair) {
                    //         pair = new NodePair(i, this);
                    //         nodePairs.push(pair)
                    //         thisGraphNodePairIds.push(i)
                    //         pair.source = nodes[this.pairAttr('source', i)];
                    //         pair.target = nodes[this.pairAttr('target', i)];
                    //     }

                    //     for (var k = 0; k < links.length; k++) {
                    //         if (links[k].id == pairLinkId) {
                    //             link = links[k];
                    //             break;
                    //         }
                    //     }

                    //     pair.links.push(link);
                    //     link.nodePair = pair;
                    // }
                }
            }

            this._nodes = nodes;
            this._links = links;
            // this.nodePairs = nodePairs;

            if (shouldCreateTimes) {// && 'timesArrays' in this && this.timeArrays) {
                this._times = [];
                for (var i = 0; i < this.timeArrays.length; i++)
                    this._times.push(new Time(i, this));
            }

            // if (shouldCreateLinkTypes) {
            //     var linkTypeCount: number = this.linkTypeArrays.length;
            //     var colorScale;
            //     if (linkTypeCount <= 10) {
            //         colorScale = d3.scale.category10();
            //     } else {
            //         colorScale = d3.scale.category20();
            //     }
            //     for (var i = 0; i < this.linkTypeArrays.name.length; i++) {
            //         this.linkTypes.push(new LinkType(
            //             this.linkTypeArrays.id[i],
            //             this.linkTypeArrays.name[i],
            //             this.linkTypeArrays.color[i]
            //         ));
            //     }
            // }

            console.log('[DynamicNetwork:getGraph()] <<< ', Date.now() - d, 'msec')
        }

        // all attribute accessor method
        nodeAttr(attr: string, id: number): any {
            return this.attr(attr, id, 'node');
        }
        linkAttr(attr: string, id: number): any {
            return this.attr(attr, id, 'link');
        }
        pairAttr(attr: string, id: number): any {
            return this.attr(attr, id, 'nodePair');
        }
        timeAttr(attr: string, id: number): any {
            return this.attr(attr, id, 'time');
        }

        get startTime(): Time { return this._times[0]; }
        get endTime(): Time { return this._times[this._times.length - 1]; }

        // /// SELECTIONS
        // // selections store ids of objects only.



        highlight(action: string, idCompound?: IDCompound): void {

            if (action == 'reset') {
                // reset all
                this.highlightArrays.nodeIds = [];
                this.highlightArrays.linkIds = [];
                this.highlightArrays.nodePairIds = [];
                this.highlightArrays.timeIds = [];
                return;
            }
            if (!idCompound) {
                console.error('[DynamicGraph] highlight: idCompound not set!')
                return;
            }

            if (action == 'set') {
                this.highlight('reset');
                this.highlight('add', idCompound);
                return;
            }


            // if(action == 'add'){
            //     for(var i=0 ; i<elementIds.length ; i++){
            //         if(this.highlightArrays[type].indexOf(elementIds[i]) == -1)
            //             this.highlightArrays[type].push(elementIds[i]);
            //     }
            // }else
            // if(action == 'remove'){
            //     for(var i=0 ; i<elementIds.length ; i++){
            //         if(this.highlightArrays[type].indexOf(elementIds[i]) > -1)
            //              this.highlightArrays[type].splice(this.highlightArrays[type].indexOf(elementIds[i]),1)
            //     }
            // }
            if (action == 'add') {
                for (var type in idCompound) {
                    for (var i = 0; i < idCompound[type].length; i++) {
                        this.highlightArrays[type].push(idCompound[type][i]);
                    }
                }
            } else
                if (action == 'remove') {
                    var index: number;
                    for (var type in idCompound) {
                        for (var i = 0; i < idCompound[type].length; i++) {
                            index = this.highlightArrays[type].indexOf(idCompound[type][i]);
                            if (index >= 0)
                                this.highlightArrays[type].splice(index, 1);
                        }
                    }
                }
        }


        // SELECT
        selection(action: string, idCompound: IDCompound, selectionId?: number) {
            
            if (selectionId == undefined)
                selectionId = this.currentSelection_id;

            var selection: Selection = this.getSelection(selectionId);
            if (!selection)
                console.error('[DynamicGraph] Selection with ', selectionId, 'not found in ', this.selections);

            var self: DynamicGraph = this;
            if (action == 'set') {
                var c: IDCompound = new IDCompound();
                c[selection.acceptedType] = selection.elementIds;
                this.selection('remove', c, selectionId);
                this.selection('add', idCompound, selectionId);
            } else if (action == 'add') {
                idCompound.linkIds.forEach((v, i, arr) => self.addToSelectionByTypeAndId(selection, 'link', v));
                idCompound.nodeIds.forEach((v, i, arr) => self.addToSelectionByTypeAndId(selection, 'node', v));
                idCompound.timeIds.forEach((v, i, arr) => self.addToSelectionByTypeAndId(selection, 'time', v));
                idCompound.nodePairIds.forEach((v, i, arr) => self.addToSelectionByTypeAndId(selection, 'nodePair', v));
            } else if (action == 'remove') {
                idCompound.linkIds.forEach((v, i, arr) => self.removeFromSelectionByTypeAndId(selection, 'link', v));
                idCompound.nodeIds.forEach((v, i, arr) => self.removeFromSelectionByTypeAndId(selection, 'node', v));
                idCompound.timeIds.forEach((v, i, arr) => self.removeFromSelectionByTypeAndId(selection, 'time', v));
                idCompound.nodePairIds.forEach((v, i, arr) => self.removeFromSelectionByTypeAndId(selection, 'nodePair', v));
            }
        }

        

        // SELFIX : delegate to dgraph
        addToAttributeArraysSelection(selection: Selection, type: string, id: number) {
            // check for priority of selections, then add where appropriate
            var elementSelections = this.attributeArrays[type].selections[id];
            // console.log('selection.priority', selection.priority)
            // console.log('elementSelections', elementSelections.length)
            for(var i=0 ; i <elementSelections.length ; i++){
                if(elementSelections[i].priority > selection.priority){
                    // console.log('insert new selection at', i)
                    this.attributeArrays[type].selections[id].splice(i,0, selection);
                    return;
                }
            }  
            // if not already selected and if not higher priority than any other 
            // selection, append to the end.
            this.attributeArrays[type].selections[id].push(selection);
        }

        // SELFIX : delegate to dgraph
        removeFromAttributeArraysSelection(selection: Selection, type: string, id: number) {
            var arr = this.attributeArrays[type].selections[id];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == selection)
                    this.attributeArrays[type].selections[id].splice(i, 1);
            }
        }

        addElementToSelection(selection: Selection, e: BasicElement) {
            this.addToSelectionByTypeAndId(selection, e.type, e.id());
        }

        addToSelectionByTypeAndId(selection: Selection, type: string, id: number) {
            if (type != selection.acceptedType) {
                console.log('attempting to put object of the wrong type into a selection');
                return; // don't proceed with selection;    
            }
            selection.elementIds.push(id);
            this.addToAttributeArraysSelection(selection, type, id);
            // =======
            //                 this.selection('add', idCompound, selectionId);
            //             } else {
            //                 if (action == 'add') {
            //                     for (var field in idCompound) {
            //                         for (var i = 0; i < idCompound[field].length; i++) {
            //                             this.addToSelection(selection, idCompound[field][i], field)
            //                         }
            //                     }
            //                 } else {
            //                     if (action == 'remove') {
            //                         for (var field in idCompound) {
            //                             for (var i = 0; i < idCompound[field].length; i++) {
            //                                 for (var j = 0; j < selection.elementIds.length; j++) {
            //                                     if (selection.elementIds[j] == idCompound[field][i].id) {
            //                                         this.removeFromSelection(selection, idCompound[field][i], field);
            //                                     }
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //         addToSelection(selection: Selection, id:number, elementType:string) {
            //             selection.elementIds.push(id);

            //             var e:BasicElement = this.get(elementType, id); 
            //             e.addToSelection(selection);
            // >>>>>>> api
            // remove from default selection
            var i;
            if (type == 'node') {
                i = this.defaultNodeSelection.elementIds.indexOf(id);
                if (i > -1) {
                    this.removeFromAttributeArraysSelection(this.defaultNodeSelection, type, id);
                    this.defaultNodeSelection.elementIds.splice(i, 1);
                }
            } else
                if (type == 'link') {
                    i = this.defaultLinkSelection.elementIds.indexOf(id);
                    if (i > -1) {
                        this.removeFromAttributeArraysSelection(this.defaultLinkSelection, type, id);
                        this.defaultLinkSelection.elementIds.splice(i, 1);
                    }
                }

        }
        // <<<<<<< HEAD

        removeElementFromSelection(selection: Selection, e: BasicElement) {
            this.removeFromSelectionByTypeAndId(selection, e.type, e.id());
        }

        removeFromSelectionByTypeAndId(selection: Selection, type: string, id: number) {
            // selection.elements.push(compound[field][i])
            // e.addToSelection(selection);
            // =======
            //         removeFromSelection(selection: Selection, id:number, elementType:string) {
            // >>>>>>> api
            var i = selection.elementIds.indexOf(id)
            if (i == -1)
                return;

            selection.elementIds.splice(i, 1);
            // <<<<<<< HEAD
            this.removeFromAttributeArraysSelection(selection, type, id);
            // =======
            //             var e:BasicElement = this.get(elementType, id); 
            //             e.removeFromSelection(selection);
            // >>>>>>> api

            // add to default selection
            if (this.getSelectionsByTypeAndId(type, id).length == 0) {
                if (type == 'node') {
                    this.defaultNodeSelection.elementIds.push(id);
                    this.addToAttributeArraysSelection(this.defaultNodeSelection, type, id);
                } else
                    if (type == 'link') {
                        this.defaultLinkSelection.elementIds.push(id);
                        this.addToAttributeArraysSelection(this.defaultLinkSelection, type, id);
                    }
            }
        }

        getSelectionsByTypeAndId(type: string, id: number): Selection[] {
            return this.attributeArrays[type].selections[id];
        }


        // // Filter
        // filter(idCompound:ElementCompound, filter:boolean){
        //     // console.log('compound', compound)
        //     for(var field in compound){
        //         for(var i=0 ; i<compound[field].length ; i++){
        //             // test for other selections
        //
        //
        //             this.attributeArrays[field].filter[i] = filter;
        //         }
        //     }
        // }

        filterSelection(selectionId: number, filter: boolean) {
            this.getSelection(selectionId).filter = filter;
        }

        isFiltered(id: number, type: string): boolean {
            return this.attributeArrays[type + 's'].filter;
        }

        isHighlighted(id: number, type: string) {
            return this.highlightArrays[type + 'Ids'].indexOf(id) > -1;
        }

        getHighlightedIds(type: string) {
            return this.highlightArrays[type + 'Ids'];
        }


        setCurrentSelection(id: number) {
            // [bbach] why should we ignore them?
            // if (id < 2) // i.e. either default node or link selection..
            //     return;  // ignore
            console.log('[DynamicGraph] setCurrentSelectionId ', id)
            this.currentSelection_id = id;
        }
        getCurrentSelection(): Selection {
            return this.getSelection(this.currentSelection_id);
        }

        addSelection(id: number, color: string, acceptedType: string, priority: number) {
            var s: Selection = this.createSelection(acceptedType);
            s.id = id;
            s.color = color;
            s.priority = priority;
        }

        // creates a selection for the passed type.
        createSelection(type: string): Selection {
            var s = new Selection(this.selections.length, type);
            s.color = this.BOOKMARK_COLORS(this.selectionColor_pointer % 10);
            this.selectionColor_pointer++;
            this.selections.push(s);
            // console.log('Create new selection:', s.id)
            return s;
        }

        deleteSelection(selectionId: number): void {
            var s = this.getSelection(selectionId);

            // remove all elements from this selection
            // <<<<<<< HEAD
            //             var compound: ElementCompound = new ElementCompound();
            //             compound[s.acceptedType + 'Ids'] = s.elementIds.slice(0);
            //             this.selection('remove', compound, s.id)
            // =======

            // remove 
            var idCompound: IDCompound = new IDCompound();
            idCompound[s.acceptedType + 'Ids'] = s.elementIds.slice(0);
            console.log('Delete selection->remove elemeents', s.elementIds.slice(0))
            this.selection('remove', idCompound, s.id)
            // >>>>>>> api

            // delete selection
            this.selections.splice(this.selections.indexOf(s), 1);
        }

        setSelectionColor(id: number, color: string) {
            var s = this.getSelection(id);
            if (!s) {
                return;
            }
            s.color = color;
        }
        getSelections(type?: string) {
            var selections: Selection[] = [];
            if (type) {
                for (var i = 0; i < this.selections.length; i++) {
                    if ((<Selection>this.selections[i]).acceptsType(type))
                        selections.push(this.selections[i])
                }
                return selections;
            } else {
                return this.selections;
            }
        }
        getSelection(id: number): Selection {
            for (var i = 0; i < this.selections.length; i++) {
                if (id == this.selections[i].id)
                    return this.selections[i];
            }
            console.error('[DynamicGraph] No selection with id ', id, 'found!');
        }

        clearSelections() {
            this.selections = [];
        }



        // internal utils
        getTimeIdForUnixTime(unixTime: number): number {
            var timeId: number;
            for (timeId = 0; timeId < this.timeArrays.length; timeId++) {
                if (unixTime == this.timeArrays.unixTime[timeId]) {
                    timeId;
                    return timeId;
                }
            }
            // console.error('Time object for unix time', unixTime, 'not found!')
            return undefined;
        }

        // ORDERING
        /* adds an specific node order (e.g. alphabetical) */


        // go into dynamicgraph
        addNodeOrdering(name: string, order: number[]) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    console.error('Ordering', name, 'already exists');
                    return;
                }
            }
            var o = new Ordering(name, order);
            this.nodeOrders.push(o);
        }
        setNodeOrdering(name: string, order: number[]) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    this.nodeOrders[i].order = order;
                    return;
                }
            }
            console.error('Ordering', name, 'does not exist');
        }
        removeNodeOrdering(name: string, order: number[]) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    this.nodeOrders.splice(i, 1);
                }
            }
        }
        getNodeOrder(name: string) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    return this.nodeOrders[i];
                }
            }
            console.error('Ordering', name, 'not found!');
            return;
        }


        // returns elements 
        nodes(): NodeQuery {
            return new NodeQuery(this.nodeArrays.id, this);
        }
        links(): LinkQuery {
            return new LinkQuery(this.linkArrays.id, this);
        }
        times(): TimeQuery {
            return new TimeQuery(this.timeArrays.id, this);
        }
        locations(): LocationQuery {
            return new LocationQuery(this.locationArrays.id, this);
        }
        nodePairs(): NodePairQuery {
            return new NodePairQuery(this.nodePairArrays.id, this);
        }

        
        linksBetween(n1:Node, n2:Node): LinkQuery{
            var nodePairId = this.matrix[n1.id()][n2.id()];
            if(nodePairId == undefined)
                nodePairId = this.matrix[n2.id()][n1.id()];
            if(nodePairId == undefined)
                return new LinkQuery([], this);

            return new LinkQuery(this.nodePair(nodePairId).links().toArray(), this);
        }
        
        
        // generic accessor method. should not be used externally
        get(type: string, id: number): BasicElement {
            if (type.indexOf('nodePair') > -1)
                return this.nodePair(id);
            if (type.indexOf('node') > -1)
                return this.node(id);
            if (type.indexOf('link') > -1)
                return this.link(id);
            if (type.indexOf('time') > -1)
                return this.time(id);
            if (type.indexOf('locations') > -1)
                return this.location(id);
        }

        getAll(type: string): GraphElementQuery {
            if (type == 'nodes')
                return this.nodes();
            if (type == 'links')
                return this.links();
            if (type == 'times')
                return this.times();
            if (type == 'nodePairs')
                return this.nodePairs();
            if (type == 'locations')
                return this.locations();
        }

        // returns the node with ID
        node(id: number) {
            for (var i = 0; i < this._nodes.length; i++) {
                if (this._nodes[i].id() == id)
                    return this._nodes[i];
            }
        }

        link(id: number) {
            for (var i = 0; i < this._links.length; i++) {
                if (this._links[i].id() == id)
                    return this._links[i];
            }
        }
        time(id: number) {
            for (var i = 0; i < this._times.length; i++) {
                if (this._times[i].id() == id)
                    return this._times[i];
            }
        }
        location(id: number) {
            for (var i = 0; i < this._locations.length; i++) {
                if (this._locations[i].id() == id)
                    return this._locations[i];
            }
        }
        nodePair(id: number) {
            for (var i = 0; i < this._nodePairs.length; i++) {
                if (this._nodePairs[i].id() == id)
                    return this._nodePairs[i];
            }
        }

        getMinGranularity(): number { return this.gran_min; }
        getMaxGranularity(): number { return this.gran_max; }
    }

    export class Selection {
        name: string;
        elementIds: number[];
        acceptedType: string;
        color: string;
        id: number;
        showColor: boolean = true;
        filter: boolean = false;
        priority: number = 0;

        constructor(id: number, acceptedType: string) {
            this.id = id;
            this.name = 'Selection-' + this.id
            this.elementIds = [];
            this.acceptedType = acceptedType;
            this.priority = id;
        }

        acceptsType(type: string) {
            return this.acceptedType == type;
        }
    }


    // A time series with one scalar value for every time point

    export class AttributeArray {
        id: number[] = [];
        get length(): number {
            return this.id.length;
        }
    }

    export class NodeArray extends AttributeArray {
        id: number[] = [];
        label: string[] = [];
        // nodeType: ScalarTimeSeries<string>[] = [];
        outLinks: ArrayTimeSeries<number>[] = [];  // contains link ids only, since every GRAPH has its own EDGE object instance
        inLinks: ArrayTimeSeries<number>[] = [];    // contains link ids only, since every GRAPH has its own EDGE object instance
        links: ArrayTimeSeries<number>[] = [];
        outNeighbors: ArrayTimeSeries<number>[] = [];   // contains node ids only, since every GRAPH has its own NODE object instance
        inNeighbors: ArrayTimeSeries<number>[] = [];   // contains node ids only, since every GRAPH has its own NODE object instance
        neighbors: ArrayTimeSeries<number>[] = [];
        selections: Selection[][] = [];
        attributes: Object[] = []; // arbitrary attributes (key -> value)
        locations: ScalarTimeSeries<number>[] = []
        filter: boolean[] = [];
        nodeType: string[] = [];
    }

    export class LinkArray extends AttributeArray {
        source: number[] = [];
        target: number[] = [];
        linkType: string[] = [];
        directed: boolean[] = [];
        nodePair: number[] = [];
        // array of all time ids (temporally ordered) when this link is present
        presence: number[][] = [];
        // array of weights per time this link is present. This is a generic field
        // that can be used for weights, e.g.
        weights: ScalarTimeSeries<number>[] = [];
        selections: Selection[][] = [];
        filter: boolean[] = [];
        attributes: Object = new Object; // arbitrary attributes (key -> value)
    }


    export class NodePairArray extends AttributeArray {
        source: number[] = [];
        target: number[] = [];
        links: number[][] = [];
        selections: Selection[][] = [];
        filter: boolean[] = [];
    }


    export class TimeArray extends AttributeArray {
        id: number[] = [];
        momentTime: Moment[] = [];         // moment object
        label:string[] = []
        unixTime: number[] = [];         // unix time object
        selections: Selection[][] = [];
        filter: boolean[] = [];
        links: number[][] = []; // all links at that time
     }

    export class LinkTypeArray extends AttributeArray {
        name: string[] = [];
        count: string[] = [];
        color: string[] = [];
        filter: boolean[] = [];
    }
    export class NodeTypeArray extends AttributeArray {
        name: string[] = [];
        count: string[] = [];
        color: string[] = [];
        filter: boolean[] = [];
    }


    export class LocationArray extends AttributeArray {
        id: number[] = [];
        label: string[] = [];
        longitude: number[] = [];
        latitude: number[] = [];
        x: number[] = [];
        y: number[] = [];
        z: number[] = [];
        radius: number[] = [];
    }

    export class LinkType implements LegendElement {
        id: number;
        name: string;
        color: string;
        constructor(id: number, name: string, color: string) {
            this.id = id;
            this.name = name;
            this.color = color;
        }
    }
    export class NodeType implements LegendElement {
        id: number;
        name: string;
        color: string;
        constructor(id: number, name: string, color: string) {
            this.id = id;
            this.name = name;
            this.color = color;
        }
    }

    // export class Location extends BasicElement {
    //     constructor(id: number, dynamicgraph: DynamicGraph) {
    //         super(id, 'location', dynamicgraph)
    //     }
    // }

    export interface LegendElement {
        name: string;
        color: string;
    }

    export class Ordering {
        name: string;
        order: number[] = [];
        constructor(name: string, order: number[]) {
            this.name = name;
            this.order = order;
        }
    }

}
