# R-01 / R-02 — vérification exécutée du socle

21 octobre 2026, Windows 11 Pro 10.0.26200 x64. Les sources consultées sont archivées avec URL, code HTTP et date dans `evidence/source-index-v1.json` ; les compléments Node/cookie sont conservés en fichiers `source-…`. Les anciennes fiches de conception restent inchangées.

Le runtime global détecté était Node 24.18.0 avec npm 11.16.0. Node **24.22.1** est installé en copie portable locale ; ZIP comparé au SHA-256 officiel de la même release avant extraction. Aucun remplacement global. Le [calendrier Node](https://github.com/nodejs/Release/blob/main/schedule.json) place la branche 24 en LTS ; la [release exacte](https://nodejs.org/en/blog/release/v24.22.1) et les [sommes](https://nodejs.org/download/release/v24.22.1/SHASUMS256.txt) sont archivées. La branche et une release ne constituent pas un engagement de maintenance de l’application.

| Direct | Version installée | Licence déclarée | Constat limité |
|---|---|---|---|
| fastify | 5.12.7 | MIT | API et cookie chargés, routes réelles exécutées |
| ejs | 6.0.1 | Apache-2.0 | Import ESM par défaut, `render` et échappement exécutés |
| better-sqlite3 | 13.0.3 | MIT | Import CJS interop, binaire N-API Windows x64 déjà distribué dans le paquet, SQLite 3.53.4 réellement interrogé |
| @fastify/cookie | 11.1.3 | MIT | Cookies chargés, session et déconnexion testées |
| typescript | 7.0.2 | Apache-2.0 | Compilateur natif Windows `@typescript/typescript-win32-x64/lib/tsc.exe`, version et compilation exécutées |
| @types/node | 24.19.0 | MIT | Branche Node 24, compilation stricte |
| @types/ejs | 3.1.5 | MIT | Signatures utilisées par l’adaptateur réel acceptées ; pas de déclaration globale de contournement |
| @types/better-sqlite3 | 9.6.0 | MIT | Signatures utilisées par le stockage acceptées, transactions et appels natifs exécutés |
| @playwright/test | 1.64.1 | Apache-2.0 | Chromium 156.0.8078.4 et Firefox 157.0 du paquet ; pas Edge stable ni Firefox stable utilisateur |
| @axe-core/playwright | 4.14.0 | MPL-2.0 | Analyses automatisées des vues essayées, aucune conformité globale déduite |

Les métadonnées exactes viennent du [registre npm](https://registry.npmjs.org/) : URL par paquet et version dans l’index, pas une étiquette `latest` utilisée comme verrou. `package-lock.json` identifie 83 entrées de paquets, y compris options d’autres plateformes ; toutes possèdent licence déclarée, URL résolue et intégrité SRI. Cela ne signifie pas que tous les binaires des autres systèmes sont installés ou exécutables. Inventaire : `evidence/licenses-integrities-v1.json`. Cache npm vérifié : 146 objets, 124 665 145 octets. Licences relevées, pas avis juridique ni autorisation de distribution publique.

## Support et avis adverses conservés

La [politique Fastify](https://github.com/fastify/fastify/blob/main/docs/Reference/LTS.md) mentionne Fastify 5 et Node 24, avec tests Windows, et sans date de fin fixée dans la table consultée. La [politique EJS](https://github.com/mde/ejs/blob/main/SECURITY.md) annonce les correctifs sur la majeure courante ; elle avertit que les gabarits sont du code exécutable. Ici seul le gabarit versionné est compilé, jamais une saisie ni des options de rendu venant d’une requête. La [compatibilité cookie](https://github.com/fastify/fastify-cookie/blob/v11.1.3/README.md) et les moteurs déclarés des paquets sont archivés.

L’API publique officielle [Fastify advisories](https://api.github.com/repos/fastify/fastify/security-advisories?per_page=100) a livré **16 avis**, soit une couverture plus large que les dix de la fiche de conception. Toutes les plages publiées de ces 16 avis excluent 5.12.7 ; les textes, plages et correctifs restent dans `source-fastify-fastify-advisories-v1.txt`. Cela conserve notamment les avis de contournement de validation, CSRF, protocole/hôte/proxy et déni de service. Aucun essai d’exploitation général ni absence de vulnérabilité déduit.

Les index officiels cookie, EJS, better-sqlite3, TypeScript, Playwright et axe-core ont renvoyé une liste vide lors de la collecte. Absence d’avis publié ≠ absence de faille. Le fichier SECURITY.md demandé pour better-sqlite3 renvoie **404**, conservé ; aucune durée contractuelle de support inventée pour ce pilote, les types ou les outils de recette. L’index des vulnérabilités Node et sa release sont archivés ; ce relevé et npm ne couvrent pas toutes les bases ou failles inconnues.

`npm audit` sur le graphe résolu : **0 vulnérabilité signalée** dans cette exécution (`evidence/npm-audit-v1.json`). Il s’agit de la réponse de cette base d’avis à cette date, pas d’un certificat de sécurité. Réexamen nécessaire avant tout autre usage ou mise à jour. Les sources distantes brutes contiennent des métadonnées d’éditeurs ; aucune donnée municipale réelle n’est intégrée au portail.

## Compatibilité et adaptations réellement faites

Installation avec scripts désactivés : le pilote 13.0.3 contient déjà son binaire Windows, aucun node-gyp ni outil C++ système installé. Node N-API et l’import ont été confirmés par exécution. Le compilateur natif s’est lancé sans script d’installation additionnel. Les empreintes des binaires sont dans `evidence/native-hashes-v2.json`.

Contrat TypeScript conservé : ESM/NodeNext, ES2022, strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, skipLibCheck=false, noEmitOnError. Une erreur initiale sur la gestion d’une exception `unknown` reste dans `build-attempt-01.txt` ; correction par réduction de type, sans `any` global. Aucun changement de famille ni version directe nécessaire.

Écart produit trouvé par navigateur : Referrer-Policy `no-referrer` rendait l’origine des formulaires inexploitable ; politique passée à `same-origin`, sans accepter d’origine nulle/absente ni ajouter de CORS. Les refus initiaux et les succès après correction restent dans les tentatives de recette. La CSP n’a pas été assouplie pour l’injection d’espacement de test : application via CSSOM de la feuille locale, après conservation du refus CSP initial.

R-01 est traité dans la portée de cette collecte, du graphe installé et de la revue ciblée ; sécurité globale et maintenance restent non établies. R-02 est résolu pour les imports, signatures utilisés, compilation et pilote de **cette machine Windows x64** ; aucune compatibilité d’une autre machine ou architecture déduite.
