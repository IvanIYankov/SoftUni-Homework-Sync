import { render, html } from "./node_modules/lit-html/lit-html.js";
import { getCarsByYear } from "./data.js";

function searchTemplate(onSearch) {
    return html`
    <section id="search-cars">
        <h1>Filter by year</h1>
    
        <div class="container">
            <input id="yearInput" type="text" name="search" placeholder="Enter desired production year">
            <button class="button-list" @click=${onSearch}>Search</button>
        </div>
    
        <h2>Results:</h2>
        <div class="listings">
    
            <!-- Display all records -->
    
    
            <!-- Display if there are no matches -->
    
        </div>
    </section>`
}
function carPreviewTemplate(car) {
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

export async function search(ctx) {

    async function onSearch() {
        let yearInput = document.getElementById("yearInput");
        let year = Number(yearInput.value);
        console.log(year)
        let cars = await getCarsByYear(year);
        populate(cars);
        ctx.page.redirect("/search/year=" + year);
        return cars;

    }

    async function populate(cars) {
        let carsDiv = document.getElementsByClassName("listings")[0];
        if (cars.length > 0) {
            ctx.render(cars.map(carPreviewTemplate), carsDiv);

        } else {
            ctx.render(html`<p class="no-cars"> No results.</p>`, carsDiv)
        }
    }


    ctx.render(searchTemplate(onSearch));

}