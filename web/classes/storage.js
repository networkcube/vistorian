/// <reference path="../scripts/jstorage.d.ts"/>
/// <reference path="./vistorian.ts"/>
var storage;
(function (storage) {
    var SESSION_TABLENAMES = "vistorian.tablenames";
    var SESSION_TABLE = "vistorian.table";
    var SESSION_NETWORK = "vistorian.network";
    var SESSION_NETWORKIDS = "vistorian.networkIds";
    var SESSION_SESSIONID = "vistorian.lastSessionId";
    var SEP = "#";
    // SESSION
    function saveSessionId(sessionid) {
        // console.log('save session', sessionid )
        $.jStorage.set(SESSION_SESSIONID, sessionid);
    }
    storage.saveSessionId = saveSessionId;
    function getLastSessionId() {
        var session = $.jStorage.get(SESSION_SESSIONID);
        // console.log('get session, ', session)
        return session;
    }
    storage.getLastSessionId = getLastSessionId;
    //////////////
    /// TABLES ///
    //////////////
    // Stores all user's tables (tables must be in json format)
    function saveUserTable(table, sessionid) {
        // console.log('[vistorian] Save user table', table.name, sessionid);
        // add name to table names if not yet there.
        var tableNames = getTableNames(sessionid);
        var found = false;
        if (!tableNames) {
            tableNames = [];
        }
        else {
            tableNames.forEach(function (tableName) {
                if (tableName == table.name) {
                    found = true;
                }
            });
        }
        if (!found) {
            // console.log('\tTable', table.name, 'not found. Table added.')
            tableNames.push(table.name);
            saveTableNames(tableNames, sessionid);
        }
        else {
        }
        $.jStorage.set(sessionid + SEP + SESSION_TABLE + SEP + table.name, table);
        // console.log('\tTable', table.name, 'added.', getTableNames(sessionid).length + ' tables stored.', getUserTable(table.name, sessionid))
    }
    storage.saveUserTable = saveUserTable;
    // returns all users' tables
    function getUserTables(sessionid) {
        var tablenames = this.getTableNames(sessionid);
        var tables = [];
        for (var i = 0; i < tablenames.length; i++) {
            tables.push($.jStorage.get(sessionid + SEP + SESSION_TABLE + SEP + tablenames[i]));
        }
        return tables;
    }
    storage.getUserTables = getUserTables;
    function getUserTable(tablename, sessionid) {
        return $.jStorage.get(sessionid + SEP + SESSION_TABLE + SEP + tablename);
    }
    storage.getUserTable = getUserTable;
    function getTableNames(sessionid) {
        var names = $.jStorage.get(sessionid + SEP + SESSION_TABLENAMES);
        // console.log('>>>names',names, sessionid + SEP + SESSION_TABLENAMES )
        if (names == undefined)
            names = [];
        return names;
    }
    storage.getTableNames = getTableNames;
    function saveTableNames(tableNames, sessionid) {
        $.jStorage.set(sessionid + SEP + SESSION_TABLENAMES, tableNames);
    }
    storage.saveTableNames = saveTableNames;
    function deleteTable(table, sessionid) {
        $.jStorage.deleteKey(sessionid + SEP + SESSION_TABLE + SEP + table.name);
        var tableNames = getTableNames(sessionid);
        var found = false;
        if (!tableNames) {
            tableNames = [];
        }
        else {
            tableNames.forEach(function (tableName) {
                if (tableName == table.name) {
                    found = true;
                }
            });
        }
        if (found) {
            tableNames.splice(tableNames.indexOf(table.name), 1);
            saveTableNames(tableNames, sessionid);
        }
        // console.log('table deleted', getTableNames(sessionid));
    }
    storage.deleteTable = deleteTable;
    ////////////////
    /// NETWORKS ///
    ////////////////
    function saveNetwork(network, sessionid) {
        // add name to table names if not yet there.
        var networkIds = getNetworkIds(sessionid);
        var found = false;
        if (!networkIds) {
            networkIds = [];
        }
        else {
            networkIds.forEach(function (networkId) {
                if (networkId == network.id) {
                    found = true;
                }
            });
        }
        if (!found) {
            networkIds.push(network.id);
            saveNetworkIds(networkIds, sessionid);
        }
        // console.log('save network', network)
        $.jStorage.set(sessionid + SEP + SESSION_NETWORK + SEP + network.id, network);
    }
    storage.saveNetwork = saveNetwork;
    function getNetworkIds(sessionid) {
        var ids = $.jStorage.get(sessionid + SEP + SESSION_NETWORKIDS);
        if (ids == undefined)
            ids = [];
        // console.log('getNetworkIds :', sessionid, ids)
        return ids;
    }
    storage.getNetworkIds = getNetworkIds;
    function saveNetworkIds(networkIds, sessionid) {
        $.jStorage.set(sessionid + SEP + SESSION_NETWORKIDS, networkIds);
    }
    storage.saveNetworkIds = saveNetworkIds;
    function getNetwork(networkId, sessionid) {
        return $.jStorage.get(sessionid + SEP + SESSION_NETWORK + SEP + networkId);
    }
    storage.getNetwork = getNetwork;
    function deleteNetwork(network, sessionid) {
        // console.log('deleteNetworkById', network.id, sessionid);
        networkcube.deleteData(network.name);
        deleteNetworkById(network.id, sessionid);
    }
    storage.deleteNetwork = deleteNetwork;
    function deleteNetworkById(id, sessionid) {
        // console.log('deleteNetworkById', id, sessionid);
        // remove network tables from local storage: 
        $.jStorage.set(sessionid + SEP + SESSION_NETWORK + SEP + id, {});
        $.jStorage.deleteKey(sessionid + SEP + SESSION_NETWORK + SEP + id);
        var networkIds = getNetworkIds(sessionid);
        var found = false;
        if (!networkIds) {
            networkIds = [];
        }
        else {
            networkIds.forEach(function (networkId) {
                if (networkId == id) {
                    found = true;
                }
            });
        }
        if (found) {
            networkIds.splice(networkIds.indexOf(id), 1);
            saveNetworkIds(networkIds, sessionid);
        }
        // console.log('[storage] Network removed', getNetworkIds().length, 'networks remaining.');
    }
    storage.deleteNetworkById = deleteNetworkById;
})(storage || (storage = {}));
