var utils;
(function (utils) {
    function getUrlVars() {
        var vars = {};
        var params = window.location.search.replace("?", "").split('&');
        var tmp, value;
        params.forEach(function (item) {
            tmp = item.split("=");
            value = decodeURIComponent(tmp[1]);
            vars[tmp[0]] = value;
        });
        return vars;
    }
    utils.getUrlVars = getUrlVars;
    function rtrim(s) {
        return this.replace(/((\s*\S+)*)\s*/, "$1");
    }
    utils.rtrim = rtrim;
})(utils || (utils = {}));
