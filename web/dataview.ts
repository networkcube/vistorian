/// <reference path="./classes/storage.ts"/>
/// <reference path="../core/networkcube.d.ts"/>
/// <reference path="./classes/vistorian.ts" />

var DATA_TABLE_MAX_LENGTH = 200;


document.getElementById('files').addEventListener('change', getFileInfos, false);
document.getElementById('nodeTableUpload').addEventListener('change', uploadNodeTable, false);
document.getElementById('linkTableUpload').addEventListener('change', uploadLinkTable, false);

var SESSION_NAME = utils.getUrlVars()['session'];
storage.saveSessionId(SESSION_NAME); // save id for later retrieve

var tables = storage.getUserTables(SESSION_NAME);

// user's currently selected network. All visualizations will visualize this network
var currentNetwork: vistorian.Network;

// visualizations among which the user can chose
// format: [shown name, codename]
var visualizations = [
    ['Node Link', 'nodelink'],
    ['Adjacency Matrix', 'matrix'],
    ['Time Arcs', 'dynamicego'],
    ['Map', 'map'],
]


var messages: string[] = [];


init()

function init() {

    loadVisualizationList()

    loadNetworkList()

    loadTableList()

    var networkids = storage.getNetworkIds(SESSION_NAME);
    if(networkids.length > 0)
        showNetwork(networkids[0])

}

// loads the list of available visualizations and displays them on the left
function loadVisualizationList() {
    // create visualization links
    visualizations.forEach(function(v) {
        $('#visualizationList')
            .append('<li class="visLink" title="Show '+v[0]+' visualization.">\
                        <button onclick="loadVisualization(\'' + v[1] + '\')" class="visbutton hastooltip">\
                            <img src="figures/' + v[1] + '.png" class="visicon"/>\
                            <p>' + v[0] + '</p>\
                        </button>\
                    </li>')
    })
    $('#visualizationList')
        .append('<li class="visLink" title="Show matrix and node-link split-view.">\
            <button onclick="loadVisualization(\'mat-nl\')" class="visbutton hastooltip">\
            <img src="figures/nl+mat.png" class="visicon"/><p>Matrix + Node Link</p>\
        </button></li>')
    $('#visualizationList')
        .append('<li class="visLink" title="Show all visualizations.">\
        <button onclick="loadVisualization(\'tileview\')" class="visbutton hastooltip">\
        <img src="figures/all.png" class="visicon"/><p>All</p>\
        </button></li>')
}



// loads the list of tables in this session and displays them on the left
function loadTableList() 
{
    $('#tableList').empty()
    var tableNames = storage.getTableNames(SESSION_NAME)
    tableNames.forEach(t => {
        var shownName = t;
        if(t.length > 30)
            shownName = t.substring(0,30) + '..';
        $('#tableList').append('<li>\
            <a onclick="showSingleTable(\'' + t+ '\')"  class="underlined">' + shownName + '.csv</a>\
            <img class="controlIcon" title="Delete this table." src="logos/delete.png" onclick="removeTable(\''+ t +'\')"/>\
        </li>')
    })
}

// loads the list of networks for this session and displays them on the left
function loadNetworkList() {

    $('#networkList').empty()
    var networkNames = storage.getNetworkIds(SESSION_NAME)
    var network: vistorian.Network;
    networkNames.forEach(t => {
        network = storage.getNetwork(t,SESSION_NAME);
        $('#networkList').append('\
            <li>\
                <a onclick="showNetwork(\'' + network.id + '\')"  class="underlined">' + network.name + '</a>\
                <img class="controlIcon" title="Delete this network." src="logos/delete.png" onclick="removeNetwork(\''+ network.id +'\')"/>\
                <img class="controlIcon" title="Download this network in .vistorian format." src="logos/download.png" onclick="exportNetwork(\''+ network.id +'\')"/>\
            </li>')
    })
}



// VISUALIZATIONS

// creates a new visualization of the passed type
function loadVisualization(visType) {
    trace.event("system", "ts_" + visType, "CCC", "DDD");
    window.open('sites/' + visType + '.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name);
}





// CREATE NETWORK //

function createNetwork() {

    var networkIds = storage.getNetworkIds(SESSION_NAME);
    var id = new Date().getTime();

    currentNetwork = new vistorian.Network(id);
    currentNetwork.name = 'Network-' + currentNetwork.id;
    storage.saveNetwork(currentNetwork,SESSION_NAME);
    // saveCurrentNetwork(true);

    // $('#chooseNetworktype').css('display', 'block')
    // $('#networkTables').css('display', 'block')
    showNetwork(currentNetwork.id);

    loadNetworkList();
}


function setNodeTable(list) 
{
    var tableName = list.value;
    if (tableName != '---') {
        var table: vistorian.VTable = storage.getUserTable(tableName,SESSION_NAME);
        currentNetwork.userNodeTable = table;
        // console.log('currentNetwork.userNodeTable', currentNetwork.userNodeTable)
        showTable(table, '#nodeTableDiv', false, currentNetwork.userNodeSchema)
    } else {
        unshowTable('#nodeTableDiv');
        currentNetwork.userNodeTable = undefined;
    }
}

function setLinkTable(list) {
    var tableName = list.value;
    if (tableName != '---') {
        var table: vistorian.VTable = storage.getUserTable(tableName,SESSION_NAME);
        currentNetwork.userLinkTable = table;
        showTable(table, '#linkTableDiv', false, currentNetwork.userLinkSchema);
    } else {
        unshowTable('#linkTableDiv');
        currentNetwork.userLinkTable = undefined;
    }
}

function setLocationTable(list) {
    var tableName = list.value;
    if (tableName != '---') {
        var table: vistorian.VTable = storage.getUserTable(tableName,SESSION_NAME);
        currentNetwork.userLocationTable = table;
        currentNetwork.userLocationSchema = new networkcube.LocationSchema(0, 1, 2, 3, 4);
        showTable(table, '#locationTableDiv', true, currentNetwork.userLocationSchema);
    } else {
        unshowTable('#locationTableDiv');
        currentNetwork.userLocationTable = undefined;
    }
}


// saves/updates and normalizes current network.
function saveCurrentNetwork(failSilently: boolean) 
{

    // console.log('Save current network')

    // var networkcubeDataSet: networkcube.DataSet;

    saveCellChanges();

    // create new network data set, if necessary
    // if (currentNetwork.networkCubeDataSet == undefined) {
    //     networkcubeDataSet = new networkcube.DataSet({
    //         name: currentNetwork.name,
    //         nodeTable: [],
    //         linkTable: [],
    //         locationTable: []
    //     });
    //     currentNetwork.networkCubeDataSet = networkcubeDataSet;
    // } else {
    //     networkcubeDataSet = currentNetwork.networkCubeDataSet;
    // }

    currentNetwork.name = $('#networknameInput').val();
    // currentNetwork.networkCubeDataSet.name = $('#networknameInput').val();

    if (currentNetwork.userNodeSchema.time != -1) {
        currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userNodeSchema.name).val()
    }

    if (currentNetwork.userLinkSchema.time != -1) {
        currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userLinkSchema.name).val()
    }

    // check dates if apply
    checkTimeFormatting(currentNetwork);

    storage.saveNetwork(currentNetwork, SESSION_NAME);

    if (!currentNetwork.userNodeTable && !currentNetwork.userLinkTable) 
    {
        if (!failSilently)
            showMessage("Cannot save without a Node table or a Link Table", 2000);
        return;
    }

    var dataset:networkcube.DataSet = vistorian.importIntoNetworkcube(currentNetwork, SESSION_NAME, failSilently)

    updateNetworkStatusIndication();

    // check if locations have been extracted:
    if(dataset 
    && !currentNetwork.userLocationTable && dataset.locationTable && dataset.locationTable.length > 0)
    {
        currentNetwork.userLocationTable = new vistorian.VTable('userLocationTable', dataset.locationTable);
        // set header
        currentNetwork.userLocationTable.data.splice(0,0,['Id','User Name', 'Geoname', 'Longitude', 'Latitude'])
        currentNetwork.userLocationSchema = dataset.locationSchema;
        storage.saveUserTable(currentNetwork.userLocationTable, SESSION_NAME);
        showTable(currentNetwork.userLocationTable, '#locationTableDiv', true, currentNetwork.userLocationSchema)
        $('#locationtableSelect')
            .append('<option value="userLocationTable">User Location Table</option>')
        $('#locationtableSelect').val('userLocationTable');

        loadTableList();
        storage.saveNetwork(currentNetwork, SESSION_NAME);
    }


    loadNetworkList();
}


// function normalizeLinkTable(n:vistorian.Network)
// {

// }

// function normalizeNodeTable(n:vistorian.Network)
// {

// }

// function createLinkTableFromNodeTable(n:vistorian.Network)
// {

// }

// function createNodeTableFromLinkTable(n:vistorian.Network)
// {
//     // Create node table
//     var linkData = currentNetwork.userLinkTable.data;
//     var id_source: number;
//     var id_target: number;
//     var name: string;
//     var loc: string;
//     var linkSchema: vistorian.VLinkSchema = currentNetwork.userLinkSchema;
//     var timeString: string;
//     var timeFormatted: string;
    
//     var nodeIds: number[] = [];
//     var nodeNames: string[] = [];
//     var nodeLocations: number[][] = [];
//     var nodeTimes: number[][] = [];

//     for (var i = 1; i < linkData.length; i++) {

//         // source node
//         name = linkData[i][linkSchema.source];
//         if (nodeNames.indexOf(name) < 0) {
//             id_source = nodeIds.length
            
//             nodeNames.push(name);
//             nodeIds.push(id_source);
//             nodeLocations.push([]);
//             nodeTimes.push([]);
//         }

//         // target node
//         name = linkData[i][linkSchema.target];
//         if (nodeNames.indexOf(name) < 0) {
//             id_target = nodeIds.length;
            
//             nodeNames.push(name);
//             nodeIds.push(id_target);
//             nodeLocations.push([]);
//             nodeTimes.push([]);
//         }

//         // link time? 

//     }

//     // Create node 
// }


function deleteCurrentNetwork() 
{
    // removes the network from the vistorian front-ed
    storage.deleteNetwork(currentNetwork,SESSION_NAME);

    // deletes the network from the networkcube
    networkcube.deleteData(currentNetwork.name);

    unshowNetwork();
    loadNetworkList();
}


function showNetwork(networkId: number) {

    unshowNetwork();
    // $('#noNetworkTables').css('display', 'none');
    // console.log('networkId', networkId)
    currentNetwork = storage.getNetwork(networkId,SESSION_NAME);

    if (currentNetwork == null)
        return;

    // unshow individual tables
    $('#individualTables').css('display', 'none');
    $('#networkTables').css('display', 'inline');

    // set network name
    $('#networknameInput').val(currentNetwork.name);

    // get all tables for this user so that he can select those 
    // he wants to create his network from.
    var tables = storage.getUserTables(SESSION_NAME)

    $('#nodetableSelect').append('<option class="tableSelection">---</option>')
    $('#linktableSelect').append('<option class="tableSelection">---</option>')
    $('#locationtableSelect').append('<option class="tableSelection">---</option>')

    $('#nodeTableContainer').css('display', 'inline')
    $('#linkTableContainer').css('display', 'inline')


    if(currentNetwork.networkConfig.indexOf('node') > -1)
    {
        $('#linkTableContainer').css('display', 'none')
    }
    if(currentNetwork.networkConfig.indexOf('link') > -1)
    {
        $('#nodeTableContainer').css('display', 'none')
    }
    if(currentNetwork.networkConfig == undefined){
        $('#linkTableContainer').css('display', 'none')
        $('#nodeTableContainer').css('display', 'none')
    }


    tables.forEach(t => {
        // console.log('attach: ', t.name)

        $('#nodetableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>')
        $('#linktableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>')
        $('#locationtableSelect')
            .append('<option value="' + t.name + '">' + t.name + '</option>')
    });

    // if this network already has tables, show them
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


    $('#tileViewLink').attr('href', 'sites/tileview.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name.split(' ').join('___'))
    $('#mat-nlViewLink').attr('href', 'sites/mat-nl.html?session=' + SESSION_NAME + '&datasetName=' + currentNetwork.name.split(' ').join('___'))

    // saveCurrentNetwork(true);
    // storage.saveNetwork(currentNetwork);
    // MarieBoucherTest.run(SESSION_NAME, currentNetwork.name);


    updateNetworkStatusIndication()

}

function updateNetworkStatusIndication()
{
    if(currentNetwork.ready){
        $('#networkStatus')
            .text('Ready for visualization. Select a visualization from the menu on the top.')
            .css('color', '#fff')
            .css('background', '#2b0')
    }else{
        $('#networkStatus')
            .text('Network not ready for visualization. Table or Schema specifications missing.')
            .css('background', '#f63')
            .css('color', '#fff')
    }
}

// removes a displayed table from the DOM
function unshowNetwork() {
    // $('#noNetworkTables').css('display', 'block');

    $('#nodetableSelect').empty();
    $('#linktableSelect').empty();
    $('#locationtableSelect').empty();
    unshowTable('#linkTableDiv');
    unshowTable('#nodeTableDiv');
    unshowTable('#locationTableDiv');
    $('#networkTables').css('display', 'none');
    $('#tileViewLink').attr('href', 'tileview.html?session=' + SESSION_NAME)
    $('#mat-nlViewLink').attr('href', 'mat-nl.html?session=' + SESSION_NAME)
}








// TABLES ///

// removes a displayed table from the DOM
function unshowTable(elementName: string) {
    $(elementName).empty();
}

var currentTable: vistorian.VTable;

function showSingleTable(tableName: string) {
    currentTable = storage.getUserTable(tableName,SESSION_NAME);
    showTable(currentTable, '#individualTable', false);
    $('#individualTables').css('display', 'inline');
    $('#networkTables').css('display', 'none');
    // $('#noNetworkTables').css('display', 'none');

}

// displays a table into the DOM
// - if schema is passed, shows the schema on the dropdown
// - if user selects a time field, displays field to specify time format
var currentTableId: string;
var currentCell;
function showTable(table: vistorian.VTable, elementName: string, isLocationTable: boolean, schema?: vistorian.VTableSchema) {
    var tHead, tBody;
    
    currentTable = table;

    $(elementName).empty();

    // table name
    var tableId = 'datatable_' + table.name;
    currentTableId = tableId
    $('#' + tableId).remove();

    var tableDiv = $('<div id="div_' + tableId + '"></div>');
    $(elementName).append(tableDiv);

    var tableMenu = $(elementName).prev()
    tableMenu.find('.tableMenuButton').remove();

    // tableDiv.append(tableMenu);

    var data = table.data
    if(data.length > DATA_TABLE_MAX_LENGTH){
        var info = $('<p>Table shows first 200 rows out of ' + data.length + ' rows in total.</p>');
        tableDiv.append(info);
    }

    // CREATE TABLE MENU    
    // export button
    var csvExportButton = $('<button class="tableMenuButton" onclick="exportCurrentTableCSV(\'' + table.name + '\')">Export as CSV</button>')
    tableMenu.append(csvExportButton);

    // location extraction button
    // var extractLocationCoordinatesButton
    // if (isLocationTable) {
    //     tableMenu.append($('<button class="tableMenuButton" onclick="updateLocations()">Update location coordinates</button>'))
    // }else{
    //     tableMenu.append($('<button class="tableMenuButton" onclick="extractLocations()">Extract locations</button>'))
    // }

    
    // replace function
    // tableMenu.append('Replace <input id="replace_pattern" type="text"/> by <input type="text" id="replace_value"/><input id="replaceButton" type="button" class="tableMenuButton" onclick="replaceCellContents(\''+tableId+'\')" value="Replace"/>');


    // table status
    // tableMenu.append('<div id="datatable_' + table.name + '_tool" ></div>');
    // tableMenu.append('<div id="datatable_' + table.name + '_error" ></div>');

    // create table

    var tab = $('<table id="' + tableId + '">');
    tableDiv.append(tab);
    tab.addClass('datatable stripe hover cell-border and order-column compact');

    // create head
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

    // Load data into html table
    for (var r = 1; r < Math.min(data.length, DATA_TABLE_MAX_LENGTH); r++) {
        tr = $('<tr></tr>').addClass('tablerow')
        tBody.append(tr);
        for (var c = 0; c < data[r].length; c++) {
            td = $('<td></td>').attr('contenteditable', 'true');
            td.data('row', r);
            td.data('column', c);
            td.data('table', table);

            tr.append(td);
            td.html(data[r][c])
            td.blur(function() {
                if ($(this).html().length == 0) {
                    $(this).addClass('emptyTableCell')
                } else {
                    $(this).removeClass('emptyTableCell')
                }
            });
            td.focusin(function(e) {
                // console.log('td.focusin');
                saveCellChanges();
                currentCell = $(this);
            });
            td.focusout(function(e) {
                // console.log('td.focusout');
                saveCellChanges();
            });
            if (typeof data[r][c] == 'string' && data[r][c].trim().length == 0)
                td.addClass('emptyTableCell')
        }
    }
    // addOption('table_select', [{'id':'datatable_' + table.id,'name':table.name}]);


    // turn table into an interactive jQuery table
    var dtable = $('#' + tableId).DataTable({
        "autoWidth": true
    });
    dtable.columns.adjust().draw();

    // handle cell change events and store new values in data table
    // $('#' + tableId + ' tbody').on('click', 'td', function() {
    //     saveCellChanges();
    //     currentCell = $(this);
    // });



    // Add schema selection to table, if a schema is passed
    if (schema) {

        // console.log('Schema', schema);

        // add schema header
        var schemaRow = $('<tr class="schemaRow"></tr>');
        $('#' + tableId + ' > thead').append(schemaRow);

        var select, cell, option, timeFormatInput;

        for (var i = 0; i < table.data[0].length; i++) {
            cell = $('<th class="schemaCell" id="schemaCell_' + schema.name + '_' + i + '"></th>')
            schemaRow.append(cell);
            select = $('<select class="schemaSelection" onchange="schemaSelectionChanged(this.value, ' + i + ' , \'' + schema.name + '\')"></select>');
            cell.append(select);
            select.append('<option>(Not visualized)</option>')
            for (var field in schema) {
                if (field == 'name'
                    || field == 'constructor'
                    || field == 'timeFormat')
                    continue;
                
                var fieldName = '';
                // Translate schema names in human readable text
                switch(field){
                    case 'source': fieldName = 'Source Node'; break;
                    case 'target': fieldName = 'Target Node'; break;
                    case 'source_location': fieldName = 'Source Node Location'; break;
                    case 'target_location': fieldName = 'Target Node Location'; break;
                    case 'linkType': fieldName = 'Link Type'; break;
                    case 'location': fieldName = 'Node Location'; break;
                    case 'label': fieldName = 'Node'; break;
                    default : 
                        fieldName = field;
                        fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);    
                }    
                    
                    

                option = $('<option value='+field+'>' + fieldName + '</option>');
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
                            val = "value='"+currentNetwork.timeFormat+"'";
                        }
                        timeFormatInput = $('<span class="nobr"><input title="Enter a date pattern" type="text" size="12" id="timeFormatInput_' + schema.name + '" placeholder="DD/MM/YYYY" '+val+' onkeyup="timeFormatChanged()"></input><a href="http://momentjs.com/docs/#/parsing/string-format/" target="_blank" title="Details of the date pattern syntax"><img src="logos/help.png" class="inlineicon"/></a></span>');
                        cell.append(timeFormatInput);
                    }
                }

                // check relations
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

function timeFormatChanged()
{
    currentNetwork.timeFormat = $('#timeFormatInput_' + currentNetwork.userNodeSchema.name).val()
    saveCurrentNetwork(false);
}

// function showLocationTable(table:any[], elementName:string, schema:networkcube.LocationSchema){
//     var tHead, tBody;
//     console.log('>>>Show location table');

//     $(elementName).empty();

//     // table name
//     var tableId = 'datatable_locationTable';
//     $('#'+tableId).remove();

//     var tableDiv = $('<div id="div_'+ tableId +'"></div>');
//     $(elementName).append(tableDiv);

//     var tableMenu = $('<div class="tableMenu"></div>');
//     tableDiv.append(tableMenu);

//     // tableMenu.append('<p id="datatable_locationTable_name"><b>Name:</b>Locations</p>');
//     // var csvExportButton = $('<button class="csvExportButton" onclick="exportCurrentTableCSV()">Export as CSV</button>')
//     // tableMenu.append(csvExportButton);
//     // export button
//     var csvExportButton = $('<button class="tableMenuButton" onclick="exportLocationTableCSV()">Export as CSV</button>')
//     tableMenu.append(csvExportButton);


//     // table status
//     tableMenu.append('<div id="datatable_locationTable_tool" ></div>');
//     tableMenu.append('<div id="datatable_locationTable_error" ></div>');

//     // create table

//     var tab = $('<table id="'+ tableId + '" style="width: 100%">');
//     tableDiv.append(tab);
//     tab.addClass('datatable stripe hover cell-border and order-column compact');

//     // create head
//     tHead = $('<thead>');
//     tab.append(tHead);
//     var tr = $('<tr></tr>').addClass('tableheader');
//     tHead.append(tr);

//     if(table[0] == undefined)
//         return;

//     // add header to table
//     var firstRow:any[]= [-1,-1,-1,-1];
//     for(field in schema){
//         firstRow[schema[field]] = field;
//     }


//     var data = table.slice(0);
//     data.splice(0, 0, firstRow);
//     for (var c = 0; c < data[0].length; c++) {
//         var td = $('<th></th>').addClass('th').attr('contenteditable', 'false');
//         tr.append(td);
//         td.html(data[0][c]);
//     }

//     tBody = $('<tbody></tbody>');
//     tab.append(tBody);

//     // Load data into html table
//     for (var r = 1; r < data.length; r++) {
//         tr = $('<tr></tr>').addClass('tablerow')
//         tBody.append(tr);
//         for (var c = 0; c < data[r].length; c++) {
//             td = $('<td></td>').attr('contenteditable', 'true');
//             tr.append(td);
//             td.html(data[r][c])
//             td.blur(function() {
//                 if($(this).html().length == 0){
//                     $(this).addClass('emptyTableCell')
//                 }else{
//                     $(this).removeClass('emptyTableCell')
//                 }
//             });
//             if(typeof data[r][c] == 'string'  && data[r][c].trim().length == 0)
//                 td.addClass('emptyTableCell')
//         }
//     }
//     // addOption('table_select', [{'id':'datatable_' + table.id,'name':table.name}]);


//     // turn table into an interactive jQuery table
//     $('#' + tableId).DataTable( {
//         "autoWidth": true
//     } );

//     // handle cell change events and store new values in data table
//     $('#'+tableId+ ' tbody').on( 'click', 'td', function () {
//         // if(selectedCell_row != undefined && selectedCell_col != undefined){
//         //     var text = $('#' + tableId + ' tbody').children()[selectedCell_row].children[selectedCell_col].innerText;        
//         //     table[selectedCell_row][selectedCell_col] = text.trim();
//         //     console.log('Cell content replaced', table.data[selectedCell_row][selectedCell_col], text);    
//         //     showNetwork(currentNetwork.id);
//         // }   
//         saveCellChanges();     
//         selectedCell_row = $(this).parent().index();
//         selectedCell_col = $(this).index();
//     });

//     // Add schema selection to table, if a schema is passed
//     if(schema && table[0])
//     {
//         console.log('schema found')

//         // add schema header
//         var schemaRow = $('<tr class="schemaRow"></tr>');
//         $('#' + tableId + ' > thead').append(schemaRow);

//         var select, cell, option, timeFormatInput;

//         for(var i=0 ; i<table[0].length ; i++){
//             cell = $('<th class="schemaCell" id="schemaCell_'+schema.name+'_'+i+'"></th>')
//             schemaRow.append(cell);
//             select = $('<select onchange="schemaSelectionChanged(this.value, '+i+' , \''+ schema.name+'\')"></select>');
//             cell.append(select);
//             select.append('<option>---</option>')
//             for (var field in schema) {
//                 if(field == 'name'
//                 || field == 'constructor'
//                 || field == 'timeFormat')
//                     continue;

//                 option = $('<option>'+field+'</option>');
//                 select.append(option);

//                 if(i==0 && field=='id'){
//                     $(option).attr('selected','selected');
//                     schema[field] = 0;
//                 }

//                 if(schema[field] == i){
//                     $(option).attr('selected','selected');
//                     if(field == 'time'){
//                         timeFormatInput = $('<input type="text" size="30" id="timeFormatInput_'+schema.name+'"></input>')
//                         cell.append(timeFormatInput)
//                         if(currentNetwork[schema.name].hasOwnProperty('timeFormat')){
//                             timeFormatInput.val(currentNetwork[schema.name].timeFormat);
//                         }
//                     }                    
//                 }
//             }
//         }
//     }
// }

function deleteCurrentTable() {
    storage.deleteTable(currentTable,SESSION_NAME);
    $('#individualTables').css('display', 'none');
    loadTableList();
}

// called when the user assigns a schema in an table
function schemaSelectionChanged(field: string, columnNumber: number, schemaName: string, parent: HTMLElement) {

    // reset schema:
    for (var field2 in currentNetwork[schemaName])
    {
        if (field2 == 'relation' && currentNetwork[schemaName][field2].indexOf(columnNumber) > -1) {
            if(field == '(Not visualized)')
            {
                currentNetwork[schemaName][field2].splice(currentNetwork[schemaName][field2].indexOf(columnNumber), 1);
            }else{
                var arr = currentNetwork[schemaName][field]
                currentNetwork[schemaName][field2].slice(arr.indexOf(columnNumber), 0);
            }
        } else {
            if (currentNetwork[schemaName][field2] == columnNumber) {
                // console.log('set ', field2, 'to -1');
                currentNetwork[schemaName][field2] = -1;
            }
        }
    }

    if (field == 'relation') {
        currentNetwork[schemaName][field].push(columnNumber);
    } else if (field != '---') {
        currentNetwork[schemaName][field] = columnNumber;
    }
    // console.log("currentNetwork[schemaName]", currentNetwork[schemaName])

    saveCurrentNetwork(false);
    showNetwork(currentNetwork.id)
}


function checkTimeFormatting(network: vistorian.Network) {

    // console.log('checkTimeFormatting');

    var corruptedNodeTimes: number[] = [];
    if (network.userNodeTable && network.userNodeTable && network.userNodeSchema && network.userNodeSchema['timeFormat']) {
        corruptedNodeTimes = vistorian.checkTime(
            network.userNodeTable,
            network.userNodeSchema['time'],
            network.userNodeSchema['timeFormat']);
        // console.log('corruptedTimes', corruptedNodeTimes);
    }

    var corruptedLinkTimes: number[] = [];
    if (network.userLinkTable && network.userLinkSchema && network.userLinkSchema['timeFormat']) {
        corruptedLinkTimes = vistorian.checkTime(
            network.userLinkTable,
            network.userLinkSchema['time'],
            network.userLinkSchema['timeFormat']);
        // console.log('corruptedTimes', corruptedLinkTimes);
    }

    // return corruptedNodeTimes.length > 0 || corruptedLinkTimes.length > 0;
    return false;
}

function removeRow(row: number) {

}


/// FILES


var filesToUpload = [];

function getFileInfos(e) {
    filesToUpload = [];
    
    var files: File[] = e.target.files; // FileList object
    
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++)
    {
        if (f.name.split('.')[1] != 'csv') {
            // output.push('<li style="color:#f00;"><strong>', f.name, '</strong> is not a CSV file.</li>');
            showMessage("Uploaded file is not a .csv file. Please chose another file.", 4000)
            return;
        } else {
            filesToUpload.push(f);
        }
    }

    uploadFiles(loadTableList);
}
function uploadNodeTable(e)
{
    filesToUpload = [e.target.files[0]];
    uploadFiles(()=>{
        var tables = storage.getUserTables(SESSION_NAME)
        var lastTable = tables[tables.length-1];

        $('#nodetableSelect').append('<option value="' + lastTable.name + '">' + lastTable.name + '</option>')
        $('#nodetableSelect').val(lastTable.name);

        setNodeTable({value: lastTable.name})
        showTable(currentNetwork.userNodeTable, '#nodeTableDiv', false, currentNetwork.userNodeSchema);
        saveCurrentNetwork(false);

        loadTableList();

    });
        
}
function uploadLinkTable(e)
{
    filesToUpload = [e.target.files[0]];
    uploadFiles(()=>{
        var tables = storage.getUserTables(SESSION_NAME)
        var lastTable = tables[tables.length-1];

        $('#linktableSelect').append('<option value="' + lastTable.name + '">' + lastTable.name + '</option>')
        $('#linktableSelect').val(lastTable.name);

        setLinkTable({value: lastTable.name})
        showTable(currentNetwork.userLinkTable, '#linkTableDiv', false, currentNetwork.userLinkSchema);
        saveCurrentNetwork(false);

        var element = document.getElementById('leaveCode');
    
        loadTableList();
    });
}

function uploadFiles(handler:Function)
{
    vistorian.loadCSV(filesToUpload, () => {
        handler();
    }, SESSION_NAME);
}

function exportCurrentTableCSV(tableName: string) {
    saveCellChanges();
    var table: vistorian.VTable = null;

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

// function exportLocationTableCSV() {
//     if (currentNetwork.networkCubeDataSet.locationTable) {
//         saveCellChanges();
//         vistorian.exportLocationTableCSV(currentNetwork.name, currentNetwork.networkCubeDataSet.locationTable);
//     }
// }

// function displayLocationTable(){  
// var locationTable = currentNetwork.networkCubeDataSet.locationTable;
// if(locationTable != undefined)  
//     showLocationTable(currentNetwork.networkCubeDataSet.locationTable, '#locationTableDiv', currentNetwork.networkCubeDataSet.locationSchema)
// }

function replaceCellContents(tableId) {
    var replace_pattern = $('#div_'+tableId+' #replace_pattern').val();
    var replace_value = $('#div_'+tableId+' #replace_value').val();
    // console.log('replace_pattern', replace_pattern)
    // console.log('replace_value', replace_value)
    var arr: any[][];
    
    if(tableId.startsWith('datatable_'))
        tableId = tableId.slice(10,tableId.length)
    var table = storage.getUserTable(tableId,SESSION_NAME);
    if(table == undefined){
        table = currentNetwork.userLocationTable;
    }
    if(table.data) {
        arr = table.data
    } else {
        arr = table;
    }
    // console.log('table', table)

    var replaceCount = 0
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if(isNaN(arr[i][j])){
                // for text
                if(arr[i][j].indexOf(replace_pattern) > -1) {
                    arr[i][j] = arr[i][j].replace(replace_pattern, replace_value).trim();
                    replaceCount++;
                }
            }else{
                // for numerals
                if(arr[i][j] == replace_pattern) {
                    arr[i][j] = replace_value;
                    replaceCount++;
                }
            }
        }
    }

    table.data = arr;
    
    saveCellChanges();
    saveCurrentNetwork(false);
    showMessage('Replaced '+ replaceCount+ ' occurrences of '+ replace_pattern+ ' with '+ replace_value+ '.' , 2000);
}

/** Extracts locations from node and link tabe**/
function extractLocations() {

    // console.log('>>>> Extracting locations') 
    showMessage('Extracting locations...', false);

    if (currentNetwork.userLocationTable == undefined) 
    {
        var tableName = currentNetwork.name.replace(/ /g, "_");
        currentNetwork.userLocationTable = new vistorian.VTable(tableName + '-locations', []);
        currentNetwork.userLocationSchema = new networkcube.LocationSchema(0, 1, 2, 3, 4);
        currentNetwork.userLocationTable.data.push(['Id', 'User Label', 'Geo Name', 'Longitude', 'Latitude']);

        // save table as a user's table 
        storage.saveUserTable(currentNetwork.userLocationTable, SESSION_NAME);
        tables = storage.getUserTables(SESSION_NAME);
    }

    var locationTable = currentNetwork.userLocationTable;
    var locationSchema = currentNetwork.userLocationSchema;

    // if location table is empty, add header as first column
    if (locationTable.data.length == 0) {
        var schemaStrings: string[] = [];
        locationTable.data.push(['Id', 'User Label', 'Geoname', 'Longitude', 'Latitude']);
    }
    var locationsFound: number = 0;

    // check node table for locations
    if (networkcube.isValidIndex(currentNetwork.userNodeSchema.location)) {
        var nodeTable = currentNetwork.userNodeTable.data;
        if (nodeTable != undefined) {
            for (var i = 1; i < nodeTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userNodeSchema.location], locationTable.data)
            }
        }
    }
    // check link table
    if (networkcube.isValidIndex(currentNetwork.userLinkSchema.location_source)) {
        var linkTable = currentNetwork.userLinkTable.data;
        if (linkTable != undefined) {
            // check if location table exists
            for (var i = 1; i < linkTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userLinkSchema.location_target], locationTable.data)
            }
        }
    }

    if (networkcube.isValidIndex(currentNetwork.userLinkSchema.location_target)) {
        // check if location table exists
        if (linkTable != undefined) {
            // locationsFound = true;
            for (var i = 1; i < linkTable.length; i++) {
                createLocationEntry(linkTable[i][currentNetwork.userLinkSchema.location_target], locationTable.data)
            }
        }
    }
    
    locationsFound = locationTable.data.length;

    saveCurrentNetwork(false);
    showNetwork(currentNetwork.id);

    if (locationsFound > 0)
        showMessage(locationsFound + ' locations found.', 2000);
    else{
        // showMessage('In order to extract locations, you must specify which columns are locations in your node and link tables.', 2000);
        updateLocations();
    }
}

function createLocationEntry(name: string, rows: any[]) {

    // check validity
    if (name == undefined
        || name.length == 0)
        return;

    // check if location entry exists already.     
    for (var i = 0; i < rows.length; i++) {
        if (rows[i][1].length == name.length
            && rows[i][1].indexOf(name) > -1)
            return;
    }

    rows.push([rows.length - 1, name, name, undefined, undefined]);
}

/** Updates long/lat for geonames field in the location table**/
function updateLocations() 
{
    showMessage('Retrieving and updating location coordinates...', false);

    vistorian.updateLocationTable(currentNetwork.userLocationTable, currentNetwork.userLocationSchema,
        function(nothingImportant) {
            // console.log('currentNetwork.userLocationTable', currentNetwork.userLocationTable.data)
            saveCurrentNetwork(false);
            showNetwork(currentNetwork.id);
            showMessage('Locations updated successfully!', 2000);
        });
}

var msgBox;
function showMessage(message: string, timeout) {
    if ($('.messageBox'))
        $('.messageBox').remove();

    msgBox = $('<div class="messageBox"></div>');
    msgBox.append('<div><p>' + message + '</p></div>');
    $('body').append(msgBox);
    msgBox.click(function() {
        $('.messageBox').remove();
    })

    if (timeout) {
        // Automatically disappear
        window.setTimeout(function() {
            $('.messageBox').fadeOut(1000);
        }, timeout);
    }

}


function saveCellChanges() {
    if (currentCell == undefined)
        return;

    var selectedCell_row = currentCell.data('row'),
        selectedCell_col = currentCell.data('column'),
        data = currentCell.data('table').data,
        value;

    // console.log('saveCellChanges', selectedCell_row, selectedCell_col);

    if (selectedCell_row != undefined && selectedCell_col != undefined) {
        value = currentCell.text().trim();
        data[selectedCell_row][selectedCell_col] = value;
    }
    currentCell = undefined;
} 


function clearCache(){
    unshowNetwork();
    // networkcube.clearAllDataManagerSessionCaches();    
    
    localStorage.clear();
    // vistorian.clearCache();
    // networkcube.clearAllDataManagerSessionCaches();

    location.reload()
    // showMessage('Cache cleared', 2000)

}

function removeNetwork(networkId:string){
    currentNetwork = storage.getNetwork(networkId,SESSION_NAME);
    deleteCurrentNetwork();
}

function removeTable(tableId:string)
{
    console.log('>> REMOVE TABLE');

    var table = storage.getUserTable(tableId,SESSION_NAME);
    unshowTable('#individualTables')

    if(currentNetwork.userNodeTable != undefined 
    && currentNetwork.userNodeTable.name == table.name){
        currentNetwork.userNodeTable = undefined;
        currentNetwork.userNodeSchema = undefined;
        $('#nodetableSelect').val(0);
        $("#nodetableSelect option[value='" +table.name+"']").remove()
        $('#nodeTableDiv').empty()
    }

    if(currentNetwork.userLinkTable 
    && currentNetwork.userLinkTable.name == table.name){
        currentNetwork.userLinkTable = undefined;
        currentNetwork.userLinkSchema = undefined;
        $('#linktableSelect').val(0);
        $("#linktableSelect option[value='" +table.name+"']").remove()
        $('#linkTableDiv').empty()
    }

    if(currentNetwork.userLocationTable != undefined 
    && currentNetwork.userLocationTable.name == table.name){
        currentNetwork.userLocationTable = undefined;
        currentNetwork.userLinkSchema = undefined;
        $('#locationtableSelect').val(0);
        $("#locationtableSelect option[value='" +table.name+"']").remove()
        $('#locationTableDiv').empty()
    }

    storage.deleteTable(table,SESSION_NAME)
    loadTableList();
    saveCurrentNetwork(true);
}

function exportNetwork(networkId:number){
    vistorian.exportNetwork(storage.getNetwork(networkId,SESSION_NAME))
}

function setNetworkConfig(string){

    currentNetwork.networkConfig = string;

    // $('#chooseNetworktype').css('display', 'none')
    
    storage.saveNetwork(currentNetwork,SESSION_NAME);
    loadNetworkList();

    showNetwork(currentNetwork.id)

}
