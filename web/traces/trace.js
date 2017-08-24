(function() {

    var _traceq = _traceq || [];
    var traceUrl = "http://vizatt.saclay.inria.fr/";
    // "http://localhost:5000/trace";
    var _sending = null;
    var sessionId;
    var starting = true;
    var debug = false;

    trace = {version: "0.3"};

    trace.url = function(url) {
	if (!arguments.length) return url;
	traceUrl = url;
	return trace;
    };

    trace.sessionId = function() {
	return sessionId;
    };

    trace.debug = function(d) {
	if (!arguments.length) return debug;
	debug = d;
	return trace;
    };

    var uuid = function() {
	var uuid = "", i, random;
	for (i = 0; i < 32; i++) {
	    random = Math.random() * 16 | 0;

	    if (i == 8 || i == 12 || i == 16 || i == 20) {
		uuid += "-";
	    }
	    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
	}
	return uuid;
    };

    var sendLogs_ = function(list) {
	var httpRequest;
	if (window.XDomainRequest)
	{
            httpRequest=new XDomainRequest();
            httpRequest.onload = function() { sendMoreOrAgain(true); };
	}
	else if (window.XMLHttpRequest)
            httpRequest=new XMLHttpRequest();
	else
            httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
	httpRequest.onreadystatechange = function() {
	    if (debug) {
		window.console && console.log("readyState =%d", httpRequest.readyState);
	    }
	    if (httpRequest.readyState == this.DONE) {
		if (debug) {
		    window.console && console.log("status =%d", httpRequest.status);
		}
		sendMoreOrAgain(httpRequest.status < 300);
	    }
	};
	var json = JSON.stringify(list);
	httpRequest.open("POST", traceUrl, true);
	if (window.XDomainRequest) {
	    // no request header?
	}
	else if (window.XMLHttpRequest) {
	    httpRequest.setRequestHeader("Content-Type", "application/json");
	    httpRequest.setRequestHeader("Accept", "text/plain");
	    //    httpRequest.setRequestHeader("Content-Length", json.length);
	}
	httpRequest.send(json);
    };

    var sendLogs = function() {
	if (_traceq.length == 0) return;
	_sending = _traceq;
	if (debug) {
	    window.console && console.log("Sending %d messages", _sending.length);
	}
	_traceq = [];
	sendLogs_(_sending);
    };

    var sendMoreOrAgain = function(ok) {
	if (ok) {
	    _sending = null;
	    sendLogs();
	}
	else {
	    if (_traceq.length != 0) {
		_sending = _sending.concat(_traceq);
		_traceq = [];
	    }
	    if (debug) {
		window.console && console.log("Re-sending %d messages", _sending.length);
	    }
	    sendLogs_(_sending); // try again
	}
    };

    function traceMetadata(action, label, value) {
	return traceEvent("_trace", action, label, value);
    }

    function traceEvent(cat, action, label, value) {
	// if (starting) {
	//     starting = false;
	//     _sending = [];
	//     traceEvent("_trace", "document.location", "href", document.location.href);
	//     traceEvent("_trace", "browser", "userAgent", navigator.userAgent);
	//     traceEvent("_trace", "screen", "size", "w:"+screen.width+";h:"+screen.height);
	//     traceEvent("_trace", "window", "innerSize", "w:"+window.innerWidth+";h:"+window.innerHeight);
	//     _sending = null;
	// }

	// if (debug) {
	//     window.console && console.log("Track["+cat+","+action+","+label+"]");
	// }
	// var ts = Date.now();
	// _traceq.push({"session": sessionId,
	// 	      "ts": ts,
	// 	      "cat": cat,
	// 	      "action": action,
	// 	      "label": label,
	// 	      "value": value});
	// if (_sending == null)
	//     sendLogs();
	// return trace;
    }

    //    console.log("Trace initialized with sessionId=%s", sessionId);

    function traceEventDeferred(delay, cat, action, label, value) {
	return window.setTimeout(function() {
            traceEvent(cat, action, label, value);
	}, delay);
	return trace;
    }

    function traceEventClear(id) {
	if(typeof id == "number") {  
            clearTimeout(id);
	}
	return trace;
    }
    trace.event = traceEvent;
    trace.eventDeferred = traceEventDeferred;
    trace.eventClear = traceEventClear;
    sessionId = uuid();
})();