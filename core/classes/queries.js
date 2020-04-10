/// <reference path="./utils.ts" />    
/// <reference path="./dynamicGraph.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var networkcube;
(function (networkcube) {
    //// OBJECTS
    /** Basic class for every object in networkcube with an ID.
     * A BasicElement is a wrapper to the DynamicGraph and that
     * represents any object, i.e. node, link, node pair, time, location.
    */
    var BasicElement = (function () {
        // CONSTRUCTOR
        function BasicElement(id, type, dynamicGraph) {
            this._id = id;
            this.type = type;
            this.g = dynamicGraph;
        }
        // GETTER
        /** @returns the object's id */
        BasicElement.prototype.id = function () {
            return this._id;
        };
        /** Generic method to return an attribute value for this element
         * @param attr: attribute name on this object.
         * @returns the attribute's value. */
        BasicElement.prototype.attr = function (attr) {
            return this.g.attr(attr, this._id, this.type);
        };
        // SELECTIONS
        /** @returns all selections this object is part of. */
        BasicElement.prototype.getSelections = function () {
            return this.g.attributeArrays[this.type].selections[this._id];
        };
        /** Adds this object to a selection
         * @param selection - the Selection object
         */
        BasicElement.prototype.addToSelection = function (b) {
            this.g.attributeArrays[this.type].selections[this._id].push(b);
        };
        /** Removes this object from a selection.
         * @param selection - the Selection objects
         */
        BasicElement.prototype.removeFromSelection = function (b) {
            var arr = this.g.attributeArrays[this.type].selections[this._id];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == b)
                    this.g.attributeArrays[this.type].selections[this._id].splice(i, 1);
            }
        };
        BasicElement.prototype.inSelection = function (s) {
            return this.getSelections().indexOf(s) > -1;
        };
        // DISPLAY STATES
        /** @returns true if this object is selected.
         * @param selection - (optional) if specified returns true if this object
         * is in the passed selection.
         */
        BasicElement.prototype.isSelected = function (selection) {
            if (!selection)
                return this.getSelections().length > 0;
            var selections = this.g.attributeArrays[this.type].selections[this._id];
            for (var i = 0; i < selections.length; i++) {
                if (selections[i] == this.g.defaultNodeSelection || selections[i] == this.g.defaultLinkSelection) {
                    continue;
                }
                if (selections[i] == selection)
                    return true;
            }
            return false;
        };
        /** @returns true if this object is highlighted */
        BasicElement.prototype.isHighlighted = function () {
            return this.g.isHighlighted(this._id, this.type);
        };
        /** @returns true if this object is filtered, i.e. removed from display. */
        BasicElement.prototype.isFiltered = function () {
            return this.g.isFiltered(this._id, this.type);
        };
        /** @returns true if this object is visible. */
        BasicElement.prototype.isVisible = function () {
            var selections = this.getSelections();
            if (selections.length == 0)
                return true;
            for (var i = 0; i < selections.length; i++) {
                if (selections[i].filter)
                    return false;
            }
            return true;
        };
        // OTHER QUERIES
        /** @returns true if this object is present in the graph
         * in a specific time or a time period.
         * @param start -  start time. If only this parameter is passed to the
         * function, method returns if this object is present in this time step.
         * @param end - end time. If this parameter is specified, returns if this
         * object is present between start and end.
         */
        BasicElement.prototype.presentIn = function (start, end) {
            var presence = this.attr('presence');
            if (!end)
                end = start;
            for (var i = start._id; i <= end._id; i++) {
                if (presence.indexOf(i) > -1)
                    return true;
            }
            return false;
        };
        return BasicElement;
    })();
    networkcube.BasicElement = BasicElement;
    /**
    * Represents a Time object
    */
    var Time = (function (_super) {
        __extends(Time, _super);
        function Time(id, dynamicGraph) {
            _super.call(this, id, 'time', dynamicGraph);
        }
        // SPECIFIC ATTRIBUTE QUERIES
        /** @returns the moment object associated to this time object. */
        Time.prototype.time = function () { return this.attr('momentTime'); };
        Time.prototype.moment = function () { return this.attr('momentTime'); };
        Time.prototype.label = function () { return this.attr('label'); };
        /** @returns the unix time for this time object. */
        Time.prototype.unixTime = function () { return this.attr('unixTime'); };
        /** @returns a string label for this object. */
        // label(): String { return this.attr('label') + ''; }
        Time.prototype.links = function () {
            // var links:number[] = [];
            // for(var i=0 ; i<allLinks.length ; i++){
            //     if(allLinks[i].presentIn(this))
            //         links.push(allLinks[i].id());
            // }
            return new LinkQuery(this.attr('links'), this.g);
        };
        // wrapper to moment.js
        Time.prototype.year = function () { return this.time().year(); };
        Time.prototype.month = function () { return this.time().month(); };
        Time.prototype.week = function () { return this.time().week(); };
        Time.prototype.day = function () { return this.time().day(); };
        Time.prototype.hour = function () { return this.time().hour(); };
        Time.prototype.minute = function () { return this.time().minute(); };
        Time.prototype.second = function () { return this.time().second(); };
        Time.prototype.millisecond = function () { return this.time().millisecond(); };
        Time.prototype.format = function (format) {
            return this.time().format(format);
        };
        return Time;
    })(BasicElement);
    networkcube.Time = Time;
    /**
     * Represents a node object
     */
    var Node = (function (_super) {
        __extends(Node, _super);
        function Node(id, graph) {
            _super.call(this, id, 'node', graph);
        }
        // SPECIFIC ATTRIBUTE QUERIES
        /** @returns this node's label, specified by the user.
         * If no string value was delivered by the user, returns the ID as string.
         */
        Node.prototype.label = function () { return '' + this.attr('label'); };
        Node.prototype.nodeType = function () { return this.attr('nodeType'); };
        /** Returns this nodes neighbors in a NodeQuery. No duplicates.
         * If no parameter is supplied, returns *all* neighbors of this
         * node over all time steps.
         * @param t1 - start time. If only this parameter is specified, returns
         * neighbors in this time step only.
         * @param t2 - end time. If this parameter is specified, returns
         * neighbors between t1 and t2.
        */
        Node.prototype.neighbors = function (t1, t2) {
            if (t2 != undefined) {
                return new NodeQuery(this.attr('neighbors').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new NodeQuery(this.attr('neighbors').get(t1), this.g);
            }
            return new NodeQuery(this.attr('neighbors').toFlatArray(), this.g);
        };
        Node.prototype.inNeighbors = function (t1, t2) {
            if (t2 != undefined) {
                return new NodeQuery(this.attr('inNeighbors').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new NodeQuery(this.attr('inNeighbors').get(t1), this.g);
            }
            return new NodeQuery(this.attr('inNeighbors').toFlatArray(true), this.g);
        };
        Node.prototype.outNeighbors = function (t1, t2) {
            if (t2 != undefined) {
                return new NodeQuery(this.attr('outNeighbors').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new NodeQuery(this.attr('outNeighbors').get(t1), this.g);
            }
            return new NodeQuery(this.attr('outNeighbors').toFlatArray(), this.g);
        };
        Node.prototype.links = function (t1, t2) {
            if (t2 != undefined) {
                return new LinkQuery(this.attr('links').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new LinkQuery(this.attr('links').get(t1), this.g);
            }
            return new LinkQuery(this.attr('links').toFlatArray(true), this.g);
        };
        Node.prototype.inLinks = function (t1, t2) {
            if (t2 != undefined) {
                return new LinkQuery(this.attr('inLinks').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new LinkQuery(this.attr('inLinks').get(t1), this.g);
            }
            return new LinkQuery(this.attr('inLinks').toFlatArray(true), this.g);
        };
        Node.prototype.outLinks = function (t1, t2) {
            if (t2 != undefined) {
                return new LinkQuery(this.attr('outLinks').period(t1, t2).toFlatArray(true), this.g);
            }
            if (t1 != undefined) {
                return new LinkQuery(this.attr('outLinks').get(t1), this.g);
            }
            return new LinkQuery(this.attr('outLinks').toFlatArray(true), this.g);
        };
        Node.prototype.locations = function (t1, t2) {
            if (t2 != undefined) {
                return new LocationQuery(this.attr('locations').period(t1, t2).toArray(), this.g);
            }
            if (t1 != undefined) {
                return new LocationQuery([this.attr('locations').get(t1)], this.g);
            }
            return new LocationQuery(this.attr('locations').toArray(), this.g);
        };
        Node.prototype.locationSerie = function (t1, t2) {
            var serie;
            if (t2 != undefined)
                serie = this.attr('locations').period(t1, t2);
            else if (t1 != undefined)
                serie = this.attr('locations').get(t1);
            else
                serie = this.attr('locations');
            serie = serie.serie;
            // replace numbers by times
            var serie2 = new ScalarTimeSeries();
            for (var t in serie) {
                serie2.set(this.g.time(parseInt(t)), this.g.location(serie[t]));
            }
            return serie2;
        };
        Node.prototype.linksBetween = function (n) {
            var links = this.links().toArray();
            var finalLinks = [];
            var l;
            for (var i = 0; i < links.length; i++) {
                l = links[i];
                if (l.source == n || l.target == n)
                    finalLinks.push(l);
            }
            return new LinkQuery(finalLinks, this.g);
        };
        return Node;
    })(BasicElement);
    networkcube.Node = Node;
    /**
      * Represents a link object on a WindowGraph
      */
    var Link = (function (_super) {
        __extends(Link, _super);
        function Link(id, graph) {
            _super.call(this, id, 'link', graph);
        }
        // SPECIFIC ATTRIBUTE QUERIES
        Link.prototype.linkType = function () { return this.attr('linkType'); };
        Object.defineProperty(Link.prototype, "source", {
            get: function () { return this.g._nodes[this.attr('source')]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Link.prototype, "target", {
            get: function () { return this.g._nodes[this.attr('target')]; },
            enumerable: true,
            configurable: true
        });
        Link.prototype.nodePair = function () { return this.g._nodePairs[this.attr('nodePair')]; };
        Link.prototype.directed = function () { return this.attr('directed'); };
        Link.prototype.other = function (n) {
            return this.source == n ? this.target : this.source;
        };
        /** Returns this link's weights over time as NumberQuery
        * If no time parameter is supplied, returns *all* weights of this
         * link over all time steps.
         * @param t1 - start time. If only this parameter is specified, returns
         * only the value for t1.
         * @param t2 - end time. If this parameter is specified, returns
         * weights between t1 and t2.
        */
        Link.prototype.weights = function (start, end) {
            if (start == undefined)
                return new NumberQuery(this.attr('weights').toArray());
            if (end == undefined)
                return new NumberQuery([this.attr('weights').get(start)]);
            return new NumberQuery(this.attr('weights').period(start, end).toArray());
        };
        Link.prototype.presentIn = function (start, end) {
            var presence = this.weights(start, end).toArray();
            return presence.length > 0;
        };
        /** Returns all times in which this link's weight != 0  */
        Link.prototype.times = function () {
            // var weights:ScalarTimeSeries<number> = <ScalarTimeSeries<number>>this.attr('weights');
            // var times = []
            // var allTimes = this.g.times().toArray();
            // for(var t in weights.serie){
            //     times.push(allTimes[parseInt(t)]);               
            // }                        
            return new TimeQuery(this.attr('presence'), this.g);
        };
        return Link;
    })(BasicElement);
    networkcube.Link = Link;
    var NodePair = (function (_super) {
        __extends(NodePair, _super);
        function NodePair(id, graph) {
            _super.call(this, id, 'nodePair', graph);
        }
        Object.defineProperty(NodePair.prototype, "source", {
            // SPECIFIC ATTRIBUTE QUERIES
            get: function () { return this.g._nodes[this.attr('source')]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodePair.prototype, "target", {
            get: function () { return this.g._nodes[this.attr('target')]; },
            enumerable: true,
            configurable: true
        });
        NodePair.prototype.links = function () { return new LinkQuery(this.attr('links'), this.g); };
        NodePair.prototype.nodeType = function () { return this.attr('nodeType'); };
        NodePair.prototype.presentIn = function (start, end) {
            for (var i = 0; i < this.links.length; i++) {
                if (this.links[i].presentIn(start, end))
                    return true;
            }
            return false;
        };
        return NodePair;
    })(BasicElement);
    networkcube.NodePair = NodePair;
    var Location = (function (_super) {
        __extends(Location, _super);
        function Location(id, graph) {
            _super.call(this, id, 'location', graph);
        }
        // SPECIFIC ATTRIBUTE QUERIES
        Location.prototype.label = function () { return this.attr('label') + ''; };
        Location.prototype.longitude = function () { return this.attr('longitude'); };
        Location.prototype.latitude = function () { return this.attr('latitude'); };
        Location.prototype.x = function () { return this.attr('x'); };
        Location.prototype.y = function () { return this.attr('y'); };
        Location.prototype.z = function () { return this.attr('z'); };
        Location.prototype.radius = function () { return this.attr('radius'); };
        return Location;
    })(BasicElement);
    networkcube.Location = Location;
    /** A time series with a scalar value per time step.
     * This class nestes an object that holds information for time
     * steps in the format key->value. I.e. the value for the
     * time step with ID 3 is accessed by this.3   */
    var ScalarTimeSeries = (function () {
        function ScalarTimeSeries() {
            this.serie = {};
        }
        /** @returns a ScalarTimeSeries for the specified period. */
        ScalarTimeSeries.prototype.period = function (t1, t2) {
            var t1id = t1.id();
            var t2id = t2.id();
            var s = new ScalarTimeSeries();
            for (var prop in this.serie) {
                if (parseInt(prop) >= t1id
                    && parseInt(prop) <= t2id) {
                    s.serie[prop] = this.serie[prop];
                }
            }
            return s;
        };
        /** Sets a value for a specified time point. */
        ScalarTimeSeries.prototype.set = function (t, element) {
            this.serie[t.id()] = element;
        };
        /** @returns the value for a specified time point. */
        ScalarTimeSeries.prototype.get = function (t) {
            if (this.serie[t.id()] == undefined)
                return;
            return this.serie[t.id()];
        };
        ScalarTimeSeries.prototype.size = function () {
            return this.toArray().length;
        };
        /** Returns all values as array.
         * @param removeDuplicates
         * @returns array with values;
         */
        ScalarTimeSeries.prototype.toArray = function (removeDuplicates) {
            if (removeDuplicates == undefined)
                removeDuplicates = false;
            var a = [];
            if (removeDuplicates) {
                for (var prop in this.serie) {
                    a.push(this.serie[prop]);
                }
            }
            else {
                for (var prop in this.serie) {
                    if (a.indexOf(this.serie[prop]) == -1)
                        a.push(this.serie[prop]);
                }
            }
            return a;
        };
        return ScalarTimeSeries;
    })();
    networkcube.ScalarTimeSeries = ScalarTimeSeries;
    /** A time series with an array per time step.
    * This class nestes an object that holds information for time
    * steps in the format key->value. I.e. the value for the
    * time step with ID 3 is accessed by this.3   */
    var ArrayTimeSeries = (function () {
        function ArrayTimeSeries() {
            this.serie = {};
        }
        ArrayTimeSeries.prototype.period = function (t1, t2) {
            var t1id = t1.id();
            var t2id = t1.id();
            var s = new ArrayTimeSeries();
            for (var prop in this.serie) {
                if (parseInt(prop) >= t1id
                    && parseInt(prop) <= t1id) {
                    s.serie[prop] = this.serie[prop];
                }
            }
            return s;
        };
        ArrayTimeSeries.prototype.add = function (t, element) {
            if (t == undefined) {
                return;
            }
            if (!this.serie[t._id])
                this.serie[t._id] = [];
            this.serie[t._id].push(element);
        };
        ArrayTimeSeries.prototype.get = function (t) {
            return this.serie[t._id];
        };
        ArrayTimeSeries.prototype.toArray = function () {
            var a = [];
            for (var prop in this.serie) {
                a.push(this.serie[prop]);
            }
            return a;
        };
        ArrayTimeSeries.prototype.toFlatArray = function (removeDuplicates) {
            if (removeDuplicates == undefined)
                removeDuplicates = false;
            var a = [];
            for (var prop in this.serie) {
                for (var i = 0; i < this.serie[prop].length; i++) {
                    if (!removeDuplicates || (removeDuplicates && a.indexOf(this.serie[prop]) == -1)) {
                        a.push(this.serie[prop][i]);
                    }
                }
            }
            return a;
        };
        return ArrayTimeSeries;
    })();
    networkcube.ArrayTimeSeries = ArrayTimeSeries;
    //// QUERIES
    var Query = (function () {
        function Query(elements) {
            this._elements = [];
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] != undefined)
                        this._elements.push(elements[i]);
                }
            }
        }
        Query.prototype.contains = function (element) {
            return this._elements.indexOf(element) > -1;
        };
        Query.prototype.addUnique = function (element) {
            if (this._elements.indexOf(element) == -1)
                this._elements.push(element);
        };
        Query.prototype.add = function (element) {
            this._elements.push(element);
        };
        Query.prototype.addAll = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] != undefined)
                    this._elements.push(elements[i]);
            }
        };
        Query.prototype.addAllUnique = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.addUnique(elements[i]);
            }
        };
        Object.defineProperty(Query.prototype, "length", {
            /** @returns numbr of elements in this query. Same as size(). */
            get: function () {
                return this._elements.length;
            },
            enumerable: true,
            configurable: true
        });
        ;
        /** @returns numbr of elements in this query. Same as length getter. */
        Query.prototype.size = function () { return this._elements.length; };
        ;
        /** @returns all ids in this query. */
        Query.prototype.ids = function () {
            return this._elements;
        };
        Query.prototype.removeDuplicates = function () {
            var elements = this._elements.slice(0);
            this._elements = [];
            for (var i = 0; i < elements.length; i++) {
                if (this._elements.indexOf(elements[i]) == -1)
                    this._elements.push(elements[i]);
            }
            return this;
        };
        Query.prototype.generic_intersection = function (q) {
            var intersection = [];
            for (var i = 0; i < this._elements.length; i++) {
                for (var j = 0; j < q._elements.length; j++) {
                    if (this._elements[i] == q._elements[j]) {
                        intersection.push(this._elements[i]);
                    }
                }
            }
            return new Query(intersection);
        };
        return Query;
    })();
    networkcube.Query = Query;
    /**
     * Represents a simple array of numbers that can be used to calculate
     * max, mean, min values etc..
     */
    var NumberQuery = (function (_super) {
        __extends(NumberQuery, _super);
        function NumberQuery() {
            _super.apply(this, arguments);
        }
        NumberQuery.prototype.clone = function () {
            return this._elements.slice(0);
        };
        NumberQuery.prototype.min = function () {
            var min = this._elements[0];
            for (var i = 1; i < this._elements.length; i++) {
                if (this._elements[i] != undefined)
                    min = Math.min(min, this._elements[i]);
            }
            return min;
        };
        NumberQuery.prototype.max = function () {
            var max = this._elements[0];
            for (var i = 1; i < this._elements.length; i++) {
                if (this._elements[i] != undefined)
                    max = Math.max(max, this._elements[i]);
            }
            return max;
        };
        NumberQuery.prototype.mean = function () {
            var v = 0;
            var count = 0;
            for (var i = 0; i < this._elements.length; i++) {
                if (typeof this._elements[i] == 'number') {
                    v += this._elements[i];
                    count++;
                }
            }
            return v / count;
        };
        NumberQuery.prototype.sum = function () {
            var sum = 0;
            for (var i = 0; i < this._elements.length; i++) {
                if (typeof this._elements[i] == 'number') {
                    sum += this._elements[i];
                }
            }
            return sum;
        };
        NumberQuery.prototype.toArray = function () {
            return this._elements.slice(0);
        };
        NumberQuery.prototype.get = function (index) {
            return this._elements[index];
        };
        NumberQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this._elements[i], i);
            }
            return this;
        };
        return NumberQuery;
    })(Query);
    networkcube.NumberQuery = NumberQuery;
    var StringQuery = (function () {
        function StringQuery(elements) {
            if (elements)
                this._elements = elements.slice(0);
        }
        StringQuery.prototype.contains = function (element) {
            return this._elements.indexOf(element) > -1;
        };
        StringQuery.prototype.addUnique = function (element) {
            if (this._elements.indexOf(element) == -1)
                this._elements.push(element);
        };
        StringQuery.prototype.add = function (element) {
            this._elements.push(element);
        };
        StringQuery.prototype.addAll = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i] != undefined)
                    this._elements.push(elements[i]);
            }
        };
        StringQuery.prototype.addAllUnique = function (elements) {
            for (var i = 0; i < elements.length; i++) {
                this.addUnique(elements[i]);
            }
        };
        Object.defineProperty(StringQuery.prototype, "length", {
            get: function () { return this._elements.length; },
            enumerable: true,
            configurable: true
        });
        ;
        StringQuery.prototype.size = function () { return this._elements.length; };
        ;
        StringQuery.prototype.toArray = function () {
            return this._elements.slice(0);
        };
        StringQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this._elements[i], i);
            }
            return this;
        };
        return StringQuery;
    })();
    networkcube.StringQuery = StringQuery;
    var GraphElementQuery = (function (_super) {
        __extends(GraphElementQuery, _super);
        function GraphElementQuery(elements, g) {
            _super.call(this, elements);
            this.elementType = '';
            this.g = g;
        }
        /** @returns a query that contains only the elements matching
         * the filter critera;
         * @param attribute - name of attribute that is used on filter
         * @param filter - function evaluating if the attribute's value is valid.
          */
        GraphElementQuery.prototype.generic_filter = function (filter) {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                try {
                    if (filter(this.g.get(this.elementType, this._elements[i]))) {
                        arr.push(this._elements[i]);
                    }
                }
                catch (ex) {
                }
            }
            return arr;
        };
        /** @returns a query with selected elements, i.e. elements that are in at least
         * one selection.
         */
        GraphElementQuery.prototype.generic_selected = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isSelected()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        /** @returns a query with visible elements.
         */
        GraphElementQuery.prototype.generic_visible = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isVisible()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        /** @returns a query with highighted elements.
         */
        GraphElementQuery.prototype.generic_highlighted = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isHighlighted()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        /** @returns a query with only the elements present in the specified time step
         * or period.
         */
        GraphElementQuery.prototype.generic_presentIn = function (start, end) {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).presentIn(start, end)) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        /** @returns this query with elements sorted */
        GraphElementQuery.prototype.generic_sort = function (attrName, asc) {
            var _this = this;
            if (this._elements.length == 0) {
                return this;
            }
            var array = this._elements.slice(0);
            array.sort(function (e1, e2) {
                return networkcube.attributeSort(_this.g.get(_this.elementType, e1), _this.g.get(_this.elementType, e2), attrName, asc);
            });
            this._elements = array;
            return this;
        };
        GraphElementQuery.prototype.generic_removeDuplicates = function () {
            var uniqueElements = [];
            for (var i = 0; i < this._elements.length; i++) {
                // for(var j=i+1 ; j <this._elements.length ; j++){
                //     if(this._elements[i]==this._elements[j])
                //         this._elements.slice(j,1);                                 
                // }    
                if (uniqueElements.indexOf(this._elements[i]) == -1)
                    uniqueElements.push(this._elements[i]);
            }
            this._elements = uniqueElements;
            return this;
        };
        return GraphElementQuery;
    })(Query);
    networkcube.GraphElementQuery = GraphElementQuery;
    var NodeQuery = (function (_super) {
        __extends(NodeQuery, _super);
        function NodeQuery(elements, g) {
            _super.call(this, elements, g);
            this.elementType = 'node';
            if (elements.length > 0 && elements[0] instanceof networkcube.Node) {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i].id());
                }
            }
            else if (elements.length > 0 && typeof elements[0] == 'number') {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i]);
                }
            }
            this.elementType = 'node';
        }
        NodeQuery.prototype.contains = function (n) {
            return this._elements.indexOf(n.id()) > -1;
        };
        // WRAPPERS TO GENERIC FUNCTIONS IN GRAPH_ELEMENT_QUERY
        NodeQuery.prototype.highlighted = function () {
            return new NodeQuery(_super.prototype.generic_highlighted.call(this), this.g);
        };
        NodeQuery.prototype.visible = function () {
            return new NodeQuery(_super.prototype.generic_visible.call(this), this.g);
        };
        NodeQuery.prototype.selected = function () {
            return new NodeQuery(_super.prototype.generic_selected.call(this), this.g);
        };
        NodeQuery.prototype.filter = function (filter) {
            return new NodeQuery(_super.prototype.generic_filter.call(this, filter), this.g);
        };
        NodeQuery.prototype.presentIn = function (t1, t2) {
            return new NodeQuery(_super.prototype.generic_presentIn.call(this, t1, t2), this.g);
        };
        NodeQuery.prototype.sort = function (attributeName, asc) {
            return _super.prototype.generic_sort.call(this, attributeName, asc);
        };
        // proper functions
        NodeQuery.prototype.label = function () {
            var q = new StringQuery();
            for (var i = 0; i < this._elements.length; i++) {
                q.add('' + this.g.attr('label', this._elements[i], 'node'));
            }
            return q;
        };
        NodeQuery.prototype.neighbors = function (t1, t2) {
            return new NodeQuery(getBulkAttributes('neighbors', this._elements, 'node', this.g, t1, t2), this.g);
        };
        NodeQuery.prototype.links = function (t1, t2) {
            return new LinkQuery(getBulkAttributes('links', this._elements, 'node', this.g, t1, t2), this.g);
        };
        NodeQuery.prototype.locations = function (t1, t2) {
            return new LocationQuery(getBulkAttributes('locations', this._elements, 'node', this.g, t1, t2), this.g);
        };
        NodeQuery.prototype.nodeTypes = function () {
            var q = new StringQuery();
            for (var i = 0; i < this._elements.length; i++) {
                q.add(this.g.attr('nodeType', this._elements[i], 'node'));
            }
            return q;
        };
        // returns the i-th element in this query
        NodeQuery.prototype.get = function (i) { return this.g._nodes[this._elements[i]]; };
        NodeQuery.prototype.last = function () { return this.g._nodes[this._elements[this._elements.length - 1]]; };
        // returns array of nodes
        NodeQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodes[this._elements[i]]);
            }
            return a;
        };
        NodeQuery.prototype.createAttribute = function (attrName, f) {
            // create and init news attribute array if necessary
            if (this.g.nodeArrays[attrName] == undefined) {
                this.g.nodeArrays[attrName] = [];
                for (var i = 0; i < this.g._nodes.length; i++) {
                    this.g.nodeArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.nodeArrays[attrName][this._elements[i]] = f(this.g._nodes[this._elements[i]]);
            }
            return this;
        };
        NodeQuery.prototype.intersection = function (q) {
            return new NodeQuery(this.generic_intersection(q)._elements, this.g);
        };
        NodeQuery.prototype.removeDuplicates = function () {
            return new NodeQuery(this.generic_removeDuplicates()._elements, this.g);
        };
        NodeQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this.g.node(this._elements[i]), i);
            }
            return this;
        };
        return NodeQuery;
    })(GraphElementQuery);
    networkcube.NodeQuery = NodeQuery;
    var LinkQuery = (function (_super) {
        __extends(LinkQuery, _super);
        function LinkQuery(elements, g) {
            _super.call(this, elements, g);
            this.elementType = 'link';
            if (elements.length > 0 && elements[0] instanceof networkcube.Link) {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i].id());
                }
            }
            if (elements.length > 0 && typeof elements[0] == 'number') {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i]);
                }
            }
        }
        LinkQuery.prototype.contains = function (l) {
            return this._elements.indexOf(l.id()) > -1;
        };
        LinkQuery.prototype.highlighted = function () {
            return new LinkQuery(_super.prototype.generic_highlighted.call(this), this.g);
        };
        LinkQuery.prototype.visible = function () {
            return new LinkQuery(_super.prototype.generic_visible.call(this), this.g);
        };
        LinkQuery.prototype.selected = function () {
            return new LinkQuery(_super.prototype.generic_selected.call(this), this.g);
        };
        LinkQuery.prototype.filter = function (filter) {
            return new LinkQuery(_super.prototype.generic_filter.call(this, filter), this.g);
        };
        LinkQuery.prototype.presentIn = function (t1, t2) {
            return new LinkQuery(_super.prototype.generic_presentIn.call(this, t1, t2), this.g);
        };
        LinkQuery.prototype.sort = function (attributeName) {
            return _super.prototype.generic_sort.call(this, attributeName);
        };
        // returns the i-th element in this query
        LinkQuery.prototype.get = function (i) { return this.g._links[this._elements[i]]; };
        LinkQuery.prototype.last = function () { return this.g._links[this._elements[this._elements.length - 1]]; };
        // returns array of links
        LinkQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._links[this._elements[i]]);
            }
            return a;
        };
        LinkQuery.prototype.weights = function (start, end) {
            var s = new NumberQuery();
            for (var i = 0; i < this._elements.length; i++) {
                s.addAll(this.g.link(i).weights(start, end).toArray());
            }
            return s;
        };
        LinkQuery.prototype.createAttribute = function (attrName, f) {
            // create and init new attribute array if necessary
            if (this.g.linkArrays[attrName] == undefined) {
                this.g.linkArrays[attrName] = [];
                for (var i = 0; i < this.g._links.length; i++) {
                    this.g.linkArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.linkArrays[attrName][this._elements[i]] = f(this.g._links[this._elements[i]]);
            }
            return this;
        };
        LinkQuery.prototype.linkTypes = function () {
            var linkTypes = [];
            var s;
            for (var i = 0; i < this._elements.length; i++) {
                s = this.g.link(this._elements[i]).linkType();
                if (linkTypes.indexOf(s) == -1)
                    linkTypes.push(s);
            }
            return linkTypes;
        };
        LinkQuery.prototype.sources = function () {
            var nodes = [];
            var link;
            for (var i = 0; i < this._elements.length; i++) {
                link = this.g.link(this._elements[i]);
                if (nodes.indexOf(link.source) == -1)
                    nodes.push(link.source.id());
            }
            return new NodeQuery(nodes, this.g);
        };
        LinkQuery.prototype.targets = function () {
            var nodes = [];
            var link;
            for (var i = 0; i < this._elements.length; i++) {
                link = this.g.link(this._elements[i]);
                if (nodes.indexOf(link.target) == -1)
                    nodes.push(link.target.id());
            }
            return new NodeQuery(nodes, this.g);
        };
        LinkQuery.prototype.intersection = function (q) {
            return new LinkQuery(this.generic_intersection(q)._elements, this.g);
        };
        LinkQuery.prototype.removeDuplicates = function () {
            return new LinkQuery(this.generic_removeDuplicates()._elements, this.g);
        };
        LinkQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this.g.link(this._elements[i]), i);
            }
            return this;
        };
        return LinkQuery;
    })(GraphElementQuery);
    networkcube.LinkQuery = LinkQuery;
    var NodePairQuery = (function (_super) {
        __extends(NodePairQuery, _super);
        function NodePairQuery(elements, g) {
            _super.call(this, elements, g);
            this.elementType = 'nodePair';
            this.elementType = 'nodePair';
            if (elements.length > 0 && elements[0] instanceof networkcube.NodePair) {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i].id());
                }
            }
            if (elements.length > 0 && typeof elements[0] == 'number') {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i]);
                }
            }
        }
        NodePairQuery.prototype.contains = function (n) {
            return this._elements.indexOf(n.id()) > -1;
        };
        NodePairQuery.prototype.highlighted = function () {
            return new NodePairQuery(_super.prototype.generic_highlighted.call(this), this.g);
        };
        NodePairQuery.prototype.visible = function () {
            return new NodePairQuery(_super.prototype.generic_visible.call(this), this.g);
        };
        NodePairQuery.prototype.selected = function () {
            return new NodePairQuery(_super.prototype.generic_selected.call(this), this.g);
        };
        NodePairQuery.prototype.filter = function (filter) {
            return new NodePairQuery(_super.prototype.generic_filter.call(this, filter), this.g);
        };
        NodePairQuery.prototype.presentIn = function (t1, t2) {
            return new NodePairQuery(_super.prototype.generic_presentIn.call(this, t1, t2), this.g);
        };
        NodePairQuery.prototype.sort = function (attributeName) {
            return _super.prototype.generic_sort.call(this, attributeName);
        };
        // returns the i-th element in this query
        NodePairQuery.prototype.get = function (i) { return this.g._nodePairs[this._elements[i]]; };
        NodePairQuery.prototype.last = function () { return this.g._links[this._elements[this._elements.length - 1]]; };
        // returns array of NodePair
        NodePairQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodePairs[this._elements[i]]);
            }
            return a;
        };
        NodePairQuery.prototype.createAttribute = function (attrName, f) {
            // create and init new attribute array if necessary
            if (this.g.nodePairArrays[attrName] == undefined) {
                this.g.nodePairArrays[attrName] = [];
                for (var i = 0; i < this.g._nodePairs.length; i++) {
                    this.g.nodePairArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.nodePairArrays[attrName][this._elements[i]] = f(this.g._nodePairs[this._elements[i]]);
            }
            return this;
        };
        NodePairQuery.prototype.intersection = function (q) {
            return new NodePairQuery(this.generic_intersection(q)._elements, this.g);
        };
        NodePairQuery.prototype.removeDuplicates = function () {
            return new NodePairQuery(this.generic_removeDuplicates()._elements, this.g);
        };
        NodePairQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this.g.nodePair(this._elements[i]), i);
            }
            return this;
        };
        return NodePairQuery;
    })(GraphElementQuery);
    networkcube.NodePairQuery = NodePairQuery;
    var TimeQuery = (function (_super) {
        __extends(TimeQuery, _super);
        function TimeQuery(elements, g) {
            _super.call(this, elements, g);
            this.elementType = 'time';
            this.elementType = 'time';
            if (elements.length > 0 && elements[0] instanceof networkcube.Time) {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i].id());
                }
            }
            if (elements.length > 0 && typeof elements[0] == 'number') {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i]);
                }
            }
        }
        TimeQuery.prototype.contains = function (t) {
            return this._elements.indexOf(t.id()) > -1;
        };
        TimeQuery.prototype.highlighted = function () {
            return new TimeQuery(_super.prototype.generic_highlighted.call(this), this.g);
        };
        TimeQuery.prototype.visible = function () {
            return new TimeQuery(_super.prototype.generic_visible.call(this), this.g);
        };
        TimeQuery.prototype.selected = function () {
            return new TimeQuery(_super.prototype.generic_selected.call(this), this.g);
        };
        TimeQuery.prototype.filter = function (filter) {
            return new TimeQuery(_super.prototype.generic_filter.call(this, filter), this.g);
        };
        TimeQuery.prototype.presentIn = function (t1, t2) {
            return new TimeQuery(_super.prototype.generic_presentIn.call(this, t1, t2), this.g);
        };
        TimeQuery.prototype.sort = function (attributeName) {
            return _super.prototype.generic_sort.call(this, attributeName);
        };
        TimeQuery.prototype.links = function () {
            var links = [];
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
            for (var i = 0; i < this._elements.length; i++) {
                links = links.concat(this.g.attr('links', this._elements[i], 'time'));
            }
            return new LinkQuery(links, this.g);
        };
        // returns the i-th element in this query
        TimeQuery.prototype.get = function (i) { return this.g._times[this._elements[i]]; };
        TimeQuery.prototype.last = function () { return this.g._times[this._elements[this._elements.length - 1]]; };
        // return array of times
        TimeQuery.prototype.toArray = function () {
            var a = [];
            var allTimes = this.g._times;
            for (var i = 0; i < this._elements.length; i++) {
                a.push(allTimes[this._elements[i]]);
            }
            return a;
        };
        TimeQuery.prototype.createAttribute = function (attrName, f) {
            // create and init new attribute array if necessary
            if (this.g.timeArrays[attrName] == undefined) {
                this.g.timeArrays[attrName] = [];
                for (var i = 0; i < this.g._times.length; i++) {
                    this.g.timeArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.timeArrays[attrName][this._elements[i]] = f(this.g._times[this._elements[i]]);
            }
            return this;
        };
        TimeQuery.prototype.unixTimes = function () {
            var unixTimes = [];
            for (var i = 0; i < this._elements.length; i++) {
                unixTimes.push(this.g.time(this._elements[i]).unixTime());
            }
            return unixTimes;
        };
        TimeQuery.prototype.intersection = function (q) {
            return new TimeQuery(this.generic_intersection(q)._elements, this.g);
        };
        TimeQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this.g.time(this._elements[i]), i);
            }
            return this;
        };
        return TimeQuery;
    })(GraphElementQuery);
    networkcube.TimeQuery = TimeQuery;
    var LocationQuery = (function (_super) {
        __extends(LocationQuery, _super);
        function LocationQuery(elements, g) {
            _super.call(this, elements, g);
            this.elementType = 'location';
            this.elementType = 'location';
            if (elements.length > 0 && elements[0] instanceof networkcube.Location) {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements = elements[i].id();
                }
            }
            if (elements.length > 0 && typeof elements[0] == 'number') {
                this._elements = [];
                for (var i = 0; i < elements.length; i++) {
                    this._elements.push(elements[i]);
                }
            }
        }
        LocationQuery.prototype.contains = function (l) {
            return this._elements.indexOf(l.id()) > -1;
        };
        LocationQuery.prototype.highlighted = function () {
            return new LocationQuery(_super.prototype.generic_highlighted.call(this), this.g);
        };
        LocationQuery.prototype.visible = function () {
            return new LocationQuery(_super.prototype.generic_visible.call(this), this.g);
        };
        LocationQuery.prototype.selected = function () {
            return new LocationQuery(_super.prototype.generic_selected.call(this), this.g);
        };
        LocationQuery.prototype.filter = function (filter) {
            return new LocationQuery(_super.prototype.generic_filter.call(this, filter), this.g);
        };
        LocationQuery.prototype.presentIn = function (t1, t2) {
            return new LocationQuery(_super.prototype.generic_presentIn.call(this, t1, t2), this.g);
        };
        LocationQuery.prototype.sort = function (attributeName) {
            return _super.prototype.generic_sort.call(this, attributeName);
        };
        // returns the i-th element in this query
        LocationQuery.prototype.get = function (i) { return this.g._locations[this._elements[i]]; };
        LocationQuery.prototype.last = function () { return this.g._locations[this._elements[this._elements.length - 1]]; };
        // return array of locations
        LocationQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._locations[this._elements[i]]);
            }
            return a;
        };
        LocationQuery.prototype.createAttribute = function (attrName, f) {
            // create and init new attribute array if necessary
            if (this.g.locationArrays[attrName] == undefined) {
                this.g.locationArrays[attrName] = [];
                for (var i = 0; i < this.g._locations.length; i++) {
                    this.g.locationArrays[attrName].push();
                }
            }
            for (var i = 0; i < this._elements.length; i++) {
                this.g.locationArrays[attrName][this._elements[i]] = f(this.g._locations[this._elements[i]]);
            }
            return this;
        };
        LocationQuery.prototype.intersection = function (q) {
            return new LocationQuery(this.generic_intersection(q)._elements, this.g);
        };
        LocationQuery.prototype.removeDuplicates = function () {
            return new LocationQuery(this.generic_removeDuplicates()._elements, this.g);
        };
        LocationQuery.prototype.forEach = function (f) {
            for (var i = 0; i < this._elements.length; i++) {
                f(this.g.location(this._elements[i]), i);
            }
            return this;
        };
        return LocationQuery;
    })(GraphElementQuery);
    networkcube.LocationQuery = LocationQuery;
    function getBulkAttributes(attrName, ids, type, g, t1, t2) {
        var a = [];
        var temp;
        for (var i = 0; i < ids.length; i++) {
            if (t2 != undefined) {
                temp = g.attr(attrName, ids[i], type).period(t1, t2).toArray();
            }
            else if (t1 != undefined) {
                temp = [g.attr(attrName, ids[i], type).get(t1)];
            }
            else {
                temp = g.attr(attrName, ids[i], type).toArray();
            }
            for (var j = 0; j < temp.length; j++) {
                if (temp[j] instanceof Array) {
                    a = a.concat(temp[j]);
                }
                else {
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
    var Motif = (function () {
        function Motif(nodes, links) {
            this.nodes = [];
            this.links = [];
            this.times = [];
            this.nodes = nodes.slice(0);
            this.links = links.slice(0);
        }
        Motif.prototype.print = function () {
            console.log('nodes:', this.nodes.length, 'links:', this.links.length);
        };
        return Motif;
    })();
    networkcube.Motif = Motif;
    var MotifTemplate = (function () {
        function MotifTemplate(nodes, links) {
            this.nodes = [];
            this.links = [];
            this.nodes = nodes.slice(0);
            this.links = links.slice(0);
        }
        return MotifTemplate;
    })();
    networkcube.MotifTemplate = MotifTemplate;
    var MotifSequence = (function () {
        function MotifSequence() {
            this.motifs = [];
        }
        MotifSequence.prototype.push = function (m) {
            this.motifs.push(m);
        };
        return MotifSequence;
    })();
    networkcube.MotifSequence = MotifSequence;
})(networkcube || (networkcube = {}));
