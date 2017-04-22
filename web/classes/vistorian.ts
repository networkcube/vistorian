/// <reference path="./storage.ts"/>
/// <reference path="../../networkcube/core/networkcube.d.ts"/>

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

module vistorian {

    // LOADING FONTS:
    var head = $('head');
    head.append("<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300italic,700,300&subset=latin,latin-ext' rel='stylesheet' type='text/css'></head>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Great+Vibes' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Playfair+Display' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Amatic+SC:400,700' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=Caveat' rel='stylesheet' type='text/css'>")
    head.append("<link href='https://fonts.googleapis.com/css?family=IM+Fell+English' rel='stylesheet' type='text/css'>")

    // append('./lib/xml2json.js');
    function append(url: string) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $("head").append(script);
    }

    var tables = [];


    // DATA TYPES

    export class VTable {
        name: string;
        data: any[];
        constructor(name: string, data: any[]) {
            this.name = name;
            this.data = data;
        }
    }

    export class VTableSchema {
        name: string;
        constructor(name: string) {
            this.name = name;
        }

    }

    export class VNodeSchema extends VTableSchema {
        relation: number[] = []; // relationships defined in a node table (e.g. father, mother..)
        location: number = -1; // location of node
        id: number = 0;
        label: number = -1;
        time: number = -1;
        nodeType: number = -1;
        constructor() {
            super('userNodeSchema')
        };
    }
    export class VLinkSchema extends VTableSchema {
        location_source: number = -1; // location of source node
        location_target: number = -1; // location of target node
        id: number = 0;
        source: number = -1;
        target: number = -1;
        weight: number = -1;
        time: number = -1;
        linkType: number = -1;
        constructor() {
            super('userLinkSchema')
        };
    }
    export class VLocationSchema extends VTableSchema {
        id: number = 0;
        label: number = 1;
        geoname: number = 2
        longitude: number = 3;
        latitude: number = 4;
        constructor() {
            super('userLocationSchema')
        };
    }

    // this represents a network the user created, including
    // - the originally formatted tables
    // - the node and edge schemas on those tables
    // - the networkcube data set with the normalized tables
    export class Network {
        id: number;
        name: string;
        userNodeTable: VTable;
        userLinkTable: VTable;
        userNodeSchema: VNodeSchema;
        userLinkSchema: VLinkSchema;
        userLocationTable: VTable;
        userLocationSchema: networkcube.LocationSchema;
        networkCubeDataSet: networkcube.DataSet;
        networkConfig:string = 'both';
        timeFormat: string;

        constructor(id: number) {
            this.id = id;
            this.userNodeSchema = new VNodeSchema();
            this.userLinkSchema = new VLinkSchema();
        }
    }




    // FUNCTIONS

    export function loadCSV(files: File[], callBack: Function, sessionid:string) {

        var loadCount = 0;
        var table
        var tables: VTable[] = [];
        var fileContents: any[] = []
        var readers: FileReader[] = [];
        for (var i = 0, f: File; f = files[i]; i++) {
            var reader = new FileReader();
            reader.filename = f.name.split('_')[0];
            readers[i] = reader;

            reader.onload = function(f) {
                var obj: Object = {
                    content: f.target.result,
                    name: f.target.filename
                }
                var i = readers.indexOf(f.target);
                fileContents[i] = obj;
                table = new VTable(
                    // eliminate spaces in the name because they will 
                    // interfere with creating html element ids
                    files[i].name.replace('.csv', '').replace(' ','_').trim(),
                    Papa.parse(fileContents[i].content).data
                )

                // remove white spaces, extra cols and rows etc..
                formatTable(table);

                storage.saveUserTable(table, sessionid);
                loadCount++;

                console.log(loadCount, files.length);
                if (loadCount == files.length)
                    callBack();
            }
            reader.readAsText(f);
        }
    }

    export function exportTableCSV(table) {
        // console.log(table.data);
        var csv = Papa.unparse(table.data, { quotes: true });
        var textFileAsBlob = new Blob([csv], { type: 'text/csv' });
        var fileNameToSaveAs = table.name + '.csv';
        var downloadLink = document.createElement('a');
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }

    export function exportLocationTableCSV(networkname, table) {
        var csv = Papa.unparse(table, { quotes: true });
        var textFileAsBlob = new Blob([csv], { type: 'text/csv' });
        var fileNameToSaveAs = networkname + '-locations.csv';
        var downloadLink = document.createElement('a');
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }


    // Cleans and formats the data as it comes from the user,
    // for proper display and processing.
    // - trim
    // - add line numbers
    export function formatTable(table) {

        var data: any[] = [];
        var indexify: boolean =
            !(table.data[0][0] == 'ID'
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

        var numCols: number = table.data[0].length;
        var emptyCols: number = 0;
        var row: any[]
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
                data.push(row)
            }
        }
        table.data = data;
        return table
    }


	/**
	 * Checks the time column in the passed table against the entered
	 * time format and returns an array of fields that do not match the
	 * that time format.
	 * @param  {Table}  table      [description]
	 * @param  {number} timeCol    [description]
	 * @param  {string} timeFormat [description]
	 * @return {[type]}            [description]
	 */
    export function checkTime(table: VTable, timeCol: number, timeFormat: string): number[] {
        var timeString: string;
        var error: number[] = [];
        console.log('table', table)
        for (var i = 0; i < table.data.length; i++) {
            timeString = table.data[i][timeCol];

            if (timeString.length == 0) {
                error.push(i);
                continue;
            }
            try {
                moment(timeString, timeFormat);
            } catch (err) {
                error.push(i);
            }
        }
        return error;
    }

    var requestTimer;
    var requestsRunning: number = 0;
    var fullGeoNames = []
   
   export function updateLocationTable(userLocationTable: VTable, locationSchema: networkcube.LocationSchema, callBack: Function) {
        saveCurrentNetwork(false);
        var data = userLocationTable.data;
        requestsRunning = 0;
        fullGeoNames = [];
        for (var i = 1; i < data.length; i++) {
            console.log('send update request ', data[i][locationSchema.geoname])
            updateEntryToLocationTableOSM(i, data[i][locationSchema.geoname], userLocationTable, locationSchema);
        }
        // wait for all requests to be returned, until continue
        requestTimer = setInterval(function() {
            currentNetwork.userLocationTable = userLocationTable;
            checkRequests(callBack, [])
        }, 500);

    }


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

    function updateEntryToLocationTableOSM(index: number, geoname: string, locationTable: VTable, locationSchema: networkcube.LocationSchema) {
        geoname = geoname.trim();
        fullGeoNames.push(geoname);
        var xhr = $.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            data: {format: "json", limit: "1", q: geoname.split(',')[0].trim()},
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
                console.log('update', geoname, undefined, undefined);
            }
        })
            .always(function () {
            requestsRunning--;
        });
        xhr['uniqueId'] = requestsRunning++;
    }




    export function cleanTable(table: any[][]) {
        // trim entries
        var emptyColBool = [] 
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                if (table[i][j] != undefined)
                    table[i][j] = table[i][j].trim();
            }
        }

    }


    export function setHeader(elementId:String, datasetname:String){
        var header = $('<a href="../index.html"><img width="100%" src="../logos/logo2.png"/></a>')
        $('#'+elementId).append(header);
        var dataname = $('\
        <p style="margin:5px;background-color:#eeeeee;border-radius:2px;padding-left:10px;padding:5px;"><b>Data:</b> '+ datasetname +'</h2>')
        $('#'+elementId).append(dataname);

        var vars = networkcube.getUrlVars();

        $('#'+elementId).append('<a href="../dataview.html?session='+vars['session']+'&datasetName'+vars['datasetName'] + '" style="margin:5px;padding-left:5px;">Return to Dataview</a>');
        $('#'+elementId).append('<br/><br/>');
    }


    export function exportNetwork(network:vistorian.Network){
        
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

    export function importData(network:vistorian.Network, session){
        storage.saveNetwork(network, session);
    }



    export function importIntoNetworkcube(currentNetwork:vistorian.Network, sessionid:string, s:boolean)
    {

        // trim cell entries (remove overhead white space)
        if (currentNetwork.userNodeTable)
            vistorian.cleanTable(currentNetwork.userNodeTable.data);
        if (currentNetwork.userLinkTable)
            vistorian.cleanTable(currentNetwork.userLinkTable.data);


        // get references to normalized tables
        // var normalizedNodeTable: any[] = currentNetwork.networkCubeDataSet.nodeTable;
        // var normalizedLinkTable: any[] = currentNetwork.networkCubeDataSet.linkTable;
        // var normalizedLocationTable: any[] = currentNetwork.networkCubeDataSet.locationTable;
        var normalizedNodeTable: any[] = [];
        var normalizedLinkTable: any[] = [];
        var normalizedLocationTable: any[] = [];

        var networkcubeNodeSchema: networkcube.NodeSchema = currentNetwork.networkCubeDataSet.nodeSchema;
        var networkcubeLinkSchema: networkcube.LinkSchema = currentNetwork.networkCubeDataSet.linkSchema;
        var networkcubeLocationSchema: networkcube.LocationSchema = currentNetwork.networkCubeDataSet.locationSchema;

        // if(normalizedLocationTable)       
        // displayLocationTable();

        var locationLabels: string[] = [];
        if (currentNetwork.userLocationTable != undefined) {
            for (var i = 1; i < currentNetwork.userLocationTable.data.length; i++) {
                locationLabels.push(currentNetwork.userLocationTable.data[i][currentNetwork.userLocationSchema.label]);
            }
        }
        console.log('locationLabels', locationLabels);


        // CONVERT SINGLE-LINK TABLE 

        var nodeIds: number[] = [];
        var names: string[] = [];
        var nodeLocations: number[][] = [];
        var nodeTimes: number[][] = [];
        
        if (currentNetwork.userNodeTable == undefined) 
        {
            console.log('no node table found, create node table')
            var linkData = currentNetwork.userLinkTable.data;
            var id_source: number;
            var id_target: number;
            var name: string;
            var loc: string;
            var linkSchema: vistorian.VLinkSchema = currentNetwork.userLinkSchema;
            var timeString: string;
            var timeFormatted: string;

            // Create node table
            for (var i = 1; i < linkData.length; i++) {

                // source
                name = linkData[i][linkSchema.source];
                if (names.indexOf(name) < 0) {
                    id_source = nodeIds.length
                    names.push(name);
                    nodeIds.push(id_source);
                    nodeLocations.push([]);
                    nodeTimes.push([]);
                }

                // target
                name = linkData[i][linkSchema.target];
                if (names.indexOf(name) < 0) {
                    id_target = nodeIds.length;
                    names.push(name);
                    nodeIds.push(id_target);
                    nodeLocations.push([]);
                    nodeTimes.push([]);
                }
            }

            // create new link table and replace source label by source id
            normalizedLinkTable = [];
            var linkTime: string;
            var found: boolean = true;
            for (var i = 0; i < linkData.length; i++) {
                normalizedLinkTable.push([])
                for (var j = 0; j < linkData[i].length; j++) {
                    normalizedLinkTable[i].push(linkData[i][j])
                }

                // replace node names by node IDs, i.e. references to node table.
                if (networkcube.isValidIndex(linkSchema.source)) {
                    normalizedLinkTable[i][linkSchema.source] = nodeIds[names.indexOf(linkData[i][linkSchema.source])]
                }
                if (networkcube.isValidIndex(linkSchema.target)) {
                    normalizedLinkTable[i][linkSchema.target] = nodeIds[names.indexOf(linkData[i][linkSchema.target])]
                }

                id_source = names.indexOf(linkData[i][linkSchema.source]);
                id_target = names.indexOf(linkData[i][linkSchema.target]);

                if (id_source == -1 || id_target == -1)
                    continue;

                // if source and target locations are available, set to indices.
                //source location
                if (linkSchema.location_source > -1) {
                    loc = linkData[i][linkSchema.location_source].trim();
                    id = locationLabels.indexOf(loc);
                    if (id == -1)
                        continue;

                    // console.log('source_location id: ', loc, id_source, id)                    
                    // check if entry already exists for this node and this time, if not, add this location to the nodes locations.
                    found = false;
                    for (var t = 0; t < nodeTimes[id_source].length; t++) {
                        if (nodeTimes[id_source][t] == linkData[i][linkSchema.time]) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        nodeTimes[id_source].push(linkData[i][linkSchema.time])
                        nodeLocations[id_source].push(id)
                    }
                    normalizedLinkTable[i][linkSchema.location_source] = id;
                }
                //target location
                if (linkSchema.location_target > -1) {

                    loc = linkData[i][linkSchema.location_target].trim();
                    id = locationLabels.indexOf(loc);
                    if (id == -1)
                        continue;

                    // console.log('source_location id: ', loc, id_target, id)
                    // check if entry already exists for this time, if yes, discard this one.           
                    found = false;
                    for (var t = 0; t < nodeTimes[id_target].length; t++) {
                        if (nodeTimes[id_target][t] == linkData[i][linkSchema.time]) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        nodeTimes[id_target].push(linkData[i][linkSchema.time])
                        nodeLocations[id_target].push(id)
                    }
                    normalizedLinkTable[i][linkSchema.location_target] = id;
                }

            }
            // remove header information from user table
            normalizedLinkTable.shift();

            // create normalizedNodeTable
            var time: string;
            normalizedNodeTable = [];
            networkcubeNodeSchema.label = 1;

            var locationsFound: boolean = false;
            var timeFound: boolean = false;
            if (nodeLocations.length > 0) {
                networkcubeNodeSchema.location = 4;
            }
            if (nodeTimes.length > 0) {
                networkcubeNodeSchema.location = 3;
            }


            for (var i = 0; i < nodeIds.length; i++) {
                // duplicate node entry if there is temporal information (currently e.g.: location)
                // console.log('nodeTimes[i]', nodeLocations[i].length)
                if (nodeLocations[i].length > 0) {
                    locationsFound = true;
                    for (var j = 0; j < nodeLocations[i].length; j++) {
                        time = undefined;
                        if (nodeTimes[i][j]) {
                            time = nodeTimes[i][j].toString();
                        }
                        normalizedNodeTable.push([nodeIds[i], names[i], nodeTimes[i][j], nodeLocations[i][j]]);
                    }
                } else {
                    // no locations specified
                    if (networkcube.isValidIndex(currentNetwork.userNodeSchema.time)) {
                        // time specified in schema
                        normalizedNodeTable.push([nodeIds[i], names[i], undefined, undefined]);
                    } else {
                        // no time specified in schema
                        normalizedNodeTable.push([nodeIds[i], names[i], undefined]);
                    }
                }
            }
        }

        if (currentNetwork.userNodeTable) 
        {
            networkcubeNodeSchema = new networkcube.NodeSchema(0);
            networkcubeNodeSchema.id = currentNetwork.userNodeSchema.id;
            networkcubeNodeSchema.label = currentNetwork.userNodeSchema.label;
            if (networkcube.isValidIndex(currentNetwork.userNodeSchema.time)) {
                networkcubeNodeSchema.time = currentNetwork.userNodeSchema.time;
            }
            if (networkcube.isValidIndex(currentNetwork.userNodeSchema.location)) {
                networkcubeNodeSchema.location = currentNetwork.userNodeSchema.location;
            }
            if (networkcube.isValidIndex(currentNetwork.userNodeSchema.nodeType)) {
                networkcubeNodeSchema.nodeType = currentNetwork.userNodeSchema.nodeType;
            }
        } 
        else 
        {
            networkcubeNodeSchema = new networkcube.NodeSchema(0);
            networkcubeNodeSchema.id = 0;
            networkcubeNodeSchema.label = 1;
            if (networkcube.isValidIndex(currentNetwork.userLinkSchema.time)) {
                networkcubeNodeSchema.time = 2;
            }
            if (networkcube.isValidIndex(currentNetwork.userLinkSchema.location_source) || networkcube.isValidIndex(currentNetwork.userLinkSchema.location_target)) {
                networkcubeNodeSchema.location = 3;
            }

        }

        // CHECK FOR SINGLE NODE-TABLE

        if (currentNetwork.userLinkTable == undefined) 
        {
            console.log('Create and fill link table')
            // create link table and fill
            var nodeData = currentNetwork.userNodeTable.data;
            console.log('nodeData', nodeData)
            var nodeSchema: vistorian.VNodeSchema = currentNetwork.userNodeSchema;
            var id: number;
            var relCol: number;
            var newRow: any[];
            var nodeId: number;
            var newNodeId: number = nodeData.length + 1;

            // networkcubeLinkSchema = new networkcube.LinkSchema(0, 1, 2)
            networkcubeLinkSchema.linkType = 3;
            if (networkcube.isValidIndex(nodeSchema.time))
                networkcubeLinkSchema.time = 4;


            // copy existing nodes into normalizedTable
            for (var i = 1; i < nodeData.length; i++) {
                newRow = [];
                id = parseInt(nodeData[i][nodeSchema.id]);
                while (normalizedNodeTable.length < (id + 1)) {
                    // insert empty rows if index is too small
                    normalizedNodeTable.push([]);
                }
                newRow.push(id);
                newRow.push(nodeData[i][nodeSchema.label]);
                normalizedNodeTable[id] = newRow;
            }
            networkcubeNodeSchema.label = 1;



            console.log('Create new links: ' + (nodeData.length * nodeSchema.relation.length), nodeData, nodeSchema.relation)
            for (var i = 1; i < nodeData.length; i++) {

                // create relations in link table
                for (var j = 0; j < nodeSchema.relation.length; j++) {
                    relCol = nodeSchema.relation[j];

                    // dont create relation if field entry is empty;
                    if (nodeData[i][relCol].length == 0)
                        continue;

                    // check if node already exist
                    nodeId = -1;
                    for (var k = 0; k < normalizedNodeTable.length; k++) {
                        // console.log('check node existance: ', normalizedNodeTable[k][1], nodeData[i][relCol])
                        if (normalizedNodeTable[k][1] == nodeData[i][relCol]) {
                            nodeId = k;
                            break;
                        }
                    }
                    if (nodeId < 0) {
                        // create new node in node table
                        nodeId = normalizedNodeTable.length;
                        newRow = [];
                        newRow.push(nodeId);
                        newRow.push(nodeData[i][relCol]);
                        newRow.push(undefined); // time
                        newRow.push(undefined); // location
                        normalizedNodeTable.push(newRow)
                        // console.log('create node', nodeId,  nodeData[i][relCol]);
                    }

                    // create entry in link table
                    newRow = []
                    // edge id
                    newRow.push(normalizedLinkTable.length);
                    // source id
                    newRow.push(parseInt(nodeData[i][nodeSchema.id]));
                    // target id
                    newRow.push(nodeId);
                    // relation type
                    newRow.push(nodeData[0][relCol]);
                    // time
                    if (nodeSchema.time > -1)
                        newRow.push(nodeData[i][nodeSchema.time]);

                    normalizedLinkTable.push(newRow);
                    // console.log('create edge row', newRow);

                }
            }
            console.log('normalizedLinkTable', normalizedLinkTable)
        }



        // set networkcube link schema
        if (currentNetwork.userLinkTable) {
            for (var field in currentNetwork.userLinkSchema) {
                if (field == 'name') continue;
                networkcubeLinkSchema[field] = currentNetwork.userLinkSchema[field];
            }
        }

        // format times into ISO standart time
        if (currentNetwork.hasOwnProperty('timeFormat') && currentNetwork.timeFormat != undefined && currentNetwork.timeFormat.length > 0) {
            var format = currentNetwork.timeFormat;
            if (networkcubeLinkSchema.time != undefined && networkcubeLinkSchema.time > -1) {
                for (var i = 0; i < normalizedLinkTable.length; i++) {
                    time = moment(normalizedLinkTable[i][networkcubeLinkSchema.time], format).format(networkcube.timeFormat())
                    if (time.indexOf('Invalid') > -1)
                        time = undefined;
                    normalizedLinkTable[i][networkcubeLinkSchema.time] = time;
                }
            }

            if (networkcubeNodeSchema.time != undefined && networkcubeNodeSchema.time > -1) {
                for (var i = 0; i < normalizedNodeTable.length; i++) {
                    time = moment(normalizedNodeTable[i][networkcubeNodeSchema.time], format).format(networkcube.timeFormat());
                    if (time.indexOf('Invalid') > -1)
                        time = undefined;
                    normalizedNodeTable[i][networkcubeNodeSchema.time] = time
                }
            }
        }

        // sync location tables
        if (currentNetwork.userLocationTable) {
            currentNetwork.networkCubeDataSet.locationTable = currentNetwork.userLocationTable.data.slice(0);
            currentNetwork.networkCubeDataSet.locationTable.shift();
            currentNetwork.networkCubeDataSet.locationSchema = currentNetwork.userLocationSchema;
        }

        // to be save    
        currentNetwork.networkCubeDataSet.nodeTable = normalizedNodeTable;
        currentNetwork.networkCubeDataSet.linkTable = normalizedLinkTable;
        currentNetwork.networkCubeDataSet.linkSchema = networkcubeLinkSchema;
        currentNetwork.networkCubeDataSet.nodeSchema = networkcubeNodeSchema;

        console.log('locationTable', currentNetwork.networkCubeDataSet.locationTable)

        // console.log('[vistorian] network created', networkcubeDataSet);

        storage.saveNetwork(currentNetwork, sessionid);

        // networkcube.setDataManagerOptions({ keepOnlyOneSession: true });
        networkcube.setDataManagerOptions({ keepOnlyOneSession: false });
        console.log('>> START IMPORT');
        networkcube.importData(sessionid, currentNetwork.networkCubeDataSet);
        console.log('>> IMPORTED: ', currentNetwork.networkCubeDataSet);
    }

}
