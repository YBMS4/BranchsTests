import {marked} from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
window.addEventListener("load", async (event) => {
    await gestionDuMarkedDown();
});

async function gestionDuMarkedDown(){
    /** @type {HTMLDivElement} */
    const container = document.querySelector(".markedDownContainer");
    const content = await (await fetch("../README.md", {headers: {"content-type": "text/plain"}})).text();
    container.innerHTML = marked.parse(content);
};
