import { render, html } from "./node_modules/lit-html/lit-html.js";
import { getMyListings } from "./data.js"

function myListingsTemplate(data) {
    return html`
            <section id="my-listings">
                <h1>My car listings</h1>
                <div class="listings">
            
                    ${data.length > 0 ? data.map(listing) :
                html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
            
                    <!-- Display all records -->
            
                    <!-- Display if there are no records -->
            
                </div>
            </section>
    `
}

export async function myListingsPage(ctx) {
    let data = await getMyListings();
    ctx.render(myListingsTemplate(data))
}

function listing(car) {
    return html`<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/carDetails/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`
}