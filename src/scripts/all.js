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


