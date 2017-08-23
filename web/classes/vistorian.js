var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vistorian;
(function (vistorian) {
    var head = $('head');
    head.append("<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300italic,700,300&subset=latin,latin-ext' rel='stylesheet' type='text/css'></head>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Great+Vibes' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Playfair+Display' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Amatic+SC:400,700' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Lora' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=Caveat' rel='stylesheet' type='text/css'>");
    head.append("<link href='https://fonts.googleapis.com/css?family=IM+Fell+English' rel='stylesheet' type='text/css'>");
    function append(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $("head").append(script);
    }
    var tables = [];
    var VTable = (function () {
        function VTable(name, data) {
            this.name = name;
            this.data = data;
        }
        return VTable;
    })();
    vistorian.VTable = VTable;
    var VTableSchema = (function () {
        function VTableSchema(name) {
            this.name = name;
        }
        return VTableSchema;
    })();
    vistorian.VTableSchema = VTableSchema;
    var VNodeSchema = (function (_super) {
        __extends(VNodeSchema, _super);
        function VNodeSchema() {
            _super.call(this, 'userNodeSchema');
            this.relation = [];
            this.location = -1;
            this.id = 0;
            this.label = -1;
            this.time = -1;
            this.nodeType = -1;
        }
        ;
        return VNodeSchema;
    })(VTableSchema);
    vistorian.VNodeSchema = VNodeSchema;
    var VLinkSchema = (function (_super) {
        __extends(VLinkSchema, _super);
        function VLinkSchema() {
            _super.call(this, 'userLinkSchema');
            this.location_source = -1;
            this.location_target = -1;
            this.id = 0;
            this.source = -1;
            this.target = -1;
            this.weight = -1;
            this.time = -1;
            this.linkType = -1;
        }
        ;
        return VLinkSchema;
    })(VTableSchema);
    vistorian.VLinkSchema = VLinkSchema;
    var VLocationSchema = (function (_super) {
        __extends(VLocationSchema, _super);
        function VLocationSchema() {
            _super.call(this, 'userLocationSchema');
            this.id = 0;
            this.label = 1;
            this.geoname = 2;
            this.longitude = 3;
            this.latitude = 4;
        }
        ;
        return VLocationSchema;
    })(VTableSchema);
    vistorian.VLocationSchema = VLocationSchema;
    var Network = (function () {
        function Network(id) {
            this.networkConfig = 'both';
            this.id = id;
            this.userNodeSchema = new VNodeSchema();
            this.userLinkSchema = new VLinkSchema();
            this.ready = false;
        }
        return Network;
    })();
    vistorian.Network = Network;
    function loadCSV(files, callBack, sessionid) {
        var loadCount = 0;
        var table;
        var tables = [];
        var fileContents = [];
        var readers = [];
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.filename = f.name.split('_')[0];
            readers[i] = reader;
            reader.onload = function (f) {
                var obj = {
                    content: f.target.result,
                    name: f.target.filename
                };
                var i = readers.indexOf(f.target);
                fileContents[i] = obj;
                var content = fileContents[i].content.replace(', "', ',"').replace('" ,', '",');
                table = new VTable(files[i].name.replace('.csv', '').replace(' ', '_').trim(), Papa.parse(content).data);
                formatTable(table);
                storage.saveUserTable(table, sessionid);
                loadCount++;
                if (loadCount == files.length)
                    callBack();
            };
            reader.readAsText(f);
        }
    }
    vistorian.loadCSV = loadCSV;
    function exportTableCSV(table) {
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
    function formatTable(table) {
        var data = [];
        var indexify = !(table.data[0][0] == 'ID'
            || table.data[0][0] == 'id'
            || table.data[0][0] == 'Id'
            || table.data[0][0] == 'Index'
            || table.data[0][0].includes('index')
            || table.data[0][0].includes('Index'));
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
    function checkTime(table, timeCol, timeFormat) {
        var timeString;
        var error = [];
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
            updateEntryToLocationTableOSM(i, data[i][locationSchema.geoname], userLocationTable, locationSchema);
        }
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
            }
        })
            .always(function () {
            requestsRunning--;
        });
        xhr['uniqueId'] = requestsRunning++;
    }
    function cleanTable(table) {
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
        $('#' + elementId).append('<a href="../dataview.html?session=' + vars['session'] + '&datasetName' + vars['datasetName'] + '" style="margin:5px;padding-left:5px;" onclick="trace.event(\'system\', \'ts_ReturnDV\', \'CCC\', \'DDD\');" target="_blank">Return to Dataview</a>');
        $('#' + elementId).append('<br/><br/>');
    }
    vistorian.setHeader = setHeader;
    function exportNetwork(network) {
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
        if (!((currentNetwork.userLinkSchema.source > -1
            && currentNetwork.userLinkSchema.target > -1)
            || (currentNetwork.userNodeSchema.label > -1
                && currentNetwork.userNodeSchema.relation.length > -1))) {
            return;
        }
        if (currentNetwork.userNodeTable) {
            vistorian.cleanTable(currentNetwork.userNodeTable.data);
        }
        if (currentNetwork.userLinkTable) {
            vistorian.cleanTable(currentNetwork.userLinkTable.data);
        }
        var normalizedNodeTable = [];
        var normalizedLinkTable = [];
        var normalizedNodeSchema;
        var normalizedLinkSchema;
        normalizedNodeSchema = new networkcube.NodeSchema(0);
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
        normalizedLinkSchema = new networkcube.LinkSchema(0, 1, 2);
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
        var locationLabels = [];
        if (currentNetwork.userLocationTable) {
            for (var i = 1; i < currentNetwork.userLocationTable.data.length; i++) {
                locationLabels.push(currentNetwork.userLocationTable.data[i][currentNetwork.userLocationSchema.label]);
            }
        }
        if (currentNetwork.userLinkTable == undefined
            && currentNetwork.userNodeTable != undefined) {
            var id;
            var relCol;
            var newNodeRow;
            var newLinkRow;
            var rowNum;
            var userNodeTable = currentNetwork.userNodeTable.data;
            var colCount = 3;
            normalizedLinkSchema.linkType = colCount++;
            if (networkcube.isValidIndex(userNodeSchema.time)) {
                normalizedLinkSchema.time = colCount++;
            }
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
            for (var i = 1; i < userNodeTable.length; i++) {
                var row;
                var sourceId;
                var targetId;
                for (var j = 0; j < userNodeSchema.relation.length; j++) {
                    row = userNodeTable[i];
                    relCol = userNodeSchema.relation[j];
                    sourceId = nodeIds[i - 1];
                    if (row[relCol].length == 0)
                        continue;
                    rowNum = nodeLabels.indexOf(row[relCol]);
                    if (rowNum < 0) {
                        newNodeRow = [0, 0];
                        newNodeRow[normalizedNodeSchema.id] = normalizedNodeTable.length;
                        nodeIds.push(normalizedNodeTable.length - 1);
                        nodeLabels.push(row[relCol]);
                        newNodeRow[normalizedNodeSchema.label] = row[relCol];
                        normalizedNodeTable.push(newNodeRow);
                        targetId = normalizedNodeTable.length - 1;
                    }
                    else {
                        targetId = rowNum;
                    }
                    newLinkRow = [];
                    for (var k = 0; k < colCount; k++) {
                        newLinkRow.push('');
                    }
                    newLinkRow[normalizedLinkSchema.id] = normalizedLinkTable.length;
                    newLinkRow[normalizedLinkSchema.source] = sourceId;
                    newLinkRow[normalizedLinkSchema.target] = targetId;
                    newLinkRow[normalizedLinkSchema.linkType] = userNodeTable[0][relCol];
                    if (networkcube.isValidIndex(userNodeSchema.time))
                        newLinkRow[normalizedLinkSchema.time] = row[userNodeSchema.time];
                    normalizedLinkTable.push(newLinkRow);
                }
            }
        }
        var nodeNames = [];
        if (currentNetwork.userNodeTable == undefined
            && currentNetwork.userLinkTable != undefined) {
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
            var row;
            for (var i = 1; i < userLinkData.length; i++) {
                nodeName = userLinkData[i][userLinkSchema.source];
                if (nodeNames.indexOf(nodeName) < 0) {
                    row = [nodeNames.length, nodeName];
                    nodeNames.push(nodeName);
                    normalizedNodeTable.push(row);
                }
                nodeName = userLinkData[i][userLinkSchema.target];
                if (nodeNames.indexOf(nodeName) < 0) {
                    row = [nodeNames.length, nodeName];
                    nodeNames.push(nodeName);
                    normalizedNodeTable.push(row);
                }
            }
        }
        if (currentNetwork.userLinkTable != undefined) {
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
            var time;
            var locationsFound = false;
            var timeFound = false;
            if (networkcube.isValidIndex(userLinkSchema.location_source)
                || networkcube.isValidIndex(userLinkSchema.location_target)) {
                normalizedNodeSchema.location = nodeColCount++;
                for (var i = 0; i < normalizedNodeTable.length; i++) {
                    normalizedNodeTable[i].push('');
                }
                if (networkcube.isValidIndex(userLinkSchema.time)) {
                    normalizedNodeSchema.time = nodeColCount++;
                    for (var i = 0; i < normalizedNodeTable.length; i++) {
                        normalizedNodeTable[i].push('');
                    }
                }
                for (var i = 1; i < userLinkData.length; i++) {
                    var nodeRow, rowToDuplicate;
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
                                    if (nodeRow[normalizedNodeSchema.time] == userLinkData[i][userLinkSchema.time]) {
                                        if (nodeRow[normalizedNodeSchema.location] && nodeRow[normalizedNodeSchema.location] != '') {
                                            rowToDuplicate = undefined;
                                        }
                                        else {
                                            rowToDuplicate = nodeRow;
                                        }
                                        j = len;
                                        break;
                                    }
                                    else {
                                        rowToDuplicate = nodeRow;
                                    }
                                }
                                else {
                                    nodeRow[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_source];
                                    j = len;
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
                                    if (nodeRow[normalizedNodeSchema.time] == userLinkData[i][userLinkSchema.time]) {
                                        if (nodeRow[normalizedNodeSchema.location] && nodeRow[normalizedNodeSchema.location] != '') {
                                            rowToDuplicate = undefined;
                                        }
                                        else {
                                            rowToDuplicate = nodeRow;
                                        }
                                        j = len;
                                        break;
                                    }
                                    else {
                                        rowToDuplicate = nodeRow;
                                    }
                                }
                                else {
                                    nodeRow[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                    j = len;
                                    break;
                                }
                            }
                        }
                        if (rowToDuplicate) {
                            if (rowToDuplicate[normalizedNodeSchema.location] == '') {
                                rowToDuplicate[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                rowToDuplicate[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                            }
                            else {
                                var newRowNode = [];
                                for (var c = 0; c < rowToDuplicate.length; c++) {
                                    newRowNode.push(rowToDuplicate[c]);
                                }
                                newRowNode[normalizedNodeSchema.location] = userLinkData[i][userLinkSchema.location_target];
                                newRowNode[normalizedNodeSchema.time] = userLinkData[i][userLinkSchema.time];
                                normalizedNodeTable.push(newRowNode);
                            }
                        }
                        if (locationLabels.indexOf(userLinkData[i][userLinkSchema.location_target]) == -1) {
                            locationLabels.push(userLinkData[i][userLinkSchema.location_target]);
                        }
                    }
                }
            }
        }
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
        var normalizedLocationSchema = networkcube.getDefaultLocationSchema();
        if (currentNetwork.userLocationTable) {
            normalizedLocationSchema = currentNetwork.userLocationSchema;
        }
        var normalizedLocationTable = [];
        var locationName;
        var row;
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
        if (normalizedNodeSchema.location > -1) {
            for (var i = 0; i < normalizedNodeTable.length; i++) {
                locationName = normalizedNodeTable[i][normalizedNodeSchema.location].trim();
                id = locationLabels.indexOf(locationName);
                normalizedNodeTable[i][normalizedNodeSchema.location] = id;
            }
        }
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
        for (var i = 0; i < normalizedNodeTable.length; i++) {
            normalizedNodeTable[i][0] = parseInt(normalizedNodeTable[i][0]);
        }
        for (var i = 0; i < normalizedLinkTable.length; i++) {
            normalizedLinkTable[i][0] = parseInt(normalizedLinkTable[i][0]);
        }
        currentNetwork.ready = true;
        storage.saveNetwork(currentNetwork, sessionid);
        networkcube.setDataManagerOptions({ keepOnlyOneSession: false });
        networkcube.importData(sessionid, dataset);
        console.log('>> NETWORK IMPORTED: ', dataset);
        return dataset;
    }
    vistorian.importIntoNetworkcube = importIntoNetworkcube;
})(vistorian || (vistorian = {}));
