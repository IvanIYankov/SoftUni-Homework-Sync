import page from "../node_modules/page/page.mjs";
import { showHomePage } from "./home.js";
import { showAllListingsPage } from "./allListings.js";
import { listingDetails } from "./details.js";
import { showAllListingsByYearPage } from "./byYear.js";
import { showRegPage } from "./register.js";
import { showLoginPage } from "./login.js";
import { showCreateListingPage } from "./createListing.js";
import { showMyListingsPage } from "./myListings.js";
import { showEditPage } from "./edit.js";

page("/", showHomePage);
page("/AllListings", showAllListingsPage);
page("/details/:id", listingDetails);
page("/byYear", showAllListingsByYearPage);
page("/register", showRegPage)
page("/login", showLoginPage);
page("/createListing", showCreateListingPage);
page("/myListings", showMyListingsPage);
page("/edit/:id", showEditPage);
page.start();



//edit, delete
