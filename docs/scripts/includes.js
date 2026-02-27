export function includeHTML(selector, file, callback) {
    const elements = document.querySelectorAll(selector);

    if (!elements.length) {
        console.error("includeHTML: aucun élément trouvé pour", selector);
        return;
    }

    elements.forEach(el => {
        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error("Fichier introuvable : " + file);
                return res.text();
            })
            .then(html => {
                el.innerHTML = html;
                if (callback) callback(el);
            })
            .catch(err => console.error("Erreur includeHTML:", err));
    });
}



