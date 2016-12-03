/// <reference path="./utils.ts" />    
/// <reference path="./dynamicGraph.ts" />

module networkcube {

    //// OBJECTS
    /** Basic class for every object in networkcube with an ID. 
     * A BasicElement is a wrapper to the DynamicGraph and that 
     * represents any object, i.e. node, link, node pair, time, location.
    */
    export class BasicElement {
        _id: number;
        type: string;
        g: DynamicGraph;

        // CONSTRUCTOR

        constructor(id: number, type: string, dynamicGraph: DynamicGraph) {
            this._id = id;
            this.type = type;
            this.g = dynamicGraph;
        }


        // GETTER

        /** @returns the object's id */
        id(): number {
            return this._id;
        }

        /** Generic method to return an attribute value for this element 
         * @param attr: attribute name on this object.
         * @returns the attribute's value. */
        attr(attr: string): any {
            return this.g.attr(attr, this._id, this.type);
        }



        // SELECTIONS

        /** @returns all selections this object is part of. */
        getSelections(): Selection[] {
            return this.g.attributeArrays[this.type].selections[this._id];
        }

        /** Adds this object to a selection
         * @param selection - the Selection object 
         */
        addToSelection(b: Selection): void {
            this.g.attributeArrays[this.type].selections[this._id].push(b);
        }

        /** Removes this object from a selection.
         * @param selection - the Selection objects
         */
        removeFromSelection(b): void {
            var arr = this.g.attributeArrays[this.type].selections[this._id];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == b)
                    this.g.attributeArrays[this.type].selections[this._id].splice(i, 1);
            }
        }
        
        inSelection(s:Selection):boolean{
            return this.getSelections().indexOf(s) > -1;
        }


        // DISPLAY STATES

        /** @returns true if this object is selected.
         * @param selection - (optional) if specified returns true if this object 
         * is in the passed selection.
         */
        isSelected(selection?: Selection): boolean {
            if (!selection)
                return this.getSelections().length > 0;

            var selections = this.g.attributeArrays[this.type].selections[this._id];
            for (var i = 0; i < selections.length; i++) { // start with 1 to avoid default selection.
                if (selections[i] == this.g.defaultNodeSelection || selections[i] == this.g.defaultLinkSelection) {
                    continue;
                }
                if (selections[i] == selection)
                    return true;
            }
            return false;
        }

        /** @returns true if this object is highlighted */
        isHighlighted(): boolean {
            return this.g.isHighlighted(this._id, this.type);
        }

        /** @returns true if this object is filtered, i.e. removed from display. */
        isFiltered(): boolean {
            return this.g.isFiltered(this._id, this.type);
        }

        /** @returns true if this object is visible. */
        isVisible(): boolean {
            var selections = this.getSelections();
            if (selections.length == 0)
                return true;
            for (var i = 0; i < selections.length; i++) {
                if (selections[i].filter)
                    return false;
            }
            return true;
        }


        // OTHER QUERIES

        /** @returns true if this object is present in the graph 
         * in a specific time or a time period.
         * @param start -  start time. If only this parameter is passed to the 
         * function, method returns if this object is present in this time step.
         * @param end - end time. If this parameter is specified, returns if this
         * object is present between start and end.
         */
        presentIn(start: Time, end?: Time): boolean {
            var presence: number[] = this.attr('presence');
            if (!end)
                end = start;
            for (var i = start._id; i <= end._id; i++) {
                if (presence.indexOf(i) > -1)
                    return true;
            }
            return false;
        }
    }

    /**
    * Represents a Time object
    */
    export class Time extends BasicElement {

        constructor(id: number, dynamicGraph: DynamicGraph) {
            super(id, 'time', dynamicGraph)
        }

        // SPECIFIC ATTRIBUTE QUERIES

        /** @returns the moment object associated to this time object. */
        time(): Moment { return this.attr('momentTime'); }
        moment(): Moment { return this.attr('momentTime'); }

        label():String {return this.attr('label')}

        /** @returns the unix time for this time object. */
        unixTime(): number { return this.attr('unixTime'); }

        /** @returns a string label for this object. */
        // label(): String { return this.attr('label') + ''; }
        
        links():LinkQuery{
            // var links:number[] = [];
            // for(var i=0 ; i<allLinks.length ; i++){
            //     if(allLinks[i].presentIn(this))
            //         links.push(allLinks[i].id());
            // }
            return new LinkQuery(this.attr('links'), this.g); 
        }

        // wrapper to moment.js
        year(){ return this.time().year(); }
        month(){ return this.time().month(); }
        week(){ return this.time().week(); }
        day(){ return this.time().day(); }
        hour(){ return this.time().hour(); }
        minute(){ return this.time().minute(); }
        second(){ return this.time().second(); }
        millisecond(){ return this.time().millisecond(); }

        format(format):string{
            return this.time().format(format)
        }
    }

    /**
     * Represents a node object
     */
    export class Node extends BasicElement {

        constructor(id: number, graph: DynamicGraph) {
            super(id, 'node', graph)
        }


        // SPECIFIC ATTRIBUTE QUERIES

        /** @returns this node's label, specified by the user. 
         * If no string value was delivered by the user, returns the ID as string.
         */
        label(): string { return '' + this.attr('label'); }
            
        nodeType(): string { return this.attr('nodeType') }

        /** Returns this nodes neighbors in a NodeQuery. No duplicates. 
         * If no parameter is supplied, returns *all* neighbors of this
         * node over all time steps.  
         * @param t1 - start time. If only this parameter is specified, returns 
         * neighbors in this time step only.
         * @param t2 - end time. If this parameter is specified, returns 
         * neighbors between t1 and t2.
        */
        neighbors(t1?: Time, t2?: Time): NodeQuery {
            if (t2 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('neighbors')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('neighbors')).get(t1), this.g); }
            return new NodeQuery((<ArrayTimeSeries<number>>this.attr('neighbors')).toFlatArray(), this.g);
        }
        inNeighbors(t1?: Time, t2?: Time): NodeQuery {
            if (t2 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('inNeighbors')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('inNeighbors')).get(t1), this.g); }
            return new NodeQuery((<ArrayTimeSeries<number>>this.attr('inNeighbors')).toFlatArray(true), this.g);
        }
        outNeighbors(t1?: Time, t2?: Time): NodeQuery {
            if (t2 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('outNeighbors')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new NodeQuery((<ArrayTimeSeries<number>>this.attr('outNeighbors')).get(t1), this.g); }
            return new NodeQuery((<ArrayTimeSeries<number>>this.attr('outNeighbors')).toFlatArray(), this.g);
        }
        links(t1?: Time, t2?: Time): LinkQuery {
            if (t2 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('links')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('links')).get(t1), this.g); }
            return new LinkQuery((<ArrayTimeSeries<number>>this.attr('links')).toFlatArray(true), this.g);
        }
        inLinks(t1?: Time, t2?: Time): LinkQuery {
            if (t2 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('inLinks')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('inLinks')).get(t1), this.g); }
            return new LinkQuery((<ArrayTimeSeries<number>>this.attr('inLinks')).toFlatArray(true), this.g);
        }
        outLinks(t1?: Time, t2?: Time): LinkQuery {
            if (t2 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('outLinks')).period(t1, t2).toFlatArray(true), this.g); }
            if (t1 != undefined) { return new LinkQuery((<ArrayTimeSeries<number>>this.attr('outLinks')).get(t1), this.g); }
            return new LinkQuery((<ArrayTimeSeries<number>>this.attr('outLinks')).toFlatArray(true), this.g);
        }
        locations(t1?: Time, t2?: Time): LocationQuery {
            if (t2 != undefined) { return new LocationQuery((<ScalarTimeSeries<number>>this.attr('locations')).period(t1, t2).toArray(), this.g); }
            if (t1 != undefined) { return new LocationQuery([(<ScalarTimeSeries<number>>this.attr('locations')).get(t1)], this.g); }
            return new LocationQuery((<ScalarTimeSeries<number>>this.attr('locations')).toArray(), this.g);
        }
        locationSerie(t1?: Time, t2?: Time): ScalarTimeSeries<Location> {
            var serie;
            if (t2 != undefined) 
                serie = (<ScalarTimeSeries<number>>this.attr('locations')).period(t1, t2);
            else if(t1 != undefined)
                serie = (<ScalarTimeSeries<number>>this.attr('locations')).get(t1)
            else
                serie = (<ScalarTimeSeries<number>>this.attr('locations'));
            
            serie = serie.serie;
            // replace numbers by times
            var serie2 = new ScalarTimeSeries<Location>();
            for(var t in serie){
                serie2.set(this.g.time(parseInt(t)), this.g.location(serie[t]));
            }    
            return serie2;                
        }


        linksBetween(n:Node):LinkQuery{
            var links = this.links().toArray();
            var finalLinks = []
            var l
            for(var i=0 ; i < links.length ; i++){
                l = links[i]
                if(l.source == n || l.target == n)
                    finalLinks.push(l)
            }
            return new LinkQuery(finalLinks, this.g);

        }

    
        // TODO
        // presentIn(start: Time, end?: Time): boolean {
        //     // TODO, consider present times for nodes.
        //     return true; 
        // }
    }

    /**
      * Represents a link object on a WindowGraph
      */
    export class Link extends BasicElement {

        constructor(id: number, graph: DynamicGraph) {
            super(id, 'link', graph)
        }

        // SPECIFIC ATTRIBUTE QUERIES

        linkType(): string { return this.attr('linkType'); }
        get source(): Node { return this.g._nodes[this.attr('source')]; }
        get target(): Node { return this.g._nodes[this.attr('target')]; }
        nodePair(): NodePair { return this.g._nodePairs[this.attr('nodePair')]; }
        directed(): boolean { return this.attr('directed'); }

        other(n:Node): Node{
            return this.source == n ? this.target : this.source;
        }

        /** Returns this link's weights over time as NumberQuery
        * If no time parameter is supplied, returns *all* weights of this
         * link over all time steps.  
         * @param t1 - start time. If only this parameter is specified, returns 
         * only the value for t1.
         * @param t2 - end time. If this parameter is specified, returns 
         * weights between t1 and t2.
        */
        weights(start?: Time, end?: Time): NumberQuery {
            if (start == undefined)
                return new NumberQuery((<ScalarTimeSeries<number>>this.attr('weights')).toArray());
            if (end == undefined)
                return new NumberQuery([(<ScalarTimeSeries<number>>this.attr('weights')).get(start)]);
            return new NumberQuery((<ScalarTimeSeries<number>>this.attr('weights')).period(start, end).toArray());
        }

        presentIn(start: Time, end?: Time): boolean {
            var presence: number[] = this.weights(start, end).toArray();
            return presence.length > 0;
        }
        /** Returns all times in which this link's weight != 0  */
        times():TimeQuery{ 
            // var weights:ScalarTimeSeries<number> = <ScalarTimeSeries<number>>this.attr('weights');
            // var times = []
            // var allTimes = this.g.times().toArray();
            // for(var t in weights.serie){
            //     times.push(allTimes[parseInt(t)]);               
            // }                        
            return new TimeQuery(this.attr('presence'), this.g);
        }
       

    }


    export class NodePair extends BasicElement {

        constructor(id: number, graph: DynamicGraph) {
            super(id, 'nodePair', graph)
        }


        // SPECIFIC ATTRIBUTE QUERIES

        get source(): Node { return this.g._nodes[this.attr('source')]; }
        get target(): Node { return this.g._nodes[this.attr('target')]; }
        links(): LinkQuery { return new LinkQuery(this.attr('links'), this.g); }
        nodeType(): string { return this.attr('nodeType'); }

        presentIn(start: Time, end?: Time): boolean {
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].presentIn(start, end))
                    return true;
            }
            return false;
        }
    }

    export class Location extends BasicElement {

        constructor(id: number, graph: DynamicGraph) {
            super(id, 'location', graph)
        }

        // SPECIFIC ATTRIBUTE QUERIES

        label(): String { return this.attr('label') + ''; }
        longitude(): number { return this.attr('longitude'); }
        latitude(): number { return this.attr('latitude'); }
        x(): number { return this.attr('x'); }
        y(): number { return this.attr('y'); }
        z(): number { return this.attr('z'); }
        radius(): number { return this.attr('radius'); }

    }


    /** A time series with a scalar value per time step. 
     * This class nestes an object that holds information for time
     * steps in the format key->value. I.e. the value for the 
     * time step with ID 3 is accessed by this.3   */
    export class ScalarTimeSeries<T>{
        serie: Object = {};

        /** @returns a ScalarTimeSeries for the specified period. */
        period(t1: Time, t2: Time): ScalarTimeSeries<T> {
            var t1id = t1.id();
            var t2id = t2.id();
            var s = new ScalarTimeSeries<T>();
            for (var prop in this.serie) {
                if (parseInt(prop) >= t1id
                    && parseInt(prop) <= t2id) {
                    s.serie[prop] = this.serie[prop];
                }
            }
            return s;
        }

        /** Sets a value for a specified time point. */
        set(t: Time, element: T) {
            this.serie[t.id()] = element
        }
        /** @returns the value for a specified time point. */
        get(t: Time): T {
            if(this.serie[t.id()] == undefined)
                return;
            return this.serie[t.id()];
        }

        size(): number {
            return this.toArray().length;
        }


        /** Returns all values as array.
         * @param removeDuplicates
         * @returns array with values; 
         */
        toArray(removeDuplicates?: boolean): T[] {
            if (removeDuplicates == undefined)
                removeDuplicates = false;
            var a: T[] = [];
            if(removeDuplicates){
                for (var prop in this.serie){
                    a.push(this.serie[prop])
                }
            }else{
                for (var prop in this.serie){
                    if(a.indexOf(this.serie[prop]) == -1)
                        a.push(this.serie[prop])
                }
            }
            return a;
        }
    }



    /** A time series with an array per time step. 
    * This class nestes an object that holds information for time
    * steps in the format key->value. I.e. the value for the 
    * time step with ID 3 is accessed by this.3   */
    export class ArrayTimeSeries<T>{
        serie: Object = {};

        period(t1: Time, t2: Time): ArrayTimeSeries<T> {
            var t1id = t1.id();
            var t2id = t1.id();
            var s = new ArrayTimeSeries<T>();
            for (var prop in this.serie) {
                if (parseInt(prop) >= t1id
                    && parseInt(prop) <= t1id) {
                    s.serie[prop] = this.serie[prop];
                }
            }
            return s;
        }

        add(t: Time, element: T) {
            if (t == undefined) {
                return;
            }

            if (!this.serie[t._id])
                this.serie[t._id] = [];
            this.serie[t._id].push(element);
        }
        get(t: Time): T[] {
            return this.serie[t._id];
        }

        toArray(): T[][] {
            var a: T[][] = [];
            for (var prop in this.serie) {
                a.push(this.serie[prop]);
            }
            return a;
        }

        toFlatArray(removeDuplicates?: boolean): T[] {
            if (removeDuplicates == undefined)
                removeDuplicates = false;
            var a: T[] = [];
            for (var prop in this.serie) {
                for (var i = 0; i < this.serie[prop].length; i++) {
                    if (!removeDuplicates || (removeDuplicates && a.indexOf(this.serie[prop]) == -1)) {
                        a.push(this.serie[prop][i]);
                    }
                }
            }
            return a;
        }

    }



    //// QUERIES

    export class Query {
        _elements: number[] = [];

        constructor(elements?: number[]) {
            if (elements){
                for(var i=0 ; i<elements.length ; i++){
                    if(elements[i] != undefined)
                        this._elements.push(elements[i]);                    
                }
            }
        }
        contains(element: number): boolean {
            return this._elements.indexOf(element) > -1;
        }

        addUnique(element: number): void {
            if (this._elements.indexOf(element) == -1)
                this._elements.push(element);
        }
        add(element: number): void {
            this._elements.push(element);
        }
        addAll(elements: number[]): void {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] != undefined)
                    this._elements.push(elements[i]);
            }
        }
        addAllUnique(elements: number[]): void {
            for (var i = 0; i < elements.length; i++) {
                this.addUnique(elements[i]);
            }
        }

        /** @returns numbr of elements in this query. Same as size(). */
        get length(): number {
            return this._elements.length
        };

        /** @returns numbr of elements in this query. Same as length getter. */
        size(): number { return this._elements.length };

        /** @returns all ids in this query. */
        ids(): number[] {
            return this._elements;
        }
        removeDuplicates():Query{
            var elements = this._elements.slice(0) 
            this._elements = [];
            for (var i = 0; i < elements.length; i++) {
                if(this._elements.indexOf(elements[i]) == -1)
                    this._elements.push(elements[i])
            }
            return this;
        }
        generic_intersection(q:Query):Query{
            var intersection = [];
            for(var i=0 ; i < this._elements.length ; i++){
                for(var j=0 ; j < q._elements.length ; j++){
                    if(this._elements[i] == q._elements[j]){
                        intersection.push(this._elements[i])
                    }
                }    
            }
            return new Query(intersection);
        }

       
    }

    /**
     * Represents a simple array of numbers that can be used to calculate
     * max, mean, min values etc..
     */
    export class NumberQuery extends Query {


        clone(): number[] {
            return this._elements.slice(0);
        }

        min(): number {
            var min: number = this._elements[0];
            for (var i = 1; i < this._elements.length; i++) {
                if (this._elements[i] != undefined)
                    min = Math.min(min, this._elements[i]);
            }
            return min;
        }
        max(): number {
            var max: number = this._elements[0];
            for (var i = 1; i < this._elements.length; i++) {
                if (this._elements[i] != undefined)
                    max = Math.max(max, this._elements[i]);
            }
            return max;
        }
        mean(): number {
            var v = 0;
            var count = 0;
            for (var i = 0; i < this._elements.length; i++) {
                if (typeof this._elements[i] == 'number') {
                    v += this._elements[i];
                    count++;
                }
            }
            return v / count;
        }
        sum(){
            var sum = 0;
            for (var i = 0; i < this._elements.length; i++) {
                if (typeof this._elements[i] == 'number') {
                    sum += this._elements[i];
                }
            }
            return sum;
        }

        toArray(): number[] {
            return this._elements.slice(0);
        }
        
        get(index:number):number{
            return this._elements[index];
        }

        forEach(f:Function): NumberQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this._elements[i], i);
           }
           return this;
        }
      
    }

    export class StringQuery {
        _elements: string[];

        constructor(elements?: string[]) {
            if (elements)
                this._elements = elements.slice(0);
        }
        contains(element: string): boolean {
            return this._elements.indexOf(element) > -1;
        }

        addUnique(element: string): void {
            if (this._elements.indexOf(element) == -1)
                this._elements.push(element);
        }
        add(element: string): void {
            this._elements.push(element);
        }
        addAll(elements: string[]): void {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] != undefined)
                    this._elements.push(elements[i]);
            }
        }
        addAllUnique(elements: string[]): void {
            for (var i = 0; i < elements.length; i++) {
                this.addUnique(elements[i]);
            }
        }

        get length(): number { return this._elements.length };
        size(): number { return this._elements.length };

        toArray(): string[] {
            return this._elements.slice(0);
        }
        forEach(f:Function): StringQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this._elements[i], i);
           }
           return this;
        }

    }


    export class GraphElementQuery extends Query {
        g: DynamicGraph;
        elementType: string = '';

        constructor(elements: any[], g: DynamicGraph) {
            super(elements);
            this.g = g;
        }

        /** @returns a query that contains only the elements matching 
         * the filter critera;
         * @param attribute - name of attribute that is used on filter
         * @param filter - function evaluating if the attribute's value is valid. 
          */
        generic_filter(filter: Function): any[] {
            var arr: any[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                try {
                    if (filter(this.g.get(this.elementType, this._elements[i]))){
                        arr.push(this._elements[i])
                    }
                } catch (ex) {
                }
            }
            return arr;
        }
        /** @returns a query with selected elements, i.e. elements that are in at least
         * one selection.
         */
        generic_selected(): any[] {
            var arr: any[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isSelected()) {
                    arr.push(this._elements[i])
                }
            }
            return arr;
        }
        /** @returns a query with visible elements. 
         */
        generic_visible(): any[] {
            var arr: any[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isVisible()) {
                    arr.push(this._elements[i])
                }
            }
            return arr;
        }
        /** @returns a query with highighted elements.
         */
        generic_highlighted(): any[] {
            var arr: any[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isHighlighted()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        }
        /** @returns a query with only the elements present in the specified time step 
         * or period.
         */
        generic_presentIn(start: Time, end?: Time): any[] {
            var arr: any[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).presentIn(start, end)) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        }
        /** @returns this query with elements sorted */
        generic_sort(attrName: string, asc?: boolean): GraphElementQuery {
            if (this._elements.length == 0) {
                return this;
            }
            var array = this._elements.slice(0);
            array.sort((e1, e2) => {
                return attributeSort(
                    this.g.get(this.elementType, e1),
                    this.g.get(this.elementType, e2),
                    attrName,
                    asc);
            });
            this._elements = array;
            return this;
        }
        generic_removeDuplicates(): GraphElementQuery {
            var uniqueElements = [];
            for(var i=0 ; i <this._elements.length ; i++){
                // for(var j=i+1 ; j <this._elements.length ; j++){
                //     if(this._elements[i]==this._elements[j])
                //         this._elements.slice(j,1);                                 
                // }    
                if(uniqueElements.indexOf(this._elements[i]) == -1)
                    uniqueElements.push(this._elements[i])
            }
            this._elements = uniqueElements;
            return this;
        }

      
        // sortByFunction(sortFunction:(a:any,b:any)=>number){
        //     if(this._elements.length == 0){
        //         console.error('This query has no elements')
        //         return new Query<any>();
        //     }
        //     var array = this._elements.slice(0);
        //     array.sort(sortFunction);
        //     var result:GraphElementQuery<T> = new GraphElementQuery<T>();
        //     for(var i=0 ; i<array.length ; i++){
        //         result.add(array[i]);
        //     }                 
        //     return result; 
        // }
    }

    export class NodeQuery extends GraphElementQuery {
        elementType = 'node';

        constructor(elements: any[], g: DynamicGraph) {
            super(elements, g);
            if(elements.length > 0 && elements[0] instanceof networkcube.Node){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i].id());
                }
            }else 
            if(elements.length > 0 && typeof elements[0] == 'number'){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i]);
                }                
            }
            this.elementType = 'node';
        }

        contains(n: Node): boolean {
            return this._elements.indexOf(n.id()) > -1;
        }


        // WRAPPERS TO GENERIC FUNCTIONS IN GRAPH_ELEMENT_QUERY
        highlighted(): NodeQuery {
            return new NodeQuery(super.generic_highlighted(), this.g);
        }
        visible(): NodeQuery {
            return new NodeQuery(super.generic_visible(), this.g);
        }
        selected(): NodeQuery {
            return new NodeQuery(super.generic_selected(), this.g);
        }
        filter(filter: Function): NodeQuery {
            return new NodeQuery(super.generic_filter(filter), this.g);
        }
        presentIn(t1: Time, t2: Time): NodeQuery {
            return new NodeQuery(super.generic_presentIn(t1, t2), this.g);
        }
        sort(attributeName: string, asc?: boolean): NodeQuery {
            return <NodeQuery>super.generic_sort(attributeName, asc);
        }

        // proper functions

        label(): StringQuery {
            var q: StringQuery = new StringQuery();
            for (var i = 0; i < this._elements.length; i++) {
                q.add('' + this.g.attr('label', this._elements[i], 'node'))
            }
            return q;
        }
        neighbors(t1?: Time, t2?: Time): NodeQuery {
            return new NodeQuery(getBulkAttributes('neighbors', this._elements, 'node', this.g, t1, t2), this.g);
        }
        links(t1?: Time, t2?: Time): LinkQuery {
            return new LinkQuery(getBulkAttributes('links', this._elements, 'node', this.g, t1, t2), this.g);
        }
        locations(t1?: Time, t2?: Time): LocationQuery {
            return new LocationQuery(getBulkAttributes('locations', this._elements, 'node', this.g, t1, t2), this.g);
        }
        nodeTypes(): StringQuery {
            var q: StringQuery = new StringQuery();
            for (var i = 0; i < this._elements.length; i++) {
                q.add(this.g.attr('nodeType', this._elements[i], 'node'))
            }
            return q;
        }

        // returns the i-th element in this query
        get(i: number): Node { return this.g._nodes[this._elements[i]] }

        last(): Node { return this.g._nodes[this._elements[this._elements.length - 1]] }

        // returns array of nodes
        toArray(): Node[] {
            var a: Node[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodes[this._elements[i]]);
            }
            return a;
        }
        createAttribute(attrName: string, f: Function): NodeQuery {
            // create and init news attribute array if necessary
            if (this.g.nodeArrays[attrName] == undefined) {
                this.g.nodeArrays[attrName] = []
                for (var i = 0; i < this.g._nodes.length; i++) {
                    this.g.nodeArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.nodeArrays[attrName][this._elements[i]] = f(this.g._nodes[this._elements[i]]);
            }
            return this;
        }
        
        intersection(q:NodeQuery):NodeQuery{
            return new NodeQuery(this.generic_intersection(q)._elements , this.g);
        }
        removeDuplicates():NodeQuery{
            return new NodeQuery(this.generic_removeDuplicates()._elements , this.g);
        }
        
        forEach(f:Function): NodeQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this.g.node(this._elements[i]),i);
           }
           return this;
        }

    }

    export class LinkQuery extends GraphElementQuery {
        elementType = 'link';
        
        constructor(elements: any[], g: DynamicGraph) {
            super(elements, g);
            if(elements.length > 0 && elements[0] instanceof networkcube.Link){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i].id());
                }
            }
            if(elements.length > 0 && typeof elements[0] == 'number'){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i]);
                }                
            }
        }

        contains(l: Link): boolean {
            return this._elements.indexOf(l.id()) > -1;
        }

        highlighted(): LinkQuery {
            return new LinkQuery(super.generic_highlighted(), this.g);
        }
        visible(): LinkQuery {
            return new LinkQuery(super.generic_visible(), this.g);
        }
        selected(): LinkQuery {
            return new LinkQuery(super.generic_selected(), this.g);
        }
        filter(filter: Function): LinkQuery {
            return new LinkQuery(super.generic_filter(filter), this.g);
        }
        presentIn(t1: Time, t2?: Time): LinkQuery {
            return new LinkQuery(super.generic_presentIn(t1, t2), this.g);
        }
        sort(attributeName: string): LinkQuery {
            return <LinkQuery>super.generic_sort(attributeName);
        }

        // returns the i-th element in this query
        get(i: number): Link { return this.g._links[this._elements[i]] }

        last(): Link { return this.g._links[this._elements[this._elements.length - 1]] }

        // returns array of links
        toArray(): Link[] {
            var a: Link[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._links[this._elements[i]]);
            }
            return a;
        }

        weights(start?: Time, end?: Time): NumberQuery {
            var s: NumberQuery = new NumberQuery();
            for (var i = 0; i < this._elements.length; i++) {
                s.addAll(this.g.link(i).weights(start, end).toArray());
            }
            return s;
        }

        createAttribute(attrName: string, f: Function): LinkQuery {
            // create and init new attribute array if necessary
            if (this.g.linkArrays[attrName] == undefined) {
                this.g.linkArrays[attrName] = []
                for (var i = 0; i < this.g._links.length; i++) {
                    this.g.linkArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.linkArrays[attrName][this._elements[i]] = f(this.g._links[this._elements[i]]);
            }
            return this;
        }
        linkTypes():String[]{
            var linkTypes:String[] = [];
            var s;
            for (var i = 0; i < this._elements.length; i++) {
                s = this.g.link(this._elements[i]).linkType()
                if(linkTypes.indexOf(s) == -1)
                    linkTypes.push(s);
            }
            return linkTypes;
        }
        
        sources():NodeQuery{
            var nodes:number[] = []
            var link;
            for(var i=0 ; i<this._elements.length ; i++){
                link = this.g.link(this._elements[i]);
                if(nodes.indexOf(link.source) == -1)
                    nodes.push(link.source.id());
            }
            return new NodeQuery(nodes, this.g);
        }
        
        targets():NodeQuery{
            var nodes:number[] = []
            var link;
            for(var i=0 ; i<this._elements.length ; i++){
                link = this.g.link(this._elements[i]);
                if(nodes.indexOf(link.target) == -1)
                    nodes.push(link.target.id());
            }
            return new NodeQuery(nodes, this.g);
        }
        
        intersection(q:LinkQuery):LinkQuery{
            return new LinkQuery(this.generic_intersection(q)._elements , this.g);
        }
        removeDuplicates():LinkQuery{
            return new LinkQuery(this.generic_removeDuplicates()._elements , this.g);
        }
        forEach(f:Function): LinkQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this.g.link(this._elements[i]),i);
           }
           return this;
        }


        
        
    }



    export class NodePairQuery extends GraphElementQuery {
        elementType = 'nodePair';


        constructor(elements: any[], g: DynamicGraph) {
            super(elements, g);
            this.elementType = 'nodePair';
            if(elements.length > 0 && elements[0] instanceof networkcube.NodePair){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i].id());
                }
            }
            if(elements.length > 0 && typeof elements[0] == 'number'){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i]);
                }                
            }
        }

        contains(n: NodePair): boolean {
            return this._elements.indexOf(n.id()) > -1;
        }


        highlighted(): NodePairQuery {
            return new NodePairQuery(super.generic_highlighted(), this.g);
        }
        visible(): NodePairQuery {
            return new NodePairQuery(super.generic_visible(), this.g);
        }
        selected(): NodePairQuery {
            return new NodePairQuery(super.generic_selected(), this.g);
        }
        filter(filter: Function): NodePairQuery {
            return new NodePairQuery(super.generic_filter(filter), this.g);
        }
        presentIn(t1: Time, t2: Time): NodePairQuery {
            return new NodePairQuery(super.generic_presentIn(t1, t2), this.g);
        }
        sort(attributeName: string): NodePairQuery {
            return <NodePairQuery>super.generic_sort(attributeName);
        }

        // returns the i-th element in this query
        get(i: number): NodePair { return this.g._nodePairs[this._elements[i]] }

        last(): Link { return this.g._links[this._elements[this._elements.length - 1]] }

        // returns array of NodePair
        toArray(): NodePair[] {
            var a: NodePair[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodePairs[this._elements[i]]);
            }
            return a;
        }
        createAttribute(attrName: string, f: Function): NodePairQuery {
            // create and init new attribute array if necessary
            if (this.g.nodePairArrays[attrName] == undefined) {
                this.g.nodePairArrays[attrName] = []
                for (var i = 0; i < this.g._nodePairs.length; i++) {
                    this.g.nodePairArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.nodePairArrays[attrName][this._elements[i]] = f(this.g._nodePairs[this._elements[i]]);
            }
            return this;
        }
        intersection(q:NodePairQuery):NodePairQuery{
            return new NodePairQuery(this.generic_intersection(q)._elements , this.g);
        }
        removeDuplicates():NodePairQuery{
            return new NodePairQuery(this.generic_removeDuplicates()._elements , this.g);
        }
        forEach(f:Function): NodePairQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this.g.nodePair(this._elements[i]),i);
           }
           return this;
        }

    }

    export class TimeQuery extends GraphElementQuery {
        elementType = 'time';

        constructor(elements: any[], g: DynamicGraph) {
            super(elements, g);
            this.elementType = 'time';
            if(elements.length > 0 && elements[0] instanceof networkcube.Time){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i].id());
                }
            }
            if(elements.length > 0 && typeof elements[0] == 'number'){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i]);
                }                
            }
        }

        contains(t: Time): boolean {
            return this._elements.indexOf(t.id()) > -1;
        }

        highlighted(): TimeQuery {
            return new TimeQuery(super.generic_highlighted(), this.g);
        }
        visible(): TimeQuery {
            return new TimeQuery(super.generic_visible(), this.g);
        }
        selected(): TimeQuery {
            return new TimeQuery(super.generic_selected(), this.g);
        }
        filter(filter: Function): TimeQuery {
            return new TimeQuery(super.generic_filter(filter), this.g);
        }
        presentIn(t1: Time, t2: Time): TimeQuery {
            return new TimeQuery(super.generic_presentIn(t1, t2), this.g);
        }
        sort(attributeName: string): TimeQuery {
            return <TimeQuery>super.generic_sort(attributeName);
        }

        links(): LinkQuery{
            var links:number[] = [];
            // var allLinks = this.g.links().toArray();
            // var allTimes = this.g.times().toArray();
            // for(var i=0 ; i<allLinks.length ; i++){
                // for(var j=0 ; j<allTimes.length ; j++){
                //     if(allLinks[i].presentIn(allTimes[j])){
                //         links.push(allLinks[i].id());
                //         break    
                //     }
                // }
            // }
            for(var i=0 ; i<this._elements.length ; i++){
                links = links.concat(this.g.attr('links', this._elements[i], 'time'));
            }
            return new LinkQuery(links, this.g); 
        } 
        
        // returns the i-th element in this query
        get(i: number): Time { return this.g._times[this._elements[i]] }

        last(): Time { return this.g._times[this._elements[this._elements.length - 1]] }

        // return array of times
        toArray(): Time[] {
            var a: Time[] = [];
            var allTimes = this.g._times;
            for (var i = 0; i < this._elements.length; i++) {
                a.push(allTimes[this._elements[i]]);
            }
            return a;
        }
        createAttribute(attrName: string, f: Function): TimeQuery {
            // create and init new attribute array if necessary
            if (this.g.timeArrays[attrName] == undefined) {
                this.g.timeArrays[attrName] = []
                for (var i = 0; i < this.g._times.length; i++) {
                    this.g.timeArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.timeArrays[attrName][this._elements[i]] = f(this.g._times[this._elements[i]]);
            }
            return this;
        }
        unixTimes():number[]{
            var unixTimes:number[] = [];
            for(var i=0 ; i<this._elements.length ; i++){
                unixTimes.push(this.g.time(this._elements[i]).unixTime());
            }
            return unixTimes;
        }
        
        intersection(q:TimeQuery):TimeQuery{
            return new TimeQuery(this.generic_intersection(q)._elements , this.g);
        }
        forEach(f:Function): TimeQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this.g.time(this._elements[i]),i);
           }
           return this;
        }
       

    }

    export class LocationQuery extends GraphElementQuery {
        elementType = 'location';

        constructor(elements: any[], g: DynamicGraph) {
            super(elements, g);
            this.elementType = 'location';
            if(elements.length > 0 && elements[0] instanceof networkcube.Location){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements = elements[i].id();
                }
            }
            if(elements.length > 0 && typeof elements[0] == 'number'){
                this._elements = []
                for(var i=0 ; i<elements.length ; i++){
                    this._elements.push(elements[i]);
                }                
            }
        }
        
        contains(l: Location): boolean {
            return this._elements.indexOf(l.id()) > -1;
        }

        highlighted(): LocationQuery {
            return new LocationQuery(super.generic_highlighted(), this.g);
        }
        visible(): LocationQuery {
            return new LocationQuery(super.generic_visible(), this.g);
        }
        selected(): LocationQuery {
            return new LocationQuery(super.generic_selected(), this.g);
        }
        filter(filter: Function): LocationQuery {
            return new LocationQuery(super.generic_filter(filter), this.g);
        }
        presentIn(t1: Time, t2: Time): LocationQuery {
            return new LocationQuery(super.generic_presentIn(t1, t2), this.g);
        }
        sort(attributeName: string): LocationQuery {
            return <LocationQuery>super.generic_sort(attributeName);
        }

        // returns the i-th element in this query
        get(i: number): Location { return this.g._locations[this._elements[i]] }

        last(): Location { return this.g._locations[this._elements[this._elements.length - 1]] }

        // return array of locations
        toArray(): Location[] {
            var a: Location[] = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._locations[this._elements[i]]);
            }
            return a;
        }
        createAttribute(attrName: string, f: Function): LocationQuery {
            // create and init new attribute array if necessary
            if (this.g.locationArrays[attrName] == undefined) {
                this.g.locationArrays[attrName] = []
                for (var i = 0; i < this.g._locations.length; i++) {
                    this.g.locationArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.locationArrays[attrName][this._elements[i]] = f(this.g._locations[this._elements[i]]);
            }
            return this;
        }
        
        intersection(q:LocationQuery):LocationQuery{
            return new LocationQuery(this.generic_intersection(q)._elements , this.g);
        }
        removeDuplicates():LocationQuery{
            return new LocationQuery(this.generic_removeDuplicates()._elements , this.g);
        }
        forEach(f:Function): LocationQuery{
           for (var i = 0; i < this._elements.length; i++) {
               f(this.g.location(this._elements[i]),i);
           }
           return this;
        }

    }


    function getBulkAttributes(attrName: string, ids: number[], type: string, g: DynamicGraph, t1?: Time, t2?: Time): any[] {
        var a: any[] = [];
        var temp: any[];
        for (var i = 0; i < ids.length; i++) {
            if (t2 != undefined) {
                temp = (<ScalarTimeSeries<number>>g.attr(attrName, ids[i], type)).period(t1, t2).toArray();
            } else
                if (t1 != undefined) {
                    temp = [(<ScalarTimeSeries<number>>g.attr(attrName, ids[i], type)).get(t1)];
                } else {
                    temp = (<ScalarTimeSeries<number>>g.attr(attrName, ids[i], type)).toArray();
                }
            for (var j = 0; j < temp.length; j++) {
                if(temp[j] instanceof Array){
                    a = a.concat(temp[j]);
                }else{
                    if (a.indexOf(temp[j]) == -1)
                        a.push(temp[j]);
                }
            }
        }
        return a;
    }


    // class MapQuery<T>{
    //     object = {}

    //     add(key:string, id:number){
    //         if(!this.object.hasOwnProperty(key))
    //             this.object[key] = []
    //         this.object[key].push(id);
    //     }

    // }


    ////////////////
    //// MOTIFS ////
    ////////////////

    export class Motif{
        nodes:Node[] = []
        links:Link[] = []   
        times:Time[] = [] 
        
        constructor(nodes:Node[], links:Link[]){
            this.nodes = nodes.slice(0)
            this.links = links.slice(0);
        }
        
        print(){
            console.log('nodes:', this.nodes.length, 'links:', this.links.length )
        }
    }
    
    export class MotifTemplate{
        nodes:number[] = []
        links:number[][] = []    
        
        constructor(nodes:number[], links:number[][]){
            this.nodes = nodes.slice(0)
            this.links = links.slice(0);
        }   
    }
    
    export class MotifSequence{
        motifs:Motif[] = [];
        push(m:Motif){
            this.motifs.push(m);
        }
    }
}
