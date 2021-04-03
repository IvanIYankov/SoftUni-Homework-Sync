import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js'
import { loginPage, registerPage } from './views/auth.js';
import { catalogPage } from "./views/catalog.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from './views/home.js';
import { profilePage } from './views/profile.js';


const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();

// 
// 

page('/', decorateContext, guestUsersOnly, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);

page.start();

function guestUsersOnly(ctx, next) {
	const token = sessionStorage.getItem('authToken');
	if (token !== null) {
		return ctx.page.redirect('/catalog');
	}
	next()
}

function decorateContext(ctx, next) {
	ctx.render = (content) => render(content, main);
	ctx.setUserNav = setUserNav;
	next();
}

function setUserNav() {
	const email = sessionStorage.getItem('email');
	if (email) {
		document.getElementById('user-greeting').textContent = `Welcome ${email}`
		document.querySelector('.user').style.display = '';
		document.querySelector('.guest').style.display = 'none';
	} else {
		document.querySelector('.user').style.display = 'none';
		document.querySelector('.guest').style.display = '';
	}
}

function logout() {
	apiLogout();
	setUserNav();
	page.redirect('/');
}


