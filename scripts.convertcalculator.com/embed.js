var u = t => {
        typeof window > "u" || (document.readyState !== "loading" ? t() : (document.addEventListener("DOMContentLoaded", t), window.addEventListener("popstate", t), window.addEventListener("mercury:load", t)))
    },
    o = (t = !1) => {
        let a = document.querySelectorAll(".calculator"),
            r = Array.from(a),
            l = 0;
        return r.forEach(async e => {
            let {
                dataset: c
            } = e, {
                loaded: s,
                type: i = "inPage"
            } = c;
            if (!t && s) return;
            let n = e.dataset.calcId;
            if (n) {
                if (e.dataset.loaded = !0, i.toUpperCase().includes("PAGE")) {
                    let {
                        default: d
                    } = await
                    import ("https://www.convertcalculator.com/scripts/initInPageCalculator-BRW6FFW3.js");
                    d({
                        el: e,
                        calculatorId: n
                    })
                }
                if (i.toUpperCase().includes("FRAME")) {
                    let {
                        default: d
                    } = await
                    import ("https://www.convertcalculator.com/scripts/initFramedCalculator-JZ2KXDZY.js");
                    d({
                        el: e,
                        calculatorId: n
                    })
                }
                l += 1
            }
        }), l
    },
    w = () => {
        if (o() > 0) return;
        let a = window.setInterval(() => {
            o() > 0 && window.clearInterval(a)
        }, 200);
        window.setTimeout(() => {
            window.clearInterval(a)
        }, 1e4)
    };
typeof window < "u" && (window.cc = { ...window.cc,
    reinitialize: () => {
        console.warn("The reinitialize method is depreciated. Please use the method reload() instead"), o(!0)
    },
    reload: () => {
        o(!0)
    }
});
u(() => {
    w()
});
//# sourceMappingURL=https://www.convertcalculator.com/scripts/embed.js.map