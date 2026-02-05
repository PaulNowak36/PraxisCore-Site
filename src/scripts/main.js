function openIntroModal(event) {
    event.preventDefault();
    const modal = document.getElementById("intro-modal");
    modal.classList.add("active");
}

function closeIntroModal() {
    const modal = document.getElementById("intro-modal");
    modal.classList.remove("active");
}

// Close when clicking the X
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-close")) {
        closeIntroModal();
    }
});

// Close when clicking outside the modal
document.addEventListener("click", (e) => {
    const modal = document.getElementById("intro-modal");
    if (e.target === modal) {
        closeIntroModal();
    }
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeIntroModal();
    }
});