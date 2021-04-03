import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav, allListings } from "./navBar.js";
import { footer } from "./footer.js";

export const home = () => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="main">
    <div id="welcome-container">
        <h1>Welcome To Car Tube</h1>
        <img class="hero" src="/images/car-png.webp" alt="carIntro">
        <h2>To see all the listings click the link below:</h2>
        <div>
            <a @click=${allListings} href="#" class="button">Listings</a>
        </div>
    </div>
</section>
${footer()}
`

export function showHomePage(){
    render(home(),document.getElementById("site-content"));
}
