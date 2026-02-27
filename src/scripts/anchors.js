export function initAnchors() {
    const anchors = document.querySelectorAll(".pc-anchor");

    anchors.forEach(anchor => {
        const prev = anchor.dataset.prev || null;
        const next = anchor.dataset.next || null;

        const up = anchor.querySelector(".pc-anchor-up");
        const down = anchor.querySelector(".pc-anchor-down");

        if (prev) up.href = prev;
        if (next) down.href = next;

        // Smooth scroll premium
        [up, down].forEach(btn => {
            btn.addEventListener("click", (e) => {
                const target = btn.getAttribute("href");
                if (!target || target === "#") return;

                e.preventDefault();

                const el = document.querySelector(target);
                if (!el) return;

                const offset = getStickyOffset();
                const top = el.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });
            });
        });
    });
}

function getStickyOffset() {
    const nav = document.querySelector("#sticky-nav");
    if (!nav) return 0;
    return nav.offsetHeight + 20;
}