import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav, login } from "./navBar.js";
import { footer } from "./footer.js";
import { request } from "../myFunctions.js";




const create = () => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="create-listing">
    <div class="container">
        <form id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input @click=${createListing} type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
${footer()}
`

async function createListing(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("create-form")).entries()];
    const brand = form[0][1];
    const model = form[1][1];
    const description = form[2][1];
    const year = form[3][1];
    const image = form[4][1];
    const price = form[5][1];

    if (brand && model && description && year && image && price) {
        const body = {
            brand:brand,
            model:model,
            description:description,
            year:year,
            imageUrl:image,
            price:price
        }
        try{
        await request("http://localhost:3030/data/cars/","post",body,sessionStorage.getItem("token"));
        page("/AllListings");
        }catch(err){
            return;
        }
    } else {
        alert("All Fields Are Mandatory!");
    }
}




export function showCreateListingPage() {
    render(create(), document.getElementById("site-content"));
}