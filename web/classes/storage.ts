/// <reference path="../scripts/jstorage.d.ts"/>
/// <reference path="./vistorian.ts"/>

module storage{


    var SESSION_TABLENAMES:string = "vistorian.tablenames";
    var SESSION_TABLE:string = "vistorian.table";
    var SESSION_NETWORK:string = "vistorian.network";
    var SESSION_NETWORKIDS:string = "vistorian.networkIds";
    var SESSION_SESSIONID:string = "vistorian.lastSessionId";

    var SEP:string = "#";



    // SESSION
    export function saveSessionId(sessionid:string){
        // console.log('save session', sessionid )
        $.jStorage.set(SESSION_SESSIONID, sessionid);
    }

    export function getLastSessionId():string{
        var session:string = $.jStorage.get<string>(SESSION_SESSIONID);
        // console.log('get session, ', session)
        return session;
    }



    //////////////
    /// TABLES ///
    //////////////


    // Stores all user's tables (tables must be in json format)
    export function saveUserTable(table, sessionid:string){
        // console.log('[vistorian] Save user table', table.name, sessionid);

        // add name to table names if not yet there.
        var tableNames:string[] = getTableNames(sessionid);
        var found = false;
        if(!tableNames){
            tableNames = [];
        }else{
            tableNames.forEach(tableName => {
                if(tableName == table.name){
                    found = true;
                }
            })
        }
        if(!found){
            // console.log('\tTable', table.name, 'not found. Table added.')
            tableNames.push(table.name);
            saveTableNames(tableNames,sessionid);
        }else{
            // console.log('\tTable', table.name, 'found. Replace table')
        }
        $.jStorage.set(sessionid + SEP + SESSION_TABLE + SEP + table.name, table);
        // console.log('\tTable', table.name, 'added.', getTableNames(sessionid).length + ' tables stored.', getUserTable(table.name, sessionid))

    }

    // returns all users' tables
    export function getUserTables(sessionid:string):vistorian.VTable[]{

        var tablenames:string[] = this.getTableNames(sessionid);
        var tables:vistorian.VTable[] = [];
        for(var i=0 ; i<tablenames.length ; i++){
            tables.push($.jStorage.get<vistorian.VTable>(sessionid + SEP + SESSION_TABLE + SEP + tablenames[i]));
        }

        return tables;
    }

    export function getUserTable(tablename:string, sessionid:string):vistorian.VTable{
        return $.jStorage.get<vistorian.VTable>(sessionid + SEP + SESSION_TABLE + SEP + tablename)
    }

    export function getTableNames(sessionid:string):string[]{
        var names:string[] = $.jStorage.get<string[]>(sessionid + SEP + SESSION_TABLENAMES);
        // console.log('>>>names',names, sessionid + SEP + SESSION_TABLENAMES )
        if(names == undefined)
            names = []
        return names;
}
    export function saveTableNames(tableNames, sessionid:string){
        $.jStorage.set(sessionid + SEP + SESSION_TABLENAMES, tableNames);
    }
    export function deleteTable(table:vistorian.VTable, sessionid: string){
        $.jStorage.deleteKey(sessionid + SEP + SESSION_TABLE + SEP + table.name);

        var tableNames:string[] = getTableNames(sessionid);
        var found = false;
        if(!tableNames){
            tableNames = [];
        }else{
            tableNames.forEach(tableName => {
                if(tableName == table.name){
                    found = true;
                }
            })
        }
        if(found){
            tableNames.splice(tableNames.indexOf(table.name), 1);
            saveTableNames(tableNames,sessionid);
        }
        // console.log('table deleted', getTableNames(sessionid));
    }






    ////////////////
    /// NETWORKS ///
    ////////////////

    export function saveNetwork(network:vistorian.Network, sessionid:string){

        // add name to table names if not yet there.
        var networkIds:number[] = getNetworkIds(sessionid);
        var found = false;
        if(!networkIds){
            networkIds = [];
        }else{
            networkIds.forEach(networkId => {
                if(networkId == network.id){
                    found = true;
                }
            })
        }
        if(!found){
            networkIds.push(network.id);
            saveNetworkIds(networkIds,sessionid);
            // console.log('Save imported networkId', network.id)
       }
        // console.log('save network', network)
        $.jStorage.set(sessionid + SEP + SESSION_NETWORK + SEP + network.id, network);

    }
    export function getNetworkIds(sessionid:string):number[]{
        var ids:number[] = $.jStorage.get<number[]>(sessionid + SEP + SESSION_NETWORKIDS);
        if(ids == undefined)
            ids = []
        // console.log('getNetworkIds :', sessionid, ids)
        return ids;
    }
    export function saveNetworkIds(networkIds, sessionid:string){
        $.jStorage.set(sessionid + SEP + SESSION_NETWORKIDS, networkIds);
    }

    export function getNetwork(networkId:string, sessionid:string):vistorian.Network
    {
        return $.jStorage.get<vistorian.Network>(sessionid + SEP + SESSION_NETWORK + SEP + networkId);
    }

    export function deleteNetwork(network:vistorian.Network, sessionid:string){
        // console.log('deleteNetworkById', network.id, sessionid);
        networkcube.deleteData(network.name);
        deleteNetworkById(network.id, sessionid);

    }
    export function deleteNetworkById(id:number, sessionid:string){
        // console.log('deleteNetworkById', id, sessionid);

        // remove network tables from local storage: 

        $.jStorage.set(sessionid + SEP + SESSION_NETWORK + SEP + id, {});
        $.jStorage.deleteKey(sessionid + SEP + SESSION_NETWORK + SEP + id);

        var networkIds = getNetworkIds(sessionid);
        var found = false;
        if(!networkIds){
            networkIds = [];
        }else{
            networkIds.forEach(networkId => {
                if(networkId == id){
                    found = true;
                }
            })
        }
        if(found){
            networkIds.splice(networkIds.indexOf(id),1);
            saveNetworkIds(networkIds, sessionid);
        }
        // console.log('[storage] Network removed', getNetworkIds().length, 'networks remaining.');
    }
}
