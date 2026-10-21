# Belle-Rive — Finition D-01 : compilation et types

21 octobre 2026 — V1, conception seulement. Aucun fichier de configuration produit, paquet ou compilation créé/exécuté. Complément proposé à la préparation validée.

## Distribution et commande documentées

Le [registre du paquet TypeScript](https://registry.npmjs.org/typescript/latest), consulté ce passage, indique `typescript` 7.0.2 et le binaire `tsc`, avec des distributions natives optionnelles dont Windows x64/arm64. La distribution ne doit donc pas être assimilée à un simple script JavaScript universel. Architecture, téléchargement et exécution restent à vérifier après autorisation.

Contrat recommandé : compilateur **local au futur projet**, pas global, commande de compilation `tsc --project tsconfig.build.json`, commande de contrôle sans émission `tsc --project tsconfig.build.json --noEmit`. Ces commandes sont des spécifications non exécutées. Dans de futurs scripts npm, le binaire local sera résolu ; ne pas utiliser une commande qui télécharge automatiquement un compilateur manquant.

Sortie attendue : sources serveur TypeScript sous `src/`, JavaScript compilé sous `dist/`, entrée prévue `dist/server.js`. Les noms désignent des chemins futurs ; aucun de ces dossiers produit n’est créé par cette fiche. Contrôle d’échec : aucun lancement si compilation échouée ; ne pas lancer une ancienne sortie en la présentant comme fraîchement compilée.

## Contrat de modules et options

| Paramètre proposé | Valeur / règle documentaire |
|---|---|
| Format du projet | ESM, futur manifeste avec `type: module` |
| module / moduleResolution | NodeNext / NodeNext ; imports relatifs utilisant l’extension `.js` de sortie ; pas d’alias nécessitant un résolveur runtime |
| target / lib | ES2022 / ES2022 pour le serveur ; pas de types DOM dans le projet serveur |
| rootDir / outDir | src / dist ; sortie vers une destination de build distincte des archives et données |
| strict / noEmitOnError | true / true |
| noUncheckedIndexedAccess / exactOptionalPropertyTypes | true / true |
| skipLibCheck | false ; un conflit de types reste visible, sans contournement silencieux |
| esModuleInterop / verbatimModuleSyntax | true / true ; imports de types explicites ; interop CJS à contrôler sur les paquets retenus |
| types | Node uniquement chargé automatiquement ; autres déclarations via imports explicites |
| sourceMap | true pour diagnostic local ; cartes non servies par les routes publiques |

NodeNext est adapté aux modules Node selon les [références TypeScript module](https://www.typescriptlang.org/tsconfig/module.html) et [résolution](https://www.typescriptlang.org/tsconfig/moduleResolution.html). La cible est explicite afin de ne pas dépendre de sa cible implicite flottante. La compatibilité effective de ces options avec la distribution candidate reste T-01, pas un fait établi par leur rédaction.

Pas de bundler serveur, ts-node ou tsx requis. Les gabarits EJS, CSS et SVG sont des ressources versionnées distinctes : la compilation TypeScript ne les copie pas. Le futur assemblage devra les livrer explicitement selon une liste fermée, sans inclure données, secrets ou docs privées. Les petites améliorations navigateur, si nécessaires, auront leur contrôle séparé ; aucun besoin de DOM ne justifie de relâcher les types serveur.

## Types : choix et limites

| Déclaration proposée | Rôle et condition |
|---|---|
| @types/node 24.19.0 | Branche 24 observée dans les [versions npm](https://www.npmjs.com/package/%40types/node?activeTab=versions) ; ne pas prendre automatiquement la branche du Node le plus récent |
| Types Fastify et cookie embarqués | Ne pas ajouter de paquet @types/fastify ; vérifier exports et signatures du tag installé |
| @types/ejs 3.1.5 | Version attestée par [npm](https://www.npmjs.com/package/%40types/ejs?activeTab=versions). Numéro différent d’EJS 6.0.1 : ne prouve pas une incompatibilité ni une adéquation complète |
| @types/better-sqlite3 9.6.0 | Version attestée par [npm](https://www.npmjs.com/package/%40types/better-sqlite3?activeTab=code). Numéro différent du pilote 13.0.3 ; même limite |

Frontières internes : résultats de stockage et corps HTTP reçus comme inconnus, validés avant utilisation ; modèles de présentation typés explicitement ; pas de `any` global ou déclaration vide de module pour faire disparaître une erreur. Limiter EJS à un adaptateur interne de rendu et SQLite aux méthodes réellement nécessaires. Les déclarations externes peuvent comporter des types larges : elles ne valident pas les données.

Si les signatures installées divergent : garder le diagnostic ; proposer une déclaration locale minimale documentée d’après l’API exacte ou un autre couple de versions, sans modifier discrètement le socle accepté. Compilation et appels réels devront confirmer le choix. D-01 est précisé documentairement ; compatibilité, compilation et chargement restent non testés.
