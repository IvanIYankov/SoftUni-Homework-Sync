import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav, register } from "./navBar.js";
import { footer } from "./footer.js";
import { request } from "../myFunctions.js";



const login = () => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post">
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input @click=${log} type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a @click=${register} href="#">Sign up</a>.
            </p>
        </div>
    </div>
</section>
${footer()}
`


export function showLoginPage() {
    render(login(), document.getElementById("site-content"));
};

async function log(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("login-form")).entries()];
    const username = form[0][1];
    const pass = form[1][1];

    if (username && pass) {
        try {
            const body = { username: username, password: pass };
            const data = await request("http://localhost:3030/users/login", "post", body);

            sessionStorage.setItem("token", data.accessToken);
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("owner", data._id);
            sessionStorage.setItem("logged", true);
            // sessionStorage.setItem("",data.)
            // sessionStorage.setItem("",data.)
            // sessionStorage.setItem("",data.)
            page("/AllListings");
        } catch (err) {
            return;
        }
    } else {
        alert("All Fields Are Mandatory!");
    }

}