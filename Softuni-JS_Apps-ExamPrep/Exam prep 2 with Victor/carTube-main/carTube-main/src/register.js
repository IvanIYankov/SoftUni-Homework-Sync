import { html, render } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import page from "../node_modules/page/page.mjs";
import { guestNav, userNav, login } from "./navBar.js";
import { footer } from "./footer.js";
import { request } from "../myFunctions.js";

const register = () => html`
${sessionStorage.getItem("logged") ? userNav() : guestNav()}
<section id="register">
    <div class="container">
        <form id="register-form">
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr>

            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username" required>

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password" required>

            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass" required>
            <hr>

            <input @click=${reg} type="submit" class="registerbtn" value="Register">
        </form>
        <div class="signin">
            <p>Already have an account?
                <a @click=${login} href="#">Sign in</a>.
            </p>
        </div>
    </div>
</section>
${footer()}
`

async function reg(e) {
    e.preventDefault();
    const form = [...new FormData(document.getElementById("register-form")).entries()];
    const username = form[0][1];
    const pass = form[1][1];
    const repeatPass = form[2][1];

    if (username && pass && repeatPass) {
        if (pass === repeatPass) {
            try {
                const body = { username: username, password: pass };
                const data = await request("http://localhost:3030/users/register", "post", body);

                sessionStorage.setItem("token", data.accessToken);
                sessionStorage.setItem("username", data.username);
                sessionStorage.setItem("owner", data._id);
                sessionStorage.setItem("logged", true);
                // sessionStorage.setItem("",data.)
                // sessionStorage.setItem("",data.)
                // sessionStorage.setItem("",data.)
                page("/AllListings");
            } catch(err){
                return;
            }
        } else {
            alert("Passwords must match!");
        }
    } else {
        alert("All Fields Are Mandatory!");
    }
}

export function showRegPage() {
    render(register(), document.getElementById("site-content"));
}