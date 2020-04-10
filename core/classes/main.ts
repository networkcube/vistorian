/// <reference path="./datamanager.ts" />
/// <reference path="./dynamicgraph.ts" />
/// <reference path="./utils.ts" />
/// <reference path="../scripts/jquery.d.ts" />

/** A collection of Networkcube's  global function availeble
 * through networkcube.myFunc()
 * */
module networkcube {

    // must agree with var of same name in DynamicGraph.initDynamicGraph()
    export var TIME_FORMAT: string = 'YYYY-MM-DD hh:mm:ss';
    /**
     * Returns the networkcube standart time format
     * @return {[type]} [description]
     */
    export function timeFormat() {
        return TIME_FORMAT;
    }

    // GLOBAL VARIABLES
    var dataManager: DataManager = new DataManager();
    var session: string;

    export function setSession(sessionName: string) {
        session = sessionName;
    }

    export function setDataManagerOptions(options: DataManagerOptions): void {
        dataManager.setOptions(options);
    }

    export function isSessionCached(session: string, dataSetName: string) {
        return dataManager.isSessionCached(session, dataSetName);
    }
 
    // DATA
    /**
     * Imports a data set into network cube.
     * @param  {string}  session [description]
     * @param  {DataSet} data    [description]
     * @return {[type]}          [description]
     */
    export function importData(sessionName: string, data: DataSet) {
        console.log('[n3] Import data', data.name);
        session = sessionName;
        dataManager.importData(sessionName, data);
    }

    export function deleteData(dataSetName: string){
        // deletes a network
        getDynamicGraph(dataSetName).delete(dataManager);
    }
    
    export function clearAllDataManagerSessionCaches(){
        dataManager.clearAllSessionData();
    }


    // getData() -> gets session and datatype parameter from the url
    // getData(datsetname) -> retrives data from current session
    //     export function getData(dataName?: string): DataSet {
    //         // console.log('getUrlVars()', getUrlVars())
    //         if (!dataName)
    //             dataName = getUrlVars()['datasetName'];
    //         this.session = getUrlVars()['session'];
    // 
    //         // console.log('call getData',dataName, this.session)
    //         return dataManager.getData(this.session, dataName);
    //     }

    // Updates the passed data set
    // export function updateData(dataSet: DataSet) {
    //     dataManager.updateData(dataSet);
    // }

    export function getDynamicGraph(dataName?: string, session?: string): DynamicGraph {
        var so = setOps;
        uidMethod = so.pushUid(function() {
            return this._id;
        });
        
        var vars = getUrlVars();
        // console.log('getUrlVars()', vars)
        if (!dataName)
            dataName = vars['datasetName'];
        if (!session)
            this.session = vars['session'];
        else
            this.session = session;

        // console.log('[networkcube] getDynamicGraph', dataName, this.session)
        return dataManager.getGraph(this.session, dataName);
    }


    // VIEWS + VISUALIZATIONS


    // opens a new window and loads a visualization of type vistype,
    // // with the data set dataname
    export function openVisualizationWindow(session: string, visUri: string, dataName: string) {
        // console.log('[n3] Create Visualization', visType, 'for data', dataName);
        openView(session, visUri, dataName, false);
    }
    
    // opens a new tab and loads a visualization of type vistype,
    // // with the data set dataname
    export function openVisualizationTab(session: string, visUri: string, dataName: string) {
        // console.log('[n3] Create Visualization', visType, 'for data', dataName);
        openView(session, visUri, dataName, true);
    }

    // create a tab that shows one of the specified visualizations at a time
    export function createTabVisualizations(parentId:string, visSpec:Object[], session:string, dataName:string, 
        width: number,
        height: number, visParams?:Object){

        var parent = $('#'+parentId);
        
        var tabDiv = $('<div></div>')
        parent.append(tabDiv)

        var visDiv = $('<div></div>')
        parent.append(visDiv)
        
        
        var ul = $('<ul class="networkcube-tabs"\
                style="\
                    list-style-type: none;\
                    margin: 0;\
                    padding:2px;\
                    overflow: hidden;\
                    border: none;\
                    background-color: #f1f1f1;"\
                ></ul>')        
        tabDiv.append(ul)        
        
        // create tabs and divs
        for(var i=0 ; i <visSpec.length ; i++ ){
            visSpec[i].name = visSpec[i].name.replace(' ','-')
            ul.append($('<li style="float: left;"><a style="\
                display: inline-block;\
                color: black;\
                margin-right: 8px;\
                margin-left: 8px;\
                padding: 5px;\
                text-align: left;\
                text-decoration: none;\
                transition: 0.3s;\
                font-weight: 800;\
                border: #fff 1px solid;\
                border-raduis: 5px;\
                font-size: 13px;" href="#" class="networkcube-tablinks" onclick="networkcube.switchVisTab(event, \''+visSpec[i].name+'\')">'+visSpec[i].name+'</a></li>'))
            visDiv.append($('<div id="networkcube-visTab-'+visSpec[i].name+'" style="display:'+ (i==0 ? 'block' : 'none') +';" class="networkcube-visTabContent"></div>'))
            createVisualizationIFrame('networkcube-visTab-'+visSpec[i].name, visSpec[i].url, session, dataName, width, height, visParams)
        }
    }

    export function switchVisTab(evt, visName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("networkcube-visTabContent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("networkcube-tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById('networkcube-visTab-' + visName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    
    // returns an iframe that loads a visualization of type vistype,
    // with the data set dataname
    export function createVisualizationIFrame(parentId: string, visUri: string, session: string, dataName: string,
        width: number,
        height: number, visParams?:Object) {

        // console.log('[networkcube] Create iframe ', visType);
        $('#' + parentId)
            .append('<iframe></iframe>')
            .attr('width', width)
            .attr('height', height)

        var iframe = $('#' + parentId + '> iframe')

        var visParamString = '';
        for(var prop in visParams){
            visParamString +='&'+prop +'='+ visParams[prop]; 
        }
        iframe.attr('src', visUri + '?'
            + 'session=' + session
            + '&datasetName=' + dataName
            + visParamString
                   );
        if (width)
            iframe.attr('width', width);
        if (height)
            iframe.attr('height', height)

        if(visParams != undefined && visParams.hasOwnProperty('scrolling')){
            iframe.attr('scrolling', visParams.scrolling);
        }    

        return iframe;
    }
    //
    // // Internal convenient function to open a window
    function openView(session: string, visUri: string, dataname: string, tab: boolean) {

        var url = visUri + '?session=' + session + '&datasetName=' + dataname;

        if (tab)
            window.open(url, '_blank');
        else
            window.open(url);
    }

    export function getURLString(dataName: string) {
        return '?session=' + session + '&datasetName=' + dataName;
    }

    // // creates a visualization of type vistype. This function
    // // must be called form the individual visualization windows to obtain the
    // // visualization object.
    // export function getVisualization(vistype:string):Visualization{
    //     var vis:Visualization = new networkcube[vistype]();
    //     return vis;
    // }


    /// UTILITY FUNCTIONS
    export enum OrderType { Local, Global, Data };
}
