import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav } from "./navBar.js";
import { footer } from "./footer.js";
import {request} from "../myFunctions.js";

const allListings = (cars) => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
    ${cars.length>0 ? carListings(cars) : noCars()}
    </div>
</section>
${footer()}
`;


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

const noCars = ()=> html`<p class="no-cars">No cars in database.</p>`; 

async function showDetails(e) {
    e.preventDefault();
    page(`/details/${e.target.id}`);
}

export async function showAllListingsByYearPage(){
    const data = Array.from(await request("http://localhost:3030/data/cars","get"));
    data.sort((a,b)=> a.year-b.year);
    render(allListings(data), document.getElementById("site-content"));
}