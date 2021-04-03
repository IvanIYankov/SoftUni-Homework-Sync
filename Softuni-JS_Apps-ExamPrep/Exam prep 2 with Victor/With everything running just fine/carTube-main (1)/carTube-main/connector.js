import { render, html } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs"

import { loginPage } from "./login.js"
import { registerPage } from "./register.js"
import { homePage } from "./home.js"
import { logout as apiLogout } from "./data.js"
import { allListings } from "./allListings.js"
import { createListingPage } from "./createListing.js"
import { carDetails } from "./details.js"
import { editPage } from "./editPage.js"
import { myListingsPage } from "./myListings.js"
import { search } from "./search.js"

let main = document.getElementById("site-content");
document.getElementById("logoutBtn").addEventListener("click", logout)
setUserNav();

page("/", loadData, homePage);
page("/login", loadData, loginPage)
page("/register", loadData, registerPage)
page("/allListings", loadData, allListings)
page("/createListingPage", loadData, createListingPage);
page("/carDetails/:id", loadData, carDetails);
page("/editPage/:id", loadData, editPage);
page("/myListings", loadData, myListingsPage);
page("/search", loadData, search);



page.start();

function loadData(ctx, next) {
    ctx.render = function (view) {
        render(view, main)
    }
    ctx.setUserNav = setUserNav;
    setUserNav()
    next()
}

function setUserNav() {
    let logged = document.getElementById("profile");
    let guest = document.getElementById("guest");
    let greeting = logged.querySelector("a");

    let userId = sessionStorage.getItem("userId");
    if (userId != null) {
        logged.style.display = "";
        greeting.textContent = `Welcome ${sessionStorage.getItem("username")}`
        guest.style.display = "none"
    } else {
        logged.style.display = "none";
        guest.style.display = ""
    }
}

function logout() {
    apiLogout();
    setUserNav();
    page.redirect("/")
}