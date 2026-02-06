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

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

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
        }
    });
}