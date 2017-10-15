var DATA_TABLE_MAX_LENGTH = 200;
document.getElementById('files').addEventListener('change', getFileInfos, false);
document.getElementById('nodeTableUpload').addEventListener('change', uploadNodeTable, false);
document.getElementById('linkTableUpload').addEventListener('change', uploadLinkTable, false);
var SESSION_NAME = utils.getUrlVars()['session'];
storage.saveSessionId(SESSION_NAME);
var tables = storage.getUserTables(SESSION_NAME);
var currentNetwork;
var visualizations = [
    ['Node Link', 'nodelink'],
    ['Adjacency Matrix', 'matrix'],
    ['Time Arcs', 'dynamicego'],
    ['Map', 'map'],
];
var messages = [];
init();
function init() {
    loadVisualizationList();
    loadNetworkList();
    loadTableList();
    var networkids = storage.getNetworkIds(SESSION_NAME);
    if (networkids.length > 0)
        showNetwork(networkids[0]);
}
function loadVisualizationList() {
    visualizations.forEach(function (v) {
        $('#visualizationList')
            .append('<li class="visLink" title="Show ' + v[0] + ' visualization.">\
                        <button onclick="loadVisualization(\'' + v[1] + '\')" class="visbutton hastooltip">\
                            <img src="figures/' + v[1] + '.png" class="visicon"/>\
                            <p>' + v[0] + '</p>\
                        </button>\
                    </li>');
    });
    $('#visualizationList')
        .append('<li class="visLink" title="Show matrix and node-link split-view.">\
            <button onclick="loadVisualization(\'mat-nl\')" class="visbutton hastooltip">\
            <img src="figures/nl+mat.png" class="visicon"/><p>Matrix + Node Link</p>\
        </button></li>');
    $('#visualizationList')
        .append('<li class="visLink" title="Show all visualizations.">\
        <button onclick="loadVisualization(\'tileview\')" class="visbutton hastooltip">\
        <img src="figures/all.png" class="visicon"/><p>All</p>\
        </button></li>');
}
function loadTableList() {
    $('#tableList').empty();
    var tableNames = storage.getTableNames(SESSION_NAME);
    tableNames.forEach(function (t) {
        var shownName = t;
        if (t.length > 30)
            shownName = t.substring(0, 30) + '..';
        $('#tableList').append('<li>\
            <a onclick="showSingleTable(\'' + t + '\')"  class="underlined">' + shownName + '.csv</a>\
            <img class="controlIcon" title="Delete this table." src="logos/delete.png" onclick="removeTable(\'' + t + '\')"/>\
        </li>');
    });
}
function loadNetworkList() {
    $('#networkList').empty();
    var networkNames = storage.getNetworkIds(SESSION_NAME);
    var network;
    networkNames.forEach(function (t) {
        network = storage.getNetwork(t, SESSION_NAME);
        $('#networkList').append('\
            <li>\
                <a onclick="showNetwork(\'' + network.id + '\')"  class="underlined">' + network.name + '</a>\
                <img class="controlIcon" title="Delete this network." src="logos/delete.png" onclick="removeNetwork(\'' + network.id + '\')"/>\
                <img class="controlIcon" title="Download this network in .vistorian format." src="logos/download.png" onclick="exportNetwork(\'' + network.id + '\')"/>\
            </li>');
    });
}
function loadVisualization(visType) {
    trace.event("system", "ts_" + visType, "CCC", "DDD");
    window.open('sites/' + visType + '.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name);
}
function createNetwork() {
    var networkIds = storage.getNetworkIds(SESSION_NAME);
    var id = new Date().getTime();
    currentNetwork = new vistorian.Network(id);
    currentNetwork.name = 'Network-' + currentNetwork.id;
    storage.saveNetwork(currentNetwork, SESSION_NAME);
    showNetwork(currentNetwork.id);
    loadNetworkList();
}
function setNodeTable(list) {
    var tableName = list.value;
    if (tableName != '---') {
        var table = storage.getUserTable(tableName, SESSION_NAME);
        currentNetwork.userNodeTable = table;
        showTable(table, '#nodeTableDiv', false, currentNetwork.userNodeSchema);
    }
    else {
        unshowTable('#nodeTableDiv');
        currentNetwork.userNodeTable = undefined;
    }
}
function setLinkTable(list) {
    var tableName = list.value;
    if (tableName != '---') {
        var table = storage.getUserTable(tableName, SESSION_NAME);
        currentNetwork.userLinkTable = table;
        showTable(table, '#linkTableDiv', false, currentNetwork.userLinkSchema);
    }
    else {
        unshowTable('#linkTableDiv');
        currentNetwork.userLinkTable = undefined;
    }
}
function setLocationTable(list) {
    var tableName = list.value;
    if (tableName != '---') {
        var table = storage.getUserTable(tableName, SESSION_NAME);
        currentNetwork.userLocationTable = table;
        currentNetwork.userLocationSchema = new networkcube.LocationSchema(0, 1, 2, 3, 4);
        showTable(table, '#locationTableDiv', true, currentNetwork.userLocationSchema);
    }
    else {
        unshowTable('#locationTableDiv');
        currentNetwork.userLocationTable = undefined;
    }
}
function saveCurrentNetwork(failSilently) {
    saveCellChanges();
    currentNetwork.name = $('#networknameInput').val();
    if (currentNetwork.userNodeSchema.time != -1) {
        currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userNodeSchema.name).val();
    }
    if (currentNetwork.userLinkSchema.time != -1) {
        currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userLinkSchema.name).val();
    }
    checkTimeFormatting(currentNetwork);
    storage.saveNetwork(currentNetwork, SESSION_NAME);
    if (!currentNetwork.userNodeTable && !currentNetwork.userLinkTable) {
        if (!failSilently)
            showMessage("Cannot save without a Node table or a Link Table", 2000);
        return;
    }
    var dataset = vistorian.importIntoNetworkcube(currentNetwork, SESSION_NAME, failSilently);
    updateNetworkStatusIndication();
    if (dataset
        && !currentNetwork.userLocationTable && dataset.locationTable && dataset.locationTable.length > 0) {
        currentNetwork.userLocationTable = new vistorian.VTable('userLocationTable', dataset.locationTable);
        currentNetwork.userLocationTable.data.splice(0, 0, ['Id', 'User Name', 'Geoname', 'Longitude', 'Latitude']);
        currentNetwork.userLocationSchema = dataset.locationSchema;
        storage.saveUserTable(currentNetwork.userLocationTable, SESSION_NAME);
        showTable(currentNetwork.userLocationTable, '#locationTableDiv', true, currentNetwork.userLocationSchema);
        $('#locationtableSelect')
            .append('<option value="userLocationTable">User Location Table</option>');
        $('#locationtableSelect').val('userLocationTable');
        loadTableList();
        storage.saveNetwork(currentNetwork, SESSION_NAME);
    }
    loadNetworkList();
}
function deleteCurrentNetwork() {
    storage.deleteNetwork(currentNetwork, SESSION_NAME);
    networkcube.deleteData(currentNetwork.name);
    unshowNetwork();
    loadNetworkList();
}
function showNetwork(networkId) {
    unshowNetwork();
    currentNetwork = storage.getNetwork(networkId, SESSION_NAME);
    if (currentNetwork == null)
        return;
    $('#individualTables').css('display', 'none');
    $('#networkTables').css('display', 'inline');
    $('#networknameInput').val(currentNetwork.name);
    var tables = storage.getUserTables(SESSION_NAME);
    $('#nodetableSelect').append('<option class="tableSelection">---</option>');
    $('#linktableSelect').append('<option class="tableSelection">---</option>');
    $('#locationtableSelect').append('<option class="tableSelection">---</option>');
    $('#nodeTableContainer').css('display', 'inline');
    $('#linkTableContainer').css('display', 'inline');
    if (currentNetwork.networkConfig.indexOf('node') > -1) {
        $('#linkTableContainer').css('display', 'none');
    }
    if (currentNetwork.networkConfig.indexOf('link') > -1) {
        $('#nodeTableContainer').css('display', 'none');
    }
    if (currentNetwork.networkConfig == undefined) {
        $('#linkTableContainer').css('display', 'none');
        $('#nodeTableContainer').css('display', 'none');
    }
    tables.forEach(function (t) {
        $('#nodetableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>');
        $('#linktableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>');
        $('#locationtableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>');
    });
    if (currentNetwork.userNodeTable) {
        showTable(currentNetwork.userNodeTable, '#nodeTableDiv', false, currentNetwork.userNodeSchema);
        $('#nodetableSelect').val(currentNetwork.userNodeTable.name);
    }
    if (currentNetwork.userLinkTable) {
        showTable(currentNetwork.userLinkTable, '#linkTableDiv', false, currentNetwork.userLinkSchema);
        $('#linktableSelect').val(currentNetwork.userLinkTable.name);
    }
    if (currentNetwork.userLocationTable) {
        showTable(currentNetwork.userLocationTable, '#locationTableDiv', true, currentNetwork.userLocationSchema);
        $('#locationtableSelect').val(currentNetwork.userLocationTable.name);
    }
    $('#tileViewLink').attr('href', 'sites/tileview.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name.split(' ').join('___'));
    $('#mat-nlViewLink').attr('href', 'sites/mat-nl.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name.split(' ').join('___'));
    updateNetworkStatusIndication();
}
function updateNetworkStatusIndication() {
    if (currentNetwork.ready) {
        $('#networkStatus')
            .text('Ready for visualization. Select a visualization from the menu on the top.')
            .css('color', '#fff')
            .css('background', '#2b0');
    }
    else {
        $('#networkStatus')
            .text('Network not ready for visualization. Table or Schema specifications missing.')
            .css('background', '#f63')
            .css('color', '#fff');
    }
}
function unshowNetwork() {
    $('#nodetableSelect').empty();
    $('#linktableSelect').empty();
    $('#locationtableSelect').empty();
    unshowTable('#linkTableDiv');
    unshowTable('#nodeTableDiv');
    unshowTable('#locationTableDiv');
    $('#networkTables').css('display', 'none');
    $('#tileViewLink').attr('href', 'tileview.html?session=' + SESSION_NAME);
    $('#mat-nlViewLink').attr('href', 'mat-nl.html?session=' + SESSION_NAME);
}
function unshowTable(elementName) {
    $(elementName).empty();
}
var currentTable;
function showSingleTable(tableName) {
    currentTable = storage.getUserTable(tableName, SESSION_NAME);
    showTable(currentTable, '#individualTable', false);
    $('#individualTables').css('display', 'inline');
    $('#networkTables').css('display', 'none');
}
var currentTableId;
var currentCell;
function showTable(table, elementName, isLocationTable, schema) {
    var tHead, tBody;
    currentTable = table;
    $(elementName).empty();
    var tableId = 'datatable_' + table.name;
    currentTableId = tableId;
    $('#' + tableId).remove();
    var tableDiv = $('<div id="div_' + tableId + '"></div>');
    $(elementName).append(tableDiv);
    var tableMenu = $(elementName).prev();
    tableMenu.find('.tableMenuButton').remove();
    var data = table.data;
    if (data.length > DATA_TABLE_MAX_LENGTH) {
        var info = $('<p>Table shows first 200 rows out of ' + data.length + ' rows in total.</p>');
        tableDiv.append(info);
    }
    var csvExportButton = $('<button class="tableMenuButton" onclick="exportCurrentTableCSV(\'' + table.name + '\')">Export as CSV</button>');
    tableMenu.append(csvExportButton);
    var tab = $('<table id="' + tableId + '">');
    tableDiv.append(tab);
    tab.addClass('datatable stripe hover cell-border and order-column compact');
    tHead = $('<thead>');
    tab.append(tHead);
    var tr = $('<tr></tr>').addClass('tableheader');
    tHead.append(tr);
    for (var c = 0; c < data[0].length; c++) {
        var td = $('<th></th>').addClass('th').attr('contenteditable', 'false');
        tr.append(td);
        td.html(data[0][c]);
    }
    tBody = $('<tbody></tbody>');
    tab.append(tBody);
    for (var r = 1; r < Math.min(data.length, DATA_TABLE_MAX_LENGTH); r++) {
        tr = $('<tr></tr>').addClass('tablerow');
        tBody.append(tr);
        for (var c = 0; c < data[r].length; c++) {
            td = $('<td></td>').attr('contenteditable', 'true');
            td.data('row', r);
            td.data('column', c);
            td.data('table', table);
            tr.append(td);
            td.html(data[r][c]);
            td.blur(function () {
                if ($(this).html().length == 0) {
                    $(this).addClass('emptyTableCell');
                }
                else {
                    $(this).removeClass('emptyTableCell');
                }
            });
            td.focusin(function (e) {
                saveCellChanges();
                currentCell = $(this);
            });
            td.focusout(function (e) {
                saveCellChanges();
            });
            if (typeof data[r][c] == 'string' && data[r][c].trim().length == 0)
                td.addClass('emptyTableCell');
        }
    }
    var dtable = $('#' + tableId).DataTable({
        "autoWidth": true
    });
    dtable.columns.adjust().draw();
    if (schema) {
        var schemaRow = $('<tr class="schemaRow"></tr>');
        $('#' + tableId + ' > thead').append(schemaRow);
        var select, cell, option, timeFormatInput;
        for (var i = 0; i < table.data[0].length; i++) {
            cell = $('<th class="schemaCell" id="schemaCell_' + schema.name + '_' + i + '"></th>');
            schemaRow.append(cell);
            select = $('<select class="schemaSelection" onchange="schemaSelectionChanged(this.value, ' + i + ' , \'' + schema.name + '\')"></select>');
            cell.append(select);
            select.append('<option>(Not visualized)</option>');
            for (var field in schema) {
                if (field == 'name'
                    || field == 'constructor'
                    || field == 'timeFormat')
                    continue;
                var fieldName = '';
                switch (field) {
                    case 'source':
                        fieldName = 'Source Node';
                        break;
                    case 'target':
                        fieldName = 'Target Node';
                        break;
                    case 'source_location':
                        fieldName = 'Source Node Location';
                        break;
                    case 'target_location':
                        fieldName = 'Target Node Location';
                        break;
                    case 'linkType':
                        fieldName = 'Link Type';
                        break;
                    case 'location':
                        fieldName = 'Node Location';
                        break;
                    case 'label':
                        fieldName = 'Node';
                        break;
                    default:
                        fieldName = field;
                        fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
                }
                option = $('<option value=' + field + '>' + fieldName + '</option>');
                select.append(option);
                if (i == 0 && field == 'id') {
                    $(option).attr('selected', 'selected');
                    schema[field] = 0;
                }
                if (schema[field] == i) {
                    $(option).attr('selected', 'selected');
                    if (field == 'time') {
                        var val = '';
                        if (currentNetwork.hasOwnProperty('timeFormat')) {
                            val = "value='" + currentNetwork.timeFormat + "'";
                        }
                        timeFormatInput = $('<span class="nobr"><input title="Enter a date pattern" type="text" size="12" id="timeFormatInput_' + schema.name + '" placeholder="DD/MM/YYYY" ' + val + ' onkeyup="timeFormatChanged()"></input><a href="http://momentjs.com/docs/#/parsing/string-format/" target="_blank" title="Details of the date pattern syntax"><img src="logos/help.png" class="inlineicon"/></a></span>');
                        cell.append(timeFormatInput);
                    }
                }
                if (field == 'relation') {
                    for (var k = 0; k < schema.relation.length; k++) {
                        if (schema.relation[k] == i) {
                            $(option).attr('selected', 'selected');
                        }
                    }
                }
            }
        }
    }
}
function timeFormatChanged() {
    currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userNodeSchema.name).val();
    saveCurrentNetwork(false);
}
function deleteCurrentTable() {
    storage.deleteTable(currentTable, SESSION_NAME);
    $('#individualTables').css('display', 'none');
    loadTableList();
}
function schemaSelectionChanged(field, columnNumber, schemaName, parent) {
    for (var field2 in currentNetwork[schemaName]) {
        if (field2 == 'relation' && currentNetwork[schemaName][field2].indexOf(columnNumber) > -1) {
            if (field == '(Not visualized)') {
                currentNetwork[schemaName][field2].splice(currentNetwork[schemaName][field2].indexOf(columnNumber), 1);
            }
            else {
                var arr = currentNetwork[schemaName][field];
                currentNetwork[schemaName][field2].slice(arr.indexOf(columnNumber), 0);
            }
        }
        else {
            if (currentNetwork[schemaName][field2] == columnNumber) {
                currentNetwork[schemaName][field2] = -1;
            }
        }
    }
    if (field == 'relation') {
        currentNetwork[schemaName][field].push(columnNumber);
    }
    else if (field != '---') {
        currentNetwork[schemaName][field] = columnNumber;
    }
    saveCurrentNetwork(false);
    showNetwork(currentNetwork.id);
}
function checkTimeFormatting(network) {
    var corruptedNodeTimes = [];
    if (network.userNodeTable && network.userNodeTable && network.userNodeSchema && network.userNodeSchema['timeFormat']) {
        corruptedNodeTimes = vistorian.checkTime(network.userNodeTable, network.userNodeSchema['time'], network.userNodeSchema['timeFormat']);
    }
    var corruptedLinkTimes = [];
    if (network.userLinkTable && network.userLinkSchema && network.userLinkSchema['timeFormat']) {
        corruptedLinkTimes = vistorian.checkTime(network.userLinkTable, network.userLinkSchema['time'], network.userLinkSchema['timeFormat']);
    }
    return false;
}
function removeRow(row) {
}
var filesToUpload = [];
function getFileInfos(e) {
    filesToUpload = [];
    var files = e.target.files;
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        if (f.name.split('.')[1] != 'csv') {
            showMessage("Uploaded file is not a .csv file. Please chose another file.", 4000);
            return;
        }
        else {
            filesToUpload.push(f);
        }
    }
    uploadFiles(loadTableList);
}
function uploadNodeTable(e) {
    filesToUpload = [e.target.files[0]];
    uploadFiles(function () {
        var tables = storage.getUserTables(SESSION_NAME);
        var lastTable = tables[tables.length - 1];
        $('#nodetableSelect').append('<option value="' + lastTable.name + '">' + lastTable.name + '</option>');
        $('#nodetableSelect').val(lastTable.name);
        setNodeTable({ value: lastTable.name });
        showTable(currentNetwork.userNodeTable, '#nodeTableDiv', false, currentNetwork.userNodeSchema);
        saveCurrentNetwork(false);
        loadTableList();
    });
}
function uploadLinkTable(e) {
    filesToUpload = [e.target.files[0]];
    uploadFiles(function () {
        var tables = storage.getUserTables(SESSION_NAME);
        var lastTable = tables[tables.length - 1];
        $('#linktableSelect').append('<option value="' + lastTable.name + '">' + lastTable.name + '</option>');
        $('#linktableSelect').val(lastTable.name);
        setLinkTable({ value: lastTable.name });
        showTable(currentNetwork.userLinkTable, '#linkTableDiv', false, currentNetwork.userLinkSchema);
        saveCurrentNetwork(false);
        var element = document.getElementById('leaveCode');
        loadTableList();
    });
}
function uploadFiles(handler) {
    vistorian.loadCSV(filesToUpload, function () {
        handler();
    }, SESSION_NAME);
}
function exportCurrentTableCSV(tableName) {
    saveCellChanges();
    var table = null;
    if (tableName) {
        if (currentNetwork.userLinkTable && currentNetwork.userLinkTable.name == tableName)
            table = currentNetwork.userLinkTable;
        else if (currentNetwork.userNodeTable && currentNetwork.userNodeTable.name == tableName)
            table = currentNetwork.userNodeTable;
        else if (currentNetwork.userLocationTable && currentNetwork.userLocationTable.name == tableName)
            table = currentNetwork.userLocationTable;
    }
    if (!table) {
        table = currentTable;
    }
    vistorian.exportTableCSV(table);
}
function replaceCellContents(tableId) {
    var replace_pattern = $('#div_' + tableId + ' #replace_pattern').val();
    var replace_value = $('#div_' + tableId + ' #replace_value').val();
    var arr;
    if (tableId.startsWith('datatable_'))
        tableId = tableId.slice(10, tableId.length);
    var table = storage.getUserTable(tableId, SESSION_NAME);
    if (table == undefined) {
        table = currentNetwork.userLocationTable;
    }
    if (table.data) {
        arr = table.data;
    }
    else {
        arr = table;
    }
    var replaceCount = 0;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (isNaN(arr[i][j])) {
                if (arr[i][j].indexOf(replace_pattern) > -1) {
                    arr[i][j] = arr[i][j].replace(replace_pattern, replace_value).trim();
                    replaceCount++;
                }
            }
            else {
                if (arr[i][j] == replace_pattern) {
                    arr[i][j] = replace_value;
                    replaceCount++;
                }
            }
        }
    }
    table.data = arr;
    saveCellChanges();
    saveCurrentNetwork(false);
    showMessage('Replaced ' + replaceCount + ' occurrences of ' + replace_pattern + ' with ' + replace_value + '.', 2000);
}
function extractLocations() {
    showMessage('Extracting locations...', false);
    if (currentNetwork.userLocationTable == undefined) {
        var tableName = currentNetwork.name.replace(/ /g, "_");
        currentNetwork.userLocationTable = new vistorian.VTable(tableName + '-locations', []);
        currentNetwork.userLocationSchema = new networkcube.LocationSchema(0, 1, 2, 3, 4);
        currentNetwork.userLocationTable.data.push(['Id', 'User Label', 'Geo Name', 'Longitude', 'Latitude']);
        storage.saveUserTable(currentNetwork.userLocationTable, SESSION_NAME);
        tables = storage.getUserTables(SESSION_NAME);
    }
    var locationTable = currentNetwork.userLocationTable;
    var locationSchema = currentNetwork.userLocationSchema;
    if (locationTable.data.length == 0) {
        var schemaStrings = [];
        locationTable.data.push(['Id', 'User Label', 'Geoname', 'Longitude', 'Latitude']);
    }
    var locationsFound = 0;
    if (networkcube.isValidIndex(currentNetwork.userNodeSchema.location)) {
        var nodeTable = currentNetwork.userNodeTable.data;
        if (nodeTable != undefined) {
            for (var i = 1; i < nodeTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userNodeSchema.location], locationTable.data);
            }
        }
    }
    if (networkcube.isValidIndex(currentNetwork.userLinkSchema.location_source)) {
        var linkTable = currentNetwork.userLinkTable.data;
        if (linkTable != undefined) {
            for (var i = 1; i < linkTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userLinkSchema.location_target], locationTable.data);
            }
        }
    }
    if (networkcube.isValidIndex(currentNetwork.userLinkSchema.location_target)) {
        if (linkTable != undefined) {
            for (var i = 1; i < linkTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userLinkSchema.location_target], locationTable.data);
            }
        }
    }
    locationsFound = locationTable.data.length;
    saveCurrentNetwork(false);
    showNetwork(currentNetwork.id);
    if (locationsFound > 0)
        showMessage(locationsFound + ' locations found.', 2000);
    else {
        updateLocations();
    }
}
function createLocationEntry(name, rows) {
    if (name == undefined
        || name.length == 0)
        return;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i][1].length == name.length
            && rows[i][1].indexOf(name) > -1)
            return;
    }
    rows.push([rows.length - 1, name, name, undefined, undefined]);
}
function updateLocations() {
    showMessage('Retrieving and updating location coordinates...', false);
    vistorian.updateLocationTable(currentNetwork.userLocationTable, currentNetwork.userLocationSchema, function (nothingImportant) {
        saveCurrentNetwork(false);
        showNetwork(currentNetwork.id);
        showMessage('Locations updated successfully!', 2000);
    });
}
var msgBox;
function showMessage(message, timeout) {
    if ($('.messageBox'))
        $('.messageBox').remove();
    msgBox = $('<div class="messageBox"></div>');
    msgBox.append('<div><p>' + message + '</p></div>');
    $('body').append(msgBox);
    msgBox.click(function () {
        $('.messageBox').remove();
    });
    if (timeout) {
        window.setTimeout(function () {
            $('.messageBox').fadeOut(1000);
        }, timeout);
    }
}
function saveCellChanges() {
    if (currentCell == undefined)
        return;
    var selectedCell_row = currentCell.data('row'), selectedCell_col = currentCell.data('column'), data = currentCell.data('table').data, value;
    if (selectedCell_row != undefined && selectedCell_col != undefined) {
        value = currentCell.text().trim();
        data[selectedCell_row][selectedCell_col] = value;
    }
    currentCell = undefined;
}
function clearCache() {
    unshowNetwork();
    localStorage.clear();
    location.reload();
}
function removeNetwork(networkId) {
    currentNetwork = storage.getNetwork(networkId, SESSION_NAME);
    deleteCurrentNetwork();
}
function removeTable(tableId) {
    console.log('>> REMOVE TABLE');
    var table = storage.getUserTable(tableId, SESSION_NAME);
    unshowTable('#individualTables');
    if (currentNetwork.userNodeTable != undefined
        && currentNetwork.userNodeTable.name == table.name) {
        currentNetwork.userNodeTable = undefined;
        currentNetwork.userNodeSchema = undefined;
        $('#nodetableSelect').val(0);
        $("#nodetableSelect option[value='" + table.name + "']").remove();
        $('#nodeTableDiv').empty();
    }
    if (currentNetwork.userLinkTable
        && currentNetwork.userLinkTable.name == table.name) {
        currentNetwork.userLinkTable = undefined;
        currentNetwork.userLinkSchema = undefined;
        $('#linktableSelect').val(0);
        $("#linktableSelect option[value='" + table.name + "']").remove();
        $('#linkTableDiv').empty();
    }
    if (currentNetwork.userLocationTable != undefined
        && currentNetwork.userLocationTable.name == table.name) {
        currentNetwork.userLocationTable = undefined;
        currentNetwork.userLinkSchema = undefined;
        $('#locationtableSelect').val(0);
        $("#locationtableSelect option[value='" + table.name + "']").remove();
        $('#locationTableDiv').empty();
    }
    storage.deleteTable(table, SESSION_NAME);
    loadTableList();
    saveCurrentNetwork(true);
}
function exportNetwork(networkId) {
    vistorian.exportNetwork(storage.getNetwork(networkId, SESSION_NAME));
}
function setNetworkConfig(string) {
    currentNetwork.networkConfig = string;
    storage.saveNetwork(currentNetwork, SESSION_NAME);
    loadNetworkList();
    showNetwork(currentNetwork.id);
}
