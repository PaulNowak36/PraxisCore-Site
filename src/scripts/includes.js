// includes.js

export function includeHTML(selector, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error("Erreur includeHTML:", err));
}





