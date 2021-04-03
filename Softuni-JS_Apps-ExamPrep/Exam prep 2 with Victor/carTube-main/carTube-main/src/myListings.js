import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav } from "./navBar.js";
import { footer } from "./footer.js";
import {request} from "../myFunctions.js";


const myListings = (cars) => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
    ${cars.length>0 ? carListings(cars) : noCars()}
    </div>
</section>
${footer()}
`



export async function showMyListingsPage() {
    const data = await request(`http://localhost:3030/data/cars?where=_ownerId%3D%22${sessionStorage.getItem("owner")}%22&sortBy=_createdOn%20desc`)
    render(myListings(data), document.getElementById("site-content"));
}

async function showDetails(e) {
    e.preventDefault();
    page(`/details/${e.target.id}`);
}

const noCars = ()=> html`<p class="no-cars">You haven't listed any cars yet.</p>`; 

const carListings = (cars) => repeat(cars, car => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a @click=${showDetails} id=${car._id} href="#" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`)