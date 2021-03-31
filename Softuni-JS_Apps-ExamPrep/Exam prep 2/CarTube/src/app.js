import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import * as api from './api/data.js'
import { getUserData } from './utility.js';
import { homePage } from './views/home.js';

// import { logout as apiLogout } from './api/data.js'
// import { catalogPage } from "./views/catalog.js";
// import { createPage } from "./views/create.js";
// import { detailsPage } from "./views/details.js";
// import { editPage } from "./views/edit.js";
// import { homePage } from "./views/home.js";
// import { loginPage } from "./views/login.js";
// import { registerPage } from "./views/register.js";
// import { profilePage } from "./views/profile.js";
// import { notify } from "./notification.js";

window.api = api;

const main = document.getElementById('site-content');
// document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

// 
// 

page('/', decorateContext, homePage);
// page('/login', decorateContext, loginPage);
// page('/register', decorateContext, registerPage);
// page('/catalog', decorateContext, catalogPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/create', decorateContext, createPage);
// page('/edit/:id', decorateContext, editPage);
// page('/profile', decorateContext, profilePage);

page.start();

// function guestUsersOnly(ctx, next) {
// 	const token = sessionStorage.getItem('authToken');
// 	if (token !== null) {
// 		return ctx.page.redirect('/catalog');
// 	}
// 	next()
// }

function decorateContext(ctx, next) {
	ctx.render = (content) => render(content, main);
	ctx.setUserNav = setUserNav;
    ctx.user = getUserData();
	next();
}

function setUserNav() {
	const user = getUserData()
	if (user != null) {
        document.getElementById('profile').style.display = '';
		document.getElementById('guest').style.display = 'none';
		document.getElementById('user-greeting').textContent = `Welcome, ${user.username}`
	} else {
		document.getElementById('profile').style.display = 'none';
		document.getElementById('guest').style.display = '';
	}
}

// async function logout() {
// 	await apiLogout();
// 	setUserNav();
// 	page.redirect('/');
// }
