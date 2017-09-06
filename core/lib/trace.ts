(function() {

    var _traceq = _traceq || [];
    var traceUrl = "http://vizatt.saclay.inria.fr/";
    // "http://localhost:5000/trace";
    var _sending = null;
    var sessionId;
    var starting = true;
    var debug = false; 
    var pagename = null;
    // var disabled = false;

    trace = {version: "0.3"};

    // //VS: for the consent
    // trace.disable = function(value) {
    // 	disabled = (value != false);
    // }

	trace.url = function(url) 
	{
		if (!arguments.length) return url;
		traceUrl = url;
		return trace;
    };

	trace.sessionId = function() 
	{
		return sessionId;
    };

	trace.debug = function(d) 
	{
		if (!arguments.length) return debug;
		debug = d;
		return trace;
	};

    //VS: to get user's current page
	function getName(s) 
	{
    	return s.replace(/^.*[\\\/]/, '');
	}

	function getPageName() 
	{
		if (pagename == null) {
			pagename = getName(document.location.pathname);
		}
		return pagename;
	}

	var uuid = function() 
	{
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

	var sendLogs_ = function(list) 
	{
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

		httpRequest.onreadystatechange = function() 
		{
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
		if (window.XDomainRequest) 
		{
			// no request header?
		}
		else if (window.XMLHttpRequest) 
		{
			httpRequest.setRequestHeader("Content-Type", "application/json");
			httpRequest.setRequestHeader("Accept", "text/plain");
			//    httpRequest.setRequestHeader("Content-Length", json.length);
		}
		
		httpRequest.send(json);
	};

	var sendLogs = function() 
	{
		if (_traceq.length == 0) return;
		_sending = _traceq;
		if (debug) {
			window.console && console.log("Sending %d messages", _sending.length);
		}
		_traceq = [];
		sendLogs_(_sending);
	};

	var sendMoreOrAgain = function(ok) 
	{
		if (ok) {
			_sending = null;
			sendLogs();
		}
		else 
		{
			if (_traceq.length != 0) {
			_sending = _sending.concat(_traceq);
			_traceq = [];
			}
			if (debug) 
			{
				window.console && console.log("Re-sending %d messages", _sending.length);
			}
			sendLogs_(_sending); // try again
		}
    };

	function traceMetadata(action, label, value) 
	{
		return traceEvent("_trace", action, label, value);
    }

	function traceEvent(cat, action, label, value) 
	{
		if (!networkcube.isTrackingEnabled()) 
			return;

		if (starting) {
			starting = false;
			_sending = [];
			traceEvent("_trace", "document.location", "href", document.location.href);
			traceEvent("_trace", "browser", "userAgent", navigator.userAgent);
			traceEvent("_trace", "screen", "size", "w:"+screen.width+";h:"+screen.height);
			traceEvent("_trace", "window", "innerSize", "w:"+window.innerWidth+";h:"+window.innerHeight);
			_sending = null;
		}

		if (debug) 
		{
			window.console && console.log("Track["+cat+","+action+","+label+"]");
		}
		var ts = Date.now();
		if (cat == null) 
		{
			cat = getPageName() + "/" + networkcube.getDynamicGraph().name;
			console.log(">> CAT: " + cat);
			//cat = getPageName();
		}
		
		_traceq.push({"session": sessionId,
				"ts": ts,
				"cat": cat,
				"action": action,
				"label": label,
				"value": value});
		
		if (_sending == null)
			sendLogs();

		return trace;
	}
	
	// sends an email to the server
	// takes PNG or SVG blob.
	function sendMailFunction(to, from, subject, message, cc_vistorian, blob_image, blob_svg) 
	{
		console.log('>>>> SENDING EMAIL...')		
		var formdata = new FormData(),
			oReq = new XMLHttpRequest();
	
		var date = new Date();
		formdata.append("from", from);
		formdata.append("to", to);
		formdata.append("subject", '[Vistorian] Screenshot: ' + networkcube.getDynamicGraph().name + ', ' + date.getDate());
		formdata.append("note", message);
		formdata.append("cc", cc_vistorian);
		//if (cc_vistorian) 
		//	formdata.append("CopyToVistorian", "Yes");
		if (blob_image)
			formdata.append("image",blob_image, "vistorian.png");
		if (blob_svg)
			formdata.append("svg", blob_svg, "vistorian.svg");

		oReq.open("POST", "http://aviz.fr/sendmail/", true);
		oReq.send(formdata);
		console.log('>>>> EMAIL SEND')
		return trace;
	}

    //    console.log("Trace initialized with sessionId=%s", sessionId);
	function traceEventDeferred(delay, cat, action, label, value) 
	{
		return window.setTimeout(function() 
		{
			traceEvent(cat, action, label, value);
		}, delay);
		
		return trace;
	}

	function traceEventClear(id) 
	{
		if(typeof id == "number") {  
			clearTimeout(id);
		}
		return trace;
    }
	
	trace.event = traceEvent;
    trace.eventDeferred = traceEventDeferred;
    trace.eventClear = traceEventClear;
	trace.sendmail = sendMailFunction;
	
	// console.log('trace.sendmail', trace.sendmail)
	sessionId = readCookie("uuid");
	
	if(sessionId == null)
    {
    	sessionId = uuid();
    	createCookie("uuid", sessionId, 1)
	}

	
	//function trace_help(s) {
	//	trace.event(null, "Help", s, )
	//}
})();

// COOKIE STUFF
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

trace.debug(true);



 


















