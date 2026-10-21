# Belle-Rive — Préparation technique : dépendances

Version 1 — 21 octobre 2026. Proposition documentaire, aucune installation ou compilation. Complément de [BR-C4 validé](BELLE_RIVE_BR_C4_VALIDATION.md), sans nouveau jalon déduit.

## Choix recommandés et état des versions

Les versions ci-dessous sont des **candidats observés dans les sources officielles consultées ce passage**, pas un verrouillage installé, un audit de vulnérabilité ou une preuve de compatibilité. Les pages `latest` sont mouvantes : les liens de tags précis identifient les candidats. Recontrôler disponibilité, support et correctifs avant toute réalisation autorisée ; consigner toute substitution et sa raison.

| Rôle | Candidat proposé | Source primaire et motif |
|---|---|---|
| Runtime | Node.js 24.22.1, branche 24 | Version indiquée dans les [sommes officielles de la branche 24](https://nodejs.org/download/release/latest-v24.x/SHASUMS256.txt) ; choisir une branche LTS selon le [calendrier officiel](https://nodejs.org/en/about/previous-releases), sans migrer le runtime global de la machine |
| Serveur HTTP | Fastify 5.12.7 | [Tag officiel](https://github.com/fastify/fastify/releases/tag/v5.12.7) ; routage, validation et journalisation dans un même serveur ; consulter la [politique de support](https://fastify.dev/docs/latest/Reference/LTS/) avant gel |
| Gabarits serveur | EJS 6.0.1 | [Tag officiel](https://github.com/mde/ejs/releases/tag/v6.0.1) ; générer le HTML à partir de gabarits maîtrisés. Appel direct au moteur proposé, sans ajouter de plugin de vue |
| Pilote SQLite | better-sqlite3 13.0.3 | [Manifeste du tag](https://raw.githubusercontent.com/WiseLibs/better-sqlite3/v13.0.3/package.json) : Node >=22 déclaré, entrées Windows x64/arm64 ; cela ne prouve pas le chargement sur cette machine |
| Cookies | @fastify/cookie 11.1.3 | [Tag](https://github.com/fastify/fastify-cookie/releases/tag/v11.1.3) et [table de compatibilité](https://raw.githubusercontent.com/fastify/fastify-cookie/v11.1.3/README.md) : branche >=10 compatible Fastify 5 ; ne fournit pas à elle seule session ni autorisation |
| Typage/compilation | TypeScript 7.0.2, candidat | [Release officielle](https://github.com/microsoft/TypeScript/releases/tag/v7.0.2) ; contrat de compilation vers JavaScript à confirmer selon la distribution de cette version ; aucune commande ou compatibilité d’outillage supposée exécutée |
| Types complémentaires | Types Node, EJS et pilote si non fournis | Versions exactes à résoudre à partir des paquets retenus ; ne pas inventer un numéro ni compter les types comme dépendances d’exécution |
| Recette automatique | Outils natifs de test Node pour règles et HTTP ; outil navigateur à choisir avant tests UI | Aucun paquet de test ajouté maintenant ; la recette manuelle reste distincte |

Les packages natifs du pilote et leurs dépendances transitives constituent un risque d’installation Windows. Recommandation : vérifier l’architecture de la machine lors de la phase autorisée, utiliser un binaire fourni pour cette combinaison si disponible ; si compilation nécessaire, documenter le besoin et ne pas installer silencieusement de chaîne système. Aucun moteur SQLite séparé recommandé : relever la version embarquée réellement utilisée par le pilote avant recette.

## Contrats d’intégration proposés

- Compilation TypeScript stricte vers JavaScript avant lancement ; pas d’exécution implicite par un outil de développement en livraison. Arrêter le format de modules et les types avec la distribution retenue ; une incohérence de compilation est un blocage à résoudre avant recette.
- EJS ne reçoit que des objets de présentation explicitement construits. Texte éditorial échappé ; pas de gabarit, option moteur ou chemin transmis depuis une requête. Aucun HTML libre dans les quatre contenus. Le [moteur documente ses balises et l’échappement](https://ejs.co/).
- Formulaires plats encodés URL : lecture bornée du corps, décodage standard, liste fermée de champs, rejet des doublons et des structures imbriquées. Adaptateur Fastify dédié à spécifier dans le futur code ; pas de parseur de formulaires générique ni téléversement requis pour ce corpus.
- SQL paramétré, pas de concaténation des saisies ; transaction explicite ; petites lectures synchrones adaptées à quatre contenus comme hypothèse, sans promesse de performance.
- CSS et SVG locaux ; pas de CDN, police distante, outil d’analytics, moteur de recherche distant, ORM, application monopage ou gestionnaire de tâches ajouté.

## Gel reproductible futur

Avant premier code produit : confirmer le candidat Node disponible/supporté, les métadonnées de tous les paquets et leurs licences, les types et le format de modules. Lors d’une installation autorisée seulement : verrouiller versions exactes et dépendances transitives, conserver registre utilisé, intégrités, version du gestionnaire, architecture et notice. Vérifier compilation, chargement natif et démarrage dans une copie de travail avant toute conclusion de compatibilité.

Une alerte de vulnérabilité ne sera pas masquée par un changement silencieux. Remplacer le candidat si nécessaire, conserver l’alerte et la justification, rejouer les contrôles affectés. Une absence d’alerte automatique ne vaut pas sécurité globale. Aucun manifeste exécutable, fichier de verrouillage ou paquet téléchargé dans ce passage.

## Points restant à lever

Disponibilité exacte du socle sur la machine, distribution/commande TypeScript, types complémentaires, versions embarquées et revue des avis de sécurité : ouverts et assignés à la préparation précédant la réalisation autorisée. Le choix de familles et les versions candidates sont documentés ; le lot n’est pas présenté comme immédiatement exécutable.
