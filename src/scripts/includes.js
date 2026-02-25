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
includeHTML("#intro-modal", "/modals/intro-modal.html");
includeHTML("#services-modal", "/modals/service-modal.html");
includeHTML("#contact-modal", "/modals/contact-modal.html");
includeHTML("#references-modal", "/modals/references-modal.html");
includeHTML("#call-modal", "/modals/call-modal.html");
