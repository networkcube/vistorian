module utils{

    export function getUrlVars() {
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

    /** Removes white space before and after a string */
    export function rtrim(s:string){
       return this.replace(/((\s*\S+)*)\s*/, "$1");
    }


}
