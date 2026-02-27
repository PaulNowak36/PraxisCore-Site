// form.js

export function initIntroductionForm() {
    const introForm = document.getElementById("intro-contact-form");
    if (!introForm) return;

    const introSuccess = document.getElementById("intro-success");
    const introError = document.getElementById("intro-error");

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

    // --- Activation / désactivation du bouton ---
    function updateSubmitState() {
        const nameFilled = nameInput.value.trim().length > 0;
        const emailFilled = emailInput.value.trim().length > 0;

        submitBtn.disabled = !(nameFilled && emailFilled);
    }

    nameInput.addEventListener("input", updateSubmitState);
    emailInput.addEventListener("input", updateSubmitState);

    updateSubmitState(); // état initial

    // --- Soumission du formulaire ---
    introForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        introSuccess.style.display = "none";
        introError.style.display = "none";

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        // Validation nom
        if (name.length < 2) {
            introError.textContent = "Please enter your full name.";
            introError.style.display = "block";
            nameInput.focus();
            return;
        }

        // Validation email
        if (!emailRegex.test(email)) {
            introError.textContent = "Please enter a valid email address.";
            introError.style.display = "block";
            emailInput.focus();
            return;
        }

        // Validation téléphone
        if (phoneRaw !== "" && !/^\d{10}$/.test(phoneDigits)) {
            introError.textContent = "Phone number must contain exactly 10 digits.";
            introError.style.display = "block";
            phoneInput.focus();
            return;
        }

        // Validation date + heure
        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];

        if (dateInput && dateInput.value) {
            const selectedDate = dateInput.value;

            if (selectedDate < todayDate) {
                introError.textContent = "Please choose a valid date (today or later).";
                introError.style.display = "block";
                dateInput.focus();
                return;
            }

            if (selectedDate === todayDate && timeInput && timeInput.value) {
                const [h, m] = timeInput.value.split(":").map(Number);
                const selectedTime = h * 60 + m;
                const nowTime = today.getHours() * 60 + today.getMinutes();

                if (selectedTime < nowTime) {
                    introError.textContent = "Please choose a valid time (later today).";
                    introError.style.display = "block";
                    timeInput.focus();
                    return;
                }
            }
        }

        if (timeInput && timeInput.value && (!dateInput || !dateInput.value)) {
            introError.textContent = "Please choose a date before selecting a time.";
            introError.style.display = "block";
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
            introError.style.display = "block";
        }

        updateSubmitState(); // réapplique l'état après reset
    });
}

export function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    const contactSuccess = document.getElementById("contact-success");
    const contactError = document.getElementById("contact-error");

    const emailInput = document.getElementById("contact-email");
    const submitBtn = contactForm.querySelector(".modal-submit");

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
        contactError.style.display = "none";

        
        const phoneInput = document.getElementById("contact-phone");

        const email = emailInput.value.trim();
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            contactError.textContent = "Please enter a valid email address.";
            contactError.style.display = "block";
            emailInput.focus();
            return;
        }

        if (phoneRaw !== "" && !/^\d{10}$/.test(phoneDigits)) {
            contactError.textContent = "Phone number must contain exactly 10 digits.";
            contactError.style.display = "block";
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
            contactError.style.display = "block";
        }

        updateSubmitState(); // réapplique l'état après reset
    });
}

export function initCallbackForm() {
    const callbackForm = document.getElementById("callback-form");
    if (!callbackForm) return;

    const callbackSuccess = document.getElementById("callback-success");
    const callbackError = document.getElementById("callback-error");

    const phoneInput = document.getElementById("callback-phone");
    const dateInput = document.getElementById("callback-date");
    const timeInput = document.getElementById("callback-time");

    const submitBtn = callbackForm.querySelector(".modal-submit");

    // Empêcher les dates passées
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.min = today;
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
        callbackError.style.display = "none";

        
        const phoneRaw = phoneInput.value.trim();
        const phoneDigits = phoneRaw.replace(/\s+/g, "");

        if (!/^\d{10}$/.test(phoneDigits)) {
            callbackError.textContent = "Phone number must contain exactly 10 digits (spaces allowed).";
            callbackError.style.display = "block";
            phoneInput.focus();
            return;
        }

        // Validation date + heure
        const today = new Date();
        const todayDate = today.toISOString().split("T")[0];

        if (dateInput && dateInput.value) {
            const selectedDate = dateInput.value;

            if (selectedDate < todayDate) {
                callbackError.textContent = "Please choose a valid date (today or later).";
                callbackError.style.display = "block";
                dateInput.focus();
                return;
            }

            if (selectedDate === todayDate && timeInput && timeInput.value) {
                const [h, m] = timeInput.value.split(":").map(Number);
                const selectedTime = h * 60 + m;
                const nowTime = today.getHours() * 60 + today.getMinutes();

                if (selectedTime < nowTime) {
                    callbackError.textContent = "Please choose a valid time (later today).";
                    callbackError.style.display = "block";
                    timeInput.focus();
                    return;
                }
            }
        }

        if (timeInput && timeInput.value && (!dateInput || !dateInput.value)) {
            callbackError.textContent = "Please choose a date before selecting a time.";
            callbackError.style.display = "block";
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
            callbackError.style.display = "block";
        }

        updateSubmitState(); // réapplique l'état après reset
    });
}