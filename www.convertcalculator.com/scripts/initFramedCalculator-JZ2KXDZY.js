import {
    b as a
} from "https://www.convertcalculator.com/scripts/chunk-LYWSBNLP.js";
import "https://www.convertcalculator.com/scripts/chunk-CDMV5D6B.js";
import "https://www.convertcalculator.com/scripts/chunk-66GJGIWN.js";
var m = ({
        calculatorId: o,
        el: t
    }) => {
        let e = document.createElement("iframe");
        e.className = "calculator-frame", e.id = `calculator-frame-${o}`, e.sandbox = "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox", e.title = "Calculator Frame", e.style = "border:none;", e.width = "100%", e.height = "16rem";
        let n = "https://www.convertcalculator.com";
        e.src = `${n}/embed/${o}?url=${encodeURIComponent(window.location.href)}&framed=1`, t.firstChild && t.removeChild(t.firstChild), t.appendChild(e);
        let r = l => {
            let {
                data: i = {}
            } = l, {
                calculatorId: s,
                payload: d,
                type: c
            } = i;
            s === o && a({
                calculatorId: o,
                payload: d,
                type: c,
                context: {
                    parentWindow: window,
                    calculatorContainer: e
                }
            })
        };
        window.addEventListener("message", r)
    },
    w = m;
export {
    w as
    default
};
//# sourceMappingURL=https://www.convertcalculator.com/scripts/initFramedCalculator-JZ2KXDZY.js.map