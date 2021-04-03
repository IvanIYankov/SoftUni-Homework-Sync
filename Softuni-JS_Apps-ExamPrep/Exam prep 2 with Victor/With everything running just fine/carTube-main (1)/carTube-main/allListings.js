import { render, html } from "./node_modules/lit-html/lit-html.js";
import { getAllListings } from "/data.js"

function allListingsTemplate(data) {
    return html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            ${data.map(listingTemplate)}
            <!-- Display all records -->
    
    
            <!-- Display if there are no records -->
            <p class="no-cars">No cars in database.</p>
        </div>
    </section>
    `
}

function listingTemplate(item) {
    return html`<div class="listing">
    <div class="preview">
        <img src="${item.imageUrl}">
    </div>
    <h2>${item.brand} ${item.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${item.year}</h3>
            <h3>Price: ${item.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/carDetails/${item._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`
}
export async function allListings(ctx) {
    let data = await getAllListings();

    ctx.render(allListingsTemplate(data))
}