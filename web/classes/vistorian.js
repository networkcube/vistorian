/// <reference path="./storage.ts"/>
/// <reference path="../../core/networkcube.d.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
Convenient class that provides an API to the vistorian "framework"
and the user data.
This API should be used in every visualization.
*/
// function vistorian(){
// 	function getSchema(tableName){
// 		// return getUrlVars()[tableName]
// 	 //        .replace('[', '')
// 	 //        .replace(']', '')
// 	 //        .split(',')
// 	  var schema = getUrlVars()['schema']
// 	  schema = schema.replace(/%22/g, '"').replace(/%20/g, '_')
// 	  schema = JSON.parse(schema);
// 	  return schema;
// 	}
// }
var vistorian;
(function (vistorian) {
    // LOADING FONTS:
    var head = $('head');
    head.append("<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300italic,700,300&subset=latin,latin-ext' rel='stylesheet' type='text/css'></head>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Great+Vibes' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Playfair+Display' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Amatic+SC:400,700' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Caveat' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=IM+Fell+English' rel='stylesheet' type='text/css'>");
    // append('./lib/xml2json.js');
    function append(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $("head").append(script);
    }
    var tables = [];
    // DATA TYPES
    var VTable = /** @class */ (function () {
        function VTable(name, data) {
            this.name = name;
            this.data = data;
        }
        return VTable;
    }());
    vistorian.VTable = VTable;
    var VTableSchema = /** @class */ (function () {
        function VTableSchema(name) {
            this.name = name;
        }
        return VTableSchema;
    }());
    vistorian.VTableSchema = VTableSchema;
    var VNodeSchema = /** @class */ (function (_super) {
        __extends(VNodeSchema, _super);
        function VNodeSchema() {
            var _this = _super.call(this, 'userNodeSchema') || this;
            _this.relation = []; // relationships defined in a node table (e.g. father, mother..)
            _this.location = -1; // location of node
            _this.id = 0;
            _this.label = -1;
            _this.time = -1;
            _this.nodeType = -1;
            return _this;
        }
        ;
        return VNodeSchema;
    }(VTableSchema));
    vistorian.VNodeSchema = VNodeSchema;
    var VLinkSchema = /** @class */ (function (_super) {
        __extends(VLinkSchema, _super);
        function VLinkSchema() {
            var _this = _super.call(this, 'userLinkSchema') || this;
            _this.location_source = -1; // location of source node
            _this.location_target = -1; // location of target node
            _this.id = 0;
            _this.source = -1;
            _this.target = -1;
            _this.weight = -1;
            _this.time = -1;
            _this.linkType = -1;
            return _this;
        }
        ;
        return VLinkSchema;
    }(VTableSchema));
    vistorian.VLinkSchema = VLinkSchema;
    var VLocationSchema = /** @class */ (function (_super) {
        __extends(VLocationSchema, _super);
        function VLocationSchema() {
            var _this = _super.call(this, 'userLocationSchema') || this;
            _this.id = 0;
            _this.label = 1;
            _this.geoname = 2;
            _this.longitude = 3;
            _this.latitude = 4;
            return _this;
        }
        ;
        return VLocationSchema;
    }(VTableSchema));
    vistorian.VLocationSchema = VLocationSchema;
    // this represents a network the user created, including
    // - the originally formatted tables
    // - the node and edge schemas on those tables
    // - the networkcube data set with the normalized tables
    var Network = /** @class */ (function () {
        function Network(id) {
            // networkCubeDataSet: networkcube.DataSet;
            this.networkConfig = 'both';
            this.id = id;
            this.userNodeSchema = new VNodeSchema();
            this.userLinkSchema = new VLinkSchema();
            this.ready = false;
        }
        return Network;
    }());
    vistorian.Network = Network;
    // FUNCTIONS
    function loadCSV(files, callBack, sessionid) {
        var loadCount = 0;
        var table;
        var tables = [];
        var fileContents = [];
        var readers = [];
        for (var i = 0, f; f = files[i]; i++) {
            // f.name = f.name.replace(/\s/g, '_');
            console.log('f.name: ', f.name);
            var reader = new FileReader();
            reader.filename = f.name.replace(/\s/g, '_').split('_')[0];
            readers[i] = reader;
            reader.onload = function (f) {
                var obj = {
                    content: f.target.result,
                    name: f.target.filename
                };
                var i = readers.indexOf(f.target);
                fileContents[i] = obj;
                var content = fileContents[i].content.replace(', "', ',"').replace('" ,', '",');
                table = new VTable(
                // eliminate spaces in the name because they will 
                // interfere with creating html element ids
                // clean ', "'
                files[i].name.replace('.csv', '').replace(/\s/g, '_').trim(), Papa.parse(content).data);
                // console.log('>', table.data[59])
                // remove white spaces, extra cols and rows etc..
                formatTable(table);
                storage.saveUserTable(table, sessionid);
                loadCount++;
                // console.log(loadCount, files.length);
                if (loadCount == files.length)
                    callBack();
            };
            reader.readAsText(f);
        }
    }
    vistorian.loadCSV = loadCSV;
    function exportTableCSV(table) {
        // console.log(table.data);
        var csv = Papa.unparse(table.data, { quotes: true });
        var textFileAsBlob = new Blob([csv], { type: 'text/csv' });
        var fileNameToSaveAs = table.name + '.csv';
        var downloadLink = document.createElement('a');
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }
    vistorian.exportTableCSV = exportTableCSV;
    function exportLocationTableCSV(networkname, table) {
        var csv = Papa.unparse(table, { quotes: true });
        var textFileAsBlob = new Blob([csv], { type: 'text/csv' });
        var fileNameToSaveAs = networkname + '-locations.csv';
        var downloadLink = document.createElement('a');
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }
    vistorian.exportLocationTableCSV = exportLocationTableCSV;
    // Cleans and formats the data as it comes from the user,
    // for proper display and processing.
    // - trim
    // - add line numbers
    function formatTable(table) {
        var data = [];
        var indexify = !(table.data[0][0] == 'ID'
            || table.data[0][0] == 'id'
            || table.data[0][0] == 'Id'
            || table.data[0][0] == 'Index'
            || table.data[0][0].includes('index')
            || table.data[0][0].includes('Index'));
        // var indexify = false;
        // test
        // if(Number(table.data[1][0]) == NaN){
        // 	indexify = true;
        // }	
        var numCols = table.data[0].length;
        var emptyCols = 0;
        var row;
        for (var i = 0; i < table.data.length; i++) {
            row = [];
            emptyCols = 0;
            if (indexify) {
                if (i == 0)
                    row.push('Index');
                else
                    row.push((i - 1) + '');
            }
            for (var j = 0; j < numCols; j++) {
                if (table.data[i][j] == undefined) {
                    table.data[i][j] = '';
                }
                if (table.data[i][j].length == 0) {
                    emptyCols++;
                }
                row.push(table.data[i][j].trim());
            }
            if (emptyCols < numCols - 1) {
                data.push(row);
            }
        }
        table.data = data;
        return table;
    }
    vistorian.formatTable = formatTable;
    /**
     * Checks the time column in the passed table against the entered
     * time format and returns an array of fields that do not match the
     * that time format.
     * @param  {Table}  table      [description]
     * @param  {number} timeCol    [description]
     * @param  {string} timeFormat [description]
     * @return {[type]}            [description]
     */
    function checkTime(table, timeCol, timeFormat) {
        var timeString;
        var error = [];
        // console.log('table', table)
        for (var i = 0; i < table.data.length; i++) {
            timeString = table.data[i][timeCol];
            if (timeString.length == 0) {
                error.push(i);
                continue;
            }
            try {
                moment(timeString, timeFormat);
            }
            catch (err) {
                error.push(i);
            }
        }
        return error;
    }
    vistorian.checkTime = checkTime;
    var requestTimer;
    var requestsRunning = 0;
    var fullGeoNames = [];
    function updateLocationTable(userLocationTable, locationSchema, callBack) {
        saveCurrentNetwork(false);
        var data = userLocationTable.data;
        requestsRunning = 0;
        fullGeoNames = [];
        for (var i = 1; i < data.length; i++) {
            // console.log('send update request ', data[i][locationSchema.geoname])
            updateEntryToLocationTableOSM(i, data[i][locationSchema.geoname], userLocationTable, locationSchema);
        }
        // wait for all requests to be returned, until continue
        requestTimer = setInterval(function () {
            currentNetwork.userLocationTable = userLocationTable;
            checkRequests(callBack, []);
        }, 500);
    }
    vistorian.updateLocationTable = updateLocationTable;
    function checkRequests(callBack, locationsFound) {
        if (requestsRunning == 0) {
            clearInterval(requestTimer);
            callBack(locationsFound);
        }
    }
    // function updateEntryToLocationTable(index: number, geoname: string, locationTable: VTable, locationSchema: networkcube.LocationSchema) {
    //     return updateEntryToLocationTableOSM(index, geoname, locationTable, locationSchema);
    // }
    /// [bbach]: function deprecated since switched to open-street-map webservice.
    // function updateEntryToLocationTableDariah(index: number, geoname: string, locationTable: VTable, locationSchema: networkcube.LocationSchema) {
    //     geoname = geoname.trim();
    //     fullGeoNames.push(geoname);
    //     // get coordinates for name: 
    //     console.log('url', "http://ref.dariah.eu/tgnsearch/tgnquery2.xql?ac=" + geoname.split(',')[0].trim())
    //     var xhr = $.ajax({
    //         url: "http://ref.dariah.eu/tgnsearch/tgnquery2.xql?ac=" + geoname.split(',')[0].trim(),
    //         dataType: 'xml'
    //     })
    //         .done(function(data, text, XMLHttpRequest) {
    //             var data = x2js.xml2json(data);
    //             var entry;
    //             var length;
    //             var rowIndex = XMLHttpRequest.uniqueId + 1;
    //             var userLocationLabel = locationTable.data[rowIndex][locationSchema.label];
    //             if (data.response.term != undefined) {
    //                 // get all results
    //                 var validResults = []
    //                 var result;
    //                 // console.log('data.response.term',data.response.term)
    //                 if (data.response.term[0] != undefined) {
    //                     for (var i = 0; i < data.response.term.length; i++) {
    //                         entry = data.response.term[i];
    //                         if (entry == undefined)
    //                             continue;
    //                         if (entry.longitude != undefined
    //                             && entry.latitude != undefined
    //                             && typeof entry.longitude == 'string'
    //                             && typeof entry.latitude == 'string'
    //                         ) {
    //                             validResults.push(entry);
    //                         }
    //                     }
    //                 } else {
    //                     validResults.push(data.response.term);
    //                 }
    //                 // if no results returned, save the user location name and return;
    //                 if (validResults.length == 0) {                    // no value
    //                     locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, undefined, undefined];
    //                     return;
    //                 }
    //                 if (validResults.length == 1) {
    //                     // if only one valid result has been returned, add this single result
    //                     // locationTable.data.push([locationTable.data.length-1, userLocationLabel, geoname, validResults[0].longitude, validResults[0].latitude])	
    //                     locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, validResults[0].longitude, validResults[0].latitude];
    //                     return;
    //                 }
    //                 else {
    //                     // look for specification in the user input that matches the geographical hiearachy of the result
    //                     console.log('multiple results found')
    //                     // trim user specifications
    //                     var geonameAttributes = fullGeoNames[rowIndex - 1];
    //                     geonameAttributes = geonameAttributes.split(',');
    //                     for (var j = 0; j < geonameAttributes.length; j++) {
    //                         geonameAttributes[j] = geonameAttributes[j].trim();
    //                     }
    //                     var regionTerms;
    //                     // look for every valid result
    //                     for (var i = 0; i < validResults.length; i++) {
    //                         regionTerms = validResults[i].path.split('|');
    //                         // trim result terms
    //                         for (var j = 0; j < regionTerms.length; j++) {
    //                             regionTerms[j] = regionTerms[j].trim();
    //                         }
    //                         // do terms match?
    //                         if (geonameAttributes.length > 1 && regionTerms.length > 1) {
    //                             for (var j = 1; j < geonameAttributes.length; j++) {
    //                                 for (var k = 1; k < regionTerms.length; k++) {
    //                                     if (geonameAttributes[j] == regionTerms[k]) {
    //                                         locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, validResults[i].longitude, validResults[i].latitude];
    //                                         console.log('update', geoname, validResults[i].longitude, validResults[i].latitude);
    //                                         return;
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, validResults[0].longitude, validResults[0].latitude];
    //                     console.log('update', geoname, validResults[0].longitude, validResults[0].latitude);
    //                 }
    //             } else {
    //                 // if answer is valid, means that webservice didn't find that name. 
    //                 if (geoname == '')
    //                     return;
    //                 locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, undefined, undefined];
    //                 console.log('update', geoname, undefined, undefined);
    //             }
    //         })
    //         .always(function() {
    //             requestsRunning--;
    //         });
    //     xhr['uniqueId'] = requestsRunning++;
    // }
    function updateEntryToLocationTableOSM(index, geoname, locationTable, locationSchema) {
        geoname = geoname.trim();
        fullGeoNames.push(geoname);
        var xhr = $.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            data: { format: "json", limit: "1", q: geoname.split(',')[0].trim() },
            dataType: 'json'
        })
            .done(function (data, text, XMLHttpRequest) {
            var entry;
            var length;
            var rowIndex = XMLHttpRequest.uniqueId + 1;
            var userLocationLabel = locationTable.data[rowIndex][locationSchema.label];
            if (data.length != 0) {
                var validResults = [];
                var result;
                for (var i = 0; i < data.length; i++) {
                    entry = data[i];
                    if (entry == undefined)
                        continue;
                    if ('lon' in entry &&
                        'lat' in entry &&
                        typeof entry.lon === 'string' &&
                        typeof entry.lat === 'string') {
                        validResults.push(entry);
                    }
                }
                if (validResults.length == 0) {
                    locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, undefined, undefined];
                    return;
                }
                locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, validResults[0].lon, validResults[0].lat];
            }
            else {
                if (geoname == '')
                    return;
                locationTable.data[rowIndex] = [rowIndex - 1, userLocationLabel, geoname, undefined, undefined];
                // console.log('update', geoname, undefined, undefined);
            }
        })
            .always(function () {
            requestsRunning--;
        });
        xhr['uniqueId'] = requestsRunning++;
    }
    function cleanTable(table) {
        // trim entries
        var emptyColBool = [];
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                if (table[i][j] != undefined)
                    table[i][j] = table[i][j].trim();
            }
        }
    }
    vistorian.cleanTable = cleanTable;
    function setHeader(elementId, datasetname) {
        var header = $('<a href="../index.html"><img width="100%" src="../logos/logo-networkcube.png"/></a>');
        $('#' + elementId).append(header);
        var dataname = $('\
        <p style="margin:5px;background-color:#eeeeee;border-radius:2px;padding-left:10px;padding:5px;"><b>Data:</b> ' + datasetname + '</h2>');
        $('#' + elementId).append(dataname);
        var vars = networkcube.getUrlVars();
        // VS: Clicks on Return to DataView
        // trace.event("system", "ts_ReturnDV", "CCC", "DDD");
        $('#' + elementId).append('<a href="../dataview.html?session=' + vars['session'] + '&datasetName' + vars['datasetName'] + '" style="margin:5px;padding-left:5px;" onclick="trace.event(\'system\', \'ts_ReturnDV\', \'CCC\', \'DDD\');" target="_blank">Return to Dataview</a>');
        $('#' + elementId).append('<br/><br/>');
    }
    vistorian.setHeader = setHeader;
    function exportNetwork(network) {
        // // CONVERT NODES
        // var nodeTable = network.networkCubeDataSet.nodeTable;
        // var nodeSchema = network.networkCubeDataSet.nodeSchema;
        // var nodes = [];
        // var n;
        // for(var i=0 ; i <nodeTable.length ; i++){
        //     n = new Object();
        //     for( var prop in nodeSchema){
        //         if(!prop.startsWith('name') && nodeSchema[prop] != null)
        //             n[prop] = nodeTable[i][nodeSchema[prop]]                
        //     }
        //     nodes.push(n)
        // }
        // // CONVERT LINKS
        // var linkTable = network.networkCubeDataSet.linkTable;
        // var linkSchema = network.networkCubeDataSet.linkSchema;
        // var links = [];
        // var n;
        // for(var i=0 ; i <linkTable.length ; i++){
        //     n = new Object();
        //     for( var prop in linkSchema){
        //         if(!prop.startsWith('name') && linkSchema[prop] != null)
        //             n[prop] = linkTable[i][linkSchema[prop]]                
        //     }
        //     links.push(n)
        // }
        // var blurb = {
        //     nodes:nodes, 
        //     links:links
        // }
        var blurb = network;
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(blurb)));
        element.setAttribute('download', network.name + '.vistorian');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    vistorian.exportNetwork = exportNetwork;
    function importData(network, session) {
        storage.saveNetwork(network, session);
    }
    vistorian.importData = importData;
    function importIntoNetworkcube(currentNetwork, sessionid, s) {
        currentNetwork.ready = false;
        var userLinkSchema;
        if (currentNetwork.userLinkSchema) {
            userLinkSchema = currentNetwork.userLinkSchema;
        }
        var userNodeSchema;
        if (currentNetwork.userNodeSchema) {
            userNodeSchema = currentNetwork.userNodeSchema;
        }
        // check minimal conditions to create and import a network
        if (!((currentNetwork.userLinkSchema.source > -1
            && currentNetwork.userLinkSchema.target > -1)
            || (currentNetwork.userNodeSchema.label > -1
                && currentNetwork.userNodeSchema.relation.length > -1))) {
            // nothing to import at this point as no schemas defined
            return;
        }
        // trim cell entries (remove overhead white space)
        if (currentNetwork.userNodeTable) {
            vistorian.cleanTable(currentNetwork.userNodeTable.data);
        }
        if (currentNetwork.userLinkTable) {
            vistorian.cleanTable(currentNetwork.userLinkTable.data);
        }
        // Start with empty normalized tables
        var normalizedNodeTable = [];
        var normalizedLinkTable = [];
        // get standard schemas
        var normalizedNodeSchema;
        var normalizedLinkSchema;
        // INITIALZE NORMALIZED SCHEMAS WITH USER'S ATTRIBUTES
        // INIT NODE SCHEMA
        normalizedNodeSchema = new networkcube.NodeSchema(0);
        // required attributes
        normalizedNodeSchema.id = 0;
        normalizedNodeSchema.label = 1;
        var nodeColCount = 2;
        if (currentNetwork.userNodeSchema) {
            for (var p in currentNetwork.userNodeSchema) {
                if (currentNetwork.userNodeSchema.hasOwnProperty(p)
                    && currentNetwork.userNodeSchema[p] > -1
                    && p != 'id'
                    && p != 'label'
                    && p != 'relation'
                    && currentNetwork.userNodeSchema[p].length > 0) {
                    normalizedNodeSchema[p] = nodeColCount++;
                }
            }
        }
        // INIT LINK SCHEMA
        normalizedLinkSchema = new networkcube.LinkSchema(0, 1, 2);
        // required attributes
        normalizedLinkSchema.id = 0;
        normalizedLinkSchema.source = 1;
        normalizedLinkSchema.target = 2;
        var linkColCount = 3;
        if (currentNetwork.userLinkSchema) {
            for (var p in currentNetwork.userLinkSchema) {
                if (currentNetwork.userLinkSchema.hasOwnProperty(p)
                    && currentNetwork.userLinkSchema[p] > -1
                    && p != 'id'
                    && p != 'source'
                    && p != 'target'
                    && p != 'location_source'
                    && p != 'location_source') {
                    normalizedLinkSchema[p] = linkColCount++;
                }
            }
        }
        console.log('NORMALIZED NODE SCHEMA: ', normalizedNodeSchema);
        console.log('NORMALIZED LINK SCHEMA: ', normalizedLinkSchema);
        //  EXTRACT LOCATIONS FROM USER LOCATION TABLE, IF PRESENT
        var locationLabels = [];
        if (currentNetwork.userLocationTable) {
            // store all locations for easy index lookup
            for (var i = 1; i < currentNetwork.userLocationTable.data.length; i++) {
                locationLabels.push(currentNetwork.userLocationTable.data[i][currentNetwork.userLocationSchema.label]);
            }
        }
        ///////////////////////////////
        // PROCESS SINGLE NODE-TABLE //
        ///////////////////////////////
        if (currentNetwork.userLinkTable == undefined
            && currentNetwork.userNodeTable != undefined) {
            // create link table and fill
            // console.log('nodeData', nodeData)
            var id;
            var relCol;
            var newNodeRow;
            var newLinkRow;
            var rowNum;
            var userNodeTable = currentNetwork.userNodeTable.data;
            // networkcubeLinkSchema = new networkcube.LinkSchema(0, 1, 2)
            var colCount = 3;
            normalizedLinkSchema.linkType = colCount++;
            if (networkcube.isValidIndex(userNodeSchema.time)) {
                normalizedLinkSchema.time = colCount++;
            }
            // if(networkcube.isValidIndex(userNodeSchema.time))
            // {
            //     normalizedNodeSchema.time = colCount++;
            // }
            // if(networkcube.isValidIndex(userNodeSchema.nodeType))
            // {
            //     normalizedNodeSchema.nodeType = colCount++;
            // }
            // if(networkcube.isValidIndex(userNodeSchema.location))
            // {
            //     normalizedNodeSchema.location = colCount++;
            // }
            // In the normalized node table, create one row for each row in the node table, 
            // if name does not already exists
            var nodeLabels = [];
            var nodeIds = [];
            for (var i = 1; i < userNodeTable.length; i++) {
                newRow = [0, 0];
                id = parseInt(userNodeTable[i][userNodeSchema.id]);
                nodeIds.push(id);
                newRow[normalizedNodeSchema.id] = id;
                newRow[normalizedNodeSchema.label] = userNodeTable[i][userNodeSchema.label];
                nodeLabels.push(userNodeTable[i][userNodeSchema.label]);
                normalizedNodeTable.push(newRow);
            }
            // console.log('Create new links: ' + (nodeData.length * nodeSchema.relation.length), nodeData, nodeSchema.relation)
            // create a node row for each node in a relation field 
            // that does not yet has an entry in the node table.
            // Plus, create a link in the link table.
            for (var i = 1; i < userNodeTable.length; i++) {
                // Iterate through all relation columns
                var row;
                var sourceId;
                var targetId;
                // console.log('userNodeSchema.relation.length', userNodeSchema.relation.length)
                for (var j = 0; j < userNodeSchema.relation.length; j++) {
                    row = userNodeTable[i];
                    relCol = userNodeSchema.relation[j];
                    sourceId = nodeIds[i - 1];
                    // dont create relation if field entry is empty;
                    if (row[relCol].length == 0)
                        continue;
                    // check if node already exist
                    rowNum = nodeLabels.indexOf(row[relCol]);
                    if (rowNum < 0) {
                        // create new node in node table
                        newNodeRow = [0, 0];
                        newNodeRow[normalizedNodeSchema.id] = normalizedNodeTable.length;
                        nodeIds.push(normalizedNodeTable.length - 1);
                        nodeLabels.push(row[relCol]);
                        newNodeRow[normalizedNodeSchema.label] = row[relCol];
                        normalizedNodeTable.push(newNodeRow);
                        targetId = normalizedNodeTable.length - 1;
                    }
                    else {
                        // targetId = nodeIds[rowNum]
                        targetId = rowNum;
                        // targetId = nodeLabels.indexOf(row[relCol]);
                    }
                    // create entry in link table
                    newLinkRow = [];
                    for (var k = 0; k < colCount; k++) {
                        newLinkRow.push('');
                    }
                    // console.log('CREATE LINK', sourceId, targetId)
                    newLinkRow[normalizedLinkSchema.id] = normalizedLinkTable.length;
                    newLinkRow[normalizedLinkSchema.source] = sourceId;
                    newLinkRow[normalizedLinkSchema.target] = targetId;
                    newLinkRow[normalizedLinkSchema.linkType] = userNodeTable[0][relCol]; // set column header as relation type
                    if (networkcube.isValidIndex(userNodeSchema.time))
                        newLinkRow[normalizedLinkSchema.time] = row[userNodeSchema.time];
                    normalizedLinkTable.push(newLinkRow);
                }
            }
            // console.log('normalizedLinkTable', normalizedLinkTable)
        }
        ///////////////////////////////
        // PROCESS SINGLE LINK-TABLE //
        ///////////////////////////////
        var nodeNames = [];
        if (currentNetwork.userNodeTable == undefined
            && currentNetwork.userLinkTable != undefined) {
            // console.log('Create node table from scratch')
            var nodeLocations = [];
            var nodeTimes = [];
            var nodeTypes = [];
            var userLinkData = currentNetwork.userLinkTable.data;
            var sourceId;
            var targetId;
            var nodeName;
            var locationName;
            var timeString;
            var timeFormatted;
            // for( var p in userLinkSchema){
            //     if(userLinkSchema.hasOwnProperty(p)
            //     && userLinkSchema[p] > -1)
            //     {
            //         normalizedLinkSchema[p] = userLinkSchema[p];
            //     }
            // }
            // Extract node labels and create (simple) normalized node table
            var row;
            for (var i = 1; i < userLinkData.length; i++) {
                // source
                nodeName = userLinkData[i][userLinkSchema.source];
                if (nodeNames.indexOf(nodeName) < 0) {
                    row = [nodeNames.length, nodeName];
                    nodeNames.push(nodeName);
                    normalizedNodeTable.push(row);
                }
                // target
                nodeName = userLinkData[i][userLinkSchema.target];
                if (nodeNames.indexOf(nodeName) < 0) {
                    row = [nodeNames.length, nodeName];
                    nodeNames.push(nodeName);
                    normalizedNodeTable.push(row);
                }
            }
        }
        // At this point, there is a normalzied node table
        // if the user has not specified any link table, a normalized  
        // link table has been created above. 
        // If he has provided a link table, it is traversed below and 
        // the references to node names are put into place.
        if (currentNetwork.userLinkTable != undefined) {
            // create normalized link table and replace source/target label by source/target id
            normalizedLinkTable = [];
            var newRow;
            var linkTime;
            var found = true;
            var userLinkData = currentNetwork.userLinkTable.data;
            for (var i = 1; i < userLinkData.length; i++) {
                newRow = [];
                for (var k = 0; k < linkColCount; k++) {
                    newRow.push('');
                }
                for (var p in userLinkSchema) {
                    if (userLinkSchema.hasOwnProperty(p)
                        && userLinkSchema[p] > -1) {
                        newRow[normalizedLinkSchema[p]] = userLinkData[i][userLinkSchema[p]];
                    }
                }
                sourceId = nodeNames.indexOf(userLinkData[i][userLinkSchema.source]);
                newRow[normalizedLinkSchema.source] = sourceId;
                targetId = nodeNames.indexOf(userLinkData[i][userLinkSchema.target]);
                newRow[normalizedLinkSchema.target] = targetId;
                normalizedLinkTable.push(newRow);
            }
            // check if location and time information exists for nodes
            var time;
            var locationsFound = false;
            var timeFound = false;
            if (networkcube.isValidIndex(userLinkSchema.location_source)
                || networkcube.isValidIndex(userLinkSchema.location_target)) {
                // set location schema index to next new column
                normalizedNodeSchema.location = nodeColCount++;
                // append new field to each row in node table
                for (var i = 0; i < normalizedNodeTable.length; i++) {
                    normalizedNodeTable[i].push('');
                }
                // FYI: node table has now at least 3 rows (id, name, location)
                if (networkcube.isValidIndex(userLinkSchema.time)) {
                    // set time schema index to next new column
                    normalizedNodeSchema.time = nodeColCount++;
                    // append new field to each row in node table
                    for (var i = 0; i < normalizedNodeTable.length; i++) {
                        normalizedNodeTable[i].push('');
                    }
                    // FYI: node table has now at least 4 rows (id, name, location, time)
                }
                // insert locations and ev. times into node table, as found in linktable
                for (var i = 1; i < userLinkData.length; i++) {
                    var nodeRow, rowToDuplicate;
                    // do for source location
                    nodeName = userLinkData[i][userLinkSchema.source];
                    if (networkcube.isValidIndex(userLinkSchema.location_source)
                        && userLinkData[i][userLinkSchema.location_source]
                        && userLinkData[i][userLinkSchema.location_source] != '') {
                        var len = normalizedNodeTable.length;
                        for (var j = 0; j < len; j++) {
                            nodeRow = normalizedNodeTable[j];
                            if (nodeRow[normalizedNodeSchema.label] == nodeName) {
                                rowToDuplicate = undefined;
                                if (networkcube.isValidIndex(normalizedNodeSchema.time)) {
                                    // if there is already a time but no location,  
                                    if (nodeRow[normalizedNodeSchema.time] == userLinkData[i][userLinkSchema.time]) {
                                        if (nodeRow[normalizedNodeSchema.location] && nodeRow[normalizedNodeSchema.location] != '') {
                                            rowToDuplicate = undefined;
                                        }
                                        else {
                                            rowToDuplicate = nodeRow;
                                        }
                                        // nothing here node has already a location for this time, continue with next row.
                                        j = len; // go to end of table
                                        break;
                                    }
                                    else {
                                        rowToDuplicate = nodeRow;
                                    }
                                }
                                else {
                                    // just insert, no dupliation required
                                    nodeRow[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_source];
                                    j = len; // go to end of table
                                    break;
                                }
                            }
                        }
                        if (rowToDuplicate) {
                            if (rowToDuplicate[normalizedNodeSchema.location] == '') {
                                rowToDuplicate[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_source];
                                rowToDuplicate[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                            }
                            else {
                                var newRowNode = [];
                                for (var c = 0; c < rowToDuplicate.length; c++) {
                                    newRowNode.push(rowToDuplicate[c]);
                                }
                                newRowNode[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_source];
                                newRowNode[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                                normalizedNodeTable.push(newRowNode);
                            }
                        }
                        if (locationLabels.indexOf(userLinkData[i][userLinkSchema.location_source]) == -1) {
                            locationLabels.push(userLinkData[i][userLinkSchema.location_source]);
                        }
                    }
                    // do for target location
                    nodeName = userLinkData[i][userLinkSchema.target];
                    if (networkcube.isValidIndex(userLinkSchema.location_target)
                        && userLinkData[i][userLinkSchema.location_target]
                        && userLinkData[i][userLinkSchema.location_target] != '') {
                        var len = normalizedNodeTable.length;
                        for (var j = 0; j < len; j++) {
                            nodeRow = normalizedNodeTable[j];
                            if (nodeRow[normalizedNodeSchema.label] == nodeName) {
                                rowToDuplicate = undefined;
                                if (networkcube.isValidIndex(normalizedNodeSchema.time)) {
                                    // if location is not empty, 
                                    if (nodeRow[normalizedNodeSchema.time] == userLinkData[i][userLinkSchema.time]) {
                                        if (nodeRow[normalizedNodeSchema.location] && nodeRow[normalizedNodeSchema.location] != '') {
                                            rowToDuplicate = undefined;
                                        }
                                        else {
                                            rowToDuplicate = nodeRow;
                                        }
                                        // nothing here node has already a location for this time, continue with next row.
                                        j = len; // go to end of table
                                        break;
                                    }
                                    else {
                                        rowToDuplicate = nodeRow;
                                    }
                                }
                                else {
                                    // just insert, no dupliation required
                                    nodeRow[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                    j = len; // go to end of table
                                    break;
                                }
                            }
                        }
                        if (rowToDuplicate) {
                            if (rowToDuplicate[normalizedNodeSchema.location] == '') {
                                rowToDuplicate[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                rowToDuplicate[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                                // console.log('LOCATION INFO: ', rowToDuplicate[normalizedNodeSchema.label], rowToDuplicate[normalizedNodeSchema.location], rowToDuplicate[normalizedNodeSchema.time])
                            }
                            else {
                                // duplicate
                                var newRowNode = [];
                                for (var c = 0; c < rowToDuplicate.length; c++) {
                                    newRowNode.push(rowToDuplicate[c]);
                                }
                                newRowNode[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                newRowNode[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                                // console.log('LOCATION INFO: ', newRowNode[normalizedNodeSchema.label], rowToDuplicate[normalizedNodeSchema.location], rowToDuplicate[normalizedNodeSchema.time])
                                normalizedNodeTable.push(newRowNode);
                            }
                        }
                        if (locationLabels.indexOf(userLinkData[i][userLinkSchema.location_target]) == -1) {
                            locationLabels.push(userLinkData[i][userLinkSchema.location_target]);
                        }
                    }
                }
            } // end of checking for node times and location in link table
        } // end of link table normalization
        // FORMAT TIMES INTO ISO STANDARD
        if (currentNetwork.hasOwnProperty('timeFormat') && currentNetwork.timeFormat != undefined && currentNetwork.timeFormat.length > 0) {
            var format = currentNetwork.timeFormat;
            if (normalizedLinkSchema.time != undefined && normalizedLinkSchema.time > -1) {
                for (var i = 0; i < normalizedLinkTable.length; i++) {
                    time = moment(normalizedLinkTable[i][normalizedLinkSchema.time], format).format(networkcube.timeFormat());
                    if (time.indexOf('Invalid') > -1)
                        time = undefined;
                    normalizedLinkTable[i][normalizedLinkSchema.time] = time;
                }
            }
            if (normalizedNodeSchema.time != undefined && normalizedNodeSchema.time > -1) {
                for (var i = 0; i < normalizedNodeTable.length; i++) {
                    time = moment(normalizedNodeTable[i][normalizedNodeSchema.time], format).format(networkcube.timeFormat());
                    if (time.indexOf('Invalid') > -1)
                        time = undefined;
                    normalizedNodeTable[i][normalizedNodeSchema.time] = time;
                }
            }
        }
        ////////////////////////////////////////////////////////////////////
        // CREATE AND NORMALIZE LOCATION TABLE IF ANY LOCATION DATA EXITS //
        ////////////////////////////////////////////////////////////////////
        var normalizedLocationSchema = networkcube.getDefaultLocationSchema();
        if (currentNetwork.userLocationTable) {
            normalizedLocationSchema = currentNetwork.userLocationSchema;
        }
        var normalizedLocationTable = [];
        var locationName;
        var row;
        // If the user has specified a location table, normalize
        // that table:
        if (currentNetwork.userLocationTable) {
            var userLocationTable = currentNetwork.userLocationTable.data;
            var userLocationSchema = currentNetwork.userLocationSchema;
            for (var i = 1; i < userLocationTable.length; i++) {
                row = [normalizedLocationTable.length, 0, 0, 0, 0];
                locationName = userLocationTable[i][userLocationSchema.label];
                row[normalizedLocationSchema.id] = locationLabels.indexOf(locationName);
                row[normalizedLocationSchema.label] = locationName;
                row[normalizedLocationSchema.geoname] = userLocationTable[i][userLocationSchema.geoname];
                row[normalizedLocationSchema.latitude] = userLocationTable[i][userLocationSchema.latitude];
                row[normalizedLocationSchema.longitude] = userLocationTable[i][userLocationSchema.longitude];
                normalizedLocationTable.push(row);
            }
        }
        // if there exist any locations, check if they are 
        // listed in the location table
        if (locationLabels.length > 0) {
            for (var i = 0; i < locationLabels.length; i++) {
                var found = false;
                for (var j = 0; j < normalizedLocationTable.length; j++) {
                    if (normalizedLocationTable[j][1] == locationLabels[i]) {
                        found = true;
                    }
                }
                if (!found) {
                    row = [normalizedLocationTable.length, 0, 0, 0, 0];
                    locationName = locationLabels[i];
                    row[normalizedLocationSchema.label] = locationName;
                    row[normalizedLocationSchema.geoname] = locationName;
                    normalizedLocationTable.push(row);
                }
            }
        }
        /// REPLACE LOCATIONS IN NODE AND LINK TABLES WITH INDICES
        // if source and target locations are available, set to indices.
        //source location
        // if (userLinkSchema.source_location > -1) 
        // {
        //     for(var i=1 ; i<userLinkData.length ; i++)
        //     {
        //         locationName = userLinkData[i][userLinkSchema.source_location].trim();
        //         id = locationLabels.indexOf(locationName);
        //         normalizedLinkTable[i-1][normalizedLinkSchema.source_location] = id;
        //     }
        // }
        // //target location
        // if (userLinkSchema.target_location > -1) 
        // {
        //     for(var i=1 ; i<userLinkData.length ; i++)
        //     {
        //         locationName = userLinkData[i][userLinkSchema.target_location].trim();
        //         id = locationLabels.indexOf(locationName);
        //         normalizedLinkTable[i-1][normalizedLinkSchema.target_location] = id;
        //     }
        // }
        if (normalizedNodeSchema.location > -1) {
            for (var i = 0; i < normalizedNodeTable.length; i++) {
                // console.log()
                locationName = normalizedNodeTable[i][normalizedNodeSchema.location].trim();
                id = locationLabels.indexOf(locationName);
                normalizedNodeTable[i][normalizedNodeSchema.location] = id;
            }
        }
        // set tables to networkcube data set:
        var dataset = new networkcube.DataSet();
        dataset.name = currentNetwork.name;
        dataset.nodeTable = normalizedNodeTable;
        dataset.linkTable = normalizedLinkTable;
        dataset.nodeSchema = normalizedNodeSchema;
        dataset.linkSchema = normalizedLinkSchema;
        dataset.locationTable = normalizedLocationTable;
        dataset.locationSchema = normalizedLocationSchema;
        dataset.timeFormat = currentNetwork.timeFormat;
        if (currentNetwork.userLocationTable) {
            currentNetwork.userLocationTable.data = [];
            currentNetwork.userLocationTable.data.push(['Id', 'User Name', 'Geoname', 'Longitude', 'Latitude']);
            for (var i = 0; i < normalizedLocationTable.length; i++) {
                currentNetwork.userLocationTable.data.push(normalizedLocationTable[i]);
            }
        }
        // make ids integer
        for (var i = 0; i < normalizedNodeTable.length; i++) {
            normalizedNodeTable[i][0] = parseInt(normalizedNodeTable[i][0]);
        }
        for (var i = 0; i < normalizedLinkTable.length; i++) {
            normalizedLinkTable[i][0] = parseInt(normalizedLinkTable[i][0]);
        }
        // currentNetwork.networkCubeDataSet.nodeTable = normalizedNodeTable;
        // currentNetwork.networkCubeDataSet.linkTable = normalizedLinkTable;
        // currentNetwork.networkCubeDataSet.linkSchema = normalizedLinkSchema;
        // currentNetwork.networkCubeDataSet.nodeSchema = normalizedNodeSchema;
        // save network on the vistorian side
        currentNetwork.ready = true;
        storage.saveNetwork(currentNetwork, sessionid);
        networkcube.setDataManagerOptions({ keepOnlyOneSession: false });
        // console.log('>> START IMPORT');
        networkcube.importData(sessionid, dataset);
        console.log('>> NETWORK IMPORTED: ', dataset);
        return dataset;
    }
    vistorian.importIntoNetworkcube = importIntoNetworkcube;
})(vistorian || (vistorian = {}));
