# PraxisCore Site

Site vitrine statique de **PraxisCore**, orienté présentation d'une offre de conseil/opérations en santé (plateformes hospitalières, gouvernance médicale, engineering opérationnel).

## Contexte du projet

Ce dépôt contient un site one-page avec :
- navigation ancrée,
- sections de présentation,
- modaux d'interaction (prise de contact, demande de meeting, rappel, etc.),
- déploiement GitHub Pages.

L'objectif est d'avoir un site rapide, lisible et facilement déployable, sans framework lourd.

## Technologies utilisées

- **HTML5** (structure des pages et modaux)
- **CSS3** (styles responsives desktop/mobile)
- **JavaScript ES Modules** (chargement dynamique des blocs HTML, gestion des modaux, validation formulaires)
- **Formspree** (soumission des formulaires côté front, sans backend applicatif dédié)
- **GitHub Pages + GitHub Actions** (publication)
- **Font Awesome** (icônes)

### Utilisation de Copilot

Une partie du code a été produite/accélérée avec **Copilot** (génération de structure, variantes de composants, et aides de rédaction JS/CSS), puis revue et adaptée manuellement au contexte du site.

## Arborescence utile

- `src/` : source publiée (index, styles, scripts, modaux, assets)
- `.github/workflows/deploy.yml` : pipeline de déploiement GitHub Pages
- `docs/` : copie statique historique

## Lancer le site en local (tests manuels)

Prérequis : Node.js installé.

### Option 1 — via npx

```bash
npx live-server src --port=5500 --open=/index.html
```

### Option 2 — installation globale

```bash
npm i -g live-server
live-server src --port=5500 --open=/index.html
```

Ensuite ouvrir :
- `http://127.0.0.1:5500`
- ou `http://localhost:5500`

## Fonctionnalités principales

- **Navigation sticky** avec ancres vers les sections clés
- **Chargement dynamique** de fragments HTML (`nav.html`, modaux, ancres)
- **Ouverture/fermeture de modaux** :
  - via boutons `data-modal`,
  - fermeture via bouton `×`, clic hors modal, touche `Escape`
- **Validation frontend des formulaires** :
  - champs obligatoires,
  - format email,
  - téléphone (10 chiffres, espaces tolérés),
  - cohérence date/heure (pas de date passée, heure future le jour même)
- **Téléchargement de document** (références PDF)
- **Liens d'appel direct** (téléphone, WhatsApp, Signal)

## Modaux disponibles

Le site charge et utilise les modaux suivants :

- `intro-modal` : **Request a Meeting**
- `services-modal` : **What we do**
- `contact-modal` : **Contact PraxisCore**
- `references-modal` : **Available References**
- `nav-modal` : menu mobile plein écran

## Version mobile

La version mobile est prévue via media queries (notamment sous `735px`) :

- les liens de navigation desktop sont masqués,
- un bouton **hamburger** apparaît,
- le menu s'ouvre dans un **modal mobile**,
- les sous-menus sont adaptés au format tactile (`details/summary`).

## Envoi d'e-mail : comment ça fonctionne

Le site n'envoie pas directement des e-mails via un serveur SMTP local.

Le flux est le suivant :
1. l'utilisateur remplit un formulaire (meeting/contact/callback),
2. JS valide les champs côté navigateur,
3. le formulaire est envoyé en `POST` vers l'endpoint Formspree :
   - `https://formspree.io/f/maqdwzpq`
4. selon la réponse, un message de succès/erreur est affiché dans le modal.

### Points d'attention

- Si l'endpoint Formspree change, mettre à jour l'attribut `action` des formulaires.
- Vérifier que l'adresse de réception est bien configurée côté Formspree.
- En local, tester chaque formulaire pour confirmer les retours utilisateur (success/error).

## Déploiement

Le site est publié via GitHub Actions (workflow `deploy.yml`) vers GitHub Pages.

À vérifier côté GitHub :
- **Settings → Pages → Source = GitHub Actions**.

---

