// includes.js

function includeHTML(selector, file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(err => console.error("Erreur includeHTML:", err));
}

// Appels centralisés
includeHTML("#sticky-nav", "nav.html");
