import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav } from "./navBar.js";
import { footer } from "./footer.js";
import { request } from "../myFunctions.js";


const edit = (car) => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="edit-listing">
    <div class="container">

        <form id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value=${car.price}>

            <hr>
            <input id=${car._id} @click=${editListing} type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
${footer()}
`


export async function showEditPage(ctx) {
    const data = await request(`http://localhost:3030/data/cars/${ctx.params.id}`,"get");
    render(edit(data),document.getElementById("site-content"));
};



async function editListing(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("edit-form")).entries()];
    const brand = form[0][1];
    const model = form[1][1];
    const description = form[2][1];
    const year = form[3][1];
    const image = form[4][1];
    const price = form[5][1];

    if (brand && model && description && Number(year)>0 && image && Number(price)>0) {
        const id = e.target.id;
        const body = {
            brand:brand,
            model:model,
            description:description,
            year:year,
            imageUrl:image,
            price:price
        }
        try{
        const data = await request(`http://localhost:3030/data/cars/${id}`,"put",body,sessionStorage.getItem("token"));
        console.log(data);
        page(`/details/${id}`);
        }catch(err){
            return;
        }
    } else {
        alert("All Fields Are Mandatory and Year and Price Must be a positive number!");
    }
}
