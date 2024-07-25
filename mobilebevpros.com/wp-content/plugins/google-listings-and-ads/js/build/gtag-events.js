! function() {
    "use strict";
    var t = window.wp.hooks;
    const e = function(t) {
            ((t, e) => {
                if ("function" != typeof gtag) throw new Error("Function gtag not implemented.");
                window.gtag("event", "add_to_cart", {
                    send_to: "GLA",
                    ...e
                })
            })(0, {
                ecomm_pagetype: "cart",
                event_category: "ecommerce",
                items: [n(t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1)]
            })
        },
        n = (t, e) => {
            const n = {
                id: "gla_" + t.id,
                quantity: e,
                google_business_vertical: "retail"
            };
            return t.name && (n.name = t.name), t ? .categories ? .length && (n.category = t.categories[0].name), t ? .prices ? .price && (n.price = parseInt(t.prices.price, 10) / 10 ** t.prices.currency_minor_unit), n
        },
        o = t => {
            var e;
            return glaGtagData.products[t.id] && (t.name = glaGtagData.products[t.id].name, t.prices = (e = glaGtagData.products[t.id].price, {
                price: Math.round(e * 10 ** glaGtagData.currency_minor_unit),
                currency_minor_unit: glaGtagData.currency_minor_unit
            })), t
        };
    (0, t.addAction)("experimental__woocommerce_blocks-cart-add-item", "google-listings-and-ads", (t => {
        let {
            product: n,
            quantity: o = 1
        } = t;
        e(n, o)
    }));
    const a = function(t) {
            const n = t.currentTarget.dataset,
                a = o({
                    id: n.product_id
                });
            e(a, n.quantity || 1)
        },
        r = function(t) {
            const n = t.target.closest("form.cart");
            if (!n) return;
            const a = n.querySelector("[name=add-to-cart]");
            if (!a) return;
            const r = n.querySelector("[name=variation_id]"),
                c = n.querySelector("[name=quantity]"),
                i = o({
                    id: parseInt(r ? r.value : a.value, 10)
                });
            e(i, c ? parseInt(c.value, 10) : 1)
        };
    document.defaultView.addEventListener("DOMContentLoaded", (function() {
        document.querySelectorAll(".add_to_cart_button:not( .product_type_variable ):not( .product_type_grouped ):not( .wc-block-components-product-button__button )").forEach((t => {
            t.addEventListener("click", a)
        })), document.querySelectorAll('[data-block-name="woocommerce/product-button"] > .add_to_cart_button:not( .product_type_variable ):not( .product_type_grouped )').forEach((t => {
            t.addEventListener("click", a)
        })), document.querySelectorAll(".single_add_to_cart_button").forEach((t => {
            t.addEventListener("click", r)
        }))
    })), "function" == typeof jQuery && jQuery(document).on("found_variation", "form.cart", (function(t, e) {
        (t => {
            t ? .variation_id && (glaGtagData.products[t.variation_id] = {
                name: t.display_name,
                price: t.display_price
            })
        })(e)
    }))
}();