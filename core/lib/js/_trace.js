(function () {
    var _traceq = _traceq || [];
    var traceUrl = "http://vizatt.saclay.inria.fr/";
    var _sending = null;
    var sessionId;
    var starting = true;
    var debug = false;
    var pagename = null;
    var disabled = false;
    trace = { version: "0.3" };
    trace.disable = function (value) {
        disabled = (value != false);
    };
    trace.url = function (url) {
        if (!arguments.length)
            return url;
        traceUrl = url;
        return trace;
    };
    trace.sessionId = function () {
        return sessionId;
    };
    trace.debug = function (d) {
        if (!arguments.length)
            return debug;
        debug = d;
        return trace;
    };
    function getName(s) {
        return s.replace(/^.*[\\\/]/, '');
    }
    function getPageName() {
        if (pagename == null) {
            pagename = getName(document.location.pathname);
        }
        return pagename;
    }
    var uuid = function () {
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
    var sendLogs_ = function (list) {
        var httpRequest;
        if (window.XDomainRequest) {
            httpRequest = new XDomainRequest();
            httpRequest.onload = function () { sendMoreOrAgain(true); };
        }
        else if (window.XMLHttpRequest)
            httpRequest = new XMLHttpRequest();
        else
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        httpRequest.onreadystatechange = function () {
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
        }
        else if (window.XMLHttpRequest) {
            httpRequest.setRequestHeader("Content-Type", "application/json");
            httpRequest.setRequestHeader("Accept", "text/plain");
        }
        httpRequest.send(json);
    };
    var sendLogs = function () {
        if (_traceq.length == 0)
            return;
        _sending = _traceq;
        if (debug) {
            window.console && console.log("Sending %d messages", _sending.length);
        }
        _traceq = [];
        sendLogs_(_sending);
    };
    var sendMoreOrAgain = function (ok) {
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
            sendLogs_(_sending);
        }
    };
    function traceMetadata(action, label, value) {
        return traceEvent("_trace", action, label, value);
    }
    function traceEvent(cat, action, label, value) {
        if (disabled)
            return;
        if (starting) {
            starting = false;
            _sending = [];
            traceEvent("_trace", "document.location", "href", document.location.href);
            traceEvent("_trace", "browser", "userAgent", navigator.userAgent);
            traceEvent("_trace", "screen", "size", "w:" + screen.width + ";h:" + screen.height);
            traceEvent("_trace", "window", "innerSize", "w:" + window.innerWidth + ";h:" + window.innerHeight);
            _sending = null;
        }
        if (debug) {
            window.console && console.log("Track[" + cat + "," + action + "," + label + "]");
        }
        var ts = Date.now();
        if (cat == null) {
            cat = getPageName() + "/" + networkcube.getDynamicGraph().name;
            console.log(">> CAT: " + cat);
        }
        _traceq.push({ "session": sessionId,
            "ts": ts,
            "cat": cat,
            "action": action,
            "label": label,
            "value": value });
        if (_sending == null)
            sendLogs();
        return trace;
    }
    function traceEventDeferred(delay, cat, action, label, value) {
        return window.setTimeout(function () {
            traceEvent(cat, action, label, value);
        }, delay);
        return trace;
    }
    function traceEventClear(id) {
        if (typeof id == "number") {
            clearTimeout(id);
        }
        return trace;
    }
    trace.event = traceEvent;
    trace.eventDeferred = traceEventDeferred;
    trace.eventClear = traceEventClear;
    trace.sendmail = sendmail;
    sessionId = readCookie("uuid");
    if (sessionId == null) {
        sessionId = uuid();
        createCookie("uuid", sessionId, 1);
    }
})();
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
trace.debug(true);
