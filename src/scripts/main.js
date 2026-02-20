// TAILLE DE l'écran
function printSizes() {
  console.log("Viewport :", window.innerWidth, "x", window.innerHeight);
  console.log("Écran :", screen.width, "x", screen.height);
}

// printSizes();

window.addEventListener("resize", printSizes);


// Gradient NAV: Detecte la fin du scroll
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".nav-hamburger");
    const modal = document.querySelector(".nav-modal");

    hamburger.addEventListener("click", () => {
        modal.classList.add("active");
    });

    modal.addEventListener("click", (e) => {
        // Ferme si on clique en dehors du contenu
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // Ferme le modal quand on clique un lien
    document.querySelectorAll(".nav-modal-content a").forEach(link => {
        link.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    });
});

// OUVERTURE DES MODALS

function openIntroModal(event) {
    event.preventDefault();
    const modal = document.getElementById("intro-modal");
    modal.classList.add("active");
}

function openServicesModal(event) {
    event.preventDefault();
    const modal = document.getElementById("services-modal");
    modal.classList.add("active");
}

function openContactModal(event) {
    event.preventDefault();
    const modal = document.getElementById("contact-modal");
    modal.classList.add("active");
}

function openReferencesModal(event) {
    event.preventDefault();
    const modal = document.getElementById("references-modal");
    modal.classList.add("active");
}

function openCallModal(event) {
    event.preventDefault();
    const modal = document.getElementById("call-modal");
    modal.classList.add("active");
}

function openScheduleCallModal() {
    const modal = document.getElementById("schedule-call-modal");
    modal.classList.add("active");
}

function openCallbackModal() {
    const modal = document.getElementById("callback-modal");
    modal.classList.add("active");
}

// FERMETURE DES MODALS

function closeAllModals() {
    const overlays = document.querySelectorAll(".modal-overlay.active");
    overlays.forEach((overlay) => overlay.classList.remove("active"));
}

// Close when clicking the X
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close")) {
        closeAllModals();
    }
});

// Close when clicking outside the modal
document.addEventListener("click", (e) => {
    const overlays = document.querySelectorAll(".modal-overlay");
    overlays.forEach((overlay) => {
        if (e.target === overlay) {
            closeAllModals();
        }
    });
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeAllModals();
    }
});


// GESTION DU FORMULAIRE

const contactForm = document.getElementById("contact-form");
const contactSuccess = document.getElementById("contact-success");
const contactError = document.getElementById("contact-error");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset messages
        contactSuccess.style.display = "none";
        contactError.style.display = "none";

        const emailInput = document.getElementById("contact-email");
        const phoneInput = document.getElementById("contact-phone");

        const email = emailInput.value.trim();
        const phoneRaw = phoneInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // On retire les espaces
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        // Email invalide
        if (!emailRegex.test(email)) {
            contactError.textContent = "Please enter a valid email address.";
            contactError.style.display = "block";
            emailInput.focus();
            return;
        }

        // Téléphone rempli mais invalide
        if (phoneRaw !== "" && !/^\d{10}$/.test(phoneDigits)) {
            contactError.textContent = "Phone number must contain exactly 10 digits.";
            contactError.style.display = "block";
            phoneInput.focus();
            return;
        }

        // Tout est valide → envoi Formspree
        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            contactForm.reset();
            contactSuccess.style.display = "block";
        } else {
            contactForm.reset();
            contactError.style.display = "block";
        }
    });
}
// GESTION DE L'APPEL DE RETOUR

const callbackForm = document.getElementById("callback-form");
const callbackSuccess = document.getElementById("callback-success");
const callbackError = document.getElementById("callback-error");

if (callbackForm) {
    callbackForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset messages
        callbackSuccess.style.display = "none";
        callbackError.style.display = "none";

        const phoneInput = document.getElementById("callback-phone");

        const phoneRaw = phoneInput.value.trim();

        // On retire les espaces du numéro
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        // Validation téléphone (obligatoire ou optionnel selon ton besoin)
        if (!/^\d{10}$/.test(phoneDigits)) {
            callbackError.textContent = "Phone number must contain exactly 10 digits (spaces allowed).";
            callbackError.style.display = "block";
            phoneInput.focus();
            return;
        }

        const formData = new FormData(callbackForm);
        const action = callbackForm.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            callbackForm.reset();
            callbackSuccess.style.display = "block";
        } else {
            callbackForm.reset();
            callbackError.style.display = "block";
        }

    });
}