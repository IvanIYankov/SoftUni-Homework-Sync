import { render, html } from "./node_modules/lit-html/lit-html.js";
import { register } from "./data.js"


function registerTemplate(onSubmit) {
    return html`
    <section @submit=${onSubmit} id="register">
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
    
                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="#">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
    `
}

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(e) {
        e.preventDefault()
        let form = e.target;
        let formData = new FormData(form);
        let username = formData.get("username").trim();
        let password = formData.get("password").trim();
        let repPassword = formData.get("repeatPass").trim();

        if (username.length < 1 || password.length < 1) {
            return alert("All fields are required!")
        }

        if (password !== repPassword) {
            return alert("Passwords dont match")
        }

        await register(username, password);
        ctx.page.redirect("/")
    }
}

