import {marked} from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
window.addEventListener("load", async (event) => {
    await gestionDuMarkedDown();
});

async function gestionDuMarkedDown(){
    /** @type {HTMLDivElement} */
    const container = document.querySelector(".markedDownContainer");
    const content = await (await fetch("../README.md", {headers: {"content-type": "text/plain"}})).text();
    container.innerHTML = marked.parse(content);

    /** @type {HTMLPreElement[]} */
    const allPre = container.querySelectorAll("pre");
    const svgText = await (await fetch("../assets/copy-solid.svg", {headers: {"content-type": "text/plain"}})).text();
    allPre.forEach(async el => {
        const btn = document.createElement("button");
        btn.classList.add("copyBtn");
        btn.title = "Click to Copy in clickboard";
        btn.innerHTML = svgText;
        btn.type = "button";
        btn.onclick = async () => {
            btn.style.cursor = "progress";
            
            /** @type {String | null} */
            const code = el.querySelector("code")?.innerText.trim();
            
            await navigator.clipboard.writeText(code).then(() => {
                alert(`Code: "${code}" copied successfully.`);
            }).catch(err => {
                alert(`Error: ${err}`);
            });

            btn.style.cursor = "pointer";
            
        };

        el.appendChild(btn);

        Prism.highlightAll();
    });
};
