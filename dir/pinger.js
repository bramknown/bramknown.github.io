!function r(i, o, a) {
    function s(t, e) {
        if (!o[t]) {
            if (!i[t]) {
                var n = "function" == typeof require && require;
                if (!e && n)
                    return n(t, !0);
                if (l)
                    return l(t, !0);
                throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND",
                e
            }
            n = o[t] = {
                exports: {}
            },
            i[t][0].call(n.exports, function(e) {
                return s(i[t][1][e] || e)
            }, n, n.exports, r, i, o, a)
        }
        return o[t].exports
    }
    for (var l = "function" == typeof require && require, e = 0; e < a.length; e++)
        s(a[e]);
    return s
}({
    1: [function(e, t, n) {
        e("../../modules/es.string.iterator"),
        e("../../modules/es.array.from");
        e = e("../../internals/path");
        t.exports = e.Array.from
    }
    , {
        "../../internals/path": 83,
        "../../modules/es.array.from": 106,
        "../../modules/es.string.iterator": 110
    }],
    2: [function(e, t, n) {
        e("../../modules/es.array.includes");
        e = e("../../internals/entry-unbind");
        t.exports = e("Array", "includes")
    }
    , {
        "../../internals/entry-unbind": 25,
        "../../modules/es.array.includes": 107
    }],
    3: [function(e, t, n) {
        e("../../modules/es.object.assign");
        e = e("../../internals/path");
        t.exports = e.Object.assign
    }
    , {
        "../../internals/path": 83,
        "../../modules/es.object.assign": 108
    }],
    4: [function(e, t, n) {
        e("../../modules/es.object.entries");
        e = e("../../internals/path");
        t.exports = e.Object.entries
    }
    , {
        "../../internals/path": 83,
        "../../modules/es.object.entries": 109
    }],
    5: [function(e, t, n) {
        var r = e("../internals/is-callable")
          , i = e("../internals/try-to-string")
          , o = TypeError;
        t.exports = function(e) {
            if (r(e))
                return e;
            throw new o(i(e) + " is not a function")
        }
    }
    , {
        "../internals/is-callable": 51,
        "../internals/try-to-string": 100
    }],
    6: [function(e, t, n) {
        var r = e("../internals/is-possible-prototype")
          , i = String
          , o = TypeError;
        t.exports = function(e) {
            if (r(e))
                return e;
            throw new o("Can't set " + i(e) + " as a prototype")
        }
    }
    , {
        "../internals/is-possible-prototype": 56
    }],
    7: [function(e, t, n) {
        var r = e("../internals/well-known-symbol")
          , i = e("../internals/object-create")
          , e = e("../internals/object-define-property").f
          , o = r("unscopables")
          , a = Array.prototype;
        void 0 === a[o] && e(a, o, {
            configurable: !0,
            value: i(null)
        }),
        t.exports = function(e) {
            a[o][e] = !0
        }
    }
    , {
        "../internals/object-create": 68,
        "../internals/object-define-property": 70,
        "../internals/well-known-symbol": 105
    }],
    8: [function(e, t, n) {
        var r = e("../internals/is-object")
          , i = String
          , o = TypeError;
        t.exports = function(e) {
            if (r(e))
                return e;
            throw new o(i(e) + " is not an object")
        }
    }
    , {
        "../internals/is-object": 55
    }],
    9: [function(e, t, n) {
        var f = e("../internals/function-bind-context")
          , d = e("../internals/function-call")
          , h = e("../internals/to-object")
          , g = e("../internals/call-with-safe-iteration-closing")
          , y = e("../internals/is-array-iterator-method")
          , b = e("../internals/is-constructor")
          , m = e("../internals/length-of-array-like")
          , v = e("../internals/create-property")
          , _ = e("../internals/get-iterator")
          , w = e("../internals/get-iterator-method")
          , k = Array;
        t.exports = function(e) {
            var t, n, r, i, o, a, s = h(e), e = b(this), l = arguments.length, c = 1 < l ? arguments[1] : void 0, u = void 0 !== c, l = (u && (c = f(c, 2 < l ? arguments[2] : void 0)),
            w(s)), p = 0;
            if (!l || this === k && y(l))
                for (t = m(s),
                n = e ? new this(t) : k(t); p < t; p++)
                    a = u ? c(s[p], p) : s[p],
                    v(n, p, a);
            else
                for (n = e ? new this : [],
                o = (i = _(s, l)).next; !(r = d(o, i)).done; p++)
                    a = u ? g(i, c, [r.value, p], !0) : r.value,
                    v(n, p, a);
            return n.length = p,
            n
        }
    }
    , {
        "../internals/call-with-safe-iteration-closing": 11,
        "../internals/create-property": 20,
        "../internals/function-bind-context": 31,
        "../internals/function-call": 33,
        "../internals/get-iterator": 40,
        "../internals/get-iterator-method": 39,
        "../internals/is-array-iterator-method": 50,
        "../internals/is-constructor": 52,
        "../internals/length-of-array-like": 64,
        "../internals/to-object": 95
    }],
    10: [function(e, t, n) {
        function r(s) {
            return function(e, t, n) {
                var r = l(e)
                  , i = u(r);
                if (0 !== i) {
                    var o, a = c(n, i);
                    if (s && t != t) {
                        for (; a < i; )
                            if ((o = r[a++]) != o)
                                return !0
                    } else
                        for (; a < i; a++)
                            if ((s || a in r) && r[a] === t)
                                return s || a || 0
                }
                return !s && -1
            }
        }
        var l = e("../internals/to-indexed-object")
          , c = e("../internals/to-absolute-index")
          , u = e("../internals/length-of-array-like");
        t.exports = {
            includes: r(!0),
            indexOf: r(!1)
        }
    }
    , {
        "../internals/length-of-array-like": 64,
        "../internals/to-absolute-index": 91,
        "../internals/to-indexed-object": 92
    }],
    11: [function(e, t, n) {
        var i = e("../internals/an-object")
          , o = e("../internals/iterator-close");
        t.exports = function(t, e, n, r) {
            try {
                return r ? e(i(n)[0], n[1]) : e(n)
            } catch (e) {
                o(t, "throw", e)
            }
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/iterator-close": 59
    }],
    12: [function(e, t, n) {
        var i = e("../internals/well-known-symbol")("iterator")
          , o = !1;
        try {
            var r = 0
              , a = {
                next: function() {
                    return {
                        done: !!r++
                    }
                },
                return: function() {
                    o = !0
                }
            };
            a[i] = function() {
                return this
            }
            ,
            Array.from(a, function() {
                throw 2
            })
        } catch (e) {}
        t.exports = function(e, t) {
            try {
                if (!t && !o)
                    return !1
            } catch (e) {
                return !1
            }
            var n = !1;
            try {
                var r = {};
                r[i] = function() {
                    return {
                        next: function() {
                            return {
                                done: n = !0
                            }
                        }
                    }
                }
                ,
                e(r)
            } catch (e) {}
            return n
        }
    }
    , {
        "../internals/well-known-symbol": 105
    }],
    13: [function(e, t, n) {
        var e = e("../internals/function-uncurry-this")
          , r = e({}.toString)
          , i = e("".slice);
        t.exports = function(e) {
            return i(r(e), 8, -1)
        }
    }
    , {
        "../internals/function-uncurry-this": 37
    }],
    14: [function(e, t, n) {
        var r = e("../internals/to-string-tag-support")
          , i = e("../internals/is-callable")
          , o = e("../internals/classof-raw")
          , a = e("../internals/well-known-symbol")("toStringTag")
          , s = Object
          , l = "Arguments" === o(function() {
            return arguments
        }());
        t.exports = r ? o : function(e) {
            var t;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (t = ( (e, t) => {
                try {
                    return e[t]
                } catch (e) {}
            }
            )(e = s(e), a)) ? t : l ? o(e) : "Object" === (t = o(e)) && i(e.callee) ? "Arguments" : t
        }
    }
    , {
        "../internals/classof-raw": 13,
        "../internals/is-callable": 51,
        "../internals/to-string-tag-support": 98,
        "../internals/well-known-symbol": 105
    }],
    15: [function(e, t, n) {
        var l = e("../internals/has-own-property")
          , c = e("../internals/own-keys")
          , u = e("../internals/object-get-own-property-descriptor")
          , p = e("../internals/object-define-property");
        t.exports = function(e, t, n) {
            for (var r = c(t), i = p.f, o = u.f, a = 0; a < r.length; a++) {
                var s = r[a];
                l(e, s) || n && l(n, s) || i(e, s, o(t, s))
            }
        }
    }
    , {
        "../internals/has-own-property": 43,
        "../internals/object-define-property": 70,
        "../internals/object-get-own-property-descriptor": 71,
        "../internals/own-keys": 82
    }],
    16: [function(e, t, n) {
        e = e("../internals/fails");
        t.exports = !e(function() {
            function e() {}
            return e.prototype.constructor = null,
            Object.getPrototypeOf(new e) !== e.prototype
        })
    }
    , {
        "../internals/fails": 30
    }],
    17: [function(e, t, n) {
        t.exports = function(e, t) {
            return {
                value: e,
                done: t
            }
        }
    }
    , {}],
    18: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/object-define-property")
          , o = e("../internals/create-property-descriptor");
        t.exports = r ? function(e, t, n) {
            return i.f(e, t, o(1, n))
        }
        : function(e, t, n) {
            return e[t] = n,
            e
        }
    }
    , {
        "../internals/create-property-descriptor": 19,
        "../internals/descriptors": 23,
        "../internals/object-define-property": 70
    }],
    19: [function(e, t, n) {
        t.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    }
    , {}],
    20: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/object-define-property")
          , o = e("../internals/create-property-descriptor");
        t.exports = function(e, t, n) {
            r ? i.f(e, t, o(0, n)) : e[t] = n
        }
    }
    , {
        "../internals/create-property-descriptor": 19,
        "../internals/descriptors": 23,
        "../internals/object-define-property": 70
    }],
    21: [function(e, t, n) {
        var a = e("../internals/is-callable")
          , s = e("../internals/object-define-property")
          , l = e("../internals/make-built-in")
          , c = e("../internals/define-global-property");
        t.exports = function(e, t, n, r) {
            var i = (r = r || {}).enumerable
              , o = void 0 !== r.name ? r.name : t;
            if (a(n) && l(n, o, r),
            r.global)
                i ? e[t] = n : c(t, n);
            else {
                try {
                    r.unsafe ? e[t] && (i = !0) : delete e[t]
                } catch (e) {}
                i ? e[t] = n : s.f(e, t, {
                    value: n,
                    enumerable: !1,
                    configurable: !r.nonConfigurable,
                    writable: !r.nonWritable
                })
            }
            return e
        }
    }
    , {
        "../internals/define-global-property": 22,
        "../internals/is-callable": 51,
        "../internals/make-built-in": 65,
        "../internals/object-define-property": 70
    }],
    22: [function(e, t, n) {
        var r = e("../internals/global-this")
          , i = Object.defineProperty;
        t.exports = function(t, n) {
            try {
                i(r, t, {
                    value: n,
                    configurable: !0,
                    writable: !0
                })
            } catch (e) {
                r[t] = n
            }
            return n
        }
    }
    , {
        "../internals/global-this": 42
    }],
    23: [function(e, t, n) {
        e = e("../internals/fails");
        t.exports = !e(function() {
            return 7 !== Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })
    }
    , {
        "../internals/fails": 30
    }],
    24: [function(e, t, n) {
        var r = e("../internals/global-this")
          , e = e("../internals/is-object")
          , i = r.document
          , o = e(i) && e(i.createElement);
        t.exports = function(e) {
            return o ? i.createElement(e) : {}
        }
    }
    , {
        "../internals/global-this": 42,
        "../internals/is-object": 55
    }],
    25: [function(e, t, n) {
        var r = e("../internals/global-this")
          , i = e("../internals/function-uncurry-this");
        t.exports = function(e, t) {
            return i(r[e].prototype[t])
        }
    }
    , {
        "../internals/function-uncurry-this": 37,
        "../internals/global-this": 42
    }],
    26: [function(e, t, n) {
        t.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
    }
    , {}],
    27: [function(e, t, n) {
        e = e("../internals/global-this").navigator,
        e = e && e.userAgent;
        t.exports = e ? String(e) : ""
    }
    , {
        "../internals/global-this": 42
    }],
    28: [function(e, t, n) {
        var r, i, o = e("../internals/global-this"), e = e("../internals/environment-user-agent"), a = o.process, o = o.Deno, a = a && a.versions || o && o.version, o = a && a.v8;
        !(i = o ? 0 < (r = o.split("."))[0] && r[0] < 4 ? 1 : +(r[0] + r[1]) : i) && e && (!(r = e.match(/Edge\/(\d+)/)) || 74 <= r[1]) && (r = e.match(/Chrome\/(\d+)/)) && (i = +r[1]),
        t.exports = i
    }
    , {
        "../internals/environment-user-agent": 27,
        "../internals/global-this": 42
    }],
    29: [function(e, t, n) {
        var c = e("../internals/global-this")
          , u = e("../internals/object-get-own-property-descriptor").f
          , p = e("../internals/create-non-enumerable-property")
          , f = e("../internals/define-built-in")
          , d = e("../internals/define-global-property")
          , h = e("../internals/copy-constructor-properties")
          , g = e("../internals/is-forced");
        t.exports = function(e, t) {
            var n, r, i, o = e.target, a = e.global, s = e.stat, l = a ? c : s ? c[o] || d(o, {}) : c[o] && c[o].prototype;
            if (l)
                for (n in t) {
                    if (r = t[n],
                    i = e.dontCallGetSet ? (i = u(l, n)) && i.value : l[n],
                    !g(a ? n : o + (s ? "." : "#") + n, e.forced) && void 0 !== i) {
                        if (typeof r == typeof i)
                            continue;
                        h(r, i)
                    }
                    (e.sham || i && i.sham) && p(r, "sham", !0),
                    f(l, n, r, e)
                }
        }
    }
    , {
        "../internals/copy-constructor-properties": 15,
        "../internals/create-non-enumerable-property": 18,
        "../internals/define-built-in": 21,
        "../internals/define-global-property": 22,
        "../internals/global-this": 42,
        "../internals/is-forced": 53,
        "../internals/object-get-own-property-descriptor": 71
    }],
    30: [function(e, t, n) {
        t.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }
    , {}],
    31: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this-clause")
          , i = e("../internals/a-callable")
          , o = e("../internals/function-bind-native")
          , a = r(r.bind);
        t.exports = function(e, t) {
            return i(e),
            void 0 === t ? e : o ? a(e, t) : function() {
                return e.apply(t, arguments)
            }
        }
    }
    , {
        "../internals/a-callable": 5,
        "../internals/function-bind-native": 32,
        "../internals/function-uncurry-this-clause": 36
    }],
    32: [function(e, t, n) {
        e = e("../internals/fails");
        t.exports = !e(function() {
            var e = function() {}
            .bind();
            return "function" != typeof e || e.hasOwnProperty("prototype")
        })
    }
    , {
        "../internals/fails": 30
    }],
    33: [function(e, t, n) {
        var e = e("../internals/function-bind-native")
          , r = Function.prototype.call;
        t.exports = e ? r.bind(r) : function() {
            return r.apply(r, arguments)
        }
    }
    , {
        "../internals/function-bind-native": 32
    }],
    34: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , e = e("../internals/has-own-property")
          , i = Function.prototype
          , o = r && Object.getOwnPropertyDescriptor
          , e = e(i, "name")
          , a = e && "something" === function() {}
        .name
          , r = e && (!r || o(i, "name").configurable);
        t.exports = {
            EXISTS: e,
            PROPER: a,
            CONFIGURABLE: r
        }
    }
    , {
        "../internals/descriptors": 23,
        "../internals/has-own-property": 43
    }],
    35: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , i = e("../internals/a-callable");
        t.exports = function(e, t, n) {
            try {
                return r(i(Object.getOwnPropertyDescriptor(e, t)[n]))
            } catch (e) {}
        }
    }
    , {
        "../internals/a-callable": 5,
        "../internals/function-uncurry-this": 37
    }],
    36: [function(e, t, n) {
        var r = e("../internals/classof-raw")
          , i = e("../internals/function-uncurry-this");
        t.exports = function(e) {
            if ("Function" === r(e))
                return i(e)
        }
    }
    , {
        "../internals/classof-raw": 13,
        "../internals/function-uncurry-this": 37
    }],
    37: [function(e, t, n) {
        var e = e("../internals/function-bind-native")
          , r = Function.prototype
          , i = r.call
          , r = e && r.bind.bind(i, i);
        t.exports = e ? r : function(e) {
            return function() {
                return i.apply(e, arguments)
            }
        }
    }
    , {
        "../internals/function-bind-native": 32
    }],
    38: [function(e, t, n) {
        var r = e("../internals/global-this")
          , i = e("../internals/is-callable");
        t.exports = function(e, t) {
            return arguments.length < 2 ? (n = r[e],
            i(n) ? n : void 0) : r[e] && r[e][t];
            var n
        }
    }
    , {
        "../internals/global-this": 42,
        "../internals/is-callable": 51
    }],
    39: [function(e, t, n) {
        var r = e("../internals/classof")
          , i = e("../internals/get-method")
          , o = e("../internals/is-null-or-undefined")
          , a = e("../internals/iterators")
          , s = e("../internals/well-known-symbol")("iterator");
        t.exports = function(e) {
            if (!o(e))
                return i(e, s) || i(e, "@@iterator") || a[r(e)]
        }
    }
    , {
        "../internals/classof": 14,
        "../internals/get-method": 41,
        "../internals/is-null-or-undefined": 54,
        "../internals/iterators": 63,
        "../internals/well-known-symbol": 105
    }],
    40: [function(e, t, n) {
        var r = e("../internals/function-call")
          , i = e("../internals/a-callable")
          , o = e("../internals/an-object")
          , a = e("../internals/try-to-string")
          , s = e("../internals/get-iterator-method")
          , l = TypeError;
        t.exports = function(e, t) {
            t = arguments.length < 2 ? s(e) : t;
            if (i(t))
                return o(r(t, e));
            throw new l(a(e) + " is not iterable")
        }
    }
    , {
        "../internals/a-callable": 5,
        "../internals/an-object": 8,
        "../internals/function-call": 33,
        "../internals/get-iterator-method": 39,
        "../internals/try-to-string": 100
    }],
    41: [function(e, t, n) {
        var r = e("../internals/a-callable")
          , i = e("../internals/is-null-or-undefined");
        t.exports = function(e, t) {
            e = e[t];
            return i(e) ? void 0 : r(e)
        }
    }
    , {
        "../internals/a-callable": 5,
        "../internals/is-null-or-undefined": 54
    }],
    42: [function(e, n, t) {
        !function(t) {
            !function() {
                function e(e) {
                    return e && e.Math === Math && e
                }
                n.exports = e("object" == typeof globalThis && globalThis) || e("object" == typeof window && window) || e("object" == typeof self && self) || e("object" == typeof t && t) || e("object" == typeof this && this) || function() {
                    return this
                }() || Function("return this")()
            }
            .call(this)
        }
        .call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    43: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , i = e("../internals/to-object")
          , o = r({}.hasOwnProperty);
        t.exports = Object.hasOwn || function(e, t) {
            return o(i(e), t)
        }
    }
    , {
        "../internals/function-uncurry-this": 37,
        "../internals/to-object": 95
    }],
    44: [function(e, t, n) {
        t.exports = {}
    }
    , {}],
    45: [function(e, t, n) {
        e = e("../internals/get-built-in");
        t.exports = e("document", "documentElement")
    }
    , {
        "../internals/get-built-in": 38
    }],
    46: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/fails")
          , o = e("../internals/document-create-element");
        t.exports = !r && !i(function() {
            return 7 !== Object.defineProperty(o("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }
    , {
        "../internals/descriptors": 23,
        "../internals/document-create-element": 24,
        "../internals/fails": 30
    }],
    47: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , i = e("../internals/fails")
          , o = e("../internals/classof-raw")
          , a = Object
          , s = r("".split);
        t.exports = i(function() {
            return !a("z").propertyIsEnumerable(0)
        }) ? function(e) {
            return "String" === o(e) ? s(e, "") : a(e)
        }
        : a
    }
    , {
        "../internals/classof-raw": 13,
        "../internals/fails": 30,
        "../internals/function-uncurry-this": 37
    }],
    48: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , i = e("../internals/is-callable")
          , e = e("../internals/shared-store")
          , o = r(Function.toString);
        i(e.inspectSource) || (e.inspectSource = function(e) {
            return o(e)
        }
        ),
        t.exports = e.inspectSource
    }
    , {
        "../internals/function-uncurry-this": 37,
        "../internals/is-callable": 51,
        "../internals/shared-store": 87
    }],
    49: [function(e, t, n) {
        var r, i, o, a, s = e("../internals/weak-map-basic-detection"), l = e("../internals/global-this"), c = e("../internals/is-object"), u = e("../internals/create-non-enumerable-property"), p = e("../internals/has-own-property"), f = e("../internals/shared-store"), d = e("../internals/shared-key"), e = e("../internals/hidden-keys"), h = "Object already initialized", g = l.TypeError, l = l.WeakMap, y = s || f.state ? ((o = f.state || (f.state = new l)).get = o.get,
        o.has = o.has,
        o.set = o.set,
        r = function(e, t) {
            if (o.has(e))
                throw new g(h);
            return t.facade = e,
            o.set(e, t),
            t
        }
        ,
        i = function(e) {
            return o.get(e) || {}
        }
        ,
        function(e) {
            return o.has(e)
        }
        ) : (e[a = d("state")] = !0,
        r = function(e, t) {
            if (p(e, a))
                throw new g(h);
            return t.facade = e,
            u(e, a, t),
            t
        }
        ,
        i = function(e) {
            return p(e, a) ? e[a] : {}
        }
        ,
        function(e) {
            return p(e, a)
        }
        );
        t.exports = {
            set: r,
            get: i,
            has: y,
            enforce: function(e) {
                return y(e) ? i(e) : r(e, {})
            },
            getterFor: function(t) {
                return function(e) {
                    if (c(e) && (e = i(e)).type === t)
                        return e;
                    throw new g("Incompatible receiver, " + t + " required")
                }
            }
        }
    }
    , {
        "../internals/create-non-enumerable-property": 18,
        "../internals/global-this": 42,
        "../internals/has-own-property": 43,
        "../internals/hidden-keys": 44,
        "../internals/is-object": 55,
        "../internals/shared-key": 86,
        "../internals/shared-store": 87,
        "../internals/weak-map-basic-detection": 104
    }],
    50: [function(e, t, n) {
        var r = e("../internals/well-known-symbol")
          , i = e("../internals/iterators")
          , o = r("iterator")
          , a = Array.prototype;
        t.exports = function(e) {
            return void 0 !== e && (i.Array === e || a[o] === e)
        }
    }
    , {
        "../internals/iterators": 63,
        "../internals/well-known-symbol": 105
    }],
    51: [function(e, t, n) {
        var r = "object" == typeof document && document.all;
        t.exports = void 0 === r && void 0 !== r ? function(e) {
            return "function" == typeof e || e === r
        }
        : function(e) {
            return "function" == typeof e
        }
    }
    , {}],
    52: [function(e, t, n) {
        function r() {}
        function i(e) {
            if (!l(e))
                return !1;
            try {
                return f(r, [], e),
                !0
            } catch (e) {
                return !1
            }
        }
        function o(e) {
            if (!l(e))
                return !1;
            switch (c(e)) {
            case "AsyncFunction":
            case "GeneratorFunction":
            case "AsyncGeneratorFunction":
                return !1
            }
            try {
                return g || !!h(d, p(e))
            } catch (e) {
                return !0
            }
        }
        var a = e("../internals/function-uncurry-this")
          , s = e("../internals/fails")
          , l = e("../internals/is-callable")
          , c = e("../internals/classof")
          , u = e("../internals/get-built-in")
          , p = e("../internals/inspect-source")
          , f = u("Reflect", "construct")
          , d = /^\s*(?:class|function)\b/
          , h = a(d.exec)
          , g = !d.test(r);
        o.sham = !0,
        t.exports = !f || s(function() {
            var e;
            return i(i.call) || !i(Object) || !i(function() {
                e = !0
            }) || e
        }) ? o : i
    }
    , {
        "../internals/classof": 14,
        "../internals/fails": 30,
        "../internals/function-uncurry-this": 37,
        "../internals/get-built-in": 38,
        "../internals/inspect-source": 48,
        "../internals/is-callable": 51
    }],
    53: [function(e, t, n) {
        function r(e, t) {
            return (e = l[s(e)]) === u || e !== c && (o(t) ? i(t) : !!t)
        }
        var i = e("../internals/fails")
          , o = e("../internals/is-callable")
          , a = /#|\.prototype\./
          , s = r.normalize = function(e) {
            return String(e).replace(a, ".").toLowerCase()
        }
          , l = r.data = {}
          , c = r.NATIVE = "N"
          , u = r.POLYFILL = "P";
        t.exports = r
    }
    , {
        "../internals/fails": 30,
        "../internals/is-callable": 51
    }],
    54: [function(e, t, n) {
        t.exports = function(e) {
            return null == e
        }
    }
    , {}],
    55: [function(e, t, n) {
        var r = e("../internals/is-callable");
        t.exports = function(e) {
            return "object" == typeof e ? null !== e : r(e)
        }
    }
    , {
        "../internals/is-callable": 51
    }],
    56: [function(e, t, n) {
        var r = e("../internals/is-object");
        t.exports = function(e) {
            return r(e) || null === e
        }
    }
    , {
        "../internals/is-object": 55
    }],
    57: [function(e, t, n) {
        t.exports = !1
    }
    , {}],
    58: [function(e, t, n) {
        var r = e("../internals/get-built-in")
          , i = e("../internals/is-callable")
          , o = e("../internals/object-is-prototype-of")
          , e = e("../internals/use-symbol-as-uid")
          , a = Object;
        t.exports = e ? function(e) {
            return "symbol" == typeof e
        }
        : function(e) {
            var t = r("Symbol");
            return i(t) && o(t.prototype, a(e))
        }
    }
    , {
        "../internals/get-built-in": 38,
        "../internals/is-callable": 51,
        "../internals/object-is-prototype-of": 75,
        "../internals/use-symbol-as-uid": 102
    }],
    59: [function(e, t, n) {
        var o = e("../internals/function-call")
          , a = e("../internals/an-object")
          , s = e("../internals/get-method");
        t.exports = function(e, t, n) {
            var r, i;
            a(e);
            try {
                if (!(r = s(e, "return"))) {
                    if ("throw" === t)
                        throw n;
                    return n
                }
                r = o(r, e)
            } catch (e) {
                i = !0,
                r = e
            }
            if ("throw" === t)
                throw n;
            if (i)
                throw r;
            return a(r),
            n
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/function-call": 33,
        "../internals/get-method": 41
    }],
    60: [function(e, t, n) {
        function i() {
            return this
        }
        var o = e("../internals/iterators-core").IteratorPrototype
          , a = e("../internals/object-create")
          , s = e("../internals/create-property-descriptor")
          , l = e("../internals/set-to-string-tag")
          , c = e("../internals/iterators");
        t.exports = function(e, t, n, r) {
            t += " Iterator";
            return e.prototype = a(o, {
                next: s(+!r, n)
            }),
            l(e, t, !1, !0),
            c[t] = i,
            e
        }
    }
    , {
        "../internals/create-property-descriptor": 19,
        "../internals/iterators": 63,
        "../internals/iterators-core": 62,
        "../internals/object-create": 68,
        "../internals/set-to-string-tag": 85
    }],
    61: [function(e, t, n) {
        function g() {
            return this
        }
        var y = e("../internals/export")
          , b = e("../internals/function-call")
          , m = e("../internals/is-pure")
          , r = e("../internals/function-name")
          , v = e("../internals/is-callable")
          , _ = e("../internals/iterator-create-constructor")
          , w = e("../internals/object-get-prototype-of")
          , k = e("../internals/object-set-prototype-of")
          , j = e("../internals/set-to-string-tag")
          , S = e("../internals/create-non-enumerable-property")
          , P = e("../internals/define-built-in")
          , i = e("../internals/well-known-symbol")
          , O = e("../internals/iterators")
          , e = e("../internals/iterators-core")
          , x = r.PROPER
          , C = r.CONFIGURABLE
          , E = e.IteratorPrototype
          , A = e.BUGGY_SAFARI_ITERATORS
          , D = i("iterator")
          , T = "values"
          , U = "entries";
        t.exports = function(e, t, n, r, i, o, a) {
            _(n, t, r);
            function s(e) {
                if (e === i && d)
                    return d;
                if (!A && e && e in p)
                    return p[e];
                switch (e) {
                case "keys":
                case T:
                case U:
                    return function() {
                        return new n(this,e)
                    }
                }
                return function() {
                    return new n(this)
                }
            }
            var l, c, r = t + " Iterator", u = !1, p = e.prototype, f = p[D] || p["@@iterator"] || i && p[i], d = !A && f || s(i), h = "Array" === t && p.entries || f;
            if (h && (h = w(h.call(new e))) !== Object.prototype && h.next && (m || w(h) === E || (k ? k(h, E) : v(h[D]) || P(h, D, g)),
            j(h, r, !0, !0),
            m) && (O[r] = g),
            x && i === T && f && f.name !== T && (!m && C ? S(p, "name", T) : (u = !0,
            d = function() {
                return b(f, this)
            }
            )),
            i)
                if (l = {
                    values: s(T),
                    keys: o ? d : s("keys"),
                    entries: s(U)
                },
                a)
                    for (c in l)
                        !A && !u && c in p || P(p, c, l[c]);
                else
                    y({
                        target: t,
                        proto: !0,
                        forced: A || u
                    }, l);
            return m && !a || p[D] === d || P(p, D, d, {
                name: i
            }),
            O[t] = d,
            l
        }
    }
    , {
        "../internals/create-non-enumerable-property": 18,
        "../internals/define-built-in": 21,
        "../internals/export": 29,
        "../internals/function-call": 33,
        "../internals/function-name": 34,
        "../internals/is-callable": 51,
        "../internals/is-pure": 57,
        "../internals/iterator-create-constructor": 60,
        "../internals/iterators": 63,
        "../internals/iterators-core": 62,
        "../internals/object-get-prototype-of": 74,
        "../internals/object-set-prototype-of": 79,
        "../internals/set-to-string-tag": 85,
        "../internals/well-known-symbol": 105
    }],
    62: [function(e, t, n) {
        var r, i, o = e("../internals/fails"), a = e("../internals/is-callable"), s = e("../internals/is-object"), l = e("../internals/object-create"), c = e("../internals/object-get-prototype-of"), u = e("../internals/define-built-in"), p = e("../internals/well-known-symbol"), e = e("../internals/is-pure"), f = p("iterator"), p = !1;
        [].keys && ("next"in (i = [].keys()) ? (c = c(c(i))) !== Object.prototype && (r = c) : p = !0),
        !s(r) || o(function() {
            var e = {};
            return r[f].call(e) !== e
        }) ? r = {} : e && (r = l(r)),
        a(r[f]) || u(r, f, function() {
            return this
        }),
        t.exports = {
            IteratorPrototype: r,
            BUGGY_SAFARI_ITERATORS: p
        }
    }
    , {
        "../internals/define-built-in": 21,
        "../internals/fails": 30,
        "../internals/is-callable": 51,
        "../internals/is-object": 55,
        "../internals/is-pure": 57,
        "../internals/object-create": 68,
        "../internals/object-get-prototype-of": 74,
        "../internals/well-known-symbol": 105
    }],
    63: [function(e, t, n) {
        arguments[4][44][0].apply(n, arguments)
    }
    , {
        dup: 44
    }],
    64: [function(e, t, n) {
        var r = e("../internals/to-length");
        t.exports = function(e) {
            return r(e.length)
        }
    }
    , {
        "../internals/to-length": 94
    }],
    65: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , i = e("../internals/fails")
          , o = e("../internals/is-callable")
          , a = e("../internals/has-own-property")
          , s = e("../internals/descriptors")
          , l = e("../internals/function-name").CONFIGURABLE
          , c = e("../internals/inspect-source")
          , e = e("../internals/internal-state")
          , u = e.enforce
          , p = e.get
          , f = String
          , d = Object.defineProperty
          , h = r("".slice)
          , g = r("".replace)
          , y = r([].join)
          , b = s && !i(function() {
            return 8 !== d(function() {}, "length", {
                value: 8
            }).length
        })
          , m = String(String).split("String")
          , e = t.exports = function(e, t, n) {
            "Symbol(" === h(f(t), 0, 7) && (t = "[" + g(f(t), /^Symbol\(([^)]*)\).*$/, "$1") + "]"),
            n && n.getter && (t = "get " + t),
            n && n.setter && (t = "set " + t),
            (!a(e, "name") || l && e.name !== t) && (s ? d(e, "name", {
                value: t,
                configurable: !0
            }) : e.name = t),
            b && n && a(n, "arity") && e.length !== n.arity && d(e, "length", {
                value: n.arity
            });
            try {
                n && a(n, "constructor") && n.constructor ? s && d(e, "prototype", {
                    writable: !1
                }) : e.prototype && (e.prototype = void 0)
            } catch (e) {}
            n = u(e);
            return a(n, "source") || (n.source = y(m, "string" == typeof t ? t : "")),
            e
        }
        ;
        Function.prototype.toString = e(function() {
            return o(this) && p(this).source || c(this)
        }, "toString")
    }
    , {
        "../internals/descriptors": 23,
        "../internals/fails": 30,
        "../internals/function-name": 34,
        "../internals/function-uncurry-this": 37,
        "../internals/has-own-property": 43,
        "../internals/inspect-source": 48,
        "../internals/internal-state": 49,
        "../internals/is-callable": 51
    }],
    66: [function(e, t, n) {
        var r = Math.ceil
          , i = Math.floor;
        t.exports = Math.trunc || function(e) {
            e = +e;
            return (0 < e ? i : r)(e)
        }
    }
    , {}],
    67: [function(e, t, n) {
        var f = e("../internals/descriptors")
          , r = e("../internals/function-uncurry-this")
          , d = e("../internals/function-call")
          , i = e("../internals/fails")
          , h = e("../internals/object-keys")
          , g = e("../internals/object-get-own-property-symbols")
          , y = e("../internals/object-property-is-enumerable")
          , b = e("../internals/to-object")
          , m = e("../internals/indexed-object")
          , o = Object.assign
          , a = Object.defineProperty
          , v = r([].concat);
        t.exports = !o || i(function() {
            var e, t, n, r;
            return !(!f || 1 === o({
                b: 1
            }, o(a({}, "a", {
                enumerable: !0,
                get: function() {
                    a(this, "b", {
                        value: 3,
                        enumerable: !1
                    })
                }
            }), {
                b: 2
            })).b) || (t = {},
            r = "abcdefghijklmnopqrst",
            (e = {})[n = Symbol("assign detection")] = 7,
            r.split("").forEach(function(e) {
                t[e] = e
            }),
            7 !== o({}, e)[n]) || h(o({}, t)).join("") !== r
        }) ? function(e, t) {
            for (var n = b(e), r = arguments.length, i = 1, o = g.f, a = y.f; i < r; )
                for (var s, l = m(arguments[i++]), c = o ? v(h(l), o(l)) : h(l), u = c.length, p = 0; p < u; )
                    s = c[p++],
                    f && !d(a, l, s) || (n[s] = l[s]);
            return n
        }
        : o
    }
    , {
        "../internals/descriptors": 23,
        "../internals/fails": 30,
        "../internals/function-call": 33,
        "../internals/function-uncurry-this": 37,
        "../internals/indexed-object": 47,
        "../internals/object-get-own-property-symbols": 73,
        "../internals/object-keys": 77,
        "../internals/object-property-is-enumerable": 78,
        "../internals/to-object": 95
    }],
    68: [function(e, t, n) {
        function r() {}
        function i(e) {
            e.write(b("")),
            e.close();
            var t = e.parentWindow.Object;
            return e = null,
            t
        }
        var o, a = e("../internals/an-object"), s = e("../internals/object-define-properties"), l = e("../internals/enum-bug-keys"), c = e("../internals/hidden-keys"), u = e("../internals/html"), p = e("../internals/document-create-element"), e = e("../internals/shared-key"), f = ">", d = "<", h = "prototype", g = "script", y = e("IE_PROTO"), b = function(e) {
            return d + g + f + e + d + "/" + g + f
        }, m = function() {
            try {
                o = new ActiveXObject("htmlfile")
            } catch (e) {}
            m = "undefined" == typeof document || document.domain && o ? i(o) : (e = p("iframe"),
            t = "java" + g + ":",
            e.style.display = "none",
            u.appendChild(e),
            e.src = String(t),
            (t = e.contentWindow.document).open(),
            t.write(b("document.F=Object")),
            t.close(),
            t.F);
            for (var e, t, n = l.length; n--; )
                delete m[h][l[n]];
            return m()
        };
        c[y] = !0,
        t.exports = Object.create || function(e, t) {
            var n;
            return null !== e ? (r[h] = a(e),
            n = new r,
            r[h] = null,
            n[y] = e) : n = m(),
            void 0 === t ? n : s.f(n, t)
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/document-create-element": 24,
        "../internals/enum-bug-keys": 26,
        "../internals/hidden-keys": 44,
        "../internals/html": 45,
        "../internals/object-define-properties": 69,
        "../internals/shared-key": 86
    }],
    69: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/v8-prototype-define-bug")
          , s = e("../internals/object-define-property")
          , l = e("../internals/an-object")
          , c = e("../internals/to-indexed-object")
          , u = e("../internals/object-keys");
        n.f = r && !i ? Object.defineProperties : function(e, t) {
            l(e);
            for (var n, r = c(t), i = u(t), o = i.length, a = 0; a < o; )
                s.f(e, n = i[a++], r[n]);
            return e
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/descriptors": 23,
        "../internals/object-define-property": 70,
        "../internals/object-keys": 77,
        "../internals/to-indexed-object": 92,
        "../internals/v8-prototype-define-bug": 103
    }],
    70: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/ie8-dom-define")
          , o = e("../internals/v8-prototype-define-bug")
          , a = e("../internals/an-object")
          , s = e("../internals/to-property-key")
          , l = TypeError
          , c = Object.defineProperty
          , u = Object.getOwnPropertyDescriptor
          , p = "enumerable"
          , f = "configurable"
          , d = "writable";
        n.f = r ? o ? function(e, t, n) {
            var r;
            return a(e),
            t = s(t),
            a(n),
            "function" == typeof e && "prototype" === t && "value"in n && d in n && !n[d] && (r = u(e, t)) && r[d] && (e[t] = n.value,
            n = {
                configurable: (f in n ? n : r)[f],
                enumerable: (p in n ? n : r)[p],
                writable: !1
            }),
            c(e, t, n)
        }
        : c : function(e, t, n) {
            if (a(e),
            t = s(t),
            a(n),
            i)
                try {
                    return c(e, t, n)
                } catch (e) {}
            if ("get"in n || "set"in n)
                throw new l("Accessors not supported");
            return "value"in n && (e[t] = n.value),
            e
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/descriptors": 23,
        "../internals/ie8-dom-define": 46,
        "../internals/to-property-key": 97,
        "../internals/v8-prototype-define-bug": 103
    }],
    71: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , i = e("../internals/function-call")
          , o = e("../internals/object-property-is-enumerable")
          , a = e("../internals/create-property-descriptor")
          , s = e("../internals/to-indexed-object")
          , l = e("../internals/to-property-key")
          , c = e("../internals/has-own-property")
          , u = e("../internals/ie8-dom-define")
          , p = Object.getOwnPropertyDescriptor;
        n.f = r ? p : function(e, t) {
            if (e = s(e),
            t = l(t),
            u)
                try {
                    return p(e, t)
                } catch (e) {}
            if (c(e, t))
                return a(!i(o.f, e, t), e[t])
        }
    }
    , {
        "../internals/create-property-descriptor": 19,
        "../internals/descriptors": 23,
        "../internals/function-call": 33,
        "../internals/has-own-property": 43,
        "../internals/ie8-dom-define": 46,
        "../internals/object-property-is-enumerable": 78,
        "../internals/to-indexed-object": 92,
        "../internals/to-property-key": 97
    }],
    72: [function(e, t, n) {
        var r = e("../internals/object-keys-internal")
          , i = e("../internals/enum-bug-keys").concat("length", "prototype");
        n.f = Object.getOwnPropertyNames || function(e) {
            return r(e, i)
        }
    }
    , {
        "../internals/enum-bug-keys": 26,
        "../internals/object-keys-internal": 76
    }],
    73: [function(e, t, n) {
        n.f = Object.getOwnPropertySymbols
    }
    , {}],
    74: [function(e, t, n) {
        var r = e("../internals/has-own-property")
          , i = e("../internals/is-callable")
          , o = e("../internals/to-object")
          , a = e("../internals/shared-key")
          , e = e("../internals/correct-prototype-getter")
          , s = a("IE_PROTO")
          , l = Object
          , c = l.prototype;
        t.exports = e ? l.getPrototypeOf : function(e) {
            var t, e = o(e);
            return r(e, s) ? e[s] : (t = e.constructor,
            i(t) && e instanceof t ? t.prototype : e instanceof l ? c : null)
        }
    }
    , {
        "../internals/correct-prototype-getter": 16,
        "../internals/has-own-property": 43,
        "../internals/is-callable": 51,
        "../internals/shared-key": 86,
        "../internals/to-object": 95
    }],
    75: [function(e, t, n) {
        e = e("../internals/function-uncurry-this");
        t.exports = e({}.isPrototypeOf)
    }
    , {
        "../internals/function-uncurry-this": 37
    }],
    76: [function(e, t, n) {
        var r = e("../internals/function-uncurry-this")
          , a = e("../internals/has-own-property")
          , s = e("../internals/to-indexed-object")
          , l = e("../internals/array-includes").indexOf
          , c = e("../internals/hidden-keys")
          , u = r([].push);
        t.exports = function(e, t) {
            var n, r = s(e), i = 0, o = [];
            for (n in r)
                !a(c, n) && a(r, n) && u(o, n);
            for (; t.length > i; )
                !a(r, n = t[i++]) || ~l(o, n) || u(o, n);
            return o
        }
    }
    , {
        "../internals/array-includes": 10,
        "../internals/function-uncurry-this": 37,
        "../internals/has-own-property": 43,
        "../internals/hidden-keys": 44,
        "../internals/to-indexed-object": 92
    }],
    77: [function(e, t, n) {
        var r = e("../internals/object-keys-internal")
          , i = e("../internals/enum-bug-keys");
        t.exports = Object.keys || function(e) {
            return r(e, i)
        }
    }
    , {
        "../internals/enum-bug-keys": 26,
        "../internals/object-keys-internal": 76
    }],
    78: [function(e, t, n) {
        var r = {}.propertyIsEnumerable
          , i = Object.getOwnPropertyDescriptor
          , o = i && !r.call({
            1: 2
        }, 1);
        n.f = o ? function(e) {
            e = i(this, e);
            return !!e && e.enumerable
        }
        : r
    }
    , {}],
    79: [function(e, t, n) {
        var i = e("../internals/function-uncurry-this-accessor")
          , o = e("../internals/is-object")
          , a = e("../internals/require-object-coercible")
          , s = e("../internals/a-possible-prototype");
        t.exports = Object.setPrototypeOf || ("__proto__"in {} ? ( () => {
            var n, r = !1, e = {};
            try {
                (n = i(Object.prototype, "__proto__", "set"))(e, []),
                r = e instanceof Array
            } catch (e) {}
            return function(e, t) {
                return a(e),
                s(t),
                o(e) && (r ? n(e, t) : e.__proto__ = t),
                e
            }
        }
        )() : void 0)
    }
    , {
        "../internals/a-possible-prototype": 6,
        "../internals/function-uncurry-this-accessor": 35,
        "../internals/is-object": 55,
        "../internals/require-object-coercible": 84
    }],
    80: [function(e, t, n) {
        function r(l) {
            return function(e) {
                for (var t, n = f(e), r = p(n), i = g && null === u(n), o = r.length, a = 0, s = []; a < o; )
                    t = r[a++],
                    c && !(i ? t in n : d(n, t)) || h(s, l ? [t, n[t]] : n[t]);
                return s
            }
        }
        var c = e("../internals/descriptors")
          , i = e("../internals/fails")
          , o = e("../internals/function-uncurry-this")
          , u = e("../internals/object-get-prototype-of")
          , p = e("../internals/object-keys")
          , f = e("../internals/to-indexed-object")
          , d = o(e("../internals/object-property-is-enumerable").f)
          , h = o([].push)
          , g = c && i(function() {
            var e = Object.create(null);
            return e[2] = 2,
            !d(e, 2)
        });
        t.exports = {
            entries: r(!0),
            values: r(!1)
        }
    }
    , {
        "../internals/descriptors": 23,
        "../internals/fails": 30,
        "../internals/function-uncurry-this": 37,
        "../internals/object-get-prototype-of": 74,
        "../internals/object-keys": 77,
        "../internals/object-property-is-enumerable": 78,
        "../internals/to-indexed-object": 92
    }],
    81: [function(e, t, n) {
        var i = e("../internals/function-call")
          , o = e("../internals/is-callable")
          , a = e("../internals/is-object")
          , s = TypeError;
        t.exports = function(e, t) {
            var n, r;
            if ("string" === t && o(n = e.toString) && !a(r = i(n, e)))
                return r;
            if (o(n = e.valueOf) && !a(r = i(n, e)))
                return r;
            if ("string" !== t && o(n = e.toString) && !a(r = i(n, e)))
                return r;
            throw new s("Can't convert object to primitive value")
        }
    }
    , {
        "../internals/function-call": 33,
        "../internals/is-callable": 51,
        "../internals/is-object": 55
    }],
    82: [function(e, t, n) {
        var r = e("../internals/get-built-in")
          , i = e("../internals/function-uncurry-this")
          , o = e("../internals/object-get-own-property-names")
          , a = e("../internals/object-get-own-property-symbols")
          , s = e("../internals/an-object")
          , l = i([].concat);
        t.exports = r("Reflect", "ownKeys") || function(e) {
            var t = o.f(s(e))
              , n = a.f;
            return n ? l(t, n(e)) : t
        }
    }
    , {
        "../internals/an-object": 8,
        "../internals/function-uncurry-this": 37,
        "../internals/get-built-in": 38,
        "../internals/object-get-own-property-names": 72,
        "../internals/object-get-own-property-symbols": 73
    }],
    83: [function(e, t, n) {
        e = e("../internals/global-this");
        t.exports = e
    }
    , {
        "../internals/global-this": 42
    }],
    84: [function(e, t, n) {
        var r = e("../internals/is-null-or-undefined")
          , i = TypeError;
        t.exports = function(e) {
            if (r(e))
                throw new i("Can't call method on " + e);
            return e
        }
    }
    , {
        "../internals/is-null-or-undefined": 54
    }],
    85: [function(e, t, n) {
        var r = e("../internals/object-define-property").f
          , i = e("../internals/has-own-property")
          , o = e("../internals/well-known-symbol")("toStringTag");
        t.exports = function(e, t, n) {
            (e = e && !n ? e.prototype : e) && !i(e, o) && r(e, o, {
                configurable: !0,
                value: t
            })
        }
    }
    , {
        "../internals/has-own-property": 43,
        "../internals/object-define-property": 70,
        "../internals/well-known-symbol": 105
    }],
    86: [function(e, t, n) {
        var r = e("../internals/shared")
          , i = e("../internals/uid")
          , o = r("keys");
        t.exports = function(e) {
            return o[e] || (o[e] = i(e))
        }
    }
    , {
        "../internals/shared": 88,
        "../internals/uid": 101
    }],
    87: [function(e, t, n) {
        var r = e("../internals/is-pure")
          , i = e("../internals/global-this")
          , e = e("../internals/define-global-property")
          , o = "__core-js_shared__"
          , t = t.exports = i[o] || e(o, {});
        (t.versions || (t.versions = [])).push({
            version: "3.38.1",
            mode: r ? "pure" : "global",
            copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
            license: "https://github.com/zloirock/core-js/blob/v3.38.1/LICENSE",
            source: "https://github.com/zloirock/core-js"
        })
    }
    , {
        "../internals/define-global-property": 22,
        "../internals/global-this": 42,
        "../internals/is-pure": 57
    }],
    88: [function(e, t, n) {
        var r = e("../internals/shared-store");
        t.exports = function(e, t) {
            return r[e] || (r[e] = t || {})
        }
    }
    , {
        "../internals/shared-store": 87
    }],
    89: [function(e, t, n) {
        function r(i) {
            return function(e, t) {
                var n, e = a(s(e)), t = o(t), r = e.length;
                return t < 0 || r <= t ? i ? "" : void 0 : (n = c(e, t)) < 55296 || 56319 < n || t + 1 === r || (r = c(e, t + 1)) < 56320 || 57343 < r ? i ? l(e, t) : n : i ? u(e, t, t + 2) : r - 56320 + (n - 55296 << 10) + 65536
            }
        }
        var i = e("../internals/function-uncurry-this")
          , o = e("../internals/to-integer-or-infinity")
          , a = e("../internals/to-string")
          , s = e("../internals/require-object-coercible")
          , l = i("".charAt)
          , c = i("".charCodeAt)
          , u = i("".slice);
        t.exports = {
            codeAt: r(!1),
            charAt: r(!0)
        }
    }
    , {
        "../internals/function-uncurry-this": 37,
        "../internals/require-object-coercible": 84,
        "../internals/to-integer-or-infinity": 93,
        "../internals/to-string": 99
    }],
    90: [function(e, t, n) {
        var r = e("../internals/environment-v8-version")
          , i = e("../internals/fails")
          , o = e("../internals/global-this").String;
        t.exports = !!Object.getOwnPropertySymbols && !i(function() {
            var e = Symbol("symbol detection");
            return !o(e) || !(Object(e)instanceof Symbol) || !Symbol.sham && r && r < 41
        })
    }
    , {
        "../internals/environment-v8-version": 28,
        "../internals/fails": 30,
        "../internals/global-this": 42
    }],
    91: [function(e, t, n) {
        var r = e("../internals/to-integer-or-infinity")
          , i = Math.max
          , o = Math.min;
        t.exports = function(e, t) {
            e = r(e);
            return e < 0 ? i(e + t, 0) : o(e, t)
        }
    }
    , {
        "../internals/to-integer-or-infinity": 93
    }],
    92: [function(e, t, n) {
        var r = e("../internals/indexed-object")
          , i = e("../internals/require-object-coercible");
        t.exports = function(e) {
            return r(i(e))
        }
    }
    , {
        "../internals/indexed-object": 47,
        "../internals/require-object-coercible": 84
    }],
    93: [function(e, t, n) {
        var r = e("../internals/math-trunc");
        t.exports = function(e) {
            e = +e;
            return e != e || 0 == e ? 0 : r(e)
        }
    }
    , {
        "../internals/math-trunc": 66
    }],
    94: [function(e, t, n) {
        var r = e("../internals/to-integer-or-infinity")
          , i = Math.min;
        t.exports = function(e) {
            e = r(e);
            return 0 < e ? i(e, 9007199254740991) : 0
        }
    }
    , {
        "../internals/to-integer-or-infinity": 93
    }],
    95: [function(e, t, n) {
        var r = e("../internals/require-object-coercible")
          , i = Object;
        t.exports = function(e) {
            return i(r(e))
        }
    }
    , {
        "../internals/require-object-coercible": 84
    }],
    96: [function(e, t, n) {
        var r = e("../internals/function-call")
          , i = e("../internals/is-object")
          , o = e("../internals/is-symbol")
          , a = e("../internals/get-method")
          , s = e("../internals/ordinary-to-primitive")
          , e = e("../internals/well-known-symbol")
          , l = TypeError
          , c = e("toPrimitive");
        t.exports = function(e, t) {
            if (!i(e) || o(e))
                return e;
            var n = a(e, c);
            if (n) {
                if (n = r(n, e, t = void 0 === t ? "default" : t),
                !i(n) || o(n))
                    return n;
                throw new l("Can't convert object to primitive value")
            }
            return s(e, t = void 0 === t ? "number" : t)
        }
    }
    , {
        "../internals/function-call": 33,
        "../internals/get-method": 41,
        "../internals/is-object": 55,
        "../internals/is-symbol": 58,
        "../internals/ordinary-to-primitive": 81,
        "../internals/well-known-symbol": 105
    }],
    97: [function(e, t, n) {
        var r = e("../internals/to-primitive")
          , i = e("../internals/is-symbol");
        t.exports = function(e) {
            e = r(e, "string");
            return i(e) ? e : e + ""
        }
    }
    , {
        "../internals/is-symbol": 58,
        "../internals/to-primitive": 96
    }],
    98: [function(e, t, n) {
        var r = {};
        r[e("../internals/well-known-symbol")("toStringTag")] = "z",
        t.exports = "[object z]" === String(r)
    }
    , {
        "../internals/well-known-symbol": 105
    }],
    99: [function(e, t, n) {
        var r = e("../internals/classof")
          , i = String;
        t.exports = function(e) {
            if ("Symbol" === r(e))
                throw new TypeError("Cannot convert a Symbol value to a string");
            return i(e)
        }
    }
    , {
        "../internals/classof": 14
    }],
    100: [function(e, t, n) {
        var r = String;
        t.exports = function(e) {
            try {
                return r(e)
            } catch (e) {
                return "Object"
            }
        }
    }
    , {}],
    101: [function(e, t, n) {
        var e = e("../internals/function-uncurry-this")
          , r = 0
          , i = Math.random()
          , o = e(1..toString);
        t.exports = function(e) {
            return "Symbol(" + (void 0 === e ? "" : e) + ")_" + o(++r + i, 36)
        }
    }
    , {
        "../internals/function-uncurry-this": 37
    }],
    102: [function(e, t, n) {
        e = e("../internals/symbol-constructor-detection");
        t.exports = e && !Symbol.sham && "symbol" == typeof Symbol.iterator
    }
    , {
        "../internals/symbol-constructor-detection": 90
    }],
    103: [function(e, t, n) {
        var r = e("../internals/descriptors")
          , e = e("../internals/fails");
        t.exports = r && e(function() {
            return 42 !== Object.defineProperty(function() {}, "prototype", {
                value: 42,
                writable: !1
            }).prototype
        })
    }
    , {
        "../internals/descriptors": 23,
        "../internals/fails": 30
    }],
    104: [function(e, t, n) {
        var r = e("../internals/global-this")
          , e = e("../internals/is-callable")
          , r = r.WeakMap;
        t.exports = e(r) && /native code/.test(String(r))
    }
    , {
        "../internals/global-this": 42,
        "../internals/is-callable": 51
    }],
    105: [function(e, t, n) {
        var r = e("../internals/global-this")
          , i = e("../internals/shared")
          , o = e("../internals/has-own-property")
          , a = e("../internals/uid")
          , s = e("../internals/symbol-constructor-detection")
          , e = e("../internals/use-symbol-as-uid")
          , l = r.Symbol
          , c = i("wks")
          , u = e ? l.for || l : l && l.withoutSetter || a;
        t.exports = function(e) {
            return o(c, e) || (c[e] = s && o(l, e) ? l[e] : u("Symbol." + e)),
            c[e]
        }
    }
    , {
        "../internals/global-this": 42,
        "../internals/has-own-property": 43,
        "../internals/shared": 88,
        "../internals/symbol-constructor-detection": 90,
        "../internals/uid": 101,
        "../internals/use-symbol-as-uid": 102
    }],
    106: [function(e, t, n) {
        var r = e("../internals/export")
          , i = e("../internals/array-from");
        r({
            target: "Array",
            stat: !0,
            forced: !e("../internals/check-correctness-of-iteration")(function(e) {
                Array.from(e)
            })
        }, {
            from: i
        })
    }
    , {
        "../internals/array-from": 9,
        "../internals/check-correctness-of-iteration": 12,
        "../internals/export": 29
    }],
    107: [function(e, t, n) {
        var r = e("../internals/export")
          , i = e("../internals/array-includes").includes
          , o = e("../internals/fails")
          , e = e("../internals/add-to-unscopables");
        r({
            target: "Array",
            proto: !0,
            forced: o(function() {
                return !Array(1).includes()
            })
        }, {
            includes: function(e) {
                return i(this, e, 1 < arguments.length ? arguments[1] : void 0)
            }
        }),
        e("includes")
    }
    , {
        "../internals/add-to-unscopables": 7,
        "../internals/array-includes": 10,
        "../internals/export": 29,
        "../internals/fails": 30
    }],
    108: [function(e, t, n) {
        var r = e("../internals/export")
          , e = e("../internals/object-assign");
        r({
            target: "Object",
            stat: !0,
            arity: 2,
            forced: Object.assign !== e
        }, {
            assign: e
        })
    }
    , {
        "../internals/export": 29,
        "../internals/object-assign": 67
    }],
    109: [function(e, t, n) {
        var r = e("../internals/export")
          , i = e("../internals/object-to-array").entries;
        r({
            target: "Object",
            stat: !0
        }, {
            entries: function(e) {
                return i(e)
            }
        })
    }
    , {
        "../internals/export": 29,
        "../internals/object-to-array": 80
    }],
    110: [function(e, t, n) {
        var r = e("../internals/string-multibyte").charAt
          , i = e("../internals/to-string")
          , o = e("../internals/internal-state")
          , a = e("../internals/iterator-define")
          , s = e("../internals/create-iter-result-object")
          , l = "String Iterator"
          , c = o.set
          , u = o.getterFor(l);
        a(String, "String", function(e) {
            c(this, {
                type: l,
                string: i(e),
                index: 0
            })
        }, function() {
            var e = u(this)
              , t = e.string
              , n = e.index;
            return n >= t.length ? s(void 0, !0) : (t = r(t, n),
            e.index += t.length,
            s(t, !1))
        })
    }
    , {
        "../internals/create-iter-result-object": 17,
        "../internals/internal-state": 49,
        "../internals/iterator-define": 61,
        "../internals/string-multibyte": 89,
        "../internals/to-string": 99
    }],
    111: [function(e, t, n) {
        e = e("../../es/array/from");
        t.exports = e
    }
    , {
        "../../es/array/from": 1
    }],
    112: [function(e, t, n) {
        e = e("../../es/array/includes");
        t.exports = e
    }
    , {
        "../../es/array/includes": 2
    }],
    113: [function(e, t, n) {
        e = e("../../es/object/assign");
        t.exports = e
    }
    , {
        "../../es/object/assign": 3
    }],
    114: [function(e, t, n) {
        e = e("../../es/object/entries");
        t.exports = e
    }
    , {
        "../../es/object/entries": 4
    }],
    115: [function(e, t, n) {
        var r, i, o, a;
        r = this,
        i = function() {
            function a(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n, r = arguments[t];
                    for (n in r)
                        e[n] = r[n]
                }
                return e
            }
            return function t(s, o) {
                function n(e, t, n) {
                    if ("undefined" != typeof document) {
                        "number" == typeof (n = a({}, o, n)).expires && (n.expires = new Date(Date.now() + 864e5 * n.expires)),
                        n.expires && (n.expires = n.expires.toUTCString()),
                        e = encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
                        var r, i = "";
                        for (r in n)
                            n[r] && (i += "; " + r,
                            !0 !== n[r]) && (i += "=" + n[r].split(";")[0]);
                        return document.cookie = e + "=" + s.write(t, e) + i
                    }
                }
                return Object.create({
                    set: n,
                    get: function(e) {
                        if ("undefined" != typeof document && (!arguments.length || e)) {
                            for (var t = document.cookie ? document.cookie.split("; ") : [], n = {}, r = 0; r < t.length; r++) {
                                var i = t[r].split("=")
                                  , o = i.slice(1).join("=");
                                try {
                                    var a = decodeURIComponent(i[0]);
                                    if (n[a] = s.read(o, a),
                                    e === a)
                                        break
                                } catch (e) {}
                            }
                            return e ? n[e] : n
                        }
                    },
                    remove: function(e, t) {
                        n(e, "", a({}, t, {
                            expires: -1
                        }))
                    },
                    withAttributes: function(e) {
                        return t(this.converter, a({}, this.attributes, e))
                    },
                    withConverter: function(e) {
                        return t(a({}, this.converter, e), this.attributes)
                    }
                }, {
                    attributes: {
                        value: Object.freeze(o)
                    },
                    converter: {
                        value: Object.freeze(s)
                    }
                })
            }({
                read: function(e) {
                    return (e = '"' === e[0] ? e.slice(1, -1) : e).replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
                },
                write: function(e) {
                    return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)
                }
            }, {
                path: "/"
            })
        }
        ,
        "object" == typeof n && void 0 !== t ? t.exports = i() : "function" == typeof define && define.amd ? define(i) : (r = "undefined" != typeof globalThis ? globalThis : r || self,
        o = r.Cookies,
        (a = r.Cookies = i()).noConflict = function() {
            return r.Cookies = o,
            a
        }
        )
    }
    , {}],
    116: [function(e, t, n) {
        b = String.fromCharCode,
        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
        o = {};
        var b, r, i, o, a, s = a = {
            compressToBase64: function(e) {
                if (null == e)
                    return "";
                var t = a._compress(e, 6, function(e) {
                    return r.charAt(e)
                });
                switch (t.length % 4) {
                default:
                case 0:
                    return t;
                case 1:
                    return t + "===";
                case 2:
                    return t + "==";
                case 3:
                    return t + "="
                }
            },
            decompressFromBase64: function(t) {
                return null == t ? "" : "" == t ? null : a._decompress(t.length, 32, function(e) {
                    return l(r, t.charAt(e))
                })
            },
            compressToUTF16: function(e) {
                return null == e ? "" : a._compress(e, 15, function(e) {
                    return b(e + 32)
                }) + " "
            },
            decompressFromUTF16: function(t) {
                return null == t ? "" : "" == t ? null : a._decompress(t.length, 16384, function(e) {
                    return t.charCodeAt(e) - 32
                })
            },
            compressToUint8Array: function(e) {
                for (var t = a.compress(e), n = new Uint8Array(2 * t.length), r = 0, i = t.length; r < i; r++) {
                    var o = t.charCodeAt(r);
                    n[2 * r] = o >>> 8,
                    n[2 * r + 1] = o % 256
                }
                return n
            },
            decompressFromUint8Array: function(e) {
                if (null == e)
                    return a.decompress(e);
                for (var t = new Array(e.length / 2), n = 0, r = t.length; n < r; n++)
                    t[n] = 256 * e[2 * n] + e[2 * n + 1];
                var i = [];
                return t.forEach(function(e) {
                    i.push(b(e))
                }),
                a.decompress(i.join(""))
            },
            compressToEncodedURIComponent: function(e) {
                return null == e ? "" : a._compress(e, 6, function(e) {
                    return i.charAt(e)
                })
            },
            decompressFromEncodedURIComponent: function(t) {
                return null == t ? "" : "" == t ? null : (t = t.replace(/ /g, "+"),
                a._decompress(t.length, 32, function(e) {
                    return l(i, t.charAt(e))
                }))
            },
            compress: function(e) {
                return a._compress(e, 16, function(e) {
                    return b(e)
                })
            },
            _compress: function(e, t, n) {
                if (null == e)
                    return "";
                for (var r, i, o, a, s = {}, l = {}, c = "", u = 2, p = 3, f = 2, d = [], h = 0, g = 0, y = 0; y < e.length; y += 1)
                    if (o = e.charAt(y),
                    Object.prototype.hasOwnProperty.call(s, o) || (s[o] = p++,
                    l[o] = !0),
                    a = c + o,
                    Object.prototype.hasOwnProperty.call(s, a))
                        c = a;
                    else {
                        if (Object.prototype.hasOwnProperty.call(l, c)) {
                            if (c.charCodeAt(0) < 256) {
                                for (r = 0; r < f; r++)
                                    h <<= 1,
                                    g == t - 1 ? (g = 0,
                                    d.push(n(h)),
                                    h = 0) : g++;
                                for (i = c.charCodeAt(0),
                                r = 0; r < 8; r++)
                                    h = h << 1 | 1 & i,
                                    g == t - 1 ? (g = 0,
                                    d.push(n(h)),
                                    h = 0) : g++,
                                    i >>= 1
                            } else {
                                for (i = 1,
                                r = 0; r < f; r++)
                                    h = h << 1 | i,
                                    g == t - 1 ? (g = 0,
                                    d.push(n(h)),
                                    h = 0) : g++,
                                    i = 0;
                                for (i = c.charCodeAt(0),
                                r = 0; r < 16; r++)
                                    h = h << 1 | 1 & i,
                                    g == t - 1 ? (g = 0,
                                    d.push(n(h)),
                                    h = 0) : g++,
                                    i >>= 1
                            }
                            0 == --u && (u = Math.pow(2, f),
                            f++),
                            delete l[c]
                        } else
                            for (i = s[c],
                            r = 0; r < f; r++)
                                h = h << 1 | 1 & i,
                                g == t - 1 ? (g = 0,
                                d.push(n(h)),
                                h = 0) : g++,
                                i >>= 1;
                        0 == --u && (u = Math.pow(2, f),
                        f++),
                        s[a] = p++,
                        c = String(o)
                    }
                if ("" !== c) {
                    if (Object.prototype.hasOwnProperty.call(l, c)) {
                        if (c.charCodeAt(0) < 256) {
                            for (r = 0; r < f; r++)
                                h <<= 1,
                                g == t - 1 ? (g = 0,
                                d.push(n(h)),
                                h = 0) : g++;
                            for (i = c.charCodeAt(0),
                            r = 0; r < 8; r++)
                                h = h << 1 | 1 & i,
                                g == t - 1 ? (g = 0,
                                d.push(n(h)),
                                h = 0) : g++,
                                i >>= 1
                        } else {
                            for (i = 1,
                            r = 0; r < f; r++)
                                h = h << 1 | i,
                                g == t - 1 ? (g = 0,
                                d.push(n(h)),
                                h = 0) : g++,
                                i = 0;
                            for (i = c.charCodeAt(0),
                            r = 0; r < 16; r++)
                                h = h << 1 | 1 & i,
                                g == t - 1 ? (g = 0,
                                d.push(n(h)),
                                h = 0) : g++,
                                i >>= 1
                        }
                        0 == --u && (u = Math.pow(2, f),
                        f++),
                        delete l[c]
                    } else
                        for (i = s[c],
                        r = 0; r < f; r++)
                            h = h << 1 | 1 & i,
                            g == t - 1 ? (g = 0,
                            d.push(n(h)),
                            h = 0) : g++,
                            i >>= 1;
                    0 == --u && (u = Math.pow(2, f),
                    f++)
                }
                for (i = 2,
                r = 0; r < f; r++)
                    h = h << 1 | 1 & i,
                    g == t - 1 ? (g = 0,
                    d.push(n(h)),
                    h = 0) : g++,
                    i >>= 1;
                for (; ; ) {
                    if (h <<= 1,
                    g == t - 1) {
                        d.push(n(h));
                        break
                    }
                    g++
                }
                return d.join("")
            },
            decompress: function(t) {
                return null == t ? "" : "" == t ? null : a._decompress(t.length, 32768, function(e) {
                    return t.charCodeAt(e)
                })
            },
            _decompress: function(e, t, n) {
                for (var r, i, o, a, s, l, c = [], u = 4, p = 4, f = 3, d = "", h = [], g = {
                    val: n(0),
                    position: t,
                    index: 1
                }, y = 0; y < 3; y += 1)
                    c[y] = y;
                for (i = 0,
                a = Math.pow(2, 2),
                s = 1; s != a; )
                    o = g.val & g.position,
                    g.position >>= 1,
                    0 == g.position && (g.position = t,
                    g.val = n(g.index++)),
                    i |= (0 < o ? 1 : 0) * s,
                    s <<= 1;
                switch (i) {
                case 0:
                    for (i = 0,
                    a = Math.pow(2, 8),
                    s = 1; s != a; )
                        o = g.val & g.position,
                        g.position >>= 1,
                        0 == g.position && (g.position = t,
                        g.val = n(g.index++)),
                        i |= (0 < o ? 1 : 0) * s,
                        s <<= 1;
                    l = b(i);
                    break;
                case 1:
                    for (i = 0,
                    a = Math.pow(2, 16),
                    s = 1; s != a; )
                        o = g.val & g.position,
                        g.position >>= 1,
                        0 == g.position && (g.position = t,
                        g.val = n(g.index++)),
                        i |= (0 < o ? 1 : 0) * s,
                        s <<= 1;
                    l = b(i);
                    break;
                case 2:
                    return ""
                }
                for (r = c[3] = l,
                h.push(l); ; ) {
                    if (e < g.index)
                        return "";
                    for (i = 0,
                    a = Math.pow(2, f),
                    s = 1; s != a; )
                        o = g.val & g.position,
                        g.position >>= 1,
                        0 == g.position && (g.position = t,
                        g.val = n(g.index++)),
                        i |= (0 < o ? 1 : 0) * s,
                        s <<= 1;
                    switch (l = i) {
                    case 0:
                        for (i = 0,
                        a = Math.pow(2, 8),
                        s = 1; s != a; )
                            o = g.val & g.position,
                            g.position >>= 1,
                            0 == g.position && (g.position = t,
                            g.val = n(g.index++)),
                            i |= (0 < o ? 1 : 0) * s,
                            s <<= 1;
                        c[p++] = b(i),
                        l = p - 1,
                        u--;
                        break;
                    case 1:
                        for (i = 0,
                        a = Math.pow(2, 16),
                        s = 1; s != a; )
                            o = g.val & g.position,
                            g.position >>= 1,
                            0 == g.position && (g.position = t,
                            g.val = n(g.index++)),
                            i |= (0 < o ? 1 : 0) * s,
                            s <<= 1;
                        c[p++] = b(i),
                        l = p - 1,
                        u--;
                        break;
                    case 2:
                        return h.join("")
                    }
                    if (0 == u && (u = Math.pow(2, f),
                    f++),
                    c[l])
                        d = c[l];
                    else {
                        if (l !== p)
                            return null;
                        d = r + r.charAt(0)
                    }
                    h.push(d),
                    c[p++] = r + d.charAt(0),
                    r = d,
                    0 == --u && (u = Math.pow(2, f),
                    f++)
                }
            }
        };
        function l(e, t) {
            if (!o[e]) {
                o[e] = {};
                for (var n = 0; n < e.length; n++)
                    o[e][e.charAt(n)] = n
            }
            return o[e][t]
        }
        "function" == typeof define && define.amd ? define(function() {
            return s
        }) : void 0 !== t && null != t ? t.exports = s : "undefined" != typeof angular && null != angular && angular.module("LZString", []).factory("LZString", function() {
            return s
        })
    }
    , {}],
    117: [function(e, t, n) {
        !function(c) {
            !function() {
                function r(t) {
                    var e = {
                        next: function() {
                            var e = t.shift();
                            return {
                                done: void 0 === e,
                                value: e
                            }
                        }
                    };
                    return n && (e[Symbol.iterator] = function() {
                        return e
                    }
                    ),
                    e
                }
                function i(e) {
                    return encodeURIComponent(e).replace(/%20/g, "+")
                }
                function o(e) {
                    return decodeURIComponent(String(e).replace(/\+/g, " "))
                }
                function e() {
                    function a(e) {
                        Object.defineProperty(this, "_entries", {
                            writable: !0,
                            value: {}
                        });
                        var t = typeof e;
                        if ("undefined" != t)
                            if ("string" == t)
                                "" !== e && this._fromString(e);
                            else if (e instanceof a) {
                                var n = this;
                                e.forEach(function(e, t) {
                                    n.append(t, e)
                                })
                            } else {
                                if (null === e || "object" != t)
                                    throw new TypeError("Unsupported input's type for URLSearchParams");
                                if ("[object Array]" === Object.prototype.toString.call(e))
                                    for (var r = 0; r < e.length; r++) {
                                        var i = e[r];
                                        if ("[object Array]" !== Object.prototype.toString.call(i) && 2 === i.length)
                                            throw new TypeError("Expected [string, any] as entry at index " + r + " of URLSearchParams's input");
                                        this.append(i[0], i[1])
                                    }
                                else
                                    for (var o in e)
                                        e.hasOwnProperty(o) && this.append(o, e[o])
                            }
                    }
                    var e = a.prototype;
                    e.append = function(e, t) {
                        e in this._entries ? this._entries[e].push(String(t)) : this._entries[e] = [String(t)]
                    }
                    ,
                    e.delete = function(e) {
                        delete this._entries[e]
                    }
                    ,
                    e.get = function(e) {
                        return e in this._entries ? this._entries[e][0] : null
                    }
                    ,
                    e.getAll = function(e) {
                        return e in this._entries ? this._entries[e].slice(0) : []
                    }
                    ,
                    e.has = function(e) {
                        return e in this._entries
                    }
                    ,
                    e.set = function(e, t) {
                        this._entries[e] = [String(t)]
                    }
                    ,
                    e.forEach = function(e, t) {
                        for (var n in this._entries)
                            if (this._entries.hasOwnProperty(n))
                                for (var r = this._entries[n], i = 0; i < r.length; i++)
                                    e.call(t, r[i], n, this)
                    }
                    ,
                    e.keys = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push(t)
                        }),
                        r(n)
                    }
                    ,
                    e.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e)
                        }),
                        r(t)
                    }
                    ,
                    e.entries = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push([t, e])
                        }),
                        r(n)
                    }
                    ,
                    n && (e[Symbol.iterator] = e.entries),
                    e.toString = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push(i(t) + "=" + i(e))
                        }),
                        n.join("&")
                    }
                    ,
                    t.URLSearchParams = a
                }
                t = void 0 !== c ? c : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this,
                n = ( () => {
                    try {
                        return !!Symbol.iterator
                    } catch (e) {
                        return !1
                    }
                }
                )(),
                ( () => {
                    try {
                        var e = t.URLSearchParams;
                        return "a=1" === new e("?a=1").toString() && "function" == typeof e.prototype.set && "function" == typeof e.prototype.entries
                    } catch (e) {
                        return !1
                    }
                }
                )() || e(),
                "function" != typeof (a = t.URLSearchParams.prototype).sort && (a.sort = function() {
                    var n = this
                      , r = [];
                    this.forEach(function(e, t) {
                        r.push([t, e]),
                        n._entries || n.delete(t)
                    }),
                    r.sort(function(e, t) {
                        return e[0] < t[0] ? -1 : e[0] > t[0] ? 1 : 0
                    }),
                    n._entries && (n._entries = {});
                    for (var e = 0; e < r.length; e++)
                        this.append(r[e][0], r[e][1])
                }
                ),
                "function" != typeof a._fromString && Object.defineProperty(a, "_fromString", {
                    enumerable: !1,
                    configurable: !1,
                    writable: !1,
                    value: function(e) {
                        if (this._entries)
                            this._entries = {};
                        else {
                            var n = [];
                            this.forEach(function(e, t) {
                                n.push(t)
                            });
                            for (var t = 0; t < n.length; t++)
                                this.delete(n[t])
                        }
                        for (var r, i = (e = e.replace(/^\?/, "")).split("&"), t = 0; t < i.length; t++)
                            r = i[t].split("="),
                            this.append(o(r[0]), 1 < r.length ? o(r[1]) : "")
                    }
                });
                var t, n, a, u = void 0 !== c ? c : "undefined" != typeof window ? window : "undefined" != typeof self ? self : this;
                function s() {
                    function e(e, t) {
                        "string" != typeof e && (e = String(e)),
                        t && "string" != typeof t && (t = String(t));
                        var n = document;
                        if (t && (void 0 === u.location || t !== u.location.href)) {
                            t = t.toLowerCase(),
                            (i = (n = document.implementation.createHTMLDocument("")).createElement("base")).href = t,
                            n.head.appendChild(i);
                            try {
                                if (0 !== i.href.indexOf(t))
                                    throw new Error(i.href)
                            } catch (e) {
                                throw new Error("URL unable to set base " + t + " due to " + e)
                            }
                        }
                        var r = n.createElement("a")
                          , i = (r.href = e,
                        i && (n.body.appendChild(r),
                        r.href = r.href),
                        n.createElement("input"));
                        if (i.type = "url",
                        i.value = e,
                        ":" === r.protocol || !/:/.test(r.href) || !i.checkValidity() && !t)
                            throw new TypeError("Invalid URL");
                        Object.defineProperty(this, "_anchorElement", {
                            value: r
                        });
                        var o = new u.URLSearchParams(this.search)
                          , a = !0
                          , s = !0
                          , l = this
                          , c = (["append", "delete", "set"].forEach(function(e) {
                            var t = o[e];
                            o[e] = function() {
                                t.apply(o, arguments),
                                a && (s = !1,
                                l.search = o.toString(),
                                s = !0)
                            }
                        }),
                        Object.defineProperty(this, "searchParams", {
                            value: o,
                            enumerable: !0
                        }),
                        void 0);
                        Object.defineProperty(this, "_updateSearchParams", {
                            enumerable: !1,
                            configurable: !1,
                            writable: !1,
                            value: function() {
                                this.search !== c && (c = this.search,
                                s) && (a = !1,
                                this.searchParams._fromString(this.search),
                                a = !0)
                            }
                        })
                    }
                    var t = u.URL
                      , n = e.prototype;
                    ["hash", "host", "hostname", "port", "protocol"].forEach(function(e) {
                        var t;
                        t = e,
                        Object.defineProperty(n, t, {
                            get: function() {
                                return this._anchorElement[t]
                            },
                            set: function(e) {
                                this._anchorElement[t] = e
                            },
                            enumerable: !0
                        })
                    }),
                    Object.defineProperty(n, "search", {
                        get: function() {
                            return this._anchorElement.search
                        },
                        set: function(e) {
                            this._anchorElement.search = e,
                            this._updateSearchParams()
                        },
                        enumerable: !0
                    }),
                    Object.defineProperties(n, {
                        toString: {
                            get: function() {
                                var e = this;
                                return function() {
                                    return e.href
                                }
                            }
                        },
                        href: {
                            get: function() {
                                return this._anchorElement.href.replace(/\?$/, "")
                            },
                            set: function(e) {
                                this._anchorElement.href = e,
                                this._updateSearchParams()
                            },
                            enumerable: !0
                        },
                        pathname: {
                            get: function() {
                                return this._anchorElement.pathname.replace(/(^\/?)/, "/")
                            },
                            set: function(e) {
                                this._anchorElement.pathname = e
                            },
                            enumerable: !0
                        },
                        origin: {
                            get: function() {
                                var e = {
                                    "http:": 80,
                                    "https:": 443,
                                    "ftp:": 21
                                }[this._anchorElement.protocol]
                                  , e = this._anchorElement.port != e && "" !== this._anchorElement.port;
                                return this._anchorElement.protocol + "//" + this._anchorElement.hostname + (e ? ":" + this._anchorElement.port : "")
                            },
                            enumerable: !0
                        },
                        password: {
                            get: function() {
                                return ""
                            },
                            set: function(e) {},
                            enumerable: !0
                        },
                        username: {
                            get: function() {
                                return ""
                            },
                            set: function(e) {},
                            enumerable: !0
                        }
                    }),
                    e.createObjectURL = function(e) {
                        return t.createObjectURL.apply(t, arguments)
                    }
                    ,
                    e.revokeObjectURL = function(e) {
                        return t.revokeObjectURL.apply(t, arguments)
                    }
                    ,
                    u.URL = e
                }
                if (( () => {
                    try {
                        var e = new u.URL("b","http://a");
                        return e.pathname = "c d",
                        "http://a/c%20d" === e.href && e.searchParams
                    } catch (e) {
                        return !1
                    }
                }
                )() || s(),
                void 0 !== u.location && !("origin"in u.location)) {
                    var l = function() {
                        return u.location.protocol + "//" + u.location.hostname + (u.location.port ? ":" + u.location.port : "")
                    };
                    try {
                        Object.defineProperty(u.location, "origin", {
                            get: l,
                            enumerable: !0
                        })
                    } catch (e) {
                        setInterval(function() {
                            u.location.origin = l()
                        }, 100)
                    }
                }
            }
            .call(this)
        }
        .call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    118: [function(e, t, n) {
        var r = e("./v1")
          , e = e("./v4")
          , i = e;
        i.v1 = r,
        i.v4 = e,
        t.exports = i
    }
    , {
        "./v1": 121,
        "./v4": 122
    }],
    119: [function(e, t, n) {
        for (var r = [], i = 0; i < 256; ++i)
            r[i] = (i + 256).toString(16).substr(1);
        t.exports = function(e, t) {
            var t = t || 0
              , n = r;
            return [n[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], "-", n[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], n[e[t++]], n[e[+t]]].join("")
        }
    }
    , {}],
    120: [function(e, t, n) {
        var r, i, o = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        o ? (r = new Uint8Array(16),
        t.exports = function() {
            return o(r),
            r
        }
        ) : (i = new Array(16),
        t.exports = function() {
            for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                i[t] = e >>> ((3 & t) << 3) & 255;
            return i
        }
        )
    }
    , {}],
    121: [function(e, t, n) {
        var u, p, f = e("./lib/rng"), d = e("./lib/bytesToUuid"), h = 0, g = 0;
        t.exports = function(e, t, n) {
            var r = t && n || 0
              , i = t || []
              , o = (e = e || {}).node || u
              , n = void 0 !== e.clockseq ? e.clockseq : p
              , a = (null != o && null != n || (a = f(),
            null == o && (o = u = [1 | a[0], a[1], a[2], a[3], a[4], a[5]]),
            null == n && (n = p = 16383 & (a[6] << 8 | a[7]))),
            void 0 !== e.msecs ? e.msecs : (new Date).getTime())
              , s = void 0 !== e.nsecs ? e.nsecs : g + 1
              , l = a - h + (s - g) / 1e4;
            if (l < 0 && void 0 === e.clockseq && (n = n + 1 & 16383),
            1e4 <= (s = (l < 0 || h < a) && void 0 === e.nsecs ? 0 : s))
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            h = a,
            p = n,
            l = (1e4 * (268435455 & (a += 122192928e5)) + (g = s)) % 4294967296,
            i[r++] = l >>> 24 & 255,
            i[r++] = l >>> 16 & 255,
            i[r++] = l >>> 8 & 255,
            i[r++] = 255 & l,
            i[r++] = (e = a / 4294967296 * 1e4 & 268435455) >>> 8 & 255,
            i[r++] = 255 & e,
            i[r++] = e >>> 24 & 15 | 16,
            i[r++] = e >>> 16 & 255,
            i[r++] = n >>> 8 | 128,
            i[r++] = 255 & n;
            for (var c = 0; c < 6; ++c)
                i[r + c] = o[c];
            return t || d(i)
        }
    }
    , {
        "./lib/bytesToUuid": 119,
        "./lib/rng": 120
    }],
    122: [function(e, t, n) {
        var a = e("./lib/rng")
          , s = e("./lib/bytesToUuid");
        t.exports = function(e, t, n) {
            var r = t && n || 0
              , i = ("string" == typeof e && (t = "binary" === e ? new Array(16) : null,
            e = null),
            (e = e || {}).random || (e.rng || a)());
            if (i[6] = 15 & i[6] | 64,
            i[8] = 63 & i[8] | 128,
            t)
                for (var o = 0; o < 16; ++o)
                    t[r + o] = i[o];
            return t || s(i)
        }
    }
    , {
        "./lib/bytesToUuid": 119,
        "./lib/rng": 120
    }],
    123: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var a = e("./utils.js");
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != i(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != i(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == i(e) ? e : e + ""))(r.key), r)
            }
        }
        n.default = ( () => {
            function e() {
                if (!(this instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }
            return t = e,
            r = [{
                key: "setCookie",
                value: function(e, t, n, r, i, o) {
                    return a.Utils._setCookie(e, t, n, r, i, o)
                }
            }, {
                key: "_getAppsWithOptimize",
                value: function() {
                    return [{
                        criteria: {
                            ncbi_app: "labs_pubmed"
                        },
                        id: "GTM-TXKHXQQ"
                    }, {
                        criteria: {
                            ncbi_app: "pubmed"
                        },
                        id: "GTM-TXKHXQQ"
                    }, {
                        criteria: {
                            ncbi_app: "gquery",
                            ncbi_nwds: "yes"
                        },
                        id: "GTM-T6PWN9S"
                    }, {
                        criteria: {
                            ncbi_app: "gquery-labs"
                        },
                        id: "GTM-T6PWN9S"
                    }, {
                        criteria: {
                            ncbi_app: "entrez",
                            ncbi_db: "pubmed"
                        },
                        id: "GTM-N2RVQX6"
                    }, {
                        criteria: {
                            ncbi_app: "pubmed_mobile",
                            ncbi_db: "pubmed"
                        },
                        id: "GTM-TC6QRVD"
                    }]
                }
            }, {
                key: "transformMetasToCachedVals",
                value: function(e) {
                    var t, n = {};
                    for (t in e)
                        n[t] = {
                            sProp: t,
                            value: e[t]
                        };
                    return n
                }
            }, {
                key: "patchEventProp",
                value: function(e) {
                    var t;
                    Event.prototype.stopPropagation && (t = Event.prototype.stopPropagation,
                    Event.prototype.stopPropagation = function() {
                        return "click" != this.type && "auxclick" != this.type && "contextmenu" != this.type || e._handleClick(this, this.button),
                        t.apply(this, arguments)
                    }
                    )
                }
            }, {
                key: "getPrefixedGaCommand",
                value: function(e, t) {
                    return (t = void 0 === t ? window.ncbi.sg.config.get("gaTrackerName") : t) ? t + "." + e : e
                }
            }, {
                key: "aliasLegacyGaObjectName",
                value: function() {
                    window.ncbi_global_ga = function() {
                        arguments.length && (arguments[0] = e.getPrefixedGaCommand(arguments[0])),
                        window[window.GoogleAnalyticsObject].apply(window[window.GoogleAnalyticsObject], arguments)
                    }
                }
            }, {
                key: "_shouldForceDefaultTracker",
                value: function(e) {
                    return e in {
                        account: !0,
                        "genome-browser": !0,
                        labs_account: !0,
                        labs_journals: !0,
                        labs_pathogens: !0,
                        labs_pubmed: !0,
                        pathogenIsolateBrowser: !0,
                        sciencv: !0
                    }
                }
            }, {
                key: "setTrackerName",
                value: function(e, t) {
                    this._shouldForceDefaultTracker(t) && e.set("gaTrackerName", "")
                }
            }],
            (n = null) && o(t.prototype, n),
            r && o(t, r),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            t;
            var t, n, r
        }
        )()
    }
    , {
        "./utils.js": 132
    }],
    124: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.metasToObj = n.default = void 0;
        var o = (e = e("./bridge")) && e.__esModule ? e : {
            default: e
        };
        var a, s, l, c, r, u = n.metasToObj = function() {
            for (var e = /^((my)?ncbi|log)_(?!sg|pinger)/, t = /^ncbi_(?:sg|pinger)_/, n = document.querySelectorAll("meta"), r = {
                pings: {},
                options: {}
            }, i = 0; i < n.length; i++) {
                var o, a = n[i], s = a.getAttribute("name");
                s && (o = s.toLowerCase(),
                a = a.getAttribute("content") || "",
                -1 !== s.search(e) && (r.pings[o] = a),
                -1 !== s.search(t)) && (r.options[o.replace(/_sg_/, "_pinger_")] = a)
            }
            return r
        }
        , e = (c = {
            calcXY: !0,
            clickPingSelector: "button:not([data-pinger-ignore]), input[type=button]:not([data-pinger-ignore]), input[type=submit]:not([data-pinger-ignore]), input[type=reset]:not([data-pinger-ignore]), a:not([data-pinger-ignore]), area:not([data-pinger-ignore])",
            clickPingThrottle: 5,
            clickUseCapture: !1,
            cookieDomain: "",
            dontPingIfEmpty: ["ncbi_timeonpage", "ncbi_timesinceload", "jsperf_loadtime", "jsperf_rendertime"],
            gtmTrack: !0,
            gtmDataLayerName: "pingerDataLayer",
            gtmContainerId: "GTM-PC9B6M3",
            statURL: "https://www.ncbi.nlm.nih.gov/stat",
            trackStat: !0,
            maxCookieSize: 4e3,
            sectionDuration: !0,
            sectionDurationMinimum: 0,
            scrollPingThrottle: 1e3,
            xmlHttpRequestOverride: !0,
            urlQueryStrip: ""
        },
        r = {
            browserSupported: function() {
                return void 0 !== document.querySelector && void 0 !== document.documentElement.dataset && void 0 !== window.XMLHttpRequest && void 0 !== window.matchMedia && void 0 !== window.sessionStorage && (void 0 !== Element.prototype.matches || void 0 !== Element.prototype.msMatchesSelector)
            }
        },
        {
            create: function(e) {
                for (var t in this.restore(),
                s = u(),
                l = o.default.transformMetasToCachedVals(s.pings),
                s.options) {
                    var n = s.options[t];
                    try {
                        "false" === (n = "true" === n.toLowerCase() ? !0 : n).toLowerCase() && (n = !1)
                    } catch (e) {}
                    var t = (e => {
                        for (var t = e.toLowerCase(), n = Object.keys(c), r = 0; r < n.length; ++r)
                            if (n[r].toLowerCase() == t)
                                return n[r];
                        return e
                    }
                    )(t.replace(/^ncbi_(?:sg|pinger)_/, "").replace(/_([a-z])/g, function(e) {
                        return e[1].toUpperCase()
                    }))
                      , r = a[t];
                    Array.isArray(r) && (n = n.split(/\s+/)),
                    a[t] = n
                }
                for (var i in e)
                    a[i] = e[i];
                return o.default.setTrackerName(this, s.pings.ncbi_app),
                this
            },
            get: function(e) {
                return e in r ? r[e]() : a[e]
            },
            set: function(e, t) {
                return a[e] = t,
                this
            },
            restore: function() {
                return a = {},
                Object.keys(c).forEach(function(e) {
                    a[e] = c[e]
                }),
                this
            },
            addPingData: function(t) {
                Object.keys(s.pings).forEach(function(e) {
                    t[e] = s.pings[e]
                })
            },
            getMetas: function() {
                return s
            },
            getLegacyMetas: function() {
                return l
            }
        });
        n.default = e
    }
    , {
        "./bridge": 123
    }],
    125: [function(e, t, n) {
        var r = (r = e("./pinger")) && r.__esModule ? r : {
            default: r
        };
        e("./utils").Utils.loadPinger({
            pingClass: r.default
        })
    }
    , {
        "./pinger": 128,
        "./utils": 132
    }],
    126: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        r(e("./config")),
        r(e("./trace"));
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function o(e, t) {
            return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function a() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
            } catch (e) {}
            return (a = function() {
                return !!e
            }
            )()
        }
        function s(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != i(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != i(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == i(e) ? e : e + ""))(r.key), r)
            }
        }
        n.default = ( () => {
            function r(e, t) {
                if (!(this instanceof r))
                    throw new TypeError("Cannot call a class as a function");
                this.trace = t,
                e.get("browserSupported") && e.get("xmlHttpRequestOverride") && (this._monkeyPatchXMLHttpRequest(),
                this._monkeyPatchFetch())
            }
            return e = r,
            n = [{
                key: "_skipOpenOverride",
                value: function(e) {
                    return 0 === e.search(/^https?:\/\//) && -1 === e.search(/^https?:\/\/([^\/]+\.)*ncbi\.nlm\.nih\.gov/)
                }
            }],
            (t = [{
                key: "_incrementedChildPHID",
                value: function(e) {
                    return this.trace.getIncrementedPhid()
                }
            }, {
                key: "_monkeyPatchXMLHttpRequest",
                value: function() {
                    var e, t, n;
                    XMLHttpRequest.prototype._overridden || (e = this,
                    t = XMLHttpRequest.prototype.open,
                    XMLHttpRequest.prototype.open = function() {
                        return r._skipOpenOverride(arguments && 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null) || (this._ncbiShouldIncrementPhid = !0),
                        t.apply(this, arguments)
                    }
                    ,
                    n = XMLHttpRequest.prototype.send,
                    XMLHttpRequest.prototype.send = function() {
                        return this._ncbiShouldIncrementPhid && this.setRequestHeader("NCBI-PHID", e._incrementedChildPHID()),
                        n.apply(this, arguments)
                    }
                    ,
                    XMLHttpRequest.prototype._overridden = !0)
                }
            }, {
                key: "_monkeyPatchFetch",
                value: function() {
                    var t, n;
                    "undefined" == typeof fetch || fetch.prototype && fetch.prototype._overridden || (t = this,
                    n = fetch,
                    (fetch = function() {
                        var e = function(e, t, n) {
                            var r;
                            return a() ? Reflect.construct.apply(null, arguments) : ((r = [null]).push.apply(r, t),
                            t = new (e.bind.apply(e, r)),
                            n && o(t, n.prototype),
                            t)
                        }(Request, Array.prototype.slice.call(arguments));
                        return r._skipOpenOverride(e.url) || e.headers.set("NCBI-PHID", t._incrementedChildPHID()),
                        n.apply(this, [e])
                    }
                    ).prototype._overridden = !0)
                }
            }]) && s(e.prototype, t),
            n && s(e, n),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e;
            var e, t, n
        }
        )()
    }
    , {
        "./config": 124,
        "./trace": 131
    }],
    127: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.defaultMutators = void 0;
        n.defaultMutators = {
            unload: [function(e) {
                var t = {}
                  , n = window.jQuery;
                if (void 0 !== n && void 0 !== n.ui && void 0 !== n.ui.jig) {
                    var r, n = window.jQuery.ui.jig, i = (t["version.jig"] = n.version,
                    n._foundWidgets);
                    for (r in i)
                        t["widget_".concat(r, ".jig")] = i[r]
                }
                return t
            }
            ]
        }
    }
    , {}],
    128: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.safe = n.default = void 0;
        var o = e("./pings")
          , i = e("./mutators")
          , a = r(e("./config"))
          , s = r(e("./trace"))
          , l = r(e("./bridge"))
          , c = e("./utils.js")
          , u = r(e("./version"))
          , p = r(e("./monkeypatches"))
          , f = e("./qualtrics_injector.js");
        function r(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function d(e, t) {
            return (e => {
                if (Array.isArray(e))
                    return e
            }
            )(e) || ( (e, t) => {
                var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != n) {
                    var r, i, o, a, s = [], l = !0, c = !1;
                    try {
                        if (o = (n = n.call(e)).next,
                        0 === t) {
                            if (Object(n) !== n)
                                return;
                            l = !1
                        } else
                            for (; !(l = (r = o.call(n)).done) && (s.push(r.value),
                            s.length !== t); l = !0)
                                ;
                    } catch (e) {
                        c = !0,
                        i = e
                    } finally {
                        try {
                            if (!l && null != n.return && (a = n.return(),
                            Object(a) !== a))
                                return
                        } finally {
                            if (c)
                                throw i
                        }
                    }
                    return s
                }
            }
            )(e, t) || ( (e, t) => {
                var n;
                if (e)
                    return "string" == typeof e ? h(e, t) : "Map" === (n = "Object" === (n = {}.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(e, t) : void 0
            }
            )(e, t) || ( () => {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            )()
        }
        function h(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function g(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != b(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != b(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == b(e) ? e : e + ""))(r.key), r)
            }
        }
        function y(n, r, e, t, i) {
            var o = {};
            Object.keys(t).forEach(function(e) {
                o[e] = t[e]
            }),
            o.enumerable = !!o.enumerable,
            o.configurable = !!o.configurable,
            ("value"in o || o.initializer) && (o.writable = !0),
            o = e.slice().reverse().reduce(function(e, t) {
                return t(n, r, e) || e
            }, o),
            i && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(i) : void 0,
            o.initializer = void 0),
            void 0 === o.initializer && Object.defineProperty(n, r, o)
        }
        function b(e) {
            return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        e = n.safe = function(e, t, n) {
            var i = n.value;
            return "function" == typeof i && (n.value = function() {
                try {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                        t[n] = arguments[n];
                    return i.apply(this, t)
                } catch (e) {
                    try {
                        var r = {};
                        "object" == b(e) ? (console.warn(e.name),
                        console.warn(e.message),
                        console.warn(e.stack),
                        r.jserror = e.message,
                        r.jserrorname = e.name,
                        r.pinger_stack = e.stack) : (console.warn(e),
                        r.jserror = e),
                        this._handlePing(o.StatJsErrorPing, {
                            data: r
                        }).send()
                    } catch (e) {
                        console.warn("pinger caught an unknown error")
                    }
                }
            }
            ),
            n
        }
        ;
        n.default = (y((n = ( () => {
            function t(e) {
                if (!(this instanceof t))
                    throw new TypeError("Cannot call a class as a function");
                this._hasPingedFirstRender = !1,
                this._resetCalled = 0,
                this._construct(e),
                this._monkeyPatch = e && e.monkeyPatch ? e.monkeyPatch : new p.default(this.config,this._trace)
            }
            return e = t,
            (n = [{
                key: "_construct",
                value: function(e) {
                    for (var t, n, r = e && e.options ? e.options : {}, i = (this.config = e && e.config && !e.options ? e.config : a.default.create(r),
                    this._trace = e && e.trace ? e.trace : s.default.create(),
                    this.version = u.default,
                    this._pingsFired = {},
                    this._gtmCommands = {},
                    this._pingedGaScroll = !1,
                    this._hasError = !1,
                    this._isCookieOverflowed = !1,
                    this.browserSupported = c.Utils.getDefaultBool(this.config.get("browserSupported")),
                    this._eventID = 0,
                    this._cookieDomain = this.config.get("cookieDomain") || "",
                    "" === this._cookieDomain && (r = "ncbi.nlm.nih.gov",
                    e = "support.nlm.nih.gov",
                    t = "clinicaltrials.gov",
                    (n = c.Utils.getHostname()).substring(n.length - r.length) === r ? this._cookieDomain = ".ncbi.nlm.nih.gov" : n.substring(n.length - e.length) === e ? this._cookieDomain = ".support.nlm.nih.gov" : n.substring(n.length - t.length) === t && (this._cookieDomain = ".clinicaltrials.gov")),
                    this._listeners = [],
                    this._mutators = {},
                    this._sections = {},
                    this._lastScroll = null,
                    this._lastClick = null,
                    this._maxScroll = {
                        x: 0,
                        y: 0
                    },
                    this._registerDefaultMutators(),
                    this._gaveRawGA = !1,
                    this._initGtm(),
                    f.Qualtrics.injectQualtrics(),
                    this.browserSupported && this._pollyfillMatches(),
                    document.querySelectorAll("a[href='https://support.nlm.nih.gov/']")), o = 0; o < i.length; ++o)
                        i[o].setAttribute("data-pinger-pagename-param", "true")
                }
            }, {
                key: "setCookie",
                value: function(e, t, n, r, i, o) {
                    return l.default.setCookie(e, t, n, r, i, o)
                }
            }, {
                key: "phid",
                get: function() {
                    return this._trace.getPhid()
                }
            }, {
                key: "_sid",
                get: function() {
                    return this._trace.getSessionId()
                }
            }, {
                key: "metas",
                get: function() {
                    return this.config.getMetas()
                }
            }, {
                key: "_cachedVals",
                get: function() {
                    return this.config.getLegacyMetas()
                }
            }, {
                key: "_setMetasOnReset",
                value: function(e) {
                    var t = e && e.pdid ? e.pdid : ""
                      , n = e && e.pcid ? e.pcid : "";
                    if (!t || !n) {
                        var r = e && e.loc ? e.loc : void 0;
                        if (void 0 !== r) {
                            if (!t)
                                for (var i in r.pdidMap) {
                                    try {
                                        var o = new RegExp(i)
                                    } catch (e) {
                                        console.warn("Bad regexp passed in to pinger's fireRenderOnStateChange: ".concat(e));
                                        continue
                                    }
                                    -1 !== r.hash.search(o) && (t = r.pdidMap[i])
                                }
                            if (!n)
                                for (var i in r.pcidMap) {
                                    try {
                                        o = new RegExp(i)
                                    } catch (e) {
                                        console.warn("Bad regexp passed in to pinger's fireRenderOnStateChange: ".concat(e));
                                        continue
                                    }
                                    -1 !== r.hash.search(o) && (n = r.pcidMap[i])
                                }
                        }
                    }
                    t && ((e = document.querySelector("meta[name=ncbi_pdid]")) || ((e = document.createElement("meta")).setAttribute("name", "ncbi_pdid"),
                    document.head.appendChild(e)),
                    e.setAttribute("content", t)),
                    n && ((e = document.querySelector("meta[name=ncbi_pcid]")) || ((e = document.createElement("meta")).setAttribute("name", "ncbi_pcid"),
                    document.head.appendChild(e)),
                    e.setAttribute("content", n)),
                    this._hasPingedFirstRender && (e = document.querySelector("meta[name=ncbi_phid]")) && e.parentElement.removeChild(e)
                }
            }, {
                key: "reset",
                value: function(e) {
                    this._setMetasOnReset(e),
                    this.off(),
                    this._construct(e),
                    this._resetCalled++,
                    this.track()
                }
            }, {
                key: "_updateLinkMeta",
                value: function(e) {
                    for (var t = document.querySelectorAll("a[data-pinger-pagename-param='true']"), n = 0; n < t.length; ++n) {
                        var r = t[n]
                          , i = new URL(r.href);
                        i.searchParams.set("pagename", e),
                        r.href = i
                    }
                }
            }, {
                key: "_pollyfillMatches",
                value: function() {
                    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector)
                }
            }, {
                key: "getSessionID",
                value: function() {
                    return this._sid
                }
            }, {
                key: "_savePing",
                value: function(e) {
                    var t = e.params.jsevent;
                    return void 0 === this._pingsFired[t] && (this._pingsFired[t] = []),
                    this._pingsFired[t].push(e),
                    this
                }
            }, {
                key: "getGA",
                value: function() {
                    return console.warn("ncbi.sg.getGA() is deprecated. Use getGa()."),
                    this.getGa()
                }
            }, {
                key: "getGa",
                value: function() {
                    return this._gaveRawGA = !0,
                    console.log("google analytics/ga360 is no longer supported, we have switched to ga4"),
                    function() {
                        console.log("ga call no longer supported")
                    }
                }
            }, {
                key: "_handlePing",
                value: function(e, t) {
                    (t = t || {}).data = t.data || {},
                    t.config = this.config,
                    t.mutators = this._mutators,
                    t.sgVersion = this.version,
                    t.timePingerLoaded = window.ncbi._timePingerLoaded,
                    t.resetCount = this._resetCalled,
                    !this._isCookieOverflowed && this.isCookieOverflowed() && (n = new o.StatCookieOverflowPing(this._trace,this.config,{
                        sgVersion: this.version
                    }),
                    this._savePing(n),
                    n.send(),
                    this._isCookieOverflowed = !0),
                    t.browserSupported = this.browserSupported,
                    this.config.addPingData(t.data);
                    var n = new e(this._trace,this.config,t)
                      , e = n.params.jsevent;
                    return 1 < this._resetCalled && "render" === e && n.setData({
                        HTTP_REFERER: ""
                    }),
                    c.Utils.includes(["click", "search", "unload"], e) && (this._setPrevPhidCookie(),
                    this._setNextCookie("".concat(e, "next"), n)),
                    this._savePing(n),
                    n
                }
            }, {
                key: "clearStatPings",
                value: function() {
                    return this._pingsFired = {},
                    this
                }
            }, {
                key: "getStatPings",
                value: function(e) {
                    return e ? this._pingsFired[e] : this._pingsFired
                }
            }, {
                key: "getGtmPings",
                value: function(e) {
                    return e ? this._gtmCommands[e] : this._gtmCommands
                }
            }, {
                key: "getStatPing",
                value: function(e) {
                    e = this.getStatPings(e);
                    return e && 0 != e.length ? e[0] : null
                }
            }, {
                key: "getLastStatPing",
                value: function(e) {
                    e = this.getStatPings(e);
                    return e && 0 != e.length ? e[e.length - 1] : null
                }
            }, {
                key: "isCookieOverflowed",
                value: function() {
                    return document.cookie.length > this.config.get("maxCookieSize")
                }
            }, {
                key: "_registerDefaultMutators",
                value: function() {
                    var e, n = this;
                    for (e in i.defaultMutators)
                        (t => {
                            i.defaultMutators[t].forEach(function(e) {
                                n.registerMutator(t, e)
                            })
                        }
                        )(e)
                }
            }, {
                key: "registerMutator",
                value: function(e, t) {
                    return void 0 === this._mutators[e] && (this._mutators[e] = []),
                    this._mutators[e].push(t),
                    this
                }
            }, {
                key: "_getArgObj",
                value: function(e) {
                    var e = d(e, 4)
                      , t = e[0]
                      , n = e[1]
                      , r = e[2]
                      , e = e[3]
                      , t = {
                        el: t
                    };
                    return "string" == typeof n ? (t.jsevent = n,
                    r && ("object" === b(r) || c.Utils.includes(r, "=")) && (t.data = r)) : (t.jsevent = r,
                    t.evt = n),
                    e && (t.data = e),
                    t
                }
            }, {
                key: "pingElement",
                value: function() {
                    var e, t = c.Utils.arrayFrom(arguments), t = this._getArgObj(t), n = t.el, r = t.jsevent, i = t.evt, t = t.data;
                    if (r)
                        return e = t || {},
                        "string" == typeof t && (e = c.Utils.deserialize(t)),
                        Array.isArray(t) && (e = c.Utils.getObjFromArray(t)),
                        t = void 0 === i ? this._handlePing(o.StatClickElementPing, {
                            elem: n,
                            data: e
                        }) : this._handlePing(o.StatClickPing, {
                            event: i,
                            elem: n,
                            data: e
                        }),
                        this.config.get("gtmTrack") && this._sendGtmPing(new o.GtmPing(this._trace,this.config,{
                            data: Object.assign({}, {
                                event: r
                            }, t.params)
                        })),
                        i = new Date,
                        this._lastClick = i,
                        t.setData({
                            sgSource: "api",
                            jsevent: r
                        }).send(),
                        this;
                    throw "When passing an element to ping, must pass jsevent as second argument"
                }
            }, {
                key: "pingData",
                value: function(e) {
                    var t = e;
                    "string" == typeof e && (t = c.Utils.deserialize(e)),
                    Array.isArray(e) && (t = c.Utils.getObjFromArray(e)),
                    this._handlePing(o.StatNonNextPing, {
                        data: t,
                        native: !1
                    }).send();
                    return this
                }
            }, {
                key: "attachClickListener",
                value: function(e) {
                    return this.scanLinks(e)
                }
            }, {
                key: "scanLinks",
                value: function(e) {
                    var n = this;
                    if (e) {
                        for (var r = e.length ? e : [e], i = 0; i < r.length; i++)
                            ( () => {
                                var t = r[i];
                                n._on("click", function(e) {
                                    n._handleClick(e, 0, t)
                                }, t)
                            }
                            )();
                        return this
                    }
                    console.warn("ncbi.sg.scanLinks() no longer must be called with no arguments when new elements are added to the page.")
                }
            }, {
                key: "ping",
                value: function() {
                    var e = arguments[0]
                      , t = void 0 !== e.nodeName;
                    return 1 !== arguments.length || t ? t && this.pingElement.apply(this, arguments) : this.pingData(e),
                    this
                }
            }, {
                key: "pingRender",
                value: function(e) {
                    if (!this.getStatPing("render"))
                        return this.ping(Object.assign({
                            jsevent: "render"
                        }, e))
                }
            }, {
                key: "getInstance",
                value: function() {
                    return this
                }
            }, {
                key: "track",
                value: function() {
                    var t = this;
                    return l.default.patchEventProp(this),
                    this._handleRender(),
                    this.browserSupported && (this._on("print", function() {
                        t._handlePrint()
                    }),
                    this._on("scroll", function(e) {
                        t._handleScroll(e)
                    }),
                    this._on("click", function(e) {
                        t._handleClick(e, e.button)
                    }),
                    this._on("auxclick", function(e) {
                        1 !== e.button && 3 !== e.button && 4 !== e.button || t._handleClick(e, e.button)
                    }),
                    this._on("contextmenu", function(e) {
                        t._handleClick(e, e.button)
                    }),
                    this._on("beforeunload", function(e) {
                        t._handleBeforeunload(e)
                    }, window),
                    this._on("DOMContentLoaded", function(e) {
                        t._handleDOMContentLoaded(e, "domready")
                    }),
                    this._on("submit", function(e) {
                        t._handleSearch(e)
                    }),
                    this._on("error", function(e) {
                        t._handleError(e)
                    })),
                    this
                }
            }, {
                key: "_sendGtmPing",
                value: function(e) {
                    e.send();
                    var t = e.params.event;
                    return void 0 === this._gtmCommands[t] && (this._gtmCommands[t] = []),
                    this._gtmCommands[t].push(e),
                    this
                }
            }, {
                key: "_initGtm",
                value: function() {
                    this._sendGtmPing(new o.GtmPing(this._trace,this.config,{
                        data: {
                            event: "load",
                            sgversion: this.version
                        }
                    }))
                }
            }, {
                key: "_on",
                value: function(e, t, n) {
                    if ("scroll" !== e) {
                        n = "error" === e ? window : "print" === e ? window.matchMedia("print") : n || document;
                        if ("print" === e)
                            n.addListener(function(e) {
                                e.matches || t()
                            });
                        else
                            try {
                                var r = "click" === e && this.config.get("clickUseCapture");
                                n.addEventListener(e, t, r)
                            } catch (e) {
                                r = new o.StatNonNextPing(this._trace,this.config,{
                                    data: {
                                        jsevent: "pingerdebug",
                                        pinger_stack: e.stack,
                                        msg: e.message,
                                        filename: e.fileName,
                                        linenumber: e.lineNumber,
                                        target: n.toString(),
                                        jiraKey: "ADOPT-242"
                                    }
                                });
                                return r.send(),
                                this._savePing(r),
                                this
                            }
                        return this._registerListener(e, t, n),
                        this
                    }
                    c.Utils.scrollStop(t)
                }
            }, {
                key: "off",
                value: function() {
                    var i = this;
                    this._listeners.forEach(function(e) {
                        var t = e.el
                          , n = e.eventName
                          , e = e.handler
                          , r = t || document;
                        "print" === n ? t.removeListener(e) : r.removeEventListener(n, e),
                        i._deregisterListener(n, e)
                    })
                }
            }, {
                key: "_registerListener",
                value: function(e, t, n) {
                    return this._listeners.push({
                        el: n,
                        eventName: e,
                        handler: t
                    }),
                    this
                }
            }, {
                key: "_deregisterListener",
                value: function(e, n) {
                    var r = this;
                    return this._listeners.forEach(function(e) {
                        var t = e.eventName;
                        n === e.handler && delete r._listeners[t]
                    }),
                    this
                }
            }, {
                key: "_handlePrint",
                value: function() {
                    this._handlePing(o.StatPrintPing).send()
                }
            }, {
                key: "_handleDOMContentLoaded",
                value: function(e) {
                    this._handlePing(o.StatDOMContentLoadedPing, {
                        event: e
                    }).send()
                }
            }, {
                key: "_handleSearch",
                value: function(e) {
                    e.target.dataset.ncbiSgSearch && this._handlePing(o.StatSearchPing, {
                        event: e
                    }).send()
                }
            }, {
                key: "_handleError",
                value: function(e) {
                    this._hasError || (this._handlePing(o.StatJsErrorPing, {
                        data: {
                            jserror: e.message,
                            jserrorlocation: e.filename,
                            jserrorline: e.lineno,
                            jserrorcolumn: e.colno
                        }
                    }).send(),
                    this._hasError = !0)
                }
            }, {
                key: "_handleNext",
                value: function(e) {
                    e = new o.StatNextPing(this._trace,this.config,{
                        name: e
                    });
                    void 0 !== e.params.jsevent && (e.send(),
                    this._savePing(e))
                }
            }, {
                key: "_handleSearchnext",
                value: function() {
                    this._handleNext("searchnext")
                }
            }, {
                key: "_handleClicknext",
                value: function() {
                    this._handleNext("clicknext")
                }
            }, {
                key: "_handleBeforeunloadnext",
                value: function() {
                    this._handleNext("unloadnext")
                }
            }, {
                key: "_deletePreviousPingerCookies",
                value: function() {
                    c.Utils.deleteCookie("prev_phid", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("prev_selfurl", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("starnext", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("searchnext", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("clicknext", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("unloadnext", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("prev_search", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("s_sess", {
                        domain: this._cookieDomain
                    }),
                    c.Utils.deleteCookie("ncbi_pinger", {
                        domain: this._cookieDomain
                    })
                }
            }, {
                key: "_handleRender",
                value: function() {
                    var e = this._handlePing(o.StatRenderPing, {})
                      , t = c.Utils.getPingerCookie("prev_phid");
                    t && e.setData({
                        prev_phid: t
                    }),
                    e.send(),
                    this._sendGtmPing(new o.GtmPing(this._trace,this.config,{
                        data: Object.assign({
                            event: "render"
                        }, e.params)
                    })),
                    this._hasPingedFirstRender = !0,
                    this._handleClicknext(),
                    this._handleBeforeunloadnext(),
                    this._handleSearchnext(),
                    this._deletePreviousPingerCookies(),
                    this._setPrevPhidCookie(),
                    this._updateLinkMeta(e.params.pagename)
                }
            }, {
                key: "_setNextCookie",
                value: function(e, t) {
                    t.setData({
                        eventid: this._eventID++
                    });
                    t = c.Utils.objectAssign({}, t.params);
                    t.jsevent = e,
                    c.Utils.setPingerCookie({
                        name: e,
                        value: t,
                        domain: this._cookieDomain
                    })
                }
            }, {
                key: "_setPrevPhidCookie",
                value: function() {
                    return c.Utils.setPingerCookie({
                        name: "prev_phid",
                        value: this.phid,
                        domain: this._cookieDomain
                    }),
                    this
                }
            }, {
                key: "_clickIsOverThreshold",
                value: function(e) {
                    return e - this._lastClick.getTime() > this.config.get("clickPingThrottle")
                }
            }, {
                key: "_scrollIsOverThreshold",
                value: function(e) {
                    return e - this._lastScroll > this.config.get("scrollPingThrottle")
                }
            }, {
                key: "_transformSectionData",
                value: function() {
                    var e, t = {}, n = this.config.get("sectionDurationMinimum");
                    for (e in this._sections) {
                        var r = this._sections[e].totalDuration;
                        n <= r && (t["duration." + e + ".scrollInfo"] = r)
                    }
                    return t
                }
            }, {
                key: "_normalizeID",
                value: function(e) {
                    return e.replace(/[^a-zA-Z\d-:]/g, "_").replace(/^(\d+)$/, "_$1")
                }
            }, {
                key: "_updateSectionDuration",
                value: function() {
                    if (this.config.get("sectionDuration"))
                        for (var e = document.querySelectorAll("section, *[data-section]"), t = 0; t < e.length; t++) {
                            var n, r, i, o = e[t], a = o.dataset.section || o.id;
                            a && (n = this._normalizeID(a),
                            r = c.Utils.isAnyPartOfElInView(o),
                            i = c.Utils.getNowInSeconds,
                            a && !c.Utils.includes(Object.keys(this._sections), n) ? this._sections[n] = {
                                el: o,
                                totalDuration: 0,
                                isCurrentlyInView: !0,
                                lastTimeInView: i()
                            } : r && (this._sections[n].totalDuration += Math.round(i() - this._sections[n].lastTimeInView),
                            this._sections[n].lastTimeInView = i()),
                            this._sections[n].isCurrentlyInView = r)
                        }
                }
            }, {
                key: "_updateMaxScroll",
                value: function() {
                    var e = c.Utils.getScrollXY();
                    return e.x > this._maxScroll.x && (this._maxScroll.x = e.x),
                    e.y > this._maxScroll.y && (this._maxScroll.y = e.y),
                    this
                }
            }, {
                key: "_updateOnScroll",
                value: function() {
                    this._updateSectionDuration(),
                    this._updateMaxScroll()
                }
            }, {
                key: "_getSectionData",
                value: function(e) {
                    return this._sections[e] || null
                }
            }, {
                key: "_getYScroll",
                value: function() {
                    return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
                }
            }, {
                key: "_shouldRegisterScroll",
                value: function(e) {
                    return !this._lastScroll || this._scrollIsOverThreshold(e)
                }
            }, {
                key: "_handleScroll",
                value: function(e) {
                    var t = !1
                      , n = new Date;
                    return this._shouldRegisterScroll(n) && (this._lastScroll = n,
                    this._updateOnScroll(),
                    t = !0),
                    this._lastScroll = n,
                    t
                }
            }, {
                key: "_shouldHandleClick",
                value: function(e) {
                    return !this._lastClick || this._clickIsOverThreshold(e)
                }
            }, {
                key: "_handleClick",
                value: function(e, t, n) {
                    var r = new Date;
                    this._shouldHandleClick(r) && (n = n || c.Utils.getTarget(e, this.config.get("clickPingSelector"))) && (e = this._handlePing(o.StatClickPing, {
                        event: e,
                        elem: n,
                        button: t
                    }),
                    this._lastClick = r,
                    e.send())
                }
            }, {
                key: "_handleBeforeunload",
                value: function(e) {
                    var t = this
                      , n = (this._updateSectionDuration(),
                    c.Utils.getMaxScrollAsPercent(this._maxScroll))
                      , n = {
                        "x.maxscroll": n.x,
                        "y.maxscroll": n.y
                    }
                      , r = this._transformSectionData()
                      , i = c.Utils.objectAssign(r, n);
                    return i.raw_ga = this._gaveRawGA,
                    Object.keys(this._mutators).forEach(function(e) {
                        i[e + ".mutator_count"] = t._mutators[e].length
                    }),
                    this._handlePing(o.StatBeforeUnloadPing, {
                        event: e,
                        data: c.Utils.objectAssign(r, n)
                    }).send(),
                    this
                }
            }]) && g(e.prototype, n),
            r && g(e, r),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e;
            var e, n, r
        }
        )()).prototype, "phid", [e], Object.getOwnPropertyDescriptor(n.prototype, "phid"), n.prototype),
        y(n.prototype, "_sid", [e], Object.getOwnPropertyDescriptor(n.prototype, "_sid"), n.prototype),
        y(n.prototype, "metas", [e], Object.getOwnPropertyDescriptor(n.prototype, "metas"), n.prototype),
        y(n.prototype, "_cachedVals", [e], Object.getOwnPropertyDescriptor(n.prototype, "_cachedVals"), n.prototype),
        y(n.prototype, "reset", [e], Object.getOwnPropertyDescriptor(n.prototype, "reset"), n.prototype),
        y(n.prototype, "getSessionID", [e], Object.getOwnPropertyDescriptor(n.prototype, "getSessionID"), n.prototype),
        y(n.prototype, "getGA", [e], Object.getOwnPropertyDescriptor(n.prototype, "getGA"), n.prototype),
        y(n.prototype, "getGa", [e], Object.getOwnPropertyDescriptor(n.prototype, "getGa"), n.prototype),
        y(n.prototype, "clearStatPings", [e], Object.getOwnPropertyDescriptor(n.prototype, "clearStatPings"), n.prototype),
        y(n.prototype, "getStatPings", [e], Object.getOwnPropertyDescriptor(n.prototype, "getStatPings"), n.prototype),
        y(n.prototype, "getGtmPings", [e], Object.getOwnPropertyDescriptor(n.prototype, "getGtmPings"), n.prototype),
        y(n.prototype, "getStatPing", [e], Object.getOwnPropertyDescriptor(n.prototype, "getStatPing"), n.prototype),
        y(n.prototype, "getLastStatPing", [e], Object.getOwnPropertyDescriptor(n.prototype, "getLastStatPing"), n.prototype),
        y(n.prototype, "isCookieOverflowed", [e], Object.getOwnPropertyDescriptor(n.prototype, "isCookieOverflowed"), n.prototype),
        y(n.prototype, "registerMutator", [e], Object.getOwnPropertyDescriptor(n.prototype, "registerMutator"), n.prototype),
        y(n.prototype, "pingElement", [e], Object.getOwnPropertyDescriptor(n.prototype, "pingElement"), n.prototype),
        y(n.prototype, "pingData", [e], Object.getOwnPropertyDescriptor(n.prototype, "pingData"), n.prototype),
        y(n.prototype, "attachClickListener", [e], Object.getOwnPropertyDescriptor(n.prototype, "attachClickListener"), n.prototype),
        y(n.prototype, "scanLinks", [e], Object.getOwnPropertyDescriptor(n.prototype, "scanLinks"), n.prototype),
        y(n.prototype, "ping", [e], Object.getOwnPropertyDescriptor(n.prototype, "ping"), n.prototype),
        y(n.prototype, "pingRender", [e], Object.getOwnPropertyDescriptor(n.prototype, "pingRender"), n.prototype),
        y(n.prototype, "getInstance", [e], Object.getOwnPropertyDescriptor(n.prototype, "getInstance"), n.prototype),
        y(n.prototype, "track", [e], Object.getOwnPropertyDescriptor(n.prototype, "track"), n.prototype),
        y(n.prototype, "off", [e], Object.getOwnPropertyDescriptor(n.prototype, "off"), n.prototype),
        y(n.prototype, "_handlePrint", [e], Object.getOwnPropertyDescriptor(n.prototype, "_handlePrint"), n.prototype),
        y(n.prototype, "_handleDOMContentLoaded", [e], Object.getOwnPropertyDescriptor(n.prototype, "_handleDOMContentLoaded"), n.prototype),
        y(n.prototype, "_handleSearch", [e], Object.getOwnPropertyDescriptor(n.prototype, "_handleSearch"), n.prototype),
        y(n.prototype, "_handleBeforeunloadnext", [e], Object.getOwnPropertyDescriptor(n.prototype, "_handleBeforeunloadnext"), n.prototype),
        y(n.prototype, "_handleClick", [e], Object.getOwnPropertyDescriptor(n.prototype, "_handleClick"), n.prototype),
        n)
    }
    , {
        "./bridge": 123,
        "./config": 124,
        "./monkeypatches": 126,
        "./mutators": 127,
        "./pings": 129,
        "./qualtrics_injector.js": 130,
        "./trace": 131,
        "./utils.js": 132,
        "./version": 133
    }],
    129: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.StatSearchPing = n.StatRenderPing = n.StatPrintPing = n.StatPing = n.StatNonNextPing = n.StatNextPing = n.StatJsErrorPing = n.StatDOMContentLoadedPing = n.StatCookieOverflowPing = n.StatClickPing = n.StatClickElementPing = n.StatBeforeUnloadPing = n.Ping = n.GtmPing = void 0;
        (r = e("./bridge")) && r.__esModule;
        var r, c = e("./utils");
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function u(e, t, n) {
            return t = a(t),
            p(e, o() ? Reflect.construct(t, n || [], a(e).constructor) : t.apply(e, n))
        }
        function p(e, t) {
            if (t && ("object" == i(t) || "function" == typeof t))
                return t;
            if (void 0 !== t)
                throw new TypeError("Derived constructors may only return object or undefined");
            t = e;
            if (void 0 === t)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t
        }
        function o() {
            try {
                var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}))
            } catch (e) {}
            return (o = function() {
                return !!e
            }
            )()
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
            )(e)
        }
        function f(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            t && s(e, t)
        }
        function s(e, t) {
            return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function l(e, t) {
            return (e => {
                if (Array.isArray(e))
                    return e
            }
            )(e) || ( (e, t) => {
                var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != n) {
                    var r, i, o, a, s = [], l = !0, c = !1;
                    try {
                        if (o = (n = n.call(e)).next,
                        0 === t) {
                            if (Object(n) !== n)
                                return;
                            l = !1
                        } else
                            for (; !(l = (r = o.call(n)).done) && (s.push(r.value),
                            s.length !== t); l = !0)
                                ;
                    } catch (e) {
                        c = !0,
                        i = e
                    } finally {
                        try {
                            if (!l && null != n.return && (a = n.return(),
                            Object(a) !== a))
                                return
                        } finally {
                            if (c)
                                throw i
                        }
                    }
                    return s
                }
            }
            )(e, t) || ( (e, t) => {
                var n;
                if (e)
                    return "string" == typeof e ? d(e, t) : "Map" === (n = "Object" === (n = {}.toString.call(e).slice(8, -1)) && e.constructor ? e.constructor.name : n) || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0
            }
            )(e, t) || ( () => {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            )()
        }
        function d(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        function h(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function g(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != i(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != i(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == i(e) ? e : e + ""))(r.key), r)
            }
        }
        function y(e, t, n) {
            return t && g(e.prototype, t),
            n && g(e, n),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e
        }
        var b = n.Ping = ( () => y(function e(t, n, r) {
            for (var i in h(this, e),
            this.trace = t,
            this.config = n,
            this.opts = r || {},
            this._data = this.opts.data || {},
            this._data)
                "jsevent" === i.toLowerCase() && (this._data.jsevent = this._data[i],
                "jsevent" !== i) && delete this._data[i];
            this.mutators = this.opts.mutators || {},
            this.browserSupported = c.Utils.getDefaultBool(this.opts.browserSupported)
        }, [{
            key: "setData",
            value: function(e) {
                return c.Utils.objectAssign(this._data, e),
                this
            }
        }, {
            key: "params",
            get: function() {
                var e, n = {}, t = {};
                for (e in Array.isArray(this._data) ? n = c.Utils.getObjFromArray(this._data) : "string" == typeof this._data || this._data instanceof String ? n = c.Utils.getObjFromArray(this._data.split("&")) : c.Utils.objectEntries(this._data).forEach(function(e) {
                    var e = l(e, 2)
                      , t = e[0]
                      , e = e[1];
                    n[t] = null != e ? e : ""
                }),
                n) {
                    var r = n[e];
                    try {
                        r = r.toString()
                    } catch (e) {}
                    t[e] = r
                }
                return t
            }
        }, {
            key: "_getMutatedData",
            value: function(e) {
                var t = this
                  , n = {}
                  , e = this.mutators[e];
                return void 0 !== e && e.forEach(function(e) {
                    c.Utils.objectAssign(n, e(t))
                }),
                n
            }
        }]))()
          , m = (n.GtmPing = ( () => {
            function r(e, t, n) {
                return h(this, r),
                e = u(this, r, [e, t, n]),
                n && n.data && e.setData(n.data),
                e._loadGtm(),
                e
            }
            return f(r, b),
            y(r, [{
                key: "gtmLoaded",
                get: function() {
                    return !!document.getElementById("pingerInjectedGTM")
                }
            }, {
                key: "_prepopulateDataLayer",
                value: function(e) {
                    e.push({
                        myncbi_signed_in: c.Utils.signedInToMyNCBI()
                    });
                    var t = this.config.getMetas();
                    e.push(t.pings)
                }
            }, {
                key: "_loadGtm",
                value: function() {
                    var e, t, n;
                    return this.gtmLoaded || (e = this.config.get("gtmDataLayerName"),
                    window[e] = window[e] || [],
                    this._prepopulateDataLayer(window[e]),
                    window[e].push({
                        "gtm.start": (new Date).getTime(),
                        event: "gtm.js"
                    }),
                    t = document.getElementsByTagName("script")[0],
                    n = document.createElement("script"),
                    this.config.get("gtmTrack") && (n.async = !0,
                    window.pinger_disable_gtm_for_testing || (n.src = "https://www.googletagmanager.com/gtm.js?id=" + this.config.get("gtmContainerId") + ("dataLayer" != e ? "&l=" + e : ""))),
                    n.id = "pingerInjectedGTM",
                    t.parentNode.insertBefore(n, t)),
                    this
                }
            }, {
                key: "send",
                value: function() {
                    var e = this.config.get("gtmDataLayerName");
                    window[e].push(this._data)
                }
            }])
        }
        )(),
        n.StatPing = ( () => {
            function r(e, t, n) {
                return h(this, r),
                (e = u(this, r, [e, t, n])).statBaseURL = e.config.get("statURL"),
                e
            }
            return f(r, b),
            y(r, [{
                key: "query",
                get: function() {
                    var e = this.config && this.config.dontPingIfEmpty ? this.config.dontPingIfEmpty : [];
                    return c.Utils.serialize(this.params, e)
                }
            }, {
                key: "url",
                get: function() {
                    return this.statBaseURL + "?" + this.query
                }
            }, {
                key: "send",
                value: function() {
                    var e;
                    if (this.query)
                        return e = this.params.jsevent,
                        this.setData(this._getMutatedData(e)),
                        this._makeRequest(this.url),
                        this
                }
            }, {
                key: "_makeRequest",
                value: function(e) {
                    var t = document.createElement("img");
                    t.setAttribute("alt", ""),
                    t.setAttribute("src", e),
                    t.style.display = "none",
                    t.onload = function() {
                        try {
                            document.body.removeChild(t)
                        } catch (e) {
                            if (!(e instanceof DOMException && e.code == e.NOT_FOUND_ERR))
                                throw e;
                            console.log(e)
                        }
                    }
                    ,
                    document.body && document.body.appendChild(t)
                }
            }])
        }
        )())
          , v = n.StatNonNextPing = ( () => {
            function l(e, t, n) {
                if (h(this, l),
                (t = u(this, l, [e, t, n])).perf = c.Utils.getPerformance(),
                t.setData({
                    is_browser_supported: t.browserSupported
                }),
                !t.browserSupported)
                    return p(t);
                var n = t.opts
                  , r = n.data
                  , r = r || {}
                  , n = c.Utils.getDefaultBool(n.native)
                  , i = c.Utils.getDims(t.config.get("calcXY"))
                  , o = t._parseVer()
                  , a = (navigator && (s = navigator.language),
                !1);
                try {
                    a = window.self !== window.top
                } catch (e) {
                    a = !0
                }
                var i = {
                    browserwidth: i.width,
                    browserheight: i.height,
                    connection_type: c.Utils.getConnectionType(),
                    connection_effectivetype: c.Utils.getConnectionEffectiveType(),
                    cookieenabled: navigator.cookieEnabled ? "true" : "false",
                    cookieSize: document.cookie.length,
                    language_code: s,
                    pinger_in_iframe: a,
                    myncbi_signed_in: c.Utils.signedInToMyNCBI(),
                    ncbi_algorithm: r.ncbi_algorithm || null,
                    ncbi_app: r.ncbi_app || null,
                    ncbi_db: r.ncbi_db || null,
                    ncbi_featured_srcdb: r.ncbi_featured_srcdb || null,
                    ncbi_nwds: r.ncbi_nwds || null,
                    ncbi_program: r.ncbi_program || null,
                    ncbi_timesinceload: new Date - t.opts.timePingerLoaded,
                    ncbi_pcid: r.ncbi_pcid || null,
                    ncbi_pdid: r.ncbi_pdid || null,
                    ncbi_phid: t.trace.getPhid(),
                    pagename: t._getPagename(),
                    server: c.Utils.getHostname(),
                    sgSource: n ? "native" : "api",
                    sgversion: t.opts.sgVersion,
                    sgversion_major: o.major,
                    sgversion_minor: o.minor,
                    sgversion_hotfix: o.hotfix,
                    spa_index: t.opts.resetCount
                }
                  , s = "clinicaltrials.gov";
                return c.Utils.getHostname().substring(c.Utils.getHostname().length - s.length) === s && (i.ncbi_sid = e.getSessionId()),
                void 0 === t._data ? t._data = i : t.setData(i),
                t.setData(c.Utils.getScreenStats()),
                t.setData(t._getTimeSinceNavStart()),
                t.opts.cookieOverflowed && new w(t.trace).send(),
                t
            }
            return f(l, m),
            y(l, [{
                key: "_parseVer",
                value: function() {
                    var e = this.opts.sgVersion
                      , t = {
                        major: null,
                        minor: null,
                        hotfix: null
                    };
                    return e && (e = e.replace(/-.*/, "").split("."),
                    t.major = e[0],
                    t.minor = e[1],
                    t.hotfix = e[2]),
                    t
                }
            }, {
                key: "_getPagename",
                value: function() {
                    var e, t = ["NONE", "NONE", "NONE", "NONE"];
                    for (e in this._data) {
                        var n = this._data[e];
                        "ncbi_app" === e ? t[0] = n : "ncbi_db" === e ? t[1] = n : "ncbi_pdid" === e ? t[2] = n : "ncbi_pcid" === e && (t[3] = n)
                    }
                    return t.join(":")
                }
            }, {
                key: "_getTimeSinceNavStart",
                value: function() {
                    return void 0 !== this.perf && void 0 !== this.perf.now ? {
                        ncbi_timesincenavstart: Math.round(this.perf.now())
                    } : null
                }
            }, {
                key: "_getJsloadtime",
                value: function() {
                    var e, t = window.ncbi_startTime;
                    return e = void 0 !== t ? this.opts.timePingerLoaded - t : e
                }
            }])
        }
        )()
          , _ = (n.StatRenderPing = ( () => {
            function r(e, t, n) {
                h(this, r);
                var t = (e = u(this, r, [e, t, n])).config.get("urlQueryStrip")
                  , n = t ? c.Utils.filteredURLFull(window.location, t.split(",")) : window.location.href;
                return e.setData({
                    jsevent: "render",
                    SELF_URL: n
                }),
                e.browserSupported ? (n = (t = window.ncbi_startTime) ? Math.abs(new Date - t) : "",
                e.setData({
                    HTTP_REFERER: document.referrer,
                    jsperf_basePage: e.perf.basePage,
                    jsperf_connect: e.perf.connect,
                    jsperf_dns: e.perf.dns,
                    jsperf_navType: e.perf.navType,
                    jsperf_redirectCount: e.perf.redirectCount,
                    jsperf_ttfb: e.perf.ttfb,
                    jsrendertime: n,
                    jsloadtime: e._getJsloadtime()
                }),
                e) : p(e)
            }
            return f(r, v),
            y(r)
        }
        )(),
        n.StatClickElementPing = ( () => {
            function i(e, t, n) {
                h(this, i);
                var t = (e = u(this, i, [e, t, n])).opts
                  , n = t.elem
                  , t = t.data
                  , r = n.getAttribute && n.getAttribute("ref") || null
                  , r = (e.elem = n,
                e.setData({
                    jsevent: "click",
                    link_id: n.id || null,
                    link_name: n.name || null,
                    link_sid: n.getAttribute && n.getAttribute("sid") || null,
                    link_href: n.href || null,
                    link_text: n.innerText || n.textContent || n.value || null,
                    link_class: c.Utils.getLinkClass(n),
                    link_section_name: c.Utils.getSectionName(n),
                    link_action_name: c.Utils.getGaActionFromEl(n),
                    link_category_name: c.Utils.getGaCategoryFromEl(n),
                    link_ref: r
                }),
                e.setData({
                    ga_category: e.params.ga_category || e.params.link_category_name || e.params.link_section_name || "Link Click",
                    ga_action: e.params.ga_action || e.params.link_action_name || e.params.link_text,
                    ga_label: e.params.ga_label || e._getGaLabelFromEl(n)
                }),
                e.setData(c.Utils.deserialize(r)),
                e._getAncestorAttrs(n));
                return r.ids && e.setData({
                    ancestorId: r.ids
                }),
                r.classes && e.setData({
                    ancestorClassName: r.classes
                }),
                e.setData(t),
                e
            }
            return f(i, v),
            y(i, [{
                key: "_getGaLabelFromEl",
                value: function(e) {
                    var t = e.getAttribute && e.getAttribute("ref") || null
                      , n = e.getAttribute && e.getAttribute("href") || null;
                    return e.dataset && e.dataset.gaLabel ? e.dataset.gaLabel : e.getAttribute && e.getAttribute("data-ga-label") ? e.getAttribute("data-ga-label") : t && n ? "".concat(t, " ").concat(n) : t || n || "NONE"
                }
            }, {
                key: "_getAncestorAttrs",
                value: function() {
                    var e = []
                      , t = []
                      , n = this.elem.parentNode;
                    if (n)
                        for (var r = 0; r < 6 && n; r++) {
                            var i = n.id
                              , o = n.className;
                            i && e.push(i),
                            "string" == typeof o && o && t.push(o.replace(/\s+/, ",")),
                            n = n.parentNode
                        }
                    return {
                        ids: e.length ? e.join(",") : "",
                        classes: t.length ? t.join(",") : ""
                    }
                }
            }])
        }
        )())
          , w = (n.StatClickPing = ( () => {
            function s(e, t, n) {
                if (h(this, s),
                !n.elem && !n.event || !n.event.target)
                    throw "An element or click event is required for a StatClickPing.";
                n.elem = n.elem || n.event.target;
                var r, e = (r = u(this, s, [e, t, n])).opts, t = e.event, n = e.elem, e = e.button;
                if (r.setData({
                    jsevent: "click",
                    iscontextmenu: 2 === e,
                    button: e
                }),
                r.elem = n,
                r.event = t,
                r._data.jsevent = "click",
                t.which && 3 == t.which)
                    return p(r);
                var i, o = r._getXYOnClick(t);
                for (i in o) {
                    var a = o[i];
                    void 0 !== a && (r._data[i.toLowerCase()] = a)
                }
                return r
            }
            return f(s, _),
            y(s, [{
                key: "_getXYOnClick",
                value: function() {
                    var e, t = this.event, n = {};
                    return this.config.get("calcXY") && t && (t.clientX || t.clientY ? (e = c.Utils.getScrollXYPx(),
                    n.evt_coor_x = t.clientX + e[0],
                    n.evt_coor_y = t.clientY + e[1]) : (t.pageX || t.pageY) && (n.evt_coor_x = t.pageX,
                    n.evt_coor_y = t.pageY)),
                    n
                }
            }])
        }
        )(),
        n.StatBeforeUnloadPing = ( () => {
            function r(e, t, n) {
                h(this, r);
                t = (e = u(this, r, [e, t, n])).opts,
                t.event,
                n = c.Utils.canScroll(e.config.get("calcXY"));
                return e.setData(e._getPageSize()),
                e.setData({
                    canscroll_x: n.x,
                    canscroll_y: n.y,
                    jsevent: "unload",
                    jsloadtime: e._getJsloadtime(),
                    ncbi_timeonpage: e._getTimeOnPage()
                }),
                e.setData({
                    jsperf_basePage: e.perf.basePage,
                    jsperf_connect: e.perf.connect,
                    jsperf_dns: e.perf.dns,
                    jsperf_navType: e.perf.navType,
                    jsperf_redirectCount: e.perf.redirectCount,
                    jsperf_ttfb: e.perf.ttfb
                }),
                e
            }
            return f(r, v),
            y(r, [{
                key: "_getTimeOnPage",
                value: function() {
                    var e = null
                      , t = window.ncbi_startTime;
                    return e = void 0 !== t ? new Date - t : e
                }
            }, {
                key: "_getPageSize",
                value: function() {
                    var e = document.body.scrollWidth
                      , t = document.body.scrollHeight
                      , n = window.innerWidth || (document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : null !== document.body ? document.body.clientWidth : "NA")
                      , r = window.innerHeight || (document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : null !== document.body ? document.body.clientHeight : "NA");
                    return {
                        "x.pagesize": Math.round(e / n * 10),
                        "y.pagesize": Math.round(t / r * 10)
                    }
                }
            }])
        }
        )(),
        n.StatDOMContentLoadedPing = ( () => {
            function r(e, t, n) {
                h(this, r);
                t = (e = u(this, r, [e, t, n])).opts;
                t.data;
                return e.setData({
                    jsevent: "domready"
                }),
                e
            }
            return f(r, v),
            y(r)
        }
        )(),
        n.StatSearchPing = ( () => {
            function l(e, t, n) {
                h(this, l);
                for (var r, e = (r = u(this, l, [e, t, n])).opts, t = (e.data,
                e.event), i = (r.setData({
                    jsevent: "search"
                }),
                t.target.querySelectorAll("input, option")), o = 0; o < i.length; o++) {
                    var a = i[o]
                      , s = a.tagName.toLowerCase();
                    "option" === s && !a.selected || "input" === s && "radio" === a.getAttribute("type") && !a.checked || (s = a.getAttribute("name"),
                    r._data["search_".concat(s)] = a.value)
                }
                return r
            }
            return f(l, v),
            y(l)
        }
        )(),
        n.StatNextPing = ( () => {
            function r(e, t, n) {
                h(this, r),
                (t = u(this, r, [e, t, n]))._data = {};
                n = c.Utils.getPingerCookie(n.name);
                return n && (t._data = n,
                t._data.next_phid = e.getPhid()),
                t
            }
            return f(r, m),
            y(r)
        }
        )(),
        n.StatPrintPing = ( () => {
            function r(e, t, n) {
                return h(this, r),
                (e = u(this, r, [e, t, n])).setData({
                    jsevent: "print"
                }),
                e
            }
            return f(r, v),
            y(r)
        }
        )(),
        n.StatCookieOverflowPing = ( () => {
            function r(e, t, n) {
                return h(this, r),
                (e = u(this, r, [e, t, n])).setData({
                    jsevent: "cookieoverflow"
                }),
                e
            }
            return f(r, v),
            y(r)
        }
        )());
        n.StatJsErrorPing = ( () => {
            function r(e, t, n) {
                return h(this, r),
                (e = u(this, r, [e, t, n])).setData({
                    jsevent: "jserror"
                }),
                e
            }
            return f(r, v),
            y(r)
        }
        )()
    }
    , {
        "./bridge": 123,
        "./utils": 132
    }],
    130: [function(e, t, n) {
        function i(e) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != i(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != i(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == i(e) ? e : e + ""))(r.key), r)
            }
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.Qualtrics = void 0;
        n.Qualtrics = ( () => {
            function e() {
                if (!(this instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }
            return t = e,
            r = [{
                key: "injectQualtrics",
                value: function() {
                    var e = "dikYWqsjiUWN0Q5";
                    if (!document.getElementById("ZN_" + e)) {
                        var t = document.createElement("div");
                        t.setAttribute("id", "ZN_" + e),
                        document.body.appendChild(t);
                        try {
                            new function(n, r, i, t) {
                                this.get = function(e) {
                                    for (var e = e + "=", t = document.cookie.split(";"), n = 0, r = t.length; n < r; n++) {
                                        for (var i = t[n]; " " == i.charAt(0); )
                                            i = i.substring(1, i.length);
                                        if (0 == i.indexOf(e))
                                            return i.substring(e.length, i.length)
                                    }
                                    return null
                                }
                                ,
                                this.set = function(e, t) {
                                    var n = "";
                                    (n = new Date).setTime(n.getTime() + 6048e5),
                                    n = "; expires=" + n.toGMTString(),
                                    document.cookie = e + "=" + t + n + "; path=/; "
                                }
                                ,
                                this.check = function() {
                                    var e = this.get(i);
                                    if (e)
                                        e = e.split(":");
                                    else {
                                        if (100 == n)
                                            return !0;
                                        "v" == r && (n = Math.random() >= n / 100 ? 0 : 100),
                                        e = [r, n, 0],
                                        this.set(i, e.join(":"))
                                    }
                                    var t = e[1];
                                    if (100 != t)
                                        switch (e[0]) {
                                        case "v":
                                            return !1;
                                        case "r":
                                            return t = e[2] % Math.floor(100 / t),
                                            e[2]++,
                                            this.set(i, e.join(":")),
                                            !t
                                        }
                                    return !0
                                }
                                ,
                                this.go = function() {
                                    var e;
                                    this.check() && ((e = document.createElement("script")).type = "text/javascript",
                                    e.src = t,
                                    document.body) && document.body.appendChild(e)
                                }
                                ,
                                this.start = function() {
                                    var e = this;
                                    "complete" !== document.readyState ? window.addEventListener ? window.addEventListener("load", function() {
                                        e.go()
                                    }, !1) : window.attachEvent && window.attachEvent("onload", function() {
                                        e.go()
                                    }) : e.go()
                                }
                            }
                            (100,"r","QSI_S_ZN_" + e,"https://zn" + e + "-nlmenterprise.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_" + e).start()
                        } catch (e) {}
                    }
                }
            }],
            (n = null) && o(t.prototype, n),
            r && o(t, r),
            Object.defineProperty(t, "prototype", {
                writable: !1
            }),
            t;
            var t, n, r
        }
        )()
    }
    , {}],
    131: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.default = void 0;
        var i = a(e("js-cookie"))
          , r = a(e("uuid"))
          , o = e("./utils.js");
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        l = s = null,
        c = 0;
        var s, l, c, e = {
            create: function(e) {
                function t(e) {
                    try {
                        return sessionStorage.getItem(e) || null
                    } catch (e) {
                        return null
                    }
                }
                var n, r;
                return r = o.Utils.getCookie("ncbi_sid", !1) || o.Utils.getCookie("pinger_sid", !1) || t("ncbi_sid"),
                s = r || (r = i.default.get("WebCubbyUser") || t("WebCubbyUser"),
                n = i.default.get("WebEnv") || t("WebEnv"),
                (r = r || n) ? 1 < (n = unescape(r).split("@")).length ? n[n.length - 1] : r : (n = u(),
                r = "clinicaltrials.gov",
                o.Utils.getHostname().substring(o.Utils.getHostname().length - r.length) === r && o.Utils.setCookie({
                    name: "pinger_sid",
                    value: n,
                    expiredays: 365,
                    useCookie: !0,
                    encode: !1,
                    domain: ".clinicaltrials.gov"
                }),
                n)),
                l = (e => {
                    var t = document.querySelectorAll("meta");
                    if (0 < t.length)
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n]
                              , i = r.getAttribute("content");
                            if ("ncbi_phid" === r.getAttribute("name") && "" !== i)
                                return r.getAttribute("content")
                        }
                    var o = e.substr(0, 15) + "9" + (new Date).getTime()
                      , a = e.length;
                    return o += e.substr(a - (32 - o.length), a)
                }
                )(s),
                c = 0,
                this
            },
            getSessionId: function() {
                return s
            },
            getPhid: function() {
                return l
            },
            getIncrementedPhid: function() {
                return l + ".0" + (c += 1)
            }
        };
        function u() {
            var e = ((e = (0,
            r.default)()).slice(0, 8) + e.slice(9, 13) + e.slice(15, 18) + e.slice(20, 23) + e.slice(24, 36)).slice(0, 20)
              , t = (new Date).getTime().toString();
            return e + t.slice(t.length - 7, t.length) + "_7SID"
        }
        n.default = e
    }
    , {
        "./utils.js": 132,
        "js-cookie": 115,
        uuid: 118
    }],
    132: [function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }),
        n.Utils = void 0;
        var r = s(e("core-js/stable/object/assign"))
          , i = s(e("core-js/stable/object/entries"))
          , c = s(e("core-js/stable/array/includes"))
          , o = s(e("core-js/stable/array/from"))
          , u = s(e("js-cookie"))
          , a = s(e("lz-string"));
        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        function p(e) {
            return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function f(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, (e => (e = ( (e, t) => {
                    if ("object" != p(e) || !e)
                        return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 === n)
                        return ("string" === t ? String : Number)(e);
                    if ("object" != p(n = n.call(e, t || "default")))
                        return n;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                )(e, "string"),
                "symbol" == p(e) ? e : e + ""))(r.key), r)
            }
        }
        e("url-polyfill");
        n.Utils = ( () => {
            function l() {
                if (!(this instanceof l))
                    throw new TypeError("Cannot call a class as a function")
            }
            return e = l,
            n = [{
                key: "loadPinger",
                value: function(e) {
                    var t = e.pingClass
                      , n = e.forceNewPinger
                      , e = e.track
                      , r = window
                      , t = (r.ncbi || (r.ncbi = {}),
                    r.ncbi.sg && !n || (r.ncbi._timePingerLoaded = new Date,
                    n = {},
                    r.ncbi.sgConfig && (n.config = r.ncbi.sgConfig,
                    delete r.ncbi.sgConfig),
                    r.ncbi.sgTrace && (n.trace = r.ncbi.sgTrace,
                    delete r.ncbi.sgTrace),
                    r.ncbi.sgMonkeyPatch && (n.monkeyPatch = r.ncbi.sgMonkeyPatch,
                    delete r.ncbi.sgMonkeyPatch),
                    r.ncbi.sg = new t({
                        options: n
                    }),
                    r.ncbi.sg.pings = {},
                    r.ncbi.pinger = r.ncbi.sg),
                    r.ncbi.sg.config.get("trackStat"));
                    (void 0 === e || e) && t && r.ncbi.sg.track()
                }
            }, {
                key: "getObjFromArray",
                value: function(e) {
                    var t = {};
                    return e.forEach(function(e) {
                        e = e.split("=");
                        t[e[0]] = e[1]
                    }),
                    t
                }
            }, {
                key: "deserialize",
                value: function(e) {
                    return e ? e.split("&").map(function(e) {
                        return e.split("=")
                    }).reduce(function(e, t) {
                        return e[t[0]] = t[1],
                        e
                    }, {}) : ""
                }
            }, {
                key: "serialize",
                value: function(o, a) {
                    var e, s = [];
                    for (e in o)
                        (r => {
                            var e = o[r];
                            if (a && (0,
                            c.default)(a, r) && !e)
                                return;
                            if (Array.isArray(e))
                                e.forEach(function(e, t) {
                                    var n = Object.keys(e)[0]
                                      , e = e[n];
                                    s.push("".concat(n, ".").concat(t, ".").concat(r, "=").concat(e))
                                });
                            else if ("object" === p(e) && e.constructor === Object)
                                for (var t in e)
                                    for (var n in e[t]) {
                                        var i = e[t][n];
                                        s.push("".concat(n, ".").concat(t, ".").concat(r, "=").concat(i))
                                    }
                            else
                                s.push("".concat(r, "=").concat(e))
                        }
                        )(e);
                    return s.map(function(e) {
                        return encodeURIComponent(e).replace("%3D", "=")
                    }).sort().join("&")
                }
            }, {
                key: "getTarget",
                value: function(e, t) {
                    e = e.target || e.srcElement;
                    return e ? t ? this.closest(e, t) : e : null
                }
            }, {
                key: "getLinkClass",
                value: function(e) {
                    e = e.getAttribute ? e.getAttribute("class") : null;
                    return e && e.replace(/^\s?/, "").replace(/\s?$/, "").split(/\s/g).join(",") || ""
                }
            }, {
                key: "getDims",
                value: function(e) {
                    var t = {
                        height: null,
                        width: null
                    };
                    return e && (null !== (e = l.getWidthHeight()).width && (t.width = e.width),
                    null !== e.height) && (t.height = e.height),
                    t
                }
            }, {
                key: "canScroll",
                value: function(e) {
                    var t, n;
                    return e ? (e = l.getDims(e),
                    t = document.body.scrollWidth,
                    n = document.body.scrollHeight,
                    {
                        x: t > e.width ? "true" : "false",
                        y: e.height < n ? "true" : "false"
                    }) : {
                        x: !1,
                        y: !1
                    }
                }
            }, {
                key: "getScrollXYPx",
                value: function() {
                    return [window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0]
                }
            }, {
                key: "getWidth",
                value: function() {
                    return window.innerWidth || (document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : null !== document.body ? document.body.clientWidth : "NA")
                }
            }, {
                key: "getHeight",
                value: function() {
                    return window.innerHeight || (document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : null !== document.body ? document.body.clientHeight : "NA")
                }
            }, {
                key: "getWidthHeight",
                value: function() {
                    return {
                        width: l.getWidth(),
                        height: l.getHeight()
                    }
                }
            }, {
                key: "_cookieDomain",
                value: function(e) {
                    return e
                }
            }, {
                key: "_setCookie",
                value: function(e, t, n, r, i, o, a) {
                    var s, i = i ? l.lzwEncode(t) : t;
                    if (window.sessionStorage)
                        try {
                            sessionStorage.setItem(e, i),
                            0
                        } catch (e) {
                            0
                        }
                    r && (o && (s = l._cookieDomain(o)),
                    u.default.set(e, i, {
                        domain: s,
                        expires: n,
                        secure: a
                    }))
                }
            }, {
                key: "getConnectionType",
                value: function() {
                    if ("undefined" != typeof navigator) {
                        var e = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                        if (void 0 !== e && void 0 !== e.type)
                            return e.type
                    }
                    return ""
                }
            }, {
                key: "getConnectionEffectiveType",
                value: function() {
                    if ("undefined" != typeof navigator) {
                        var e = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                        if (void 0 !== e && void 0 !== e.effectiveType)
                            return e.effectiveType
                    }
                    return ""
                }
            }, {
                key: "_getNameToNum",
                value: function() {
                    return {
                        ancestorClassName: 0,
                        ancestorId: 1,
                        ncbi_app: 2,
                        ncbi_db: 3,
                        ncbi_pdid: 4,
                        ncbi_pcid: 5,
                        ncbi_report: 6,
                        ncbi_format: 7,
                        ncbi_pagesize: 8,
                        ncbi_sortorder: 9,
                        ncbi_pageno: 11,
                        ncbi_pingaction: 12,
                        ncbi_resultcount: 13,
                        ncbi_op: 14,
                        ncbi_uidlist: 15,
                        ncbi_filter: 16,
                        ncbi_stat: 17,
                        ncbi_hitstat: 18,
                        prev_phid: 19,
                        ncbi_phid: 20,
                        pagename: 21,
                        server: 22,
                        sitesect1: 23,
                        sitesect2: 24,
                        subsect2: 25,
                        subsect3: 26,
                        subsect4: 27,
                        heir1: 28,
                        screenwidth: 29,
                        screenheight: 30,
                        screenavailwidth: 31,
                        screenavailheight: 32,
                        canscroll_x: 33,
                        canscroll_y: 34,
                        scrollwidth: 35,
                        scrollheight: 36,
                        colordepth: 37,
                        ncbi_timeonpage: 38,
                        ncbi_timesinceload: 39,
                        ncbi_timesincenavstart: 40,
                        ncbi_onloadtime: 41,
                        sgsource: 42,
                        sgversion: 43,
                        jsevent: 44,
                        eventid: 45,
                        iscontextmenu: 46,
                        evt_coor_x: 47,
                        evt_coor_y: 48,
                        link_class: 49,
                        link_href: 50,
                        link_id: 51,
                        link_text: 52,
                        browserwidth: 53,
                        browserheight: 54,
                        jsperf_basepage: 55,
                        jsperf_connect: 56,
                        jsperf_dns: 57,
                        jsperf_frontend: 58,
                        jsperf_navtype: 59,
                        jsperf_redirectcount: 60,
                        jsperf_ttfb: 61,
                        searchdb: 62,
                        linksrc: 64,
                        ordinalpos: 65,
                        log_op: 66,
                        log_report: 67,
                        ncbi_uid: 68,
                        ncbi_sid: 69,
                        ga_category: 70,
                        ga_action: 71,
                        ga_label: 72
                    }
                }
            }, {
                key: "_getNumToName",
                value: function() {
                    var e, t = l._getNameToNum(), n = {};
                    for (e in t)
                        n[t[e]] = e;
                    return n
                }
            }, {
                key: "_namesToNums",
                value: function(n) {
                    var r = l._getNameToNum();
                    ["commonnext", "searchnext", "clicknext", "unloadnext"].forEach(function(e) {
                        var t;
                        e in n && (t = n[e],
                        Object.keys(t).forEach(function(e) {
                            e in r || delete t[e]
                        }),
                        Object.keys(t).forEach(function(e) {
                            t[r[e]] = t[e],
                            delete t[e]
                        }))
                    })
                }
            }, {
                key: "_numsToNames",
                value: function(n) {
                    var r = l._getNumToName();
                    ["commonnext", "searchnext", "clicknext", "unloadnext"].forEach(function(e) {
                        var t;
                        e in n && (t = n[e],
                        Object.keys(t).forEach(function(e) {
                            e in r && (t[r[e]] = t[e]),
                            delete t[e]
                        }))
                    })
                }
            }, {
                key: "_valuesForKeysInObject",
                value: function(t, e) {
                    var n = [];
                    return e.forEach(function(e) {
                        e in t && n.push(t[e])
                    }),
                    n
                }
            }, {
                key: "_sameForName",
                value: function(e, t) {
                    var n = t[0][e];
                    if (null == n)
                        return null;
                    for (var r = 0; r < t.length; ++r) {
                        var i = t[r];
                        if (!(e in i))
                            return null;
                        if (n !== i[e])
                            return null
                    }
                    return n
                }
            }, {
                key: "_combineCommon",
                value: function(n) {
                    var r = l._valuesForKeysInObject(n, ["searchnext", "clicknext", "unloadnext"]);
                    r.length <= 1 || (n.commonnext = {},
                    Object.keys(r[0]).forEach(function(t) {
                        var e = l._sameForName(t, r);
                        null !== e && (n.commonnext[t] = e,
                        r.forEach(function(e) {
                            delete e[t]
                        }))
                    }))
                }
            }, {
                key: "_distributeCommon",
                value: function(n) {
                    var e;
                    "commonnext"in n && (e = l._valuesForKeysInObject(n, ["searchnext", "clicknext", "unloadnext"]),
                    Object.keys(n.commonnext).forEach(function(t) {
                        e.forEach(function(e) {
                            e[t] = n.commonnext[t]
                        })
                    }),
                    delete n.commonnext)
                }
            }, {
                key: "setPingerCookie",
                value: function(e) {
                    var t = l.getPingerCookie();
                    (t = t || {})[e.name] = e.value,
                    l._combineCommon(t),
                    l._namesToNums(t),
                    l.setCookie({
                        name: "ncbi_pinger",
                        value: JSON.stringify(t),
                        expiredays: null,
                        useCookie: !0,
                        encode: !0,
                        domain: e.domain
                    })
                }
            }, {
                key: "getPingerCookie",
                value: function(e) {
                    var t, n = l.getCookie("ncbi_pinger", !0);
                    if (n) {
                        try {
                            t = JSON.parse(n)
                        } catch (e) {
                            return null
                        }
                        if (!t)
                            return null;
                        if (l._numsToNames(t),
                        l._distributeCommon(t),
                        !e)
                            return t;
                        if (t.hasOwnProperty(e))
                            return t[e]
                    }
                    return null
                }
            }, {
                key: "setCookie",
                value: function(e) {
                    var t = e.name;
                    return l._setCookie(t, e.value, e.expiredays, e.useCookie, e.encode, e.domain, !0)
                }
            }, {
                key: "lzwEncode",
                value: function(e) {
                    return "" == e ? "" : a.default.compressToBase64(e)
                }
            }, {
                key: "lzwDecode",
                value: function(e) {
                    return "" == e ? "" : a.default.decompressFromBase64(e)
                }
            }, {
                key: "getScreenStats",
                value: function() {
                    var e, t = {
                        colorDepth: "colorDepth",
                        width: "screenwidth",
                        height: "screenheight",
                        availWidth: "screenavailwidth",
                        availHeight: "screenavailheight"
                    }, n = {}, r = window.screen;
                    for (e in r)
                        t[e] && (n[t[e]] = r[e]);
                    return n
                }
            }, {
                key: "getPerformance",
                value: function() {
                    var e, t = window.performance;
                    return t ? (e = (e = t.timing) ? {
                        now: t.now.bind(window.performance),
                        dns: e.domainLookupEnd - e.domainLookupStart,
                        connect: e.connectEnd - e.connectStart,
                        ttfb: e.responseStart - e.connectEnd,
                        basePage: e.responseEnd - e.responseStart,
                        frontEnd: e.loadEventStart - e.responseEnd
                    } : {},
                    (t = t.navigation) && (e.navType = t.type,
                    e.redirectCount = t.redirectCount)) : e = {},
                    e
                }
            }, {
                key: "signedInToMyNCBI",
                value: function() {
                    var e = l.getCookie("WebCubbyUser");
                    return !!e && -1 !== e.search(/logged-in=true/)
                }
            }, {
                key: "deleteCookie",
                value: function(e, t) {
                    u.default.remove(e, t)
                }
            }, {
                key: "getCookie",
                value: function(e, t) {
                    e = u.default.get(e);
                    return e = t ? l.lzwDecode(e) : e
                }
            }, {
                key: "isAnyPartOfElInView",
                value: function(e) {
                    var e = e.getBoundingClientRect()
                      , t = window.innerHeight || document.documentElement.clientHeight
                      , n = window.innerWidth || document.documentElement.clientWidth
                      , t = e.top <= t && 0 <= e.top + e.height
                      , n = e.left <= n && 0 <= e.left + e.width;
                    return t && n
                }
            }, {
                key: "getNowInSeconds",
                value: function() {
                    return (new Date).getTime() / 1e3
                }
            }, {
                key: "getMaxScrollAsPercent",
                value: function(e) {
                    var t = e.x
                      , e = e.y;
                    return {
                        x: t ? Math.round(t / document.body.scrollWidth * 100) : 0,
                        y: e ? Math.round(e / document.body.scrollHeight * 100) : 0
                    }
                }
            }, {
                key: "scrollStop",
                value: function(t) {
                    var n;
                    window.addEventListener("scroll", function(e) {
                        window.clearTimeout(n),
                        n = setTimeout(function() {
                            t()
                        }, 66)
                    }, !1)
                }
            }, {
                key: "getScrollXY",
                value: function() {
                    return {
                        x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                        y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                    }
                }
            }, {
                key: "_getSectionFor",
                value: function(e) {
                    var t = e.dataset ? e.dataset.section : null;
                    return (t = t || (e.getAttribute ? e.getAttribute("data-section") : null)) || null
                }
            }, {
                key: "getSectionName",
                value: function(e) {
                    function t(e) {
                        var t = null;
                        return t = e && e.tagName ? e.tagName.toLowerCase() : t
                    }
                    if (l._getSectionFor(e))
                        return l._getSectionFor(e);
                    if ("section" === t(e) && e.id)
                        return e.id;
                    var n = e.parentNode;
                    if (n)
                        for (; n; ) {
                            if (l._getSectionFor(n))
                                return l._getSectionFor(n);
                            if ("section" === t(n) && n.id)
                                return n.id;
                            n = n.parentNode
                        }
                    return null
                }
            }, {
                key: "_getGaActionFor",
                value: function(e) {
                    var t = e.dataset ? e.dataset.gaAction : null;
                    return (t = t || (e.getAttribute ? e.getAttribute("data-ga-action") : null)) || null
                }
            }, {
                key: "getGaActionFromEl",
                value: function(e) {
                    return (l._getGaActionFor(e) ? l._getGaActionFor(e) : null) || e.innerText || e.textContent || e.value || "NONE"
                }
            }, {
                key: "getGaCategoryFromEl",
                value: function(e) {
                    var t = e.dataset ? e.dataset.gaCategory : null;
                    return (t = t || (e.getAttribute ? e.getAttribute("data-ga-category") : null)) || null
                }
            }, {
                key: "getDefaultBool",
                value: function(e) {
                    return null == e ? !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1] : e
                }
            }, {
                key: "objectAssign",
                value: function() {
                    return r.default.apply(Object, arguments)
                }
            }, {
                key: "objectEntries",
                value: function() {
                    return i.default.apply(Object, arguments)
                }
            }, {
                key: "includes",
                value: function(e, t) {
                    return (0,
                    c.default)(e, t)
                }
            }, {
                key: "arrayFrom",
                value: function() {
                    return o.default.apply(Array, arguments)
                }
            }, {
                key: "closest",
                value: function(e, t) {
                    do {
                        if (e.matches(t))
                            return e
                    } while (null !== (e = e.parentElement || e.parentNode) && 1 === e.nodeType);
                    return null
                }
            }, {
                key: "trimUndefined",
                value: function(e) {
                    for (; e.length && void 0 === e[e.length - 1]; )
                        e.pop();
                    return e
                }
            }, {
                key: "filterUrlParams",
                value: function(e, r) {
                    var t, n, i;
                    return "function" == typeof URLSearchParams ? (n = new URL(e),
                    t = new URLSearchParams(n.search),
                    r.forEach(function(e) {
                        t.delete(e)
                    }),
                    0 < (n = t.toString()).length ? "?" + n : "") : (i = "",
                    0 < e.search.length && e.search.substring(1).split("&").forEach(function(e) {
                        var t, n;
                        e && (t = e.split("="),
                        n = !1,
                        r.forEach(function(e) {
                            t[0] == e && (n = !0)
                        }),
                        n || (0 == i.length ? i += "?" : i += "&",
                        i += e))
                    }),
                    i)
                }
            }, {
                key: "filteredURLFull",
                value: function(e, t) {
                    return e.protocol + "//" + e.host + e.pathname + this.filterUrlParams(e, t)
                }
            }, {
                key: "filteredURLPathParams",
                value: function(e, t) {
                    return e.pathname + this.filterUrlParams(e, t)
                }
            }, {
                key: "getHostname",
                value: function() {
                    return window.location.hostname
                }
            }],
            (t = null) && f(e.prototype, t),
            n && f(e, n),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e;
            var e, t, n
        }
        )()
    }
    , {
        "core-js/stable/array/from": 111,
        "core-js/stable/array/includes": 112,
        "core-js/stable/object/assign": 113,
        "core-js/stable/object/entries": 114,
        "js-cookie": 115,
        "lz-string": 116,
        "url-polyfill": 117
    }],
    133: [function(e, t, n) {
        e.main === t ? console.log("0.41.0") : t.exports = "0.41.0"
    }
    , {}]
}, {}, [125]);
