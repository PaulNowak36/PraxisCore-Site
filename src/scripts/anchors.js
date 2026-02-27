export function initAnchors() {
    const anchors = document.querySelectorAll(".pc-anchor");

    anchors.forEach(anchor => {
        const prev = anchor.dataset.prev || null;
        const next = anchor.dataset.next || null;

        const up = anchor.querySelector(".pc-anchor-up");
        const down = anchor.querySelector(".pc-anchor-down");

        if (prev) up.href = prev;
        if (next) down.href = next;

        [up, down].forEach(btn => {
            btn.addEventListener("click", (e) => {
                const target = btn.getAttribute("href");
                if (!target || target === "#") return;

                e.preventDefault();

                const el = document.querySelector(target);
                if (!el) return;

                const offset = getOffsetFor(target);
                const top = el.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });
            });
        });
    });
}

function getOffsetFor(target) {
    const nav = document.querySelector("#sticky-nav");
    const base = nav ? nav.offsetHeight + 20 : 0;

    // Offsets personnalisés par section
    const customOffsets = {
        "#container-expertise": base + 80,
        "#container11": base + 40,
        "#container06": base + 50,
        "#text31": base + 50
    };

    return customOffsets[target] || base;
}