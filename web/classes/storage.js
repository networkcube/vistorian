var storage;
(function (storage) {
    var SESSION_TABLENAMES = "vistorian.tablenames";
    var SESSION_TABLE = "vistorian.table";
    var SESSION_NETWORK = "vistorian.network";
    var SESSION_NETWORKIDS = "vistorian.networkIds";
    var SESSION_SESSIONID = "vistorian.lastSessionId";
    var SEP = "#";
    function saveSessionId(sessionid) {
        $.jStorage.set(SESSION_SESSIONID, sessionid);
    }
    storage.saveSessionId = saveSessionId;
    function getLastSessionId() {
        var session = $.jStorage.get(SESSION_SESSIONID);
        return session;
    }
    storage.getLastSessionId = getLastSessionId;
    function saveUserTable(table, sessionid) {
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
            tableNames.push(table.name);
            saveTableNames(tableNames, sessionid);
        }
        else {
        }
        $.jStorage.set(sessionid + SEP + SESSION_TABLE + SEP + table.name, table);
    }
    storage.saveUserTable = saveUserTable;
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
    }
    storage.deleteTable = deleteTable;
    function saveNetwork(network, sessionid) {
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
        $.jStorage.set(sessionid + SEP + SESSION_NETWORK + SEP + network.id, network);
    }
    storage.saveNetwork = saveNetwork;
    function getNetworkIds(sessionid) {
        var ids = $.jStorage.get(sessionid + SEP + SESSION_NETWORKIDS);
        if (ids == undefined)
            ids = [];
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
        networkcube.deleteData(network.name);
        deleteNetworkById(network.id, sessionid);
    }
    storage.deleteNetwork = deleteNetwork;
    function deleteNetworkById(id, sessionid) {
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
    }
    storage.deleteNetworkById = deleteNetworkById;
})(storage || (storage = {}));
