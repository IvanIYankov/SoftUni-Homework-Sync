import { render, html } from "./node_modules/lit-html/lit-html.js";
import { createListing } from "./data.js"

function createListingTemlate(onSubmit) {
    return html`
    <section @submit=${onSubmit}id="create-listing">
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
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
    `;
}

export async function createListingPage(ctx) {
    ctx.render(createListingTemlate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        let brand = formData.get("brand");
        let model = formData.get("model");
        let description = formData.get("description");
        let year = Number(formData.get("year"));
        let imageUrl = formData.get("imageUrl");
        let price = Number(formData.get("price"));

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert("All fields are required!");
        }

        if (year < 0 || price < 0) {
            return alert("Price and year must be positive numbers!");
        }



        await createListing({ brand, model, description, year, imageUrl, price });
        ctx.page.redirect("/allListings")
    }
}