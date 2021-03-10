import { setupHome, showHome } from './home.js'
import { setupDetails } from './details.js'
import { setupLogin, showLogin } from './login.js'
import { setupRegister, showRegister } from './register.js'
import { setupCreate, showCreate } from './create.js'
import { setupEdit } from './edit.js'

const main = document.querySelector('main');

const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate,
};

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNavigation();

showHome();

function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}

function setupNavigation() {
    document.querySelector('nav').addEventListener('click', (event) => {
        const view = links[event.target.id];
        if (typeof view == 'function') {
            view();
        }
    });
    document.getElementById('createLink').addEventListener('click', (event) =>{
        event.preventDefault();
        showCreate();
    });
}