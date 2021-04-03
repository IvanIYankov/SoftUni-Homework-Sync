import { render, html } from "./node_modules/lit-html/lit-html.js";
import { login } from "./data.js"


function loginTemplate(onSubmit) {
    return html`
    <section @submit=${onSubmit} id="login">
        <div class="container">
            <form id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>
    
                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">
    
                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
    `
}

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault()
        let form = e.target;
        let formData = new FormData(form);
        let username = formData.get("username");
        let password = formData.get("password");
        await login(username, password);
        ctx.page.redirect("/")
    }

}

