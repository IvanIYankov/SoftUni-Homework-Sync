import { html } from '../../node_modules/lit-html/lit-html.js';

import { getListingById, updateListing } from '../api/data.js';
// import { notify } from "../notification.js";

const editTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${meme.description}></textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getListingById(memeId);
    ctx.render(editTemplate(meme, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const editedMeme = {
            title: formData.get('title').trim(),
            description: formData.get('description').trim(),
            imageUrl: formData.get('imageUrl').trim(),
        };

        if (Object.values(editedMeme).some(x => !x)) {
            return alert('All fields are required!');
        }

        await updateListing(memeId, editedMeme);
        event.target.reset();
        ctx.page.redirect('/details/' + memeId);
    }
}