/// <reference path="./dynamicgraph.ts"/>
/// <reference path="../scripts/lz-string.d.ts" />

module networkcube {

    export interface DataManagerOptions {
        keepOnlyOneSession?: boolean;
    }

    export class DataManager {

        constructor(options?: DataManagerOptions) {
            if (options) {
                // initialize stuff differently here
                if (options.keepOnlyOneSession)
                    this.setOptions(options);
            } else {
                this.keepOnlyOneSession = false;
            }
        }

        setOptions(options: DataManagerOptions): void {
            this.keepOnlyOneSession = options.keepOnlyOneSession;
        }
        // current dynamic graph of the visualization.
        // The first time the getGraph() function is called
        // that graph object is created and populated.
        // The second time, it's just retrieved.
        dynamicGraph: DynamicGraph;

        keepOnlyOneSession: boolean = false;
        session: string;

        sessionDataPrefix: string = "ncubesession";
        // sessionDataPrefix: string = "";

        clearSessionData(session: string): void 
        {
            var searchPrefix = this.sessionDataPrefix + this.SEP + session;
            // var searchPrefix = session;
            var keysToClear: string[] = [];
            console.log('clearSessionData')
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(searchPrefix) == 0)
                    keysToClear.push(key);
                // these are the old keys that we used to store before we 
                // added support for multiple sessions
                else if (key.indexOf('connectoscope1') == 0)
                    keysToClear.push(key);
            }
            for (var i = 0; i < keysToClear.length; i++) {
                var key = keysToClear[i];
                console.log('remove from storage', key)
                localStorage.removeItem(key);
            }
        }

        clearAllSessionData(): void {
            this.clearSessionData('');
        }

        isSessionCached(session: string, dataSetName: string): boolean {
            var prefix = this.sessionDataPrefix + this.SEP + session + this.SEP + dataSetName;
            var firstSessionKey: string = null;
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(prefix) == 0) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Import a data set into networkcube's local storage.
         * @param  {string}  session - current session id
         * @param  {DataSet} data    - a networkcube.DataSet
         */
        importData(session: string, data: DataSet) {
            this.session = session;

            // console.log('import data set', data.name, data.nodeTable, data.linkTable);
            // console.log('import data set', data.name, data);

            // check if all data (tables + schemas) are there
            if (!data.nodeTable && !data.linkTable) {
                console.log('Empty tables. No data imported.')
                return;
            }

            if (!data.nodeTable) {
                console.log('[n3] Node table missing!')
            }
            if (!data.linkTable) {
                console.log('[n3] Link table missing!')
            }
            if (!data.nodeSchema) {
                console.log('[n3] Node schema missing!')
            }
            if (!data.linkSchema) {
                console.log('[n3] Link schema missing!')
            }


            // format data
            for (var i = 0; i < data.nodeTable.length; i++) {
                for (var j = 0; j < data.nodeTable[i].length; j++) {
                    if (typeof data.nodeTable[i][j] == 'string')
                        data.nodeTable[i][j] = data.nodeTable[i][j].trim();
                }
            }
            for (var i = 0; i < data.linkTable.length; i++) {
                for (var j = 0; j < data.linkTable[i].length; j++) {
                    if (typeof data.linkTable[i][j] == 'string')
                        data.linkTable[i][j] = data.linkTable[i][j].trim();
                }
            }

            // this.saveToStorage(data.name, this.NODE_TABLE, data.nodeTable);
            // this.saveToStorage(data.name, this.NODE_SCHEMA, data.nodeSchema);
            // this.saveToStorage(data.name, this.LINK_SCHEMA, data.linkSchema);
            // this.saveToStorage(data.name, this.LINK_TABLE, data.linkTable);
            // // if(data.locationTable){
            // this.saveToStorage(data.name, this.LOCATION_TABLE, data.locationTable);
            // this.saveToStorage(data.name, this.LOCATION_SCHEMA, data.locationSchema);
            // }

            // In order to initialize the dynamic graph, our schema must be sufficiently well-defined
            if (this.isSchemaWellDefined(data)) {
                console.log('data is well-schematized, caching dynamicGraph');
                // in order to ensure that we have enough quota, we only keep one session
                // cached at a time.
                if (this.keepOnlyOneSession)
                    this.clearAllSessionData();

                var graphForCaching: DynamicGraph = new DynamicGraph();
                graphForCaching.initDynamicGraph(data);
                // CACHEGRAPH store DynamicGraph in localstorage
                graphForCaching.saveDynamicGraph(this);

                // CACHEGRAPH : this code is strictly for diagnostics;
                var doubleCheckSave = false;
                if (doubleCheckSave) {
                    var testGraph: DynamicGraph = new DynamicGraph();
                    testGraph.loadDynamicGraph(this, data.name);
                    testGraph.debugCompareTo(graphForCaching);
                }
            } else {
                console.log('data is not well-schematized, so not caching dynamicGraph');
            }
        }

        


        // udpates the passed dataset, i.e. stores tables and schemas as indicated.
        // updateData(data: DataSet) {
        //     console.log('[datamanager] Update dataset', this.session, data.name)
        //     this.saveToStorage(data.name, this.NODE_TABLE, data.nodeTable);
        //     this.saveToStorage(data.name, this.NODE_SCHEMA, data.nodeSchema);
        //     this.saveToStorage(data.name, this.LINK_TABLE, data.linkTable);
        //     this.saveToStorage(data.name, this.LINK_SCHEMA, data.linkSchema);
        //     this.saveToStorage(data.name, this.LOCATION_TABLE, data.locationTable);
        //     this.saveToStorage(data.name, this.LOCATION_SCHEMA, data.locationSchema);
        //     console.log('[datamanager] Dataset updated', data);
        // }

        /**
         * Returns the dataset with tables from the local storage by its name
         * This method provides *full* access to the raw data, without
         * networkcube creating a DynamicGraph object.
         * @param  {string} session     - current session id
         * @param  {string} datasetname - name of data set
         * @return {[type]}             - the data set
         */
        //         getData(session: string, datasetname: string) {
        //             this.session = session;
        //             // console.log('getData()', session, datasetname)
        //             var dataset = new DataSet({
        //                 name: datasetname,
        //                 nodeTable: this.getFromStorage<any[]>(datasetname, this.NODE_TABLE),
        //                 linkTable: this.getFromStorage<any[]>(datasetname, this.LINK_TABLE),
        //                 locationTable: this.getFromStorage<any[]>(datasetname, this.LOCATION_TABLE)
        //             })
        //             dataset.nodeSchema = this.getFromStorage<NodeSchema>(datasetname, this.NODE_SCHEMA);
        //             dataset.linkSchema = this.getFromStorage<LinkSchema>(datasetname, this.LINK_SCHEMA);
        //             dataset.locationSchema = this.getFromStorage<LocationSchema>(datasetname, this.LOCATION_SCHEMA);
        // 
        //             return dataset;
        //         }

        // Strings used to access local storage
        SEP: string = "_";
        // NODE_TABLE: string = 'networkcube.nodetable';
        // LINK_TABLE: string = 'networkcube.linktable';
        // NODE_SCHEMA: string = 'networkcube.nodeschema';
        // LINK_SCHEMA: string = 'networkcube.linkschema';
        // LOCATION_TABLE: string = 'networkcube.locationtable';
        // LOCATION_SCHEMA: string = 'networkcube.locationschema';
        // GRAPH: string = 'networkcube.graph';

        // storage primitives /////////////////////////////////////
        //
        saveToStorage<T>(dataName: string, valueName: string, value: T, replacer?: (key: string, value: any) => any) {
            // console.log('saveToStorage', dataName, valueName, value);
            // console.log('saveNodeTable', value, this.session + this.SEP + dataname + this.SEP + valueName);
            if (value == undefined) {
                console.log('attempting to save undefined value. aborting', dataName, valueName);
                return;
            }
            var stringifyResult = JSON.stringify(value, replacer);

            var stringToSave;
            if (stringifyResult.length > 1024 * 1024 * 4)
                stringToSave = LZString.compress(stringifyResult);
            else
                stringToSave = stringifyResult;

            // console.log('storing ' + dataName + ', ' + valueName + '. length=' + stringToSave.length);
            localStorage[this.sessionDataPrefix + this.SEP
                + this.session
                + this.SEP + dataName
                + this.SEP + valueName] = stringToSave;
        }

        getFromStorage<TResult>(
            dataName: string,
            valueName: string,
            reviver?: (key: any, value: any, state: any) => any,
            state?: any): TResult {

            console.assert(this.session && this.session != '');

            var statefulReviver;
            if (reviver)
                statefulReviver = function (key: any, value: any): any {
                    return reviver(key, value, state);
                };
            else
                statefulReviver = null;

            // console.log("[getFromStorage]", this.session
            //     + this.SEP + dataName
            //     + this.SEP + valueName);
            var storedResult = localStorage[
                this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName];

            if (storedResult && storedResult != "undefined") {
                // we try to detect whether the string was compressed or not. Given that it is 
                // JSON, we would expect it to begin with either a quote, a bracket, or a curly-brace
                var parseText;
                if ("\"'[{0123456789".indexOf(storedResult[0]) >= 0)
                    parseText = storedResult;
                else
                    parseText = LZString.decompress(storedResult);

                return <TResult>JSON.parse(parseText, statefulReviver);
            }
            else {
                return undefined;
            }
        }
        
        removeFromStorage(dataName: string, valueName: string): void {
            // console.log('saveNodeTable', table, this.session + this.SEP + dataname + this.SEP + this.NODE_TABLE);
            localStorage.removeItem(this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName);
        }
        //
        // end storage primitives //////////////////////////////

        // GRAPH

        getGraph(session: string, dataname: string): DynamicGraph {
            this.session = session;
            if (!this.dynamicGraph || this.dynamicGraph.name != dataname) {
                this.dynamicGraph = new DynamicGraph();
                this.dynamicGraph.loadDynamicGraph(this, dataname);
                //this.dynamicGraph.initDynamicGraph(this.getData(this.session, dataname));
                // CACHEGRAPH read graph from localstorage
                // 
            }
            return this.dynamicGraph;
        }


        isSchemaWellDefined(data:DataSet): boolean {
            console.log('isSchemaWellDefined');
            if (data.locationTable && !isValidIndex(data.locationSchema.id))
                return false;
            if (data.nodeTable.length > 0 && !isValidIndex(data.nodeSchema.id))
                return false;
            if (data.linkTable.length > 0
                && !(isValidIndex(data.linkSchema.id)
                    && isValidIndex(data.linkSchema.source)
                    && isValidIndex(data.linkSchema.target)))
                return false;

            return true;
        }
    }
    
    export function getDefaultNodeSchema(): NodeSchema {
        return new NodeSchema(0);
    }
    export function getDefaultLinkSchema(): LinkSchema {
        return new LinkSchema(0, 1, 2);
    }
    export function getDefaultLocationSchema(): LocationSchema {
        return new LocationSchema(0, 1, 2, 3, 4);
    }

    // data set / graph with name
    export class DataSet {
        name: string;
        nodeTable: any[];
        linkTable: any[];
        locationTable: any[] = [];
        nodeSchema: NodeSchema;
        linkSchema: LinkSchema;
        locationSchema: LocationSchema;
        selections: Selection[] = [] //predefined selections (not link type)
        timeFormat: string;

        // constructor(name:string, nodeTable:any[], linkTable:any[], nodeSchema:NodeSchema, linkSchema:LinkSchema, locationTable?:any, locationSchema?:LocationSchema){
        constructor(params?) {
            if(params == undefined)
                return;
            
            this.name = params.name;
            this.nodeTable = params.nodeTable;
            this.linkTable = params.linkTable;

            if (params.nodeSchema == undefined)
                this.nodeSchema = getDefaultNodeSchema();
            else
                this.nodeSchema = params.nodeSchema;

            if (params.linkSchema == undefined)
                this.linkSchema = getDefaultLinkSchema();
            else
                this.linkSchema = params.linkSchema;

            if (params.locationTable != undefined)
                this.locationTable = params.locationTable;

            if (params.locationSchema == undefined)
                this.locationSchema = getDefaultLocationSchema();
            else
                this.locationSchema = params.locationSchema;

            console.log('[n3] data set created', this);
        }
    }

    export class TableSchema {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
    }

    // default node schema for node table
    export class NodeSchema extends TableSchema {
        id: number;
        label: number;
        time: number;
        location: number;
        nodeType: number;
        constructor(id: number) {
            super('nodeSchema');
            this.id = id;
        }
    }

    // default node schema for link table
    export class LinkSchema extends TableSchema {
        id: number;
        source: number;
        target: number;
        weight: number;
        linkType: number = -1;
        directed: number = -1;
        time: number = -1
        // source_location: number = -1;
        // target_location: number = -1;
        constructor(id: number, source: number, target: number) {
            super('linkSchema');
            this.source = source;
            this.target = target;
            this.id = id;
        }
    }
    export class LocationSchema extends TableSchema {
        id: number;
        label: number; // user given label
        geoname: number = -1; // actual geo name (english)
        longitude: number = -1;
        latitude: number = -1;
        x: number = -1;
        y: number = -1;
        z: number = -1;
        radius: number = -1;

        constructor(
            id: number,
            label: number,
            geoname?: number,
            longitude?: number,
            latitude?: number,
            x?: number,
            y?: number,
            z?: number,
            radius?: number) {

            super('locationSchema');
            
            this.id = id;
            this.label = label;
            
            if (isValidIndex(geoname))
                this.geoname = geoname;
            if (isValidIndex(longitude))
                this.longitude = longitude;
            if (isValidIndex(latitude))
                this.latitude = latitude;
            if (isValidIndex(x))
                this.x = x;
            if (isValidIndex(y))
                this.y = y;
            if (isValidIndex(z))
                this.z = z;
            if (isValidIndex(radius))
                this.radius = radius;
        }
    }
}
