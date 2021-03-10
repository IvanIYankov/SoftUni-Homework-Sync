import { e } from './dom.js';

async function getMovies(){
    const response = await fetch('/data/movies');
}

let main;
let section;

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

export async function showHome() {
    main.innerHTML = '';
    main.appendChild(section);
}