// TAILLE DE l'écran
export function printSizes() {
  console.log("Viewport :", window.innerWidth, "x", window.innerHeight);
  console.log("Écran :", screen.width, "x", screen.height);
}

// OUVERTURE DES MODALS

export function openIntroModal(event) {
    event.preventDefault();
    const modal = document.getElementById("intro-modal");
    modal.classList.add("active");
}

export function openServicesModal(event) {
    event.preventDefault();
    const modal = document.getElementById("services-modal");
    modal.classList.add("active");
}

export function openContactModal(event) {
    event.preventDefault();
    const modal = document.getElementById("contact-modal");
    modal.classList.add("active");
}

export function openReferencesModal(event) {
    event.preventDefault();
    const modal = document.getElementById("references-modal");
    modal.classList.add("active");
}

export function openCallModal(event) {
    event.preventDefault();
    const modal = document.getElementById("call-modal");
    modal.classList.add("active");
}

export function openScheduleCallModal() {
    const modal = document.getElementById("schedule-call-modal");
    modal.classList.add("active");
}

export function openCallbackModal() {
    const modal = document.getElementById("callback-modal");
    modal.classList.add("active");
}

// FERMETURE DES MODALS

export function closeAllModals() {
    const overlays = document.querySelectorAll(".modal-overlay.active");
    overlays.forEach((overlay) => overlay.classList.remove("active"));
}

export function initModalListeners() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close")) {
      closeAllModals();
    }
  });

  document.addEventListener("click", (e) => {
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}


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
            headers: { "Accept": "application/json" },
            redirect: "manual" // ← empêche la redirection Formspree

        });

        // Formspree renvoie status 0 quand la redirection est bloquée → succès
        if (response.ok || response.status === 0) {
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