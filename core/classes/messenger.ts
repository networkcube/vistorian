/// <reference path="./dynamicgraph.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./search.ts" />
/// <reference path="../scripts/jquery.d.ts" />

module networkcube {

    export var MESSAGE_HIGHLIGHT = 'highlight';
    export var MESSAGE_SELECTION = 'selection';
    export var MESSAGE_TIME_RANGE = 'timeRange';
    export var MESSAGE_SELECTION_CREATE = 'createSelection';
    export var MESSAGE_SELECTION_DELETE = 'deleteSelection';
    export var MESSAGE_SELECTION_SET_CURRENT = 'setCurrentSelectionId';
    export var MESSAGE_SELECTION_COLORING = 'setSelectionColor';
    export var MESSAGE_SELECTION_SET_COLORING_VISIBILITY = 'selectionColoring';
    export var MESSAGE_SELECTION_FILTER = 'selectionFilter';
    export var MESSAGE_SELECTION_PRIORITY = 'selectionPriority'
    export var MESSAGE_SEARCH_RESULT = 'searchResult';

    var MESSENGER_PROPAGATE: boolean = true;


    var MESSAGE_HANDLERS: string[] = [
        MESSAGE_HIGHLIGHT,
        MESSAGE_SELECTION,
        MESSAGE_TIME_RANGE,
        MESSAGE_SELECTION_CREATE,
        MESSAGE_SELECTION_DELETE,
        MESSAGE_SELECTION_SET_CURRENT,
        MESSAGE_SELECTION_SET_COLORING_VISIBILITY,
        MESSAGE_SELECTION_FILTER,
        MESSAGE_SELECTION_PRIORITY,
        MESSAGE_SEARCH_RESULT,
        MESSAGE_SELECTION_COLORING
    ]



    var messageHandlers: MessageHandler[] = [];

    // contains handlers for passing messages to the
    // visualization.
    class MessageHandler {

        highlightUpdate: Function;
        selectionUpdate: Function;

    }
    var messageHandler: MessageHandler = new MessageHandler();

    var previousMessageId: number = -1;

    // register an event handler
    export function addEventListener(messageType: string, handler: Function) {
        console.log('>>> addEventListener', messageType)
        messageHandler[messageType] = handler;
    }

    export function setDefaultEventListener(handler: Function) {
        for (var i = 0; i < MESSAGE_HANDLERS.length; i++) {
            messageHandler[MESSAGE_HANDLERS[i]] = handler;
        }
    }

    // create internal listener to storage events
    window.addEventListener('storage', receiveMessage, false);

    export class Message {
        id: number;
        type: string;
        constructor(type: string) {
            this.id = Math.random();
            this.type = type;
        }
    }

    /////////////////////////////
    /// NON-SPECIFIC MESSAGES ///
    /////////////////////////////


    export function sendMessage(type:string, body:Object){
        var m = new Message(type)
        m.body = body;
        distributeMessage(m, true);        
    }
    
    
    
    
    
    
    
    
    /////////////////////////
    /// SPECIFIC MESSAGES ///
    /////////////////////////



    // HIGHLIGHT
    export function highlight(action: string, elementCompound?: ElementCompound): void {

        var g: DynamicGraph = networkcube.getDynamicGraph();
        var idCompound: IDCompound = makeIdCompound(elementCompound);

        if (!elementCompound == undefined)
            action = 'reset';

        // create message
        var m: HighlightMessage;
        m = new HighlightMessage(
            action,
            idCompound);

        distributeMessage(m);


        if (elementCompound && g.currentSelection_id > 0) {
            $('body').css('cursor', 'url(/networkcube/icons/brush.png),auto')
        } else {
            $('body').css('cursor', 'auto')
        }

        // if(elements && elements.length > 0 && g.currentSelection_id > 0){
        //     $('body').css('cursor', 'url(../../networkcube/icons/brush.png),auto')
        // }else{
        //     $('body').css('cursor', 'auto')
        // }
    }

    export class HighlightMessage extends Message{
        action:string
        idCompound:IDCompound;

        constructor(action:string, idCompound?:IDCompound)
        {
            super(MESSAGE_HIGHLIGHT);
            this.action = action;
            this.idCompound = idCompound;
        }
    }


    // SELECTION MESSAGES

    export function selection(action: string, compound: ElementCompound, selectionId?: number): void {
        var g:DynamicGraph = networkcube.getDynamicGraph();
        if(!selectionId)
            selectionId = g.currentSelection_id;
        var selection = g.getSelection(selectionId)

        var idCompound:IDCompound = makeIdCompound(compound);
        
        var m: SelectionMessage = new SelectionMessage(
            action,
            idCompound,
            selectionId);

        distributeMessage(m);
    }

    export class SelectionMessage extends Message{
        action:string
        selectionId:number;
        idCompound:IDCompound;

        constructor(action:string, idCompound:IDCompound, selectionId?:number)
        {
            super(MESSAGE_SELECTION);
            this.action = action;
            this.idCompound = idCompound;
            this.selectionId = selectionId;
        }
    }


    // TIME CHANGE MESSAGES
    
    export function timeRange(startUnix:number, endUnix:number, single:Time, propagate?:boolean){
        var m:TimeRangeMessage = new TimeRangeMessage(startUnix, endUnix);
        if(propagate == undefined)
            propagate = false;

        if (propagate)
            distributeMessage(m); // notifies all views, including this
        else
            processMessage(m);
    }

    export class TimeRangeMessage extends Message {
        startUnix: number;
        endUnix: number;
        
        constructor(start: number, end: number) {
            super(MESSAGE_TIME_RANGE);
            this.startUnix = start;
            this.endUnix = end;
        }
    }


    /// CREATE NEW SELECTION
    
    export function createSelection(type:string, name:string){

        var g:DynamicGraph = networkcube.getDynamicGraph();
        var b = g.createSelection(type);
        b.name = name;
        var m = new CreateSelectionMessage(b)
        // callHandler(m);
        distributeMessage(m, false);

        return b;
    }
    export class CreateSelectionMessage extends Message {
        selection: Selection;
        constructor(b: Selection) {
            super(MESSAGE_SELECTION_CREATE)
            this.selection = b;
        }
    }
    
    
    // SET CURRENT SELECTION


    export function setCurrentSelection(b: Selection) {
        var g: DynamicGraph = networkcube.getDynamicGraph();
        // g.setCurrentSelection(b.id);
        var m = new SetCurrentSelectionIdMessage(b);
        // callHandler(m);
        distributeMessage(m);
    }
    export class SetCurrentSelectionIdMessage extends Message {
        selectionId: number
        constructor(b: Selection) {
            super(MESSAGE_SELECTION_SET_CURRENT)
            this.selectionId = b.id;
        }
    }

    // CHANGE SELECTION COLOR
    
    export function showSelectionColor(selection: Selection, showColor: boolean){
        var m = new ShowSelectionColorMessage(selection, showColor)
        distributeMessage(m);
    }
    export class ShowSelectionColorMessage extends Message {
        selectionId: number;
        showColor: boolean
        constructor(selection: Selection, showColor: boolean) {
            super(MESSAGE_SELECTION_SET_COLORING_VISIBILITY)
            this.selectionId = selection.id;
            this.showColor = showColor;
        }
    }


    // export function filter(compound:Selection, filter:boolean){
    //     var m = new Filter(makeIdCompound(compound), filter)
    //     sendMessage(m);
    // }
    //
    // export class Filter extends Message{
    //     idCompound:number;
    //     filter:string
    //     constructor(idCompond:Selection, filter:boolean){
    //         super(MESSAGE_FILTER)
    //         this.idCompound = idCompound;
    //         this.filter = filter;
    //     }
    // }
    
    /// FILTER SELECTION


    export function filterSelection(selection: Selection, filter: boolean) {
        var m = new FilterSelectionMessage(selection, filter);
        distributeMessage(m);
    }
    export class FilterSelectionMessage extends Message {
        selectionId: number;
        filter: boolean
        constructor(selection: Selection, filter: boolean) {
            super(MESSAGE_SELECTION_FILTER)
            this.selectionId = selection.id;
            this.filter = filter;
        }
    }
    
    /// SWAP PRIORITY

    export function swapPriority(s1: Selection, s2: Selection) {
        var m = new SelectionPriorityMessage(s1, s2, s2.priority, s1.priority);
        distributeMessage(m);
    }

    export class SelectionPriorityMessage extends Message {
        selectionId1: number;
        selectionId2: number;
        priority1: number;
        priority2: number;
        filter: string
        constructor(s1: Selection, s2: Selection, p1: number, p2: number) {
            super(MESSAGE_SELECTION_PRIORITY)
            this.selectionId1 = s1.id;
            this.selectionId2 = s2.id;
            this.priority1 = p1;
            this.priority2 = p2;
        }
    }


    /// DELETE SELECTION

    export function deleteSelection(selection: Selection){
        var m = new DeleteSelectionMessage(selection);
        distributeMessage(m);
    }

    export class DeleteSelectionMessage extends Message {
        selectionId: number;
        constructor(selection: Selection) {
            super(MESSAGE_SELECTION_DELETE)
            this.selectionId = selection.id;
        }
    }
    


    /// SET SELECTION COLOR
    
    export function setSelectionColor(s: Selection, color: string){
        distributeMessage(new SelectionColorMessage(s, color));
    }

    class SelectionColorMessage extends Message {
        selectionId: number;
        color: string;
        constructor(selection: Selection, color: string) {
            super(MESSAGE_SELECTION_COLORING)
            this.selectionId = selection.id;
            this.color = color;
        }
    }
    
    
    /// SEARCH SELECTION


    export function search(term:string, type?:string){
        var idCompound:IDCompound = searchForTerm(term, networkcube.getDynamicGraph(), type);
        distributeMessage(new SearchResultMessage(term, idCompound));
    }
    
    export class SearchResultMessage extends Message{
        idCompound:IDCompound;
        searchTerm:string
        constructor(searchTerm:string, idCompound:IDCompound){
            super(MESSAGE_SEARCH_RESULT);
            this.idCompound = idCompound;
            this.searchTerm = searchTerm;
        }
    }






    // INTERNAL FUNCTIONS ////////////////////////

    var MESSAGE_KEY: string = 'networkcube_message';
    localStorage[MESSAGE_KEY] = undefined;

    export function distributeMessage(message: Message, ownView?: boolean) {
     
        if (ownView == undefined || ownView)
            processMessage(message);

        // other views
        if (MESSENGER_PROPAGATE){
            localStorage[MESSAGE_KEY] = JSON.stringify(
                message,
                function(k, v) { return networkcube.dgraphReplacer(k, v); });
        }
    }

    function receiveMessage() {
        // read message from local storage
        var s = localStorage[MESSAGE_KEY];
        if (s == undefined || s == 'undefined')
            return;
        var dgraph: DynamicGraph = getDynamicGraph();
        var m: Message = <Message>JSON.parse(
            s,
            function(k, v) { return networkcube.dgraphReviver(dgraph, k, v); });
        // console.log('\tMessage type', m.type, m.id)

        if (!m || m.id == previousMessageId) {
            return;
        }
        previousMessageId = m.id;
        processMessage(m);
    }


    function processMessage(m: Message) {
        var graph = networkcube.getDynamicGraph();

        // console.log('[Messenger] process message', m)
        if (messageHandler[m.type]) {
            // for messages with handlers

            if (m.type == MESSAGE_HIGHLIGHT) {
                var m2: HighlightMessage = <HighlightMessage>m;
                graph.highlight(m2.action, m2.idCompound);
            // } else
            //     if (m.type == MESSAGE_SELECTION) {
            //         var m3: SelectionMessage = <SelectionMessage>m;
            //         var compound = cloneCompound(m3.idCompound)
            //         graph.selection(m3.action, compound, m3.selectionId);
            //     } else
            //         if (m.type == MESSAGE_TIME_RANGE) {
            //             // this type is a view message. no adjustments on the graph necessary.
            //         } else
            //             if (m.type == MESSAGE_SELECTION_SET_COLORING_VISIBILITY) {
            //                 var m4: ShowSelectionColorMessage = <ShowSelectionColorMessage>m;
            //                 graph.getSelection(m4.selectionId).showColor = m4.showColor;
            //             } else
            //                 if (m.type == MESSAGE_SELECTION_PRIORITY) {
            //                     var m5: SelectionPriorityMessage = <SelectionPriorityMessage>m;
            //                     graph.getSelection(m5.selectionId1).priority = m5.priority1;
            //                     graph.getSelection(m5.selectionId2).priority = m5.priority2;
            //                     var linkElements = graph.getLinks().selected().elements;
            //                     for (var i = 0; i < linkElements.length; i++) {
            //                         linkElements[i].getSelections().sort(sortByPriority)
            //                     }
            //                     var nodeElements = graph.getNodes().selected().elements;
            //                     for (var i = 0; i < nodeElements.length; i++) {
            //                         nodeElements[i].getSelections().sort(sortByPriority)
            //                     }
            //                     // elements = graph.getTimes().selected().elements;
            //                     // for(var i=0 ; i<elements.length ; i++){
            //                     //     elements[i].getSelections().sort(sortByPriority)
            //                     // }
            //                     var nodePairElements = graph.getNodePairs().selected().elements;
            //                     for (var i = 0; i < nodePairElements.length; i++) {
            //                         nodePairElements[i].getSelections().sort(sortByPriority)
            //                     }
            //                 } else
            //                     // if(m.type == MESSAGE_FILTER){
            //                     //     var m6:FilterM = <SelectionPriorityMessage>m;
            //                     //     graph.filter(m.idCompound, filter)
            //                     // }else
            //                     if (m.type == MESSAGE_SELECTION_FILTER) {
            //                         var m6: FilterSelectionMessage = <FilterSelectionMessage>m;
            //                         graph.filterSelection(m6.selectionId, m6.filter);
            //                     } else
            //                         // test messages that don't require a message handler
            //                         if (m.type == MESSAGE_SELECTION_CREATE) {
            //                             var m7: CreateSelectionMessage = <CreateSelectionMessage>m;
            //                             graph.addSelection(m7.selection.id, m7.selection.color, m7.selection.acceptedType, m7.selection.priority);
            //                         } else
            //                             if (m.type == MESSAGE_SELECTION_SET_CURRENT) {
            //                                 var m8: SetCurrentSelectionIdMessage = <SetCurrentSelectionIdMessage>m;
            //                                 graph.setCurrentSelection(m8.selectionId);
            //                             } else
            //                                 if (m.type == MESSAGE_SELECTION_DELETE) {
            //                                     var m10: DeleteSelectionMessage = <DeleteSelectionMessage>m;
            //                                     graph.deleteSelection(m10.selectionId);
            //                                 } else
            //                                     if (m.type == MESSAGE_SEARCH_RESULT) {
            //                                         var m11: SearchResultMessage = <SearchResultMessage>m;
            //                                         graph.highlight('set', m11.idCompound);
            //                                     } else
            //                                         if (m.type == MESSAGE_SELECTION_COLORING) {
            //                                             var m12: SelectionColorMessage = <SelectionColorMessage>m;
            //                                             graph.getSelection(m12.selectionId).color = m12.color;
            //                                         }
// 
// 
            }else
            if(m.type == MESSAGE_SELECTION){
                var m3:SelectionMessage = <SelectionMessage>m;
                graph.selection(m3.action, m3.idCompound, m3.selectionId);
            }else
            if(m.type == MESSAGE_TIME_RANGE){
                // this type is a view message. no adjustments on the graph necessary.
            }else
            if(m.type == MESSAGE_SELECTION_SET_COLORING_VISIBILITY){
                var m4:ShowSelectionColorMessage = <ShowSelectionColorMessage>m;
                graph.getSelection(m4.selectionId).showColor = m4.showColor;
            }else
            if(m.type == MESSAGE_SELECTION_PRIORITY){
                var m5:SelectionPriorityMessage = <SelectionPriorityMessage>m;
                graph.getSelection(m5.selectionId1).priority = m5.priority1;
                graph.getSelection(m5.selectionId2).priority = m5.priority2;

                var linkElements = graph.links().selected().toArray();
                for(var i=0 ; i<linkElements.length ; i++){
                    linkElements[i].getSelections().sort(sortByPriority)
                }
                var nodeElements = graph.nodes().selected().toArray();
                for(var i=0 ; i<nodeElements.length ; i++){
                    nodeElements[i].getSelections().sort(sortByPriority)
                }
                // elements = graph.getTimes().selected().elements;
                // for(var i=0 ; i<elements.length ; i++){
                //     elements[i].getSelections().sort(sortByPriority)
                // }
                var nodePairElements = graph.nodePairs().selected().toArray();
                for(var i=0 ; i<nodePairElements.length ; i++){
                    nodePairElements[i].getSelections().sort(sortByPriority)
                }
            }else
            // if(m.type == MESSAGE_FILTER){
            //     var m6:FilterM = <SelectionPriorityMessage>m;
            //     graph.filter(m.idCompound, filter)
            // }else
            if(m.type == MESSAGE_SELECTION_FILTER){
                var m6:FilterSelectionMessage = <FilterSelectionMessage>m;
                graph.filterSelection(m6.selectionId, m6.filter);
            }else
            // test messages that don't require a message handler
            if(m.type == MESSAGE_SELECTION_CREATE){
                var m7:CreateSelectionMessage = <CreateSelectionMessage>m;
                graph.addSelection(m7.selection.id, m7.selection.color, m7.selection.acceptedType, m7.selection.priority);
            }else
            if(m.type == MESSAGE_SELECTION_SET_CURRENT){
                var m8:SetCurrentSelectionIdMessage = <SetCurrentSelectionIdMessage>m;
                graph.setCurrentSelection(m8.selectionId);
            }else
            if(m.type == MESSAGE_SELECTION_DELETE){
                var m10:DeleteSelectionMessage = <DeleteSelectionMessage>m;
                graph.deleteSelection(m10.selectionId);
            }else
            if(m.type == MESSAGE_SEARCH_RESULT){
                var m11:SearchResultMessage = <SearchResultMessage>m;
                graph.highlight('set', m11.idCompound);
            }else            
            if(m.type == MESSAGE_SELECTION_COLORING){
                var m12:SelectionColorMessage = <SelectionColorMessage>m;
                graph.getSelection(m12.selectionId).color = m12.color;
            }

            callHandler(m);
        }
    }

    // calls the handler for the passed message
    function callHandler(message) {
        if (messageHandler[message.type] && messageHandler[message.type] != undefined) {
            messageHandler[message.type](message);
        }
    }   
}

