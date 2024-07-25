document.documentElement.classList.add("js-on");
const navBtn = document.querySelector(".js-nav-btn"),
    nav = document.querySelector(".js-navigation"),
    noFocus = Array.from(nav.querySelectorAll(".nav-no-focus")),
    openNav = () => {
        document.body.classList.add("nav-is-open"), navBtn.setAttribute("aria-expanded", "true"), removeFocusAbility(), document.addEventListener("keydown", trapNavFocus)
    },
    closeNav = () => {
        document.body.classList.remove("nav-is-open"), navBtn.setAttribute("aria-expanded", "false"), document.removeEventListener("keydown", trapNavFocus), addFocusAbility(), navBtn.focus()
    },
    isNavOpen = () => document.body.classList.contains("nav-is-open"),
    removeFocusAbility = () => noFocus.forEach((e => e.setAttribute("tabindex", "-1"))),
    addFocusAbility = () => noFocus.forEach((e => e.setAttribute("tabindex", "0"))),
    getNavFocusables = () => {
        const e = Array.from(nav.querySelectorAll('a:not([tabindex="-1"]), button:not(:disabled):not([tabindex="-1"]), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled):not([tabindex="-1"]), details:not(:disabled):not([tabindex="-1"]), summary:not(:disabled):not([tabindex="-1"])'));
        if (0 !== e.length) return e
    },
    trapNavFocus = e => {
        const t = getNavFocusables(),
            n = t[0],
            o = t[t.length - 1];
        document.activeElement !== o || "Tab" !== e.key || e.shiftKey || (e.preventDefault(), n.focus()), document.activeElement === n && "Tab" === e.key && e.shiftKey && (e.preventDefault(), o.focus())
    };
navBtn.addEventListener("click", (() => {
    isNavOpen() ? closeNav() : (document.body.classList.add("nav-is-open"), navBtn.setAttribute("aria-expanded", "true"), removeFocusAbility(), document.addEventListener("keydown", trapNavFocus))
})), document.addEventListener("keydown", (e => {
    isNavOpen() && "Escape" === e.key && closeNav()
}));
const navBtnLogged = document.querySelector(".js-nav-btn--logged"),
    navLogged = document.querySelector(".js-navigation-logged"),
    noFocusLogged = Array.from(navLogged.querySelectorAll(".nav-no-focus")),
    openLoggedNav = () => {
        document.body.classList.add("nav-logged-is-open"), navBtnLogged.setAttribute("aria-expanded", "true"), removeLoggedFocusAbility(), document.addEventListener("keydown", trapLoggedNavFocus)
    },
    closeLoggedNav = () => {
        document.body.classList.remove("nav-logged-is-open"), navBtnLogged.setAttribute("aria-expanded", "false"), document.removeEventListener("keydown", trapLoggedNavFocus), addLoggedFocusAbility(), navBtnLogged.focus()
    },
    isLoggedNavOpen = () => document.body.classList.contains("nav-logged-is-open"),
    removeLoggedFocusAbility = () => noFocusLogged.forEach((e => e.setAttribute("tabindex", "-1"))),
    addLoggedFocusAbility = () => noFocusLogged.forEach((e => e.setAttribute("tabindex", "0"))),
    getLoggedNavFocusables = () => {
        const e = Array.from(navLogged.querySelectorAll('a:not([tabindex="-1"]), button:not(:disabled):not([tabindex="-1"]), input:not(:disabled):not([tabindex="-1"]), select:not(:disabled):not([tabindex="-1"]), textarea:not(:disabled):not([tabindex="-1"]), details:not(:disabled):not([tabindex="-1"]), summary:not(:disabled):not([tabindex="-1"])'));
        if (0 !== e.length) return e
    },
    trapLoggedNavFocus = e => {
        const t = getLoggedNavFocusables(),
            n = t[0],
            o = t[t.length - 1];
        document.activeElement !== o || "Tab" !== e.key || e.shiftKey || (e.preventDefault(), n.focus()), document.activeElement === n && "Tab" === e.key && e.shiftKey && (e.preventDefault(), o.focus())
    };
navBtnLogged.addEventListener("click", (() => {
    isLoggedNavOpen() ? closeLoggedNav() : (document.body.classList.add("nav-logged-is-open"), navBtnLogged.setAttribute("aria-expanded", "true"), removeLoggedFocusAbility(), document.addEventListener("keydown", trapLoggedNavFocus))
})), document.addEventListener("keydown", (e => {
    isLoggedNavOpen() && "Escape" === e.key && closeLoggedNav()
}));