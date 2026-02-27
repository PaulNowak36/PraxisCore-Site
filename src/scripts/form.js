// form.js

export function initIntroductionForm() {
    const introForm = document.getElementById("intro-contact-form");
    if (!introForm) return;

    const introSuccess = document.getElementById("intro-success");
    const introErrorGlobal = document.getElementById("intro-error");

    const dateInput = document.getElementById("intro-date");
    const timeInput = document.getElementById("intro-time");

    const nameInput = document.getElementById("intro-name");
    const emailInput = document.getElementById("intro-email");
    const phoneInput = document.getElementById("intro-phone");
    const submitBtn = introForm.querySelector(".modal-submit");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Empêcher les dates passées
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // --- Gestion des erreurs par champ ---
    function clearFieldErrors() {
        introForm.querySelectorAll(".modal-error.field").forEach(el => el.remove());
    }

    function showFieldError(input, message) {
        const error = document.createElement("p");
        error.className = "modal-error field";
        error.style.display = "block";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
    }

    // --- Activation / désactivation du bouton ---
    function updateSubmitState() {
        const nameFilled = nameInput.value.trim().length > 0;
        const emailFilled = emailInput.value.trim().length > 0;
        submitBtn.disabled = !(nameFilled && emailFilled);
    }

    nameInput.addEventListener("input", updateSubmitState);
    emailInput.addEventListener("input", updateSubmitState);

    updateSubmitState();

    // --- Soumission du formulaire ---
    introForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        introSuccess.style.display = "none";
        introErrorGlobal.style.display = "none";
        clearFieldErrors();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        // Validation nom
        if (name.length < 2) {
            showFieldError(nameInput, "Please enter your full name.");
            nameInput.focus();
            return;
        }

        // Validation email
        if (!emailRegex.test(email)) {
            showFieldError(emailInput, "Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // Validation téléphone
        if (phoneRaw !== "" && !/^\d{10}$/.test(phoneDigits)) {
            showFieldError(phoneInput, "Phone number must contain exactly 10 digits.");
            phoneInput.focus();
            return;
        }

        // Validation date + heure
        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];

        if (dateInput && dateInput.value) {
            const selectedDate = dateInput.value;

            if (selectedDate < todayDate) {
                showFieldError(dateInput, "Please choose a valid date (today or later).");
                dateInput.focus();
                return;
            }

            if (selectedDate === todayDate && timeInput && timeInput.value) {
                const [h, m] = timeInput.value.split(":").map(Number);
                const selectedTime = h * 60 + m;
                const nowTime = today.getHours() * 60 + today.getMinutes();

                if (selectedTime < nowTime) {
                    showFieldError(timeInput, "Please choose a valid time (later today).");
                    timeInput.focus();
                    return;
                }
            }
        }

        if (timeInput && timeInput.value && (!dateInput || !dateInput.value)) {
            showFieldError(dateInput, "Please choose a date before selecting a time.");
            dateInput.focus();
            return;
        }

        // Envoi Formspree
        const formData = new FormData(introForm);
        const action = introForm.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" },
            redirect: "manual"
        });

        if (response.ok || response.status === 0) {
            introForm.reset();
            introSuccess.style.display = "block";
        } else {
            introForm.reset();
            introErrorGlobal.style.display = "block";
        }

        updateSubmitState();
    });
}

export function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const contactSuccess = document.getElementById("contact-success");
    const contactErrorGlobal = document.getElementById("contact-error");

    const emailInput = document.getElementById("contact-email");
    const submitBtn = contactForm.querySelector(".modal-submit");

    // --- Gestion des erreurs par champ ---
    function clearFieldErrors() {
        contactForm.querySelectorAll(".modal-error.field").forEach(el => el.remove());
    }

    function showFieldError(input, message) {
        const error = document.createElement("p");
        error.className = "modal-error field";
        error.style.display = "block";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
    }

     // --- Activation / désactivation du bouton ---
    function updateSubmitState() {
        const emailFilled = emailInput.value.trim().length > 0;

        submitBtn.disabled = !emailFilled;
    }

    emailInput.addEventListener("input", updateSubmitState);

    updateSubmitState(); // état initial

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        contactSuccess.style.display = "none";
        contactErrorGlobal.style.display = "none";
        clearFieldErrors();
        
        const phoneInput = document.getElementById("contact-phone");

        const email = emailInput.value.trim();
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showFieldError(emailInput, "Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        if (phoneRaw !== "" && !/^\d{10}$/.test(phoneDigits)) {
            showFieldError(phoneInput, "Phone number must contain exactly 10 digits.");
            phoneInput.focus();
            return;
        }

        const formData = new FormData(contactForm);
        const action = contactForm.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" },
            redirect: "manual"
        });

        if (response.ok || response.status === 0) {
            contactForm.reset();
            contactSuccess.style.display = "block";
        } else {
            contactForm.reset();
            contactErrorGlobal.style.display = "block";
        }

        updateSubmitState(); // réapplique l'état après reset
    });
}

export function initCallbackForm() {
    const callbackForm = document.getElementById("callback-form");
    if (!callbackForm) return;

    const callbackSuccess = document.getElementById("callback-success");
    const callbackErrorGlobal = document.getElementById("callback-error");

    const phoneInput = document.getElementById("callback-phone");
    const dateInput = document.getElementById("callback-date");
    const timeInput = document.getElementById("callback-time");

    const submitBtn = callbackForm.querySelector(".modal-submit");

    // Empêcher les dates passées
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
    }

    // --- Gestion des erreurs par champ ---
    function clearFieldErrors() {
        callbackForm.querySelectorAll(".modal-error.field").forEach(el => el.remove());
    }

    function showFieldError(input, message) {
        const error = document.createElement("p");
        error.className = "modal-error field";
        error.style.display = "block";
        error.textContent = message;
        input.insertAdjacentElement("afterend", error);
    }

     // --- Activation / désactivation du bouton ---
    function updateSubmitState() {
        const phoneFilled = phoneInput.value.trim().length > 0;

        submitBtn.disabled = !phoneFilled;
    }

    phoneInput.addEventListener("input", updateSubmitState);

    updateSubmitState(); // état initial

    callbackForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        callbackSuccess.style.display = "none";
        callbackErrorGlobal.style.display = "none";
        clearFieldErrors();

        
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        if (!/^\d{10}$/.test(phoneDigits)) {
            showFieldError(phoneInput, "Phone number must contain exactly 10 digits (spaces allowed).");
            phoneInput.focus();
            return;
        }

        // Validation date + heure
        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];

        if (dateInput && dateInput.value) {
            const selectedDate = dateInput.value;

            if (selectedDate < todayDate) {
                showFieldError(dateInput, "Please choose a valid date (today or later).");
                dateInput.focus();
                return;
            }

            if (selectedDate === todayDate && timeInput && timeInput.value) {
                const [h, m] = timeInput.value.split(":").map(Number);
                const selectedTime = h * 60 + m;
                const nowTime = today.getHours() * 60 + today.getMinutes();

                if (selectedTime < nowTime) {
                    showFieldError(timeInput, "Please choose a valid time (later today).");
                    timeInput.focus();
                    return;
                }
            }
        }

        if (timeInput && timeInput.value && (!dateInput || !dateInput.value)) {
            showFieldError(dateInput, "Please choose a date before selecting a time.");
            dateInput.focus();
            return;
        }

        const formData = new FormData(callbackForm);
        const action = callbackForm.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" },
            redirect: "manual"
        });

        if (response.ok) {
            callbackForm.reset();
            callbackSuccess.style.display = "block";
        } else {
            callbackForm.reset();
            callbackErrorGlobal.style.display = "block";
        }

        updateSubmitState(); // réapplique l'état après reset
    });
}