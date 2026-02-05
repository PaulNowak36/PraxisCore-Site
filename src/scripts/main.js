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