import {
    b as x,
    c as Rh
} from "https://www.convertcalculator.com/scripts/chunk-66GJGIWN.js";
var Is = x(T => {
    "use strict";
    var ye = Symbol.for("react.element"),
        Ih = Symbol.for("react.portal"),
        Fh = Symbol.for("react.fragment"),
        zh = Symbol.for("react.strict_mode"),
        Bh = Symbol.for("react.profiler"),
        jh = Symbol.for("react.provider"),
        Vh = Symbol.for("react.context"),
        Nh = Symbol.for("react.forward_ref"),
        Hh = Symbol.for("react.suspense"),
        Wh = Symbol.for("react.memo"),
        qh = Symbol.for("react.lazy"),
        ks = Symbol.iterator;

    function $h(e) {
        return e === null || typeof e != "object" ? null : (e = ks && e[ks] || e["@@iterator"], typeof e == "function" ? e : null)
    }
    var Cs = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        },
        As = Object.assign,
        Ds = {};

    function $t(e, t, i) {
        this.props = e, this.context = t, this.refs = Ds, this.updater = i || Cs
    }
    $t.prototype.isReactComponent = {};
    $t.prototype.setState = function(e, t) {
        if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, e, t, "setState")
    };
    $t.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate")
    };

    function Ts() {}
    Ts.prototype = $t.prototype;

    function Ji(e, t, i) {
        this.props = e, this.context = t, this.refs = Ds, this.updater = i || Cs
    }
    var Qi = Ji.prototype = new Ts;
    Qi.constructor = Ji;
    As(Qi, $t.prototype);
    Qi.isPureReactComponent = !0;
    var Ps = Array.isArray,
        Ls = Object.prototype.hasOwnProperty,
        tn = {
            current: null
        },
        Es = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };

    function Rs(e, t, i) {
        var n, s = {},
            o = null,
            r = null;
        if (t != null)
            for (n in t.ref !== void 0 && (r = t.ref), t.key !== void 0 && (o = "" + t.key), t) Ls.call(t, n) && !Es.hasOwnProperty(n) && (s[n] = t[n]);
        var a = arguments.length - 2;
        if (a === 1) s.children = i;
        else if (1 < a) {
            for (var l = Array(a), c = 0; c < a; c++) l[c] = arguments[c + 2];
            s.children = l
        }
        if (e && e.defaultProps)
            for (n in a = e.defaultProps, a) s[n] === void 0 && (s[n] = a[n]);
        return {
            $$typeof: ye,
            type: e,
            key: o,
            ref: r,
            props: s,
            _owner: tn.current
        }
    }

    function Uh(e, t) {
        return {
            $$typeof: ye,
            type: e.type,
            key: t,
            ref: e.ref,
            props: e.props,
            _owner: e._owner
        }
    }

    function en(e) {
        return typeof e == "object" && e !== null && e.$$typeof === ye
    }

    function Yh(e) {
        var t = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + e.replace(/[=:]/g, function(i) {
            return t[i]
        })
    }
    var Os = /\/+/g;

    function Zi(e, t) {
        return typeof e == "object" && e !== null && e.key != null ? Yh("" + e.key) : t.toString(36)
    }

    function ii(e, t, i, n, s) {
        var o = typeof e;
        (o === "undefined" || o === "boolean") && (e = null);
        var r = !1;
        if (e === null) r = !0;
        else switch (o) {
            case "string":
            case "number":
                r = !0;
                break;
            case "object":
                switch (e.$$typeof) {
                    case ye:
                    case Ih:
                        r = !0
                }
        }
        if (r) return r = e, s = s(r), e = n === "" ? "." + Zi(r, 0) : n, Ps(s) ? (i = "", e != null && (i = e.replace(Os, "$&/") + "/"), ii(s, t, i, "", function(c) {
            return c
        })) : s != null && (en(s) && (s = Uh(s, i + (!s.key || r && r.key === s.key ? "" : ("" + s.key).replace(Os, "$&/") + "/") + e)), t.push(s)), 1;
        if (r = 0, n = n === "" ? "." : n + ":", Ps(e))
            for (var a = 0; a < e.length; a++) {
                o = e[a];
                var l = n + Zi(o, a);
                r += ii(o, t, i, l, s)
            } else if (l = $h(e), typeof l == "function")
                for (e = l.call(e), a = 0; !(o = e.next()).done;) o = o.value, l = n + Zi(o, a++), r += ii(o, t, i, l, s);
            else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
        return r
    }

    function ei(e, t, i) {
        if (e == null) return e;
        var n = [],
            s = 0;
        return ii(e, n, "", "", function(o) {
            return t.call(i, o, s++)
        }), n
    }

    function Xh(e) {
        if (e._status === -1) {
            var t = e._result;
            t = t(), t.then(function(i) {
                (e._status === 0 || e._status === -1) && (e._status = 1, e._result = i)
            }, function(i) {
                (e._status === 0 || e._status === -1) && (e._status = 2, e._result = i)
            }), e._status === -1 && (e._status = 0, e._result = t)
        }
        if (e._status === 1) return e._result.default;
        throw e._result
    }
    var Q = {
            current: null
        },
        ni = {
            transition: null
        },
        Kh = {
            ReactCurrentDispatcher: Q,
            ReactCurrentBatchConfig: ni,
            ReactCurrentOwner: tn
        };
    T.Children = {
        map: ei,
        forEach: function(e, t, i) {
            ei(e, function() {
                t.apply(this, arguments)
            }, i)
        },
        count: function(e) {
            var t = 0;
            return ei(e, function() {
                t++
            }), t
        },
        toArray: function(e) {
            return ei(e, function(t) {
                return t
            }) || []
        },
        only: function(e) {
            if (!en(e)) throw Error("React.Children.only expected to receive a single React element child.");
            return e
        }
    };
    T.Component = $t;
    T.Fragment = Fh;
    T.Profiler = Bh;
    T.PureComponent = Ji;
    T.StrictMode = zh;
    T.Suspense = Hh;
    T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kh;
    T.cloneElement = function(e, t, i) {
        if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
        var n = As({}, e.props),
            s = e.key,
            o = e.ref,
            r = e._owner;
        if (t != null) {
            if (t.ref !== void 0 && (o = t.ref, r = tn.current), t.key !== void 0 && (s = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
            for (l in t) Ls.call(t, l) && !Es.hasOwnProperty(l) && (n[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l])
        }
        var l = arguments.length - 2;
        if (l === 1) n.children = i;
        else if (1 < l) {
            a = Array(l);
            for (var c = 0; c < l; c++) a[c] = arguments[c + 2];
            n.children = a
        }
        return {
            $$typeof: ye,
            type: e.type,
            key: s,
            ref: o,
            props: n,
            _owner: r
        }
    };
    T.createContext = function(e) {
        return e = {
            $$typeof: Vh,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null
        }, e.Provider = {
            $$typeof: jh,
            _context: e
        }, e.Consumer = e
    };
    T.createElement = Rs;
    T.createFactory = function(e) {
        var t = Rs.bind(null, e);
        return t.type = e, t
    };
    T.createRef = function() {
        return {
            current: null
        }
    };
    T.forwardRef = function(e) {
        return {
            $$typeof: Nh,
            render: e
        }
    };
    T.isValidElement = en;
    T.lazy = function(e) {
        return {
            $$typeof: qh,
            _payload: {
                _status: -1,
                _result: e
            },
            _init: Xh
        }
    };
    T.memo = function(e, t) {
        return {
            $$typeof: Wh,
            type: e,
            compare: t === void 0 ? null : t
        }
    };
    T.startTransition = function(e) {
        var t = ni.transition;
        ni.transition = {};
        try {
            e()
        } finally {
            ni.transition = t
        }
    };
    T.unstable_act = function() {
        throw Error("act(...) is not supported in production builds of React.")
    };
    T.useCallback = function(e, t) {
        return Q.current.useCallback(e, t)
    };
    T.useContext = function(e) {
        return Q.current.useContext(e)
    };
    T.useDebugValue = function() {};
    T.useDeferredValue = function(e) {
        return Q.current.useDeferredValue(e)
    };
    T.useEffect = function(e, t) {
        return Q.current.useEffect(e, t)
    };
    T.useId = function() {
        return Q.current.useId()
    };
    T.useImperativeHandle = function(e, t, i) {
        return Q.current.useImperativeHandle(e, t, i)
    };
    T.useInsertionEffect = function(e, t) {
        return Q.current.useInsertionEffect(e, t)
    };
    T.useLayoutEffect = function(e, t) {
        return Q.current.useLayoutEffect(e, t)
    };
    T.useMemo = function(e, t) {
        return Q.current.useMemo(e, t)
    };
    T.useReducer = function(e, t, i) {
        return Q.current.useReducer(e, t, i)
    };
    T.useRef = function(e) {
        return Q.current.useRef(e)
    };
    T.useState = function(e) {
        return Q.current.useState(e)
    };
    T.useSyncExternalStore = function(e, t, i) {
        return Q.current.useSyncExternalStore(e, t, i)
    };
    T.useTransition = function() {
        return Q.current.useTransition()
    };
    T.version = "18.2.0"
});
var nn = x((n0, Fs) => {
    "use strict";
    Fs.exports = Is()
});
var Bs = x(si => {
    "use strict";
    var Gh = nn(),
        Zh = Symbol.for("react.element"),
        Jh = Symbol.for("react.fragment"),
        Qh = Object.prototype.hasOwnProperty,
        tu = Gh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
        eu = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        };

    function zs(e, t, i) {
        var n, s = {},
            o = null,
            r = null;
        i !== void 0 && (o = "" + i), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (r = t.ref);
        for (n in t) Qh.call(t, n) && !eu.hasOwnProperty(n) && (s[n] = t[n]);
        if (e && e.defaultProps)
            for (n in t = e.defaultProps, t) s[n] === void 0 && (s[n] = t[n]);
        return {
            $$typeof: Zh,
            type: e,
            key: o,
            ref: r,
            props: s,
            _owner: tu.current
        }
    }
    si.Fragment = Jh;
    si.jsx = zs;
    si.jsxs = zs
});
var iu = x((o0, js) => {
    "use strict";
    js.exports = Bs()
});
var Ns = x((r0, Vs) => {
    function nu() {
        this.__data__ = [], this.size = 0
    }
    Vs.exports = nu
});
var ve = x((a0, Hs) => {
    function su(e, t) {
        return e === t || e !== e && t !== t
    }
    Hs.exports = su
});
var Me = x((l0, Ws) => {
    var ou = ve();

    function ru(e, t) {
        for (var i = e.length; i--;)
            if (ou(e[i][0], t)) return i;
        return -1
    }
    Ws.exports = ru
});
var $s = x((c0, qs) => {
    var au = Me(),
        lu = Array.prototype,
        cu = lu.splice;

    function hu(e) {
        var t = this.__data__,
            i = au(t, e);
        if (i < 0) return !1;
        var n = t.length - 1;
        return i == n ? t.pop() : cu.call(t, i, 1), --this.size, !0
    }
    qs.exports = hu
});
var Ys = x((h0, Us) => {
    var uu = Me();

    function du(e) {
        var t = this.__data__,
            i = uu(t, e);
        return i < 0 ? void 0 : t[i][1]
    }
    Us.exports = du
});
var Ks = x((u0, Xs) => {
    var fu = Me();

    function gu(e) {
        return fu(this.__data__, e) > -1
    }
    Xs.exports = gu
});
var Zs = x((d0, Gs) => {
    var pu = Me();

    function mu(e, t) {
        var i = this.__data__,
            n = pu(i, e);
        return n < 0 ? (++this.size, i.push([e, t])) : i[n][1] = t, this
    }
    Gs.exports = mu
});
var Se = x((f0, Js) => {
    var bu = Ns(),
        _u = $s(),
        xu = Ys(),
        yu = Ks(),
        vu = Zs();

    function Ut(e) {
        var t = -1,
            i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i;) {
            var n = e[t];
            this.set(n[0], n[1])
        }
    }
    Ut.prototype.clear = bu;
    Ut.prototype.delete = _u;
    Ut.prototype.get = xu;
    Ut.prototype.has = yu;
    Ut.prototype.set = vu;
    Js.exports = Ut
});
var to = x((g0, Qs) => {
    var Mu = Se();

    function Su() {
        this.__data__ = new Mu, this.size = 0
    }
    Qs.exports = Su
});
var io = x((p0, eo) => {
    function wu(e) {
        var t = this.__data__,
            i = t.delete(e);
        return this.size = t.size, i
    }
    eo.exports = wu
});
var so = x((m0, no) => {
    function ku(e) {
        return this.__data__.get(e)
    }
    no.exports = ku
});
var ro = x((b0, oo) => {
    function Pu(e) {
        return this.__data__.has(e)
    }
    oo.exports = Pu
});
var sn = x((_0, ao) => {
    var Ou = typeof global == "object" && global && global.Object === Object && global;
    ao.exports = Ou
});
var It = x((x0, lo) => {
    var Cu = sn(),
        Au = typeof self == "object" && self && self.Object === Object && self,
        Du = Cu || Au || Function("return this")();
    lo.exports = Du
});
var on = x((y0, co) => {
    var Tu = It(),
        Lu = Tu.Symbol;
    co.exports = Lu
});
var go = x((v0, fo) => {
    var ho = on(),
        uo = Object.prototype,
        Eu = uo.hasOwnProperty,
        Ru = uo.toString,
        we = ho ? ho.toStringTag : void 0;

    function Iu(e) {
        var t = Eu.call(e, we),
            i = e[we];
        try {
            e[we] = void 0;
            var n = !0
        } catch {}
        var s = Ru.call(e);
        return n && (t ? e[we] = i : delete e[we]), s
    }
    fo.exports = Iu
});
var mo = x((M0, po) => {
    var Fu = Object.prototype,
        zu = Fu.toString;

    function Bu(e) {
        return zu.call(e)
    }
    po.exports = Bu
});
var ke = x((S0, xo) => {
    var bo = on(),
        ju = go(),
        Vu = mo(),
        Nu = "[object Null]",
        Hu = "[object Undefined]",
        _o = bo ? bo.toStringTag : void 0;

    function Wu(e) {
        return e == null ? e === void 0 ? Hu : Nu : _o && _o in Object(e) ? ju(e) : Vu(e)
    }
    xo.exports = Wu
});
var St = x((w0, yo) => {
    function qu(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function")
    }
    yo.exports = qu
});
var oi = x((k0, vo) => {
    var $u = ke(),
        Uu = St(),
        Yu = "[object AsyncFunction]",
        Xu = "[object Function]",
        Ku = "[object GeneratorFunction]",
        Gu = "[object Proxy]";

    function Zu(e) {
        if (!Uu(e)) return !1;
        var t = $u(e);
        return t == Xu || t == Ku || t == Yu || t == Gu
    }
    vo.exports = Zu
});
var So = x((P0, Mo) => {
    var Ju = It(),
        Qu = Ju["__core-js_shared__"];
    Mo.exports = Qu
});
var Po = x((O0, ko) => {
    var rn = So(),
        wo = function() {
            var e = /[^.]+$/.exec(rn && rn.keys && rn.keys.IE_PROTO || "");
            return e ? "Symbol(src)_1." + e : ""
        }();

    function td(e) {
        return !!wo && wo in e
    }
    ko.exports = td
});
var Co = x((C0, Oo) => {
    var ed = Function.prototype,
        id = ed.toString;

    function nd(e) {
        if (e != null) {
            try {
                return id.call(e)
            } catch {}
            try {
                return e + ""
            } catch {}
        }
        return ""
    }
    Oo.exports = nd
});
var Do = x((A0, Ao) => {
    var sd = oi(),
        od = Po(),
        rd = St(),
        ad = Co(),
        ld = /[\\^$.*+?()[\]{}|]/g,
        cd = /^\[object .+?Constructor\]$/,
        hd = Function.prototype,
        ud = Object.prototype,
        dd = hd.toString,
        fd = ud.hasOwnProperty,
        gd = RegExp("^" + dd.call(fd).replace(ld, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

    function pd(e) {
        if (!rd(e) || od(e)) return !1;
        var t = sd(e) ? gd : cd;
        return t.test(ad(e))
    }
    Ao.exports = pd
});
var Lo = x((D0, To) => {
    function md(e, t) {
        return e ? .[t]
    }
    To.exports = md
});
var ri = x((T0, Eo) => {
    var bd = Do(),
        _d = Lo();

    function xd(e, t) {
        var i = _d(e, t);
        return bd(i) ? i : void 0
    }
    Eo.exports = xd
});
var an = x((L0, Ro) => {
    var yd = ri(),
        vd = It(),
        Md = yd(vd, "Map");
    Ro.exports = Md
});
var Pe = x((E0, Io) => {
    var Sd = ri(),
        wd = Sd(Object, "create");
    Io.exports = wd
});
var Bo = x((R0, zo) => {
    var Fo = Pe();

    function kd() {
        this.__data__ = Fo ? Fo(null) : {}, this.size = 0
    }
    zo.exports = kd
});
var Vo = x((I0, jo) => {
    function Pd(e) {
        var t = this.has(e) && delete this.__data__[e];
        return this.size -= t ? 1 : 0, t
    }
    jo.exports = Pd
});
var Ho = x((F0, No) => {
    var Od = Pe(),
        Cd = "__lodash_hash_undefined__",
        Ad = Object.prototype,
        Dd = Ad.hasOwnProperty;

    function Td(e) {
        var t = this.__data__;
        if (Od) {
            var i = t[e];
            return i === Cd ? void 0 : i
        }
        return Dd.call(t, e) ? t[e] : void 0
    }
    No.exports = Td
});
var qo = x((z0, Wo) => {
    var Ld = Pe(),
        Ed = Object.prototype,
        Rd = Ed.hasOwnProperty;

    function Id(e) {
        var t = this.__data__;
        return Ld ? t[e] !== void 0 : Rd.call(t, e)
    }
    Wo.exports = Id
});
var Uo = x((B0, $o) => {
    var Fd = Pe(),
        zd = "__lodash_hash_undefined__";

    function Bd(e, t) {
        var i = this.__data__;
        return this.size += this.has(e) ? 0 : 1, i[e] = Fd && t === void 0 ? zd : t, this
    }
    $o.exports = Bd
});
var Xo = x((j0, Yo) => {
    var jd = Bo(),
        Vd = Vo(),
        Nd = Ho(),
        Hd = qo(),
        Wd = Uo();

    function Yt(e) {
        var t = -1,
            i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i;) {
            var n = e[t];
            this.set(n[0], n[1])
        }
    }
    Yt.prototype.clear = jd;
    Yt.prototype.delete = Vd;
    Yt.prototype.get = Nd;
    Yt.prototype.has = Hd;
    Yt.prototype.set = Wd;
    Yo.exports = Yt
});
var Zo = x((V0, Go) => {
    var Ko = Xo(),
        qd = Se(),
        $d = an();

    function Ud() {
        this.size = 0, this.__data__ = {
            hash: new Ko,
            map: new($d || qd),
            string: new Ko
        }
    }
    Go.exports = Ud
});
var Qo = x((N0, Jo) => {
    function Yd(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
    }
    Jo.exports = Yd
});
var Oe = x((H0, tr) => {
    var Xd = Qo();

    function Kd(e, t) {
        var i = e.__data__;
        return Xd(t) ? i[typeof t == "string" ? "string" : "hash"] : i.map
    }
    tr.exports = Kd
});
var ir = x((W0, er) => {
    var Gd = Oe();

    function Zd(e) {
        var t = Gd(this, e).delete(e);
        return this.size -= t ? 1 : 0, t
    }
    er.exports = Zd
});
var sr = x((q0, nr) => {
    var Jd = Oe();

    function Qd(e) {
        return Jd(this, e).get(e)
    }
    nr.exports = Qd
});
var rr = x(($0, or) => {
    var tf = Oe();

    function ef(e) {
        return tf(this, e).has(e)
    }
    or.exports = ef
});
var lr = x((U0, ar) => {
    var nf = Oe();

    function sf(e, t) {
        var i = nf(this, e),
            n = i.size;
        return i.set(e, t), this.size += i.size == n ? 0 : 1, this
    }
    ar.exports = sf
});
var hr = x((Y0, cr) => {
    var of = Zo(), rf = ir(), af = sr(), lf = rr(), cf = lr();

    function Xt(e) {
        var t = -1,
            i = e == null ? 0 : e.length;
        for (this.clear(); ++t < i;) {
            var n = e[t];
            this.set(n[0], n[1])
        }
    }
    Xt.prototype.clear = of ;
    Xt.prototype.delete = rf;
    Xt.prototype.get = af;
    Xt.prototype.has = lf;
    Xt.prototype.set = cf;
    cr.exports = Xt
});
var dr = x((X0, ur) => {
    var hf = Se(),
        uf = an(),
        df = hr(),
        ff = 200;

    function gf(e, t) {
        var i = this.__data__;
        if (i instanceof hf) {
            var n = i.__data__;
            if (!uf || n.length < ff - 1) return n.push([e, t]), this.size = ++i.size, this;
            i = this.__data__ = new df(n)
        }
        return i.set(e, t), this.size = i.size, this
    }
    ur.exports = gf
});
var gr = x((K0, fr) => {
    var pf = Se(),
        mf = to(),
        bf = io(),
        _f = so(),
        xf = ro(),
        yf = dr();

    function Kt(e) {
        var t = this.__data__ = new pf(e);
        this.size = t.size
    }
    Kt.prototype.clear = mf;
    Kt.prototype.delete = bf;
    Kt.prototype.get = _f;
    Kt.prototype.has = xf;
    Kt.prototype.set = yf;
    fr.exports = Kt
});
var ln = x((G0, pr) => {
    var vf = ri(),
        Mf = function() {
            try {
                var e = vf(Object, "defineProperty");
                return e({}, "", {}), e
            } catch {}
        }();
    pr.exports = Mf
});
var ai = x((Z0, br) => {
    var mr = ln();

    function Sf(e, t, i) {
        t == "__proto__" && mr ? mr(e, t, {
            configurable: !0,
            enumerable: !0,
            value: i,
            writable: !0
        }) : e[t] = i
    }
    br.exports = Sf
});
var cn = x((J0, _r) => {
    var wf = ai(),
        kf = ve();

    function Pf(e, t, i) {
        (i !== void 0 && !kf(e[t], i) || i === void 0 && !(t in e)) && wf(e, t, i)
    }
    _r.exports = Pf
});
var yr = x((Q0, xr) => {
    function Of(e) {
        return function(t, i, n) {
            for (var s = -1, o = Object(t), r = n(t), a = r.length; a--;) {
                var l = r[e ? a : ++s];
                if (i(o[l], l, o) === !1) break
            }
            return t
        }
    }
    xr.exports = Of
});
var Mr = x((tv, vr) => {
    var Cf = yr(),
        Af = Cf();
    vr.exports = Af
});
var Or = x((Ce, Gt) => {
    var Df = It(),
        Pr = typeof Ce == "object" && Ce && !Ce.nodeType && Ce,
        Sr = Pr && typeof Gt == "object" && Gt && !Gt.nodeType && Gt,
        Tf = Sr && Sr.exports === Pr,
        wr = Tf ? Df.Buffer : void 0,
        kr = wr ? wr.allocUnsafe : void 0;

    function Lf(e, t) {
        if (t) return e.slice();
        var i = e.length,
            n = kr ? kr(i) : new e.constructor(i);
        return e.copy(n), n
    }
    Gt.exports = Lf
});
var Ar = x((ev, Cr) => {
    var Ef = It(),
        Rf = Ef.Uint8Array;
    Cr.exports = Rf
});
var Lr = x((iv, Tr) => {
    var Dr = Ar();

    function If(e) {
        var t = new e.constructor(e.byteLength);
        return new Dr(t).set(new Dr(e)), t
    }
    Tr.exports = If
});
var Rr = x((nv, Er) => {
    var Ff = Lr();

    function zf(e, t) {
        var i = t ? Ff(e.buffer) : e.buffer;
        return new e.constructor(i, e.byteOffset, e.length)
    }
    Er.exports = zf
});
var Fr = x((sv, Ir) => {
    function Bf(e, t) {
        var i = -1,
            n = e.length;
        for (t || (t = Array(n)); ++i < n;) t[i] = e[i];
        return t
    }
    Ir.exports = Bf
});
var jr = x((ov, Br) => {
    var jf = St(),
        zr = Object.create,
        Vf = function() {
            function e() {}
            return function(t) {
                if (!jf(t)) return {};
                if (zr) return zr(t);
                e.prototype = t;
                var i = new e;
                return e.prototype = void 0, i
            }
        }();
    Br.exports = Vf
});
var Nr = x((rv, Vr) => {
    function Nf(e, t) {
        return function(i) {
            return e(t(i))
        }
    }
    Vr.exports = Nf
});
var hn = x((av, Hr) => {
    var Hf = Nr(),
        Wf = Hf(Object.getPrototypeOf, Object);
    Hr.exports = Wf
});
var un = x((lv, Wr) => {
    var qf = Object.prototype;

    function $f(e) {
        var t = e && e.constructor,
            i = typeof t == "function" && t.prototype || qf;
        return e === i
    }
    Wr.exports = $f
});
var $r = x((cv, qr) => {
    var Uf = jr(),
        Yf = hn(),
        Xf = un();

    function Kf(e) {
        return typeof e.constructor == "function" && !Xf(e) ? Uf(Yf(e)) : {}
    }
    qr.exports = Kf
});
var Zt = x((hv, Ur) => {
    function Gf(e) {
        return e != null && typeof e == "object"
    }
    Ur.exports = Gf
});
var Xr = x((uv, Yr) => {
    var Zf = ke(),
        Jf = Zt(),
        Qf = "[object Arguments]";

    function tg(e) {
        return Jf(e) && Zf(e) == Qf
    }
    Yr.exports = tg
});
var dn = x((dv, Zr) => {
    var Kr = Xr(),
        eg = Zt(),
        Gr = Object.prototype,
        ig = Gr.hasOwnProperty,
        ng = Gr.propertyIsEnumerable,
        sg = Kr(function() {
            return arguments
        }()) ? Kr : function(e) {
            return eg(e) && ig.call(e, "callee") && !ng.call(e, "callee")
        };
    Zr.exports = sg
});
var fn = x((fv, Jr) => {
    var og = Array.isArray;
    Jr.exports = og
});
var gn = x((gv, Qr) => {
    var rg = 9007199254740991;

    function ag(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= rg
    }
    Qr.exports = ag
});
var li = x((pv, ta) => {
    var lg = oi(),
        cg = gn();

    function hg(e) {
        return e != null && cg(e.length) && !lg(e)
    }
    ta.exports = hg
});
var ia = x((mv, ea) => {
    var ug = li(),
        dg = Zt();

    function fg(e) {
        return dg(e) && ug(e)
    }
    ea.exports = fg
});
var sa = x((bv, na) => {
    function gg() {
        return !1
    }
    na.exports = gg
});
var pn = x((Ae, Jt) => {
    var pg = It(),
        mg = sa(),
        aa = typeof Ae == "object" && Ae && !Ae.nodeType && Ae,
        oa = aa && typeof Jt == "object" && Jt && !Jt.nodeType && Jt,
        bg = oa && oa.exports === aa,
        ra = bg ? pg.Buffer : void 0,
        _g = ra ? ra.isBuffer : void 0,
        xg = _g || mg;
    Jt.exports = xg
});
var ha = x((_v, ca) => {
    var yg = ke(),
        vg = hn(),
        Mg = Zt(),
        Sg = "[object Object]",
        wg = Function.prototype,
        kg = Object.prototype,
        la = wg.toString,
        Pg = kg.hasOwnProperty,
        Og = la.call(Object);

    function Cg(e) {
        if (!Mg(e) || yg(e) != Sg) return !1;
        var t = vg(e);
        if (t === null) return !0;
        var i = Pg.call(t, "constructor") && t.constructor;
        return typeof i == "function" && i instanceof i && la.call(i) == Og
    }
    ca.exports = Cg
});
var da = x((xv, ua) => {
    var Ag = ke(),
        Dg = gn(),
        Tg = Zt(),
        Lg = "[object Arguments]",
        Eg = "[object Array]",
        Rg = "[object Boolean]",
        Ig = "[object Date]",
        Fg = "[object Error]",
        zg = "[object Function]",
        Bg = "[object Map]",
        jg = "[object Number]",
        Vg = "[object Object]",
        Ng = "[object RegExp]",
        Hg = "[object Set]",
        Wg = "[object String]",
        qg = "[object WeakMap]",
        $g = "[object ArrayBuffer]",
        Ug = "[object DataView]",
        Yg = "[object Float32Array]",
        Xg = "[object Float64Array]",
        Kg = "[object Int8Array]",
        Gg = "[object Int16Array]",
        Zg = "[object Int32Array]",
        Jg = "[object Uint8Array]",
        Qg = "[object Uint8ClampedArray]",
        tp = "[object Uint16Array]",
        ep = "[object Uint32Array]",
        j = {};
    j[Yg] = j[Xg] = j[Kg] = j[Gg] = j[Zg] = j[Jg] = j[Qg] = j[tp] = j[ep] = !0;
    j[Lg] = j[Eg] = j[$g] = j[Rg] = j[Ug] = j[Ig] = j[Fg] = j[zg] = j[Bg] = j[jg] = j[Vg] = j[Ng] = j[Hg] = j[Wg] = j[qg] = !1;

    function ip(e) {
        return Tg(e) && Dg(e.length) && !!j[Ag(e)]
    }
    ua.exports = ip
});
var ga = x((yv, fa) => {
    function np(e) {
        return function(t) {
            return e(t)
        }
    }
    fa.exports = np
});
var ma = x((De, Qt) => {
    var sp = sn(),
        pa = typeof De == "object" && De && !De.nodeType && De,
        Te = pa && typeof Qt == "object" && Qt && !Qt.nodeType && Qt,
        op = Te && Te.exports === pa,
        mn = op && sp.process,
        rp = function() {
            try {
                var e = Te && Te.require && Te.require("util").types;
                return e || mn && mn.binding && mn.binding("util")
            } catch {}
        }();
    Qt.exports = rp
});
var bn = x((vv, xa) => {
    var ap = da(),
        lp = ga(),
        ba = ma(),
        _a = ba && ba.isTypedArray,
        cp = _a ? lp(_a) : ap;
    xa.exports = cp
});
var _n = x((Mv, ya) => {
    function hp(e, t) {
        if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__") return e[t]
    }
    ya.exports = hp
});
var Ma = x((Sv, va) => {
    var up = ai(),
        dp = ve(),
        fp = Object.prototype,
        gp = fp.hasOwnProperty;

    function pp(e, t, i) {
        var n = e[t];
        (!(gp.call(e, t) && dp(n, i)) || i === void 0 && !(t in e)) && up(e, t, i)
    }
    va.exports = pp
});
var wa = x((wv, Sa) => {
    var mp = Ma(),
        bp = ai();

    function _p(e, t, i, n) {
        var s = !i;
        i || (i = {});
        for (var o = -1, r = t.length; ++o < r;) {
            var a = t[o],
                l = n ? n(i[a], e[a], a, i, e) : void 0;
            l === void 0 && (l = e[a]), s ? bp(i, a, l) : mp(i, a, l)
        }
        return i
    }
    Sa.exports = _p
});
var Pa = x((kv, ka) => {
    function xp(e, t) {
        for (var i = -1, n = Array(e); ++i < e;) n[i] = t(i);
        return n
    }
    ka.exports = xp
});
var xn = x((Pv, Oa) => {
    var yp = 9007199254740991,
        vp = /^(?:0|[1-9]\d*)$/;

    function Mp(e, t) {
        var i = typeof e;
        return t = t ? ? yp, !!t && (i == "number" || i != "symbol" && vp.test(e)) && e > -1 && e % 1 == 0 && e < t
    }
    Oa.exports = Mp
});
var Aa = x((Ov, Ca) => {
    var Sp = Pa(),
        wp = dn(),
        kp = fn(),
        Pp = pn(),
        Op = xn(),
        Cp = bn(),
        Ap = Object.prototype,
        Dp = Ap.hasOwnProperty;

    function Tp(e, t) {
        var i = kp(e),
            n = !i && wp(e),
            s = !i && !n && Pp(e),
            o = !i && !n && !s && Cp(e),
            r = i || n || s || o,
            a = r ? Sp(e.length, String) : [],
            l = a.length;
        for (var c in e)(t || Dp.call(e, c)) && !(r && (c == "length" || s && (c == "offset" || c == "parent") || o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || Op(c, l))) && a.push(c);
        return a
    }
    Ca.exports = Tp
});
var Ta = x((Cv, Da) => {
    function Lp(e) {
        var t = [];
        if (e != null)
            for (var i in Object(e)) t.push(i);
        return t
    }
    Da.exports = Lp
});
var Ea = x((Av, La) => {
    var Ep = St(),
        Rp = un(),
        Ip = Ta(),
        Fp = Object.prototype,
        zp = Fp.hasOwnProperty;

    function Bp(e) {
        if (!Ep(e)) return Ip(e);
        var t = Rp(e),
            i = [];
        for (var n in e) n == "constructor" && (t || !zp.call(e, n)) || i.push(n);
        return i
    }
    La.exports = Bp
});
var yn = x((Dv, Ra) => {
    var jp = Aa(),
        Vp = Ea(),
        Np = li();

    function Hp(e) {
        return Np(e) ? jp(e, !0) : Vp(e)
    }
    Ra.exports = Hp
});
var Fa = x((Tv, Ia) => {
    var Wp = wa(),
        qp = yn();

    function $p(e) {
        return Wp(e, qp(e))
    }
    Ia.exports = $p
});
var Ha = x((Lv, Na) => {
    var za = cn(),
        Up = Or(),
        Yp = Rr(),
        Xp = Fr(),
        Kp = $r(),
        Ba = dn(),
        ja = fn(),
        Gp = ia(),
        Zp = pn(),
        Jp = oi(),
        Qp = St(),
        tm = ha(),
        em = bn(),
        Va = _n(),
        im = Fa();

    function nm(e, t, i, n, s, o, r) {
        var a = Va(e, i),
            l = Va(t, i),
            c = r.get(l);
        if (c) {
            za(e, i, c);
            return
        }
        var h = o ? o(a, l, i + "", e, t, r) : void 0,
            u = h === void 0;
        if (u) {
            var d = ja(l),
                f = !d && Zp(l),
                g = !d && !f && em(l);
            h = l, d || f || g ? ja(a) ? h = a : Gp(a) ? h = Xp(a) : f ? (u = !1, h = Up(l, !0)) : g ? (u = !1, h = Yp(l, !0)) : h = [] : tm(l) || Ba(l) ? (h = a, Ba(a) ? h = im(a) : (!Qp(a) || Jp(a)) && (h = Kp(l))) : u = !1
        }
        u && (r.set(l, h), s(h, l, n, o, r), r.delete(l)), za(e, i, h)
    }
    Na.exports = nm
});
var $a = x((Ev, qa) => {
    var sm = gr(),
        om = cn(),
        rm = Mr(),
        am = Ha(),
        lm = St(),
        cm = yn(),
        hm = _n();

    function Wa(e, t, i, n, s) {
        e !== t && rm(t, function(o, r) {
            if (s || (s = new sm), lm(o)) am(e, t, r, i, Wa, n, s);
            else {
                var a = n ? n(hm(e, r), o, r + "", e, t, s) : void 0;
                a === void 0 && (a = o), om(e, r, a)
            }
        }, cm)
    }
    qa.exports = Wa
});
var vn = x((Rv, Ua) => {
    function um(e) {
        return e
    }
    Ua.exports = um
});
var Xa = x((Iv, Ya) => {
    function dm(e, t, i) {
        switch (i.length) {
            case 0:
                return e.call(t);
            case 1:
                return e.call(t, i[0]);
            case 2:
                return e.call(t, i[0], i[1]);
            case 3:
                return e.call(t, i[0], i[1], i[2])
        }
        return e.apply(t, i)
    }
    Ya.exports = dm
});
var Za = x((Fv, Ga) => {
    var fm = Xa(),
        Ka = Math.max;

    function gm(e, t, i) {
        return t = Ka(t === void 0 ? e.length - 1 : t, 0),
            function() {
                for (var n = arguments, s = -1, o = Ka(n.length - t, 0), r = Array(o); ++s < o;) r[s] = n[t + s];
                s = -1;
                for (var a = Array(t + 1); ++s < t;) a[s] = n[s];
                return a[t] = i(r), fm(e, this, a)
            }
    }
    Ga.exports = gm
});
var Qa = x((zv, Ja) => {
    function pm(e) {
        return function() {
            return e
        }
    }
    Ja.exports = pm
});
var il = x((Bv, el) => {
    var mm = Qa(),
        tl = ln(),
        bm = vn(),
        _m = tl ? function(e, t) {
            return tl(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: mm(t),
                writable: !0
            })
        } : bm;
    el.exports = _m
});
var sl = x((jv, nl) => {
    var xm = 800,
        ym = 16,
        vm = Date.now;

    function Mm(e) {
        var t = 0,
            i = 0;
        return function() {
            var n = vm(),
                s = ym - (n - i);
            if (i = n, s > 0) {
                if (++t >= xm) return arguments[0]
            } else t = 0;
            return e.apply(void 0, arguments)
        }
    }
    nl.exports = Mm
});
var rl = x((Vv, ol) => {
    var Sm = il(),
        wm = sl(),
        km = wm(Sm);
    ol.exports = km
});
var ll = x((Nv, al) => {
    var Pm = vn(),
        Om = Za(),
        Cm = rl();

    function Am(e, t) {
        return Cm(Om(e, t, Pm), e + "")
    }
    al.exports = Am
});
var hl = x((Hv, cl) => {
    var Dm = ve(),
        Tm = li(),
        Lm = xn(),
        Em = St();

    function Rm(e, t, i) {
        if (!Em(i)) return !1;
        var n = typeof t;
        return (n == "number" ? Tm(i) && Lm(t, i.length) : n == "string" && t in i) ? Dm(i[t], e) : !1
    }
    cl.exports = Rm
});
var dl = x((Wv, ul) => {
    var Im = ll(),
        Fm = hl();

    function zm(e) {
        return Im(function(t, i) {
            var n = -1,
                s = i.length,
                o = s > 1 ? i[s - 1] : void 0,
                r = s > 2 ? i[2] : void 0;
            for (o = e.length > 3 && typeof o == "function" ? (s--, o) : void 0, r && Fm(i[0], i[1], r) && (o = s < 3 ? void 0 : o, s = 1), t = Object(t); ++n < s;) {
                var a = i[n];
                a && e(t, a, n, o)
            }
            return t
        })
    }
    ul.exports = zm
});
var Nm = x((qv, fl) => {
    var Bm = $a(),
        jm = dl(),
        Vm = jm(function(e, t, i) {
            Bm(e, t, i)
        });
    fl.exports = Vm
});

function Re(e) {
    return e + .5 | 0
}
var wt = (e, t, i) => Math.max(Math.min(e, i), t);

function Le(e) {
    return wt(Re(e * 2.55), 0, 255)
}

function kt(e) {
    return wt(Re(e * 255), 0, 255)
}

function mt(e) {
    return wt(Re(e / 2.55) / 100, 0, 1)
}

function gl(e) {
    return wt(Re(e * 100), 0, 100)
}
var ot = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        A: 10,
        B: 11,
        C: 12,
        D: 13,
        E: 14,
        F: 15,
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    },
    Sn = [..."0123456789ABCDEF"],
    Hm = e => Sn[e & 15],
    Wm = e => Sn[(e & 240) >> 4] + Sn[e & 15],
    ci = e => (e & 240) >> 4 === (e & 15),
    qm = e => ci(e.r) && ci(e.g) && ci(e.b) && ci(e.a);

function $m(e) {
    var t = e.length,
        i;
    return e[0] === "#" && (t === 4 || t === 5 ? i = {
        r: 255 & ot[e[1]] * 17,
        g: 255 & ot[e[2]] * 17,
        b: 255 & ot[e[3]] * 17,
        a: t === 5 ? ot[e[4]] * 17 : 255
    } : (t === 7 || t === 9) && (i = {
        r: ot[e[1]] << 4 | ot[e[2]],
        g: ot[e[3]] << 4 | ot[e[4]],
        b: ot[e[5]] << 4 | ot[e[6]],
        a: t === 9 ? ot[e[7]] << 4 | ot[e[8]] : 255
    })), i
}
var Um = (e, t) => e < 255 ? t(e) : "";

function Ym(e) {
    var t = qm(e) ? Hm : Wm;
    return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Um(e.a, t) : void 0
}
var Xm = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;

function _l(e, t, i) {
    let n = t * Math.min(i, 1 - i),
        s = (o, r = (o + e / 30) % 12) => i - n * Math.max(Math.min(r - 3, 9 - r, 1), -1);
    return [s(0), s(8), s(4)]
}

function Km(e, t, i) {
    let n = (s, o = (s + e / 60) % 6) => i - i * t * Math.max(Math.min(o, 4 - o, 1), 0);
    return [n(5), n(3), n(1)]
}

function Gm(e, t, i) {
    let n = _l(e, 1, .5),
        s;
    for (t + i > 1 && (s = 1 / (t + i), t *= s, i *= s), s = 0; s < 3; s++) n[s] *= 1 - t - i, n[s] += t;
    return n
}

function Zm(e, t, i, n, s) {
    return e === s ? (t - i) / n + (t < i ? 6 : 0) : t === s ? (i - e) / n + 2 : (e - t) / n + 4
}

function wn(e) {
    let i = e.r / 255,
        n = e.g / 255,
        s = e.b / 255,
        o = Math.max(i, n, s),
        r = Math.min(i, n, s),
        a = (o + r) / 2,
        l, c, h;
    return o !== r && (h = o - r, c = a > .5 ? h / (2 - o - r) : h / (o + r), l = Zm(i, n, s, h, o), l = l * 60 + .5), [l | 0, c || 0, a]
}

function kn(e, t, i, n) {
    return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, i, n)).map(kt)
}

function Pn(e, t, i) {
    return kn(_l, e, t, i)
}

function Jm(e, t, i) {
    return kn(Gm, e, t, i)
}

function Qm(e, t, i) {
    return kn(Km, e, t, i)
}

function xl(e) {
    return (e % 360 + 360) % 360
}

function tb(e) {
    let t = Xm.exec(e),
        i = 255,
        n;
    if (!t) return;
    t[5] !== n && (i = t[6] ? Le(+t[5]) : kt(+t[5]));
    let s = xl(+t[2]),
        o = +t[3] / 100,
        r = +t[4] / 100;
    return t[1] === "hwb" ? n = Jm(s, o, r) : t[1] === "hsv" ? n = Qm(s, o, r) : n = Pn(s, o, r), {
        r: n[0],
        g: n[1],
        b: n[2],
        a: i
    }
}

function eb(e, t) {
    var i = wn(e);
    i[0] = xl(i[0] + t), i = Pn(i), e.r = i[0], e.g = i[1], e.b = i[2]
}

function ib(e) {
    if (!e) return;
    let t = wn(e),
        i = t[0],
        n = gl(t[1]),
        s = gl(t[2]);
    return e.a < 255 ? `hsla(${i}, ${n}%, ${s}%, ${mt(e.a)})` : `hsl(${i}, ${n}%, ${s}%)`
}
var pl = {
        x: "dark",
        Z: "light",
        Y: "re",
        X: "blu",
        W: "gr",
        V: "medium",
        U: "slate",
        A: "ee",
        T: "ol",
        S: "or",
        B: "ra",
        C: "lateg",
        D: "ights",
        R: "in",
        Q: "turquois",
        E: "hi",
        P: "ro",
        O: "al",
        N: "le",
        M: "de",
        L: "yello",
        F: "en",
        K: "ch",
        G: "arks",
        H: "ea",
        I: "ightg",
        J: "wh"
    },
    ml = {
        OiceXe: "f0f8ff",
        antiquewEte: "faebd7",
        aqua: "ffff",
        aquamarRe: "7fffd4",
        azuY: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "0",
        blanKedOmond: "ffebcd",
        Xe: "ff",
        XeviTet: "8a2be2",
        bPwn: "a52a2a",
        burlywood: "deb887",
        caMtXe: "5f9ea0",
        KartYuse: "7fff00",
        KocTate: "d2691e",
        cSO: "ff7f50",
        cSnflowerXe: "6495ed",
        cSnsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "ffff",
        xXe: "8b",
        xcyan: "8b8b",
        xgTMnPd: "b8860b",
        xWay: "a9a9a9",
        xgYF: "6400",
        xgYy: "a9a9a9",
        xkhaki: "bdb76b",
        xmagFta: "8b008b",
        xTivegYF: "556b2f",
        xSange: "ff8c00",
        xScEd: "9932cc",
        xYd: "8b0000",
        xsOmon: "e9967a",
        xsHgYF: "8fbc8f",
        xUXe: "483d8b",
        xUWay: "2f4f4f",
        xUgYy: "2f4f4f",
        xQe: "ced1",
        xviTet: "9400d3",
        dAppRk: "ff1493",
        dApskyXe: "bfff",
        dimWay: "696969",
        dimgYy: "696969",
        dodgerXe: "1e90ff",
        fiYbrick: "b22222",
        flSOwEte: "fffaf0",
        foYstWAn: "228b22",
        fuKsia: "ff00ff",
        gaRsbSo: "dcdcdc",
        ghostwEte: "f8f8ff",
        gTd: "ffd700",
        gTMnPd: "daa520",
        Way: "808080",
        gYF: "8000",
        gYFLw: "adff2f",
        gYy: "808080",
        honeyMw: "f0fff0",
        hotpRk: "ff69b4",
        RdianYd: "cd5c5c",
        Rdigo: "4b0082",
        ivSy: "fffff0",
        khaki: "f0e68c",
        lavFMr: "e6e6fa",
        lavFMrXsh: "fff0f5",
        lawngYF: "7cfc00",
        NmoncEffon: "fffacd",
        ZXe: "add8e6",
        ZcSO: "f08080",
        Zcyan: "e0ffff",
        ZgTMnPdLw: "fafad2",
        ZWay: "d3d3d3",
        ZgYF: "90ee90",
        ZgYy: "d3d3d3",
        ZpRk: "ffb6c1",
        ZsOmon: "ffa07a",
        ZsHgYF: "20b2aa",
        ZskyXe: "87cefa",
        ZUWay: "778899",
        ZUgYy: "778899",
        ZstAlXe: "b0c4de",
        ZLw: "ffffe0",
        lime: "ff00",
        limegYF: "32cd32",
        lRF: "faf0e6",
        magFta: "ff00ff",
        maPon: "800000",
        VaquamarRe: "66cdaa",
        VXe: "cd",
        VScEd: "ba55d3",
        VpurpN: "9370db",
        VsHgYF: "3cb371",
        VUXe: "7b68ee",
        VsprRggYF: "fa9a",
        VQe: "48d1cc",
        VviTetYd: "c71585",
        midnightXe: "191970",
        mRtcYam: "f5fffa",
        mistyPse: "ffe4e1",
        moccasR: "ffe4b5",
        navajowEte: "ffdead",
        navy: "80",
        Tdlace: "fdf5e6",
        Tive: "808000",
        TivedBb: "6b8e23",
        Sange: "ffa500",
        SangeYd: "ff4500",
        ScEd: "da70d6",
        pOegTMnPd: "eee8aa",
        pOegYF: "98fb98",
        pOeQe: "afeeee",
        pOeviTetYd: "db7093",
        papayawEp: "ffefd5",
        pHKpuff: "ffdab9",
        peru: "cd853f",
        pRk: "ffc0cb",
        plum: "dda0dd",
        powMrXe: "b0e0e6",
        purpN: "800080",
        YbeccapurpN: "663399",
        Yd: "ff0000",
        Psybrown: "bc8f8f",
        PyOXe: "4169e1",
        saddNbPwn: "8b4513",
        sOmon: "fa8072",
        sandybPwn: "f4a460",
        sHgYF: "2e8b57",
        sHshell: "fff5ee",
        siFna: "a0522d",
        silver: "c0c0c0",
        skyXe: "87ceeb",
        UXe: "6a5acd",
        UWay: "708090",
        UgYy: "708090",
        snow: "fffafa",
        sprRggYF: "ff7f",
        stAlXe: "4682b4",
        tan: "d2b48c",
        teO: "8080",
        tEstN: "d8bfd8",
        tomato: "ff6347",
        Qe: "40e0d0",
        viTet: "ee82ee",
        JHt: "f5deb3",
        wEte: "ffffff",
        wEtesmoke: "f5f5f5",
        Lw: "ffff00",
        LwgYF: "9acd32"
    };

function nb() {
    let e = {},
        t = Object.keys(ml),
        i = Object.keys(pl),
        n, s, o, r, a;
    for (n = 0; n < t.length; n++) {
        for (r = a = t[n], s = 0; s < i.length; s++) o = i[s], a = a.replace(o, pl[o]);
        o = parseInt(ml[r], 16), e[a] = [o >> 16 & 255, o >> 8 & 255, o & 255]
    }
    return e
}
var hi;

function sb(e) {
    hi || (hi = nb(), hi.transparent = [0, 0, 0, 0]);
    let t = hi[e.toLowerCase()];
    return t && {
        r: t[0],
        g: t[1],
        b: t[2],
        a: t.length === 4 ? t[3] : 255
    }
}
var ob = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;

function rb(e) {
    let t = ob.exec(e),
        i = 255,
        n, s, o;
    if (t) {
        if (t[7] !== n) {
            let r = +t[7];
            i = t[8] ? Le(r) : wt(r * 255, 0, 255)
        }
        return n = +t[1], s = +t[3], o = +t[5], n = 255 & (t[2] ? Le(n) : wt(n, 0, 255)), s = 255 & (t[4] ? Le(s) : wt(s, 0, 255)), o = 255 & (t[6] ? Le(o) : wt(o, 0, 255)), {
            r: n,
            g: s,
            b: o,
            a: i
        }
    }
}

function ab(e) {
    return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${mt(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`)
}
var Mn = e => e <= .0031308 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - .055,
    te = e => e <= .04045 ? e / 12.92 : Math.pow((e + .055) / 1.055, 2.4);

function lb(e, t, i) {
    let n = te(mt(e.r)),
        s = te(mt(e.g)),
        o = te(mt(e.b));
    return {
        r: kt(Mn(n + i * (te(mt(t.r)) - n))),
        g: kt(Mn(s + i * (te(mt(t.g)) - s))),
        b: kt(Mn(o + i * (te(mt(t.b)) - o))),
        a: e.a + i * (t.a - e.a)
    }
}

function ui(e, t, i) {
    if (e) {
        let n = wn(e);
        n[t] = Math.max(0, Math.min(n[t] + n[t] * i, t === 0 ? 360 : 1)), n = Pn(n), e.r = n[0], e.g = n[1], e.b = n[2]
    }
}

function yl(e, t) {
    return e && Object.assign(t || {}, e)
}

function bl(e) {
    var t = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    };
    return Array.isArray(e) ? e.length >= 3 && (t = {
        r: e[0],
        g: e[1],
        b: e[2],
        a: 255
    }, e.length > 3 && (t.a = kt(e[3]))) : (t = yl(e, {
        r: 0,
        g: 0,
        b: 0,
        a: 1
    }), t.a = kt(t.a)), t
}

function cb(e) {
    return e.charAt(0) === "r" ? rb(e) : tb(e)
}
var Ee = class e {
    constructor(t) {
        if (t instanceof e) return t;
        let i = typeof t,
            n;
        i === "object" ? n = bl(t) : i === "string" && (n = $m(t) || sb(t) || cb(t)), this._rgb = n, this._valid = !!n
    }
    get valid() {
        return this._valid
    }
    get rgb() {
        var t = yl(this._rgb);
        return t && (t.a = mt(t.a)), t
    }
    set rgb(t) {
        this._rgb = bl(t)
    }
    rgbString() {
        return this._valid ? ab(this._rgb) : void 0
    }
    hexString() {
        return this._valid ? Ym(this._rgb) : void 0
    }
    hslString() {
        return this._valid ? ib(this._rgb) : void 0
    }
    mix(t, i) {
        if (t) {
            let n = this.rgb,
                s = t.rgb,
                o, r = i === o ? .5 : i,
                a = 2 * r - 1,
                l = n.a - s.a,
                c = ((a * l === -1 ? a : (a + l) / (1 + a * l)) + 1) / 2;
            o = 1 - c, n.r = 255 & c * n.r + o * s.r + .5, n.g = 255 & c * n.g + o * s.g + .5, n.b = 255 & c * n.b + o * s.b + .5, n.a = r * n.a + (1 - r) * s.a, this.rgb = n
        }
        return this
    }
    interpolate(t, i) {
        return t && (this._rgb = lb(this._rgb, t._rgb, i)), this
    }
    clone() {
        return new e(this.rgb)
    }
    alpha(t) {
        return this._rgb.a = kt(t), this
    }
    clearer(t) {
        let i = this._rgb;
        return i.a *= 1 - t, this
    }
    greyscale() {
        let t = this._rgb,
            i = Re(t.r * .3 + t.g * .59 + t.b * .11);
        return t.r = t.g = t.b = i, this
    }
    opaquer(t) {
        let i = this._rgb;
        return i.a *= 1 + t, this
    }
    negate() {
        let t = this._rgb;
        return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this
    }
    lighten(t) {
        return ui(this._rgb, 2, t), this
    }
    darken(t) {
        return ui(this._rgb, 2, -t), this
    }
    saturate(t) {
        return ui(this._rgb, 1, t), this
    }
    desaturate(t) {
        return ui(this._rgb, 1, -t), this
    }
    rotate(t) {
        return eb(this._rgb, t), this
    }
};

function dt() {}
var Tl = (() => {
    let e = 0;
    return () => e++
})();

function E(e) {
    return e === null || typeof e > "u"
}

function z(e) {
    if (Array.isArray && Array.isArray(e)) return !0;
    let t = Object.prototype.toString.call(e);
    return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]"
}

function D(e) {
    return e !== null && Object.prototype.toString.call(e) === "[object Object]"
}

function W(e) {
    return (typeof e == "number" || e instanceof Number) && isFinite(+e)
}

function et(e, t) {
    return W(e) ? e : t
}

function O(e, t) {
    return typeof e > "u" ? t : e
}
var Ll = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t,
    Dn = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;

function F(e, t, i) {
    if (e && typeof e.call == "function") return e.apply(i, t)
}

function R(e, t, i, n) {
    let s, o, r;
    if (z(e))
        if (o = e.length, n)
            for (s = o - 1; s >= 0; s--) t.call(i, e[s], s);
        else
            for (s = 0; s < o; s++) t.call(i, e[s], s);
    else if (D(e))
        for (r = Object.keys(e), o = r.length, s = 0; s < o; s++) t.call(i, e[r[s]], r[s])
}

function ze(e, t) {
    let i, n, s, o;
    if (!e || !t || e.length !== t.length) return !1;
    for (i = 0, n = e.length; i < n; ++i)
        if (s = e[i], o = t[i], s.datasetIndex !== o.datasetIndex || s.index !== o.index) return !1;
    return !0
}

function pi(e) {
    if (z(e)) return e.map(pi);
    if (D(e)) {
        let t = Object.create(null),
            i = Object.keys(e),
            n = i.length,
            s = 0;
        for (; s < n; ++s) t[i[s]] = pi(e[i[s]]);
        return t
    }
    return e
}

function El(e) {
    return ["__proto__", "prototype", "constructor"].indexOf(e) === -1
}

function hb(e, t, i, n) {
    if (!El(e)) return;
    let s = t[e],
        o = i[e];
    D(s) && D(o) ? ie(s, o, n) : t[e] = pi(o)
}

function ie(e, t, i) {
    let n = z(t) ? t : [t],
        s = n.length;
    if (!D(e)) return e;
    i = i || {};
    let o = i.merger || hb,
        r;
    for (let a = 0; a < s; ++a) {
        if (r = n[a], !D(r)) continue;
        let l = Object.keys(r);
        for (let c = 0, h = l.length; c < h; ++c) o(l[c], e, r, i)
    }
    return e
}

function se(e, t) {
    return ie(e, t, {
        merger: ub
    })
}

function ub(e, t, i) {
    if (!El(e)) return;
    let n = t[e],
        s = i[e];
    D(n) && D(s) ? se(n, s) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = pi(s))
}
var vl = {
    "": e => e,
    x: e => e.x,
    y: e => e.y
};

function db(e) {
    let t = e.split("."),
        i = [],
        n = "";
    for (let s of t) n += s, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (i.push(n), n = "");
    return i
}

function fb(e) {
    let t = db(e);
    return i => {
        for (let n of t) {
            if (n === "") break;
            i = i && i[n]
        }
        return i
    }
}

function xt(e, t) {
    return (vl[t] || (vl[t] = fb(t)))(e)
}

function xi(e) {
    return e.charAt(0).toUpperCase() + e.slice(1)
}
var oe = e => typeof e < "u",
    bt = e => typeof e == "function",
    Tn = (e, t) => {
        if (e.size !== t.size) return !1;
        for (let i of e)
            if (!t.has(i)) return !1;
        return !0
    };

function Rl(e) {
    return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu"
}
var V = Math.PI,
    B = 2 * V,
    gb = B + V,
    mi = Number.POSITIVE_INFINITY,
    pb = V / 180,
    H = V / 2,
    Ft = V / 4,
    Ml = V * 2 / 3,
    _t = Math.log10,
    ct = Math.sign;

function re(e, t, i) {
    return Math.abs(e - t) < i
}

function Ln(e) {
    let t = Math.round(e);
    e = re(e, t, e / 1e3) ? t : e;
    let i = Math.pow(10, Math.floor(_t(e))),
        n = e / i;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * i
}

function Il(e) {
    let t = [],
        i = Math.sqrt(e),
        n;
    for (n = 1; n < i; n++) e % n === 0 && (t.push(n), t.push(e / n));
    return i === (i | 0) && t.push(i), t.sort((s, o) => s - o).pop(), t
}

function ae(e) {
    return !isNaN(parseFloat(e)) && isFinite(e)
}

function Fl(e, t) {
    let i = Math.round(e);
    return i - t <= e && i + t >= e
}

function En(e, t, i) {
    let n, s, o;
    for (n = 0, s = e.length; n < s; n++) o = e[n][i], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o))
}

function rt(e) {
    return e * (V / 180)
}

function yi(e) {
    return e * (180 / V)
}

function Rn(e) {
    if (!W(e)) return;
    let t = 1,
        i = 0;
    for (; Math.round(e * t) / t !== e;) t *= 10, i++;
    return i
}

function In(e, t) {
    let i = t.x - e.x,
        n = t.y - e.y,
        s = Math.sqrt(i * i + n * n),
        o = Math.atan2(n, i);
    return o < -.5 * V && (o += B), {
        angle: o,
        distance: s
    }
}

function bi(e, t) {
    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
}

function mb(e, t) {
    return (e - t + gb) % B - V
}

function tt(e) {
    return (e % B + B) % B
}

function le(e, t, i, n) {
    let s = tt(e),
        o = tt(t),
        r = tt(i),
        a = tt(o - s),
        l = tt(r - s),
        c = tt(s - o),
        h = tt(s - r);
    return s === o || s === r || n && o === r || a > l && c < h
}

function X(e, t, i) {
    return Math.max(t, Math.min(i, e))
}

function zl(e) {
    return X(e, -32768, 32767)
}

function ft(e, t, i, n = 1e-6) {
    return e >= Math.min(t, i) - n && e <= Math.max(t, i) + n
}

function vi(e, t, i) {
    i = i || (r => e[r] < t);
    let n = e.length - 1,
        s = 0,
        o;
    for (; n - s > 1;) o = s + n >> 1, i(o) ? s = o : n = o;
    return {
        lo: s,
        hi: n
    }
}
var Ot = (e, t, i, n) => vi(e, i, n ? s => {
        let o = e[s][t];
        return o < i || o === i && e[s + 1][t] === i
    } : s => e[s][t] < i),
    Bl = (e, t, i) => vi(e, i, n => e[n][t] >= i);

function jl(e, t, i) {
    let n = 0,
        s = e.length;
    for (; n < s && e[n] < t;) n++;
    for (; s > n && e[s - 1] > i;) s--;
    return n > 0 || s < e.length ? e.slice(n, s) : e
}
var Vl = ["push", "pop", "shift", "splice", "unshift"];

function Nl(e, t) {
    if (e._chartjs) {
        e._chartjs.listeners.push(t);
        return
    }
    Object.defineProperty(e, "_chartjs", {
        configurable: !0,
        enumerable: !1,
        value: {
            listeners: [t]
        }
    }), Vl.forEach(i => {
        let n = "_onData" + xi(i),
            s = e[i];
        Object.defineProperty(e, i, {
            configurable: !0,
            enumerable: !1,
            value(...o) {
                let r = s.apply(this, o);
                return e._chartjs.listeners.forEach(a => {
                    typeof a[n] == "function" && a[n](...o)
                }), r
            }
        })
    })
}

function Fn(e, t) {
    let i = e._chartjs;
    if (!i) return;
    let n = i.listeners,
        s = n.indexOf(t);
    s !== -1 && n.splice(s, 1), !(n.length > 0) && (Vl.forEach(o => {
        delete e[o]
    }), delete e._chartjs)
}

function zn(e) {
    let t = new Set(e);
    return t.size === e.length ? e : Array.from(t)
}
var Bn = function() {
    return typeof window > "u" ? function(e) {
        return e()
    } : window.requestAnimationFrame
}();

function jn(e, t) {
    let i = [],
        n = !1;
    return function(...s) {
        i = s, n || (n = !0, Bn.call(window, () => {
            n = !1, e.apply(t, i)
        }))
    }
}

function Hl(e, t) {
    let i;
    return function(...n) {
        return t ? (clearTimeout(i), i = setTimeout(e, t, n)) : e.apply(this, n), t
    }
}
var Mi = e => e === "start" ? "left" : e === "end" ? "right" : "center",
    K = (e, t, i) => e === "start" ? t : e === "end" ? i : (t + i) / 2,
    Wl = (e, t, i, n) => e === (n ? "left" : "right") ? i : e === "center" ? (t + i) / 2 : t;

function ql(e, t, i) {
    let n = t.length,
        s = 0,
        o = n;
    if (e._sorted) {
        let {
            iScale: r,
            _parsed: a
        } = e, l = r.axis, {
            min: c,
            max: h,
            minDefined: u,
            maxDefined: d
        } = r.getUserBounds();
        u && (s = X(Math.min(Ot(a, l, c).lo, i ? n : Ot(t, l, r.getPixelForValue(c)).lo), 0, n - 1)), d ? o = X(Math.max(Ot(a, r.axis, h, !0).hi + 1, i ? 0 : Ot(t, l, r.getPixelForValue(h), !0).hi + 1), s, n) - s : o = n - s
    }
    return {
        start: s,
        count: o
    }
}

function $l(e) {
    let {
        xScale: t,
        yScale: i,
        _scaleRanges: n
    } = e, s = {
        xmin: t.min,
        xmax: t.max,
        ymin: i.min,
        ymax: i.max
    };
    if (!n) return e._scaleRanges = s, !0;
    let o = n.xmin !== t.min || n.xmax !== t.max || n.ymin !== i.min || n.ymax !== i.max;
    return Object.assign(n, s), o
}
var di = e => e === 0 || e === 1,
    Sl = (e, t, i) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * B / i)),
    wl = (e, t, i) => Math.pow(2, -10 * e) * Math.sin((e - t) * B / i) + 1,
    ee = {
        linear: e => e,
        easeInQuad: e => e * e,
        easeOutQuad: e => -e * (e - 2),
        easeInOutQuad: e => (e /= .5) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1),
        easeInCubic: e => e * e * e,
        easeOutCubic: e => (e -= 1) * e * e + 1,
        easeInOutCubic: e => (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2),
        easeInQuart: e => e * e * e * e,
        easeOutQuart: e => -((e -= 1) * e * e * e - 1),
        easeInOutQuart: e => (e /= .5) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2),
        easeInQuint: e => e * e * e * e * e,
        easeOutQuint: e => (e -= 1) * e * e * e * e + 1,
        easeInOutQuint: e => (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2),
        easeInSine: e => -Math.cos(e * H) + 1,
        easeOutSine: e => Math.sin(e * H),
        easeInOutSine: e => -.5 * (Math.cos(V * e) - 1),
        easeInExpo: e => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
        easeOutExpo: e => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
        easeInOutExpo: e => di(e) ? e : e < .5 ? .5 * Math.pow(2, 10 * (e * 2 - 1)) : .5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
        easeInCirc: e => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
        easeOutCirc: e => Math.sqrt(1 - (e -= 1) * e),
        easeInOutCirc: e => (e /= .5) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
        easeInElastic: e => di(e) ? e : Sl(e, .075, .3),
        easeOutElastic: e => di(e) ? e : wl(e, .075, .3),
        easeInOutElastic(e) {
            return di(e) ? e : e < .5 ? .5 * Sl(e * 2, .1125, .45) : .5 + .5 * wl(e * 2 - 1, .1125, .45)
        },
        easeInBack(e) {
            return e * e * ((1.70158 + 1) * e - 1.70158)
        },
        easeOutBack(e) {
            return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1
        },
        easeInOutBack(e) {
            let t = 1.70158;
            return (e /= .5) < 1 ? .5 * (e * e * (((t *= 1.525) + 1) * e - t)) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
        },
        easeInBounce: e => 1 - ee.easeOutBounce(1 - e),
        easeOutBounce(e) {
            return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        },
        easeInOutBounce: e => e < .5 ? ee.easeInBounce(e * 2) * .5 : ee.easeOutBounce(e * 2 - 1) * .5 + .5
    };

function Vn(e) {
    if (e && typeof e == "object") {
        let t = e.toString();
        return t === "[object CanvasPattern]" || t === "[object CanvasGradient]"
    }
    return !1
}

function Nn(e) {
    return Vn(e) ? e : new Ee(e)
}

function On(e) {
    return Vn(e) ? e : new Ee(e).saturate(.5).darken(.1).hexString()
}
var bb = ["x", "y", "borderWidth", "radius", "tension"],
    _b = ["color", "borderColor", "backgroundColor"];

function xb(e) {
    e.set("animation", {
        delay: void 0,
        duration: 1e3,
        easing: "easeOutQuart",
        fn: void 0,
        from: void 0,
        loop: void 0,
        to: void 0,
        type: void 0
    }), e.describe("animation", {
        _fallback: !1,
        _indexable: !1,
        _scriptable: t => t !== "onProgress" && t !== "onComplete" && t !== "fn"
    }), e.set("animations", {
        colors: {
            type: "color",
            properties: _b
        },
        numbers: {
            type: "number",
            properties: bb
        }
    }), e.describe("animations", {
        _fallback: "animation"
    }), e.set("transitions", {
        active: {
            animation: {
                duration: 400
            }
        },
        resize: {
            animation: {
                duration: 0
            }
        },
        show: {
            animations: {
                colors: {
                    from: "transparent"
                },
                visible: {
                    type: "boolean",
                    duration: 0
                }
            }
        },
        hide: {
            animations: {
                colors: {
                    to: "transparent"
                },
                visible: {
                    type: "boolean",
                    easing: "linear",
                    fn: t => t | 0
                }
            }
        }
    })
}

function yb(e) {
    e.set("layout", {
        autoPadding: !0,
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    })
}
var kl = new Map;

function vb(e, t) {
    t = t || {};
    let i = e + JSON.stringify(t),
        n = kl.get(i);
    return n || (n = new Intl.NumberFormat(e, t), kl.set(i, n)), n
}

function ce(e, t, i) {
    return vb(t, i).format(e)
}
var Ul = {
    values(e) {
        return z(e) ? e : "" + e
    },
    numeric(e, t, i) {
        if (e === 0) return "0";
        let n = this.chart.options.locale,
            s, o = e;
        if (i.length > 1) {
            let c = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
            (c < 1e-4 || c > 1e15) && (s = "scientific"), o = Mb(e, i)
        }
        let r = _t(Math.abs(o)),
            a = isNaN(r) ? 1 : Math.max(Math.min(-1 * Math.floor(r), 20), 0),
            l = {
                notation: s,
                minimumFractionDigits: a,
                maximumFractionDigits: a
            };
        return Object.assign(l, this.options.ticks.format), ce(e, n, l)
    },
    logarithmic(e, t, i) {
        if (e === 0) return "0";
        let n = i[t].significand || e / Math.pow(10, Math.floor(_t(e)));
        return [1, 2, 3, 5, 10, 15].includes(n) || t > .8 * i.length ? Ul.numeric.call(this, e, t, i) : ""
    }
};

function Mb(e, t) {
    let i = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
    return Math.abs(i) >= 1 && e !== Math.floor(e) && (i = e - Math.floor(e)), i
}
var Be = {
    formatters: Ul
};

function Sb(e) {
    e.set("scale", {
        display: !0,
        offset: !1,
        reverse: !1,
        beginAtZero: !1,
        bounds: "ticks",
        grace: 0,
        grid: {
            display: !0,
            lineWidth: 1,
            drawOnChartArea: !0,
            drawTicks: !0,
            tickLength: 8,
            tickWidth: (t, i) => i.lineWidth,
            tickColor: (t, i) => i.color,
            offset: !1
        },
        border: {
            display: !0,
            dash: [],
            dashOffset: 0,
            width: 1
        },
        title: {
            display: !1,
            text: "",
            padding: {
                top: 4,
                bottom: 4
            }
        },
        ticks: {
            minRotation: 0,
            maxRotation: 50,
            mirror: !1,
            textStrokeWidth: 0,
            textStrokeColor: "",
            padding: 3,
            display: !0,
            autoSkip: !0,
            autoSkipPadding: 3,
            labelOffset: 0,
            callback: Be.formatters.values,
            minor: {},
            major: {},
            align: "center",
            crossAlign: "near",
            showLabelBackdrop: !1,
            backdropColor: "rgba(255, 255, 255, 0.75)",
            backdropPadding: 2
        }
    }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
        _fallback: !1,
        _scriptable: t => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
        _indexable: t => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
    }), e.describe("scales", {
        _fallback: "scale"
    }), e.describe("scale.ticks", {
        _scriptable: t => t !== "backdropPadding" && t !== "callback",
        _indexable: t => t !== "backdropPadding"
    })
}
var Ct = Object.create(null),
    Si = Object.create(null);

function Ie(e, t) {
    if (!t) return e;
    let i = t.split(".");
    for (let n = 0, s = i.length; n < s; ++n) {
        let o = i[n];
        e = e[o] || (e[o] = Object.create(null))
    }
    return e
}

function Cn(e, t, i) {
    return typeof t == "string" ? ie(Ie(e, t), i) : ie(Ie(e, ""), t)
}
var An = class {
        constructor(t, i) {
            this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = n => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = {
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                size: 12,
                style: "normal",
                lineHeight: 1.2,
                weight: null
            }, this.hover = {}, this.hoverBackgroundColor = (n, s) => On(s.backgroundColor), this.hoverBorderColor = (n, s) => On(s.borderColor), this.hoverColor = (n, s) => On(s.color), this.indexAxis = "x", this.interaction = {
                mode: "nearest",
                intersect: !0,
                includeInvisible: !1
            }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(i)
        }
        set(t, i) {
            return Cn(this, t, i)
        }
        get(t) {
            return Ie(this, t)
        }
        describe(t, i) {
            return Cn(Si, t, i)
        }
        override(t, i) {
            return Cn(Ct, t, i)
        }
        route(t, i, n, s) {
            let o = Ie(this, t),
                r = Ie(this, n),
                a = "_" + i;
            Object.defineProperties(o, {
                [a]: {
                    value: o[i],
                    writable: !0
                },
                [i]: {
                    enumerable: !0,
                    get() {
                        let l = this[a],
                            c = r[s];
                        return D(l) ? Object.assign({}, c, l) : O(l, c)
                    },
                    set(l) {
                        this[a] = l
                    }
                }
            })
        }
        apply(t) {
            t.forEach(i => i(this))
        }
    },
    q = new An({
        _scriptable: e => !e.startsWith("on"),
        _indexable: e => e !== "events",
        hover: {
            _fallback: "interaction"
        },
        interaction: {
            _scriptable: !1,
            _indexable: !1
        }
    }, [xb, yb, Sb]);

function wb(e) {
    return !e || E(e.size) || E(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family
}

function Fe(e, t, i, n, s) {
    let o = t[s];
    return o || (o = t[s] = e.measureText(s).width, i.push(s)), o > n && (n = o), n
}

function Yl(e, t, i, n) {
    n = n || {};
    let s = n.data = n.data || {},
        o = n.garbageCollect = n.garbageCollect || [];
    n.font !== t && (s = n.data = {}, o = n.garbageCollect = [], n.font = t), e.save(), e.font = t;
    let r = 0,
        a = i.length,
        l, c, h, u, d;
    for (l = 0; l < a; l++)
        if (u = i[l], u != null && !z(u)) r = Fe(e, s, o, r, u);
        else if (z(u))
        for (c = 0, h = u.length; c < h; c++) d = u[c], d != null && !z(d) && (r = Fe(e, s, o, r, d));
    e.restore();
    let f = o.length / 2;
    if (f > i.length) {
        for (l = 0; l < f; l++) delete s[o[l]];
        o.splice(0, f)
    }
    return r
}

function At(e, t, i) {
    let n = e.currentDevicePixelRatio,
        s = i !== 0 ? Math.max(i / 2, .5) : 0;
    return Math.round((t - s) * n) / n + s
}

function Hn(e, t) {
    t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore()
}

function wi(e, t, i, n) {
    Wn(e, t, i, n, null)
}

function Wn(e, t, i, n, s) {
    let o, r, a, l, c, h, u, d, f = t.pointStyle,
        g = t.rotation,
        p = t.radius,
        m = (g || 0) * pb;
    if (f && typeof f == "object" && (o = f.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
        e.save(), e.translate(i, n), e.rotate(m), e.drawImage(f, -f.width / 2, -f.height / 2, f.width, f.height), e.restore();
        return
    }
    if (!(isNaN(p) || p <= 0)) {
        switch (e.beginPath(), f) {
            default: s ? e.ellipse(i, n, s / 2, p, 0, 0, B) : e.arc(i, n, p, 0, B),
            e.closePath();
            break;
            case "triangle":
                    h = s ? s / 2 : p,
                e.moveTo(i + Math.sin(m) * h, n - Math.cos(m) * p),
                m += Ml,
                e.lineTo(i + Math.sin(m) * h, n - Math.cos(m) * p),
                m += Ml,
                e.lineTo(i + Math.sin(m) * h, n - Math.cos(m) * p),
                e.closePath();
                break;
            case "rectRounded":
                    c = p * .516,
                l = p - c,
                r = Math.cos(m + Ft) * l,
                u = Math.cos(m + Ft) * (s ? s / 2 - c : l),
                a = Math.sin(m + Ft) * l,
                d = Math.sin(m + Ft) * (s ? s / 2 - c : l),
                e.arc(i - u, n - a, c, m - V, m - H),
                e.arc(i + d, n - r, c, m - H, m),
                e.arc(i + u, n + a, c, m, m + H),
                e.arc(i - d, n + r, c, m + H, m + V),
                e.closePath();
                break;
            case "rect":
                    if (!g) {
                    l = Math.SQRT1_2 * p, h = s ? s / 2 : l, e.rect(i - h, n - l, 2 * h, 2 * l);
                    break
                }m += Ft;
            case "rectRot":
                    u = Math.cos(m) * (s ? s / 2 : p),
                r = Math.cos(m) * p,
                a = Math.sin(m) * p,
                d = Math.sin(m) * (s ? s / 2 : p),
                e.moveTo(i - u, n - a),
                e.lineTo(i + d, n - r),
                e.lineTo(i + u, n + a),
                e.lineTo(i - d, n + r),
                e.closePath();
                break;
            case "crossRot":
                    m += Ft;
            case "cross":
                    u = Math.cos(m) * (s ? s / 2 : p),
                r = Math.cos(m) * p,
                a = Math.sin(m) * p,
                d = Math.sin(m) * (s ? s / 2 : p),
                e.moveTo(i - u, n - a),
                e.lineTo(i + u, n + a),
                e.moveTo(i + d, n - r),
                e.lineTo(i - d, n + r);
                break;
            case "star":
                    u = Math.cos(m) * (s ? s / 2 : p),
                r = Math.cos(m) * p,
                a = Math.sin(m) * p,
                d = Math.sin(m) * (s ? s / 2 : p),
                e.moveTo(i - u, n - a),
                e.lineTo(i + u, n + a),
                e.moveTo(i + d, n - r),
                e.lineTo(i - d, n + r),
                m += Ft,
                u = Math.cos(m) * (s ? s / 2 : p),
                r = Math.cos(m) * p,
                a = Math.sin(m) * p,
                d = Math.sin(m) * (s ? s / 2 : p),
                e.moveTo(i - u, n - a),
                e.lineTo(i + u, n + a),
                e.moveTo(i + d, n - r),
                e.lineTo(i - d, n + r);
                break;
            case "line":
                    r = s ? s / 2 : Math.cos(m) * p,
                a = Math.sin(m) * p,
                e.moveTo(i - r, n - a),
                e.lineTo(i + r, n + a);
                break;
            case "dash":
                    e.moveTo(i, n),
                e.lineTo(i + Math.cos(m) * (s ? s / 2 : p), n + Math.sin(m) * p);
                break;
            case !1:
                    e.closePath();
                break
        }
        e.fill(), t.borderWidth > 0 && e.stroke()
    }
}

function ut(e, t, i) {
    return i = i || .5, !t || e && e.x > t.left - i && e.x < t.right + i && e.y > t.top - i && e.y < t.bottom + i
}

function je(e, t) {
    e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip()
}

function Ve(e) {
    e.restore()
}

function Xl(e, t, i, n, s) {
    if (!t) return e.lineTo(i.x, i.y);
    if (s === "middle") {
        let o = (t.x + i.x) / 2;
        e.lineTo(o, t.y), e.lineTo(o, i.y)
    } else s === "after" != !!n ? e.lineTo(t.x, i.y) : e.lineTo(i.x, t.y);
    e.lineTo(i.x, i.y)
}

function Kl(e, t, i, n) {
    if (!t) return e.lineTo(i.x, i.y);
    e.bezierCurveTo(n ? t.cp1x : t.cp2x, n ? t.cp1y : t.cp2y, n ? i.cp2x : i.cp1x, n ? i.cp2y : i.cp1y, i.x, i.y)
}

function kb(e, t) {
    t.translation && e.translate(t.translation[0], t.translation[1]), E(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline)
}

function Pb(e, t, i, n, s) {
    if (s.strikethrough || s.underline) {
        let o = e.measureText(n),
            r = t - o.actualBoundingBoxLeft,
            a = t + o.actualBoundingBoxRight,
            l = i - o.actualBoundingBoxAscent,
            c = i + o.actualBoundingBoxDescent,
            h = s.strikethrough ? (l + c) / 2 : c;
        e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = s.decorationWidth || 2, e.moveTo(r, h), e.lineTo(a, h), e.stroke()
    }
}

function Ob(e, t) {
    let i = e.fillStyle;
    e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = i
}

function Dt(e, t, i, n, s, o = {}) {
    let r = z(t) ? t : [t],
        a = o.strokeWidth > 0 && o.strokeColor !== "",
        l, c;
    for (e.save(), e.font = s.string, kb(e, o), l = 0; l < r.length; ++l) c = r[l], o.backdrop && Ob(e, o.backdrop), a && (o.strokeColor && (e.strokeStyle = o.strokeColor), E(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(c, i, n, o.maxWidth)), e.fillText(c, i, n, o.maxWidth), Pb(e, i, n, c, o), n += Number(s.lineHeight);
    e.restore()
}

function he(e, t) {
    let {
        x: i,
        y: n,
        w: s,
        h: o,
        radius: r
    } = t;
    e.arc(i + r.topLeft, n + r.topLeft, r.topLeft, -H, V, !0), e.lineTo(i, n + o - r.bottomLeft), e.arc(i + r.bottomLeft, n + o - r.bottomLeft, r.bottomLeft, V, H, !0), e.lineTo(i + s - r.bottomRight, n + o), e.arc(i + s - r.bottomRight, n + o - r.bottomRight, r.bottomRight, H, 0, !0), e.lineTo(i + s, n + r.topRight), e.arc(i + s - r.topRight, n + r.topRight, r.topRight, 0, -H, !0), e.lineTo(i + r.topLeft, n)
}
var Cb = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,
    Ab = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;

function Db(e, t) {
    let i = ("" + e).match(Cb);
    if (!i || i[1] === "normal") return t * 1.2;
    switch (e = +i[2], i[3]) {
        case "px":
            return e;
        case "%":
            e /= 100;
            break
    }
    return t * e
}
var Tb = e => +e || 0;

function ki(e, t) {
    let i = {},
        n = D(t),
        s = n ? Object.keys(t) : t,
        o = D(e) ? n ? r => O(e[r], e[t[r]]) : r => e[r] : () => e;
    for (let r of s) i[r] = Tb(o(r));
    return i
}

function qn(e) {
    return ki(e, {
        top: "y",
        right: "x",
        bottom: "y",
        left: "x"
    })
}

function Tt(e) {
    return ki(e, ["topLeft", "topRight", "bottomLeft", "bottomRight"])
}

function G(e) {
    let t = qn(e);
    return t.width = t.left + t.right, t.height = t.top + t.bottom, t
}

function U(e, t) {
    e = e || {}, t = t || q.font;
    let i = O(e.size, t.size);
    typeof i == "string" && (i = parseInt(i, 10));
    let n = O(e.style, t.style);
    n && !("" + n).match(Ab) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
    let s = {
        family: O(e.family, t.family),
        lineHeight: Db(O(e.lineHeight, t.lineHeight), i),
        size: i,
        style: n,
        weight: O(e.weight, t.weight),
        string: ""
    };
    return s.string = wb(s), s
}

function Ne(e, t, i, n) {
    let s = !0,
        o, r, a;
    for (o = 0, r = e.length; o < r; ++o)
        if (a = e[o], a !== void 0 && (t !== void 0 && typeof a == "function" && (a = a(t), s = !1), i !== void 0 && z(a) && (a = a[i % a.length], s = !1), a !== void 0)) return n && !s && (n.cacheable = !1), a
}

function Gl(e, t, i) {
    let {
        min: n,
        max: s
    } = e, o = Dn(t, (s - n) / 2), r = (a, l) => i && a === 0 ? 0 : a + l;
    return {
        min: r(n, -Math.abs(o)),
        max: r(s, o)
    }
}

function yt(e, t) {
    return Object.assign(Object.create(e), t)
}

function Pi(e, t = [""], i, n, s = () => e[0]) {
    let o = i || e;
    typeof n > "u" && (n = Ql("_fallback", e));
    let r = {
        [Symbol.toStringTag]: "Object",
        _cacheable: !0,
        _scopes: e,
        _rootScopes: o,
        _fallback: n,
        _getTarget: s,
        override: a => Pi([a, ...e], t, o, n)
    };
    return new Proxy(r, {
        deleteProperty(a, l) {
            return delete a[l], delete a._keys, delete e[0][l], !0
        },
        get(a, l) {
            return Zl(a, l, () => jb(l, t, e, a))
        },
        getOwnPropertyDescriptor(a, l) {
            return Reflect.getOwnPropertyDescriptor(a._scopes[0], l)
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(e[0])
        },
        has(a, l) {
            return Ol(a).includes(l)
        },
        ownKeys(a) {
            return Ol(a)
        },
        set(a, l, c) {
            let h = a._storage || (a._storage = s());
            return a[l] = h[l] = c, delete a._keys, !0
        }
    })
}

function Bt(e, t, i, n) {
    let s = {
        _cacheable: !1,
        _proxy: e,
        _context: t,
        _subProxy: i,
        _stack: new Set,
        _descriptors: $n(e, n),
        setContext: o => Bt(e, o, i, n),
        override: o => Bt(e.override(o), t, i, n)
    };
    return new Proxy(s, {
        deleteProperty(o, r) {
            return delete o[r], delete e[r], !0
        },
        get(o, r, a) {
            return Zl(o, r, () => Eb(o, r, a))
        },
        getOwnPropertyDescriptor(o, r) {
            return o._descriptors.allKeys ? Reflect.has(e, r) ? {
                enumerable: !0,
                configurable: !0
            } : void 0 : Reflect.getOwnPropertyDescriptor(e, r)
        },
        getPrototypeOf() {
            return Reflect.getPrototypeOf(e)
        },
        has(o, r) {
            return Reflect.has(e, r)
        },
        ownKeys() {
            return Reflect.ownKeys(e)
        },
        set(o, r, a) {
            return e[r] = a, delete o[r], !0
        }
    })
}

function $n(e, t = {
    scriptable: !0,
    indexable: !0
}) {
    let {
        _scriptable: i = t.scriptable,
        _indexable: n = t.indexable,
        _allKeys: s = t.allKeys
    } = e;
    return {
        allKeys: s,
        scriptable: i,
        indexable: n,
        isScriptable: bt(i) ? i : () => i,
        isIndexable: bt(n) ? n : () => n
    }
}
var Lb = (e, t) => e ? e + xi(t) : t,
    Un = (e, t) => D(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);

function Zl(e, t, i) {
    if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
    let n = i();
    return e[t] = n, n
}

function Eb(e, t, i) {
    let {
        _proxy: n,
        _context: s,
        _subProxy: o,
        _descriptors: r
    } = e, a = n[t];
    return bt(a) && r.isScriptable(t) && (a = Rb(t, a, e, i)), z(a) && a.length && (a = Ib(t, a, e, r.isIndexable)), Un(t, a) && (a = Bt(a, s, o && o[t], r)), a
}

function Rb(e, t, i, n) {
    let {
        _proxy: s,
        _context: o,
        _subProxy: r,
        _stack: a
    } = i;
    if (a.has(e)) throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + e);
    a.add(e);
    let l = t(o, r || n);
    return a.delete(e), Un(e, l) && (l = Yn(s._scopes, s, e, l)), l
}

function Ib(e, t, i, n) {
    let {
        _proxy: s,
        _context: o,
        _subProxy: r,
        _descriptors: a
    } = i;
    if (typeof o.index < "u" && n(e)) return t[o.index % t.length];
    if (D(t[0])) {
        let l = t,
            c = s._scopes.filter(h => h !== l);
        t = [];
        for (let h of l) {
            let u = Yn(c, s, e, h);
            t.push(Bt(u, o, r && r[e], a))
        }
    }
    return t
}

function Jl(e, t, i) {
    return bt(e) ? e(t, i) : e
}
var Fb = (e, t) => e === !0 ? t : typeof e == "string" ? xt(t, e) : void 0;

function zb(e, t, i, n, s) {
    for (let o of t) {
        let r = Fb(i, o);
        if (r) {
            e.add(r);
            let a = Jl(r._fallback, i, s);
            if (typeof a < "u" && a !== i && a !== n) return a
        } else if (r === !1 && typeof n < "u" && i !== n) return null
    }
    return !1
}

function Yn(e, t, i, n) {
    let s = t._rootScopes,
        o = Jl(t._fallback, i, n),
        r = [...e, ...s],
        a = new Set;
    a.add(n);
    let l = Pl(a, r, i, o || i, n);
    return l === null || typeof o < "u" && o !== i && (l = Pl(a, r, o, l, n), l === null) ? !1 : Pi(Array.from(a), [""], s, o, () => Bb(t, i, n))
}

function Pl(e, t, i, n, s) {
    for (; i;) i = zb(e, t, i, n, s);
    return i
}

function Bb(e, t, i) {
    let n = e._getTarget();
    t in n || (n[t] = {});
    let s = n[t];
    return z(s) && D(i) ? i : s || {}
}

function jb(e, t, i, n) {
    let s;
    for (let o of t)
        if (s = Ql(Lb(o, e), i), typeof s < "u") return Un(e, s) ? Yn(i, n, e, s) : s
}

function Ql(e, t) {
    for (let i of t) {
        if (!i) continue;
        let n = i[e];
        if (typeof n < "u") return n
    }
}

function Ol(e) {
    let t = e._keys;
    return t || (t = e._keys = Vb(e._scopes)), t
}

function Vb(e) {
    let t = new Set;
    for (let i of e)
        for (let n of Object.keys(i).filter(s => !s.startsWith("_"))) t.add(n);
    return Array.from(t)
}

function Xn(e, t, i, n) {
    let {
        iScale: s
    } = e, {
        key: o = "r"
    } = this._parsing, r = new Array(n), a, l, c, h;
    for (a = 0, l = n; a < l; ++a) c = a + i, h = t[c], r[a] = {
        r: s.parse(xt(h, o), c)
    };
    return r
}
var Nb = Number.EPSILON || 1e-14,
    ne = (e, t) => t < e.length && !e[t].skip && e[t],
    tc = e => e === "x" ? "y" : "x";

function Hb(e, t, i, n) {
    let s = e.skip ? t : e,
        o = t,
        r = i.skip ? t : i,
        a = bi(o, s),
        l = bi(r, o),
        c = a / (a + l),
        h = l / (a + l);
    c = isNaN(c) ? 0 : c, h = isNaN(h) ? 0 : h;
    let u = n * c,
        d = n * h;
    return {
        previous: {
            x: o.x - u * (r.x - s.x),
            y: o.y - u * (r.y - s.y)
        },
        next: {
            x: o.x + d * (r.x - s.x),
            y: o.y + d * (r.y - s.y)
        }
    }
}

function Wb(e, t, i) {
    let n = e.length,
        s, o, r, a, l, c = ne(e, 0);
    for (let h = 0; h < n - 1; ++h)
        if (l = c, c = ne(e, h + 1), !(!l || !c)) {
            if (re(t[h], 0, Nb)) {
                i[h] = i[h + 1] = 0;
                continue
            }
            s = i[h] / t[h], o = i[h + 1] / t[h], a = Math.pow(s, 2) + Math.pow(o, 2), !(a <= 9) && (r = 3 / Math.sqrt(a), i[h] = s * r * t[h], i[h + 1] = o * r * t[h])
        }
}

function qb(e, t, i = "x") {
    let n = tc(i),
        s = e.length,
        o, r, a, l = ne(e, 0);
    for (let c = 0; c < s; ++c) {
        if (r = a, a = l, l = ne(e, c + 1), !a) continue;
        let h = a[i],
            u = a[n];
        r && (o = (h - r[i]) / 3, a[`cp1${i}`] = h - o, a[`cp1${n}`] = u - o * t[c]), l && (o = (l[i] - h) / 3, a[`cp2${i}`] = h + o, a[`cp2${n}`] = u + o * t[c])
    }
}

function $b(e, t = "x") {
    let i = tc(t),
        n = e.length,
        s = Array(n).fill(0),
        o = Array(n),
        r, a, l, c = ne(e, 0);
    for (r = 0; r < n; ++r)
        if (a = l, l = c, c = ne(e, r + 1), !!l) {
            if (c) {
                let h = c[t] - l[t];
                s[r] = h !== 0 ? (c[i] - l[i]) / h : 0
            }
            o[r] = a ? c ? ct(s[r - 1]) !== ct(s[r]) ? 0 : (s[r - 1] + s[r]) / 2 : s[r - 1] : s[r]
        }
    Wb(e, s, o), qb(e, o, t)
}

function fi(e, t, i) {
    return Math.max(Math.min(e, i), t)
}

function Ub(e, t) {
    let i, n, s, o, r, a = ut(e[0], t);
    for (i = 0, n = e.length; i < n; ++i) r = o, o = a, a = i < n - 1 && ut(e[i + 1], t), o && (s = e[i], r && (s.cp1x = fi(s.cp1x, t.left, t.right), s.cp1y = fi(s.cp1y, t.top, t.bottom)), a && (s.cp2x = fi(s.cp2x, t.left, t.right), s.cp2y = fi(s.cp2y, t.top, t.bottom)))
}

function ec(e, t, i, n, s) {
    let o, r, a, l;
    if (t.spanGaps && (e = e.filter(c => !c.skip)), t.cubicInterpolationMode === "monotone") $b(e, s);
    else {
        let c = n ? e[e.length - 1] : e[0];
        for (o = 0, r = e.length; o < r; ++o) a = e[o], l = Hb(c, a, e[Math.min(o + 1, r - (n ? 0 : 1)) % r], t.tension), a.cp1x = l.previous.x, a.cp1y = l.previous.y, a.cp2x = l.next.x, a.cp2y = l.next.y, c = a
    }
    t.capBezierPoints && Ub(e, i)
}

function Kn() {
    return typeof window < "u" && typeof document < "u"
}

function Oi(e) {
    let t = e.parentNode;
    return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t
}

function _i(e, t, i) {
    let n;
    return typeof e == "string" ? (n = parseInt(e, 10), e.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[i])) : n = e, n
}
var Ci = e => e.ownerDocument.defaultView.getComputedStyle(e, null);

function Yb(e, t) {
    return Ci(e).getPropertyValue(t)
}
var Xb = ["top", "right", "bottom", "left"];

function zt(e, t, i) {
    let n = {};
    i = i ? "-" + i : "";
    for (let s = 0; s < 4; s++) {
        let o = Xb[s];
        n[o] = parseFloat(e[t + "-" + o + i]) || 0
    }
    return n.width = n.left + n.right, n.height = n.top + n.bottom, n
}
var Kb = (e, t, i) => (e > 0 || t > 0) && (!i || !i.shadowRoot);

function Gb(e, t) {
    let i = e.touches,
        n = i && i.length ? i[0] : e,
        {
            offsetX: s,
            offsetY: o
        } = n,
        r = !1,
        a, l;
    if (Kb(s, o, e.target)) a = s, l = o;
    else {
        let c = t.getBoundingClientRect();
        a = n.clientX - c.left, l = n.clientY - c.top, r = !0
    }
    return {
        x: a,
        y: l,
        box: r
    }
}

function Lt(e, t) {
    if ("native" in e) return e;
    let {
        canvas: i,
        currentDevicePixelRatio: n
    } = t, s = Ci(i), o = s.boxSizing === "border-box", r = zt(s, "padding"), a = zt(s, "border", "width"), {
        x: l,
        y: c,
        box: h
    } = Gb(e, i), u = r.left + (h && a.left), d = r.top + (h && a.top), {
        width: f,
        height: g
    } = t;
    return o && (f -= r.width + a.width, g -= r.height + a.height), {
        x: Math.round((l - u) / f * i.width / n),
        y: Math.round((c - d) / g * i.height / n)
    }
}

function Zb(e, t, i) {
    let n, s;
    if (t === void 0 || i === void 0) {
        let o = Oi(e);
        if (!o) t = e.clientWidth, i = e.clientHeight;
        else {
            let r = o.getBoundingClientRect(),
                a = Ci(o),
                l = zt(a, "border", "width"),
                c = zt(a, "padding");
            t = r.width - c.width - l.width, i = r.height - c.height - l.height, n = _i(a.maxWidth, o, "clientWidth"), s = _i(a.maxHeight, o, "clientHeight")
        }
    }
    return {
        width: t,
        height: i,
        maxWidth: n || mi,
        maxHeight: s || mi
    }
}
var gi = e => Math.round(e * 10) / 10;

function ic(e, t, i, n) {
    let s = Ci(e),
        o = zt(s, "margin"),
        r = _i(s.maxWidth, e, "clientWidth") || mi,
        a = _i(s.maxHeight, e, "clientHeight") || mi,
        l = Zb(e, t, i),
        {
            width: c,
            height: h
        } = l;
    if (s.boxSizing === "content-box") {
        let d = zt(s, "border", "width"),
            f = zt(s, "padding");
        c -= f.width + d.width, h -= f.height + d.height
    }
    return c = Math.max(0, c - o.width), h = Math.max(0, n ? c / n : h - o.height), c = gi(Math.min(c, r, l.maxWidth)), h = gi(Math.min(h, a, l.maxHeight)), c && !h && (h = gi(c / 2)), (t !== void 0 || i !== void 0) && n && l.height && h > l.height && (h = l.height, c = gi(Math.floor(h * n))), {
        width: c,
        height: h
    }
}

function Gn(e, t, i) {
    let n = t || 1,
        s = Math.floor(e.height * n),
        o = Math.floor(e.width * n);
    e.height = Math.floor(e.height), e.width = Math.floor(e.width);
    let r = e.canvas;
    return r.style && (i || !r.style.height && !r.style.width) && (r.style.height = `${e.height}px`, r.style.width = `${e.width}px`), e.currentDevicePixelRatio !== n || r.height !== s || r.width !== o ? (e.currentDevicePixelRatio = n, r.height = s, r.width = o, e.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1
}
var nc = function() {
    let e = !1;
    try {
        let t = {
            get passive() {
                return e = !0, !1
            }
        };
        window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
    } catch {}
    return e
}();

function Zn(e, t) {
    let i = Yb(e, t),
        n = i && i.match(/^(\d+)(\.\d+)?px$/);
    return n ? +n[1] : void 0
}

function Pt(e, t, i, n) {
    return {
        x: e.x + i * (t.x - e.x),
        y: e.y + i * (t.y - e.y)
    }
}

function sc(e, t, i, n) {
    return {
        x: e.x + i * (t.x - e.x),
        y: n === "middle" ? i < .5 ? e.y : t.y : n === "after" ? i < 1 ? e.y : t.y : i > 0 ? t.y : e.y
    }
}

function oc(e, t, i, n) {
    let s = {
            x: e.cp2x,
            y: e.cp2y
        },
        o = {
            x: t.cp1x,
            y: t.cp1y
        },
        r = Pt(e, s, i),
        a = Pt(s, o, i),
        l = Pt(o, t, i),
        c = Pt(r, a, i),
        h = Pt(a, l, i);
    return Pt(c, h, i)
}
var Jb = function(e, t) {
        return {
            x(i) {
                return e + e + t - i
            },
            setWidth(i) {
                t = i
            },
            textAlign(i) {
                return i === "center" ? i : i === "right" ? "left" : "right"
            },
            xPlus(i, n) {
                return i - n
            },
            leftForLtr(i, n) {
                return i - n
            }
        }
    },
    Qb = function() {
        return {
            x(e) {
                return e
            },
            setWidth(e) {},
            textAlign(e) {
                return e
            },
            xPlus(e, t) {
                return e + t
            },
            leftForLtr(e, t) {
                return e
            }
        }
    };

function jt(e, t, i) {
    return e ? Jb(t, i) : Qb()
}

function Jn(e, t) {
    let i, n;
    (t === "ltr" || t === "rtl") && (i = e.canvas.style, n = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")], i.setProperty("direction", t, "important"), e.prevTextDirection = n)
}

function Qn(e, t) {
    t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]))
}

function rc(e) {
    return e === "angle" ? {
        between: le,
        compare: mb,
        normalize: tt
    } : {
        between: ft,
        compare: (t, i) => t - i,
        normalize: t => t
    }
}

function Cl({
    start: e,
    end: t,
    count: i,
    loop: n,
    style: s
}) {
    return {
        start: e % i,
        end: t % i,
        loop: n && (t - e + 1) % i === 0,
        style: s
    }
}

function t_(e, t, i) {
    let {
        property: n,
        start: s,
        end: o
    } = i, {
        between: r,
        normalize: a
    } = rc(n), l = t.length, {
        start: c,
        end: h,
        loop: u
    } = e, d, f;
    if (u) {
        for (c += l, h += l, d = 0, f = l; d < f && r(a(t[c % l][n]), s, o); ++d) c--, h--;
        c %= l, h %= l
    }
    return h < c && (h += l), {
        start: c,
        end: h,
        loop: u,
        style: e.style
    }
}

function ts(e, t, i) {
    if (!i) return [e];
    let {
        property: n,
        start: s,
        end: o
    } = i, r = t.length, {
        compare: a,
        between: l,
        normalize: c
    } = rc(n), {
        start: h,
        end: u,
        loop: d,
        style: f
    } = t_(e, t, i), g = [], p = !1, m = null, b, _, v, M = () => l(s, v, b) && a(s, v) !== 0, y = () => a(o, b) === 0 || l(o, v, b), w = () => p || M(), k = () => !p || y();
    for (let S = h, P = h; S <= u; ++S) _ = t[S % r], !_.skip && (b = c(_[n]), b !== v && (p = l(b, s, o), m === null && w() && (m = a(b, s) === 0 ? S : P), m !== null && k() && (g.push(Cl({
        start: m,
        end: S,
        loop: d,
        count: r,
        style: f
    })), m = null), P = S, v = b));
    return m !== null && g.push(Cl({
        start: m,
        end: u,
        loop: d,
        count: r,
        style: f
    })), g
}

function es(e, t) {
    let i = [],
        n = e.segments;
    for (let s = 0; s < n.length; s++) {
        let o = ts(n[s], e.points, t);
        o.length && i.push(...o)
    }
    return i
}

function e_(e, t, i, n) {
    let s = 0,
        o = t - 1;
    if (i && !n)
        for (; s < t && !e[s].skip;) s++;
    for (; s < t && e[s].skip;) s++;
    for (s %= t, i && (o += s); o > s && e[o % t].skip;) o--;
    return o %= t, {
        start: s,
        end: o
    }
}

function i_(e, t, i, n) {
    let s = e.length,
        o = [],
        r = t,
        a = e[t],
        l;
    for (l = t + 1; l <= i; ++l) {
        let c = e[l % s];
        c.skip || c.stop ? a.skip || (n = !1, o.push({
            start: t % s,
            end: (l - 1) % s,
            loop: n
        }), t = r = c.stop ? l : null) : (r = l, a.skip && (t = l)), a = c
    }
    return r !== null && o.push({
        start: t % s,
        end: r % s,
        loop: n
    }), o
}

function ac(e, t) {
    let i = e.points,
        n = e.options.spanGaps,
        s = i.length;
    if (!s) return [];
    let o = !!e._loop,
        {
            start: r,
            end: a
        } = e_(i, s, o, n);
    if (n === !0) return Al(e, [{
        start: r,
        end: a,
        loop: o
    }], i, t);
    let l = a < r ? a + s : a,
        c = !!e._fullLoop && r === 0 && a === s - 1;
    return Al(e, i_(i, r, l, c), i, t)
}

function Al(e, t, i, n) {
    return !n || !n.setContext || !i ? t : n_(e, t, i, n)
}

function n_(e, t, i, n) {
    let s = e._chart.getContext(),
        o = Dl(e.options),
        {
            _datasetIndex: r,
            options: {
                spanGaps: a
            }
        } = e,
        l = i.length,
        c = [],
        h = o,
        u = t[0].start,
        d = u;

    function f(g, p, m, b) {
        let _ = a ? -1 : 1;
        if (g !== p) {
            for (g += l; i[g % l].skip;) g -= _;
            for (; i[p % l].skip;) p += _;
            g % l !== p % l && (c.push({
                start: g % l,
                end: p % l,
                loop: m,
                style: b
            }), h = b, u = p % l)
        }
    }
    for (let g of t) {
        u = a ? u : g.start;
        let p = i[u % l],
            m;
        for (d = u + 1; d <= g.end; d++) {
            let b = i[d % l];
            m = Dl(n.setContext(yt(s, {
                type: "segment",
                p0: p,
                p1: b,
                p0DataIndex: (d - 1) % l,
                p1DataIndex: d % l,
                datasetIndex: r
            }))), s_(m, h) && f(u, d - 1, g.loop, h), p = b, h = m
        }
        u < d - 1 && f(u, d - 1, g.loop, h)
    }
    return c
}

function Dl(e) {
    return {
        backgroundColor: e.backgroundColor,
        borderCapStyle: e.borderCapStyle,
        borderDash: e.borderDash,
        borderDashOffset: e.borderDashOffset,
        borderJoinStyle: e.borderJoinStyle,
        borderWidth: e.borderWidth,
        borderColor: e.borderColor
    }
}

function s_(e, t) {
    if (!t) return !1;
    let i = [],
        n = function(s, o) {
            return Vn(o) ? (i.includes(o) || i.push(o), i.indexOf(o)) : o
        };
    return JSON.stringify(e, n) !== JSON.stringify(t, n)
}
var us = class {
        constructor() {
            this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0
        }
        _notify(t, i, n, s) {
            let o = i.listeners[s],
                r = i.duration;
            o.forEach(a => a({
                chart: t,
                initial: i.initial,
                numSteps: r,
                currentStep: Math.min(n - i.start, r)
            }))
        }
        _refresh() {
            this._request || (this._running = !0, this._request = Bn.call(window, () => {
                this._update(), this._request = null, this._running && this._refresh()
            }))
        }
        _update(t = Date.now()) {
            let i = 0;
            this._charts.forEach((n, s) => {
                if (!n.running || !n.items.length) return;
                let o = n.items,
                    r = o.length - 1,
                    a = !1,
                    l;
                for (; r >= 0; --r) l = o[r], l._active ? (l._total > n.duration && (n.duration = l._total), l.tick(t), a = !0) : (o[r] = o[o.length - 1], o.pop());
                a && (s.draw(), this._notify(s, n, t, "progress")), o.length || (n.running = !1, this._notify(s, n, t, "complete"), n.initial = !1), i += o.length
            }), this._lastDate = t, i === 0 && (this._running = !1)
        }
        _getAnims(t) {
            let i = this._charts,
                n = i.get(t);
            return n || (n = {
                running: !1,
                initial: !0,
                items: [],
                listeners: {
                    complete: [],
                    progress: []
                }
            }, i.set(t, n)), n
        }
        listen(t, i, n) {
            this._getAnims(t).listeners[i].push(n)
        }
        add(t, i) {
            !i || !i.length || this._getAnims(t).items.push(...i)
        }
        has(t) {
            return this._getAnims(t).items.length > 0
        }
        start(t) {
            let i = this._charts.get(t);
            i && (i.running = !0, i.start = Date.now(), i.duration = i.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh())
        }
        running(t) {
            if (!this._running) return !1;
            let i = this._charts.get(t);
            return !(!i || !i.running || !i.items.length)
        }
        stop(t) {
            let i = this._charts.get(t);
            if (!i || !i.items.length) return;
            let n = i.items,
                s = n.length - 1;
            for (; s >= 0; --s) n[s].cancel();
            i.items = [], this._notify(t, i, Date.now(), "complete")
        }
        remove(t) {
            return this._charts.delete(t)
        }
    },
    vt = new us,
    lc = "transparent",
    o_ = {
        boolean(e, t, i) {
            return i > .5 ? t : e
        },
        color(e, t, i) {
            let n = Nn(e || lc),
                s = n.valid && Nn(t || lc);
            return s && s.valid ? s.mix(n, i).hexString() : t
        },
        number(e, t, i) {
            return e + (t - e) * i
        }
    },
    ds = class {
        constructor(t, i, n, s) {
            let o = i[n];
            s = Ne([t.to, s, o, t.from]);
            let r = Ne([t.from, o, s]);
            this._active = !0, this._fn = t.fn || o_[t.type || typeof r], this._easing = ee[t.easing] || ee.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = i, this._prop = n, this._from = r, this._to = s, this._promises = void 0
        }
        active() {
            return this._active
        }
        update(t, i, n) {
            if (this._active) {
                this._notify(!1);
                let s = this._target[this._prop],
                    o = n - this._start,
                    r = this._duration - o;
                this._start = n, this._duration = Math.floor(Math.max(r, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Ne([t.to, i, s, t.from]), this._from = Ne([t.from, s, i])
            }
        }
        cancel() {
            this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1))
        }
        tick(t) {
            let i = t - this._start,
                n = this._duration,
                s = this._prop,
                o = this._from,
                r = this._loop,
                a = this._to,
                l;
            if (this._active = o !== a && (r || i < n), !this._active) {
                this._target[s] = a, this._notify(!0);
                return
            }
            if (i < 0) {
                this._target[s] = o;
                return
            }
            l = i / n % 2, l = r && l > 1 ? 2 - l : l, l = this._easing(Math.min(1, Math.max(0, l))), this._target[s] = this._fn(o, a, l)
        }
        wait() {
            let t = this._promises || (this._promises = []);
            return new Promise((i, n) => {
                t.push({
                    res: i,
                    rej: n
                })
            })
        }
        _notify(t) {
            let i = t ? "res" : "rej",
                n = this._promises || [];
            for (let s = 0; s < n.length; s++) n[s][i]()
        }
    },
    Fi = class {
        constructor(t, i) {
            this._chart = t, this._properties = new Map, this.configure(i)
        }
        configure(t) {
            if (!D(t)) return;
            let i = Object.keys(q.animation),
                n = this._properties;
            Object.getOwnPropertyNames(t).forEach(s => {
                let o = t[s];
                if (!D(o)) return;
                let r = {};
                for (let a of i) r[a] = o[a];
                (z(o.properties) && o.properties || [s]).forEach(a => {
                    (a === s || !n.has(a)) && n.set(a, r)
                })
            })
        }
        _animateOptions(t, i) {
            let n = i.options,
                s = a_(t, n);
            if (!s) return [];
            let o = this._createAnimations(s, n);
            return n.$shared && r_(t.options.$animations, n).then(() => {
                t.options = n
            }, () => {}), o
        }
        _createAnimations(t, i) {
            let n = this._properties,
                s = [],
                o = t.$animations || (t.$animations = {}),
                r = Object.keys(i),
                a = Date.now(),
                l;
            for (l = r.length - 1; l >= 0; --l) {
                let c = r[l];
                if (c.charAt(0) === "$") continue;
                if (c === "options") {
                    s.push(...this._animateOptions(t, i));
                    continue
                }
                let h = i[c],
                    u = o[c],
                    d = n.get(c);
                if (u)
                    if (d && u.active()) {
                        u.update(d, h, a);
                        continue
                    } else u.cancel();
                if (!d || !d.duration) {
                    t[c] = h;
                    continue
                }
                o[c] = u = new ds(d, t, c, h), s.push(u)
            }
            return s
        }
        update(t, i) {
            if (this._properties.size === 0) {
                Object.assign(t, i);
                return
            }
            let n = this._createAnimations(t, i);
            if (n.length) return vt.add(this._chart, n), !0
        }
    };

function r_(e, t) {
    let i = [],
        n = Object.keys(t);
    for (let s = 0; s < n.length; s++) {
        let o = e[n[s]];
        o && o.active() && i.push(o.wait())
    }
    return Promise.all(i)
}

function a_(e, t) {
    if (!t) return;
    let i = e.options;
    if (!i) {
        e.options = t;
        return
    }
    return i.$shared && (e.options = i = Object.assign({}, i, {
        $shared: !1,
        $animations: {}
    })), i
}

function cc(e, t) {
    let i = e && e.options || {},
        n = i.reverse,
        s = i.min === void 0 ? t : 0,
        o = i.max === void 0 ? t : 0;
    return {
        start: n ? o : s,
        end: n ? s : o
    }
}

function l_(e, t, i) {
    if (i === !1) return !1;
    let n = cc(e, i),
        s = cc(t, i);
    return {
        top: s.end,
        right: n.end,
        bottom: s.start,
        left: n.start
    }
}

function c_(e) {
    let t, i, n, s;
    return D(e) ? (t = e.top, i = e.right, n = e.bottom, s = e.left) : t = i = n = s = e, {
        top: t,
        right: i,
        bottom: n,
        left: s,
        disabled: e === !1
    }
}

function fh(e, t) {
    let i = [],
        n = e._getSortedDatasetMetas(t),
        s, o;
    for (s = 0, o = n.length; s < o; ++s) i.push(n[s].index);
    return i
}

function hc(e, t, i, n = {}) {
    let s = e.keys,
        o = n.mode === "single",
        r, a, l, c;
    if (t !== null) {
        for (r = 0, a = s.length; r < a; ++r) {
            if (l = +s[r], l === i) {
                if (n.all) continue;
                break
            }
            c = e.values[l], W(c) && (o || t === 0 || ct(t) === ct(c)) && (t += c)
        }
        return t
    }
}

function h_(e) {
    let t = Object.keys(e),
        i = new Array(t.length),
        n, s, o;
    for (n = 0, s = t.length; n < s; ++n) o = t[n], i[n] = {
        x: o,
        y: e[o]
    };
    return i
}

function uc(e, t) {
    let i = e && e.options.stacked;
    return i || i === void 0 && t.stack !== void 0
}

function u_(e, t, i) {
    return `${e.id}.${t.id}.${i.stack||i.type}`
}

function d_(e) {
    let {
        min: t,
        max: i,
        minDefined: n,
        maxDefined: s
    } = e.getUserBounds();
    return {
        min: n ? t : Number.NEGATIVE_INFINITY,
        max: s ? i : Number.POSITIVE_INFINITY
    }
}

function f_(e, t, i) {
    let n = e[t] || (e[t] = {});
    return n[i] || (n[i] = {})
}

function dc(e, t, i, n) {
    for (let s of t.getMatchingVisibleMetas(n).reverse()) {
        let o = e[s.index];
        if (i && o > 0 || !i && o < 0) return s.index
    }
    return null
}

function fc(e, t) {
    let {
        chart: i,
        _cachedMeta: n
    } = e, s = i._stacks || (i._stacks = {}), {
        iScale: o,
        vScale: r,
        index: a
    } = n, l = o.axis, c = r.axis, h = u_(o, r, n), u = t.length, d;
    for (let f = 0; f < u; ++f) {
        let g = t[f],
            {
                [l]: p,
                [c]: m
            } = g,
            b = g._stacks || (g._stacks = {});
        d = b[c] = f_(s, h, p), d[a] = m, d._top = dc(d, r, !0, n.type), d._bottom = dc(d, r, !1, n.type);
        let _ = d._visualValues || (d._visualValues = {});
        _[a] = m
    }
}

function is(e, t) {
    let i = e.scales;
    return Object.keys(i).filter(n => i[n].axis === t).shift()
}

function g_(e, t) {
    return yt(e, {
        active: !1,
        dataset: void 0,
        datasetIndex: t,
        index: t,
        mode: "default",
        type: "dataset"
    })
}

function p_(e, t, i) {
    return yt(e, {
        active: !1,
        dataIndex: t,
        parsed: void 0,
        raw: void 0,
        element: i,
        index: t,
        mode: "default",
        type: "data"
    })
}

function He(e, t) {
    let i = e.controller.index,
        n = e.vScale && e.vScale.axis;
    if (n) {
        t = t || e._parsed;
        for (let s of t) {
            let o = s._stacks;
            if (!o || o[n] === void 0 || o[n][i] === void 0) return;
            delete o[n][i], o[n]._visualValues !== void 0 && o[n]._visualValues[i] !== void 0 && delete o[n]._visualValues[i]
        }
    }
}
var ns = e => e === "reset" || e === "none",
    gc = (e, t) => t ? e : Object.assign({}, e),
    m_ = (e, t, i) => e && !t.hidden && t._stacked && {
        keys: fh(i, !0),
        values: null
    },
    Rt = class {
        static defaults = {};
        static datasetElementType = null;
        static dataElementType = null;
        constructor(t, i) {
            this.chart = t, this._ctx = t.ctx, this.index = i, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize()
        }
        initialize() {
            let t = this._cachedMeta;
            this.configure(), this.linkScales(), t._stacked = uc(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")
        }
        updateIndex(t) {
            this.index !== t && He(this._cachedMeta), this.index = t
        }
        linkScales() {
            let t = this.chart,
                i = this._cachedMeta,
                n = this.getDataset(),
                s = (u, d, f, g) => u === "x" ? d : u === "r" ? g : f,
                o = i.xAxisID = O(n.xAxisID, is(t, "x")),
                r = i.yAxisID = O(n.yAxisID, is(t, "y")),
                a = i.rAxisID = O(n.rAxisID, is(t, "r")),
                l = i.indexAxis,
                c = i.iAxisID = s(l, o, r, a),
                h = i.vAxisID = s(l, r, o, a);
            i.xScale = this.getScaleForId(o), i.yScale = this.getScaleForId(r), i.rScale = this.getScaleForId(a), i.iScale = this.getScaleForId(c), i.vScale = this.getScaleForId(h)
        }
        getDataset() {
            return this.chart.data.datasets[this.index]
        }
        getMeta() {
            return this.chart.getDatasetMeta(this.index)
        }
        getScaleForId(t) {
            return this.chart.scales[t]
        }
        _getOtherScale(t) {
            let i = this._cachedMeta;
            return t === i.iScale ? i.vScale : i.iScale
        }
        reset() {
            this._update("reset")
        }
        _destroy() {
            let t = this._cachedMeta;
            this._data && Fn(this._data, this), t._stacked && He(t)
        }
        _dataCheck() {
            let t = this.getDataset(),
                i = t.data || (t.data = []),
                n = this._data;
            if (D(i)) this._data = h_(i);
            else if (n !== i) {
                if (n) {
                    Fn(n, this);
                    let s = this._cachedMeta;
                    He(s), s._parsed = []
                }
                i && Object.isExtensible(i) && Nl(i, this), this._syncList = [], this._data = i
            }
        }
        addElements() {
            let t = this._cachedMeta;
            this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType)
        }
        buildOrUpdateElements(t) {
            let i = this._cachedMeta,
                n = this.getDataset(),
                s = !1;
            this._dataCheck();
            let o = i._stacked;
            i._stacked = uc(i.vScale, i), i.stack !== n.stack && (s = !0, He(i), i.stack = n.stack), this._resyncElements(t), (s || o !== i._stacked) && fc(this, i._parsed)
        }
        configure() {
            let t = this.chart.config,
                i = t.datasetScopeKeys(this._type),
                n = t.getOptionScopes(this.getDataset(), i, !0);
            this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {}
        }
        parse(t, i) {
            let {
                _cachedMeta: n,
                _data: s
            } = this, {
                iScale: o,
                _stacked: r
            } = n, a = o.axis, l = t === 0 && i === s.length ? !0 : n._sorted, c = t > 0 && n._parsed[t - 1], h, u, d;
            if (this._parsing === !1) n._parsed = s, n._sorted = !0, d = s;
            else {
                z(s[t]) ? d = this.parseArrayData(n, s, t, i) : D(s[t]) ? d = this.parseObjectData(n, s, t, i) : d = this.parsePrimitiveData(n, s, t, i);
                let f = () => u[a] === null || c && u[a] < c[a];
                for (h = 0; h < i; ++h) n._parsed[h + t] = u = d[h], l && (f() && (l = !1), c = u);
                n._sorted = l
            }
            r && fc(this, d)
        }
        parsePrimitiveData(t, i, n, s) {
            let {
                iScale: o,
                vScale: r
            } = t, a = o.axis, l = r.axis, c = o.getLabels(), h = o === r, u = new Array(s), d, f, g;
            for (d = 0, f = s; d < f; ++d) g = d + n, u[d] = {
                [a]: h || o.parse(c[g], g),
                [l]: r.parse(i[g], g)
            };
            return u
        }
        parseArrayData(t, i, n, s) {
            let {
                xScale: o,
                yScale: r
            } = t, a = new Array(s), l, c, h, u;
            for (l = 0, c = s; l < c; ++l) h = l + n, u = i[h], a[l] = {
                x: o.parse(u[0], h),
                y: r.parse(u[1], h)
            };
            return a
        }
        parseObjectData(t, i, n, s) {
            let {
                xScale: o,
                yScale: r
            } = t, {
                xAxisKey: a = "x",
                yAxisKey: l = "y"
            } = this._parsing, c = new Array(s), h, u, d, f;
            for (h = 0, u = s; h < u; ++h) d = h + n, f = i[d], c[h] = {
                x: o.parse(xt(f, a), d),
                y: r.parse(xt(f, l), d)
            };
            return c
        }
        getParsed(t) {
            return this._cachedMeta._parsed[t]
        }
        getDataElement(t) {
            return this._cachedMeta.data[t]
        }
        applyStack(t, i, n) {
            let s = this.chart,
                o = this._cachedMeta,
                r = i[t.axis],
                a = {
                    keys: fh(s, !0),
                    values: i._stacks[t.axis]._visualValues
                };
            return hc(a, r, o.index, {
                mode: n
            })
        }
        updateRangeFromParsed(t, i, n, s) {
            let o = n[i.axis],
                r = o === null ? NaN : o,
                a = s && n._stacks[i.axis];
            s && a && (s.values = a, r = hc(s, o, this._cachedMeta.index)), t.min = Math.min(t.min, r), t.max = Math.max(t.max, r)
        }
        getMinMax(t, i) {
            let n = this._cachedMeta,
                s = n._parsed,
                o = n._sorted && t === n.iScale,
                r = s.length,
                a = this._getOtherScale(t),
                l = m_(i, n, this.chart),
                c = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                },
                {
                    min: h,
                    max: u
                } = d_(a),
                d, f;

            function g() {
                f = s[d];
                let p = f[a.axis];
                return !W(f[t.axis]) || h > p || u < p
            }
            for (d = 0; d < r && !(!g() && (this.updateRangeFromParsed(c, t, f, l), o)); ++d);
            if (o) {
                for (d = r - 1; d >= 0; --d)
                    if (!g()) {
                        this.updateRangeFromParsed(c, t, f, l);
                        break
                    }
            }
            return c
        }
        getAllParsedValues(t) {
            let i = this._cachedMeta._parsed,
                n = [],
                s, o, r;
            for (s = 0, o = i.length; s < o; ++s) r = i[s][t.axis], W(r) && n.push(r);
            return n
        }
        getMaxOverflow() {
            return !1
        }
        getLabelAndValue(t) {
            let i = this._cachedMeta,
                n = i.iScale,
                s = i.vScale,
                o = this.getParsed(t);
            return {
                label: n ? "" + n.getLabelForValue(o[n.axis]) : "",
                value: s ? "" + s.getLabelForValue(o[s.axis]) : ""
            }
        }
        _update(t) {
            let i = this._cachedMeta;
            this.update(t || "default"), i._clip = c_(O(this.options.clip, l_(i.xScale, i.yScale, this.getMaxOverflow())))
        }
        update(t) {}
        draw() {
            let t = this._ctx,
                i = this.chart,
                n = this._cachedMeta,
                s = n.data || [],
                o = i.chartArea,
                r = [],
                a = this._drawStart || 0,
                l = this._drawCount || s.length - a,
                c = this.options.drawActiveElementsOnTop,
                h;
            for (n.dataset && n.dataset.draw(t, o, a, l), h = a; h < a + l; ++h) {
                let u = s[h];
                u.hidden || (u.active && c ? r.push(u) : u.draw(t, o))
            }
            for (h = 0; h < r.length; ++h) r[h].draw(t, o)
        }
        getStyle(t, i) {
            let n = i ? "active" : "default";
            return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n)
        }
        getContext(t, i, n) {
            let s = this.getDataset(),
                o;
            if (t >= 0 && t < this._cachedMeta.data.length) {
                let r = this._cachedMeta.data[t];
                o = r.$context || (r.$context = p_(this.getContext(), t, r)), o.parsed = this.getParsed(t), o.raw = s.data[t], o.index = o.dataIndex = t
            } else o = this.$context || (this.$context = g_(this.chart.getContext(), this.index)), o.dataset = s, o.index = o.datasetIndex = this.index;
            return o.active = !!i, o.mode = n, o
        }
        resolveDatasetElementOptions(t) {
            return this._resolveElementOptions(this.datasetElementType.id, t)
        }
        resolveDataElementOptions(t, i) {
            return this._resolveElementOptions(this.dataElementType.id, i, t)
        }
        _resolveElementOptions(t, i = "default", n) {
            let s = i === "active",
                o = this._cachedDataOpts,
                r = t + "-" + i,
                a = o[r],
                l = this.enableOptionSharing && oe(n);
            if (a) return gc(a, l);
            let c = this.chart.config,
                h = c.datasetElementScopeKeys(this._type, t),
                u = s ? [`${t}Hover`, "hover", t, ""] : [t, ""],
                d = c.getOptionScopes(this.getDataset(), h),
                f = Object.keys(q.elements[t]),
                g = () => this.getContext(n, s, i),
                p = c.resolveNamedOptions(d, f, g, u);
            return p.$shared && (p.$shared = l, o[r] = Object.freeze(gc(p, l))), p
        }
        _resolveAnimations(t, i, n) {
            let s = this.chart,
                o = this._cachedDataOpts,
                r = `animation-${i}`,
                a = o[r];
            if (a) return a;
            let l;
            if (s.options.animation !== !1) {
                let h = this.chart.config,
                    u = h.datasetAnimationScopeKeys(this._type, i),
                    d = h.getOptionScopes(this.getDataset(), u);
                l = h.createResolver(d, this.getContext(t, n, i))
            }
            let c = new Fi(s, l && l.animations);
            return l && l._cacheable && (o[r] = Object.freeze(c)), c
        }
        getSharedOptions(t) {
            if (t.$shared) return this._sharedOptions || (this._sharedOptions = Object.assign({}, t))
        }
        includeOptions(t, i) {
            return !i || ns(t) || this.chart._animationsDisabled
        }
        _getSharedOptions(t, i) {
            let n = this.resolveDataElementOptions(t, i),
                s = this._sharedOptions,
                o = this.getSharedOptions(n),
                r = this.includeOptions(i, o) || o !== s;
            return this.updateSharedOptions(o, i, n), {
                sharedOptions: o,
                includeOptions: r
            }
        }
        updateElement(t, i, n, s) {
            ns(s) ? Object.assign(t, n) : this._resolveAnimations(i, s).update(t, n)
        }
        updateSharedOptions(t, i, n) {
            t && !ns(i) && this._resolveAnimations(void 0, i).update(t, n)
        }
        _setStyle(t, i, n, s) {
            t.active = s;
            let o = this.getStyle(i, s);
            this._resolveAnimations(i, n, s).update(t, {
                options: !s && this.getSharedOptions(o) || o
            })
        }
        removeHoverStyle(t, i, n) {
            this._setStyle(t, n, "active", !1)
        }
        setHoverStyle(t, i, n) {
            this._setStyle(t, n, "active", !0)
        }
        _removeDatasetHoverStyle() {
            let t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !1)
        }
        _setDatasetHoverStyle() {
            let t = this._cachedMeta.dataset;
            t && this._setStyle(t, void 0, "active", !0)
        }
        _resyncElements(t) {
            let i = this._data,
                n = this._cachedMeta.data;
            for (let [a, l, c] of this._syncList) this[a](l, c);
            this._syncList = [];
            let s = n.length,
                o = i.length,
                r = Math.min(o, s);
            r && this.parse(0, r), o > s ? this._insertElements(s, o - s, t) : o < s && this._removeElements(o, s - o)
        }
        _insertElements(t, i, n = !0) {
            let s = this._cachedMeta,
                o = s.data,
                r = t + i,
                a, l = c => {
                    for (c.length += i, a = c.length - 1; a >= r; a--) c[a] = c[a - i]
                };
            for (l(o), a = t; a < r; ++a) o[a] = new this.dataElementType;
            this._parsing && l(s._parsed), this.parse(t, i), n && this.updateElements(o, t, i, "reset")
        }
        updateElements(t, i, n, s) {}
        _removeElements(t, i) {
            let n = this._cachedMeta;
            if (this._parsing) {
                let s = n._parsed.splice(t, i);
                n._stacked && He(n, s)
            }
            n.data.splice(t, i)
        }
        _sync(t) {
            if (this._parsing) this._syncList.push(t);
            else {
                let [i, n, s] = t;
                this[i](n, s)
            }
            this.chart._dataChanges.push([this.index, ...t])
        }
        _onDataPush() {
            let t = arguments.length;
            this._sync(["_insertElements", this.getDataset().data.length - t, t])
        }
        _onDataPop() {
            this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1])
        }
        _onDataShift() {
            this._sync(["_removeElements", 0, 1])
        }
        _onDataSplice(t, i) {
            i && this._sync(["_removeElements", t, i]);
            let n = arguments.length - 2;
            n && this._sync(["_insertElements", t, n])
        }
        _onDataUnshift() {
            this._sync(["_insertElements", 0, arguments.length])
        }
    };

function b_(e, t) {
    if (!e._cache.$bar) {
        let i = e.getMatchingVisibleMetas(t),
            n = [];
        for (let s = 0, o = i.length; s < o; s++) n = n.concat(i[s].controller.getAllParsedValues(e));
        e._cache.$bar = zn(n.sort((s, o) => s - o))
    }
    return e._cache.$bar
}

function __(e) {
    let t = e.iScale,
        i = b_(t, e.type),
        n = t._length,
        s, o, r, a, l = () => {
            r === 32767 || r === -32768 || (oe(a) && (n = Math.min(n, Math.abs(r - a) || n)), a = r)
        };
    for (s = 0, o = i.length; s < o; ++s) r = t.getPixelForValue(i[s]), l();
    for (a = void 0, s = 0, o = t.ticks.length; s < o; ++s) r = t.getPixelForTick(s), l();
    return n
}

function x_(e, t, i, n) {
    let s = i.barThickness,
        o, r;
    return E(s) ? (o = t.min * i.categoryPercentage, r = i.barPercentage) : (o = s * n, r = 1), {
        chunk: o / n,
        ratio: r,
        start: t.pixels[e] - o / 2
    }
}

function y_(e, t, i, n) {
    let s = t.pixels,
        o = s[e],
        r = e > 0 ? s[e - 1] : null,
        a = e < s.length - 1 ? s[e + 1] : null,
        l = i.categoryPercentage;
    r === null && (r = o - (a === null ? t.end - t.start : a - o)), a === null && (a = o + o - r);
    let c = o - (o - Math.min(r, a)) / 2 * l;
    return {
        chunk: Math.abs(a - r) / 2 * l / n,
        ratio: i.barPercentage,
        start: c
    }
}

function v_(e, t, i, n) {
    let s = i.parse(e[0], n),
        o = i.parse(e[1], n),
        r = Math.min(s, o),
        a = Math.max(s, o),
        l = r,
        c = a;
    Math.abs(r) > Math.abs(a) && (l = a, c = r), t[i.axis] = c, t._custom = {
        barStart: l,
        barEnd: c,
        start: s,
        end: o,
        min: r,
        max: a
    }
}

function gh(e, t, i, n) {
    return z(e) ? v_(e, t, i, n) : t[i.axis] = i.parse(e, n), t
}

function pc(e, t, i, n) {
    let s = e.iScale,
        o = e.vScale,
        r = s.getLabels(),
        a = s === o,
        l = [],
        c, h, u, d;
    for (c = i, h = i + n; c < h; ++c) d = t[c], u = {}, u[s.axis] = a || s.parse(r[c], c), l.push(gh(d, u, o, c));
    return l
}

function ss(e) {
    return e && e.barStart !== void 0 && e.barEnd !== void 0
}

function M_(e, t, i) {
    return e !== 0 ? ct(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= i ? 1 : -1)
}

function S_(e) {
    let t, i, n, s, o;
    return e.horizontal ? (t = e.base > e.x, i = "left", n = "right") : (t = e.base < e.y, i = "bottom", n = "top"), t ? (s = "end", o = "start") : (s = "start", o = "end"), {
        start: i,
        end: n,
        reverse: t,
        top: s,
        bottom: o
    }
}

function w_(e, t, i, n) {
    let s = t.borderSkipped,
        o = {};
    if (!s) {
        e.borderSkipped = o;
        return
    }
    if (s === !0) {
        e.borderSkipped = {
            top: !0,
            right: !0,
            bottom: !0,
            left: !0
        };
        return
    }
    let {
        start: r,
        end: a,
        reverse: l,
        top: c,
        bottom: h
    } = S_(e);
    s === "middle" && i && (e.enableBorderRadius = !0, (i._top || 0) === n ? s = c : (i._bottom || 0) === n ? s = h : (o[mc(h, r, a, l)] = !0, s = c)), o[mc(s, r, a, l)] = !0, e.borderSkipped = o
}

function mc(e, t, i, n) {
    return n ? (e = k_(e, t, i), e = bc(e, i, t)) : e = bc(e, t, i), e
}

function k_(e, t, i) {
    return e === t ? i : e === i ? t : e
}

function bc(e, t, i) {
    return e === "start" ? t : e === "end" ? i : e
}

function P_(e, {
    inflateAmount: t
}, i) {
    e.inflateAmount = t === "auto" ? i === 1 ? .33 : 0 : t
}
var zi = class extends Rt {
    static id = "bar";
    static defaults = {
        datasetElementType: !1,
        dataElementType: "bar",
        categoryPercentage: .8,
        barPercentage: .9,
        grouped: !0,
        animations: {
            numbers: {
                type: "number",
                properties: ["x", "y", "base", "width", "height"]
            }
        }
    };
    static overrides = {
        scales: {
            _index_: {
                type: "category",
                offset: !0,
                grid: {
                    offset: !0
                }
            },
            _value_: {
                type: "linear",
                beginAtZero: !0
            }
        }
    };
    parsePrimitiveData(t, i, n, s) {
        return pc(t, i, n, s)
    }
    parseArrayData(t, i, n, s) {
        return pc(t, i, n, s)
    }
    parseObjectData(t, i, n, s) {
        let {
            iScale: o,
            vScale: r
        } = t, {
            xAxisKey: a = "x",
            yAxisKey: l = "y"
        } = this._parsing, c = o.axis === "x" ? a : l, h = r.axis === "x" ? a : l, u = [], d, f, g, p;
        for (d = n, f = n + s; d < f; ++d) p = i[d], g = {}, g[o.axis] = o.parse(xt(p, c), d), u.push(gh(xt(p, h), g, r, d));
        return u
    }
    updateRangeFromParsed(t, i, n, s) {
        super.updateRangeFromParsed(t, i, n, s);
        let o = n._custom;
        o && i === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max))
    }
    getMaxOverflow() {
        return 0
    }
    getLabelAndValue(t) {
        let i = this._cachedMeta,
            {
                iScale: n,
                vScale: s
            } = i,
            o = this.getParsed(t),
            r = o._custom,
            a = ss(r) ? "[" + r.start + ", " + r.end + "]" : "" + s.getLabelForValue(o[s.axis]);
        return {
            label: "" + n.getLabelForValue(o[n.axis]),
            value: a
        }
    }
    initialize() {
        this.enableOptionSharing = !0, super.initialize();
        let t = this._cachedMeta;
        t.stack = this.getDataset().stack
    }
    update(t) {
        let i = this._cachedMeta;
        this.updateElements(i.data, 0, i.data.length, t)
    }
    updateElements(t, i, n, s) {
        let o = s === "reset",
            {
                index: r,
                _cachedMeta: {
                    vScale: a
                }
            } = this,
            l = a.getBasePixel(),
            c = a.isHorizontal(),
            h = this._getRuler(),
            {
                sharedOptions: u,
                includeOptions: d
            } = this._getSharedOptions(i, s);
        for (let f = i; f < i + n; f++) {
            let g = this.getParsed(f),
                p = o || E(g[a.axis]) ? {
                    base: l,
                    head: l
                } : this._calculateBarValuePixels(f),
                m = this._calculateBarIndexPixels(f, h),
                b = (g._stacks || {})[a.axis],
                _ = {
                    horizontal: c,
                    base: p.base,
                    enableBorderRadius: !b || ss(g._custom) || r === b._top || r === b._bottom,
                    x: c ? p.head : m.center,
                    y: c ? m.center : p.head,
                    height: c ? m.size : Math.abs(p.size),
                    width: c ? Math.abs(p.size) : m.size
                };
            d && (_.options = u || this.resolveDataElementOptions(f, t[f].active ? "active" : s));
            let v = _.options || t[f].options;
            w_(_, v, b, r), P_(_, v, h.ratio), this.updateElement(t[f], f, _, s)
        }
    }
    _getStacks(t, i) {
        let {
            iScale: n
        } = this._cachedMeta, s = n.getMatchingVisibleMetas(this._type).filter(l => l.controller.options.grouped), o = n.options.stacked, r = [], a = l => {
            let c = l.controller.getParsed(i),
                h = c && c[l.vScale.axis];
            if (E(h) || isNaN(h)) return !0
        };
        for (let l of s)
            if (!(i !== void 0 && a(l)) && ((o === !1 || r.indexOf(l.stack) === -1 || o === void 0 && l.stack === void 0) && r.push(l.stack), l.index === t)) break;
        return r.length || r.push(void 0), r
    }
    _getStackCount(t) {
        return this._getStacks(void 0, t).length
    }
    _getStackIndex(t, i, n) {
        let s = this._getStacks(t, n),
            o = i !== void 0 ? s.indexOf(i) : -1;
        return o === -1 ? s.length - 1 : o
    }
    _getRuler() {
        let t = this.options,
            i = this._cachedMeta,
            n = i.iScale,
            s = [],
            o, r;
        for (o = 0, r = i.data.length; o < r; ++o) s.push(n.getPixelForValue(this.getParsed(o)[n.axis], o));
        let a = t.barThickness;
        return {
            min: a || __(i),
            pixels: s,
            start: n._startPixel,
            end: n._endPixel,
            stackCount: this._getStackCount(),
            scale: n,
            grouped: t.grouped,
            ratio: a ? 1 : t.categoryPercentage * t.barPercentage
        }
    }
    _calculateBarValuePixels(t) {
        let {
            _cachedMeta: {
                vScale: i,
                _stacked: n,
                index: s
            },
            options: {
                base: o,
                minBarLength: r
            }
        } = this, a = o || 0, l = this.getParsed(t), c = l._custom, h = ss(c), u = l[i.axis], d = 0, f = n ? this.applyStack(i, l, n) : u, g, p;
        f !== u && (d = f - u, f = u), h && (u = c.barStart, f = c.barEnd - c.barStart, u !== 0 && ct(u) !== ct(c.barEnd) && (d = 0), d += u);
        let m = !E(o) && !h ? o : d,
            b = i.getPixelForValue(m);
        if (this.chart.getDataVisibility(t) ? g = i.getPixelForValue(d + f) : g = b, p = g - b, Math.abs(p) < r) {
            p = M_(p, i, a) * r, u === a && (b -= p / 2);
            let _ = i.getPixelForDecimal(0),
                v = i.getPixelForDecimal(1),
                M = Math.min(_, v),
                y = Math.max(_, v);
            b = Math.max(Math.min(b, y), M), g = b + p, n && !h && (l._stacks[i.axis]._visualValues[s] = i.getValueForPixel(g) - i.getValueForPixel(b))
        }
        if (b === i.getPixelForValue(a)) {
            let _ = ct(p) * i.getLineWidthForValue(a) / 2;
            b += _, p -= _
        }
        return {
            size: p,
            base: b,
            head: g,
            center: g + p / 2
        }
    }
    _calculateBarIndexPixels(t, i) {
        let n = i.scale,
            s = this.options,
            o = s.skipNull,
            r = O(s.maxBarThickness, 1 / 0),
            a, l;
        if (i.grouped) {
            let c = o ? this._getStackCount(t) : i.stackCount,
                h = s.barThickness === "flex" ? y_(t, i, s, c) : x_(t, i, s, c),
                u = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0);
            a = h.start + h.chunk * u + h.chunk / 2, l = Math.min(r, h.chunk * h.ratio)
        } else a = n.getPixelForValue(this.getParsed(t)[n.axis], t), l = Math.min(r, i.min * i.ratio);
        return {
            base: a - l / 2,
            head: a + l / 2,
            center: a,
            size: l
        }
    }
    draw() {
        let t = this._cachedMeta,
            i = t.vScale,
            n = t.data,
            s = n.length,
            o = 0;
        for (; o < s; ++o) this.getParsed(o)[i.axis] !== null && n[o].draw(this._ctx)
    }
};

function O_(e, t, i) {
    let n = 1,
        s = 1,
        o = 0,
        r = 0;
    if (t < B) {
        let a = e,
            l = a + t,
            c = Math.cos(a),
            h = Math.sin(a),
            u = Math.cos(l),
            d = Math.sin(l),
            f = (v, M, y) => le(v, a, l, !0) ? 1 : Math.max(M, M * i, y, y * i),
            g = (v, M, y) => le(v, a, l, !0) ? -1 : Math.min(M, M * i, y, y * i),
            p = f(0, c, u),
            m = f(H, h, d),
            b = g(V, c, u),
            _ = g(V + H, h, d);
        n = (p - b) / 2, s = (m - _) / 2, o = -(p + b) / 2, r = -(m + _) / 2
    }
    return {
        ratioX: n,
        ratioY: s,
        offsetX: o,
        offsetY: r
    }
}
var Ke = class extends Rt {
        static id = "doughnut";
        static defaults = {
            datasetElementType: !1,
            dataElementType: "arc",
            animation: {
                animateRotate: !0,
                animateScale: !1
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"]
                }
            },
            cutout: "50%",
            rotation: 0,
            circumference: 360,
            radius: "100%",
            spacing: 0,
            indexAxis: "r"
        };
        static descriptors = {
            _scriptable: t => t !== "spacing",
            _indexable: t => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
        };
        static overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(t) {
                            let i = t.data;
                            if (i.labels.length && i.datasets.length) {
                                let {
                                    labels: {
                                        pointStyle: n,
                                        color: s
                                    }
                                } = t.legend.options;
                                return i.labels.map((o, r) => {
                                    let l = t.getDatasetMeta(0).controller.getStyle(r);
                                    return {
                                        text: o,
                                        fillStyle: l.backgroundColor,
                                        strokeStyle: l.borderColor,
                                        fontColor: s,
                                        lineWidth: l.borderWidth,
                                        pointStyle: n,
                                        hidden: !t.getDataVisibility(r),
                                        index: r
                                    }
                                })
                            }
                            return []
                        }
                    },
                    onClick(t, i, n) {
                        n.chart.toggleDataVisibility(i.index), n.chart.update()
                    }
                }
            }
        };
        constructor(t, i) {
            super(t, i), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0
        }
        linkScales() {}
        parse(t, i) {
            let n = this.getDataset().data,
                s = this._cachedMeta;
            if (this._parsing === !1) s._parsed = n;
            else {
                let o = l => +n[l];
                if (D(n[t])) {
                    let {
                        key: l = "value"
                    } = this._parsing;
                    o = c => +xt(n[c], l)
                }
                let r, a;
                for (r = t, a = t + i; r < a; ++r) s._parsed[r] = o(r)
            }
        }
        _getRotation() {
            return rt(this.options.rotation - 90)
        }
        _getCircumference() {
            return rt(this.options.circumference)
        }
        _getRotationExtents() {
            let t = B,
                i = -B;
            for (let n = 0; n < this.chart.data.datasets.length; ++n)
                if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
                    let s = this.chart.getDatasetMeta(n).controller,
                        o = s._getRotation(),
                        r = s._getCircumference();
                    t = Math.min(t, o), i = Math.max(i, o + r)
                }
            return {
                rotation: t,
                circumference: i - t
            }
        }
        update(t) {
            let i = this.chart,
                {
                    chartArea: n
                } = i,
                s = this._cachedMeta,
                o = s.data,
                r = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing,
                a = Math.max((Math.min(n.width, n.height) - r) / 2, 0),
                l = Math.min(Ll(this.options.cutout, a), 1),
                c = this._getRingWeight(this.index),
                {
                    circumference: h,
                    rotation: u
                } = this._getRotationExtents(),
                {
                    ratioX: d,
                    ratioY: f,
                    offsetX: g,
                    offsetY: p
                } = O_(u, h, l),
                m = (n.width - r) / d,
                b = (n.height - r) / f,
                _ = Math.max(Math.min(m, b) / 2, 0),
                v = Dn(this.options.radius, _),
                M = Math.max(v * l, 0),
                y = (v - M) / this._getVisibleDatasetWeightTotal();
            this.offsetX = g * v, this.offsetY = p * v, s.total = this.calculateTotal(), this.outerRadius = v - y * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - y * c, 0), this.updateElements(o, 0, o.length, t)
        }
        _circumference(t, i) {
            let n = this.options,
                s = this._cachedMeta,
                o = this._getCircumference();
            return i && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * o / B)
        }
        updateElements(t, i, n, s) {
            let o = s === "reset",
                r = this.chart,
                a = r.chartArea,
                c = r.options.animation,
                h = (a.left + a.right) / 2,
                u = (a.top + a.bottom) / 2,
                d = o && c.animateScale,
                f = d ? 0 : this.innerRadius,
                g = d ? 0 : this.outerRadius,
                {
                    sharedOptions: p,
                    includeOptions: m
                } = this._getSharedOptions(i, s),
                b = this._getRotation(),
                _;
            for (_ = 0; _ < i; ++_) b += this._circumference(_, o);
            for (_ = i; _ < i + n; ++_) {
                let v = this._circumference(_, o),
                    M = t[_],
                    y = {
                        x: h + this.offsetX,
                        y: u + this.offsetY,
                        startAngle: b,
                        endAngle: b + v,
                        circumference: v,
                        outerRadius: g,
                        innerRadius: f
                    };
                m && (y.options = p || this.resolveDataElementOptions(_, M.active ? "active" : s)), b += v, this.updateElement(M, _, y, s)
            }
        }
        calculateTotal() {
            let t = this._cachedMeta,
                i = t.data,
                n = 0,
                s;
            for (s = 0; s < i.length; s++) {
                let o = t._parsed[s];
                o !== null && !isNaN(o) && this.chart.getDataVisibility(s) && !i[s].hidden && (n += Math.abs(o))
            }
            return n
        }
        calculateCircumference(t) {
            let i = this._cachedMeta.total;
            return i > 0 && !isNaN(t) ? B * (Math.abs(t) / i) : 0
        }
        getLabelAndValue(t) {
            let i = this._cachedMeta,
                n = this.chart,
                s = n.data.labels || [],
                o = ce(i._parsed[t], n.options.locale);
            return {
                label: s[t] || "",
                value: o
            }
        }
        getMaxBorderWidth(t) {
            let i = 0,
                n = this.chart,
                s, o, r, a, l;
            if (!t) {
                for (s = 0, o = n.data.datasets.length; s < o; ++s)
                    if (n.isDatasetVisible(s)) {
                        r = n.getDatasetMeta(s), t = r.data, a = r.controller;
                        break
                    }
            }
            if (!t) return 0;
            for (s = 0, o = t.length; s < o; ++s) l = a.resolveDataElementOptions(s), l.borderAlign !== "inner" && (i = Math.max(i, l.borderWidth || 0, l.hoverBorderWidth || 0));
            return i
        }
        getMaxOffset(t) {
            let i = 0;
            for (let n = 0, s = t.length; n < s; ++n) {
                let o = this.resolveDataElementOptions(n);
                i = Math.max(i, o.offset || 0, o.hoverOffset || 0)
            }
            return i
        }
        _getRingWeightOffset(t) {
            let i = 0;
            for (let n = 0; n < t; ++n) this.chart.isDatasetVisible(n) && (i += this._getRingWeight(n));
            return i
        }
        _getRingWeight(t) {
            return Math.max(O(this.chart.data.datasets[t].weight, 1), 0)
        }
        _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1
        }
    },
    Bi = class extends Rt {
        static id = "line";
        static defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            showLine: !0,
            spanGaps: !1
        };
        static overrides = {
            scales: {
                _index_: {
                    type: "category"
                },
                _value_: {
                    type: "linear"
                }
            }
        };
        initialize() {
            this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize()
        }
        update(t) {
            let i = this._cachedMeta,
                {
                    dataset: n,
                    data: s = [],
                    _dataset: o
                } = i,
                r = this.chart._animationsDisabled,
                {
                    start: a,
                    count: l
                } = ql(i, s, r);
            this._drawStart = a, this._drawCount = l, $l(i) && (a = 0, l = s.length), n._chart = this.chart, n._datasetIndex = this.index, n._decimated = !!o._decimated, n.points = s;
            let c = this.resolveDatasetElementOptions(t);
            this.options.showLine || (c.borderWidth = 0), c.segment = this.options.segment, this.updateElement(n, void 0, {
                animated: !r,
                options: c
            }, t), this.updateElements(s, a, l, t)
        }
        updateElements(t, i, n, s) {
            let o = s === "reset",
                {
                    iScale: r,
                    vScale: a,
                    _stacked: l,
                    _dataset: c
                } = this._cachedMeta,
                {
                    sharedOptions: h,
                    includeOptions: u
                } = this._getSharedOptions(i, s),
                d = r.axis,
                f = a.axis,
                {
                    spanGaps: g,
                    segment: p
                } = this.options,
                m = ae(g) ? g : Number.POSITIVE_INFINITY,
                b = this.chart._animationsDisabled || o || s === "none",
                _ = i + n,
                v = t.length,
                M = i > 0 && this.getParsed(i - 1);
            for (let y = 0; y < v; ++y) {
                let w = t[y],
                    k = b ? w : {};
                if (y < i || y >= _) {
                    k.skip = !0;
                    continue
                }
                let S = this.getParsed(y),
                    P = E(S[f]),
                    A = k[d] = r.getPixelForValue(S[d], y),
                    C = k[f] = o || P ? a.getBasePixel() : a.getPixelForValue(l ? this.applyStack(a, S, l) : S[f], y);
                k.skip = isNaN(A) || isNaN(C) || P, k.stop = y > 0 && Math.abs(S[d] - M[d]) > m, p && (k.parsed = S, k.raw = c.data[y]), u && (k.options = h || this.resolveDataElementOptions(y, w.active ? "active" : s)), b || this.updateElement(w, y, k, s), M = S
            }
        }
        getMaxOverflow() {
            let t = this._cachedMeta,
                i = t.dataset,
                n = i.options && i.options.borderWidth || 0,
                s = t.data || [];
            if (!s.length) return n;
            let o = s[0].size(this.resolveDataElementOptions(0)),
                r = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1));
            return Math.max(n, o, r) / 2
        }
        draw() {
            let t = this._cachedMeta;
            t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw()
        }
    },
    ji = class extends Rt {
        static id = "polarArea";
        static defaults = {
            dataElementType: "arc",
            animation: {
                animateRotate: !0,
                animateScale: !0
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"]
                }
            },
            indexAxis: "r",
            startAngle: 0
        };
        static overrides = {
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        generateLabels(t) {
                            let i = t.data;
                            if (i.labels.length && i.datasets.length) {
                                let {
                                    labels: {
                                        pointStyle: n,
                                        color: s
                                    }
                                } = t.legend.options;
                                return i.labels.map((o, r) => {
                                    let l = t.getDatasetMeta(0).controller.getStyle(r);
                                    return {
                                        text: o,
                                        fillStyle: l.backgroundColor,
                                        strokeStyle: l.borderColor,
                                        fontColor: s,
                                        lineWidth: l.borderWidth,
                                        pointStyle: n,
                                        hidden: !t.getDataVisibility(r),
                                        index: r
                                    }
                                })
                            }
                            return []
                        }
                    },
                    onClick(t, i, n) {
                        n.chart.toggleDataVisibility(i.index), n.chart.update()
                    }
                }
            },
            scales: {
                r: {
                    type: "radialLinear",
                    angleLines: {
                        display: !1
                    },
                    beginAtZero: !0,
                    grid: {
                        circular: !0
                    },
                    pointLabels: {
                        display: !1
                    },
                    startAngle: 0
                }
            }
        };
        constructor(t, i) {
            super(t, i), this.innerRadius = void 0, this.outerRadius = void 0
        }
        getLabelAndValue(t) {
            let i = this._cachedMeta,
                n = this.chart,
                s = n.data.labels || [],
                o = ce(i._parsed[t].r, n.options.locale);
            return {
                label: s[t] || "",
                value: o
            }
        }
        parseObjectData(t, i, n, s) {
            return Xn.bind(this)(t, i, n, s)
        }
        update(t) {
            let i = this._cachedMeta.data;
            this._updateRadius(), this.updateElements(i, 0, i.length, t)
        }
        getMinMax() {
            let t = this._cachedMeta,
                i = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
            return t.data.forEach((n, s) => {
                let o = this.getParsed(s).r;
                !isNaN(o) && this.chart.getDataVisibility(s) && (o < i.min && (i.min = o), o > i.max && (i.max = o))
            }), i
        }
        _updateRadius() {
            let t = this.chart,
                i = t.chartArea,
                n = t.options,
                s = Math.min(i.right - i.left, i.bottom - i.top),
                o = Math.max(s / 2, 0),
                r = Math.max(n.cutoutPercentage ? o / 100 * n.cutoutPercentage : 1, 0),
                a = (o - r) / t.getVisibleDatasetCount();
            this.outerRadius = o - a * this.index, this.innerRadius = this.outerRadius - a
        }
        updateElements(t, i, n, s) {
            let o = s === "reset",
                r = this.chart,
                l = r.options.animation,
                c = this._cachedMeta.rScale,
                h = c.xCenter,
                u = c.yCenter,
                d = c.getIndexAngle(0) - .5 * V,
                f = d,
                g, p = 360 / this.countVisibleElements();
            for (g = 0; g < i; ++g) f += this._computeAngle(g, s, p);
            for (g = i; g < i + n; g++) {
                let m = t[g],
                    b = f,
                    _ = f + this._computeAngle(g, s, p),
                    v = r.getDataVisibility(g) ? c.getDistanceFromCenterForValue(this.getParsed(g).r) : 0;
                f = _, o && (l.animateScale && (v = 0), l.animateRotate && (b = _ = d));
                let M = {
                    x: h,
                    y: u,
                    innerRadius: 0,
                    outerRadius: v,
                    startAngle: b,
                    endAngle: _,
                    options: this.resolveDataElementOptions(g, m.active ? "active" : s)
                };
                this.updateElement(m, g, M, s)
            }
        }
        countVisibleElements() {
            let t = this._cachedMeta,
                i = 0;
            return t.data.forEach((n, s) => {
                !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && i++
            }), i
        }
        _computeAngle(t, i, n) {
            return this.chart.getDataVisibility(t) ? rt(this.resolveDataElementOptions(t, i).angle || n) : 0
        }
    },
    Vi = class extends Ke {
        static id = "pie";
        static defaults = {
            cutout: 0,
            rotation: 0,
            circumference: 360,
            radius: "100%"
        }
    },
    Ni = class extends Rt {
        static id = "radar";
        static defaults = {
            datasetElementType: "line",
            dataElementType: "point",
            indexAxis: "r",
            showLine: !0,
            elements: {
                line: {
                    fill: "start"
                }
            }
        };
        static overrides = {
            aspectRatio: 1,
            scales: {
                r: {
                    type: "radialLinear"
                }
            }
        };
        getLabelAndValue(t) {
            let i = this._cachedMeta.vScale,
                n = this.getParsed(t);
            return {
                label: i.getLabels()[t],
                value: "" + i.getLabelForValue(n[i.axis])
            }
        }
        parseObjectData(t, i, n, s) {
            return Xn.bind(this)(t, i, n, s)
        }
        update(t) {
            let i = this._cachedMeta,
                n = i.dataset,
                s = i.data || [],
                o = i.iScale.getLabels();
            if (n.points = s, t !== "resize") {
                let r = this.resolveDatasetElementOptions(t);
                this.options.showLine || (r.borderWidth = 0);
                let a = {
                    _loop: !0,
                    _fullLoop: o.length === s.length,
                    options: r
                };
                this.updateElement(n, void 0, a, t)
            }
            this.updateElements(s, 0, s.length, t)
        }
        updateElements(t, i, n, s) {
            let o = this._cachedMeta.rScale,
                r = s === "reset";
            for (let a = i; a < i + n; a++) {
                let l = t[a],
                    c = this.resolveDataElementOptions(a, l.active ? "active" : s),
                    h = o.getPointPositionForValue(a, this.getParsed(a).r),
                    u = r ? o.xCenter : h.x,
                    d = r ? o.yCenter : h.y,
                    f = {
                        x: u,
                        y: d,
                        angle: h.angle,
                        skip: isNaN(u) || isNaN(d),
                        options: c
                    };
                this.updateElement(l, a, f, s)
            }
        }
    };

function Vt() {
    throw new Error("This method is not implemented: Check that a complete date adapter is provided.")
}
var fs = class e {
        static override(t) {
            Object.assign(e.prototype, t)
        }
        options;
        constructor(t) {
            this.options = t || {}
        }
        init() {}
        formats() {
            return Vt()
        }
        parse() {
            return Vt()
        }
        format() {
            return Vt()
        }
        add() {
            return Vt()
        }
        diff() {
            return Vt()
        }
        startOf() {
            return Vt()
        }
        endOf() {
            return Vt()
        }
    },
    C_ = {
        _date: fs
    };

function A_(e, t, i, n) {
    let {
        controller: s,
        data: o,
        _sorted: r
    } = e, a = s._cachedMeta.iScale;
    if (a && t === a.axis && t !== "r" && r && o.length) {
        let l = a._reversePixels ? Bl : Ot;
        if (n) {
            if (s._sharedOptions) {
                let c = o[0],
                    h = typeof c.getRange == "function" && c.getRange(t);
                if (h) {
                    let u = l(o, t, i - h),
                        d = l(o, t, i + h);
                    return {
                        lo: u.lo,
                        hi: d.hi
                    }
                }
            }
        } else return l(o, t, i)
    }
    return {
        lo: 0,
        hi: o.length - 1
    }
}

function Qe(e, t, i, n, s) {
    let o = e.getSortedVisibleDatasetMetas(),
        r = i[t];
    for (let a = 0, l = o.length; a < l; ++a) {
        let {
            index: c,
            data: h
        } = o[a], {
            lo: u,
            hi: d
        } = A_(o[a], t, r, s);
        for (let f = u; f <= d; ++f) {
            let g = h[f];
            g.skip || n(g, c, f)
        }
    }
}

function D_(e) {
    let t = e.indexOf("x") !== -1,
        i = e.indexOf("y") !== -1;
    return function(n, s) {
        let o = t ? Math.abs(n.x - s.x) : 0,
            r = i ? Math.abs(n.y - s.y) : 0;
        return Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2))
    }
}

function os(e, t, i, n, s) {
    let o = [];
    return !s && !e.isPointInArea(t) || Qe(e, i, t, function(a, l, c) {
        !s && !ut(a, e.chartArea, 0) || a.inRange(t.x, t.y, n) && o.push({
            element: a,
            datasetIndex: l,
            index: c
        })
    }, !0), o
}

function T_(e, t, i, n) {
    let s = [];

    function o(r, a, l) {
        let {
            startAngle: c,
            endAngle: h
        } = r.getProps(["startAngle", "endAngle"], n), {
            angle: u
        } = In(r, {
            x: t.x,
            y: t.y
        });
        le(u, c, h) && s.push({
            element: r,
            datasetIndex: a,
            index: l
        })
    }
    return Qe(e, i, t, o), s
}

function L_(e, t, i, n, s, o) {
    let r = [],
        a = D_(i),
        l = Number.POSITIVE_INFINITY;

    function c(h, u, d) {
        let f = h.inRange(t.x, t.y, s);
        if (n && !f) return;
        let g = h.getCenterPoint(s);
        if (!(!!o || e.isPointInArea(g)) && !f) return;
        let m = a(t, g);
        m < l ? (r = [{
            element: h,
            datasetIndex: u,
            index: d
        }], l = m) : m === l && r.push({
            element: h,
            datasetIndex: u,
            index: d
        })
    }
    return Qe(e, i, t, c), r
}

function rs(e, t, i, n, s, o) {
    return !o && !e.isPointInArea(t) ? [] : i === "r" && !n ? T_(e, t, i, s) : L_(e, t, i, n, s, o)
}

function _c(e, t, i, n, s) {
    let o = [],
        r = i === "x" ? "inXRange" : "inYRange",
        a = !1;
    return Qe(e, i, t, (l, c, h) => {
        l[r](t[i], s) && (o.push({
            element: l,
            datasetIndex: c,
            index: h
        }), a = a || l.inRange(t.x, t.y, s))
    }), n && !a ? [] : o
}
var E_ = {
        evaluateInteractionItems: Qe,
        modes: {
            index(e, t, i, n) {
                let s = Lt(t, e),
                    o = i.axis || "x",
                    r = i.includeInvisible || !1,
                    a = i.intersect ? os(e, s, o, n, r) : rs(e, s, o, !1, n, r),
                    l = [];
                return a.length ? (e.getSortedVisibleDatasetMetas().forEach(c => {
                    let h = a[0].index,
                        u = c.data[h];
                    u && !u.skip && l.push({
                        element: u,
                        datasetIndex: c.index,
                        index: h
                    })
                }), l) : []
            },
            dataset(e, t, i, n) {
                let s = Lt(t, e),
                    o = i.axis || "xy",
                    r = i.includeInvisible || !1,
                    a = i.intersect ? os(e, s, o, n, r) : rs(e, s, o, !1, n, r);
                if (a.length > 0) {
                    let l = a[0].datasetIndex,
                        c = e.getDatasetMeta(l).data;
                    a = [];
                    for (let h = 0; h < c.length; ++h) a.push({
                        element: c[h],
                        datasetIndex: l,
                        index: h
                    })
                }
                return a
            },
            point(e, t, i, n) {
                let s = Lt(t, e),
                    o = i.axis || "xy",
                    r = i.includeInvisible || !1;
                return os(e, s, o, n, r)
            },
            nearest(e, t, i, n) {
                let s = Lt(t, e),
                    o = i.axis || "xy",
                    r = i.includeInvisible || !1;
                return rs(e, s, o, i.intersect, n, r)
            },
            x(e, t, i, n) {
                let s = Lt(t, e);
                return _c(e, s, "x", i.intersect, n)
            },
            y(e, t, i, n) {
                let s = Lt(t, e);
                return _c(e, s, "y", i.intersect, n)
            }
        }
    },
    ph = ["left", "top", "right", "bottom"];

function We(e, t) {
    return e.filter(i => i.pos === t)
}

function xc(e, t) {
    return e.filter(i => ph.indexOf(i.pos) === -1 && i.box.axis === t)
}

function qe(e, t) {
    return e.sort((i, n) => {
        let s = t ? n : i,
            o = t ? i : n;
        return s.weight === o.weight ? s.index - o.index : s.weight - o.weight
    })
}

function R_(e) {
    let t = [],
        i, n, s, o, r, a;
    for (i = 0, n = (e || []).length; i < n; ++i) s = e[i], {
        position: o,
        options: {
            stack: r,
            stackWeight: a = 1
        }
    } = s, t.push({
        index: i,
        box: s,
        pos: o,
        horizontal: s.isHorizontal(),
        weight: s.weight,
        stack: r && o + r,
        stackWeight: a
    });
    return t
}

function I_(e) {
    let t = {};
    for (let i of e) {
        let {
            stack: n,
            pos: s,
            stackWeight: o
        } = i;
        if (!n || !ph.includes(s)) continue;
        let r = t[n] || (t[n] = {
            count: 0,
            placed: 0,
            weight: 0,
            size: 0
        });
        r.count++, r.weight += o
    }
    return t
}

function F_(e, t) {
    let i = I_(e),
        {
            vBoxMaxWidth: n,
            hBoxMaxHeight: s
        } = t,
        o, r, a;
    for (o = 0, r = e.length; o < r; ++o) {
        a = e[o];
        let {
            fullSize: l
        } = a.box, c = i[a.stack], h = c && a.stackWeight / c.weight;
        a.horizontal ? (a.width = h ? h * n : l && t.availableWidth, a.height = s) : (a.width = n, a.height = h ? h * s : l && t.availableHeight)
    }
    return i
}

function z_(e) {
    let t = R_(e),
        i = qe(t.filter(c => c.box.fullSize), !0),
        n = qe(We(t, "left"), !0),
        s = qe(We(t, "right")),
        o = qe(We(t, "top"), !0),
        r = qe(We(t, "bottom")),
        a = xc(t, "x"),
        l = xc(t, "y");
    return {
        fullSize: i,
        leftAndTop: n.concat(o),
        rightAndBottom: s.concat(l).concat(r).concat(a),
        chartArea: We(t, "chartArea"),
        vertical: n.concat(s).concat(l),
        horizontal: o.concat(r).concat(a)
    }
}

function yc(e, t, i, n) {
    return Math.max(e[i], t[i]) + Math.max(e[n], t[n])
}

function mh(e, t) {
    e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right)
}

function B_(e, t, i, n) {
    let {
        pos: s,
        box: o
    } = i, r = e.maxPadding;
    if (!D(s)) {
        i.size && (e[s] -= i.size);
        let u = n[i.stack] || {
            size: 0,
            count: 1
        };
        u.size = Math.max(u.size, i.horizontal ? o.height : o.width), i.size = u.size / u.count, e[s] += i.size
    }
    o.getPadding && mh(r, o.getPadding());
    let a = Math.max(0, t.outerWidth - yc(r, e, "left", "right")),
        l = Math.max(0, t.outerHeight - yc(r, e, "top", "bottom")),
        c = a !== e.w,
        h = l !== e.h;
    return e.w = a, e.h = l, i.horizontal ? {
        same: c,
        other: h
    } : {
        same: h,
        other: c
    }
}

function j_(e) {
    let t = e.maxPadding;

    function i(n) {
        let s = Math.max(t[n] - e[n], 0);
        return e[n] += s, s
    }
    e.y += i("top"), e.x += i("left"), i("right"), i("bottom")
}

function V_(e, t) {
    let i = t.maxPadding;

    function n(s) {
        let o = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        return s.forEach(r => {
            o[r] = Math.max(t[r], i[r])
        }), o
    }
    return n(e ? ["left", "right"] : ["top", "bottom"])
}

function Ye(e, t, i, n) {
    let s = [],
        o, r, a, l, c, h;
    for (o = 0, r = e.length, c = 0; o < r; ++o) {
        a = e[o], l = a.box, l.update(a.width || t.w, a.height || t.h, V_(a.horizontal, t));
        let {
            same: u,
            other: d
        } = B_(t, i, a, n);
        c |= u && s.length, h = h || d, l.fullSize || s.push(a)
    }
    return c && Ye(s, t, i, n) || h
}

function Ai(e, t, i, n, s) {
    e.top = i, e.left = t, e.right = t + n, e.bottom = i + s, e.width = n, e.height = s
}

function vc(e, t, i, n) {
    let s = i.padding,
        {
            x: o,
            y: r
        } = t;
    for (let a of e) {
        let l = a.box,
            c = n[a.stack] || {
                count: 1,
                placed: 0,
                weight: 1
            },
            h = a.stackWeight / c.weight || 1;
        if (a.horizontal) {
            let u = t.w * h,
                d = c.size || l.height;
            oe(c.start) && (r = c.start), l.fullSize ? Ai(l, s.left, r, i.outerWidth - s.right - s.left, d) : Ai(l, t.left + c.placed, r, u, d), c.start = r, c.placed += u, r = l.bottom
        } else {
            let u = t.h * h,
                d = c.size || l.width;
            oe(c.start) && (o = c.start), l.fullSize ? Ai(l, o, s.top, d, i.outerHeight - s.bottom - s.top) : Ai(l, o, t.top + c.placed, d, u), c.start = o, c.placed += u, o = l.right
        }
    }
    t.x = o, t.y = r
}
var at = {
        addBox(e, t) {
            e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
                return [{
                    z: 0,
                    draw(i) {
                        t.draw(i)
                    }
                }]
            }, e.boxes.push(t)
        },
        removeBox(e, t) {
            let i = e.boxes ? e.boxes.indexOf(t) : -1;
            i !== -1 && e.boxes.splice(i, 1)
        },
        configure(e, t, i) {
            t.fullSize = i.fullSize, t.position = i.position, t.weight = i.weight
        },
        update(e, t, i, n) {
            if (!e) return;
            let s = G(e.options.layout.padding),
                o = Math.max(t - s.width, 0),
                r = Math.max(i - s.height, 0),
                a = z_(e.boxes),
                l = a.vertical,
                c = a.horizontal;
            R(e.boxes, p => {
                typeof p.beforeLayout == "function" && p.beforeLayout()
            });
            let h = l.reduce((p, m) => m.box.options && m.box.options.display === !1 ? p : p + 1, 0) || 1,
                u = Object.freeze({
                    outerWidth: t,
                    outerHeight: i,
                    padding: s,
                    availableWidth: o,
                    availableHeight: r,
                    vBoxMaxWidth: o / 2 / h,
                    hBoxMaxHeight: r / 2
                }),
                d = Object.assign({}, s);
            mh(d, G(n));
            let f = Object.assign({
                    maxPadding: d,
                    w: o,
                    h: r,
                    x: s.left,
                    y: s.top
                }, s),
                g = F_(l.concat(c), u);
            Ye(a.fullSize, f, u, g), Ye(l, f, u, g), Ye(c, f, u, g) && Ye(l, f, u, g), j_(f), vc(a.leftAndTop, f, u, g), f.x += f.w, f.y += f.h, vc(a.rightAndBottom, f, u, g), e.chartArea = {
                left: f.left,
                top: f.top,
                right: f.left + f.w,
                bottom: f.top + f.h,
                height: f.h,
                width: f.w
            }, R(a.chartArea, p => {
                let m = p.box;
                Object.assign(m, e.chartArea), m.update(f.w, f.h, {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                })
            })
        }
    },
    Hi = class {
        acquireContext(t, i) {}
        releaseContext(t) {
            return !1
        }
        addEventListener(t, i, n) {}
        removeEventListener(t, i, n) {}
        getDevicePixelRatio() {
            return 1
        }
        getMaximumSize(t, i, n, s) {
            return i = Math.max(0, i || t.width), n = n || t.height, {
                width: i,
                height: Math.max(0, s ? Math.floor(i / s) : n)
            }
        }
        isAttached(t) {
            return !0
        }
        updateConfig(t) {}
    },
    gs = class extends Hi {
        acquireContext(t) {
            return t && t.getContext && t.getContext("2d") || null
        }
        updateConfig(t) {
            t.options.animation = !1
        }
    },
    Ri = "$chartjs",
    N_ = {
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup",
        pointerenter: "mouseenter",
        pointerdown: "mousedown",
        pointermove: "mousemove",
        pointerup: "mouseup",
        pointerleave: "mouseout",
        pointerout: "mouseout"
    },
    Mc = e => e === null || e === "";

function H_(e, t) {
    let i = e.style,
        n = e.getAttribute("height"),
        s = e.getAttribute("width");
    if (e[Ri] = {
            initial: {
                height: n,
                width: s,
                style: {
                    display: i.display,
                    height: i.height,
                    width: i.width
                }
            }
        }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Mc(s)) {
        let o = Zn(e, "width");
        o !== void 0 && (e.width = o)
    }
    if (Mc(n))
        if (e.style.height === "") e.height = e.width / (t || 2);
        else {
            let o = Zn(e, "height");
            o !== void 0 && (e.height = o)
        }
    return e
}
var bh = nc ? {
    passive: !0
} : !1;

function W_(e, t, i) {
    e.addEventListener(t, i, bh)
}

function q_(e, t, i) {
    e.canvas.removeEventListener(t, i, bh)
}

function $_(e, t) {
    let i = N_[e.type] || e.type,
        {
            x: n,
            y: s
        } = Lt(e, t);
    return {
        type: i,
        chart: t,
        native: e,
        x: n !== void 0 ? n : null,
        y: s !== void 0 ? s : null
    }
}

function Wi(e, t) {
    for (let i of e)
        if (i === t || i.contains(t)) return !0
}

function U_(e, t, i) {
    let n = e.canvas,
        s = new MutationObserver(o => {
            let r = !1;
            for (let a of o) r = r || Wi(a.addedNodes, n), r = r && !Wi(a.removedNodes, n);
            r && i()
        });
    return s.observe(document, {
        childList: !0,
        subtree: !0
    }), s
}

function Y_(e, t, i) {
    let n = e.canvas,
        s = new MutationObserver(o => {
            let r = !1;
            for (let a of o) r = r || Wi(a.removedNodes, n), r = r && !Wi(a.addedNodes, n);
            r && i()
        });
    return s.observe(document, {
        childList: !0,
        subtree: !0
    }), s
}
var Ge = new Map,
    Sc = 0;

function _h() {
    let e = window.devicePixelRatio;
    e !== Sc && (Sc = e, Ge.forEach((t, i) => {
        i.currentDevicePixelRatio !== e && t()
    }))
}

function X_(e, t) {
    Ge.size || window.addEventListener("resize", _h), Ge.set(e, t)
}

function K_(e) {
    Ge.delete(e), Ge.size || window.removeEventListener("resize", _h)
}

function G_(e, t, i) {
    let n = e.canvas,
        s = n && Oi(n);
    if (!s) return;
    let o = jn((a, l) => {
            let c = s.clientWidth;
            i(a, l), c < s.clientWidth && i()
        }, window),
        r = new ResizeObserver(a => {
            let l = a[0],
                c = l.contentRect.width,
                h = l.contentRect.height;
            c === 0 && h === 0 || o(c, h)
        });
    return r.observe(s), X_(e, o), r
}

function as(e, t, i) {
    i && i.disconnect(), t === "resize" && K_(e)
}

function Z_(e, t, i) {
    let n = e.canvas,
        s = jn(o => {
            e.ctx !== null && i($_(o, e))
        }, e);
    return W_(n, t, s), s
}
var ps = class extends Hi {
    acquireContext(t, i) {
        let n = t && t.getContext && t.getContext("2d");
        return n && n.canvas === t ? (H_(t, i), n) : null
    }
    releaseContext(t) {
        let i = t.canvas;
        if (!i[Ri]) return !1;
        let n = i[Ri].initial;
        ["height", "width"].forEach(o => {
            let r = n[o];
            E(r) ? i.removeAttribute(o) : i.setAttribute(o, r)
        });
        let s = n.style || {};
        return Object.keys(s).forEach(o => {
            i.style[o] = s[o]
        }), i.width = i.width, delete i[Ri], !0
    }
    addEventListener(t, i, n) {
        this.removeEventListener(t, i);
        let s = t.$proxies || (t.$proxies = {}),
            r = {
                attach: U_,
                detach: Y_,
                resize: G_
            }[i] || Z_;
        s[i] = r(t, i, n)
    }
    removeEventListener(t, i) {
        let n = t.$proxies || (t.$proxies = {}),
            s = n[i];
        if (!s) return;
        ({
            attach: as,
            detach: as,
            resize: as
        }[i] || q_)(t, i, s), n[i] = void 0
    }
    getDevicePixelRatio() {
        return window.devicePixelRatio
    }
    getMaximumSize(t, i, n, s) {
        return ic(t, i, n, s)
    }
    isAttached(t) {
        let i = Oi(t);
        return !!(i && i.isConnected)
    }
};

function J_(e) {
    return !Kn() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? gs : ps
}
var ht = class {
    static defaults = {};
    static defaultRoutes = void 0;
    x;
    y;
    active = !1;
    options;
    $animations;
    tooltipPosition(t) {
        let {
            x: i,
            y: n
        } = this.getProps(["x", "y"], t);
        return {
            x: i,
            y: n
        }
    }
    hasValue() {
        return ae(this.x) && ae(this.y)
    }
    getProps(t, i) {
        let n = this.$animations;
        if (!i || !n) return this;
        let s = {};
        return t.forEach(o => {
            s[o] = n[o] && n[o].active() ? n[o]._to : this[o]
        }), s
    }
};

function Q_(e, t) {
    let i = e.options.ticks,
        n = tx(e),
        s = Math.min(i.maxTicksLimit || n, n),
        o = i.major.enabled ? ix(t) : [],
        r = o.length,
        a = o[0],
        l = o[r - 1],
        c = [];
    if (r > s) return nx(t, c, o, r / s), c;
    let h = ex(o, t, s);
    if (r > 0) {
        let u, d, f = r > 1 ? Math.round((l - a) / (r - 1)) : null;
        for (Di(t, c, h, E(f) ? 0 : a - f, a), u = 0, d = r - 1; u < d; u++) Di(t, c, h, o[u], o[u + 1]);
        return Di(t, c, h, l, E(f) ? t.length : l + f), c
    }
    return Di(t, c, h), c
}

function tx(e) {
    let t = e.options.offset,
        i = e._tickSize(),
        n = e._length / i + (t ? 0 : 1),
        s = e._maxLength / i;
    return Math.floor(Math.min(n, s))
}

function ex(e, t, i) {
    let n = sx(e),
        s = t.length / i;
    if (!n) return Math.max(s, 1);
    let o = Il(n);
    for (let r = 0, a = o.length - 1; r < a; r++) {
        let l = o[r];
        if (l > s) return l
    }
    return Math.max(s, 1)
}

function ix(e) {
    let t = [],
        i, n;
    for (i = 0, n = e.length; i < n; i++) e[i].major && t.push(i);
    return t
}

function nx(e, t, i, n) {
    let s = 0,
        o = i[0],
        r;
    for (n = Math.ceil(n), r = 0; r < e.length; r++) r === o && (t.push(e[r]), s++, o = i[s * n])
}

function Di(e, t, i, n, s) {
    let o = O(n, 0),
        r = Math.min(O(s, e.length), e.length),
        a = 0,
        l, c, h;
    for (i = Math.ceil(i), s && (l = s - n, i = l / Math.floor(l / i)), h = o; h < 0;) a++, h = Math.round(o + a * i);
    for (c = Math.max(o, 0); c < r; c++) c === h && (t.push(e[c]), a++, h = Math.round(o + a * i))
}

function sx(e) {
    let t = e.length,
        i, n;
    if (t < 2) return !1;
    for (n = e[0], i = 1; i < t; ++i)
        if (e[i] - e[i - 1] !== n) return !1;
    return n
}
var ox = e => e === "left" ? "right" : e === "right" ? "left" : e,
    wc = (e, t, i) => t === "top" || t === "left" ? e[t] + i : e[t] - i,
    kc = (e, t) => Math.min(t || e, e);

function Pc(e, t) {
    let i = [],
        n = e.length / t,
        s = e.length,
        o = 0;
    for (; o < s; o += n) i.push(e[Math.floor(o)]);
    return i
}

function rx(e, t, i) {
    let n = e.ticks.length,
        s = Math.min(t, n - 1),
        o = e._startPixel,
        r = e._endPixel,
        a = 1e-6,
        l = e.getPixelForTick(s),
        c;
    if (!(i && (n === 1 ? c = Math.max(l - o, r - l) : t === 0 ? c = (e.getPixelForTick(1) - l) / 2 : c = (l - e.getPixelForTick(s - 1)) / 2, l += s < t ? c : -c, l < o - a || l > r + a))) return l
}

function ax(e, t) {
    R(e, i => {
        let n = i.gc,
            s = n.length / 2,
            o;
        if (s > t) {
            for (o = 0; o < s; ++o) delete i.data[n[o]];
            n.splice(0, s)
        }
    })
}

function $e(e) {
    return e.drawTicks ? e.tickLength : 0
}

function Oc(e, t) {
    if (!e.display) return 0;
    let i = U(e.font, t),
        n = G(e.padding);
    return (z(e.text) ? e.text.length : 1) * i.lineHeight + n.height
}

function lx(e, t) {
    return yt(e, {
        scale: t,
        type: "scale"
    })
}

function cx(e, t, i) {
    return yt(e, {
        tick: i,
        index: t,
        type: "tick"
    })
}

function hx(e, t, i) {
    let n = Mi(e);
    return (i && t !== "right" || !i && t === "right") && (n = ox(n)), n
}

function ux(e, t, i, n) {
    let {
        top: s,
        left: o,
        bottom: r,
        right: a,
        chart: l
    } = e, {
        chartArea: c,
        scales: h
    } = l, u = 0, d, f, g, p = r - s, m = a - o;
    if (e.isHorizontal()) {
        if (f = K(n, o, a), D(i)) {
            let b = Object.keys(i)[0],
                _ = i[b];
            g = h[b].getPixelForValue(_) + p - t
        } else i === "center" ? g = (c.bottom + c.top) / 2 + p - t : g = wc(e, i, t);
        d = a - o
    } else {
        if (D(i)) {
            let b = Object.keys(i)[0],
                _ = i[b];
            f = h[b].getPixelForValue(_) - m + t
        } else i === "center" ? f = (c.left + c.right) / 2 - m + t : f = wc(e, i, t);
        g = K(n, r, s), u = i === "left" ? -H : H
    }
    return {
        titleX: f,
        titleY: g,
        maxWidth: d,
        rotation: u
    }
}
var Ht = class e extends ht {
        constructor(t) {
            super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0
        }
        init(t) {
            this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax)
        }
        parse(t, i) {
            return t
        }
        getUserBounds() {
            let {
                _userMin: t,
                _userMax: i,
                _suggestedMin: n,
                _suggestedMax: s
            } = this;
            return t = et(t, Number.POSITIVE_INFINITY), i = et(i, Number.NEGATIVE_INFINITY), n = et(n, Number.POSITIVE_INFINITY), s = et(s, Number.NEGATIVE_INFINITY), {
                min: et(t, n),
                max: et(i, s),
                minDefined: W(t),
                maxDefined: W(i)
            }
        }
        getMinMax(t) {
            let {
                min: i,
                max: n,
                minDefined: s,
                maxDefined: o
            } = this.getUserBounds(), r;
            if (s && o) return {
                min: i,
                max: n
            };
            let a = this.getMatchingVisibleMetas();
            for (let l = 0, c = a.length; l < c; ++l) r = a[l].controller.getMinMax(this, t), s || (i = Math.min(i, r.min)), o || (n = Math.max(n, r.max));
            return i = o && i > n ? n : i, n = s && i > n ? i : n, {
                min: et(i, et(n, i)),
                max: et(n, et(i, n))
            }
        }
        getPadding() {
            return {
                left: this.paddingLeft || 0,
                top: this.paddingTop || 0,
                right: this.paddingRight || 0,
                bottom: this.paddingBottom || 0
            }
        }
        getTicks() {
            return this.ticks
        }
        getLabels() {
            let t = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []
        }
        getLabelItems(t = this.chart.chartArea) {
            return this._labelItems || (this._labelItems = this._computeLabelItems(t))
        }
        beforeLayout() {
            this._cache = {}, this._dataLimitsCached = !1
        }
        beforeUpdate() {
            F(this.options.beforeUpdate, [this])
        }
        update(t, i, n) {
            let {
                beginAtZero: s,
                grace: o,
                ticks: r
            } = this.options, a = r.sampleSize;
            this.beforeUpdate(), this.maxWidth = t, this.maxHeight = i, this._margins = n = Object.assign({
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Gl(this, o, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
            let l = a < this.ticks.length;
            this._convertTicksToLabels(l ? Pc(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), r.display && (r.autoSkip || r.source === "auto") && (this.ticks = Q_(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), l && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate()
        }
        configure() {
            let t = this.options.reverse,
                i, n;
            this.isHorizontal() ? (i = this.left, n = this.right) : (i = this.top, n = this.bottom, t = !t), this._startPixel = i, this._endPixel = n, this._reversePixels = t, this._length = n - i, this._alignToPixels = this.options.alignToPixels
        }
        afterUpdate() {
            F(this.options.afterUpdate, [this])
        }
        beforeSetDimensions() {
            F(this.options.beforeSetDimensions, [this])
        }
        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0
        }
        afterSetDimensions() {
            F(this.options.afterSetDimensions, [this])
        }
        _callHooks(t) {
            this.chart.notifyPlugins(t, this.getContext()), F(this.options[t], [this])
        }
        beforeDataLimits() {
            this._callHooks("beforeDataLimits")
        }
        determineDataLimits() {}
        afterDataLimits() {
            this._callHooks("afterDataLimits")
        }
        beforeBuildTicks() {
            this._callHooks("beforeBuildTicks")
        }
        buildTicks() {
            return []
        }
        afterBuildTicks() {
            this._callHooks("afterBuildTicks")
        }
        beforeTickToLabelConversion() {
            F(this.options.beforeTickToLabelConversion, [this])
        }
        generateTickLabels(t) {
            let i = this.options.ticks,
                n, s, o;
            for (n = 0, s = t.length; n < s; n++) o = t[n], o.label = F(i.callback, [o.value, n, t], this)
        }
        afterTickToLabelConversion() {
            F(this.options.afterTickToLabelConversion, [this])
        }
        beforeCalculateLabelRotation() {
            F(this.options.beforeCalculateLabelRotation, [this])
        }
        calculateLabelRotation() {
            let t = this.options,
                i = t.ticks,
                n = kc(this.ticks.length, t.ticks.maxTicksLimit),
                s = i.minRotation || 0,
                o = i.maxRotation,
                r = s,
                a, l, c;
            if (!this._isVisible() || !i.display || s >= o || n <= 1 || !this.isHorizontal()) {
                this.labelRotation = s;
                return
            }
            let h = this._getLabelSizes(),
                u = h.widest.width,
                d = h.highest.height,
                f = X(this.chart.width - u, 0, this.maxWidth);
            a = t.offset ? this.maxWidth / n : f / (n - 1), u + 6 > a && (a = f / (n - (t.offset ? .5 : 1)), l = this.maxHeight - $e(t.grid) - i.padding - Oc(t.title, this.chart.options.font), c = Math.sqrt(u * u + d * d), r = yi(Math.min(Math.asin(X((h.highest.height + 6) / a, -1, 1)), Math.asin(X(l / c, -1, 1)) - Math.asin(X(d / c, -1, 1)))), r = Math.max(s, Math.min(o, r))), this.labelRotation = r
        }
        afterCalculateLabelRotation() {
            F(this.options.afterCalculateLabelRotation, [this])
        }
        afterAutoSkip() {}
        beforeFit() {
            F(this.options.beforeFit, [this])
        }
        fit() {
            let t = {
                    width: 0,
                    height: 0
                },
                {
                    chart: i,
                    options: {
                        ticks: n,
                        title: s,
                        grid: o
                    }
                } = this,
                r = this._isVisible(),
                a = this.isHorizontal();
            if (r) {
                let l = Oc(s, i.options.font);
                if (a ? (t.width = this.maxWidth, t.height = $e(o) + l) : (t.height = this.maxHeight, t.width = $e(o) + l), n.display && this.ticks.length) {
                    let {
                        first: c,
                        last: h,
                        widest: u,
                        highest: d
                    } = this._getLabelSizes(), f = n.padding * 2, g = rt(this.labelRotation), p = Math.cos(g), m = Math.sin(g);
                    if (a) {
                        let b = n.mirror ? 0 : m * u.width + p * d.height;
                        t.height = Math.min(this.maxHeight, t.height + b + f)
                    } else {
                        let b = n.mirror ? 0 : p * u.width + m * d.height;
                        t.width = Math.min(this.maxWidth, t.width + b + f)
                    }
                    this._calculatePadding(c, h, m, p)
                }
            }
            this._handleMargins(), a ? (this.width = this._length = i.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = i.height - this._margins.top - this._margins.bottom)
        }
        _calculatePadding(t, i, n, s) {
            let {
                ticks: {
                    align: o,
                    padding: r
                },
                position: a
            } = this.options, l = this.labelRotation !== 0, c = a !== "top" && this.axis === "x";
            if (this.isHorizontal()) {
                let h = this.getPixelForTick(0) - this.left,
                    u = this.right - this.getPixelForTick(this.ticks.length - 1),
                    d = 0,
                    f = 0;
                l ? c ? (d = s * t.width, f = n * i.height) : (d = n * t.height, f = s * i.width) : o === "start" ? f = i.width : o === "end" ? d = t.width : o !== "inner" && (d = t.width / 2, f = i.width / 2), this.paddingLeft = Math.max((d - h + r) * this.width / (this.width - h), 0), this.paddingRight = Math.max((f - u + r) * this.width / (this.width - u), 0)
            } else {
                let h = i.height / 2,
                    u = t.height / 2;
                o === "start" ? (h = 0, u = t.height) : o === "end" && (h = i.height, u = 0), this.paddingTop = h + r, this.paddingBottom = u + r
            }
        }
        _handleMargins() {
            this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom))
        }
        afterFit() {
            F(this.options.afterFit, [this])
        }
        isHorizontal() {
            let {
                axis: t,
                position: i
            } = this.options;
            return i === "top" || i === "bottom" || t === "x"
        }
        isFullSize() {
            return this.options.fullSize
        }
        _convertTicksToLabels(t) {
            this.beforeTickToLabelConversion(), this.generateTickLabels(t);
            let i, n;
            for (i = 0, n = t.length; i < n; i++) E(t[i].label) && (t.splice(i, 1), n--, i--);
            this.afterTickToLabelConversion()
        }
        _getLabelSizes() {
            let t = this._labelSizes;
            if (!t) {
                let i = this.options.ticks.sampleSize,
                    n = this.ticks;
                i < n.length && (n = Pc(n, i)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit)
            }
            return t
        }
        _computeLabelSizes(t, i, n) {
            let {
                ctx: s,
                _longestTextCache: o
            } = this, r = [], a = [], l = Math.floor(i / kc(i, n)), c = 0, h = 0, u, d, f, g, p, m, b, _, v, M, y;
            for (u = 0; u < i; u += l) {
                if (g = t[u].label, p = this._resolveTickFontOptions(u), s.font = m = p.string, b = o[m] = o[m] || {
                        data: {},
                        gc: []
                    }, _ = p.lineHeight, v = M = 0, !E(g) && !z(g)) v = Fe(s, b.data, b.gc, v, g), M = _;
                else if (z(g))
                    for (d = 0, f = g.length; d < f; ++d) y = g[d], !E(y) && !z(y) && (v = Fe(s, b.data, b.gc, v, y), M += _);
                r.push(v), a.push(M), c = Math.max(v, c), h = Math.max(M, h)
            }
            ax(o, i);
            let w = r.indexOf(c),
                k = a.indexOf(h),
                S = P => ({
                    width: r[P] || 0,
                    height: a[P] || 0
                });
            return {
                first: S(0),
                last: S(i - 1),
                widest: S(w),
                highest: S(k),
                widths: r,
                heights: a
            }
        }
        getLabelForValue(t) {
            return t
        }
        getPixelForValue(t, i) {
            return NaN
        }
        getValueForPixel(t) {}
        getPixelForTick(t) {
            let i = this.ticks;
            return t < 0 || t > i.length - 1 ? null : this.getPixelForValue(i[t].value)
        }
        getPixelForDecimal(t) {
            this._reversePixels && (t = 1 - t);
            let i = this._startPixel + t * this._length;
            return zl(this._alignToPixels ? At(this.chart, i, 0) : i)
        }
        getDecimalForPixel(t) {
            let i = (t - this._startPixel) / this._length;
            return this._reversePixels ? 1 - i : i
        }
        getBasePixel() {
            return this.getPixelForValue(this.getBaseValue())
        }
        getBaseValue() {
            let {
                min: t,
                max: i
            } = this;
            return t < 0 && i < 0 ? i : t > 0 && i > 0 ? t : 0
        }
        getContext(t) {
            let i = this.ticks || [];
            if (t >= 0 && t < i.length) {
                let n = i[t];
                return n.$context || (n.$context = cx(this.getContext(), t, n))
            }
            return this.$context || (this.$context = lx(this.chart.getContext(), this))
        }
        _tickSize() {
            let t = this.options.ticks,
                i = rt(this.labelRotation),
                n = Math.abs(Math.cos(i)),
                s = Math.abs(Math.sin(i)),
                o = this._getLabelSizes(),
                r = t.autoSkipPadding || 0,
                a = o ? o.widest.width + r : 0,
                l = o ? o.highest.height + r : 0;
            return this.isHorizontal() ? l * n > a * s ? a / n : l / s : l * s < a * n ? l / n : a / s
        }
        _isVisible() {
            let t = this.options.display;
            return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0
        }
        _computeGridLineItems(t) {
            let i = this.axis,
                n = this.chart,
                s = this.options,
                {
                    grid: o,
                    position: r,
                    border: a
                } = s,
                l = o.offset,
                c = this.isHorizontal(),
                u = this.ticks.length + (l ? 1 : 0),
                d = $e(o),
                f = [],
                g = a.setContext(this.getContext()),
                p = g.display ? g.width : 0,
                m = p / 2,
                b = function(N) {
                    return At(n, N, p)
                },
                _, v, M, y, w, k, S, P, A, C, L, Y;
            if (r === "top") _ = b(this.bottom), k = this.bottom - d, P = _ - m, C = b(t.top) + m, Y = t.bottom;
            else if (r === "bottom") _ = b(this.top), C = t.top, Y = b(t.bottom) - m, k = _ + m, P = this.top + d;
            else if (r === "left") _ = b(this.right), w = this.right - d, S = _ - m, A = b(t.left) + m, L = t.right;
            else if (r === "right") _ = b(this.left), A = t.left, L = b(t.right) - m, w = _ + m, S = this.left + d;
            else if (i === "x") {
                if (r === "center") _ = b((t.top + t.bottom) / 2 + .5);
                else if (D(r)) {
                    let N = Object.keys(r)[0],
                        $ = r[N];
                    _ = b(this.chart.scales[N].getPixelForValue($))
                }
                C = t.top, Y = t.bottom, k = _ + m, P = k + d
            } else if (i === "y") {
                if (r === "center") _ = b((t.left + t.right) / 2);
                else if (D(r)) {
                    let N = Object.keys(r)[0],
                        $ = r[N];
                    _ = b(this.chart.scales[N].getPixelForValue($))
                }
                w = _ - m, S = w - d, A = t.left, L = t.right
            }
            let st = O(s.ticks.maxTicksLimit, u),
                I = Math.max(1, Math.ceil(u / st));
            for (v = 0; v < u; v += I) {
                let N = this.getContext(v),
                    $ = o.setContext(N),
                    lt = a.setContext(N),
                    Z = $.lineWidth,
                    Wt = $.color,
                    ti = lt.dash || [],
                    qt = lt.dashOffset,
                    me = $.tickWidth,
                    be = $.tickColor,
                    _e = $.tickBorderDash || [],
                    xe = $.tickBorderDashOffset;
                M = rx(this, v, l), M !== void 0 && (y = At(n, M, Z), c ? w = S = A = L = y : k = P = C = Y = y, f.push({
                    tx1: w,
                    ty1: k,
                    tx2: S,
                    ty2: P,
                    x1: A,
                    y1: C,
                    x2: L,
                    y2: Y,
                    width: Z,
                    color: Wt,
                    borderDash: ti,
                    borderDashOffset: qt,
                    tickWidth: me,
                    tickColor: be,
                    tickBorderDash: _e,
                    tickBorderDashOffset: xe
                }))
            }
            return this._ticksLength = u, this._borderValue = _, f
        }
        _computeLabelItems(t) {
            let i = this.axis,
                n = this.options,
                {
                    position: s,
                    ticks: o
                } = n,
                r = this.isHorizontal(),
                a = this.ticks,
                {
                    align: l,
                    crossAlign: c,
                    padding: h,
                    mirror: u
                } = o,
                d = $e(n.grid),
                f = d + h,
                g = u ? -h : f,
                p = -rt(this.labelRotation),
                m = [],
                b, _, v, M, y, w, k, S, P, A, C, L, Y = "middle";
            if (s === "top") w = this.bottom - g, k = this._getXAxisLabelAlignment();
            else if (s === "bottom") w = this.top + g, k = this._getXAxisLabelAlignment();
            else if (s === "left") {
                let I = this._getYAxisLabelAlignment(d);
                k = I.textAlign, y = I.x
            } else if (s === "right") {
                let I = this._getYAxisLabelAlignment(d);
                k = I.textAlign, y = I.x
            } else if (i === "x") {
                if (s === "center") w = (t.top + t.bottom) / 2 + f;
                else if (D(s)) {
                    let I = Object.keys(s)[0],
                        N = s[I];
                    w = this.chart.scales[I].getPixelForValue(N) + f
                }
                k = this._getXAxisLabelAlignment()
            } else if (i === "y") {
                if (s === "center") y = (t.left + t.right) / 2 - f;
                else if (D(s)) {
                    let I = Object.keys(s)[0],
                        N = s[I];
                    y = this.chart.scales[I].getPixelForValue(N)
                }
                k = this._getYAxisLabelAlignment(d).textAlign
            }
            i === "y" && (l === "start" ? Y = "top" : l === "end" && (Y = "bottom"));
            let st = this._getLabelSizes();
            for (b = 0, _ = a.length; b < _; ++b) {
                v = a[b], M = v.label;
                let I = o.setContext(this.getContext(b));
                S = this.getPixelForTick(b) + o.labelOffset, P = this._resolveTickFontOptions(b), A = P.lineHeight, C = z(M) ? M.length : 1;
                let N = C / 2,
                    $ = I.color,
                    lt = I.textStrokeColor,
                    Z = I.textStrokeWidth,
                    Wt = k;
                r ? (y = S, k === "inner" && (b === _ - 1 ? Wt = this.options.reverse ? "left" : "right" : b === 0 ? Wt = this.options.reverse ? "right" : "left" : Wt = "center"), s === "top" ? c === "near" || p !== 0 ? L = -C * A + A / 2 : c === "center" ? L = -st.highest.height / 2 - N * A + A : L = -st.highest.height + A / 2 : c === "near" || p !== 0 ? L = A / 2 : c === "center" ? L = st.highest.height / 2 - N * A : L = st.highest.height - C * A, u && (L *= -1), p !== 0 && !I.showLabelBackdrop && (y += A / 2 * Math.sin(p))) : (w = S, L = (1 - C) * A / 2);
                let ti;
                if (I.showLabelBackdrop) {
                    let qt = G(I.backdropPadding),
                        me = st.heights[b],
                        be = st.widths[b],
                        _e = L - qt.top,
                        xe = 0 - qt.left;
                    switch (Y) {
                        case "middle":
                            _e -= me / 2;
                            break;
                        case "bottom":
                            _e -= me;
                            break
                    }
                    switch (k) {
                        case "center":
                            xe -= be / 2;
                            break;
                        case "right":
                            xe -= be;
                            break
                    }
                    ti = {
                        left: xe,
                        top: _e,
                        width: be + qt.width,
                        height: me + qt.height,
                        color: I.backdropColor
                    }
                }
                m.push({
                    label: M,
                    font: P,
                    textOffset: L,
                    options: {
                        rotation: p,
                        color: $,
                        strokeColor: lt,
                        strokeWidth: Z,
                        textAlign: Wt,
                        textBaseline: Y,
                        translation: [y, w],
                        backdrop: ti
                    }
                })
            }
            return m
        }
        _getXAxisLabelAlignment() {
            let {
                position: t,
                ticks: i
            } = this.options;
            if (-rt(this.labelRotation)) return t === "top" ? "left" : "right";
            let s = "center";
            return i.align === "start" ? s = "left" : i.align === "end" ? s = "right" : i.align === "inner" && (s = "inner"), s
        }
        _getYAxisLabelAlignment(t) {
            let {
                position: i,
                ticks: {
                    crossAlign: n,
                    mirror: s,
                    padding: o
                }
            } = this.options, r = this._getLabelSizes(), a = t + o, l = r.widest.width, c, h;
            return i === "left" ? s ? (h = this.right + o, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h += l)) : (h = this.right - a, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h = this.left)) : i === "right" ? s ? (h = this.left + o, n === "near" ? c = "right" : n === "center" ? (c = "center", h -= l / 2) : (c = "left", h -= l)) : (h = this.left + a, n === "near" ? c = "left" : n === "center" ? (c = "center", h += l / 2) : (c = "right", h = this.right)) : c = "right", {
                textAlign: c,
                x: h
            }
        }
        _computeLabelArea() {
            if (this.options.ticks.mirror) return;
            let t = this.chart,
                i = this.options.position;
            if (i === "left" || i === "right") return {
                top: 0,
                left: this.left,
                bottom: t.height,
                right: this.right
            };
            if (i === "top" || i === "bottom") return {
                top: this.top,
                left: 0,
                bottom: this.bottom,
                right: t.width
            }
        }
        drawBackground() {
            let {
                ctx: t,
                options: {
                    backgroundColor: i
                },
                left: n,
                top: s,
                width: o,
                height: r
            } = this;
            i && (t.save(), t.fillStyle = i, t.fillRect(n, s, o, r), t.restore())
        }
        getLineWidthForValue(t) {
            let i = this.options.grid;
            if (!this._isVisible() || !i.display) return 0;
            let s = this.ticks.findIndex(o => o.value === t);
            return s >= 0 ? i.setContext(this.getContext(s)).lineWidth : 0
        }
        drawGrid(t) {
            let i = this.options.grid,
                n = this.ctx,
                s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t)),
                o, r, a = (l, c, h) => {
                    !h.width || !h.color || (n.save(), n.lineWidth = h.width, n.strokeStyle = h.color, n.setLineDash(h.borderDash || []), n.lineDashOffset = h.borderDashOffset, n.beginPath(), n.moveTo(l.x, l.y), n.lineTo(c.x, c.y), n.stroke(), n.restore())
                };
            if (i.display)
                for (o = 0, r = s.length; o < r; ++o) {
                    let l = s[o];
                    i.drawOnChartArea && a({
                        x: l.x1,
                        y: l.y1
                    }, {
                        x: l.x2,
                        y: l.y2
                    }, l), i.drawTicks && a({
                        x: l.tx1,
                        y: l.ty1
                    }, {
                        x: l.tx2,
                        y: l.ty2
                    }, {
                        color: l.tickColor,
                        width: l.tickWidth,
                        borderDash: l.tickBorderDash,
                        borderDashOffset: l.tickBorderDashOffset
                    })
                }
        }
        drawBorder() {
            let {
                chart: t,
                ctx: i,
                options: {
                    border: n,
                    grid: s
                }
            } = this, o = n.setContext(this.getContext()), r = n.display ? o.width : 0;
            if (!r) return;
            let a = s.setContext(this.getContext(0)).lineWidth,
                l = this._borderValue,
                c, h, u, d;
            this.isHorizontal() ? (c = At(t, this.left, r) - r / 2, h = At(t, this.right, a) + a / 2, u = d = l) : (u = At(t, this.top, r) - r / 2, d = At(t, this.bottom, a) + a / 2, c = h = l), i.save(), i.lineWidth = o.width, i.strokeStyle = o.color, i.beginPath(), i.moveTo(c, u), i.lineTo(h, d), i.stroke(), i.restore()
        }
        drawLabels(t) {
            if (!this.options.ticks.display) return;
            let n = this.ctx,
                s = this._computeLabelArea();
            s && je(n, s);
            let o = this.getLabelItems(t);
            for (let r of o) {
                let a = r.options,
                    l = r.font,
                    c = r.label,
                    h = r.textOffset;
                Dt(n, c, 0, h, l, a)
            }
            s && Ve(n)
        }
        drawTitle() {
            let {
                ctx: t,
                options: {
                    position: i,
                    title: n,
                    reverse: s
                }
            } = this;
            if (!n.display) return;
            let o = U(n.font),
                r = G(n.padding),
                a = n.align,
                l = o.lineHeight / 2;
            i === "bottom" || i === "center" || D(i) ? (l += r.bottom, z(n.text) && (l += o.lineHeight * (n.text.length - 1))) : l += r.top;
            let {
                titleX: c,
                titleY: h,
                maxWidth: u,
                rotation: d
            } = ux(this, l, i, a);
            Dt(t, n.text, 0, 0, o, {
                color: n.color,
                maxWidth: u,
                rotation: d,
                textAlign: hx(a, i, s),
                textBaseline: "middle",
                translation: [c, h]
            })
        }
        draw(t) {
            this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t))
        }
        _layers() {
            let t = this.options,
                i = t.ticks && t.ticks.z || 0,
                n = O(t.grid && t.grid.z, -1),
                s = O(t.border && t.border.z, 0);
            return !this._isVisible() || this.draw !== e.prototype.draw ? [{
                z: i,
                draw: o => {
                    this.draw(o)
                }
            }] : [{
                z: n,
                draw: o => {
                    this.drawBackground(), this.drawGrid(o), this.drawTitle()
                }
            }, {
                z: s,
                draw: () => {
                    this.drawBorder()
                }
            }, {
                z: i,
                draw: o => {
                    this.drawLabels(o)
                }
            }]
        }
        getMatchingVisibleMetas(t) {
            let i = this.chart.getSortedVisibleDatasetMetas(),
                n = this.axis + "AxisID",
                s = [],
                o, r;
            for (o = 0, r = i.length; o < r; ++o) {
                let a = i[o];
                a[n] === this.id && (!t || a.type === t) && s.push(a)
            }
            return s
        }
        _resolveTickFontOptions(t) {
            let i = this.options.ticks.setContext(this.getContext(t));
            return U(i.font)
        }
        _maxDigits() {
            let t = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / t
        }
    },
    de = class {
        constructor(t, i, n) {
            this.type = t, this.scope = i, this.override = n, this.items = Object.create(null)
        }
        isForType(t) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype)
        }
        register(t) {
            let i = Object.getPrototypeOf(t),
                n;
            gx(i) && (n = this.register(i));
            let s = this.items,
                o = t.id,
                r = this.scope + "." + o;
            if (!o) throw new Error("class does not have id: " + t);
            return o in s || (s[o] = t, dx(t, r, n), this.override && q.override(t.id, t.overrides)), r
        }
        get(t) {
            return this.items[t]
        }
        unregister(t) {
            let i = this.items,
                n = t.id,
                s = this.scope;
            n in i && delete i[n], s && n in q[s] && (delete q[s][n], this.override && delete Ct[n])
        }
    };

function dx(e, t, i) {
    let n = ie(Object.create(null), [i ? q.get(i) : {}, q.get(t), e.defaults]);
    q.set(t, n), e.defaultRoutes && fx(t, e.defaultRoutes), e.descriptors && q.describe(t, e.descriptors)
}

function fx(e, t) {
    Object.keys(t).forEach(i => {
        let n = i.split("."),
            s = n.pop(),
            o = [e].concat(n).join("."),
            r = t[i].split("."),
            a = r.pop(),
            l = r.join(".");
        q.route(o, s, l, a)
    })
}

function gx(e) {
    return "id" in e && "defaults" in e
}
var ms = class {
        constructor() {
            this.controllers = new de(Rt, "datasets", !0), this.elements = new de(ht, "elements"), this.plugins = new de(Object, "plugins"), this.scales = new de(Ht, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements]
        }
        add(...t) {
            this._each("register", t)
        }
        remove(...t) {
            this._each("unregister", t)
        }
        addControllers(...t) {
            this._each("register", t, this.controllers)
        }
        addElements(...t) {
            this._each("register", t, this.elements)
        }
        addPlugins(...t) {
            this._each("register", t, this.plugins)
        }
        addScales(...t) {
            this._each("register", t, this.scales)
        }
        getController(t) {
            return this._get(t, this.controllers, "controller")
        }
        getElement(t) {
            return this._get(t, this.elements, "element")
        }
        getPlugin(t) {
            return this._get(t, this.plugins, "plugin")
        }
        getScale(t) {
            return this._get(t, this.scales, "scale")
        }
        removeControllers(...t) {
            this._each("unregister", t, this.controllers)
        }
        removeElements(...t) {
            this._each("unregister", t, this.elements)
        }
        removePlugins(...t) {
            this._each("unregister", t, this.plugins)
        }
        removeScales(...t) {
            this._each("unregister", t, this.scales)
        }
        _each(t, i, n) {
            [...i].forEach(s => {
                let o = n || this._getRegistryForType(s);
                n || o.isForType(s) || o === this.plugins && s.id ? this._exec(t, o, s) : R(s, r => {
                    let a = n || this._getRegistryForType(r);
                    this._exec(t, a, r)
                })
            })
        }
        _exec(t, i, n) {
            let s = xi(t);
            F(n["before" + s], [], n), i[t](n), F(n["after" + s], [], n)
        }
        _getRegistryForType(t) {
            for (let i = 0; i < this._typedRegistries.length; i++) {
                let n = this._typedRegistries[i];
                if (n.isForType(t)) return n
            }
            return this.plugins
        }
        _get(t, i, n) {
            let s = i.get(t);
            if (s === void 0) throw new Error('"' + t + '" is not a registered ' + n + ".");
            return s
        }
    },
    pt = new ms,
    bs = class {
        constructor() {
            this._init = []
        }
        notify(t, i, n, s) {
            i === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
            let o = s ? this._descriptors(t).filter(s) : this._descriptors(t),
                r = this._notify(o, t, i, n);
            return i === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall")), r
        }
        _notify(t, i, n, s) {
            s = s || {};
            for (let o of t) {
                let r = o.plugin,
                    a = r[n],
                    l = [i, s, o.options];
                if (F(a, l, r) === !1 && s.cancelable) return !1
            }
            return !0
        }
        invalidate() {
            E(this._cache) || (this._oldCache = this._cache, this._cache = void 0)
        }
        _descriptors(t) {
            if (this._cache) return this._cache;
            let i = this._cache = this._createDescriptors(t);
            return this._notifyStateChanges(t), i
        }
        _createDescriptors(t, i) {
            let n = t && t.config,
                s = O(n.options && n.options.plugins, {}),
                o = px(n);
            return s === !1 && !i ? [] : bx(t, o, s, i)
        }
        _notifyStateChanges(t) {
            let i = this._oldCache || [],
                n = this._cache,
                s = (o, r) => o.filter(a => !r.some(l => a.plugin.id === l.plugin.id));
            this._notify(s(i, n), t, "stop"), this._notify(s(n, i), t, "start")
        }
    };

function px(e) {
    let t = {},
        i = [],
        n = Object.keys(pt.plugins.items);
    for (let o = 0; o < n.length; o++) i.push(pt.getPlugin(n[o]));
    let s = e.plugins || [];
    for (let o = 0; o < s.length; o++) {
        let r = s[o];
        i.indexOf(r) === -1 && (i.push(r), t[r.id] = !0)
    }
    return {
        plugins: i,
        localIds: t
    }
}

function mx(e, t) {
    return !t && e === !1 ? null : e === !0 ? {} : e
}

function bx(e, {
    plugins: t,
    localIds: i
}, n, s) {
    let o = [],
        r = e.getContext();
    for (let a of t) {
        let l = a.id,
            c = mx(n[l], s);
        c !== null && o.push({
            plugin: a,
            options: _x(e.config, {
                plugin: a,
                local: i[l]
            }, c, r)
        })
    }
    return o
}

function _x(e, {
    plugin: t,
    local: i
}, n, s) {
    let o = e.pluginScopeKeys(t),
        r = e.getOptionScopes(n, o);
    return i && t.defaults && r.push(t.defaults), e.createResolver(r, s, [""], {
        scriptable: !1,
        indexable: !1,
        allKeys: !0
    })
}

function _s(e, t) {
    let i = q.datasets[e] || {};
    return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || i.indexAxis || "x"
}

function xx(e, t) {
    let i = e;
    return e === "_index_" ? i = t : e === "_value_" && (i = t === "x" ? "y" : "x"), i
}

function yx(e, t) {
    return e === t ? "_index_" : "_value_"
}

function Cc(e) {
    if (e === "x" || e === "y" || e === "r") return e
}

function vx(e) {
    if (e === "top" || e === "bottom") return "x";
    if (e === "left" || e === "right") return "y"
}

function xs(e, ...t) {
    if (Cc(e)) return e;
    for (let i of t) {
        let n = i.axis || vx(i.position) || e.length > 1 && Cc(e[0].toLowerCase());
        if (n) return n
    }
    throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)
}

function Ac(e, t, i) {
    if (i[t + "AxisID"] === e) return {
        axis: t
    }
}

function Mx(e, t) {
    if (t.data && t.data.datasets) {
        let i = t.data.datasets.filter(n => n.xAxisID === e || n.yAxisID === e);
        if (i.length) return Ac(e, "x", i[0]) || Ac(e, "y", i[0])
    }
    return {}
}

function Sx(e, t) {
    let i = Ct[e.type] || {
            scales: {}
        },
        n = t.scales || {},
        s = _s(e.type, t),
        o = Object.create(null);
    return Object.keys(n).forEach(r => {
        let a = n[r];
        if (!D(a)) return console.error(`Invalid scale configuration for scale: ${r}`);
        if (a._proxy) return console.warn(`Ignoring resolver passed as options for scale: ${r}`);
        let l = xs(r, a, Mx(r, e), q.scales[a.type]),
            c = yx(l, s),
            h = i.scales || {};
        o[r] = se(Object.create(null), [{
            axis: l
        }, a, h[l], h[c]])
    }), e.data.datasets.forEach(r => {
        let a = r.type || e.type,
            l = r.indexAxis || _s(a, t),
            h = (Ct[a] || {}).scales || {};
        Object.keys(h).forEach(u => {
            let d = xx(u, l),
                f = r[d + "AxisID"] || d;
            o[f] = o[f] || Object.create(null), se(o[f], [{
                axis: d
            }, n[f], h[u]])
        })
    }), Object.keys(o).forEach(r => {
        let a = o[r];
        se(a, [q.scales[a.type], q.scale])
    }), o
}

function xh(e) {
    let t = e.options || (e.options = {});
    t.plugins = O(t.plugins, {}), t.scales = Sx(e, t)
}

function yh(e) {
    return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e
}

function wx(e) {
    return e = e || {}, e.data = yh(e.data), xh(e), e
}
var Dc = new Map,
    vh = new Set;

function Ti(e, t) {
    let i = Dc.get(e);
    return i || (i = t(), Dc.set(e, i), vh.add(i)), i
}
var Ue = (e, t, i) => {
        let n = xt(t, i);
        n !== void 0 && e.add(n)
    },
    ys = class {
        constructor(t) {
            this._config = wx(t), this._scopeCache = new Map, this._resolverCache = new Map
        }
        get platform() {
            return this._config.platform
        }
        get type() {
            return this._config.type
        }
        set type(t) {
            this._config.type = t
        }
        get data() {
            return this._config.data
        }
        set data(t) {
            this._config.data = yh(t)
        }
        get options() {
            return this._config.options
        }
        set options(t) {
            this._config.options = t
        }
        get plugins() {
            return this._config.plugins
        }
        update() {
            let t = this._config;
            this.clearCache(), xh(t)
        }
        clearCache() {
            this._scopeCache.clear(), this._resolverCache.clear()
        }
        datasetScopeKeys(t) {
            return Ti(t, () => [
                [`datasets.${t}`, ""]
            ])
        }
        datasetAnimationScopeKeys(t, i) {
            return Ti(`${t}.transition.${i}`, () => [
                [`datasets.${t}.transitions.${i}`, `transitions.${i}`],
                [`datasets.${t}`, ""]
            ])
        }
        datasetElementScopeKeys(t, i) {
            return Ti(`${t}-${i}`, () => [
                [`datasets.${t}.elements.${i}`, `datasets.${t}`, `elements.${i}`, ""]
            ])
        }
        pluginScopeKeys(t) {
            let i = t.id,
                n = this.type;
            return Ti(`${n}-plugin-${i}`, () => [
                [`plugins.${i}`, ...t.additionalOptionScopes || []]
            ])
        }
        _cachedScopes(t, i) {
            let n = this._scopeCache,
                s = n.get(t);
            return (!s || i) && (s = new Map, n.set(t, s)), s
        }
        getOptionScopes(t, i, n) {
            let {
                options: s,
                type: o
            } = this, r = this._cachedScopes(t, n), a = r.get(i);
            if (a) return a;
            let l = new Set;
            i.forEach(h => {
                t && (l.add(t), h.forEach(u => Ue(l, t, u))), h.forEach(u => Ue(l, s, u)), h.forEach(u => Ue(l, Ct[o] || {}, u)), h.forEach(u => Ue(l, q, u)), h.forEach(u => Ue(l, Si, u))
            });
            let c = Array.from(l);
            return c.length === 0 && c.push(Object.create(null)), vh.has(i) && r.set(i, c), c
        }
        chartOptionScopes() {
            let {
                options: t,
                type: i
            } = this;
            return [t, Ct[i] || {}, q.datasets[i] || {}, {
                type: i
            }, q, Si]
        }
        resolveNamedOptions(t, i, n, s = [""]) {
            let o = {
                    $shared: !0
                },
                {
                    resolver: r,
                    subPrefixes: a
                } = Tc(this._resolverCache, t, s),
                l = r;
            if (Px(r, i)) {
                o.$shared = !1, n = bt(n) ? n() : n;
                let c = this.createResolver(t, n, a);
                l = Bt(r, n, c)
            }
            for (let c of i) o[c] = l[c];
            return o
        }
        createResolver(t, i, n = [""], s) {
            let {
                resolver: o
            } = Tc(this._resolverCache, t, n);
            return D(i) ? Bt(o, i, void 0, s) : o
        }
    };

function Tc(e, t, i) {
    let n = e.get(t);
    n || (n = new Map, e.set(t, n));
    let s = i.join(),
        o = n.get(s);
    return o || (o = {
        resolver: Pi(t, i),
        subPrefixes: i.filter(a => !a.toLowerCase().includes("hover"))
    }, n.set(s, o)), o
}
var kx = e => D(e) && Object.getOwnPropertyNames(e).reduce((t, i) => t || bt(e[i]), !1);

function Px(e, t) {
    let {
        isScriptable: i,
        isIndexable: n
    } = $n(e);
    for (let s of t) {
        let o = i(s),
            r = n(s),
            a = (r || o) && e[s];
        if (o && (bt(a) || kx(a)) || r && z(a)) return !0
    }
    return !1
}
var Ox = "4.3.3",
    Cx = ["top", "bottom", "left", "right", "chartArea"];

function Lc(e, t) {
    return e === "top" || e === "bottom" || Cx.indexOf(e) === -1 && t === "x"
}

function Ec(e, t) {
    return function(i, n) {
        return i[e] === n[e] ? i[t] - n[t] : i[e] - n[e]
    }
}

function Rc(e) {
    let t = e.chart,
        i = t.options.animation;
    t.notifyPlugins("afterRender"), F(i && i.onComplete, [e], t)
}

function Ax(e) {
    let t = e.chart,
        i = t.options.animation;
    F(i && i.onProgress, [e], t)
}

function Mh(e) {
    return Kn() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e
}
var Ii = {},
    Ic = e => {
        let t = Mh(e);
        return Object.values(Ii).filter(i => i.canvas === t).pop()
    };

function Dx(e, t, i) {
    let n = Object.keys(e);
    for (let s of n) {
        let o = +s;
        if (o >= t) {
            let r = e[s];
            delete e[s], (i > 0 || o > t) && (e[o + i] = r)
        }
    }
}

function Tx(e, t, i, n) {
    return !i || e.type === "mouseout" ? null : n ? t : e
}

function Lx(e) {
    let {
        xScale: t,
        yScale: i
    } = e;
    if (t && i) return {
        left: t.left,
        right: t.right,
        top: i.top,
        bottom: i.bottom
    }
}
var fe = class {
    static defaults = q;
    static instances = Ii;
    static overrides = Ct;
    static registry = pt;
    static version = Ox;
    static getChart = Ic;
    static register(...t) {
        pt.add(...t), Fc()
    }
    static unregister(...t) {
        pt.remove(...t), Fc()
    }
    constructor(t, i) {
        let n = this.config = new ys(i),
            s = Mh(t),
            o = Ic(s);
        if (o) throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
        let r = n.createResolver(n.chartOptionScopes(), this.getContext());
        this.platform = new(n.platform || J_(s)), this.platform.updateConfig(n);
        let a = this.platform.acquireContext(s, r.aspectRatio),
            l = a && a.canvas,
            c = l && l.height,
            h = l && l.width;
        if (this.id = Tl(), this.ctx = a, this.canvas = l, this.width = h, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new bs, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Hl(u => this.update(u), r.resizeDelay || 0), this._dataChanges = [], Ii[this.id] = this, !a || !l) {
            console.error("Failed to create chart: can't acquire context from the given item");
            return
        }
        vt.listen(this, "complete", Rc), vt.listen(this, "progress", Ax), this._initialize(), this.attached && this.update()
    }
    get aspectRatio() {
        let {
            options: {
                aspectRatio: t,
                maintainAspectRatio: i
            },
            width: n,
            height: s,
            _aspectRatio: o
        } = this;
        return E(t) ? i && o ? o : s ? n / s : null : t
    }
    get data() {
        return this.config.data
    }
    set data(t) {
        this.config.data = t
    }
    get options() {
        return this._options
    }
    set options(t) {
        this.config.options = t
    }
    get registry() {
        return pt
    }
    _initialize() {
        return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Gn(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this
    }
    clear() {
        return Hn(this.canvas, this.ctx), this
    }
    stop() {
        return vt.stop(this), this
    }
    resize(t, i) {
        vt.running(this) ? this._resizeBeforeDraw = {
            width: t,
            height: i
        } : this._resize(t, i)
    }
    _resize(t, i) {
        let n = this.options,
            s = this.canvas,
            o = n.maintainAspectRatio && this.aspectRatio,
            r = this.platform.getMaximumSize(s, t, i, o),
            a = n.devicePixelRatio || this.platform.getDevicePixelRatio(),
            l = this.width ? "resize" : "attach";
        this.width = r.width, this.height = r.height, this._aspectRatio = this.aspectRatio, Gn(this, a, !0) && (this.notifyPlugins("resize", {
            size: r
        }), F(n.onResize, [this, r], this), this.attached && this._doResize(l) && this.render())
    }
    ensureScalesHaveIDs() {
        let i = this.options.scales || {};
        R(i, (n, s) => {
            n.id = s
        })
    }
    buildOrUpdateScales() {
        let t = this.options,
            i = t.scales,
            n = this.scales,
            s = Object.keys(n).reduce((r, a) => (r[a] = !1, r), {}),
            o = [];
        i && (o = o.concat(Object.keys(i).map(r => {
            let a = i[r],
                l = xs(r, a),
                c = l === "r",
                h = l === "x";
            return {
                options: a,
                dposition: c ? "chartArea" : h ? "bottom" : "left",
                dtype: c ? "radialLinear" : h ? "category" : "linear"
            }
        }))), R(o, r => {
            let a = r.options,
                l = a.id,
                c = xs(l, a),
                h = O(a.type, r.dtype);
            (a.position === void 0 || Lc(a.position, c) !== Lc(r.dposition)) && (a.position = r.dposition), s[l] = !0;
            let u = null;
            if (l in n && n[l].type === h) u = n[l];
            else {
                let d = pt.getScale(h);
                u = new d({
                    id: l,
                    type: h,
                    ctx: this.ctx,
                    chart: this
                }), n[u.id] = u
            }
            u.init(a, t)
        }), R(s, (r, a) => {
            r || delete n[a]
        }), R(n, r => {
            at.configure(this, r, r.options), at.addBox(this, r)
        })
    }
    _updateMetasets() {
        let t = this._metasets,
            i = this.data.datasets.length,
            n = t.length;
        if (t.sort((s, o) => s.index - o.index), n > i) {
            for (let s = i; s < n; ++s) this._destroyDatasetMeta(s);
            t.splice(i, n - i)
        }
        this._sortedMetasets = t.slice(0).sort(Ec("order", "index"))
    }
    _removeUnreferencedMetasets() {
        let {
            _metasets: t,
            data: {
                datasets: i
            }
        } = this;
        t.length > i.length && delete this._stacks, t.forEach((n, s) => {
            i.filter(o => o === n._dataset).length === 0 && this._destroyDatasetMeta(s)
        })
    }
    buildOrUpdateControllers() {
        let t = [],
            i = this.data.datasets,
            n, s;
        for (this._removeUnreferencedMetasets(), n = 0, s = i.length; n < s; n++) {
            let o = i[n],
                r = this.getDatasetMeta(n),
                a = o.type || this.config.type;
            if (r.type && r.type !== a && (this._destroyDatasetMeta(n), r = this.getDatasetMeta(n)), r.type = a, r.indexAxis = o.indexAxis || _s(a, this.options), r.order = o.order || 0, r.index = n, r.label = "" + o.label, r.visible = this.isDatasetVisible(n), r.controller) r.controller.updateIndex(n), r.controller.linkScales();
            else {
                let l = pt.getController(a),
                    {
                        datasetElementType: c,
                        dataElementType: h
                    } = q.datasets[a];
                Object.assign(l, {
                    dataElementType: pt.getElement(h),
                    datasetElementType: c && pt.getElement(c)
                }), r.controller = new l(this, n), t.push(r.controller)
            }
        }
        return this._updateMetasets(), t
    }
    _resetElements() {
        R(this.data.datasets, (t, i) => {
            this.getDatasetMeta(i).controller.reset()
        }, this)
    }
    reset() {
        this._resetElements(), this.notifyPlugins("reset")
    }
    update(t) {
        let i = this.config;
        i.update();
        let n = this._options = i.createResolver(i.chartOptionScopes(), this.getContext()),
            s = this._animationsDisabled = !n.animation;
        if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
                mode: t,
                cancelable: !0
            }) === !1) return;
        let o = this.buildOrUpdateControllers();
        this.notifyPlugins("beforeElementsUpdate");
        let r = 0;
        for (let c = 0, h = this.data.datasets.length; c < h; c++) {
            let {
                controller: u
            } = this.getDatasetMeta(c), d = !s && o.indexOf(u) === -1;
            u.buildOrUpdateElements(d), r = Math.max(+u.getMaxOverflow(), r)
        }
        r = this._minPadding = n.layout.autoPadding ? r : 0, this._updateLayout(r), s || R(o, c => {
            c.reset()
        }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
            mode: t
        }), this._layers.sort(Ec("z", "_idx"));
        let {
            _active: a,
            _lastEvent: l
        } = this;
        l ? this._eventHandler(l, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render()
    }
    _updateScales() {
        R(this.scales, t => {
            at.removeBox(this, t)
        }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales()
    }
    _checkEventBindings() {
        let t = this.options,
            i = new Set(Object.keys(this._listeners)),
            n = new Set(t.events);
        (!Tn(i, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents())
    }
    _updateHiddenIndices() {
        let {
            _hiddenIndices: t
        } = this, i = this._getUniformDataChanges() || [];
        for (let {
                method: n,
                start: s,
                count: o
            } of i) {
            let r = n === "_removeElements" ? -o : o;
            Dx(t, s, r)
        }
    }
    _getUniformDataChanges() {
        let t = this._dataChanges;
        if (!t || !t.length) return;
        this._dataChanges = [];
        let i = this.data.datasets.length,
            n = o => new Set(t.filter(r => r[0] === o).map((r, a) => a + "," + r.splice(1).join(","))),
            s = n(0);
        for (let o = 1; o < i; o++)
            if (!Tn(s, n(o))) return;
        return Array.from(s).map(o => o.split(",")).map(o => ({
            method: o[1],
            start: +o[2],
            count: +o[3]
        }))
    }
    _updateLayout(t) {
        if (this.notifyPlugins("beforeLayout", {
                cancelable: !0
            }) === !1) return;
        at.update(this, this.width, this.height, t);
        let i = this.chartArea,
            n = i.width <= 0 || i.height <= 0;
        this._layers = [], R(this.boxes, s => {
            n && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()))
        }, this), this._layers.forEach((s, o) => {
            s._idx = o
        }), this.notifyPlugins("afterLayout")
    }
    _updateDatasets(t) {
        if (this.notifyPlugins("beforeDatasetsUpdate", {
                mode: t,
                cancelable: !0
            }) !== !1) {
            for (let i = 0, n = this.data.datasets.length; i < n; ++i) this.getDatasetMeta(i).controller.configure();
            for (let i = 0, n = this.data.datasets.length; i < n; ++i) this._updateDataset(i, bt(t) ? t({
                datasetIndex: i
            }) : t);
            this.notifyPlugins("afterDatasetsUpdate", {
                mode: t
            })
        }
    }
    _updateDataset(t, i) {
        let n = this.getDatasetMeta(t),
            s = {
                meta: n,
                index: t,
                mode: i,
                cancelable: !0
            };
        this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (n.controller._update(i), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s))
    }
    render() {
        this.notifyPlugins("beforeRender", {
            cancelable: !0
        }) !== !1 && (vt.has(this) ? this.attached && !vt.running(this) && vt.start(this) : (this.draw(), Rc({
            chart: this
        })))
    }
    draw() {
        let t;
        if (this._resizeBeforeDraw) {
            let {
                width: n,
                height: s
            } = this._resizeBeforeDraw;
            this._resize(n, s), this._resizeBeforeDraw = null
        }
        if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
                cancelable: !0
            }) === !1) return;
        let i = this._layers;
        for (t = 0; t < i.length && i[t].z <= 0; ++t) i[t].draw(this.chartArea);
        for (this._drawDatasets(); t < i.length; ++t) i[t].draw(this.chartArea);
        this.notifyPlugins("afterDraw")
    }
    _getSortedDatasetMetas(t) {
        let i = this._sortedMetasets,
            n = [],
            s, o;
        for (s = 0, o = i.length; s < o; ++s) {
            let r = i[s];
            (!t || r.visible) && n.push(r)
        }
        return n
    }
    getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(!0)
    }
    _drawDatasets() {
        if (this.notifyPlugins("beforeDatasetsDraw", {
                cancelable: !0
            }) === !1) return;
        let t = this.getSortedVisibleDatasetMetas();
        for (let i = t.length - 1; i >= 0; --i) this._drawDataset(t[i]);
        this.notifyPlugins("afterDatasetsDraw")
    }
    _drawDataset(t) {
        let i = this.ctx,
            n = t._clip,
            s = !n.disabled,
            o = Lx(t) || this.chartArea,
            r = {
                meta: t,
                index: t.index,
                cancelable: !0
            };
        this.notifyPlugins("beforeDatasetDraw", r) !== !1 && (s && je(i, {
            left: n.left === !1 ? 0 : o.left - n.left,
            right: n.right === !1 ? this.width : o.right + n.right,
            top: n.top === !1 ? 0 : o.top - n.top,
            bottom: n.bottom === !1 ? this.height : o.bottom + n.bottom
        }), t.controller.draw(), s && Ve(i), r.cancelable = !1, this.notifyPlugins("afterDatasetDraw", r))
    }
    isPointInArea(t) {
        return ut(t, this.chartArea, this._minPadding)
    }
    getElementsAtEventForMode(t, i, n, s) {
        let o = E_.modes[i];
        return typeof o == "function" ? o(this, t, n, s) : []
    }
    getDatasetMeta(t) {
        let i = this.data.datasets[t],
            n = this._metasets,
            s = n.filter(o => o && o._dataset === i).pop();
        return s || (s = {
            type: null,
            data: [],
            dataset: null,
            controller: null,
            hidden: null,
            xAxisID: null,
            yAxisID: null,
            order: i && i.order || 0,
            index: t,
            _dataset: i,
            _parsed: [],
            _sorted: !1
        }, n.push(s)), s
    }
    getContext() {
        return this.$context || (this.$context = yt(null, {
            chart: this,
            type: "chart"
        }))
    }
    getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length
    }
    isDatasetVisible(t) {
        let i = this.data.datasets[t];
        if (!i) return !1;
        let n = this.getDatasetMeta(t);
        return typeof n.hidden == "boolean" ? !n.hidden : !i.hidden
    }
    setDatasetVisibility(t, i) {
        let n = this.getDatasetMeta(t);
        n.hidden = !i
    }
    toggleDataVisibility(t) {
        this._hiddenIndices[t] = !this._hiddenIndices[t]
    }
    getDataVisibility(t) {
        return !this._hiddenIndices[t]
    }
    _updateVisibility(t, i, n) {
        let s = n ? "show" : "hide",
            o = this.getDatasetMeta(t),
            r = o.controller._resolveAnimations(void 0, s);
        oe(i) ? (o.data[i].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), r.update(o, {
            visible: n
        }), this.update(a => a.datasetIndex === t ? s : void 0))
    }
    hide(t, i) {
        this._updateVisibility(t, i, !1)
    }
    show(t, i) {
        this._updateVisibility(t, i, !0)
    }
    _destroyDatasetMeta(t) {
        let i = this._metasets[t];
        i && i.controller && i.controller._destroy(), delete this._metasets[t]
    }
    _stop() {
        let t, i;
        for (this.stop(), vt.remove(this), t = 0, i = this.data.datasets.length; t < i; ++t) this._destroyDatasetMeta(t)
    }
    destroy() {
        this.notifyPlugins("beforeDestroy");
        let {
            canvas: t,
            ctx: i
        } = this;
        this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Hn(t, i), this.platform.releaseContext(i), this.canvas = null, this.ctx = null), delete Ii[this.id], this.notifyPlugins("afterDestroy")
    }
    toBase64Image(...t) {
        return this.canvas.toDataURL(...t)
    }
    bindEvents() {
        this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0
    }
    bindUserEvents() {
        let t = this._listeners,
            i = this.platform,
            n = (o, r) => {
                i.addEventListener(this, o, r), t[o] = r
            },
            s = (o, r, a) => {
                o.offsetX = r, o.offsetY = a, this._eventHandler(o)
            };
        R(this.options.events, o => n(o, s))
    }
    bindResponsiveEvents() {
        this._responsiveListeners || (this._responsiveListeners = {});
        let t = this._responsiveListeners,
            i = this.platform,
            n = (l, c) => {
                i.addEventListener(this, l, c), t[l] = c
            },
            s = (l, c) => {
                t[l] && (i.removeEventListener(this, l, c), delete t[l])
            },
            o = (l, c) => {
                this.canvas && this.resize(l, c)
            },
            r, a = () => {
                s("attach", a), this.attached = !0, this.resize(), n("resize", o), n("detach", r)
            };
        r = () => {
            this.attached = !1, s("resize", o), this._stop(), this._resize(0, 0), n("attach", a)
        }, i.isAttached(this.canvas) ? a() : r()
    }
    unbindEvents() {
        R(this._listeners, (t, i) => {
            this.platform.removeEventListener(this, i, t)
        }), this._listeners = {}, R(this._responsiveListeners, (t, i) => {
            this.platform.removeEventListener(this, i, t)
        }), this._responsiveListeners = void 0
    }
    updateHoverStyle(t, i, n) {
        let s = n ? "set" : "remove",
            o, r, a, l;
        for (i === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + s + "DatasetHoverStyle"]()), a = 0, l = t.length; a < l; ++a) {
            r = t[a];
            let c = r && this.getDatasetMeta(r.datasetIndex).controller;
            c && c[s + "HoverStyle"](r.element, r.datasetIndex, r.index)
        }
    }
    getActiveElements() {
        return this._active || []
    }
    setActiveElements(t) {
        let i = this._active || [],
            n = t.map(({
                datasetIndex: o,
                index: r
            }) => {
                let a = this.getDatasetMeta(o);
                if (!a) throw new Error("No dataset found at index " + o);
                return {
                    datasetIndex: o,
                    element: a.data[r],
                    index: r
                }
            });
        !ze(n, i) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, i))
    }
    notifyPlugins(t, i, n) {
        return this._plugins.notify(this, t, i, n)
    }
    isPluginEnabled(t) {
        return this._plugins._cache.filter(i => i.plugin.id === t).length === 1
    }
    _updateHoverStyles(t, i, n) {
        let s = this.options.hover,
            o = (l, c) => l.filter(h => !c.some(u => h.datasetIndex === u.datasetIndex && h.index === u.index)),
            r = o(i, t),
            a = n ? t : o(t, i);
        r.length && this.updateHoverStyle(r, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0)
    }
    _eventHandler(t, i) {
        let n = {
                event: t,
                replay: i,
                cancelable: !0,
                inChartArea: this.isPointInArea(t)
            },
            s = r => (r.options.events || this.options.events).includes(t.native.type);
        if (this.notifyPlugins("beforeEvent", n, s) === !1) return;
        let o = this._handleEvent(t, i, n.inChartArea);
        return n.cancelable = !1, this.notifyPlugins("afterEvent", n, s), (o || n.changed) && this.render(), this
    }
    _handleEvent(t, i, n) {
        let {
            _active: s = [],
            options: o
        } = this, r = i, a = this._getActiveElements(t, s, n, r), l = Rl(t), c = Tx(t, this._lastEvent, n, l);
        n && (this._lastEvent = null, F(o.onHover, [t, a, this], this), l && F(o.onClick, [t, a, this], this));
        let h = !ze(a, s);
        return (h || i) && (this._active = a, this._updateHoverStyles(a, s, i)), this._lastEvent = c, h
    }
    _getActiveElements(t, i, n, s) {
        if (t.type === "mouseout") return [];
        if (!n) return i;
        let o = this.options.hover;
        return this.getElementsAtEventForMode(t, o.mode, o, s)
    }
};

function Fc() {
    return R(fe.instances, e => e._plugins.invalidate())
}

function Ex(e, t, i) {
    let {
        startAngle: n,
        pixelMargin: s,
        x: o,
        y: r,
        outerRadius: a,
        innerRadius: l
    } = t, c = s / a;
    e.beginPath(), e.arc(o, r, a, n - c, i + c), l > s ? (c = s / l, e.arc(o, r, l, i + c, n - c, !0)) : e.arc(o, r, s, i + H, n - H), e.closePath(), e.clip()
}

function Rx(e) {
    return ki(e, ["outerStart", "outerEnd", "innerStart", "innerEnd"])
}

function Ix(e, t, i, n) {
    let s = Rx(e.options.borderRadius),
        o = (i - t) / 2,
        r = Math.min(o, n * t / 2),
        a = l => {
            let c = (i - Math.min(o, l)) * n / 2;
            return X(l, 0, Math.min(o, c))
        };
    return {
        outerStart: a(s.outerStart),
        outerEnd: a(s.outerEnd),
        innerStart: X(s.innerStart, 0, r),
        innerEnd: X(s.innerEnd, 0, r)
    }
}

function ue(e, t, i, n) {
    return {
        x: i + e * Math.cos(t),
        y: n + e * Math.sin(t)
    }
}

function qi(e, t, i, n, s, o) {
    let {
        x: r,
        y: a,
        startAngle: l,
        pixelMargin: c,
        innerRadius: h
    } = t, u = Math.max(t.outerRadius + n + i - c, 0), d = h > 0 ? h + n + i + c : 0, f = 0, g = s - l;
    if (n) {
        let I = h > 0 ? h - n : 0,
            N = u > 0 ? u - n : 0,
            $ = (I + N) / 2,
            lt = $ !== 0 ? g * $ / ($ + n) : g;
        f = (g - lt) / 2
    }
    let p = Math.max(.001, g * u - i / V) / u,
        m = (g - p) / 2,
        b = l + m + f,
        _ = s - m - f,
        {
            outerStart: v,
            outerEnd: M,
            innerStart: y,
            innerEnd: w
        } = Ix(t, d, u, _ - b),
        k = u - v,
        S = u - M,
        P = b + v / k,
        A = _ - M / S,
        C = d + y,
        L = d + w,
        Y = b + y / C,
        st = _ - w / L;
    if (e.beginPath(), o) {
        let I = (P + A) / 2;
        if (e.arc(r, a, u, P, I), e.arc(r, a, u, I, A), M > 0) {
            let Z = ue(S, A, r, a);
            e.arc(Z.x, Z.y, M, A, _ + H)
        }
        let N = ue(L, _, r, a);
        if (e.lineTo(N.x, N.y), w > 0) {
            let Z = ue(L, st, r, a);
            e.arc(Z.x, Z.y, w, _ + H, st + Math.PI)
        }
        let $ = (_ - w / d + (b + y / d)) / 2;
        if (e.arc(r, a, d, _ - w / d, $, !0), e.arc(r, a, d, $, b + y / d, !0), y > 0) {
            let Z = ue(C, Y, r, a);
            e.arc(Z.x, Z.y, y, Y + Math.PI, b - H)
        }
        let lt = ue(k, b, r, a);
        if (e.lineTo(lt.x, lt.y), v > 0) {
            let Z = ue(k, P, r, a);
            e.arc(Z.x, Z.y, v, b - H, P)
        }
    } else {
        e.moveTo(r, a);
        let I = Math.cos(P) * u + r,
            N = Math.sin(P) * u + a;
        e.lineTo(I, N);
        let $ = Math.cos(A) * u + r,
            lt = Math.sin(A) * u + a;
        e.lineTo($, lt)
    }
    e.closePath()
}

function Fx(e, t, i, n, s) {
    let {
        fullCircles: o,
        startAngle: r,
        circumference: a
    } = t, l = t.endAngle;
    if (o) {
        qi(e, t, i, n, l, s);
        for (let c = 0; c < o; ++c) e.fill();
        isNaN(a) || (l = r + (a % B || B))
    }
    return qi(e, t, i, n, l, s), e.fill(), l
}

function zx(e, t, i, n, s) {
    let {
        fullCircles: o,
        startAngle: r,
        circumference: a,
        options: l
    } = t, {
        borderWidth: c,
        borderJoinStyle: h,
        borderDash: u,
        borderDashOffset: d
    } = l, f = l.borderAlign === "inner";
    if (!c) return;
    e.setLineDash(u || []), e.lineDashOffset = d, f ? (e.lineWidth = c * 2, e.lineJoin = h || "round") : (e.lineWidth = c, e.lineJoin = h || "bevel");
    let g = t.endAngle;
    if (o) {
        qi(e, t, i, n, g, s);
        for (let p = 0; p < o; ++p) e.stroke();
        isNaN(a) || (g = r + (a % B || B))
    }
    f && Ex(e, t, g), o || (qi(e, t, i, n, g, s), e.stroke())
}
var zc = class extends ht {
    static id = "arc";
    static defaults = {
        borderAlign: "center",
        borderColor: "#fff",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: void 0,
        borderRadius: 0,
        borderWidth: 2,
        offset: 0,
        spacing: 0,
        angle: void 0,
        circular: !0
    };
    static defaultRoutes = {
        backgroundColor: "backgroundColor"
    };
    static descriptors = {
        _scriptable: !0,
        _indexable: t => t !== "borderDash"
    };
    circumference;
    endAngle;
    fullCircles;
    innerRadius;
    outerRadius;
    pixelMargin;
    startAngle;
    constructor(t) {
        super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t && Object.assign(this, t)
    }
    inRange(t, i, n) {
        let s = this.getProps(["x", "y"], n),
            {
                angle: o,
                distance: r
            } = In(s, {
                x: t,
                y: i
            }),
            {
                startAngle: a,
                endAngle: l,
                innerRadius: c,
                outerRadius: h,
                circumference: u
            } = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], n),
            d = (this.options.spacing + this.options.borderWidth) / 2,
            g = O(u, l - a) >= B || le(o, a, l),
            p = ft(r, c + d, h + d);
        return g && p
    }
    getCenterPoint(t) {
        let {
            x: i,
            y: n,
            startAngle: s,
            endAngle: o,
            innerRadius: r,
            outerRadius: a
        } = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"], t), {
            offset: l,
            spacing: c
        } = this.options, h = (s + o) / 2, u = (r + a + c + l) / 2;
        return {
            x: i + Math.cos(h) * u,
            y: n + Math.sin(h) * u
        }
    }
    tooltipPosition(t) {
        return this.getCenterPoint(t)
    }
    draw(t) {
        let {
            options: i,
            circumference: n
        } = this, s = (i.offset || 0) / 4, o = (i.spacing || 0) / 2, r = i.circular;
        if (this.pixelMargin = i.borderAlign === "inner" ? .33 : 0, this.fullCircles = n > B ? Math.floor(n / B) : 0, n === 0 || this.innerRadius < 0 || this.outerRadius < 0) return;
        t.save();
        let a = (this.startAngle + this.endAngle) / 2;
        t.translate(Math.cos(a) * s, Math.sin(a) * s);
        let l = 1 - Math.sin(Math.min(V, n || 0)),
            c = s * l;
        t.fillStyle = i.backgroundColor, t.strokeStyle = i.borderColor, Fx(t, this, c, o, r), zx(t, this, c, o, r), t.restore()
    }
};

function Sh(e, t, i = t) {
    e.lineCap = O(i.borderCapStyle, t.borderCapStyle), e.setLineDash(O(i.borderDash, t.borderDash)), e.lineDashOffset = O(i.borderDashOffset, t.borderDashOffset), e.lineJoin = O(i.borderJoinStyle, t.borderJoinStyle), e.lineWidth = O(i.borderWidth, t.borderWidth), e.strokeStyle = O(i.borderColor, t.borderColor)
}

function Bx(e, t, i) {
    e.lineTo(i.x, i.y)
}

function jx(e) {
    return e.stepped ? Xl : e.tension || e.cubicInterpolationMode === "monotone" ? Kl : Bx
}

function wh(e, t, i = {}) {
    let n = e.length,
        {
            start: s = 0,
            end: o = n - 1
        } = i,
        {
            start: r,
            end: a
        } = t,
        l = Math.max(s, r),
        c = Math.min(o, a),
        h = s < r && o < r || s > a && o > a;
    return {
        count: n,
        start: l,
        loop: t.loop,
        ilen: c < l && !h ? n + c - l : c - l
    }
}

function Vx(e, t, i, n) {
    let {
        points: s,
        options: o
    } = t, {
        count: r,
        start: a,
        loop: l,
        ilen: c
    } = wh(s, i, n), h = jx(o), {
        move: u = !0,
        reverse: d
    } = n || {}, f, g, p;
    for (f = 0; f <= c; ++f) g = s[(a + (d ? c - f : f)) % r], !g.skip && (u ? (e.moveTo(g.x, g.y), u = !1) : h(e, p, g, d, o.stepped), p = g);
    return l && (g = s[(a + (d ? c : 0)) % r], h(e, p, g, d, o.stepped)), !!l
}

function Nx(e, t, i, n) {
    let s = t.points,
        {
            count: o,
            start: r,
            ilen: a
        } = wh(s, i, n),
        {
            move: l = !0,
            reverse: c
        } = n || {},
        h = 0,
        u = 0,
        d, f, g, p, m, b, _ = M => (r + (c ? a - M : M)) % o,
        v = () => {
            p !== m && (e.lineTo(h, m), e.lineTo(h, p), e.lineTo(h, b))
        };
    for (l && (f = s[_(0)], e.moveTo(f.x, f.y)), d = 0; d <= a; ++d) {
        if (f = s[_(d)], f.skip) continue;
        let M = f.x,
            y = f.y,
            w = M | 0;
        w === g ? (y < p ? p = y : y > m && (m = y), h = (u * h + M) / ++u) : (v(), e.lineTo(M, y), g = w, u = 0, p = m = y), b = y
    }
    v()
}

function vs(e) {
    let t = e.options,
        i = t.borderDash && t.borderDash.length;
    return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !i ? Nx : Vx
}

function Hx(e) {
    return e.stepped ? sc : e.tension || e.cubicInterpolationMode === "monotone" ? oc : Pt
}

function Wx(e, t, i, n) {
    let s = t._path;
    s || (s = t._path = new Path2D, t.path(s, i, n) && s.closePath()), Sh(e, t.options), e.stroke(s)
}

function qx(e, t, i, n) {
    let {
        segments: s,
        options: o
    } = t, r = vs(t);
    for (let a of s) Sh(e, o, a.style), e.beginPath(), r(e, t, a, {
        start: i,
        end: i + n - 1
    }) && e.closePath(), e.stroke()
}
var $x = typeof Path2D == "function";

function Ux(e, t, i, n) {
    $x && !t.options.segment ? Wx(e, t, i, n) : qx(e, t, i, n)
}
var Ze = class extends ht {
    static id = "line";
    static defaults = {
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        borderWidth: 3,
        capBezierPoints: !0,
        cubicInterpolationMode: "default",
        fill: !1,
        spanGaps: !1,
        stepped: !1,
        tension: 0
    };
    static defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
    };
    static descriptors = {
        _scriptable: !0,
        _indexable: t => t !== "borderDash" && t !== "fill"
    };
    constructor(t) {
        super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t)
    }
    updateControlPoints(t, i) {
        let n = this.options;
        if ((n.tension || n.cubicInterpolationMode === "monotone") && !n.stepped && !this._pointsUpdated) {
            let s = n.spanGaps ? this._loop : this._fullLoop;
            ec(this._points, n, t, s, i), this._pointsUpdated = !0
        }
    }
    set points(t) {
        this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1
    }
    get points() {
        return this._points
    }
    get segments() {
        return this._segments || (this._segments = ac(this, this.options.segment))
    }
    first() {
        let t = this.segments,
            i = this.points;
        return t.length && i[t[0].start]
    }
    last() {
        let t = this.segments,
            i = this.points,
            n = t.length;
        return n && i[t[n - 1].end]
    }
    interpolate(t, i) {
        let n = this.options,
            s = t[i],
            o = this.points,
            r = es(this, {
                property: i,
                start: s,
                end: s
            });
        if (!r.length) return;
        let a = [],
            l = Hx(n),
            c, h;
        for (c = 0, h = r.length; c < h; ++c) {
            let {
                start: u,
                end: d
            } = r[c], f = o[u], g = o[d];
            if (f === g) {
                a.push(f);
                continue
            }
            let p = Math.abs((s - f[i]) / (g[i] - f[i])),
                m = l(f, g, p, n.stepped);
            m[i] = t[i], a.push(m)
        }
        return a.length === 1 ? a[0] : a
    }
    pathSegment(t, i, n) {
        return vs(this)(t, this, i, n)
    }
    path(t, i, n) {
        let s = this.segments,
            o = vs(this),
            r = this._loop;
        i = i || 0, n = n || this.points.length - i;
        for (let a of s) r &= o(t, this, a, {
            start: i,
            end: i + n - 1
        });
        return !!r
    }
    draw(t, i, n, s) {
        let o = this.options || {};
        (this.points || []).length && o.borderWidth && (t.save(), Ux(t, this, n, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0)
    }
};

function Bc(e, t, i, n) {
    let s = e.options,
        {
            [i]: o
        } = e.getProps([i], n);
    return Math.abs(t - o) < s.radius + s.hitRadius
}
var jc = class extends ht {
    static id = "point";
    parsed;
    skip;
    stop;
    static defaults = {
        borderWidth: 1,
        hitRadius: 1,
        hoverBorderWidth: 1,
        hoverRadius: 4,
        pointStyle: "circle",
        radius: 3,
        rotation: 0
    };
    static defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
    };
    constructor(t) {
        super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t && Object.assign(this, t)
    }
    inRange(t, i, n) {
        let s = this.options,
            {
                x: o,
                y: r
            } = this.getProps(["x", "y"], n);
        return Math.pow(t - o, 2) + Math.pow(i - r, 2) < Math.pow(s.hitRadius + s.radius, 2)
    }
    inXRange(t, i) {
        return Bc(this, t, "x", i)
    }
    inYRange(t, i) {
        return Bc(this, t, "y", i)
    }
    getCenterPoint(t) {
        let {
            x: i,
            y: n
        } = this.getProps(["x", "y"], t);
        return {
            x: i,
            y: n
        }
    }
    size(t) {
        t = t || this.options || {};
        let i = t.radius || 0;
        i = Math.max(i, i && t.hoverRadius || 0);
        let n = i && t.borderWidth || 0;
        return (i + n) * 2
    }
    draw(t, i) {
        let n = this.options;
        this.skip || n.radius < .1 || !ut(this, i, this.size(n) / 2) || (t.strokeStyle = n.borderColor, t.lineWidth = n.borderWidth, t.fillStyle = n.backgroundColor, wi(t, n, this.x, this.y))
    }
    getRange() {
        let t = this.options || {};
        return t.radius + t.hitRadius
    }
};

function kh(e, t) {
    let {
        x: i,
        y: n,
        base: s,
        width: o,
        height: r
    } = e.getProps(["x", "y", "base", "width", "height"], t), a, l, c, h, u;
    return e.horizontal ? (u = r / 2, a = Math.min(i, s), l = Math.max(i, s), c = n - u, h = n + u) : (u = o / 2, a = i - u, l = i + u, c = Math.min(n, s), h = Math.max(n, s)), {
        left: a,
        top: c,
        right: l,
        bottom: h
    }
}

function Et(e, t, i, n) {
    return e ? 0 : X(t, i, n)
}

function Yx(e, t, i) {
    let n = e.options.borderWidth,
        s = e.borderSkipped,
        o = qn(n);
    return {
        t: Et(s.top, o.top, 0, i),
        r: Et(s.right, o.right, 0, t),
        b: Et(s.bottom, o.bottom, 0, i),
        l: Et(s.left, o.left, 0, t)
    }
}

function Xx(e, t, i) {
    let {
        enableBorderRadius: n
    } = e.getProps(["enableBorderRadius"]), s = e.options.borderRadius, o = Tt(s), r = Math.min(t, i), a = e.borderSkipped, l = n || D(s);
    return {
        topLeft: Et(!l || a.top || a.left, o.topLeft, 0, r),
        topRight: Et(!l || a.top || a.right, o.topRight, 0, r),
        bottomLeft: Et(!l || a.bottom || a.left, o.bottomLeft, 0, r),
        bottomRight: Et(!l || a.bottom || a.right, o.bottomRight, 0, r)
    }
}

function Kx(e) {
    let t = kh(e),
        i = t.right - t.left,
        n = t.bottom - t.top,
        s = Yx(e, i / 2, n / 2),
        o = Xx(e, i / 2, n / 2);
    return {
        outer: {
            x: t.left,
            y: t.top,
            w: i,
            h: n,
            radius: o
        },
        inner: {
            x: t.left + s.l,
            y: t.top + s.t,
            w: i - s.l - s.r,
            h: n - s.t - s.b,
            radius: {
                topLeft: Math.max(0, o.topLeft - Math.max(s.t, s.l)),
                topRight: Math.max(0, o.topRight - Math.max(s.t, s.r)),
                bottomLeft: Math.max(0, o.bottomLeft - Math.max(s.b, s.l)),
                bottomRight: Math.max(0, o.bottomRight - Math.max(s.b, s.r))
            }
        }
    }
}

function ls(e, t, i, n) {
    let s = t === null,
        o = i === null,
        a = e && !(s && o) && kh(e, n);
    return a && (s || ft(t, a.left, a.right)) && (o || ft(i, a.top, a.bottom))
}

function Gx(e) {
    return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight
}

function Zx(e, t) {
    e.rect(t.x, t.y, t.w, t.h)
}

function cs(e, t, i = {}) {
    let n = e.x !== i.x ? -t : 0,
        s = e.y !== i.y ? -t : 0,
        o = (e.x + e.w !== i.x + i.w ? t : 0) - n,
        r = (e.y + e.h !== i.y + i.h ? t : 0) - s;
    return {
        x: e.x + n,
        y: e.y + s,
        w: e.w + o,
        h: e.h + r,
        radius: e.radius
    }
}
var Vc = class extends ht {
    static id = "bar";
    static defaults = {
        borderSkipped: "start",
        borderWidth: 0,
        borderRadius: 0,
        inflateAmount: "auto",
        pointStyle: void 0
    };
    static defaultRoutes = {
        backgroundColor: "backgroundColor",
        borderColor: "borderColor"
    };
    constructor(t) {
        super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t)
    }
    draw(t) {
        let {
            inflateAmount: i,
            options: {
                borderColor: n,
                backgroundColor: s
            }
        } = this, {
            inner: o,
            outer: r
        } = Kx(this), a = Gx(r.radius) ? he : Zx;
        t.save(), (r.w !== o.w || r.h !== o.h) && (t.beginPath(), a(t, cs(r, i, o)), t.clip(), a(t, cs(o, -i, r)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), a(t, cs(o, i)), t.fillStyle = s, t.fill(), t.restore()
    }
    inRange(t, i, n) {
        return ls(this, t, i, n)
    }
    inXRange(t, i) {
        return ls(this, t, null, i)
    }
    inYRange(t, i) {
        return ls(this, null, t, i)
    }
    getCenterPoint(t) {
        let {
            x: i,
            y: n,
            base: s,
            horizontal: o
        } = this.getProps(["x", "y", "base", "horizontal"], t);
        return {
            x: o ? (i + s) / 2 : i,
            y: o ? n : (n + s) / 2
        }
    }
    getRange(t) {
        return t === "x" ? this.width / 2 : this.height / 2
    }
};

function Jx(e, t, i) {
    let n = e.segments,
        s = e.points,
        o = t.points,
        r = [];
    for (let a of n) {
        let {
            start: l,
            end: c
        } = a;
        c = ws(l, c, s);
        let h = Ms(i, s[l], s[c], a.loop);
        if (!t.segments) {
            r.push({
                source: a,
                target: h,
                start: s[l],
                end: s[c]
            });
            continue
        }
        let u = es(t, h);
        for (let d of u) {
            let f = Ms(i, o[d.start], o[d.end], d.loop),
                g = ts(a, s, f);
            for (let p of g) r.push({
                source: p,
                target: d,
                start: {
                    [i]: Nc(h, f, "start", Math.max)
                },
                end: {
                    [i]: Nc(h, f, "end", Math.min)
                }
            })
        }
    }
    return r
}

function Ms(e, t, i, n) {
    if (n) return;
    let s = t[e],
        o = i[e];
    return e === "angle" && (s = tt(s), o = tt(o)), {
        property: e,
        start: s,
        end: o
    }
}

function Qx(e, t) {
    let {
        x: i = null,
        y: n = null
    } = e || {}, s = t.points, o = [];
    return t.segments.forEach(({
        start: r,
        end: a
    }) => {
        a = ws(r, a, s);
        let l = s[r],
            c = s[a];
        n !== null ? (o.push({
            x: l.x,
            y: n
        }), o.push({
            x: c.x,
            y: n
        })) : i !== null && (o.push({
            x: i,
            y: l.y
        }), o.push({
            x: i,
            y: c.y
        }))
    }), o
}

function ws(e, t, i) {
    for (; t > e; t--) {
        let n = i[t];
        if (!isNaN(n.x) && !isNaN(n.y)) break
    }
    return t
}

function Nc(e, t, i, n) {
    return e && t ? n(e[i], t[i]) : e ? e[i] : t ? t[i] : 0
}

function Ph(e, t) {
    let i = [],
        n = !1;
    return z(e) ? (n = !0, i = e) : i = Qx(e, t), i.length ? new Ze({
        points: i,
        options: {
            tension: 0
        },
        _loop: n,
        _fullLoop: n
    }) : null
}

function Hc(e) {
    return e && e.fill !== !1
}

function ty(e, t, i) {
    let s = e[t].fill,
        o = [t],
        r;
    if (!i) return s;
    for (; s !== !1 && o.indexOf(s) === -1;) {
        if (!W(s)) return s;
        if (r = e[s], !r) return !1;
        if (r.visible) return s;
        o.push(s), s = r.fill
    }
    return !1
}

function ey(e, t, i) {
    let n = oy(e);
    if (D(n)) return isNaN(n.value) ? !1 : n;
    let s = parseFloat(n);
    return W(s) && Math.floor(s) === s ? iy(n[0], t, s, i) : ["origin", "start", "end", "stack", "shape"].indexOf(n) >= 0 && n
}

function iy(e, t, i, n) {
    return (e === "-" || e === "+") && (i = t + i), i === t || i < 0 || i >= n ? !1 : i
}

function ny(e, t) {
    let i = null;
    return e === "start" ? i = t.bottom : e === "end" ? i = t.top : D(e) ? i = t.getPixelForValue(e.value) : t.getBasePixel && (i = t.getBasePixel()), i
}

function sy(e, t, i) {
    let n;
    return e === "start" ? n = i : e === "end" ? n = t.options.reverse ? t.min : t.max : D(e) ? n = e.value : n = t.getBaseValue(), n
}

function oy(e) {
    let t = e.options,
        i = t.fill,
        n = O(i && i.target, i);
    return n === void 0 && (n = !!t.backgroundColor), n === !1 || n === null ? !1 : n === !0 ? "origin" : n
}

function ry(e) {
    let {
        scale: t,
        index: i,
        line: n
    } = e, s = [], o = n.segments, r = n.points, a = ay(t, i);
    a.push(Ph({
        x: null,
        y: t.bottom
    }, n));
    for (let l = 0; l < o.length; l++) {
        let c = o[l];
        for (let h = c.start; h <= c.end; h++) ly(s, r[h], a)
    }
    return new Ze({
        points: s,
        options: {}
    })
}

function ay(e, t) {
    let i = [],
        n = e.getMatchingVisibleMetas("line");
    for (let s = 0; s < n.length; s++) {
        let o = n[s];
        if (o.index === t) break;
        o.hidden || i.unshift(o.dataset)
    }
    return i
}

function ly(e, t, i) {
    let n = [];
    for (let s = 0; s < i.length; s++) {
        let o = i[s],
            {
                first: r,
                last: a,
                point: l
            } = cy(o, t, "x");
        if (!(!l || r && a)) {
            if (r) n.unshift(l);
            else if (e.push(l), !a) break
        }
    }
    e.push(...n)
}

function cy(e, t, i) {
    let n = e.interpolate(t, i);
    if (!n) return {};
    let s = n[i],
        o = e.segments,
        r = e.points,
        a = !1,
        l = !1;
    for (let c = 0; c < o.length; c++) {
        let h = o[c],
            u = r[h.start][i],
            d = r[h.end][i];
        if (ft(s, u, d)) {
            a = s === u, l = s === d;
            break
        }
    }
    return {
        first: a,
        last: l,
        point: n
    }
}
var $i = class {
    constructor(t) {
        this.x = t.x, this.y = t.y, this.radius = t.radius
    }
    pathSegment(t, i, n) {
        let {
            x: s,
            y: o,
            radius: r
        } = this;
        return i = i || {
            start: 0,
            end: B
        }, t.arc(s, o, r, i.end, i.start, !0), !n.bounds
    }
    interpolate(t) {
        let {
            x: i,
            y: n,
            radius: s
        } = this, o = t.angle;
        return {
            x: i + Math.cos(o) * s,
            y: n + Math.sin(o) * s,
            angle: o
        }
    }
};

function hy(e) {
    let {
        chart: t,
        fill: i,
        line: n
    } = e;
    if (W(i)) return uy(t, i);
    if (i === "stack") return ry(e);
    if (i === "shape") return !0;
    let s = dy(e);
    return s instanceof $i ? s : Ph(s, n)
}

function uy(e, t) {
    let i = e.getDatasetMeta(t);
    return i && e.isDatasetVisible(t) ? i.dataset : null
}

function dy(e) {
    return (e.scale || {}).getPointPositionForValue ? gy(e) : fy(e)
}

function fy(e) {
    let {
        scale: t = {},
        fill: i
    } = e, n = ny(i, t);
    if (W(n)) {
        let s = t.isHorizontal();
        return {
            x: s ? n : null,
            y: s ? null : n
        }
    }
    return null
}

function gy(e) {
    let {
        scale: t,
        fill: i
    } = e, n = t.options, s = t.getLabels().length, o = n.reverse ? t.max : t.min, r = sy(i, t, o), a = [];
    if (n.grid.circular) {
        let l = t.getPointPositionForValue(0, o);
        return new $i({
            x: l.x,
            y: l.y,
            radius: t.getDistanceFromCenterForValue(r)
        })
    }
    for (let l = 0; l < s; ++l) a.push(t.getPointPositionForValue(l, r));
    return a
}

function hs(e, t, i) {
    let n = hy(t),
        {
            line: s,
            scale: o,
            axis: r
        } = t,
        a = s.options,
        l = a.fill,
        c = a.backgroundColor,
        {
            above: h = c,
            below: u = c
        } = l || {};
    n && s.points.length && (je(e, i), py(e, {
        line: s,
        target: n,
        above: h,
        below: u,
        area: i,
        scale: o,
        axis: r
    }), Ve(e))
}

function py(e, t) {
    let {
        line: i,
        target: n,
        above: s,
        below: o,
        area: r,
        scale: a
    } = t, l = i._loop ? "angle" : t.axis;
    e.save(), l === "x" && o !== s && (Wc(e, n, r.top), qc(e, {
        line: i,
        target: n,
        color: s,
        scale: a,
        property: l
    }), e.restore(), e.save(), Wc(e, n, r.bottom)), qc(e, {
        line: i,
        target: n,
        color: o,
        scale: a,
        property: l
    }), e.restore()
}

function Wc(e, t, i) {
    let {
        segments: n,
        points: s
    } = t, o = !0, r = !1;
    e.beginPath();
    for (let a of n) {
        let {
            start: l,
            end: c
        } = a, h = s[l], u = s[ws(l, c, s)];
        o ? (e.moveTo(h.x, h.y), o = !1) : (e.lineTo(h.x, i), e.lineTo(h.x, h.y)), r = !!t.pathSegment(e, a, {
            move: r
        }), r ? e.closePath() : e.lineTo(u.x, i)
    }
    e.lineTo(t.first().x, i), e.closePath(), e.clip()
}

function qc(e, t) {
    let {
        line: i,
        target: n,
        property: s,
        color: o,
        scale: r
    } = t, a = Jx(i, n, s);
    for (let {
            source: l,
            target: c,
            start: h,
            end: u
        } of a) {
        let {
            style: {
                backgroundColor: d = o
            } = {}
        } = l, f = n !== !0;
        e.save(), e.fillStyle = d, my(e, r, f && Ms(s, h, u)), e.beginPath();
        let g = !!i.pathSegment(e, l),
            p;
        if (f) {
            g ? e.closePath() : $c(e, n, u, s);
            let m = !!n.pathSegment(e, c, {
                move: g,
                reverse: !0
            });
            p = g && m, p || $c(e, n, h, s)
        }
        e.closePath(), e.fill(p ? "evenodd" : "nonzero"), e.restore()
    }
}

function my(e, t, i) {
    let {
        top: n,
        bottom: s
    } = t.chart.chartArea, {
        property: o,
        start: r,
        end: a
    } = i || {};
    o === "x" && (e.beginPath(), e.rect(r, n, a - r, s - n), e.clip())
}

function $c(e, t, i, n) {
    let s = t.interpolate(i, n);
    s && e.lineTo(s.x, s.y)
}
var Kv = {
        id: "filler",
        afterDatasetsUpdate(e, t, i) {
            let n = (e.data.datasets || []).length,
                s = [],
                o, r, a, l;
            for (r = 0; r < n; ++r) o = e.getDatasetMeta(r), a = o.dataset, l = null, a && a.options && a instanceof Ze && (l = {
                visible: e.isDatasetVisible(r),
                index: r,
                fill: ey(a, r, n),
                chart: e,
                axis: o.controller.options.indexAxis,
                scale: o.vScale,
                line: a
            }), o.$filler = l, s.push(l);
            for (r = 0; r < n; ++r) l = s[r], !(!l || l.fill === !1) && (l.fill = ty(s, r, i.propagate))
        },
        beforeDraw(e, t, i) {
            let n = i.drawTime === "beforeDraw",
                s = e.getSortedVisibleDatasetMetas(),
                o = e.chartArea;
            for (let r = s.length - 1; r >= 0; --r) {
                let a = s[r].$filler;
                a && (a.line.updateControlPoints(o, a.axis), n && a.fill && hs(e.ctx, a, o))
            }
        },
        beforeDatasetsDraw(e, t, i) {
            if (i.drawTime !== "beforeDatasetsDraw") return;
            let n = e.getSortedVisibleDatasetMetas();
            for (let s = n.length - 1; s >= 0; --s) {
                let o = n[s].$filler;
                Hc(o) && hs(e.ctx, o, e.chartArea)
            }
        },
        beforeDatasetDraw(e, t, i) {
            let n = t.meta.$filler;
            !Hc(n) || i.drawTime !== "beforeDatasetDraw" || hs(e.ctx, n, e.chartArea)
        },
        defaults: {
            propagate: !0,
            drawTime: "beforeDatasetDraw"
        }
    },
    Uc = (e, t) => {
        let {
            boxHeight: i = t,
            boxWidth: n = t
        } = e;
        return e.usePointStyle && (i = Math.min(i, t), n = e.pointStyleWidth || Math.min(n, t)), {
            boxWidth: n,
            boxHeight: i,
            itemHeight: Math.max(t, i)
        }
    },
    by = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index,
    Ui = class extends ht {
        constructor(t) {
            super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
        }
        update(t, i, n) {
            this.maxWidth = t, this.maxHeight = i, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit()
        }
        setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height)
        }
        buildLabels() {
            let t = this.options.labels || {},
                i = F(t.generateLabels, [this.chart], this) || [];
            t.filter && (i = i.filter(n => t.filter(n, this.chart.data))), t.sort && (i = i.sort((n, s) => t.sort(n, s, this.chart.data))), this.options.reverse && i.reverse(), this.legendItems = i
        }
        fit() {
            let {
                options: t,
                ctx: i
            } = this;
            if (!t.display) {
                this.width = this.height = 0;
                return
            }
            let n = t.labels,
                s = U(n.font),
                o = s.size,
                r = this._computeTitleHeight(),
                {
                    boxWidth: a,
                    itemHeight: l
                } = Uc(n, o),
                c, h;
            i.font = s.string, this.isHorizontal() ? (c = this.maxWidth, h = this._fitRows(r, o, a, l) + 10) : (h = this.maxHeight, c = this._fitCols(r, s, a, l) + 10), this.width = Math.min(c, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight)
        }
        _fitRows(t, i, n, s) {
            let {
                ctx: o,
                maxWidth: r,
                options: {
                    labels: {
                        padding: a
                    }
                }
            } = this, l = this.legendHitBoxes = [], c = this.lineWidths = [0], h = s + a, u = t;
            o.textAlign = "left", o.textBaseline = "middle";
            let d = -1,
                f = -h;
            return this.legendItems.forEach((g, p) => {
                let m = n + i / 2 + o.measureText(g.text).width;
                (p === 0 || c[c.length - 1] + m + 2 * a > r) && (u += h, c[c.length - (p > 0 ? 0 : 1)] = 0, f += h, d++), l[p] = {
                    left: 0,
                    top: f,
                    row: d,
                    width: m,
                    height: s
                }, c[c.length - 1] += m + a
            }), u
        }
        _fitCols(t, i, n, s) {
            let {
                ctx: o,
                maxHeight: r,
                options: {
                    labels: {
                        padding: a
                    }
                }
            } = this, l = this.legendHitBoxes = [], c = this.columnSizes = [], h = r - t, u = a, d = 0, f = 0, g = 0, p = 0;
            return this.legendItems.forEach((m, b) => {
                let {
                    itemWidth: _,
                    itemHeight: v
                } = _y(n, i, o, m, s);
                b > 0 && f + v + 2 * a > h && (u += d + a, c.push({
                    width: d,
                    height: f
                }), g += d + a, p++, d = f = 0), l[b] = {
                    left: g,
                    top: f,
                    col: p,
                    width: _,
                    height: v
                }, d = Math.max(d, _), f += v + a
            }), u += d, c.push({
                width: d,
                height: f
            }), u
        }
        adjustHitBoxes() {
            if (!this.options.display) return;
            let t = this._computeTitleHeight(),
                {
                    legendHitBoxes: i,
                    options: {
                        align: n,
                        labels: {
                            padding: s
                        },
                        rtl: o
                    }
                } = this,
                r = jt(o, this.left, this.width);
            if (this.isHorizontal()) {
                let a = 0,
                    l = K(n, this.left + s, this.right - this.lineWidths[a]);
                for (let c of i) a !== c.row && (a = c.row, l = K(n, this.left + s, this.right - this.lineWidths[a])), c.top += this.top + t + s, c.left = r.leftForLtr(r.x(l), c.width), l += c.width + s
            } else {
                let a = 0,
                    l = K(n, this.top + t + s, this.bottom - this.columnSizes[a].height);
                for (let c of i) c.col !== a && (a = c.col, l = K(n, this.top + t + s, this.bottom - this.columnSizes[a].height)), c.top = l, c.left += this.left + s, c.left = r.leftForLtr(r.x(c.left), c.width), l += c.height + s
            }
        }
        isHorizontal() {
            return this.options.position === "top" || this.options.position === "bottom"
        }
        draw() {
            if (this.options.display) {
                let t = this.ctx;
                je(t, this), this._draw(), Ve(t)
            }
        }
        _draw() {
            let {
                options: t,
                columnSizes: i,
                lineWidths: n,
                ctx: s
            } = this, {
                align: o,
                labels: r
            } = t, a = q.color, l = jt(t.rtl, this.left, this.width), c = U(r.font), {
                padding: h
            } = r, u = c.size, d = u / 2, f;
            this.drawTitle(), s.textAlign = l.textAlign("left"), s.textBaseline = "middle", s.lineWidth = .5, s.font = c.string;
            let {
                boxWidth: g,
                boxHeight: p,
                itemHeight: m
            } = Uc(r, u), b = function(w, k, S) {
                if (isNaN(g) || g <= 0 || isNaN(p) || p < 0) return;
                s.save();
                let P = O(S.lineWidth, 1);
                if (s.fillStyle = O(S.fillStyle, a), s.lineCap = O(S.lineCap, "butt"), s.lineDashOffset = O(S.lineDashOffset, 0), s.lineJoin = O(S.lineJoin, "miter"), s.lineWidth = P, s.strokeStyle = O(S.strokeStyle, a), s.setLineDash(O(S.lineDash, [])), r.usePointStyle) {
                    let A = {
                            radius: p * Math.SQRT2 / 2,
                            pointStyle: S.pointStyle,
                            rotation: S.rotation,
                            borderWidth: P
                        },
                        C = l.xPlus(w, g / 2),
                        L = k + d;
                    Wn(s, A, C, L, r.pointStyleWidth && g)
                } else {
                    let A = k + Math.max((u - p) / 2, 0),
                        C = l.leftForLtr(w, g),
                        L = Tt(S.borderRadius);
                    s.beginPath(), Object.values(L).some(Y => Y !== 0) ? he(s, {
                        x: C,
                        y: A,
                        w: g,
                        h: p,
                        radius: L
                    }) : s.rect(C, A, g, p), s.fill(), P !== 0 && s.stroke()
                }
                s.restore()
            }, _ = function(w, k, S) {
                Dt(s, S.text, w, k + m / 2, c, {
                    strikethrough: S.hidden,
                    textAlign: l.textAlign(S.textAlign)
                })
            }, v = this.isHorizontal(), M = this._computeTitleHeight();
            v ? f = {
                x: K(o, this.left + h, this.right - n[0]),
                y: this.top + h + M,
                line: 0
            } : f = {
                x: this.left + h,
                y: K(o, this.top + M + h, this.bottom - i[0].height),
                line: 0
            }, Jn(this.ctx, t.textDirection);
            let y = m + h;
            this.legendItems.forEach((w, k) => {
                s.strokeStyle = w.fontColor, s.fillStyle = w.fontColor;
                let S = s.measureText(w.text).width,
                    P = l.textAlign(w.textAlign || (w.textAlign = r.textAlign)),
                    A = g + d + S,
                    C = f.x,
                    L = f.y;
                l.setWidth(this.width), v ? k > 0 && C + A + h > this.right && (L = f.y += y, f.line++, C = f.x = K(o, this.left + h, this.right - n[f.line])) : k > 0 && L + y > this.bottom && (C = f.x = C + i[f.line].width + h, f.line++, L = f.y = K(o, this.top + M + h, this.bottom - i[f.line].height));
                let Y = l.x(C);
                if (b(Y, L, w), C = Wl(P, C + g + d, v ? C + A : this.right, t.rtl), _(l.x(C), L, w), v) f.x += A + h;
                else if (typeof w.text != "string") {
                    let st = c.lineHeight;
                    f.y += Oh(w, st) + h
                } else f.y += y
            }), Qn(this.ctx, t.textDirection)
        }
        drawTitle() {
            let t = this.options,
                i = t.title,
                n = U(i.font),
                s = G(i.padding);
            if (!i.display) return;
            let o = jt(t.rtl, this.left, this.width),
                r = this.ctx,
                a = i.position,
                l = n.size / 2,
                c = s.top + l,
                h, u = this.left,
                d = this.width;
            if (this.isHorizontal()) d = Math.max(...this.lineWidths), h = this.top + c, u = K(t.align, u, this.right - d);
            else {
                let g = this.columnSizes.reduce((p, m) => Math.max(p, m.height), 0);
                h = c + K(t.align, this.top, this.bottom - g - t.labels.padding - this._computeTitleHeight())
            }
            let f = K(a, u, u + d);
            r.textAlign = o.textAlign(Mi(a)), r.textBaseline = "middle", r.strokeStyle = i.color, r.fillStyle = i.color, r.font = n.string, Dt(r, i.text, f, h, n)
        }
        _computeTitleHeight() {
            let t = this.options.title,
                i = U(t.font),
                n = G(t.padding);
            return t.display ? i.lineHeight + n.height : 0
        }
        _getLegendItemAt(t, i) {
            let n, s, o;
            if (ft(t, this.left, this.right) && ft(i, this.top, this.bottom)) {
                for (o = this.legendHitBoxes, n = 0; n < o.length; ++n)
                    if (s = o[n], ft(t, s.left, s.left + s.width) && ft(i, s.top, s.top + s.height)) return this.legendItems[n]
            }
            return null
        }
        handleEvent(t) {
            let i = this.options;
            if (!vy(t.type, i)) return;
            let n = this._getLegendItemAt(t.x, t.y);
            if (t.type === "mousemove" || t.type === "mouseout") {
                let s = this._hoveredItem,
                    o = by(s, n);
                s && !o && F(i.onLeave, [t, s, this], this), this._hoveredItem = n, n && !o && F(i.onHover, [t, n, this], this)
            } else n && F(i.onClick, [t, n, this], this)
        }
    };

function _y(e, t, i, n, s) {
    let o = xy(n, e, t, i),
        r = yy(s, n, t.lineHeight);
    return {
        itemWidth: o,
        itemHeight: r
    }
}

function xy(e, t, i, n) {
    let s = e.text;
    return s && typeof s != "string" && (s = s.reduce((o, r) => o.length > r.length ? o : r)), t + i.size / 2 + n.measureText(s).width
}

function yy(e, t, i) {
    let n = e;
    return typeof t.text != "string" && (n = Oh(t, i)), n
}

function Oh(e, t) {
    let i = e.text ? e.text.length : 0;
    return t * i
}

function vy(e, t) {
    return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"))
}
var Gv = {
        id: "legend",
        _element: Ui,
        start(e, t, i) {
            let n = e.legend = new Ui({
                ctx: e.ctx,
                options: i,
                chart: e
            });
            at.configure(e, n, i), at.addBox(e, n)
        },
        stop(e) {
            at.removeBox(e, e.legend), delete e.legend
        },
        beforeUpdate(e, t, i) {
            let n = e.legend;
            at.configure(e, n, i), n.options = i
        },
        afterUpdate(e) {
            let t = e.legend;
            t.buildLabels(), t.adjustHitBoxes()
        },
        afterEvent(e, t) {
            t.replay || e.legend.handleEvent(t.event)
        },
        defaults: {
            display: !0,
            position: "top",
            align: "center",
            fullSize: !0,
            reverse: !1,
            weight: 1e3,
            onClick(e, t, i) {
                let n = t.datasetIndex,
                    s = i.chart;
                s.isDatasetVisible(n) ? (s.hide(n), t.hidden = !0) : (s.show(n), t.hidden = !1)
            },
            onHover: null,
            onLeave: null,
            labels: {
                color: e => e.chart.options.color,
                boxWidth: 40,
                padding: 10,
                generateLabels(e) {
                    let t = e.data.datasets,
                        {
                            labels: {
                                usePointStyle: i,
                                pointStyle: n,
                                textAlign: s,
                                color: o,
                                useBorderRadius: r,
                                borderRadius: a
                            }
                        } = e.legend.options;
                    return e._getSortedDatasetMetas().map(l => {
                        let c = l.controller.getStyle(i ? 0 : void 0),
                            h = G(c.borderWidth);
                        return {
                            text: t[l.index].label,
                            fillStyle: c.backgroundColor,
                            fontColor: o,
                            hidden: !l.visible,
                            lineCap: c.borderCapStyle,
                            lineDash: c.borderDash,
                            lineDashOffset: c.borderDashOffset,
                            lineJoin: c.borderJoinStyle,
                            lineWidth: (h.width + h.height) / 4,
                            strokeStyle: c.borderColor,
                            pointStyle: n || c.pointStyle,
                            rotation: c.rotation,
                            textAlign: s || c.textAlign,
                            borderRadius: r && (a || c.borderRadius),
                            datasetIndex: l.index
                        }
                    }, this)
                }
            },
            title: {
                color: e => e.chart.options.color,
                display: !1,
                position: "center",
                text: ""
            }
        },
        descriptors: {
            _scriptable: e => !e.startsWith("on"),
            labels: {
                _scriptable: e => !["generateLabels", "filter", "sort"].includes(e)
            }
        }
    },
    Yi = class extends ht {
        constructor(t) {
            super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0
        }
        update(t, i) {
            let n = this.options;
            if (this.left = 0, this.top = 0, !n.display) {
                this.width = this.height = this.right = this.bottom = 0;
                return
            }
            this.width = this.right = t, this.height = this.bottom = i;
            let s = z(n.text) ? n.text.length : 1;
            this._padding = G(n.padding);
            let o = s * U(n.font).lineHeight + this._padding.height;
            this.isHorizontal() ? this.height = o : this.width = o
        }
        isHorizontal() {
            let t = this.options.position;
            return t === "top" || t === "bottom"
        }
        _drawArgs(t) {
            let {
                top: i,
                left: n,
                bottom: s,
                right: o,
                options: r
            } = this, a = r.align, l = 0, c, h, u;
            return this.isHorizontal() ? (h = K(a, n, o), u = i + t, c = o - n) : (r.position === "left" ? (h = n + t, u = K(a, s, i), l = V * -.5) : (h = o - t, u = K(a, i, s), l = V * .5), c = s - i), {
                titleX: h,
                titleY: u,
                maxWidth: c,
                rotation: l
            }
        }
        draw() {
            let t = this.ctx,
                i = this.options;
            if (!i.display) return;
            let n = U(i.font),
                o = n.lineHeight / 2 + this._padding.top,
                {
                    titleX: r,
                    titleY: a,
                    maxWidth: l,
                    rotation: c
                } = this._drawArgs(o);
            Dt(t, i.text, 0, 0, n, {
                color: i.color,
                maxWidth: l,
                rotation: c,
                textAlign: Mi(i.align),
                textBaseline: "middle",
                translation: [r, a]
            })
        }
    };

function My(e, t) {
    let i = new Yi({
        ctx: e.ctx,
        options: t,
        chart: e
    });
    at.configure(e, i, t), at.addBox(e, i), e.titleBlock = i
}
var Zv = {
    id: "title",
    _element: Yi,
    start(e, t, i) {
        My(e, i)
    },
    stop(e) {
        let t = e.titleBlock;
        at.removeBox(e, t), delete e.titleBlock
    },
    beforeUpdate(e, t, i) {
        let n = e.titleBlock;
        at.configure(e, n, i), n.options = i
    },
    defaults: {
        align: "center",
        display: !1,
        font: {
            weight: "bold"
        },
        fullSize: !0,
        padding: 10,
        position: "top",
        text: "",
        weight: 2e3
    },
    defaultRoutes: {
        color: "color"
    },
    descriptors: {
        _scriptable: !0,
        _indexable: !1
    }
};
var Xe = {
    average(e) {
        if (!e.length) return !1;
        let t, i, n = 0,
            s = 0,
            o = 0;
        for (t = 0, i = e.length; t < i; ++t) {
            let r = e[t].element;
            if (r && r.hasValue()) {
                let a = r.tooltipPosition();
                n += a.x, s += a.y, ++o
            }
        }
        return {
            x: n / o,
            y: s / o
        }
    },
    nearest(e, t) {
        if (!e.length) return !1;
        let i = t.x,
            n = t.y,
            s = Number.POSITIVE_INFINITY,
            o, r, a;
        for (o = 0, r = e.length; o < r; ++o) {
            let l = e[o].element;
            if (l && l.hasValue()) {
                let c = l.getCenterPoint(),
                    h = bi(t, c);
                h < s && (s = h, a = l)
            }
        }
        if (a) {
            let l = a.tooltipPosition();
            i = l.x, n = l.y
        }
        return {
            x: i,
            y: n
        }
    }
};

function gt(e, t) {
    return t && (z(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e
}

function Mt(e) {
    return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e
}

function Sy(e, t) {
    let {
        element: i,
        datasetIndex: n,
        index: s
    } = t, o = e.getDatasetMeta(n).controller, {
        label: r,
        value: a
    } = o.getLabelAndValue(s);
    return {
        chart: e,
        label: r,
        parsed: o.getParsed(s),
        raw: e.data.datasets[n].data[s],
        formattedValue: a,
        dataset: o.getDataset(),
        dataIndex: s,
        datasetIndex: n,
        element: i
    }
}

function Yc(e, t) {
    let i = e.chart.ctx,
        {
            body: n,
            footer: s,
            title: o
        } = e,
        {
            boxWidth: r,
            boxHeight: a
        } = t,
        l = U(t.bodyFont),
        c = U(t.titleFont),
        h = U(t.footerFont),
        u = o.length,
        d = s.length,
        f = n.length,
        g = G(t.padding),
        p = g.height,
        m = 0,
        b = n.reduce((M, y) => M + y.before.length + y.lines.length + y.after.length, 0);
    if (b += e.beforeBody.length + e.afterBody.length, u && (p += u * c.lineHeight + (u - 1) * t.titleSpacing + t.titleMarginBottom), b) {
        let M = t.displayColors ? Math.max(a, l.lineHeight) : l.lineHeight;
        p += f * M + (b - f) * l.lineHeight + (b - 1) * t.bodySpacing
    }
    d && (p += t.footerMarginTop + d * h.lineHeight + (d - 1) * t.footerSpacing);
    let _ = 0,
        v = function(M) {
            m = Math.max(m, i.measureText(M).width + _)
        };
    return i.save(), i.font = c.string, R(e.title, v), i.font = l.string, R(e.beforeBody.concat(e.afterBody), v), _ = t.displayColors ? r + 2 + t.boxPadding : 0, R(n, M => {
        R(M.before, v), R(M.lines, v), R(M.after, v)
    }), _ = 0, i.font = h.string, R(e.footer, v), i.restore(), m += g.width, {
        width: m,
        height: p
    }
}

function wy(e, t) {
    let {
        y: i,
        height: n
    } = t;
    return i < n / 2 ? "top" : i > e.height - n / 2 ? "bottom" : "center"
}

function ky(e, t, i, n) {
    let {
        x: s,
        width: o
    } = n, r = i.caretSize + i.caretPadding;
    if (e === "left" && s + o + r > t.width || e === "right" && s - o - r < 0) return !0
}

function Py(e, t, i, n) {
    let {
        x: s,
        width: o
    } = i, {
        width: r,
        chartArea: {
            left: a,
            right: l
        }
    } = e, c = "center";
    return n === "center" ? c = s <= (a + l) / 2 ? "left" : "right" : s <= o / 2 ? c = "left" : s >= r - o / 2 && (c = "right"), ky(c, e, t, i) && (c = "center"), c
}

function Xc(e, t, i) {
    let n = i.yAlign || t.yAlign || wy(e, i);
    return {
        xAlign: i.xAlign || t.xAlign || Py(e, t, i, n),
        yAlign: n
    }
}

function Oy(e, t) {
    let {
        x: i,
        width: n
    } = e;
    return t === "right" ? i -= n : t === "center" && (i -= n / 2), i
}

function Cy(e, t, i) {
    let {
        y: n,
        height: s
    } = e;
    return t === "top" ? n += i : t === "bottom" ? n -= s + i : n -= s / 2, n
}

function Kc(e, t, i, n) {
    let {
        caretSize: s,
        caretPadding: o,
        cornerRadius: r
    } = e, {
        xAlign: a,
        yAlign: l
    } = i, c = s + o, {
        topLeft: h,
        topRight: u,
        bottomLeft: d,
        bottomRight: f
    } = Tt(r), g = Oy(t, a), p = Cy(t, l, c);
    return l === "center" ? a === "left" ? g += c : a === "right" && (g -= c) : a === "left" ? g -= Math.max(h, d) + s : a === "right" && (g += Math.max(u, f) + s), {
        x: X(g, 0, n.width - t.width),
        y: X(p, 0, n.height - t.height)
    }
}

function Li(e, t, i) {
    let n = G(i.padding);
    return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - n.right : e.x + n.left
}

function Gc(e) {
    return gt([], Mt(e))
}

function Ay(e, t, i) {
    return yt(e, {
        tooltip: t,
        tooltipItems: i,
        type: "tooltip"
    })
}

function Zc(e, t) {
    let i = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
    return i ? e.override(i) : e
}
var Ch = {
    beforeTitle: dt,
    title(e) {
        if (e.length > 0) {
            let t = e[0],
                i = t.chart.data.labels,
                n = i ? i.length : 0;
            if (this && this.options && this.options.mode === "dataset") return t.dataset.label || "";
            if (t.label) return t.label;
            if (n > 0 && t.dataIndex < n) return i[t.dataIndex]
        }
        return ""
    },
    afterTitle: dt,
    beforeBody: dt,
    beforeLabel: dt,
    label(e) {
        if (this && this.options && this.options.mode === "dataset") return e.label + ": " + e.formattedValue || e.formattedValue;
        let t = e.dataset.label || "";
        t && (t += ": ");
        let i = e.formattedValue;
        return E(i) || (t += i), t
    },
    labelColor(e) {
        let i = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
        return {
            borderColor: i.borderColor,
            backgroundColor: i.backgroundColor,
            borderWidth: i.borderWidth,
            borderDash: i.borderDash,
            borderDashOffset: i.borderDashOffset,
            borderRadius: 0
        }
    },
    labelTextColor() {
        return this.options.bodyColor
    },
    labelPointStyle(e) {
        let i = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
        return {
            pointStyle: i.pointStyle,
            rotation: i.rotation
        }
    },
    afterLabel: dt,
    afterBody: dt,
    beforeFooter: dt,
    footer: dt,
    afterFooter: dt
};

function it(e, t, i, n) {
    let s = e[t].call(i, n);
    return typeof s > "u" ? Ch[t].call(i, n) : s
}
var Xi = class extends ht {
        static positioners = Xe;
        constructor(t) {
            super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0
        }
        initialize(t) {
            this.options = t, this._cachedAnimations = void 0, this.$context = void 0
        }
        _resolveAnimations() {
            let t = this._cachedAnimations;
            if (t) return t;
            let i = this.chart,
                n = this.options.setContext(this.getContext()),
                s = n.enabled && i.options.animation && n.animations,
                o = new Fi(this.chart, s);
            return s._cacheable && (this._cachedAnimations = Object.freeze(o)), o
        }
        getContext() {
            return this.$context || (this.$context = Ay(this.chart.getContext(), this, this._tooltipItems))
        }
        getTitle(t, i) {
            let {
                callbacks: n
            } = i, s = it(n, "beforeTitle", this, t), o = it(n, "title", this, t), r = it(n, "afterTitle", this, t), a = [];
            return a = gt(a, Mt(s)), a = gt(a, Mt(o)), a = gt(a, Mt(r)), a
        }
        getBeforeBody(t, i) {
            return Gc(it(i.callbacks, "beforeBody", this, t))
        }
        getBody(t, i) {
            let {
                callbacks: n
            } = i, s = [];
            return R(t, o => {
                let r = {
                        before: [],
                        lines: [],
                        after: []
                    },
                    a = Zc(n, o);
                gt(r.before, Mt(it(a, "beforeLabel", this, o))), gt(r.lines, it(a, "label", this, o)), gt(r.after, Mt(it(a, "afterLabel", this, o))), s.push(r)
            }), s
        }
        getAfterBody(t, i) {
            return Gc(it(i.callbacks, "afterBody", this, t))
        }
        getFooter(t, i) {
            let {
                callbacks: n
            } = i, s = it(n, "beforeFooter", this, t), o = it(n, "footer", this, t), r = it(n, "afterFooter", this, t), a = [];
            return a = gt(a, Mt(s)), a = gt(a, Mt(o)), a = gt(a, Mt(r)), a
        }
        _createItems(t) {
            let i = this._active,
                n = this.chart.data,
                s = [],
                o = [],
                r = [],
                a = [],
                l, c;
            for (l = 0, c = i.length; l < c; ++l) a.push(Sy(this.chart, i[l]));
            return t.filter && (a = a.filter((h, u, d) => t.filter(h, u, d, n))), t.itemSort && (a = a.sort((h, u) => t.itemSort(h, u, n))), R(a, h => {
                let u = Zc(t.callbacks, h);
                s.push(it(u, "labelColor", this, h)), o.push(it(u, "labelPointStyle", this, h)), r.push(it(u, "labelTextColor", this, h))
            }), this.labelColors = s, this.labelPointStyles = o, this.labelTextColors = r, this.dataPoints = a, a
        }
        update(t, i) {
            let n = this.options.setContext(this.getContext()),
                s = this._active,
                o, r = [];
            if (!s.length) this.opacity !== 0 && (o = {
                opacity: 0
            });
            else {
                let a = Xe[n.position].call(this, s, this._eventPosition);
                r = this._createItems(n), this.title = this.getTitle(r, n), this.beforeBody = this.getBeforeBody(r, n), this.body = this.getBody(r, n), this.afterBody = this.getAfterBody(r, n), this.footer = this.getFooter(r, n);
                let l = this._size = Yc(this, n),
                    c = Object.assign({}, a, l),
                    h = Xc(this.chart, n, c),
                    u = Kc(n, c, h, this.chart);
                this.xAlign = h.xAlign, this.yAlign = h.yAlign, o = {
                    opacity: 1,
                    x: u.x,
                    y: u.y,
                    width: l.width,
                    height: l.height,
                    caretX: a.x,
                    caretY: a.y
                }
            }
            this._tooltipItems = r, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && n.external && n.external.call(this, {
                chart: this.chart,
                tooltip: this,
                replay: i
            })
        }
        drawCaret(t, i, n, s) {
            let o = this.getCaretPosition(t, n, s);
            i.lineTo(o.x1, o.y1), i.lineTo(o.x2, o.y2), i.lineTo(o.x3, o.y3)
        }
        getCaretPosition(t, i, n) {
            let {
                xAlign: s,
                yAlign: o
            } = this, {
                caretSize: r,
                cornerRadius: a
            } = n, {
                topLeft: l,
                topRight: c,
                bottomLeft: h,
                bottomRight: u
            } = Tt(a), {
                x: d,
                y: f
            } = t, {
                width: g,
                height: p
            } = i, m, b, _, v, M, y;
            return o === "center" ? (M = f + p / 2, s === "left" ? (m = d, b = m - r, v = M + r, y = M - r) : (m = d + g, b = m + r, v = M - r, y = M + r), _ = m) : (s === "left" ? b = d + Math.max(l, h) + r : s === "right" ? b = d + g - Math.max(c, u) - r : b = this.caretX, o === "top" ? (v = f, M = v - r, m = b - r, _ = b + r) : (v = f + p, M = v + r, m = b + r, _ = b - r), y = v), {
                x1: m,
                x2: b,
                x3: _,
                y1: v,
                y2: M,
                y3: y
            }
        }
        drawTitle(t, i, n) {
            let s = this.title,
                o = s.length,
                r, a, l;
            if (o) {
                let c = jt(n.rtl, this.x, this.width);
                for (t.x = Li(this, n.titleAlign, n), i.textAlign = c.textAlign(n.titleAlign), i.textBaseline = "middle", r = U(n.titleFont), a = n.titleSpacing, i.fillStyle = n.titleColor, i.font = r.string, l = 0; l < o; ++l) i.fillText(s[l], c.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + a, l + 1 === o && (t.y += n.titleMarginBottom - a)
            }
        }
        _drawColorBox(t, i, n, s, o) {
            let r = this.labelColors[n],
                a = this.labelPointStyles[n],
                {
                    boxHeight: l,
                    boxWidth: c
                } = o,
                h = U(o.bodyFont),
                u = Li(this, "left", o),
                d = s.x(u),
                f = l < h.lineHeight ? (h.lineHeight - l) / 2 : 0,
                g = i.y + f;
            if (o.usePointStyle) {
                let p = {
                        radius: Math.min(c, l) / 2,
                        pointStyle: a.pointStyle,
                        rotation: a.rotation,
                        borderWidth: 1
                    },
                    m = s.leftForLtr(d, c) + c / 2,
                    b = g + l / 2;
                t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, wi(t, p, m, b), t.strokeStyle = r.borderColor, t.fillStyle = r.backgroundColor, wi(t, p, m, b)
            } else {
                t.lineWidth = D(r.borderWidth) ? Math.max(...Object.values(r.borderWidth)) : r.borderWidth || 1, t.strokeStyle = r.borderColor, t.setLineDash(r.borderDash || []), t.lineDashOffset = r.borderDashOffset || 0;
                let p = s.leftForLtr(d, c),
                    m = s.leftForLtr(s.xPlus(d, 1), c - 2),
                    b = Tt(r.borderRadius);
                Object.values(b).some(_ => _ !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, he(t, {
                    x: p,
                    y: g,
                    w: c,
                    h: l,
                    radius: b
                }), t.fill(), t.stroke(), t.fillStyle = r.backgroundColor, t.beginPath(), he(t, {
                    x: m,
                    y: g + 1,
                    w: c - 2,
                    h: l - 2,
                    radius: b
                }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(p, g, c, l), t.strokeRect(p, g, c, l), t.fillStyle = r.backgroundColor, t.fillRect(m, g + 1, c - 2, l - 2))
            }
            t.fillStyle = this.labelTextColors[n]
        }
        drawBody(t, i, n) {
            let {
                body: s
            } = this, {
                bodySpacing: o,
                bodyAlign: r,
                displayColors: a,
                boxHeight: l,
                boxWidth: c,
                boxPadding: h
            } = n, u = U(n.bodyFont), d = u.lineHeight, f = 0, g = jt(n.rtl, this.x, this.width), p = function(S) {
                i.fillText(S, g.x(t.x + f), t.y + d / 2), t.y += d + o
            }, m = g.textAlign(r), b, _, v, M, y, w, k;
            for (i.textAlign = r, i.textBaseline = "middle", i.font = u.string, t.x = Li(this, m, n), i.fillStyle = n.bodyColor, R(this.beforeBody, p), f = a && m !== "right" ? r === "center" ? c / 2 + h : c + 2 + h : 0, M = 0, w = s.length; M < w; ++M) {
                for (b = s[M], _ = this.labelTextColors[M], i.fillStyle = _, R(b.before, p), v = b.lines, a && v.length && (this._drawColorBox(i, t, M, g, n), d = Math.max(u.lineHeight, l)), y = 0, k = v.length; y < k; ++y) p(v[y]), d = u.lineHeight;
                R(b.after, p)
            }
            f = 0, d = u.lineHeight, R(this.afterBody, p), t.y -= o
        }
        drawFooter(t, i, n) {
            let s = this.footer,
                o = s.length,
                r, a;
            if (o) {
                let l = jt(n.rtl, this.x, this.width);
                for (t.x = Li(this, n.footerAlign, n), t.y += n.footerMarginTop, i.textAlign = l.textAlign(n.footerAlign), i.textBaseline = "middle", r = U(n.footerFont), i.fillStyle = n.footerColor, i.font = r.string, a = 0; a < o; ++a) i.fillText(s[a], l.x(t.x), t.y + r.lineHeight / 2), t.y += r.lineHeight + n.footerSpacing
            }
        }
        drawBackground(t, i, n, s) {
            let {
                xAlign: o,
                yAlign: r
            } = this, {
                x: a,
                y: l
            } = t, {
                width: c,
                height: h
            } = n, {
                topLeft: u,
                topRight: d,
                bottomLeft: f,
                bottomRight: g
            } = Tt(s.cornerRadius);
            i.fillStyle = s.backgroundColor, i.strokeStyle = s.borderColor, i.lineWidth = s.borderWidth, i.beginPath(), i.moveTo(a + u, l), r === "top" && this.drawCaret(t, i, n, s), i.lineTo(a + c - d, l), i.quadraticCurveTo(a + c, l, a + c, l + d), r === "center" && o === "right" && this.drawCaret(t, i, n, s), i.lineTo(a + c, l + h - g), i.quadraticCurveTo(a + c, l + h, a + c - g, l + h), r === "bottom" && this.drawCaret(t, i, n, s), i.lineTo(a + f, l + h), i.quadraticCurveTo(a, l + h, a, l + h - f), r === "center" && o === "left" && this.drawCaret(t, i, n, s), i.lineTo(a, l + u), i.quadraticCurveTo(a, l, a + u, l), i.closePath(), i.fill(), s.borderWidth > 0 && i.stroke()
        }
        _updateAnimationTarget(t) {
            let i = this.chart,
                n = this.$animations,
                s = n && n.x,
                o = n && n.y;
            if (s || o) {
                let r = Xe[t.position].call(this, this._active, this._eventPosition);
                if (!r) return;
                let a = this._size = Yc(this, t),
                    l = Object.assign({}, r, this._size),
                    c = Xc(i, t, l),
                    h = Kc(t, l, c, i);
                (s._to !== h.x || o._to !== h.y) && (this.xAlign = c.xAlign, this.yAlign = c.yAlign, this.width = a.width, this.height = a.height, this.caretX = r.x, this.caretY = r.y, this._resolveAnimations().update(this, h))
            }
        }
        _willRender() {
            return !!this.opacity
        }
        draw(t) {
            let i = this.options.setContext(this.getContext()),
                n = this.opacity;
            if (!n) return;
            this._updateAnimationTarget(i);
            let s = {
                    width: this.width,
                    height: this.height
                },
                o = {
                    x: this.x,
                    y: this.y
                };
            n = Math.abs(n) < .001 ? 0 : n;
            let r = G(i.padding),
                a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            i.enabled && a && (t.save(), t.globalAlpha = n, this.drawBackground(o, t, s, i), Jn(t, i.textDirection), o.y += r.top, this.drawTitle(o, t, i), this.drawBody(o, t, i), this.drawFooter(o, t, i), Qn(t, i.textDirection), t.restore())
        }
        getActiveElements() {
            return this._active || []
        }
        setActiveElements(t, i) {
            let n = this._active,
                s = t.map(({
                    datasetIndex: a,
                    index: l
                }) => {
                    let c = this.chart.getDatasetMeta(a);
                    if (!c) throw new Error("Cannot find a dataset at index " + a);
                    return {
                        datasetIndex: a,
                        element: c.data[l],
                        index: l
                    }
                }),
                o = !ze(n, s),
                r = this._positionChanged(s, i);
            (o || r) && (this._active = s, this._eventPosition = i, this._ignoreReplayEvents = !0, this.update(!0))
        }
        handleEvent(t, i, n = !0) {
            if (i && this._ignoreReplayEvents) return !1;
            this._ignoreReplayEvents = !1;
            let s = this.options,
                o = this._active || [],
                r = this._getActiveElements(t, o, i, n),
                a = this._positionChanged(r, t),
                l = i || !ze(r, o) || a;
            return l && (this._active = r, (s.enabled || s.external) && (this._eventPosition = {
                x: t.x,
                y: t.y
            }, this.update(!0, i))), l
        }
        _getActiveElements(t, i, n, s) {
            let o = this.options;
            if (t.type === "mouseout") return [];
            if (!s) return i;
            let r = this.chart.getElementsAtEventForMode(t, o.mode, o, n);
            return o.reverse && r.reverse(), r
        }
        _positionChanged(t, i) {
            let {
                caretX: n,
                caretY: s,
                options: o
            } = this, r = Xe[o.position].call(this, t, i);
            return r !== !1 && (n !== r.x || s !== r.y)
        }
    },
    Jv = {
        id: "tooltip",
        _element: Xi,
        positioners: Xe,
        afterInit(e, t, i) {
            i && (e.tooltip = new Xi({
                chart: e,
                options: i
            }))
        },
        beforeUpdate(e, t, i) {
            e.tooltip && e.tooltip.initialize(i)
        },
        reset(e, t, i) {
            e.tooltip && e.tooltip.initialize(i)
        },
        afterDraw(e) {
            let t = e.tooltip;
            if (t && t._willRender()) {
                let i = {
                    tooltip: t
                };
                if (e.notifyPlugins("beforeTooltipDraw", { ...i,
                        cancelable: !0
                    }) === !1) return;
                t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", i)
            }
        },
        afterEvent(e, t) {
            if (e.tooltip) {
                let i = t.replay;
                e.tooltip.handleEvent(t.event, i, t.inChartArea) && (t.changed = !0)
            }
        },
        defaults: {
            enabled: !0,
            external: null,
            position: "average",
            backgroundColor: "rgba(0,0,0,0.8)",
            titleColor: "#fff",
            titleFont: {
                weight: "bold"
            },
            titleSpacing: 2,
            titleMarginBottom: 6,
            titleAlign: "left",
            bodyColor: "#fff",
            bodySpacing: 2,
            bodyFont: {},
            bodyAlign: "left",
            footerColor: "#fff",
            footerSpacing: 2,
            footerMarginTop: 6,
            footerFont: {
                weight: "bold"
            },
            footerAlign: "left",
            padding: 6,
            caretPadding: 2,
            caretSize: 5,
            cornerRadius: 6,
            boxHeight: (e, t) => t.bodyFont.size,
            boxWidth: (e, t) => t.bodyFont.size,
            multiKeyBackground: "#fff",
            displayColors: !0,
            boxPadding: 0,
            borderColor: "rgba(0,0,0,0)",
            borderWidth: 0,
            animation: {
                duration: 400,
                easing: "easeOutQuart"
            },
            animations: {
                numbers: {
                    type: "number",
                    properties: ["x", "y", "width", "height", "caretX", "caretY"]
                },
                opacity: {
                    easing: "linear",
                    duration: 200
                }
            },
            callbacks: Ch
        },
        defaultRoutes: {
            bodyFont: "font",
            footerFont: "font",
            titleFont: "font"
        },
        descriptors: {
            _scriptable: e => e !== "filter" && e !== "itemSort" && e !== "external",
            _indexable: !1,
            callbacks: {
                _scriptable: !1,
                _indexable: !1
            },
            animation: {
                _fallback: !1
            },
            animations: {
                _fallback: "animation"
            }
        },
        additionalOptionScopes: ["interaction"]
    };
var Dy = (e, t, i, n) => (typeof t == "string" ? (i = e.push(t) - 1, n.unshift({
    index: i,
    label: t
})) : isNaN(t) && (i = null), i);

function Ty(e, t, i, n) {
    let s = e.indexOf(t);
    if (s === -1) return Dy(e, t, i, n);
    let o = e.lastIndexOf(t);
    return s !== o ? i : s
}
var Ly = (e, t) => e === null ? null : X(Math.round(e), 0, t);

function Jc(e) {
    let t = this.getLabels();
    return e >= 0 && e < t.length ? t[e] : e
}
var Qc = class extends Ht {
    static id = "category";
    static defaults = {
        ticks: {
            callback: Jc
        }
    };
    constructor(t) {
        super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = []
    }
    init(t) {
        let i = this._addedLabels;
        if (i.length) {
            let n = this.getLabels();
            for (let {
                    index: s,
                    label: o
                } of i) n[s] === o && n.splice(s, 1);
            this._addedLabels = []
        }
        super.init(t)
    }
    parse(t, i) {
        if (E(t)) return null;
        let n = this.getLabels();
        return i = isFinite(i) && n[i] === t ? i : Ty(n, t, O(i, t), this._addedLabels), Ly(i, n.length - 1)
    }
    determineDataLimits() {
        let {
            minDefined: t,
            maxDefined: i
        } = this.getUserBounds(), {
            min: n,
            max: s
        } = this.getMinMax(!0);
        this.options.bounds === "ticks" && (t || (n = 0), i || (s = this.getLabels().length - 1)), this.min = n, this.max = s
    }
    buildTicks() {
        let t = this.min,
            i = this.max,
            n = this.options.offset,
            s = [],
            o = this.getLabels();
        o = t === 0 && i === o.length - 1 ? o : o.slice(t, i + 1), this._valueRange = Math.max(o.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? .5 : 0);
        for (let r = t; r <= i; r++) s.push({
            value: r
        });
        return s
    }
    getLabelForValue(t) {
        return Jc.call(this, t)
    }
    configure() {
        super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels)
    }
    getPixelForValue(t) {
        return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
    }
    getPixelForTick(t) {
        let i = this.ticks;
        return t < 0 || t > i.length - 1 ? null : this.getPixelForValue(i[t].value)
    }
    getValueForPixel(t) {
        return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange)
    }
    getBasePixel() {
        return this.bottom
    }
};

function Ey(e, t) {
    let i = [],
        {
            bounds: s,
            step: o,
            min: r,
            max: a,
            precision: l,
            count: c,
            maxTicks: h,
            maxDigits: u,
            includeBounds: d
        } = e,
        f = o || 1,
        g = h - 1,
        {
            min: p,
            max: m
        } = t,
        b = !E(r),
        _ = !E(a),
        v = !E(c),
        M = (m - p) / (u + 1),
        y = Ln((m - p) / g / f) * f,
        w, k, S, P;
    if (y < 1e-14 && !b && !_) return [{
        value: p
    }, {
        value: m
    }];
    P = Math.ceil(m / y) - Math.floor(p / y), P > g && (y = Ln(P * y / g / f) * f), E(l) || (w = Math.pow(10, l), y = Math.ceil(y * w) / w), s === "ticks" ? (k = Math.floor(p / y) * y, S = Math.ceil(m / y) * y) : (k = p, S = m), b && _ && o && Fl((a - r) / o, y / 1e3) ? (P = Math.round(Math.min((a - r) / y, h)), y = (a - r) / P, k = r, S = a) : v ? (k = b ? r : k, S = _ ? a : S, P = c - 1, y = (S - k) / P) : (P = (S - k) / y, re(P, Math.round(P), y / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
    let A = Math.max(Rn(y), Rn(k));
    w = Math.pow(10, E(l) ? A : l), k = Math.round(k * w) / w, S = Math.round(S * w) / w;
    let C = 0;
    for (b && (d && k !== r ? (i.push({
            value: r
        }), k < r && C++, re(Math.round((k + C * y) * w) / w, r, th(r, M, e)) && C++) : k < r && C++); C < P; ++C) {
        let L = Math.round((k + C * y) * w) / w;
        if (_ && L > a) break;
        i.push({
            value: L
        })
    }
    return _ && d && S !== a ? i.length && re(i[i.length - 1].value, a, th(a, M, e)) ? i[i.length - 1].value = a : i.push({
        value: a
    }) : (!_ || S === a) && i.push({
        value: S
    }), i
}

function th(e, t, {
    horizontal: i,
    minRotation: n
}) {
    let s = rt(n),
        o = (i ? Math.sin(s) : Math.cos(s)) || .001,
        r = .75 * t * ("" + e).length;
    return Math.min(t / o, r)
}
var ge = class extends Ht {
        constructor(t) {
            super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0
        }
        parse(t, i) {
            return E(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t
        }
        handleTickRangeOptions() {
            let {
                beginAtZero: t
            } = this.options, {
                minDefined: i,
                maxDefined: n
            } = this.getUserBounds(), {
                min: s,
                max: o
            } = this, r = l => s = i ? s : l, a = l => o = n ? o : l;
            if (t) {
                let l = ct(s),
                    c = ct(o);
                l < 0 && c < 0 ? a(0) : l > 0 && c > 0 && r(0)
            }
            if (s === o) {
                let l = o === 0 ? 1 : Math.abs(o * .05);
                a(o + l), t || r(s - l)
            }
            this.min = s, this.max = o
        }
        getTickLimit() {
            let t = this.options.ticks,
                {
                    maxTicksLimit: i,
                    stepSize: n
                } = t,
                s;
            return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), i = i || 11), i && (s = Math.min(i, s)), s
        }
        computeTickLimit() {
            return Number.POSITIVE_INFINITY
        }
        buildTicks() {
            let t = this.options,
                i = t.ticks,
                n = this.getTickLimit();
            n = Math.max(2, n);
            let s = {
                    maxTicks: n,
                    bounds: t.bounds,
                    min: t.min,
                    max: t.max,
                    precision: i.precision,
                    step: i.stepSize,
                    count: i.count,
                    maxDigits: this._maxDigits(),
                    horizontal: this.isHorizontal(),
                    minRotation: i.minRotation || 0,
                    includeBounds: i.includeBounds !== !1
                },
                o = this._range || this,
                r = Ey(s, o);
            return t.bounds === "ticks" && En(r, this, "value"), t.reverse ? (r.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), r
        }
        configure() {
            let t = this.ticks,
                i = this.min,
                n = this.max;
            if (super.configure(), this.options.offset && t.length) {
                let s = (n - i) / Math.max(t.length - 1, 1) / 2;
                i -= s, n += s
            }
            this._startValue = i, this._endValue = n, this._valueRange = n - i
        }
        getLabelForValue(t) {
            return ce(t, this.chart.options.locale, this.options.ticks.format)
        }
    },
    eh = class extends ge {
        static id = "linear";
        static defaults = {
            ticks: {
                callback: Be.formatters.numeric
            }
        };
        determineDataLimits() {
            let {
                min: t,
                max: i
            } = this.getMinMax(!0);
            this.min = W(t) ? t : 0, this.max = W(i) ? i : 1, this.handleTickRangeOptions()
        }
        computeTickLimit() {
            let t = this.isHorizontal(),
                i = t ? this.width : this.height,
                n = rt(this.options.ticks.minRotation),
                s = (t ? Math.sin(n) : Math.cos(n)) || .001,
                o = this._resolveTickFontOptions(0);
            return Math.ceil(i / Math.min(40, o.lineHeight / s))
        }
        getPixelForValue(t) {
            return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange)
        }
        getValueForPixel(t) {
            return this._startValue + this.getDecimalForPixel(t) * this._valueRange
        }
    },
    Je = e => Math.floor(_t(e)),
    Nt = (e, t) => Math.pow(10, Je(e) + t);

function ih(e) {
    return e / Math.pow(10, Je(e)) === 1
}

function nh(e, t, i) {
    let n = Math.pow(10, i),
        s = Math.floor(e / n);
    return Math.ceil(t / n) - s
}

function Ry(e, t) {
    let i = t - e,
        n = Je(i);
    for (; nh(e, t, n) > 10;) n++;
    for (; nh(e, t, n) < 10;) n--;
    return Math.min(n, Je(e))
}

function Iy(e, {
    min: t,
    max: i
}) {
    t = et(e.min, t);
    let n = [],
        s = Je(t),
        o = Ry(t, i),
        r = o < 0 ? Math.pow(10, Math.abs(o)) : 1,
        a = Math.pow(10, o),
        l = s > o ? Math.pow(10, s) : 0,
        c = Math.round((t - l) * r) / r,
        h = Math.floor((t - l) / a / 10) * a * 10,
        u = Math.floor((c - h) / Math.pow(10, o)),
        d = et(e.min, Math.round((l + h + u * Math.pow(10, o)) * r) / r);
    for (; d < i;) n.push({
        value: d,
        major: ih(d),
        significand: u
    }), u >= 10 ? u = u < 15 ? 15 : 20 : u++, u >= 20 && (o++, u = 2, r = o >= 0 ? 1 : r), d = Math.round((l + h + u * Math.pow(10, o)) * r) / r;
    let f = et(e.max, d);
    return n.push({
        value: f,
        major: ih(f),
        significand: u
    }), n
}
var sh = class extends Ht {
    static id = "logarithmic";
    static defaults = {
        ticks: {
            callback: Be.formatters.logarithmic,
            major: {
                enabled: !0
            }
        }
    };
    constructor(t) {
        super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0
    }
    parse(t, i) {
        let n = ge.prototype.parse.apply(this, [t, i]);
        if (n === 0) {
            this._zero = !0;
            return
        }
        return W(n) && n > 0 ? n : null
    }
    determineDataLimits() {
        let {
            min: t,
            max: i
        } = this.getMinMax(!0);
        this.min = W(t) ? Math.max(0, t) : null, this.max = W(i) ? Math.max(0, i) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !W(this._userMin) && (this.min = t === Nt(this.min, 0) ? Nt(this.min, -1) : Nt(this.min, 0)), this.handleTickRangeOptions()
    }
    handleTickRangeOptions() {
        let {
            minDefined: t,
            maxDefined: i
        } = this.getUserBounds(), n = this.min, s = this.max, o = a => n = t ? n : a, r = a => s = i ? s : a;
        n === s && (n <= 0 ? (o(1), r(10)) : (o(Nt(n, -1)), r(Nt(s, 1)))), n <= 0 && o(Nt(s, -1)), s <= 0 && r(Nt(n, 1)), this.min = n, this.max = s
    }
    buildTicks() {
        let t = this.options,
            i = {
                min: this._userMin,
                max: this._userMax
            },
            n = Iy(i, this);
        return t.bounds === "ticks" && En(n, this, "value"), t.reverse ? (n.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n
    }
    getLabelForValue(t) {
        return t === void 0 ? "0" : ce(t, this.chart.options.locale, this.options.ticks.format)
    }
    configure() {
        let t = this.min;
        super.configure(), this._startValue = _t(t), this._valueRange = _t(this.max) - _t(t)
    }
    getPixelForValue(t) {
        return (t === void 0 || t === 0) && (t = this.min), t === null || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (_t(t) - this._startValue) / this._valueRange)
    }
    getValueForPixel(t) {
        let i = this.getDecimalForPixel(t);
        return Math.pow(10, this._startValue + i * this._valueRange)
    }
};

function Ss(e) {
    let t = e.ticks;
    if (t.display && e.display) {
        let i = G(t.backdropPadding);
        return O(t.font && t.font.size, q.font.size) + i.height
    }
    return 0
}

function Fy(e, t, i) {
    return i = z(i) ? i : [i], {
        w: Yl(e, t.string, i),
        h: i.length * t.lineHeight
    }
}

function oh(e, t, i, n, s) {
    return e === n || e === s ? {
        start: t - i / 2,
        end: t + i / 2
    } : e < n || e > s ? {
        start: t - i,
        end: t
    } : {
        start: t,
        end: t + i
    }
}

function zy(e) {
    let t = {
            l: e.left + e._padding.left,
            r: e.right - e._padding.right,
            t: e.top + e._padding.top,
            b: e.bottom - e._padding.bottom
        },
        i = Object.assign({}, t),
        n = [],
        s = [],
        o = e._pointLabels.length,
        r = e.options.pointLabels,
        a = r.centerPointLabels ? V / o : 0;
    for (let l = 0; l < o; l++) {
        let c = r.setContext(e.getPointLabelContext(l));
        s[l] = c.padding;
        let h = e.getPointPosition(l, e.drawingArea + s[l], a),
            u = U(c.font),
            d = Fy(e.ctx, u, e._pointLabels[l]);
        n[l] = d;
        let f = tt(e.getIndexAngle(l) + a),
            g = Math.round(yi(f)),
            p = oh(g, h.x, d.w, 0, 180),
            m = oh(g, h.y, d.h, 90, 270);
        By(i, t, f, p, m)
    }
    e.setCenterPoint(t.l - i.l, i.r - t.r, t.t - i.t, i.b - t.b), e._pointLabelItems = Ny(e, n, s)
}

function By(e, t, i, n, s) {
    let o = Math.abs(Math.sin(i)),
        r = Math.abs(Math.cos(i)),
        a = 0,
        l = 0;
    n.start < t.l ? (a = (t.l - n.start) / o, e.l = Math.min(e.l, t.l - a)) : n.end > t.r && (a = (n.end - t.r) / o, e.r = Math.max(e.r, t.r + a)), s.start < t.t ? (l = (t.t - s.start) / r, e.t = Math.min(e.t, t.t - l)) : s.end > t.b && (l = (s.end - t.b) / r, e.b = Math.max(e.b, t.b + l))
}

function jy(e, t, i) {
    let n = e.drawingArea,
        {
            extra: s,
            additionalAngle: o,
            padding: r,
            size: a
        } = i,
        l = e.getPointPosition(t, n + s + r, o),
        c = Math.round(yi(tt(l.angle + H))),
        h = qy(l.y, a.h, c),
        u = Hy(c),
        d = Wy(l.x, a.w, u);
    return {
        visible: !0,
        x: l.x,
        y: h,
        textAlign: u,
        left: d,
        top: h,
        right: d + a.w,
        bottom: h + a.h
    }
}

function Vy(e, t) {
    if (!t) return !0;
    let {
        left: i,
        top: n,
        right: s,
        bottom: o
    } = e;
    return !(ut({
        x: i,
        y: n
    }, t) || ut({
        x: i,
        y: o
    }, t) || ut({
        x: s,
        y: n
    }, t) || ut({
        x: s,
        y: o
    }, t))
}

function Ny(e, t, i) {
    let n = [],
        s = e._pointLabels.length,
        o = e.options,
        {
            centerPointLabels: r,
            display: a
        } = o.pointLabels,
        l = {
            extra: Ss(o) / 2,
            additionalAngle: r ? V / s : 0
        },
        c;
    for (let h = 0; h < s; h++) {
        l.padding = i[h], l.size = t[h];
        let u = jy(e, h, l);
        n.push(u), a === "auto" && (u.visible = Vy(u, c), u.visible && (c = u))
    }
    return n
}

function Hy(e) {
    return e === 0 || e === 180 ? "center" : e < 180 ? "left" : "right"
}

function Wy(e, t, i) {
    return i === "right" ? e -= t : i === "center" && (e -= t / 2), e
}

function qy(e, t, i) {
    return i === 90 || i === 270 ? e -= t / 2 : (i > 270 || i < 90) && (e -= t), e
}

function $y(e, t, i) {
    let {
        left: n,
        top: s,
        right: o,
        bottom: r
    } = i, {
        backdropColor: a
    } = t;
    if (!E(a)) {
        let l = Tt(t.borderRadius),
            c = G(t.backdropPadding);
        e.fillStyle = a;
        let h = n - c.left,
            u = s - c.top,
            d = o - n + c.width,
            f = r - s + c.height;
        Object.values(l).some(g => g !== 0) ? (e.beginPath(), he(e, {
            x: h,
            y: u,
            w: d,
            h: f,
            radius: l
        }), e.fill()) : e.fillRect(h, u, d, f)
    }
}

function Uy(e, t) {
    let {
        ctx: i,
        options: {
            pointLabels: n
        }
    } = e;
    for (let s = t - 1; s >= 0; s--) {
        let o = e._pointLabelItems[s];
        if (!o.visible) continue;
        let r = n.setContext(e.getPointLabelContext(s));
        $y(i, r, o);
        let a = U(r.font),
            {
                x: l,
                y: c,
                textAlign: h
            } = o;
        Dt(i, e._pointLabels[s], l, c + a.lineHeight / 2, a, {
            color: r.color,
            textAlign: h,
            textBaseline: "middle"
        })
    }
}

function Ah(e, t, i, n) {
    let {
        ctx: s
    } = e;
    if (i) s.arc(e.xCenter, e.yCenter, t, 0, B);
    else {
        let o = e.getPointPosition(0, t);
        s.moveTo(o.x, o.y);
        for (let r = 1; r < n; r++) o = e.getPointPosition(r, t), s.lineTo(o.x, o.y)
    }
}

function Yy(e, t, i, n, s) {
    let o = e.ctx,
        r = t.circular,
        {
            color: a,
            lineWidth: l
        } = t;
    !r && !n || !a || !l || i < 0 || (o.save(), o.strokeStyle = a, o.lineWidth = l, o.setLineDash(s.dash), o.lineDashOffset = s.dashOffset, o.beginPath(), Ah(e, i, r, n), o.closePath(), o.stroke(), o.restore())
}

function Xy(e, t, i) {
    return yt(e, {
        label: i,
        index: t,
        type: "pointLabel"
    })
}
var rh = class extends ge {
        static id = "radialLinear";
        static defaults = {
            display: !0,
            animate: !0,
            position: "chartArea",
            angleLines: {
                display: !0,
                lineWidth: 1,
                borderDash: [],
                borderDashOffset: 0
            },
            grid: {
                circular: !1
            },
            startAngle: 0,
            ticks: {
                showLabelBackdrop: !0,
                callback: Be.formatters.numeric
            },
            pointLabels: {
                backdropColor: void 0,
                backdropPadding: 2,
                display: !0,
                font: {
                    size: 10
                },
                callback(t) {
                    return t
                },
                padding: 5,
                centerPointLabels: !1
            }
        };
        static defaultRoutes = {
            "angleLines.color": "borderColor",
            "pointLabels.color": "color",
            "ticks.color": "color"
        };
        static descriptors = {
            angleLines: {
                _fallback: "grid"
            }
        };
        constructor(t) {
            super(t), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = []
        }
        setDimensions() {
            let t = this._padding = G(Ss(this.options) / 2),
                i = this.width = this.maxWidth - t.width,
                n = this.height = this.maxHeight - t.height;
            this.xCenter = Math.floor(this.left + i / 2 + t.left), this.yCenter = Math.floor(this.top + n / 2 + t.top), this.drawingArea = Math.floor(Math.min(i, n) / 2)
        }
        determineDataLimits() {
            let {
                min: t,
                max: i
            } = this.getMinMax(!1);
            this.min = W(t) && !isNaN(t) ? t : 0, this.max = W(i) && !isNaN(i) ? i : 0, this.handleTickRangeOptions()
        }
        computeTickLimit() {
            return Math.ceil(this.drawingArea / Ss(this.options))
        }
        generateTickLabels(t) {
            ge.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((i, n) => {
                let s = F(this.options.pointLabels.callback, [i, n], this);
                return s || s === 0 ? s : ""
            }).filter((i, n) => this.chart.getDataVisibility(n))
        }
        fit() {
            let t = this.options;
            t.display && t.pointLabels.display ? zy(this) : this.setCenterPoint(0, 0, 0, 0)
        }
        setCenterPoint(t, i, n, s) {
            this.xCenter += Math.floor((t - i) / 2), this.yCenter += Math.floor((n - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, i, n, s))
        }
        getIndexAngle(t) {
            let i = B / (this._pointLabels.length || 1),
                n = this.options.startAngle || 0;
            return tt(t * i + rt(n))
        }
        getDistanceFromCenterForValue(t) {
            if (E(t)) return NaN;
            let i = this.drawingArea / (this.max - this.min);
            return this.options.reverse ? (this.max - t) * i : (t - this.min) * i
        }
        getValueForDistanceFromCenter(t) {
            if (E(t)) return NaN;
            let i = t / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - i : this.min + i
        }
        getPointLabelContext(t) {
            let i = this._pointLabels || [];
            if (t >= 0 && t < i.length) {
                let n = i[t];
                return Xy(this.getContext(), t, n)
            }
        }
        getPointPosition(t, i, n = 0) {
            let s = this.getIndexAngle(t) - H + n;
            return {
                x: Math.cos(s) * i + this.xCenter,
                y: Math.sin(s) * i + this.yCenter,
                angle: s
            }
        }
        getPointPositionForValue(t, i) {
            return this.getPointPosition(t, this.getDistanceFromCenterForValue(i))
        }
        getBasePosition(t) {
            return this.getPointPositionForValue(t || 0, this.getBaseValue())
        }
        getPointLabelPosition(t) {
            let {
                left: i,
                top: n,
                right: s,
                bottom: o
            } = this._pointLabelItems[t];
            return {
                left: i,
                top: n,
                right: s,
                bottom: o
            }
        }
        drawBackground() {
            let {
                backgroundColor: t,
                grid: {
                    circular: i
                }
            } = this.options;
            if (t) {
                let n = this.ctx;
                n.save(), n.beginPath(), Ah(this, this.getDistanceFromCenterForValue(this._endValue), i, this._pointLabels.length), n.closePath(), n.fillStyle = t, n.fill(), n.restore()
            }
        }
        drawGrid() {
            let t = this.ctx,
                i = this.options,
                {
                    angleLines: n,
                    grid: s,
                    border: o
                } = i,
                r = this._pointLabels.length,
                a, l, c;
            if (i.pointLabels.display && Uy(this, r), s.display && this.ticks.forEach((h, u) => {
                    if (u !== 0) {
                        l = this.getDistanceFromCenterForValue(h.value);
                        let d = this.getContext(u),
                            f = s.setContext(d),
                            g = o.setContext(d);
                        Yy(this, f, l, r, g)
                    }
                }), n.display) {
                for (t.save(), a = r - 1; a >= 0; a--) {
                    let h = n.setContext(this.getPointLabelContext(a)),
                        {
                            color: u,
                            lineWidth: d
                        } = h;
                    !d || !u || (t.lineWidth = d, t.strokeStyle = u, t.setLineDash(h.borderDash), t.lineDashOffset = h.borderDashOffset, l = this.getDistanceFromCenterForValue(i.ticks.reverse ? this.min : this.max), c = this.getPointPosition(a, l), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(c.x, c.y), t.stroke())
                }
                t.restore()
            }
        }
        drawBorder() {}
        drawLabels() {
            let t = this.ctx,
                i = this.options,
                n = i.ticks;
            if (!n.display) return;
            let s = this.getIndexAngle(0),
                o, r;
            t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((a, l) => {
                if (l === 0 && !i.reverse) return;
                let c = n.setContext(this.getContext(l)),
                    h = U(c.font);
                if (o = this.getDistanceFromCenterForValue(this.ticks[l].value), c.showLabelBackdrop) {
                    t.font = h.string, r = t.measureText(a.label).width, t.fillStyle = c.backdropColor;
                    let u = G(c.backdropPadding);
                    t.fillRect(-r / 2 - u.left, -o - h.size / 2 - u.top, r + u.width, h.size + u.height)
                }
                Dt(t, a.label, 0, -o, h, {
                    color: c.color,
                    strokeColor: c.textStrokeColor,
                    strokeWidth: c.textStrokeWidth
                })
            }), t.restore()
        }
        drawTitle() {}
    },
    Gi = {
        millisecond: {
            common: !0,
            size: 1,
            steps: 1e3
        },
        second: {
            common: !0,
            size: 1e3,
            steps: 60
        },
        minute: {
            common: !0,
            size: 6e4,
            steps: 60
        },
        hour: {
            common: !0,
            size: 36e5,
            steps: 24
        },
        day: {
            common: !0,
            size: 864e5,
            steps: 30
        },
        week: {
            common: !1,
            size: 6048e5,
            steps: 4
        },
        month: {
            common: !0,
            size: 2628e6,
            steps: 12
        },
        quarter: {
            common: !1,
            size: 7884e6,
            steps: 4
        },
        year: {
            common: !0,
            size: 3154e7
        }
    },
    nt = Object.keys(Gi);

function ah(e, t) {
    return e - t
}

function lh(e, t) {
    if (E(t)) return null;
    let i = e._adapter,
        {
            parser: n,
            round: s,
            isoWeekday: o
        } = e._parseOpts,
        r = t;
    return typeof n == "function" && (r = n(r)), W(r) || (r = typeof n == "string" ? i.parse(r, n) : i.parse(r)), r === null ? null : (s && (r = s === "week" && (ae(o) || o === !0) ? i.startOf(r, "isoWeek", o) : i.startOf(r, s)), +r)
}

function ch(e, t, i, n) {
    let s = nt.length;
    for (let o = nt.indexOf(e); o < s - 1; ++o) {
        let r = Gi[nt[o]],
            a = r.steps ? r.steps : Number.MAX_SAFE_INTEGER;
        if (r.common && Math.ceil((i - t) / (a * r.size)) <= n) return nt[o]
    }
    return nt[s - 1]
}

function Ky(e, t, i, n, s) {
    for (let o = nt.length - 1; o >= nt.indexOf(i); o--) {
        let r = nt[o];
        if (Gi[r].common && e._adapter.diff(s, n, r) >= t - 1) return r
    }
    return nt[i ? nt.indexOf(i) : 0]
}

function Gy(e) {
    for (let t = nt.indexOf(e) + 1, i = nt.length; t < i; ++t)
        if (Gi[nt[t]].common) return nt[t]
}

function hh(e, t, i) {
    if (!i) e[t] = !0;
    else if (i.length) {
        let {
            lo: n,
            hi: s
        } = vi(i, t), o = i[n] >= t ? i[n] : i[s];
        e[o] = !0
    }
}

function Zy(e, t, i, n) {
    let s = e._adapter,
        o = +s.startOf(t[0].value, n),
        r = t[t.length - 1].value,
        a, l;
    for (a = o; a <= r; a = +s.add(a, 1, n)) l = i[a], l >= 0 && (t[l].major = !0);
    return t
}

function uh(e, t, i) {
    let n = [],
        s = {},
        o = t.length,
        r, a;
    for (r = 0; r < o; ++r) a = t[r], s[a] = r, n.push({
        value: a,
        major: !1
    });
    return o === 0 || !i ? n : Zy(e, n, s, i)
}
var Ki = class extends Ht {
    static id = "time";
    static defaults = {
        bounds: "data",
        adapters: {},
        time: {
            parser: !1,
            unit: !1,
            round: !1,
            isoWeekday: !1,
            minUnit: "millisecond",
            displayFormats: {}
        },
        ticks: {
            source: "auto",
            callback: !1,
            major: {
                enabled: !1
            }
        }
    };
    constructor(t) {
        super(t), this._cache = {
            data: [],
            labels: [],
            all: []
        }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0
    }
    init(t, i = {}) {
        let n = t.time || (t.time = {}),
            s = this._adapter = new C_._date(t.adapters.date);
        s.init(i), se(n.displayFormats, s.formats()), this._parseOpts = {
            parser: n.parser,
            round: n.round,
            isoWeekday: n.isoWeekday
        }, super.init(t), this._normalized = i.normalized
    }
    parse(t, i) {
        return t === void 0 ? null : lh(this, t)
    }
    beforeLayout() {
        super.beforeLayout(), this._cache = {
            data: [],
            labels: [],
            all: []
        }
    }
    determineDataLimits() {
        let t = this.options,
            i = this._adapter,
            n = t.time.unit || "day",
            {
                min: s,
                max: o,
                minDefined: r,
                maxDefined: a
            } = this.getUserBounds();

        function l(c) {
            !r && !isNaN(c.min) && (s = Math.min(s, c.min)), !a && !isNaN(c.max) && (o = Math.max(o, c.max))
        }(!r || !a) && (l(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && l(this.getMinMax(!1))), s = W(s) && !isNaN(s) ? s : +i.startOf(Date.now(), n), o = W(o) && !isNaN(o) ? o : +i.endOf(Date.now(), n) + 1, this.min = Math.min(s, o - 1), this.max = Math.max(s + 1, o)
    }
    _getLabelBounds() {
        let t = this.getLabelTimestamps(),
            i = Number.POSITIVE_INFINITY,
            n = Number.NEGATIVE_INFINITY;
        return t.length && (i = t[0], n = t[t.length - 1]), {
            min: i,
            max: n
        }
    }
    buildTicks() {
        let t = this.options,
            i = t.time,
            n = t.ticks,
            s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
        t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
        let o = this.min,
            r = this.max,
            a = jl(s, o, r);
        return this._unit = i.unit || (n.autoSkip ? ch(i.minUnit, this.min, this.max, this._getLabelCapacity(o)) : Ky(this, a.length, i.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : Gy(this._unit), this.initOffsets(s), t.reverse && a.reverse(), uh(this, a, this._majorUnit)
    }
    afterAutoSkip() {
        this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map(t => +t.value))
    }
    initOffsets(t = []) {
        let i = 0,
            n = 0,
            s, o;
        this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? i = 1 - s : i = (this.getDecimalForValue(t[1]) - s) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = o : n = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
        let r = t.length < 3 ? .5 : .25;
        i = X(i, 0, r), n = X(n, 0, r), this._offsets = {
            start: i,
            end: n,
            factor: 1 / (i + 1 + n)
        }
    }
    _generate() {
        let t = this._adapter,
            i = this.min,
            n = this.max,
            s = this.options,
            o = s.time,
            r = o.unit || ch(o.minUnit, i, n, this._getLabelCapacity(i)),
            a = O(s.ticks.stepSize, 1),
            l = r === "week" ? o.isoWeekday : !1,
            c = ae(l) || l === !0,
            h = {},
            u = i,
            d, f;
        if (c && (u = +t.startOf(u, "isoWeek", l)), u = +t.startOf(u, c ? "day" : r), t.diff(n, i, r) > 1e5 * a) throw new Error(i + " and " + n + " are too far apart with stepSize of " + a + " " + r);
        let g = s.ticks.source === "data" && this.getDataTimestamps();
        for (d = u, f = 0; d < n; d = +t.add(d, a, r), f++) hh(h, d, g);
        return (d === n || s.bounds === "ticks" || f === 1) && hh(h, d, g), Object.keys(h).sort(ah).map(p => +p)
    }
    getLabelForValue(t) {
        let i = this._adapter,
            n = this.options.time;
        return n.tooltipFormat ? i.format(t, n.tooltipFormat) : i.format(t, n.displayFormats.datetime)
    }
    format(t, i) {
        let s = this.options.time.displayFormats,
            o = this._unit,
            r = i || s[o];
        return this._adapter.format(t, r)
    }
    _tickFormatFunction(t, i, n, s) {
        let o = this.options,
            r = o.ticks.callback;
        if (r) return F(r, [t, i, n], this);
        let a = o.time.displayFormats,
            l = this._unit,
            c = this._majorUnit,
            h = l && a[l],
            u = c && a[c],
            d = n[i],
            f = c && u && d && d.major;
        return this._adapter.format(t, s || (f ? u : h))
    }
    generateTickLabels(t) {
        let i, n, s;
        for (i = 0, n = t.length; i < n; ++i) s = t[i], s.label = this._tickFormatFunction(s.value, i, t)
    }
    getDecimalForValue(t) {
        return t === null ? NaN : (t - this.min) / (this.max - this.min)
    }
    getPixelForValue(t) {
        let i = this._offsets,
            n = this.getDecimalForValue(t);
        return this.getPixelForDecimal((i.start + n) * i.factor)
    }
    getValueForPixel(t) {
        let i = this._offsets,
            n = this.getDecimalForPixel(t) / i.factor - i.end;
        return this.min + n * (this.max - this.min)
    }
    _getLabelSize(t) {
        let i = this.options.ticks,
            n = this.ctx.measureText(t).width,
            s = rt(this.isHorizontal() ? i.maxRotation : i.minRotation),
            o = Math.cos(s),
            r = Math.sin(s),
            a = this._resolveTickFontOptions(0).size;
        return {
            w: n * o + a * r,
            h: n * r + a * o
        }
    }
    _getLabelCapacity(t) {
        let i = this.options.time,
            n = i.displayFormats,
            s = n[i.unit] || n.millisecond,
            o = this._tickFormatFunction(t, 0, uh(this, [t], this._majorUnit), s),
            r = this._getLabelSize(o),
            a = Math.floor(this.isHorizontal() ? this.width / r.w : this.height / r.h) - 1;
        return a > 0 ? a : 1
    }
    getDataTimestamps() {
        let t = this._cache.data || [],
            i, n;
        if (t.length) return t;
        let s = this.getMatchingVisibleMetas();
        if (this._normalized && s.length) return this._cache.data = s[0].controller.getAllParsedValues(this);
        for (i = 0, n = s.length; i < n; ++i) t = t.concat(s[i].controller.getAllParsedValues(this));
        return this._cache.data = this.normalize(t)
    }
    getLabelTimestamps() {
        let t = this._cache.labels || [],
            i, n;
        if (t.length) return t;
        let s = this.getLabels();
        for (i = 0, n = s.length; i < n; ++i) t.push(lh(this, s[i]));
        return this._cache.labels = this._normalized ? t : this.normalize(t)
    }
    normalize(t) {
        return zn(t.sort(ah))
    }
};

function Ei(e, t, i) {
    let n = 0,
        s = e.length - 1,
        o, r, a, l;
    i ? (t >= e[n].pos && t <= e[s].pos && ({
        lo: n,
        hi: s
    } = Ot(e, "pos", t)), {
        pos: o,
        time: a
    } = e[n], {
        pos: r,
        time: l
    } = e[s]) : (t >= e[n].time && t <= e[s].time && ({
        lo: n,
        hi: s
    } = Ot(e, "time", t)), {
        time: o,
        pos: a
    } = e[n], {
        time: r,
        pos: l
    } = e[s]);
    let c = r - o;
    return c ? a + (l - a) * (t - o) / c : a
}
var dh = class extends Ki {
    static id = "timeseries";
    static defaults = Ki.defaults;
    constructor(t) {
        super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0
    }
    initOffsets() {
        let t = this._getTimestampsForTable(),
            i = this._table = this.buildLookupTable(t);
        this._minPos = Ei(i, this.min), this._tableRange = Ei(i, this.max) - this._minPos, super.initOffsets(t)
    }
    buildLookupTable(t) {
        let {
            min: i,
            max: n
        } = this, s = [], o = [], r, a, l, c, h;
        for (r = 0, a = t.length; r < a; ++r) c = t[r], c >= i && c <= n && s.push(c);
        if (s.length < 2) return [{
            time: i,
            pos: 0
        }, {
            time: n,
            pos: 1
        }];
        for (r = 0, a = s.length; r < a; ++r) h = s[r + 1], l = s[r - 1], c = s[r], Math.round((h + l) / 2) !== c && o.push({
            time: c,
            pos: r / (a - 1)
        });
        return o
    }
    _generate() {
        let t = this.min,
            i = this.max,
            n = super.getDataTimestamps();
        return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(i) || n.length === 1) && n.push(i), n.sort((s, o) => s - o)
    }
    _getTimestampsForTable() {
        let t = this._cache.all || [];
        if (t.length) return t;
        let i = this.getDataTimestamps(),
            n = this.getLabelTimestamps();
        return i.length && n.length ? t = this.normalize(i.concat(n)) : t = i.length ? i : n, t = this._cache.all = t, t
    }
    getDecimalForValue(t) {
        return (Ei(this._table, t) - this._minPos) / this._tableRange
    }
    getValueForPixel(t) {
        let i = this._offsets,
            n = this.getDecimalForPixel(t) / i.factor - i.end;
        return Ei(this._table, n * this._tableRange + this._minPos, !0)
    }
};
var J = Rh(nn(), 1);
var Th = "label";

function Dh(e, t) {
    typeof e == "function" ? e(t) : e && (e.current = t)
}

function Jy(e, t) {
    let i = e.options;
    i && t && Object.assign(i, t)
}

function Lh(e, t) {
    e.labels = t
}

function Eh(e, t) {
    let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Th,
        n = [];
    e.datasets = t.map(s => {
        let o = e.datasets.find(r => r[i] === s[i]);
        return !o || !s.data || n.includes(o) ? { ...s
        } : (n.push(o), Object.assign(o, s), o)
    })
}

function Qy(e) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Th,
        i = {
            labels: [],
            datasets: []
        };
    return Lh(i, e.labels), Eh(i, e.datasets, t), i
}

function t0(e, t) {
    let {
        height: i = 150,
        width: n = 300,
        redraw: s = !1,
        datasetIdKey: o,
        type: r,
        data: a,
        options: l,
        plugins: c = [],
        fallbackContent: h,
        updateMode: u,
        ...d
    } = e, f = (0, J.useRef)(null), g = (0, J.useRef)(), p = () => {
        f.current && (g.current = new fe(f.current, {
            type: r,
            data: Qy(a, o),
            options: l && { ...l
            },
            plugins: c
        }), Dh(t, g.current))
    }, m = () => {
        Dh(t, null), g.current && (g.current.destroy(), g.current = null)
    };
    return (0, J.useEffect)(() => {
        !s && g.current && l && Jy(g.current, l)
    }, [s, l]), (0, J.useEffect)(() => {
        !s && g.current && Lh(g.current.config.data, a.labels)
    }, [s, a.labels]), (0, J.useEffect)(() => {
        !s && g.current && a.datasets && Eh(g.current.config.data, a.datasets, o)
    }, [s, a.datasets]), (0, J.useEffect)(() => {
        g.current && (s ? (m(), setTimeout(p)) : g.current.update(u))
    }, [s, l, a.labels, a.datasets, u]), (0, J.useEffect)(() => {
        g.current && (m(), setTimeout(p))
    }, [r]), (0, J.useEffect)(() => (p(), () => m()), []), J.default.createElement("canvas", Object.assign({
        ref: f,
        role: "img",
        height: i,
        width: n
    }, d), h)
}
var e0 = (0, J.forwardRef)(t0);

function pe(e, t) {
    return fe.register(t), (0, J.forwardRef)((i, n) => J.default.createElement(e0, Object.assign({}, i, {
        ref: n,
        type: e
    })))
}
var nM = pe("line", Bi),
    sM = pe("bar", zi),
    oM = pe("radar", Ni),
    rM = pe("doughnut", Ke),
    aM = pe("polarArea", ji);
var lM = pe("pie", Vi);
export {
    nn as a, iu as b, It as c, on as d, fn as e, ke as f, Zt as g, St as h, ve as i, Co as j, ri as k, an as l, hr as m, gr as n, Or as o, Ar as p, Lr as q, Rr as r, Fr as s, Nr as t, hn as u, un as v, $r as w, dn as x, li as y, pn as z, ha as A, ga as B, ma as C, bn as D, Ma as E, wa as F, Aa as G, yn as H, Za as I, rl as J, hl as K, Nm as L, fe as M, zc as N, Ze as O, jc as P, Vc as Q, Kv as R, Gv as S, Zv as T, Jv as U, Qc as V, eh as W, rh as X, nM as Y, sM as Z, oM as _, rM as $, aM as aa, lM as ba
};
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.2
   * https://github.com/kurkle/color#readme
   * (c) 2023 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.segment.js:
  (*!
   * Chart.js v4.3.3
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chart.js:
  (*!
   * Chart.js v4.3.3
   * https://www.chartjs.org
   * (c) 2023 Chart.js Contributors
   * Released under the MIT License
   *)
*/
//# sourceMappingURL=https://www.convertcalculator.com/scripts/chunk-CDMV5D6B.js.map