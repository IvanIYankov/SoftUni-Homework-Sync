import { render, html } from "./node_modules/lit-html/lit-html.js";
import { getListingById } from "./data.js"
import { deleteCar } from "./data.js"

function listingDetailTemplate(car, isOwner, delCar) {
    return html`<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${car.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}</li>
        </ul>

        <p class="description-para">${car.description}</p>
        ${isOwner ? html` <div class="listings-buttons">
            <a href="/editPage/${car._id}" class="button-list">Edit</a>
            <a href="javascript:void(0)" @click=${delCar} class="button-list">Delete</a>
        </div>`: ""}

    </div>
</section>`
}

export async function carDetails(ctx) {
    let carId = ctx.params.id;
    let car = await getListingById(carId);

    let isOwner = sessionStorage.getItem("userId") == car._ownerId;
    ctx.render(listingDetailTemplate(car, isOwner, delCar))

    async function delCar() {
        let confirmed = confirm("are you sure?");
        if (confirmed) {
            await deleteCar(carId);
            ctx.page.redirect("/")
        }

    }
}