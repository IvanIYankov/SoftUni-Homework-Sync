import { render, html } from "./node_modules/lit-html/lit-html.js";
import { getListingById } from "./data.js"
import { editCar } from "./data.js"

function editTemplate(car, onSubmit) {
    return html`<section @submit=${onSubmit} id="edit-listing">
    <div class="container">

        <form id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>
    `
}

export async function editPage(ctx) {
    let carId = ctx.params.id;
    let car = await getListingById(carId)
    ctx.render(editTemplate(car, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        let brand = formData.get("brand");
        let model = formData.get("model");
        let description = formData.get("description");
        let year = formData.get("year");
        let imageUrl = formData.get("imageUrl");
        let price = formData.get("price");
        let updatedCar = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        }

        if (!brand || !model || !description || !year || !imageUrl || !price) {
            return alert("All fields are required!");
        }

        if (year < 0 || price < 0) {
            return alert("Price and year must be positive numbers!");
        }

        await editCar(carId, updatedCar);
        ctx.page.redirect("/carDetails/" + carId)
    }
}