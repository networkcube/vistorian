///-----------------------------------------------------------------------------------------------------------------
/// utils.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - general purpose utility code for LinkWave.
///-----------------------------------------------------------------------------------------------------------------
var linkWaveApp;
(function (linkWaveApp) {
    var utils = (function () {
        function utils() {
        }
        utils.debug = function (viewName, msg) {
            if (window.console) {
                var now = +Date.now() - this.appStartTime;
                var secs = now / 1000;
                var time = "@" + secs.toFixed(3);

                console.log(time + "[" + viewName + "]: " + msg);
            }
        };
        utils.appStartTime = +Date.now();
        return utils;
    })();
    linkWaveApp.utils = utils;
})(linkWaveApp || (linkWaveApp = {}));
//# sourceMappingURL=utils.js.map
///-----------------------------------------------------------------------------------------------------------------
/// viewBase.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - base class for views - contains common code.
///-----------------------------------------------------------------------------------------------------------------
var linkWaveApp;
(function (linkWaveApp) {
    var viewBaseClass = (function () {
        function viewBaseClass(viewName) {
            this._viewName = viewName;
        }
        viewBaseClass.prototype.debug = function (msg) {
            linkWaveApp.utils.debug(this._viewName, msg);
        };

        viewBaseClass.prototype.postMessageToParent = function (msgObj) {
            if (window.parent) {
                var msg = JSON.stringify(msgObj);
                var domain = this.getDomain();

                parent.window.postMessage(msg, domain);
            }
        };

        viewBaseClass.prototype.getDomain = function () {
            var domain = location.hostname;
            if (!domain) {
                domain = "localhost";
            }

            domain = "http://" + domain;
            return domain;
        };

        viewBaseClass.prototype.onMessageFromParent = function (e) {
            if (e && e.data) {
                this.debug("view got message from parent: " + e.data);

                var msgObj = JSON.parse(e.data);
                this.processMessageFromParent(msgObj);
            }
        };

        //---- view class should override this ----
        viewBaseClass.prototype.processMessageFromParent = function (msgObj) {
        };
        return viewBaseClass;
    })();
    linkWaveApp.viewBaseClass = viewBaseClass;
})(linkWaveApp || (linkWaveApp = {}));
//# sourceMappingURL=viewBase.js.map
///-----------------------------------------------------------------------------------------------------------------
/// viewMgr.ts.  Copyright (c) 2014 Microsoft Corporation.
///     - manages the LinkWave multiple views, and selection messages
///-----------------------------------------------------------------------------------------------------------------
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var linkWaveApp;
(function (linkWaveApp) {
    var viewMgrClass = (function (_super) {
        __extends(viewMgrClass, _super);
        function viewMgrClass() {
            var _this = this;
            _super.call(this, "viewMgr");

            //---- ON LOADED callback ----
            jQuery(function (e) {
                _this.onLoaded();
            });
        }
        viewMgrClass.prototype.onLoaded = function () {
            var _this = this;
            jQuery(window).on("resize", function (e) {
                _this.layoutViews();
            });

            //---- do initial view layout ----
            this.layoutViews();

            //---- send initial message to all views ----
            this.postMessageToViews({ msgType: "test", param: "hi" });
        };

        viewMgrClass.prototype.postMessageToViews = function (msgObj) {
            this.postMessageToFrame("leftFrame", msgObj);
            this.postMessageToFrame("rightFrame", msgObj);
            this.postMessageToFrame("bottomFrame", msgObj);
        };

        viewMgrClass.prototype.postMessageToFrame = function (id, msgObj) {
            var iframe = jQuery("#" + id)[0];
            var contentWindow = iframe.contentWindow;

            if (contentWindow) {
                var msg = JSON.stringify(msgObj);
                var domain = this.getDomain();

                contentWindow.postMessage(msg, domain);
            }
        };

        viewMgrClass.prototype.layoutViews = function () {
            var w = window.innerWidth - 4;
            var h = window.innerHeight - 4;

            this.layoutFrame("leftFrame", 0, 0, w / 2, h / 2);
            this.layoutFrame("rightFrame", w / 2, 0, w / 2, h / 2);
            this.layoutFrame("bottomFrame", 0, h / 2, w, h / 2);
        };

        viewMgrClass.prototype.layoutFrame = function (id, left, top, width, height) {
            jQuery("#" + id).css("left", left).css("top", top).css("width", width).css("height", height);
        };
        return viewMgrClass;
    })(linkWaveApp.viewBaseClass);
    linkWaveApp.viewMgrClass = viewMgrClass;
})(linkWaveApp || (linkWaveApp = {}));
//# sourceMappingURL=viewMgr.js.map
