import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav } from "./navBar.js";
import { footer } from "./footer.js";
import { request } from "../myFunctions.js";


const details = (car) => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${sessionStorage.getItem("owner")===car._ownerId ? editAndDelete(car) : ""}
    </div>
</section>
${footer()}
`

const editAndDelete = (car) => html`
<div class="listings-buttons" id=${car._id}>
    <a @click=${edit} href="#" class="button-list">Edit</a>
    <a @click=${deleteListing} href="#" class="button-list">Delete</a>
</div>
`
export async function listingDetails(ctx){
    const data = await request(`http://localhost:3030/data/cars/${ctx.params.id}`,"get");
    render(details(data),document.getElementById("site-content"));
} 

async function deleteListing(e){
    e.preventDefault();
    const id = e.target.parentElement.id;
    try{
        await request(`http://localhost:3030/data/cars/${id}`,"delete",'',sessionStorage.getItem("token"));
        page("/AllListings");
    }catch (err){
        console.log(err);
    }
}

function edit(e){
    e.preventDefault();
    const id = e.target.parentElement.id;
    page(`/edit/${id}`);
}