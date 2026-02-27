import {
  printSizes,
  closeAllModals,
  initModalListeners
} from './all.js';

import { includeHTML } from './includes.js';

import { initIntroductionForm, initContactForm, initCallbackForm } from './form.js';

import { initAnchors } from "./anchors.js";

// Chargement du menu
includeHTML("#sticky-nav", "nav.html");

// Chargement des modals
includeHTML("#intro-modal", "/modals/intro-modal.html");

includeHTML("#intro-modal", "/modals/intro-modal.html", () => {
    initIntroductionForm();
});

includeHTML("#services-modal", "/modals/service-modal.html");
includeHTML("#contact-modal", "/modals/contact-modal.html", () => {
    initContactForm();
});
includeHTML("#references-modal", "/modals/references-modal.html");
includeHTML("#call-modal", "/modals/call-modal.html");
includeHTML("#schedule-call-modal", "/modals/schedule-call-modal.html");
includeHTML("#callback-modal", "/modals/callback-modal.html", () => {
    initCallbackForm();
});

// Chargement du modal mobile
includeHTML("#nav-modal", "/modals/nav-modal.html");

// Gestion du menu mobile
includeHTML("#sticky-nav", "nav.html", () => {
    console.log("nav.html chargé");

    const hamburger = document.querySelector(".nav-hamburger");
    const modal = document.querySelector(".nav-modal");

    if (!hamburger) {
        console.error("Hamburger introuvable !");
        return;
    }

    hamburger.addEventListener("click", () => {
        modal.classList.add("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    modal.querySelectorAll(".nav-modal-content a").forEach(link => {
        link.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    });
});

// Chargement des ancres
// Chargement des ancres
includeHTML(".pc-anchor", "ancre.html", () => {
    initAnchors();
});

// Listener global pour ouvrir les modals
document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-modal]");
    if (!btn) return;

    e.preventDefault();

    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("active");
    }
});

// Resize + fermeture des modals
window.addEventListener("resize", printSizes);
initModalListeners();