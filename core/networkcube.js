!function (a, b) { "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) { if (!a.document)
    throw new Error("jQuery requires a window with a document"); return b(a); } : b(a); }("undefined" != typeof window ? window : this, function (a, b) {
    var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty, k = {}, l = "1.11.1", m = function (a, b) { return new m.fn.init(a, b); }, n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, o = /^-ms-/, p = /-([\da-z])/gi, q = function (a, b) { return b.toUpperCase(); };
    m.fn = m.prototype = { jquery: l, constructor: m, selector: "", length: 0, toArray: function () { return d.call(this); }, get: function (a) { return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this); }, pushStack: function (a) { var b = m.merge(this.constructor(), a); return b.prevObject = this, b.context = this.context, b; }, each: function (a, b) { return m.each(this, a, b); }, map: function (a) { return this.pushStack(m.map(this, function (b, c) { return a.call(b, c, b); })); }, slice: function () { return this.pushStack(d.apply(this, arguments)); }, first: function () { return this.eq(0); }, last: function () { return this.eq(-1); }, eq: function (a) { var b = this.length, c = +a + (0 > a ? b : 0); return this.pushStack(c >= 0 && b > c ? [this[c]] : []); }, end: function () { return this.prevObject || this.constructor(null); }, push: f, sort: c.sort, splice: c.splice }, m.extend = m.fn.extend = function () { var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1; for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
        if (null != (e = arguments[h]))
            for (d in e)
                a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c)); return g; }, m.extend({ expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) { throw new Error(a); }, noop: function () { }, isFunction: function (a) { return "function" === m.type(a); }, isArray: Array.isArray || function (a) { return "array" === m.type(a); }, isWindow: function (a) { return null != a && a == a.window; }, isNumeric: function (a) { return !m.isArray(a) && a - parseFloat(a) >= 0; }, isEmptyObject: function (a) { var b; for (b in a)
            return !1; return !0; }, isPlainObject: function (a) { var b; if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a))
            return !1; try {
            if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf"))
                return !1;
        }
        catch (c) {
            return !1;
        } if (k.ownLast)
            for (b in a)
                return j.call(a, b); for (b in a)
            ; return void 0 === b || j.call(a, b); }, type: function (a) { return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a; }, globalEval: function (b) { b && m.trim(b) && (a.execScript || function (b) { a.eval.call(a, b); })(b); }, camelCase: function (a) { return a.replace(o, "ms-").replace(p, q); }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase(); }, each: function (a, b, c) { var d, e = 0, f = a.length, g = r(a); if (c) {
            if (g) {
                for (; f > e; e++)
                    if (d = b.apply(a[e], c), d === !1)
                        break;
            }
            else
                for (e in a)
                    if (d = b.apply(a[e], c), d === !1)
                        break;
        }
        else if (g) {
            for (; f > e; e++)
                if (d = b.call(a[e], e, a[e]), d === !1)
                    break;
        }
        else
            for (e in a)
                if (d = b.call(a[e], e, a[e]), d === !1)
                    break; return a; }, trim: function (a) { return null == a ? "" : (a + "").replace(n, ""); }, makeArray: function (a, b) { var c = b || []; return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c; }, inArray: function (a, b, c) { var d; if (b) {
            if (g)
                return g.call(b, a, c);
            for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                if (c in b && b[c] === a)
                    return c;
        } return -1; }, merge: function (a, b) { var c = +b.length, d = 0, e = a.length; while (c > d)
            a[e++] = b[d++]; if (c !== c)
            while (void 0 !== b[d])
                a[e++] = b[d++]; return a.length = e, a; }, grep: function (a, b, c) { for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
            d = !b(a[f], f), d !== h && e.push(a[f]); return e; }, map: function (a, b, c) { var d, f = 0, g = a.length, h = r(a), i = []; if (h)
            for (; g > f; f++)
                d = b(a[f], f, c), null != d && i.push(d);
        else
            for (f in a)
                d = b(a[f], f, c), null != d && i.push(d); return e.apply([], i); }, guid: 1, proxy: function (a, b) { var c, e, f; return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function () { return a.apply(b || this, c.concat(d.call(arguments))); }, e.guid = a.guid = a.guid || m.guid++, e) : void 0; }, now: function () { return +new Date; }, support: k }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) { h["[object " + b + "]"] = b.toLowerCase(); });
    function r(a) { var b = a.length, c = m.type(a); return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a; }
    var s = function (a) { var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + -new Date, v = a.document, w = 0, x = 0, y = gb(), z = gb(), A = gb(), B = function (a, b) { return a === b && (l = !0), 0; }, C = "undefined", D = 1 << 31, E = {}.hasOwnProperty, F = [], G = F.pop, H = F.push, I = F.push, J = F.slice, K = F.indexOf || function (a) { for (var b = 0, c = this.length; c > b; b++)
        if (this[b] === a)
            return b; return -1; }, L = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", N = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = N.replace("w", "w#"), P = "\\[" + M + "*(" + N + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + "))|)" + M + "*\\]", Q = ":(" + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)", R = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"), S = new RegExp("^" + M + "*," + M + "*"), T = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"), V = new RegExp(Q), W = new RegExp("^" + O + "$"), X = { ID: new RegExp("^#(" + N + ")"), CLASS: new RegExp("^\\.(" + N + ")"), TAG: new RegExp("^(" + N.replace("w", "w*") + ")"), ATTR: new RegExp("^" + P), PSEUDO: new RegExp("^" + Q), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + L + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") }, Y = /^(?:input|select|textarea|button)$/i, Z = /^h\d$/i, $ = /^[^{]+\{\s*\[native \w/, _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ab = /[+~]/, bb = /'|\\/g, cb = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"), db = function (a, b, c) { var d = "0x" + b - 65536; return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320); }; try {
        I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType;
    }
    catch (eb) {
        I = { apply: F.length ? function (a, b) { H.apply(a, J.call(b)); } : function (a, b) { var c = a.length, d = 0; while (a[c++] = b[d++])
                ; a.length = c - 1; } };
    } function fb(a, b, d, e) { var f, h, j, k, l, o, r, s, w, x; if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || "string" != typeof a)
        return d; if (1 !== (k = b.nodeType) && 9 !== k)
        return []; if (p && !e) {
        if (f = _.exec(a))
            if (j = f[1]) {
                if (9 === k) {
                    if (h = b.getElementById(j), !h || !h.parentNode)
                        return d;
                    if (h.id === j)
                        return d.push(h), d;
                }
                else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j)
                    return d.push(h), d;
            }
            else {
                if (f[2])
                    return I.apply(d, b.getElementsByTagName(a)), d;
                if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName)
                    return I.apply(d, b.getElementsByClassName(j)), d;
            }
        if (c.qsa && (!q || !q.test(a))) {
            if (s = r = u, w = b, x = 9 === k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                o = g(a), (r = b.getAttribute("id")) ? s = r.replace(bb, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                while (l--)
                    o[l] = s + qb(o[l]);
                w = ab.test(a) && ob(b.parentNode) || b, x = o.join(",");
            }
            if (x)
                try {
                    return I.apply(d, w.querySelectorAll(x)), d;
                }
                catch (y) { }
                finally {
                    r || b.removeAttribute("id");
                }
        }
    } return i(a.replace(R, "$1"), b, d, e); } function gb() { var a = []; function b(c, e) { return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e; } return b; } function hb(a) { return a[u] = !0, a; } function ib(a) { var b = n.createElement("div"); try {
        return !!a(b);
    }
    catch (c) {
        return !1;
    }
    finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
    } } function jb(a, b) { var c = a.split("|"), e = a.length; while (e--)
        d.attrHandle[c[e]] = b; } function kb(a, b) { var c = b && a, d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || D) - (~a.sourceIndex || D); if (d)
        return d; if (c)
        while (c = c.nextSibling)
            if (c === b)
                return -1; return a ? 1 : -1; } function lb(a) { return function (b) { var c = b.nodeName.toLowerCase(); return "input" === c && b.type === a; }; } function mb(a) { return function (b) { var c = b.nodeName.toLowerCase(); return ("input" === c || "button" === c) && b.type === a; }; } function nb(a) { return hb(function (b) { return b = +b, hb(function (c, d) { var e, f = a([], c.length, b), g = f.length; while (g--)
        c[e = f[g]] && (c[e] = !(d[e] = c[e])); }); }); } function ob(a) { return a && typeof a.getElementsByTagName !== C && a; } c = fb.support = {}, f = fb.isXML = function (a) { var b = a && (a.ownerDocument || a).documentElement; return b ? "HTML" !== b.nodeName : !1; }, m = fb.setDocument = function (a) { var b, e = a ? a.ownerDocument || a : v, g = e.defaultView; return e !== n && 9 === e.nodeType && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener("unload", function () { m(); }, !1) : g.attachEvent && g.attachEvent("onunload", function () { m(); })), c.attributes = ib(function (a) { return a.className = "i", !a.getAttribute("className"); }), c.getElementsByTagName = ib(function (a) { return a.appendChild(e.createComment("")), !a.getElementsByTagName("*").length; }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function (a) { return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length; }), c.getById = ib(function (a) { return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length; }), c.getById ? (d.find.ID = function (a, b) { if (typeof b.getElementById !== C && p) {
        var c = b.getElementById(a);
        return c && c.parentNode ? [c] : [];
    } }, d.filter.ID = function (a) { var b = a.replace(cb, db); return function (a) { return a.getAttribute("id") === b; }; }) : (delete d.find.ID, d.filter.ID = function (a) { var b = a.replace(cb, db); return function (a) { var c = typeof a.getAttributeNode !== C && a.getAttributeNode("id"); return c && c.value === b; }; }), d.find.TAG = c.getElementsByTagName ? function (a, b) { return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0; } : function (a, b) { var c, d = [], e = 0, f = b.getElementsByTagName(a); if ("*" === a) {
        while (c = f[e++])
            1 === c.nodeType && d.push(c);
        return d;
    } return f; }, d.find.CLASS = c.getElementsByClassName && function (a, b) { return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0; }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function (a) { a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push("[*^$]=" + M + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + M + "*(?:value|" + L + ")"), a.querySelectorAll(":checked").length || q.push(":checked"); }), ib(function (a) { var b = e.createElement("input"); b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + M + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:"); })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function (a) { c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", Q); }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function (a, b) { var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode; return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d))); } : function (a, b) { if (b)
        while (b = b.parentNode)
            if (b === a)
                return !0; return !1; }, B = b ? function (a, b) { if (a === b)
        return l = !0, 0; var d = !a.compareDocumentPosition - !b.compareDocumentPosition; return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1); } : function (a, b) { if (a === b)
        return l = !0, 0; var c, d = 0, f = a.parentNode, g = b.parentNode, h = [a], i = [b]; if (!f || !g)
        return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0; if (f === g)
        return kb(a, b); c = a; while (c = c.parentNode)
        h.unshift(c); c = b; while (c = c.parentNode)
        i.unshift(c); while (h[d] === i[d])
        d++; return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0; }, e) : n; }, fb.matches = function (a, b) { return fb(a, null, null, b); }, fb.matchesSelector = function (a, b) { if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b)))
        try {
            var d = s.call(a, b);
            if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                return d;
        }
        catch (e) { } return fb(b, n, null, [a]).length > 0; }, fb.contains = function (a, b) { return (a.ownerDocument || a) !== n && m(a), t(a, b); }, fb.attr = function (a, b) { (a.ownerDocument || a) !== n && m(a); var e = d.attrHandle[b.toLowerCase()], f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0; return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null; }, fb.error = function (a) { throw new Error("Syntax error, unrecognized expression: " + a); }, fb.uniqueSort = function (a) { var b, d = [], e = 0, f = 0; if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++])
            b === a[f] && (e = d.push(f));
        while (e--)
            a.splice(d[e], 1);
    } return k = null, a; }, e = fb.getText = function (a) { var b, c = "", d = 0, f = a.nodeType; if (f) {
        if (1 === f || 9 === f || 11 === f) {
            if ("string" == typeof a.textContent)
                return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling)
                c += e(a);
        }
        else if (3 === f || 4 === f)
            return a.nodeValue;
    }
    else
        while (b = a[d++])
            c += e(b); return c; }, d = fb.selectors = { cacheLength: 50, createPseudo: hb, match: X, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (a) { return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || "").replace(cb, db), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4); }, CHILD: function (a) { return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fb.error(a[0]), a; }, PSEUDO: function (a) { var b, c = !a[6] && a[2]; return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3)); } }, filter: { TAG: function (a) { var b = a.replace(cb, db).toLowerCase(); return "*" === a ? function () { return !0; } : function (a) { return a.nodeName && a.nodeName.toLowerCase() === b; }; }, CLASS: function (a) { var b = y[a + " "]; return b || (b = new RegExp("(^|" + M + ")" + a + "(" + M + "|$)")) && y(a, function (a) { return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== C && a.getAttribute("class") || ""); }); }, ATTR: function (a, b, c) { return function (d) { var e = fb.attr(d, a); return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0; }; }, CHILD: function (a, b, c, d, e) { var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b; return 1 === d && 0 === e ? function (a) { return !!a.parentNode; } : function (b, c, i) { var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h; if (q) {
                if (f) {
                    while (p) {
                        l = b;
                        while (l = l[p])
                            if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                return !1;
                        o = p = "only" === a && !o && "nextSibling";
                    }
                    return !0;
                }
                if (o = [g ? q.firstChild : q.lastChild], g && s) {
                    k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                    while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                        if (1 === l.nodeType && ++m && l === b) {
                            k[a] = [w, n, m];
                            break;
                        }
                }
                else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)
                    m = j[1];
                else
                    while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                        if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b))
                            break;
                return m -= e, m === d || m % d === 0 && m / d >= 0;
            } }; }, PSEUDO: function (a, b) { var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error("unsupported pseudo: " + a); return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function (a, c) { var d, f = e(a, b), g = f.length; while (g--)
                d = K.call(a, f[g]), a[d] = !(c[d] = f[g]); }) : function (a) { return e(a, 0, c); }) : e; } }, pseudos: { not: hb(function (a) { var b = [], c = [], d = h(a.replace(R, "$1")); return d[u] ? hb(function (a, b, c, e) { var f, g = d(a, null, e, []), h = a.length; while (h--)
                (f = g[h]) && (a[h] = !(b[h] = f)); }) : function (a, e, f) { return b[0] = a, d(b, null, f, c), !c.pop(); }; }), has: hb(function (a) { return function (b) { return fb(a, b).length > 0; }; }), contains: hb(function (a) { return function (b) { return (b.textContent || b.innerText || e(b)).indexOf(a) > -1; }; }), lang: hb(function (a) { return W.test(a || "") || fb.error("unsupported lang: " + a), a = a.replace(cb, db).toLowerCase(), function (b) { var c; do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                    return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            while ((b = b.parentNode) && 1 === b.nodeType); return !1; }; }), target: function (b) { var c = a.location && a.location.hash; return c && c.slice(1) === b.id; }, root: function (a) { return a === o; }, focus: function (a) { return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex); }, enabled: function (a) { return a.disabled === !1; }, disabled: function (a) { return a.disabled === !0; }, checked: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && !!a.checked || "option" === b && !!a.selected; }, selected: function (a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0; }, empty: function (a) { for (a = a.firstChild; a; a = a.nextSibling)
                if (a.nodeType < 6)
                    return !1; return !0; }, parent: function (a) { return !d.pseudos.empty(a); }, header: function (a) { return Z.test(a.nodeName); }, input: function (a) { return Y.test(a.nodeName); }, button: function (a) { var b = a.nodeName.toLowerCase(); return "input" === b && "button" === a.type || "button" === b; }, text: function (a) { var b; return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase()); }, first: nb(function () { return [0]; }), last: nb(function (a, b) { return [b - 1]; }), eq: nb(function (a, b, c) { return [0 > c ? c + b : c]; }), even: nb(function (a, b) { for (var c = 0; b > c; c += 2)
                a.push(c); return a; }), odd: nb(function (a, b) { for (var c = 1; b > c; c += 2)
                a.push(c); return a; }), lt: nb(function (a, b, c) { for (var d = 0 > c ? c + b : c; --d >= 0;)
                a.push(d); return a; }), gt: nb(function (a, b, c) { for (var d = 0 > c ? c + b : c; ++d < b;)
                a.push(d); return a; }) } }, d.pseudos.nth = d.pseudos.eq; for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        d.pseudos[b] = lb(b); for (b in { submit: !0, reset: !0 })
        d.pseudos[b] = mb(b); function pb() { } pb.prototype = d.filters = d.pseudos, d.setFilters = new pb, g = fb.tokenize = function (a, b) { var c, e, f, g, h, i, j, k = z[a + " "]; if (k)
        return b ? 0 : k.slice(0); h = a, i = [], j = d.preFilter; while (h) {
        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, " ") }), h = h.slice(c.length));
        for (g in d.filter)
            !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
        if (!c)
            break;
    } return b ? h.length : h ? fb.error(a) : z(a, i).slice(0); }; function qb(a) { for (var b = 0, c = a.length, d = ""; c > b; b++)
        d += a[b].value; return d; } function rb(a, b, c) { var d = b.dir, e = c && "parentNode" === d, f = x++; return b.first ? function (b, c, f) { while (b = b[d])
        if (1 === b.nodeType || e)
            return a(b, c, f); } : function (b, c, g) { var h, i, j = [w, f]; if (g) {
        while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g))
                return !0;
    }
    else
        while (b = b[d])
            if (1 === b.nodeType || e) {
                if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f)
                    return j[2] = h[2];
                if (i[d] = j, j[2] = a(b, c, g))
                    return !0;
            } }; } function sb(a) { return a.length > 1 ? function (b, c, d) { var e = a.length; while (e--)
        if (!a[e](b, c, d))
            return !1; return !0; } : a[0]; } function tb(a, b, c) { for (var d = 0, e = b.length; e > d; d++)
        fb(a, b[d], c); return c; } function ub(a, b, c, d, e) { for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
        (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h)); return g; } function vb(a, b, c, d, e, f) { return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function (f, g, h, i) { var j, k, l, m = [], n = [], o = g.length, p = f || tb(b || "*", h.nodeType ? [h] : h, []), q = !a || !f && b ? p : ub(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q; if (c && c(q, r, h, i), d) {
        j = ub(r, n), d(j, [], h, i), k = j.length;
        while (k--)
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
    } if (f) {
        if (e || a) {
            if (e) {
                j = [], k = r.length;
                while (k--)
                    (l = r[k]) && j.push(q[k] = l);
                e(null, r = [], j, i);
            }
            k = r.length;
            while (k--)
                (l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
        }
    }
    else
        r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r); }); } function wb(a) { for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = rb(function (a) { return a === b; }, h, !0), l = rb(function (a) { return K.call(b, a) > -1; }, h, !0), m = [function (a, c, d) { return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d)); }]; f > i; i++)
        if (c = d.relative[a[i].type])
            m = [rb(sb(m), c)];
        else {
            if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                for (e = ++i; f > e; e++)
                    if (d.relative[a[e].type])
                        break;
                return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(R, "$1"), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a));
            }
            m.push(c);
        } return sb(m); } function xb(a, b) { var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) { var l, m, o, p = 0, q = "0", r = f && [], s = [], t = j, u = f || e && d.find.TAG("*", k), v = w += null == t ? 1 : Math.random() || .1, x = u.length; for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
        if (e && l) {
            m = 0;
            while (o = a[m++])
                if (o(l, g, h)) {
                    i.push(l);
                    break;
                }
            k && (w = v);
        }
        c && ((l = !o && l) && p--, f && r.push(l));
    } if (p += q, c && q !== p) {
        m = 0;
        while (o = b[m++])
            o(r, s, g, h);
        if (f) {
            if (p > 0)
                while (q--)
                    r[q] || s[q] || (s[q] = G.call(i));
            s = ub(s);
        }
        I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i);
    } return k && (w = v, j = t), r; }; return c ? hb(f) : f; } return h = fb.compile = function (a, b) { var c, d = [], e = [], f = A[a + " "]; if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--)
            f = wb(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, xb(e, d)), f.selector = a;
    } return f; }, i = fb.select = function (a, b, e, f) { var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a); if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
            if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b)
                return e;
            n && (b = b.parentNode), a = a.slice(j.shift().value.length);
        }
        i = X.needsContext.test(a) ? 0 : j.length;
        while (i--) {
            if (k = j[i], d.relative[l = k.type])
                break;
            if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) {
                if (j.splice(i, 1), a = f.length && qb(j), !a)
                    return I.apply(e, f), e;
                break;
            }
        }
    } return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e; }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function (a) { return 1 & a.compareDocumentPosition(n.createElement("div")); }), ib(function (a) { return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href"); }) || jb("type|href|height|width", function (a, b, c) { return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2); }), c.attributes && ib(function (a) { return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value"); }) || jb("value", function (a, b, c) { return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue; }), ib(function (a) { return null == a.getAttribute("disabled"); }) || jb(L, function (a, b, c) { var d; return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null; }), fb; }(a);
    m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
    var t = m.expr.match.needsContext, u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, v = /^.[^:#\[\.,]*$/;
    function w(a, b, c) { if (m.isFunction(b))
        return m.grep(a, function (a, d) { return !!b.call(a, d, a) !== c; }); if (b.nodeType)
        return m.grep(a, function (a) { return a === b !== c; }); if ("string" == typeof b) {
        if (v.test(b))
            return m.filter(b, a, c);
        b = m.filter(b, a);
    } return m.grep(a, function (a) { return m.inArray(a, b) >= 0 !== c; }); }
    m.filter = function (a, b, c) { var d = b[0]; return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function (a) { return 1 === a.nodeType; })); }, m.fn.extend({ find: function (a) { var b, c = [], d = this, e = d.length; if ("string" != typeof a)
            return this.pushStack(m(a).filter(function () { for (b = 0; e > b; b++)
                if (m.contains(d[b], this))
                    return !0; })); for (b = 0; e > b; b++)
            m.find(a, d[b], c); return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c; }, filter: function (a) { return this.pushStack(w(this, a || [], !1)); }, not: function (a) { return this.pushStack(w(this, a || [], !0)); }, is: function (a) { return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length; } });
    var x, y = a.document, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, A = m.fn.init = function (a, b) { var c, d; if (!a)
        return this; if ("string" == typeof a) {
        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b)
            return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
        if (c[1]) {
            if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
                for (c in b)
                    m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
            return this;
        }
        if (d = y.getElementById(c[2]), d && d.parentNode) {
            if (d.id !== c[2])
                return x.find(a);
            this.length = 1, this[0] = d;
        }
        return this.context = y, this.selector = a, this;
    } return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this)); };
    A.prototype = m.fn, x = m(y);
    var B = /^(?:parents|prev(?:Until|All))/, C = { children: !0, contents: !0, next: !0, prev: !0 };
    m.extend({ dir: function (a, b, c) { var d = [], e = a[b]; while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c)))
            1 === e.nodeType && d.push(e), e = e[b]; return d; }, sibling: function (a, b) { for (var c = []; a; a = a.nextSibling)
            1 === a.nodeType && a !== b && c.push(a); return c; } }), m.fn.extend({ has: function (a) { var b, c = m(a, this), d = c.length; return this.filter(function () { for (b = 0; d > b; b++)
            if (m.contains(this, c[b]))
                return !0; }); }, closest: function (a, b) { for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
            for (c = this[d]; c && c !== b; c = c.parentNode)
                if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
                    f.push(c);
                    break;
                } return this.pushStack(f.length > 1 ? m.unique(f) : f); }, index: function (a) { return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1; }, add: function (a, b) { return this.pushStack(m.unique(m.merge(this.get(), m(a, b)))); }, addBack: function (a) { return this.add(null == a ? this.prevObject : this.prevObject.filter(a)); } });
    function D(a, b) { do
        a = a[b];
    while (a && 1 !== a.nodeType); return a; }
    m.each({ parent: function (a) { var b = a.parentNode; return b && 11 !== b.nodeType ? b : null; }, parents: function (a) { return m.dir(a, "parentNode"); }, parentsUntil: function (a, b, c) { return m.dir(a, "parentNode", c); }, next: function (a) { return D(a, "nextSibling"); }, prev: function (a) { return D(a, "previousSibling"); }, nextAll: function (a) { return m.dir(a, "nextSibling"); }, prevAll: function (a) { return m.dir(a, "previousSibling"); }, nextUntil: function (a, b, c) { return m.dir(a, "nextSibling", c); }, prevUntil: function (a, b, c) { return m.dir(a, "previousSibling", c); }, siblings: function (a) { return m.sibling((a.parentNode || {}).firstChild, a); }, children: function (a) { return m.sibling(a.firstChild); }, contents: function (a) { return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes); } }, function (a, b) { m.fn[a] = function (c, d) { var e = m.map(this, b, c); return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e); }; });
    var E = /\S+/g, F = {};
    function G(a) { var b = F[a] = {}; return m.each(a.match(E) || [], function (a, c) { b[c] = !0; }), b; }
    m.Callbacks = function (a) { a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a); var b, c, d, e, f, g, h = [], i = !a.once && [], j = function (l) { for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
        if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break;
        } b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable()); }, k = { add: function () { if (h) {
            var d = h.length;
            !function f(b) { m.each(b, function (b, c) { var d = m.type(c); "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c); }); }(arguments), b ? e = h.length : c && (g = d, j(c));
        } return this; }, remove: function () { return h && m.each(arguments, function (a, c) { var d; while ((d = m.inArray(c, h, d)) > -1)
            h.splice(d, 1), b && (e >= d && e--, f >= d && f--); }), this; }, has: function (a) { return a ? m.inArray(a, h) > -1 : !(!h || !h.length); }, empty: function () { return h = [], e = 0, this; }, disable: function () { return h = i = c = void 0, this; }, disabled: function () { return !h; }, lock: function () { return i = void 0, c || k.disable(), this; }, locked: function () { return !i; }, fireWith: function (a, c) { return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this; }, fire: function () { return k.fireWith(this, arguments), this; }, fired: function () { return !!d; } }; return k; }, m.extend({ Deferred: function (a) { var b = [["resolve", "done", m.Callbacks("once memory"), "resolved"], ["reject", "fail", m.Callbacks("once memory"), "rejected"], ["notify", "progress", m.Callbacks("memory")]], c = "pending", d = { state: function () { return c; }, always: function () { return e.done(arguments).fail(arguments), this; }, then: function () { var a = arguments; return m.Deferred(function (c) { m.each(b, function (b, f) { var g = m.isFunction(a[b]) && a[b]; e[f[1]](function () { var a = g && g.apply(this, arguments); a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments); }); }), a = null; }).promise(); }, promise: function (a) { return null != a ? m.extend(a, d) : d; } }, e = {}; return d.pipe = d.then, m.each(b, function (a, f) { var g = f[2], h = f[3]; d[f[1]] = g.add, h && g.add(function () { c = h; }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () { return e[f[0] + "With"](this === e ? d : this, arguments), this; }, e[f[0] + "With"] = g.fireWith; }), d.promise(e), a && a.call(e, e), e; }, when: function (a) { var b = 0, c = d.call(arguments), e = c.length, f = 1 !== e || a && m.isFunction(a.promise) ? e : 0, g = 1 === f ? a : m.Deferred(), h = function (a, b, c) { return function (e) { b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c); }; }, i, j, k; if (e > 1)
            for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++)
                c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f; return f || g.resolveWith(k, c), g.promise(); } });
    var H;
    m.fn.ready = function (a) { return m.ready.promise().done(a), this; }, m.extend({ isReady: !1, readyWait: 1, holdReady: function (a) { a ? m.readyWait++ : m.ready(!0); }, ready: function (a) { if (a === !0 ? !--m.readyWait : !m.isReady) {
            if (!y.body)
                return setTimeout(m.ready);
            m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")));
        } } });
    function I() { y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J)); }
    function J() { (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready()); }
    m.ready.promise = function (b) { if (!H)
        if (H = m.Deferred(), "complete" === y.readyState)
            setTimeout(m.ready);
        else if (y.addEventListener)
            y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
        else {
            y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
            var c = !1;
            try {
                c = null == a.frameElement && y.documentElement;
            }
            catch (d) { }
            c && c.doScroll && !function e() { if (!m.isReady) {
                try {
                    c.doScroll("left");
                }
                catch (a) {
                    return setTimeout(e, 50);
                }
                I(), m.ready();
            } }();
        } return H.promise(b); };
    var K = "undefined", L;
    for (L in m(k))
        break;
    k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function () { var a, b, c, d; c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d)); }), function () { var a = y.createElement("div"); if (null == k.deleteExpando) {
        k.deleteExpando = !0;
        try {
            delete a.test;
        }
        catch (b) {
            k.deleteExpando = !1;
        }
    } a = null; }(), m.acceptData = function (a) { var b = m.noData[(a.nodeName + " ").toLowerCase()], c = +a.nodeType || 1; return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b; };
    var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, N = /([A-Z])/g;
    function O(a, b, c) { if (void 0 === c && 1 === a.nodeType) {
        var d = "data-" + b.replace(N, "-$1").toLowerCase();
        if (c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c;
            }
            catch (e) { }
            m.data(a, b, c);
        }
        else
            c = void 0;
    } return c; }
    function P(a) { var b; for (b in a)
        if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b)
            return !1; return !0; }
    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando, i = a.nodeType, j = i ? m.cache : a, k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b)
                return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: m.noop }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f;
        }
    }
    function R(a, b, c) { if (m.acceptData(a)) {
        var d, e, f = a.nodeType, g = f ? m.cache : a, h = f ? a[m.expando] : m.expando;
        if (g[h]) {
            if (b && (d = c ? g[h] : g[h].data)) {
                m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                while (e--)
                    delete d[b[e]];
                if (c ? !P(d) : !m.isEmptyObject(d))
                    return;
            }
            (c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null);
        }
    } }
    m.extend({ cache: {}, noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" }, hasData: function (a) { return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a); }, data: function (a, b, c) { return Q(a, b, c); }, removeData: function (a, b) { return R(a, b); }, _data: function (a, b, c) { return Q(a, b, c, !0); }, _removeData: function (a, b) { return R(a, b, !0); } }), m.fn.extend({ data: function (a, b) { var c, d, e, f = this[0], g = f && f.attributes; if (void 0 === a) {
            if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
                c = g.length;
                while (c--)
                    g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
                m._data(f, "parsedAttrs", !0);
            }
            return e;
        } return "object" == typeof a ? this.each(function () { m.data(this, a); }) : arguments.length > 1 ? this.each(function () { m.data(this, a, b); }) : f ? O(f, a, m.data(f, a)) : void 0; }, removeData: function (a) { return this.each(function () { m.removeData(this, a); }); } }), m.extend({ queue: function (a, b, c) { var d; return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0; }, dequeue: function (a, b) { b = b || "fx"; var c = m.queue(a, b), d = c.length, e = c.shift(), f = m._queueHooks(a, b), g = function () { m.dequeue(a, b); }; "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire(); }, _queueHooks: function (a, b) { var c = b + "queueHooks"; return m._data(a, c) || m._data(a, c, { empty: m.Callbacks("once memory").add(function () { m._removeData(a, b + "queue"), m._removeData(a, c); }) }); } }), m.fn.extend({ queue: function (a, b) { var c = 2; return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function () { var c = m.queue(this, a, b); m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a); }); }, dequeue: function (a) { return this.each(function () { m.dequeue(this, a); }); }, clearQueue: function (a) { return this.queue(a || "fx", []); }, promise: function (a, b) { var c, d = 1, e = m.Deferred(), f = this, g = this.length, h = function () { --d || e.resolveWith(f, [f]); }; "string" != typeof a && (b = a, a = void 0), a = a || "fx"; while (g--)
            c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h)); return h(), e.promise(b); } });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = ["Top", "Right", "Bottom", "Left"], U = function (a, b) { return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a); }, V = m.access = function (a, b, c, d, e, f, g) { var h = 0, i = a.length, j = null == c; if ("object" === m.type(c)) {
        e = !0;
        for (h in c)
            m.access(a, b, h, c[h], !0, f, g);
    }
    else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) { return j.call(m(a), c); })), b))
        for (; i > h; h++)
            b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c))); return e ? a : j ? b.call(a) : i ? b(a[0], c) : f; }, W = /^(?:checkbox|radio)$/i;
    !function () { var a = y.createElement("input"), b = y.createElement("div"), c = y.createDocumentFragment(); if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function () { k.noCloneEvent = !1; }), b.cloneNode(!0).click()), null == k.deleteExpando) {
        k.deleteExpando = !0;
        try {
            delete b.test;
        }
        catch (d) {
            k.deleteExpando = !1;
        }
    } }(), function () { var b, c, d = y.createElement("div"); for (b in { submit: !0, change: !0, focusin: !0 })
        c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1); d = null; }();
    var X = /^(?:input|select|textarea)$/i, Y = /^key/, Z = /^(?:mouse|pointer|contextmenu)|click/, $ = /^(?:focusinfocus|focusoutblur)$/, _ = /^([^.]*)(?:\.(.+)|)$/;
    function ab() { return !0; }
    function bb() { return !1; }
    function cb() { try {
        return y.activeElement;
    }
    catch (a) { } }
    m.event = { global: {}, add: function (a, b, c, d, e) { var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a); if (r) {
            c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function (a) { return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments); }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
            while (h--)
                f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && m.expr.match.needsContext.test(e), namespace: p.join(".") }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
            a = null;
        } }, remove: function (a, b, c, d, e) { var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a); if (r && (k = r.events)) {
            b = (b || "").match(E) || [""], j = b.length;
            while (j--)
                if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                    l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
                    while (f--)
                        g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
                    i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o]);
                }
                else
                    for (o in k)
                        m.event.remove(a, o + b[j], c, d, !0);
            m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"));
        } }, trigger: function (b, c, d, e) { var f, g, h, i, k, l, n, o = [d || y], p = j.call(b, "type") ? b.type : b, q = j.call(b, "namespace") ? b.namespace.split(".") : []; if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
            if (!e && !k.noBubble && !m.isWindow(d)) {
                for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode)
                    o.push(h), l = h;
                l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a);
            }
            n = 0;
            while ((h = o[n++]) && !b.isPropagationStopped())
                b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
            if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                l = d[g], l && (d[g] = null), m.event.triggered = p;
                try {
                    d[p]();
                }
                catch (r) { }
                m.event.triggered = void 0, l && (d[g] = l);
            }
            return b.result;
        } }, dispatch: function (a) { a = m.event.fix(a); var b, c, e, f, g, h = [], i = d.call(arguments), j = (m._data(this, "events") || {})[a.type] || [], k = m.event.special[a.type] || {}; if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
            h = m.event.handlers.call(this, a, j), b = 0;
            while ((f = h[b++]) && !a.isPropagationStopped()) {
                a.currentTarget = f.elem, g = 0;
                while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())
                    (!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
            }
            return k.postDispatch && k.postDispatch.call(this, a), a.result;
        } }, handlers: function (a, b) { var c, d, e, f, g = [], h = b.delegateCount, i = a.target; if (h && i.nodeType && (!a.button || "click" !== a.type))
            for (; i != this; i = i.parentNode || this)
                if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                    for (e = [], f = 0; h > f; f++)
                        d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
                    e.length && g.push({ elem: i, handlers: e });
                } return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g; }, fix: function (a) { if (a[m.expando])
            return a; var b, c, d, e = a.type, f = a, g = this.fixHooks[e]; g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length; while (b--)
            c = d[b], a[c] = f[c]; return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a; }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (a, b) { return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a; } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, b) { var c, d, e, f = b.button, g = b.fromElement; return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a; } }, special: { load: { noBubble: !0 }, focus: { trigger: function () { if (this !== cb() && this.focus)
                    try {
                        return this.focus(), !1;
                    }
                    catch (a) { } }, delegateType: "focusin" }, blur: { trigger: function () { return this === cb() && this.blur ? (this.blur(), !1) : void 0; }, delegateType: "focusout" }, click: { trigger: function () { return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0; }, _default: function (a) { return m.nodeName(a.target, "a"); } }, beforeunload: { postDispatch: function (a) { void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result); } } }, simulate: function (a, b, c, d) { var e = m.extend(new m.Event, c, { type: a, isSimulated: !0, originalEvent: {} }); d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault(); } }, m.removeEvent = y.removeEventListener ? function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1); } : function (a, b, c) { var d = "on" + b; a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c)); }, m.Event = function (a, b) { return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void (this[m.expando] = !0)) : new m.Event(a, b); }, m.Event.prototype = { isDefaultPrevented: bb, isPropagationStopped: bb, isImmediatePropagationStopped: bb, preventDefault: function () { var a = this.originalEvent; this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1); }, stopPropagation: function () { var a = this.originalEvent; this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0); }, stopImmediatePropagation: function () { var a = this.originalEvent; this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation(); } }, m.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) { m.event.special[a] = { delegateType: b, bindType: b, handle: function (a) { var c, d = this, e = a.relatedTarget, f = a.handleObj; return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c; } }; }), k.submitBubbles || (m.event.special.submit = { setup: function () { return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function (a) { var b = a.target, c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0; c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function (a) { a._submit_bubble = !0; }), m._data(c, "submitBubbles", !0)); }); }, postDispatch: function (a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0)); }, teardown: function () { return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit"); } }), k.changeBubbles || (m.event.special.change = { setup: function () { return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function (a) { "checked" === a.originalEvent.propertyName && (this._just_changed = !0); }), m.event.add(this, "click._change", function (a) { this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0); })), !1) : void m.event.add(this, "beforeactivate._change", function (a) { var b = a.target; X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function (a) { !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0); }), m._data(b, "changeBubbles", !0)); }); }, handle: function (a) { var b = a.target; return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0; }, teardown: function () { return m.event.remove(this, "._change"), !X.test(this.nodeName); } }), k.focusinBubbles || m.each({ focus: "focusin", blur: "focusout" }, function (a, b) { var c = function (a) { m.event.simulate(b, a.target, m.event.fix(a), !0); }; m.event.special[b] = { setup: function () { var d = this.ownerDocument || this, e = m._data(d, b); e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1); }, teardown: function () { var d = this.ownerDocument || this, e = m._data(d, b) - 1; e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b)); } }; }), m.fn.extend({ on: function (a, b, c, d, e) { var f, g; if ("object" == typeof a) {
            "string" != typeof b && (c = c || b, b = void 0);
            for (f in a)
                this.on(f, b, c, a[f], e);
            return this;
        } if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)
            d = bb;
        else if (!d)
            return this; return 1 === e && (g = d, d = function (a) { return m().off(a), g.apply(this, arguments); }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function () { m.event.add(this, a, d, c, b); }); }, one: function (a, b, c, d) { return this.on(a, b, c, d, 1); }, off: function (a, b, c) { var d, e; if (a && a.preventDefault && a.handleObj)
            return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this; if ("object" == typeof a) {
            for (e in a)
                this.off(e, b, a[e]);
            return this;
        } return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = bb), this.each(function () { m.event.remove(this, a, c, b); }); }, trigger: function (a, b) { return this.each(function () { m.event.trigger(a, b, this); }); }, triggerHandler: function (a, b) { var c = this[0]; return c ? m.event.trigger(a, b, c, !0) : void 0; } });
    function db(a) { var b = eb.split("|"), c = a.createDocumentFragment(); if (c.createElement)
        while (b.length)
            c.createElement(b.pop()); return c; }
    var eb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", fb = / jQuery\d+="(?:null|\d+)"/g, gb = new RegExp("<(?:" + eb + ")[\\s/>]", "i"), hb = /^\s+/, ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, jb = /<([\w:]+)/, kb = /<tbody/i, lb = /<|&#?\w+;/, mb = /<(?:script|style|link)/i, nb = /checked\s*(?:[^=]|=\s*.checked.)/i, ob = /^$|\/(?:java|ecma)script/i, pb = /^true\/(.*)/, qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, rb = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, sb = db(y), tb = sb.appendChild(y.createElement("div"));
    rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td;
    function ub(a, b) { var c, d, e = 0, f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0; if (!f)
        for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
            !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b)); return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f; }
    function vb(a) { W.test(a.type) && (a.defaultChecked = a.checked); }
    function wb(a, b) { return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a; }
    function xb(a) { return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a; }
    function yb(a) { var b = pb.exec(a.type); return b ? a.type = b[1] : a.removeAttribute("type"), a; }
    function zb(a, b) { for (var c, d = 0; null != (c = a[d]); d++)
        m._data(c, "globalEval", !b || m._data(b[d], "globalEval")); }
    function Ab(a, b) { if (1 === b.nodeType && m.hasData(a)) {
        var c, d, e, f = m._data(a), g = m._data(b, f), h = f.events;
        if (h) {
            delete g.handle, g.events = {};
            for (c in h)
                for (d = 0, e = h[c].length; e > d; d++)
                    m.event.add(b, c, h[c][d]);
        }
        g.data && (g.data = m.extend({}, g.data));
    } }
    function Bb(a, b) { var c, d, e; if (1 === b.nodeType) {
        if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
            e = m._data(b);
            for (d in e.events)
                m.removeEvent(b, d, e.handle);
            b.removeAttribute(m.expando);
        }
        "script" === c && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
    } }
    m.extend({ clone: function (a, b, c) { var d, e, f, g, h, i = m.contains(a.ownerDocument, a); if (k.html5Clone || m.isXMLDoc(a) || !gb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
            for (d = ub(f), h = ub(a), g = 0; null != (e = h[g]); ++g)
                d[g] && Bb(e, d[g]); if (b)
            if (c)
                for (h = h || ub(a), d = d || ub(f), g = 0; null != (e = h[g]); g++)
                    Ab(e, d[g]);
            else
                Ab(a, f); return d = ub(f, "script"), d.length > 0 && zb(d, !i && ub(a, "script")), d = h = e = null, f; }, buildFragment: function (a, b, c, d) { for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++)
            if (f = a[q], f || 0 === f)
                if ("object" === m.type(f))
                    m.merge(p, f.nodeType ? [f] : f);
                else if (lb.test(f)) {
                    h = h || o.appendChild(b.createElement("div")), i = (jb.exec(f) || ["", ""])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, "<$1></$2>") + l[2], e = l[0];
                    while (e--)
                        h = h.lastChild;
                    if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) {
                        f = "table" !== i || kb.test(f) ? "<table>" !== l[1] || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
                        while (e--)
                            m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                    }
                    m.merge(p, h.childNodes), h.textContent = "";
                    while (h.firstChild)
                        h.removeChild(h.firstChild);
                    h = o.lastChild;
                }
                else
                    p.push(b.createTextNode(f)); h && o.removeChild(h), k.appendChecked || m.grep(ub(p, "input"), vb), q = 0; while (f = p[q++])
            if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), "script"), g && zb(h), c)) {
                e = 0;
                while (f = h[e++])
                    ob.test(f.type || "") && c.push(f);
            } return h = null, o; }, cleanData: function (a, b) { for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
            if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
                if (g.events)
                    for (e in g.events)
                        n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
                j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f));
            } } }), m.fn.extend({ text: function (a) { return V(this, function (a) { return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a)); }, null, a, arguments.length); }, append: function () { return this.domManip(arguments, function (a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = wb(this, a);
            b.appendChild(a);
        } }); }, prepend: function () { return this.domManip(arguments, function (a) { if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var b = wb(this, a);
            b.insertBefore(a, b.firstChild);
        } }); }, before: function () { return this.domManip(arguments, function (a) { this.parentNode && this.parentNode.insertBefore(a, this); }); }, after: function () { return this.domManip(arguments, function (a) { this.parentNode && this.parentNode.insertBefore(a, this.nextSibling); }); }, remove: function (a, b) { for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
            b || 1 !== c.nodeType || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, "script")), c.parentNode.removeChild(c)); return this; }, empty: function () { for (var a, b = 0; null != (a = this[b]); b++) {
            1 === a.nodeType && m.cleanData(ub(a, !1));
            while (a.firstChild)
                a.removeChild(a.firstChild);
            a.options && m.nodeName(a, "select") && (a.options.length = 0);
        } return this; }, clone: function (a, b) { return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () { return m.clone(this, a, b); }); }, html: function (a) { return V(this, function (a) { var b = this[0] || {}, c = 0, d = this.length; if (void 0 === a)
            return 1 === b.nodeType ? b.innerHTML.replace(fb, "") : void 0; if (!("string" != typeof a || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || ["", ""])[1].toLowerCase()])) {
            a = a.replace(ib, "<$1></$2>");
            try {
                for (; d > c; c++)
                    b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ub(b, !1)), b.innerHTML = a);
                b = 0;
            }
            catch (e) { }
        } b && this.empty().append(a); }, null, a, arguments.length); }, replaceWith: function () { var a = arguments[0]; return this.domManip(arguments, function (b) { a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this); }), a && (a.length || a.nodeType) ? this : this.remove(); }, detach: function (a) { return this.remove(a, !0); }, domManip: function (a, b) { a = e.apply([], a); var c, d, f, g, h, i, j = 0, l = this.length, n = this, o = l - 1, p = a[0], q = m.isFunction(p); if (q || l > 1 && "string" == typeof p && !k.checkClone && nb.test(p))
            return this.each(function (c) { var d = n.eq(c); q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b); }); if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
            for (g = m.map(ub(i, "script"), xb), f = g.length; l > j; j++)
                d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, "script"))), b.call(this[j], d, j);
            if (f)
                for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++)
                    d = g[j], ob.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qb, "")));
            i = c = null;
        } return this; } }), m.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { m.fn[a] = function (a) { for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++)
        c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get()); return this.pushStack(e); }; });
    var Cb, Db = {};
    function Eb(b, c) { var d, e = m(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display"); return e.detach(), f; }
    function Fb(a) { var b = y, c = Db[a]; return c || (c = Eb(a, b), "none" !== c && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c; }
    !function () { var a; k.shrinkWrapBlocks = function () { if (null != a)
        return a; a = !1; var b, c, d; return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0; }; }();
    var Gb = /^margin/, Hb = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"), Ib, Jb, Kb = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (Ib = function (a) { return a.ownerDocument.defaultView.getComputedStyle(a, null); }, Jb = function (a, b, c) { var d, e, f, g, h = a.style; return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""; }) : y.documentElement.currentStyle && (Ib = function (a) { return a.currentStyle; }, Jb = function (a, b, c) { var d, e, f, g, h = a.style; return c = c || Ib(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"; });
    function Lb(a, b) { return { get: function () { var c = a(); if (null != c)
            return c ? void delete this.get : (this.get = b).apply(this, arguments); } }; }
    !function () { var b, c, d, e, f, g, h; if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
        c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, { reliableHiddenOffsets: function () { return null == g && i(), g; }, boxSizingReliable: function () { return null == f && i(), f; }, pixelPosition: function () { return null == e && i(), e; }, reliableMarginRight: function () { return null == h && i(), h; } });
        function i() { var b, c, d, i; c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || { width: "4px" }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d)); }
    } }(), m.swap = function (a, b, c, d) { var e, f, g = {}; for (f in b)
        g[f] = a.style[f], a.style[f] = b[f]; e = c.apply(a, d || []); for (f in b)
        a.style[f] = g[f]; return e; };
    var Mb = /alpha\([^)]*\)/i, Nb = /opacity\s*=\s*([^)]*)/, Ob = /^(none|table(?!-c[ea]).+)/, Pb = new RegExp("^(" + S + ")(.*)$", "i"), Qb = new RegExp("^([+-])=(" + S + ")", "i"), Rb = { position: "absolute", visibility: "hidden", display: "block" }, Sb = { letterSpacing: "0", fontWeight: "400" }, Tb = ["Webkit", "O", "Moz", "ms"];
    function Ub(a, b) { if (b in a)
        return b; var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Tb.length; while (e--)
        if (b = Tb[e] + c, b in a)
            return b; return d; }
    function Vb(a, b) { for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
        d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fb(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display")))); for (g = 0; h > g; g++)
        d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none")); return a; }
    function Wb(a, b, c) { var d = Pb.exec(b); return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b; }
    function Xb(a, b, c, d, e) { for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
        "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e))); return g; }
    function Yb(a, b, c) { var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ib(a), g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f); if (0 >= e || null == e) {
        if (e = Jb(a, b, f), (0 > e || null == e) && (e = a.style[b]), Hb.test(e))
            return e;
        d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0;
    } return e + Xb(a, b, c || (g ? "border" : "content"), d, f) + "px"; }
    m.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) {
                    var c = Jb(a, "opacity");
                    return "" === c ? "1" : c;
                } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": k.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, b, c, d) { if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var e, f, g, h = m.camelCase(b), i = a.style;
            if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c)
                return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
            if (f = typeof c, "string" === f && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                try {
                    i[b] = c;
                }
                catch (j) { }
        } }, css: function (a, b, c, d) { var e, f, g, h = m.camelCase(b); return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), "normal" === f && b in Sb && (f = Sb[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f; } }), m.each(["height", "width"], function (a, b) { m.cssHooks[b] = { get: function (a, c, d) { return c ? Ob.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Rb, function () { return Yb(a, b, d); }) : Yb(a, b, d) : void 0; }, set: function (a, c, d) { var e = d && Ib(a); return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0); } }; }), k.opacity || (m.cssHooks.opacity = { get: function (a, b) { return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""; }, set: function (a, b) { var c = a.style, d = a.currentStyle, e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || ""; c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Mb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + " " + e); } }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function (a, b) { return b ? m.swap(a, { display: "inline-block" }, Jb, [a, "marginRight"]) : void 0; }), m.each({ margin: "", padding: "", border: "Width" }, function (a, b) { m.cssHooks[a + b] = { expand: function (c) { for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
            e[a + T[d] + b] = f[d] || f[d - 2] || f[0]; return e; } }, Gb.test(a) || (m.cssHooks[a + b].set = Wb); }), m.fn.extend({ css: function (a, b) { return V(this, function (a, b, c) { var d, e, f = {}, g = 0; if (m.isArray(b)) {
            for (d = Ib(a), e = b.length; e > g; g++)
                f[b[g]] = m.css(a, b[g], !1, d);
            return f;
        } return void 0 !== c ? m.style(a, b, c) : m.css(a, b); }, a, b, arguments.length > 1); }, show: function () { return Vb(this, !0); }, hide: function () { return Vb(this); }, toggle: function (a) { return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () { U(this) ? m(this).show() : m(this).hide(); }); } });
    function Zb(a, b, c, d, e) { return new Zb.prototype.init(a, b, c, d, e); }
    m.Tween = Zb, Zb.prototype = { constructor: Zb, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px");
        }, cur: function () { var a = Zb.propHooks[this.prop]; return a && a.get ? a.get(this) : Zb.propHooks._default.get(this); }, run: function (a) { var b, c = Zb.propHooks[this.prop]; return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this; } }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = { _default: { get: function (a) { var b; return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]; }, set: function (a) { m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now; } } }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = { set: function (a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now); } }, m.easing = { linear: function (a) { return a; }, swing: function (a) { return .5 - Math.cos(a * Math.PI) / 2; } }, m.fx = Zb.prototype.init, m.fx.step = {};
    var $b, _b, ac = /^(?:toggle|show|hide)$/, bc = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"), cc = /queueHooks$/, dc = [ic], ec = { "*": [function (a, b) { var c = this.createTween(a, b), d = c.cur(), e = bc.exec(b), f = e && e[3] || (m.cssNumber[a] ? "" : "px"), g = (m.cssNumber[a] || "px" !== f && +d) && bc.exec(m.css(c.elem, a)), h = 1, i = 20; if (g && g[3] !== f) {
                f = f || g[3], e = e || [], g = +d || 1;
                do
                    h = h || ".5", g /= h, m.style(c.elem, a, g + f);
                while (h !== (h = c.cur() / d) && 1 !== h && --i);
            } return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c; }] };
    function fc() { return setTimeout(function () { $b = void 0; }), $b = m.now(); }
    function gc(a, b) { var c, d = { height: a }, e = 0; for (b = b ? 1 : 0; 4 > e; e += 2 - b)
        c = T[e], d["margin" + c] = d["padding" + c] = a; return b && (d.opacity = d.width = a), d; }
    function hc(a, b, c) { for (var d, e = (ec[b] || []).concat(ec["*"]), f = 0, g = e.length; g > f; f++)
        if (d = e[f].call(c, b, a))
            return d; }
    function ic(a, b, c) { var d, e, f, g, h, i, j, l, n = this, o = {}, p = a.style, q = a.nodeType && U(a), r = m._data(a, "fxshow"); c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () { h.unqueued || i(); }), h.unqueued++, n.always(function () { n.always(function () { h.unqueued--, m.queue(a, "fx").length || h.empty.fire(); }); })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fb(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fb(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function () { p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]; })); for (d in b)
        if (e = b[d], ac.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                if ("show" !== e || !r || void 0 === r[d])
                    continue;
                q = !0;
            }
            o[d] = r && r[d] || m.style(a, d);
        }
        else
            j = void 0; if (m.isEmptyObject(o))
        "inline" === ("none" === j ? Fb(a.nodeName) : j) && (p.display = j);
    else {
        r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function () { m(a).hide(); }), n.done(function () { var b; m._removeData(a, "fxshow"); for (b in o)
            m.style(a, b, o[b]); });
        for (d in o)
            g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0));
    } }
    function jc(a, b) { var c, d, e, f, g; for (c in a)
        if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f)
                c in a || (a[c] = f[c], b[c] = e);
        }
        else
            b[d] = e; }
    function kc(a, b, c) { var d, e, f = 0, g = dc.length, h = m.Deferred().always(function () { delete i.elem; }), i = function () { if (e)
        return !1; for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
        j.tweens[g].run(f); return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1); }, j = h.promise({ elem: a, props: m.extend({}, b), opts: m.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: $b || fc(), duration: c.duration, tweens: [], createTween: function (b, c) { var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(d), d; }, stop: function (b) { var c = 0, d = b ? j.tweens.length : 0; if (e)
            return this; for (e = !0; d > c; c++)
            j.tweens[c].run(1); return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this; } }), k = j.props; for (jc(k, j.opts.specialEasing); g > f; f++)
        if (d = dc[f].call(j, a, k, j.opts))
            return d; return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always); }
    m.Animation = m.extend(kc, { tweener: function (a, b) { m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" "); for (var c, d = 0, e = a.length; e > d; d++)
            c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b); }, prefilter: function (a, b) { b ? dc.unshift(a) : dc.push(a); } }), m.speed = function (a, b, c) { var d = a && "object" == typeof a ? m.extend({}, a) : { complete: c || !c && b || m.isFunction(a) && a, duration: a, easing: c && b || b && !m.isFunction(b) && b }; return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () { m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue); }, d; }, m.fn.extend({ fadeTo: function (a, b, c, d) { return this.filter(U).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d); }, animate: function (a, b, c, d) { var e = m.isEmptyObject(a), f = m.speed(b, c, d), g = function () { var b = kc(this, m.extend({}, a), f); (e || m._data(this, "finish")) && b.stop(!0); }; return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g); }, stop: function (a, b, c) { var d = function (a) { var b = a.stop; delete a.stop, b(c); }; return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () { var b = !0, e = null != a && a + "queueHooks", f = m.timers, g = m._data(this); if (e)
            g[e] && g[e].stop && d(g[e]);
        else
            for (e in g)
                g[e] && g[e].stop && cc.test(e) && d(g[e]); for (e = f.length; e--;)
            f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1)); (b || !c) && m.dequeue(this, a); }); }, finish: function (a) { return a !== !1 && (a = a || "fx"), this.each(function () { var b, c = m._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = m.timers, g = d ? d.length : 0; for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)
            f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1)); for (b = 0; g > b; b++)
            d[b] && d[b].finish && d[b].finish.call(this); delete c.finish; }); } }), m.each(["toggle", "show", "hide"], function (a, b) { var c = m.fn[b]; m.fn[b] = function (a, d, e) { return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e); }; }), m.each({ slideDown: gc("show"), slideUp: gc("hide"), slideToggle: gc("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) { m.fn[a] = function (a, c, d) { return this.animate(b, a, c, d); }; }), m.timers = [], m.fx.tick = function () { var a, b = m.timers, c = 0; for ($b = m.now(); c < b.length; c++)
        a = b[c], a() || b[c] !== a || b.splice(c--, 1); b.length || m.fx.stop(), $b = void 0; }, m.fx.timer = function (a) { m.timers.push(a), a() ? m.fx.start() : m.timers.pop(); }, m.fx.interval = 13, m.fx.start = function () { _b || (_b = setInterval(m.fx.tick, m.fx.interval)); }, m.fx.stop = function () { clearInterval(_b), _b = null; }, m.fx.speeds = { slow: 600, fast: 200, _default: 400 }, m.fn.delay = function (a, b) { return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) { var d = setTimeout(b, a); c.stop = function () { clearTimeout(d); }; }); }, function () { var a, b, c, d, e; b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value; }();
    var lc = /\r/g;
    m.fn.extend({ val: function (a) { var b, c, d, e = this[0]; {
            if (arguments.length)
                return d = m.isFunction(a), this.each(function (c) { var e; 1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function (a) { return null == a ? "" : a + ""; })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e)); });
            if (e)
                return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lc, "") : null == c ? "" : c);
        } } }), m.extend({ valHooks: { option: { get: function (a) { var b = m.find.attr(a, "value"); return null != b ? b : m.trim(m.text(a)); } }, select: { get: function (a) { for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                    if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
                        if (b = m(c).val(), f)
                            return b;
                        g.push(b);
                    } return g; }, set: function (a, b) { var c, d, e = a.options, f = m.makeArray(b), g = e.length; while (g--)
                    if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0)
                        try {
                            d.selected = c = !0;
                        }
                        catch (h) {
                            d.scrollHeight;
                        }
                    else
                        d.selected = !1; return c || (a.selectedIndex = -1), e; } } } }), m.each(["radio", "checkbox"], function () { m.valHooks[this] = { set: function (a, b) { return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0; } }, k.checkOn || (m.valHooks[this].get = function (a) { return null === a.getAttribute("value") ? "on" : a.value; }); });
    var mc, nc, oc = m.expr.attrHandle, pc = /^(?:checked|selected)$/i, qc = k.getSetAttribute, rc = k.input;
    m.fn.extend({ attr: function (a, b) { return V(this, m.attr, a, b, arguments.length > 1); }, removeAttr: function (a) { return this.each(function () { m.removeAttr(this, a); }); } }), m.extend({ attr: function (a, b, c) { var d, e, f = a.nodeType; if (a && 3 !== f && 8 !== f && 2 !== f)
            return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b)); }, removeAttr: function (a, b) { var c, d, e = 0, f = b && b.match(E); if (f && 1 === a.nodeType)
            while (c = f[e++])
                d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qc ? c : d); }, attrHooks: { type: { set: function (a, b) { if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
                    var c = a.value;
                    return a.setAttribute("type", b), c && (a.value = c), b;
                } } } } }), nc = { set: function (a, b, c) { return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c; } }, m.each(m.expr.match.bool.source.match(/\w+/g), function (a, b) { var c = oc[b] || m.find.attr; oc[b] = rc && qc || !pc.test(b) ? function (a, b, d) { var e, f; return d || (f = oc[b], oc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, oc[b] = f), e; } : function (a, b, c) { return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null; }; }), rc && qc || (m.attrHooks.value = { set: function (a, b, c) { return m.nodeName(a, "input") ? void (a.defaultValue = b) : mc && mc.set(a, b, c); } }), qc || (mc = { set: function (a, b, c) { var d = a.getAttributeNode(c); return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0; } }, oc.id = oc.name = oc.coords = function (a, b, c) { var d; return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null; }, m.valHooks.button = { get: function (a, b) { var c = a.getAttributeNode(b); return c && c.specified ? c.value : void 0; }, set: mc.set }, m.attrHooks.contenteditable = { set: function (a, b, c) { mc.set(a, "" === b ? !1 : b, c); } }, m.each(["width", "height"], function (a, b) { m.attrHooks[b] = { set: function (a, c) { return "" === c ? (a.setAttribute(b, "auto"), c) : void 0; } }; })), k.style || (m.attrHooks.style = { get: function (a) { return a.style.cssText || void 0; }, set: function (a, b) { return a.style.cssText = b + ""; } });
    var sc = /^(?:input|select|textarea|button|object)$/i, tc = /^(?:a|area)$/i;
    m.fn.extend({ prop: function (a, b) { return V(this, m.prop, a, b, arguments.length > 1); }, removeProp: function (a) { return a = m.propFix[a] || a, this.each(function () { try {
            this[a] = void 0, delete this[a];
        }
        catch (b) { } }); } }), m.extend({ propFix: { "for": "htmlFor", "class": "className" }, prop: function (a, b, c) { var d, e, f, g = a.nodeType; if (a && 3 !== g && 8 !== g && 2 !== g)
            return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]; }, propHooks: { tabIndex: { get: function (a) { var b = m.find.attr(a, "tabindex"); return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1; } } } }), k.hrefNormalized || m.each(["href", "src"], function (a, b) { m.propHooks[b] = { get: function (a) { return a.getAttribute(b, 4); } }; }), k.optSelected || (m.propHooks.selected = { get: function (a) { var b = a.parentNode; return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null; } }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () { m.propFix[this.toLowerCase()] = this; }), k.enctype || (m.propFix.enctype = "encoding");
    var uc = /[\t\r\n\f]/g;
    m.fn.extend({ addClass: function (a) { var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a; if (m.isFunction(a))
            return this.each(function (b) { m(this).addClass(a.call(this, b, this.className)); }); if (j)
            for (b = (a || "").match(E) || []; i > h; h++)
                if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : " ")) {
                    f = 0;
                    while (e = b[f++])
                        d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                    g = m.trim(d), c.className !== g && (c.className = g);
                } return this; }, removeClass: function (a) { var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a; if (m.isFunction(a))
            return this.each(function (b) { m(this).removeClass(a.call(this, b, this.className)); }); if (j)
            for (b = (a || "").match(E) || []; i > h; h++)
                if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(uc, " ") : "")) {
                    f = 0;
                    while (e = b[f++])
                        while (d.indexOf(" " + e + " ") >= 0)
                            d = d.replace(" " + e + " ", " ");
                    g = a ? m.trim(d) : "", c.className !== g && (c.className = g);
                } return this; }, toggleClass: function (a, b) { var c = typeof a; return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function (c) { m(this).toggleClass(a.call(this, c, this.className, b), b); } : function () { if ("string" === c) {
            var b, d = 0, e = m(this), f = a.match(E) || [];
            while (b = f[d++])
                e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
        }
        else
            (c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || ""); }); }, hasClass: function (a) { for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
            if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(uc, " ").indexOf(b) >= 0)
                return !0; return !1; } }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) { m.fn[b] = function (a, c) { return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b); }; }), m.fn.extend({ hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a); }, bind: function (a, b, c) { return this.on(a, null, b, c); }, unbind: function (a, b) { return this.off(a, null, b); }, delegate: function (a, b, c, d) { return this.on(b, a, c, d); }, undelegate: function (a, b, c) { return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c); } });
    var vc = m.now(), wc = /\?/, xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function (b) { if (a.JSON && a.JSON.parse)
        return a.JSON.parse(b + ""); var c, d = null, e = m.trim(b + ""); return e && !m.trim(e.replace(xc, function (a, b, e, f) { return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, ""); })) ? Function("return " + e)() : m.error("Invalid JSON: " + b); }, m.parseXML = function (b) { var c, d; if (!b || "string" != typeof b)
        return null; try {
        a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b));
    }
    catch (e) {
        c = void 0;
    } return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c; };
    var yc, zc, Ac = /#.*$/, Bc = /([?&])_=[^&]*/, Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ec = /^(?:GET|HEAD)$/, Fc = /^\/\//, Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Hc = {}, Ic = {}, Jc = "*/".concat("*");
    try {
        zc = location.href;
    }
    catch (Kc) {
        zc = y.createElement("a"), zc.href = "", zc = zc.href;
    }
    yc = Gc.exec(zc.toLowerCase()) || [];
    function Lc(a) { return function (b, c) { "string" != typeof b && (c = b, b = "*"); var d, e = 0, f = b.toLowerCase().match(E) || []; if (m.isFunction(c))
        while (d = f[e++])
            "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c); }; }
    function Mc(a, b, c, d) { var e = {}, f = a === Ic; function g(h) { var i; return e[h] = !0, m.each(a[h] || [], function (a, h) { var j = h(b, c, d); return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1); }), i; } return g(b.dataTypes[0]) || !e["*"] && g("*"); }
    function Nc(a, b) { var c, d, e = m.ajaxSettings.flatOptions || {}; for (d in b)
        void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]); return c && m.extend(!0, a, c), a; }
    function Oc(a, b, c) { var d, e, f, g, h = a.contents, i = a.dataTypes; while ("*" === i[0])
        i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type")); if (e)
        for (g in h)
            if (h[g] && h[g].test(e)) {
                i.unshift(g);
                break;
            } if (i[0] in c)
        f = i[0];
    else {
        for (g in c) {
            if (!i[0] || a.converters[g + " " + i[0]]) {
                f = g;
                break;
            }
            d || (d = g);
        }
        f = f || d;
    } return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0; }
    function Pc(a, b, c, d) { var e, f, g, h, i, j = {}, k = a.dataTypes.slice(); if (k[1])
        for (g in a.converters)
            j[g.toLowerCase()] = a.converters[g]; f = k.shift(); while (f)
        if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
            if ("*" === f)
                f = i;
            else if ("*" !== i && i !== f) {
                if (g = j[i + " " + f] || j["* " + f], !g)
                    for (e in j)
                        if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                            break;
                        }
                if (g !== !0)
                    if (g && a["throws"])
                        b = g(b);
                    else
                        try {
                            b = g(b);
                        }
                        catch (l) {
                            return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
                        }
            } return { state: "success", data: b }; }
    m.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: zc, type: "GET", isLocal: Dc.test(yc[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Jc, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": m.parseJSON, "text xml": m.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function (a, b) { return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a); }, ajaxPrefilter: Lc(Hc), ajaxTransport: Lc(Ic), ajax: function (a, b) { "object" == typeof a && (b = a, a = void 0), b = b || {}; var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b), l = k.context || k, n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event, o = m.Deferred(), p = m.Callbacks("once memory"), q = k.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = { readyState: 0, getResponseHeader: function (a) { var b; if (2 === t) {
                if (!j) {
                    j = {};
                    while (b = Cc.exec(f))
                        j[b[1].toLowerCase()] = b[2];
                }
                b = j[a.toLowerCase()];
            } return null == b ? null : b; }, getAllResponseHeaders: function () { return 2 === t ? f : null; }, setRequestHeader: function (a, b) { var c = a.toLowerCase(); return t || (a = s[c] = s[c] || a, r[a] = b), this; }, overrideMimeType: function (a) { return t || (k.mimeType = a), this; }, statusCode: function (a) { var b; if (a)
                if (2 > t)
                    for (b in a)
                        q[b] = [q[b], a[b]];
                else
                    v.always(a[v.status]); return this; }, abort: function (a) { var b = a || u; return i && i.abort(b), x(0, b), this; } }; if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + "").replace(Ac, "").replace(Fc, yc[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yc[3] || ("http:" === yc[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), 2 === t)
            return v; h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, "$1_=" + vc++) : e + (wc.test(e) ? "&" : "?") + "_=" + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jc + "; q=0.01" : "") : k.accepts["*"]); for (d in k.headers)
            v.setRequestHeader(d, k.headers[d]); if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t))
            return v.abort(); u = "abort"; for (d in { success: 1, error: 1, complete: 1 })
            v[d](k[d]); if (i = Mc(Ic, k, b, v)) {
            v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function () { v.abort("timeout"); }, k.timeout));
            try {
                t = 1, i.send(r, x);
            }
            catch (w) {
                if (!(2 > t))
                    throw w;
                x(-1, w);
            }
        }
        else
            x(-1, "No Transport"); function x(a, b, c, d) { var j, r, s, u, w, x = b; 2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop"))); } return v; }, getJSON: function (a, b, c) { return m.get(a, b, c, "json"); }, getScript: function (a, b) { return m.get(a, void 0, b, "script"); } }), m.each(["get", "post"], function (a, b) { m[b] = function (a, c, d, e) { return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({ url: a, type: b, dataType: e, data: c, success: d }); }; }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) { m.fn[b] = function (a) { return this.on(b, a); }; }), m._evalUrl = function (a) { return m.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }); }, m.fn.extend({ wrapAll: function (a) { if (m.isFunction(a))
            return this.each(function (b) { m(this).wrapAll(a.call(this, b)); }); if (this[0]) {
            var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () { var a = this; while (a.firstChild && 1 === a.firstChild.nodeType)
                a = a.firstChild; return a; }).append(this);
        } return this; }, wrapInner: function (a) { return this.each(m.isFunction(a) ? function (b) { m(this).wrapInner(a.call(this, b)); } : function () { var b = m(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a); }); }, wrap: function (a) { var b = m.isFunction(a); return this.each(function (c) { m(this).wrapAll(b ? a.call(this, c) : a); }); }, unwrap: function () { return this.parent().each(function () { m.nodeName(this, "body") || m(this).replaceWith(this.childNodes); }).end(); } }), m.expr.filters.hidden = function (a) { return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display")); }, m.expr.filters.visible = function (a) { return !m.expr.filters.hidden(a); };
    var Qc = /%20/g, Rc = /\[\]$/, Sc = /\r?\n/g, Tc = /^(?:submit|button|image|reset|file)$/i, Uc = /^(?:input|select|textarea|keygen)/i;
    function Vc(a, b, c, d) { var e; if (m.isArray(b))
        m.each(b, function (b, e) { c || Rc.test(a) ? d(a, e) : Vc(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d); });
    else if (c || "object" !== m.type(b))
        d(a, b);
    else
        for (e in b)
            Vc(a + "[" + e + "]", b[e], c, d); }
    m.param = function (a, b) { var c, d = [], e = function (a, b) { b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b); }; if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a))
        m.each(a, function () { e(this.name, this.value); });
    else
        for (c in a)
            Vc(c, a[c], b, e); return d.join("&").replace(Qc, "+"); }, m.fn.extend({ serialize: function () { return m.param(this.serializeArray()); }, serializeArray: function () { return this.map(function () { var a = m.prop(this, "elements"); return a ? m.makeArray(a) : this; }).filter(function () { var a = this.type; return this.name && !m(this).is(":disabled") && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a)); }).map(function (a, b) { var c = m(this).val(); return null == c ? null : m.isArray(c) ? m.map(c, function (a) { return { name: b.name, value: a.replace(Sc, "\r\n") }; }) : { name: b.name, value: c.replace(Sc, "\r\n") }; }).get(); } }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function () { return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c(); } : Zc;
    var Wc = 0, Xc = {}, Yc = m.ajaxSettings.xhr();
    a.ActiveXObject && m(a).on("unload", function () { for (var a in Xc)
        Xc[a](void 0, !0); }), k.cors = !!Yc && "withCredentials" in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function (a) { if (!a.crossDomain || k.cors) {
        var b;
        return { send: function (c, d) { var e, f = a.xhr(), g = ++Wc; if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                for (e in a.xhrFields)
                    f[e] = a.xhrFields[e]; a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"); for (e in c)
                void 0 !== c[e] && f.setRequestHeader(e, c[e] + ""); f.send(a.hasContent && a.data || null), b = function (c, e) { var h, i, j; if (b && (e || 4 === f.readyState))
                if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e)
                    4 !== f.readyState && f.abort();
                else {
                    j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                    try {
                        i = f.statusText;
                    }
                    catch (k) {
                        i = "";
                    }
                    h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404;
                } j && d(h, i, j, f.getAllResponseHeaders()); }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b(); }, abort: function () { b && b(void 0, !0); } };
    } });
    function Zc() { try {
        return new a.XMLHttpRequest;
    }
    catch (b) { } }
    function $c() { try {
        return new a.ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (b) { } }
    m.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (a) { return m.globalEval(a), a; } } }), m.ajaxPrefilter("script", function (a) { void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1); }), m.ajaxTransport("script", function (a) { if (a.crossDomain) {
        var b, c = y.head || m("head")[0] || y.documentElement;
        return { send: function (d, e) { b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function (a, c) { (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success")); }, c.insertBefore(b, c.firstChild); }, abort: function () { b && b.onload(void 0, !0); } };
    } });
    var _c = [], ad = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = _c.pop() || m.expando + "_" + vc++; return this[a] = !0, a; } }), m.ajaxPrefilter("json jsonp", function (b, c, d) { var e, f, g, h = b.jsonp !== !1 && (ad.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ad.test(b.data) && "data"); return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, "$1" + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () { return g || m.error(e + " was not called"), g[0]; }, b.dataTypes[0] = "json", f = a[e], a[e] = function () { g = arguments; }, d.always(function () { a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0; }), "script") : void 0; }), m.parseHTML = function (a, b, c) { if (!a || "string" != typeof a)
        return null; "boolean" == typeof b && (c = b, b = !1), b = b || y; var d = u.exec(a), e = !c && []; return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes)); };
    var bd = m.fn.load;
    m.fn.load = function (a, b, c) { if ("string" != typeof a && bd)
        return bd.apply(this, arguments); var d, e, f, g = this, h = a.indexOf(" "); return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({ url: a, type: f, dataType: "html", data: b }).done(function (a) { e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a); }).complete(c && function (a, b) { g.each(c, e || [a.responseText, b, a]); }), this; }, m.expr.filters.animated = function (a) { return m.grep(m.timers, function (b) { return a === b.elem; }).length; };
    var cd = a.document.documentElement;
    function dd(a) { return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1; }
    m.offset = { setOffset: function (a, b, c) { var d, e, f, g, h, i, j, k = m.css(a, "position"), l = m(a), n = {}; "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n); } }, m.fn.extend({ offset: function (a) { if (arguments.length)
            return void 0 === a ? this : this.each(function (b) { m.offset.setOffset(this, a, b); }); var b, c, d = { top: 0, left: 0 }, e = this[0], f = e && e.ownerDocument; if (f)
            return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) }) : d; }, position: function () { if (this[0]) {
            var a, b, c = { top: 0, left: 0 }, d = this[0];
            return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), { top: b.top - c.top - m.css(d, "marginTop", !0), left: b.left - c.left - m.css(d, "marginLeft", !0) };
        } }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || cd; while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position"))
            a = a.offsetParent; return a || cd; }); } }), m.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) { var c = /Y/.test(b); m.fn[a] = function (d) { return V(this, function (a, d, e) { var f = dd(a); return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e); }, a, d, arguments.length, null); }; }), m.each(["top", "left"], function (a, b) { m.cssHooks[b] = Lb(k.pixelPosition, function (a, c) { return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + "px" : c) : void 0; }); }), m.each({ Height: "height", Width: "width" }, function (a, b) { m.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) { m.fn[d] = function (d, e) { var f = arguments.length && (c || "boolean" != typeof d), g = c || (d === !0 || e === !0 ? "margin" : "border"); return V(this, function (b, c, d) { var e; return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g); }, b, f ? d : void 0, f, null); }; }); }), m.fn.size = function () { return this.length; }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () { return m; });
    var ed = a.jQuery, fd = a.$;
    return m.noConflict = function (b) { return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m; }, typeof b === K && (a.jQuery = a.$ = m), m;
});
!function () {
    function n(n, t) { return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0; }
    function t(n) { return null != n && !isNaN(n); }
    function e(n) { return { left: function (t, e, r, u) { for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
            var i = r + u >>> 1;
            n(t[i], e) < 0 ? r = i + 1 : u = i;
        } return r; }, right: function (t, e, r, u) { for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
            var i = r + u >>> 1;
            n(t[i], e) > 0 ? u = i : r = i + 1;
        } return r; } }; }
    function r(n) { return n.length; }
    function u(n) { for (var t = 1; n * t % 1;)
        t *= 10; return t; }
    function i(n, t) { try {
        for (var e in t)
            Object.defineProperty(n.prototype, e, { value: t[e], enumerable: !1 });
    }
    catch (r) {
        n.prototype = t;
    } }
    function o() { }
    function a(n) { return ha + n in this; }
    function c(n) { return n = ha + n, n in this && delete this[n]; }
    function s() { var n = []; return this.forEach(function (t) { n.push(t); }), n; }
    function l() { var n = 0; for (var t in this)
        t.charCodeAt(0) === ga && ++n; return n; }
    function f() { for (var n in this)
        if (n.charCodeAt(0) === ga)
            return !1; return !0; }
    function h() { }
    function g(n, t, e) { return function () { var r = e.apply(t, arguments); return r === t ? n : r; }; }
    function p(n, t) { if (t in n)
        return t; t = t.charAt(0).toUpperCase() + t.substring(1); for (var e = 0, r = pa.length; r > e; ++e) {
        var u = pa[e] + t;
        if (u in n)
            return u;
    } }
    function v() { }
    function d() { }
    function m(n) { function t() { for (var t, r = e, u = -1, i = r.length; ++u < i;)
        (t = r[u].on) && t.apply(this, arguments); return n; } var e = [], r = new o; return t.on = function (t, u) { var i, o = r.get(t); return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, i = e.indexOf(o)).concat(e.slice(i + 1)), r.remove(t)), u && e.push(r.set(t, { on: u })), n); }, t; }
    function y() { Go.event.preventDefault(); }
    function x() { for (var n, t = Go.event; n = t.sourceEvent;)
        t = n; return t; }
    function M(n) { for (var t = new d, e = 0, r = arguments.length; ++e < r;)
        t[arguments[e]] = m(t); return t.of = function (e, r) { return function (u) { try {
        var i = u.sourceEvent = Go.event;
        u.target = n, Go.event = u, t[u.type].apply(e, r);
    }
    finally {
        Go.event = i;
    } }; }, t; }
    function _(n) { return da(n, _a), n; }
    function b(n) { return "function" == typeof n ? n : function () { return ma(n, this); }; }
    function w(n) { return "function" == typeof n ? n : function () { return ya(n, this); }; }
    function S(n, t) { function e() { this.removeAttribute(n); } function r() { this.removeAttributeNS(n.space, n.local); } function u() { this.setAttribute(n, t); } function i() { this.setAttributeNS(n.space, n.local, t); } function o() { var e = t.apply(this, arguments); null == e ? this.removeAttribute(n) : this.setAttribute(n, e); } function a() { var e = t.apply(this, arguments); null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e); } return n = Go.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? a : o : n.local ? i : u; }
    function k(n) { return n.trim().replace(/\s+/g, " "); }
    function E(n) { return new RegExp("(?:^|\\s+)" + Go.requote(n) + "(?:\\s+|$)", "g"); }
    function A(n) { return n.trim().split(/^|\s+/); }
    function C(n, t) { function e() { for (var e = -1; ++e < u;)
        n[e](this, t); } function r() { for (var e = -1, r = t.apply(this, arguments); ++e < u;)
        n[e](this, r); } n = A(n).map(N); var u = n.length; return "function" == typeof t ? r : e; }
    function N(n) { var t = E(n); return function (e, r) { if (u = e.classList)
        return r ? u.add(n) : u.remove(n); var u = e.getAttribute("class") || ""; r ? (t.lastIndex = 0, t.test(u) || e.setAttribute("class", k(u + " " + n))) : e.setAttribute("class", k(u.replace(t, " "))); }; }
    function L(n, t, e) { function r() { this.style.removeProperty(n); } function u() { this.style.setProperty(n, t, e); } function i() { var r = t.apply(this, arguments); null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e); } return null == t ? r : "function" == typeof t ? i : u; }
    function T(n, t) { function e() { delete this[n]; } function r() { this[n] = t; } function u() { var e = t.apply(this, arguments); null == e ? delete this[n] : this[n] = e; } return null == t ? e : "function" == typeof t ? u : r; }
    function q(n) { return "function" == typeof n ? n : (n = Go.ns.qualify(n)).local ? function () { return this.ownerDocument.createElementNS(n.space, n.local); } : function () { return this.ownerDocument.createElementNS(this.namespaceURI, n); }; }
    function z(n) { return { __data__: n }; }
    function R(n) { return function () { return Ma(this, n); }; }
    function D(t) { return arguments.length || (t = n), function (n, e) { return n && e ? t(n.__data__, e.__data__) : !n - !e; }; }
    function P(n, t) { for (var e = 0, r = n.length; r > e; e++)
        for (var u, i = n[e], o = 0, a = i.length; a > o; o++)
            (u = i[o]) && t(u, o, e); return n; }
    function U(n) { return da(n, wa), n; }
    function j(n) { var t, e; return function (r, u, i) { var o, a = n[i].update, c = a.length; for (i != e && (e = i, t = 0), u >= t && (t = u + 1); !(o = a[t]) && ++t < c;)
        ; return o; }; }
    function H() { var n = this.__transition__; n && ++n.active; }
    function F(n, t, e) { function r() { var t = this[o]; t && (this.removeEventListener(n, t, t.$), delete this[o]); } function u() { var u = c(t, Qo(arguments)); r.call(this), this.addEventListener(n, this[o] = u, u.$ = e), u._ = t; } function i() { var t, e = new RegExp("^__on([^.]+)" + Go.requote(n) + "$"); for (var r in this)
        if (t = r.match(e)) {
            var u = this[r];
            this.removeEventListener(t[1], u, u.$), delete this[r];
        } } var o = "__on" + n, a = n.indexOf("."), c = O; a > 0 && (n = n.substring(0, a)); var s = ka.get(n); return s && (n = s, c = I), a ? t ? u : r : t ? v : i; }
    function O(n, t) { return function (e) { var r = Go.event; Go.event = e, t[0] = this.__data__; try {
        n.apply(this, t);
    }
    finally {
        Go.event = r;
    } }; }
    function I(n, t) { var e = O(n, t); return function (n) { var t = this, r = n.relatedTarget; r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n); }; }
    function Y() { var n = ".dragsuppress-" + ++Aa, t = "click" + n, e = Go.select(ea).on("touchmove" + n, y).on("dragstart" + n, y).on("selectstart" + n, y); if (Ea) {
        var r = ta.style, u = r[Ea];
        r[Ea] = "none";
    } return function (i) { function o() { e.on(t, null); } e.on(n, null), Ea && (r[Ea] = u), i && (e.on(t, function () { y(), o(); }, !0), setTimeout(o, 0)); }; }
    function Z(n, t) { t.changedTouches && (t = t.changedTouches[0]); var e = n.ownerSVGElement || n; if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y];
    } var u = n.getBoundingClientRect(); return [t.clientX - u.left - n.clientLeft, t.clientY - u.top - n.clientTop]; }
    function V() { return Go.event.changedTouches[0].identifier; }
    function $() { return Go.event.target; }
    function X() { return ea; }
    function B(n) { return n > 0 ? 1 : 0 > n ? -1 : 0; }
    function J(n, t, e) { return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]); }
    function W(n) { return n > 1 ? 0 : -1 > n ? Ca : Math.acos(n); }
    function G(n) { return n > 1 ? La : -1 > n ? -La : Math.asin(n); }
    function K(n) { return ((n = Math.exp(n)) - 1 / n) / 2; }
    function Q(n) { return ((n = Math.exp(n)) + 1 / n) / 2; }
    function nt(n) { return ((n = Math.exp(2 * n)) - 1) / (n + 1); }
    function tt(n) { return (n = Math.sin(n / 2)) * n; }
    function et() { }
    function rt(n, t, e) { return new ut(n, t, e); }
    function ut(n, t, e) { this.h = n, this.s = t, this.l = e; }
    function it(n, t, e) { function r(n) { return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? i + (o - i) * n / 60 : 180 > n ? o : 240 > n ? i + (o - i) * (240 - n) / 60 : i; } function u(n) { return Math.round(255 * r(n)); } var i, o; return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, o = .5 >= e ? e * (1 + t) : e + t - e * t, i = 2 * e - o, yt(u(n + 120), u(n), u(n - 120)); }
    function ot(n, t, e) { return new at(n, t, e); }
    function at(n, t, e) { this.h = n, this.c = t, this.l = e; }
    function ct(n, t, e) { return isNaN(n) && (n = 0), isNaN(t) && (t = 0), st(e, Math.cos(n *= za) * t, Math.sin(n) * t); }
    function st(n, t, e) { return new lt(n, t, e); }
    function lt(n, t, e) { this.l = n, this.a = t, this.b = e; }
    function ft(n, t, e) { var r = (n + 16) / 116, u = r + t / 500, i = r - e / 200; return u = gt(u) * Za, r = gt(r) * Va, i = gt(i) * $a, yt(vt(3.2404542 * u - 1.5371385 * r - .4985314 * i), vt(-.969266 * u + 1.8760108 * r + .041556 * i), vt(.0556434 * u - .2040259 * r + 1.0572252 * i)); }
    function ht(n, t, e) { return n > 0 ? ot(Math.atan2(e, t) * Ra, Math.sqrt(t * t + e * e), n) : ot(0 / 0, 0 / 0, n); }
    function gt(n) { return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037; }
    function pt(n) { return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29; }
    function vt(n) { return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055)); }
    function dt(n) { return yt(n >> 16, 255 & n >> 8, 255 & n); }
    function mt(n) { return dt(n) + ""; }
    function yt(n, t, e) { return new xt(n, t, e); }
    function xt(n, t, e) { this.r = n, this.g = t, this.b = e; }
    function Mt(n) { return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16); }
    function _t(n, t, e) { var r, u, i, o = 0, a = 0, c = 0; if (r = /([a-z]+)\((.*)\)/i.exec(n))
        switch (u = r[2].split(","), r[1]) {
            case "hsl": return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);
            case "rgb": return t(kt(u[0]), kt(u[1]), kt(u[2]));
        } return (i = Ja.get(n)) ? t(i.r, i.g, i.b) : (null == n || "#" !== n.charAt(0) || isNaN(i = parseInt(n.substring(1), 16)) || (4 === n.length ? (o = (3840 & i) >> 4, o = o >> 4 | o, a = 240 & i, a = a >> 4 | a, c = 15 & i, c = c << 4 | c) : 7 === n.length && (o = (16711680 & i) >> 16, a = (65280 & i) >> 8, c = 255 & i)), t(o, a, c)); }
    function bt(n, t, e) { var r, u, i = Math.min(n /= 255, t /= 255, e /= 255), o = Math.max(n, t, e), a = o - i, c = (o + i) / 2; return a ? (u = .5 > c ? a / (o + i) : a / (2 - o - i), r = n == o ? (t - e) / a + (e > t ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = 0 / 0, u = c > 0 && 1 > c ? 0 : r), rt(r, u, c); }
    function wt(n, t, e) { n = St(n), t = St(t), e = St(e); var r = pt((.4124564 * n + .3575761 * t + .1804375 * e) / Za), u = pt((.2126729 * n + .7151522 * t + .072175 * e) / Va), i = pt((.0193339 * n + .119192 * t + .9503041 * e) / $a); return st(116 * u - 16, 500 * (r - u), 200 * (u - i)); }
    function St(n) { return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4); }
    function kt(n) { var t = parseFloat(n); return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t; }
    function Et(n) { return "function" == typeof n ? n : function () { return n; }; }
    function At(n) { return n; }
    function Ct(n) { return function (t, e, r) { return 2 === arguments.length && "function" == typeof e && (r = e, e = null), Nt(t, e, n, r); }; }
    function Nt(n, t, e, r) { function u() { var n, t = c.status; if (!t && c.responseText || t >= 200 && 300 > t || 304 === t) {
        try {
            n = e.call(i, c);
        }
        catch (r) {
            return o.error.call(i, r), void 0;
        }
        o.load.call(i, n);
    }
    else
        o.error.call(i, c); } var i = {}, o = Go.dispatch("beforesend", "progress", "load", "error"), a = {}, c = new XMLHttpRequest, s = null; return !ea.XDomainRequest || "withCredentials" in c || !/^(http(s)?:)?\/\//.test(n) || (c = new XDomainRequest), "onload" in c ? c.onload = c.onerror = u : c.onreadystatechange = function () { c.readyState > 3 && u(); }, c.onprogress = function (n) { var t = Go.event; Go.event = n; try {
        o.progress.call(i, c);
    }
    finally {
        Go.event = t;
    } }, i.header = function (n, t) { return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", i); }, i.mimeType = function (n) { return arguments.length ? (t = null == n ? null : n + "", i) : t; }, i.responseType = function (n) { return arguments.length ? (s = n, i) : s; }, i.response = function (n) { return e = n, i; }, ["get", "post"].forEach(function (n) { i[n] = function () { return i.send.apply(i, [n].concat(Qo(arguments))); }; }), i.send = function (e, r, u) { if (2 === arguments.length && "function" == typeof r && (u = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader)
        for (var l in a)
            c.setRequestHeader(l, a[l]); return null != t && c.overrideMimeType && c.overrideMimeType(t), null != s && (c.responseType = s), null != u && i.on("error", u).on("load", function (n) { u(null, n); }), o.beforesend.call(i, c), c.send(null == r ? null : r), i; }, i.abort = function () { return c.abort(), i; }, Go.rebind(i, o, "on"), null == r ? i : i.get(Lt(r)); }
    function Lt(n) { return 1 === n.length ? function (t, e) { n(null == t ? e : null); } : n; }
    function Tt() { var n = qt(), t = zt() - n; t > 24 ? (isFinite(t) && (clearTimeout(Qa), Qa = setTimeout(Tt, t)), Ka = 0) : (Ka = 1, tc(Tt)); }
    function qt() { var n = Date.now(); for (nc = Wa; nc;)
        n >= nc.t && (nc.f = nc.c(n - nc.t)), nc = nc.n; return n; }
    function zt() { for (var n, t = Wa, e = 1 / 0; t;)
        t.f ? t = n ? n.n = t.n : Wa = t.n : (t.t < e && (e = t.t), t = (n = t).n); return Ga = n, e; }
    function Rt(n, t) { return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1); }
    function Dt(n, t) { var e = Math.pow(10, 3 * fa(8 - t)); return { scale: t > 8 ? function (n) { return n / e; } : function (n) { return n * e; }, symbol: n }; }
    function Pt(n) { var t = n.decimal, e = n.thousands, r = n.grouping, u = n.currency, i = r ? function (n) { for (var t = n.length, u = [], i = 0, o = r[0]; t > 0 && o > 0;)
        u.push(n.substring(t -= o, t + o)), o = r[i = (i + 1) % r.length]; return u.reverse().join(e); } : At; return function (n) { var e = rc.exec(n), r = e[1] || " ", o = e[2] || ">", a = e[3] || "", c = e[4] || "", s = e[5], l = +e[6], f = e[7], h = e[8], g = e[9], p = 1, v = "", d = "", m = !1; switch (h && (h = +h.substring(1)), (s || "0" === r && "=" === o) && (s = r = "0", o = "=", f && (l -= Math.floor((l - 1) / 4))), g) {
        case "n":
            f = !0, g = "g";
            break;
        case "%":
            p = 100, d = "%", g = "f";
            break;
        case "p":
            p = 100, d = "%", g = "r";
            break;
        case "b":
        case "o":
        case "x":
        case "X": "#" === c && (v = "0" + g.toLowerCase());
        case "c":
        case "d":
            m = !0, h = 0;
            break;
        case "s": p = -1, g = "r";
    } "$" === c && (v = u[0], d = u[1]), "r" != g || h || (g = "g"), null != h && ("g" == g ? h = Math.max(1, Math.min(21, h)) : ("e" == g || "f" == g) && (h = Math.max(0, Math.min(20, h)))), g = uc.get(g) || Ut; var y = s && f; return function (n) { var e = d; if (m && n % 1)
        return ""; var u = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : a; if (0 > p) {
        var c = Go.formatPrefix(n, h);
        n = c.scale(n), e = c.symbol + d;
    }
    else
        n *= p; n = g(n, h); var x = n.lastIndexOf("."), M = 0 > x ? n : n.substring(0, x), _ = 0 > x ? "" : t + n.substring(x + 1); !s && f && (M = i(M)); var b = v.length + M.length + _.length + (y ? 0 : u.length), w = l > b ? new Array(b = l - b + 1).join(r) : ""; return y && (M = i(w + M)), u += v, n = M + _, ("<" === o ? u + n + w : ">" === o ? w + u + n : "^" === o ? w.substring(0, b >>= 1) + u + n + w.substring(b) : u + (y ? n : w + n)) + e; }; }; }
    function Ut(n) { return n + ""; }
    function jt() { this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]); }
    function Ht(n, t, e) { function r(t) { var e = n(t), r = i(e, 1); return r - t > t - e ? e : r; } function u(e) { return t(e = n(new oc(e - 1)), 1), e; } function i(n, e) { return t(n = new oc(+n), e), n; } function o(n, r, i) { var o = u(n), a = []; if (i > 1)
        for (; r > o;)
            e(o) % i || a.push(new Date(+o)), t(o, 1);
    else
        for (; r > o;)
            a.push(new Date(+o)), t(o, 1); return a; } function a(n, t, e) { try {
        oc = jt;
        var r = new jt;
        return r._ = n, o(r, t, e);
    }
    finally {
        oc = Date;
    } } n.floor = n, n.round = r, n.ceil = u, n.offset = i, n.range = o; var c = n.utc = Ft(n); return c.floor = c, c.round = Ft(r), c.ceil = Ft(u), c.offset = Ft(i), c.range = a, n; }
    function Ft(n) { return function (t, e) { try {
        oc = jt;
        var r = new jt;
        return r._ = t, n(r, e)._;
    }
    finally {
        oc = Date;
    } }; }
    function Ot(n) { function t(n) { function t(t) { for (var e, u, i, o = [], a = -1, c = 0; ++a < r;)
        37 === n.charCodeAt(a) && (o.push(n.substring(c, a)), null != (u = cc[e = n.charAt(++a)]) && (e = n.charAt(++a)), (i = C[e]) && (e = i(t, null == u ? "e" === e ? " " : "0" : u)), o.push(e), c = a + 1); return o.push(n.substring(c, a)), o.join(""); } var r = n.length; return t.parse = function (t) { var r = { y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0, Z: null }, u = e(r, n, t, 0); if (u != t.length)
        return null; "p" in r && (r.H = r.H % 12 + 12 * r.p); var i = null != r.Z && oc !== jt, o = new (i ? jt : oc); return "j" in r ? o.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (o.setFullYear(r.y, 0, 1), o.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d), o.setHours(r.H + Math.floor(r.Z / 100), r.M + r.Z % 100, r.S, r.L), i ? o._ : o; }, t.toString = function () { return n; }, t; } function e(n, t, e, r) { for (var u, i, o, a = 0, c = t.length, s = e.length; c > a;) {
        if (r >= s)
            return -1;
        if (u = t.charCodeAt(a++), 37 === u) {
            if (o = t.charAt(a++), i = N[o in cc ? t.charAt(a++) : o], !i || (r = i(n, e, r)) < 0)
                return -1;
        }
        else if (u != e.charCodeAt(r++))
            return -1;
    } return r; } function r(n, t, e) { b.lastIndex = 0; var r = b.exec(t.substring(e)); return r ? (n.w = w.get(r[0].toLowerCase()), e + r[0].length) : -1; } function u(n, t, e) { M.lastIndex = 0; var r = M.exec(t.substring(e)); return r ? (n.w = _.get(r[0].toLowerCase()), e + r[0].length) : -1; } function i(n, t, e) { E.lastIndex = 0; var r = E.exec(t.substring(e)); return r ? (n.m = A.get(r[0].toLowerCase()), e + r[0].length) : -1; } function o(n, t, e) { S.lastIndex = 0; var r = S.exec(t.substring(e)); return r ? (n.m = k.get(r[0].toLowerCase()), e + r[0].length) : -1; } function a(n, t, r) { return e(n, C.c.toString(), t, r); } function c(n, t, r) { return e(n, C.x.toString(), t, r); } function s(n, t, r) { return e(n, C.X.toString(), t, r); } function l(n, t, e) { var r = x.get(t.substring(e, e += 2).toLowerCase()); return null == r ? -1 : (n.p = r, e); } var f = n.dateTime, h = n.date, g = n.time, p = n.periods, v = n.days, d = n.shortDays, m = n.months, y = n.shortMonths; t.utc = function (n) { function e(n) { try {
        oc = jt;
        var t = new oc;
        return t._ = n, r(t);
    }
    finally {
        oc = Date;
    } } var r = t(n); return e.parse = function (n) { try {
        oc = jt;
        var t = r.parse(n);
        return t && t._;
    }
    finally {
        oc = Date;
    } }, e.toString = r.toString, e; }, t.multi = t.utc.multi = ae; var x = Go.map(), M = Yt(v), _ = Zt(v), b = Yt(d), w = Zt(d), S = Yt(m), k = Zt(m), E = Yt(y), A = Zt(y); p.forEach(function (n, t) { x.set(n.toLowerCase(), t); }); var C = { a: function (n) { return d[n.getDay()]; }, A: function (n) { return v[n.getDay()]; }, b: function (n) { return y[n.getMonth()]; }, B: function (n) { return m[n.getMonth()]; }, c: t(f), d: function (n, t) { return It(n.getDate(), t, 2); }, e: function (n, t) { return It(n.getDate(), t, 2); }, H: function (n, t) { return It(n.getHours(), t, 2); }, I: function (n, t) { return It(n.getHours() % 12 || 12, t, 2); }, j: function (n, t) { return It(1 + ic.dayOfYear(n), t, 3); }, L: function (n, t) { return It(n.getMilliseconds(), t, 3); }, m: function (n, t) { return It(n.getMonth() + 1, t, 2); }, M: function (n, t) { return It(n.getMinutes(), t, 2); }, p: function (n) { return p[+(n.getHours() >= 12)]; }, S: function (n, t) { return It(n.getSeconds(), t, 2); }, U: function (n, t) { return It(ic.sundayOfYear(n), t, 2); }, w: function (n) { return n.getDay(); }, W: function (n, t) { return It(ic.mondayOfYear(n), t, 2); }, x: t(h), X: t(g), y: function (n, t) { return It(n.getFullYear() % 100, t, 2); }, Y: function (n, t) { return It(n.getFullYear() % 1e4, t, 4); }, Z: ie, "%": function () { return "%"; } }, N = { a: r, A: u, b: i, B: o, c: a, d: Qt, e: Qt, H: te, I: te, j: ne, L: ue, m: Kt, M: ee, p: l, S: re, U: $t, w: Vt, W: Xt, x: c, X: s, y: Jt, Y: Bt, Z: Wt, "%": oe }; return t; }
    function It(n, t, e) { var r = 0 > n ? "-" : "", u = (r ? -n : n) + "", i = u.length; return r + (e > i ? new Array(e - i + 1).join(t) + u : u); }
    function Yt(n) { return new RegExp("^(?:" + n.map(Go.requote).join("|") + ")", "i"); }
    function Zt(n) { for (var t = new o, e = -1, r = n.length; ++e < r;)
        t.set(n[e].toLowerCase(), e); return t; }
    function Vt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 1)); return r ? (n.w = +r[0], e + r[0].length) : -1; }
    function $t(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e)); return r ? (n.U = +r[0], e + r[0].length) : -1; }
    function Xt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e)); return r ? (n.W = +r[0], e + r[0].length) : -1; }
    function Bt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 4)); return r ? (n.y = +r[0], e + r[0].length) : -1; }
    function Jt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.y = Gt(+r[0]), e + r[0].length) : -1; }
    function Wt(n, t, e) { return /^[+-]\d{4}$/.test(t = t.substring(e, e + 5)) ? (n.Z = -t, e + 5) : -1; }
    function Gt(n) { return n + (n > 68 ? 1900 : 2e3); }
    function Kt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.m = r[0] - 1, e + r[0].length) : -1; }
    function Qt(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.d = +r[0], e + r[0].length) : -1; }
    function ne(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 3)); return r ? (n.j = +r[0], e + r[0].length) : -1; }
    function te(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.H = +r[0], e + r[0].length) : -1; }
    function ee(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.M = +r[0], e + r[0].length) : -1; }
    function re(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 2)); return r ? (n.S = +r[0], e + r[0].length) : -1; }
    function ue(n, t, e) { sc.lastIndex = 0; var r = sc.exec(t.substring(e, e + 3)); return r ? (n.L = +r[0], e + r[0].length) : -1; }
    function ie(n) { var t = n.getTimezoneOffset(), e = t > 0 ? "-" : "+", r = ~~(fa(t) / 60), u = fa(t) % 60; return e + It(r, "0", 2) + It(u, "0", 2); }
    function oe(n, t, e) { lc.lastIndex = 0; var r = lc.exec(t.substring(e, e + 1)); return r ? e + r[0].length : -1; }
    function ae(n) { for (var t = n.length, e = -1; ++e < t;)
        n[e][0] = this(n[e][0]); return function (t) { for (var e = 0, r = n[e]; !r[1](t);)
        r = n[++e]; return r[0](t); }; }
    function ce() { }
    function se(n, t, e) { var r = e.s = n + t, u = r - n, i = r - u; e.t = n - i + (t - u); }
    function le(n, t) { n && pc.hasOwnProperty(n.type) && pc[n.type](n, t); }
    function fe(n, t, e) { var r, u = -1, i = n.length - e; for (t.lineStart(); ++u < i;)
        r = n[u], t.point(r[0], r[1], r[2]); t.lineEnd(); }
    function he(n, t) { var e = -1, r = n.length; for (t.polygonStart(); ++e < r;)
        fe(n[e], t, 1); t.polygonEnd(); }
    function ge() { function n(n, t) { n *= za, t = t * za / 2 + Ca / 4; var e = n - r, o = e >= 0 ? 1 : -1, a = o * e, c = Math.cos(t), s = Math.sin(t), l = i * s, f = u * c + l * Math.cos(a), h = l * o * Math.sin(a); dc.add(Math.atan2(h, f)), r = n, u = c, i = s; } var t, e, r, u, i; mc.point = function (o, a) { mc.point = n, r = (t = o) * za, u = Math.cos(a = (e = a) * za / 2 + Ca / 4), i = Math.sin(a); }, mc.lineEnd = function () { n(t, e); }; }
    function pe(n) { var t = n[0], e = n[1], r = Math.cos(e); return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)]; }
    function ve(n, t) { return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]; }
    function de(n, t) { return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]; }
    function me(n, t) { n[0] += t[0], n[1] += t[1], n[2] += t[2]; }
    function ye(n, t) { return [n[0] * t, n[1] * t, n[2] * t]; }
    function xe(n) { var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]); n[0] /= t, n[1] /= t, n[2] /= t; }
    function Me(n) { return [Math.atan2(n[1], n[0]), G(n[2])]; }
    function _e(n, t) { return fa(n[0] - t[0]) < Ta && fa(n[1] - t[1]) < Ta; }
    function be(n, t) { n *= za; var e = Math.cos(t *= za); we(e * Math.cos(n), e * Math.sin(n), Math.sin(t)); }
    function we(n, t, e) { ++yc, Mc += (n - Mc) / yc, _c += (t - _c) / yc, bc += (e - bc) / yc; }
    function Se() { function n(n, u) { n *= za; var i = Math.cos(u *= za), o = i * Math.cos(n), a = i * Math.sin(n), c = Math.sin(u), s = Math.atan2(Math.sqrt((s = e * c - r * a) * s + (s = r * o - t * c) * s + (s = t * a - e * o) * s), t * o + e * a + r * c); xc += s, wc += s * (t + (t = o)), Sc += s * (e + (e = a)), kc += s * (r + (r = c)), we(t, e, r); } var t, e, r; Nc.point = function (u, i) { u *= za; var o = Math.cos(i *= za); t = o * Math.cos(u), e = o * Math.sin(u), r = Math.sin(i), Nc.point = n, we(t, e, r); }; }
    function ke() { Nc.point = be; }
    function Ee() { function n(n, t) { n *= za; var e = Math.cos(t *= za), o = e * Math.cos(n), a = e * Math.sin(n), c = Math.sin(t), s = u * c - i * a, l = i * o - r * c, f = r * a - u * o, h = Math.sqrt(s * s + l * l + f * f), g = r * o + u * a + i * c, p = h && -W(g) / h, v = Math.atan2(h, g); Ec += p * s, Ac += p * l, Cc += p * f, xc += v, wc += v * (r + (r = o)), Sc += v * (u + (u = a)), kc += v * (i + (i = c)), we(r, u, i); } var t, e, r, u, i; Nc.point = function (o, a) { t = o, e = a, Nc.point = n, o *= za; var c = Math.cos(a *= za); r = c * Math.cos(o), u = c * Math.sin(o), i = Math.sin(a), we(r, u, i); }, Nc.lineEnd = function () { n(t, e), Nc.lineEnd = ke, Nc.point = be; }; }
    function Ae() { return !0; }
    function Ce(n, t, e, r, u) { var i = [], o = []; if (n.forEach(function (n) { if (!((t = n.length - 1) <= 0)) {
        var t, e = n[0], r = n[t];
        if (_e(e, r)) {
            u.lineStart();
            for (var a = 0; t > a; ++a)
                u.point((e = n[a])[0], e[1]);
            return u.lineEnd(), void 0;
        }
        var c = new Le(e, n, null, !0), s = new Le(e, null, c, !1);
        c.o = s, i.push(c), o.push(s), c = new Le(r, n, null, !1), s = new Le(r, null, c, !0), c.o = s, i.push(c), o.push(s);
    } }), o.sort(t), Ne(i), Ne(o), i.length) {
        for (var a = 0, c = e, s = o.length; s > a; ++a)
            o[a].e = c = !c;
        for (var l, f, h = i[0];;) {
            for (var g = h, p = !0; g.v;)
                if ((g = g.n) === h)
                    return;
            l = g.z, u.lineStart();
            do {
                if (g.v = g.o.v = !0, g.e) {
                    if (p)
                        for (var a = 0, s = l.length; s > a; ++a)
                            u.point((f = l[a])[0], f[1]);
                    else
                        r(g.x, g.n.x, 1, u);
                    g = g.n;
                }
                else {
                    if (p) {
                        l = g.p.z;
                        for (var a = l.length - 1; a >= 0; --a)
                            u.point((f = l[a])[0], f[1]);
                    }
                    else
                        r(g.x, g.p.x, -1, u);
                    g = g.p;
                }
                g = g.o, l = g.z, p = !p;
            } while (!g.v);
            u.lineEnd();
        }
    } }
    function Ne(n) { if (t = n.length) {
        for (var t, e, r = 0, u = n[0]; ++r < t;)
            u.n = e = n[r], e.p = u, u = e;
        u.n = e = n[0], e.p = u;
    } }
    function Le(n, t, e, r) { this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null; }
    function Te(n, t, e, r) { return function (u, i) { function o(t, e) { var r = u(t, e); n(t = r[0], e = r[1]) && i.point(t, e); } function a(n, t) { var e = u(n, t); d.point(e[0], e[1]); } function c() { y.point = a, d.lineStart(); } function s() { y.point = o, d.lineEnd(); } function l(n, t) { v.push([n, t]); var e = u(n, t); M.point(e[0], e[1]); } function f() { M.lineStart(), v = []; } function h() { l(v[0][0], v[0][1]), M.lineEnd(); var n, t = M.clean(), e = x.buffer(), r = e.length; if (v.pop(), p.push(v), v = null, r)
        if (1 & t) {
            n = e[0];
            var u, r = n.length - 1, o = -1;
            if (r > 0) {
                for (_ || (i.polygonStart(), _ = !0), i.lineStart(); ++o < r;)
                    i.point((u = n[o])[0], u[1]);
                i.lineEnd();
            }
        }
        else
            r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), g.push(e.filter(qe)); } var g, p, v, d = t(i), m = u.invert(r[0], r[1]), y = { point: o, lineStart: c, lineEnd: s, polygonStart: function () { y.point = l, y.lineStart = f, y.lineEnd = h, g = [], p = []; }, polygonEnd: function () { y.point = o, y.lineStart = c, y.lineEnd = s, g = Go.merge(g); var n = De(m, p); g.length ? (_ || (i.polygonStart(), _ = !0), Ce(g, Re, n, e, i)) : n && (_ || (i.polygonStart(), _ = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), _ && (i.polygonEnd(), _ = !1), g = p = null; }, sphere: function () { i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd(); } }, x = ze(), M = t(x), _ = !1; return y; }; }
    function qe(n) { return n.length > 1; }
    function ze() { var n, t = []; return { lineStart: function () { t.push(n = []); }, point: function (t, e) { n.push([t, e]); }, lineEnd: v, buffer: function () { var e = t; return t = [], n = null, e; }, rejoin: function () { t.length > 1 && t.push(t.pop().concat(t.shift())); } }; }
    function Re(n, t) { return ((n = n.x)[0] < 0 ? n[1] - La - Ta : La - n[1]) - ((t = t.x)[0] < 0 ? t[1] - La - Ta : La - t[1]); }
    function De(n, t) { var e = n[0], r = n[1], u = [Math.sin(e), -Math.cos(e), 0], i = 0, o = 0; dc.reset(); for (var a = 0, c = t.length; c > a; ++a) {
        var s = t[a], l = s.length;
        if (l)
            for (var f = s[0], h = f[0], g = f[1] / 2 + Ca / 4, p = Math.sin(g), v = Math.cos(g), d = 1;;) {
                d === l && (d = 0), n = s[d];
                var m = n[0], y = n[1] / 2 + Ca / 4, x = Math.sin(y), M = Math.cos(y), _ = m - h, b = _ >= 0 ? 1 : -1, w = b * _, S = w > Ca, k = p * x;
                if (dc.add(Math.atan2(k * b * Math.sin(w), v * M + k * Math.cos(w))), i += S ? _ + b * Na : _, S ^ h >= e ^ m >= e) {
                    var E = de(pe(f), pe(n));
                    xe(E);
                    var A = de(u, E);
                    xe(A);
                    var C = (S ^ _ >= 0 ? -1 : 1) * G(A[2]);
                    (r > C || r === C && (E[0] || E[1])) && (o += S ^ _ >= 0 ? 1 : -1);
                }
                if (!d++)
                    break;
                h = m, p = x, v = M, f = n;
            }
    } return (-Ta > i || Ta > i && 0 > dc) ^ 1 & o; }
    function Pe(n) { var t, e = 0 / 0, r = 0 / 0, u = 0 / 0; return { lineStart: function () { n.lineStart(), t = 1; }, point: function (i, o) { var a = i > 0 ? Ca : -Ca, c = fa(i - e); fa(c - Ca) < Ta ? (n.point(e, r = (r + o) / 2 > 0 ? La : -La), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(i, r), t = 0) : u !== a && c >= Ca && (fa(e - u) < Ta && (e -= u * Ta), fa(i - a) < Ta && (i -= a * Ta), r = Ue(e, r, i, o), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = i, r = o), u = a; }, lineEnd: function () { n.lineEnd(), e = r = 0 / 0; }, clean: function () { return 2 - t; } }; }
    function Ue(n, t, e, r) { var u, i, o = Math.sin(n - e); return fa(o) > Ta ? Math.atan((Math.sin(t) * (i = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (u = Math.cos(t)) * Math.sin(n)) / (u * i * o)) : (t + r) / 2; }
    function je(n, t, e, r) { var u; if (null == n)
        u = e * La, r.point(-Ca, u), r.point(0, u), r.point(Ca, u), r.point(Ca, 0), r.point(Ca, -u), r.point(0, -u), r.point(-Ca, -u), r.point(-Ca, 0), r.point(-Ca, u);
    else if (fa(n[0] - t[0]) > Ta) {
        var i = n[0] < t[0] ? Ca : -Ca;
        u = e * i / 2, r.point(-i, u), r.point(0, u), r.point(i, u);
    }
    else
        r.point(t[0], t[1]); }
    function He(n) { function t(n, t) { return Math.cos(n) * Math.cos(t) > i; } function e(n) { var e, i, c, s, l; return { lineStart: function () { s = c = !1, l = 1; }, point: function (f, h) { var g, p = [f, h], v = t(f, h), d = o ? v ? 0 : u(f, h) : v ? u(f + (0 > f ? Ca : -Ca), h) : 0; if (!e && (s = c = v) && n.lineStart(), v !== c && (g = r(e, p), (_e(e, g) || _e(p, g)) && (p[0] += Ta, p[1] += Ta, v = t(p[0], p[1]))), v !== c)
            l = 0, v ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g;
        else if (a && e && o ^ v) {
            var m;
            d & i || !(m = r(p, e, !0)) || (l = 0, o ? (n.lineStart(), n.point(m[0][0], m[0][1]), n.point(m[1][0], m[1][1]), n.lineEnd()) : (n.point(m[1][0], m[1][1]), n.lineEnd(), n.lineStart(), n.point(m[0][0], m[0][1])));
        } !v || e && _e(e, p) || n.point(p[0], p[1]), e = p, c = v, i = d; }, lineEnd: function () { c && n.lineEnd(), e = null; }, clean: function () { return l | (s && c) << 1; } }; } function r(n, t, e) { var r = pe(n), u = pe(t), o = [1, 0, 0], a = de(r, u), c = ve(a, a), s = a[0], l = c - s * s; if (!l)
        return !e && n; var f = i * c / l, h = -i * s / l, g = de(o, a), p = ye(o, f), v = ye(a, h); me(p, v); var d = g, m = ve(p, d), y = ve(d, d), x = m * m - y * (ve(p, p) - 1); if (!(0 > x)) {
        var M = Math.sqrt(x), _ = ye(d, (-m - M) / y);
        if (me(_, p), _ = Me(_), !e)
            return _;
        var b, w = n[0], S = t[0], k = n[1], E = t[1];
        w > S && (b = w, w = S, S = b);
        var A = S - w, C = fa(A - Ca) < Ta, N = C || Ta > A;
        if (!C && k > E && (b = k, k = E, E = b), N ? C ? k + E > 0 ^ _[1] < (fa(_[0] - w) < Ta ? k : E) : k <= _[1] && _[1] <= E : A > Ca ^ (w <= _[0] && _[0] <= S)) {
            var L = ye(d, (-m + M) / y);
            return me(L, p), [_, Me(L)];
        }
    } } function u(t, e) { var r = o ? n : Ca - n, u = 0; return -r > t ? u |= 1 : t > r && (u |= 2), -r > e ? u |= 4 : e > r && (u |= 8), u; } var i = Math.cos(n), o = i > 0, a = fa(i) > Ta, c = gr(n, 6 * za); return Te(t, e, c, o ? [0, -n] : [-Ca, n - Ca]); }
    function Fe(n, t, e, r) { return function (u) { var i, o = u.a, a = u.b, c = o.x, s = o.y, l = a.x, f = a.y, h = 0, g = 1, p = l - c, v = f - s; if (i = n - c, p || !(i > 0)) {
        if (i /= p, 0 > p) {
            if (h > i)
                return;
            g > i && (g = i);
        }
        else if (p > 0) {
            if (i > g)
                return;
            i > h && (h = i);
        }
        if (i = e - c, p || !(0 > i)) {
            if (i /= p, 0 > p) {
                if (i > g)
                    return;
                i > h && (h = i);
            }
            else if (p > 0) {
                if (h > i)
                    return;
                g > i && (g = i);
            }
            if (i = t - s, v || !(i > 0)) {
                if (i /= v, 0 > v) {
                    if (h > i)
                        return;
                    g > i && (g = i);
                }
                else if (v > 0) {
                    if (i > g)
                        return;
                    i > h && (h = i);
                }
                if (i = r - s, v || !(0 > i)) {
                    if (i /= v, 0 > v) {
                        if (i > g)
                            return;
                        i > h && (h = i);
                    }
                    else if (v > 0) {
                        if (h > i)
                            return;
                        g > i && (g = i);
                    }
                    return h > 0 && (u.a = { x: c + h * p, y: s + h * v }), 1 > g && (u.b = { x: c + g * p, y: s + g * v }), u;
                }
            }
        }
    } }; }
    function Oe(n, t, e, r) { function u(r, u) { return fa(r[0] - n) < Ta ? u > 0 ? 0 : 3 : fa(r[0] - e) < Ta ? u > 0 ? 2 : 1 : fa(r[1] - t) < Ta ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2; } function i(n, t) { return o(n.x, t.x); } function o(n, t) { var e = u(n, 1), r = u(t, 1); return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0]; } return function (a) { function c(n) { for (var t = 0, e = d.length, r = n[1], u = 0; e > u; ++u)
        for (var i, o = 1, a = d[u], c = a.length, s = a[0]; c > o; ++o)
            i = a[o], s[1] <= r ? i[1] > r && J(s, i, n) > 0 && ++t : i[1] <= r && J(s, i, n) < 0 && --t, s = i; return 0 !== t; } function s(i, a, c, s) { var l = 0, f = 0; if (null == i || (l = u(i, c)) !== (f = u(a, c)) || o(i, a) < 0 ^ c > 0) {
        do
            s.point(0 === l || 3 === l ? n : e, l > 1 ? r : t);
        while ((l = (l + c + 4) % 4) !== f);
    }
    else
        s.point(a[0], a[1]); } function l(u, i) { return u >= n && e >= u && i >= t && r >= i; } function f(n, t) { l(n, t) && a.point(n, t); } function h() { N.point = p, d && d.push(m = []), S = !0, w = !1, _ = b = 0 / 0; } function g() { v && (p(y, x), M && w && A.rejoin(), v.push(A.buffer())), N.point = f, w && a.lineEnd(); } function p(n, t) { n = Math.max(-Tc, Math.min(Tc, n)), t = Math.max(-Tc, Math.min(Tc, t)); var e = l(n, t); if (d && m.push([n, t]), S)
        y = n, x = t, M = e, S = !1, e && (a.lineStart(), a.point(n, t));
    else if (e && w)
        a.point(n, t);
    else {
        var r = { a: { x: _, y: b }, b: { x: n, y: t } };
        C(r) ? (w || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), k = !1) : e && (a.lineStart(), a.point(n, t), k = !1);
    } _ = n, b = t, w = e; } var v, d, m, y, x, M, _, b, w, S, k, E = a, A = ze(), C = Fe(n, t, e, r), N = { point: f, lineStart: h, lineEnd: g, polygonStart: function () { a = A, v = [], d = [], k = !0; }, polygonEnd: function () { a = E, v = Go.merge(v); var t = c([n, r]), e = k && t, u = v.length; (e || u) && (a.polygonStart(), e && (a.lineStart(), s(null, null, 1, a), a.lineEnd()), u && Ce(v, i, t, s, a), a.polygonEnd()), v = d = m = null; } }; return N; }; }
    function Ie(n, t) { function e(e, r) { return e = n(e, r), t(e[0], e[1]); } return n.invert && t.invert && (e.invert = function (e, r) { return e = t.invert(e, r), e && n.invert(e[0], e[1]); }), e; }
    function Ye(n) { var t = 0, e = Ca / 3, r = ir(n), u = r(t, e); return u.parallels = function (n) { return arguments.length ? r(t = n[0] * Ca / 180, e = n[1] * Ca / 180) : [180 * (t / Ca), 180 * (e / Ca)]; }, u; }
    function Ze(n, t) { function e(n, t) { var e = Math.sqrt(i - 2 * u * Math.sin(t)) / u; return [e * Math.sin(n *= u), o - e * Math.cos(n)]; } var r = Math.sin(n), u = (r + Math.sin(t)) / 2, i = 1 + r * (2 * u - r), o = Math.sqrt(i) / u; return e.invert = function (n, t) { var e = o - t; return [Math.atan2(n, e) / u, G((i - (n * n + e * e) * u * u) / (2 * u))]; }, e; }
    function Ve() { function n(n, t) { zc += u * n - r * t, r = n, u = t; } var t, e, r, u; jc.point = function (i, o) { jc.point = n, t = r = i, e = u = o; }, jc.lineEnd = function () { n(t, e); }; }
    function $e(n, t) { Rc > n && (Rc = n), n > Pc && (Pc = n), Dc > t && (Dc = t), t > Uc && (Uc = t); }
    function Xe() { function n(n, t) { o.push("M", n, ",", t, i); } function t(n, t) { o.push("M", n, ",", t), a.point = e; } function e(n, t) { o.push("L", n, ",", t); } function r() { a.point = n; } function u() { o.push("Z"); } var i = Be(4.5), o = [], a = { point: n, lineStart: function () { a.point = t; }, lineEnd: r, polygonStart: function () { a.lineEnd = u; }, polygonEnd: function () { a.lineEnd = r, a.point = n; }, pointRadius: function (n) { return i = Be(n), a; }, result: function () { if (o.length) {
            var n = o.join("");
            return o = [], n;
        } } }; return a; }
    function Be(n) { return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z"; }
    function Je(n, t) { Mc += n, _c += t, ++bc; }
    function We() { function n(n, r) { var u = n - t, i = r - e, o = Math.sqrt(u * u + i * i); wc += o * (t + n) / 2, Sc += o * (e + r) / 2, kc += o, Je(t = n, e = r); } var t, e; Fc.point = function (r, u) { Fc.point = n, Je(t = r, e = u); }; }
    function Ge() { Fc.point = Je; }
    function Ke() { function n(n, t) { var e = n - r, i = t - u, o = Math.sqrt(e * e + i * i); wc += o * (r + n) / 2, Sc += o * (u + t) / 2, kc += o, o = u * n - r * t, Ec += o * (r + n), Ac += o * (u + t), Cc += 3 * o, Je(r = n, u = t); } var t, e, r, u; Fc.point = function (i, o) { Fc.point = n, Je(t = r = i, e = u = o); }, Fc.lineEnd = function () { n(t, e); }; }
    function Qe(n) { function t(t, e) { n.moveTo(t, e), n.arc(t, e, o, 0, Na); } function e(t, e) { n.moveTo(t, e), a.point = r; } function r(t, e) { n.lineTo(t, e); } function u() { a.point = t; } function i() { n.closePath(); } var o = 4.5, a = { point: t, lineStart: function () { a.point = e; }, lineEnd: u, polygonStart: function () { a.lineEnd = i; }, polygonEnd: function () { a.lineEnd = u, a.point = t; }, pointRadius: function (n) { return o = n, a; }, result: v }; return a; }
    function nr(n) { function t(n) { return (a ? r : e)(n); } function e(t) { return rr(t, function (e, r) { e = n(e, r), t.point(e[0], e[1]); }); } function r(t) { function e(e, r) { e = n(e, r), t.point(e[0], e[1]); } function r() { x = 0 / 0, S.point = i, t.lineStart(); } function i(e, r) { var i = pe([e, r]), o = n(e, r); u(x, M, y, _, b, w, x = o[0], M = o[1], y = e, _ = i[0], b = i[1], w = i[2], a, t), t.point(x, M); } function o() { S.point = e, t.lineEnd(); } function c() { r(), S.point = s, S.lineEnd = l; } function s(n, t) { i(f = n, h = t), g = x, p = M, v = _, d = b, m = w, S.point = i; } function l() { u(x, M, y, _, b, w, g, p, f, v, d, m, a, t), S.lineEnd = o, o(); } var f, h, g, p, v, d, m, y, x, M, _, b, w, S = { point: e, lineStart: r, lineEnd: o, polygonStart: function () { t.polygonStart(), S.lineStart = c; }, polygonEnd: function () { t.polygonEnd(), S.lineStart = r; } }; return S; } function u(t, e, r, a, c, s, l, f, h, g, p, v, d, m) { var y = l - t, x = f - e, M = y * y + x * x; if (M > 4 * i && d--) {
        var _ = a + g, b = c + p, w = s + v, S = Math.sqrt(_ * _ + b * b + w * w), k = Math.asin(w /= S), E = fa(fa(w) - 1) < Ta || fa(r - h) < Ta ? (r + h) / 2 : Math.atan2(b, _), A = n(E, k), C = A[0], N = A[1], L = C - t, T = N - e, q = x * L - y * T;
        (q * q / M > i || fa((y * L + x * T) / M - .5) > .3 || o > a * g + c * p + s * v) && (u(t, e, r, a, c, s, C, N, E, _ /= S, b /= S, w, d, m), m.point(C, N), u(C, N, E, _, b, w, l, f, h, g, p, v, d, m));
    } } var i = .5, o = Math.cos(30 * za), a = 16; return t.precision = function (n) { return arguments.length ? (a = (i = n * n) > 0 && 16, t) : Math.sqrt(i); }, t; }
    function tr(n) { var t = nr(function (t, e) { return n([t * Ra, e * Ra]); }); return function (n) { return or(t(n)); }; }
    function er(n) { this.stream = n; }
    function rr(n, t) { return { point: t, sphere: function () { n.sphere(); }, lineStart: function () { n.lineStart(); }, lineEnd: function () { n.lineEnd(); }, polygonStart: function () { n.polygonStart(); }, polygonEnd: function () { n.polygonEnd(); } }; }
    function ur(n) { return ir(function () { return n; })(); }
    function ir(n) {
        function t(n) { return n = a(n[0] * za, n[1] * za), [n[0] * h + c, s - n[1] * h]; }
        function e(n) { return n = a.invert((n[0] - c) / h, (s - n[1]) / h), n && [n[0] * Ra, n[1] * Ra]; }
        function r() {
            a = Ie(o = sr(m, y, x), i);
            var n = i(v, d);
            return c = g - n[0] * h, s = p + n[1] * h, u();
        }
        function u() { return l && (l.valid = !1, l = null), t; }
        var i, o, a, c, s, l, f = nr(function (n, t) { return n = i(n, t), [n[0] * h + c, s - n[1] * h]; }), h = 150, g = 480, p = 250, v = 0, d = 0, m = 0, y = 0, x = 0, M = Lc, _ = At, b = null, w = null;
        return t.stream = function (n) { return l && (l.valid = !1), l = or(M(o, f(_(n)))), l.valid = !0, l; }, t.clipAngle = function (n) { return arguments.length ? (M = null == n ? (b = n, Lc) : He((b = +n) * za), u()) : b; }, t.clipExtent = function (n) { return arguments.length ? (w = n, _ = n ? Oe(n[0][0], n[0][1], n[1][0], n[1][1]) : At, u()) : w; }, t.scale = function (n) { return arguments.length ? (h = +n, r()) : h; }, t.translate = function (n) { return arguments.length ? (g = +n[0], p = +n[1], r()) : [g, p]; }, t.center = function (n) { return arguments.length ? (v = n[0] % 360 * za, d = n[1] % 360 * za, r()) : [v * Ra, d * Ra]; }, t.rotate = function (n) { return arguments.length ? (m = n[0] % 360 * za, y = n[1] % 360 * za, x = n.length > 2 ? n[2] % 360 * za : 0, r()) : [m * Ra, y * Ra, x * Ra]; }, Go.rebind(t, f, "precision"), function () { return i = n.apply(this, arguments), t.invert = i.invert && e, r(); };
    }
    function or(n) { return rr(n, function (t, e) { n.point(t * za, e * za); }); }
    function ar(n, t) { return [n, t]; }
    function cr(n, t) { return [n > Ca ? n - Na : -Ca > n ? n + Na : n, t]; }
    function sr(n, t, e) { return n ? t || e ? Ie(fr(n), hr(t, e)) : fr(n) : t || e ? hr(t, e) : cr; }
    function lr(n) { return function (t, e) { return t += n, [t > Ca ? t - Na : -Ca > t ? t + Na : t, e]; }; }
    function fr(n) { var t = lr(n); return t.invert = lr(-n), t; }
    function hr(n, t) { function e(n, t) { var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * r + a * u; return [Math.atan2(c * i - l * o, a * r - s * u), G(l * i + c * o)]; } var r = Math.cos(n), u = Math.sin(n), i = Math.cos(t), o = Math.sin(t); return e.invert = function (n, t) { var e = Math.cos(t), a = Math.cos(n) * e, c = Math.sin(n) * e, s = Math.sin(t), l = s * i - c * o; return [Math.atan2(c * i + s * o, a * r + l * u), G(l * r - a * u)]; }, e; }
    function gr(n, t) { var e = Math.cos(n), r = Math.sin(n); return function (u, i, o, a) { var c = o * t; null != u ? (u = pr(e, u), i = pr(e, i), (o > 0 ? i > u : u > i) && (u += o * Na)) : (u = n + o * Na, i = n - .5 * c); for (var s, l = u; o > 0 ? l > i : i > l; l -= c)
        a.point((s = Me([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], s[1]); }; }
    function pr(n, t) { var e = pe(t); e[0] -= n, xe(e); var r = W(-e[1]); return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Ta) % (2 * Math.PI); }
    function vr(n, t, e) { var r = Go.range(n, t - Ta, e).concat(t); return function (n) { return r.map(function (t) { return [n, t]; }); }; }
    function dr(n, t, e) { var r = Go.range(n, t - Ta, e).concat(t); return function (n) { return r.map(function (t) { return [t, n]; }); }; }
    function mr(n) { return n.source; }
    function yr(n) { return n.target; }
    function xr(n, t, e, r) { var u = Math.cos(t), i = Math.sin(t), o = Math.cos(r), a = Math.sin(r), c = u * Math.cos(n), s = u * Math.sin(n), l = o * Math.cos(e), f = o * Math.sin(e), h = 2 * Math.asin(Math.sqrt(tt(r - t) + u * o * tt(e - n))), g = 1 / Math.sin(h), p = h ? function (n) { var t = Math.sin(n *= h) * g, e = Math.sin(h - n) * g, r = e * c + t * l, u = e * s + t * f, o = e * i + t * a; return [Math.atan2(u, r) * Ra, Math.atan2(o, Math.sqrt(r * r + u * u)) * Ra]; } : function () { return [n * Ra, t * Ra]; }; return p.distance = h, p; }
    function Mr() { function n(n, u) { var i = Math.sin(u *= za), o = Math.cos(u), a = fa((n *= za) - t), c = Math.cos(a); Oc += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * i - e * o * c) * a), e * i + r * o * c), t = n, e = i, r = o; } var t, e, r; Ic.point = function (u, i) { t = u * za, e = Math.sin(i *= za), r = Math.cos(i), Ic.point = n; }, Ic.lineEnd = function () { Ic.point = Ic.lineEnd = v; }; }
    function _r(n, t) { function e(t, e) { var r = Math.cos(t), u = Math.cos(e), i = n(r * u); return [i * u * Math.sin(t), i * Math.sin(e)]; } return e.invert = function (n, e) { var r = Math.sqrt(n * n + e * e), u = t(r), i = Math.sin(u), o = Math.cos(u); return [Math.atan2(n * i, r * o), Math.asin(r && e * i / r)]; }, e; }
    function br(n, t) { function e(n, t) { o > 0 ? -La + Ta > t && (t = -La + Ta) : t > La - Ta && (t = La - Ta); var e = o / Math.pow(u(t), i); return [e * Math.sin(i * n), o - e * Math.cos(i * n)]; } var r = Math.cos(n), u = function (n) { return Math.tan(Ca / 4 + n / 2); }, i = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(u(t) / u(n)), o = r * Math.pow(u(n), i) / i; return i ? (e.invert = function (n, t) { var e = o - t, r = B(i) * Math.sqrt(n * n + e * e); return [Math.atan2(n, e) / i, 2 * Math.atan(Math.pow(o / r, 1 / i)) - La]; }, e) : Sr; }
    function wr(n, t) { function e(n, t) { var e = i - t; return [e * Math.sin(u * n), i - e * Math.cos(u * n)]; } var r = Math.cos(n), u = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n), i = r / u + n; return fa(u) < Ta ? ar : (e.invert = function (n, t) { var e = i - t; return [Math.atan2(n, e) / u, i - B(u) * Math.sqrt(n * n + e * e)]; }, e); }
    function Sr(n, t) { return [n, Math.log(Math.tan(Ca / 4 + t / 2))]; }
    function kr(n) { var t, e = ur(n), r = e.scale, u = e.translate, i = e.clipExtent; return e.scale = function () { var n = r.apply(e, arguments); return n === e ? t ? e.clipExtent(null) : e : n; }, e.translate = function () { var n = u.apply(e, arguments); return n === e ? t ? e.clipExtent(null) : e : n; }, e.clipExtent = function (n) { var o = i.apply(e, arguments); if (o === e) {
        if (t = null == n) {
            var a = Ca * r(), c = u();
            i([[c[0] - a, c[1] - a], [c[0] + a, c[1] + a]]);
        }
    }
    else
        t && (o = null); return o; }, e.clipExtent(null); }
    function Er(n, t) { return [Math.log(Math.tan(Ca / 4 + t / 2)), -n]; }
    function Ar(n) { return n[0]; }
    function Cr(n) { return n[1]; }
    function Nr(n) { for (var t = n.length, e = [0, 1], r = 2, u = 2; t > u; u++) {
        for (; r > 1 && J(n[e[r - 2]], n[e[r - 1]], n[u]) <= 0;)
            --r;
        e[r++] = u;
    } return e.slice(0, r); }
    function Lr(n, t) { return n[0] - t[0] || n[1] - t[1]; }
    function Tr(n, t, e) { return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]); }
    function qr(n, t, e, r) { var u = n[0], i = e[0], o = t[0] - u, a = r[0] - i, c = n[1], s = e[1], l = t[1] - c, f = r[1] - s, h = (a * (c - s) - f * (u - i)) / (f * o - a * l); return [u + h * o, c + h * l]; }
    function zr(n) { var t = n[0], e = n[n.length - 1]; return !(t[0] - e[0] || t[1] - e[1]); }
    function Rr() { tu(this), this.link = this.site = this.circle = null; }
    function Dr(n) { var t = ns.pop() || new Rr; return t.site = n, t; }
    function Pr(n) { $r(n), Gc.remove(n), ns.push(n), tu(n); }
    function Ur(n) { var t = n.circle, e = t.x, r = t.cy, u = { x: e, y: r }, i = n.P, o = n.N, a = [n]; Pr(n); for (var c = i; c.circle && fa(e - c.circle.x) < Ta && fa(r - c.circle.cy) < Ta;)
        i = c.P, a.unshift(c), Pr(c), c = i; a.unshift(c), $r(c); for (var s = o; s.circle && fa(e - s.circle.x) < Ta && fa(r - s.circle.cy) < Ta;)
        o = s.N, a.push(s), Pr(s), s = o; a.push(s), $r(s); var l, f = a.length; for (l = 1; f > l; ++l)
        s = a[l], c = a[l - 1], Kr(s.link, c.site, s.site, u); c = a[0], s = a[f - 1], s.link = Wr(c.site, s.site, null, u), Vr(c), Vr(s); }
    function jr(n) { for (var t, e, r, u, i = n.x, o = n.y, a = Gc._; a;)
        if (r = Hr(a, o) - i, r > Ta)
            a = a.L;
        else {
            if (u = i - Fr(a, o), !(u > Ta)) {
                r > -Ta ? (t = a.P, e = a) : u > -Ta ? (t = a, e = a.N) : t = e = a;
                break;
            }
            if (!a.R) {
                t = a;
                break;
            }
            a = a.R;
        } var c = Dr(n); if (Gc.insert(t, c), t || e) {
        if (t === e)
            return $r(t), e = Dr(t.site), Gc.insert(c, e), c.link = e.link = Wr(t.site, c.site), Vr(t), Vr(e), void 0;
        if (!e)
            return c.link = Wr(t.site, c.site), void 0;
        $r(t), $r(e);
        var s = t.site, l = s.x, f = s.y, h = n.x - l, g = n.y - f, p = e.site, v = p.x - l, d = p.y - f, m = 2 * (h * d - g * v), y = h * h + g * g, x = v * v + d * d, M = { x: (d * y - g * x) / m + l, y: (h * x - v * y) / m + f };
        Kr(e.link, s, p, M), c.link = Wr(s, n, null, M), e.link = Wr(n, p, null, M), Vr(t), Vr(e);
    } }
    function Hr(n, t) { var e = n.site, r = e.x, u = e.y, i = u - t; if (!i)
        return r; var o = n.P; if (!o)
        return -1 / 0; e = o.site; var a = e.x, c = e.y, s = c - t; if (!s)
        return a; var l = a - r, f = 1 / i - 1 / s, h = l / s; return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + u - i / 2))) / f + r : (r + a) / 2; }
    function Fr(n, t) { var e = n.N; if (e)
        return Hr(e, t); var r = n.site; return r.y === t ? r.x : 1 / 0; }
    function Or(n) { this.site = n, this.links = []; }
    function Ir(n) { for (var t, e, r, u, i, o, a, c, s, l, f = n[0][0], h = n[1][0], g = n[0][1], p = n[1][1], v = Wc, d = v.length; d--;)
        if (i = v[d], i && i.prepare())
            for (a = i.links, c = a.length, o = 0; c > o;)
                l = a[o].end(), r = l.x, u = l.y, s = a[++o % c].start(), t = s.x, e = s.y, (fa(r - t) > Ta || fa(u - e) > Ta) && (a.splice(o, 0, new Qr(Gr(i.site, l, fa(r - f) < Ta && p - u > Ta ? { x: f, y: fa(t - f) < Ta ? e : p } : fa(u - p) < Ta && h - r > Ta ? { x: fa(e - p) < Ta ? t : h, y: p } : fa(r - h) < Ta && u - g > Ta ? { x: h, y: fa(t - h) < Ta ? e : g } : fa(u - g) < Ta && r - f > Ta ? { x: fa(e - g) < Ta ? t : f, y: g } : null), i.site, null)), ++c); }
    function Yr(n, t) { return t.angle - n.angle; }
    function Zr() { tu(this), this.x = this.y = this.arc = this.site = this.cy = null; }
    function Vr(n) { var t = n.P, e = n.N; if (t && e) {
        var r = t.site, u = n.site, i = e.site;
        if (r !== i) {
            var o = u.x, a = u.y, c = r.x - o, s = r.y - a, l = i.x - o, f = i.y - a, h = 2 * (c * f - s * l);
            if (!(h >= -qa)) {
                var g = c * c + s * s, p = l * l + f * f, v = (f * g - s * p) / h, d = (c * p - l * g) / h, f = d + a, m = ts.pop() || new Zr;
                m.arc = n, m.site = u, m.x = v + o, m.y = f + Math.sqrt(v * v + d * d), m.cy = f, n.circle = m;
                for (var y = null, x = Qc._; x;)
                    if (m.y < x.y || m.y === x.y && m.x <= x.x) {
                        if (!x.L) {
                            y = x.P;
                            break;
                        }
                        x = x.L;
                    }
                    else {
                        if (!x.R) {
                            y = x;
                            break;
                        }
                        x = x.R;
                    }
                Qc.insert(y, m), y || (Kc = m);
            }
        }
    } }
    function $r(n) { var t = n.circle; t && (t.P || (Kc = t.N), Qc.remove(t), ts.push(t), tu(t), n.circle = null); }
    function Xr(n) { for (var t, e = Jc, r = Fe(n[0][0], n[0][1], n[1][0], n[1][1]), u = e.length; u--;)
        t = e[u], (!Br(t, n) || !r(t) || fa(t.a.x - t.b.x) < Ta && fa(t.a.y - t.b.y) < Ta) && (t.a = t.b = null, e.splice(u, 1)); }
    function Br(n, t) { var e = n.b; if (e)
        return !0; var r, u, i = n.a, o = t[0][0], a = t[1][0], c = t[0][1], s = t[1][1], l = n.l, f = n.r, h = l.x, g = l.y, p = f.x, v = f.y, d = (h + p) / 2, m = (g + v) / 2; if (v === g) {
        if (o > d || d >= a)
            return;
        if (h > p) {
            if (i) {
                if (i.y >= s)
                    return;
            }
            else
                i = { x: d, y: c };
            e = { x: d, y: s };
        }
        else {
            if (i) {
                if (i.y < c)
                    return;
            }
            else
                i = { x: d, y: s };
            e = { x: d, y: c };
        }
    }
    else if (r = (h - p) / (v - g), u = m - r * d, -1 > r || r > 1)
        if (h > p) {
            if (i) {
                if (i.y >= s)
                    return;
            }
            else
                i = { x: (c - u) / r, y: c };
            e = { x: (s - u) / r, y: s };
        }
        else {
            if (i) {
                if (i.y < c)
                    return;
            }
            else
                i = { x: (s - u) / r, y: s };
            e = { x: (c - u) / r, y: c };
        }
    else if (v > g) {
        if (i) {
            if (i.x >= a)
                return;
        }
        else
            i = { x: o, y: r * o + u };
        e = { x: a, y: r * a + u };
    }
    else {
        if (i) {
            if (i.x < o)
                return;
        }
        else
            i = { x: a, y: r * a + u };
        e = { x: o, y: r * o + u };
    } return n.a = i, n.b = e, !0; }
    function Jr(n, t) { this.l = n, this.r = t, this.a = this.b = null; }
    function Wr(n, t, e, r) { var u = new Jr(n, t); return Jc.push(u), e && Kr(u, n, t, e), r && Kr(u, t, n, r), Wc[n.i].links.push(new Qr(u, n, t)), Wc[t.i].links.push(new Qr(u, t, n)), u; }
    function Gr(n, t, e) { var r = new Jr(n, null); return r.a = t, r.b = e, Jc.push(r), r; }
    function Kr(n, t, e, r) { n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e); }
    function Qr(n, t, e) { var r = n.a, u = n.b; this.link = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(u.x - r.x, r.y - u.y) : Math.atan2(r.x - u.x, u.y - r.y); }
    function nu() { this._ = null; }
    function tu(n) { n.U = n.C = n.L = n.R = n.P = n.N = null; }
    function eu(n, t) { var e = t, r = t.R, u = e.U; u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e; }
    function ru(n, t) { var e = t, r = t.L, u = e.U; u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e; }
    function uu(n) { for (; n.L;)
        n = n.L; return n; }
    function iu(n, t) { var e, r, u, i = n.sort(ou).pop(); for (Jc = [], Wc = new Array(n.length), Gc = new nu, Qc = new nu;;)
        if (u = Kc, i && (!u || i.y < u.y || i.y === u.y && i.x < u.x))
            (i.x !== e || i.y !== r) && (Wc[i.i] = new Or(i), jr(i), e = i.x, r = i.y), i = n.pop();
        else {
            if (!u)
                break;
            Ur(u.arc);
        } t && (Xr(t), Ir(t)); var o = { cells: Wc, links: Jc }; return Gc = Qc = Jc = Wc = null, o; }
    function ou(n, t) { return t.y - n.y || t.x - n.x; }
    function au(n, t, e) { return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y); }
    function cu(n) { return n.x; }
    function su(n) { return n.y; }
    function lu() { return { leaf: !0, nodes: [], point: null, x: null, y: null }; }
    function fu(n, t, e, r, u, i) { if (!n(t, e, r, u, i)) {
        var o = .5 * (e + u), a = .5 * (r + i), c = t.nodes;
        c[0] && fu(n, c[0], e, r, o, a), c[1] && fu(n, c[1], o, r, u, a), c[2] && fu(n, c[2], e, a, o, i), c[3] && fu(n, c[3], o, a, u, i);
    } }
    function hu(n, t) { n = Go.rgb(n), t = Go.rgb(t); var e = n.r, r = n.g, u = n.b, i = t.r - e, o = t.g - r, a = t.b - u; return function (n) { return "#" + Mt(Math.round(e + i * n)) + Mt(Math.round(r + o * n)) + Mt(Math.round(u + a * n)); }; }
    function gu(n, t) { var e, r = {}, u = {}; for (e in n)
        e in t ? r[e] = du(n[e], t[e]) : u[e] = n[e]; for (e in t)
        e in n || (u[e] = t[e]); return function (n) { for (e in r)
        u[e] = r[e](n); return u; }; }
    function pu(n, t) { return t -= n = +n, function (e) { return n + t * e; }; }
    function vu(n, t) { var e, r, u, i = rs.lastIndex = us.lastIndex = 0, o = -1, a = [], c = []; for (n += "", t += ""; (e = rs.exec(n)) && (r = us.exec(t));)
        (u = r.index) > i && (u = t.substring(i, u), a[o] ? a[o] += u : a[++o] = u), (e = e[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, c.push({ i: o, x: pu(e, r) })), i = us.lastIndex; return i < t.length && (u = t.substring(i), a[o] ? a[o] += u : a[++o] = u), a.length < 2 ? c[0] ? (t = c[0].x, function (n) { return t(n) + ""; }) : function () { return t; } : (t = c.length, function (n) { for (var e, r = 0; t > r; ++r)
        a[(e = c[r]).i] = e.x(n); return a.join(""); }); }
    function du(n, t) { for (var e, r = Go.interpolators.length; --r >= 0 && !(e = Go.interpolators[r](n, t));)
        ; return e; }
    function mu(n, t) { var e, r = [], u = [], i = n.length, o = t.length, a = Math.min(n.length, t.length); for (e = 0; a > e; ++e)
        r.push(du(n[e], t[e])); for (; i > e; ++e)
        u[e] = n[e]; for (; o > e; ++e)
        u[e] = t[e]; return function (n) { for (e = 0; a > e; ++e)
        u[e] = r[e](n); return u; }; }
    function yu(n) { return function (t) { return 0 >= t ? 0 : t >= 1 ? 1 : n(t); }; }
    function xu(n) { return function (t) { return 1 - n(1 - t); }; }
    function Mu(n) { return function (t) { return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t)); }; }
    function _u(n) { return n * n; }
    function bu(n) { return n * n * n; }
    function wu(n) { if (0 >= n)
        return 0; if (n >= 1)
        return 1; var t = n * n, e = t * n; return 4 * (.5 > n ? e : 3 * (n - t) + e - .75); }
    function Su(n) { return function (t) { return Math.pow(t, n); }; }
    function ku(n) { return 1 - Math.cos(n * La); }
    function Eu(n) { return Math.pow(2, 10 * (n - 1)); }
    function Au(n) { return 1 - Math.sqrt(1 - n * n); }
    function Cu(n, t) { var e; return arguments.length < 2 && (t = .45), arguments.length ? e = t / Na * Math.asin(1 / n) : (n = 1, e = t / 4), function (r) { return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * Na / t); }; }
    function Nu(n) { return n || (n = 1.70158), function (t) { return t * t * ((n + 1) * t - n); }; }
    function Lu(n) { return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375; }
    function Tu(n, t) { n = Go.hcl(n), t = Go.hcl(t); var e = n.h, r = n.c, u = n.l, i = t.h - e, o = t.c - r, a = t.l - u; return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) { return ct(e + i * n, r + o * n, u + a * n) + ""; }; }
    function qu(n, t) { n = Go.hsl(n), t = Go.hsl(t); var e = n.h, r = n.s, u = n.l, i = t.h - e, o = t.s - r, a = t.l - u; return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360), function (n) { return it(e + i * n, r + o * n, u + a * n) + ""; }; }
    function zu(n, t) { n = Go.lab(n), t = Go.lab(t); var e = n.l, r = n.a, u = n.b, i = t.l - e, o = t.a - r, a = t.b - u; return function (n) { return ft(e + i * n, r + o * n, u + a * n) + ""; }; }
    function Ru(n, t) { return t -= n, function (e) { return Math.round(n + t * e); }; }
    function Du(n) { var t = [n.a, n.b], e = [n.c, n.d], r = Uu(t), u = Pu(t, e), i = Uu(ju(e, t, -u)) || 0; t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Ra, this.translate = [n.e, n.f], this.scale = [r, i], this.skew = i ? Math.atan2(u, i) * Ra : 0; }
    function Pu(n, t) { return n[0] * t[0] + n[1] * t[1]; }
    function Uu(n) { var t = Math.sqrt(Pu(n, n)); return t && (n[0] /= t, n[1] /= t), t; }
    function ju(n, t, e) { return n[0] += e * t[0], n[1] += e * t[1], n; }
    function Hu(n, t) { var e, r = [], u = [], i = Go.transform(n), o = Go.transform(t), a = i.translate, c = o.translate, s = i.rotate, l = o.rotate, f = i.skew, h = o.skew, g = i.scale, p = o.scale; return a[0] != c[0] || a[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), u.push({ i: 1, x: pu(a[0], c[0]) }, { i: 3, x: pu(a[1], c[1]) })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), s != l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), u.push({ i: r.push(r.pop() + "rotate(", null, ")") - 2, x: pu(s, l) })) : l && r.push(r.pop() + "rotate(" + l + ")"), f != h ? u.push({ i: r.push(r.pop() + "skewX(", null, ")") - 2, x: pu(f, h) }) : h && r.push(r.pop() + "skewX(" + h + ")"), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), u.push({ i: e - 4, x: pu(g[0], p[0]) }, { i: e - 2, x: pu(g[1], p[1]) })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"), e = u.length, function (n) { for (var t, i = -1; ++i < e;)
        r[(t = u[i]).i] = t.x(n); return r.join(""); }; }
    function Fu(n, t) { return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) { return (e - n) * t; }; }
    function Ou(n, t) { return t = t - (n = +n) ? 1 / (t - n) : 0, function (e) { return Math.max(0, Math.min(1, (e - n) * t)); }; }
    function Iu(n) { for (var t = n.source, e = n.target, r = Zu(t, e), u = [t]; t !== r;)
        t = t.parent, u.push(t); for (var i = u.length; e !== r;)
        u.splice(i, 0, e), e = e.parent; return u; }
    function Yu(n) { for (var t = [], e = n.parent; null != e;)
        t.push(n), n = e, e = e.parent; return t.push(n), t; }
    function Zu(n, t) { if (n === t)
        return n; for (var e = Yu(n), r = Yu(t), u = e.pop(), i = r.pop(), o = null; u === i;)
        o = u, u = e.pop(), i = r.pop(); return o; }
    function Vu(n) { n.fixed |= 2; }
    function $u(n) { n.fixed &= -7; }
    function Xu(n) { n.fixed |= 4, n.px = n.x, n.py = n.y; }
    function Bu(n) { n.fixed &= -5; }
    function Ju(n, t, e) { var r = 0, u = 0; if (n.charge = 0, !n.leaf)
        for (var i, o = n.nodes, a = o.length, c = -1; ++c < a;)
            i = o[c], null != i && (Ju(i, t, e), n.charge += i.charge, r += i.charge * i.cx, u += i.charge * i.cy); if (n.point) {
        n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
        var s = t * e[n.point.index];
        n.charge += n.pointCharge = s, r += s * n.point.x, u += s * n.point.y;
    } n.cx = r / n.charge, n.cy = u / n.charge; }
    function Wu(n, t) { return Go.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = ni, n; }
    function Gu(n) { return n.children; }
    function Ku(n) { return n.value; }
    function Qu(n, t) { return t.value - n.value; }
    function ni(n) { return Go.merge(n.map(function (n) { return (n.children || []).map(function (t) { return { source: n, target: t }; }); })); }
    function ti(n) { return n.x; }
    function ei(n) { return n.y; }
    function ri(n, t, e) { n.y0 = t, n.y = e; }
    function ui(n) { return Go.range(n.length); }
    function ii(n) { for (var t = -1, e = n[0].length, r = []; ++t < e;)
        r[t] = 0; return r; }
    function oi(n) { for (var t, e = 1, r = 0, u = n[0][1], i = n.length; i > e; ++e)
        (t = n[e][1]) > u && (r = e, u = t); return r; }
    function ai(n) { return n.reduce(ci, 0); }
    function ci(n, t) { return n + t[1]; }
    function si(n, t) { return li(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1)); }
    function li(n, t) { for (var e = -1, r = +n[0], u = (n[1] - r) / t, i = []; ++e <= t;)
        i[e] = u * e + r; return i; }
    function fi(n) { return [Go.min(n), Go.max(n)]; }
    function hi(n, t) { return n.parent == t.parent ? 1 : 2; }
    function gi(n) { var t = n.children; return t && t.length ? t[0] : n._tree.thread; }
    function pi(n) { var t, e = n.children; return e && (t = e.length) ? e[t - 1] : n._tree.thread; }
    function vi(n, t) { var e = n.children; if (e && (u = e.length))
        for (var r, u, i = -1; ++i < u;)
            t(r = vi(e[i], t), n) > 0 && (n = r); return n; }
    function di(n, t) { return n.x - t.x; }
    function mi(n, t) { return t.x - n.x; }
    function yi(n, t) { return n.depth - t.depth; }
    function xi(n, t) { function e(n, r) { var u = n.children; if (u && (o = u.length))
        for (var i, o, a = null, c = -1; ++c < o;)
            i = u[c], e(i, a), a = i; t(n, r); } e(n, null); }
    function Mi(n) { for (var t, e = 0, r = 0, u = n.children, i = u.length; --i >= 0;)
        t = u[i]._tree, t.prelim += e, t.mod += e, e += t.shift + (r += t.change); }
    function _i(n, t, e) { n = n._tree, t = t._tree; var r = e / (t.number - n.number); n.change += r, t.change -= r, t.shift += e, t.prelim += e, t.mod += e; }
    function bi(n, t, e) { return n._tree.ancestor.parent == t.parent ? n._tree.ancestor : e; }
    function wi(n, t) { return n.value - t.value; }
    function Si(n, t) { var e = n._pack_next; n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t; }
    function ki(n, t) { n._pack_next = t, t._pack_prev = n; }
    function Ei(n, t) { var e = t.x - n.x, r = t.y - n.y, u = n.r + t.r; return .999 * u * u > e * e + r * r; }
    function Ai(n) { function t(n) { l = Math.min(n.x - n.r, l), f = Math.max(n.x + n.r, f), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g); } if ((e = n.children) && (s = e.length)) {
        var e, r, u, i, o, a, c, s, l = 1 / 0, f = -1 / 0, h = 1 / 0, g = -1 / 0;
        if (e.forEach(Ci), r = e[0], r.x = -r.r, r.y = 0, t(r), s > 1 && (u = e[1], u.x = u.r, u.y = 0, t(u), s > 2))
            for (i = e[2], Ti(r, u, i), t(i), Si(r, i), r._pack_prev = i, Si(i, u), u = r._pack_next, o = 3; s > o; o++) {
                Ti(r, u, i = e[o]);
                var p = 0, v = 1, d = 1;
                for (a = u._pack_next; a !== u; a = a._pack_next, v++)
                    if (Ei(a, i)) {
                        p = 1;
                        break;
                    }
                if (1 == p)
                    for (c = r._pack_prev; c !== a._pack_prev && !Ei(c, i); c = c._pack_prev, d++)
                        ;
                p ? (d > v || v == d && u.r < r.r ? ki(r, u = a) : ki(r = c, u), o--) : (Si(r, i), u = i, t(i));
            }
        var m = (l + f) / 2, y = (h + g) / 2, x = 0;
        for (o = 0; s > o; o++)
            i = e[o], i.x -= m, i.y -= y, x = Math.max(x, i.r + Math.sqrt(i.x * i.x + i.y * i.y));
        n.r = x, e.forEach(Ni);
    } }
    function Ci(n) { n._pack_next = n._pack_prev = n; }
    function Ni(n) { delete n._pack_next, delete n._pack_prev; }
    function Li(n, t, e, r) { var u = n.children; if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, u)
        for (var i = -1, o = u.length; ++i < o;)
            Li(u[i], t, e, r); }
    function Ti(n, t, e) { var r = n.r + e.r, u = t.x - n.x, i = t.y - n.y; if (r && (u || i)) {
        var o = t.r + e.r, a = u * u + i * i;
        o *= o, r *= r;
        var c = .5 + (r - o) / (2 * a), s = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a);
        e.x = n.x + c * u + s * i, e.y = n.y + c * i - s * u;
    }
    else
        e.x = n.x + r, e.y = n.y; }
    function qi(n) { return 1 + Go.max(n, function (n) { return n.y; }); }
    function zi(n) { return n.reduce(function (n, t) { return n + t.x; }, 0) / n.length; }
    function Ri(n) { var t = n.children; return t && t.length ? Ri(t[0]) : n; }
    function Di(n) { var t, e = n.children; return e && (t = e.length) ? Di(e[t - 1]) : n; }
    function Pi(n) { return { x: n.x, y: n.y, dx: n.dx, dy: n.dy }; }
    function Ui(n, t) { var e = n.x + t[3], r = n.y + t[0], u = n.dx - t[1] - t[3], i = n.dy - t[0] - t[2]; return 0 > u && (e += u / 2, u = 0), 0 > i && (r += i / 2, i = 0), { x: e, y: r, dx: u, dy: i }; }
    function ji(n) { var t = n[0], e = n[n.length - 1]; return e > t ? [t, e] : [e, t]; }
    function Hi(n) { return n.rangeExtent ? n.rangeExtent() : ji(n.range()); }
    function Fi(n, t, e, r) { var u = e(n[0], n[1]), i = r(t[0], t[1]); return function (n) { return i(u(n)); }; }
    function Oi(n, t) { var e, r = 0, u = n.length - 1, i = n[r], o = n[u]; return i > o && (e = r, r = u, u = e, e = i, i = o, o = e), n[r] = t.floor(i), n[u] = t.ceil(o), n; }
    function Ii(n) { return n ? { floor: function (t) { return Math.floor(t / n) * n; }, ceil: function (t) { return Math.ceil(t / n) * n; } } : vs; }
    function Yi(n, t, e, r) { var u = [], i = [], o = 0, a = Math.min(n.length, t.length) - 1; for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++o <= a;)
        u.push(e(n[o - 1], n[o])), i.push(r(t[o - 1], t[o])); return function (t) { var e = Go.bisect(n, t, 1, a) - 1; return i[e](u[e](t)); }; }
    function Zi(n, t, e, r) { function u() { var u = Math.min(n.length, t.length) > 2 ? Yi : Fi, c = r ? Ou : Fu; return o = u(n, t, c, e), a = u(t, n, c, du), i; } function i(n) { return o(n); } var o, a; return i.invert = function (n) { return a(n); }, i.domain = function (t) { return arguments.length ? (n = t.map(Number), u()) : n; }, i.range = function (n) { return arguments.length ? (t = n, u()) : t; }, i.rangeRound = function (n) { return i.range(n).interpolate(Ru); }, i.clamp = function (n) { return arguments.length ? (r = n, u()) : r; }, i.interpolate = function (n) { return arguments.length ? (e = n, u()) : e; }, i.ticks = function (t) { return Bi(n, t); }, i.tickFormat = function (t, e) { return Ji(n, t, e); }, i.nice = function (t) { return $i(n, t), u(); }, i.copy = function () { return Zi(n, t, e, r); }, u(); }
    function Vi(n, t) { return Go.rebind(n, t, "range", "rangeRound", "interpolate", "clamp"); }
    function $i(n, t) { return Oi(n, Ii(Xi(n, t)[2])); }
    function Xi(n, t) { null == t && (t = 10); var e = ji(n), r = e[1] - e[0], u = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)), i = t / r * u; return .15 >= i ? u *= 10 : .35 >= i ? u *= 5 : .75 >= i && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + .5 * u, e[2] = u, e; }
    function Bi(n, t) { return Go.range.apply(Go, Xi(n, t)); }
    function Ji(n, t, e) { var r = Xi(n, t); if (e) {
        var u = rc.exec(e);
        if (u.shift(), "s" === u[8]) {
            var i = Go.formatPrefix(Math.max(fa(r[0]), fa(r[1])));
            return u[7] || (u[7] = "." + Wi(i.scale(r[2]))), u[8] = "f", e = Go.format(u.join("")), function (n) { return e(i.scale(n)) + i.symbol; };
        }
        u[7] || (u[7] = "." + Gi(u[8], r)), e = u.join("");
    }
    else
        e = ",." + Wi(r[2]) + "f"; return Go.format(e); }
    function Wi(n) { return -Math.floor(Math.log(n) / Math.LN10 + .01); }
    function Gi(n, t) { var e = Wi(t[2]); return n in ds ? Math.abs(e - Wi(Math.max(fa(t[0]), fa(t[1])))) + +("e" !== n) : e - 2 * ("%" === n); }
    function Ki(n, t, e, r) { function u(n) { return (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t); } function i(n) { return e ? Math.pow(t, n) : -Math.pow(t, -n); } function o(t) { return n(u(t)); } return o.invert = function (t) { return i(n.invert(t)); }, o.domain = function (t) { return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(u)), o) : r; }, o.base = function (e) { return arguments.length ? (t = +e, n.domain(r.map(u)), o) : t; }, o.nice = function () { var t = Oi(r.map(u), e ? Math : ys); return n.domain(t), r = t.map(i), o; }, o.ticks = function () { var n = ji(r), o = [], a = n[0], c = n[1], s = Math.floor(u(a)), l = Math.ceil(u(c)), f = t % 1 ? 2 : t; if (isFinite(l - s)) {
        if (e) {
            for (; l > s; s++)
                for (var h = 1; f > h; h++)
                    o.push(i(s) * h);
            o.push(i(s));
        }
        else
            for (o.push(i(s)); s++ < l;)
                for (var h = f - 1; h > 0; h--)
                    o.push(i(s) * h);
        for (s = 0; o[s] < a; s++)
            ;
        for (l = o.length; o[l - 1] > c; l--)
            ;
        o = o.slice(s, l);
    } return o; }, o.tickFormat = function (n, t) { if (!arguments.length)
        return ms; arguments.length < 2 ? t = ms : "function" != typeof t && (t = Go.format(t)); var r, a = Math.max(.1, n / o.ticks().length), c = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor); return function (n) { return n / i(c(u(n) + r)) <= a ? t(n) : ""; }; }, o.copy = function () { return Ki(n.copy(), t, e, r); }, Vi(o, n); }
    function Qi(n, t, e) { function r(t) { return n(u(t)); } var u = no(t), i = no(1 / t); return r.invert = function (t) { return i(n.invert(t)); }, r.domain = function (t) { return arguments.length ? (n.domain((e = t.map(Number)).map(u)), r) : e; }, r.ticks = function (n) { return Bi(e, n); }, r.tickFormat = function (n, t) { return Ji(e, n, t); }, r.nice = function (n) { return r.domain($i(e, n)); }, r.exponent = function (o) { return arguments.length ? (u = no(t = o), i = no(1 / t), n.domain(e.map(u)), r) : t; }, r.copy = function () { return Qi(n.copy(), t, e); }, Vi(r, n); }
    function no(n) { return function (t) { return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n); }; }
    function to(n, t) { function e(e) { return i[((u.get(e) || ("range" === t.t ? u.set(e, n.push(e)) : 0 / 0)) - 1) % i.length]; } function r(t, e) { return Go.range(n.length).map(function (n) { return t + e * n; }); } var u, i, a; return e.domain = function (r) { if (!arguments.length)
        return n; n = [], u = new o; for (var i, a = -1, c = r.length; ++a < c;)
        u.has(i = r[a]) || u.set(i, n.push(i)); return e[t.t].apply(e, t.a); }, e.range = function (n) { return arguments.length ? (i = n, a = 0, t = { t: "range", a: arguments }, e) : i; }, e.rangePoints = function (u, o) { arguments.length < 2 && (o = 0); var c = u[0], s = u[1], l = (s - c) / (Math.max(1, n.length - 1) + o); return i = r(n.length < 2 ? (c + s) / 2 : c + l * o / 2, l), a = 0, t = { t: "rangePoints", a: arguments }, e; }, e.rangeBands = function (u, o, c) { arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o); var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = (f - l) / (n.length - o + 2 * c); return i = r(l + h * c, h), s && i.reverse(), a = h * (1 - o), t = { t: "rangeBands", a: arguments }, e; }, e.rangeRoundBands = function (u, o, c) { arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o); var s = u[1] < u[0], l = u[s - 0], f = u[1 - s], h = Math.floor((f - l) / (n.length - o + 2 * c)), g = f - l - (n.length - o) * h; return i = r(l + Math.round(g / 2), h), s && i.reverse(), a = Math.round(h * (1 - o)), t = { t: "rangeRoundBands", a: arguments }, e; }, e.rangeBand = function () { return a; }, e.rangeExtent = function () { return ji(t.a[0]); }, e.copy = function () { return to(n, t); }, e.domain(n); }
    function eo(e, r) { function u() { var n = 0, t = r.length; for (o = []; ++n < t;)
        o[n - 1] = Go.quantile(e, n / t); return i; } function i(n) { return isNaN(n = +n) ? void 0 : r[Go.bisect(o, n)]; } var o; return i.domain = function (r) { return arguments.length ? (e = r.filter(t).sort(n), u()) : e; }, i.range = function (n) { return arguments.length ? (r = n, u()) : r; }, i.quantiles = function () { return o; }, i.invertExtent = function (n) { return n = r.indexOf(n), 0 > n ? [0 / 0, 0 / 0] : [n > 0 ? o[n - 1] : e[0], n < o.length ? o[n] : e[e.length - 1]]; }, i.copy = function () { return eo(e, r); }, u(); }
    function ro(n, t, e) { function r(t) { return e[Math.max(0, Math.min(o, Math.floor(i * (t - n))))]; } function u() { return i = e.length / (t - n), o = e.length - 1, r; } var i, o; return r.domain = function (e) { return arguments.length ? (n = +e[0], t = +e[e.length - 1], u()) : [n, t]; }, r.range = function (n) { return arguments.length ? (e = n, u()) : e; }, r.invertExtent = function (t) { return t = e.indexOf(t), t = 0 > t ? 0 / 0 : t / i + n, [t, t + 1 / i]; }, r.copy = function () { return ro(n, t, e); }, u(); }
    function uo(n, t) { function e(e) { return e >= e ? t[Go.bisect(n, e)] : void 0; } return e.domain = function (t) { return arguments.length ? (n = t, e) : n; }, e.range = function (n) { return arguments.length ? (t = n, e) : t; }, e.invertExtent = function (e) { return e = t.indexOf(e), [n[e - 1], n[e]]; }, e.copy = function () { return uo(n, t); }, e; }
    function io(n) { function t(n) { return +n; } return t.invert = t, t.domain = t.range = function (e) { return arguments.length ? (n = e.map(t), t) : n; }, t.ticks = function (t) { return Bi(n, t); }, t.tickFormat = function (t, e) { return Ji(n, t, e); }, t.copy = function () { return io(n); }, t; }
    function oo(n) { return n.innerRadius; }
    function ao(n) { return n.outerRadius; }
    function co(n) { return n.startAngle; }
    function so(n) { return n.endAngle; }
    function lo(n) { function t(t) { function o() { s.push("M", i(n(l), a)); } for (var c, s = [], l = [], f = -1, h = t.length, g = Et(e), p = Et(r); ++f < h;)
        u.call(this, c = t[f], f) ? l.push([+g.call(this, c, f), +p.call(this, c, f)]) : l.length && (o(), l = []); return l.length && o(), s.length ? s.join("") : null; } var e = Ar, r = Cr, u = Ae, i = fo, o = i.key, a = .7; return t.x = function (n) { return arguments.length ? (e = n, t) : e; }, t.y = function (n) { return arguments.length ? (r = n, t) : r; }, t.defined = function (n) { return arguments.length ? (u = n, t) : u; }, t.interpolate = function (n) { return arguments.length ? (o = "function" == typeof n ? i = n : (i = ks.get(n) || fo).key, t) : o; }, t.tension = function (n) { return arguments.length ? (a = n, t) : a; }, t; }
    function fo(n) { return n.join("L"); }
    function ho(n) { return fo(n) + "Z"; }
    function go(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;)
        u.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]); return e > 1 && u.push("H", r[0]), u.join(""); }
    function po(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;)
        u.push("V", (r = n[t])[1], "H", r[0]); return u.join(""); }
    function vo(n) { for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;)
        u.push("H", (r = n[t])[0], "V", r[1]); return u.join(""); }
    function mo(n, t) { return n.length < 4 ? fo(n) : n[1] + Mo(n.slice(1, n.length - 1), _o(n, t)); }
    function yo(n, t) { return n.length < 3 ? fo(n) : n[0] + Mo((n.push(n[0]), n), _o([n[n.length - 2]].concat(n, [n[1]]), t)); }
    function xo(n, t) { return n.length < 3 ? fo(n) : n[0] + Mo(n, _o(n, t)); }
    function Mo(n, t) { if (t.length < 1 || n.length != t.length && n.length != t.length + 2)
        return fo(n); var e = n.length != t.length, r = "", u = n[0], i = n[1], o = t[0], a = o, c = 1; if (e && (r += "Q" + (i[0] - 2 * o[0] / 3) + "," + (i[1] - 2 * o[1] / 3) + "," + i[0] + "," + i[1], u = n[1], c = 2), t.length > 1) {
        a = t[1], i = n[c], c++, r += "C" + (u[0] + o[0]) + "," + (u[1] + o[1]) + "," + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1];
        for (var s = 2; s < t.length; s++, c++)
            i = n[c], a = t[s], r += "S" + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1];
    } if (e) {
        var l = n[c];
        r += "Q" + (i[0] + 2 * a[0] / 3) + "," + (i[1] + 2 * a[1] / 3) + "," + l[0] + "," + l[1];
    } return r; }
    function _o(n, t) { for (var e, r = [], u = (1 - t) / 2, i = n[0], o = n[1], a = 1, c = n.length; ++a < c;)
        e = i, i = o, o = n[a], r.push([u * (o[0] - e[0]), u * (o[1] - e[1])]); return r; }
    function bo(n) { if (n.length < 3)
        return fo(n); var t = 1, e = n.length, r = n[0], u = r[0], i = r[1], o = [u, u, u, (r = n[1])[0]], a = [i, i, i, r[1]], c = [u, ",", i, "L", Eo(Cs, o), ",", Eo(Cs, a)]; for (n.push(n[e - 1]); ++t <= e;)
        r = n[t], o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), Ao(c, o, a); return n.pop(), c.push("L", r), c.join(""); }
    function wo(n) { if (n.length < 4)
        return fo(n); for (var t, e = [], r = -1, u = n.length, i = [0], o = [0]; ++r < 3;)
        t = n[r], i.push(t[0]), o.push(t[1]); for (e.push(Eo(Cs, i) + "," + Eo(Cs, o)), --r; ++r < u;)
        t = n[r], i.shift(), i.push(t[0]), o.shift(), o.push(t[1]), Ao(e, i, o); return e.join(""); }
    function So(n) { for (var t, e, r = -1, u = n.length, i = u + 4, o = [], a = []; ++r < 4;)
        e = n[r % u], o.push(e[0]), a.push(e[1]); for (t = [Eo(Cs, o), ",", Eo(Cs, a)], --r; ++r < i;)
        e = n[r % u], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), Ao(t, o, a); return t.join(""); }
    function ko(n, t) { var e = n.length - 1; if (e)
        for (var r, u, i = n[0][0], o = n[0][1], a = n[e][0] - i, c = n[e][1] - o, s = -1; ++s <= e;)
            r = n[s], u = s / e, r[0] = t * r[0] + (1 - t) * (i + u * a), r[1] = t * r[1] + (1 - t) * (o + u * c); return bo(n); }
    function Eo(n, t) { return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]; }
    function Ao(n, t, e) { n.push("C", Eo(Es, t), ",", Eo(Es, e), ",", Eo(As, t), ",", Eo(As, e), ",", Eo(Cs, t), ",", Eo(Cs, e)); }
    function Co(n, t) { return (t[1] - n[1]) / (t[0] - n[0]); }
    function No(n) { for (var t = 0, e = n.length - 1, r = [], u = n[0], i = n[1], o = r[0] = Co(u, i); ++t < e;)
        r[t] = (o + (o = Co(u = i, i = n[t + 1]))) / 2; return r[t] = o, r; }
    function Lo(n) { for (var t, e, r, u, i = [], o = No(n), a = -1, c = n.length - 1; ++a < c;)
        t = Co(n[a], n[a + 1]), fa(t) < Ta ? o[a] = o[a + 1] = 0 : (e = o[a] / t, r = o[a + 1] / t, u = e * e + r * r, u > 9 && (u = 3 * t / Math.sqrt(u), o[a] = u * e, o[a + 1] = u * r)); for (a = -1; ++a <= c;)
        u = (n[Math.min(c, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), i.push([u || 0, o[a] * u || 0]); return i; }
    function To(n) { return n.length < 3 ? fo(n) : n[0] + Mo(n, Lo(n)); }
    function qo(n) { for (var t, e, r, u = -1, i = n.length; ++u < i;)
        t = n[u], e = t[0], r = t[1] + ws, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r); return n; }
    function zo(n) { function t(t) { function c() { v.push("M", a(n(m), f), l, s(n(d.reverse()), f), "Z"); } for (var h, g, p, v = [], d = [], m = [], y = -1, x = t.length, M = Et(e), _ = Et(u), b = e === r ? function () { return g; } : Et(r), w = u === i ? function () { return p; } : Et(i); ++y < x;)
        o.call(this, h = t[y], y) ? (d.push([g = +M.call(this, h, y), p = +_.call(this, h, y)]), m.push([+b.call(this, h, y), +w.call(this, h, y)])) : d.length && (c(), d = [], m = []); return d.length && c(), v.length ? v.join("") : null; } var e = Ar, r = Ar, u = 0, i = Cr, o = Ae, a = fo, c = a.key, s = a, l = "L", f = .7; return t.x = function (n) { return arguments.length ? (e = r = n, t) : r; }, t.x0 = function (n) { return arguments.length ? (e = n, t) : e; }, t.x1 = function (n) { return arguments.length ? (r = n, t) : r; }, t.y = function (n) { return arguments.length ? (u = i = n, t) : i; }, t.y0 = function (n) { return arguments.length ? (u = n, t) : u; }, t.y1 = function (n) { return arguments.length ? (i = n, t) : i; }, t.defined = function (n) { return arguments.length ? (o = n, t) : o; }, t.interpolate = function (n) { return arguments.length ? (c = "function" == typeof n ? a = n : (a = ks.get(n) || fo).key, s = a.reverse || a, l = a.closed ? "M" : "L", t) : c; }, t.tension = function (n) { return arguments.length ? (f = n, t) : f; }, t; }
    function Ro(n) { return n.radius; }
    function Do(n) { return [n.x, n.y]; }
    function Po(n) { return function () { var t = n.apply(this, arguments), e = t[0], r = t[1] + ws; return [e * Math.cos(r), e * Math.sin(r)]; }; }
    function Uo() { return 64; }
    function jo() { return "circle"; }
    function Ho(n) { var t = Math.sqrt(n / Ca); return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"; }
    function Fo(n, t) { return da(n, Rs), n.id = t, n; }
    function Oo(n, t, e, r) { var u = n.id; return P(n, "function" == typeof e ? function (n, i, o) { n.__transition__[u].tween.set(t, r(e.call(n, n.__data__, i, o))); } : (e = r(e), function (n) { n.__transition__[u].tween.set(t, e); })); }
    function Io(n) { return null == n && (n = ""), function () { this.textContent = n; }; }
    function Yo(n, t, e, r) { var u = n.__transition__ || (n.__transition__ = { active: 0, count: 0 }), i = u[e]; if (!i) {
        var a = r.time;
        i = u[e] = { tween: new o, time: a, ease: r.ease, delay: r.delay, duration: r.duration }, ++u.count, Go.timer(function (r) { function o(r) { return u.active > e ? s() : (u.active = e, i.event && i.event.start.call(n, l, t), i.tween.forEach(function (e, r) { (r = r.call(n, l, t)) && v.push(r); }), Go.timer(function () { return p.c = c(r || 1) ? Ae : c, 1; }, 0, a), void 0); } function c(r) { if (u.active !== e)
            return s(); for (var o = r / g, a = f(o), c = v.length; c > 0;)
            v[--c].call(n, a); return o >= 1 ? (i.event && i.event.end.call(n, l, t), s()) : void 0; } function s() { return --u.count ? delete u[e] : delete n.__transition__, 1; } var l = n.__data__, f = i.ease, h = i.delay, g = i.duration, p = nc, v = []; return p.t = h + a, r >= h ? o(r - h) : (p.c = o, void 0); }, 0, a);
    } }
    function Zo(n, t) { n.attr("transform", function (n) { return "translate(" + t(n) + ",0)"; }); }
    function Vo(n, t) { n.attr("transform", function (n) { return "translate(0," + t(n) + ")"; }); }
    function $o(n) { return n.toISOString(); }
    function Xo(n, t, e) {
        function r(t) {
            return n(t);
        }
        function u(n, e) { var r = n[1] - n[0], u = r / e, i = Go.bisect(Ys, u); return i == Ys.length ? [t.year, Xi(n.map(function (n) { return n / 31536e6; }), e)[2]] : i ? t[u / Ys[i - 1] < Ys[i] / u ? i - 1 : i] : [$s, Xi(n, e)[2]]; }
        return r.invert = function (t) { return Bo(n.invert(t)); }, r.domain = function (t) { return arguments.length ? (n.domain(t), r) : n.domain().map(Bo); }, r.nice = function (n, t) { function e(e) { return !isNaN(e) && !n.range(e, Bo(+e + 1), t).length; } var i = r.domain(), o = ji(i), a = null == n ? u(o, 10) : "number" == typeof n && u(o, n); return a && (n = a[0], t = a[1]), r.domain(Oi(i, t > 1 ? { floor: function (t) { for (; e(t = n.floor(t));)
                t = Bo(t - 1); return t; }, ceil: function (t) { for (; e(t = n.ceil(t));)
                t = Bo(+t + 1); return t; } } : n)); }, r.ticks = function (n, t) { var e = ji(r.domain()), i = null == n ? u(e, 10) : "number" == typeof n ? u(e, n) : !n.range && [{ range: n }, t]; return i && (n = i[0], t = i[1]), n.range(e[0], Bo(+e[1] + 1), 1 > t ? 1 : t); }, r.tickFormat = function () { return e; }, r.copy = function () { return Xo(n.copy(), t, e); }, Vi(r, n);
    }
    function Bo(n) { return new Date(n); }
    function Jo(n) { return JSON.parse(n.responseText); }
    function Wo(n) { var t = na.createRange(); return t.selectNode(na.body), t.createContextualFragment(n.responseText); }
    var Go = { version: "3.4.6" };
    Date.now || (Date.now = function () { return +new Date; });
    var Ko = [].slice, Qo = function (n) { return Ko.call(n); }, na = document, ta = na.documentElement, ea = window;
    try {
        Qo(ta.childNodes)[0].nodeType;
    }
    catch (ra) {
        Qo = function (n) { for (var t = n.length, e = new Array(t); t--;)
            e[t] = n[t]; return e; };
    }
    try {
        na.createElement("div").style.setProperty("opacity", 0, "");
    }
    catch (ua) {
        var ia = ea.Element.prototype, oa = ia.setAttribute, aa = ia.setAttributeNS, ca = ea.CSSStyleDeclaration.prototype, sa = ca.setProperty;
        ia.setAttribute = function (n, t) { oa.call(this, n, t + ""); }, ia.setAttributeNS = function (n, t, e) { aa.call(this, n, t, e + ""); }, ca.setProperty = function (n, t, e) { sa.call(this, n, t + "", e); };
    }
    Go.ascending = n, Go.descending = function (n, t) { return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0; }, Go.min = function (n, t) { var e, r, u = -1, i = n.length; if (1 === arguments.length) {
        for (; ++u < i && !(null != (e = n[u]) && e >= e);)
            e = void 0;
        for (; ++u < i;)
            null != (r = n[u]) && e > r && (e = r);
    }
    else {
        for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);)
            e = void 0;
        for (; ++u < i;)
            null != (r = t.call(n, n[u], u)) && e > r && (e = r);
    } return e; }, Go.max = function (n, t) { var e, r, u = -1, i = n.length; if (1 === arguments.length) {
        for (; ++u < i && !(null != (e = n[u]) && e >= e);)
            e = void 0;
        for (; ++u < i;)
            null != (r = n[u]) && r > e && (e = r);
    }
    else {
        for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);)
            e = void 0;
        for (; ++u < i;)
            null != (r = t.call(n, n[u], u)) && r > e && (e = r);
    } return e; }, Go.extent = function (n, t) { var e, r, u, i = -1, o = n.length; if (1 === arguments.length) {
        for (; ++i < o && !(null != (e = u = n[i]) && e >= e);)
            e = u = void 0;
        for (; ++i < o;)
            null != (r = n[i]) && (e > r && (e = r), r > u && (u = r));
    }
    else {
        for (; ++i < o && !(null != (e = u = t.call(n, n[i], i)) && e >= e);)
            e = void 0;
        for (; ++i < o;)
            null != (r = t.call(n, n[i], i)) && (e > r && (e = r), r > u && (u = r));
    } return [e, u]; }, Go.sum = function (n, t) { var e, r = 0, u = n.length, i = -1; if (1 === arguments.length)
        for (; ++i < u;)
            isNaN(e = +n[i]) || (r += e);
    else
        for (; ++i < u;)
            isNaN(e = +t.call(n, n[i], i)) || (r += e); return r; }, Go.mean = function (n, e) { var r, u = 0, i = n.length, o = -1, a = i; if (1 === arguments.length)
        for (; ++o < i;)
            t(r = n[o]) ? u += r : --a;
    else
        for (; ++o < i;)
            t(r = e.call(n, n[o], o)) ? u += r : --a; return a ? u / a : void 0; }, Go.quantile = function (n, t) { var e = (n.length - 1) * t + 1, r = Math.floor(e), u = +n[r - 1], i = e - r; return i ? u + i * (n[r] - u) : u; }, Go.median = function (e, r) { return arguments.length > 1 && (e = e.map(r)), e = e.filter(t), e.length ? Go.quantile(e.sort(n), .5) : void 0; };
    var la = e(n);
    Go.bisectLeft = la.left, Go.bisect = Go.bisectRight = la.right, Go.bisector = function (t) { return e(1 === t.length ? function (e, r) { return n(t(e), r); } : t); }, Go.shuffle = function (n) { for (var t, e, r = n.length; r;)
        e = 0 | Math.random() * r--, t = n[r], n[r] = n[e], n[e] = t; return n; }, Go.permute = function (n, t) { for (var e = t.length, r = new Array(e); e--;)
        r[e] = n[t[e]]; return r; }, Go.pairs = function (n) { for (var t, e = 0, r = n.length - 1, u = n[0], i = new Array(0 > r ? 0 : r); r > e;)
        i[e] = [t = u, u = n[++e]]; return i; }, Go.zip = function () { if (!(u = arguments.length))
        return []; for (var n = -1, t = Go.min(arguments, r), e = new Array(t); ++n < t;)
        for (var u, i = -1, o = e[n] = new Array(u); ++i < u;)
            o[i] = arguments[i][n]; return e; }, Go.transpose = function (n) { return Go.zip.apply(Go, n); }, Go.keys = function (n) { var t = []; for (var e in n)
        t.push(e); return t; }, Go.values = function (n) { var t = []; for (var e in n)
        t.push(n[e]); return t; }, Go.entries = function (n) { var t = []; for (var e in n)
        t.push({ key: e, value: n[e] }); return t; }, Go.merge = function (n) { for (var t, e, r, u = n.length, i = -1, o = 0; ++i < u;)
        o += n[i].length; for (e = new Array(o); --u >= 0;)
        for (r = n[u], t = r.length; --t >= 0;)
            e[--o] = r[t]; return e; };
    var fa = Math.abs;
    Go.range = function (n, t, e) { if (arguments.length < 3 && (e = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / e)
        throw new Error("infinite range"); var r, i = [], o = u(fa(e)), a = -1; if (n *= o, t *= o, e *= o, 0 > e)
        for (; (r = n + e * ++a) > t;)
            i.push(r / o);
    else
        for (; (r = n + e * ++a) < t;)
            i.push(r / o); return i; }, Go.map = function (n) { var t = new o; if (n instanceof o)
        n.forEach(function (n, e) { t.set(n, e); });
    else
        for (var e in n)
            t.set(e, n[e]); return t; }, i(o, { has: a, get: function (n) { return this[ha + n]; }, set: function (n, t) { return this[ha + n] = t; }, remove: c, keys: s, values: function () { var n = []; return this.forEach(function (t, e) { n.push(e); }), n; }, entries: function () { var n = []; return this.forEach(function (t, e) { n.push({ key: t, value: e }); }), n; }, size: l, empty: f, forEach: function (n) { for (var t in this)
            t.charCodeAt(0) === ga && n.call(this, t.substring(1), this[t]); } });
    var ha = "\x00", ga = ha.charCodeAt(0);
    Go.nest = function () { function n(t, a, c) { if (c >= i.length)
        return r ? r.call(u, a) : e ? a.sort(e) : a; for (var s, l, f, h, g = -1, p = a.length, v = i[c++], d = new o; ++g < p;)
        (h = d.get(s = v(l = a[g]))) ? h.push(l) : d.set(s, [l]); return t ? (l = t(), f = function (e, r) { l.set(e, n(t, r, c)); }) : (l = {}, f = function (e, r) { l[e] = n(t, r, c); }), d.forEach(f), l; } function t(n, e) { if (e >= i.length)
        return n; var r = [], u = a[e++]; return n.forEach(function (n, u) { r.push({ key: n, values: t(u, e) }); }), u ? r.sort(function (n, t) { return u(n.key, t.key); }) : r; } var e, r, u = {}, i = [], a = []; return u.map = function (t, e) { return n(e, t, 0); }, u.entries = function (e) { return t(n(Go.map, e, 0), 0); }, u.key = function (n) { return i.push(n), u; }, u.sortKeys = function (n) { return a[i.length - 1] = n, u; }, u.sortValues = function (n) { return e = n, u; }, u.rollup = function (n) { return r = n, u; }, u; }, Go.set = function (n) { var t = new h; if (n)
        for (var e = 0, r = n.length; r > e; ++e)
            t.add(n[e]); return t; }, i(h, { has: a, add: function (n) { return this[ha + n] = !0, n; }, remove: function (n) { return n = ha + n, n in this && delete this[n]; }, values: s, size: l, empty: f, forEach: function (n) { for (var t in this)
            t.charCodeAt(0) === ga && n.call(this, t.substring(1)); } }), Go.behavior = {}, Go.rebind = function (n, t) { for (var e, r = 1, u = arguments.length; ++r < u;)
        n[e = arguments[r]] = g(n, t, t[e]); return n; };
    var pa = ["webkit", "ms", "moz", "Moz", "o", "O"];
    Go.dispatch = function () { for (var n = new d, t = -1, e = arguments.length; ++t < e;)
        n[arguments[t]] = m(n); return n; }, d.prototype.on = function (n, t) { var e = n.indexOf("."), r = ""; if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n)
        return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t); if (2 === arguments.length) {
        if (null == t)
            for (n in this)
                this.hasOwnProperty(n) && this[n].on(r, null);
        return this;
    } }, Go.event = null, Go.requote = function (n) { return n.replace(va, "\\$&"); };
    var va = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g, da = {}.__proto__ ? function (n, t) { n.__proto__ = t; } : function (n, t) { for (var e in t)
        n[e] = t[e]; }, ma = function (n, t) { return t.querySelector(n); }, ya = function (n, t) { return t.querySelectorAll(n); }, xa = ta[p(ta, "matchesSelector")], Ma = function (n, t) { return xa.call(n, t); };
    "function" == typeof Sizzle && (ma = function (n, t) { return Sizzle(n, t)[0] || null; }, ya = Sizzle, Ma = Sizzle.matchesSelector), Go.selection = function () { return Sa; };
    var _a = Go.selection.prototype = [];
    _a.select = function (n) { var t, e, r, u, i = []; n = b(n); for (var o = -1, a = this.length; ++o < a;) {
        i.push(t = []), t.parentNode = (r = this[o]).parentNode;
        for (var c = -1, s = r.length; ++c < s;)
            (u = r[c]) ? (t.push(e = n.call(u, u.__data__, c, o)), e && "__data__" in u && (e.__data__ = u.__data__)) : t.push(null);
    } return _(i); }, _a.selectAll = function (n) { var t, e, r = []; n = w(n); for (var u = -1, i = this.length; ++u < i;)
        for (var o = this[u], a = -1, c = o.length; ++a < c;)
            (e = o[a]) && (r.push(t = Qo(n.call(e, e.__data__, a, u))), t.parentNode = e); return _(r); };
    var ba = { svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
    Go.ns = { prefix: ba, qualify: function (n) { var t = n.indexOf(":"), e = n; return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), ba.hasOwnProperty(e) ? { space: ba[e], local: n } : n; } }, _a.attr = function (n, t) { if (arguments.length < 2) {
        if ("string" == typeof n) {
            var e = this.node();
            return n = Go.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n);
        }
        for (t in n)
            this.each(S(t, n[t]));
        return this;
    } return this.each(S(n, t)); }, _a.classed = function (n, t) { if (arguments.length < 2) {
        if ("string" == typeof n) {
            var e = this.node(), r = (n = A(n)).length, u = -1;
            if (t = e.classList) {
                for (; ++u < r;)
                    if (!t.contains(n[u]))
                        return !1;
            }
            else
                for (t = e.getAttribute("class"); ++u < r;)
                    if (!E(n[u]).test(t))
                        return !1;
            return !0;
        }
        for (t in n)
            this.each(C(t, n[t]));
        return this;
    } return this.each(C(n, t)); }, _a.style = function (n, t, e) { var r = arguments.length; if (3 > r) {
        if ("string" != typeof n) {
            2 > r && (t = "");
            for (e in n)
                this.each(L(e, n[e], t));
            return this;
        }
        if (2 > r)
            return ea.getComputedStyle(this.node(), null).getPropertyValue(n);
        e = "";
    } return this.each(L(n, t, e)); }, _a.property = function (n, t) { if (arguments.length < 2) {
        if ("string" == typeof n)
            return this.node()[n];
        for (t in n)
            this.each(T(t, n[t]));
        return this;
    } return this.each(T(n, t)); }, _a.text = function (n) { return arguments.length ? this.each("function" == typeof n ? function () { var t = n.apply(this, arguments); this.textContent = null == t ? "" : t; } : null == n ? function () { this.textContent = ""; } : function () { this.textContent = n; }) : this.node().textContent; }, _a.html = function (n) { return arguments.length ? this.each("function" == typeof n ? function () { var t = n.apply(this, arguments); this.innerHTML = null == t ? "" : t; } : null == n ? function () { this.innerHTML = ""; } : function () { this.innerHTML = n; }) : this.node().innerHTML; }, _a.append = function (n) { return n = q(n), this.select(function () { return this.appendChild(n.apply(this, arguments)); }); }, _a.insert = function (n, t) { return n = q(n), t = b(t), this.select(function () { return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null); }); }, _a.remove = function () { return this.each(function () { var n = this.parentNode; n && n.removeChild(this); }); }, _a.data = function (n, t) { function e(n, e) { var r, u, i, a = n.length, f = e.length, h = Math.min(a, f), g = new Array(f), p = new Array(f), v = new Array(a); if (t) {
        var d, m = new o, y = new o, x = [];
        for (r = -1; ++r < a;)
            d = t.call(u = n[r], u.__data__, r), m.has(d) ? v[r] = u : m.set(d, u), x.push(d);
        for (r = -1; ++r < f;)
            d = t.call(e, i = e[r], r), (u = m.get(d)) ? (g[r] = u, u.__data__ = i) : y.has(d) || (p[r] = z(i)), y.set(d, i), m.remove(d);
        for (r = -1; ++r < a;)
            m.has(x[r]) && (v[r] = n[r]);
    }
    else {
        for (r = -1; ++r < h;)
            u = n[r], i = e[r], u ? (u.__data__ = i, g[r] = u) : p[r] = z(i);
        for (; f > r; ++r)
            p[r] = z(e[r]);
        for (; a > r; ++r)
            v[r] = n[r];
    } p.update = g, p.parentNode = g.parentNode = v.parentNode = n.parentNode, c.push(p), s.push(g), l.push(v); } var r, u, i = -1, a = this.length; if (!arguments.length) {
        for (n = new Array(a = (r = this[0]).length); ++i < a;)
            (u = r[i]) && (n[i] = u.__data__);
        return n;
    } var c = U([]), s = _([]), l = _([]); if ("function" == typeof n)
        for (; ++i < a;)
            e(r = this[i], n.call(r, r.parentNode.__data__, i));
    else
        for (; ++i < a;)
            e(r = this[i], n); return s.enter = function () { return c; }, s.exit = function () { return l; }, s; }, _a.datum = function (n) { return arguments.length ? this.property("__data__", n) : this.property("__data__"); }, _a.filter = function (n) { var t, e, r, u = []; "function" != typeof n && (n = R(n)); for (var i = 0, o = this.length; o > i; i++) {
        u.push(t = []), t.parentNode = (e = this[i]).parentNode;
        for (var a = 0, c = e.length; c > a; a++)
            (r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r);
    } return _(u); }, _a.order = function () { for (var n = -1, t = this.length; ++n < t;)
        for (var e, r = this[n], u = r.length - 1, i = r[u]; --u >= 0;)
            (e = r[u]) && (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i), i = e); return this; }, _a.sort = function (n) { n = D.apply(this, arguments); for (var t = -1, e = this.length; ++t < e;)
        this[t].sort(n); return this.order(); }, _a.each = function (n) { return P(this, function (t, e, r) { n.call(t, t.__data__, e, r); }); }, _a.call = function (n) { var t = Qo(arguments); return n.apply(t[0] = this, t), this; }, _a.empty = function () { return !this.node(); }, _a.node = function () { for (var n = 0, t = this.length; t > n; n++)
        for (var e = this[n], r = 0, u = e.length; u > r; r++) {
            var i = e[r];
            if (i)
                return i;
        } return null; }, _a.size = function () { var n = 0; return this.each(function () { ++n; }), n; };
    var wa = [];
    Go.selection.enter = U, Go.selection.enter.prototype = wa, wa.append = _a.append, wa.empty = _a.empty, wa.node = _a.node, wa.call = _a.call, wa.size = _a.size, wa.select = function (n) { for (var t, e, r, u, i, o = [], a = -1, c = this.length; ++a < c;) {
        r = (u = this[a]).update, o.push(t = []), t.parentNode = u.parentNode;
        for (var s = -1, l = u.length; ++s < l;)
            (i = u[s]) ? (t.push(r[s] = e = n.call(u.parentNode, i.__data__, s, a)), e.__data__ = i.__data__) : t.push(null);
    } return _(o); }, wa.insert = function (n, t) { return arguments.length < 2 && (t = j(this)), _a.insert.call(this, n, t); }, _a.transition = function () { for (var n, t, e = Ls || ++Ds, r = [], u = Ts || { time: Date.now(), ease: wu, delay: 0, duration: 250 }, i = -1, o = this.length; ++i < o;) {
        r.push(n = []);
        for (var a = this[i], c = -1, s = a.length; ++c < s;)
            (t = a[c]) && Yo(t, c, e, u), n.push(t);
    } return Fo(r, e); }, _a.interrupt = function () { return this.each(H); }, Go.select = function (n) { var t = ["string" == typeof n ? ma(n, na) : n]; return t.parentNode = ta, _([t]); }, Go.selectAll = function (n) { var t = Qo("string" == typeof n ? ya(n, na) : n); return t.parentNode = ta, _([t]); };
    var Sa = Go.select(ta);
    _a.on = function (n, t, e) { var r = arguments.length; if (3 > r) {
        if ("string" != typeof n) {
            2 > r && (t = !1);
            for (e in n)
                this.each(F(e, n[e], t));
            return this;
        }
        if (2 > r)
            return (r = this.node()["__on" + n]) && r._;
        e = !1;
    } return this.each(F(n, t, e)); };
    var ka = Go.map({ mouseenter: "mouseover", mouseleave: "mouseout" });
    ka.forEach(function (n) { "on" + n in na && ka.remove(n); });
    var Ea = "onselectstart" in na ? null : p(ta.style, "userSelect"), Aa = 0;
    Go.mouse = function (n) { return Z(n, x()); }, Go.touches = function (n, t) { return arguments.length < 2 && (t = x().touches), t ? Qo(t).map(function (t) { var e = Z(n, t); return e.identifier = t.identifier, e; }) : []; }, Go.behavior.drag = function () { function n() { this.on("mousedown.drag", u).on("touchstart.drag", i); } function t(n, t, u, i, o) { return function () { function a() { var n, e, r = t(h, v); r && (n = r[0] - x[0], e = r[1] - x[1], p |= n | e, x = r, g({ type: "drag", x: r[0] + s[0], y: r[1] + s[1], dx: n, dy: e })); } function c() { t(h, v) && (m.on(i + d, null).on(o + d, null), y(p && Go.event.target === f), g({ type: "dragend" })); } var s, l = this, f = Go.event.target, h = l.parentNode, g = e.of(l, arguments), p = 0, v = n(), d = ".drag" + (null == v ? "" : "-" + v), m = Go.select(u()).on(i + d, a).on(o + d, c), y = Y(), x = t(h, v); r ? (s = r.apply(l, arguments), s = [s.x - x[0], s.y - x[1]]) : s = [0, 0], g({ type: "dragstart" }); }; } var e = M(n, "drag", "dragstart", "dragend"), r = null, u = t(v, Go.mouse, X, "mousemove", "mouseup"), i = t(V, Go.touch, $, "touchmove", "touchend"); return n.origin = function (t) { return arguments.length ? (r = t, n) : r; }, Go.rebind(n, e, "on"); };
    var Ca = Math.PI, Na = 2 * Ca, La = Ca / 2, Ta = 1e-6, qa = Ta * Ta, za = Ca / 180, Ra = 180 / Ca, Da = Math.SQRT2, Pa = 2, Ua = 4;
    Go.interpolateZoom = function (n, t) { function e(n) { var t = n * y; if (m) {
        var e = Q(v), o = i / (Pa * h) * (e * nt(Da * t + v) - K(v));
        return [r + o * s, u + o * l, i * e / Q(Da * t + v)];
    } return [r + n * s, u + n * l, i * Math.exp(Da * t)]; } var r = n[0], u = n[1], i = n[2], o = t[0], a = t[1], c = t[2], s = o - r, l = a - u, f = s * s + l * l, h = Math.sqrt(f), g = (c * c - i * i + Ua * f) / (2 * i * Pa * h), p = (c * c - i * i - Ua * f) / (2 * c * Pa * h), v = Math.log(Math.sqrt(g * g + 1) - g), d = Math.log(Math.sqrt(p * p + 1) - p), m = d - v, y = (m || Math.log(c / i)) / Da; return e.duration = 1e3 * y, e; }, Go.behavior.zoom = function () { function n(n) { n.on(A, s).on(Fa + ".zoom", f).on(C, h).on("dblclick.zoom", g).on(L, l); } function t(n) { return [(n[0] - S.x) / S.k, (n[1] - S.y) / S.k]; } function e(n) { return [n[0] * S.k + S.x, n[1] * S.k + S.y]; } function r(n) { S.k = Math.max(E[0], Math.min(E[1], n)); } function u(n, t) { t = e(t), S.x += n[0] - t[0], S.y += n[1] - t[1]; } function i() { _ && _.domain(x.range().map(function (n) { return (n - S.x) / S.k; }).map(x.invert)), w && w.domain(b.range().map(function (n) { return (n - S.y) / S.k; }).map(b.invert)); } function o(n) { n({ type: "zoomstart" }); } function a(n) { i(), n({ type: "zoom", scale: S.k, translate: [S.x, S.y] }); } function c(n) { n({ type: "zoomend" }); } function s() { function n() { l = 1, u(Go.mouse(r), g), a(s); } function e() { f.on(C, ea === r ? h : null).on(N, null), p(l && Go.event.target === i), c(s); } var r = this, i = Go.event.target, s = T.of(r, arguments), l = 0, f = Go.select(ea).on(C, n).on(N, e), g = t(Go.mouse(r)), p = Y(); H.call(r), o(s); } function l() { function n() { var n = Go.touches(g); return h = S.k, n.forEach(function (n) { n.identifier in v && (v[n.identifier] = t(n)); }), n; } function e() { for (var t = Go.event.changedTouches, e = 0, i = t.length; i > e; ++e)
        v[t[e].identifier] = null; var o = n(), c = Date.now(); if (1 === o.length) {
        if (500 > c - m) {
            var s = o[0], l = v[s.identifier];
            r(2 * S.k), u(s, l), y(), a(p);
        }
        m = c;
    }
    else if (o.length > 1) {
        var s = o[0], f = o[1], h = s[0] - f[0], g = s[1] - f[1];
        d = h * h + g * g;
    } } function i() { for (var n, t, e, i, o = Go.touches(g), c = 0, s = o.length; s > c; ++c, i = null)
        if (e = o[c], i = v[e.identifier]) {
            if (t)
                break;
            n = e, t = i;
        } if (i) {
        var l = (l = e[0] - n[0]) * l + (l = e[1] - n[1]) * l, f = d && Math.sqrt(l / d);
        n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2], t = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], r(f * h);
    } m = null, u(n, t), a(p); } function f() { if (Go.event.touches.length) {
        for (var t = Go.event.changedTouches, e = 0, r = t.length; r > e; ++e)
            delete v[t[e].identifier];
        for (var u in v)
            return void n();
    } b.on(x, null), w.on(A, s).on(L, l), k(), c(p); } var h, g = this, p = T.of(g, arguments), v = {}, d = 0, x = ".zoom-" + Go.event.changedTouches[0].identifier, M = "touchmove" + x, _ = "touchend" + x, b = Go.select(Go.event.target).on(M, i).on(_, f), w = Go.select(g).on(A, null).on(L, e), k = Y(); H.call(g), e(), o(p); } function f() { var n = T.of(this, arguments); d ? clearTimeout(d) : (H.call(this), o(n)), d = setTimeout(function () { d = null, c(n); }, 50), y(); var e = v || Go.mouse(this); p || (p = t(e)), r(Math.pow(2, .002 * ja()) * S.k), u(e, p), a(n); } function h() { p = null; } function g() { var n = T.of(this, arguments), e = Go.mouse(this), i = t(e), s = Math.log(S.k) / Math.LN2; o(n), r(Math.pow(2, Go.event.shiftKey ? Math.ceil(s) - 1 : Math.floor(s) + 1)), u(e, i), a(n), c(n); } var p, v, d, m, x, _, b, w, S = { x: 0, y: 0, k: 1 }, k = [960, 500], E = Ha, A = "mousedown.zoom", C = "mousemove.zoom", N = "mouseup.zoom", L = "touchstart.zoom", T = M(n, "zoomstart", "zoom", "zoomend"); return n.event = function (n) { n.each(function () { var n = T.of(this, arguments), t = S; Ls ? Go.select(this).transition().each("start.zoom", function () { S = this.__chart__ || { x: 0, y: 0, k: 1 }, o(n); }).tween("zoom:zoom", function () { var e = k[0], r = k[1], u = e / 2, i = r / 2, o = Go.interpolateZoom([(u - S.x) / S.k, (i - S.y) / S.k, e / S.k], [(u - t.x) / t.k, (i - t.y) / t.k, e / t.k]); return function (t) { var r = o(t), c = e / r[2]; this.__chart__ = S = { x: u - r[0] * c, y: i - r[1] * c, k: c }, a(n); }; }).each("end.zoom", function () { c(n); }) : (this.__chart__ = S, o(n), a(n), c(n)); }); }, n.translate = function (t) { return arguments.length ? (S = { x: +t[0], y: +t[1], k: S.k }, i(), n) : [S.x, S.y]; }, n.scale = function (t) { return arguments.length ? (S = { x: S.x, y: S.y, k: +t }, i(), n) : S.k; }, n.scaleExtent = function (t) { return arguments.length ? (E = null == t ? Ha : [+t[0], +t[1]], n) : E; }, n.center = function (t) { return arguments.length ? (v = t && [+t[0], +t[1]], n) : v; }, n.size = function (t) { return arguments.length ? (k = t && [+t[0], +t[1]], n) : k; }, n.x = function (t) { return arguments.length ? (_ = t, x = t.copy(), S = { x: 0, y: 0, k: 1 }, n) : _; }, n.y = function (t) { return arguments.length ? (w = t, b = t.copy(), S = { x: 0, y: 0, k: 1 }, n) : w; }, Go.rebind(n, T, "on"); };
    var ja, Ha = [0, 1 / 0], Fa = "onwheel" in na ? (ja = function () { return -Go.event.deltaY * (Go.event.deltaMode ? 120 : 1); }, "wheel") : "onmousewheel" in na ? (ja = function () { return Go.event.wheelDelta; }, "mousewheel") : (ja = function () { return -Go.event.detail; }, "MozMousePixelScroll");
    et.prototype.toString = function () { return this.rgb() + ""; }, Go.hsl = function (n, t, e) { return 1 === arguments.length ? n instanceof ut ? rt(n.h, n.s, n.l) : _t("" + n, bt, rt) : rt(+n, +t, +e); };
    var Oa = ut.prototype = new et;
    Oa.brighter = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), rt(this.h, this.s, this.l / n); }, Oa.darker = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), rt(this.h, this.s, n * this.l); }, Oa.rgb = function () { return it(this.h, this.s, this.l); }, Go.hcl = function (n, t, e) { return 1 === arguments.length ? n instanceof at ? ot(n.h, n.c, n.l) : n instanceof lt ? ht(n.l, n.a, n.b) : ht((n = wt((n = Go.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : ot(+n, +t, +e); };
    var Ia = at.prototype = new et;
    Ia.brighter = function (n) { return ot(this.h, this.c, Math.min(100, this.l + Ya * (arguments.length ? n : 1))); }, Ia.darker = function (n) { return ot(this.h, this.c, Math.max(0, this.l - Ya * (arguments.length ? n : 1))); }, Ia.rgb = function () { return ct(this.h, this.c, this.l).rgb(); }, Go.lab = function (n, t, e) { return 1 === arguments.length ? n instanceof lt ? st(n.l, n.a, n.b) : n instanceof at ? ct(n.l, n.c, n.h) : wt((n = Go.rgb(n)).r, n.g, n.b) : st(+n, +t, +e); };
    var Ya = 18, Za = .95047, Va = 1, $a = 1.08883, Xa = lt.prototype = new et;
    Xa.brighter = function (n) { return st(Math.min(100, this.l + Ya * (arguments.length ? n : 1)), this.a, this.b); }, Xa.darker = function (n) { return st(Math.max(0, this.l - Ya * (arguments.length ? n : 1)), this.a, this.b); }, Xa.rgb = function () { return ft(this.l, this.a, this.b); }, Go.rgb = function (n, t, e) { return 1 === arguments.length ? n instanceof xt ? yt(n.r, n.g, n.b) : _t("" + n, yt, it) : yt(~~n, ~~t, ~~e); };
    var Ba = xt.prototype = new et;
    Ba.brighter = function (n) { n = Math.pow(.7, arguments.length ? n : 1); var t = this.r, e = this.g, r = this.b, u = 30; return t || e || r ? (t && u > t && (t = u), e && u > e && (e = u), r && u > r && (r = u), yt(Math.min(255, ~~(t / n)), Math.min(255, ~~(e / n)), Math.min(255, ~~(r / n)))) : yt(u, u, u); }, Ba.darker = function (n) { return n = Math.pow(.7, arguments.length ? n : 1), yt(~~(n * this.r), ~~(n * this.g), ~~(n * this.b)); }, Ba.hsl = function () { return bt(this.r, this.g, this.b); }, Ba.toString = function () { return "#" + Mt(this.r) + Mt(this.g) + Mt(this.b); };
    var Ja = Go.map({ aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 });
    Ja.forEach(function (n, t) { Ja.set(n, dt(t)); }), Go.functor = Et, Go.xhr = Ct(At), Go.dsv = function (n, t) { function e(n, e, i) { arguments.length < 3 && (i = e, e = null); var o = Nt(n, t, null == e ? r : u(e), i); return o.row = function (n) { return arguments.length ? o.response(null == (e = n) ? r : u(n)) : e; }, o; } function r(n) { return e.parse(n.responseText); } function u(n) { return function (t) { return e.parse(t.responseText, n); }; } function i(t) { return t.map(o).join(n); } function o(n) { return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n; } var a = new RegExp('["' + n + "\n]"), c = n.charCodeAt(0); return e.parse = function (n, t) { var r; return e.parseRows(n, function (n, e) { if (r)
        return r(n, e - 1); var u = new Function("d", "return {" + n.map(function (n, t) { return JSON.stringify(n) + ": d[" + t + "]"; }).join(",") + "}"); r = t ? function (n, e) { return t(u(n), e); } : u; }); }, e.parseRows = function (n, t) { function e() { if (l >= s)
        return o; if (u)
        return u = !1, i; var t = l; if (34 === n.charCodeAt(t)) {
        for (var e = t; e++ < s;)
            if (34 === n.charCodeAt(e)) {
                if (34 !== n.charCodeAt(e + 1))
                    break;
                ++e;
            }
        l = e + 2;
        var r = n.charCodeAt(e + 1);
        return 13 === r ? (u = !0, 10 === n.charCodeAt(e + 2) && ++l) : 10 === r && (u = !0), n.substring(t + 1, e).replace(/""/g, '"');
    } for (; s > l;) {
        var r = n.charCodeAt(l++), a = 1;
        if (10 === r)
            u = !0;
        else if (13 === r)
            u = !0, 10 === n.charCodeAt(l) && (++l, ++a);
        else if (r !== c)
            continue;
        return n.substring(t, l - a);
    } return n.substring(t); } for (var r, u, i = {}, o = {}, a = [], s = n.length, l = 0, f = 0; (r = e()) !== o;) {
        for (var h = []; r !== i && r !== o;)
            h.push(r), r = e();
        (!t || (h = t(h, f++))) && a.push(h);
    } return a; }, e.format = function (t) { if (Array.isArray(t[0]))
        return e.formatRows(t); var r = new h, u = []; return t.forEach(function (n) { for (var t in n)
        r.has(t) || u.push(r.add(t)); }), [u.map(o).join(n)].concat(t.map(function (t) { return u.map(function (n) { return o(t[n]); }).join(n); })).join("\n"); }, e.formatRows = function (n) { return n.map(i).join("\n"); }, e; }, Go.csv = Go.dsv(",", "text/csv"), Go.tsv = Go.dsv("	", "text/tab-separated-values"), Go.touch = function (n, t, e) { if (arguments.length < 3 && (e = t, t = x().changedTouches), t)
        for (var r, u = 0, i = t.length; i > u; ++u)
            if ((r = t[u]).identifier === e)
                return Z(n, r); };
    var Wa, Ga, Ka, Qa, nc, tc = ea[p(ea, "requestAnimationFrame")] || function (n) { setTimeout(n, 17); };
    Go.timer = function (n, t, e) { var r = arguments.length; 2 > r && (t = 0), 3 > r && (e = Date.now()); var u = e + t, i = { c: n, t: u, f: !1, n: null }; Ga ? Ga.n = i : Wa = i, Ga = i, Ka || (Qa = clearTimeout(Qa), Ka = 1, tc(Tt)); }, Go.timer.flush = function () { qt(), zt(); }, Go.round = function (n, t) { return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n); };
    var ec = ["y", "z", "a", "f", "p", "n", "\xb5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Dt);
    Go.formatPrefix = function (n, t) { var e = 0; return n && (0 > n && (n *= -1), t && (n = Go.round(n, Rt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), ec[8 + e / 3]; };
    var rc = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i, uc = Go.map({ b: function (n) { return n.toString(2); }, c: function (n) { return String.fromCharCode(n); }, o: function (n) { return n.toString(8); }, x: function (n) { return n.toString(16); }, X: function (n) { return n.toString(16).toUpperCase(); }, g: function (n, t) { return n.toPrecision(t); }, e: function (n, t) { return n.toExponential(t); }, f: function (n, t) { return n.toFixed(t); }, r: function (n, t) { return (n = Go.round(n, Rt(n, t))).toFixed(Math.max(0, Math.min(20, Rt(n * (1 + 1e-15), t)))); } }), ic = Go.time = {}, oc = Date;
    jt.prototype = { getDate: function () { return this._.getUTCDate(); }, getDay: function () { return this._.getUTCDay(); }, getFullYear: function () { return this._.getUTCFullYear(); }, getHours: function () { return this._.getUTCHours(); }, getMilliseconds: function () { return this._.getUTCMilliseconds(); }, getMinutes: function () { return this._.getUTCMinutes(); }, getMonth: function () { return this._.getUTCMonth(); }, getSeconds: function () { return this._.getUTCSeconds(); }, getTime: function () { return this._.getTime(); }, getTimezoneOffset: function () { return 0; }, valueOf: function () { return this._.valueOf(); }, setDate: function () { ac.setUTCDate.apply(this._, arguments); }, setDay: function () { ac.setUTCDay.apply(this._, arguments); }, setFullYear: function () { ac.setUTCFullYear.apply(this._, arguments); }, setHours: function () { ac.setUTCHours.apply(this._, arguments); }, setMilliseconds: function () { ac.setUTCMilliseconds.apply(this._, arguments); }, setMinutes: function () { ac.setUTCMinutes.apply(this._, arguments); }, setMonth: function () { ac.setUTCMonth.apply(this._, arguments); }, setSeconds: function () { ac.setUTCSeconds.apply(this._, arguments); }, setTime: function () { ac.setTime.apply(this._, arguments); } };
    var ac = Date.prototype;
    ic.year = Ht(function (n) { return n = ic.day(n), n.setMonth(0, 1), n; }, function (n, t) { n.setFullYear(n.getFullYear() + t); }, function (n) { return n.getFullYear(); }), ic.years = ic.year.range, ic.years.utc = ic.year.utc.range, ic.day = Ht(function (n) { var t = new oc(2e3, 0); return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t; }, function (n, t) { n.setDate(n.getDate() + t); }, function (n) { return n.getDate() - 1; }), ic.days = ic.day.range, ic.days.utc = ic.day.utc.range, ic.dayOfYear = function (n) { var t = ic.year(n); return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5); }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function (n, t) { t = 7 - t; var e = ic[n] = Ht(function (n) { return (n = ic.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n; }, function (n, t) { n.setDate(n.getDate() + 7 * Math.floor(t)); }, function (n) { var e = ic.year(n).getDay(); return Math.floor((ic.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t); }); ic[n + "s"] = e.range, ic[n + "s"].utc = e.utc.range, ic[n + "OfYear"] = function (n) { var e = ic.year(n).getDay(); return Math.floor((ic.dayOfYear(n) + (e + t) % 7) / 7); }; }), ic.week = ic.sunday, ic.weeks = ic.sunday.range, ic.weeks.utc = ic.sunday.utc.range, ic.weekOfYear = ic.sundayOfYear;
    var cc = { "-": "", _: " ", 0: "0" }, sc = /^\s*\d+/, lc = /^%/;
    Go.locale = function (n) { return { numberFormat: Pt(n), timeFormat: Ot(n) }; };
    var fc = Go.locale({ decimal: ".", thousands: ",", grouping: [3], currency: ["$", ""], dateTime: "%a %b %e %X %Y", date: "%m/%d/%Y", time: "%H:%M:%S", periods: ["AM", "PM"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] });
    Go.format = fc.numberFormat, Go.geo = {}, ce.prototype = { s: 0, t: 0, add: function (n) { se(n, this.t, hc), se(hc.s, this.s, this), this.s ? this.t += hc.t : this.s = hc.t; }, reset: function () { this.s = this.t = 0; }, valueOf: function () { return this.s; } };
    var hc = new ce;
    Go.geo.stream = function (n, t) { n && gc.hasOwnProperty(n.type) ? gc[n.type](n, t) : le(n, t); };
    var gc = { Feature: function (n, t) { le(n.geometry, t); }, FeatureCollection: function (n, t) { for (var e = n.features, r = -1, u = e.length; ++r < u;)
            le(e[r].geometry, t); } }, pc = { Sphere: function (n, t) { t.sphere(); }, Point: function (n, t) { n = n.coordinates, t.point(n[0], n[1], n[2]); }, MultiPoint: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
            n = e[r], t.point(n[0], n[1], n[2]); }, LineString: function (n, t) { fe(n.coordinates, t, 0); }, MultiLineString: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
            fe(e[r], t, 0); }, Polygon: function (n, t) { he(n.coordinates, t); }, MultiPolygon: function (n, t) { for (var e = n.coordinates, r = -1, u = e.length; ++r < u;)
            he(e[r], t); }, GeometryCollection: function (n, t) { for (var e = n.geometries, r = -1, u = e.length; ++r < u;)
            le(e[r], t); } };
    Go.geo.area = function (n) { return vc = 0, Go.geo.stream(n, mc), vc; };
    var vc, dc = new ce, mc = { sphere: function () { vc += 4 * Ca; }, point: v, lineStart: v, lineEnd: v, polygonStart: function () { dc.reset(), mc.lineStart = ge; }, polygonEnd: function () { var n = 2 * dc; vc += 0 > n ? 4 * Ca + n : n, mc.lineStart = mc.lineEnd = mc.point = v; } };
    Go.geo.bounds = function () {
        function n(n, t) { x.push(M = [l = n, h = n]), f > t && (f = t), t > g && (g = t); }
        function t(t, e) { var r = pe([t * za, e * za]); if (m) {
            var u = de(m, r), i = [u[1], -u[0], 0], o = de(i, u);
            xe(o), o = Me(o);
            var c = t - p, s = c > 0 ? 1 : -1, v = o[0] * Ra * s, d = fa(c) > 180;
            if (d ^ (v > s * p && s * t > v)) {
                var y = o[1] * Ra;
                y > g && (g = y);
            }
            else if (v = (v + 360) % 360 - 180, d ^ (v > s * p && s * t > v)) {
                var y = -o[1] * Ra;
                f > y && (f = y);
            }
            else
                f > e && (f = e), e > g && (g = e);
            d ? p > t ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t) : h >= l ? (l > t && (l = t), t > h && (h = t)) : t > p ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t);
        }
        else
            n(t, e); m = r, p = t; }
        function e() { _.point = t; }
        function r() { M[0] = l, M[1] = h, _.point = n, m = null; }
        function u(n, e) { if (m) {
            var r = n - p;
            y += fa(r) > 180 ? r + (r > 0 ? 360 : -360) : r;
        }
        else
            v = n, d = e; mc.point(n, e), t(n, e); }
        function i() { mc.lineStart(); }
        function o() { u(v, d), mc.lineEnd(), fa(y) > Ta && (l = -(h = 180)), M[0] = l, M[1] = h, m = null; }
        function a(n, t) { return (t -= n) < 0 ? t + 360 : t; }
        function c(n, t) { return n[0] - t[0]; }
        function s(n, t) { return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n; }
        var l, f, h, g, p, v, d, m, y, x, M, _ = { point: n, lineStart: e, lineEnd: r, polygonStart: function () { _.point = u, _.lineStart = i, _.lineEnd = o, y = 0, mc.polygonStart(); }, polygonEnd: function () { mc.polygonEnd(), _.point = n, _.lineStart = e, _.lineEnd = r, 0 > dc ? (l = -(h = 180), f = -(g = 90)) : y > Ta ? g = 90 : -Ta > y && (f = -90), M[0] = l, M[1] = h; } };
        return function (n) {
            g = h = -(l = f = 1 / 0), x = [], Go.geo.stream(n, _);
            var t = x.length;
            if (t) {
                x.sort(c);
                for (var e, r = 1, u = x[0], i = [u]; t > r; ++r)
                    e = x[r], s(e[0], u) || s(e[1], u) ? (a(u[0], e[1]) > a(u[0], u[1]) && (u[1] = e[1]), a(e[0], u[1]) > a(u[0], u[1]) && (u[0] = e[0])) : i.push(u = e);
                for (var o, e, p = -1 / 0, t = i.length - 1, r = 0, u = i[t]; t >= r; u = e, ++r)
                    e = i[r], (o = a(u[1], e[0])) > p && (p = o, l = e[0], h = u[1]);
            }
            return x = M = null, 1 / 0 === l || 1 / 0 === f ? [[0 / 0, 0 / 0], [0 / 0, 0 / 0]] : [[l, f], [h, g]];
        };
    }(), Go.geo.centroid = function (n) { yc = xc = Mc = _c = bc = wc = Sc = kc = Ec = Ac = Cc = 0, Go.geo.stream(n, Nc); var t = Ec, e = Ac, r = Cc, u = t * t + e * e + r * r; return qa > u && (t = wc, e = Sc, r = kc, Ta > xc && (t = Mc, e = _c, r = bc), u = t * t + e * e + r * r, qa > u) ? [0 / 0, 0 / 0] : [Math.atan2(e, t) * Ra, G(r / Math.sqrt(u)) * Ra]; };
    var yc, xc, Mc, _c, bc, wc, Sc, kc, Ec, Ac, Cc, Nc = { sphere: v, point: be, lineStart: Se, lineEnd: ke, polygonStart: function () { Nc.lineStart = Ee; }, polygonEnd: function () { Nc.lineStart = Se; } }, Lc = Te(Ae, Pe, je, [-Ca, -Ca / 2]), Tc = 1e9;
    Go.geo.clipExtent = function () { var n, t, e, r, u, i, o = { stream: function (n) { return u && (u.valid = !1), u = i(n), u.valid = !0, u; }, extent: function (a) { return arguments.length ? (i = Oe(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), u && (u.valid = !1, u = null), o) : [[n, t], [e, r]]; } }; return o.extent([[0, 0], [960, 500]]); }, (Go.geo.conicEqualArea = function () { return Ye(Ze); }).raw = Ze, Go.geo.albers = function () { return Go.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070); }, Go.geo.albersUsa = function () { function n(n) { var i = n[0], o = n[1]; return t = null, e(i, o), t || (r(i, o), t) || u(i, o), t; } var t, e, r, u, i = Go.geo.albers(), o = Go.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), a = Go.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), c = { point: function (n, e) { t = [n, e]; } }; return n.invert = function (n) { var t = i.scale(), e = i.translate(), r = (n[0] - e[0]) / t, u = (n[1] - e[1]) / t; return (u >= .12 && .234 > u && r >= -.425 && -.214 > r ? o : u >= .166 && .234 > u && r >= -.214 && -.115 > r ? a : i).invert(n); }, n.stream = function (n) { var t = i.stream(n), e = o.stream(n), r = a.stream(n); return { point: function (n, u) { t.point(n, u), e.point(n, u), r.point(n, u); }, sphere: function () { t.sphere(), e.sphere(), r.sphere(); }, lineStart: function () { t.lineStart(), e.lineStart(), r.lineStart(); }, lineEnd: function () { t.lineEnd(), e.lineEnd(), r.lineEnd(); }, polygonStart: function () { t.polygonStart(), e.polygonStart(), r.polygonStart(); }, polygonEnd: function () { t.polygonEnd(), e.polygonEnd(), r.polygonEnd(); } }; }, n.precision = function (t) { return arguments.length ? (i.precision(t), o.precision(t), a.precision(t), n) : i.precision(); }, n.scale = function (t) { return arguments.length ? (i.scale(t), o.scale(.35 * t), a.scale(t), n.translate(i.translate())) : i.scale(); }, n.translate = function (t) { if (!arguments.length)
        return i.translate(); var s = i.scale(), l = +t[0], f = +t[1]; return e = i.translate(t).clipExtent([[l - .455 * s, f - .238 * s], [l + .455 * s, f + .238 * s]]).stream(c).point, r = o.translate([l - .307 * s, f + .201 * s]).clipExtent([[l - .425 * s + Ta, f + .12 * s + Ta], [l - .214 * s - Ta, f + .234 * s - Ta]]).stream(c).point, u = a.translate([l - .205 * s, f + .212 * s]).clipExtent([[l - .214 * s + Ta, f + .166 * s + Ta], [l - .115 * s - Ta, f + .234 * s - Ta]]).stream(c).point, n; }, n.scale(1070); };
    var qc, zc, Rc, Dc, Pc, Uc, jc = { point: v, lineStart: v, lineEnd: v, polygonStart: function () { zc = 0, jc.lineStart = Ve; }, polygonEnd: function () { jc.lineStart = jc.lineEnd = jc.point = v, qc += fa(zc / 2); } }, Hc = { point: $e, lineStart: v, lineEnd: v, polygonStart: v, polygonEnd: v }, Fc = { point: Je, lineStart: We, lineEnd: Ge, polygonStart: function () { Fc.lineStart = Ke; }, polygonEnd: function () { Fc.point = Je, Fc.lineStart = We, Fc.lineEnd = Ge; } };
    Go.geo.path = function () { function n(n) { return n && ("function" == typeof a && i.pointRadius(+a.apply(this, arguments)), o && o.valid || (o = u(i)), Go.geo.stream(n, o)), i.result(); } function t() { return o = null, n; } var e, r, u, i, o, a = 4.5; return n.area = function (n) { return qc = 0, Go.geo.stream(n, u(jc)), qc; }, n.centroid = function (n) { return Mc = _c = bc = wc = Sc = kc = Ec = Ac = Cc = 0, Go.geo.stream(n, u(Fc)), Cc ? [Ec / Cc, Ac / Cc] : kc ? [wc / kc, Sc / kc] : bc ? [Mc / bc, _c / bc] : [0 / 0, 0 / 0]; }, n.bounds = function (n) { return Pc = Uc = -(Rc = Dc = 1 / 0), Go.geo.stream(n, u(Hc)), [[Rc, Dc], [Pc, Uc]]; }, n.projection = function (n) { return arguments.length ? (u = (e = n) ? n.stream || tr(n) : At, t()) : e; }, n.context = function (n) { return arguments.length ? (i = null == (r = n) ? new Xe : new Qe(n), "function" != typeof a && i.pointRadius(a), t()) : r; }, n.pointRadius = function (t) { return arguments.length ? (a = "function" == typeof t ? t : (i.pointRadius(+t), +t), n) : a; }, n.projection(Go.geo.albersUsa()).context(null); }, Go.geo.transform = function (n) { return { stream: function (t) { var e = new er(t); for (var r in n)
            e[r] = n[r]; return e; } }; }, er.prototype = { point: function (n, t) { this.stream.point(n, t); }, sphere: function () { this.stream.sphere(); }, lineStart: function () { this.stream.lineStart(); }, lineEnd: function () { this.stream.lineEnd(); }, polygonStart: function () { this.stream.polygonStart(); }, polygonEnd: function () { this.stream.polygonEnd(); } }, Go.geo.projection = ur, Go.geo.projectionMutator = ir, (Go.geo.equirectangular = function () { return ur(ar); }).raw = ar.invert = ar, Go.geo.rotation = function (n) { function t(t) { return t = n(t[0] * za, t[1] * za), t[0] *= Ra, t[1] *= Ra, t; } return n = sr(n[0] % 360 * za, n[1] * za, n.length > 2 ? n[2] * za : 0), t.invert = function (t) { return t = n.invert(t[0] * za, t[1] * za), t[0] *= Ra, t[1] *= Ra, t; }, t; }, cr.invert = ar, Go.geo.circle = function () { function n() { var n = "function" == typeof r ? r.apply(this, arguments) : r, t = sr(-n[0] * za, -n[1] * za, 0).invert, u = []; return e(null, null, 1, { point: function (n, e) { u.push(n = t(n, e)), n[0] *= Ra, n[1] *= Ra; } }), { type: "Polygon", coordinates: [u] }; } var t, e, r = [0, 0], u = 6; return n.origin = function (t) { return arguments.length ? (r = t, n) : r; }, n.angle = function (r) { return arguments.length ? (e = gr((t = +r) * za, u * za), n) : t; }, n.precision = function (r) { return arguments.length ? (e = gr(t * za, (u = +r) * za), n) : u; }, n.angle(90); }, Go.geo.distance = function (n, t) { var e, r = (t[0] - n[0]) * za, u = n[1] * za, i = t[1] * za, o = Math.sin(r), a = Math.cos(r), c = Math.sin(u), s = Math.cos(u), l = Math.sin(i), f = Math.cos(i); return Math.atan2(Math.sqrt((e = f * o) * e + (e = s * l - c * f * a) * e), c * l + s * f * a); }, Go.geo.graticule = function () { function n() { return { type: "MultiLineString", coordinates: t() }; } function t() { return Go.range(Math.ceil(i / d) * d, u, d).map(h).concat(Go.range(Math.ceil(s / m) * m, c, m).map(g)).concat(Go.range(Math.ceil(r / p) * p, e, p).filter(function (n) { return fa(n % d) > Ta; }).map(l)).concat(Go.range(Math.ceil(a / v) * v, o, v).filter(function (n) { return fa(n % m) > Ta; }).map(f)); } var e, r, u, i, o, a, c, s, l, f, h, g, p = 10, v = p, d = 90, m = 360, y = 2.5; return n.lines = function () { return t().map(function (n) { return { type: "LineString", coordinates: n }; }); }, n.outline = function () { return { type: "Polygon", coordinates: [h(i).concat(g(c).slice(1), h(u).reverse().slice(1), g(s).reverse().slice(1))] }; }, n.extent = function (t) { return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent(); }, n.majorExtent = function (t) { return arguments.length ? (i = +t[0][0], u = +t[1][0], s = +t[0][1], c = +t[1][1], i > u && (t = i, i = u, u = t), s > c && (t = s, s = c, c = t), n.precision(y)) : [[i, s], [u, c]]; }, n.minorExtent = function (t) { return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], r > e && (t = r, r = e, e = t), a > o && (t = a, a = o, o = t), n.precision(y)) : [[r, a], [e, o]]; }, n.step = function (t) { return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep(); }, n.majorStep = function (t) { return arguments.length ? (d = +t[0], m = +t[1], n) : [d, m]; }, n.minorStep = function (t) { return arguments.length ? (p = +t[0], v = +t[1], n) : [p, v]; }, n.precision = function (t) { return arguments.length ? (y = +t, l = vr(a, o, 90), f = dr(r, e, y), h = vr(s, c, 90), g = dr(i, u, y), n) : y; }, n.majorExtent([[-180, -90 + Ta], [180, 90 - Ta]]).minorExtent([[-180, -80 - Ta], [180, 80 + Ta]]); }, Go.geo.greatArc = function () { function n() { return { type: "LineString", coordinates: [t || r.apply(this, arguments), e || u.apply(this, arguments)] }; } var t, e, r = mr, u = yr; return n.distance = function () { return Go.geo.distance(t || r.apply(this, arguments), e || u.apply(this, arguments)); }, n.source = function (e) { return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r; }, n.target = function (t) { return arguments.length ? (u = t, e = "function" == typeof t ? null : t, n) : u; }, n.precision = function () { return arguments.length ? n : 0; }, n; }, Go.geo.interpolate = function (n, t) { return xr(n[0] * za, n[1] * za, t[0] * za, t[1] * za); }, Go.geo.length = function (n) { return Oc = 0, Go.geo.stream(n, Ic), Oc; };
    var Oc, Ic = { sphere: v, point: v, lineStart: Mr, lineEnd: v, polygonStart: v, polygonEnd: v }, Yc = _r(function (n) { return Math.sqrt(2 / (1 + n)); }, function (n) { return 2 * Math.asin(n / 2); });
    (Go.geo.azimuthalEqualArea = function () { return ur(Yc); }).raw = Yc;
    var Zc = _r(function (n) { var t = Math.acos(n); return t && t / Math.sin(t); }, At);
    (Go.geo.azimuthalEquidistant = function () { return ur(Zc); }).raw = Zc, (Go.geo.conicConformal = function () { return Ye(br); }).raw = br, (Go.geo.conicEquidistant = function () { return Ye(wr); }).raw = wr;
    var Vc = _r(function (n) { return 1 / n; }, Math.atan);
    (Go.geo.gnomonic = function () { return ur(Vc); }).raw = Vc, Sr.invert = function (n, t) { return [n, 2 * Math.atan(Math.exp(t)) - La]; }, (Go.geo.mercator = function () { return kr(Sr); }).raw = Sr;
    var $c = _r(function () { return 1; }, Math.asin);
    (Go.geo.orthographic = function () { return ur($c); }).raw = $c;
    var Xc = _r(function (n) { return 1 / (1 + n); }, function (n) { return 2 * Math.atan(n); });
    (Go.geo.stereographic = function () { return ur(Xc); }).raw = Xc, Er.invert = function (n, t) { return [-t, 2 * Math.atan(Math.exp(n)) - La]; }, (Go.geo.transverseMercator = function () { var n = kr(Er), t = n.center, e = n.rotate; return n.center = function (n) { return n ? t([-n[1], n[0]]) : (n = t(), [-n[1], n[0]]); }, n.rotate = function (n) { return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = e(), [n[0], n[1], n[2] - 90]); }, n.rotate([0, 0]); }).raw = Er, Go.geom = {}, Go.geom.hull = function (n) { function t(n) { if (n.length < 3)
        return []; var t, u = Et(e), i = Et(r), o = n.length, a = [], c = []; for (t = 0; o > t; t++)
        a.push([+u.call(this, n[t], t), +i.call(this, n[t], t), t]); for (a.sort(Lr), t = 0; o > t; t++)
        c.push([a[t][0], -a[t][1]]); var s = Nr(a), l = Nr(c), f = l[0] === s[0], h = l[l.length - 1] === s[s.length - 1], g = []; for (t = s.length - 1; t >= 0; --t)
        g.push(n[a[s[t]][2]]); for (t = +f; t < l.length - h; ++t)
        g.push(n[a[l[t]][2]]); return g; } var e = Ar, r = Cr; return arguments.length ? t(n) : (t.x = function (n) { return arguments.length ? (e = n, t) : e; }, t.y = function (n) { return arguments.length ? (r = n, t) : r; }, t); }, Go.geom.polygon = function (n) { return da(n, Bc), n; };
    var Bc = Go.geom.polygon.prototype = [];
    Bc.area = function () { for (var n, t = -1, e = this.length, r = this[e - 1], u = 0; ++t < e;)
        n = r, r = this[t], u += n[1] * r[0] - n[0] * r[1]; return .5 * u; }, Bc.centroid = function (n) { var t, e, r = -1, u = this.length, i = 0, o = 0, a = this[u - 1]; for (arguments.length || (n = -1 / (6 * this.area())); ++r < u;)
        t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], i += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e; return [i * n, o * n]; }, Bc.clip = function (n) { for (var t, e, r, u, i, o, a = zr(n), c = -1, s = this.length - zr(this), l = this[s - 1]; ++c < s;) {
        for (t = n.slice(), n.length = 0, u = this[c], i = t[(r = t.length - a) - 1], e = -1; ++e < r;)
            o = t[e], Tr(o, l, u) ? (Tr(i, l, u) || n.push(qr(i, o, l, u)), n.push(o)) : Tr(i, l, u) && n.push(qr(i, o, l, u)), i = o;
        a && n.push(n[0]), l = u;
    } return n; };
    var Jc, Wc, Gc, Kc, Qc, ns = [], ts = [];
    Or.prototype.prepare = function () { for (var n, t = this.links, e = t.length; e--;)
        n = t[e].link, n.b && n.a || t.splice(e, 1); return t.sort(Yr), t.length; }, Qr.prototype = { start: function () { return this.link.l === this.site ? this.link.a : this.link.b; }, end: function () { return this.link.l === this.site ? this.link.b : this.link.a; } }, nu.prototype = { insert: function (n, t) { var e, r, u; if (n) {
            if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
                for (n = n.R; n.L;)
                    n = n.L;
                n.L = t;
            }
            else
                n.R = t;
            e = n;
        }
        else
            this._ ? (n = uu(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null); for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;)
            r = e.U, e === r.L ? (u = r.R, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.R && (eu(this, e), n = e, e = n.U), e.C = !1, r.C = !0, ru(this, r))) : (u = r.L, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.L && (ru(this, e), n = e, e = n.U), e.C = !1, r.C = !0, eu(this, r))), e = n.U; this._.C = !1; }, remove: function (n) { n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null; var t, e, r, u = n.U, i = n.L, o = n.R; if (e = i ? o ? uu(o) : i : o, u ? u.L === n ? u.L = e : u.R = e : this._ = e, i && o ? (r = e.C, e.C = n.C, e.L = i, i.U = e, e !== o ? (u = e.U, e.U = n.U, n = e.R, u.L = n, e.R = o, o.U = e) : (e.U = u, u = e, n = e.R)) : (r = n.C, n = e), n && (n.U = u), !r) {
            if (n && n.C)
                return n.C = !1, void 0;
            do {
                if (n === this._)
                    break;
                if (n === u.L) {
                    if (t = u.R, t.C && (t.C = !1, u.C = !0, eu(this, u), t = u.R), t.L && t.L.C || t.R && t.R.C) {
                        t.R && t.R.C || (t.L.C = !1, t.C = !0, ru(this, t), t = u.R), t.C = u.C, u.C = t.R.C = !1, eu(this, u), n = this._;
                        break;
                    }
                }
                else if (t = u.L, t.C && (t.C = !1, u.C = !0, ru(this, u), t = u.L), t.L && t.L.C || t.R && t.R.C) {
                    t.L && t.L.C || (t.R.C = !1, t.C = !0, eu(this, t), t = u.L), t.C = u.C, u.C = t.L.C = !1, ru(this, u), n = this._;
                    break;
                }
                t.C = !0, n = u, u = u.U;
            } while (!n.C);
            n && (n.C = !1);
        } } }, Go.geom.voronoi = function (n) { function t(n) { var t = new Array(n.length), r = a[0][0], u = a[0][1], i = a[1][0], o = a[1][1]; return iu(e(n), a).cells.forEach(function (e, a) { var c = e.links, s = e.site, l = t[a] = c.length ? c.map(function (n) { var t = n.start(); return [t.x, t.y]; }) : s.x >= r && s.x <= i && s.y >= u && s.y <= o ? [[r, o], [i, o], [i, u], [r, u]] : []; l.point = n[a]; }), t; } function e(n) { return n.map(function (n, t) { return { x: Math.round(i(n, t) / Ta) * Ta, y: Math.round(o(n, t) / Ta) * Ta, i: t }; }); } var r = Ar, u = Cr, i = r, o = u, a = es; return n ? t(n) : (t.links = function (n) { return iu(e(n)).links.filter(function (n) { return n.l && n.r; }).map(function (t) { return { source: n[t.l.i], target: n[t.r.i] }; }); }, t.triangles = function (n) { var t = []; return iu(e(n)).cells.forEach(function (e, r) { for (var u, i, o = e.site, a = e.links.sort(Yr), c = -1, s = a.length, l = a[s - 1].link, f = l.l === o ? l.r : l.l; ++c < s;)
        u = l, i = f, l = a[c].link, f = l.l === o ? l.r : l.l, r < i.i && r < f.i && au(o, i, f) < 0 && t.push([n[r], n[i.i], n[f.i]]); }), t; }, t.x = function (n) { return arguments.length ? (i = Et(r = n), t) : r; }, t.y = function (n) { return arguments.length ? (o = Et(u = n), t) : u; }, t.clipExtent = function (n) { return arguments.length ? (a = null == n ? es : n, t) : a === es ? null : a; }, t.size = function (n) { return arguments.length ? t.clipExtent(n && [[0, 0], n]) : a === es ? null : a && a[1]; }, t); };
    var es = [[-1e6, -1e6], [1e6, 1e6]];
    Go.geom.delaunay = function (n) { return Go.geom.voronoi().triangles(n); }, Go.geom.quadtree = function (n, t, e, r, u) { function i(n) { function i(n, t, e, r, u, i, o, a) { if (!isNaN(e) && !isNaN(r))
        if (n.leaf) {
            var c = n.x, l = n.y;
            if (null != c)
                if (fa(c - e) + fa(l - r) < .01)
                    s(n, t, e, r, u, i, o, a);
                else {
                    var f = n.point;
                    n.x = n.y = n.point = null, s(n, f, c, l, u, i, o, a), s(n, t, e, r, u, i, o, a);
                }
            else
                n.x = e, n.y = r, n.point = t;
        }
        else
            s(n, t, e, r, u, i, o, a); } function s(n, t, e, r, u, o, a, c) { var s = .5 * (u + a), l = .5 * (o + c), f = e >= s, h = r >= l, g = (h << 1) + f; n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = lu()), f ? u = s : a = s, h ? o = l : c = l, i(n, t, e, r, u, o, a, c); } var l, f, h, g, p, v, d, m, y, x = Et(a), M = Et(c); if (null != t)
        v = t, d = e, m = r, y = u;
    else if (m = y = -(v = d = 1 / 0), f = [], h = [], p = n.length, o)
        for (g = 0; p > g; ++g)
            l = n[g], l.x < v && (v = l.x), l.y < d && (d = l.y), l.x > m && (m = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y);
    else
        for (g = 0; p > g; ++g) {
            var _ = +x(l = n[g], g), b = +M(l, g);
            v > _ && (v = _), d > b && (d = b), _ > m && (m = _), b > y && (y = b), f.push(_), h.push(b);
        } var w = m - v, S = y - d; w > S ? y = d + w : m = v + S; var k = lu(); if (k.add = function (n) { i(k, n, +x(n, ++g), +M(n, g), v, d, m, y); }, k.visit = function (n) { fu(n, k, v, d, m, y); }, g = -1, null == t) {
        for (; ++g < p;)
            i(k, n[g], f[g], h[g], v, d, m, y);
        --g;
    }
    else
        n.forEach(k.add); return f = h = n = l = null, k; } var o, a = Ar, c = Cr; return (o = arguments.length) ? (a = cu, c = su, 3 === o && (u = e, r = t, e = t = 0), i(n)) : (i.x = function (n) { return arguments.length ? (a = n, i) : a; }, i.y = function (n) { return arguments.length ? (c = n, i) : c; }, i.extent = function (n) { return arguments.length ? (null == n ? t = e = r = u = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], u = +n[1][1]), i) : null == t ? null : [[t, e], [r, u]]; }, i.size = function (n) { return arguments.length ? (null == n ? t = e = r = u = null : (t = e = 0, r = +n[0], u = +n[1]), i) : null == t ? null : [r - t, u - e]; }, i); }, Go.interpolateRgb = hu, Go.interpolateObject = gu, Go.interpolateNumber = pu, Go.interpolateString = vu;
    var rs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, us = new RegExp(rs.source, "g");
    Go.interpolate = du, Go.interpolators = [function (n, t) { var e = typeof t; return ("string" === e ? Ja.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? hu : vu : t instanceof et ? hu : Array.isArray(t) ? mu : "object" === e && isNaN(t) ? gu : pu)(n, t); }], Go.interpolateArray = mu;
    var is = function () { return At; }, os = Go.map({ linear: is, poly: Su, quad: function () { return _u; }, cubic: function () { return bu; }, sin: function () { return ku; }, exp: function () { return Eu; }, circle: function () { return Au; }, elastic: Cu, back: Nu, bounce: function () { return Lu; } }), as = Go.map({ "in": At, out: xu, "in-out": Mu, "out-in": function (n) { return Mu(xu(n)); } });
    Go.ease = function (n) { var t = n.indexOf("-"), e = t >= 0 ? n.substring(0, t) : n, r = t >= 0 ? n.substring(t + 1) : "in"; return e = os.get(e) || is, r = as.get(r) || At, yu(r(e.apply(null, Ko.call(arguments, 1)))); }, Go.interpolateHcl = Tu, Go.interpolateHsl = qu, Go.interpolateLab = zu, Go.interpolateRound = Ru, Go.transform = function (n) { var t = na.createElementNS(Go.ns.prefix.svg, "g"); return (Go.transform = function (n) { if (null != n) {
        t.setAttribute("transform", n);
        var e = t.transform.baseVal.consolidate();
    } return new Du(e ? e.matrix : cs); })(n); }, Du.prototype.toString = function () { return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"; };
    var cs = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    Go.interpolateTransform = Hu, Go.layout = {}, Go.layout.bundle = function () { return function (n) { for (var t = [], e = -1, r = n.length; ++e < r;)
        t.push(Iu(n[e])); return t; }; }, Go.layout.chord = function () { function n() { var n, s, f, h, g, p = {}, v = [], d = Go.range(i), m = []; for (e = [], r = [], n = 0, h = -1; ++h < i;) {
        for (s = 0, g = -1; ++g < i;)
            s += u[h][g];
        v.push(s), m.push(Go.range(i)), n += s;
    } for (o && d.sort(function (n, t) { return o(v[n], v[t]); }), a && m.forEach(function (n, t) { n.sort(function (n, e) { return a(u[t][n], u[t][e]); }); }), n = (Na - l * i) / n, s = 0, h = -1; ++h < i;) {
        for (f = s, g = -1; ++g < i;) {
            var y = d[h], x = m[y][g], M = u[y][x], _ = s, b = s += M * n;
            p[y + "-" + x] = { index: y, subindex: x, startAngle: _, endAngle: b, value: M };
        }
        r[y] = { index: y, startAngle: f, endAngle: s, value: (s - f) / n }, s += l;
    } for (h = -1; ++h < i;)
        for (g = h - 1; ++g < i;) {
            var w = p[h + "-" + g], S = p[g + "-" + h];
            (w.value || S.value) && e.push(w.value < S.value ? { source: S, target: w } : { source: w, target: S });
        } c && t(); } function t() { e.sort(function (n, t) { return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2); }); } var e, r, u, i, o, a, c, s = {}, l = 0; return s.matrix = function (n) { return arguments.length ? (i = (u = n) && u.length, e = r = null, s) : u; }, s.padding = function (n) { return arguments.length ? (l = n, e = r = null, s) : l; }, s.sortGroups = function (n) { return arguments.length ? (o = n, e = r = null, s) : o; }, s.sortSubgroups = function (n) { return arguments.length ? (a = n, e = null, s) : a; }, s.sortChords = function (n) { return arguments.length ? (c = n, e && t(), s) : c; }, s.chords = function () { return e || n(), e; }, s.groups = function () { return r || n(), r; }, s; }, Go.layout.force = function () { function n(n) { return function (t, e, r, u) { if (t.point !== n) {
        var i = t.cx - n.x, o = t.cy - n.y, a = u - e, c = i * i + o * o;
        if (c > a * a / d) {
            if (p > c) {
                var s = t.charge / c;
                n.px -= i * s, n.py -= o * s;
            }
            return !0;
        }
        if (t.point && c && p > c) {
            var s = t.pointCharge / c;
            n.px -= i * s, n.py -= o * s;
        }
    } return !t.charge; }; } function t(n) { n.px = Go.event.x, n.py = Go.event.y, a.resume(); } var e, r, u, i, o, a = {}, c = Go.dispatch("start", "tick", "end"), s = [1, 1], l = .9, f = ss, h = ls, g = -30, p = fs, v = .1, d = .64, m = [], y = []; return a.tick = function () { if ((r *= .99) < .005)
        return c.end({ type: "end", alpha: r = 0 }), !0; var t, e, a, f, h, p, d, x, M, _ = m.length, b = y.length; for (e = 0; b > e; ++e)
        a = y[e], f = a.source, h = a.target, x = h.x - f.x, M = h.y - f.y, (p = x * x + M * M) && (p = r * i[e] * ((p = Math.sqrt(p)) - u[e]) / p, x *= p, M *= p, h.x -= x * (d = f.weight / (h.weight + f.weight)), h.y -= M * d, f.x += x * (d = 1 - d), f.y += M * d); if ((d = r * v) && (x = s[0] / 2, M = s[1] / 2, e = -1, d))
        for (; ++e < _;)
            a = m[e], a.x += (x - a.x) * d, a.y += (M - a.y) * d; if (g)
        for (Ju(t = Go.geom.quadtree(m), r, o), e = -1; ++e < _;)
            (a = m[e]).fixed || t.visit(n(a)); for (e = -1; ++e < _;)
        a = m[e], a.fixed ? (a.x = a.px, a.y = a.py) : (a.x -= (a.px - (a.px = a.x)) * l, a.y -= (a.py - (a.py = a.y)) * l); c.tick({ type: "tick", alpha: r }); }, a.nodes = function (n) { return arguments.length ? (m = n, a) : m; }, a.links = function (n) { return arguments.length ? (y = n, a) : y; }, a.size = function (n) { return arguments.length ? (s = n, a) : s; }, a.linkDistance = function (n) { return arguments.length ? (f = "function" == typeof n ? n : +n, a) : f; }, a.distance = a.linkDistance, a.linkStrength = function (n) { return arguments.length ? (h = "function" == typeof n ? n : +n, a) : h; }, a.friction = function (n) { return arguments.length ? (l = +n, a) : l; }, a.charge = function (n) { return arguments.length ? (g = "function" == typeof n ? n : +n, a) : g; }, a.chargeDistance = function (n) { return arguments.length ? (p = n * n, a) : Math.sqrt(p); }, a.gravity = function (n) { return arguments.length ? (v = +n, a) : v; }, a.theta = function (n) { return arguments.length ? (d = n * n, a) : Math.sqrt(d); }, a.alpha = function (n) { return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({ type: "start", alpha: r = n }), Go.timer(a.tick)), a) : r; }, a.start = function () { function n(n, r) { if (!e) {
        for (e = new Array(c), a = 0; c > a; ++a)
            e[a] = [];
        for (a = 0; s > a; ++a) {
            var u = y[a];
            e[u.source.index].push(u.target), e[u.target.index].push(u.source);
        }
    } for (var i, o = e[t], a = -1, s = o.length; ++a < s;)
        if (!isNaN(i = o[a][n]))
            return i; return Math.random() * r; } var t, e, r, c = m.length, l = y.length, p = s[0], v = s[1]; for (t = 0; c > t; ++t)
        (r = m[t]).index = t, r.weight = 0; for (t = 0; l > t; ++t)
        r = y[t], "number" == typeof r.source && (r.source = m[r.source]), "number" == typeof r.target && (r.target = m[r.target]), ++r.source.weight, ++r.target.weight; for (t = 0; c > t; ++t)
        r = m[t], isNaN(r.x) && (r.x = n("x", p)), isNaN(r.y) && (r.y = n("y", v)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y); if (u = [], "function" == typeof f)
        for (t = 0; l > t; ++t)
            u[t] = +f.call(this, y[t], t);
    else
        for (t = 0; l > t; ++t)
            u[t] = f; if (i = [], "function" == typeof h)
        for (t = 0; l > t; ++t)
            i[t] = +h.call(this, y[t], t);
    else
        for (t = 0; l > t; ++t)
            i[t] = h; if (o = [], "function" == typeof g)
        for (t = 0; c > t; ++t)
            o[t] = +g.call(this, m[t], t);
    else
        for (t = 0; c > t; ++t)
            o[t] = g; return a.resume(); }, a.resume = function () { return a.alpha(.1); }, a.stop = function () { return a.alpha(0); }, a.drag = function () { return e || (e = Go.behavior.drag().origin(At).on("dragstart.force", Vu).on("drag.force", t).on("dragend.force", $u)), arguments.length ? (this.on("mouseover.force", Xu).on("mouseout.force", Bu).call(e), void 0) : e; }, Go.rebind(a, c, "on"); };
    var ss = 20, ls = 1, fs = 1 / 0;
    Go.layout.hierarchy = function () { function n(t, o, a) { var c = u.call(e, t, o); if (t.depth = o, a.push(t), c && (s = c.length)) {
        for (var s, l, f = -1, h = t.children = new Array(s), g = 0, p = o + 1; ++f < s;)
            l = h[f] = n(c[f], p, a), l.parent = t, g += l.value;
        r && h.sort(r), i && (t.value = g);
    }
    else
        delete t.children, i && (t.value = +i.call(e, t, o) || 0); return t; } function t(n, r) { var u = n.children, o = 0; if (u && (a = u.length))
        for (var a, c = -1, s = r + 1; ++c < a;)
            o += t(u[c], s);
    else
        i && (o = +i.call(e, n, r) || 0); return i && (n.value = o), o; } function e(t) { var e = []; return n(t, 0, e), e; } var r = Qu, u = Gu, i = Ku; return e.sort = function (n) { return arguments.length ? (r = n, e) : r; }, e.children = function (n) { return arguments.length ? (u = n, e) : u; }, e.value = function (n) { return arguments.length ? (i = n, e) : i; }, e.revalue = function (n) { return t(n, 0), n; }, e; }, Go.layout.partition = function () { function n(t, e, r, u) { var i = t.children; if (t.x = e, t.y = t.depth * u, t.dx = r, t.dy = u, i && (o = i.length)) {
        var o, a, c, s = -1;
        for (r = t.value ? r / t.value : 0; ++s < o;)
            n(a = i[s], e, c = a.value * r, u), e += c;
    } } function t(n) { var e = n.children, r = 0; if (e && (u = e.length))
        for (var u, i = -1; ++i < u;)
            r = Math.max(r, t(e[i])); return 1 + r; } function e(e, i) { var o = r.call(this, e, i); return n(o[0], 0, u[0], u[1] / t(o[0])), o; } var r = Go.layout.hierarchy(), u = [1, 1]; return e.size = function (n) { return arguments.length ? (u = n, e) : u; }, Wu(e, r); }, Go.layout.pie = function () { function n(i) { var o = i.map(function (e, r) { return +t.call(n, e, r); }), a = +("function" == typeof r ? r.apply(this, arguments) : r), c = (("function" == typeof u ? u.apply(this, arguments) : u) - a) / Go.sum(o), s = Go.range(i.length); null != e && s.sort(e === hs ? function (n, t) { return o[t] - o[n]; } : function (n, t) { return e(i[n], i[t]); }); var l = []; return s.forEach(function (n) { var t; l[n] = { data: i[n], value: t = o[n], startAngle: a, endAngle: a += t * c }; }), l; } var t = Number, e = hs, r = 0, u = Na; return n.value = function (e) { return arguments.length ? (t = e, n) : t; }, n.sort = function (t) { return arguments.length ? (e = t, n) : e; }, n.startAngle = function (t) { return arguments.length ? (r = t, n) : r; }, n.endAngle = function (t) { return arguments.length ? (u = t, n) : u; }, n; };
    var hs = {};
    Go.layout.stack = function () { function n(a, c) { var s = a.map(function (e, r) { return t.call(n, e, r); }), l = s.map(function (t) { return t.map(function (t, e) { return [i.call(n, t, e), o.call(n, t, e)]; }); }), f = e.call(n, l, c); s = Go.permute(s, f), l = Go.permute(l, f); var h, g, p, v = r.call(n, l, c), d = s.length, m = s[0].length; for (g = 0; m > g; ++g)
        for (u.call(n, s[0][g], p = v[g], l[0][g][1]), h = 1; d > h; ++h)
            u.call(n, s[h][g], p += l[h - 1][g][1], l[h][g][1]); return a; } var t = At, e = ui, r = ii, u = ri, i = ti, o = ei; return n.values = function (e) { return arguments.length ? (t = e, n) : t; }, n.order = function (t) { return arguments.length ? (e = "function" == typeof t ? t : gs.get(t) || ui, n) : e; }, n.offset = function (t) { return arguments.length ? (r = "function" == typeof t ? t : ps.get(t) || ii, n) : r; }, n.x = function (t) { return arguments.length ? (i = t, n) : i; }, n.y = function (t) { return arguments.length ? (o = t, n) : o; }, n.out = function (t) { return arguments.length ? (u = t, n) : u; }, n; };
    var gs = Go.map({ "inside-out": function (n) { var t, e, r = n.length, u = n.map(oi), i = n.map(ai), o = Go.range(r).sort(function (n, t) { return u[n] - u[t]; }), a = 0, c = 0, s = [], l = []; for (t = 0; r > t; ++t)
            e = o[t], c > a ? (a += i[e], s.push(e)) : (c += i[e], l.push(e)); return l.reverse().concat(s); }, reverse: function (n) { return Go.range(n.length).reverse(); }, "default": ui }), ps = Go.map({ silhouette: function (n) { var t, e, r, u = n.length, i = n[0].length, o = [], a = 0, c = []; for (e = 0; i > e; ++e) {
            for (t = 0, r = 0; u > t; t++)
                r += n[t][e][1];
            r > a && (a = r), o.push(r);
        } for (e = 0; i > e; ++e)
            c[e] = (a - o[e]) / 2; return c; }, wiggle: function (n) { var t, e, r, u, i, o, a, c, s, l = n.length, f = n[0], h = f.length, g = []; for (g[0] = c = s = 0, e = 1; h > e; ++e) {
            for (t = 0, u = 0; l > t; ++t)
                u += n[t][e][1];
            for (t = 0, i = 0, a = f[e][0] - f[e - 1][0]; l > t; ++t) {
                for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); t > r; ++r)
                    o += (n[r][e][1] - n[r][e - 1][1]) / a;
                i += o * n[t][e][1];
            }
            g[e] = c -= u ? i / u * a : 0, s > c && (s = c);
        } for (e = 0; h > e; ++e)
            g[e] -= s; return g; }, expand: function (n) { var t, e, r, u = n.length, i = n[0].length, o = 1 / u, a = []; for (e = 0; i > e; ++e) {
            for (t = 0, r = 0; u > t; t++)
                r += n[t][e][1];
            if (r)
                for (t = 0; u > t; t++)
                    n[t][e][1] /= r;
            else
                for (t = 0; u > t; t++)
                    n[t][e][1] = o;
        } for (e = 0; i > e; ++e)
            a[e] = 0; return a; }, zero: ii });
    Go.layout.histogram = function () { function n(n, i) { for (var o, a, c = [], s = n.map(e, this), l = r.call(this, s, i), f = u.call(this, l, s, i), i = -1, h = s.length, g = f.length - 1, p = t ? 1 : 1 / h; ++i < g;)
        o = c[i] = [], o.dx = f[i + 1] - (o.x = f[i]), o.y = 0; if (g > 0)
        for (i = -1; ++i < h;)
            a = s[i], a >= l[0] && a <= l[1] && (o = c[Go.bisect(f, a, 1, g) - 1], o.y += p, o.push(n[i])); return c; } var t = !0, e = Number, r = fi, u = si; return n.value = function (t) { return arguments.length ? (e = t, n) : e; }, n.range = function (t) { return arguments.length ? (r = Et(t), n) : r; }, n.bins = function (t) { return arguments.length ? (u = "number" == typeof t ? function (n) { return li(n, t); } : Et(t), n) : u; }, n.frequency = function (e) { return arguments.length ? (t = !!e, n) : t; }, n; }, Go.layout.tree = function () { function n(n, i) { function o(n, t) { var r = n.children, u = n._tree; if (r && (i = r.length)) {
        for (var i, a, s, l = r[0], f = l, h = -1; ++h < i;)
            s = r[h], o(s, a), f = c(s, a, f), a = s;
        Mi(n);
        var g = .5 * (l._tree.prelim + s._tree.prelim);
        t ? (u.prelim = t._tree.prelim + e(n, t), u.mod = u.prelim - g) : u.prelim = g;
    }
    else
        t && (u.prelim = t._tree.prelim + e(n, t)); } function a(n, t) { n.x = n._tree.prelim + t; var e = n.children; if (e && (r = e.length)) {
        var r, u = -1;
        for (t += n._tree.mod; ++u < r;)
            a(e[u], t);
    } } function c(n, t, r) { if (t) {
        for (var u, i = n, o = n, a = t, c = n.parent.children[0], s = i._tree.mod, l = o._tree.mod, f = a._tree.mod, h = c._tree.mod; a = pi(a), i = gi(i), a && i;)
            c = gi(c), o = pi(o), o._tree.ancestor = n, u = a._tree.prelim + f - i._tree.prelim - s + e(a, i), u > 0 && (_i(bi(a, n, r), n, u), s += u, l += u), f += a._tree.mod, s += i._tree.mod, h += c._tree.mod, l += o._tree.mod;
        a && !pi(o) && (o._tree.thread = a, o._tree.mod += f - l), i && !gi(c) && (c._tree.thread = i, c._tree.mod += s - h, r = n);
    } return r; } var s = t.call(this, n, i), l = s[0]; xi(l, function (n, t) { n._tree = { ancestor: n, prelim: 0, mod: 0, change: 0, shift: 0, number: t ? t._tree.number + 1 : 0 }; }), o(l), a(l, -l._tree.prelim); var f = vi(l, mi), h = vi(l, di), g = vi(l, yi), p = f.x - e(f, h) / 2, v = h.x + e(h, f) / 2, d = g.depth || 1; return xi(l, u ? function (n) { n.x *= r[0], n.y = n.depth * r[1], delete n._tree; } : function (n) { n.x = (n.x - p) / (v - p) * r[0], n.y = n.depth / d * r[1], delete n._tree; }), s; } var t = Go.layout.hierarchy().sort(null).value(null), e = hi, r = [1, 1], u = !1; return n.separation = function (t) { return arguments.length ? (e = t, n) : e; }, n.size = function (t) { return arguments.length ? (u = null == (r = t), n) : u ? null : r; }, n.nodeSize = function (t) { return arguments.length ? (u = null != (r = t), n) : u ? r : null; }, Wu(n, t); }, Go.layout.pack = function () { function n(n, i) { var o = e.call(this, n, i), a = o[0], c = u[0], s = u[1], l = null == t ? Math.sqrt : "function" == typeof t ? t : function () { return t; }; if (a.x = a.y = 0, xi(a, function (n) { n.r = +l(n.value); }), xi(a, Ai), r) {
        var f = r * (t ? 1 : Math.max(2 * a.r / c, 2 * a.r / s)) / 2;
        xi(a, function (n) { n.r += f; }), xi(a, Ai), xi(a, function (n) { n.r -= f; });
    } return Li(a, c / 2, s / 2, t ? 1 : 1 / Math.max(2 * a.r / c, 2 * a.r / s)), o; } var t, e = Go.layout.hierarchy().sort(wi), r = 0, u = [1, 1]; return n.size = function (t) { return arguments.length ? (u = t, n) : u; }, n.radius = function (e) { return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t; }, n.padding = function (t) { return arguments.length ? (r = +t, n) : r; }, Wu(n, e); }, Go.layout.cluster = function () { function n(n, i) { var o, a = t.call(this, n, i), c = a[0], s = 0; xi(c, function (n) { var t = n.children; t && t.length ? (n.x = zi(t), n.y = qi(t)) : (n.x = o ? s += e(n, o) : 0, n.y = 0, o = n); }); var l = Ri(c), f = Di(c), h = l.x - e(l, f) / 2, g = f.x + e(f, l) / 2; return xi(c, u ? function (n) { n.x = (n.x - c.x) * r[0], n.y = (c.y - n.y) * r[1]; } : function (n) { n.x = (n.x - h) / (g - h) * r[0], n.y = (1 - (c.y ? n.y / c.y : 1)) * r[1]; }), a; } var t = Go.layout.hierarchy().sort(null).value(null), e = hi, r = [1, 1], u = !1; return n.separation = function (t) { return arguments.length ? (e = t, n) : e; }, n.size = function (t) { return arguments.length ? (u = null == (r = t), n) : u ? null : r; }, n.nodeSize = function (t) { return arguments.length ? (u = null != (r = t), n) : u ? r : null; }, Wu(n, t); }, Go.layout.treemap = function () { function n(n, t) { for (var e, r, u = -1, i = n.length; ++u < i;)
        r = (e = n[u]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r; } function t(e) { var i = e.children; if (i && i.length) {
        var o, a, c, s = f(e), l = [], h = i.slice(), p = 1 / 0, v = "slice" === g ? s.dx : "dice" === g ? s.dy : "slice-dice" === g ? 1 & e.depth ? s.dy : s.dx : Math.min(s.dx, s.dy);
        for (n(h, s.dx * s.dy / e.value), l.area = 0; (c = h.length) > 0;)
            l.push(o = h[c - 1]), l.area += o.area, "squarify" !== g || (a = r(l, v)) <= p ? (h.pop(), p = a) : (l.area -= l.pop().area, u(l, v, s, !1), v = Math.min(s.dx, s.dy), l.length = l.area = 0, p = 1 / 0);
        l.length && (u(l, v, s, !0), l.length = l.area = 0), i.forEach(t);
    } } function e(t) { var r = t.children; if (r && r.length) {
        var i, o = f(t), a = r.slice(), c = [];
        for (n(a, o.dx * o.dy / t.value), c.area = 0; i = a.pop();)
            c.push(i), c.area += i.area, null != i.z && (u(c, i.z ? o.dx : o.dy, o, !a.length), c.length = c.area = 0);
        r.forEach(e);
    } } function r(n, t) { for (var e, r = n.area, u = 0, i = 1 / 0, o = -1, a = n.length; ++o < a;)
        (e = n[o].area) && (i > e && (i = e), e > u && (u = e)); return r *= r, t *= t, r ? Math.max(t * u * p / r, r / (t * i * p)) : 1 / 0; } function u(n, t, e, r) { var u, i = -1, o = n.length, a = e.x, s = e.y, l = t ? c(n.area / t) : 0; if (t == e.dx) {
        for ((r || l > e.dy) && (l = e.dy); ++i < o;)
            u = n[i], u.x = a, u.y = s, u.dy = l, a += u.dx = Math.min(e.x + e.dx - a, l ? c(u.area / l) : 0);
        u.z = !0, u.dx += e.x + e.dx - a, e.y += l, e.dy -= l;
    }
    else {
        for ((r || l > e.dx) && (l = e.dx); ++i < o;)
            u = n[i], u.x = a, u.y = s, u.dx = l, s += u.dy = Math.min(e.y + e.dy - s, l ? c(u.area / l) : 0);
        u.z = !1, u.dy += e.y + e.dy - s, e.x += l, e.dx -= l;
    } } function i(r) { var u = o || a(r), i = u[0]; return i.x = 0, i.y = 0, i.dx = s[0], i.dy = s[1], o && a.revalue(i), n([i], i.dx * i.dy / i.value), (o ? e : t)(i), h && (o = u), u; } var o, a = Go.layout.hierarchy(), c = Math.round, s = [1, 1], l = null, f = Pi, h = !1, g = "squarify", p = .5 * (1 + Math.sqrt(5)); return i.size = function (n) { return arguments.length ? (s = n, i) : s; }, i.padding = function (n) { function t(t) { var e = n.call(i, t, t.depth); return null == e ? Pi(t) : Ui(t, "number" == typeof e ? [e, e, e, e] : e); } function e(t) { return Ui(t, n); } if (!arguments.length)
        return l; var r; return f = null == (l = n) ? Pi : "function" == (r = typeof n) ? t : "number" === r ? (n = [n, n, n, n], e) : e, i; }, i.round = function (n) { return arguments.length ? (c = n ? Math.round : Number, i) : c != Number; }, i.sticky = function (n) { return arguments.length ? (h = n, o = null, i) : h; }, i.ratio = function (n) { return arguments.length ? (p = n, i) : p; }, i.mode = function (n) { return arguments.length ? (g = n + "", i) : g; }, Wu(i, a); }, Go.random = { normal: function (n, t) { var e = arguments.length; return 2 > e && (t = 1), 1 > e && (n = 0), function () { var e, r, u; do
            e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, u = e * e + r * r;
        while (!u || u > 1); return n + t * e * Math.sqrt(-2 * Math.log(u) / u); }; }, logNormal: function () { var n = Go.random.normal.apply(Go, arguments); return function () { return Math.exp(n()); }; }, bates: function (n) { var t = Go.random.irwinHall(n); return function () { return t() / n; }; }, irwinHall: function (n) { return function () { for (var t = 0, e = 0; n > e; e++)
            t += Math.random(); return t; }; } }, Go.scale = {};
    var vs = { floor: At, ceil: At };
    Go.scale.linear = function () { return Zi([0, 1], [0, 1], du, !1); };
    var ds = { s: 1, g: 1, p: 1, r: 1, e: 1 };
    Go.scale.log = function () { return Ki(Go.scale.linear().domain([0, 1]), 10, !0, [1, 10]); };
    var ms = Go.format(".0e"), ys = { floor: function (n) { return -Math.ceil(-n); }, ceil: function (n) { return -Math.floor(-n); } };
    Go.scale.pow = function () { return Qi(Go.scale.linear(), 1, [0, 1]); }, Go.scale.sqrt = function () { return Go.scale.pow().exponent(.5); }, Go.scale.ordinal = function () { return to([], { t: "range", a: [[]] }); }, Go.scale.category10 = function () { return Go.scale.ordinal().range(xs); }, Go.scale.category20 = function () { return Go.scale.ordinal().range(Ms); }, Go.scale.category20b = function () { return Go.scale.ordinal().range(_s); }, Go.scale.category20c = function () { return Go.scale.ordinal().range(bs); };
    var xs = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(mt), Ms = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(mt), _s = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(mt), bs = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(mt);
    Go.scale.quantile = function () { return eo([], []); }, Go.scale.quantize = function () { return ro(0, 1, [0, 1]); }, Go.scale.threshold = function () { return uo([.5], [0, 1]); }, Go.scale.identity = function () { return io([0, 1]); }, Go.svg = {}, Go.svg.arc = function () {
        function n() {
            var n = t.apply(this, arguments), i = e.apply(this, arguments), o = r.apply(this, arguments) + ws, a = u.apply(this, arguments) + ws, c = (o > a && (c = o, o = a, a = c), a - o), s = Ca > c ? "0" : "1", l = Math.cos(o), f = Math.sin(o), h = Math.cos(a), g = Math.sin(a);
            return c >= Ss ? n ? "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "Z" : n ? "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L" + n * h + "," + n * g + "A" + n + "," + n + " 0 " + s + ",0 " + n * l + "," + n * f + "Z" : "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L0,0" + "Z";
        }
        var t = oo, e = ao, r = co, u = so;
        return n.innerRadius = function (e) { return arguments.length ? (t = Et(e), n) : t; }, n.outerRadius = function (t) { return arguments.length ? (e = Et(t), n) : e; }, n.startAngle = function (t) { return arguments.length ? (r = Et(t), n) : r; }, n.endAngle = function (t) { return arguments.length ? (u = Et(t), n) : u; }, n.centroid = function () { var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2, i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + ws; return [Math.cos(i) * n, Math.sin(i) * n]; }, n;
    };
    var ws = -La, Ss = Na - Ta;
    Go.svg.line = function () { return lo(At); };
    var ks = Go.map({ linear: fo, "linear-closed": ho, step: go, "step-before": po, "step-after": vo, basis: bo, "basis-open": wo, "basis-closed": So, bundle: ko, cardinal: xo, "cardinal-open": mo, "cardinal-closed": yo, monotone: To });
    ks.forEach(function (n, t) { t.key = n, t.closed = /-closed$/.test(n); });
    var Es = [0, 2 / 3, 1 / 3, 0], As = [0, 1 / 3, 2 / 3, 0], Cs = [0, 1 / 6, 2 / 3, 1 / 6];
    Go.svg.line.radial = function () { var n = lo(qo); return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n; }, po.reverse = vo, vo.reverse = po, Go.svg.area = function () { return zo(At); }, Go.svg.area.radial = function () { var n = zo(qo); return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n; }, Go.svg.chord = function () { function n(n, a) { var c = t(this, i, n, a), s = t(this, o, n, a); return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, s) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, s.r, s.p0) + r(s.r, s.p1, s.a1 - s.a0) + u(s.r, s.p1, c.r, c.p0)) + "Z"; } function t(n, t, e, r) { var u = t.call(n, e, r), i = a.call(n, u, r), o = c.call(n, u, r) + ws, l = s.call(n, u, r) + ws; return { r: i, a0: o, a1: l, p0: [i * Math.cos(o), i * Math.sin(o)], p1: [i * Math.cos(l), i * Math.sin(l)] }; } function e(n, t) { return n.a0 == t.a0 && n.a1 == t.a1; } function r(n, t, e) { return "A" + n + "," + n + " 0 " + +(e > Ca) + ",1 " + t; } function u(n, t, e, r) { return "Q 0,0 " + r; } var i = mr, o = yr, a = Ro, c = co, s = so; return n.radius = function (t) { return arguments.length ? (a = Et(t), n) : a; }, n.source = function (t) { return arguments.length ? (i = Et(t), n) : i; }, n.target = function (t) { return arguments.length ? (o = Et(t), n) : o; }, n.startAngle = function (t) { return arguments.length ? (c = Et(t), n) : c; }, n.endAngle = function (t) { return arguments.length ? (s = Et(t), n) : s; }, n; }, Go.svg.diagonal = function () { function n(n, u) { var i = t.call(this, n, u), o = e.call(this, n, u), a = (i.y + o.y) / 2, c = [i, { x: i.x, y: a }, { x: o.x, y: a }, o]; return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]; } var t = mr, e = yr, r = Do; return n.source = function (e) { return arguments.length ? (t = Et(e), n) : t; }, n.target = function (t) { return arguments.length ? (e = Et(t), n) : e; }, n.projection = function (t) { return arguments.length ? (r = t, n) : r; }, n; }, Go.svg.diagonal.radial = function () { var n = Go.svg.diagonal(), t = Do, e = n.projection; return n.projection = function (n) { return arguments.length ? e(Po(t = n)) : t; }, n; }, Go.svg.symbol = function () { function n(n, r) { return (Ns.get(t.call(this, n, r)) || Ho)(e.call(this, n, r)); } var t = jo, e = Uo; return n.type = function (e) { return arguments.length ? (t = Et(e), n) : t; }, n.size = function (t) { return arguments.length ? (e = Et(t), n) : e; }, n; };
    var Ns = Go.map({ circle: Ho, cross: function (n) { var t = Math.sqrt(n / 5) / 2; return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"; }, diamond: function (n) { var t = Math.sqrt(n / (2 * zs)), e = t * zs; return "M0," + -t + "L" + e + ",0" + " 0," + t + " " + -e + ",0" + "Z"; }, square: function (n) { var t = Math.sqrt(n) / 2; return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"; }, "triangle-down": function (n) { var t = Math.sqrt(n / qs), e = t * qs / 2; return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z"; }, "triangle-up": function (n) { var t = Math.sqrt(n / qs), e = t * qs / 2; return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z"; } });
    Go.svg.symbolTypes = Ns.keys();
    var Ls, Ts, qs = Math.sqrt(3), zs = Math.tan(30 * za), Rs = [], Ds = 0;
    Rs.call = _a.call, Rs.empty = _a.empty, Rs.node = _a.node, Rs.size = _a.size, Go.transition = function (n) { return arguments.length ? Ls ? n.transition() : n : Sa.transition(); }, Go.transition.prototype = Rs, Rs.select = function (n) { var t, e, r, u = this.id, i = []; n = b(n); for (var o = -1, a = this.length; ++o < a;) {
        i.push(t = []);
        for (var c = this[o], s = -1, l = c.length; ++s < l;)
            (r = c[s]) && (e = n.call(r, r.__data__, s, o)) ? ("__data__" in r && (e.__data__ = r.__data__), Yo(e, s, u, r.__transition__[u]), t.push(e)) : t.push(null);
    } return Fo(i, u); }, Rs.selectAll = function (n) { var t, e, r, u, i, o = this.id, a = []; n = w(n); for (var c = -1, s = this.length; ++c < s;)
        for (var l = this[c], f = -1, h = l.length; ++f < h;)
            if (r = l[f]) {
                i = r.__transition__[o], e = n.call(r, r.__data__, f, c), a.push(t = []);
                for (var g = -1, p = e.length; ++g < p;)
                    (u = e[g]) && Yo(u, g, o, i), t.push(u);
            } return Fo(a, o); }, Rs.filter = function (n) { var t, e, r, u = []; "function" != typeof n && (n = R(n)); for (var i = 0, o = this.length; o > i; i++) {
        u.push(t = []);
        for (var e = this[i], a = 0, c = e.length; c > a; a++)
            (r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r);
    } return Fo(u, this.id); }, Rs.tween = function (n, t) { var e = this.id; return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : P(this, null == t ? function (t) { t.__transition__[e].tween.remove(n); } : function (r) { r.__transition__[e].tween.set(n, t); }); }, Rs.attr = function (n, t) { function e() { this.removeAttribute(a); } function r() { this.removeAttributeNS(a.space, a.local); } function u(n) { return null == n ? e : (n += "", function () { var t, e = this.getAttribute(a); return e !== n && (t = o(e, n), function (n) { this.setAttribute(a, t(n)); }); }); } function i(n) { return null == n ? r : (n += "", function () { var t, e = this.getAttributeNS(a.space, a.local); return e !== n && (t = o(e, n), function (n) { this.setAttributeNS(a.space, a.local, t(n)); }); }); } if (arguments.length < 2) {
        for (t in n)
            this.attr(t, n[t]);
        return this;
    } var o = "transform" == n ? Hu : du, a = Go.ns.qualify(n); return Oo(this, "attr." + n, t, a.local ? i : u); }, Rs.attrTween = function (n, t) { function e(n, e) { var r = t.call(this, n, e, this.getAttribute(u)); return r && function (n) { this.setAttribute(u, r(n)); }; } function r(n, e) { var r = t.call(this, n, e, this.getAttributeNS(u.space, u.local)); return r && function (n) { this.setAttributeNS(u.space, u.local, r(n)); }; } var u = Go.ns.qualify(n); return this.tween("attr." + n, u.local ? r : e); }, Rs.style = function (n, t, e) { function r() { this.style.removeProperty(n); } function u(t) { return null == t ? r : (t += "", function () { var r, u = ea.getComputedStyle(this, null).getPropertyValue(n); return u !== t && (r = du(u, t), function (t) { this.style.setProperty(n, r(t), e); }); }); } var i = arguments.length; if (3 > i) {
        if ("string" != typeof n) {
            2 > i && (t = "");
            for (e in n)
                this.style(e, n[e], t);
            return this;
        }
        e = "";
    } return Oo(this, "style." + n, t, u); }, Rs.styleTween = function (n, t, e) { function r(r, u) { var i = t.call(this, r, u, ea.getComputedStyle(this, null).getPropertyValue(n)); return i && function (t) { this.style.setProperty(n, i(t), e); }; } return arguments.length < 3 && (e = ""), this.tween("style." + n, r); }, Rs.text = function (n) { return Oo(this, "text", n, Io); }, Rs.remove = function () { return this.each("end.transition", function () { var n; this.__transition__.count < 2 && (n = this.parentNode) && n.removeChild(this); }); }, Rs.ease = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = Go.ease.apply(Go, arguments)), P(this, function (e) { e.__transition__[t].ease = n; })); }, Rs.delay = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].delay : P(this, "function" == typeof n ? function (e, r, u) { e.__transition__[t].delay = +n.call(e, e.__data__, r, u); } : (n = +n, function (e) { e.__transition__[t].delay = n; })); }, Rs.duration = function (n) { var t = this.id; return arguments.length < 1 ? this.node().__transition__[t].duration : P(this, "function" == typeof n ? function (e, r, u) { e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, u)); } : (n = Math.max(1, n), function (e) { e.__transition__[t].duration = n; })); }, Rs.each = function (n, t) { var e = this.id; if (arguments.length < 2) {
        var r = Ts, u = Ls;
        Ls = e, P(this, function (t, r, u) { Ts = t.__transition__[e], n.call(t, t.__data__, r, u); }), Ts = r, Ls = u;
    }
    else
        P(this, function (r) { var u = r.__transition__[e]; (u.event || (u.event = Go.dispatch("start", "end"))).on(n, t); }); return this; }, Rs.transition = function () { for (var n, t, e, r, u = this.id, i = ++Ds, o = [], a = 0, c = this.length; c > a; a++) {
        o.push(n = []);
        for (var t = this[a], s = 0, l = t.length; l > s; s++)
            (e = t[s]) && (r = Object.create(e.__transition__[u]), r.delay += r.duration, Yo(e, s, i, r)), n.push(e);
    } return Fo(o, i); }, Go.svg.axis = function () { function n(n) { n.each(function () { var n, s = Go.select(this), l = this.__chart__ || e, f = this.__chart__ = e.copy(), h = null == c ? f.ticks ? f.ticks.apply(f, a) : f.domain() : c, g = null == t ? f.tickFormat ? f.tickFormat.apply(f, a) : At : t, p = s.selectAll(".tick").data(h, f), v = p.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Ta), d = Go.transition(p.exit()).style("opacity", Ta).remove(), m = Go.transition(p.order()).style("opacity", 1), y = Hi(f), x = s.selectAll(".domain").data([0]), M = (x.enter().append("path").attr("class", "domain"), Go.transition(x)); v.append("line"), v.append("text"); var _ = v.select("line"), b = m.select("line"), w = p.select("text").text(g), S = v.select("text"), k = m.select("text"); switch (r) {
        case "bottom":
            n = Zo, _.attr("y2", u), S.attr("y", Math.max(u, 0) + o), b.attr("x2", 0).attr("y2", u), k.attr("x", 0).attr("y", Math.max(u, 0) + o), w.attr("dy", ".71em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + i + "V0H" + y[1] + "V" + i);
            break;
        case "top":
            n = Zo, _.attr("y2", -u), S.attr("y", -(Math.max(u, 0) + o)), b.attr("x2", 0).attr("y2", -u), k.attr("x", 0).attr("y", -(Math.max(u, 0) + o)), w.attr("dy", "0em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + -i + "V0H" + y[1] + "V" + -i);
            break;
        case "left":
            n = Vo, _.attr("x2", -u), S.attr("x", -(Math.max(u, 0) + o)), b.attr("x2", -u).attr("y2", 0), k.attr("x", -(Math.max(u, 0) + o)).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "end"), M.attr("d", "M" + -i + "," + y[0] + "H0V" + y[1] + "H" + -i);
            break;
        case "right": n = Vo, _.attr("x2", u), S.attr("x", Math.max(u, 0) + o), b.attr("x2", u).attr("y2", 0), k.attr("x", Math.max(u, 0) + o).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "start"), M.attr("d", "M" + i + "," + y[0] + "H0V" + y[1] + "H" + i);
    } if (f.rangeBand) {
        var E = f, A = E.rangeBand() / 2;
        l = f = function (n) { return E(n) + A; };
    }
    else
        l.rangeBand ? l = f : d.call(n, f); v.call(n, l), m.call(n, f); }); } var t, e = Go.scale.linear(), r = Ps, u = 6, i = 6, o = 3, a = [10], c = null; return n.scale = function (t) { return arguments.length ? (e = t, n) : e; }, n.orient = function (t) { return arguments.length ? (r = t in Us ? t + "" : Ps, n) : r; }, n.ticks = function () { return arguments.length ? (a = arguments, n) : a; }, n.tickValues = function (t) { return arguments.length ? (c = t, n) : c; }, n.tickFormat = function (e) { return arguments.length ? (t = e, n) : t; }, n.tickSize = function (t) { var e = arguments.length; return e ? (u = +t, i = +arguments[e - 1], n) : u; }, n.innerTickSize = function (t) { return arguments.length ? (u = +t, n) : u; }, n.outerTickSize = function (t) { return arguments.length ? (i = +t, n) : i; }, n.tickPadding = function (t) { return arguments.length ? (o = +t, n) : o; }, n.tickSubdivide = function () { return arguments.length && n; }, n; };
    var Ps = "bottom", Us = { top: 1, right: 1, bottom: 1, left: 1 };
    Go.svg.brush = function () { function n(i) { i.each(function () { var i = Go.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", u).on("touchstart.brush", u), o = i.selectAll(".background").data([0]); o.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), i.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move"); var a = i.selectAll(".resize").data(p, At); a.exit().remove(), a.enter().append("g").attr("class", function (n) { return "resize " + n; }).style("cursor", function (n) { return js[n]; }).append("rect").attr("x", function (n) { return /[ew]$/.test(n) ? -3 : null; }).attr("y", function (n) { return /^[ns]/.test(n) ? -3 : null; }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null); var l, f = Go.transition(i), h = Go.transition(o); c && (l = Hi(c), h.attr("x", l[0]).attr("width", l[1] - l[0]), e(f)), s && (l = Hi(s), h.attr("y", l[0]).attr("height", l[1] - l[0]), r(f)), t(f); }); } function t(n) { n.selectAll(".resize").attr("transform", function (n) { return "translate(" + l[+/e$/.test(n)] + "," + f[+/^s/.test(n)] + ")"; }); } function e(n) { n.select(".extent").attr("x", l[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", l[1] - l[0]); } function r(n) { n.select(".extent").attr("y", f[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", f[1] - f[0]); } function u() { function u() { 32 == Go.event.keyCode && (C || (x = null, L[0] -= l[1], L[1] -= f[1], C = 2), y()); } function p() { 32 == Go.event.keyCode && 2 == C && (L[0] += l[1], L[1] += f[1], C = 0, y()); } function v() { var n = Go.mouse(_), u = !1; M && (n[0] += M[0], n[1] += M[1]), C || (Go.event.altKey ? (x || (x = [(l[0] + l[1]) / 2, (f[0] + f[1]) / 2]), L[0] = l[+(n[0] < x[0])], L[1] = f[+(n[1] < x[1])]) : x = null), E && d(n, c, 0) && (e(S), u = !0), A && d(n, s, 1) && (r(S), u = !0), u && (t(S), w({ type: "brush", mode: C ? "move" : "resize" })); } function d(n, t, e) { var r, u, a = Hi(t), c = a[0], s = a[1], p = L[e], v = e ? f : l, d = v[1] - v[0]; return C && (c -= p, s -= d + p), r = (e ? g : h) ? Math.max(c, Math.min(s, n[e])) : n[e], C ? u = (r += p) + d : (x && (p = Math.max(c, Math.min(s, 2 * x[e] - r))), r > p ? (u = r, r = p) : u = p), v[0] != r || v[1] != u ? (e ? o = null : i = null, v[0] = r, v[1] = u, !0) : void 0; } function m() { v(), S.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), Go.select("body").style("cursor", null), T.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), N(), w({ type: "brushend" }); } var x, M, _ = this, b = Go.select(Go.event.target), w = a.of(_, arguments), S = Go.select(_), k = b.datum(), E = !/^(n|s)$/.test(k) && c, A = !/^(e|w)$/.test(k) && s, C = b.classed("extent"), N = Y(), L = Go.mouse(_), T = Go.select(ea).on("keydown.brush", u).on("keyup.brush", p); if (Go.event.changedTouches ? T.on("touchmove.brush", v).on("touchend.brush", m) : T.on("mousemove.brush", v).on("mouseup.brush", m), S.interrupt().selectAll("*").interrupt(), C)
        L[0] = l[0] - L[0], L[1] = f[0] - L[1];
    else if (k) {
        var q = +/w$/.test(k), z = +/^n/.test(k);
        M = [l[1 - q] - L[0], f[1 - z] - L[1]], L[0] = l[q], L[1] = f[z];
    }
    else
        Go.event.altKey && (x = L.slice()); S.style("pointer-events", "none").selectAll(".resize").style("display", null), Go.select("body").style("cursor", b.style("cursor")), w({ type: "brushstart" }), v(); } var i, o, a = M(n, "brushstart", "brush", "brushend"), c = null, s = null, l = [0, 0], f = [0, 0], h = !0, g = !0, p = Hs[0]; return n.event = function (n) { n.each(function () { var n = a.of(this, arguments), t = { x: l, y: f, i: i, j: o }, e = this.__chart__ || t; this.__chart__ = t, Ls ? Go.select(this).transition().each("start.brush", function () { i = e.i, o = e.j, l = e.x, f = e.y, n({ type: "brushstart" }); }).tween("brush:brush", function () { var e = mu(l, t.x), r = mu(f, t.y); return i = o = null, function (u) { l = t.x = e(u), f = t.y = r(u), n({ type: "brush", mode: "resize" }); }; }).each("end.brush", function () { i = t.i, o = t.j, n({ type: "brush", mode: "resize" }), n({ type: "brushend" }); }) : (n({ type: "brushstart" }), n({ type: "brush", mode: "resize" }), n({ type: "brushend" })); }); }, n.x = function (t) { return arguments.length ? (c = t, p = Hs[!c << 1 | !s], n) : c; }, n.y = function (t) { return arguments.length ? (s = t, p = Hs[!c << 1 | !s], n) : s; }, n.clamp = function (t) { return arguments.length ? (c && s ? (h = !!t[0], g = !!t[1]) : c ? h = !!t : s && (g = !!t), n) : c && s ? [h, g] : c ? h : s ? g : null; }, n.extent = function (t) { var e, r, u, a, h; return arguments.length ? (c && (e = t[0], r = t[1], s && (e = e[0], r = r[0]), i = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (h = e, e = r, r = h), (e != l[0] || r != l[1]) && (l = [e, r])), s && (u = t[0], a = t[1], c && (u = u[1], a = a[1]), o = [u, a], s.invert && (u = s(u), a = s(a)), u > a && (h = u, u = a, a = h), (u != f[0] || a != f[1]) && (f = [u, a])), n) : (c && (i ? (e = i[0], r = i[1]) : (e = l[0], r = l[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (h = e, e = r, r = h))), s && (o ? (u = o[0], a = o[1]) : (u = f[0], a = f[1], s.invert && (u = s.invert(u), a = s.invert(a)), u > a && (h = u, u = a, a = h))), c && s ? [[e, u], [r, a]] : c ? [e, r] : s && [u, a]); }, n.clear = function () { return n.empty() || (l = [0, 0], f = [0, 0], i = o = null), n; }, n.empty = function () { return !!c && l[0] == l[1] || !!s && f[0] == f[1]; }, Go.rebind(n, a, "on"); };
    var js = { n: "ns-resize", e: "ew-resize", s: "ns-resize", w: "ew-resize", nw: "nwse-resize", ne: "nesw-resize", se: "nwse-resize", sw: "nesw-resize" }, Hs = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []], Fs = ic.format = fc.timeFormat, Os = Fs.utc, Is = Os("%Y-%m-%dT%H:%M:%S.%LZ");
    Fs.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? $o : Is, $o.parse = function (n) { var t = new Date(n); return isNaN(t) ? null : t; }, $o.toString = Is.toString, ic.second = Ht(function (n) { return new oc(1e3 * Math.floor(n / 1e3)); }, function (n, t) { n.setTime(n.getTime() + 1e3 * Math.floor(t)); }, function (n) { return n.getSeconds(); }), ic.seconds = ic.second.range, ic.seconds.utc = ic.second.utc.range, ic.minute = Ht(function (n) { return new oc(6e4 * Math.floor(n / 6e4)); }, function (n, t) { n.setTime(n.getTime() + 6e4 * Math.floor(t)); }, function (n) { return n.getMinutes(); }), ic.minutes = ic.minute.range, ic.minutes.utc = ic.minute.utc.range, ic.hour = Ht(function (n) { var t = n.getTimezoneOffset() / 60; return new oc(36e5 * (Math.floor(n / 36e5 - t) + t)); }, function (n, t) { n.setTime(n.getTime() + 36e5 * Math.floor(t)); }, function (n) { return n.getHours(); }), ic.hours = ic.hour.range, ic.hours.utc = ic.hour.utc.range, ic.month = Ht(function (n) { return n = ic.day(n), n.setDate(1), n; }, function (n, t) { n.setMonth(n.getMonth() + t); }, function (n) { return n.getMonth(); }), ic.months = ic.month.range, ic.months.utc = ic.month.utc.range;
    var Ys = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6], Zs = [[ic.second, 1], [ic.second, 5], [ic.second, 15], [ic.second, 30], [ic.minute, 1], [ic.minute, 5], [ic.minute, 15], [ic.minute, 30], [ic.hour, 1], [ic.hour, 3], [ic.hour, 6], [ic.hour, 12], [ic.day, 1], [ic.day, 2], [ic.week, 1], [ic.month, 1], [ic.month, 3], [ic.year, 1]], Vs = Fs.multi([[".%L", function (n) { return n.getMilliseconds(); }], [":%S", function (n) { return n.getSeconds(); }], ["%I:%M", function (n) { return n.getMinutes(); }], ["%I %p", function (n) { return n.getHours(); }], ["%a %d", function (n) { return n.getDay() && 1 != n.getDate(); }], ["%b %d", function (n) { return 1 != n.getDate(); }], ["%B", function (n) { return n.getMonth(); }], ["%Y", Ae]]), $s = { range: function (n, t, e) { return Go.range(Math.ceil(n / e) * e, +t, e).map(Bo); }, floor: At, ceil: At };
    Zs.year = ic.year, ic.scale = function () { return Xo(Go.scale.linear(), Zs, Vs); };
    var Xs = Zs.map(function (n) { return [n[0].utc, n[1]]; }), Bs = Os.multi([[".%L", function (n) { return n.getUTCMilliseconds(); }], [":%S", function (n) { return n.getUTCSeconds(); }], ["%I:%M", function (n) { return n.getUTCMinutes(); }], ["%I %p", function (n) { return n.getUTCHours(); }], ["%a %d", function (n) { return n.getUTCDay() && 1 != n.getUTCDate(); }], ["%b %d", function (n) { return 1 != n.getUTCDate(); }], ["%B", function (n) { return n.getUTCMonth(); }], ["%Y", Ae]]);
    Xs.year = ic.year.utc, ic.scale.utc = function () { return Xo(Go.scale.linear(), Xs, Bs); }, Go.text = Ct(function (n) { return n.responseText; }), Go.json = function (n, t) { return Nt(n, "application/json", Jo, t); }, Go.html = function (n, t) { return Nt(n, "text/html", Wo, t); }, Go.xml = Ct(function (n) { return n.responseXML; }), "function" == typeof define && define.amd ? define(Go) : "object" == typeof module && module.exports ? module.exports = Go : this.d3 = Go;
}();
"use strict";
var netClustering = {
    version: "0.1"
};
(function () {
    function binaryTreeWalk(currentNode, tree, depth, doLeafAction, doDownAction, doUpAction) {
        if (tree[currentNode].leftChild > -1) {
            depth += 1;
            if (doDownAction) {
                doDownAction(currentNode, tree, depth);
            }
            binaryTreeWalk(tree[currentNode].leftChild, tree, depth, doLeafAction, doDownAction, doUpAction);
        }
        if (tree[currentNode].rightChild == -1) {
            if (doLeafAction) {
                doLeafAction(currentNode, tree, depth);
            }
        }
        if (tree[currentNode].rightChild > -1) {
            binaryTreeWalk(tree[currentNode].rightChild, tree, depth, doLeafAction, doDownAction, doUpAction);
            if (doUpAction) {
                doUpAction(currentNode, tree, depth);
            }
            depth -= 1;
        }
    }
    function addClosestPairByCommunity(tree, deltaQ, a) {
        var n = tree.length;
        var H = {};
        for (var hash in deltaQ) {
            var dQ = deltaQ[hash];
            var keys = hash.split("~");
            var i = Number(keys[0]);
            var j = Number(keys[1]);
            if (!H[i]) {
                H[i] = [];
            }
            if (!H[j]) {
                H[j] = [];
            }
            H[i].push({ "dQ": dQ, "i": i, "j": j });
            H[j].push({ "dQ": dQ, "i": i, "j": j });
        }
        var Hmax = { "dQ": -Infinity, "i": -1, "j": -1 };
        for (var i = 0; i < n; i++) {
            if (H[i]) {
                H[i].sort(function (a, b) {
                    return b.dQ - a.dQ;
                });
                if (H[i][0].dQ > Hmax.dQ) {
                    Hmax.dQ = H[i][0].dQ;
                    Hmax.i = H[i][0].i;
                    Hmax.j = H[i][0].j;
                }
            }
        }
        if (Hmax.i == -1) {
            return null;
        }
        var wt = tree[Hmax.i].weight + tree[Hmax.j].weight;
        tree.push({ "parent": -1, "leftChild": Hmax.i, "rightChild": Hmax.j, "weight": wt, "dQ": Hmax.dQ });
        tree[Hmax.i].parent = n;
        tree[Hmax.j].parent = n;
        var hashToZap = [];
        for (var k = 0; k < n; k++) {
            if (k != Hmax.i && k != Hmax.j && H[k]) {
                var hashik = Math.min(Hmax.i, k) + "~" + Math.max(Hmax.i, k);
                var hashjk = Math.min(Hmax.j, k) + "~" + Math.max(Hmax.j, k);
                var hashNew = k + "~" + n;
                var t1 = deltaQ[hashik];
                var t2 = deltaQ[hashjk];
                if (!isNaN(t1)) {
                    hashToZap.push(hashik);
                    if (!isNaN(t2)) {
                        hashToZap.push(hashjk);
                        deltaQ[hashNew] = t1 + t2;
                    }
                    else {
                        deltaQ[hashNew] = t1 - 2.0 * a[Hmax.j] * a[k];
                    }
                }
                else {
                    if (!isNaN(t2)) {
                        hashToZap.push(hashjk);
                        deltaQ[hashNew] = t2 - 2.0 * a[Hmax.i] * a[k];
                    }
                    else {
                        deltaQ[hashNew] = null;
                    }
                }
            }
        }
        a[n] = a[Hmax.i] + a[Hmax.j];
        deltaQ[Hmax.i + "~" + Hmax.j] = null;
        for (var i = 0; i < hashToZap.length; i++) {
            deltaQ[hashToZap[i]] = null;
        }
        var dQcopy = {};
        var ndq = 0;
        for (var hash in deltaQ) {
            if (deltaQ[hash]) {
                dQcopy[hash] = deltaQ[hash];
                ndq++;
            }
        }
        return { "value": Hmax.dQ, "array": dQcopy };
    }
    function buildTreeByCommunities(dataObj, showNotes) {
        var n = dataObj.names.length;
        var k = [];
        for (var i = 0; i < n; i++) {
            k[i] = 0;
        }
        var m = 0;
        var W = 0;
        if (dataObj.useWeights) {
            for (var hash in dataObj.distances) {
                var keys = hash.split("~");
                var i = Number(keys[0]);
                var j = Number(keys[1]);
                var d = dataObj.distances[hash];
                k[i] += d;
                k[j] += d;
                W += d;
                m += 1;
            }
            if (!W) {
                W = 1e-7;
            }
            ;
            var inv2m = 1 / (2 * W);
        }
        else {
            for (var hash in dataObj.distances) {
                var keys = hash.split("~");
                var i = Number(keys[0]);
                var j = Number(keys[1]);
                k[i] += 1;
                k[j] += 1;
                m += 1;
            }
            if (!m) {
                m = 1e-7;
            }
            ;
            var inv2m = 1 / (2 * m);
        }
        var deltaQ = {};
        for (var hash in dataObj.distances) {
            var keys = hash.split("~");
            var i = Number(keys[0]);
            var j = Number(keys[1]);
            if (dataObj.useWeights) {
                deltaQ[hash] = 2.0 * inv2m * dataObj.distances[hash] - 2.0 * inv2m * inv2m * k[i] * k[j];
            }
            else {
                deltaQ[hash] = 2.0 * (inv2m - k[i] * k[j] * inv2m * inv2m);
            }
        }
        var a = [];
        for (var i = 0; i < n; i++) {
            a[i] = inv2m * k[i];
        }
        var tree = [];
        for (var i = 0; i < n; i++) {
            tree.push({ "parent": -1, "leftChild": -1, "rightChild": -1, "weight": 1, "linkage": a[i], "name": dataObj.names[i], "primaryKey": i });
        }
        var Q = 0.0;
        var maxQ = -Infinity;
        var dQobj = { "value": 0, "array": deltaQ };
        var numCommunities = 1;
        while (dQobj && tree.length < (2 * n - 1)) {
            dQobj = addClosestPairByCommunity(tree, dQobj.array, a);
            if (dQobj) {
                Q += dQobj.value;
                if (dQobj.value < 0) {
                    numCommunities += 1;
                }
                ;
                maxQ = Math.max(maxQ, Q);
            }
            else {
                return null;
            }
        }
        var index = 0;
        var root = tree.length - 1;
        binaryTreeWalk(root, tree, 0, function (currentNode, tree, depth) {
            tree[currentNode].index = index;
            index += 1;
        }, null, null);
        if (showNotes) {
            var notes = n + " nodes, " + m + " of " + (n * (n - 1) / 2) + " possible edges (" + Math.round(200 * m / (n * (n - 1))) + "%) ";
            notes += "with data, and " + numCommunities + " primary communities identified.";
            notes += "&nbsp; &nbsp; Q=" + maxQ.toFixed(3);
            document.getElementById("notes").innerHTML = notes;
        }
        return { "tree": tree, "distances": dataObj.distances, "root": root, "names": dataObj.names, "useWeights": dataObj.useWeights };
    }
    function findSplits(treeObj) {
        var breakNext = true;
        var breakNodes = [];
        var g = -1;
        var group = [];
        var members = "";
        var tracker = 0;
        binaryTreeWalk(treeObj.root, treeObj.tree, 0, function (node, tree, depth) {
            if (breakNext) {
                g += 1;
                breakNodes.push(node);
                breakNext = false;
            }
            group[node] = g;
            members += treeObj.tree[node].name + ",";
        }, function (node, tree, depth) {
            var thisNode = tree[node];
            if (thisNode.dQ < 0) {
                breakNext = true;
                tracker = 0;
            }
            tracker += 1;
        }, function (node, tree, depth) {
            var thisNode = tree[node];
            tracker -= 1;
            if (tracker == 1) {
                breakNext = true;
                members += "~";
            }
        });
        var numGroups = g + 1;
        members = members.slice(0, -2);
        members = members.replace(/,~/g, "~");
        return { "numGroups": numGroups, "group": group, "members": members, "breakNodes": breakNodes };
    }
    function findSubCommunities(treeObj, depth, prevGroup) {
        if (!treeObj) {
            return;
        }
        var tree = treeObj.tree;
        var root = treeObj.root;
        var names = treeObj.names;
        var splitInfo = findSplits(treeObj);
        var numGroups = splitInfo.numGroups;
        var group = splitInfo.group;
        var t = splitInfo.members.split("~");
        var groups = [];
        for (var g = 0; g < t.length; g++) {
            groups.push((t[g]).split(","));
        }
        var dataObjList = [];
        for (var g = 0; g < numGroups; g++) {
            dataObjList.push({ "names": [], "distances": [], "useWeights": treeObj.useWeights });
        }
        var nameKeys = [];
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            dataObjList[group[i]].names.push(name);
            nameKeys[i] = dataObjList[group[i]].names.length - 1;
        }
        for (var hash in treeObj.distances) {
            var keys = hash.split("~");
            var i = Number(keys[0]);
            var j = Number(keys[1]);
            if (group[i] == group[j]) {
                var newHash = nameKeys[i] + "~" + nameKeys[j];
                dataObjList[group[i]].distances[newHash] = treeObj.distances[hash];
            }
        }
        if (numGroups > 1) {
            for (var g = 0; g < numGroups; g++) {
                var innerTreeObj = buildTreeByCommunities(dataObjList[g]);
                if (innerTreeObj && innerTreeObj.tree) {
                    var innerGroups = findSplits(innerTreeObj).numGroups;
                    if (innerGroups > 1) {
                        var subgroups = findSubCommunities(innerTreeObj, depth + 1, g);
                        groups[g] = subgroups;
                    }
                }
            }
        }
        return groups;
    }
    netClustering.buildTreeByCommunities = buildTreeByCommunities;
    netClustering.findSubCommunities = findSubCommunities;
    netClustering.cluster = function (nodes, edges, clusterAttr, edgesCountAttr) {
        var dataObj = {}, treeObj, groups = [], i;
        if (clusterAttr === undefined) {
            clusterAttr = "cluster";
        }
        if (edgesCountAttr === undefined) {
            edgesCountAttr = "value";
        }
        var linksForClustering = [];
        if (edges.length > 0 && typeof (edges[0].source) === "object") {
            linksForClustering = edges.map(function (d) {
                var sourceId = nodes.indexOf(d.source), targetId = nodes.indexOf(d.target);
                if (sourceId === -1 || targetId === -1) {
                    return null;
                }
                else {
                    return {
                        sourceId: sourceId,
                        targetId: targetId,
                        count: d[edgesCountAttr] !== undefined ? d[edgesCountAttr] : 1
                    };
                }
            });
        }
        else {
            edges.forEach(function (d) {
                linksForClustering.push({
                    source: d.source,
                    target: d.target,
                    count: d[edgesCountAttr] !== undefined ? d[edgesCountAttr] : 1
                });
            });
        }
        dataObj.method = "newman";
        dataObj.useWeights = true;
        dataObj.names = nodes.map(function (d, i) { return "" + i; });
        dataObj.distances = {};
        linksForClustering = linksForClustering.filter(function (d) { return d.sourceId !== d.targetId; });
        linksForClustering.forEach(function (d) {
            var hash = Math.min(d.sourceId, d.targetId) + "~" + Math.max(d.sourceId, d.targetId);
            dataObj.distances[hash] = +d.count;
        });
        dataObj = addDummyMetaNode(dataObj);
        treeObj = buildTreeByCommunities(dataObj, false);
        console.log('treeObj', treeObj);
        groups = findSubCommunities(treeObj, 0, 0);
        groups = removeDummyMetaNode(groups);
        i = 0;
        groups.forEach(function (d, i) {
            function assignToCluster(ele, i) {
                if (ele instanceof Array) {
                    ele.forEach(function (e) {
                        assignToCluster(e, i);
                    });
                }
                else {
                    nodes[+ele][clusterAttr] = i.toString();
                }
            }
            assignToCluster(d, i);
        });
        return groups;
    };
    function addDummyMetaNode(dataObj) {
        dataObj.names.push("DUMMY");
        dataObj.names.forEach(function (d, i) {
            if (i === dataObj.names.length - 1) {
                return;
            }
            var hash = i + "~" + (dataObj.names.length - 1);
            dataObj.distances[hash] = 0.1;
        });
        return dataObj;
    }
    function removeDummyMetaNode(groups) {
        var i, ele;
        for (i = 0; i < groups.length; i++) {
            ele = groups[i];
            if (ele instanceof Array) {
                ele = removeDummyMetaNode(ele);
                if (ele.length === 0) {
                    groups.splice(i, 1);
                }
            }
            else {
                if (ele === "DUMMY" || ele === "DUMM") {
                    groups.splice(i, 1);
                    break;
                }
            }
        }
        return groups;
    }
})();
(function () {
    var Color, DEG2RAD, LAB_CONSTANTS, PI, PITHIRD, RAD2DEG, TWOPI, _guess_formats, _guess_formats_sorted, _input, _interpolators, abs, atan2, bezier, blend, blend_f, brewer, burn, chroma, clip_rgb, cmyk2rgb, colors, cos, css2rgb, darken, dodge, each, floor, hex2rgb, hsi2rgb, hsl2css, hsl2rgb, hsv2rgb, interpolate, interpolate_hsx, interpolate_lab, interpolate_num, interpolate_rgb, lab2lch, lab2rgb, lab_xyz, lch2lab, lch2rgb, lighten, limit, log, luminance_x, m, max, multiply, normal, num2rgb, overlay, pow, rgb2cmyk, rgb2css, rgb2hex, rgb2hsi, rgb2hsl, rgb2hsv, rgb2lab, rgb2lch, rgb2luminance, rgb2num, rgb2temperature, rgb2xyz, rgb_xyz, rnd, root, round, screen, sin, sqrt, temperature2rgb, type, unpack, w3cx11, xyz_lab, xyz_rgb, slice = [].slice;
    type = (function () {
        var classToType, len, name, o, ref;
        classToType = {};
        ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
        for (o = 0, len = ref.length; o < len; o++) {
            name = ref[o];
            classToType["[object " + name + "]"] = name.toLowerCase();
        }
        return function (obj) {
            var strType;
            strType = Object.prototype.toString.call(obj);
            return classToType[strType] || "object";
        };
    })();
    limit = function (x, min, max) {
        if (min == null) {
            min = 0;
        }
        if (max == null) {
            max = 1;
        }
        if (x < min) {
            x = min;
        }
        if (x > max) {
            x = max;
        }
        return x;
    };
    unpack = function (args) {
        if (args.length >= 3) {
            return [].slice.call(args);
        }
        else {
            return args[0];
        }
    };
    clip_rgb = function (rgb) {
        var i;
        for (i in rgb) {
            if (i < 3) {
                if (rgb[i] < 0) {
                    rgb[i] = 0;
                }
                if (rgb[i] > 255) {
                    rgb[i] = 255;
                }
            }
            else if (i === 3) {
                if (rgb[i] < 0) {
                    rgb[i] = 0;
                }
                if (rgb[i] > 1) {
                    rgb[i] = 1;
                }
            }
        }
        return rgb;
    };
    PI = Math.PI, round = Math.round, cos = Math.cos, floor = Math.floor, pow = Math.pow, log = Math.log, sin = Math.sin, sqrt = Math.sqrt, atan2 = Math.atan2, max = Math.max, abs = Math.abs;
    TWOPI = PI * 2;
    PITHIRD = PI / 3;
    DEG2RAD = PI / 180;
    RAD2DEG = 180 / PI;
    chroma = function () {
        if (arguments[0] instanceof Color) {
            return arguments[0];
        }
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, arguments, function () { });
    };
    _interpolators = [];
    if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
        module.exports = chroma;
    }
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return chroma;
        });
    }
    else {
        root = typeof exports !== "undefined" && exports !== null ? exports : this;
        root.chroma = chroma;
    }
    chroma.version = '1.1.1';
    _input = {};
    _guess_formats = [];
    _guess_formats_sorted = false;
    Color = (function () {
        function Color() {
            var arg, args, chk, len, len1, me, mode, o, w;
            me = this;
            args = [];
            for (o = 0, len = arguments.length; o < len; o++) {
                arg = arguments[o];
                if (arg != null) {
                    args.push(arg);
                }
            }
            mode = args[args.length - 1];
            if (_input[mode] != null) {
                me._rgb = clip_rgb(_input[mode](unpack(args.slice(0, -1))));
            }
            else {
                if (!_guess_formats_sorted) {
                    _guess_formats = _guess_formats.sort(function (a, b) {
                        return b.p - a.p;
                    });
                    _guess_formats_sorted = true;
                }
                for (w = 0, len1 = _guess_formats.length; w < len1; w++) {
                    chk = _guess_formats[w];
                    mode = chk.test.apply(chk, args);
                    if (mode) {
                        break;
                    }
                }
                if (mode) {
                    me._rgb = clip_rgb(_input[mode].apply(_input, args));
                }
            }
            if (me._rgb == null) {
                console.warn('unknown format: ' + args);
            }
            if (me._rgb == null) {
                me._rgb = [0, 0, 0];
            }
            if (me._rgb.length === 3) {
                me._rgb.push(1);
            }
        }
        Color.prototype.alpha = function (alpha) {
            if (arguments.length) {
                this._rgb[3] = alpha;
                return this;
            }
            return this._rgb[3];
        };
        Color.prototype.toString = function () {
            return this.name();
        };
        return Color;
    })();
    chroma._input = _input;
    chroma.brewer = brewer = {
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],
        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']
    };
    w3cx11 = {
        indigo: "#4b0082",
        gold: "#ffd700",
        hotpink: "#ff69b4",
        firebrick: "#b22222",
        indianred: "#cd5c5c",
        yellow: "#ffff00",
        mistyrose: "#ffe4e1",
        darkolivegreen: "#556b2f",
        olive: "#808000",
        darkseagreen: "#8fbc8f",
        pink: "#ffc0cb",
        tomato: "#ff6347",
        lightcoral: "#f08080",
        orangered: "#ff4500",
        navajowhite: "#ffdead",
        lime: "#00ff00",
        palegreen: "#98fb98",
        darkslategrey: "#2f4f4f",
        greenyellow: "#adff2f",
        burlywood: "#deb887",
        seashell: "#fff5ee",
        mediumspringgreen: "#00fa9a",
        fuchsia: "#ff00ff",
        papayawhip: "#ffefd5",
        blanchedalmond: "#ffebcd",
        chartreuse: "#7fff00",
        dimgray: "#696969",
        black: "#000000",
        peachpuff: "#ffdab9",
        springgreen: "#00ff7f",
        aquamarine: "#7fffd4",
        white: "#ffffff",
        orange: "#ffa500",
        lightsalmon: "#ffa07a",
        darkslategray: "#2f4f4f",
        brown: "#a52a2a",
        ivory: "#fffff0",
        dodgerblue: "#1e90ff",
        peru: "#cd853f",
        lawngreen: "#7cfc00",
        chocolate: "#d2691e",
        crimson: "#dc143c",
        forestgreen: "#228b22",
        darkgrey: "#a9a9a9",
        lightseagreen: "#20b2aa",
        cyan: "#00ffff",
        mintcream: "#f5fffa",
        silver: "#c0c0c0",
        antiquewhite: "#faebd7",
        mediumorchid: "#ba55d3",
        skyblue: "#87ceeb",
        gray: "#808080",
        darkturquoise: "#00ced1",
        goldenrod: "#daa520",
        darkgreen: "#006400",
        floralwhite: "#fffaf0",
        darkviolet: "#9400d3",
        darkgray: "#a9a9a9",
        moccasin: "#ffe4b5",
        saddlebrown: "#8b4513",
        grey: "#808080",
        darkslateblue: "#483d8b",
        lightskyblue: "#87cefa",
        lightpink: "#ffb6c1",
        mediumvioletred: "#c71585",
        slategrey: "#708090",
        red: "#ff0000",
        deeppink: "#ff1493",
        limegreen: "#32cd32",
        darkmagenta: "#8b008b",
        palegoldenrod: "#eee8aa",
        plum: "#dda0dd",
        turquoise: "#40e0d0",
        lightgrey: "#d3d3d3",
        lightgoldenrodyellow: "#fafad2",
        darkgoldenrod: "#b8860b",
        lavender: "#e6e6fa",
        maroon: "#800000",
        yellowgreen: "#9acd32",
        sandybrown: "#f4a460",
        thistle: "#d8bfd8",
        violet: "#ee82ee",
        navy: "#000080",
        magenta: "#ff00ff",
        dimgrey: "#696969",
        tan: "#d2b48c",
        rosybrown: "#bc8f8f",
        olivedrab: "#6b8e23",
        blue: "#0000ff",
        lightblue: "#add8e6",
        ghostwhite: "#f8f8ff",
        honeydew: "#f0fff0",
        cornflowerblue: "#6495ed",
        slateblue: "#6a5acd",
        linen: "#faf0e6",
        darkblue: "#00008b",
        powderblue: "#b0e0e6",
        seagreen: "#2e8b57",
        darkkhaki: "#bdb76b",
        snow: "#fffafa",
        sienna: "#a0522d",
        mediumblue: "#0000cd",
        royalblue: "#4169e1",
        lightcyan: "#e0ffff",
        green: "#008000",
        mediumpurple: "#9370db",
        midnightblue: "#191970",
        cornsilk: "#fff8dc",
        paleturquoise: "#afeeee",
        bisque: "#ffe4c4",
        slategray: "#708090",
        darkcyan: "#008b8b",
        khaki: "#f0e68c",
        wheat: "#f5deb3",
        teal: "#008080",
        darkorchid: "#9932cc",
        deepskyblue: "#00bfff",
        salmon: "#fa8072",
        darkred: "#8b0000",
        steelblue: "#4682b4",
        palevioletred: "#db7093",
        lightslategray: "#778899",
        aliceblue: "#f0f8ff",
        lightslategrey: "#778899",
        lightgreen: "#90ee90",
        orchid: "#da70d6",
        gainsboro: "#dcdcdc",
        mediumseagreen: "#3cb371",
        lightgray: "#d3d3d3",
        mediumturquoise: "#48d1cc",
        lemonchiffon: "#fffacd",
        cadetblue: "#5f9ea0",
        lightyellow: "#ffffe0",
        lavenderblush: "#fff0f5",
        coral: "#ff7f50",
        purple: "#800080",
        aqua: "#00ffff",
        whitesmoke: "#f5f5f5",
        mediumslateblue: "#7b68ee",
        darkorange: "#ff8c00",
        mediumaquamarine: "#66cdaa",
        darksalmon: "#e9967a",
        beige: "#f5f5dc",
        blueviolet: "#8a2be2",
        azure: "#f0ffff",
        lightsteelblue: "#b0c4de",
        oldlace: "#fdf5e6",
        rebeccapurple: "#663399"
    };
    chroma.colors = colors = w3cx11;
    lab2rgb = function () {
        var a, args, b, g, l, r, x, y, z;
        args = unpack(arguments);
        l = args[0], a = args[1], b = args[2];
        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;
        y = LAB_CONSTANTS.Yn * lab_xyz(y);
        x = LAB_CONSTANTS.Xn * lab_xyz(x);
        z = LAB_CONSTANTS.Zn * lab_xyz(z);
        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
        r = limit(r, 0, 255);
        g = limit(g, 0, 255);
        b = limit(b, 0, 255);
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    xyz_rgb = function (r) {
        return round(255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055));
    };
    lab_xyz = function (t) {
        if (t > LAB_CONSTANTS.t1) {
            return t * t * t;
        }
        else {
            return LAB_CONSTANTS.t2 * (t - LAB_CONSTANTS.t0);
        }
    };
    LAB_CONSTANTS = {
        Kn: 18,
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,
        t0: 0.137931034,
        t1: 0.206896552,
        t2: 0.12841855,
        t3: 0.008856452
    };
    rgb2lab = function () {
        var b, g, r, ref, ref1, x, y, z;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        ref1 = rgb2xyz(r, g, b), x = ref1[0], y = ref1[1], z = ref1[2];
        return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
    };
    rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) {
            return r / 12.92;
        }
        else {
            return pow((r + 0.055) / 1.055, 2.4);
        }
    };
    xyz_lab = function (t) {
        if (t > LAB_CONSTANTS.t3) {
            return pow(t, 1 / 3);
        }
        else {
            return t / LAB_CONSTANTS.t2 + LAB_CONSTANTS.t0;
        }
    };
    rgb2xyz = function () {
        var b, g, r, ref, x, y, z;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / LAB_CONSTANTS.Xn);
        y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / LAB_CONSTANTS.Yn);
        z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / LAB_CONSTANTS.Zn);
        return [x, y, z];
    };
    chroma.lab = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['lab']), function () { });
    };
    _input.lab = lab2rgb;
    Color.prototype.lab = function () {
        return rgb2lab(this._rgb);
    };
    bezier = function (colors) {
        var I, I0, I1, c, lab0, lab1, lab2, lab3, ref, ref1, ref2;
        colors = (function () {
            var len, o, results;
            results = [];
            for (o = 0, len = colors.length; o < len; o++) {
                c = colors[o];
                results.push(chroma(c));
            }
            return results;
        })();
        if (colors.length === 2) {
            ref = (function () {
                var len, o, results;
                results = [];
                for (o = 0, len = colors.length; o < len; o++) {
                    c = colors[o];
                    results.push(c.lab());
                }
                return results;
            })(), lab0 = ref[0], lab1 = ref[1];
            I = function (t) {
                var i, lab;
                lab = (function () {
                    var o, results;
                    results = [];
                    for (i = o = 0; o <= 2; i = ++o) {
                        results.push(lab0[i] + t * (lab1[i] - lab0[i]));
                    }
                    return results;
                })();
                return chroma.lab.apply(chroma, lab);
            };
        }
        else if (colors.length === 3) {
            ref1 = (function () {
                var len, o, results;
                results = [];
                for (o = 0, len = colors.length; o < len; o++) {
                    c = colors[o];
                    results.push(c.lab());
                }
                return results;
            })(), lab0 = ref1[0], lab1 = ref1[1], lab2 = ref1[2];
            I = function (t) {
                var i, lab;
                lab = (function () {
                    var o, results;
                    results = [];
                    for (i = o = 0; o <= 2; i = ++o) {
                        results.push((1 - t) * (1 - t) * lab0[i] + 2 * (1 - t) * t * lab1[i] + t * t * lab2[i]);
                    }
                    return results;
                })();
                return chroma.lab.apply(chroma, lab);
            };
        }
        else if (colors.length === 4) {
            ref2 = (function () {
                var len, o, results;
                results = [];
                for (o = 0, len = colors.length; o < len; o++) {
                    c = colors[o];
                    results.push(c.lab());
                }
                return results;
            })(), lab0 = ref2[0], lab1 = ref2[1], lab2 = ref2[2], lab3 = ref2[3];
            I = function (t) {
                var i, lab;
                lab = (function () {
                    var o, results;
                    results = [];
                    for (i = o = 0; o <= 2; i = ++o) {
                        results.push((1 - t) * (1 - t) * (1 - t) * lab0[i] + 3 * (1 - t) * (1 - t) * t * lab1[i] + 3 * (1 - t) * t * t * lab2[i] + t * t * t * lab3[i]);
                    }
                    return results;
                })();
                return chroma.lab.apply(chroma, lab);
            };
        }
        else if (colors.length === 5) {
            I0 = bezier(colors.slice(0, 3));
            I1 = bezier(colors.slice(2, 5));
            I = function (t) {
                if (t < 0.5) {
                    return I0(t * 2);
                }
                else {
                    return I1((t - 0.5) * 2);
                }
            };
        }
        return I;
    };
    chroma.bezier = function (colors) {
        var f;
        f = bezier(colors);
        f.scale = function () {
            return chroma.scale(f);
        };
        return f;
    };
    chroma.cubehelix = function (start, rotations, hue, gamma, lightness) {
        var dh, dl, f;
        if (start == null) {
            start = 300;
        }
        if (rotations == null) {
            rotations = -1.5;
        }
        if (hue == null) {
            hue = 1;
        }
        if (gamma == null) {
            gamma = 1;
        }
        if (lightness == null) {
            lightness = [0, 1];
        }
        dl = lightness[1] - lightness[0];
        dh = 0;
        f = function (fract) {
            var a, amp, b, cos_a, g, h, l, r, sin_a;
            a = TWOPI * ((start + 120) / 360 + rotations * fract);
            l = pow(lightness[0] + dl * fract, gamma);
            h = dh !== 0 ? hue[0] + fract * dh : hue;
            amp = h * l * (1 - l) / 2;
            cos_a = cos(a);
            sin_a = sin(a);
            r = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
            g = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
            b = l + amp * (+1.97294 * cos_a);
            return chroma(clip_rgb([r * 255, g * 255, b * 255]));
        };
        f.start = function (s) {
            if (s == null) {
                return start;
            }
            start = s;
            return f;
        };
        f.rotations = function (r) {
            if (r == null) {
                return rotations;
            }
            rotations = r;
            return f;
        };
        f.gamma = function (g) {
            if (g == null) {
                return gamma;
            }
            gamma = g;
            return f;
        };
        f.hue = function (h) {
            if (h == null) {
                return hue;
            }
            hue = h;
            if (type(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) {
                    hue = hue[1];
                }
            }
            else {
                dh = 0;
            }
            return f;
        };
        f.lightness = function (h) {
            if (h == null) {
                return lightness;
            }
            lightness = h;
            if (type(lightness) === 'array') {
                dl = lightness[1] - lightness[0];
                if (dl === 0) {
                    lightness = lightness[1];
                }
            }
            else {
                dl = 0;
            }
            return f;
        };
        f.scale = function () {
            return chroma.scale(f);
        };
        f.hue(hue);
        return f;
    };
    chroma.random = function () {
        var code, digits, i, o;
        digits = '0123456789abcdef';
        code = '#';
        for (i = o = 0; o < 6; i = ++o) {
            code += digits.charAt(floor(Math.random() * 16));
        }
        return new Color(code);
    };
    _input.rgb = function () {
        var k, ref, results, v;
        ref = unpack(arguments);
        results = [];
        for (k in ref) {
            v = ref[k];
            results.push(v);
        }
        return results;
    };
    chroma.rgb = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['rgb']), function () { });
    };
    Color.prototype.rgb = function () {
        return this._rgb.slice(0, 3);
    };
    Color.prototype.rgba = function () {
        return this._rgb;
    };
    _guess_formats.push({
        p: 15,
        test: function (n) {
            var a;
            a = unpack(arguments);
            if (type(a) === 'array' && a.length === 3) {
                return 'rgb';
            }
            if (a.length === 4 && type(a[3]) === "number" && a[3] >= 0 && a[3] <= 1) {
                return 'rgb';
            }
        }
    });
    hex2rgb = function (hex) {
        var a, b, g, r, rgb, u;
        if (hex.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            if (hex.length === 3) {
                hex = hex.split("");
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            u = parseInt(hex, 16);
            r = u >> 16;
            g = u >> 8 & 0xFF;
            b = u & 0xFF;
            return [r, g, b, 1];
        }
        if (hex.match(/^#?([A-Fa-f0-9]{8})$/)) {
            if (hex.length === 9) {
                hex = hex.substr(1);
            }
            u = parseInt(hex, 16);
            r = u >> 24 & 0xFF;
            g = u >> 16 & 0xFF;
            b = u >> 8 & 0xFF;
            a = round((u & 0xFF) / 0xFF * 100) / 100;
            return [r, g, b, a];
        }
        if ((_input.css != null) && (rgb = _input.css(hex))) {
            return rgb;
        }
        throw "unknown color: " + hex;
    };
    rgb2hex = function (channels, mode) {
        var a, b, g, hxa, r, str, u;
        if (mode == null) {
            mode = 'rgb';
        }
        r = channels[0], g = channels[1], b = channels[2], a = channels[3];
        u = r << 16 | g << 8 | b;
        str = "000000" + u.toString(16);
        str = str.substr(str.length - 6);
        hxa = '0' + round(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        return "#" + (function () {
            switch (mode.toLowerCase()) {
                case 'rgba':
                    return str + hxa;
                case 'argb':
                    return hxa + str;
                default:
                    return str;
            }
        })();
    };
    _input.hex = function (h) {
        return hex2rgb(h);
    };
    chroma.hex = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['hex']), function () { });
    };
    Color.prototype.hex = function (mode) {
        if (mode == null) {
            mode = 'rgb';
        }
        return rgb2hex(this._rgb, mode);
    };
    _guess_formats.push({
        p: 10,
        test: function (n) {
            if (arguments.length === 1 && type(n) === "string") {
                return 'hex';
            }
        }
    });
    hsl2rgb = function () {
        var args, b, c, g, h, i, l, o, r, ref, s, t1, t2, t3;
        args = unpack(arguments);
        h = args[0], s = args[1], l = args[2];
        if (s === 0) {
            r = g = b = l * 255;
        }
        else {
            t3 = [0, 0, 0];
            c = [0, 0, 0];
            t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
            t1 = 2 * l - t2;
            h /= 360;
            t3[0] = h + 1 / 3;
            t3[1] = h;
            t3[2] = h - 1 / 3;
            for (i = o = 0; o <= 2; i = ++o) {
                if (t3[i] < 0) {
                    t3[i] += 1;
                }
                if (t3[i] > 1) {
                    t3[i] -= 1;
                }
                if (6 * t3[i] < 1) {
                    c[i] = t1 + (t2 - t1) * 6 * t3[i];
                }
                else if (2 * t3[i] < 1) {
                    c[i] = t2;
                }
                else if (3 * t3[i] < 2) {
                    c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
                }
                else {
                    c[i] = t1;
                }
            }
            ref = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)], r = ref[0], g = ref[1], b = ref[2];
        }
        if (args.length > 3) {
            return [r, g, b, args[3]];
        }
        else {
            return [r, g, b];
        }
    };
    rgb2hsl = function (r, g, b) {
        var h, l, min, ref, s;
        if (r !== void 0 && r.length >= 3) {
            ref = r, r = ref[0], g = ref[1], b = ref[2];
        }
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        l = (max + min) / 2;
        if (max === min) {
            s = 0;
            h = Number.NaN;
        }
        else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }
        if (r === max) {
            h = (g - b) / (max - min);
        }
        else if (g === max) {
            h = 2 + (b - r) / (max - min);
        }
        else if (b === max) {
            h = 4 + (r - g) / (max - min);
        }
        h *= 60;
        if (h < 0) {
            h += 360;
        }
        return [h, s, l];
    };
    chroma.hsl = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['hsl']), function () { });
    };
    _input.hsl = hsl2rgb;
    Color.prototype.hsl = function () {
        return rgb2hsl(this._rgb);
    };
    hsv2rgb = function () {
        var args, b, f, g, h, i, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, s, t, v;
        args = unpack(arguments);
        h = args[0], s = args[1], v = args[2];
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        }
        else {
            if (h === 360) {
                h = 0;
            }
            if (h > 360) {
                h -= 360;
            }
            if (h < 0) {
                h += 360;
            }
            h /= 60;
            i = floor(h);
            f = h - i;
            p = v * (1 - s);
            q = v * (1 - s * f);
            t = v * (1 - s * (1 - f));
            switch (i) {
                case 0:
                    ref = [v, t, p], r = ref[0], g = ref[1], b = ref[2];
                    break;
                case 1:
                    ref1 = [q, v, p], r = ref1[0], g = ref1[1], b = ref1[2];
                    break;
                case 2:
                    ref2 = [p, v, t], r = ref2[0], g = ref2[1], b = ref2[2];
                    break;
                case 3:
                    ref3 = [p, q, v], r = ref3[0], g = ref3[1], b = ref3[2];
                    break;
                case 4:
                    ref4 = [t, p, v], r = ref4[0], g = ref4[1], b = ref4[2];
                    break;
                case 5:
                    ref5 = [v, p, q], r = ref5[0], g = ref5[1], b = ref5[2];
            }
        }
        r = round(r);
        g = round(g);
        b = round(b);
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };
    rgb2hsv = function () {
        var b, delta, g, h, min, r, ref, s, v;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        delta = max - min;
        v = max / 255.0;
        if (max === 0) {
            h = Number.NaN;
            s = 0;
        }
        else {
            s = delta / max;
            if (r === max) {
                h = (g - b) / delta;
            }
            if (g === max) {
                h = 2 + (b - r) / delta;
            }
            if (b === max) {
                h = 4 + (r - g) / delta;
            }
            h *= 60;
            if (h < 0) {
                h += 360;
            }
        }
        return [h, s, v];
    };
    chroma.hsv = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['hsv']), function () { });
    };
    _input.hsv = hsv2rgb;
    Color.prototype.hsv = function () {
        return rgb2hsv(this._rgb);
    };
    num2rgb = function (num) {
        var b, g, r;
        if (type(num) === "number" && num >= 0 && num <= 0xFFFFFF) {
            r = num >> 16;
            g = (num >> 8) & 0xFF;
            b = num & 0xFF;
            return [r, g, b, 1];
        }
        console.warn("unknown num color: " + num);
        return [0, 0, 0, 1];
    };
    rgb2num = function () {
        var b, g, r, ref;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        return (r << 16) + (g << 8) + b;
    };
    chroma.num = function (num) {
        return new Color(num, 'num');
    };
    Color.prototype.num = function (mode) {
        if (mode == null) {
            mode = 'rgb';
        }
        return rgb2num(this._rgb, mode);
    };
    _input.num = num2rgb;
    _guess_formats.push({
        p: 10,
        test: function (n) {
            if (arguments.length === 1 && type(n) === "number" && n >= 0 && n <= 0xFFFFFF) {
                return 'num';
            }
        }
    });
    css2rgb = function (css) {
        var aa, ab, hsl, i, m, o, rgb, w;
        css = css.toLowerCase();
        if ((chroma.colors != null) && chroma.colors[css]) {
            return hex2rgb(chroma.colors[css]);
        }
        if (m = css.match(/rgb\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*\)/)) {
            rgb = m.slice(1, 4);
            for (i = o = 0; o <= 2; i = ++o) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;
        }
        else if (m = css.match(/rgba\(\s*(\-?\d+),\s*(\-?\d+)\s*,\s*(\-?\d+)\s*,\s*([01]|[01]?\.\d+)\)/)) {
            rgb = m.slice(1, 5);
            for (i = w = 0; w <= 3; i = ++w) {
                rgb[i] = +rgb[i];
            }
        }
        else if (m = css.match(/rgb\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
            rgb = m.slice(1, 4);
            for (i = aa = 0; aa <= 2; i = ++aa) {
                rgb[i] = round(rgb[i] * 2.55);
            }
            rgb[3] = 1;
        }
        else if (m = css.match(/rgba\(\s*(\-?\d+(?:\.\d+)?)%,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
            rgb = m.slice(1, 5);
            for (i = ab = 0; ab <= 2; i = ++ab) {
                rgb[i] = round(rgb[i] * 2.55);
            }
            rgb[3] = +rgb[3];
        }
        else if (m = css.match(/hsl\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*\)/)) {
            hsl = m.slice(1, 4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            rgb = hsl2rgb(hsl);
            rgb[3] = 1;
        }
        else if (m = css.match(/hsla\(\s*(\-?\d+(?:\.\d+)?),\s*(\-?\d+(?:\.\d+)?)%\s*,\s*(\-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)/)) {
            hsl = m.slice(1, 4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            rgb = hsl2rgb(hsl);
            rgb[3] = +m[4];
        }
        return rgb;
    };
    rgb2css = function (rgba) {
        var mode;
        mode = rgba[3] < 1 ? 'rgba' : 'rgb';
        if (mode === 'rgb') {
            return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ')';
        }
        else if (mode === 'rgba') {
            return mode + '(' + rgba.slice(0, 3).map(round).join(',') + ',' + rgba[3] + ')';
        }
        else {
        }
    };
    rnd = function (a) {
        return round(a * 100) / 100;
    };
    hsl2css = function (hsl, alpha) {
        var mode;
        mode = alpha < 1 ? 'hsla' : 'hsl';
        hsl[0] = rnd(hsl[0] || 0);
        hsl[1] = rnd(hsl[1] * 100) + '%';
        hsl[2] = rnd(hsl[2] * 100) + '%';
        if (mode === 'hsla') {
            hsl[3] = alpha;
        }
        return mode + '(' + hsl.join(',') + ')';
    };
    _input.css = function (h) {
        return css2rgb(h);
    };
    chroma.css = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['css']), function () { });
    };
    Color.prototype.css = function (mode) {
        if (mode == null) {
            mode = 'rgb';
        }
        if (mode.slice(0, 3) === 'rgb') {
            return rgb2css(this._rgb);
        }
        else if (mode.slice(0, 3) === 'hsl') {
            return hsl2css(this.hsl(), this.alpha());
        }
    };
    _input.named = function (name) {
        return hex2rgb(w3cx11[name]);
    };
    _guess_formats.push({
        p: 20,
        test: function (n) {
            if (arguments.length === 1 && (w3cx11[n] != null)) {
                return 'named';
            }
        }
    });
    Color.prototype.name = function (n) {
        var h, k;
        if (arguments.length) {
            if (w3cx11[n]) {
                this._rgb = hex2rgb(w3cx11[n]);
            }
            this._rgb[3] = 1;
            this;
        }
        h = this.hex();
        for (k in w3cx11) {
            if (h === w3cx11[k]) {
                return k;
            }
        }
        return h;
    };
    lch2lab = function () {
        var c, h, l, ref;
        ref = unpack(arguments), l = ref[0], c = ref[1], h = ref[2];
        h = h * DEG2RAD;
        return [l, cos(h) * c, sin(h) * c];
    };
    lch2rgb = function () {
        var L, a, args, b, c, g, h, l, r, ref, ref1;
        args = unpack(arguments);
        l = args[0], c = args[1], h = args[2];
        ref = lch2lab(l, c, h), L = ref[0], a = ref[1], b = ref[2];
        ref1 = lab2rgb(L, a, b), r = ref1[0], g = ref1[1], b = ref1[2];
        return [limit(r, 0, 255), limit(g, 0, 255), limit(b, 0, 255), args.length > 3 ? args[3] : 1];
    };
    lab2lch = function () {
        var a, b, c, h, l, ref;
        ref = unpack(arguments), l = ref[0], a = ref[1], b = ref[2];
        c = sqrt(a * a + b * b);
        h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round(c * 10000) === 0) {
            h = Number.NaN;
        }
        return [l, c, h];
    };
    rgb2lch = function () {
        var a, b, g, l, r, ref, ref1;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        ref1 = rgb2lab(r, g, b), l = ref1[0], a = ref1[1], b = ref1[2];
        return lab2lch(l, a, b);
    };
    chroma.lch = function () {
        var args;
        args = unpack(arguments);
        return new Color(args, 'lch');
    };
    chroma.hcl = function () {
        var args;
        args = unpack(arguments);
        return new Color(args, 'hcl');
    };
    _input.lch = lch2rgb;
    _input.hcl = function () {
        var c, h, l, ref;
        ref = unpack(arguments), h = ref[0], c = ref[1], l = ref[2];
        return lch2rgb([l, c, h]);
    };
    Color.prototype.lch = function () {
        return rgb2lch(this._rgb);
    };
    Color.prototype.hcl = function () {
        return rgb2lch(this._rgb).reverse();
    };
    rgb2cmyk = function (mode) {
        var b, c, f, g, k, m, r, ref, y;
        if (mode == null) {
            mode = 'rgb';
        }
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        k = 1 - Math.max(r, Math.max(g, b));
        f = k < 1 ? 1 / (1 - k) : 0;
        c = (1 - r - k) * f;
        m = (1 - g - k) * f;
        y = (1 - b - k) * f;
        return [c, m, y, k];
    };
    cmyk2rgb = function () {
        var alpha, args, b, c, g, k, m, r, y;
        args = unpack(arguments);
        c = args[0], m = args[1], y = args[2], k = args[3];
        alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) {
            return [0, 0, 0, alpha];
        }
        r = c >= 1 ? 0 : round(255 * (1 - c) * (1 - k));
        g = m >= 1 ? 0 : round(255 * (1 - m) * (1 - k));
        b = y >= 1 ? 0 : round(255 * (1 - y) * (1 - k));
        return [r, g, b, alpha];
    };
    _input.cmyk = function () {
        return cmyk2rgb(unpack(arguments));
    };
    chroma.cmyk = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['cmyk']), function () { });
    };
    Color.prototype.cmyk = function () {
        return rgb2cmyk(this._rgb);
    };
    _input.gl = function () {
        var i, k, o, rgb, v;
        rgb = (function () {
            var ref, results;
            ref = unpack(arguments);
            results = [];
            for (k in ref) {
                v = ref[k];
                results.push(v);
            }
            return results;
        }).apply(this, arguments);
        for (i = o = 0; o <= 2; i = ++o) {
            rgb[i] *= 255;
        }
        return rgb;
    };
    chroma.gl = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['gl']), function () { });
    };
    Color.prototype.gl = function () {
        var rgb;
        rgb = this._rgb;
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
    };
    rgb2luminance = function (r, g, b) {
        var ref;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    luminance_x = function (x) {
        x /= 255;
        if (x <= 0.03928) {
            return x / 12.92;
        }
        else {
            return pow((x + 0.055) / 1.055, 2.4);
        }
    };
    _interpolators = [];
    interpolate = function (col1, col2, f, m) {
        var interpol, len, o, res;
        if (f == null) {
            f = 0.5;
        }
        if (m == null) {
            m = 'rgb';
        }
        if (type(col1) !== 'object') {
            col1 = chroma(col1);
        }
        if (type(col2) !== 'object') {
            col2 = chroma(col2);
        }
        for (o = 0, len = _interpolators.length; o < len; o++) {
            interpol = _interpolators[o];
            if (m === interpol[0]) {
                res = interpol[1](col1, col2, f, m);
                break;
            }
        }
        if (res == null) {
            throw "color mode " + m + " is not supported";
        }
        res.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
        return res;
    };
    chroma.interpolate = interpolate;
    Color.prototype.interpolate = function (col2, f, m) {
        return interpolate(this, col2, f, m);
    };
    chroma.mix = interpolate;
    Color.prototype.mix = Color.prototype.interpolate;
    interpolate_rgb = function (col1, col2, f, m) {
        var xyz0, xyz1;
        xyz0 = col1._rgb;
        xyz1 = col2._rgb;
        return new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
    };
    _interpolators.push(['rgb', interpolate_rgb]);
    Color.prototype.luminance = function (lum, mode) {
        var cur_lum, eps, max_iter, test;
        if (mode == null) {
            mode = 'rgb';
        }
        if (!arguments.length) {
            return rgb2luminance(this._rgb);
        }
        if (lum === 0) {
            this._rgb = [0, 0, 0, this._rgb[3]];
        }
        else if (lum === 1) {
            this._rgb = [255, 255, 255, this._rgb[3]];
        }
        else {
            eps = 1e-7;
            max_iter = 20;
            test = function (l, h) {
                var lm, m;
                m = l.interpolate(h, 0.5, mode);
                lm = m.luminance();
                if (Math.abs(lum - lm) < eps || !max_iter--) {
                    return m;
                }
                if (lm > lum) {
                    return test(l, m);
                }
                return test(m, h);
            };
            cur_lum = rgb2luminance(this._rgb);
            this._rgb = (cur_lum > lum ? test(chroma('black'), this) : test(this, chroma('white'))).rgba();
        }
        return this;
    };
    temperature2rgb = function (kelvin) {
        var b, g, r, temp;
        temp = kelvin / 100;
        if (temp < 66) {
            r = 255;
            g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
        }
        else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
            b = 255;
        }
        return clip_rgb([r, g, b]);
    };
    rgb2temperature = function () {
        var b, eps, g, maxTemp, minTemp, r, ref, rgb, temp;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        minTemp = 1000;
        maxTemp = 40000;
        eps = 0.4;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            rgb = temperature2rgb(temp);
            if ((rgb[2] / rgb[0]) >= (b / r)) {
                maxTemp = temp;
            }
            else {
                minTemp = temp;
            }
        }
        return round(temp);
    };
    chroma.temperature = chroma.kelvin = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['temperature']), function () { });
    };
    _input.temperature = _input.kelvin = _input.K = temperature2rgb;
    Color.prototype.temperature = function () {
        return rgb2temperature(this._rgb);
    };
    Color.prototype.kelvin = Color.prototype.temperature;
    chroma.contrast = function (a, b) {
        var l1, l2, ref, ref1;
        if ((ref = type(a)) === 'string' || ref === 'number') {
            a = new Color(a);
        }
        if ((ref1 = type(b)) === 'string' || ref1 === 'number') {
            b = new Color(b);
        }
        l1 = a.luminance();
        l2 = b.luminance();
        if (l1 > l2) {
            return (l1 + 0.05) / (l2 + 0.05);
        }
        else {
            return (l2 + 0.05) / (l1 + 0.05);
        }
    };
    Color.prototype.get = function (modechan) {
        var channel, i, me, mode, ref, src;
        me = this;
        ref = modechan.split('.'), mode = ref[0], channel = ref[1];
        src = me[mode]();
        if (channel) {
            i = mode.indexOf(channel);
            if (i > -1) {
                return src[i];
            }
            else {
                return console.warn('unknown channel ' + channel + ' in mode ' + mode);
            }
        }
        else {
            return src;
        }
    };
    Color.prototype.set = function (modechan, value) {
        var channel, i, me, mode, ref, src;
        me = this;
        ref = modechan.split('.'), mode = ref[0], channel = ref[1];
        if (channel) {
            src = me[mode]();
            i = mode.indexOf(channel);
            if (i > -1) {
                if (type(value) === 'string') {
                    switch (value.charAt(0)) {
                        case '+':
                            src[i] += +value;
                            break;
                        case '-':
                            src[i] += +value;
                            break;
                        case '*':
                            src[i] *= +(value.substr(1));
                            break;
                        case '/':
                            src[i] /= +(value.substr(1));
                            break;
                        default:
                            src[i] = +value;
                    }
                }
                else {
                    src[i] = value;
                }
            }
            else {
                console.warn('unknown channel ' + channel + ' in mode ' + mode);
            }
        }
        else {
            src = value;
        }
        me._rgb = chroma(src, mode).alpha(me.alpha())._rgb;
        return me;
    };
    Color.prototype.darken = function (amount) {
        var lab, me;
        if (amount == null) {
            amount = 1;
        }
        me = this;
        lab = me.lab();
        lab[0] -= LAB_CONSTANTS.Kn * amount;
        return chroma.lab(lab).alpha(me.alpha());
    };
    Color.prototype.brighten = function (amount) {
        if (amount == null) {
            amount = 1;
        }
        return this.darken(-amount);
    };
    Color.prototype.darker = Color.prototype.darken;
    Color.prototype.brighter = Color.prototype.brighten;
    Color.prototype.saturate = function (amount) {
        var lch, me;
        if (amount == null) {
            amount = 1;
        }
        me = this;
        lch = me.lch();
        lch[1] += amount * LAB_CONSTANTS.Kn;
        if (lch[1] < 0) {
            lch[1] = 0;
        }
        return chroma.lch(lch).alpha(me.alpha());
    };
    Color.prototype.desaturate = function (amount) {
        if (amount == null) {
            amount = 1;
        }
        return this.saturate(-amount);
    };
    Color.prototype.premultiply = function () {
        var a, rgb;
        rgb = this.rgb();
        a = this.alpha();
        return chroma(rgb[0] * a, rgb[1] * a, rgb[2] * a, a);
    };
    blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw 'unknown blend mode ' + mode;
        }
        return blend[mode](bottom, top);
    };
    blend_f = function (f) {
        return function (bottom, top) {
            var c0, c1;
            c0 = chroma(top).rgb();
            c1 = chroma(bottom).rgb();
            return chroma(f(c0, c1), 'rgb');
        };
    };
    each = function (f) {
        return function (c0, c1) {
            var i, o, out;
            out = [];
            for (i = o = 0; o <= 3; i = ++o) {
                out[i] = f(c0[i], c1[i]);
            }
            return out;
        };
    };
    normal = function (a, b) {
        return a;
    };
    multiply = function (a, b) {
        return a * b / 255;
    };
    darken = function (a, b) {
        if (a > b) {
            return b;
        }
        else {
            return a;
        }
    };
    lighten = function (a, b) {
        if (a > b) {
            return a;
        }
        else {
            return b;
        }
    };
    screen = function (a, b) {
        return 255 * (1 - (1 - a / 255) * (1 - b / 255));
    };
    overlay = function (a, b) {
        if (b < 128) {
            return 2 * a * b / 255;
        }
        else {
            return 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255));
        }
    };
    burn = function (a, b) {
        return 255 * (1 - (1 - b / 255) / (a / 255));
    };
    dodge = function (a, b) {
        if (a === 255) {
            return 255;
        }
        a = 255 * (b / 255) / (1 - a / 255);
        if (a > 255) {
            return 255;
        }
        else {
            return a;
        }
    };
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    chroma.blend = blend;
    chroma.analyze = function (data) {
        var len, o, r, val;
        r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0
        };
        for (o = 0, len = data.length; o < len; o++) {
            val = data[o];
            if ((val != null) && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) {
                    r.min = val;
                }
                if (val > r.max) {
                    r.max = val;
                }
                r.count += 1;
            }
        }
        r.domain = [r.min, r.max];
        r.limits = function (mode, num) {
            return chroma.limits(r, mode, num);
        };
        return r;
    };
    chroma.scale = function (colors, positions) {
        var _classes, _colorCache, _colors, _correctLightness, _domain, _fixed, _max, _min, _mode, _nacol, _out, _padding, _pos, _spread, classifyValue, f, getClass, getColor, resetCache, setColors, tmap;
        _mode = 'rgb';
        _nacol = chroma('#ccc');
        _spread = 0;
        _fixed = false;
        _domain = [0, 1];
        _pos = [];
        _padding = [0, 0];
        _classes = false;
        _colors = [];
        _out = false;
        _min = 0;
        _max = 1;
        _correctLightness = false;
        _colorCache = {};
        setColors = function (colors) {
            var c, col, o, ref, ref1, ref2, w;
            if (colors == null) {
                colors = ['#fff', '#000'];
            }
            if ((colors != null) && type(colors) === 'string' && (((ref = chroma.brewer) != null ? ref[colors] : void 0) != null)) {
                colors = chroma.brewer[colors];
            }
            if (type(colors) === 'array') {
                colors = colors.slice(0);
                for (c = o = 0, ref1 = colors.length - 1; 0 <= ref1 ? o <= ref1 : o >= ref1; c = 0 <= ref1 ? ++o : --o) {
                    col = colors[c];
                    if (type(col) === "string") {
                        colors[c] = chroma(col);
                    }
                }
                _pos.length = 0;
                for (c = w = 0, ref2 = colors.length - 1; 0 <= ref2 ? w <= ref2 : w >= ref2; c = 0 <= ref2 ? ++w : --w) {
                    _pos.push(c / (colors.length - 1));
                }
            }
            resetCache();
            return _colors = colors;
        };
        getClass = function (value) {
            var i, n;
            if (_classes != null) {
                n = _classes.length - 1;
                i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i - 1;
            }
            return 0;
        };
        tmap = function (t) {
            return t;
        };
        classifyValue = function (value) {
            var i, maxc, minc, n, val;
            val = value;
            if (_classes.length > 2) {
                n = _classes.length - 1;
                i = getClass(value);
                minc = _classes[0] + (_classes[1] - _classes[0]) * (0 + _spread * 0.5);
                maxc = _classes[n - 1] + (_classes[n] - _classes[n - 1]) * (1 - _spread * 0.5);
                val = _min + ((_classes[i] + (_classes[i + 1] - _classes[i]) * 0.5 - minc) / (maxc - minc)) * (_max - _min);
            }
            return val;
        };
        getColor = function (val, bypassMap) {
            var c, col, i, k, o, p, ref, t;
            if (bypassMap == null) {
                bypassMap = false;
            }
            if (isNaN(val)) {
                return _nacol;
            }
            if (!bypassMap) {
                if (_classes && _classes.length > 2) {
                    c = getClass(val);
                    t = c / (_classes.length - 2);
                    t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
                }
                else if (_max !== _min) {
                    t = (val - _min) / (_max - _min);
                    t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));
                    t = Math.min(1, Math.max(0, t));
                }
                else {
                    t = 1;
                }
            }
            else {
                t = val;
            }
            if (!bypassMap) {
                t = tmap(t);
            }
            k = Math.floor(t * 10000);
            if (_colorCache[k]) {
                col = _colorCache[k];
            }
            else {
                if (type(_colors) === 'array') {
                    for (i = o = 0, ref = _pos.length - 1; 0 <= ref ? o <= ref : o >= ref; i = 0 <= ref ? ++o : --o) {
                        p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if (t >= p && i === _pos.length - 1) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i + 1]) {
                            t = (t - p) / (_pos[i + 1] - p);
                            col = chroma.interpolate(_colors[i], _colors[i + 1], t, _mode);
                            break;
                        }
                    }
                }
                else if (type(_colors) === 'function') {
                    col = _colors(t);
                }
                _colorCache[k] = col;
            }
            return col;
        };
        resetCache = function () {
            return _colorCache = {};
        };
        setColors(colors);
        f = function (v) {
            var c;
            c = chroma(getColor(v));
            if (_out && c[_out]) {
                return c[_out]();
            }
            else {
                return c;
            }
        };
        f.classes = function (classes) {
            var d;
            if (classes != null) {
                if (type(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length - 1]];
                }
                else {
                    d = chroma.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    }
                    else {
                        _classes = chroma.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };
        f.domain = function (domain) {
            var c, d, k, len, o, ref, w;
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length - 1];
            _pos = [];
            k = _colors.length;
            if (domain.length === k && _min !== _max) {
                for (o = 0, len = domain.length; o < len; o++) {
                    d = domain[o];
                    _pos.push((d - _min) / (_max - _min));
                }
            }
            else {
                for (c = w = 0, ref = k - 1; 0 <= ref ? w <= ref : w >= ref; c = 0 <= ref ? ++w : --w) {
                    _pos.push(c / (k - 1));
                }
            }
            _domain = [_min, _max];
            return f;
        };
        f.mode = function (_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };
        f.range = function (colors, _pos) {
            setColors(colors, _pos);
            return f;
        };
        f.out = function (_o) {
            _out = _o;
            return f;
        };
        f.spread = function (val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };
        f.correctLightness = function (v) {
            if (v == null) {
                v = true;
            }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tmap = function (t) {
                    var L0, L1, L_actual, L_diff, L_ideal, max_iter, pol, t0, t1;
                    L0 = getColor(0, true).lab()[0];
                    L1 = getColor(1, true).lab()[0];
                    pol = L0 > L1;
                    L_actual = getColor(t, true).lab()[0];
                    L_ideal = L0 + (L1 - L0) * t;
                    L_diff = L_actual - L_ideal;
                    t0 = 0;
                    t1 = 1;
                    max_iter = 20;
                    while (Math.abs(L_diff) > 1e-2 && max_iter-- > 0) {
                        (function () {
                            if (pol) {
                                L_diff *= -1;
                            }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            }
                            else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            }
            else {
                tmap = function (t) {
                    return t;
                };
            }
            return f;
        };
        f.padding = function (p) {
            if (p != null) {
                if (type(p) === 'number') {
                    p = [p, p];
                }
                _padding = p;
                return f;
            }
            else {
                return _padding;
            }
        };
        f.colors = function () {
            var dd, dm, i, numColors, o, out, ref, results, samples, w;
            numColors = 0;
            out = 'hex';
            if (arguments.length === 1) {
                if (type(arguments[0]) === 'string') {
                    out = arguments[0];
                }
                else {
                    numColors = arguments[0];
                }
            }
            if (arguments.length === 2) {
                numColors = arguments[0], out = arguments[1];
            }
            if (numColors) {
                dm = _domain[0];
                dd = _domain[1] - dm;
                return (function () {
                    results = [];
                    for (var o = 0; 0 <= numColors ? o < numColors : o > numColors; 0 <= numColors ? o++ : o--) {
                        results.push(o);
                    }
                    return results;
                }).apply(this).map(function (i) {
                    return f(dm + i / (numColors - 1) * dd)[out]();
                });
            }
            colors = [];
            samples = [];
            if (_classes && _classes.length > 2) {
                for (i = w = 1, ref = _classes.length; 1 <= ref ? w < ref : w > ref; i = 1 <= ref ? ++w : --w) {
                    samples.push((_classes[i - 1] + _classes[i]) * 0.5);
                }
            }
            else {
                samples = _domain;
            }
            return samples.map(function (v) {
                return f(v)[out]();
            });
        };
        return f;
    };
    if (chroma.scales == null) {
        chroma.scales = {};
    }
    chroma.scales.cool = function () {
        return chroma.scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]);
    };
    chroma.scales.hot = function () {
        return chroma.scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb');
    };
    chroma.analyze = function (data, key, filter) {
        var add, k, len, o, r, val, visit;
        r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE * -1,
            sum: 0,
            values: [],
            count: 0
        };
        if (filter == null) {
            filter = function () {
                return true;
            };
        }
        add = function (val) {
            if ((val != null) && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) {
                    r.min = val;
                }
                if (val > r.max) {
                    r.max = val;
                }
                r.count += 1;
            }
        };
        visit = function (val, k) {
            if (filter(val, k)) {
                if ((key != null) && type(key) === 'function') {
                    return add(key(val));
                }
                else if ((key != null) && type(key) === 'string' || type(key) === 'number') {
                    return add(val[key]);
                }
                else {
                    return add(val);
                }
            }
        };
        if (type(data) === 'array') {
            for (o = 0, len = data.length; o < len; o++) {
                val = data[o];
                visit(val);
            }
        }
        else {
            for (k in data) {
                val = data[k];
                visit(val, k);
            }
        }
        r.domain = [r.min, r.max];
        r.limits = function (mode, num) {
            return chroma.limits(r, mode, num);
        };
        return r;
    };
    chroma.limits = function (data, mode, num) {
        var aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, assignments, best, centroids, cluster, clusterSizes, dist, i, j, kClusters, limits, max_log, min, min_log, mindist, n, nb_iters, newCentroids, o, p, pb, pr, ref, ref1, ref10, ref11, ref12, ref13, ref14, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, repeat, sum, tmpKMeansBreaks, value, values, w;
        if (mode == null) {
            mode = 'equal';
        }
        if (num == null) {
            num = 7;
        }
        if (type(data) === 'array') {
            data = chroma.analyze(data);
        }
        min = data.min;
        max = data.max;
        sum = data.sum;
        values = data.values.sort(function (a, b) {
            return a - b;
        });
        limits = [];
        if (mode.substr(0, 1) === 'c') {
            limits.push(min);
            limits.push(max);
        }
        if (mode.substr(0, 1) === 'e') {
            limits.push(min);
            for (i = o = 1, ref = num - 1; 1 <= ref ? o <= ref : o >= ref; i = 1 <= ref ? ++o : --o) {
                limits.push(min + (i / num) * (max - min));
            }
            limits.push(max);
        }
        else if (mode.substr(0, 1) === 'l') {
            if (min <= 0) {
                throw 'Logarithmic scales are only possible for values > 0';
            }
            min_log = Math.LOG10E * log(min);
            max_log = Math.LOG10E * log(max);
            limits.push(min);
            for (i = w = 1, ref1 = num - 1; 1 <= ref1 ? w <= ref1 : w >= ref1; i = 1 <= ref1 ? ++w : --w) {
                limits.push(pow(10, min_log + (i / num) * (max_log - min_log)));
            }
            limits.push(max);
        }
        else if (mode.substr(0, 1) === 'q') {
            limits.push(min);
            for (i = aa = 1, ref2 = num - 1; 1 <= ref2 ? aa <= ref2 : aa >= ref2; i = 1 <= ref2 ? ++aa : --aa) {
                p = values.length * i / num;
                pb = floor(p);
                if (pb === p) {
                    limits.push(values[pb]);
                }
                else {
                    pr = p - pb;
                    limits.push(values[pb] * pr + values[pb + 1] * (1 - pr));
                }
            }
            limits.push(max);
        }
        else if (mode.substr(0, 1) === 'k') {
            n = values.length;
            assignments = new Array(n);
            clusterSizes = new Array(num);
            repeat = true;
            nb_iters = 0;
            centroids = null;
            centroids = [];
            centroids.push(min);
            for (i = ab = 1, ref3 = num - 1; 1 <= ref3 ? ab <= ref3 : ab >= ref3; i = 1 <= ref3 ? ++ab : --ab) {
                centroids.push(min + (i / num) * (max - min));
            }
            centroids.push(max);
            while (repeat) {
                for (j = ac = 0, ref4 = num - 1; 0 <= ref4 ? ac <= ref4 : ac >= ref4; j = 0 <= ref4 ? ++ac : --ac) {
                    clusterSizes[j] = 0;
                }
                for (i = ad = 0, ref5 = n - 1; 0 <= ref5 ? ad <= ref5 : ad >= ref5; i = 0 <= ref5 ? ++ad : --ad) {
                    value = values[i];
                    mindist = Number.MAX_VALUE;
                    for (j = ae = 0, ref6 = num - 1; 0 <= ref6 ? ae <= ref6 : ae >= ref6; j = 0 <= ref6 ? ++ae : --ae) {
                        dist = abs(centroids[j] - value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j;
                        }
                    }
                    clusterSizes[best]++;
                    assignments[i] = best;
                }
                newCentroids = new Array(num);
                for (j = af = 0, ref7 = num - 1; 0 <= ref7 ? af <= ref7 : af >= ref7; j = 0 <= ref7 ? ++af : --af) {
                    newCentroids[j] = null;
                }
                for (i = ag = 0, ref8 = n - 1; 0 <= ref8 ? ag <= ref8 : ag >= ref8; i = 0 <= ref8 ? ++ag : --ag) {
                    cluster = assignments[i];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i];
                    }
                    else {
                        newCentroids[cluster] += values[i];
                    }
                }
                for (j = ah = 0, ref9 = num - 1; 0 <= ref9 ? ah <= ref9 : ah >= ref9; j = 0 <= ref9 ? ++ah : --ah) {
                    newCentroids[j] *= 1 / clusterSizes[j];
                }
                repeat = false;
                for (j = ai = 0, ref10 = num - 1; 0 <= ref10 ? ai <= ref10 : ai >= ref10; j = 0 <= ref10 ? ++ai : --ai) {
                    if (newCentroids[j] !== centroids[i]) {
                        repeat = true;
                        break;
                    }
                }
                centroids = newCentroids;
                nb_iters++;
                if (nb_iters > 200) {
                    repeat = false;
                }
            }
            kClusters = {};
            for (j = aj = 0, ref11 = num - 1; 0 <= ref11 ? aj <= ref11 : aj >= ref11; j = 0 <= ref11 ? ++aj : --aj) {
                kClusters[j] = [];
            }
            for (i = ak = 0, ref12 = n - 1; 0 <= ref12 ? ak <= ref12 : ak >= ref12; i = 0 <= ref12 ? ++ak : --ak) {
                cluster = assignments[i];
                kClusters[cluster].push(values[i]);
            }
            tmpKMeansBreaks = [];
            for (j = al = 0, ref13 = num - 1; 0 <= ref13 ? al <= ref13 : al >= ref13; j = 0 <= ref13 ? ++al : --al) {
                tmpKMeansBreaks.push(kClusters[j][0]);
                tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a, b) {
                return a - b;
            });
            limits.push(tmpKMeansBreaks[0]);
            for (i = am = 1, ref14 = tmpKMeansBreaks.length - 1; am <= ref14; i = am += 2) {
                if (!isNaN(tmpKMeansBreaks[i])) {
                    limits.push(tmpKMeansBreaks[i]);
                }
            }
        }
        return limits;
    };
    hsi2rgb = function (h, s, i) {
        var args, b, g, r;
        args = unpack(arguments);
        h = args[0], s = args[1], i = args[2];
        h /= 360;
        if (h < 1 / 3) {
            b = (1 - s) / 3;
            r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
            g = 1 - (b + r);
        }
        else if (h < 2 / 3) {
            h -= 1 / 3;
            r = (1 - s) / 3;
            g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
            b = 1 - (r + g);
        }
        else {
            h -= 2 / 3;
            g = (1 - s) / 3;
            b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
            r = 1 - (g + b);
        }
        r = limit(i * r * 3);
        g = limit(i * g * 3);
        b = limit(i * b * 3);
        return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
    };
    rgb2hsi = function () {
        var b, g, h, i, min, r, ref, s;
        ref = unpack(arguments), r = ref[0], g = ref[1], b = ref[2];
        TWOPI = Math.PI * 2;
        r /= 255;
        g /= 255;
        b /= 255;
        min = Math.min(r, g, b);
        i = (r + g + b) / 3;
        s = 1 - min / i;
        if (s === 0) {
            h = 0;
        }
        else {
            h = ((r - g) + (r - b)) / 2;
            h /= Math.sqrt((r - g) * (r - g) + (r - b) * (g - b));
            h = Math.acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h * 360, s, i];
    };
    chroma.hsi = function () {
        return (function (func, args, ctor) {
            ctor.prototype = func.prototype;
            var child = new ctor, result = func.apply(child, args);
            return Object(result) === result ? result : child;
        })(Color, slice.call(arguments).concat(['hsi']), function () { });
    };
    _input.hsi = hsi2rgb;
    Color.prototype.hsi = function () {
        return rgb2hsi(this._rgb);
    };
    interpolate_hsx = function (col1, col2, f, m) {
        var dh, hue, hue0, hue1, lbv, lbv0, lbv1, res, sat, sat0, sat1, xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        }
        else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        }
        else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        }
        else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        }
        if (m.substr(0, 1) === 'h') {
            hue0 = xyz0[0], sat0 = xyz0[1], lbv0 = xyz0[2];
            hue1 = xyz1[0], sat1 = xyz1[1], lbv1 = xyz1[2];
        }
        if (!isNaN(hue0) && !isNaN(hue1)) {
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1 - (hue0 + 360);
            }
            else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1 + 360 - hue0;
            }
            else {
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        }
        else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 === 1 || lbv1 === 0) && m !== 'hsv') {
                sat = sat0;
            }
        }
        else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 === 1 || lbv0 === 0) && m !== 'hsv') {
                sat = sat1;
            }
        }
        else {
            hue = Number.NaN;
        }
        if (sat == null) {
            sat = sat0 + f * (sat1 - sat0);
        }
        lbv = lbv0 + f * (lbv1 - lbv0);
        return res = chroma[m](hue, sat, lbv);
    };
    _interpolators = _interpolators.concat((function () {
        var len, o, ref, results;
        ref = ['hsv', 'hsl', 'hsi', 'hcl', 'lch'];
        results = [];
        for (o = 0, len = ref.length; o < len; o++) {
            m = ref[o];
            results.push([m, interpolate_hsx]);
        }
        return results;
    })());
    interpolate_num = function (col1, col2, f, m) {
        var n1, n2;
        n1 = col1.num();
        n2 = col2.num();
        return chroma.num(n1 + (n2 - n1) * f, 'num');
    };
    _interpolators.push(['num', interpolate_num]);
    interpolate_lab = function (col1, col2, f, m) {
        var res, xyz0, xyz1;
        xyz0 = col1.lab();
        xyz1 = col2.lab();
        return res = new Color(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), m);
    };
    _interpolators.push(['lab', interpolate_lab]);
}).call(this);
var LZString = function () { function o(o, r) { if (!t[o]) {
    t[o] = {};
    for (var n = 0; n < o.length; n++)
        t[o][o.charAt(n)] = n;
} return t[o][r]; } var r = String.fromCharCode, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = { compressToBase64: function (o) { if (null == o)
        return ""; var r = i._compress(o, 6, function (o) { return n.charAt(o); }); switch (r.length % 4) {
        default:
        case 0: return r;
        case 1: return r + "===";
        case 2: return r + "==";
        case 3: return r + "=";
    } }, decompressFromBase64: function (r) { return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) { return o(n, r.charAt(e)); }); }, compressToUTF16: function (o) { return null == o ? "" : i._compress(o, 15, function (o) { return r(o + 32); }) + " "; }, decompressFromUTF16: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) { return o.charCodeAt(r) - 32; }); }, compressToUint8Array: function (o) { for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
        var s = r.charCodeAt(e);
        n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256;
    } return n; }, decompressFromUint8Array: function (o) { if (null === o || void 0 === o)
        return i.decompress(o); for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++)
        n[e] = 256 * o[2 * e] + o[2 * e + 1]; var s = []; return n.forEach(function (o) { s.push(r(o)); }), i.decompress(s.join("")); }, compressToEncodedURIComponent: function (o) { return null == o ? "" : i._compress(o, 6, function (o) { return e.charAt(o); }); }, decompressFromEncodedURIComponent: function (r) { return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) { return o(e, r.charAt(n)); })); }, compress: function (o) { return i._compress(o, 16, function (o) { return r(o); }); }, _compress: function (o, r, n) { if (null == o)
        return ""; var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0, v = 0; for (i = 0; i < o.length; i += 1)
        if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c))
            a = c;
        else {
            if (Object.prototype.hasOwnProperty.call(p, a)) {
                if (a.charCodeAt(0) < 256) {
                    for (e = 0; h > e; e++)
                        m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                    for (t = a.charCodeAt(0), e = 0; 8 > e; e++)
                        m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
                else {
                    for (t = 1, e = 0; h > e; e++)
                        m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                    for (t = a.charCodeAt(0), e = 0; 16 > e; e++)
                        m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                }
                l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
            }
            else
                for (t = s[a], e = 0; h > e; e++)
                    m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
            l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u);
        } if ("" !== a) {
        if (Object.prototype.hasOwnProperty.call(p, a)) {
            if (a.charCodeAt(0) < 256) {
                for (e = 0; h > e; e++)
                    m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                for (t = a.charCodeAt(0), e = 0; 8 > e; e++)
                    m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
            }
            else {
                for (t = 1, e = 0; h > e; e++)
                    m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                for (t = a.charCodeAt(0), e = 0; 16 > e; e++)
                    m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
            }
            l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a];
        }
        else
            for (t = s[a], e = 0; h > e; e++)
                m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
        l--, 0 == l && (l = Math.pow(2, h), h++);
    } for (t = 2, e = 0; h > e; e++)
        m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1; for (;;) {
        if (m <<= 1, v == r - 1) {
            d.push(n(m));
            break;
        }
        v++;
    } return d.join(""); }, decompress: function (o) { return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) { return o.charCodeAt(r); }); }, _decompress: function (o, n, e) { var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [], A = { val: e(0), position: n, index: 1 }; for (i = 0; 3 > i; i += 1)
        f[i] = i; for (p = 0, c = Math.pow(2, 2), a = 1; a != c;)
        u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1; switch (t = p) {
        case 0:
            for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)
                u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
            l = r(p);
            break;
        case 1:
            for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)
                u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
            l = r(p);
            break;
        case 2: return "";
    } for (f[3] = l, s = l, w.push(l);;) {
        if (A.index > o)
            return "";
        for (p = 0, c = Math.pow(2, m), a = 1; a != c;)
            u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
        switch (l = p) {
            case 0:
                for (p = 0, c = Math.pow(2, 8), a = 1; a != c;)
                    u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                f[d++] = r(p), l = d - 1, h--;
                break;
            case 1:
                for (p = 0, c = Math.pow(2, 16), a = 1; a != c;)
                    u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                f[d++] = r(p), l = d - 1, h--;
                break;
            case 2: return w.join("");
        }
        if (0 == h && (h = Math.pow(2, m), m++), f[l])
            v = f[l];
        else {
            if (l !== d)
                return null;
            v = s + s.charAt(0);
        }
        w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++);
    } } }; return i; }();
"function" == typeof define && define.amd ? define(function () { return LZString; }) : "undefined" != typeof module && null != module && (module.exports = LZString);
!function (a, b) { "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b(); }(this, function () {
    "use strict";
    function a() { return Dc.apply(null, arguments); }
    function b(a) { Dc = a; }
    function c(a) { return "[object Array]" === Object.prototype.toString.call(a); }
    function d(a) { return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a); }
    function e(a, b) { var c, d = []; for (c = 0; c < a.length; ++c)
        d.push(b(a[c], c)); return d; }
    function f(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
    function g(a, b) { for (var c in b)
        f(b, c) && (a[c] = b[c]); return f(b, "toString") && (a.toString = b.toString), f(b, "valueOf") && (a.valueOf = b.valueOf), a; }
    function h(a, b, c, d) { return za(a, b, c, d, !0).utc(); }
    function i() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1 }; }
    function j(a) { return null == a._pf && (a._pf = i()), a._pf; }
    function k(a) { if (null == a._isValid) {
        var b = j(a);
        a._isValid = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.nullInput && !b.invalidFormat && !b.userInvalidated, a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
    } return a._isValid; }
    function l(a) { var b = h(0 / 0); return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b; }
    function m(a, b) { var c, d, e; if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = j(b)), "undefined" != typeof b._locale && (a._locale = b._locale), Fc.length > 0)
        for (c in Fc)
            d = Fc[c], e = b[d], "undefined" != typeof e && (a[d] = e); return a; }
    function n(b) { m(this, b), this._d = new Date(+b._d), Gc === !1 && (Gc = !0, a.updateOffset(this), Gc = !1); }
    function o(a) { return a instanceof n || null != a && null != a._isAMomentObject; }
    function p(a) { var b = +a, c = 0; return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c; }
    function q(a, b, c) { var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0; for (d = 0; e > d; d++)
        (c && a[d] !== b[d] || !c && p(a[d]) !== p(b[d])) && g++; return g + f; }
    function r() { }
    function s(a) { return a ? a.toLowerCase().replace("_", "-") : a; }
    function t(a) { for (var b, c, d, e, f = 0; f < a.length;) {
        for (e = s(a[f]).split("-"), b = e.length, c = s(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
            if (d = u(e.slice(0, b).join("-")))
                return d;
            if (c && c.length >= b && q(e, c, !0) >= b - 1)
                break;
            b--;
        }
        f++;
    } return null; }
    function u(a) { var b = null; if (!Hc[a] && "undefined" != typeof module && module && module.exports)
        try {
            b = Ec._abbr, require("./locale/" + a), v(b);
        }
        catch (c) { } return Hc[a]; }
    function v(a, b) { var c; return a && (c = "undefined" == typeof b ? x(a) : w(a, b), c && (Ec = c)), Ec._abbr; }
    function w(a, b) { return null !== b ? (b.abbr = a, Hc[a] || (Hc[a] = new r), Hc[a].set(b), v(a), Hc[a]) : (delete Hc[a], null); }
    function x(a) { var b; if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)
        return Ec; if (!c(a)) {
        if (b = u(a))
            return b;
        a = [a];
    } return t(a); }
    function y(a, b) { var c = a.toLowerCase(); Ic[c] = Ic[c + "s"] = Ic[b] = a; }
    function z(a) { return "string" == typeof a ? Ic[a] || Ic[a.toLowerCase()] : void 0; }
    function A(a) { var b, c, d = {}; for (c in a)
        f(a, c) && (b = z(c), b && (d[b] = a[c])); return d; }
    function B(b, c) { return function (d) { return null != d ? (D(this, b, d), a.updateOffset(this, c), this) : C(this, b); }; }
    function C(a, b) { return a._d["get" + (a._isUTC ? "UTC" : "") + b](); }
    function D(a, b, c) { return a._d["set" + (a._isUTC ? "UTC" : "") + b](c); }
    function E(a, b) { var c; if ("object" == typeof a)
        for (c in a)
            this.set(c, a[c]);
    else if (a = z(a), "function" == typeof this[a])
        return this[a](b); return this; }
    function F(a, b, c) { for (var d = "" + Math.abs(a), e = a >= 0; d.length < b;)
        d = "0" + d; return (e ? c ? "+" : "" : "-") + d; }
    function G(a, b, c, d) { var e = d; "string" == typeof d && (e = function () { return this[d](); }), a && (Mc[a] = e), b && (Mc[b[0]] = function () { return F(e.apply(this, arguments), b[1], b[2]); }), c && (Mc[c] = function () { return this.localeData().ordinal(e.apply(this, arguments), a); }); }
    function H(a) { return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, ""); }
    function I(a) { var b, c, d = a.match(Jc); for (b = 0, c = d.length; c > b; b++)
        Mc[d[b]] ? d[b] = Mc[d[b]] : d[b] = H(d[b]); return function (e) { var f = ""; for (b = 0; c > b; b++)
        f += d[b] instanceof Function ? d[b].call(e, a) : d[b]; return f; }; }
    function J(a, b) { return a.isValid() ? (b = K(b, a.localeData()), Lc[b] || (Lc[b] = I(b)), Lc[b](a)) : a.localeData().invalidDate(); }
    function K(a, b) { function c(a) { return b.longDateFormat(a) || a; } var d = 5; for (Kc.lastIndex = 0; d >= 0 && Kc.test(a);)
        a = a.replace(Kc, c), Kc.lastIndex = 0, d -= 1; return a; }
    function L(a, b, c) { _c[a] = "function" == typeof b ? b : function (a) { return a && c ? c : b; }; }
    function M(a, b) { return f(_c, a) ? _c[a](b._strict, b._locale) : new RegExp(N(a)); }
    function N(a) { return a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) { return b || c || d || e; }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }
    function O(a, b) { var c, d = b; for ("string" == typeof a && (a = [a]), "number" == typeof b && (d = function (a, c) { c[b] = p(a); }), c = 0; c < a.length; c++)
        ad[a[c]] = d; }
    function P(a, b) { O(a, function (a, c, d, e) { d._w = d._w || {}, b(a, d._w, d, e); }); }
    function Q(a, b, c) { null != b && f(ad, a) && ad[a](b, c._a, c, a); }
    function R(a, b) { return new Date(Date.UTC(a, b + 1, 0)).getUTCDate(); }
    function S(a) { return this._months[a.month()]; }
    function T(a) { return this._monthsShort[a.month()]; }
    function U(a, b, c) { var d, e, f; for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
        if (e = h([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a))
            return d;
        if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
            return d;
        if (!c && this._monthsParse[d].test(a))
            return d;
    } }
    function V(a, b) { var c; return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), R(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a); }
    function W(b) { return null != b ? (V(this, b), a.updateOffset(this, !0), this) : C(this, "Month"); }
    function X() { return R(this.year(), this.month()); }
    function Y(a) { var b, c = a._a; return c && -2 === j(a).overflow && (b = c[cd] < 0 || c[cd] > 11 ? cd : c[dd] < 1 || c[dd] > R(c[bd], c[cd]) ? dd : c[ed] < 0 || c[ed] > 24 || 24 === c[ed] && (0 !== c[fd] || 0 !== c[gd] || 0 !== c[hd]) ? ed : c[fd] < 0 || c[fd] > 59 ? fd : c[gd] < 0 || c[gd] > 59 ? gd : c[hd] < 0 || c[hd] > 999 ? hd : -1, j(a)._overflowDayOfYear && (bd > b || b > dd) && (b = dd), j(a).overflow = b), a; }
    function Z(b) { a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b); }
    function $(a, b) { var c = !0, d = a + "\n" + (new Error).stack; return g(function () { return c && (Z(d), c = !1), b.apply(this, arguments); }, b); }
    function _(a, b) { kd[a] || (Z(b), kd[a] = !0); }
    function aa(a) { var b, c, d = a._i, e = ld.exec(d); if (e) {
        for (j(a).iso = !0, b = 0, c = md.length; c > b; b++)
            if (md[b][1].exec(d)) {
                a._f = md[b][0] + (e[6] || " ");
                break;
            }
        for (b = 0, c = nd.length; c > b; b++)
            if (nd[b][1].exec(d)) {
                a._f += nd[b][0];
                break;
            }
        d.match(Yc) && (a._f += "Z"), ta(a);
    }
    else
        a._isValid = !1; }
    function ba(b) { var c = od.exec(b._i); return null !== c ? void (b._d = new Date(+c[1])) : (aa(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b)))); }
    function ca(a, b, c, d, e, f, g) { var h = new Date(a, b, c, d, e, f, g); return 1970 > a && h.setFullYear(a), h; }
    function da(a) { var b = new Date(Date.UTC.apply(null, arguments)); return 1970 > a && b.setUTCFullYear(a), b; }
    function ea(a) { return fa(a) ? 366 : 365; }
    function fa(a) { return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0; }
    function ga() { return fa(this.year()); }
    function ha(a, b, c) { var d, e = c - b, f = c - a.day(); return f > e && (f -= 7), e - 7 > f && (f += 7), d = Aa(a).add(f, "d"), { week: Math.ceil(d.dayOfYear() / 7), year: d.year() }; }
    function ia(a) { return ha(a, this._week.dow, this._week.doy).week; }
    function ja() { return this._week.dow; }
    function ka() { return this._week.doy; }
    function la(a) { var b = this.localeData().week(this); return null == a ? b : this.add(7 * (a - b), "d"); }
    function ma(a) { var b = ha(this, 1, 4).week; return null == a ? b : this.add(7 * (a - b), "d"); }
    function na(a, b, c, d, e) { var f, g, h = da(a, 0, 1).getUTCDay(); return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, { year: g > 0 ? a : a - 1, dayOfYear: g > 0 ? g : ea(a - 1) + g }; }
    function oa(a) { var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == a ? b : this.add(a - b, "d"); }
    function pa(a, b, c) { return null != a ? a : null != b ? b : c; }
    function qa(a) { var b = new Date; return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]; }
    function ra(a) { var b, c, d, e, f = []; if (!a._d) {
        for (d = qa(a), a._w && null == a._a[dd] && null == a._a[cd] && sa(a), a._dayOfYear && (e = pa(a._a[bd], d[bd]), a._dayOfYear > ea(e) && (j(a)._overflowDayOfYear = !0), c = da(e, 0, a._dayOfYear), a._a[cd] = c.getUTCMonth(), a._a[dd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b)
            a._a[b] = f[b] = d[b];
        for (; 7 > b; b++)
            a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
        24 === a._a[ed] && 0 === a._a[fd] && 0 === a._a[gd] && 0 === a._a[hd] && (a._nextDay = !0, a._a[ed] = 0), a._d = (a._useUTC ? da : ca).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[ed] = 24);
    } }
    function sa(a) { var b, c, d, e, f, g, h; b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = pa(b.GG, a._a[bd], ha(Aa(), 1, 4).year), d = pa(b.W, 1), e = pa(b.E, 1)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = pa(b.gg, a._a[bd], ha(Aa(), f, g).year), d = pa(b.w, 1), null != b.d ? (e = b.d, f > e && ++d) : e = null != b.e ? b.e + f : f), h = na(c, d, e, g, f), a._a[bd] = h.year, a._dayOfYear = h.dayOfYear; }
    function ta(b) { if (b._f === a.ISO_8601)
        return void aa(b); b._a = [], j(b).empty = !0; var c, d, e, f, g, h = "" + b._i, i = h.length, k = 0; for (e = K(b._f, b._locale).match(Jc) || [], c = 0; c < e.length; c++)
        f = e[c], d = (h.match(M(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), Mc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), Q(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f); j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[ed] <= 12 && b._a[ed] > 0 && (j(b).bigHour = void 0), b._a[ed] = ua(b._locale, b._a[ed], b._meridiem), ra(b), Y(b); }
    function ua(a, b, c) { var d; return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b; }
    function va(a) { var b, c, d, e, f; if (0 === a._f.length)
        return j(a).invalidFormat = !0, void (a._d = new Date(0 / 0)); for (e = 0; e < a._f.length; e++)
        f = 0, b = m({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], ta(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b)); g(a, c || b); }
    function wa(a) { if (!a._d) {
        var b = A(a._i);
        a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], ra(a);
    } }
    function xa(a) { var b, e = a._i, f = a._f; return a._locale = a._locale || x(a._l), null === e || void 0 === f && "" === e ? l({ nullInput: !0 }) : ("string" == typeof e && (a._i = e = a._locale.preparse(e)), o(e) ? new n(Y(e)) : (c(f) ? va(a) : f ? ta(a) : d(e) ? a._d = e : ya(a), b = new n(Y(a)), b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b)); }
    function ya(b) { var f = b._i; void 0 === f ? b._d = new Date : d(f) ? b._d = new Date(+f) : "string" == typeof f ? ba(b) : c(f) ? (b._a = e(f.slice(0), function (a) { return parseInt(a, 10); }), ra(b)) : "object" == typeof f ? wa(b) : "number" == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b); }
    function za(a, b, c, d, e) { var f = {}; return "boolean" == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, xa(f); }
    function Aa(a, b, c, d) { return za(a, b, c, d, !1); }
    function Ba(a, b) { var d, e; if (1 === b.length && c(b[0]) && (b = b[0]), !b.length)
        return Aa(); for (d = b[0], e = 1; e < b.length; ++e)
        b[e][a](d) && (d = b[e]); return d; }
    function Ca() { var a = [].slice.call(arguments, 0); return Ba("isBefore", a); }
    function Da() { var a = [].slice.call(arguments, 0); return Ba("isAfter", a); }
    function Ea(a) { var b = A(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0; this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = x(), this._bubble(); }
    function Fa(a) { return a instanceof Ea; }
    function Ga(a, b) { G(a, 0, 0, function () { var a = this.utcOffset(), c = "+"; return 0 > a && (a = -a, c = "-"), c + F(~~(a / 60), 2) + b + F(~~a % 60, 2); }); }
    function Ha(a) { var b = (a || "").match(Yc) || [], c = b[b.length - 1] || [], d = (c + "").match(td) || ["-", 0, 0], e = +(60 * d[1]) + p(d[2]); return "+" === d[0] ? e : -e; }
    function Ia(b, c) { var e, f; return c._isUTC ? (e = c.clone(), f = (o(b) || d(b) ? +b : +Aa(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Aa(b).local(); return c._isUTC ? Aa(b).zone(c._offset || 0) : Aa(b).local(); }
    function Ja(a) { return 15 * -Math.round(a._d.getTimezoneOffset() / 15); }
    function Ka(b, c) { var d, e = this._offset || 0; return null != b ? ("string" == typeof b && (b = Ha(b)), Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ja(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, "m"), e !== b && (!c || this._changeInProgress ? $a(this, Va(b - e, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ja(this); }
    function La(a, b) { return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset(); }
    function Ma(a) { return this.utcOffset(0, a); }
    function Na(a) { return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ja(this), "m")), this; }
    function Oa() { return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ha(this._i)), this; }
    function Pa(a) { return a = a ? Aa(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0; }
    function Qa() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset(); }
    function Ra() { if (this._a) {
        var a = this._isUTC ? h(this._a) : Aa(this._a);
        return this.isValid() && q(this._a, a.toArray()) > 0;
    } return !1; }
    function Sa() { return !this._isUTC; }
    function Ta() { return this._isUTC; }
    function Ua() { return this._isUTC && 0 === this._offset; }
    function Va(a, b) { var c, d, e, g = a, h = null; return Fa(a) ? g = { ms: a._milliseconds, d: a._days, M: a._months } : "number" == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = ud.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: 0, d: p(h[dd]) * c, h: p(h[ed]) * c, m: p(h[fd]) * c, s: p(h[gd]) * c, ms: p(h[hd]) * c }) : (h = vd.exec(a)) ? (c = "-" === h[1] ? -1 : 1, g = { y: Wa(h[2], c), M: Wa(h[3], c), d: Wa(h[4], c), h: Wa(h[5], c), m: Wa(h[6], c), s: Wa(h[7], c), w: Wa(h[8], c) }) : null == g ? g = {} : "object" == typeof g && ("from" in g || "to" in g) && (e = Ya(Aa(g.from), Aa(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ea(g), Fa(a) && f(a, "_locale") && (d._locale = a._locale), d; }
    function Wa(a, b) { var c = a && parseFloat(a.replace(",", ".")); return (isNaN(c) ? 0 : c) * b; }
    function Xa(a, b) { var c = { milliseconds: 0, months: 0 }; return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c; }
    function Ya(a, b) { var c; return b = Ia(b, a), a.isBefore(b) ? c = Xa(a, b) : (c = Xa(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c; }
    function Za(a, b) { return function (c, d) { var e, f; return null === d || isNaN(+d) || (_(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Va(c, d), $a(this, e, a), this; }; }
    function $a(b, c, d, e) { var f = c._milliseconds, g = c._days, h = c._months; e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && D(b, "Date", C(b, "Date") + g * d), h && V(b, C(b, "Month") + h * d), e && a.updateOffset(b, g || h); }
    function _a(a) { var b = a || Aa(), c = Ia(b, this).startOf("day"), d = this.diff(c, "days", !0), e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse"; return this.format(this.localeData().calendar(e, this, Aa(b))); }
    function ab() { return new n(this); }
    function bb(a, b) { var c; return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +this > +a) : (c = o(a) ? +a : +Aa(a), c < +this.clone().startOf(b)); }
    function cb(a, b) { var c; return b = z("undefined" != typeof b ? b : "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +a > +this) : (c = o(a) ? +a : +Aa(a), +this.clone().endOf(b) < c); }
    function db(a, b, c) { return this.isAfter(a, c) && this.isBefore(b, c); }
    function eb(a, b) { var c; return b = z(b || "millisecond"), "millisecond" === b ? (a = o(a) ? a : Aa(a), +this === +a) : (c = +Aa(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b)); }
    function fb(a) { return 0 > a ? Math.ceil(a) : Math.floor(a); }
    function gb(a, b, c) { var d, e, f = Ia(a, this), g = 6e4 * (f.utcOffset() - this.utcOffset()); return b = z(b), "year" === b || "month" === b || "quarter" === b ? (e = hb(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : fb(e); }
    function hb(a, b) { var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months"); return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d); }
    function ib() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"); }
    function jb() { var a = this.clone().utc(); return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : J(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : J(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"); }
    function kb(b) { var c = J(this, b || a.defaultFormat); return this.localeData().postformat(c); }
    function lb(a, b) { return this.isValid() ? Va({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate(); }
    function mb(a) { return this.from(Aa(), a); }
    function nb(a, b) { return this.isValid() ? Va({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate(); }
    function ob(a) { return this.to(Aa(), a); }
    function pb(a) { var b; return void 0 === a ? this._locale._abbr : (b = x(a), null != b && (this._locale = b), this); }
    function qb() { return this._locale; }
    function rb(a) { switch (a = z(a)) {
        case "year": this.month(0);
        case "quarter":
        case "month": this.date(1);
        case "week":
        case "isoWeek":
        case "day": this.hours(0);
        case "hour": this.minutes(0);
        case "minute": this.seconds(0);
        case "second": this.milliseconds(0);
    } return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this; }
    function sb(a) { return a = z(a), void 0 === a || "millisecond" === a ? this : this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"); }
    function tb() { return +this._d - 6e4 * (this._offset || 0); }
    function ub() { return Math.floor(+this / 1e3); }
    function vb() { return this._offset ? new Date(+this) : this._d; }
    function wb() { var a = this; return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]; }
    function xb() { return k(this); }
    function yb() { return g({}, j(this)); }
    function zb() { return j(this).overflow; }
    function Ab(a, b) { G(0, [a, a.length], 0, b); }
    function Bb(a, b, c) { return ha(Aa([a, 11, 31 + b - c]), b, c).week; }
    function Cb(a) { var b = ha(this, this.localeData()._week.dow, this.localeData()._week.doy).year; return null == a ? b : this.add(a - b, "y"); }
    function Db(a) { var b = ha(this, 1, 4).year; return null == a ? b : this.add(a - b, "y"); }
    function Eb() { return Bb(this.year(), 1, 4); }
    function Fb() { var a = this.localeData()._week; return Bb(this.year(), a.dow, a.doy); }
    function Gb(a) { return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3); }
    function Hb(a, b) { if ("string" == typeof a)
        if (isNaN(a)) {
            if (a = b.weekdaysParse(a), "number" != typeof a)
                return null;
        }
        else
            a = parseInt(a, 10); return a; }
    function Ib(a) { return this._weekdays[a.day()]; }
    function Jb(a) { return this._weekdaysShort[a.day()]; }
    function Kb(a) { return this._weekdaysMin[a.day()]; }
    function Lb(a) { var b, c, d; for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
        if (this._weekdaysParse[b] || (c = Aa([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a))
            return b; }
    function Mb(a) { var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != a ? (a = Hb(a, this.localeData()), this.add(a - b, "d")) : b; }
    function Nb(a) { var b = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == a ? b : this.add(a - b, "d"); }
    function Ob(a) { return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7); }
    function Pb(a, b) { G(a, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), b); }); }
    function Qb(a, b) { return b._meridiemParse; }
    function Rb(a) { return "p" === (a + "").toLowerCase().charAt(0); }
    function Sb(a, b, c) { return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"; }
    function Tb(a) { G(0, [a, 3], 0, "millisecond"); }
    function Ub() { return this._isUTC ? "UTC" : ""; }
    function Vb() { return this._isUTC ? "Coordinated Universal Time" : ""; }
    function Wb(a) { return Aa(1e3 * a); }
    function Xb() { return Aa.apply(null, arguments).parseZone(); }
    function Yb(a, b, c) { var d = this._calendar[a]; return "function" == typeof d ? d.call(b, c) : d; }
    function Zb(a) { var b = this._longDateFormat[a]; return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (a) { return a.slice(1); }), this._longDateFormat[a] = b), b; }
    function $b() { return this._invalidDate; }
    function _b(a) { return this._ordinal.replace("%d", a); }
    function ac(a) { return a; }
    function bc(a, b, c, d) { var e = this._relativeTime[c]; return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a); }
    function cc(a, b) { var c = this._relativeTime[a > 0 ? "future" : "past"]; return "function" == typeof c ? c(b) : c.replace(/%s/i, b); }
    function dc(a) { var b, c; for (c in a)
        b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b; this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source); }
    function ec(a, b, c, d) { var e = x(), f = h().set(d, b); return e[c](f, a); }
    function fc(a, b, c, d, e) { if ("number" == typeof a && (b = a, a = void 0), a = a || "", null != b)
        return ec(a, b, c, e); var f, g = []; for (f = 0; d > f; f++)
        g[f] = ec(a, f, c, e); return g; }
    function gc(a, b) { return fc(a, b, "months", 12, "month"); }
    function hc(a, b) { return fc(a, b, "monthsShort", 12, "month"); }
    function ic(a, b) { return fc(a, b, "weekdays", 7, "day"); }
    function jc(a, b) { return fc(a, b, "weekdaysShort", 7, "day"); }
    function kc(a, b) { return fc(a, b, "weekdaysMin", 7, "day"); }
    function lc() { var a = this._data; return this._milliseconds = Rd(this._milliseconds), this._days = Rd(this._days), this._months = Rd(this._months), a.milliseconds = Rd(a.milliseconds), a.seconds = Rd(a.seconds), a.minutes = Rd(a.minutes), a.hours = Rd(a.hours), a.months = Rd(a.months), a.years = Rd(a.years), this; }
    function mc(a, b, c, d) { var e = Va(b, c); return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble(); }
    function nc(a, b) { return mc(this, a, b, 1); }
    function oc(a, b) { return mc(this, a, b, -1); }
    function pc() { var a, b, c, d = this._milliseconds, e = this._days, f = this._months, g = this._data, h = 0; return g.milliseconds = d % 1e3, a = fb(d / 1e3), g.seconds = a % 60, b = fb(a / 60), g.minutes = b % 60, c = fb(b / 60), g.hours = c % 24, e += fb(c / 24), h = fb(qc(e)), e -= fb(rc(h)), f += fb(e / 30), e %= 30, h += fb(f / 12), f %= 12, g.days = e, g.months = f, g.years = h, this; }
    function qc(a) { return 400 * a / 146097; }
    function rc(a) { return 146097 * a / 400; }
    function sc(a) { var b, c, d = this._milliseconds; if (a = z(a), "month" === a || "year" === a)
        return b = this._days + d / 864e5, c = this._months + 12 * qc(b), "month" === a ? c : c / 12; switch (b = this._days + Math.round(rc(this._months / 12)), a) {
        case "week": return b / 7 + d / 6048e5;
        case "day": return b + d / 864e5;
        case "hour": return 24 * b + d / 36e5;
        case "minute": return 1440 * b + d / 6e4;
        case "second": return 86400 * b + d / 1e3;
        case "millisecond": return Math.floor(864e5 * b) + d;
        default: throw new Error("Unknown unit " + a);
    } }
    function tc() { return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * p(this._months / 12); }
    function uc(a) { return function () { return this.as(a); }; }
    function vc(a) { return a = z(a), this[a + "s"](); }
    function wc(a) { return function () { return this._data[a]; }; }
    function xc() { return fb(this.days() / 7); }
    function yc(a, b, c, d, e) { return e.relativeTime(b || 1, !!c, a, d); }
    function zc(a, b, c) { var d = Va(a).abs(), e = fe(d.as("s")), f = fe(d.as("m")), g = fe(d.as("h")), h = fe(d.as("d")), i = fe(d.as("M")), j = fe(d.as("y")), k = e < ge.s && ["s", e] || 1 === f && ["m"] || f < ge.m && ["mm", f] || 1 === g && ["h"] || g < ge.h && ["hh", g] || 1 === h && ["d"] || h < ge.d && ["dd", h] || 1 === i && ["M"] || i < ge.M && ["MM", i] || 1 === j && ["y"] || ["yy", j]; return k[2] = b, k[3] = +a > 0, k[4] = c, yc.apply(null, k); }
    function Ac(a, b) { return void 0 === ge[a] ? !1 : void 0 === b ? ge[a] : (ge[a] = b, !0); }
    function Bc(a) { var b = this.localeData(), c = zc(this, !a, b); return a && (c = b.pastFuture(+this, c)), b.postformat(c); }
    function Cc() { var a = he(this.years()), b = he(this.months()), c = he(this.days()), d = he(this.hours()), e = he(this.minutes()), f = he(this.seconds() + this.milliseconds() / 1e3), g = this.asSeconds(); return g ? (0 > g ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"; }
    var Dc, Ec, Fc = a.momentProperties = [], Gc = !1, Hc = {}, Ic = {}, Jc = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Kc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Lc = {}, Mc = {}, Nc = /\d/, Oc = /\d\d/, Pc = /\d{3}/, Qc = /\d{4}/, Rc = /[+-]?\d{6}/, Sc = /\d\d?/, Tc = /\d{1,3}/, Uc = /\d{1,4}/, Vc = /[+-]?\d{1,6}/, Wc = /\d+/, Xc = /[+-]?\d+/, Yc = /Z|[+-]\d\d:?\d\d/gi, Zc = /[+-]?\d+(\.\d{1,3})?/, $c = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, _c = {}, ad = {}, bd = 0, cd = 1, dd = 2, ed = 3, fd = 4, gd = 5, hd = 6;
    G("M", ["MM", 2], "Mo", function () { return this.month() + 1; }), G("MMM", 0, 0, function (a) { return this.localeData().monthsShort(this, a); }), G("MMMM", 0, 0, function (a) { return this.localeData().months(this, a); }), y("month", "M"), L("M", Sc), L("MM", Sc, Oc), L("MMM", $c), L("MMMM", $c), O(["M", "MM"], function (a, b) { b[cd] = p(a) - 1; }), O(["MMM", "MMMM"], function (a, b, c, d) { var e = c._locale.monthsParse(a, d, c._strict); null != e ? b[cd] = e : j(c).invalidMonth = a; });
    var id = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), jd = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), kd = {};
    a.suppressDeprecationWarnings = !1;
    var ld = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, md = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], nd = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], od = /^\/?Date\((\-?\d+)/i;
    a.createFromInputFallback = $("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) { a._d = new Date(a._i + (a._useUTC ? " UTC" : "")); }), G(0, ["YY", 2], 0, function () { return this.year() % 100; }), G(0, ["YYYY", 4], 0, "year"), G(0, ["YYYYY", 5], 0, "year"), G(0, ["YYYYYY", 6, !0], 0, "year"), y("year", "y"), L("Y", Xc), L("YY", Sc, Oc), L("YYYY", Uc, Qc), L("YYYYY", Vc, Rc), L("YYYYYY", Vc, Rc), O(["YYYY", "YYYYY", "YYYYYY"], bd), O("YY", function (b, c) { c[bd] = a.parseTwoDigitYear(b); }), a.parseTwoDigitYear = function (a) { return p(a) + (p(a) > 68 ? 1900 : 2e3); };
    var pd = B("FullYear", !1);
    G("w", ["ww", 2], "wo", "week"), G("W", ["WW", 2], "Wo", "isoWeek"), y("week", "w"), y("isoWeek", "W"), L("w", Sc), L("ww", Sc, Oc), L("W", Sc), L("WW", Sc, Oc), P(["w", "ww", "W", "WW"], function (a, b, c, d) { b[d.substr(0, 1)] = p(a); });
    var qd = { dow: 0, doy: 6 };
    G("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), y("dayOfYear", "DDD"), L("DDD", Tc), L("DDDD", Pc), O(["DDD", "DDDD"], function (a, b, c) { c._dayOfYear = p(a); }), a.ISO_8601 = function () { };
    var rd = $("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () { var a = Aa.apply(null, arguments); return this > a ? this : a; }), sd = $("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () { var a = Aa.apply(null, arguments); return a > this ? this : a; });
    Ga("Z", ":"), Ga("ZZ", ""), L("Z", Yc), L("ZZ", Yc), O(["Z", "ZZ"], function (a, b, c) { c._useUTC = !0, c._tzm = Ha(a); });
    var td = /([\+\-]|\d\d)/gi;
    a.updateOffset = function () { };
    var ud = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, vd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Va.fn = Ea.prototype;
    var wd = Za(1, "add"), xd = Za(-1, "subtract");
    a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var yd = $("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) { return void 0 === a ? this.localeData() : this.locale(a); });
    G(0, ["gg", 2], 0, function () { return this.weekYear() % 100; }), G(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100; }), Ab("gggg", "weekYear"), Ab("ggggg", "weekYear"), Ab("GGGG", "isoWeekYear"), Ab("GGGGG", "isoWeekYear"), y("weekYear", "gg"), y("isoWeekYear", "GG"), L("G", Xc), L("g", Xc), L("GG", Sc, Oc), L("gg", Sc, Oc), L("GGGG", Uc, Qc), L("gggg", Uc, Qc), L("GGGGG", Vc, Rc), L("ggggg", Vc, Rc), P(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) { b[d.substr(0, 2)] = p(a); }), P(["gg", "GG"], function (b, c, d, e) { c[e] = a.parseTwoDigitYear(b); }), G("Q", 0, 0, "quarter"), y("quarter", "Q"), L("Q", Nc), O("Q", function (a, b) { b[cd] = 3 * (p(a) - 1); }), G("D", ["DD", 2], "Do", "date"), y("date", "D"), L("D", Sc), L("DD", Sc, Oc), L("Do", function (a, b) { return a ? b._ordinalParse : b._ordinalParseLenient; }), O(["D", "DD"], dd), O("Do", function (a, b) { b[dd] = p(a.match(Sc)[0], 10); });
    var zd = B("Date", !0);
    G("d", 0, "do", "day"), G("dd", 0, 0, function (a) { return this.localeData().weekdaysMin(this, a); }), G("ddd", 0, 0, function (a) { return this.localeData().weekdaysShort(this, a); }), G("dddd", 0, 0, function (a) { return this.localeData().weekdays(this, a); }), G("e", 0, 0, "weekday"), G("E", 0, 0, "isoWeekday"), y("day", "d"), y("weekday", "e"), y("isoWeekday", "E"), L("d", Sc), L("e", Sc), L("E", Sc), L("dd", $c), L("ddd", $c), L("dddd", $c), P(["dd", "ddd", "dddd"], function (a, b, c) { var d = c._locale.weekdaysParse(a); null != d ? b.d = d : j(c).invalidWeekday = a; }), P(["d", "e", "E"], function (a, b, c, d) { b[d] = p(a); });
    var Ad = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Bd = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Cd = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    G("H", ["HH", 2], 0, "hour"), G("h", ["hh", 2], 0, function () { return this.hours() % 12 || 12; }), Pb("a", !0), Pb("A", !1), y("hour", "h"), L("a", Qb), L("A", Qb), L("H", Sc), L("h", Sc), L("HH", Sc, Oc), L("hh", Sc, Oc), O(["H", "HH"], ed), O(["a", "A"], function (a, b, c) { c._isPm = c._locale.isPM(a), c._meridiem = a; }), O(["h", "hh"], function (a, b, c) { b[ed] = p(a), j(c).bigHour = !0; });
    var Dd = /[ap]\.?m?\.?/i, Ed = B("Hours", !0);
    G("m", ["mm", 2], 0, "minute"), y("minute", "m"), L("m", Sc), L("mm", Sc, Oc), O(["m", "mm"], fd);
    var Fd = B("Minutes", !1);
    G("s", ["ss", 2], 0, "second"), y("second", "s"), L("s", Sc), L("ss", Sc, Oc), O(["s", "ss"], gd);
    var Gd = B("Seconds", !1);
    G("S", 0, 0, function () { return ~~(this.millisecond() / 100); }), G(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10); }), Tb("SSS"), Tb("SSSS"), y("millisecond", "ms"), L("S", Tc, Nc), L("SS", Tc, Oc), L("SSS", Tc, Pc), L("SSSS", Wc), O(["S", "SS", "SSS", "SSSS"], function (a, b) { b[hd] = p(1e3 * ("0." + a)); });
    var Hd = B("Milliseconds", !1);
    G("z", 0, 0, "zoneAbbr"), G("zz", 0, 0, "zoneName");
    var Id = n.prototype;
    Id.add = wd, Id.calendar = _a, Id.clone = ab, Id.diff = gb, Id.endOf = sb, Id.format = kb, Id.from = lb, Id.fromNow = mb, Id.to = nb, Id.toNow = ob, Id.get = E, Id.invalidAt = zb, Id.isAfter = bb, Id.isBefore = cb, Id.isBetween = db, Id.isSame = eb, Id.isValid = xb, Id.lang = yd, Id.locale = pb, Id.localeData = qb, Id.max = sd, Id.min = rd, Id.parsingFlags = yb, Id.set = E, Id.startOf = rb, Id.subtract = xd, Id.toArray = wb, Id.toDate = vb, Id.toISOString = jb, Id.toJSON = jb, Id.toString = ib, Id.unix = ub, Id.valueOf = tb, Id.year = pd, Id.isLeapYear = ga, Id.weekYear = Cb, Id.isoWeekYear = Db, Id.quarter = Id.quarters = Gb, Id.month = W, Id.daysInMonth = X, Id.week = Id.weeks = la, Id.isoWeek = Id.isoWeeks = ma, Id.weeksInYear = Fb, Id.isoWeeksInYear = Eb, Id.date = zd, Id.day = Id.days = Mb, Id.weekday = Nb, Id.isoWeekday = Ob, Id.dayOfYear = oa, Id.hour = Id.hours = Ed, Id.minute = Id.minutes = Fd, Id.second = Id.seconds = Gd, Id.millisecond = Id.milliseconds = Hd, Id.utcOffset = Ka, Id.utc = Ma, Id.local = Na, Id.parseZone = Oa, Id.hasAlignedHourOffset = Pa, Id.isDST = Qa, Id.isDSTShifted = Ra, Id.isLocal = Sa, Id.isUtcOffset = Ta, Id.isUtc = Ua, Id.isUTC = Ua, Id.zoneAbbr = Ub, Id.zoneName = Vb, Id.dates = $("dates accessor is deprecated. Use date instead.", zd), Id.months = $("months accessor is deprecated. Use month instead", W), Id.years = $("years accessor is deprecated. Use year instead", pd), Id.zone = $("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", La);
    var Jd = Id, Kd = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, Ld = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY LT", LLLL: "dddd, MMMM D, YYYY LT" }, Md = "Invalid date", Nd = "%d", Od = /\d{1,2}/, Pd = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour",
        hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, Qd = r.prototype;
    Qd._calendar = Kd, Qd.calendar = Yb, Qd._longDateFormat = Ld, Qd.longDateFormat = Zb, Qd._invalidDate = Md, Qd.invalidDate = $b, Qd._ordinal = Nd, Qd.ordinal = _b, Qd._ordinalParse = Od, Qd.preparse = ac, Qd.postformat = ac, Qd._relativeTime = Pd, Qd.relativeTime = bc, Qd.pastFuture = cc, Qd.set = dc, Qd.months = S, Qd._months = id, Qd.monthsShort = T, Qd._monthsShort = jd, Qd.monthsParse = U, Qd.week = ia, Qd._week = qd, Qd.firstDayOfYear = ka, Qd.firstDayOfWeek = ja, Qd.weekdays = Ib, Qd._weekdays = Ad, Qd.weekdaysMin = Kb, Qd._weekdaysMin = Cd, Qd.weekdaysShort = Jb, Qd._weekdaysShort = Bd, Qd.weekdaysParse = Lb, Qd.isPM = Rb, Qd._meridiemParse = Dd, Qd.meridiem = Sb, v("en", { ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (a) { var b = a % 10, c = 1 === p(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th"; return a + c; } }), a.lang = $("moment.lang is deprecated. Use moment.locale instead.", v), a.langData = $("moment.langData is deprecated. Use moment.localeData instead.", x);
    var Rd = Math.abs, Sd = uc("ms"), Td = uc("s"), Ud = uc("m"), Vd = uc("h"), Wd = uc("d"), Xd = uc("w"), Yd = uc("M"), Zd = uc("y"), $d = wc("milliseconds"), _d = wc("seconds"), ae = wc("minutes"), be = wc("hours"), ce = wc("days"), de = wc("months"), ee = wc("years"), fe = Math.round, ge = { s: 45, m: 45, h: 22, d: 26, M: 11 }, he = Math.abs, ie = Ea.prototype;
    ie.abs = lc, ie.add = nc, ie.subtract = oc, ie.as = sc, ie.asMilliseconds = Sd, ie.asSeconds = Td, ie.asMinutes = Ud, ie.asHours = Vd, ie.asDays = Wd, ie.asWeeks = Xd, ie.asMonths = Yd, ie.asYears = Zd, ie.valueOf = tc, ie._bubble = pc, ie.get = vc, ie.milliseconds = $d, ie.seconds = _d, ie.minutes = ae, ie.hours = be, ie.days = ce, ie.weeks = xc, ie.months = de, ie.years = ee, ie.humanize = Bc, ie.toISOString = Cc, ie.toString = Cc, ie.toJSON = Cc, ie.locale = pb, ie.localeData = qb, ie.toIsoString = $("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Cc), ie.lang = yd, G("X", 0, 0, "unix"), G("x", 0, 0, "valueOf"), L("x", Xc), L("X", Zc), O("X", function (a, b, c) { c._d = new Date(1e3 * parseFloat(a, 10)); }), O("x", function (a, b, c) { c._d = new Date(p(a)); }), a.version = "2.10.3", b(Aa), a.fn = Jd, a.min = Ca, a.max = Da, a.utc = h, a.unix = Wb, a.months = gc, a.isDate = d, a.locale = v, a.invalid = l, a.duration = Va, a.isMoment = o, a.weekdays = ic, a.parseZone = Xb, a.localeData = x, a.isDuration = Fa, a.monthsShort = hc, a.weekdaysMin = kc, a.defineLocale = w, a.weekdaysShort = jc, a.normalizeUnits = z, a.relativeTimeThreshold = Ac;
    var je = a;
    return je;
});
(function (so) {
    'use strict';
    var uidList = [], uid;
    uidList.push(uid = function () {
        return this;
    });
    so.pushUid = function (method) {
        uidList.push(method);
        uid = method;
        return method;
    };
    so.popUid = function () {
        var prev;
        uidList.length > 1 && (prev = uidList.pop());
        uid = uidList[uidList.length - 1];
        return prev || null;
    };
    function process(a, b, evaluator) {
        var hist = Object.create(null), out = [], ukey, k;
        a.forEach(function (value) {
            ukey = uid.call(value);
            if (!hist[ukey]) {
                hist[ukey] = { value: value, freq: 1 };
            }
        });
        b.forEach(function (value) {
            ukey = uid.call(value);
            if (hist[ukey]) {
                if (hist[ukey].freq === 1)
                    hist[ukey].freq = 3;
            }
            else {
                hist[ukey] = { value: value, freq: 2 };
            }
        });
        if (evaluator) {
            for (k in hist) {
                if (evaluator(hist[k].freq))
                    out.push(hist[k].value);
            }
            return out;
        }
        else {
            return hist;
        }
    }
    ;
    so.union = function (a, b) {
        return process(a, b, function (freq) {
            return true;
        });
    };
    so.intersection = function (a, b) {
        return process(a, b, function (freq) {
            return freq === 3;
        });
    };
    so.difference = function (a, b) {
        return process(a, b, function (freq) {
            return freq < 3;
        });
    };
    so.complement = function (a, b) {
        return process(a, b, function (freq) {
            return freq === 1;
        });
    };
    so.equals = function (a, b) {
        var max = 0, min = Math.pow(2, 53), key, hist = process(a, b);
        for (var key in hist) {
            max = Math.max(max, hist[key].freq);
            min = Math.min(min, hist[key].freq);
        }
        return min === 3 && max === 3;
    };
})(window.setOps = window.setOps || Object.create(null));
(function (global) {
    "use strict";
    var IS_WORKER = !global.document, LOADED_SYNC = false, AUTO_SCRIPT_PATH;
    var workers = {}, workerIdCounter = 0;
    global.Papa = {};
    global.Papa.parse = CsvToJson;
    global.Papa.unparse = JsonToCsv;
    global.Papa.RECORD_SEP = String.fromCharCode(30);
    global.Papa.UNIT_SEP = String.fromCharCode(31);
    global.Papa.BYTE_ORDER_MARK = "\ufeff";
    global.Papa.BAD_DELIMITERS = ["\r", "\n", "\"", global.Papa.BYTE_ORDER_MARK];
    global.Papa.WORKERS_SUPPORTED = !!global.Worker;
    global.Papa.SCRIPT_PATH = null;
    global.Papa.LocalChunkSize = 1024 * 1024 * 10;
    global.Papa.RemoteChunkSize = 1024 * 1024 * 5;
    global.Papa.DefaultDelimiter = ",";
    global.Papa.Parser = Parser;
    global.Papa.ParserHandle = ParserHandle;
    global.Papa.NetworkStreamer = NetworkStreamer;
    global.Papa.FileStreamer = FileStreamer;
    global.Papa.StringStreamer = StringStreamer;
    if (global.jQuery) {
        var $ = global.jQuery;
        $.fn.parse = function (options) {
            var config = options.config || {};
            var queue = [];
            this.each(function (idx) {
                var supported = $(this).prop('tagName').toUpperCase() == "INPUT"
                    && $(this).attr('type').toLowerCase() == "file"
                    && global.FileReader;
                if (!supported || !this.files || this.files.length == 0)
                    return true;
                for (var i = 0; i < this.files.length; i++) {
                    queue.push({
                        file: this.files[i],
                        inputElem: this,
                        instanceConfig: $.extend({}, config)
                    });
                }
            });
            parseNextFile();
            return this;
            function parseNextFile() {
                if (queue.length == 0) {
                    if (isFunction(options.complete))
                        options.complete();
                    return;
                }
                var f = queue[0];
                if (isFunction(options.before)) {
                    var returned = options.before(f.file, f.inputElem);
                    if (typeof returned === 'object') {
                        if (returned.action == "abort") {
                            error("AbortError", f.file, f.inputElem, returned.reason);
                            return;
                        }
                        else if (returned.action == "skip") {
                            fileComplete();
                            return;
                        }
                        else if (typeof returned.config === 'object')
                            f.instanceConfig = $.extend(f.instanceConfig, returned.config);
                    }
                    else if (returned == "skip") {
                        fileComplete();
                        return;
                    }
                }
                var userCompleteFunc = f.instanceConfig.complete;
                f.instanceConfig.complete = function (results) {
                    if (isFunction(userCompleteFunc))
                        userCompleteFunc(results, f.file, f.inputElem);
                    fileComplete();
                };
                Papa.parse(f.file, f.instanceConfig);
            }
            function error(name, file, elem, reason) {
                if (isFunction(options.error))
                    options.error({ name: name }, file, elem, reason);
            }
            function fileComplete() {
                queue.splice(0, 1);
                parseNextFile();
            }
        };
    }
    if (IS_WORKER) {
        global.onmessage = workerThreadReceivedMessage;
    }
    else if (Papa.WORKERS_SUPPORTED) {
        AUTO_SCRIPT_PATH = getScriptPath();
        if (!document.body) {
            LOADED_SYNC = true;
        }
        else {
            document.addEventListener('DOMContentLoaded', function () {
                LOADED_SYNC = true;
            }, true);
        }
    }
    function CsvToJson(_input, _config) {
        _config = _config || {};
        if (_config.worker && Papa.WORKERS_SUPPORTED) {
            var w = newWorker();
            w.userStep = _config.step;
            w.userChunk = _config.chunk;
            w.userComplete = _config.complete;
            w.userError = _config.error;
            _config.step = isFunction(_config.step);
            _config.chunk = isFunction(_config.chunk);
            _config.complete = isFunction(_config.complete);
            _config.error = isFunction(_config.error);
            delete _config.worker;
            w.postMessage({
                input: _input,
                config: _config,
                workerId: w.id
            });
            return;
        }
        var streamer = null;
        if (typeof _input === 'string') {
            if (_config.download)
                streamer = new NetworkStreamer(_config);
            else
                streamer = new StringStreamer(_config);
        }
        else if ((global.File && _input instanceof File) || _input instanceof Object)
            streamer = new FileStreamer(_config);
        return streamer.stream(_input);
    }
    function JsonToCsv(_input, _config) {
        var _output = "";
        var _fields = [];
        var _quotes = false;
        var _delimiter = ",";
        var _newline = "\r\n";
        unpackConfig();
        if (typeof _input === 'string')
            _input = JSON.parse(_input);
        if (_input instanceof Array) {
            if (!_input.length || _input[0] instanceof Array)
                return serialize(null, _input);
            else if (typeof _input[0] === 'object')
                return serialize(objectKeys(_input[0]), _input);
        }
        else if (typeof _input === 'object') {
            if (typeof _input.data === 'string')
                _input.data = JSON.parse(_input.data);
            if (_input.data instanceof Array) {
                if (!_input.fields)
                    _input.fields = _input.data[0] instanceof Array
                        ? _input.fields
                        : objectKeys(_input.data[0]);
                if (!(_input.data[0] instanceof Array) && typeof _input.data[0] !== 'object')
                    _input.data = [_input.data];
            }
            return serialize(_input.fields || [], _input.data || []);
        }
        throw "exception: Unable to serialize unrecognized input";
        function unpackConfig() {
            if (typeof _config !== 'object')
                return;
            if (typeof _config.delimiter === 'string'
                && _config.delimiter.length == 1
                && global.Papa.BAD_DELIMITERS.indexOf(_config.delimiter) == -1) {
                _delimiter = _config.delimiter;
            }
            if (typeof _config.quotes === 'boolean'
                || _config.quotes instanceof Array)
                _quotes = _config.quotes;
            if (typeof _config.newline === 'string')
                _newline = _config.newline;
        }
        function objectKeys(obj) {
            if (typeof obj !== 'object')
                return [];
            var keys = [];
            for (var key in obj)
                keys.push(key);
            return keys;
        }
        function serialize(fields, data) {
            var csv = "";
            if (typeof fields === 'string')
                fields = JSON.parse(fields);
            if (typeof data === 'string')
                data = JSON.parse(data);
            var hasHeader = fields instanceof Array && fields.length > 0;
            var dataKeyedByField = !(data[0] instanceof Array);
            if (hasHeader) {
                for (var i = 0; i < fields.length; i++) {
                    if (i > 0)
                        csv += _delimiter;
                    csv += safe(fields[i], i);
                }
                if (data.length > 0)
                    csv += _newline;
            }
            for (var row = 0; row < data.length; row++) {
                var maxCol = hasHeader ? fields.length : data[row].length;
                for (var col = 0; col < maxCol; col++) {
                    if (col > 0)
                        csv += _delimiter;
                    var colIdx = hasHeader && dataKeyedByField ? fields[col] : col;
                    csv += safe(data[row][colIdx], col);
                }
                if (row < data.length - 1)
                    csv += _newline;
            }
            return csv;
        }
        function safe(str, col) {
            if (typeof str === "undefined" || str === null)
                return "";
            str = str.toString().replace(/"/g, '""');
            var needsQuotes = (typeof _quotes === 'boolean' && _quotes)
                || (_quotes instanceof Array && _quotes[col])
                || hasAny(str, global.Papa.BAD_DELIMITERS)
                || str.indexOf(_delimiter) > -1
                || str.charAt(0) == ' '
                || str.charAt(str.length - 1) == ' ';
            return needsQuotes ? '"' + str + '"' : str;
        }
        function hasAny(str, substrings) {
            for (var i = 0; i < substrings.length; i++)
                if (str.indexOf(substrings[i]) > -1)
                    return true;
            return false;
        }
    }
    function ChunkStreamer(config) {
        this._handle = null;
        this._paused = false;
        this._finished = false;
        this._input = null;
        this._baseIndex = 0;
        this._partialLine = "";
        this._rowCount = 0;
        this._start = 0;
        this._nextChunk = null;
        replaceConfig.call(this, config);
        this.parseChunk = function (chunk) {
            var aggregate = this._partialLine + chunk;
            this._partialLine = "";
            var results = this._handle.parse(aggregate, this._baseIndex, !this._finished);
            if (this._handle.paused())
                return;
            var lastIndex = results.meta.cursor;
            if (!this._finished) {
                this._partialLine = aggregate.substring(lastIndex - this._baseIndex);
                this._baseIndex = lastIndex;
            }
            if (results && results.data)
                this._rowCount += results.data.length;
            var finishedIncludingPreview = this._finished || (this._config.preview && this._rowCount >= this._config.preview);
            if (IS_WORKER) {
                global.postMessage({
                    results: results,
                    workerId: Papa.WORKER_ID,
                    finished: finishedIncludingPreview
                });
            }
            else if (isFunction(this._config.chunk)) {
                this._config.chunk(results, this._handle);
                if (this._paused)
                    return;
                results = undefined;
            }
            if (finishedIncludingPreview && isFunction(this._config.complete) && (!results || !results.meta.aborted))
                this._config.complete(results);
            if (!finishedIncludingPreview && (!results || !results.meta.paused))
                this._nextChunk();
            return results;
        };
        this._sendError = function (error) {
            if (isFunction(this._config.error))
                this._config.error(error);
            else if (IS_WORKER && this._config.error) {
                global.postMessage({
                    workerId: Papa.WORKER_ID,
                    error: error,
                    finished: false
                });
            }
        };
        function replaceConfig(config) {
            var configCopy = copy(config);
            configCopy.chunkSize = parseInt(configCopy.chunkSize);
            this._handle = new ParserHandle(configCopy);
            this._handle.streamer = this;
            this._config = configCopy;
        }
    }
    function NetworkStreamer(config) {
        config = config || {};
        if (!config.chunkSize)
            config.chunkSize = Papa.RemoteChunkSize;
        ChunkStreamer.call(this, config);
        var xhr;
        if (IS_WORKER) {
            this._nextChunk = function () {
                this._readChunk();
                this._chunkLoaded();
            };
        }
        else {
            this._nextChunk = function () {
                this._readChunk();
            };
        }
        this.stream = function (url) {
            this._input = url;
            this._nextChunk();
        };
        this._readChunk = function () {
            if (this._finished) {
                this._chunkLoaded();
                return;
            }
            xhr = new XMLHttpRequest();
            if (!IS_WORKER) {
                xhr.onload = bindFunction(this._chunkLoaded, this);
                xhr.onerror = bindFunction(this._chunkError, this);
            }
            xhr.open("GET", this._input, !IS_WORKER);
            if (this._config.step || this._config.chunk) {
                var end = this._start + this._config.chunkSize - 1;
                xhr.setRequestHeader("Range", "bytes=" + this._start + "-" + end);
                xhr.setRequestHeader("If-None-Match", "webkit-no-cache");
            }
            try {
                xhr.send();
            }
            catch (err) {
                this._chunkError(err.message);
            }
            if (IS_WORKER && xhr.status == 0)
                this._chunkError();
            else
                this._start += this._config.chunkSize;
        };
        this._chunkLoaded = function () {
            if (xhr.readyState != 4)
                return;
            if (xhr.status < 200 || xhr.status >= 400) {
                this._chunkError();
                return;
            }
            this._finished = (!this._config.step && !this._config.chunk) || this._start > getFileSize(xhr);
            this.parseChunk(xhr.responseText);
        };
        this._chunkError = function (errorMessage) {
            var errorText = xhr.statusText || errorMessage;
            this._sendError(errorText);
        };
        function getFileSize(xhr) {
            var contentRange = xhr.getResponseHeader("Content-Range");
            return parseInt(contentRange.substr(contentRange.lastIndexOf("/") + 1));
        }
    }
    NetworkStreamer.prototype = Object.create(ChunkStreamer.prototype);
    NetworkStreamer.prototype.constructor = NetworkStreamer;
    function FileStreamer(config) {
        config = config || {};
        if (!config.chunkSize)
            config.chunkSize = Papa.LocalChunkSize;
        ChunkStreamer.call(this, config);
        var reader, slice;
        var usingAsyncReader = typeof FileReader !== 'undefined';
        this.stream = function (file) {
            this._input = file;
            slice = file.slice || file.webkitSlice || file.mozSlice;
            if (usingAsyncReader) {
                reader = new FileReader();
                reader.onload = bindFunction(this._chunkLoaded, this);
                reader.onerror = bindFunction(this._chunkError, this);
            }
            else
                reader = new FileReaderSync();
            this._nextChunk();
        };
        this._nextChunk = function () {
            if (!this._finished && (!this._config.preview || this._rowCount < this._config.preview))
                this._readChunk();
        };
        this._readChunk = function () {
            var end = Math.min(this._start + this._config.chunkSize, this._input.size);
            var txt = reader.readAsText(slice.call(this._input, this._start, end), this._config.encoding);
            if (!usingAsyncReader)
                this._chunkLoaded({ target: { result: txt } });
        };
        this._chunkLoaded = function (event) {
            this._start += this._config.chunkSize;
            this._finished = this._start >= this._input.size;
            this.parseChunk(event.target.result);
        };
        this._chunkError = function () {
            this._sendError(reader.error);
        };
    }
    FileStreamer.prototype = Object.create(ChunkStreamer.prototype);
    FileStreamer.prototype.constructor = FileStreamer;
    function StringStreamer(config) {
        config = config || {};
        ChunkStreamer.call(this, config);
        var string;
        var remaining;
        this.stream = function (s) {
            string = s;
            remaining = s;
            return this._nextChunk();
        };
        this._nextChunk = function () {
            if (this._finished)
                return;
            var size = this._config.chunkSize;
            var chunk = size ? remaining.substr(0, size) : remaining;
            remaining = size ? remaining.substr(size) : '';
            this._finished = !remaining;
            return this.parseChunk(chunk);
        };
    }
    StringStreamer.prototype = Object.create(StringStreamer.prototype);
    StringStreamer.prototype.constructor = StringStreamer;
    function ParserHandle(_config) {
        var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
        var self = this;
        var _stepCounter = 0;
        var _input;
        var _parser;
        var _paused = false;
        var _delimiterError;
        var _fields = [];
        var _results = {
            data: [],
            errors: [],
            meta: {}
        };
        if (isFunction(_config.step)) {
            var userStep = _config.step;
            _config.step = function (results) {
                _results = results;
                if (needsHeaderRow())
                    processResults();
                else {
                    processResults();
                    if (_results.data.length == 0)
                        return;
                    _stepCounter += results.data.length;
                    if (_config.preview && _stepCounter > _config.preview)
                        _parser.abort();
                    else
                        userStep(_results, self);
                }
            };
        }
        this.parse = function (input, baseIndex, ignoreLastRow) {
            if (!_config.newline)
                _config.newline = guessLineEndings(input);
            _delimiterError = false;
            if (!_config.delimiter) {
                var delimGuess = guessDelimiter(input);
                if (delimGuess.successful)
                    _config.delimiter = delimGuess.bestDelimiter;
                else {
                    _delimiterError = true;
                    _config.delimiter = Papa.DefaultDelimiter;
                }
                _results.meta.delimiter = _config.delimiter;
            }
            var parserConfig = copy(_config);
            if (_config.preview && _config.header)
                parserConfig.preview++;
            _input = input;
            _parser = new Parser(parserConfig);
            _results = _parser.parse(_input, baseIndex, ignoreLastRow);
            processResults();
            return _paused ? { meta: { paused: true } } : (_results || { meta: { paused: false } });
        };
        this.paused = function () {
            return _paused;
        };
        this.pause = function () {
            _paused = true;
            _parser.abort();
            _input = _input.substr(_parser.getCharIndex());
        };
        this.resume = function () {
            _paused = false;
            self.streamer.parseChunk(_input);
        };
        this.abort = function () {
            _parser.abort();
            if (isFunction(_config.complete))
                _config.complete(_results);
            _input = "";
        };
        function processResults() {
            if (_results && _delimiterError) {
                addError("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + Papa.DefaultDelimiter + "'");
                _delimiterError = false;
            }
            if (_config.skipEmptyLines) {
                for (var i = 0; i < _results.data.length; i++)
                    if (_results.data[i].length == 1 && _results.data[i][0] == "")
                        _results.data.splice(i--, 1);
            }
            if (needsHeaderRow())
                fillHeaderFields();
            return applyHeaderAndDynamicTyping();
        }
        function needsHeaderRow() {
            return _config.header && _fields.length == 0;
        }
        function fillHeaderFields() {
            if (!_results)
                return;
            for (var i = 0; needsHeaderRow() && i < _results.data.length; i++)
                for (var j = 0; j < _results.data[i].length; j++)
                    _fields.push(_results.data[i][j]);
            _results.data.splice(0, 1);
        }
        function applyHeaderAndDynamicTyping() {
            if (!_results || (!_config.header && !_config.dynamicTyping))
                return _results;
            for (var i = 0; i < _results.data.length; i++) {
                var row = {};
                for (var j = 0; j < _results.data[i].length; j++) {
                    if (_config.dynamicTyping) {
                        var value = _results.data[i][j];
                        if (value == "true")
                            _results.data[i][j] = true;
                        else if (value == "false")
                            _results.data[i][j] = false;
                        else
                            _results.data[i][j] = tryParseFloat(value);
                    }
                    if (_config.header) {
                        if (j >= _fields.length) {
                            if (!row["__parsed_extra"])
                                row["__parsed_extra"] = [];
                            row["__parsed_extra"].push(_results.data[i][j]);
                        }
                        else
                            row[_fields[j]] = _results.data[i][j];
                    }
                }
                if (_config.header) {
                    _results.data[i] = row;
                    if (j > _fields.length)
                        addError("FieldMismatch", "TooManyFields", "Too many fields: expected " + _fields.length + " fields but parsed " + j, i);
                    else if (j < _fields.length)
                        addError("FieldMismatch", "TooFewFields", "Too few fields: expected " + _fields.length + " fields but parsed " + j, i);
                }
            }
            if (_config.header && _results.meta)
                _results.meta.fields = _fields;
            return _results;
        }
        function guessDelimiter(input) {
            var delimChoices = [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP];
            var bestDelim, bestDelta, fieldCountPrevRow;
            for (var i = 0; i < delimChoices.length; i++) {
                var delim = delimChoices[i];
                var delta = 0, avgFieldCount = 0;
                fieldCountPrevRow = undefined;
                var preview = new Parser({
                    delimiter: delim,
                    preview: 10
                }).parse(input);
                for (var j = 0; j < preview.data.length; j++) {
                    var fieldCount = preview.data[j].length;
                    avgFieldCount += fieldCount;
                    if (typeof fieldCountPrevRow === 'undefined') {
                        fieldCountPrevRow = fieldCount;
                        continue;
                    }
                    else if (fieldCount > 1) {
                        delta += Math.abs(fieldCount - fieldCountPrevRow);
                        fieldCountPrevRow = fieldCount;
                    }
                }
                avgFieldCount /= preview.data.length;
                if ((typeof bestDelta === 'undefined' || delta < bestDelta)
                    && avgFieldCount > 1.99) {
                    bestDelta = delta;
                    bestDelim = delim;
                }
            }
            _config.delimiter = bestDelim;
            return {
                successful: !!bestDelim,
                bestDelimiter: bestDelim
            };
        }
        function guessLineEndings(input) {
            input = input.substr(0, 1024 * 1024);
            var r = input.split('\r');
            if (r.length == 1)
                return '\n';
            var numWithN = 0;
            for (var i = 0; i < r.length; i++) {
                if (r[i][0] == '\n')
                    numWithN++;
            }
            return numWithN >= r.length / 2 ? '\r\n' : '\r';
        }
        function tryParseFloat(val) {
            var isNumber = FLOAT.test(val);
            return isNumber ? parseFloat(val) : val;
        }
        function addError(type, code, msg, row) {
            _results.errors.push({
                type: type,
                code: code,
                message: msg,
                row: row
            });
        }
    }
    function Parser(config) {
        config = config || {};
        var delim = config.delimiter;
        var newline = config.newline;
        var comments = config.comments;
        var step = config.step;
        var preview = config.preview;
        var fastMode = config.fastMode;
        if (typeof delim !== 'string'
            || delim.length != 1
            || Papa.BAD_DELIMITERS.indexOf(delim) > -1)
            delim = ",";
        if (comments === delim)
            throw "Comment character same as delimiter";
        else if (comments === true)
            comments = "#";
        else if (typeof comments !== 'string'
            || Papa.BAD_DELIMITERS.indexOf(comments) > -1)
            comments = false;
        if (newline != '\n' && newline != '\r' && newline != '\r\n')
            newline = '\n';
        var cursor = 0;
        var aborted = false;
        this.parse = function (input, baseIndex, ignoreLastRow) {
            if (typeof input !== 'string')
                throw "Input must be a string";
            var inputLen = input.length, delimLen = delim.length, newlineLen = newline.length, commentsLen = comments.length;
            var stepIsFunction = typeof step === 'function';
            cursor = 0;
            var data = [], errors = [], row = [], lastCursor = 0;
            if (!input)
                return returnable();
            if (fastMode || (fastMode !== false && input.indexOf('"') === -1)) {
                var rows = input.split(newline);
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    cursor += row.length;
                    if (i !== rows.length - 1)
                        cursor += newline.length;
                    else if (ignoreLastRow)
                        return returnable();
                    if (comments && row.substr(0, commentsLen) == comments)
                        continue;
                    if (stepIsFunction) {
                        data = [];
                        pushRow(row.split(delim));
                        doStep();
                        if (aborted)
                            return returnable();
                    }
                    else
                        pushRow(row.split(delim));
                    if (preview && i >= preview) {
                        data = data.slice(0, preview);
                        return returnable(true);
                    }
                }
                return returnable();
            }
            var nextDelim = input.indexOf(delim, cursor);
            var nextNewline = input.indexOf(newline, cursor);
            for (;;) {
                if (input[cursor] == '"') {
                    var quoteSearch = cursor;
                    cursor++;
                    for (;;) {
                        var quoteSearch = input.indexOf('"', quoteSearch + 1);
                        if (quoteSearch === -1) {
                            if (!ignoreLastRow) {
                                errors.push({
                                    type: "Quotes",
                                    code: "MissingQuotes",
                                    message: "Quoted field unterminated",
                                    row: data.length,
                                    index: cursor
                                });
                            }
                            return finish();
                        }
                        if (quoteSearch === inputLen - 1) {
                            var value = input.substring(cursor, quoteSearch).replace(/""/g, '"');
                            return finish(value);
                        }
                        if (input[quoteSearch + 1] == '"') {
                            quoteSearch++;
                            continue;
                        }
                        if (input[quoteSearch + 1] == delim) {
                            row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
                            cursor = quoteSearch + 1 + delimLen;
                            nextDelim = input.indexOf(delim, cursor);
                            nextNewline = input.indexOf(newline, cursor);
                            break;
                        }
                        if (input.substr(quoteSearch + 1, newlineLen) === newline) {
                            row.push(input.substring(cursor, quoteSearch).replace(/""/g, '"'));
                            saveRow(quoteSearch + 1 + newlineLen);
                            nextDelim = input.indexOf(delim, cursor);
                            if (stepIsFunction) {
                                doStep();
                                if (aborted)
                                    return returnable();
                            }
                            if (preview && data.length >= preview)
                                return returnable(true);
                            break;
                        }
                    }
                    continue;
                }
                if (comments && row.length === 0 && input.substr(cursor, commentsLen) === comments) {
                    if (nextNewline == -1)
                        return returnable();
                    cursor = nextNewline + newlineLen;
                    nextNewline = input.indexOf(newline, cursor);
                    nextDelim = input.indexOf(delim, cursor);
                    continue;
                }
                if (nextDelim !== -1 && (nextDelim < nextNewline || nextNewline === -1)) {
                    row.push(input.substring(cursor, nextDelim));
                    cursor = nextDelim + delimLen;
                    nextDelim = input.indexOf(delim, cursor);
                    continue;
                }
                if (nextNewline !== -1) {
                    row.push(input.substring(cursor, nextNewline));
                    saveRow(nextNewline + newlineLen);
                    if (stepIsFunction) {
                        doStep();
                        if (aborted)
                            return returnable();
                    }
                    if (preview && data.length >= preview)
                        return returnable(true);
                    continue;
                }
                break;
            }
            return finish();
            function pushRow(row) {
                data.push(row);
                lastCursor = cursor;
            }
            function finish(value) {
                if (ignoreLastRow)
                    return returnable();
                if (!value)
                    value = input.substr(cursor);
                row.push(value);
                cursor = inputLen;
                pushRow(row);
                if (stepIsFunction)
                    doStep();
                return returnable();
            }
            function saveRow(newCursor) {
                cursor = newCursor;
                pushRow(row);
                row = [];
                nextNewline = input.indexOf(newline, cursor);
            }
            function returnable(stopped) {
                return {
                    data: data,
                    errors: errors,
                    meta: {
                        delimiter: delim,
                        linebreak: newline,
                        aborted: aborted,
                        truncated: !!stopped,
                        cursor: lastCursor + (baseIndex || 0)
                    }
                };
            }
            function doStep() {
                step(returnable());
                data = [], errors = [];
            }
        };
        this.abort = function () {
            aborted = true;
        };
        this.getCharIndex = function () {
            return cursor;
        };
    }
    function getScriptPath() {
        var scripts = document.getElementsByTagName('script');
        return scripts.length ? scripts[scripts.length - 1].src : '';
    }
    function newWorker() {
        if (!Papa.WORKERS_SUPPORTED)
            return false;
        if (!LOADED_SYNC && Papa.SCRIPT_PATH === null)
            throw new Error('Script path cannot be determined automatically when Papa Parse is loaded asynchronously. ' +
                'You need to set Papa.SCRIPT_PATH manually.');
        var w = new global.Worker(Papa.SCRIPT_PATH || AUTO_SCRIPT_PATH);
        w.onmessage = mainThreadReceivedMessage;
        w.id = workerIdCounter++;
        workers[w.id] = w;
        return w;
    }
    function mainThreadReceivedMessage(e) {
        var msg = e.data;
        var worker = workers[msg.workerId];
        var aborted = false;
        if (msg.error)
            worker.userError(msg.error, msg.file);
        else if (msg.results && msg.results.data) {
            var abort = function () {
                aborted = true;
                completeWorker(msg.workerId, { data: [], errors: [], meta: { aborted: true } });
            };
            var handle = {
                abort: abort,
                pause: notImplemented,
                resume: notImplemented
            };
            if (isFunction(worker.userStep)) {
                for (var i = 0; i < msg.results.data.length; i++) {
                    worker.userStep({
                        data: [msg.results.data[i]],
                        errors: msg.results.errors,
                        meta: msg.results.meta
                    }, handle);
                    if (aborted)
                        break;
                }
                delete msg.results;
            }
            else if (isFunction(worker.userChunk)) {
                worker.userChunk(msg.results, handle, msg.file);
                delete msg.results;
            }
        }
        if (msg.finished && !aborted)
            completeWorker(msg.workerId, msg.results);
    }
    function completeWorker(workerId, results) {
        var worker = workers[workerId];
        if (isFunction(worker.userComplete))
            worker.userComplete(results);
        worker.terminate();
        delete workers[workerId];
    }
    function notImplemented() {
        throw "Not implemented.";
    }
    function workerThreadReceivedMessage(e) {
        var msg = e.data;
        if (typeof Papa.WORKER_ID === 'undefined' && msg)
            Papa.WORKER_ID = msg.workerId;
        if (typeof msg.input === 'string') {
            global.postMessage({
                workerId: Papa.WORKER_ID,
                results: Papa.parse(msg.input, msg.config),
                finished: true
            });
        }
        else if ((global.File && msg.input instanceof File) || msg.input instanceof Object) {
            var results = Papa.parse(msg.input, msg.config);
            if (results)
                global.postMessage({
                    workerId: Papa.WORKER_ID,
                    results: results,
                    finished: true
                });
        }
    }
    function copy(obj) {
        if (typeof obj !== 'object')
            return obj;
        var cpy = obj instanceof Array ? [] : {};
        for (var key in obj)
            cpy[key] = copy(obj[key]);
        return cpy;
    }
    function bindFunction(f, self) {
        return function () {
            f.apply(self, arguments);
        };
    }
    function isFunction(func) {
        return typeof func === 'function';
    }
})(this);
(function (exports) {
    (function (exports) {
        var science = exports.science = { version: "1.9.1" };
        science.ascending = function (a, b) {
            return a - b;
        };
        science.EULER = .5772156649015329;
        science.expm1 = function (x) {
            return (x < 1e-5 && x > -1e-5) ? x + .5 * x * x : Math.exp(x) - 1;
        };
        science.functor = function (v) {
            return typeof v === "function" ? v : function () { return v; };
        };
        science.hypot = function (x, y) {
            x = Math.abs(x);
            y = Math.abs(y);
            var max, min;
            if (x > y) {
                max = x;
                min = y;
            }
            else {
                max = y;
                min = x;
            }
            var r = min / max;
            return max * Math.sqrt(1 + r * r);
        };
        science.quadratic = function () {
            var complex = false;
            function quadratic(a, b, c) {
                var d = b * b - 4 * a * c;
                if (d > 0) {
                    d = Math.sqrt(d) / (2 * a);
                    return complex
                        ? [{ r: -b - d, i: 0 }, { r: -b + d, i: 0 }]
                        : [-b - d, -b + d];
                }
                else if (d === 0) {
                    d = -b / (2 * a);
                    return complex ? [{ r: d, i: 0 }] : [d];
                }
                else {
                    if (complex) {
                        d = Math.sqrt(-d) / (2 * a);
                        return [
                            { r: -b, i: -d },
                            { r: -b, i: d }
                        ];
                    }
                    return [];
                }
            }
            quadratic.complex = function (x) {
                if (!arguments.length)
                    return complex;
                complex = x;
                return quadratic;
            };
            return quadratic;
        };
        science.zeroes = function (n) {
            var i = -1, a = [];
            if (arguments.length === 1)
                while (++i < n)
                    a[i] = 0;
            else
                while (++i < n)
                    a[i] = science.zeroes.apply(this, Array.prototype.slice.call(arguments, 1));
            return a;
        };
    })(this);
    (function (exports) {
        science.lin = {};
        science.lin.decompose = function () {
            function decompose(A) {
                var n = A.length, V = [], d = [], e = [];
                for (var i = 0; i < n; i++) {
                    V[i] = [];
                    d[i] = [];
                    e[i] = [];
                }
                var symmetric = true;
                for (var j = 0; j < n; j++) {
                    for (var i = 0; i < n; i++) {
                        if (A[i][j] !== A[j][i]) {
                            symmetric = false;
                            break;
                        }
                    }
                }
                if (symmetric) {
                    for (var i = 0; i < n; i++)
                        V[i] = A[i].slice();
                    science_lin_decomposeTred2(d, e, V);
                    science_lin_decomposeTql2(d, e, V);
                }
                else {
                    var H = [];
                    for (var i = 0; i < n; i++)
                        H[i] = A[i].slice();
                    science_lin_decomposeOrthes(H, V);
                    science_lin_decomposeHqr2(d, e, H, V);
                }
                var D = [];
                for (var i = 0; i < n; i++) {
                    var row = D[i] = [];
                    for (var j = 0; j < n; j++)
                        row[j] = i === j ? d[i] : 0;
                    D[i][e[i] > 0 ? i + 1 : i - 1] = e[i];
                }
                return { D: D, V: V };
            }
            return decompose;
        };
        function science_lin_decomposeTred2(d, e, V) {
            var n = V.length;
            for (var j = 0; j < n; j++)
                d[j] = V[n - 1][j];
            for (var i = n - 1; i > 0; i--) {
                var scale = 0, h = 0;
                for (var k = 0; k < i; k++)
                    scale += Math.abs(d[k]);
                if (scale === 0) {
                    e[i] = d[i - 1];
                    for (var j = 0; j < i; j++) {
                        d[j] = V[i - 1][j];
                        V[i][j] = 0;
                        V[j][i] = 0;
                    }
                }
                else {
                    for (var k = 0; k < i; k++) {
                        d[k] /= scale;
                        h += d[k] * d[k];
                    }
                    var f = d[i - 1];
                    var g = Math.sqrt(h);
                    if (f > 0)
                        g = -g;
                    e[i] = scale * g;
                    h = h - f * g;
                    d[i - 1] = f - g;
                    for (var j = 0; j < i; j++)
                        e[j] = 0;
                    for (var j = 0; j < i; j++) {
                        f = d[j];
                        V[j][i] = f;
                        g = e[j] + V[j][j] * f;
                        for (var k = j + 1; k <= i - 1; k++) {
                            g += V[k][j] * d[k];
                            e[k] += V[k][j] * f;
                        }
                        e[j] = g;
                    }
                    f = 0;
                    for (var j = 0; j < i; j++) {
                        e[j] /= h;
                        f += e[j] * d[j];
                    }
                    var hh = f / (h + h);
                    for (var j = 0; j < i; j++)
                        e[j] -= hh * d[j];
                    for (var j = 0; j < i; j++) {
                        f = d[j];
                        g = e[j];
                        for (var k = j; k <= i - 1; k++)
                            V[k][j] -= (f * e[k] + g * d[k]);
                        d[j] = V[i - 1][j];
                        V[i][j] = 0;
                    }
                }
                d[i] = h;
            }
            for (var i = 0; i < n - 1; i++) {
                V[n - 1][i] = V[i][i];
                V[i][i] = 1.0;
                var h = d[i + 1];
                if (h != 0) {
                    for (var k = 0; k <= i; k++)
                        d[k] = V[k][i + 1] / h;
                    for (var j = 0; j <= i; j++) {
                        var g = 0;
                        for (var k = 0; k <= i; k++)
                            g += V[k][i + 1] * V[k][j];
                        for (var k = 0; k <= i; k++)
                            V[k][j] -= g * d[k];
                    }
                }
                for (var k = 0; k <= i; k++)
                    V[k][i + 1] = 0;
            }
            for (var j = 0; j < n; j++) {
                d[j] = V[n - 1][j];
                V[n - 1][j] = 0;
            }
            V[n - 1][n - 1] = 1;
            e[0] = 0;
        }
        function science_lin_decomposeTql2(d, e, V) {
            var n = V.length;
            for (var i = 1; i < n; i++)
                e[i - 1] = e[i];
            e[n - 1] = 0;
            var f = 0;
            var tst1 = 0;
            var eps = 1e-12;
            for (var l = 0; l < n; l++) {
                tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
                var m = l;
                while (m < n) {
                    if (Math.abs(e[m]) <= eps * tst1) {
                        break;
                    }
                    m++;
                }
                if (m > l) {
                    var iter = 0;
                    do {
                        iter++;
                        var g = d[l];
                        var p = (d[l + 1] - g) / (2 * e[l]);
                        var r = science.hypot(p, 1);
                        if (p < 0)
                            r = -r;
                        d[l] = e[l] / (p + r);
                        d[l + 1] = e[l] * (p + r);
                        var dl1 = d[l + 1];
                        var h = g - d[l];
                        for (var i = l + 2; i < n; i++)
                            d[i] -= h;
                        f += h;
                        p = d[m];
                        var c = 1;
                        var c2 = c;
                        var c3 = c;
                        var el1 = e[l + 1];
                        var s = 0;
                        var s2 = 0;
                        for (var i = m - 1; i >= l; i--) {
                            c3 = c2;
                            c2 = c;
                            s2 = s;
                            g = c * e[i];
                            h = c * p;
                            r = science.hypot(p, e[i]);
                            e[i + 1] = s * r;
                            s = e[i] / r;
                            c = p / r;
                            p = c * d[i] - s * g;
                            d[i + 1] = h + s * (c * g + s * d[i]);
                            for (var k = 0; k < n; k++) {
                                h = V[k][i + 1];
                                V[k][i + 1] = s * V[k][i] + c * h;
                                V[k][i] = c * V[k][i] - s * h;
                            }
                        }
                        p = -s * s2 * c3 * el1 * e[l] / dl1;
                        e[l] = s * p;
                        d[l] = c * p;
                    } while (Math.abs(e[l]) > eps * tst1);
                }
                d[l] = d[l] + f;
                e[l] = 0;
            }
            for (var i = 0; i < n - 1; i++) {
                var k = i;
                var p = d[i];
                for (var j = i + 1; j < n; j++) {
                    if (d[j] < p) {
                        k = j;
                        p = d[j];
                    }
                }
                if (k != i) {
                    d[k] = d[i];
                    d[i] = p;
                    for (var j = 0; j < n; j++) {
                        p = V[j][i];
                        V[j][i] = V[j][k];
                        V[j][k] = p;
                    }
                }
            }
        }
        function science_lin_decomposeOrthes(H, V) {
            var n = H.length;
            var ort = [];
            var low = 0;
            var high = n - 1;
            for (var m = low + 1; m < high; m++) {
                var scale = 0;
                for (var i = m; i <= high; i++)
                    scale += Math.abs(H[i][m - 1]);
                if (scale !== 0) {
                    var h = 0;
                    for (var i = high; i >= m; i--) {
                        ort[i] = H[i][m - 1] / scale;
                        h += ort[i] * ort[i];
                    }
                    var g = Math.sqrt(h);
                    if (ort[m] > 0)
                        g = -g;
                    h = h - ort[m] * g;
                    ort[m] = ort[m] - g;
                    for (var j = m; j < n; j++) {
                        var f = 0;
                        for (var i = high; i >= m; i--)
                            f += ort[i] * H[i][j];
                        f /= h;
                        for (var i = m; i <= high; i++)
                            H[i][j] -= f * ort[i];
                    }
                    for (var i = 0; i <= high; i++) {
                        var f = 0;
                        for (var j = high; j >= m; j--)
                            f += ort[j] * H[i][j];
                        f /= h;
                        for (var j = m; j <= high; j++)
                            H[i][j] -= f * ort[j];
                    }
                    ort[m] = scale * ort[m];
                    H[m][m - 1] = scale * g;
                }
            }
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++)
                    V[i][j] = i === j ? 1 : 0;
            }
            for (var m = high - 1; m >= low + 1; m--) {
                if (H[m][m - 1] !== 0) {
                    for (var i = m + 1; i <= high; i++)
                        ort[i] = H[i][m - 1];
                    for (var j = m; j <= high; j++) {
                        var g = 0;
                        for (var i = m; i <= high; i++)
                            g += ort[i] * V[i][j];
                        g = (g / ort[m]) / H[m][m - 1];
                        for (var i = m; i <= high; i++)
                            V[i][j] += g * ort[i];
                    }
                }
            }
        }
        function science_lin_decomposeHqr2(d, e, H, V) {
            var nn = H.length, n = nn - 1, low = 0, high = nn - 1, eps = 1e-12, exshift = 0, p = 0, q = 0, r = 0, s = 0, z = 0, t, w, x, y;
            var norm = 0;
            for (var i = 0; i < nn; i++) {
                if (i < low || i > high) {
                    d[i] = H[i][i];
                    e[i] = 0;
                }
                for (var j = Math.max(i - 1, 0); j < nn; j++)
                    norm += Math.abs(H[i][j]);
            }
            var iter = 0;
            while (n >= low) {
                var l = n;
                while (l > low) {
                    s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
                    if (s === 0)
                        s = norm;
                    if (Math.abs(H[l][l - 1]) < eps * s)
                        break;
                    l--;
                }
                if (l === n) {
                    H[n][n] = H[n][n] + exshift;
                    d[n] = H[n][n];
                    e[n] = 0;
                    n--;
                    iter = 0;
                }
                else if (l === n - 1) {
                    w = H[n][n - 1] * H[n - 1][n];
                    p = (H[n - 1][n - 1] - H[n][n]) / 2;
                    q = p * p + w;
                    z = Math.sqrt(Math.abs(q));
                    H[n][n] = H[n][n] + exshift;
                    H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
                    x = H[n][n];
                    if (q >= 0) {
                        z = p + (p >= 0 ? z : -z);
                        d[n - 1] = x + z;
                        d[n] = d[n - 1];
                        if (z !== 0)
                            d[n] = x - w / z;
                        e[n - 1] = 0;
                        e[n] = 0;
                        x = H[n][n - 1];
                        s = Math.abs(x) + Math.abs(z);
                        p = x / s;
                        q = z / s;
                        r = Math.sqrt(p * p + q * q);
                        p /= r;
                        q /= r;
                        for (var j = n - 1; j < nn; j++) {
                            z = H[n - 1][j];
                            H[n - 1][j] = q * z + p * H[n][j];
                            H[n][j] = q * H[n][j] - p * z;
                        }
                        for (var i = 0; i <= n; i++) {
                            z = H[i][n - 1];
                            H[i][n - 1] = q * z + p * H[i][n];
                            H[i][n] = q * H[i][n] - p * z;
                        }
                        for (var i = low; i <= high; i++) {
                            z = V[i][n - 1];
                            V[i][n - 1] = q * z + p * V[i][n];
                            V[i][n] = q * V[i][n] - p * z;
                        }
                    }
                    else {
                        d[n - 1] = x + p;
                        d[n] = x + p;
                        e[n - 1] = z;
                        e[n] = -z;
                    }
                    n = n - 2;
                    iter = 0;
                }
                else {
                    x = H[n][n];
                    y = 0;
                    w = 0;
                    if (l < n) {
                        y = H[n - 1][n - 1];
                        w = H[n][n - 1] * H[n - 1][n];
                    }
                    if (iter == 10) {
                        exshift += x;
                        for (var i = low; i <= n; i++) {
                            H[i][i] -= x;
                        }
                        s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
                        x = y = 0.75 * s;
                        w = -0.4375 * s * s;
                    }
                    if (iter == 30) {
                        s = (y - x) / 2.0;
                        s = s * s + w;
                        if (s > 0) {
                            s = Math.sqrt(s);
                            if (y < x) {
                                s = -s;
                            }
                            s = x - w / ((y - x) / 2.0 + s);
                            for (var i = low; i <= n; i++) {
                                H[i][i] -= s;
                            }
                            exshift += s;
                            x = y = w = 0.964;
                        }
                    }
                    iter++;
                    var m = n - 2;
                    while (m >= l) {
                        z = H[m][m];
                        r = x - z;
                        s = y - z;
                        p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
                        q = H[m + 1][m + 1] - z - r - s;
                        r = H[m + 2][m + 1];
                        s = Math.abs(p) + Math.abs(q) + Math.abs(r);
                        p = p / s;
                        q = q / s;
                        r = r / s;
                        if (m == l)
                            break;
                        if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) <
                            eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) +
                                Math.abs(H[m + 1][m + 1])))) {
                            break;
                        }
                        m--;
                    }
                    for (var i = m + 2; i <= n; i++) {
                        H[i][i - 2] = 0;
                        if (i > m + 2)
                            H[i][i - 3] = 0;
                    }
                    for (var k = m; k <= n - 1; k++) {
                        var notlast = (k != n - 1);
                        if (k != m) {
                            p = H[k][k - 1];
                            q = H[k + 1][k - 1];
                            r = (notlast ? H[k + 2][k - 1] : 0);
                            x = Math.abs(p) + Math.abs(q) + Math.abs(r);
                            if (x != 0) {
                                p /= x;
                                q /= x;
                                r /= x;
                            }
                        }
                        if (x == 0)
                            break;
                        s = Math.sqrt(p * p + q * q + r * r);
                        if (p < 0) {
                            s = -s;
                        }
                        if (s != 0) {
                            if (k != m)
                                H[k][k - 1] = -s * x;
                            else if (l != m)
                                H[k][k - 1] = -H[k][k - 1];
                            p += s;
                            x = p / s;
                            y = q / s;
                            z = r / s;
                            q /= p;
                            r /= p;
                            for (var j = k; j < nn; j++) {
                                p = H[k][j] + q * H[k + 1][j];
                                if (notlast) {
                                    p = p + r * H[k + 2][j];
                                    H[k + 2][j] = H[k + 2][j] - p * z;
                                }
                                H[k][j] = H[k][j] - p * x;
                                H[k + 1][j] = H[k + 1][j] - p * y;
                            }
                            for (var i = 0; i <= Math.min(n, k + 3); i++) {
                                p = x * H[i][k] + y * H[i][k + 1];
                                if (notlast) {
                                    p += z * H[i][k + 2];
                                    H[i][k + 2] = H[i][k + 2] - p * r;
                                }
                                H[i][k] = H[i][k] - p;
                                H[i][k + 1] = H[i][k + 1] - p * q;
                            }
                            for (var i = low; i <= high; i++) {
                                p = x * V[i][k] + y * V[i][k + 1];
                                if (notlast) {
                                    p = p + z * V[i][k + 2];
                                    V[i][k + 2] = V[i][k + 2] - p * r;
                                }
                                V[i][k] = V[i][k] - p;
                                V[i][k + 1] = V[i][k + 1] - p * q;
                            }
                        }
                    }
                }
            }
            if (norm == 0) {
                return;
            }
            for (n = nn - 1; n >= 0; n--) {
                p = d[n];
                q = e[n];
                if (q == 0) {
                    var l = n;
                    H[n][n] = 1.0;
                    for (var i = n - 1; i >= 0; i--) {
                        w = H[i][i] - p;
                        r = 0;
                        for (var j = l; j <= n; j++) {
                            r = r + H[i][j] * H[j][n];
                        }
                        if (e[i] < 0) {
                            z = w;
                            s = r;
                        }
                        else {
                            l = i;
                            if (e[i] === 0) {
                                H[i][n] = -r / (w !== 0 ? w : eps * norm);
                            }
                            else {
                                x = H[i][i + 1];
                                y = H[i + 1][i];
                                q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
                                t = (x * s - z * r) / q;
                                H[i][n] = t;
                                if (Math.abs(x) > Math.abs(z)) {
                                    H[i + 1][n] = (-r - w * t) / x;
                                }
                                else {
                                    H[i + 1][n] = (-s - y * t) / z;
                                }
                            }
                            t = Math.abs(H[i][n]);
                            if ((eps * t) * t > 1) {
                                for (var j = i; j <= n; j++)
                                    H[j][n] = H[j][n] / t;
                            }
                        }
                    }
                }
                else if (q < 0) {
                    var l = n - 1;
                    if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
                        H[n - 1][n - 1] = q / H[n][n - 1];
                        H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
                    }
                    else {
                        var zz = science_lin_decomposeCdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
                        H[n - 1][n - 1] = zz[0];
                        H[n - 1][n] = zz[1];
                    }
                    H[n][n - 1] = 0;
                    H[n][n] = 1;
                    for (var i = n - 2; i >= 0; i--) {
                        var ra = 0, sa = 0, vr, vi;
                        for (var j = l; j <= n; j++) {
                            ra = ra + H[i][j] * H[j][n - 1];
                            sa = sa + H[i][j] * H[j][n];
                        }
                        w = H[i][i] - p;
                        if (e[i] < 0) {
                            z = w;
                            r = ra;
                            s = sa;
                        }
                        else {
                            l = i;
                            if (e[i] == 0) {
                                var zz = science_lin_decomposeCdiv(-ra, -sa, w, q);
                                H[i][n - 1] = zz[0];
                                H[i][n] = zz[1];
                            }
                            else {
                                x = H[i][i + 1];
                                y = H[i + 1][i];
                                vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
                                vi = (d[i] - p) * 2.0 * q;
                                if (vr == 0 & vi == 0) {
                                    vr = eps * norm * (Math.abs(w) + Math.abs(q) +
                                        Math.abs(x) + Math.abs(y) + Math.abs(z));
                                }
                                var zz = science_lin_decomposeCdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
                                H[i][n - 1] = zz[0];
                                H[i][n] = zz[1];
                                if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
                                    H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
                                    H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
                                }
                                else {
                                    var zz = science_lin_decomposeCdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
                                    H[i + 1][n - 1] = zz[0];
                                    H[i + 1][n] = zz[1];
                                }
                            }
                            t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
                            if ((eps * t) * t > 1) {
                                for (var j = i; j <= n; j++) {
                                    H[j][n - 1] = H[j][n - 1] / t;
                                    H[j][n] = H[j][n] / t;
                                }
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < nn; i++) {
                if (i < low || i > high) {
                    for (var j = i; j < nn; j++)
                        V[i][j] = H[i][j];
                }
            }
            for (var j = nn - 1; j >= low; j--) {
                for (var i = low; i <= high; i++) {
                    z = 0;
                    for (var k = low; k <= Math.min(j, high); k++)
                        z += V[i][k] * H[k][j];
                    V[i][j] = z;
                }
            }
        }
        function science_lin_decomposeCdiv(xr, xi, yr, yi) {
            if (Math.abs(yr) > Math.abs(yi)) {
                var r = yi / yr, d = yr + r * yi;
                return [(xr + r * xi) / d, (xi - r * xr) / d];
            }
            else {
                var r = yr / yi, d = yi + r * yr;
                return [(r * xr + xi) / d, (r * xi - xr) / d];
            }
        }
        science.lin.cross = function (a, b) {
            return [
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]
            ];
        };
        science.lin.dot = function (a, b) {
            var s = 0, i = -1, n = Math.min(a.length, b.length);
            while (++i < n)
                s += a[i] * b[i];
            return s;
        };
        science.lin.length = function (p) {
            return Math.sqrt(science.lin.dot(p, p));
        };
        science.lin.normalize = function (p) {
            var length = science.lin.length(p);
            return p.map(function (d) { return d / length; });
        };
        science.lin.determinant = function (matrix) {
            var m = matrix[0].concat(matrix[1]).concat(matrix[2]).concat(matrix[3]);
            return (m[12] * m[9] * m[6] * m[3] - m[8] * m[13] * m[6] * m[3] -
                m[12] * m[5] * m[10] * m[3] + m[4] * m[13] * m[10] * m[3] +
                m[8] * m[5] * m[14] * m[3] - m[4] * m[9] * m[14] * m[3] -
                m[12] * m[9] * m[2] * m[7] + m[8] * m[13] * m[2] * m[7] +
                m[12] * m[1] * m[10] * m[7] - m[0] * m[13] * m[10] * m[7] -
                m[8] * m[1] * m[14] * m[7] + m[0] * m[9] * m[14] * m[7] +
                m[12] * m[5] * m[2] * m[11] - m[4] * m[13] * m[2] * m[11] -
                m[12] * m[1] * m[6] * m[11] + m[0] * m[13] * m[6] * m[11] +
                m[4] * m[1] * m[14] * m[11] - m[0] * m[5] * m[14] * m[11] -
                m[8] * m[5] * m[2] * m[15] + m[4] * m[9] * m[2] * m[15] +
                m[8] * m[1] * m[6] * m[15] - m[0] * m[9] * m[6] * m[15] -
                m[4] * m[1] * m[10] * m[15] + m[0] * m[5] * m[10] * m[15]);
        };
        science.lin.gaussjordan = function (m, eps) {
            if (!eps)
                eps = 1e-10;
            var h = m.length, w = m[0].length, y = -1, y2, x;
            while (++y < h) {
                var maxrow = y;
                y2 = y;
                while (++y2 < h) {
                    if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
                        maxrow = y2;
                }
                var tmp = m[y];
                m[y] = m[maxrow];
                m[maxrow] = tmp;
                if (Math.abs(m[y][y]) <= eps)
                    return false;
                y2 = y;
                while (++y2 < h) {
                    var c = m[y2][y] / m[y][y];
                    x = y - 1;
                    while (++x < w) {
                        m[y2][x] -= m[y][x] * c;
                    }
                }
            }
            y = h;
            while (--y >= 0) {
                var c = m[y][y];
                y2 = -1;
                while (++y2 < y) {
                    x = w;
                    while (--x >= y) {
                        m[y2][x] -= m[y][x] * m[y2][y] / c;
                    }
                }
                m[y][y] /= c;
                x = h - 1;
                while (++x < w) {
                    m[y][x] /= c;
                }
            }
            return true;
        };
        science.lin.inverse = function (m) {
            var n = m.length, i = -1;
            if (n !== m[0].length)
                return;
            m = m.map(function (row, i) {
                var identity = new Array(n), j = -1;
                while (++j < n)
                    identity[j] = i === j ? 1 : 0;
                return row.concat(identity);
            });
            science.lin.gaussjordan(m);
            while (++i < n) {
                m[i] = m[i].slice(n);
            }
            return m;
        };
        science.lin.multiply = function (a, b) {
            var m = a.length, n = b[0].length, p = b.length, i = -1, j, k;
            if (p !== a[0].length)
                throw { "error": "columns(a) != rows(b); " + a[0].length + " != " + p };
            var ab = new Array(m);
            while (++i < m) {
                ab[i] = new Array(n);
                j = -1;
                while (++j < n) {
                    var s = 0;
                    k = -1;
                    while (++k < p)
                        s += a[i][k] * b[k][j];
                    ab[i][j] = s;
                }
            }
            return ab;
        };
        science.lin.transpose = function (a) {
            var m = a.length, n = a[0].length, i = -1, j, b = new Array(n);
            while (++i < n) {
                b[i] = new Array(m);
                j = -1;
                while (++j < m)
                    b[i][j] = a[j][i];
            }
            return b;
        };
        science.lin.tridag = function (a, b, c, d, x, n) {
            var i, m;
            for (i = 1; i < n; i++) {
                m = a[i] / b[i - 1];
                b[i] -= m * c[i - 1];
                d[i] -= m * d[i - 1];
            }
            x[n - 1] = d[n - 1] / b[n - 1];
            for (i = n - 2; i >= 0; i--) {
                x[i] = (d[i] - c[i] * x[i + 1]) / b[i];
            }
        };
    })(this);
    (function (exports) {
        science.stats = {};
        science.stats.bandwidth = {
            nrd0: function (x) {
                var hi = Math.sqrt(science.stats.variance(x));
                if (!(lo = Math.min(hi, science.stats.iqr(x) / 1.34)))
                    (lo = hi) || (lo = Math.abs(x[1])) || (lo = 1);
                return .9 * lo * Math.pow(x.length, -.2);
            },
            nrd: function (x) {
                var h = science.stats.iqr(x) / 1.34;
                return 1.06 * Math.min(Math.sqrt(science.stats.variance(x)), h)
                    * Math.pow(x.length, -1 / 5);
            }
        };
        science.stats.distance = {
            euclidean: function (a, b) {
                var n = a.length, i = -1, s = 0, x;
                while (++i < n) {
                    x = a[i] - b[i];
                    s += x * x;
                }
                return Math.sqrt(s);
            },
            manhattan: function (a, b) {
                var n = a.length, i = -1, s = 0;
                while (++i < n)
                    s += Math.abs(a[i] - b[i]);
                return s;
            },
            minkowski: function (p) {
                return function (a, b) {
                    var n = a.length, i = -1, s = 0;
                    while (++i < n)
                        s += Math.pow(Math.abs(a[i] - b[i]), p);
                    return Math.pow(s, 1 / p);
                };
            },
            chebyshev: function (a, b) {
                var n = a.length, i = -1, max = 0, x;
                while (++i < n) {
                    x = Math.abs(a[i] - b[i]);
                    if (x > max)
                        max = x;
                }
                return max;
            },
            hamming: function (a, b) {
                var n = a.length, i = -1, d = 0;
                while (++i < n)
                    if (a[i] !== b[i])
                        d++;
                return d;
            },
            jaccard: function (a, b) {
                var n = a.length, i = -1, s = 0;
                while (++i < n)
                    if (a[i] === b[i])
                        s++;
                return s / n;
            },
            braycurtis: function (a, b) {
                var n = a.length, i = -1, s0 = 0, s1 = 0, ai, bi;
                while (++i < n) {
                    ai = a[i];
                    bi = b[i];
                    s0 += Math.abs(ai - bi);
                    s1 += Math.abs(ai + bi);
                }
                return s0 / s1;
            }
        };
        science.stats.erf = function (x) {
            var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
            var sign = x < 0 ? -1 : 1;
            if (x < 0) {
                sign = -1;
                x = -x;
            }
            var t = 1 / (1 + p * x);
            return sign * (1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1)
                * t * Math.exp(-x * x));
        };
        science.stats.phi = function (x) {
            return .5 * (1 + science.stats.erf(x / Math.SQRT2));
        };
        science.stats.kernel = {
            uniform: function (u) {
                if (u <= 1 && u >= -1)
                    return .5;
                return 0;
            },
            triangular: function (u) {
                if (u <= 1 && u >= -1)
                    return 1 - Math.abs(u);
                return 0;
            },
            epanechnikov: function (u) {
                if (u <= 1 && u >= -1)
                    return .75 * (1 - u * u);
                return 0;
            },
            quartic: function (u) {
                if (u <= 1 && u >= -1) {
                    var tmp = 1 - u * u;
                    return (15 / 16) * tmp * tmp;
                }
                return 0;
            },
            triweight: function (u) {
                if (u <= 1 && u >= -1) {
                    var tmp = 1 - u * u;
                    return (35 / 32) * tmp * tmp * tmp;
                }
                return 0;
            },
            gaussian: function (u) {
                return 1 / Math.sqrt(2 * Math.PI) * Math.exp(-.5 * u * u);
            },
            cosine: function (u) {
                if (u <= 1 && u >= -1)
                    return Math.PI / 4 * Math.cos(Math.PI / 2 * u);
                return 0;
            }
        };
        science.stats.kde = function () {
            var kernel = science.stats.kernel.gaussian, sample = [], bandwidth = science.stats.bandwidth.nrd;
            function kde(points, i) {
                var bw = bandwidth.call(this, sample);
                return points.map(function (x) {
                    var i = -1, y = 0, n = sample.length;
                    while (++i < n) {
                        y += kernel((x - sample[i]) / bw);
                    }
                    return [x, y / bw / n];
                });
            }
            kde.kernel = function (x) {
                if (!arguments.length)
                    return kernel;
                kernel = x;
                return kde;
            };
            kde.sample = function (x) {
                if (!arguments.length)
                    return sample;
                sample = x;
                return kde;
            };
            kde.bandwidth = function (x) {
                if (!arguments.length)
                    return bandwidth;
                bandwidth = science.functor(x);
                return kde;
            };
            return kde;
        };
        science.stats.kmeans = function () {
            var distance = science.stats.distance.euclidean, maxIterations = 1000, k = 1;
            function kmeans(vectors) {
                var n = vectors.length, assignments = [], clusterSizes = [], repeat = 1, iterations = 0, centroids = science_stats_kmeansRandom(k, vectors), newCentroids, i, j, x, d, min, best;
                while (repeat && iterations < maxIterations) {
                    j = -1;
                    while (++j < k) {
                        clusterSizes[j] = 0;
                    }
                    i = -1;
                    while (++i < n) {
                        x = vectors[i];
                        min = Infinity;
                        j = -1;
                        while (++j < k) {
                            d = distance.call(this, centroids[j], x);
                            if (d < min) {
                                min = d;
                                best = j;
                            }
                        }
                        clusterSizes[assignments[i] = best]++;
                    }
                    newCentroids = [];
                    i = -1;
                    while (++i < n) {
                        x = assignments[i];
                        d = newCentroids[x];
                        if (d == null)
                            newCentroids[x] = vectors[i].slice();
                        else {
                            j = -1;
                            while (++j < d.length) {
                                d[j] += vectors[i][j];
                            }
                        }
                    }
                    j = -1;
                    while (++j < k) {
                        x = newCentroids[j];
                        d = 1 / clusterSizes[j];
                        i = -1;
                        while (++i < x.length)
                            x[i] *= d;
                    }
                    repeat = 0;
                    j = -1;
                    while (++j < k) {
                        if (!science_stats_kmeansCompare(newCentroids[j], centroids[j])) {
                            repeat = 1;
                            break;
                        }
                    }
                    centroids = newCentroids;
                    iterations++;
                }
                return { assignments: assignments, centroids: centroids };
            }
            kmeans.k = function (x) {
                if (!arguments.length)
                    return k;
                k = x;
                return kmeans;
            };
            kmeans.distance = function (x) {
                if (!arguments.length)
                    return distance;
                distance = x;
                return kmeans;
            };
            return kmeans;
        };
        function science_stats_kmeansCompare(a, b) {
            if (!a || !b || a.length !== b.length)
                return false;
            var n = a.length, i = -1;
            while (++i < n)
                if (a[i] !== b[i])
                    return false;
            return true;
        }
        function science_stats_kmeansRandom(k, vectors) {
            var n = vectors.length;
            if (k > n)
                return null;
            var selected_vectors = [];
            var selected_indices = [];
            var tested_indices = {};
            var tested = 0;
            var selected = 0;
            var i, vector, select;
            while (selected < k) {
                if (tested === n)
                    return null;
                var random_index = Math.floor(Math.random() * n);
                if (random_index in tested_indices)
                    continue;
                tested_indices[random_index] = 1;
                tested++;
                vector = vectors[random_index];
                select = true;
                for (i = 0; i < selected; i++) {
                    if (science_stats_kmeansCompare(vector, selected_vectors[i])) {
                        select = false;
                        break;
                    }
                }
                if (select) {
                    selected_vectors[selected] = vector;
                    selected_indices[selected] = random_index;
                    selected++;
                }
            }
            return selected_vectors;
        }
        science.stats.hcluster = function () {
            var distance = science.stats.distance.euclidean, linkage = "simple";
            function hcluster(vectors) {
                var n = vectors.length, dMin = [], cSize = [], distMatrix = [], clusters = [], c1, c2, c1Cluster, c2Cluster, p, root, i, j;
                i = -1;
                while (++i < n) {
                    dMin[i] = 0;
                    distMatrix[i] = [];
                    j = -1;
                    while (++j < n) {
                        distMatrix[i][j] = i === j ? Infinity : distance(vectors[i], vectors[j]);
                        if (distMatrix[i][dMin[i]] > distMatrix[i][j])
                            dMin[i] = j;
                    }
                }
                i = -1;
                while (++i < n) {
                    clusters[i] = [];
                    clusters[i][0] = {
                        left: null,
                        right: null,
                        dist: 0,
                        centroid: vectors[i],
                        size: 1,
                        depth: 0
                    };
                    cSize[i] = 1;
                }
                for (p = 0; p < n - 1; p++) {
                    c1 = 0;
                    for (i = 0; i < n; i++) {
                        if (distMatrix[i][dMin[i]] < distMatrix[c1][dMin[c1]])
                            c1 = i;
                    }
                    c2 = dMin[c1];
                    c1Cluster = clusters[c1][0];
                    c2Cluster = clusters[c2][0];
                    newCluster = {
                        left: c1Cluster,
                        right: c2Cluster,
                        dist: distMatrix[c1][c2],
                        centroid: calculateCentroid(c1Cluster.size, c1Cluster.centroid, c2Cluster.size, c2Cluster.centroid),
                        size: c1Cluster.size + c2Cluster.size,
                        depth: 1 + Math.max(c1Cluster.depth, c2Cluster.depth)
                    };
                    clusters[c1].splice(0, 0, newCluster);
                    cSize[c1] += cSize[c2];
                    for (j = 0; j < n; j++) {
                        switch (linkage) {
                            case "single":
                                if (distMatrix[c1][j] > distMatrix[c2][j])
                                    distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
                                break;
                            case "complete":
                                if (distMatrix[c1][j] < distMatrix[c2][j])
                                    distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
                                break;
                            case "average":
                                distMatrix[j][c1] = distMatrix[c1][j] = (cSize[c1] * distMatrix[c1][j] + cSize[c2] * distMatrix[c2][j]) / (cSize[c1] + cSize[j]);
                                break;
                        }
                    }
                    distMatrix[c1][c1] = Infinity;
                    for (i = 0; i < n; i++)
                        distMatrix[i][c2] = distMatrix[c2][i] = Infinity;
                    for (j = 0; j < n; j++) {
                        if (dMin[j] == c2)
                            dMin[j] = c1;
                        if (distMatrix[c1][j] < distMatrix[c1][dMin[c1]])
                            dMin[c1] = j;
                    }
                    root = newCluster;
                }
                return root;
            }
            hcluster.distance = function (x) {
                if (!arguments.length)
                    return distance;
                distance = x;
                return hcluster;
            };
            return hcluster;
        };
        function calculateCentroid(c1Size, c1Centroid, c2Size, c2Centroid) {
            var newCentroid = [], newSize = c1Size + c2Size, n = c1Centroid.length, i = -1;
            while (++i < n) {
                newCentroid[i] = (c1Size * c1Centroid[i] + c2Size * c2Centroid[i]) / newSize;
            }
            return newCentroid;
        }
        science.stats.iqr = function (x) {
            var quartiles = science.stats.quantiles(x, [.25, .75]);
            return quartiles[1] - quartiles[0];
        };
        science.stats.loess = function () {
            var bandwidth = .3, robustnessIters = 2, accuracy = 1e-12;
            function smooth(xval, yval, weights) {
                var n = xval.length, i;
                if (n !== yval.length)
                    throw { error: "Mismatched array lengths" };
                if (n == 0)
                    throw { error: "At least one point required." };
                if (arguments.length < 3) {
                    weights = [];
                    i = -1;
                    while (++i < n)
                        weights[i] = 1;
                }
                science_stats_loessFiniteReal(xval);
                science_stats_loessFiniteReal(yval);
                science_stats_loessFiniteReal(weights);
                science_stats_loessStrictlyIncreasing(xval);
                if (n == 1)
                    return [yval[0]];
                if (n == 2)
                    return [yval[0], yval[1]];
                var bandwidthInPoints = Math.floor(bandwidth * n);
                if (bandwidthInPoints < 2)
                    throw { error: "Bandwidth too small." };
                var res = [], residuals = [], robustnessWeights = [];
                i = -1;
                while (++i < n) {
                    res[i] = 0;
                    residuals[i] = 0;
                    robustnessWeights[i] = 1;
                }
                var iter = -1;
                while (++iter <= robustnessIters) {
                    var bandwidthInterval = [0, bandwidthInPoints - 1];
                    var x;
                    i = -1;
                    while (++i < n) {
                        x = xval[i];
                        if (i > 0) {
                            science_stats_loessUpdateBandwidthInterval(xval, weights, i, bandwidthInterval);
                        }
                        var ileft = bandwidthInterval[0], iright = bandwidthInterval[1];
                        var edge = (xval[i] - xval[ileft]) > (xval[iright] - xval[i]) ? ileft : iright;
                        var sumWeights = 0, sumX = 0, sumXSquared = 0, sumY = 0, sumXY = 0, denom = Math.abs(1 / (xval[edge] - x));
                        for (var k = ileft; k <= iright; ++k) {
                            var xk = xval[k], yk = yval[k], dist = k < i ? x - xk : xk - x, w = science_stats_loessTricube(dist * denom) * robustnessWeights[k] * weights[k], xkw = xk * w;
                            sumWeights += w;
                            sumX += xkw;
                            sumXSquared += xk * xkw;
                            sumY += yk * w;
                            sumXY += yk * xkw;
                        }
                        var meanX = sumX / sumWeights, meanY = sumY / sumWeights, meanXY = sumXY / sumWeights, meanXSquared = sumXSquared / sumWeights;
                        var beta = (Math.sqrt(Math.abs(meanXSquared - meanX * meanX)) < accuracy)
                            ? 0 : ((meanXY - meanX * meanY) / (meanXSquared - meanX * meanX));
                        var alpha = meanY - beta * meanX;
                        res[i] = beta * x + alpha;
                        residuals[i] = Math.abs(yval[i] - res[i]);
                    }
                    if (iter === robustnessIters) {
                        break;
                    }
                    var sortedResiduals = residuals.slice();
                    sortedResiduals.sort();
                    var medianResidual = sortedResiduals[Math.floor(n / 2)];
                    if (Math.abs(medianResidual) < accuracy)
                        break;
                    var arg, w;
                    i = -1;
                    while (++i < n) {
                        arg = residuals[i] / (6 * medianResidual);
                        robustnessWeights[i] = (arg >= 1) ? 0 : ((w = 1 - arg * arg) * w);
                    }
                }
                return res;
            }
            smooth.bandwidth = function (x) {
                if (!arguments.length)
                    return x;
                bandwidth = x;
                return smooth;
            };
            smooth.robustnessIterations = function (x) {
                if (!arguments.length)
                    return x;
                robustnessIters = x;
                return smooth;
            };
            smooth.accuracy = function (x) {
                if (!arguments.length)
                    return x;
                accuracy = x;
                return smooth;
            };
            return smooth;
        };
        function science_stats_loessFiniteReal(values) {
            var n = values.length, i = -1;
            while (++i < n)
                if (!isFinite(values[i]))
                    return false;
            return true;
        }
        function science_stats_loessStrictlyIncreasing(xval) {
            var n = xval.length, i = 0;
            while (++i < n)
                if (xval[i - 1] >= xval[i])
                    return false;
            return true;
        }
        function science_stats_loessTricube(x) {
            return (x = 1 - x * x * x) * x * x;
        }
        function science_stats_loessUpdateBandwidthInterval(xval, weights, i, bandwidthInterval) {
            var left = bandwidthInterval[0], right = bandwidthInterval[1];
            var nextRight = science_stats_loessNextNonzero(weights, right);
            if ((nextRight < xval.length) && (xval[nextRight] - xval[i]) < (xval[i] - xval[left])) {
                var nextLeft = science_stats_loessNextNonzero(weights, left);
                bandwidthInterval[0] = nextLeft;
                bandwidthInterval[1] = nextRight;
            }
        }
        function science_stats_loessNextNonzero(weights, i) {
            var j = i + 1;
            while (j < weights.length && weights[j] === 0)
                j++;
            return j;
        }
        science.stats.mean = function (x) {
            var n = x.length;
            if (n === 0)
                return NaN;
            var m = 0, i = -1;
            while (++i < n)
                m += (x[i] - m) / (i + 1);
            return m;
        };
        science.stats.median = function (x) {
            return science.stats.quantiles(x, [.5])[0];
        };
        science.stats.mode = function (x) {
            x = x.slice().sort(science.ascending);
            var mode, n = x.length, i = -1, l = i, last = null, max = 0, tmp, v;
            while (++i < n) {
                if ((v = x[i]) !== last) {
                    if ((tmp = i - l) > max) {
                        max = tmp;
                        mode = last;
                    }
                    last = v;
                    l = i;
                }
            }
            return mode;
        };
        science.stats.quantiles = function (d, quantiles) {
            d = d.slice().sort(science.ascending);
            var n_1 = d.length - 1;
            return quantiles.map(function (q) {
                if (q === 0)
                    return d[0];
                else if (q === 1)
                    return d[n_1];
                var index = 1 + q * n_1, lo = Math.floor(index), h = index - lo, a = d[lo - 1];
                return h === 0 ? a : a + h * (d[lo] - a);
            });
        };
        science.stats.variance = function (x) {
            var n = x.length;
            if (n < 1)
                return NaN;
            if (n === 1)
                return 0;
            var mean = science.stats.mean(x), i = -1, s = 0;
            while (++i < n) {
                var v = x[i] - mean;
                s += v * v;
            }
            return s / (n - 1);
        };
        science.stats.distribution = {};
        science.stats.distribution.gaussian = function () {
            var random = Math.random, mean = 0, sigma = 1, variance = 1;
            function gaussian() {
                var x1, x2, rad, y1;
                do {
                    x1 = 2 * random() - 1;
                    x2 = 2 * random() - 1;
                    rad = x1 * x1 + x2 * x2;
                } while (rad >= 1 || rad === 0);
                return mean + sigma * x1 * Math.sqrt(-2 * Math.log(rad) / rad);
            }
            gaussian.pdf = function (x) {
                x = (x - mu) / sigma;
                return science_stats_distribution_gaussianConstant * Math.exp(-.5 * x * x) / sigma;
            };
            gaussian.cdf = function (x) {
                x = (x - mu) / sigma;
                return .5 * (1 + science.stats.erf(x / Math.SQRT2));
            };
            gaussian.mean = function (x) {
                if (!arguments.length)
                    return mean;
                mean = +x;
                return gaussian;
            };
            gaussian.variance = function (x) {
                if (!arguments.length)
                    return variance;
                sigma = Math.sqrt(variance = +x);
                return gaussian;
            };
            gaussian.random = function (x) {
                if (!arguments.length)
                    return random;
                random = x;
                return gaussian;
            };
            return gaussian;
        };
        science_stats_distribution_gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    })(this);
})(this);
(function (a) { function b(a, b) { return !isNaN(a) && !isNaN(b) && a != Infinity && b != Infinity; } function c(a, b, c, d) { var e = [], f = a + c, g = b.length, h = -1; while (++h < g)
    e[h] = (a * b[h] + c * d[h]) / f; return e; } function d(a) { var b = science.lin.length(a), c = a.length; while (c-- > 0)
    a[c] /= b; return a; } reorder = { version: "0.0.1" }, reorder.dot = science.lin.dot, reorder.length = science.lin.length, reorder.normalize = science.lin.normalize, reorder.printmat = function (a) { var b, c, d, e; for (b = 0; b < a.length; b++) {
    d = a[b], e = "";
    for (c = 0; c < d.length; c++)
        e.length != 0 && (e += ", "), e += d[c].toFixed(4);
    console.log(b.toPrecision(3) + ": " + e);
} }, reorder.assert = function (a, b) { if (!a)
    throw console.log(b), b || "Assertion failed"; }, reorder.printhcluster = function (a, b) { return a.left == null ? Array(b + 1).join(" ") + "id: " + a.id : Array(b + 1).join(" ") + "id: " + a.id + ", dist: " + a.dist + "\n" + reorder.printhcluster(a.left, b + 1) + "\n" + reorder.printhcluster(a.right, b + 1); }, reorder.mean = science.stats.mean, reorder.meantranspose = function (a, b) { var c = a.length; if (c == 0)
    return NaN; var d = a[0].length, e = 0, f = -1, g; while (++f < c)
    e += (a[f][b] - e) / (f + 1); return e; }, reorder.meancolumns = function (a) { var b = a.length; if (b == 0)
    return NaN; var c = a[0].length, d = a[0].slice(0), e = 0, f, g; while (++e < b) {
    g = a[e];
    for (f = 0; f < c; f++)
        d[f] += (g[f] - d[f]) / (e + 1);
} return d; }, reorder.sum = function (a) { var b = a.length, c = a[0]; while (b-- > 1)
    c += a[b]; return c; }, reorder.distance = { euclidean: function (a, c) { var d = a.length, e = 0, f; while (d-- > 0)
        b(a[d], c[d]) && (f = a[d] - c[d], e += f * f); return Math.sqrt(e); }, manhattan: function (a, c) { var d = a.length, e = 0; while (d-- > 0)
        b(a[d], c[d]) && (e += Math.abs(a[d] - c[d])); return e; }, minkowski: function (a) { return function (c, d) { var e = c.length, f = 0; while (e-- > 0)
        b(c[e], d[e]) && (f += Math.pow(Math.abs(c[e] - d[e]), a)); return Math.pow(f, 1 / a); }; }, chebyshev: function (a, c) { var d = a.length, e = 0, f; while (d-- > 0)
        b(a[d], c[d]) && (f = Math.abs(a[d] - c[d]), f > e && (e = f)); return e; }, hamming: function (a, c) { var d = a.length, e = 0; while (d-- > 0)
        b(a[d], c[d]) && a[d] !== c[d] && e++; return e; }, jaccard: function (a, c) { var d = 0, e = a.length, f = 0; while (e-- > 0)
        b(a[e], c[e]) && (a[e] === c[e] && f++, d++); return d == 0 ? 0 : f / d; }, braycurtis: function (a, c) { var d = a.length, e = 0, f = 0, g, h; while (d-- > 0)
        g = a[d], h = c[d], b(g, h) && (e += Math.abs(g - h), f += Math.abs(g + h)); return f == 0 ? 0 : e / f; } }, reorder.range = function (a, b, c) { arguments.length < 3 && (c = 1, arguments.length < 2 && (b = a, a = 0)); var d = [], e = a; if (c < 0)
    for (; e > b; e += c)
        d.push(e);
else
    for (; e < b; e += c)
        d.push(e); return d; }, reorder.transpose = science.lin.transpose, reorder.transposeSlice = function (a, b, c) { arguments.length < 3 && (c = a[0].length, arguments.length < 2 && (b = 0)); var d = a.length, e = c, f = b - 1, g, h = new Array(c - b); while (++f < e) {
    h[f] = new Array(d), g = -1;
    while (++g < d)
        h[f - b][g] = a[g][f];
} return h; }, reorder.correlation = { pearson: function (a, b) { var c = science.stats.mean(a), d = science.stats.mean(b), e = 0, f = 0, g = 0, h, i, j, k = Math.min(a.length, b.length); if (k === 0)
        return NaN; for (h = 0; h < k; h++)
        i = a[h] - c, j = b[h] - d, e += i * j, f += i * i, g += j * j; return e / Math.sqrt(f * g); }, pearsonMatrix: function (a) { var b, c, d, e, f, g = a.length, h, i, j, k; if (g === 0)
        return NaN; i = Array(g), j = science.zeroes(g), k = science.zeroes(g); for (d = 0; d < g; d++)
        i[d] = science.stats.mean(a[d]); for (d = 0; d < g; d++) {
        b = a[d], c = i[d];
        for (e = 0; e < g; e++)
            f = b[e] - c, j[e] += f, k[e] += f * f;
    } h = Array(g); for (d = 0; d < g; d++) {
        h[d] = Array(g);
        for (e = 0; e < g; e++)
            h[d][e] = j[d] * j[e] / Math.sqrt(k[d] * k[e]);
    } return h; } }, reorder.heap = function (a) { function e(a) { return a * 2 + 1; } function f(a) { return a * 2 + 2; } function g(a) { return Math.floor((a - 1) / 2); } function h(a, d) { var e = b[a], f = b[d]; b[a] = f, c[f] = a, b[d] = e, c[e] = d; } function i(a) { var b = k(c[a], a); j(b); } function j(c) { for (;;) {
    var d = e(c), g = f(c), i;
    d < b.length && a(b[d], b[c]) < 0 ? i = d : i = c, g < b.length && a(b[g], b[i]) < 0 && (i = g);
    if (c == i)
        return;
    h(c, i), c = i;
} } function k(d, e) { var f = d; for (par = g(f); f > 0 && a(b[par], e) > 0; par = g(par)) {
    var h = b[par];
    b[f] = h, c[h] = f, f = par;
} return b[f] = e, c[e] = f, f; } var b = [], c = {}, d = {}; return d.length = function () { return b.length; }, d.insert = function (a) { var c = b.length; b.push(null), k(c, a); }, d.isEmpty = function () { return b.length == 0; }, d.peek = function () { if (b.length == 0)
    throw { error: "Empty heap" }; return b[0]; }, d.pop = function () { if (b.length == 0)
    throw { error: "Empty heap" }; var a = b[0]; if (a == null)
    return a; var d = b[b.length - 1]; return b[0] = d, c[d] = 0, b.pop(), b.length > 1 && j(0), delete c[a], a; }, d; }, reorder.permutation = reorder.range, reorder.graph = function (a, b) { function g() { var g, h, i = a.length, j = b.length; for (g = 0; g < i; ++g)
    (h = a[g]).index = g, h.weight = 0; for (g = 0; g < j; ++g)
    (h = b[g]).index = g, typeof h.source == "number" && (h.source = a[h.source]), typeof h.target == "number" && (h.target = a[h.target]), ++h.source.weight, ++h.target.weight; f = []; if (typeof d == "function")
    for (g = 0; g < j; ++g)
        f[g] = +d.call(this, b[g], g);
else
    for (g = 0; g < j; ++g)
        f[g] = d; e = Array(a.length); for (g = 0; g < a.length; ++g)
    e[g] = []; for (g = 0; g < b.length; ++g) {
    var h = b[g];
    e[h.source.index].push(h), h.source.index != h.target.index && e[h.target.index].push(h);
} return c; } function h(a) { return f[a]; } var c = {}, d = 1, e, f; return c.nodes = function (b) { return arguments.length ? (a = b, c) : a; }, c.links = function (a) { return arguments.length ? (b = a, c) : b; }, c.linkDistance = function (a) { return arguments.length ? (d = typeof a == "function" ? a : +a, c) : d; }, c.init = g, c.edges = function (a) { return e[a]; }, c.distance = h, c.neighbors = function (a) { var b = e[a], c = []; for (var d = 0; d < b.length; ++d) {
    var f = b[d];
    f.source.index == a ? c.push(f.target) : c.push(f.source);
} return c; }, c.other = function (a, c) { return typeof a == "number" && (a = b[a]), a.source.index == c ? a.target : a.source; }, c; }, reorder.dijkstra = function (a) { function d(b, c) { var d = {}, e, f, g, h, i, j, k = reorder.heap(function (a, b) { return d[a].weight - d[b].weight; }), l = { edge: -1, vertex: b, weight: 0 }, m; c || (c = {}), c[b] = l, k.insert(b); while (!k.isEmpty()) {
    l = c[k.pop()], f = l.vertex, e = a.edges(f);
    for (var n = 0; n < e.length; n++)
        h = e[n].index, i = l.weight + a.distance(h), g = a.other(h, f).index, j = c[g], j ? j.weight > i && (j.weight = i, j.edge = h, k.update(j.vertex)) : (m = { edge: h, vertex: g, weight: i }, k.insert(g), c[g] = m);
} return c; } var b = a, c = {}; return c.shortestPath = function (b, c) { var e = d(b), f, g; g = e[c], f = [g]; while (g.edge != -1)
    g = e[a.other(g.edge, g.vertex).index], f.unshift(g); return f; }, c; }, reorder.distmax = function (a) { var b = 0, c = a.length, d, e, f; for (d = 0; d < c; d++) {
    f = a[d];
    for (e = d + 1; e < c; e++)
        f[e] > b && (b = f[e]);
} return b; }, reorder.distmin = function (a) { var b = Infinity, c = a.length, d, e, f; for (d = 0; d < c; d++) {
    f = a[d];
    for (e = d + 1; e < c; e++)
        f[e] < b && (b = f[e]);
} return b; }, reorder.dist = function () { function b(b) { var c = b.length, d = []; for (var e = 0; e < c; e++) {
    var f = [];
    d[e] = f;
    for (var g = 0; g < c; g++)
        g < e ? f.push(d[g][e]) : e === g ? f.push(0) : f.push(a(b[e], b[g]));
} return d; } var a = reorder.distance.euclidean; return b.distance = function (c) { return arguments.length ? (a = c, b) : a; }, b; }, reorder.dist_remove = function (a, b, c) { arguments.length < 3 && (c = b + 1); var d; a.splice(b, c - b); for (d = a.length; d-- > 0;)
    a[d].splice(b, c - b); return a; }, reorder.randomPermute = function (a, b, c) { arguments.length < 3 && (c = a.length, arguments.length < 2 && (b = 0)); var d = c - b, e, f; while (d > 0)
    f = b + Math.floor(Math.random() * d--), e = a[b + d], a[b + d] = a[f], a[f] = e; return a; }, reorder.randomPermutation = function (a) { return reorder.randomPermute(reorder.permutation(a)); }, reorder.permute = function (a, b) { var c = b.length, d = a.slice(0); while (c--)
    d[c] = a[b[c]]; return d; }, reorder.permutetranspose = function (a, b) { var c = a.length; while (c-- > 0)
    a[c] = reorder.permute(a[c], b); return a; }, reorder.stablepermute = function (a, b) { var c = reorder.permute(a, b); return c[0] > c[c.length - 1] && c.reverse(), c; }, typeof science == "undefined" && (science = { version: "1.9.1" }, science.stats = {}), science.stats.hcluster = function () { function e(e) { var f = e.length, g = [], h = [], i = [], j, k, l, m, n, o, p, q, r = 0; if (d == null) {
    d = [], p = -1;
    while (++p < f) {
        g[p] = 0, d[p] = [], q = -1;
        while (++q < f)
            d[p][q] = p === q ? Infinity : a(e[p], e[q]), d[p][g[p]] > d[p][q] && (g[p] = q);
    }
}
else {
    if (d.length < f || d[0].length < f)
        throw { error: "Provided distance matrix length " + d.length + " instead of " + f };
    p = -1;
    while (++p < f) {
        g[p] = 0, q = -1;
        while (++q < f)
            p === q && (d[p][q] = Infinity), d[p][g[p]] > d[p][q] && (g[p] = q);
    }
} p = -1; while (++p < f)
    i[p] = [], i[p][0] = { left: null, right: null, dist: 0, centroid: e[p], id: r++, size: 1, depth: 0 }, h[p] = 1; for (n = 0; n < f - 1; n++) {
    j = 0;
    for (p = 0; p < f; p++)
        d[p][g[p]] < d[j][g[j]] && (j = p);
    k = g[j], l = i[j][0], m = i[k][0];
    var s = { left: l, right: m, dist: d[j][k], centroid: c(l.size, l.centroid, m.size, m.centroid), id: r++, size: l.size + m.size, depth: 1 + Math.max(l.depth, m.depth) };
    i[j].splice(0, 0, s), h[j] += h[k];
    for (q = 0; q < f; q++)
        switch (b) {
            case "single":
                d[j][q] > d[k][q] && (d[q][j] = d[j][q] = d[k][q]);
                break;
            case "complete":
                d[j][q] < d[k][q] && (d[q][j] = d[j][q] = d[k][q]);
                break;
            case "average": d[q][j] = d[j][q] = (h[j] * d[j][q] + h[k] * d[k][q]) / (h[j] + h[q]);
        }
    d[j][j] = Infinity;
    for (p = 0; p < f; p++)
        d[p][k] = d[k][p] = Infinity;
    for (q = 0; q < f; q++)
        g[q] == k && (g[q] = j), d[j][q] < d[j][g[j]] && (g[j] = q);
    o = s;
} return o; } var a = reorder.distance.euclidean, b = "simple", d = null; return e.linkage = function (a) { return arguments.length ? (b = a, e) : b; }, e.distance = function (b) { return arguments.length ? (a = b, e) : a; }, e.distanceMatrix = function (a) { return arguments.length ? (d = a.map(function (a) { return a.slice(0); }), e) : d; }, e; }, reorder.leafOrder = function () { function g(a) { return a.depth == 0; } function h(a) { return a == null ? [] : a.id in e ? e[a.id] : e[a.id] = i(a); } function i(a) { return a == null ? [] : a.depth == 0 ? [a.id] : h(a.left).concat(h(a.right)); } function j(a, b, c) { var d = "k" + a.id + "-" + b + "-" + c; return d in f ? f[d] : f[d] = k(a, b, c); } function k(b, c, d) { if (b.depth == 0)
    return [0, [b.id]]; var e = b.left, f = b.right, g = h(e), i = h(f), k, l; if (g.indexOf(c) != -1 && i.indexOf(d) != -1)
    k = e, l = f;
else {
    if (i.indexOf(c) == -1 || g.indexOf(d) == -1)
        throw { error: "Node is not common ancestor of " + c + ", " + d };
    k = f, l = e;
} var m = h(k.left), n = h(k.right), o = n.indexOf(c) != -1 ? m : n; o.length == 0 && (o = [c]); var p = h(l.left), q = h(l.right), r = q.indexOf(d) != -1 ? p : q; r.length == 0 && (r = [d]); var s = Infinity, t = []; for (var u = 0; u < o.length; u++) {
    var v = j(k, c, o[u]);
    for (var w = 0; w < r.length; w++) {
        var x = j(l, r[w], d), y = v[0] + a[o[u]][r[w]] + x[0];
        y < s && (s = y, t = v[1].concat(x[1]));
    }
} return [s, t]; } function l(b) { e = {}, f = {}; var c = Infinity, g = [], i = h(b.left), k = h(b.right); d && console.log(reorder.printhcluster(b, 0)); for (var l = 0; l < i.length; l++)
    for (var m = 0; m < k.length; m++) {
        var n = j(b, i[l], k[m]);
        n[0] < c && (c = n[0], g = n[1]);
    } return a = null, g; } function m(d) { a == null && (a = reorder.dist().distance(b)(d)); var e = science.stats.hcluster().linkage(c).distanceMatrix(a); return l(e(d)); } var a = null, b = reorder.distance.euclidean, c = "complete", d = 0, e = {}, f = {}; return m.debug = function (a) { return arguments.length ? (d = a, m) : d; }, m.distance = function (c) { return arguments.length ? (b = c, a = null, m) : b; }, m.linkage = function (a) { return arguments.length ? (c = a, m) : c; }, m.distanceMatrix = function (b) { return arguments.length ? (a = b.map(function (a) { return a.slice(0); }), m) : a; }, m.orderFull = l, m; }, reorder.order = function () { function j() { a = reorder.distance.euclidean, b = reorder.leafOrder, c = "complete", d = null, e = null, f = [], g = 0, h = 0, i = Infinity; } function k(a) { e = a, i = Math.min(i, a.length); var b = h > 0 ? h - 1 : 0, c = i < e.length ? i + 1 : i, d, g, k; for (d = f.length - 1; d > 0; d -= 2)
    g = f[d - 1], k = f[d], k >= c ? c > i ? (c = Math.min(c, g + 1), f.splice(d - 1, 2)) : k = c : g <= b ? b < h ? (b = Math.max(b, k - 1), f.splice(d - 1, 2)) : g = b : k - g < 3 && f.splice(d - 1, 2); try {
    return l(b, c);
}
finally {
    j();
} } function l(a, b) { var c = e, j, k, l, n; e = e.slice(a, b); if (h == 0 && i == e.length)
    return m(); g && console.log("i0=" + a + " j0=" + b), d != null ? (b != e.length && reorder.dist_remove(d, b, e.length), a > 0 && reorder.dist_remove(d, 0, a)) : s(); var o = reorder.distmax(d); if (a < h) {
    k = d[0];
    for (l = k.length; l-- > 1;)
        k[l] += o;
    for (l = d.length; l-- > 1;)
        d[l][0] += o;
    o += o;
    if (a != 0)
        for (l = 0; l < f.length; l++)
            f[l] -= a;
} if (b > i) {
    n = d.length - 1, k = d[n];
    for (l = n; l-- > 0;)
        k[l] += o, d[l][n] += o;
} return j = m(), a < h ? (j[0] != 0 && j.reverse(), b > i ? reorder.assert(j[0] == 0 && j[j.length - 1] == j.length - 1, "Invalid constrained permutation endpoints") : reorder.assert(j[0] == 0, "Invalid constrained permutation start")) : b > i && (j[j.length - 1] != j.length - 1 && (j = j.reverse()), reorder.assert(j[j.length - 1] == j.length - 1, "Invalid constrained permutation end")), a != 0 && (j = reorder.permutation(a).concat(j.map(function (b) { return b + a; }))), c.length > b && (j = j.concat(reorder.range(b, c.length))), j; } function m() { var a, b, c, h, i, j; if (f.length == 0)
    return n(); s(); for (b = f.length - 1; b > 0; b -= 2)
    h = f[b - 1], i = f[b], d = reorder.dist_remove(d, h + 1, i - 1), e.splice(h + 1, i - h - 2), g && console.log("Except[" + h + ", " + i + "]"), d[h][h + 1] != 0 && (d[h][h + 1] = d[h + 1][h] = -1); a = n(); for (b = 0; b < f.length; b += 2) {
    h = f[b], i = f[b + 1];
    for (c = 0; c < a.length; c++)
        a[c] > h ? a[c] += i - h - 2 : a[c] == h && (j = c);
    if (j > 0 && a[j - 1] == i - 1)
        Array.prototype.splice.apply(a, [j, 0].concat(reorder.range(i - 2, h, -1)));
    else {
        if (a[j + 1] != i - 1)
            throw "Range not respected";
        Array.prototype.splice.apply(a, [j + 1, 0].concat(reorder.range(h + 1, i - 1)));
    }
} return a; } function n() { var a, b, c, f, g, h, i, j, k = !1, l = [], m = {}; s(); for (g = 0; g < d.length - 1; g++) {
    b = d[g], c = [], f = b.indexOf(-1), f != -1 && (m[g] = [g, f], k = !0);
    for (h = b.length; --h > g;)
        b[h] == 0 ? (f = d[h].indexOf(-1), f != -1 && (m[g] = [h, f], d[f][g] = b[f] = -1, k = !0), c.unshift(h), d = reorder.dist_remove(d, h), e.splice(h, 1)) : b[h] < 0 && (k = !0);
    c.length != 0 && (c.unshift(g), l.push(c));
} if (k)
    for (g = 0; g < d.length - 1; g++) {
        b = d[g];
        for (h = g + 1; h < b.length - 1; h++)
            d[h][h + 1] == -1 && (d[h + 1][h] = d[h][h + 1] = 0);
    } a = q(); for (g = l.length; g-- > 0;) {
    c = l[g], h = a.indexOf(c[0]), i = m[c[0]], i && i[0] == c[0] && (h = o(a, h, i[0], i[1], 0), i = undefined);
    for (j = 1; j < c.length; j++)
        a = r(a, h, c[j]), i && i[0] == c[j] && (h = o(a, h, i[0], i[1], j), i = undefined);
} return a; } function o(a, b, c, d, e) { var f, g, h; if (b > 0 && a[b - 1] == d)
    return p(a, b, a.indexOf(c)), b + 1; if (a[b + e + 1] == d)
    return p(a, b + e, a.indexOf(c)), b; throw "Index not found"; } function p(a, b, c) { if (b == c)
    return; var d = a[b]; a[b] = a[c], a[c] = d; } function q() { g > 1 && reorder.printmat(d), g > 2 && reorder.printmat(e); var a = b().debug(g).linkage(c).distanceMatrix(d)(e); return g && console.log("Permutation: " + a), a; } function r(a, b, c) { return a = a.map(function (a) { return a < c ? a : a + 1; }), a.splice(b, 0, c), a; } function s() { return d == null && (d = reorder.dist().distance(a)(e)), d; } function t(c, d, e) { var f = reorder.dist().distance(a)(c), g, h, i, j = !1, k, l = -1; f[d][d + 1] = 0, f[d + 1][d] = 0; var m = b().distanceMatrix(f)(c); l = m.indexOf(d); for (h = 0; h < m.length; h++)
    i = m[h], i > d && (m[h] += e - d - 2); return l != 0 && m[l - 1] == e - 1 && (j = !0), j && (m.reverse(), l = m.length - l - 1), k = [l + 1, 0].concat(reorder.range(d + 1, e - 1)), Array.prototype.splice.apply(m, k), m; } var a = reorder.distance.euclidean, b = reorder.leafOrder, c = "complete", d, e, f = [], g = 0, h = 0, i = Infinity; return k.debug = function (a) { return arguments.length ? (g = a, k) : g; }, k.distance = function (b) { return arguments.length ? (a = b, k) : a; }, k.linkage = function (a) { return arguments.length ? (c = a, k) : c; }, k.limits = function (a, b) { return arguments.length ? (h = a, i = b, k) : [h, i]; }, k.except = function (a) { return arguments.length ? (f = a.sort(function (a, b) { if (a >= b)
    throw "Invalid list, indices not sorted"; return a - b; }), k) : f.slice(0); }, k.orderrowsexcept = k.orderexcept, k; }, reorder.covariance = science.lin.dot, reorder.covariancetranspose = function (a, b, c) { var d = a.length, e = 0, f; for (f = 0; f < d; f++)
    e += a[f][b] * a[f][c]; return e; }, reorder.variancecovariance = function (a) { var b = a[0].length, c = Array(b), d, e; for (d = 0; d < b; d++)
    c[d] = Array(b); for (d = 0; d < b; d++)
    for (e = d; e < b; e++)
        c[d][e] = c[e][d] = reorder.covariancetranspose(a, d, e); return c; }, reorder.poweriteration = function (a, b) { arguments.length < 2 && (b = 1e-4); var c = a.length, e = Array(c), f, g, h = Array(c), i, j = 10; reorder.assert(c == a[0].length, "poweriteration needs a square matrix"); for (f = 0; f < c; f++)
    e[f] = Math.random(); e = d(e); while (j-- > 0) {
    for (f = 0; f < c; f++) {
        h[f] = 0;
        for (g = 0; g < c; g++)
            h[f] += a[f][g] * e[g];
    }
    h = d(h);
    var k = h;
    h = e, e = k;
} return h; }, reorder.sortorder = function (a) { return reorder.range(0, a.length).sort(function (b, c) { return a[b] - a[c]; }); }, reorder.center = function (a) { var b = a.length; if (b == 0)
    return null; var c = reorder.meancolumns(a), d = c.length, e = Array(b), f, g, h; for (f = 0; f < b; f++) {
    h = a[f].slice(0);
    for (g = 0; g < d; g++)
        h[g] -= c[g];
    e[f] = h;
} return e; }, reorder.pca1d = function (a, b) { arguments.length < 2 && (b = 1e-4); var c = a.length; if (a.length == 0)
    return null; a = reorder.center(a); var d = reorder.variancecovariance(a); return reorder.poweriteration(d, b); }, reorder.pca1dorder = function (a, b) { return reorder.sortorder(pca1d(a, b)); }, reorder.sumlines = function (a) { var b = a.length, c = a[0].length, d = Array(b), e, f, g, h; for (e = 0; e < b; e++) {
    g = a[e], h = 0;
    for (f = 0; f < c; f++)
        h += g[f];
    d[e] = h;
} return d; }, reorder.sumcols = function (a) { var b = a.length, c = a[0].length, d = science.zeroes(c), e, f, g; for (e = 0; e < b; e++) {
    g = a[e];
    for (f = 0; f < c; f++)
        d[f] += g[f];
} return d; }, reorder.ca = function (a, b) { arguments.length < 2 && (b = 1e-4); var c = a.length, d = a[0].length, e = reorder.sumlines(a), f = reorder.sumcols(a), g = reorder.sum(f), h, i, j; for (h = 0; h < c; h++)
    a[h] = a[h].map(function (a) { return a / g; }); e = reorder.sumlines(a), f = reorder.sumcols(a); var k = Array(c), l; for (h = 0; h < c; h++) {
    k[h] = Array(d);
    for (i = 0; i < d; i++)
        l = e[h] * f[i], k[h][i] = (a[h][i] - l) / Math.sqrt(l);
} for (h = 0; h < c; h++)
    for (i = 0; i < d; i++)
        l = e[h] * f[i], a[h][i] = (a[h][i] - l) / (f[i] * Math.sqrt(e[h])); var m = Array(c); for (h = 0; h < c; h++)
    m[h] = Array(c); for (h = 0; h < c; h++)
    for (i = h; i < c; i++)
        m[h][i] = m[i][h] = reorder.covariance(k[h], k[i]); var n = reorder.poweriteration(m, b), o = 0; for (h = 0; h < c; h++)
    o += n[h] * m[h][0]; return o /= n[0], n; }; })(this);
var BSpline = function (points, degree, copy) {
    if (copy) {
        this.points = [];
        for (var i = 0; i < points.length; i++) {
            this.points.push(points[i]);
        }
    }
    else {
        this.points = points;
    }
    this.degree = degree;
    this.dimension = points[0].length;
    if (degree == 2) {
        this.baseFunc = this.basisDeg2;
        this.baseFuncRangeInt = 2;
    }
    else if (degree == 3) {
        this.baseFunc = this.basisDeg3;
        this.baseFuncRangeInt = 2;
    }
    else if (degree == 4) {
        this.baseFunc = this.basisDeg4;
        this.baseFuncRangeInt = 3;
    }
    else if (degree == 5) {
        this.baseFunc = this.basisDeg5;
        this.baseFuncRangeInt = 3;
    }
};
BSpline.prototype.seqAt = function (dim) {
    var points = this.points;
    var margin = this.degree + 1;
    return function (n) {
        if (n < margin) {
            return points[0][dim];
        }
        else if (points.length + margin <= n) {
            return points[points.length - 1][dim];
        }
        else {
            return points[n - margin][dim];
        }
    };
};
BSpline.prototype.basisDeg2 = function (x) {
    if (-0.5 <= x && x < 0.5) {
        return 0.75 - x * x;
    }
    else if (0.5 <= x && x <= 1.5) {
        return 1.125 + (-1.5 + x / 2.0) * x;
    }
    else if (-1.5 <= x && x < -0.5) {
        return 1.125 + (1.5 + x / 2.0) * x;
    }
    else {
        return 0;
    }
};
BSpline.prototype.basisDeg3 = function (x) {
    if (-1 <= x && x < 0) {
        return 2.0 / 3.0 + (-1.0 - x / 2.0) * x * x;
    }
    else if (1 <= x && x <= 2) {
        return 4.0 / 3.0 + x * (-2.0 + (1.0 - x / 6.0) * x);
    }
    else if (-2 <= x && x < -1) {
        return 4.0 / 3.0 + x * (2.0 + (1.0 + x / 6.0) * x);
    }
    else if (0 <= x && x < 1) {
        return 2.0 / 3.0 + (-1.0 + x / 2.0) * x * x;
    }
    else {
        return 0;
    }
};
BSpline.prototype.basisDeg4 = function (x) {
    if (-1.5 <= x && x < -0.5) {
        return 55.0 / 96.0 + x * (-(5.0 / 24.0) + x * (-(5.0 / 4.0) + (-(5.0 / 6.0) - x / 6.0) * x));
    }
    else if (0.5 <= x && x < 1.5) {
        return 55.0 / 96.0 + x * (5.0 / 24.0 + x * (-(5.0 / 4.0) + (5.0 / 6.0 - x / 6.0) * x));
    }
    else if (1.5 <= x && x <= 2.5) {
        return 625.0 / 384.0 + x * (-(125.0 / 48.0) + x * (25.0 / 16.0 + (-(5.0 / 12.0) + x / 24.0) * x));
    }
    else if (-2.5 <= x && x <= -1.5) {
        return 625.0 / 384.0 + x * (125.0 / 48.0 + x * (25.0 / 16.0 + (5.0 / 12.0 + x / 24.0) * x));
    }
    else if (-1.5 <= x && x < 1.5) {
        return 115.0 / 192.0 + x * x * (-(5.0 / 8.0) + x * x / 4.0);
    }
    else {
        return 0;
    }
};
BSpline.prototype.basisDeg5 = function (x) {
    if (-2 <= x && x < -1) {
        return 17.0 / 40.0 + x * (-(5.0 / 8.0) + x * (-(7.0 / 4.0) + x * (-(5.0 / 4.0) + (-(3.0 / 8.0) - x / 24.0) * x)));
    }
    else if (0 <= x && x < 1) {
        return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 - x / 12.0) * x * x);
    }
    else if (2 <= x && x <= 3) {
        return 81.0 / 40.0 + x * (-(27.0 / 8.0) + x * (9.0 / 4.0 + x * (-(3.0 / 4.0) + (1.0 / 8.0 - x / 120.0) * x)));
    }
    else if (-3 <= x && x < -2) {
        return 81.0 / 40.0 + x * (27.0 / 8.0 + x * (9.0 / 4.0 + x * (3.0 / 4.0 + (1.0 / 8.0 + x / 120.0) * x)));
    }
    else if (1 <= x && x < 2) {
        return 17.0 / 40.0 + x * (5.0 / 8.0 + x * (-(7.0 / 4.0) + x * (5.0 / 4.0 + (-(3.0 / 8.0) + x / 24.0) * x)));
    }
    else if (-1 <= x && x < 0) {
        return 11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 + x / 12.0) * x * x);
    }
    else {
        return 0;
    }
};
BSpline.prototype.getInterpol = function (seq, t) {
    var f = this.baseFunc;
    var rangeInt = this.baseFuncRangeInt;
    var tInt = Math.floor(t);
    var result = 0;
    for (var i = tInt - rangeInt; i <= tInt + rangeInt; i++) {
        result += seq(i) * f(t - i);
    }
    return result;
};
BSpline.prototype.calcAt = function (t) {
    t = t * ((this.degree + 1) * 2 + this.points.length);
    if (this.dimension == 2) {
        return [this.getInterpol(this.seqAt(0), t), this.getInterpol(this.seqAt(1), t)];
    }
    else if (this.dimension == 3) {
        return [this.getInterpol(this.seqAt(0), t), this.getInterpol(this.seqAt(1), t), this.getInterpol(this.seqAt(2), t)];
    }
    else {
        var res = [];
        for (var i = 0; i < this.dimension; i++) {
            res.push(this.getInterpol(this.seqAt(i), t));
        }
        return res;
    }
};
var colorSchemes;
(function (colorSchemes) {
    colorSchemes.schema1 = [
        '#775566',
        '#6688bb',
        '#556677',
        '#88aa88',
        '#88bb33',
        '#cc7744',
        '#003366',
        '#994422',
        '#331111'
    ];
    colorSchemes.schema2 = [
        '#44B3C2',
        '#F1A94E',
        '#E45641',
        '#5D4C46',
        '#7B8D8E',
        '#2ca02c',
        '#003366',
        '#9467bd',
        '#bcbd22',
        '#e377c2'
    ];
    colorSchemes.schema3 = [
        '#001166',
        '#0055aa',
        '#1199cc',
        '#99ccdd',
        '#002222',
        '#ddffff',
        '#446655',
        '#779988',
        '#115522'
    ];
    colorSchemes.schema4 = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2',
        '#7f7f7f',
        '#bcbd22',
        '#17becf'
    ];
    colorSchemes.schema5 = [
        '#1f77b4',
        '#aec7e8',
        '#ff7f0e',
        '#ffbb78',
        '#2ca02c',
        '#98df8a',
        '#d62728',
        '#ff9896',
        '#9467bd',
        '#c5b0d5',
        '#8c564b',
        '#c49c94',
        '#e377c2',
        '#f7b6d2',
        '#7f7f7f',
        '#c7c7c7',
        '#bcbd22',
        '#dbdb8d',
        '#17becf',
        '#9edae5'
    ];
    colorSchemes.schema6 = [
        '#a6cee3',
        '#1f78b4',
        '#b2df8a',
        '#33a02c',
        '#fb9a99',
        '#e31a1c',
        '#fdbf6f',
        '#ff7f00',
        '#cab2d6',
        '#6a3d9a',
        '#ffff99',
        '#b15928'
    ];
})(colorSchemes || (colorSchemes = {}));
var networkcube;
(function (networkcube) {
    function getPriorityColor(element) {
        var j = 0;
        var selections = element.getSelections();
        while (!selections[j].showColor) {
            j++;
            if (j == selections.length) {
                j = -1;
                return;
            }
        }
        return element.getSelections()[j].color;
    }
    networkcube.getPriorityColor = getPriorityColor;
    function sortByPriority(s1, s2) {
        return s1.priority - s2.priority;
    }
    networkcube.sortByPriority = sortByPriority;
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
    networkcube.getUrlVars = getUrlVars;
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    networkcube.capitalizeFirstLetter = capitalizeFirstLetter;
    function isValidIndex(v) {
        return v != undefined && v > -1;
    }
    networkcube.isValidIndex = isValidIndex;
    function array(value, size) {
        var array = [];
        while (size--)
            array[size] = value;
        return array;
    }
    networkcube.array = array;
    function doubleArray(size1, size2, value) {
        var array = [];
        if (value == undefined)
            value = [];
        var a = [];
        if (size2) {
            while (size2--)
                a[size2] = value;
        }
        while (size1--)
            array[size1] = a.slice(0);
        return array;
    }
    networkcube.doubleArray = doubleArray;
    function isBefore(t1, t2) {
        return t1.time < t2.time;
    }
    networkcube.isBefore = isBefore;
    function isAfter(t1, t2) {
        return t1.time > t2.time;
    }
    networkcube.isAfter = isAfter;
    function hex2Rgb(hex) {
        return [hexToR(hex), hexToG(hex), hexToB(hex)];
    }
    networkcube.hex2Rgb = hex2Rgb;
    function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16); }
    function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16); }
    function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16); }
    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h; }
    function hex2web(v) {
        v = v + '';
        return v.replace('0x', '#');
    }
    networkcube.hex2web = hex2web;
    function hex2RgbNormalized(hex) {
        return [hexToR(hex) / 255, hexToG(hex) / 255, hexToB(hex) / 255];
    }
    networkcube.hex2RgbNormalized = hex2RgbNormalized;
    function getType(elements) {
        if (elements.length == 0)
            return;
        var type;
        if (elements[0] instanceof networkcube.Node)
            type = 'node';
        else if (elements[0] instanceof networkcube.Link) {
            type = 'link';
        }
        else if (elements[0] instanceof networkcube.Time) {
            type = 'time';
        }
        else if (elements[0] instanceof networkcube.NodePair) {
            type = 'nodePair';
        }
        else if (elements[0] instanceof networkcube.LinkType) {
            type = 'linkType';
        }
        else if (typeof elements[0] == 'number') {
            type = 'number';
        }
        return type;
    }
    networkcube.getType = getType;
    function areEqualShallow(a, b) {
        for (var key in a) {
            if (!(key in b) || a[key] !== b[key]) {
                return false;
            }
        }
        for (var key in b) {
            if (!(key in a) || a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }
    networkcube.areEqualShallow = areEqualShallow;
    function compareTypesShallow(a, b) {
        if (a == null || b == null)
            return a == b;
        if (typeof a != typeof b)
            return false;
        else if (typeof a != 'object')
            return true;
        else if (a.constructor !== b.constructor)
            return false;
        else {
            return true;
        }
    }
    networkcube.compareTypesShallow = compareTypesShallow;
    function compareTypesDeep(a, b, depth) {
        var result = true;
        if (a == null || b == null)
            return a == b;
        if (typeof a != typeof b)
            return false;
        else if (typeof a != 'object')
            return true;
        else if (a.constructor !== b.constructor)
            return false;
        else {
            if (depth > 0) {
                for (var key in a) {
                    if (key in b
                        && a.hasOwnProperty(key)
                        && b.hasOwnProperty(key)
                        && !compareTypesDeep(a[key], b[key], depth - 1)) {
                        console.log("compareFailed for key", key, a[key], b[key]);
                        result = false;
                    }
                }
            }
            return result;
        }
    }
    networkcube.compareTypesDeep = compareTypesDeep;
    function copyPropsShallow(source, target) {
        for (var p in source) {
            if (source.hasOwnProperty(p))
                target[p] = source[p];
        }
        return target;
    }
    networkcube.copyPropsShallow = copyPropsShallow;
    function copyTimeseriesPropsShallow(source, target) {
        for (var q in source) {
            if (source.hasOwnProperty(q)) {
                for (var p in source[q]) {
                    if (source[q].hasOwnProperty(p)) {
                        target[q][p] = source[q][p];
                    }
                }
            }
        }
        return target;
    }
    networkcube.copyTimeseriesPropsShallow = copyTimeseriesPropsShallow;
    function copyArray(arr, ctorFunc) {
        var arrayClone = [];
        for (var elem in arr) {
            arrayClone.push(copyPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }
    networkcube.copyArray = copyArray;
    function copyTimeSeries(arr, ctorFunc) {
        var arrayClone = [];
        for (var elem in arr) {
            arrayClone.push(copyTimeseriesPropsShallow(arr[elem], ctorFunc()));
        }
        return arrayClone;
    }
    networkcube.copyTimeSeries = copyTimeSeries;
    var Box = (function () {
        function Box(x1, y1, x2, y2) {
            this.x1 = Math.min(x1, x2);
            this.x2 = Math.max(x1, x2);
            this.y1 = Math.min(y1, y2);
            this.y2 = Math.max(y1, y2);
        }
        Object.defineProperty(Box.prototype, "width", {
            get: function () {
                return this.x2 - this.x1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Box.prototype, "height", {
            get: function () {
                return this.y2 - this.y1;
            },
            enumerable: true,
            configurable: true
        });
        Box.prototype.isPoint = function () {
            return (this.width == 0) && (this.height == 0);
        };
        return Box;
    })();
    networkcube.Box = Box;
    function inBox(x, y, box) {
        return (x > box.x1
            && x < box.x2
            && y > box.y1
            && y < box.y2);
    }
    networkcube.inBox = inBox;
    function isSame(a, b) {
        if (a.length != b.length)
            return false;
        var found = true;
        for (var i = 0; i < a.length; i++) {
            found = false;
            for (var j = 0; j < b.length; j++) {
                if (a[i] == b[j])
                    found = true;
            }
            if (!found)
                return false;
        }
        return true;
    }
    networkcube.isSame = isSame;
    function sortNumber(a, b) {
        return a - b;
    }
    networkcube.sortNumber = sortNumber;
    var ElementCompound = (function () {
        function ElementCompound() {
            this.nodes = [];
            this.links = [];
            this.times = [];
            this.nodePairs = [];
            this.locations = [];
        }
        return ElementCompound;
    })();
    networkcube.ElementCompound = ElementCompound;
    var IDCompound = (function () {
        function IDCompound() {
            this.nodeIds = [];
            this.linkIds = [];
            this.timeIds = [];
            this.nodePairIds = [];
            this.locationIds = [];
        }
        return IDCompound;
    })();
    networkcube.IDCompound = IDCompound;
    function cloneCompound(compound) {
        var result = new IDCompound();
        if (compound.nodeIds) {
            result.nodeIds = [];
            for (var i = 0; i < compound.nodeIds.length; i++) {
                result.nodeIds.push(compound.nodeIds[i]);
            }
        }
        if (compound.linkIds) {
            result.linkIds = [];
            for (var i = 0; i < compound.linkIds.length; i++) {
                result.linkIds.push(compound.linkIds[i]);
            }
        }
        if (compound.nodePairIds) {
            result.nodePairIds = [];
            for (var i = 0; i < compound.nodePairIds.length; i++) {
                result.nodePairIds.push(compound.nodePairIds[i]);
            }
        }
        if (compound.timeIds) {
            result.timeIds = [];
            for (var i = 0; i < compound.timeIds.length; i++) {
                result.timeIds.push(compound.timeIds[i]);
            }
        }
        return result;
    }
    networkcube.cloneCompound = cloneCompound;
    function makeIdCompound(elements) {
        var result = new IDCompound;
        if (elements != undefined) {
            if (elements.nodes) {
                result.nodeIds = elements.nodes.map(function (n, i) { return n.id(); });
            }
            if (elements.links) {
                result.linkIds = elements.links.map(function (n, i) { return n.id(); });
            }
            if (elements.times) {
                result.timeIds = elements.times.map(function (n, i) { return n.id(); });
            }
            if (elements.nodePairs) {
                result.nodePairIds = elements.nodePairs.map(function (n, i) { return n.id(); });
            }
        }
        return result;
    }
    networkcube.makeIdCompound = makeIdCompound;
    function makeElementCompound(elements, g) {
        var result = new ElementCompound;
        if (elements != undefined) {
            if (elements.nodeIds) {
                result.nodes = elements.nodeIds.map(function (id, i) { return g.node(id); });
            }
            if (elements.linkIds) {
                result.links = elements.linkIds.map(function (id, i) { return g.link(id); });
            }
            if (elements.timeIds) {
                result.times = elements.timeIds.map(function (id, i) { return g.time(id); });
            }
            if (elements.nodePairIds) {
                result.nodePairs = elements.nodePairIds.map(function (id, i) { return g.nodePair(id); });
            }
        }
        return result;
    }
    networkcube.makeElementCompound = makeElementCompound;
    function attributeSort(a, b, attributeName, asc) {
        var value = a.attr(attributeName);
        var result;
        if (typeof value == 'string') {
            result = a.attr(attributeName).localeCompare(b.attr(attributeName));
        }
        else if (typeof value == 'number') {
            result = b.attr(attributeName) - a.attr(attributeName);
        }
        else {
            result = 0;
        }
        if (asc == false) {
            result = -result;
        }
        return result;
    }
    networkcube.attributeSort = attributeSort;
    function formatAtGranularity(time, granualarity) {
        switch (granualarity) {
            case 0: return time.millisecond();
            case 1: return time.second();
            case 2: return time.minute();
            case 3: return time.hour();
            case 4: return time.day();
            case 5: return time.week();
            case 6: return time.month() + 1;
            case 7: return time.year();
        }
    }
    networkcube.formatAtGranularity = formatAtGranularity;
    function arraysEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length != b.length)
            return false;
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    networkcube.arraysEqual = arraysEqual;
    function encapsulate(array, attrName) {
        if (attrName == undefined) {
            attrName = 'element';
        }
        var a = [];
        var o;
        for (var i = 0; i < array.length; i++) {
            o = {
                index: i,
            };
            o[attrName] = array[i];
            a.push(o);
        }
        return a;
    }
    networkcube.encapsulate = encapsulate;
    function isPointInPolyArray(poly, pt) {
        for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
            ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i][1])) && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0]) && (c = !c);
        return c;
    }
    networkcube.isPointInPolyArray = isPointInPolyArray;
    function formatTimeAtGranularity(time, granualarity) {
        var momentTime = moment(time.unixTime());
        switch (granualarity) {
            case 0: return momentTime.millisecond();
            case 1: return momentTime.second();
            case 2: return momentTime.minute();
            case 3: return momentTime.hour();
            case 4: return momentTime.day();
            case 5: return momentTime.week();
            case 6: return momentTime.month() + 1;
            default: return momentTime.year();
        }
    }
    networkcube.formatTimeAtGranularity = formatTimeAtGranularity;
    function exportPNG(canvas, name) {
        var dataURL = canvas.toDataURL('image/jpg', 1);
        var blob = dataURItoBlob(dataURL);
        var fileNameToSaveAs = name + '_' + new Date().toUTCString() + '.png';
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(blob);
        downloadLink.click();
    }
    networkcube.exportPNG = exportPNG;
    function dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
})(networkcube || (networkcube = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var networkcube;
(function (networkcube) {
    var BasicElement = (function () {
        function BasicElement(id, type, dynamicGraph) {
            this._id = id;
            this.type = type;
            this.g = dynamicGraph;
        }
        BasicElement.prototype.id = function () {
            return this._id;
        };
        BasicElement.prototype.attr = function (attr) {
            return this.g.attr(attr, this._id, this.type);
        };
        BasicElement.prototype.getSelections = function () {
            return this.g.attributeArrays[this.type].selections[this._id];
        };
        BasicElement.prototype.addToSelection = function (b) {
            this.g.attributeArrays[this.type].selections[this._id].push(b);
        };
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
        BasicElement.prototype.isHighlighted = function () {
            return this.g.isHighlighted(this._id, this.type);
        };
        BasicElement.prototype.isFiltered = function () {
            return this.g.isFiltered(this._id, this.type);
        };
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
    var Time = (function (_super) {
        __extends(Time, _super);
        function Time(id, dynamicGraph) {
            _super.call(this, id, 'time', dynamicGraph);
        }
        Time.prototype.time = function () { return this.attr('momentTime'); };
        Time.prototype.moment = function () { return this.attr('momentTime'); };
        Time.prototype.label = function () { return this.attr('label'); };
        Time.prototype.unixTime = function () { return this.attr('unixTime'); };
        Time.prototype.links = function () {
            return new LinkQuery(this.attr('links'), this.g);
        };
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
    var Node = (function (_super) {
        __extends(Node, _super);
        function Node(id, graph) {
            _super.call(this, id, 'node', graph);
        }
        Node.prototype.label = function () { return '' + this.attr('label'); };
        Node.prototype.nodeType = function () { return this.attr('nodeType'); };
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
    var Link = (function (_super) {
        __extends(Link, _super);
        function Link(id, graph) {
            _super.call(this, id, 'link', graph);
        }
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
        Link.prototype.times = function () {
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
    var ScalarTimeSeries = (function () {
        function ScalarTimeSeries() {
            this.serie = {};
        }
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
        ScalarTimeSeries.prototype.set = function (t, element) {
            this.serie[t.id()] = element;
        };
        ScalarTimeSeries.prototype.get = function (t) {
            if (this.serie[t.id()] == undefined)
                return;
            return this.serie[t.id()];
        };
        ScalarTimeSeries.prototype.size = function () {
            return this.toArray().length;
        };
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
            get: function () {
                return this._elements.length;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Query.prototype.size = function () { return this._elements.length; };
        ;
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
        GraphElementQuery.prototype.generic_selected = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isSelected()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        GraphElementQuery.prototype.generic_visible = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isVisible()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        GraphElementQuery.prototype.generic_highlighted = function () {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).isHighlighted()) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
        GraphElementQuery.prototype.generic_presentIn = function (start, end) {
            var arr = [];
            for (var i = 0; i < this._elements.length; i++) {
                if (this.g.get(this.elementType, this._elements[i]).presentIn(start, end)) {
                    arr.push(this._elements[i]);
                }
            }
            return arr;
        };
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
        NodeQuery.prototype.get = function (i) { return this.g._nodes[this._elements[i]]; };
        NodeQuery.prototype.last = function () { return this.g._nodes[this._elements[this._elements.length - 1]]; };
        NodeQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodes[this._elements[i]]);
            }
            return a;
        };
        NodeQuery.prototype.createAttribute = function (attrName, f) {
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
        LinkQuery.prototype.get = function (i) { return this.g._links[this._elements[i]]; };
        LinkQuery.prototype.last = function () { return this.g._links[this._elements[this._elements.length - 1]]; };
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
        NodePairQuery.prototype.get = function (i) { return this.g._nodePairs[this._elements[i]]; };
        NodePairQuery.prototype.last = function () { return this.g._links[this._elements[this._elements.length - 1]]; };
        NodePairQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._nodePairs[this._elements[i]]);
            }
            return a;
        };
        NodePairQuery.prototype.createAttribute = function (attrName, f) {
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
            for (var i = 0; i < this._elements.length; i++) {
                links = links.concat(this.g.attr('links', this._elements[i], 'time'));
            }
            return new LinkQuery(links, this.g);
        };
        TimeQuery.prototype.get = function (i) { return this.g._times[this._elements[i]]; };
        TimeQuery.prototype.last = function () { return this.g._times[this._elements[this._elements.length - 1]]; };
        TimeQuery.prototype.toArray = function () {
            var a = [];
            var allTimes = this.g._times;
            for (var i = 0; i < this._elements.length; i++) {
                a.push(allTimes[this._elements[i]]);
            }
            return a;
        };
        TimeQuery.prototype.createAttribute = function (attrName, f) {
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
        LocationQuery.prototype.get = function (i) { return this.g._locations[this._elements[i]]; };
        LocationQuery.prototype.last = function () { return this.g._locations[this._elements[this._elements.length - 1]]; };
        LocationQuery.prototype.toArray = function () {
            var a = [];
            for (var i = 0; i < this._elements.length; i++) {
                a.push(this.g._locations[this._elements[i]]);
            }
            return a;
        };
        LocationQuery.prototype.createAttribute = function (attrName, f) {
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
var networkcube;
(function (networkcube) {
    networkcube.GRANULARITY = ['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade', 'century', 'millenium'];
    networkcube.DGRAPH_SUB = "[*dgraph*]";
    networkcube.DGRAPH_SER_VERBOSE_LOGGING = false;
    function dgraphReviver(dgraph, key, value) {
        if (value == networkcube.DGRAPH_SUB)
            return dgraph;
        else
            return value;
    }
    networkcube.dgraphReviver = dgraphReviver;
    function dgraphReplacer(key, value) {
        if (networkcube.DGRAPH_SER_VERBOSE_LOGGING) {
            console.log("dgraphReplacer", key, value);
        }
        if (value instanceof DynamicGraph) {
            console.log("dgraphReplacer found a DynamicGraph property", key);
            return networkcube.DGRAPH_SUB;
        }
        return value;
    }
    networkcube.dgraphReplacer = dgraphReplacer;
    var DynamicGraph = (function () {
        function DynamicGraph() {
            this.BOOKMARK_COLORS = d3.scale.category10();
            this.selectionColor_pointer = 0;
            this.minWeight = 10000000;
            this.maxWeight = -10000000;
            this._nodes = [];
            this._links = [];
            this._nodePairs = [];
            this._locations = [];
            this._times = [];
            this.timeObjects = [];
            this.matrix = [];
            this.nodeArrays = new NodeArray();
            this.linkArrays = new LinkArray();
            this.nodePairArrays = new NodePairArray();
            this.timeArrays = new TimeArray();
            this.linkTypeArrays = new LinkTypeArray();
            this.nodeTypeArrays = new NodeTypeArray();
            this.locationArrays = new LocationArray();
            this.attributeArrays = {
                node: this.nodeArrays,
                link: this.linkArrays,
                time: this.timeArrays,
                nodePair: this.nodePairArrays,
                linkType: this.linkTypeArrays,
                nodeType: this.nodeTypeArrays,
                location: this.locationArrays
            };
            this.highlightArrays = new networkcube.IDCompound();
            this.currentSelection_id = 0;
            this.selections = [];
            this.gran_min_NAME = "gran_min";
            this.gran_max_NAME = "gran_max_NAME";
            this.minWeight_NAME = "minWeight_NAME";
            this.maxWeight_NAME = "maxWeight_NAME";
            this.matrix_NAME = "matrix_NAME";
            this.nodeArrays_NAME = "nodeArrays_NAME";
            this.linkArrays_NAME = "linkArrays_NAME";
            this.nodePairArrays_NAME = "nodePairArrays_NAME";
            this.timeArrays_NAME = "timeArrays_NAME";
            this.linkTypeArrays_NAME = "linkTypeArrays_NAME";
            this.nodeTypeArrays_NAME = "nodeTypeArrays_NAME";
            this.locationArrays_NAME = "locationArrays_NAME";
        }
        DynamicGraph.prototype.attr = function (field, id, type) {
            var r;
            try {
                r = this.attributeArrays[type][field][id];
            }
            catch (e) {
                r = undefined;
            }
            return r;
        };
        DynamicGraph.prototype.standardArrayReplacer = function (key, value) {
            if (value instanceof DynamicGraph) {
                console.log("standardReplacer found a DynamicGraph property", key);
                return networkcube.DGRAPH_SUB;
            }
            else if (key == 'selections')
                return undefined;
            return value;
        };
        DynamicGraph.timeReviver = function (k, v, s) {
            if (k == '') {
                return networkcube.copyPropsShallow(v, new networkcube.Time(v.id, s));
            }
            else {
                return dgraphReviver(s, k, v);
            }
        };
        DynamicGraph.nodeArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new NodeArray());
                case 'outLinks':
                case 'inLinks':
                case 'links':
                    return networkcube.copyTimeSeries(v, function () { return new networkcube.ArrayTimeSeries(); });
                case 'outNeighbors':
                case 'inNeighbors':
                case 'neighbors':
                    return networkcube.copyTimeSeries(v, function () { return new networkcube.ArrayTimeSeries(); });
                case 'locations':
                    return networkcube.copyTimeSeries(v, function () { return new networkcube.ScalarTimeSeries(); });
                default:
                    return v;
            }
        };
        DynamicGraph.linkArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new LinkArray());
                case 'weights':
                    return networkcube.copyTimeSeries(v, function () { return new networkcube.ScalarTimeSeries(); });
                default:
                    return v;
            }
        };
        DynamicGraph.nodePairArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new NodePairArray());
                default:
                    return v;
            }
        };
        DynamicGraph.timeArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new TimeArray());
                case 'time':
                    var vAsArray = v;
                    return vAsArray.map(function (s, i) { return moment(s); });
                default:
                    return v;
            }
        };
        DynamicGraph.linkTypeArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new LinkTypeArray());
                default:
                    return v;
            }
        };
        DynamicGraph.nodeTypeArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new NodeTypeArray());
                default:
                    return v;
            }
        };
        DynamicGraph.locationArrayReviver = function (k, v, s) {
            switch (k) {
                case '':
                    return networkcube.copyPropsShallow(v, new LocationArray());
                default:
                    return v;
            }
        };
        DynamicGraph.prototype.loadDynamicGraph = function (dataMgr, dataSetName) {
            this.clearSelections();
            this.name = dataSetName;
            var thisGraph = this;
            this.gran_min = dataMgr.getFromStorage(this.name, this.gran_min_NAME);
            console.log('this.gran_min', this.gran_min);
            this.gran_max = dataMgr.getFromStorage(this.name, this.gran_max_NAME);
            this.minWeight = dataMgr.getFromStorage(this.name, this.minWeight_NAME);
            this.maxWeight = dataMgr.getFromStorage(this.name, this.maxWeight_NAME);
            this.matrix = dataMgr.getFromStorage(this.name, this.matrix_NAME);
            this.nodeArrays = dataMgr.getFromStorage(this.name, this.nodeArrays_NAME, DynamicGraph.nodeArrayReviver);
            this.linkArrays = dataMgr.getFromStorage(this.name, this.linkArrays_NAME, DynamicGraph.linkArrayReviver);
            this.nodePairArrays = dataMgr.getFromStorage(this.name, this.nodePairArrays_NAME, DynamicGraph.nodePairArrayReviver);
            this.timeArrays = dataMgr.getFromStorage(this.name, this.timeArrays_NAME, DynamicGraph.timeArrayReviver);
            if (!('timeArrays' in this) || !this.timeArrays) {
                console.log('No timeArrays');
                this.timeArrays = new TimeArray();
            }
            else if ('momentTime' in this.timeArrays && 'unixTime' in this.timeArrays) {
                var ta = this.timeArrays['momentTime'];
                for (var i = 0; i < ta.length; i++) {
                    ta[i] = moment.utc(this.timeArrays['unixTime'][i]);
                }
            }
            else if ('unixTime' in this.timeArrays) {
                console.log('No time in timeArrays');
                this.timeArrays['momentTime'] = this.timeArrays['unixTime'].map(moment.utc);
            }
            else {
                console.log('No time or unixTime in timeArrays');
                this.timeArrays['momentTime'] = [];
            }
            this.linkTypeArrays = dataMgr.getFromStorage(this.name, this.linkTypeArrays_NAME, DynamicGraph.linkTypeArrayReviver);
            this.nodeTypeArrays = dataMgr.getFromStorage(this.name, this.nodeTypeArrays_NAME, DynamicGraph.nodeTypeArrayReviver);
            this.locationArrays = dataMgr.getFromStorage(this.name, this.locationArrays_NAME, DynamicGraph.locationArrayReviver);
            this.attributeArrays = {
                node: this.nodeArrays,
                link: this.linkArrays,
                time: this.timeArrays,
                nodePair: this.nodePairArrays,
                linkType: this.linkTypeArrays,
                nodeType: this.nodeTypeArrays,
                location: this.locationArrays
            };
            this.createGraphObjects(true, true);
            this.createSelections(true);
        };
        DynamicGraph.prototype.saveDynamicGraph = function (dataMgr) {
            dataMgr.saveToStorage(this.name, this.gran_min_NAME, this.gran_min);
            dataMgr.saveToStorage(this.name, this.gran_max_NAME, this.gran_max);
            dataMgr.saveToStorage(this.name, this.minWeight_NAME, this.minWeight);
            dataMgr.saveToStorage(this.name, this.maxWeight_NAME, this.maxWeight);
            dataMgr.saveToStorage(this.name, this.matrix_NAME, this.matrix);
            dataMgr.saveToStorage(this.name, this.nodeArrays_NAME, this.nodeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.linkArrays_NAME, this.linkArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.nodePairArrays_NAME, this.nodePairArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.timeArrays_NAME, this.timeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.linkTypeArrays_NAME, this.linkTypeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.nodeTypeArrays_NAME, this.nodeTypeArrays, this.standardArrayReplacer);
            dataMgr.saveToStorage(this.name, this.locationArrays_NAME, this.locationArrays, this.standardArrayReplacer);
        };
        DynamicGraph.prototype.delete = function (dataMgr) {
            dataMgr.removeFromStorage(this.name, this.gran_min_NAME);
            dataMgr.removeFromStorage(this.name, this.gran_max_NAME);
            dataMgr.removeFromStorage(this.name, this.minWeight_NAME);
            dataMgr.removeFromStorage(this.name, this.maxWeight_NAME);
            dataMgr.removeFromStorage(this.name, this.matrix_NAME);
            dataMgr.removeFromStorage(this.name, this.nodeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.linkArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.nodePairArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.timeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.linkTypeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.nodeTypeArrays_NAME);
            dataMgr.removeFromStorage(this.name, this.locationArrays_NAME);
        };
        DynamicGraph.prototype.debugCompareTo = function (other) {
            var result = true;
            if (this.name != other.name) {
                console.log("name different");
                result = false;
            }
            if (this.gran_min != other.gran_min) {
                console.log("gran_min different", this.gran_min, other.gran_min);
                result = false;
            }
            if (this.gran_max != other.gran_max) {
                console.log("gran_max different", this.gran_max, other.gran_max);
                result = false;
            }
            if (this._nodes.length != other._nodes.length
                || !networkcube.compareTypesDeep(this._nodes, other._nodes, 2)) {
                console.log("nodes different");
                result = false;
            }
            if (this._links.length != other._links.length
                || !networkcube.compareTypesDeep(this._links, other._links, 2)) {
                console.log("links different");
                result = false;
            }
            if (this._nodePairs.length != other._nodePairs.length
                || !networkcube.compareTypesDeep(this._nodePairs, other._nodePairs, 2)) {
                console.log("nodePairs different");
                result = false;
            }
            if (this._locations.length != other._locations.length
                || !networkcube.compareTypesDeep(this._locations, other._locations, 2)) {
                console.log("locations different");
                result = false;
            }
            if (this._times.length != other._times.length
                || !networkcube.compareTypesDeep(this._times, other._times, 2)) {
                console.log("times different");
                result = false;
            }
            if ((this.nodeOrders && this.nodeOrders.length != other.nodeOrders.length)
                || !networkcube.compareTypesDeep(this.nodeOrders, other.nodeOrders, 2)) {
                console.log("nodeOrders different", this.nodeOrders, other.nodeOrders);
                result = false;
            }
            if (this.matrix.length != other.matrix.length
                || !networkcube.compareTypesDeep(this.matrix, other.matrix, 2)) {
                console.log("matrix different", this.matrix, other.matrix);
                result = false;
            }
            if (this.nodeArrays.length != other.nodeArrays.length
                || !networkcube.compareTypesDeep(this.nodeArrays, other.nodeArrays, 2)) {
                console.log("nodeArrays different", this.nodeArrays, other.nodeArrays);
                result = false;
            }
            if (this.linkArrays.length != other.linkArrays.length
                || !networkcube.compareTypesDeep(this.linkArrays, other.linkArrays, 2)) {
                console.log("linkArrays different", this.linkArrays, other.linkArrays);
                result = false;
            }
            if (this.nodePairArrays.length != other.nodePairArrays.length
                || !networkcube.compareTypesDeep(this.nodePairArrays, other.nodePairArrays, 2)) {
                console.log("nodePairArrays different", this.nodePairArrays, other.nodePairArrays);
                result = false;
            }
            if (this.timeArrays.length != other.timeArrays.length
                || !networkcube.compareTypesDeep(this.timeArrays, other.timeArrays, 2)) {
                console.log("timeArrays different", this.timeArrays, other.timeArrays);
                result = false;
            }
            if (this.linkTypeArrays.length != other.linkTypeArrays.length
                || !networkcube.compareTypesDeep(this.linkTypeArrays, other.linkTypeArrays, 2)) {
                console.log("linkTypeArrays different", this.linkTypeArrays, other.linkTypeArrays);
                result = false;
            }
            if (this.nodeTypeArrays.length != other.nodeTypeArrays.length
                || !networkcube.compareTypesDeep(this.nodeTypeArrays, other.nodeTypeArrays, 2)) {
                console.log("nodeTypeArrays different", this.nodeTypeArrays, other.nodeTypeArrays);
                result = false;
            }
            if (this.locationArrays.length != other.locationArrays.length
                || !networkcube.compareTypesDeep(this.locationArrays, other.locationArrays, 2)) {
                console.log("locationArrays different", this.locationArrays, other.locationArrays);
                result = false;
            }
            if (this.defaultLinkSelection.elementIds.length != other.defaultLinkSelection.elementIds.length
                || !networkcube.compareTypesDeep(this.defaultLinkSelection, other.defaultLinkSelection, 2)) {
                console.log("defaultLinkSelection different", this.defaultLinkSelection, other.defaultLinkSelection);
                result = false;
            }
            if (this.defaultNodeSelection.elementIds.length != other.defaultNodeSelection.elementIds.length
                || !networkcube.compareTypesDeep(this.defaultNodeSelection, other.defaultNodeSelection, 2)) {
                console.log("defaultNodeSelection different", this.defaultNodeSelection, other.defaultNodeSelection);
                result = false;
            }
            if (this.selections.length != other.selections.length
                || !networkcube.compareTypesDeep(this.selections, other.selections, 2)) {
                console.log("selections different", this.selections, other.selections);
                result = false;
            }
            return result;
        };
        DynamicGraph.prototype.initDynamicGraph = function (data) {
            this.clearSelections();
            this.name = data.name;
            this.gran_min = 0;
            this.gran_max = 0;
            if (networkcube.isValidIndex(data.linkSchema.time)) {
                var timeLabels = [];
                var timeLabel;
                var unixTimes = [];
                var unixTime;
                for (var i = 0; i < data.linkTable.length; i++) {
                    timeLabel = data.linkTable[i][data.linkSchema.time];
                    unixTime = parseInt(moment(timeLabel, TIME_FORMAT).format('x'));
                    if (unixTime == undefined)
                        continue;
                    if (unixTimes.indexOf(unixTime) == -1) {
                        unixTimes.push(unixTime);
                    }
                }
                unixTimes.sort(networkcube.sortNumber);
                var diff = 99999999999999;
                for (var i = 0; i < unixTimes.length - 2; i++) {
                    diff = Math.min(diff, unixTimes[i + 1] - unixTimes[i]);
                }
                var diff_min = diff;
                if (diff >= 1000)
                    this.gran_min = 1;
                if (diff >= 1000 * 60)
                    this.gran_min = 2;
                if (diff >= 1000 * 60 * 60)
                    this.gran_min = 3;
                if (diff >= 1000 * 60 * 60 * 24)
                    this.gran_min = 4;
                if (diff >= 1000 * 60 * 60 * 24 * 7)
                    this.gran_min = 5;
                if (diff >= 1000 * 60 * 60 * 24 * 30)
                    this.gran_min = 6;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12)
                    this.gran_min = 7;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 10)
                    this.gran_min = 8;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 100)
                    this.gran_min = 9;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 1000)
                    this.gran_min = 10;
                diff = unixTimes[unixTimes.length - 1] - unixTimes[0];
                this.gran_max = 0;
                if (diff >= 1000)
                    this.gran_max = 1;
                if (diff >= 1000 * 60)
                    this.gran_max = 2;
                if (diff >= 1000 * 60 * 60)
                    this.gran_max = 3;
                if (diff >= 1000 * 60 * 60 * 24)
                    this.gran_max = 4;
                if (diff >= 1000 * 60 * 60 * 24 * 7)
                    this.gran_max = 5;
                if (diff >= 1000 * 60 * 60 * 24 * 30)
                    this.gran_max = 6;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12)
                    this.gran_max = 7;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 10)
                    this.gran_max = 8;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 100)
                    this.gran_max = 9;
                if (diff >= 1000 * 60 * 60 * 24 * 30 * 12 * 1000)
                    this.gran_max = 10;
                console.log('[Dynamic Graph] Minimal granularity', networkcube.GRANULARITY[this.gran_min]);
                console.log('[Dynamic Graph] Maximal granularity', networkcube.GRANULARITY[this.gran_max]);
                for (var i = 0; i < unixTimes.length; i++) {
                    this.timeArrays.id.push(i);
                    this.timeArrays.momentTime.push(moment(unixTimes[i]));
                    this.timeArrays.label.push(this.timeArrays.momentTime[i].format(TIME_FORMAT));
                    this.timeArrays.unixTime.push(unixTimes[i]);
                    this.timeArrays.selections.push([]);
                    this.timeArrays.filter.push(false);
                    this.timeArrays.links.push([]);
                    this._times.push(new networkcube.Time(i, this));
                }
                console.log('#TIMES:', this._times.length);
                console.log('   minTime', this.timeArrays.label[0]);
                console.log('   maxTime', this.timeArrays.label[this.timeArrays.length - 1]);
                for (var g = 0; g <= networkcube.GRANULARITY.length; g++) {
                    this.timeObjects.push([]);
                }
            }
            if (this.timeArrays.length == 0) {
                this.timeArrays.id.push(0);
                this.timeArrays.momentTime.push(moment(0));
                this.timeArrays.unixTime.push(0);
                this.timeArrays.selections.push([]);
                this.timeArrays.filter.push(false);
                this.timeArrays.links.push([]);
                this._times.push(new networkcube.Time(0, this));
            }
            var id_loc;
            var location;
            console.assert(!data.locationTable || networkcube.isValidIndex(data.locationSchema.id));
            if (data.locationTable) {
                for (var i = 0; i < data.locationTable.length; i++) {
                    this.locationArrays.id.push(data.locationTable[i][data.locationSchema.id]);
                    this.locationArrays.label.push(data.locationTable[i][data.locationSchema.label]);
                    this.locationArrays.longitude.push(data.locationTable[i][data.locationSchema.longitude]);
                    this.locationArrays.latitude.push(data.locationTable[i][data.locationSchema.latitude]);
                    this.locationArrays.x.push(data.locationTable[i][data.locationSchema.x]);
                    this.locationArrays.y.push(data.locationTable[i][data.locationSchema.y]);
                    this.locationArrays.z.push(data.locationTable[i][data.locationSchema.z]);
                    this.locationArrays.radius.push(data.locationTable[i][data.locationSchema.radius]);
                }
            }
            if ('id' in this.locationArrays)
                console.log('locations', this.locationArrays.id.length);
            var row;
            var nodeId_data;
            var nodeId_table;
            var attribute;
            var time;
            console.assert(data.nodeTable.length == 0 || networkcube.isValidIndex(data.nodeSchema.id), 'either there is no nodeTable data, or we have a schema for the nodetable');
            var nodeUserProperties = [];
            for (var prop in data.nodeSchema) {
                if (data.nodeSchema.hasOwnProperty(prop)
                    && prop != 'id'
                    && prop != 'label'
                    && prop != 'time'
                    && prop != 'name'
                    && prop != 'nodeType'
                    && prop != 'location'
                    && prop != 'constructor') {
                    nodeUserProperties.push(prop);
                    this.nodeArrays[prop] = [];
                }
            }
            for (var i = 0; i < data.nodeTable.length; i++) {
                row = data.nodeTable[i];
                nodeId_data = row[data.nodeSchema.id];
                nodeId_table = this.nodeArrays.id.indexOf(nodeId_data);
                if (nodeId_table == -1) {
                    nodeId_table = this.nodeArrays.id.length;
                    this.nodeArrays.id.push(nodeId_data);
                    this.nodeArrays.nodeType.push('');
                    this.nodeArrays.outLinks.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.inLinks.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.links.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.outNeighbors.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.inNeighbors.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.neighbors.push(new networkcube.ArrayTimeSeries());
                    this.nodeArrays.selections.push([]);
                    this.nodeArrays.filter.push(false);
                    this.nodeArrays.locations.push(new networkcube.ScalarTimeSeries());
                    this.nodeArrays.attributes.push(new Object());
                    if (networkcube.isValidIndex(data.nodeSchema.label)) {
                        this.nodeArrays.label.push(row[data.nodeSchema.label]);
                    }
                    else {
                        this.nodeArrays.label.push(row[data.nodeSchema.id]);
                    }
                }
                if (networkcube.isValidIndex(data.nodeSchema.time)) {
                    timeLabel = row[data.nodeSchema.time];
                    if (timeLabel == undefined) {
                        time = this._times[0];
                    }
                    else {
                        time = this._times[this.getTimeIdForUnixTime(parseInt(moment(timeLabel, TIME_FORMAT).format('x')))];
                    }
                }
                else {
                    time = this._times[0];
                }
                if (time == undefined)
                    time = this._times[0];
                if (networkcube.isValidIndex(data.nodeSchema.location)) {
                    var locId = row[data.nodeSchema.location];
                    console.log('locId', locId);
                    if (locId == null || locId == undefined || locId == -1)
                        continue;
                    this.nodeArrays.locations[nodeId_data].set(time, locId);
                }
                if (networkcube.isValidIndex(data.nodeSchema.nodeType)) {
                    typeName = data.nodeTable[i][data.nodeSchema.nodeType];
                    typeId = this.nodeTypeArrays.name.indexOf(typeName);
                    if (typeId < 0) {
                        typeId = this.nodeTypeArrays.length;
                        this.nodeTypeArrays.id.push(typeId);
                        this.nodeTypeArrays.name.push(typeName);
                    }
                    this.nodeArrays.nodeType[nodeId_table] = typeName;
                    data.nodeTable[i][data.nodeSchema.nodeType] = typeId;
                }
                for (var p = 0; p < nodeUserProperties.length; p++) {
                    prop = nodeUserProperties[p];
                    this.nodeArrays[prop].push(row[data.nodeSchema[prop]]);
                }
            }
            if ('id' in this.nodeArrays) {
                for (var i = 0; i < this.nodeArrays.id.length; i++) {
                    this.matrix.push(networkcube.array(undefined, this.nodeArrays.id.length));
                }
            }
            var s, t;
            var id;
            var timeId;
            var nodePairId;
            var linkId;
            var typeName;
            var typeId;
            var linkUserProperties = [];
            for (var prop in data.linkSchema) {
                if (data.linkSchema.hasOwnProperty(prop)
                    && prop != 'id'
                    && prop != 'linkType'
                    && prop != 'time'
                    && prop != 'name'
                    && prop != 'source'
                    && prop != 'target'
                    && prop != 'weight'
                    && prop != 'directed') {
                    linkUserProperties.push(prop);
                    this.linkArrays[prop] = [];
                }
            }
            console.log('linkUserProperties', linkUserProperties);
            console.assert(data.linkTable.length == 0 || (networkcube.isValidIndex(data.linkSchema.id)
                && networkcube.isValidIndex(data.linkSchema.source)
                && networkcube.isValidIndex(data.linkSchema.target)), 'either there are no links, or the linkschema is defined');
            for (var i = 0; i < data.linkTable.length; i++) {
                row = data.linkTable[i];
                linkId = row[data.linkSchema.id];
                this.linkArrays.directed.push(false);
                if (this.linkArrays.id.indexOf(linkId) == -1) {
                    this.linkArrays.id[linkId] = linkId;
                    this.linkArrays.source[linkId] = row[data.linkSchema.source];
                    this.linkArrays.target[linkId] = row[data.linkSchema.target];
                    this.linkArrays.linkType[linkId] = row[data.linkSchema.linkType];
                    this.linkArrays.directed[linkId] = row[data.linkSchema.directed];
                    this.linkArrays.weights[linkId] = new networkcube.ScalarTimeSeries();
                    this.linkArrays.presence[linkId] = [];
                    this.linkArrays.selections.push([]);
                    this.linkArrays.nodePair.push(undefined);
                    this.linkArrays.filter.push(false);
                }
                var TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';
                if (networkcube.isValidIndex(data.linkSchema.time)) {
                    timeLabel = data.linkTable[i][data.linkSchema.time];
                    unixTime = parseInt(moment(timeLabel, TIME_FORMAT).format('x'));
                    timeId = this.getTimeIdForUnixTime(unixTime);
                }
                else {
                    timeId = 0;
                }
                if (timeId == undefined)
                    timeId = 0;
                time = this._times[timeId];
                this.linkArrays.presence[linkId].push(timeId);
                if (networkcube.isValidIndex(data.linkSchema.weight) && data.linkTable[i][data.linkSchema.weight] != undefined) {
                    this.linkArrays.weights[linkId].set(time, parseFloat(data.linkTable[i][data.linkSchema.weight]));
                    this.minWeight = Math.min(this.minWeight, data.linkTable[i][data.linkSchema.weight]);
                    this.maxWeight = Math.max(this.maxWeight, data.linkTable[i][data.linkSchema.weight]);
                }
                else {
                    this.minWeight = 0;
                    this.maxWeight = 1;
                    this.linkArrays.weights[linkId].set(time, 1);
                }
                s = this.nodeArrays.id.indexOf(row[data.linkSchema.source]);
                t = this.nodeArrays.id.indexOf(row[data.linkSchema.target]);
                this.nodeArrays.neighbors[s].add(time, t);
                this.nodeArrays.neighbors[t].add(time, s);
                this.nodeArrays.links[s].add(time, linkId);
                this.nodeArrays.links[t].add(time, linkId);
                if (this.linkArrays.directed[i]) {
                    this.nodeArrays.outNeighbors[s].add(time, t);
                    this.nodeArrays.inNeighbors[t].add(time, s);
                    this.nodeArrays.outLinks[s].add(time, linkId);
                    this.nodeArrays.inLinks[t].add(time, linkId);
                }
                nodePairId = this.matrix[s][t];
                if (!networkcube.isValidIndex(nodePairId)) {
                    nodePairId = this.nodePairArrays.length;
                    this.matrix[s][t] = nodePairId;
                    this.nodePairArrays.id.push(nodePairId);
                    this.nodePairArrays.source.push(s);
                    this.nodePairArrays.target.push(t);
                    this.nodePairArrays.links.push([]);
                    this.nodePairArrays.selections.push([]);
                    this.nodePairArrays.filter.push(false);
                }
                if (this.nodePairArrays.links[nodePairId].indexOf(linkId) == -1) {
                    this.nodePairArrays.links[nodePairId].push(linkId);
                    this.linkArrays.nodePair[linkId] = nodePairId;
                }
                if (this.linkArrays.directed[i]) {
                    nodePairId = this.matrix[t][s];
                    if (!nodePairId) {
                        nodePairId = this.nodePairArrays.id.length;
                        this.matrix[t][s] = nodePairId;
                        this.nodePairArrays.id.push(nodePairId);
                        this.nodePairArrays.source.push(t);
                        this.nodePairArrays.target.push(s);
                        this.nodePairArrays.links.push(networkcube.doubleArray(this._times.length));
                    }
                    if (this.nodePairArrays.links[nodePairId].indexOf(linkId) == -1) {
                        this.nodePairArrays.links[nodePairId].push(linkId);
                        this.linkArrays.nodePair[linkId] = nodePairId;
                    }
                }
                if (networkcube.isValidIndex(data.linkSchema.linkType)) {
                    typeName = data.linkTable[i][data.linkSchema.linkType];
                    typeId = this.linkTypeArrays.name.indexOf(typeName);
                    if (typeId < 0) {
                        typeId = this.linkTypeArrays.length;
                        this.linkTypeArrays.id.push(typeId);
                        this.linkTypeArrays.name.push(typeName);
                    }
                    data.linkTable[i][data.linkSchema.linkType] = typeId;
                }
                for (var p = 0; p < linkUserProperties.length; p++) {
                    prop = linkUserProperties[p];
                    this.linkArrays[prop].push(row[data.linkSchema[prop]]);
                }
            }
            for (var i = 0; i < this.linkArrays.length; i++) {
                for (var j = 0; j < this.timeArrays.length; j++) {
                    if (this.linkArrays.weights[i].serie.hasOwnProperty(this.timeArrays.id[j].toString())) {
                        this.timeArrays.links[j].push(this.linkArrays.id[i]);
                    }
                }
            }
            var linkTypeCount = this.linkTypeArrays.length;
            console.log('[Dynamic Graph] Dynamic Graph created: ', this.nodeArrays.length);
            console.log('[Dynamic Graph]    - Nodes: ', this.nodeArrays.length);
            console.log('[Dynamic Graph]    - Edges: ', this.linkArrays.length);
            console.log('[Dynamic Graph]    - Times: ', this.timeArrays.length);
            console.log('[Dynamic Graph]    - Link types: ', this.linkTypeArrays.length);
            console.log('[Dynamic Graph]    - Node Pairs: ', this.nodePairArrays.length);
            console.log('>>>this.nodeArrays["neighbors"][0]', this.nodeArrays['neighbors'][0]);
            this.createGraphObjects(true, true);
            this.createSelections(false);
        };
        DynamicGraph.prototype.createSelections = function (shouldCreateArrays) {
            if (shouldCreateArrays) {
                if (!('nodeArrays' in this && this.nodeArrays)) {
                    this.nodeArrays = new NodeArray();
                    this.linkArrays = new LinkArray();
                    this.timeArrays = new TimeArray();
                    this.nodePairArrays = new NodePairArray();
                }
                this.nodeArrays.selections = new Array(this.nodeArrays.length);
                for (var i = 0; i < this.nodeArrays.selections.length; i++) {
                    this.nodeArrays.selections[i] = [];
                }
                this.linkArrays.selections = new Array(this.linkArrays.length);
                for (var i = 0; i < this.linkArrays.selections.length; i++) {
                    this.linkArrays.selections[i] = [];
                }
                this.timeArrays.selections = new Array(this.timeArrays.length);
                for (var i = 0; i < this.timeArrays.selections.length; i++) {
                    this.timeArrays.selections[i] = [];
                }
                this.nodePairArrays.selections = new Array(this.nodePairArrays.length);
                for (var i = 0; i < this.nodePairArrays.selections.length; i++) {
                    this.nodePairArrays.selections[i] = [];
                }
            }
            this.defaultNodeSelection = this.createSelection('node');
            this.defaultNodeSelection.name = 'Unselected';
            for (var i = 0; i < this._nodes.length; i++) {
                this.defaultNodeSelection.elementIds.push(i);
                this.addToAttributeArraysSelection(this.defaultNodeSelection, 'node', this._nodes[i].id());
            }
            this.defaultNodeSelection.color = '#000000';
            this.defaultNodeSelection.showColor = false;
            this.defaultNodeSelection.priority = 10000;
            this.selectionColor_pointer--;
            this.defaultLinkSelection = this.createSelection('link');
            this.defaultLinkSelection.name = 'Unselected';
            for (var i = 0; i < this._links.length; i++) {
                this.defaultLinkSelection.elementIds.push(i);
                this.addToAttributeArraysSelection(this.defaultLinkSelection, 'link', this._links[i].id());
            }
            this.defaultLinkSelection.color = '#000000';
            this.defaultLinkSelection.showColor = false;
            this.defaultLinkSelection.priority = 10000;
            this.selectionColor_pointer--;
            var types = [];
            var type, index;
            var selection;
            var nodeSelections = [];
            for (var i = 0; i < this.nodeArrays.nodeType.length; i++) {
                type = this.nodeArrays.nodeType[i];
                if (type == undefined || type.length == 0 || type == 'undefined')
                    continue;
                index = types.indexOf(type);
                if (index == -1) {
                    selection = this.createSelection('node');
                    selection.name = type;
                    nodeSelections.push(selection);
                    types.push(type);
                }
                else {
                    selection = nodeSelections[index];
                }
                this.addElementToSelection(selection, this._nodes[i]);
            }
            if (nodeSelections.length == 1) {
                nodeSelections[0].color = '#444';
            }
            types = [];
            var linkSelections = [];
            for (var i = 0; i < this.linkArrays.linkType.length; i++) {
                type = this.linkArrays.linkType[i];
                if (!type || type == 'undefined')
                    continue;
                index = types.indexOf(type);
                if (index == -1) {
                    selection = this.createSelection('link');
                    selection.name = type;
                    linkSelections.push(selection);
                    types.push(type);
                }
                else {
                    selection = linkSelections[index];
                }
                this.addElementToSelection(selection, this._links[i]);
            }
            if (linkSelections.length == 1)
                linkSelections[0].color = '#444';
            this.currentSelection_id = 0;
        };
        DynamicGraph.prototype.createGraphObjects = function (shouldCreateTimes, shouldCreateLinkTypes) {
            console.log('[DynamicNetwork:createGraph()] >>> ');
            var d = Date.now();
            if (this.locationArrays && 'id' in this.locationArrays) {
                for (var i = 0; i < this.locationArrays.id.length; i++) {
                    this._locations.push(new networkcube.Location(this.locationArrays.id[i], this));
                }
            }
            else {
                this.locationArrays = new LocationArray();
            }
            var nodes = [];
            var locations;
            if ('nodeArrays' in this && this.nodeArrays) {
                for (var i = 0; i < this.nodeArrays.id.length; i++) {
                    nodes.push(new networkcube.Node(i, this));
                }
            }
            var links = [];
            var link;
            var source, target;
            if ('linkArrays' in this && this.linkArrays) {
                for (var i = 0; i < this.linkArrays.source.length; i++) {
                    link = new networkcube.Link(i, this);
                    links.push(link);
                }
            }
            var s, t;
            var pairLinks;
            var pair;
            var pairLinkId;
            var thisGraphNodePairIds = [];
            if ('nodePairArrays' in this && this.nodePairArrays) {
                for (var i = 0; i < this.nodePairArrays.length; i++) {
                    pairLinks = this.nodePairArrays.links[i];
                    this._nodePairs.push(new networkcube.NodePair(i, this));
                }
            }
            this._nodes = nodes;
            this._links = links;
            if (shouldCreateTimes) {
                this._times = [];
                for (var i = 0; i < this.timeArrays.length; i++)
                    this._times.push(new networkcube.Time(i, this));
            }
            console.log('[DynamicNetwork:getGraph()] <<< ', Date.now() - d, 'msec');
        };
        DynamicGraph.prototype.nodeAttr = function (attr, id) {
            return this.attr(attr, id, 'node');
        };
        DynamicGraph.prototype.linkAttr = function (attr, id) {
            return this.attr(attr, id, 'link');
        };
        DynamicGraph.prototype.pairAttr = function (attr, id) {
            return this.attr(attr, id, 'nodePair');
        };
        DynamicGraph.prototype.timeAttr = function (attr, id) {
            return this.attr(attr, id, 'time');
        };
        Object.defineProperty(DynamicGraph.prototype, "startTime", {
            get: function () { return this._times[0]; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicGraph.prototype, "endTime", {
            get: function () { return this._times[this._times.length - 1]; },
            enumerable: true,
            configurable: true
        });
        DynamicGraph.prototype.highlight = function (action, idCompound) {
            if (action == 'reset') {
                this.highlightArrays.nodeIds = [];
                this.highlightArrays.linkIds = [];
                this.highlightArrays.nodePairIds = [];
                this.highlightArrays.timeIds = [];
                return;
            }
            if (!idCompound) {
                console.error('[DynamicGraph] highlight: idCompound not set!');
                return;
            }
            if (action == 'set') {
                this.highlight('reset');
                this.highlight('add', idCompound);
                return;
            }
            if (action == 'add') {
                for (var type in idCompound) {
                    for (var i = 0; i < idCompound[type].length; i++) {
                        this.highlightArrays[type].push(idCompound[type][i]);
                    }
                }
            }
            else if (action == 'remove') {
                var index;
                for (var type in idCompound) {
                    for (var i = 0; i < idCompound[type].length; i++) {
                        index = this.highlightArrays[type].indexOf(idCompound[type][i]);
                        if (index >= 0)
                            this.highlightArrays[type].splice(index, 1);
                    }
                }
            }
        };
        DynamicGraph.prototype.selection = function (action, idCompound, selectionId) {
            if (selectionId == undefined)
                selectionId = this.currentSelection_id;
            var selection = this.getSelection(selectionId);
            if (!selection)
                console.error('[DynamicGraph] Selection with ', selectionId, 'not found in ', this.selections);
            var self = this;
            if (action == 'set') {
                var c = new networkcube.IDCompound();
                c[selection.acceptedType] = selection.elementIds;
                this.selection('remove', c, selectionId);
                this.selection('add', idCompound, selectionId);
            }
            else if (action == 'add') {
                idCompound.linkIds.forEach(function (v, i, arr) { return self.addToSelectionByTypeAndId(selection, 'link', v); });
                idCompound.nodeIds.forEach(function (v, i, arr) { return self.addToSelectionByTypeAndId(selection, 'node', v); });
                idCompound.timeIds.forEach(function (v, i, arr) { return self.addToSelectionByTypeAndId(selection, 'time', v); });
                idCompound.nodePairIds.forEach(function (v, i, arr) { return self.addToSelectionByTypeAndId(selection, 'nodePair', v); });
            }
            else if (action == 'remove') {
                idCompound.linkIds.forEach(function (v, i, arr) { return self.removeFromSelectionByTypeAndId(selection, 'link', v); });
                idCompound.nodeIds.forEach(function (v, i, arr) { return self.removeFromSelectionByTypeAndId(selection, 'node', v); });
                idCompound.timeIds.forEach(function (v, i, arr) { return self.removeFromSelectionByTypeAndId(selection, 'time', v); });
                idCompound.nodePairIds.forEach(function (v, i, arr) { return self.removeFromSelectionByTypeAndId(selection, 'nodePair', v); });
            }
        };
        DynamicGraph.prototype.addToAttributeArraysSelection = function (selection, type, id) {
            var elementSelections = this.attributeArrays[type].selections[id];
            for (var i = 0; i < elementSelections.length; i++) {
                if (elementSelections[i].priority > selection.priority) {
                    this.attributeArrays[type].selections[id].splice(i, 0, selection);
                    return;
                }
            }
            this.attributeArrays[type].selections[id].push(selection);
        };
        DynamicGraph.prototype.removeFromAttributeArraysSelection = function (selection, type, id) {
            var arr = this.attributeArrays[type].selections[id];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == selection)
                    this.attributeArrays[type].selections[id].splice(i, 1);
            }
        };
        DynamicGraph.prototype.addElementToSelection = function (selection, e) {
            this.addToSelectionByTypeAndId(selection, e.type, e.id());
        };
        DynamicGraph.prototype.addToSelectionByTypeAndId = function (selection, type, id) {
            if (type != selection.acceptedType) {
                console.log('attempting to put object of the wrong type into a selection');
                return;
            }
            selection.elementIds.push(id);
            this.addToAttributeArraysSelection(selection, type, id);
            var i;
            if (type == 'node') {
                i = this.defaultNodeSelection.elementIds.indexOf(id);
                if (i > -1) {
                    this.removeFromAttributeArraysSelection(this.defaultNodeSelection, type, id);
                    this.defaultNodeSelection.elementIds.splice(i, 1);
                }
            }
            else if (type == 'link') {
                i = this.defaultLinkSelection.elementIds.indexOf(id);
                if (i > -1) {
                    this.removeFromAttributeArraysSelection(this.defaultLinkSelection, type, id);
                    this.defaultLinkSelection.elementIds.splice(i, 1);
                }
            }
        };
        DynamicGraph.prototype.removeElementFromSelection = function (selection, e) {
            this.removeFromSelectionByTypeAndId(selection, e.type, e.id());
        };
        DynamicGraph.prototype.removeFromSelectionByTypeAndId = function (selection, type, id) {
            var i = selection.elementIds.indexOf(id);
            if (i == -1)
                return;
            selection.elementIds.splice(i, 1);
            this.removeFromAttributeArraysSelection(selection, type, id);
            if (this.getSelectionsByTypeAndId(type, id).length == 0) {
                if (type == 'node') {
                    this.defaultNodeSelection.elementIds.push(id);
                    this.addToAttributeArraysSelection(this.defaultNodeSelection, type, id);
                }
                else if (type == 'link') {
                    this.defaultLinkSelection.elementIds.push(id);
                    this.addToAttributeArraysSelection(this.defaultLinkSelection, type, id);
                }
            }
        };
        DynamicGraph.prototype.getSelectionsByTypeAndId = function (type, id) {
            return this.attributeArrays[type].selections[id];
        };
        DynamicGraph.prototype.filterSelection = function (selectionId, filter) {
            this.getSelection(selectionId).filter = filter;
        };
        DynamicGraph.prototype.isFiltered = function (id, type) {
            return this.attributeArrays[type + 's'].filter;
        };
        DynamicGraph.prototype.isHighlighted = function (id, type) {
            return this.highlightArrays[type + 'Ids'].indexOf(id) > -1;
        };
        DynamicGraph.prototype.getHighlightedIds = function (type) {
            return this.highlightArrays[type + 'Ids'];
        };
        DynamicGraph.prototype.setCurrentSelection = function (id) {
            console.log('[DynamicGraph] setCurrentSelectionId ', id);
            this.currentSelection_id = id;
        };
        DynamicGraph.prototype.getCurrentSelection = function () {
            return this.getSelection(this.currentSelection_id);
        };
        DynamicGraph.prototype.addSelection = function (id, color, acceptedType, priority) {
            var s = this.createSelection(acceptedType);
            s.id = id;
            s.color = color;
            s.priority = priority;
        };
        DynamicGraph.prototype.createSelection = function (type) {
            var s = new Selection(this.selections.length, type);
            s.color = this.BOOKMARK_COLORS(this.selectionColor_pointer % 10);
            this.selectionColor_pointer++;
            this.selections.push(s);
            return s;
        };
        DynamicGraph.prototype.deleteSelection = function (selectionId) {
            var s = this.getSelection(selectionId);
            var idCompound = new networkcube.IDCompound();
            idCompound[s.acceptedType + 'Ids'] = s.elementIds.slice(0);
            console.log('Delete selection->remove elemeents', s.elementIds.slice(0));
            this.selection('remove', idCompound, s.id);
            this.selections.splice(this.selections.indexOf(s), 1);
        };
        DynamicGraph.prototype.setSelectionColor = function (id, color) {
            var s = this.getSelection(id);
            if (!s) {
                return;
            }
            s.color = color;
        };
        DynamicGraph.prototype.getSelections = function (type) {
            var selections = [];
            if (type) {
                for (var i = 0; i < this.selections.length; i++) {
                    if (this.selections[i].acceptsType(type))
                        selections.push(this.selections[i]);
                }
                return selections;
            }
            else {
                return this.selections;
            }
        };
        DynamicGraph.prototype.getSelection = function (id) {
            for (var i = 0; i < this.selections.length; i++) {
                if (id == this.selections[i].id)
                    return this.selections[i];
            }
            console.error('[DynamicGraph] No selection with id ', id, 'found!');
        };
        DynamicGraph.prototype.clearSelections = function () {
            this.selections = [];
        };
        DynamicGraph.prototype.getTimeIdForUnixTime = function (unixTime) {
            var timeId;
            for (timeId = 0; timeId < this.timeArrays.length; timeId++) {
                if (unixTime == this.timeArrays.unixTime[timeId]) {
                    timeId;
                    return timeId;
                }
            }
            return undefined;
        };
        DynamicGraph.prototype.addNodeOrdering = function (name, order) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    console.error('Ordering', name, 'already exists');
                    return;
                }
            }
            var o = new Ordering(name, order);
            this.nodeOrders.push(o);
        };
        DynamicGraph.prototype.setNodeOrdering = function (name, order) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    this.nodeOrders[i].order = order;
                    return;
                }
            }
            console.error('Ordering', name, 'does not exist');
        };
        DynamicGraph.prototype.removeNodeOrdering = function (name, order) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    this.nodeOrders.splice(i, 1);
                }
            }
        };
        DynamicGraph.prototype.getNodeOrder = function (name) {
            for (var i = 0; i < this.nodeOrders.length; i++) {
                if (this.nodeOrders[i].name == name) {
                    return this.nodeOrders[i];
                }
            }
            console.error('Ordering', name, 'not found!');
            return;
        };
        DynamicGraph.prototype.nodes = function () {
            return new networkcube.NodeQuery(this.nodeArrays.id, this);
        };
        DynamicGraph.prototype.links = function () {
            return new networkcube.LinkQuery(this.linkArrays.id, this);
        };
        DynamicGraph.prototype.times = function () {
            return new networkcube.TimeQuery(this.timeArrays.id, this);
        };
        DynamicGraph.prototype.locations = function () {
            return new networkcube.LocationQuery(this.locationArrays.id, this);
        };
        DynamicGraph.prototype.nodePairs = function () {
            return new networkcube.NodePairQuery(this.nodePairArrays.id, this);
        };
        DynamicGraph.prototype.linksBetween = function (n1, n2) {
            var nodePairId = this.matrix[n1.id()][n2.id()];
            if (nodePairId == undefined)
                nodePairId = this.matrix[n2.id()][n1.id()];
            if (nodePairId == undefined)
                return new networkcube.LinkQuery([], this);
            return new networkcube.LinkQuery(this.nodePair(nodePairId).links().toArray(), this);
        };
        DynamicGraph.prototype.get = function (type, id) {
            if (type.indexOf('nodePair') > -1)
                return this.nodePair(id);
            if (type.indexOf('node') > -1)
                return this.node(id);
            if (type.indexOf('link') > -1)
                return this.link(id);
            if (type.indexOf('time') > -1)
                return this.time(id);
            if (type.indexOf('locations') > -1)
                return this.location(id);
        };
        DynamicGraph.prototype.getAll = function (type) {
            if (type == 'nodes')
                return this.nodes();
            if (type == 'links')
                return this.links();
            if (type == 'times')
                return this.times();
            if (type == 'nodePairs')
                return this.nodePairs();
            if (type == 'locations')
                return this.locations();
        };
        DynamicGraph.prototype.node = function (id) {
            for (var i = 0; i < this._nodes.length; i++) {
                if (this._nodes[i].id() == id)
                    return this._nodes[i];
            }
        };
        DynamicGraph.prototype.link = function (id) {
            for (var i = 0; i < this._links.length; i++) {
                if (this._links[i].id() == id)
                    return this._links[i];
            }
        };
        DynamicGraph.prototype.time = function (id) {
            for (var i = 0; i < this._times.length; i++) {
                if (this._times[i].id() == id)
                    return this._times[i];
            }
        };
        DynamicGraph.prototype.location = function (id) {
            for (var i = 0; i < this._locations.length; i++) {
                if (this._locations[i].id() == id)
                    return this._locations[i];
            }
        };
        DynamicGraph.prototype.nodePair = function (id) {
            for (var i = 0; i < this._nodePairs.length; i++) {
                if (this._nodePairs[i].id() == id)
                    return this._nodePairs[i];
            }
        };
        DynamicGraph.prototype.getMinGranularity = function () { return this.gran_min; };
        DynamicGraph.prototype.getMaxGranularity = function () { return this.gran_max; };
        return DynamicGraph;
    })();
    networkcube.DynamicGraph = DynamicGraph;
    var Selection = (function () {
        function Selection(id, acceptedType) {
            this.showColor = true;
            this.filter = false;
            this.priority = 0;
            this.id = id;
            this.name = 'Selection-' + this.id;
            this.elementIds = [];
            this.acceptedType = acceptedType;
            this.priority = id;
        }
        Selection.prototype.acceptsType = function (type) {
            return this.acceptedType == type;
        };
        return Selection;
    })();
    networkcube.Selection = Selection;
    var AttributeArray = (function () {
        function AttributeArray() {
            this.id = [];
        }
        Object.defineProperty(AttributeArray.prototype, "length", {
            get: function () {
                return this.id.length;
            },
            enumerable: true,
            configurable: true
        });
        return AttributeArray;
    })();
    networkcube.AttributeArray = AttributeArray;
    var NodeArray = (function (_super) {
        __extends(NodeArray, _super);
        function NodeArray() {
            _super.apply(this, arguments);
            this.id = [];
            this.label = [];
            this.outLinks = [];
            this.inLinks = [];
            this.links = [];
            this.outNeighbors = [];
            this.inNeighbors = [];
            this.neighbors = [];
            this.selections = [];
            this.attributes = [];
            this.locations = [];
            this.filter = [];
            this.nodeType = [];
        }
        return NodeArray;
    })(AttributeArray);
    networkcube.NodeArray = NodeArray;
    var LinkArray = (function (_super) {
        __extends(LinkArray, _super);
        function LinkArray() {
            _super.apply(this, arguments);
            this.source = [];
            this.target = [];
            this.linkType = [];
            this.directed = [];
            this.nodePair = [];
            this.presence = [];
            this.weights = [];
            this.selections = [];
            this.filter = [];
            this.attributes = new Object;
        }
        return LinkArray;
    })(AttributeArray);
    networkcube.LinkArray = LinkArray;
    var NodePairArray = (function (_super) {
        __extends(NodePairArray, _super);
        function NodePairArray() {
            _super.apply(this, arguments);
            this.source = [];
            this.target = [];
            this.links = [];
            this.selections = [];
            this.filter = [];
        }
        return NodePairArray;
    })(AttributeArray);
    networkcube.NodePairArray = NodePairArray;
    var TimeArray = (function (_super) {
        __extends(TimeArray, _super);
        function TimeArray() {
            _super.apply(this, arguments);
            this.id = [];
            this.momentTime = [];
            this.label = [];
            this.unixTime = [];
            this.selections = [];
            this.filter = [];
            this.links = [];
        }
        return TimeArray;
    })(AttributeArray);
    networkcube.TimeArray = TimeArray;
    var LinkTypeArray = (function (_super) {
        __extends(LinkTypeArray, _super);
        function LinkTypeArray() {
            _super.apply(this, arguments);
            this.name = [];
            this.count = [];
            this.color = [];
            this.filter = [];
        }
        return LinkTypeArray;
    })(AttributeArray);
    networkcube.LinkTypeArray = LinkTypeArray;
    var NodeTypeArray = (function (_super) {
        __extends(NodeTypeArray, _super);
        function NodeTypeArray() {
            _super.apply(this, arguments);
            this.name = [];
            this.count = [];
            this.color = [];
            this.filter = [];
        }
        return NodeTypeArray;
    })(AttributeArray);
    networkcube.NodeTypeArray = NodeTypeArray;
    var LocationArray = (function (_super) {
        __extends(LocationArray, _super);
        function LocationArray() {
            _super.apply(this, arguments);
            this.id = [];
            this.label = [];
            this.longitude = [];
            this.latitude = [];
            this.x = [];
            this.y = [];
            this.z = [];
            this.radius = [];
        }
        return LocationArray;
    })(AttributeArray);
    networkcube.LocationArray = LocationArray;
    var LinkType = (function () {
        function LinkType(id, name, color) {
            this.id = id;
            this.name = name;
            this.color = color;
        }
        return LinkType;
    })();
    networkcube.LinkType = LinkType;
    var NodeType = (function () {
        function NodeType(id, name, color) {
            this.id = id;
            this.name = name;
            this.color = color;
        }
        return NodeType;
    })();
    networkcube.NodeType = NodeType;
    var Ordering = (function () {
        function Ordering(name, order) {
            this.order = [];
            this.name = name;
            this.order = order;
        }
        return Ordering;
    })();
    networkcube.Ordering = Ordering;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    var DataManager = (function () {
        function DataManager(options) {
            this.keepOnlyOneSession = false;
            this.sessionDataPrefix = "ncubesession";
            this.SEP = "_";
            if (options) {
                if (options.keepOnlyOneSession)
                    this.setOptions(options);
            }
            else {
                this.keepOnlyOneSession = false;
            }
        }
        DataManager.prototype.setOptions = function (options) {
            this.keepOnlyOneSession = options.keepOnlyOneSession;
        };
        DataManager.prototype.clearSessionData = function (session) {
            var searchPrefix = this.sessionDataPrefix + this.SEP + session;
            var keysToClear = [];
            console.log('clearSessionData');
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(searchPrefix) == 0)
                    keysToClear.push(key);
                else if (key.indexOf('connectoscope1') == 0)
                    keysToClear.push(key);
            }
            for (var i = 0; i < keysToClear.length; i++) {
                var key = keysToClear[i];
                console.log('remove from storage', key);
                localStorage.removeItem(key);
            }
        };
        DataManager.prototype.clearAllSessionData = function () {
            this.clearSessionData('');
        };
        DataManager.prototype.isSessionCached = function (session, dataSetName) {
            var prefix = this.sessionDataPrefix + this.SEP + session + this.SEP + dataSetName;
            var firstSessionKey = null;
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf(prefix) == 0) {
                    return true;
                }
            }
            return false;
        };
        DataManager.prototype.importData = function (session, data) {
            this.session = session;
            if (!data.nodeTable && !data.linkTable) {
                console.log('Empty tables. No data imported.');
                return;
            }
            if (!data.nodeTable) {
                console.log('[n3] Node table missing!');
            }
            if (!data.linkTable) {
                console.log('[n3] Link table missing!');
            }
            if (!data.nodeSchema) {
                console.log('[n3] Node schema missing!');
            }
            if (!data.linkSchema) {
                console.log('[n3] Link schema missing!');
            }
            for (var i = 0; i < data.nodeTable.length; i++) {
                for (var j = 0; j < data.nodeTable[i].length; j++) {
                    if (typeof data.nodeTable[i][j] == 'string')
                        data.nodeTable[i][j] = data.nodeTable[i][j].trim();
                }
            }
            for (var i = 0; i < data.linkTable.length; i++) {
                for (var j = 0; j < data.linkTable[i].length; j++) {
                    if (typeof data.linkTable[i][j] == 'string')
                        data.linkTable[i][j] = data.linkTable[i][j].trim();
                }
            }
            if (this.isSchemaWellDefined(data)) {
                console.log('data is well-schematized, caching dynamicGraph');
                if (this.keepOnlyOneSession)
                    this.clearAllSessionData();
                var graphForCaching = new networkcube.DynamicGraph();
                graphForCaching.initDynamicGraph(data);
                graphForCaching.saveDynamicGraph(this);
                var doubleCheckSave = false;
                if (doubleCheckSave) {
                    var testGraph = new networkcube.DynamicGraph();
                    testGraph.loadDynamicGraph(this, data.name);
                    testGraph.debugCompareTo(graphForCaching);
                }
            }
            else {
                console.log('data is not well-schematized, so not caching dynamicGraph');
            }
        };
        DataManager.prototype.saveToStorage = function (dataName, valueName, value, replacer) {
            if (value == undefined) {
                console.log('attempting to save undefined value. aborting', dataName, valueName);
                return;
            }
            var stringifyResult = JSON.stringify(value, replacer);
            var stringToSave;
            if (stringifyResult.length > 1024 * 1024 * 4)
                stringToSave = LZString.compress(stringifyResult);
            else
                stringToSave = stringifyResult;
            localStorage[this.sessionDataPrefix + this.SEP
                + this.session
                + this.SEP + dataName
                + this.SEP + valueName] = stringToSave;
        };
        DataManager.prototype.getFromStorage = function (dataName, valueName, reviver, state) {
            console.assert(this.session && this.session != '');
            var statefulReviver;
            if (reviver)
                statefulReviver = function (key, value) {
                    return reviver(key, value, state);
                };
            else
                statefulReviver = null;
            var storedResult = localStorage[this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName];
            if (storedResult && storedResult != "undefined") {
                var parseText;
                if ("\"'[{0123456789".indexOf(storedResult[0]) >= 0)
                    parseText = storedResult;
                else
                    parseText = LZString.decompress(storedResult);
                return JSON.parse(parseText, statefulReviver);
            }
            else {
                return undefined;
            }
        };
        DataManager.prototype.removeFromStorage = function (dataName, valueName) {
            localStorage.removeItem(this.sessionDataPrefix
                + this.SEP + this.session
                + this.SEP + dataName
                + this.SEP + valueName);
        };
        DataManager.prototype.getGraph = function (session, dataname) {
            this.session = session;
            if (!this.dynamicGraph || this.dynamicGraph.name != dataname) {
                this.dynamicGraph = new networkcube.DynamicGraph();
                this.dynamicGraph.loadDynamicGraph(this, dataname);
            }
            return this.dynamicGraph;
        };
        DataManager.prototype.isSchemaWellDefined = function (data) {
            console.log('isSchemaWellDefined');
            if (data.locationTable && !networkcube.isValidIndex(data.locationSchema.id))
                return false;
            if (data.nodeTable.length > 0 && !networkcube.isValidIndex(data.nodeSchema.id))
                return false;
            if (data.linkTable.length > 0
                && !(networkcube.isValidIndex(data.linkSchema.id)
                    && networkcube.isValidIndex(data.linkSchema.source)
                    && networkcube.isValidIndex(data.linkSchema.target)))
                return false;
            return true;
        };
        return DataManager;
    })();
    networkcube.DataManager = DataManager;
    function getDefaultNodeSchema() {
        return new NodeSchema(0);
    }
    networkcube.getDefaultNodeSchema = getDefaultNodeSchema;
    function getDefaultLinkSchema() {
        return new LinkSchema(0, 1, 2);
    }
    networkcube.getDefaultLinkSchema = getDefaultLinkSchema;
    function getDefaultLocationSchema() {
        return new LocationSchema(0, 1, 2, 3, 4);
    }
    networkcube.getDefaultLocationSchema = getDefaultLocationSchema;
    var DataSet = (function () {
        function DataSet(params) {
            this.locationTable = [];
            this.selections = [];
            if (params == undefined)
                return;
            this.name = params.name;
            this.nodeTable = params.nodeTable;
            this.linkTable = params.linkTable;
            if (params.nodeSchema == undefined)
                this.nodeSchema = getDefaultNodeSchema();
            else
                this.nodeSchema = params.nodeSchema;
            if (params.linkSchema == undefined)
                this.linkSchema = getDefaultLinkSchema();
            else
                this.linkSchema = params.linkSchema;
            if (params.locationTable != undefined)
                this.locationTable = params.locationTable;
            if (params.locationSchema == undefined)
                this.locationSchema = getDefaultLocationSchema();
            else
                this.locationSchema = params.locationSchema;
            console.log('[n3] data set created', this);
        }
        return DataSet;
    })();
    networkcube.DataSet = DataSet;
    var TableSchema = (function () {
        function TableSchema(name) {
            this.name = name;
        }
        return TableSchema;
    })();
    networkcube.TableSchema = TableSchema;
    var NodeSchema = (function (_super) {
        __extends(NodeSchema, _super);
        function NodeSchema(id) {
            _super.call(this, 'nodeSchema');
            this.id = id;
        }
        return NodeSchema;
    })(TableSchema);
    networkcube.NodeSchema = NodeSchema;
    var LinkSchema = (function (_super) {
        __extends(LinkSchema, _super);
        function LinkSchema(id, source, target) {
            _super.call(this, 'linkSchema');
            this.linkType = -1;
            this.directed = -1;
            this.time = -1;
            this.source = source;
            this.target = target;
            this.id = id;
        }
        return LinkSchema;
    })(TableSchema);
    networkcube.LinkSchema = LinkSchema;
    var LocationSchema = (function (_super) {
        __extends(LocationSchema, _super);
        function LocationSchema(id, label, geoname, longitude, latitude, x, y, z, radius) {
            _super.call(this, 'locationSchema');
            this.geoname = -1;
            this.longitude = -1;
            this.latitude = -1;
            this.x = -1;
            this.y = -1;
            this.z = -1;
            this.radius = -1;
            this.id = id;
            this.label = label;
            if (networkcube.isValidIndex(geoname))
                this.geoname = geoname;
            if (networkcube.isValidIndex(longitude))
                this.longitude = longitude;
            if (networkcube.isValidIndex(latitude))
                this.latitude = latitude;
            if (networkcube.isValidIndex(x))
                this.x = x;
            if (networkcube.isValidIndex(y))
                this.y = y;
            if (networkcube.isValidIndex(z))
                this.z = z;
            if (networkcube.isValidIndex(radius))
                this.radius = radius;
        }
        return LocationSchema;
    })(TableSchema);
    networkcube.LocationSchema = LocationSchema;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    function findTemplate(nodes, template, config) {
        var nodeCount = template.nodes.length;
        var linkCount = template.links.length;
        var n;
        var links;
        var candidateNodes = [];
        for (var i = 0; i < nodes.length; i++) {
            links = nodes[i].links().toArray();
            for (var j = 0; j < nodeCount; j++) {
                for (var k = 0; k < linkCount; k++) {
                    if (template.links[k][0] == template.nodes[j])
                        for (var l = 0; l < linkCount; l++) {
                        }
                }
            }
        }
    }
    networkcube.findTemplate = findTemplate;
    function findClusters(nodes, config) {
        if (nodes.length == 0)
            return [];
        var g = nodes[0].g;
        var links = nodes[0].g.links().toArray();
        for (var i = 0; i < links.length; i++) {
            links[i].value = links[i].weights().sum();
        }
        var clusters = netClustering.cluster(nodes, links);
        var motifs = [];
        var clusterArray = [];
        var clusterLinks = [];
        var cl;
        var s, t;
        for (var c = 0; c < clusters.length; c++) {
            clusterLinks = [];
            cl = clusters[c];
            if (cl.length < 4)
                continue;
            for (var j = 0; j < cl.length; j++) {
                cl[j] = g.node(parseInt(cl[j]));
            }
            for (var i = 0; i < cl.length; i++) {
                for (var j = i + 1; j < cl.length; j++) {
                    clusterLinks = clusterLinks.concat(cl[i].linksBetween(cl[j]).toArray());
                }
            }
            motifs.push({ nodes: cl, links: clusterLinks });
        }
        return motifs;
    }
    networkcube.findClusters = findClusters;
    function findCliques(nodes, config) {
        var cliques = [];
        var p = nodes.slice();
        var r = [];
        var x = [];
        if (!config)
            var config = {};
        if (config.links == undefined)
            config.links = nodes[0].g.links().toArray();
        cliques = bronKerboschIterative(nodes, config);
        var motifs = [];
        var cliqueLinks = [];
        for (var c = 0; c < cliques.length; c++) {
            if (cliques[c].length < 4)
                continue;
            cliqueLinks = [];
            for (var i = 0; i < cliques[c].length; i++) {
                for (var j = i + 1; j < cliques[c].length; j++) {
                    cliqueLinks.push(cliques[c][i].linksBetween(cliques[c][j]).get(0));
                }
            }
            motifs.push({ nodes: cliques[c], links: cliqueLinks });
        }
        return motifs;
    }
    networkcube.findCliques = findCliques;
    ;
    function bronKerbosch(nodes, r, p, x, cliques, config) {
        if (p.length === 0 && x.length === 0) {
            cliques.push(r);
            return;
        }
        p.forEach(function (v) {
            var tempR = r.splice(0);
            tempR.push(v);
            bronKerbosch(nodes, tempR, p.filter(function (temp) {
                return v.neighbors().contains(temp);
            }), x.filter(function (temp) {
                return v.neighbors().contains(temp);
            }), cliques, config);
            p.splice(p.indexOf(v), 1);
            if (x.indexOf(v) == -1)
                x.push(v);
        });
    }
    function bronKerboschIterative(nodes, config) {
        var cliques = [];
        var stack = [];
        var R = 0;
        var P = 1;
        var X = 2;
        stack.push([[], nodes, []]);
        var r, p, x, p2, x2;
        var step;
        var newStep;
        var v;
        var count = 0;
        while (stack.length > 0) {
            count++;
            step = stack.pop();
            r = [].concat(step[R]);
            p = [].concat(step[P]);
            x = [].concat(step[X]);
            if (p.length == 0
                && x.length == 0) {
                cliques.push(r.slice());
            }
            if (p.length > 0) {
                v = p[0];
                p2 = p.slice();
                p2.splice(p2.indexOf(v), 1);
                x2 = x.slice();
                if (x2.indexOf(v) == -1)
                    x2.push(v);
                stack.push([r.slice(), p2, x2]);
                if (r.indexOf(v) == -1)
                    r.push(v);
                newStep = [r];
                p = setOps.intersection(p2, v.neighbors().toArray());
                p2 = [];
                for (var i = 0; i < p.length; i++) {
                    if (p2.indexOf(p[i]) == -1)
                        p2.push(p[i]);
                }
                newStep.push(p2);
                x = setOps.intersection(x2, v.neighbors().toArray());
                x2 = [];
                for (var i = 0; i < x.length; i++) {
                    if (x2.indexOf(x[i]) == -1)
                        x2.push(x[i]);
                }
                newStep.push(x2);
                stack.push(newStep);
            }
        }
        return cliques;
    }
    function findFullEgoNetwork(nodes, config) {
        var motifs = [];
        var ns;
        var ls;
        var finalLinks;
        var n;
        for (var i = 0; i < nodes.length; i++) {
            n = nodes[i];
            finalLinks = [];
            ns = n.neighbors().removeDuplicates();
            ls = ns.links().removeDuplicates().toArray();
            ns = ns.toArray().concat(n);
            for (var j = 0; j < ls.length; j++) {
                if (ls[j] == undefined)
                    continue;
                if (ns.indexOf(ls[j].source) > -1 && ns.indexOf(ls[j].target) > -1) {
                    finalLinks.push(ls[j]);
                }
            }
            motifs.push(new networkcube.Motif(ns, finalLinks));
        }
        return motifs;
    }
    networkcube.findFullEgoNetwork = findFullEgoNetwork;
    function findStars(nodes, config) {
        if (!config)
            var config = {};
        if (config.minLinkCount == undefined)
            config.minLinkCount = 5;
        if (config.minNeighborCount == undefined) {
            config.minNeighborCount = 5;
            config.minLinkCount = 5;
        }
        if (config.links == undefined)
            config.links = nodes[0].g.links().toArray();
        var motifs = [];
        var n;
        var lls;
        var m;
        var neighbors;
        for (var i = 0; i < nodes.length; i++) {
            n = nodes[i];
            lls = n.links().toArray();
            lls = setOps.intersection(lls, config.links);
            if (lls.length <= config.minLinkCount)
                continue;
            neighbors = [];
            for (var j = 0; j < lls.length; j++) {
                if (neighbors.indexOf(lls[j].other(n)) == -1)
                    neighbors.push(lls[j].other(n));
            }
            if (neighbors.length <= config.minNeighborCount)
                continue;
            m = new networkcube.Motif([n], []);
            for (var j = 0; j < lls.length; j++) {
                m.links.push(lls[j]);
                m.nodes.push(lls[j].other(n));
            }
            motifs.push(m);
        }
        return motifs;
    }
    networkcube.findStars = findStars;
    function findTriangles(nodes, config) {
        if (!config)
            var config = {};
        if (config.links == undefined)
            config.links = nodes[0].g.links().toArray();
        var motifs = [];
        var g = nodes[0].g;
        var l;
        var s, t;
        var ns, nt;
        var common;
        var n;
        var ll1, ll2;
        var found;
        var m;
        for (var i = 0; i < config.links.length; i++) {
            s = config.links[i].source;
            ns = s.neighbors().toArray();
            ns = setOps.intersection(ns, nodes);
            if (ns.length == 0)
                continue;
            t = config.links[i].target;
            nt = t.neighbors().toArray();
            nt = setOps.intersection(nt, nodes);
            if (nt.length == 0)
                continue;
            common = setOps.intersection(ns, nt);
            common = setOps.difference(common, [s, t]);
            if (common.length == 0)
                continue;
            for (var j = 0; j < common.length; j++) {
                n = common[j];
                ll1 = setOps.intersection(g.linksBetween(s, n).toArray(), config.links);
                if (ll1.length == 0)
                    continue;
                ll2 = setOps.intersection(g.linksBetween(t, n).toArray(), config.links);
                if (ll2.length == 0)
                    continue;
                ll1 = ll1.concat(ll2);
                ll1.push(config.links[i]);
                motifs.push(new networkcube.Motif([s, t, n], ll1));
            }
        }
        return motifs;
    }
    networkcube.findTriangles = findTriangles;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    function findDegree(nodes) {
        var motifs = [];
        var ns;
        var ls;
        var finalLinks;
        var n;
        for (var i = 0; i < nodes.length; i++) {
            n = nodes[i];
            ns = n.neighbors().removeDuplicates().toArray().concat(n);
            ls = n.links().removeDuplicates().toArray();
            motifs.push(new networkcube.Motif(ns, ls));
        }
        return motifs;
    }
    networkcube.findDegree = findDegree;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    function loadDyson(url, callback) {
        d3.json(url, function (data) {
            var nodeTable = [];
            var nodeSchema = { id: 0, label: 1 };
            var nodes = data.nodes;
            for (var i = 0; i < nodes.length; i++) {
                nodeTable.push([i, nodes[i].name]);
            }
            var linkTable = [];
            var linkSchema = { id: 0, source: 1, target: 2, weight: 3, time: 4 };
            var times = data.times;
            var m;
            for (var i = 0; i < times.length; i++) {
                m = times[i].matrix;
                for (var s = 0; s < m.length; s++) {
                    for (var t = 0; t < m.length; t++) {
                        linkTable.push([s * m.length + t, s, t, m[s][t], i]);
                    }
                }
            }
            callback(new networkcube.DataSet({
                nodeTable: nodeTable,
                linkTable: linkTable,
                linkSchema: linkSchema,
                nodeSchema: nodeSchema,
                name: url
            }));
        });
    }
    networkcube.loadDyson = loadDyson;
    function loadLinkTable(url, callBack, linkSchema, delimiter, timeFormat) {
        if (timeFormat == undefined)
            timeFormat = 'x';
        console.log('linkSchema', linkSchema);
        if (linkSchema.source == undefined) {
            console.error('[n3] Link Schema does not have -source- attribute. Import aborted.');
            return;
        }
        if (linkSchema.target == undefined) {
            console.error('[n3] Link Schema does not have -target- attribute. Import aborted.');
            return;
        }
        $.get(url, function (linkData) {
            var linkData = Papa.parse(linkData, {}).data;
            var nodeTable = [];
            var names = [];
            var nodeTimes = [];
            var nodeSchema = new networkcube.NodeSchema(0);
            nodeSchema.label = 1;
            var id_source;
            var id_target;
            var name;
            var linkTable = [];
            var newLinkSchema = new networkcube.LinkSchema(0, 1, 2);
            var colCount = 3;
            for (var prop in linkSchema) {
                if (prop != 'source' && prop != 'target')
                    newLinkSchema[prop] = colCount++;
            }
            linkData.shift();
            var linkRow;
            for (var i = 0; i < linkData.length; i++) {
                if (linkData[i].length == 0 || linkData[i][0].length == 0) {
                    continue;
                }
                linkRow = new Array(colCount);
                if (linkSchema.id == undefined)
                    linkRow[0] = linkTable.length;
                else
                    linkRow[0] = linkData[i][linkSchema.id];
                for (var j = 0; j < linkData[i].length; j++) {
                    linkData[i][j] = linkData[i][j].trim();
                }
                name = linkData[i][linkSchema.source];
                if (names.indexOf(name) == -1) {
                    names.push(name);
                }
                id_source = names.indexOf(name);
                name = linkData[i][linkSchema.target];
                if (names.indexOf(name) == -1) {
                    names.push(name);
                }
                id_target = names.indexOf(name);
                linkRow[newLinkSchema.source] = id_source;
                linkRow[newLinkSchema.target] = id_target;
                if (linkSchema.weight != undefined) {
                    linkRow[newLinkSchema.weight] = Number(linkData[i][linkSchema.weight]);
                }
                if (linkSchema.time != undefined) {
                    linkRow[newLinkSchema.time] = moment(linkData[i][linkSchema.time], timeFormat).format(networkcube.timeFormat());
                }
                for (var prop in linkSchema) {
                    if (prop != 'source' && prop != 'target' && prop != 'time' && prop != 'weight') {
                        linkRow[newLinkSchema[prop]] = linkData[i][linkSchema[prop]];
                    }
                }
                linkTable.push(linkRow);
            }
            for (var i = 0; i < names.length; i++) {
                nodeTable.push([i, names[i]]);
            }
            var dataSet = new networkcube.DataSet({
                nodeTable: nodeTable,
                linkTable: linkTable,
                linkSchema: newLinkSchema,
                nodeSchema: nodeSchema,
                name: url
            });
            if (linkSchema.time != undefined) {
                dataSet.timeFormat = networkcube.timeFormat();
            }
            callBack(dataSet);
        }, 'text');
    }
    networkcube.loadLinkTable = loadLinkTable;
    function loadXML(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        d3.xml(url, "application/xml", function (data) {
            console.log('data:', data);
            var nodes = data.documentElement.getElementsByTagName("node");
            var nodeTable = [];
            var nodeIds = [];
            var nodeSchema = { id: 0, label: 1, nodeType: 2 };
            for (var i = 0; i < nodes.length; i++) {
                nodeTable.push([nodeTable.length, nodes[i].getAttribute('name'), nodes[i].getAttribute('type')]);
                nodeIds.push(nodes[i].id);
            }
            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = new networkcube.LinkSchema(0, 1, 2);
            var links = data.documentElement.getElementsByTagName("edge");
            var s, t;
            var sPrev, tPrev;
            for (var i = 0; i < links.length; i++) {
                s = nodeIds.indexOf(links[i].getAttribute('source'));
                t = nodeIds.indexOf(links[i].getAttribute('through'));
                if (sPrev == s && tPrev == t) {
                    continue;
                }
                sPrev = s;
                tPrev = t;
                linkTable.push([linkTable.length, s, t]);
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadXML = loadXML;
    function loadJson(url, callBack, dataName) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        d3.json(url, function (data) {
            if (!data)
                return;
            var links = data.links;
            if (!links)
                links = data.edges;
            if (!links)
                links = data.connections;
            if (!links)
                links = data.relations;
            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = { id: 0, source: 1, target: 2, weight: 3 };
            var weight;
            var linkUserProps = [];
            var prop;
            for (var i = 0; i < links.length; i++) {
                link = links[i];
                for (prop in link) {
                    if (link.hasOwnProperty(prop)
                        && prop != 'id'
                        && prop != 'linkType'
                        && prop != 'time'
                        && prop != 'name'
                        && prop != 'source'
                        && prop != 'target'
                        && prop != 'weight'
                        && prop != 'directed') {
                        if (linkSchema[prop] == undefined) {
                            linkUserProps.push(prop);
                            linkSchema[prop] = 3 + linkUserProps.length;
                        }
                    }
                }
            }
            for (var i = 0; i < links.length; i++) {
                link = links[i];
                weight = 1;
                if (link.weight != undefined)
                    weight = link.weight;
                line = [i, link.source, link.target, weight];
                for (var p = 0; p < linkUserProps.length; p++) {
                    prop = linkUserProps[p];
                    if (link[prop] == undefined) {
                        line.push(undefined);
                    }
                    else {
                        line.push(link[prop]);
                    }
                }
                linkTable.push(line);
            }
            var nodes = data.nodes;
            if (!nodes)
                nodes = data.vertices;
            var node;
            var nodeTable = [];
            var locationTable = [];
            var locationSchema = { id: 0, longitude: 1, latitude: 2 };
            var locationEntry = [];
            var nodeSchema = { id: 0, label: 1 };
            var nodeUserProperties = [];
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                for (prop in node) {
                    if (node.hasOwnProperty(prop)
                        && prop != 'id'
                        && prop != 'label'
                        && prop != 'time'
                        && prop != 'name'
                        && prop != 'nodeType'
                        && prop != 'location'
                        && prop != 'constructor') {
                        if (nodeSchema[prop] == undefined) {
                            console.log('node user-prop found', prop);
                            nodeUserProperties.push(prop);
                            nodeSchema[prop] = 1 + nodeUserProperties.length;
                        }
                    }
                }
            }
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                line = [i];
                if (node.name) {
                    line.push(node.name);
                }
                else if (node.label) {
                    line.push(node.label);
                }
                else {
                    line.push('' + i);
                }
                for (var p = 0; p < nodeUserProperties.length; p++) {
                    prop = nodeUserProperties[p];
                    if (node[prop] == undefined) {
                        line.push(undefined);
                    }
                    else {
                        line.push(node[prop]);
                    }
                }
                nodeTable.push(line);
            }
            if (dataName == undefined)
                dataName = url.split('=')[0];
            callBack(new networkcube.DataSet({
                name: dataName,
                nodeTable: nodeTable,
                locationTable: locationTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                locationSchema: locationSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadJson = loadJson;
    function loadJsonList(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        d3.json(url, function (data) {
            console.log('data:', data);
            if (!data)
                return;
            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = new networkcube.LinkSchema(0, 1, 2);
            var nodes = data;
            var node;
            var nodeTable = [];
            var nodeSchema = new networkcube.NodeSchema(0);
            var nodeNames = [];
            for (var i = 0; i < nodes.length; i++) {
                node = nodes[i];
                line = [i];
                if (node.name) {
                    line.push(node.name);
                    nodeSchema.label = 1;
                }
                if (node.label) {
                    line.push(node.name);
                    nodeSchema.label = 1;
                }
                nodeNames.push(node.name);
                nodeTable.push(line);
            }
            var s, t;
            for (var i = 0; i < nodes.length; i++) {
                for (var j = 0; j < nodes[i].imports.length; j++) {
                    s = nodeNames.indexOf(nodes[i].name);
                    t = nodeNames.indexOf(nodes[i].imports[j]);
                    if (s == -1 || t == -1)
                        console.error('---');
                    else
                        linkTable.push([linkTable.length, s, t]);
                }
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadJsonList = loadJsonList;
    function loadGraphML(url, callBack) {
    }
    function loadTables(url, callBack) {
    }
    function loadNCube(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        d3.json(url, function (data) {
            var nodeTable = [];
            var linkTable = [];
            var nodeSchema = new networkcube.NodeSchema(0);
            nodeSchema.id = 0;
            nodeSchema.label = 1;
            nodeSchema.nodeType = 2;
            for (var i = 0; i < data.nodes.length; i++) {
                console.log('data.nodes[i].name.substring(0,3)', data.nodes[i].name.substring(0, 3));
                nodeTable.push([
                    data.nodes[i].nodeId,
                    data.nodes[i].name,
                    data.nodes[i].name.substring(0, 3)
                ]);
            }
            var linkSchema = new networkcube.LinkSchema(0, 1, 2);
            linkSchema.id = 0;
            linkSchema.source = 1;
            linkSchema.target = 2;
            linkSchema.time = 3;
            linkSchema.weight = 4;
            for (var i = 0; i < data.edges.length; i++) {
                linkTable.push([
                    data.edges[i].edgeId,
                    data.edges[i].sourceNodeId,
                    data.edges[i].targetNodeId,
                    moment().add(data.edges[i].timeIndex, 'seconds').format('YYYY-MM-DD hh:mm:ss'),
                    data.edges[i].weight
                ]);
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadNCube = loadNCube;
    function loadPajek(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        $.get(url, function (data) {
            var lines = data.split('\n');
            var nodeTable = [];
            var nodeSchema = { id: 0, label: 1 };
            var linkTable = [];
            var linkSchema = { id: 0, source: 1, target: 2, directed: 3 };
            var parseType = '';
            var line;
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                if (line.indexOf('*Vertices') > -1) {
                    parseType = 'nodes';
                    continue;
                }
                else if (line.indexOf('*Arcs') > -1) {
                    parseType = 'undirectedLinks';
                    continue;
                }
                else if (line.indexOf('*Edges') > -1) {
                    parseType = 'directedLinks';
                    continue;
                }
                line = line.trim();
                line = line.split(' ');
                for (var j = 0; j < line.length; j) {
                    if (line[j].length == 0) {
                        line.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                if (line.length == 0)
                    continue;
                if (parseType.indexOf('nodes') > -1) {
                    nodeTable.push([nodeTable.length, line[1]]);
                }
                else if (parseType.indexOf('undirectedLinks') > -1) {
                    linkTable.push([linkTable.length, parseInt(line[0]) - 1, parseInt(line[1]) - 1, false]);
                }
                else if (parseType.indexOf('directedLinks') > -1) {
                    linkTable.push([linkTable.length, parseInt(line[0]) - 1, parseInt(line[1]) - 1, true]);
                }
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadPajek = loadPajek;
    function loadMat(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        $.get(url, function (data) {
            var lines = data.split('\n');
            var nodeTable = [];
            var nodeSchema = { id: 0, label: 1 };
            var linkTable = [];
            var linkSchema = { id: 0, source: 1, target: 2 };
            var parseType = '';
            var line;
            var rowCount = 0;
            var currRow = 0;
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                if (line.indexOf('ROW LABELS') > -1) {
                    parseType = 'rows';
                    continue;
                }
                else if (line.indexOf('COLUMN LABELS') > -1) {
                    parseType = 'cols';
                    continue;
                }
                else if (line.indexOf('DATA:') > -1) {
                    parseType = 'links';
                    continue;
                }
                if (parseType.length == 0)
                    continue;
                line = line.trim();
                line = line.split(' ');
                if (parseType.indexOf('rows') > -1) {
                    nodeTable.push([nodeTable.length, line[0]]);
                    rowCount++;
                }
                else if (parseType.indexOf('cols') > -1) {
                    if (line[0].indexOf(nodeTable[0][1] > -1)) {
                        parseType = '';
                        rowCount = 0;
                        continue;
                    }
                    nodeTable.push([nodeTable.length, line[0]]);
                }
                else if (parseType.indexOf('links') > -1) {
                    for (var j = 0; j < line.length; j++) {
                        if (parseInt(line[j]) == 1) {
                            linkTable.push([linkTable.length, currRow, rowCount + 1]);
                        }
                    }
                    currRow++;
                }
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadMat = loadMat;
    function loadGEDCOM(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        var nodeTable = [];
        var nodeSchema = { id: 0, label: 1, nodeType: 2 };
        var linkTable = [];
        var linkSchema = { id: 0, source: 1, target: 2 };
        var line;
        var s, t;
        $.get(url, function (data) {
            data = data.split('\n');
            var line;
            var currPersonId;
            var personIds = [];
            var personSex = [];
            var familiyIds = [];
            var familiyChildren = [];
            var familiyHusband = [];
            var familiyWife = [];
            for (var i = 0; i < data.length; i++) {
                line = data[i].replace(/@/g, '');
                line = line.split(' ');
                if (line.length < 3)
                    continue;
                if (parseInt(line[0]) == 0 && line[2].indexOf('INDI') > -1) {
                    personIds.push(line[1].trim());
                    personSex.push('');
                }
                else if (parseInt(line[0]) == 1 && line[1].indexOf('SEX') > -1) {
                    personSex[personSex.length - 1] = line[2].trim();
                }
                else if (parseInt(line[0]) == 0 && line[2].indexOf('FAM') > -1) {
                    familiyIds.push(line[1].trim());
                    familiyChildren.push([]);
                    familiyHusband.push(undefined);
                    familiyWife.push(undefined);
                }
                else if (parseInt(line[0]) == 1 && line[1].indexOf('CHIL') > -1) {
                    familiyChildren[familiyChildren.length - 1].push(line[2].trim());
                }
                else if (parseInt(line[0]) == 1 && line[1].indexOf('HUSB') > -1) {
                    familiyHusband[familiyChildren.length - 1] = line[2].trim();
                }
                else if (parseInt(line[0]) == 1 && line[1].indexOf('WIFE') > -1) {
                    familiyWife[familiyChildren.length - 1] = line[2].trim();
                }
            }
            for (var fi = 0; fi < personIds.length; fi++) {
                nodeTable.push([fi, personIds[fi], personSex[fi]]);
            }
            var hi, wi, ci;
            var nodeNames = [];
            for (var fi = 0; fi < familiyIds.length; fi++) {
                hi = personIds.indexOf(familiyHusband[fi]);
                wi = personIds.indexOf(familiyWife[fi]);
                console.log('-->', hi, wi, familiyHusband[fi], familiyWife[fi]);
                for (var i = 0; i < familiyChildren[fi].length; i++) {
                    ci = personIds.indexOf(familiyChildren[fi][i]);
                    if (ci == undefined || ci == -1)
                        continue;
                    if (hi != undefined && hi > -1)
                        linkTable.push([linkTable.length, hi, ci]);
                    if (wi != undefined && wi > -1)
                        linkTable.push([linkTable.length, wi, ci]);
                }
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadGEDCOM = loadGEDCOM;
    function loadLinkList(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        $.get(url, function (data) {
            var lines = data.split('\n');
            var nodeTable = [];
            var nodeSchema = { id: 0, label: 1 };
            var linkTable = [];
            var linkSchema = { id: 0, source: 1, target: 2, weight: 3 };
            var line;
            var s, t;
            for (var i = 0; i < lines.length; i++) {
                line = lines[i];
                if (line.indexOf('#') == -1) {
                    break;
                }
            }
            var DEL = ' ';
            if (lines[i].indexOf(',') > -1)
                DEL = ',';
            else if (lines[i].indexOf('\t') > -1)
                DEL = '\t';
            var nodeLabels = [];
            var weight;
            for (i; i < lines.length; i++) {
                line = lines[i];
                line = line.split(DEL);
                for (var j = 0; j < line.length; j) {
                    if (line[j].length == 0) {
                        line.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                if (line.length < 2)
                    continue;
                s = line[0].toLowerCase();
                if (s == undefined || s == '')
                    continue;
                var si = nodeLabels.indexOf(s);
                if (si == -1) {
                    si = nodeLabels.length;
                    nodeLabels.push(s);
                }
                t = line[1].toLowerCase();
                if (t == undefined)
                    continue;
                t = t.trim();
                var ti = nodeLabels.indexOf(t);
                if (ti == -1) {
                    ti = nodeLabels.length;
                    nodeLabels.push(t);
                }
                weight = 1;
                linkTable.push([linkTable.length, si, ti, weight]);
            }
            for (i = 0; i <= nodeLabels.length; i++) {
                nodeTable.push([i, nodeLabels[i] + '']);
            }
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadLinkList = loadLinkList;
    function loadMatrix(url, callBack) {
        var d;
        var url = url;
        var dataset;
        var callBack = callBack;
        $.get(url, function (data) {
            var lines = data.split('\n');
            var nodeTable = [];
            var nodeSchema = { id: 0, label: 1 };
            var linkTable = [];
            var linkSchema = { id: 0, source: 1, target: 2 };
            var parseType = '';
            var line;
            var rowCount = 0;
            var currRow = 0;
            var nodeNames = [];
            var label;
            var line = lines[0].trim().split(',');
            for (var i = 0; i < line.length; i++) {
                label = line[i].trim();
                nodeTable.push([nodeTable.length, label]);
                nodeNames.push(label);
            }
            var t;
            for (var i = 1; i < lines.length; i++) {
                line = lines[i];
                line = line.trim();
                line = line.split(',');
                t = nodeNames.indexOf(line[0].trim());
                if (t == -1) {
                    console.error('Node', line[0], 'not defined');
                    continue;
                }
                for (var j = 1; j < line.length; j++) {
                    if (line[j].length > 0 && parseInt(line[j].replace(/\s/g, '')) > 300000) {
                        linkTable.push([linkTable.length, t, j - 1]);
                    }
                }
            }
            console.log('---->nodes found:', nodeTable.length);
            console.log('---->links found:', linkTable.length);
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }));
        });
    }
    networkcube.loadMatrix = loadMatrix;
    function exportCSV(graph) {
        var csv = '';
        var DEL = ',';
        var ST = '';
        var BR = '\n';
        for (var i = 0; i < graph.links().length; i++) {
            csv += ST + graph.link(i).source.id() + ST + DEL
                + ST + graph.link(i).target.id() + ST + BR;
        }
        return csv;
    }
    networkcube.exportCSV = exportCSV;
    function downloadText(text, filename) {
        var textFileAsBlob = new Blob([text], { type: 'text/text' });
        var fileNameToSaveAs = filename;
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();
    }
    networkcube.downloadText = downloadText;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    function searchForTerm(term, dgraph, type) {
        var terms = term.toLowerCase().split(',');
        var result = new networkcube.IDCompound();
        for (var i = 0; i < terms.length; i++) {
            term = terms[i].trim();
            console.log('search term', term);
            if (!type || type == 'node')
                result.nodeIds = result.nodeIds.concat(dgraph.nodes().filter(function (e) {
                    return e.label().toLowerCase().indexOf(term) > -1
                        || e.nodeType().toLowerCase().indexOf(term) > -1;
                }).ids());
            if (!type || type == 'link')
                result.linkIds = result.linkIds.concat(dgraph.links().filter(function (e) {
                    return e.source.label().toLowerCase().indexOf(term) > -1
                        || e.target.label().toLowerCase().indexOf(term) > -1
                        || e.linkType().indexOf(term) > -1;
                }).ids());
            if (!type || type == 'locations')
                result.locationIds = result.locationIds.concat(dgraph.locations().filter(function (e) {
                    return e.label().toLowerCase().indexOf(term) > -1;
                }).ids());
        }
        return result;
    }
    networkcube.searchForTerm = searchForTerm;
    var StringContainsFilter = (function () {
        function StringContainsFilter(pattern) {
            this.pattern = pattern;
        }
        StringContainsFilter.prototype.test = function (word) {
            console.log('contains:', word, this.pattern);
            return word.indexOf(this.pattern) > -1;
        };
        return StringContainsFilter;
    })();
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    networkcube.MESSAGE_HIGHLIGHT = 'highlight';
    networkcube.MESSAGE_SELECTION = 'selection';
    networkcube.MESSAGE_TIME_RANGE = 'timeRange';
    networkcube.MESSAGE_SELECTION_CREATE = 'createSelection';
    networkcube.MESSAGE_SELECTION_DELETE = 'deleteSelection';
    networkcube.MESSAGE_SELECTION_SET_CURRENT = 'setCurrentSelectionId';
    networkcube.MESSAGE_SELECTION_COLORING = 'setSelectionColor';
    networkcube.MESSAGE_SELECTION_SET_COLORING_VISIBILITY = 'selectionColoring';
    networkcube.MESSAGE_SELECTION_FILTER = 'selectionFilter';
    networkcube.MESSAGE_SELECTION_PRIORITY = 'selectionPriority';
    networkcube.MESSAGE_SEARCH_RESULT = 'searchResult';
    var MESSENGER_PROPAGATE = true;
    var MESSAGE_HANDLERS = [
        networkcube.MESSAGE_HIGHLIGHT,
        networkcube.MESSAGE_SELECTION,
        networkcube.MESSAGE_TIME_RANGE,
        networkcube.MESSAGE_SELECTION_CREATE,
        networkcube.MESSAGE_SELECTION_DELETE,
        networkcube.MESSAGE_SELECTION_SET_CURRENT,
        networkcube.MESSAGE_SELECTION_SET_COLORING_VISIBILITY,
        networkcube.MESSAGE_SELECTION_FILTER,
        networkcube.MESSAGE_SELECTION_PRIORITY,
        networkcube.MESSAGE_SEARCH_RESULT,
        networkcube.MESSAGE_SELECTION_COLORING
    ];
    var messageHandlers = [];
    var MessageHandler = (function () {
        function MessageHandler() {
        }
        return MessageHandler;
    })();
    var messageHandler = new MessageHandler();
    var previousMessageId = -1;
    function addEventListener(messageType, handler) {
        console.log('>>> addEventListener', messageType);
        messageHandler[messageType] = handler;
    }
    networkcube.addEventListener = addEventListener;
    function setDefaultEventListener(handler) {
        for (var i = 0; i < MESSAGE_HANDLERS.length; i++) {
            messageHandler[MESSAGE_HANDLERS[i]] = handler;
        }
    }
    networkcube.setDefaultEventListener = setDefaultEventListener;
    window.addEventListener('storage', receiveMessage, false);
    var Message = (function () {
        function Message(type) {
            this.id = Math.random();
            this.type = type;
        }
        return Message;
    })();
    networkcube.Message = Message;
    function sendMessage(type, body) {
        var m = new Message(type);
        m.body = body;
        distributeMessage(m, true);
    }
    networkcube.sendMessage = sendMessage;
    function highlight(action, elementCompound) {
        var g = networkcube.getDynamicGraph();
        var idCompound = networkcube.makeIdCompound(elementCompound);
        if (!elementCompound == undefined)
            action = 'reset';
        var m;
        m = new HighlightMessage(action, idCompound);
        distributeMessage(m);
        if (elementCompound && g.currentSelection_id > 0) {
            $('body').css('cursor', 'url(/networkcube/icons/brush.png),auto');
        }
        else {
            $('body').css('cursor', 'auto');
        }
    }
    networkcube.highlight = highlight;
    var HighlightMessage = (function (_super) {
        __extends(HighlightMessage, _super);
        function HighlightMessage(action, idCompound) {
            _super.call(this, networkcube.MESSAGE_HIGHLIGHT);
            this.action = action;
            this.idCompound = idCompound;
        }
        return HighlightMessage;
    })(Message);
    networkcube.HighlightMessage = HighlightMessage;
    function selection(action, compound, selectionId) {
        var g = networkcube.getDynamicGraph();
        if (!selectionId)
            selectionId = g.currentSelection_id;
        var selection = g.getSelection(selectionId);
        var idCompound = networkcube.makeIdCompound(compound);
        var m = new SelectionMessage(action, idCompound, selectionId);
        distributeMessage(m);
    }
    networkcube.selection = selection;
    var SelectionMessage = (function (_super) {
        __extends(SelectionMessage, _super);
        function SelectionMessage(action, idCompound, selectionId) {
            _super.call(this, networkcube.MESSAGE_SELECTION);
            this.action = action;
            this.idCompound = idCompound;
            this.selectionId = selectionId;
        }
        return SelectionMessage;
    })(Message);
    networkcube.SelectionMessage = SelectionMessage;
    function timeRange(startUnix, endUnix, single, propagate) {
        var m = new TimeRangeMessage(startUnix, endUnix);
        if (propagate == undefined)
            propagate = false;
        if (propagate)
            distributeMessage(m);
        else
            processMessage(m);
    }
    networkcube.timeRange = timeRange;
    var TimeRangeMessage = (function (_super) {
        __extends(TimeRangeMessage, _super);
        function TimeRangeMessage(start, end) {
            _super.call(this, networkcube.MESSAGE_TIME_RANGE);
            this.startUnix = start;
            this.endUnix = end;
        }
        return TimeRangeMessage;
    })(Message);
    networkcube.TimeRangeMessage = TimeRangeMessage;
    function createSelection(type, name) {
        var g = networkcube.getDynamicGraph();
        var b = g.createSelection(type);
        b.name = name;
        var m = new CreateSelectionMessage(b);
        distributeMessage(m, false);
        return b;
    }
    networkcube.createSelection = createSelection;
    var CreateSelectionMessage = (function (_super) {
        __extends(CreateSelectionMessage, _super);
        function CreateSelectionMessage(b) {
            _super.call(this, networkcube.MESSAGE_SELECTION_CREATE);
            this.selection = b;
        }
        return CreateSelectionMessage;
    })(Message);
    networkcube.CreateSelectionMessage = CreateSelectionMessage;
    function setCurrentSelection(b) {
        var g = networkcube.getDynamicGraph();
        var m = new SetCurrentSelectionIdMessage(b);
        distributeMessage(m);
    }
    networkcube.setCurrentSelection = setCurrentSelection;
    var SetCurrentSelectionIdMessage = (function (_super) {
        __extends(SetCurrentSelectionIdMessage, _super);
        function SetCurrentSelectionIdMessage(b) {
            _super.call(this, networkcube.MESSAGE_SELECTION_SET_CURRENT);
            this.selectionId = b.id;
        }
        return SetCurrentSelectionIdMessage;
    })(Message);
    networkcube.SetCurrentSelectionIdMessage = SetCurrentSelectionIdMessage;
    function showSelectionColor(selection, showColor) {
        var m = new ShowSelectionColorMessage(selection, showColor);
        distributeMessage(m);
    }
    networkcube.showSelectionColor = showSelectionColor;
    var ShowSelectionColorMessage = (function (_super) {
        __extends(ShowSelectionColorMessage, _super);
        function ShowSelectionColorMessage(selection, showColor) {
            _super.call(this, networkcube.MESSAGE_SELECTION_SET_COLORING_VISIBILITY);
            this.selectionId = selection.id;
            this.showColor = showColor;
        }
        return ShowSelectionColorMessage;
    })(Message);
    networkcube.ShowSelectionColorMessage = ShowSelectionColorMessage;
    function filterSelection(selection, filter) {
        var m = new FilterSelectionMessage(selection, filter);
        distributeMessage(m);
    }
    networkcube.filterSelection = filterSelection;
    var FilterSelectionMessage = (function (_super) {
        __extends(FilterSelectionMessage, _super);
        function FilterSelectionMessage(selection, filter) {
            _super.call(this, networkcube.MESSAGE_SELECTION_FILTER);
            this.selectionId = selection.id;
            this.filter = filter;
        }
        return FilterSelectionMessage;
    })(Message);
    networkcube.FilterSelectionMessage = FilterSelectionMessage;
    function swapPriority(s1, s2) {
        var m = new SelectionPriorityMessage(s1, s2, s2.priority, s1.priority);
        distributeMessage(m);
    }
    networkcube.swapPriority = swapPriority;
    var SelectionPriorityMessage = (function (_super) {
        __extends(SelectionPriorityMessage, _super);
        function SelectionPriorityMessage(s1, s2, p1, p2) {
            _super.call(this, networkcube.MESSAGE_SELECTION_PRIORITY);
            this.selectionId1 = s1.id;
            this.selectionId2 = s2.id;
            this.priority1 = p1;
            this.priority2 = p2;
        }
        return SelectionPriorityMessage;
    })(Message);
    networkcube.SelectionPriorityMessage = SelectionPriorityMessage;
    function deleteSelection(selection) {
        var m = new DeleteSelectionMessage(selection);
        distributeMessage(m);
    }
    networkcube.deleteSelection = deleteSelection;
    var DeleteSelectionMessage = (function (_super) {
        __extends(DeleteSelectionMessage, _super);
        function DeleteSelectionMessage(selection) {
            _super.call(this, networkcube.MESSAGE_SELECTION_DELETE);
            this.selectionId = selection.id;
        }
        return DeleteSelectionMessage;
    })(Message);
    networkcube.DeleteSelectionMessage = DeleteSelectionMessage;
    function setSelectionColor(s, color) {
        distributeMessage(new SelectionColorMessage(s, color));
    }
    networkcube.setSelectionColor = setSelectionColor;
    var SelectionColorMessage = (function (_super) {
        __extends(SelectionColorMessage, _super);
        function SelectionColorMessage(selection, color) {
            _super.call(this, networkcube.MESSAGE_SELECTION_COLORING);
            this.selectionId = selection.id;
            this.color = color;
        }
        return SelectionColorMessage;
    })(Message);
    function search(term, type) {
        var idCompound = networkcube.searchForTerm(term, networkcube.getDynamicGraph(), type);
        distributeMessage(new SearchResultMessage(term, idCompound));
    }
    networkcube.search = search;
    var SearchResultMessage = (function (_super) {
        __extends(SearchResultMessage, _super);
        function SearchResultMessage(searchTerm, idCompound) {
            _super.call(this, networkcube.MESSAGE_SEARCH_RESULT);
            this.idCompound = idCompound;
            this.searchTerm = searchTerm;
        }
        return SearchResultMessage;
    })(Message);
    networkcube.SearchResultMessage = SearchResultMessage;
    var MESSAGE_KEY = 'networkcube_message';
    localStorage[MESSAGE_KEY] = undefined;
    function distributeMessage(message, ownView) {
        if (ownView == undefined || ownView)
            processMessage(message);
        if (MESSENGER_PROPAGATE) {
            localStorage[MESSAGE_KEY] = JSON.stringify(message, function (k, v) { return networkcube.dgraphReplacer(k, v); });
        }
    }
    networkcube.distributeMessage = distributeMessage;
    function receiveMessage() {
        var s = localStorage[MESSAGE_KEY];
        if (s == undefined || s == 'undefined')
            return;
        var dgraph = networkcube.getDynamicGraph();
        var m = JSON.parse(s, function (k, v) { return networkcube.dgraphReviver(dgraph, k, v); });
        if (!m || m.id == previousMessageId) {
            return;
        }
        previousMessageId = m.id;
        processMessage(m);
    }
    function processMessage(m) {
        var graph = networkcube.getDynamicGraph();
        if (messageHandler[m.type]) {
            if (m.type == networkcube.MESSAGE_HIGHLIGHT) {
                var m2 = m;
                graph.highlight(m2.action, m2.idCompound);
            }
            else if (m.type == networkcube.MESSAGE_SELECTION) {
                var m3 = m;
                graph.selection(m3.action, m3.idCompound, m3.selectionId);
            }
            else if (m.type == networkcube.MESSAGE_TIME_RANGE) {
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_SET_COLORING_VISIBILITY) {
                var m4 = m;
                graph.getSelection(m4.selectionId).showColor = m4.showColor;
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_PRIORITY) {
                var m5 = m;
                graph.getSelection(m5.selectionId1).priority = m5.priority1;
                graph.getSelection(m5.selectionId2).priority = m5.priority2;
                var linkElements = graph.links().selected().toArray();
                for (var i = 0; i < linkElements.length; i++) {
                    linkElements[i].getSelections().sort(networkcube.sortByPriority);
                }
                var nodeElements = graph.nodes().selected().toArray();
                for (var i = 0; i < nodeElements.length; i++) {
                    nodeElements[i].getSelections().sort(networkcube.sortByPriority);
                }
                var nodePairElements = graph.nodePairs().selected().toArray();
                for (var i = 0; i < nodePairElements.length; i++) {
                    nodePairElements[i].getSelections().sort(networkcube.sortByPriority);
                }
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_FILTER) {
                var m6 = m;
                graph.filterSelection(m6.selectionId, m6.filter);
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_CREATE) {
                var m7 = m;
                graph.addSelection(m7.selection.id, m7.selection.color, m7.selection.acceptedType, m7.selection.priority);
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_SET_CURRENT) {
                var m8 = m;
                graph.setCurrentSelection(m8.selectionId);
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_DELETE) {
                var m10 = m;
                graph.deleteSelection(m10.selectionId);
            }
            else if (m.type == networkcube.MESSAGE_SEARCH_RESULT) {
                var m11 = m;
                graph.highlight('set', m11.idCompound);
            }
            else if (m.type == networkcube.MESSAGE_SELECTION_COLORING) {
                var m12 = m;
                graph.getSelection(m12.selectionId).color = m12.color;
            }
            callHandler(m);
        }
    }
    function callHandler(message) {
        if (messageHandler[message.type] && messageHandler[message.type] != undefined) {
            messageHandler[message.type](message);
        }
    }
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    function orderNodes(graph, config) {
        var max = 0;
        var similarityMatrix = [];
        var order = graph.nodes().ids();
        var distance = config.distance ? config.distance : science.stats.distance.manhattan;
        var nodes = config.nodes ? config.nodes : graph.nodes().toArray();
        var links = config.links ? config.links : graph.links().toArray();
        var start = config.start ? config.start : graph.startTime;
        var end = config.end ? config.end : graph.endTime;
        var arr;
        for (var i = 0; i < nodes.length; i++) {
            arr = [];
            similarityMatrix.push(arr);
            for (var j = 0; j < nodes.length; j++) {
                similarityMatrix[i].push(0);
            }
        }
        var weight = 0;
        var l;
        var s;
        var t;
        for (var i = 0; i < links.length; i++) {
            weight = 0;
            s = nodes.indexOf(links[i].source);
            t = nodes.indexOf(links[i].target);
            if (s == -1 || t == -1)
                continue;
            weight += links[i].weights(start, end).mean();
            if (weight) {
                similarityMatrix[s][t] = weight;
                similarityMatrix[t][s] = weight;
            }
            else {
                console.log('weight', weight);
            }
        }
        var leafOrder = reorder.leafOrder()
            .distance(distance)(similarityMatrix);
        leafOrder.forEach(function (lo, i) {
            order[nodes[lo].id()] = i;
        });
        return order;
    }
    networkcube.orderNodes = orderNodes;
    var OrderingConfiguration = (function () {
        function OrderingConfiguration() {
        }
        return OrderingConfiguration;
    })();
    networkcube.OrderingConfiguration = OrderingConfiguration;
})(networkcube || (networkcube = {}));
var networkcube;
(function (networkcube) {
    networkcube.TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';
    function timeFormat() {
        return networkcube.TIME_FORMAT;
    }
    networkcube.timeFormat = timeFormat;
    var dataManager = new networkcube.DataManager();
    var session;
    function setSession(sessionName) {
        session = sessionName;
    }
    networkcube.setSession = setSession;
    function setDataManagerOptions(options) {
        dataManager.setOptions(options);
    }
    networkcube.setDataManagerOptions = setDataManagerOptions;
    function isSessionCached(session, dataSetName) {
        return dataManager.isSessionCached(session, dataSetName);
    }
    networkcube.isSessionCached = isSessionCached;
    function importData(sessionName, data) {
        console.log('[n3] Import data', data.name);
        session = sessionName;
        dataManager.importData(sessionName, data);
    }
    networkcube.importData = importData;
    function deleteData(dataSetName) {
        getDynamicGraph(dataSetName).delete(dataManager);
    }
    networkcube.deleteData = deleteData;
    function clearAllDataManagerSessionCaches() {
        dataManager.clearAllSessionData();
    }
    networkcube.clearAllDataManagerSessionCaches = clearAllDataManagerSessionCaches;
    function getDynamicGraph(dataName, session) {
        var so = setOps;
        uidMethod = so.pushUid(function () {
            return this._id;
        });
        var vars = networkcube.getUrlVars();
        if (!dataName)
            dataName = vars['datasetName'];
        if (!session)
            this.session = vars['session'];
        else
            this.session = session;
        return dataManager.getGraph(this.session, dataName);
    }
    networkcube.getDynamicGraph = getDynamicGraph;
    function openVisualizationWindow(session, visUri, dataName) {
        openView(session, visUri, dataName, false);
    }
    networkcube.openVisualizationWindow = openVisualizationWindow;
    function openVisualizationTab(session, visUri, dataName) {
        openView(session, visUri, dataName, true);
    }
    networkcube.openVisualizationTab = openVisualizationTab;
    function createTabVisualizations(parentId, visSpec, session, dataName, width, height, visParams) {
        var parent = $('#' + parentId);
        var tabDiv = $('<div></div>');
        parent.append(tabDiv);
        var visDiv = $('<div></div>');
        parent.append(visDiv);
        var ul = $('<ul class="networkcube-tabs"\
                style="\
                    list-style-type: none;\
                    margin: 0;\
                    padding:2px;\
                    overflow: hidden;\
                    border: none;\
                    background-color: #f1f1f1;"\
                ></ul>');
        tabDiv.append(ul);
        for (var i = 0; i < visSpec.length; i++) {
            visSpec[i].name = visSpec[i].name.replace(' ', '-');
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
                font-size: 13px;" href="#" class="networkcube-tablinks" onclick="networkcube.switchVisTab(event, \'' + visSpec[i].name + '\')">' + visSpec[i].name + '</a></li>'));
            visDiv.append($('<div id="networkcube-visTab-' + visSpec[i].name + '" style="display:' + (i == 0 ? 'block' : 'none') + ';" class="networkcube-visTabContent"></div>'));
            createVisualizationIFrame('networkcube-visTab-' + visSpec[i].name, visSpec[i].url, session, dataName, width, height, visParams);
        }
    }
    networkcube.createTabVisualizations = createTabVisualizations;
    function switchVisTab(evt, visName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("networkcube-visTabContent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("networkcube-tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById('networkcube-visTab-' + visName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    networkcube.switchVisTab = switchVisTab;
    function createVisualizationIFrame(parentId, visUri, session, dataName, width, height, visParams) {
        $('#' + parentId)
            .append('<iframe></iframe>')
            .attr('width', width)
            .attr('height', height);
        var iframe = $('#' + parentId + '> iframe');
        var visParamString = '';
        for (var prop in visParams) {
            visParamString += '&' + prop + '=' + visParams[prop];
        }
        iframe.attr('src', visUri + '?'
            + 'session=' + session
            + '&datasetName=' + dataName
            + visParamString);
        if (width)
            iframe.attr('width', width);
        if (height)
            iframe.attr('height', height);
        if (visParams != undefined && visParams.hasOwnProperty('scrolling')) {
            iframe.attr('scrolling', visParams.scrolling);
        }
        return iframe;
    }
    networkcube.createVisualizationIFrame = createVisualizationIFrame;
    function openView(session, visUri, dataname, tab) {
        var url = visUri + '?session=' + session + '&datasetName=' + dataname;
        if (tab)
            window.open(url, '_blank');
        else
            window.open(url);
    }
    function getURLString(dataName) {
        return '?session=' + session + '&datasetName=' + dataName;
    }
    networkcube.getURLString = getURLString;
    (function (OrderType) {
        OrderType[OrderType["Local"] = 0] = "Local";
        OrderType[OrderType["Global"] = 1] = "Global";
        OrderType[OrderType["Data"] = 2] = "Data";
    })(networkcube.OrderType || (networkcube.OrderType = {}));
    var OrderType = networkcube.OrderType;
    ;
})(networkcube || (networkcube = {}));
var glutils;
(function (glutils) {
    function makeAlphaBuffer(array, stretch) {
        var buffer = new Float32Array(array.length * stretch);
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < stretch; j++) {
                buffer[i * stretch + j] = array[i];
            }
        }
        return buffer;
    }
    glutils.makeAlphaBuffer = makeAlphaBuffer;
    function addBufferedHatchedRect(vertexArray, x, y, z, width, height, colorArray, c) {
        var HATCH_NUM = 3;
        var LINE_WIDTH = 1;
        var hatchWidth = width / HATCH_NUM;
        width = width / 2;
        height = height / 2;
        var startX = x + width;
        var startY = y - height;
        for (var i = 1; i <= HATCH_NUM; i++) {
            vertexArray.push([startX - hatchWidth * i, startY, z], [startX - hatchWidth * i + LINE_WIDTH, startY, z], [startX, startY + hatchWidth * i + LINE_WIDTH, z], [startX, startY + hatchWidth * i + LINE_WIDTH, z], [startX, startY + hatchWidth * i, z], [startX - hatchWidth * i, startY, z]);
            colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
        }
    }
    glutils.addBufferedHatchedRect = addBufferedHatchedRect;
    function addBufferedRect(vertexArray, x, y, z, width, height, colorArray, c) {
        width = width / 2;
        height = height / 2;
        vertexArray.push([x - width, y - height, z], [x + width, y - height, z], [x + width, y + height, z], [x + width, y + height, z], [x - width, y + height, z], [x - width, y - height, z]);
        colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
    }
    glutils.addBufferedRect = addBufferedRect;
    function addBufferedCirlce(vertexArray, x, y, z, radius, colorArray, c) {
        var segments = 11;
        var angle = Math.PI / (segments / 2);
        for (var i = 0; i < segments; i++) {
            vertexArray.push([x + Math.cos(i * angle) * radius, y + Math.sin(i * angle) * radius, z], [x + Math.cos((i + 1) * angle) * radius, y + Math.sin((i + 1) * angle) * radius, z], [x, y, z]);
            colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
        }
    }
    glutils.addBufferedCirlce = addBufferedCirlce;
    function addBufferedDiamond(vertexArray, x, y, z, width, height, colorArray, c) {
        width = width / 2;
        height = height / 2;
        vertexArray.push([x - width, y, z], [x, y - height, z], [x + width, y, z], [x + width, y, z], [x, y + height, z], [x - width, y, z]);
        colorArray.push([c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]], [c[0], c[1], c[2], c[3]]);
    }
    glutils.addBufferedDiamond = addBufferedDiamond;
    function createRectFrame(w, h, color, lineThickness) {
        w = w / 2;
        h = h / 2;
        var geom = new THREE.Geometry();
        geom.vertices = [
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(w, -h, 0),
            new THREE.Vector3(-w, -h, 0)
        ];
        var material = new THREE.LineBasicMaterial({
            color: color,
        });
        return new THREE.Line(geom, material);
    }
    glutils.createRectFrame = createRectFrame;
    function createDiagonalCross(w, h, color, lineThickness) {
        w = w / 2;
        h = h / 2;
        var geom = new THREE.Geometry();
        geom.vertices = [
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(w, -h, 0),
            new THREE.Vector3(-w, -h, 0),
            new THREE.Vector3(w, h, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-w, h, 0),
            new THREE.Vector3(w, -h, 0)
        ];
        var material = new THREE.LineBasicMaterial({
            color: color,
            linewidth: lineThickness,
        });
        return new THREE.Line(geom, material);
    }
    glutils.createDiagonalCross = createDiagonalCross;
    function makeBuffer3f(array) {
        var buffer = new Float32Array(array.length * 3);
        for (var i = 0; i < array.length; i++) {
            buffer[i * 3 + 0] = array[i][0];
            buffer[i * 3 + 1] = array[i][1];
            buffer[i * 3 + 2] = array[i][2];
        }
        return buffer;
    }
    glutils.makeBuffer3f = makeBuffer3f;
    function makeBuffer4f(array) {
        var buffer = new Float32Array(array.length * 4);
        for (var i = 0; i < array.length; i++) {
            buffer[i * 4 + 0] = array[i][0];
            buffer[i * 4 + 1] = array[i][1];
            buffer[i * 4 + 2] = array[i][2];
            buffer[i * 4 + 3] = array[i][3];
        }
        return buffer;
    }
    glutils.makeBuffer4f = makeBuffer4f;
    function updateBuffer(buffer, array, size) {
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < size; j++) {
                buffer[i * size + j] = array[i][j];
            }
        }
    }
    glutils.updateBuffer = updateBuffer;
    function createText(string, x, y, z, size, color, weight, align) {
        if (weight === void 0) { weight = 'normal'; }
        if (align === void 0) { align = 'left'; }
        var textGeom = new THREE.TextGeometry(string, {
            size: size,
            height: 1,
            weight: weight,
            curveSegments: 1,
            font: 'helvetiker'
        });
        var textMaterial = new THREE.MeshBasicMaterial({ color: color });
        var label = new THREE.Mesh(textGeom, textMaterial);
        if (align == 'right') {
            label.geometry.computeBoundingBox();
            var bounds = label.geometry.boundingBox;
            x -= bounds.max.x - bounds.min.x;
        }
        label.position.set(x, y, z);
        return label;
    }
    glutils.createText = createText;
    function getMousePos(canvas, x, y) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: x - rect.left,
            y: y - rect.top
        };
    }
    glutils.getMousePos = getMousePos;
    var txtCanvas = document.createElement("canvas");
    var WebGL = (function () {
        function WebGL(params) {
            this.elementQueries = [];
            txtCanvas = document.createElement("canvas");
            txtCanvas.setAttribute('id', 'textCanvas');
        }
        WebGL.prototype.render = function () {
            for (var i = 0; i < this.elementQueries.length; i++) {
                if (this.elementQueries[i].updateAttributes || this.elementQueries[i].updateStyle) {
                    this.elementQueries[i].set();
                }
            }
            this.renderer.render(this.scene, this.camera);
        };
        WebGL.prototype.selectAll = function () {
            return glutils.selectAll();
        };
        WebGL.prototype.enableZoom = function (b) {
            if (b) {
                window.addEventListener("mousewheel", mouseWheel, false);
                function mouseWheel(event) {
                    event.preventDefault();
                    webgl.camera.zoom += event.wheelDelta / 1000;
                    webgl.camera.zoom = Math.max(0.1, webgl.camera.zoom);
                    webgl.camera.updateProjectionMatrix();
                    webgl.render();
                }
            }
            else {
                window.addEventListener("mousewheel", mouseWheel, false);
            }
        };
        WebGL.prototype.enablePanning = function (b) {
            this.interactor.isPanEnabled = b;
        };
        WebGL.prototype.enableHorizontalPanning = function (b) {
            this.interactor.isHorizontalPanEnabled = b;
        };
        return WebGL;
    })();
    glutils.WebGL = WebGL;
    var webgl;
    function initWebGL(parentId, width, height, params) {
        webgl = new WebGL(params);
        webgl.camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 1000);
        webgl.scene = new THREE.Scene();
        webgl.scene.add(webgl.camera);
        webgl.camera.position.z = 100;
        webgl.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true
        });
        webgl.renderer.setSize(width, height);
        webgl.renderer.setClearColor(0xffffff, 1);
        webgl.canvas = webgl.renderer.domElement;
        $("#" + parentId).append(webgl.canvas);
        webgl.interactor = new WebGLInteractor(webgl.scene, webgl.canvas, webgl.camera);
        var light = new THREE.PointLight(0x000000, 1, 100);
        light.position.set(0, 0, 1000);
        webgl.scene.add(light);
        return webgl;
    }
    glutils.initWebGL = initWebGL;
    function setWebGL(scene, camera, renderer, canvas) {
        webgl = new WebGL();
        webgl.camera = camera;
        webgl.scene = scene;
        webgl.renderer = renderer;
    }
    glutils.setWebGL = setWebGL;
    function selectAll() {
        var q = new glutils.WebGLElementQuery();
        webgl.elementQueries.push(q);
        return q;
    }
    glutils.selectAll = selectAll;
    var WebGLElementQuery = (function () {
        function WebGLElementQuery() {
            this.dataElements = [];
            this.visualElements = [];
            this.children = [];
            this.x = [];
            this.y = [];
            this.z = [];
            this.r = [];
            this.fill = [];
            this.stroke = [];
            this.strokewidth = [];
            this.opacity = [];
            this.updateAttributes = false;
            this.updateStyle = false;
            this.IS_SHADER = false;
            this.scene = webgl.scene;
        }
        WebGLElementQuery.prototype.data = function (arr) {
            this.dataElements = arr.slice(0);
            return this;
        };
        WebGLElementQuery.prototype.append = function (shape) {
            var elements = [];
            switch (shape) {
                case 'circle':
                    createCirclesWithBuffers(this, this.scene);
                    break;
                case 'path':
                    elements = createPaths(this.dataElements, this.scene);
                    break;
                case 'line':
                    elements = createLines(this.dataElements, this.scene);
                    break;
                case 'rect':
                    elements = createRectangles(this.dataElements, this.scene);
                    break;
                case 'text':
                    elements = createWebGLText(this.dataElements, this.scene);
                    break;
                case 'polygon':
                    elements = createPolygons(this.dataElements, this.scene);
                    break;
                default: console.error('Shape', shape, 'does not exist.');
            }
            if (!this.IS_SHADER) {
                for (var i = 0; i < elements.length; i++) {
                    this.x.push(0);
                    this.y.push(0);
                    this.z.push(0);
                }
            }
            this.shape = shape;
            this.visualElements = elements;
            return this;
        };
        WebGLElementQuery.prototype.push = function (e) {
            this.dataElements.push(e);
            return this;
        };
        WebGLElementQuery.prototype.getData = function (i) {
            return this.dataElements[this.visualElements.indexOf(i)];
        };
        WebGLElementQuery.prototype.getVisual = function (i) {
            return this.visualElements[this.dataElements.indexOf(i)];
        };
        Object.defineProperty(WebGLElementQuery.prototype, "length", {
            get: function () {
                return this.dataElements.length;
            },
            enumerable: true,
            configurable: true
        });
        WebGLElementQuery.prototype.filter = function (f) {
            var arr = [];
            var visArr = [];
            for (var i = 0; i < this.dataElements.length; i++) {
                if (f(this.dataElements[i], i)) {
                    arr.push(this.dataElements[i]);
                    visArr.push(this.visualElements[i]);
                }
            }
            var q = new WebGLElementQuery()
                .data(arr);
            q.visualElements = visArr;
            return q;
        };
        WebGLElementQuery.prototype.attr = function (name, v) {
            var l = this.visualElements.length;
            if (this.IS_SHADER) {
                for (var i = 0; i < this.dataElements.length; i++) {
                    this[name][i] = v instanceof Function ? v(this.dataElements[i], i) : v;
                }
            }
            else {
                for (var i = 0; i < l; i++) {
                    this.setAttr(this.visualElements[i], name, v instanceof Function ? v(this.dataElements[i], i) : v, i);
                    if (this.visualElements[i].hasOwnProperty('wireframe')) {
                        this.setAttr(this.visualElements[i].wireframe, name, v instanceof Function ? v(this.dataElements[i], i) : v, i);
                    }
                }
            }
            this.updateAttributes = true;
            return this;
        };
        WebGLElementQuery.prototype.style = function (name, v) {
            var l = this.visualElements.length;
            if (this.IS_SHADER) {
                name = name.replace('-', '');
                for (var i = 0; i < this.dataElements.length; i++) {
                    this[name][i] = v instanceof Function ? v(this.dataElements[i], i) : v;
                }
            }
            else {
                for (var i = 0; i < l; i++) {
                    setStyle(this.visualElements[i], name, v instanceof Function ? v(this.dataElements[i], i) : v, this);
                }
            }
            this.updateStyle = true;
            return this;
        };
        WebGLElementQuery.prototype.set = function () {
            if (!this.IS_SHADER)
                return this;
            var l = this.visualElements.length;
            var vertexPositionBuffer = [];
            var vertexColorBuffer = [];
            var c;
            if (this.shape == 'circle') {
                for (var i = 0; i < this.dataElements.length; i++) {
                    c = new THREE.Color(this.fill[i]);
                    addBufferedCirlce(vertexPositionBuffer, this.x[i], this.y[i], this.z[i], this.r[i], vertexColorBuffer, [c.r, c.g, c.b, this.opacity[i]]);
                }
            }
            var geometry = this.mesh.geometry;
            geometry.addAttribute('position', new THREE.BufferAttribute(makeBuffer3f(vertexPositionBuffer), 3));
            geometry.addAttribute('customColor', new THREE.BufferAttribute(makeBuffer4f(vertexColorBuffer), 4));
            geometry.needsUpdate = true;
            geometry.verticesNeedUpdate = true;
            this.mesh.material.needsUpdate = true;
            this.updateAttributes = false;
            this.updateStyle = false;
            return this;
        };
        WebGLElementQuery.prototype.text = function (v) {
            var l = this.visualElements.length;
            for (var i = 0; i < l; i++) {
                this.visualElements[i]['text'] = v instanceof Function ? v(this.dataElements[i], i) : v;
                if (this.visualElements[i]['text'] == undefined)
                    continue;
                setText(this.visualElements[i], this.visualElements[i]['text']);
            }
            return this;
        };
        WebGLElementQuery.prototype.on = function (event, f) {
            switch (event) {
                case 'mouseover':
                    this.mouseOverHandler = f;
                    break;
                case 'mousemove':
                    this.mouseMoveHandler = f;
                    break;
                case 'mouseout':
                    this.mouseOutHandler = f;
                    break;
                case 'mousedown':
                    this.mouseDownHandler = f;
                    break;
                case 'mouseup':
                    this.mouseUpHandler = f;
                    break;
                case 'click':
                    this.clickHandler = f;
                    break;
            }
            webgl.interactor.register(this, event);
            return this;
        };
        WebGLElementQuery.prototype.call = function (method, dataElement, event) {
            var i = this.dataElements.indexOf(dataElement);
            switch (method) {
                case 'mouseover':
                    this.mouseOverHandler(dataElement, i, event);
                    break;
                case 'mousemove':
                    this.mouseMoveHandler(dataElement, i, event);
                    break;
                case 'mouseout':
                    this.mouseOutHandler(dataElement, i, event);
                    break;
                case 'mousedown':
                    this.mouseDownHandler(dataElement, i, event);
                    break;
                case 'mouseup':
                    this.mouseUpHandler(dataElement, i, event);
                    break;
                case 'click':
                    this.clickHandler(dataElement, i, event);
                    break;
            }
            return this;
        };
        WebGLElementQuery.prototype.setAttr = function (element, attr, v, index) {
            switch (attr) {
                case 'x':
                    element.position.x = v;
                    this.x[index] = v;
                    break;
                case 'y':
                    element.position.y = v;
                    this.y[index] = v;
                    break;
                case 'z':
                    element.position.z = v;
                    this.z[index] = v;
                    break;
                case 'x1':
                    setX1(element, v);
                    break;
                case 'y1':
                    setY1(element, v);
                    break;
                case 'x2':
                    setX2(element, v);
                    break;
                case 'y2':
                    setY2(element, v);
                    break;
                case 'r':
                    element.scale.set(v, v, v);
                    break;
                case 'width':
                    element.scale.setX(v);
                    break;
                case 'height':
                    element.scale.setY(v);
                    break;
                case 'depth':
                    element.scale.setZ(v);
                    break;
                case 'd':
                    createPath(element, v);
                    break;
                case 'points':
                    createPolygon(element, v);
                    break;
                case 'rotation':
                    element.rotation.z = v * Math.PI / 180;
                    break;
                case 'scaleX':
                    element.scale.x = v;
                    break;
                case 'scaleY':
                    element.scale.y = v;
                    break;
                default: console.error('Attribute', attr, 'does not exist.');
            }
            element.geometry.verticesNeedUpdate = true;
            element.geometry.elementsNeedUpdate = true;
            element.geometry.lineDistancesNeedUpdate = true;
        };
        WebGLElementQuery.prototype.removeAll = function () {
            for (var i = 0; i < this.visualElements.length; i++) {
                if (this.visualElements[i].wireframe)
                    this.scene.remove(this.visualElements[i].wireframe);
                this.scene.remove(this.visualElements[i]);
            }
        };
        return WebGLElementQuery;
    })();
    glutils.WebGLElementQuery = WebGLElementQuery;
    function setStyle(element, attr, v, query) {
        switch (attr) {
            case 'fill':
                if (query.shape == 'text')
                    setText(element, element['text'], { color: v });
                else
                    element.material.color = new THREE.Color(v);
                break;
            case 'stroke':
                if (element.hasOwnProperty('wireframe')) {
                    element.wireframe.material.color = new THREE.Color(v);
                }
                else {
                    element.material.color = new THREE.Color(v);
                }
                break;
            case 'opacity':
                element.material.opacity = v;
                if (element.hasOwnProperty('wireframe'))
                    element.wireframe.material.opacity = v;
                break;
            case 'stroke-width':
                if (element.hasOwnProperty('wireframe'))
                    element.wireframe.material.linewidth = v;
                else
                    element.material.linewidth = v;
                break;
            case 'font-size':
                element.scale.x = v / 30;
                element.scale.y = v / 30;
                element.geometry.verticesNeedUpdate = true;
                break;
            default: console.error('Style', attr, 'does not exist.');
        }
        element.material.needsUpdate = true;
        if (element.hasOwnProperty('wireframe'))
            element.wireframe.material.needsUpdate = true;
    }
    function setText(mesh, text, parConfig) {
        var config = parConfig;
        if (config == undefined) {
            config = {};
        }
        if (config.color == undefined)
            config.color = '#000000';
        mesh['text'] = text;
        var backgroundMargin = 10;
        var txtCanvas = document.createElement("canvas");
        var context = txtCanvas.getContext("2d");
        var SIZE = 30;
        context.font = SIZE + "pt Helvetica";
        var WIDTH = context.measureText(text).width;
        txtCanvas.width = WIDTH;
        txtCanvas.height = SIZE;
        context.textAlign = "left";
        context.textBaseline = "middle";
        context.fillStyle = config.color;
        context.font = SIZE + "pt Helvetica";
        context.fillText(text, 0, txtCanvas.height / 2);
        var tex = new THREE.Texture(txtCanvas);
        tex.minFilter = THREE.LinearFilter;
        tex.flipY = true;
        tex.needsUpdate = true;
        mesh.material.map = tex;
        mesh.material.transparent = true;
        mesh.material.needsUpdate = true;
        mesh.geometry = new THREE.PlaneGeometry(WIDTH, SIZE);
        mesh.geometry.needsUpdate = true;
        mesh.geometry.verticesNeedUpdate = true;
        mesh.needsUpdate = true;
    }
    function setX1(mesh, v) {
        mesh.geometry.vertices[0].x = v;
    }
    function setY1(mesh, v) {
        mesh.geometry.vertices[0].y = v;
    }
    function setX2(mesh, v) {
        mesh.geometry.vertices[1].x = v;
    }
    function setY2(mesh, v) {
        mesh.geometry.vertices[1].y = v;
    }
    function createG(dataElements, scene) {
        var visualElements = [];
        for (var i = 0; i < dataElements.length; i++) {
            visualElements.push(new GroupElement());
        }
        return visualElements;
    }
    var GroupElement = (function () {
        function GroupElement() {
            this.position = { x: 0, y: 0, z: 0 };
            this.children = [];
        }
        return GroupElement;
    })();
    function createCirclesNoShader(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c;
        for (var i = 0; i < dataElements.length; i++) {
            material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true });
            geometry = new THREE.CircleGeometry(1, 10);
            geometry.dynamic = true;
            c = new THREE.Mesh(geometry, material);
            visualElements.push(c);
            c.position.set(0, 0, 1);
            c.scale.set(10, 10, 1);
            scene.add(c);
        }
        return visualElements;
    }
    var vertexShaderProgram = "\
        attribute vec4 customColor;\
        varying vec4 vColor;\
        void main() {\
            vColor = customColor;\
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1 );\
        }";
    var fragmentShaderProgram = "\
        varying vec4 vColor;\
        void main() {\
            gl_FragColor = vec4(vColor[0], vColor[1], vColor[2], vColor[3]);\
        }";
    function createCirclesWithBuffers(query, scene) {
        var dataElements = query.dataElements;
        query.IS_SHADER = true;
        var attributes = {
            customColor: { type: 'c', value: [] }
        };
        var shaderMaterial = new THREE.ShaderMaterial({
            attributes: attributes,
            vertexShader: vertexShaderProgram,
            fragmentShader: fragmentShaderProgram,
            linewidth: 2
        });
        shaderMaterial.blending = THREE.NormalBlending;
        shaderMaterial.depthTest = true;
        shaderMaterial.transparent = true;
        shaderMaterial.side = THREE.DoubleSide;
        var visualElements = [];
        var c;
        var vertexPositionBuffer = [];
        var vertexColorBuffer = [];
        var geometry = new THREE.BufferGeometry();
        addBufferedRect([], 0, 0, 0, 10, 10, [], [0, 0, 1, .5]);
        for (var i = 0; i < dataElements.length; i++) {
            query.x.push(0);
            query.y.push(0);
            query.z.push(0);
            query.r.push(0);
            query.fill.push('0x000000');
            query.stroke.push('0x000000');
            query.strokewidth.push(1);
            query.opacity.push(1);
        }
        geometry.addAttribute('position', new THREE.BufferAttribute(makeBuffer3f([]), 3));
        geometry.addAttribute('customColor', new THREE.BufferAttribute(makeBuffer4f([]), 4));
        query.mesh = new THREE.Mesh(geometry, shaderMaterial);
        query.mesh.position.set(0, 0, 1);
        scene.add(query.mesh);
        return query;
    }
    function createRectangles(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c;
        for (var i = 0; i < dataElements.length; i++) {
            var rectShape = new THREE.Shape();
            rectShape.moveTo(0, 0);
            rectShape.lineTo(0, -1);
            rectShape.lineTo(1, -1);
            rectShape.lineTo(1, 0);
            rectShape.lineTo(0, 0);
            geometry = new THREE.ShapeGeometry(rectShape);
            c = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 1);
            visualElements.push(c);
            scene.add(c);
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1, 0), new THREE.Vector3(1, -1, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0));
            var wireframe = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, linewidth: 1 }));
            c['wireframe'] = wireframe;
            wireframe.position.set(0, 0, 1.1);
            scene.add(wireframe);
        }
        return visualElements;
    }
    function createPaths(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            c = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createPolygons(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            c = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, side: THREE.DoubleSide }));
            c.doubleSided = true;
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createLines(dataElements, scene) {
        var material;
        var geometry;
        var visualElements = [];
        var c, p;
        for (var i = 0; i < dataElements.length; i++) {
            geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 10, 0));
            c = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true }));
            c.position.set(0, 0, 0);
            visualElements.push(c);
            scene.add(c);
        }
        return visualElements;
    }
    function createWebGLText(dataElements, scene) {
        var visualElements = [];
        var mesh;
        for (var i = 0; i < dataElements.length; i++) {
            mesh = new THREE.Mesh(new THREE.PlaneGeometry(1000, 100), new THREE.MeshBasicMaterial());
            mesh.doubleSided = true;
            visualElements.push(mesh);
            scene.add(mesh);
        }
        return visualElements;
    }
    function createPath(mesh, points) {
        mesh.geometry.vertices = [];
        for (var i = 0; i < points.length; i++) {
            mesh.geometry.vertices.push(new THREE.Vector3(points[i].x, points[i].y, 0));
        }
        mesh.geometry.verticesNeedUpdate = true;
    }
    function createPolygon(mesh, points) {
        var vectors = [];
        var shape = new THREE.Shape(points);
        mesh.geometry = new THREE.ShapeGeometry(shape);
        mesh.geometry.verticesNeedUpdate = true;
    }
    var WebGLInteractor = (function () {
        function WebGLInteractor(scene, canvas, camera) {
            var _this = this;
            this.mouse = [];
            this.mouseStart = [];
            this.mouseDown = false;
            this.cameraStart = [];
            this.panOffset = [];
            this.lastIntersectedSelections = [];
            this.lastIntersectedElements = [];
            this.isPanEnabled = true;
            this.isHorizontalPanEnabled = true;
            this.isLassoEnabled = true;
            this.lassoPoints = [];
            this.mouseOverSelections = [];
            this.mouseMoveSelections = [];
            this.mouseOutSelections = [];
            this.mouseDownSelections = [];
            this.mouseUpSelections = [];
            this.clickSelections = [];
            this.scene = scene;
            this.canvas = canvas;
            this.camera = camera;
            this.mouse = [0, 0];
            canvas.addEventListener('mousemove', function (e) {
                _this.mouseMoveHandler(e);
            });
            canvas.addEventListener('mousedown', function (e) {
                _this.mouseDownHandler(e);
            });
            canvas.addEventListener('mouseup', function (e) {
                _this.mouseUpHandler(e);
            });
            canvas.addEventListener('click', function (e) {
                _this.clickHandler(e);
            });
        }
        WebGLInteractor.prototype.register = function (selection, method) {
            switch (method) {
                case 'mouseover':
                    this.mouseOverSelections.push(selection);
                    break;
                case 'mousemove':
                    this.mouseMoveSelections.push(selection);
                    break;
                case 'mouseout':
                    this.mouseOutSelections.push(selection);
                    break;
                case 'mousedown':
                    this.mouseDownSelections.push(selection);
                    break;
                case 'mouseup':
                    this.mouseUpSelections.push(selection);
                    break;
                case 'click':
                    this.clickSelections.push(selection);
                    break;
            }
        };
        WebGLInteractor.prototype.addEventListener = function (eventName, f) {
            if (eventName == 'lassoStart')
                this.lassoStartHandler = f;
            if (eventName == 'lassoEnd')
                this.lassoEndHandler = f;
            if (eventName == 'lassoMove')
                this.lassoMoveHandler = f;
        };
        WebGLInteractor.prototype.mouseMoveHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            if (this.isLassoEnabled && e.which == 2) {
                this.lassoPoints.push(this.mouse);
                if (this.lassoMoveHandler)
                    this.lassoMoveHandler(this.lassoPoints);
            }
            else {
                var intersectedVisualElements = [];
                for (var i = 0; i < this.lastIntersectedSelections.length; i++) {
                    for (var j = 0; j < this.lastIntersectedElements[i].length; j++) {
                        this.lastIntersectedSelections[i].call('mouseout', this.lastIntersectedElements[i][j]);
                    }
                }
                this.lastIntersectedSelections = [];
                this.lastIntersectedElements = [];
                var nothingIntersected = true;
                for (var i = 0; i < this.mouseOverSelections.length; i++) {
                    intersectedVisualElements = this.intersect(this.mouseOverSelections[i], this.mouse[0], this.mouse[1]);
                    if (intersectedVisualElements.length > 0) {
                        this.lastIntersectedElements.push(intersectedVisualElements);
                        this.lastIntersectedSelections.push(this.mouseOverSelections[i]);
                    }
                    for (var j = 0; j < intersectedVisualElements.length; j++) {
                        this.mouseOverSelections[i].call('mouseover', intersectedVisualElements[j], e);
                    }
                    if (intersectedVisualElements.length > 0)
                        nothingIntersected = false;
                }
                for (var i = 0; i < this.mouseMoveSelections.length; i++) {
                    intersectedVisualElements = this.intersect(this.mouseMoveSelections[i], this.mouse[0], this.mouse[1]);
                    for (var j = 0; j < intersectedVisualElements.length; j++) {
                        this.mouseMoveSelections[i].call('mousemove', intersectedVisualElements[j], e);
                    }
                    if (intersectedVisualElements.length > 0)
                        nothingIntersected = false;
                }
                if (nothingIntersected && this.mouseDown) {
                    if (this.isPanEnabled) {
                        this.panOffset = [e.clientX - this.mouseStart[0], e.clientY - this.mouseStart[1]];
                        if (this.isHorizontalPanEnabled)
                            webgl.camera.position.x = this.cameraStart[0] - this.panOffset[0] / webgl.camera.zoom;
                        webgl.camera.position.y = this.cameraStart[1] + this.panOffset[1] / webgl.camera.zoom;
                        webgl.render();
                    }
                }
            }
        };
        WebGLInteractor.prototype.clickHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            var intersectedVisualElements = [];
            for (var i = 0; i < this.clickSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.clickSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.clickSelections[i].call('click', intersectedVisualElements[j], e);
                }
            }
            this.mouseDown = false;
        };
        WebGLInteractor.prototype.mouseDownHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            this.mouseStart = [e.clientX, e.clientY];
            this.cameraStart = [webgl.camera.position.x, webgl.camera.position.y];
            this.mouseDown = true;
            var intersectedVisualElements = [];
            for (var i = 0; i < this.mouseDownSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.mouseDownSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.mouseDownSelections[i].call('mousedown', intersectedVisualElements[j], e);
                }
            }
            this.lassoPoints = [];
            this.lassoPoints.push(this.mouse);
            if (this.lassoStartHandler && e.which == 2) {
                this.lassoStartHandler(this.lassoPoints);
            }
        };
        WebGLInteractor.prototype.mouseUpHandler = function (e) {
            this.mouse = mouseToWorldCoordinates(e.clientX, e.clientY);
            var intersectedVisualElements = [];
            for (var i = 0; i < this.mouseUpSelections.length; i++) {
                intersectedVisualElements = this.intersect(this.mouseUpSelections[i], this.mouse[0], this.mouse[1]);
                for (var j = 0; j < intersectedVisualElements.length; j++) {
                    this.mouseUpSelections[i].call('mouseup', intersectedVisualElements[j], e);
                }
            }
            this.mouseDown = false;
            if (this.lassoEndHandler && e.which == 2) {
                this.lassoEndHandler(this.lassoPoints);
            }
        };
        WebGLInteractor.prototype.intersect = function (selection, mousex, mousey) {
            switch (selection.shape) {
                case 'circle':
                    return this.intersectCircles(selection);
                    break;
                case 'rect':
                    return this.intersectRects(selection);
                    break;
                case 'path':
                    return this.intersectPaths(selection);
                    break;
                case 'text':
                    return this.intersectRects(selection);
                    break;
            }
            return [];
        };
        WebGLInteractor.prototype.intersectCircles = function (selection) {
            var intersectedElements = [];
            var d;
            for (var i = 0; i < selection.dataElements.length; i++) {
                d = Math.sqrt(Math.pow(this.mouse[0] - selection.x[i], 2) + Math.pow(this.mouse[1] - selection.y[i], 2));
                if (d <= selection.r[i])
                    intersectedElements.push(selection.dataElements[i]);
            }
            return intersectedElements;
        };
        WebGLInteractor.prototype.intersectRects = function (selection) {
            var intersectedElements = [];
            var d;
            var e;
            for (var i = 0; i < selection.visualElements.length; i++) {
                e = selection.visualElements[i];
                if (this.mouse[0] >= e.position.x && this.mouse[0] <= e.position.x + e.geometry.vertices[0].x * e.scale.x
                    && this.mouse[1] <= e.position.y && this.mouse[1] >= e.position.y + e.geometry.vertices[1].y * e.scale.y)
                    intersectedElements.push(selection.dataElements[i]);
            }
            return intersectedElements;
        };
        WebGLInteractor.prototype.intersectPaths = function (selection) {
            var intersectedElements = [];
            var e;
            var v1, v2;
            var x, y;
            var found = false;
            for (var i = 0; i < selection.visualElements.length; i++) {
                e = selection.visualElements[i];
                for (var j = 1; j < e.geometry.vertices.length; j++) {
                    v1 = e.geometry.vertices[j - 1];
                    v1 = { x: v1.x + selection.x[i],
                        y: v1.y + selection.y[i]
                    };
                    v2 = e.geometry.vertices[j];
                    v2 = { x: v2.x + selection.x[i],
                        y: v2.y + selection.y[i]
                    };
                    if (distToSegmentSquared({ x: this.mouse[0], y: this.mouse[1] }, v1, v2) < 3) {
                        intersectedElements.push(selection.dataElements[i]);
                        found = true;
                        break;
                    }
                }
                if (found)
                    break;
            }
            return intersectedElements;
            function sqr(x) {
                return x * x;
            }
            function dist2(v, w) {
                return sqr(v.x - w.x) + sqr(v.y - w.y);
            }
            function distToSegmentSquared(p, v, w) {
                var l2 = dist2(v, w);
                if (l2 == 0)
                    return dist2(p, v);
                var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
                if (t < 0)
                    return dist2(p, v);
                if (t > 1)
                    return dist2(p, w);
                return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
            }
            function distToSegment(p, v, w) {
                return Math.sqrt(distToSegmentSquared(p, v, w));
            }
        };
        return WebGLInteractor;
    })();
    glutils.WebGLInteractor = WebGLInteractor;
    function mouseToWorldCoordinates(mouseX, mouseY) {
        var rect = webgl.canvas.getBoundingClientRect();
        var x = webgl.camera.position.x + webgl.camera.left / webgl.camera.zoom + (mouseX - rect.left) / webgl.camera.zoom;
        var y = webgl.camera.position.y + webgl.camera.top / webgl.camera.zoom - (mouseY - rect.top) / webgl.camera.zoom;
        return [x, y];
    }
    glutils.mouseToWorldCoordinates = mouseToWorldCoordinates;
    function curve(points) {
        var arrayPoints = [];
        for (var i = 0; i < points.length; i++) {
            if (!isNaN(points[i].x))
                arrayPoints.push([points[i].x, points[i].y]);
        }
        var spline = new BSpline(arrayPoints, 3);
        var curvePoints = [];
        for (var t = 0; t <= 1; t += 0.01) {
            var p = spline.calcAt(t);
            curvePoints.push({ x: p[0], y: p[1] });
        }
        return curvePoints;
    }
    glutils.curve = curve;
    var CheckBox = (function () {
        function CheckBox() {
            var _this = this;
            this.selected = false;
            this.frame = selectAll()
                .data([0])
                .append('circle')
                .attr('r', 5)
                .style('fill', '#fff')
                .style('stroke', '#000000')
                .on('click', function () {
                _this.selected = !_this.selected;
                _this.circle.style('opacity', _this.selected ? 1 : 0);
                if (_this.changeCallBack != undefined)
                    _this.changeCallBack();
            });
            this.circle = selectAll()
                .data([0]);
        }
        CheckBox.prototype.attr = function (attrName, value) {
            switch (attrName) {
                case 'x':
                    this.frame.attr('x', value);
                    return this;
                case 'y':
                    this.frame.attr('y', value);
                    return this;
            }
        };
        CheckBox.prototype.on = function (eventType, fn) {
            switch (eventType) {
                case 'change': this.changeCallBack = fn;
            }
        };
        return CheckBox;
    })();
    glutils.CheckBox = CheckBox;
})(glutils || (glutils = {}));
var THREEx = THREEx || {};
THREEx.DynamicTexture = function (width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    var context = canvas.getContext('2d');
    this.context = context;
    var texture = new THREE.Texture(canvas);
    this.texture = texture;
};
THREEx.DynamicTexture.prototype.clear = function (fillStyle) {
    if (fillStyle !== undefined) {
        this.context.fillStyle = fillStyle;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.texture.needsUpdate = true;
    return this;
};
THREEx.DynamicTexture.prototype.drawText = function (text, x, y, fillStyle, contextFont) {
    if (contextFont !== undefined)
        this.context.font = contextFont;
    if (x === undefined || x === null) {
        var textSize = this.context.measureText(text);
        x = (this.canvas.width - textSize.width) / 2;
    }
    this.context.fillStyle = fillStyle;
    this.context.fillText(text, x, y);
    this.texture.needsUpdate = true;
    return this;
};
THREEx.DynamicTexture.prototype.drawTextCooked = function (text, options) {
    var context = this.context;
    var canvas = this.canvas;
    options = options || {};
    var params = {
        margin: options.margin !== undefined ? options.margin : 0.1,
        lineHeight: options.lineHeight !== undefined ? options.lineHeight : 0.1,
        align: options.align !== undefined ? options.align : 'left',
        fillStyle: options.fillStyle !== undefined ? options.fillStyle : 'black',
    };
    context.save();
    context.fillStyle = params.fillStyle;
    var y = (params.lineHeight + params.margin) * canvas.height;
    while (text.length > 0) {
        var maxText = computeMaxTextLength(text);
        text = text.substr(maxText.length);
        var textSize = context.measureText(maxText);
        if (params.align === 'left') {
            var x = params.margin * canvas.width;
        }
        else if (params.align === 'right') {
            var x = (1 - params.margin) * canvas.width - textSize.width;
        }
        else if (params.align === 'center') {
            var x = (canvas.width - textSize.width) / 2;
        }
        else
            console.assert(false);
        this.context.fillText(maxText, x, y);
        y += params.lineHeight * canvas.height;
    }
    context.restore();
    this.texture.needsUpdate = true;
    return this;
    function computeMaxTextLength(text) {
        var maxText = '';
        var maxWidth = (1 - params.margin * 2) * canvas.width;
        while (maxText.length !== text.length) {
            var textSize = context.measureText(maxText);
            if (textSize.width > maxWidth)
                break;
            maxText += text.substr(maxText.length, 1);
        }
        return maxText;
    }
};
THREEx.DynamicTexture.prototype.drawImage = function () {
    this.context.drawImage.apply(this.context, arguments);
    this.texture.needsUpdate = true;
    return this;
};
var geometry;
(function (geometry) {
    function length(v1) {
        return Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
    }
    geometry.length = length;
    function normalize(v) {
        var l = length(v);
        return [v[0] / l, v[1] / l];
    }
    geometry.normalize = normalize;
    function setLength(v, l) {
        var len = length(v);
        return [l * v[0] / len, l * v[1] / len];
    }
    geometry.setLength = setLength;
})(geometry || (geometry = {}));
//# sourceMappingURL=networkcube.js.map