# Belle-Rive — Finition D-02 : jeu exact et revue des sources

21 octobre 2026 — V1. Versions directes proposées, non installées. Ni manifeste npm exécutable, ni résolution transitive, ni audit automatique exécuté.

## Jeu direct documenté

| Rôle | Version exacte proposée | Source primaire |
|---|---|---|
| Runtime | Node.js 24.22.1 | [Sommes branche 24](https://nodejs.org/download/release/latest-v24.x/SHASUMS256.txt), source de la préparation ; disponibilité à rafraîchir avant installation |
| HTTP | fastify 5.12.7 | [Tag](https://github.com/fastify/fastify/releases/tag/v5.12.7) |
| Rendu | ejs 6.0.1 | [Manifeste du tag](https://raw.githubusercontent.com/mde/ejs/v6.0.1/package.json) |
| Stockage | better-sqlite3 13.0.3 | [Manifeste](https://raw.githubusercontent.com/WiseLibs/better-sqlite3/v13.0.3/package.json), [registre](https://registry.npmjs.org/better-sqlite3/latest) |
| Cookies | @fastify/cookie 11.1.3 | [Tag](https://github.com/fastify/fastify-cookie/releases/tag/v11.1.3) |
| Compilation | typescript 7.0.2 | [Registre éditeur](https://registry.npmjs.org/typescript/latest), binaire tsc documenté |
| Types serveur | @types/node 24.19.0 | [Liste de versions](https://www.npmjs.com/package/%40types/node?activeTab=versions) |
| Types rendu | @types/ejs 3.1.5 | [Liste de versions](https://www.npmjs.com/package/%40types/ejs?activeTab=versions) |
| Types stockage | @types/better-sqlite3 9.6.0 | [Page du paquet](https://www.npmjs.com/package/%40types/better-sqlite3?activeTab=code) |
| Recette navigateur | @playwright/test 1.64.1 | [Versions du paquet Microsoft](https://www.npmjs.com/package/%40playwright/test?activeTab=versions) |
| Analyse automatisée d’accessibilité | @axe-core/playwright 4.14.0 | [Versions du paquet Deque](https://www.npmjs.com/package/%40axe-core/playwright?activeTab=versions) |

Versions sans plage proposées pour les dépendances directes ; les familles déjà acceptées restent inchangées. Playwright et axe sont de l’outillage futur de recette, pas des ressources du portail ni des tests réalisés. Les navigateurs fournis par Playwright ne valent pas automatiquement l’Edge stable, le Firefox utilisateur ou le couple NVDA/Firefox du protocole accepté : distinguer chaque moteur et version exécutés.

Le gestionnaire proposé est npm fourni avec la distribution Node finalement retenue ; son numéro exact, les dépendances transitives, leurs licences et intégrités relèvent du verrouillage après installation autorisée T-01. Aucun numéro inventé pour ces éléments. Les différences de versions de types sont consignées dans la [fiche compilation](BELLE_RIVE_FINITIONS_COMPILATION_V1.md).

## Revue limitée des avis, exécutée sur documents

Consultation du 21 octobre 2026, aucun scan du logiciel absent. L’[index officiel Fastify](https://github.com/fastify/fastify/security/advisories) présente notamment les dix avis ci-dessous. Leur plage a été lue ; la conclusion sur 5.12.7 est une comparaison de versions, pas un test d’exploitation ou une certification.

| Avis officiel | Plage affectée affichée | Position du candidat 5.12.7 |
|---|---|---|
| [389g-gv7q-r4x8](https://github.com/fastify/fastify/security/advisories/GHSA-389g-gv7q-r4x8) | >=5.12.2, <5.12.6 | Hors plage |
| [4mh8-r7rc-xpvc](https://github.com/fastify/fastify/security/advisories/GHSA-4mh8-r7rc-xpvc) | <5.12.5 | Hors plage |
| [9q9j-q6p8-xq58](https://github.com/fastify/fastify/security/advisories/GHSA-9q9j-q6p8-xq58) | <5.12.2 | Hors plage |
| [hwr6-493r-vm6h](https://github.com/fastify/fastify/security/advisories/GHSA-hwr6-493r-vm6h) | <5.12.2 | Hors plage |
| [p68q-wchp-6fh7](https://github.com/fastify/fastify/security/advisories/GHSA-p68q-wchp-6fh7) | >=4.0.0, <5.12.2 | Hors plage |
| [667r-xxjv-c9mm](https://github.com/fastify/fastify/security/advisories/GHSA-667r-xxjv-c9mm) | <5.12.2 | Hors plage |
| [w2qp-rph6-63g4](https://github.com/fastify/fastify/security/advisories/GHSA-w2qp-rph6-63g4) | <5.12.1 | Hors plage |
| [3m5p-2c4r-xxw2](https://github.com/fastify/fastify/security/advisories/GHSA-3m5p-2c4r-xxw2) | >=5.8.3, <5.12.1 | Hors plage |
| [247c-9743-5963](https://github.com/fastify/fastify/security/advisories/GHSA-247c-9743-5963) | >=5.3.2, <=5.8.4 | Hors plage |
| [444r-cwp2-x5xf](https://github.com/fastify/fastify/security/advisories/GHSA-444r-cwp2-x5xf) | <=5.8.2 | Hors plage |

Ce relevé conserve les avis adverses au lieu de déclarer « aucun problème ». Il couvre les avis visibles de cet index, pas toutes les bases ou anciennes pages. Les pages de dépôt [EJS](https://github.com/mde/ejs/security/advisories) et [better-sqlite3](https://github.com/WiseLibs/better-sqlite3/security/advisories) affichaient l’absence d’avis publiés : cela ne prouve pas l’absence de vulnérabilité. Revue Node, cookie, compilateur, outils de recette et graphe transitif non exhaustive, à compléter avant usage ; aucune affirmation « socle sûr ».

Exigences maintenues : vérification Host/Origin et autorisation indépendantes d’une simple validation de schéma ; pas de proxy de confiance ; pas de gabarit ou d’options EJS issus de saisies. Les correctifs documentés ne remplacent pas les contrôles M-07.

## Limites de collecte et décision

Certaines pages directes du registre/npm ont échoué (403 ou accès indisponible) ; les pages npm indexées, tags éditeurs et déclarations de DefinitelyTyped ont été utilisés là où ils étaient accessibles. Une tentative de lecture de métadonnées JSON depuis le terminal a échoué sur la résolution DNS ; aucun paquet n’a été téléchargé ou exécuté. Les sources ne donnent pas ici un graphe transitif résolu et signé.

D-02 est traité pour les versions directes et le choix d’outils ; la revue de sécurité reste partielle et explicitement ouverte. Le gel installé, la vérification des intégrités, les licences transitives et l’adéquation réelle des types restent T-01. Rafraîchir les avis et métadonnées avant installation autorisée, conserver les divergences et proposer une révision plutôt que remplacer une ancienne V1.
