// includes.js

function includeHTML(selector, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error("Erreur includeHTML:", err));
}

// Appels centralisés
includeHTML("#sticky-nav", "nav.html");

// Appels modals

includeHTML("#intro-modal", "/modals/intro-modal.html");
includeHTML("#services-modal", "/modals/service-modal.html");
includeHTML("#contact-modal", "/modals/contact-modal.html");
includeHTML("#references-modal", "/modals/references-modal.html");
includeHTML("#call-modal", "/modals/call-modal.html");
includeHTML("#schedule-call-modal", "/modals/schedule-call-modal.html");
includeHTML("#callback-modal", "/modals/callback-modal.html");

includeHTML("#nav-modal", "/modals/nav-modal.html");




