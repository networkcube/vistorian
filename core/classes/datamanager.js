/// <reference path="./dynamicgraph.ts"/>
/// <reference path="../scripts/lz-string.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var networkcube;
(function (networkcube) {
    var DataManager = (function () {
        function DataManager(options) {
            this.keepOnlyOneSession = false;
            this.sessionDataPrefix = "ncubesession";
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
            this.SEP = "_";
            if (options) {
                // initialize stuff differently here
                if (options.keepOnlyOneSession)
                    this.setOptions(options);
            }
            else {
                this.keepOnlyOneSession = false;
            }
        }
        DataManager.prototype.setOptions = function (options) {
            this.keepOnlyOneSession = options.keepOnlyOneSession;
        };
        // sessionDataPrefix: string = "";
        DataManager.prototype.clearSessionData = function (session) {
            var searchPrefix = this.sessionDataPrefix + this.SEP + session;
            // var searchPrefix = session;
            var keysToClear = [];
            console.log('clearSessionData');
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(searchPrefix) == 0)
                    keysToClear.push(key);
                else if (key.indexOf('connectoscope1') == 0)
                    keysToClear.push(key);
            }
            for (var i = 0; i < keysToClear.length; i++) {
                var key = keysToClear[i];
                console.log('remove from storage', key);
                localStorage.removeItem(key);
            }
        };
        DataManager.prototype.clearAllSessionData = function () {
            this.clearSessionData('');
        };
        DataManager.prototype.isSessionCached = function (session, dataSetName) {
            var prefix = this.sessionDataPrefix + this.SEP + session + this.SEP + dataSetName;
            var firstSessionKey = null;
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(prefix) == 0) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Import a data set into networkcube's local storage.
         * @param  {string}  session - current session id
         * @param  {DataSet} data    - a networkcube.DataSet
         */
        DataManager.prototype.importData = function (session, data) {
            this.session = session;
            // console.log('import data set', data.name, data.nodeTable, data.linkTable);
            // console.log('import data set', data.name, data);
            // check if all data (tables + schemas) are there
            if (!data.nodeTable && !data.linkTable) {
                console.log('Empty tables. No data imported.');
                return;
            }
            if (!data.nodeTable) {
                console.log('[n3] Node table missing!');
            }
            if (!data.linkTable) {
                console.log('[n3] Link table missing!');
            }
            if (!data.nodeSchema) {
                console.log('[n3] Node schema missing!');
            }
            if (!data.linkSchema) {
                console.log('[n3] Link schema missing!');
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
                var graphForCaching = new networkcube.DynamicGraph();
                graphForCaching.initDynamicGraph(data);
                // CACHEGRAPH store DynamicGraph in localstorage
                graphForCaching.saveDynamicGraph(this);
                // CACHEGRAPH : this code is strictly for diagnostics;
                var doubleCheckSave = false;
                if (doubleCheckSave) {
                    var testGraph = new networkcube.DynamicGraph();
                    testGraph.loadDynamicGraph(this, data.name);
                    testGraph.debugCompareTo(graphForCaching);
                }
            }
            else {
                console.log('data is not well-schematized, so not caching dynamicGraph');
            }
        };
        // NODE_TABLE: string = 'networkcube.nodetable';
        // LINK_TABLE: string = 'networkcube.linktable';
        // NODE_SCHEMA: string = 'networkcube.nodeschema';
        // LINK_SCHEMA: string = 'networkcube.linkschema';
        // LOCATION_TABLE: string = 'networkcube.locationtable';
        // LOCATION_SCHEMA: string = 'networkcube.locationschema';
        // GRAPH: string = 'networkcube.graph';
        // storage primitives /////////////////////////////////////
        //
        DataManager.prototype.saveToStorage = function (dataName, valueName, value, replacer) {
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
        };
        DataManager.prototype.getFromStorage = function (dataName, valueName, reviver, state) {
            console.assert(this.session && this.session != '');
            var statefulReviver;
            if (reviver)
                statefulReviver = function (key, value) {
                    return reviver(key, value, state);
                };
            else
                statefulReviver = null;
            // console.log("[getFromStorage]", this.session
            //     + this.SEP + dataName
            //     + this.SEP + valueName);
            var storedResult = localStorage[this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName];
            if (storedResult && storedResult != "undefined") {
                // we try to detect whether the string was compressed or not. Given that it is
                // JSON, we would expect it to begin with either a quote, a bracket, or a curly-brace
                var parseText;
                if (storedResult == "true") {
                    parseText = true;
                }
                else if (storedResult == "false") {
                    parseText = false;
                }
                else if ("\"'[{0123456789".indexOf(storedResult[0]) >= 0)
                    parseText = storedResult;
                else
                    parseText = LZString.decompress(storedResult);
                return JSON.parse(parseText, statefulReviver);
            }
            else {
                return undefined;
            }
        };
        DataManager.prototype.removeFromStorage = function (dataName, valueName) {
            // console.log('saveNodeTable', table, this.session + this.SEP + dataname + this.SEP + this.NODE_TABLE);
            localStorage.removeItem(this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName);
        };
        //
        // end storage primitives //////////////////////////////
        // GRAPH
        DataManager.prototype.getGraph = function (session, dataname) {
            this.session = session;
            if (!this.dynamicGraph || this.dynamicGraph.name != dataname) {
                this.dynamicGraph = new networkcube.DynamicGraph();
                this.dynamicGraph.loadDynamicGraph(this, dataname);
            }
            return this.dynamicGraph;
        };
        DataManager.prototype.isSchemaWellDefined = function (data) {
            console.log('isSchemaWellDefined');
            if (data.locationTable && !networkcube.isValidIndex(data.locationSchema.id))
                return false;
            if (data.nodeTable.length > 0 && !networkcube.isValidIndex(data.nodeSchema.id))
                return false;
            if (data.linkTable.length > 0
                && !(networkcube.isValidIndex(data.linkSchema.id)
                    && networkcube.isValidIndex(data.linkSchema.source)
                    && networkcube.isValidIndex(data.linkSchema.target)))
                return false;
            return true;
        };
        return DataManager;
    })();
    networkcube.DataManager = DataManager;
    function getDefaultNodeSchema() {
        return new NodeSchema(0);
    }
    networkcube.getDefaultNodeSchema = getDefaultNodeSchema;
    function getDefaultLinkSchema() {
        return new LinkSchema(0, 1, 2);
    }
    networkcube.getDefaultLinkSchema = getDefaultLinkSchema;
    function getDefaultLocationSchema() {
        return new LocationSchema(0, 1, 2, 3, 4);
    }
    networkcube.getDefaultLocationSchema = getDefaultLocationSchema;
    // data set / graph with name
    var DataSet = (function () {
        // constructor(name:string, nodeTable:any[], linkTable:any[], nodeSchema:NodeSchema, linkSchema:LinkSchema, locationTable?:any, locationSchema?:LocationSchema){
        function DataSet(params) {
            this.locationTable = [];
            this.selections = []; //predefined selections (not link type)
            if (params == undefined)
                return;
            this.name = params.name;
            this.nodeTable = params.nodeTable;
            this.linkTable = params.linkTable;
            this.directed = params.directed;
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
        return DataSet;
    })();
    networkcube.DataSet = DataSet;
    var TableSchema = (function () {
        function TableSchema(name) {
            this.name = name;
        }
        return TableSchema;
    })();
    networkcube.TableSchema = TableSchema;
    // default node schema for node table
    var NodeSchema = (function (_super) {
        __extends(NodeSchema, _super);
        function NodeSchema(id) {
            _super.call(this, 'nodeSchema');
            this.id = id;
        }
        return NodeSchema;
    })(TableSchema);
    networkcube.NodeSchema = NodeSchema;
    // default node schema for link table
    var LinkSchema = (function (_super) {
        __extends(LinkSchema, _super);
        // source_location: number = -1;
        // target_location: number = -1;
        function LinkSchema(id, source, target) {
            _super.call(this, 'linkSchema');
            this.linkType = -1;
            this.directed = -1;
            this.time = -1;
            this.source = source;
            this.target = target;
            this.id = id;
        }
        return LinkSchema;
    })(TableSchema);
    networkcube.LinkSchema = LinkSchema;
    var LocationSchema = (function (_super) {
        __extends(LocationSchema, _super);
        function LocationSchema(id, label, geoname, longitude, latitude, x, y, z, radius) {
            _super.call(this, 'locationSchema');
            this.geoname = -1; // actual geo name (english)
            this.longitude = -1;
            this.latitude = -1;
            this.x = -1;
            this.y = -1;
            this.z = -1;
            this.radius = -1;
            this.id = id;
            this.label = label;
            if (networkcube.isValidIndex(geoname))
                this.geoname = geoname;
            if (networkcube.isValidIndex(longitude))
                this.longitude = longitude;
            if (networkcube.isValidIndex(latitude))
                this.latitude = latitude;
            if (networkcube.isValidIndex(x))
                this.x = x;
            if (networkcube.isValidIndex(y))
                this.y = y;
            if (networkcube.isValidIndex(z))
                this.z = z;
            if (networkcube.isValidIndex(radius))
                this.radius = radius;
        }
        return LocationSchema;
    })(TableSchema);
    networkcube.LocationSchema = LocationSchema;
})(networkcube || (networkcube = {}));
