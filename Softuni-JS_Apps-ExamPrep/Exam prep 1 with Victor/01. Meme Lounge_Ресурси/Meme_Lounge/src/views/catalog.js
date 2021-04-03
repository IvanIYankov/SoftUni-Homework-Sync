import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllListings } from '../api/data.js';
import { memeTemplate } from './common/meme.js';

const catalogTemplate = (memes) => html`
    <section id="meme-feed">
                <h1>All Memes</h1>
                <div id="memes">
                    
                    ${memes.length == 0 ? 
                html`<p class="no-memes">No memes in database.</p>` : 
                memes.map(memeTemplate)}
                    
                </div>
            </section>`;

export async function catalogPage(ctx) {
    const memes = await getAllListings();
    ctx.render(catalogTemplate(memes));
}