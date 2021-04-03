import { html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import {request} from "../myFunctions.js";

export const guestNav = () => html`
<nav>
    <a @click=${home} class="active" href="#">Home</a>
    <a @click=${allListings} href="#">All Listings</a>
    <a @click=${byYear} href="#">By Year</a>

    <!-- Guest users -->
    <div id="guest">
        <a @click=${login} href="#">Login</a>
        <a @click=${register} href="#">Register</a>
    </div>
</nav>
`

export const userNav = ()=> html`
<nav>
    <a @click=${home} class="active" href="#">Home</a>
    <a @click=${allListings} href="#">All Listings</a>
    <a @click=${byYear} href="#">By Year</a>
    <!-- Logged users -->
    <div id="profile">
        <a @click=${welcome} >Welcome ${sessionStorage.getItem("username")}</a>
        <a @click=${myListings} href="#">My Listings</a>
        <a @click=${createListing} href="#">Create Listing</a>
        <a @click=${logout} href="#">Logout</a>
    </div>
</nav>
`
function welcome(e){
    e.preventDefault();
}

function home(e){
    e.preventDefault();
    page("/");
}

export function allListings(e){
    e.preventDefault();
    page("/AllListings");
}

function byYear(e){
    e.preventDefault();
    page("/byYear");
}

function myListings(e){
    e.preventDefault();
    page("/myListings");
}

function createListing(e){
    e.preventDefault();
    page("/createListing");
}

async function logout(e){
    e.preventDefault();
    try{
        await request("http://localhost:3030/users/logout", "get", "", sessionStorage.getItem("token"));
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("owner");
        sessionStorage.removeItem("logged");
        page("/");
    } catch(err){
        console.log(err);
    }

}

export function login(e){
    e.preventDefault();
    page("/login");
}

export function register(e){
    e.preventDefault();
    page("/register");
}

