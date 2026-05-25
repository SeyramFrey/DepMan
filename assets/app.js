/* NerveOps — Documentation Portal
   Vanilla JS, no dependencies. Works offline via file://. */
(function () {
  'use strict';

  /* ---------- Data ---------- */

  // Home cards: a tour of what the app does.
  var HOME = [
    { icon: '📁', en: ['Local projects + GitHub', 'Scan your code, connect GitHub, commit and push — no terminal.'], fr: ['Projets locaux + GitHub', 'Scannez votre code, connectez GitHub, commitez et poussez — sans terminal.'] },
    { icon: '🖥️', en: ['VPS over SSH', 'Add servers, see live CPU/RAM/disk, inspect packages, services and ports.'], fr: ['VPS via SSH', 'Ajoutez des serveurs, voyez CPU/RAM/disque en direct, inspectez paquets, services et ports.'] },
    { icon: '🐳', en: ['Docker & Compose', 'List, start, stop, restart and read logs of containers and Compose services.'], fr: ['Docker & Compose', 'Listez, démarrez, arrêtez, redémarrez et lisez les journaux des conteneurs et services Compose.'] },
    { icon: '🚀', en: ['Deployments', 'Wire GitHub → VPS pipelines with Docker Compose, previewed before any action.'], fr: ['Déploiements', 'Reliez des pipelines GitHub → VPS avec Docker Compose, prévisualisés avant toute action.'] },
    { icon: '🌐', en: ['Domains & HTTPS', 'Map a domain to a deployment and get automatic HTTPS via managed Caddy.'], fr: ['Domaines & HTTPS', 'Associez un domaine à un déploiement et obtenez le HTTPS automatique via Caddy géré.'] },
    { icon: '🛡️', en: ['Security & backups', 'Audit, firewall, SSH hardening, plus safe app-managed backups and restore.'], fr: ['Sécurité & sauvegardes', 'Audit, pare-feu, durcissement SSH, plus sauvegardes/restaurations sûres gérées par l\'app.'] }
  ];

  // Feature cards: every screen.
  var FEATURES = [
    { icon: '📊', route: '/overview', en: ['Overview', 'Dashboard: counts, recent activity and runtime info.'], fr: ['Vue d\'ensemble', 'Tableau de bord : compteurs, activité récente et infos d\'exécution.'] },
    { icon: '📁', route: '/local-projects', en: ['Local Projects', 'Scan and manage the code projects on your computer.'], fr: ['Projets locaux', 'Scanner et gérer les projets de code sur votre ordinateur.'] },
    { icon: '🐙', route: '/github', en: ['GitHub Connector', 'Connect your account, sync repos, link them to projects.'], fr: ['Connecteur GitHub', 'Connecter votre compte, synchroniser les dépôts, les lier aux projets.'] },
    { icon: '✍️', route: '/publish/:id', en: ['Commit & Publish', 'Commit, generate Docker files and push — guided, no terminal.'], fr: ['Commit & Publication', 'Commiter, générer les fichiers Docker et pousser — guidé, sans terminal.'] },
    { icon: '🖥️', route: '/vps', en: ['VPS Servers', 'Add servers; live metrics, packages, services, ports, logins.'], fr: ['Serveurs VPS', 'Ajouter des serveurs ; métriques en direct, paquets, services, ports, connexions.'] },
    { icon: '🔑', route: '/ssh-keys', en: ['SSH Keys', 'Generate or import keys and install them on servers.'], fr: ['Clés SSH', 'Générer ou importer des clés et les installer sur les serveurs.'] },
    { icon: '🐳', route: '/docker', en: ['Docker', 'Containers, images, volumes, networks and Compose over SSH.'], fr: ['Docker', 'Conteneurs, images, volumes, réseaux et Compose via SSH.'] },
    { icon: '🚀', route: '/deployments', en: ['Deployments', 'GitHub → VPS pipelines, previewed and audited.'], fr: ['Déploiements', 'Pipelines GitHub → VPS, prévisualisés et tracés.'] },
    { icon: '🌐', route: '/domains', en: ['Domains & Routing', 'Map domains, manage Caddy proxy, automatic HTTPS.'], fr: ['Domaines & Routage', 'Associer des domaines, gérer le proxy Caddy, HTTPS automatique.'] },
    { icon: '💾', route: '/backups', en: ['Backups & Restore', 'Back up app-managed data; restore safely or over live.'], fr: ['Sauvegardes & Restauration', 'Sauvegarder les données gérées ; restaurer en sûreté ou sur le live.'] },
    { icon: '🛡️', route: '/security', en: ['Security', 'Audit, firewall (UFW), SSH hardening, fail2ban.'], fr: ['Sécurité', 'Audit, pare-feu (UFW), durcissement SSH, fail2ban.'] },
    { icon: '📈', route: '/monitoring', en: ['Monitoring & Alerts', 'Health snapshots, alert rules and safe maintenance.'], fr: ['Surveillance & Alertes', 'Instantanés de santé, règles d\'alerte et maintenance sûre.'] },
    { icon: '🔎', route: '/incidents', en: ['Incident Center', 'Diagnose why a server or app is broken; sanitized reports.'], fr: ['Centre d\'incidents', 'Diagnostiquer pourquoi un serveur ou une app casse ; rapports assainis.'] },
    { icon: '🕒', route: '/releases', en: ['Releases & Rollback', 'Track deployed versions and roll back to a stable one.'], fr: ['Versions & Retour arrière', 'Suivre les versions déployées et revenir à une version stable.'] },
    { icon: '🔐', route: '/environments', en: ['Environments & Secrets', 'Variables per environment; secrets in the OS keyring, masked.'], fr: ['Environnements & Secrets', 'Variables par environnement ; secrets dans le trousseau, masqués.'] },
    { icon: '🧩', route: '/templates', en: ['Templates & Blueprints', 'Generate Dockerfile/Compose/Caddy, previewed before writing.'], fr: ['Modèles & Blueprints', 'Générer Dockerfile/Compose/Caddy, prévisualisés avant écriture.'] },
    { icon: '⏰', route: '/automation', en: ['Automation', 'Schedule read-only health checks (only while the app is open).'], fr: ['Automatisation', 'Planifier des vérifications de santé en lecture seule (app ouverte).'] },
    { icon: '🩺', route: '/diagnostics', en: ['Diagnostics & Support', 'Setup checklist, app info and a sanitized support bundle.'], fr: ['Diagnostics & Support', 'Liste de mise en route, infos app et bundle de support assaini.'] },
    { icon: '⚙️', route: '/settings', en: ['Settings', 'Projects folder, VS Code path, theme.'], fr: ['Paramètres', 'Dossier de projets, chemin VS Code, thème.'] }
  ];

  // Glossary terms (searchable). Curated, bilingual.
  var GLOSSARY = [
    { en: ['VPS (Virtual Private Server)', 'A rented Linux computer in a data center that you control remotely.'], fr: ['VPS (serveur privé virtuel)', 'Un ordinateur Linux loué dans un centre de données que vous contrôlez à distance.'] },
    { en: ['SSH (Secure Shell)', 'The secure way to connect to and run commands on a remote server. NerveOps uses keys only.'], fr: ['SSH (Secure Shell)', 'La façon sécurisée de se connecter et d\'exécuter des commandes sur un serveur distant. NerveOps n\'utilise que des clés.'] },
    { en: ['SSH key pair', 'Two matching keys: the private one stays on your computer, the public one goes on the server.'], fr: ['Paire de clés SSH', 'Deux clés correspondantes : la privée reste sur votre ordinateur, la publique va sur le serveur.'] },
    { en: ['Docker', 'Technology that packages and runs apps in isolated containers.'], fr: ['Docker', 'Technologie qui empaquette et exécute des apps dans des conteneurs isolés.'] },
    { en: ['Container', 'A lightweight, isolated package that runs your app with everything it needs.'], fr: ['Conteneur', 'Un paquet léger et isolé qui exécute votre app avec tout ce dont elle a besoin.'] },
    { en: ['Docker Compose', 'Defines and runs multi-container apps from a docker-compose.yml file.'], fr: ['Docker Compose', 'Définit et exécute des apps multi-conteneurs depuis un fichier docker-compose.yml.'] },
    { en: ['Image (Docker)', 'A built, ready-to-run template for a container.'], fr: ['Image (Docker)', 'Un modèle construit, prêt à exécuter, pour un conteneur.'] },
    { en: ['Volume (Docker)', 'Persistent storage so a container\'s data survives restarts.'], fr: ['Volume (Docker)', 'Stockage persistant pour que les données d\'un conteneur survivent aux redémarrages.'] },
    { en: ['Caddy', 'A reverse proxy web server that routes your domain to your app and handles HTTPS automatically.'], fr: ['Caddy', 'Un serveur reverse proxy qui route votre domaine vers votre app et gère le HTTPS automatiquement.'] },
    { en: ['Reverse proxy', 'A server in front of your app that forwards visitor requests to the right container and handles HTTPS.'], fr: ['Reverse proxy', 'Un serveur placé devant votre app qui transmet les requêtes au bon conteneur et gère le HTTPS.'] },
    { en: ['DNS (Domain Name System)', 'The internet\'s phone book: translates a domain name into an IP address.'], fr: ['DNS (Domain Name System)', 'L\'annuaire d\'internet : traduit un nom de domaine en adresse IP.'] },
    { en: ['A record', 'A DNS entry mapping a domain to a server\'s IP address.'], fr: ['Enregistrement A', 'Une entrée DNS associant un domaine à l\'adresse IP d\'un serveur.'] },
    { en: ['HTTP / HTTPS', 'The protocols browsers use to load sites; HTTPS is the encrypted, secure version.'], fr: ['HTTP / HTTPS', 'Les protocoles que les navigateurs utilisent pour charger les sites ; HTTPS est la version chiffrée.'] },
    { en: ['TLS / SSL certificate', 'The credential that enables HTTPS. Caddy obtains and renews it for you.'], fr: ['Certificat TLS / SSL', 'Le justificatif qui active le HTTPS. Caddy l\'obtient et le renouvelle pour vous.'] },
    { en: ['IP address', 'The numeric address of a computer on a network (e.g. 203.0.113.10).'], fr: ['Adresse IP', 'L\'adresse numérique d\'un ordinateur sur un réseau (ex. 203.0.113.10).'] },
    { en: ['Port', 'A numbered "door" for a kind of traffic (22 SSH, 80 HTTP, 443 HTTPS).'], fr: ['Port', 'Une « porte » numérotée pour un type de trafic (22 SSH, 80 HTTP, 443 HTTPS).'] },
    { en: ['Firewall / UFW', 'A filter controlling which ports are open. UFW is a common Linux firewall.'], fr: ['Pare-feu / UFW', 'Un filtre contrôlant quels ports sont ouverts. UFW est un pare-feu Linux courant.'] },
    { en: ['Hardening', 'Making a server more secure by reducing what an attacker can reach.'], fr: ['Durcissement', 'Rendre un serveur plus sûr en réduisant ce qu\'un attaquant peut atteindre.'] },
    { en: ['fail2ban', 'A tool that bans IP addresses after repeated failed logins.'], fr: ['fail2ban', 'Un outil qui bannit des adresses IP après des échecs de connexion répétés.'] },
    { en: ['Root', 'The all-powerful administrator user on a Linux server.'], fr: ['Root', 'L\'utilisateur administrateur tout-puissant d\'un serveur Linux.'] },
    { en: ['Git', 'The version-control system that tracks your code changes over time.'], fr: ['Git', 'Le système de contrôle de version qui suit vos modifications de code dans le temps.'] },
    { en: ['GitHub', 'A website that hosts Git repositories online.'], fr: ['GitHub', 'Un site web qui héberge des dépôts Git en ligne.'] },
    { en: ['Repository (repo)', 'A project\'s home on GitHub: its code, history and branches.'], fr: ['Dépôt (repo)', 'La maison d\'un projet sur GitHub : son code, son historique et ses branches.'] },
    { en: ['Branch', 'A parallel line of development in Git (e.g. main).'], fr: ['Branche', 'Une ligne de développement parallèle dans Git (ex. main).'] },
    { en: ['Commit', 'A saved snapshot of code changes, with a message.'], fr: ['Commit', 'Un instantané enregistré des modifications de code, avec un message.'] },
    { en: ['Push / Pull / Fetch', 'Git actions to upload, download+merge, or download remote changes.'], fr: ['Push / Pull / Fetch', 'Actions Git pour envoyer, télécharger+fusionner, ou télécharger les changements distants.'] },
    { en: ['PAT (Personal Access Token)', 'An app-specific password for GitHub that you paste into NerveOps.'], fr: ['PAT (jeton d\'accès personnel)', 'Un mot de passe propre à l\'app pour GitHub, collé dans NerveOps.'] },
    { en: ['Slug', 'A short, URL-friendly name (lowercase, digits, dashes) identifying a deployment.'], fr: ['Slug', 'Un nom court adapté aux URL (minuscules, chiffres, tirets) identifiant un déploiement.'] },
    { en: ['Deployment', 'Putting your app onto a server so it runs. A target is a saved pipeline; a run is one execution.'], fr: ['Déploiement', 'Mettre votre app sur un serveur. Une cible est un pipeline enregistré ; une exécution en est une.'] },
    { en: ['Rollback', 'Returning your live app to a previous, known-good version.'], fr: ['Retour arrière', 'Ramener votre app live à une version précédente, connue comme bonne.'] },
    { en: ['Release', 'A captured snapshot of a deployed version; mark one stable to roll back to.'], fr: ['Version (release)', 'Un instantané d\'une version déployée ; marquez-en une stable pour y revenir.'] },
    { en: ['Environment variable', 'A KEY=value setting your app reads at runtime. Mark Secret to store in the keyring.'], fr: ['Variable d\'environnement', 'Un réglage KEY=value lu à l\'exécution. Cochez Secret pour le stocker dans le trousseau.'] },
    { en: ['.env file', 'A file of KEY=value settings; may contain secrets, so it is handled carefully.'], fr: ['Fichier .env', 'Un fichier de réglages KEY=value ; peut contenir des secrets, donc traité avec soin.'] },
    { en: ['Keyring / Credential Manager', 'The OS\'s secure vault for secrets. NerveOps stores secrets here, never in its database.'], fr: ['Trousseau / Gestionnaire d\'identifiants', 'Le coffre sécurisé du système pour les secrets. NerveOps y stocke les secrets, jamais dans sa base.'] },
    { en: ['Redaction', 'Automatically hiding secret values in logs, reports and previews.'], fr: ['Occultation', 'Masquer automatiquement les valeurs secrètes dans journaux, rapports et aperçus.'] },
    { en: ['Audit log', 'An append-only list of every important action you take (no secrets).'], fr: ['Journal d\'audit', 'Une liste en ajout seul de chaque action importante (sans secrets).'] },
    { en: ['Health score', 'A 0–100 summary of a server\'s health (Monitoring) or security posture (Security).'], fr: ['Score de santé', 'Un résumé 0–100 de la santé (Surveillance) ou de la posture de sécurité (Sécurité).'] },
    { en: ['Snapshot (monitoring)', 'A point-in-time health measurement of a server.'], fr: ['Instantané (surveillance)', 'Une mesure de santé d\'un serveur à un instant donné.'] },
    { en: ['Incident', 'A detected problem with a severity, suspected cause, findings and recommendations.'], fr: ['Incident', 'Un problème détecté avec gravité, cause suspectée, findings et recommandations.'] },
    { en: ['Diagnostic', 'An automated check that inspects a server/app to find a problem\'s likely cause.'], fr: ['Diagnostic', 'Une vérification automatisée qui inspecte un serveur/app pour trouver la cause d\'un problème.'] },
    { en: ['Backup target / manifest', 'A saved definition of what to back up; the manifest records what an archive contains.'], fr: ['Cible de sauvegarde / manifeste', 'Une définition de ce qu\'il faut sauvegarder ; le manifeste enregistre le contenu d\'une archive.'] },
    { en: ['Support bundle', 'A sanitized export (no secrets) describing your setup — safe to share for help.'], fr: ['Bundle de support', 'Un export assaini (sans secrets) décrivant votre configuration — sûr à partager.'] },
    { en: ['Template / Blueprint', 'A starting point generating deployment files for a common app type, previewed first.'], fr: ['Modèle / Blueprint', 'Un point de départ générant des fichiers de déploiement pour un type d\'app courant, prévisualisé.'] },
    { en: ['Tauri', 'The framework that turns the web UI + Rust backend into a desktop app. "Inside Tauri" = the real desktop app.'], fr: ['Tauri', 'Le framework qui transforme l\'UI web + backend Rust en app de bureau. « Inside Tauri » = la vraie app de bureau.'] },
    { en: ['Angular', 'The framework used to build the interface (the screens you click).'], fr: ['Angular', 'Le framework utilisé pour construire l\'interface (les écrans que vous cliquez).'] },
    { en: ['Rust / Cargo', 'Rust is the backend language; Cargo is its build and test tool.'], fr: ['Rust / Cargo', 'Rust est le langage du backend ; Cargo son outil de build et de test.'] },
    { en: ['SQLite', 'A tiny database stored as a single file on your computer (vps-manager.db).'], fr: ['SQLite', 'Une base de données minuscule stockée en un seul fichier (vps-manager.db).'] },
    { en: ['Migration (database)', 'An ordered script that updates the database structure; additive and forward-only.'], fr: ['Migration (base de données)', 'Un script ordonné qui met à jour la structure de la base ; additif et vers l\'avant.'] }
  ];

  /* ---------- Helpers ---------- */
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Render dynamic content ---------- */
  function bilingual(item, kind) {
    // kind: 'card' or 'feature'
    var route = item.route ? '<span class="route">' + esc(item.route) + '</span>' : '';
    return '' +
      '<div class="card' + (item.route ? ' clickable' : '') + '">' +
        '<div class="ico">' + item.icon + '</div>' +
        '<div class="lang en"><h3>' + esc(item.en[0]) + '</h3><p>' + esc(item.en[1]) + '</p>' + route + '</div>' +
        '<div class="lang fr"><h3>' + esc(item.fr[0]) + '</h3><p>' + esc(item.fr[1]) + '</p>' + route + '</div>' +
      '</div>';
  }

  function renderCards() {
    var home = $('#homeCards');
    if (home) HOME.forEach(function (c) { home.appendChild(el(bilingual(c))); });
    var feat = $('#featureCards');
    if (feat) FEATURES.forEach(function (c) { feat.appendChild(el(bilingual(c))); });
  }

  function renderGlossary() {
    var list = $('#glossaryList');
    if (!list) return;
    GLOSSARY.slice().sort(function (a, b) { return a.en[0].localeCompare(b.en[0]); }).forEach(function (g) {
      var node = el('' +
        '<div class="glossary-term" data-search="' +
          esc((g.en[0] + ' ' + g.en[1] + ' ' + g.fr[0] + ' ' + g.fr[1]).toLowerCase()) + '">' +
          '<dt class="lang en">' + esc(g.en[0]) + '</dt><dd class="lang en">' + esc(g.en[1]) + '</dd>' +
          '<dt class="lang fr">' + esc(g.fr[0]) + '</dt><dd class="lang fr">' + esc(g.fr[1]) + '</dd>' +
        '</div>');
      list.appendChild(node);
    });
  }

  /* ---------- Navigation ---------- */
  var SECTIONS = ['home', 'install', 'user-guide', 'features', 'deployment', 'security', 'troubleshooting', 'glossary'];

  function showSection(id) {
    if (SECTIONS.indexOf(id) === -1) id = 'home';
    $all('.section').forEach(function (s) { s.classList.toggle('active', s.id === id); });
    $all('.nav-link[data-nav]').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === id); });
    document.body.classList.remove('nav-open');
    window.scrollTo(0, 0);
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  function wireNav() {
    $all('[data-nav]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        showSection(a.getAttribute('data-nav'));
      });
    });
    window.addEventListener('hashchange', function () {
      showSection((location.hash || '#home').slice(1));
    });
  }

  /* ---------- Language ---------- */
  function setLang(lang) {
    if (lang !== 'fr') lang = 'en';
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-fr', lang === 'fr');
    document.documentElement.lang = lang;
    $all('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    var search = $('#search');
    if (search) search.placeholder = lang === 'fr' ? 'Rechercher dans la doc…' : 'Search the docs…';
    try { localStorage.setItem('vpsm-docs-lang', lang); } catch (e) {}
  }

  function wireLang() {
    $all('.lang-toggle button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    var saved = 'en';
    try { saved = localStorage.getItem('vpsm-docs-lang') || 'en'; } catch (e) {}
    setLang(saved);
  }

  /* ---------- Search ---------- */
  function wireSearch() {
    var input = $('#search');
    if (!input) return;
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();

      // Filter glossary terms
      var terms = $all('.glossary-term');
      var visible = 0;
      terms.forEach(function (t) {
        var match = !q || t.getAttribute('data-search').indexOf(q) !== -1;
        t.classList.toggle('hidden', !match);
        if (match) visible++;
      });
      var empty = $('#glossaryEmpty');
      if (empty) empty.style.display = (terms.length && visible === 0) ? 'block' : 'none';

      // If the user is searching, jump to glossary for results
      if (q && $('#glossary') && !$('#glossary').classList.contains('active')) {
        showSection('glossary');
      }
    });
    // Pressing Escape clears
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { input.value = ''; input.dispatchEvent(new Event('input')); input.blur(); }
    });
  }

  /* ---------- Mobile menu ---------- */
  function wireMenu() {
    var btn = $('#menuBtn'), backdrop = $('#backdrop');
    if (btn) btn.addEventListener('click', function () { document.body.classList.toggle('nav-open'); });
    if (backdrop) backdrop.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  }

  /* ---------- Theme (light / dark) ---------- */
  function wireTheme() {
    var btn = $('#themeBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var light = document.documentElement.classList.toggle('theme-light');
      try { localStorage.setItem('nerveops-docs-theme', light ? 'light' : 'dark'); } catch (e) {}
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderCards();
    renderGlossary();
    wireNav();
    wireLang();
    wireSearch();
    wireMenu();
    wireTheme();
    showSection((location.hash || '#home').slice(1));
  });
})();
