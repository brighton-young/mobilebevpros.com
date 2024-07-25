(() => {
    "use strict";
    var t = {
            d: (e, o) => {
                for (var c in o) t.o(o, c) && !t.o(e, c) && Object.defineProperty(e, c, {
                    enumerable: !0,
                    get: o[c]
                })
            },
            o: (t, e) => Object.prototype.hasOwnProperty.call(t, e),
            r: t => {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
        },
        e = {};
    t.r(e), t.d(e, {
        add_to_cart: () => g,
        begin_checkout: () => y,
        purchase: () => h,
        remove_from_cart: () => w,
        search: () => f,
        select_content: () => v,
        view_item: () => b,
        view_item_list: () => l
    });
    const o = window.wp.i18n,
        c = window.wp.hooks,
        r = (t, e) => {
            var o;
            const c = {};
            t.variation && (c.item_variant = t.variation);
            const r = {
                item_id: d(t),
                item_name: t.name,
                ...u(t),
                quantity: null !== (o = t.quantity) && void 0 !== o ? o : e,
                price: i(t.prices.price, t.prices.currency_minor_unit),
                ...c
            };
            return t ? .price_after_coupon_discount < t.prices.price && (r.discount = i(t.prices.price - t.price_after_coupon_discount, t.prices.currency_minor_unit), r.price = i(t.price_after_coupon_discount, t.prices.currency_minor_unit)), r
        },
        n = (t, e) => ({
            item_id: d(t),
            item_name: t.name,
            item_list_name: e,
            ...u(t),
            price: i(t.prices.price, t.prices.currency_minor_unit)
        }),
        i = (t, e = 2) => parseInt(t, 10) / 10 ** e,
        a = (t, e, o) => {
            (0, c.removeAction)(t, e), (0, c.addAction)(t, e, o)
        },
        d = t => {
            const e = t.extensions ? .woocommerce_google_analytics_integration ? .identifier;
            return void 0 !== e ? e : "product_sku" === window.ga4w ? .settings ? .identifier ? t.sku ? t.sku : "#" + t.id : t.id
        },
        s = t => t.coupons[0] ? .code ? {
            coupon: t.coupons[0] ? .code
        } : {},
        u = t => "categories" in t && t.categories.length ? _(t.categories) : {},
        _ = t => Object.fromEntries(t.slice(0, 5).map(((t, e) => [m(e), t.name]))),
        m = t => "item_category" + (t > 0 ? t + 1 : ""),
        p = (t, e, o) => {
            var c;
            return null !== (c = e ? .find((({
                id: e
            }) => e === t))) && void 0 !== c ? c : o ? .items ? .find((({
                id: e
            }) => e === t))
        },
        l = ({
            products: t,
            listName: e = (0, o.__)("Product List", "woocommerce-google-analytics-integration")
        }) => 0 !== t.length && {
            item_list_id: "engagement",
            item_list_name: (0, o.__)("Viewing products", "woocommerce-google-analytics-integration"),
            items: t.map(((t, o) => ({ ...n(t, e),
                index: o + 1
            })))
        },
        g = ({
            product: t,
            quantity: e = 1
        }) => ({
            items: t ? [r(t, e)] : []
        }),
        w = ({
            product: t,
            quantity: e = 1
        }) => ({
            items: t ? [r(t, e)] : []
        }),
        y = ({
            storeCart: t
        }) => ({
            currency: t.totals.currency_code,
            value: i(t.totals.total_price, t.totals.currency_minor_unit),
            ...s(t),
            items: t.items.map(r)
        }),
        v = ({
            product: t
        }) => !!t && {
            content_type: "product",
            content_id: d(t)
        },
        f = ({
            searchTerm: t
        }) => ({
            search_term: t
        }),
        b = ({
            product: t,
            listName: e = (0, o.__)("Product List", "woocommerce-google-analytics-integration")
        }) => !!t && {
            items: [n(t, e)]
        },
        h = ({
            order: t
        }) => void 0 !== t && {
            transaction_id: t.id,
            affiliation: t.affiliation,
            currency: t.totals.currency_code,
            value: i(t.totals.total_price, t.totals.currency_minor_unit),
            tax: i(t.totals.tax_total, t.totals.currency_minor_unit),
            shipping: i(t.totals.shipping_total, t.totals.currency_minor_unit),
            items: t.items.map(r)
        },
        k = "woocommerce-google-analytics",
        A = "experimental__woocommerce_blocks";

    function $() {
        const t = function({
            events: t,
            tracker_function_name: o
        }) {
            return function(c) {
                const r = e[c];
                if ("function" != typeof r) throw new Error(`Event ${c} is not supported.`);
                return function(e) {
                    const n = r(e);
                    t.includes(c) && n && window[o]("event", c, n)
                }
            }
        }(window.ga4w.settings);
        ! function(t, {
            events: e,
            cart: o,
            products: c,
            product: r,
            added_to_cart: n,
            order: i
        }) {
            Object.values(null != e ? e : {}).forEach((e => {
                "add_to_cart" === e ? t(e)({
                    product: n
                }) : t(e)({
                    storeCart: o,
                    products: c,
                    product: r,
                    order: i
                })
            })), document.body.onadded_to_cart = (e, n, i, a) => {
                const d = parseInt(a[0].dataset.product_id || a[0].value),
                    s = r ? .id === d ? r : p(parseInt(d), c, o);
                s && t("add_to_cart")({
                    product: s
                })
            };
            const a = () => {
                document.querySelectorAll(".woocommerce-cart-form .woocommerce-cart-form__cart-item .remove[data-product_id]").forEach((t => t.addEventListener("click", d)))
            };

            function d(e) {
                t("remove_from_cart")({
                    product: p(parseInt(e.target.dataset.product_id), c, o)
                })
            }
            a();
            const s = document.body.onupdated_wc_div;
            document.body.onupdated_wc_div = (...t) => {
                "function" == typeof s && s(...t), a()
            };
            const u = document.body.onremoved_from_cart;
            document.body.onremoved_from_cart = (...t) => {
                "function" == typeof u && u(...t), d({
                    target: t[3][0]
                })
            }, document.querySelectorAll(".products .product:not(.wp-block-post)") ? .forEach((e => {
                const r = e.querySelector("a[data-product_id]") ? .getAttribute("data-product_id");
                r && e.addEventListener("click", (e => {
                    const n = e.target.closest(".woocommerce-loop-product__link"),
                        i = e.target.classList.contains("button") && e.target.hasAttribute("data-product_id"),
                        a = e.target.classList.contains("add_to_cart_button") && !e.target.classList.contains("product_type_variable");
                    (n || i && !a) && t("select_content")({
                        product: p(parseInt(r), c, o)
                    })
                }))
            })), document.querySelectorAll(".products-block-post-template .product, .wc-block-product-template .product") ? .forEach((e => {
                const r = e.querySelector("[data-product_id]") ? .getAttribute("data-product_id");
                r && e.addEventListener("click", (e => {
                    const n = e.target,
                        i = n.closest(".wc-block-components-product-image a"),
                        a = n.closest(".wp-block-post-title a"),
                        d = n.closest(".wc-block-components-product-button [data-product_id]");
                    d && d.classList.contains("add_to_cart_button") && !d.classList.contains("product_type_variable") ? t("add_to_cart")({
                        product: p(parseInt(r), c, o)
                    }) : (i || d || a) && t("select_content")({
                        product: p(parseInt(r), c, o)
                    })
                }))
            }))
        }(t, window.ga4w.data), (t => {
            a(`${A}-product-render`, k, t("view_item")), a(`${A}-cart-remove-item`, k, t("remove_from_cart")), a(`${A}-checkout-render-checkout-form`, k, t("begin_checkout")), a(`${A}-cart-add-item`, k, (({
                product: e
            }) => {
                t("add_to_cart")({
                    product: e
                })
            })), a(`${A}-product-list-render`, k, t("view_item_list")), a(`${A}-product-view-link`, k, t("select_content"))
        })(t)
    }

    function E() {
        window.ga4w || console.warn("Google Analytics for WooCommerce: Configuration and tracking data not found after the page was fully loaded. Make sure the `woocommerce-google-analytics-integration-data` script gets eventually loaded.")
    }(0, c.removeAction)(`${A}-checkout-submit`, k), (0, c.removeAction)(`${A}-checkout-set-email-address`, k), (0, c.removeAction)(`${A}-checkout-set-phone-number`, k), (0, c.removeAction)(`${A}-checkout-set-billing-address`, k), (0, c.removeAction)(`${A}-cart-set-item-quantity`, k), (0, c.removeAction)(`${A}-product-search`, k), (0, c.removeAction)(`${A}-store-notice-create`, k), window.ga4w ? $() : (document.addEventListener("ga4w:ready", $), "complete" === document.readyState ? E() : window.addEventListener("load", E))
})();