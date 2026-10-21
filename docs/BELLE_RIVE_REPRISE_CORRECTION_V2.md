# Belle-Rive — correction du démarrage de reprise V2

21 octobre 2026 — version locale **0.1.1**. Budget inchangé : **5 000 ms maximum**, de l’invocation Node du build préparé à la confirmation d’écoute. Aucun assouplissement, échauffement préalable de la copie ou publication de l’application.

Le commit initial `054cde4` (lot 0.1.0, bilan et archive V1) a été poussé sur `origin/master`, après confirmation explicite du dépôt public et du contenu à transférer. Le correctif et ses nouvelles preuves sont versionnés dans un commit local distinct. Aucun hébergement, tunnel, LAN ou déploiement. Le refus initial du contrôle automatique de push, puis la vérification du dépôt et la confirmation utilisateur, ne sont pas des événements de recette produit.

## Résultat et portée

Trois premières invocations de copies neuves avec le lanceur corrigé : **683,78 / 725,13 / 718,54 ms**. Maximum **725,13 ms < 5 000 ms**. Chaque copie retrouve la révision r2, son historique et son opération, vérifie les protections HTTP, publie r3 avec rejeu sans doublon, puis s’arrête proprement. Les fichiers initiaux sont identiques par SHA-256 avant mesure.

Il s’agit d’une amélioration mesurée sur la même machine Windows x64, pas d’une garantie universelle ou d’un essai sur une autre machine. La qualification humaine, NVDA/Firefox, Edge stable et les autres limites du bilan V1 restent ouvertes. Le budget ne devient pas une acceptation utilisateur.

## Diagnostic exécuté avant correction

Le [dépassement V1 à 7 239,73 ms](../work/belle-rive-lot1/evidence/measures/reprise-6oGk8G/report.json), la précédente observation interrompue et l’archive V1 restent inchangés. Le nouveau diagnostic utilise des hooks synchrones de chargement, dans un script réservé à la recette, jamais dans le lanceur produit.

[Diagnostic original instrumenté](../work/belle-rive-lot1/evidence/measures/diagnostic-v2-tYbNp0/report.json) : première copie, **7 769,15 ms**, dont somme des durées des callbacks de chargement **6 682,74 ms**, sur **311 chargements observés**, et 663,37 ms de résolution. Ce dépassement supplémentaire est conservé. La répartition d’une seconde copie instrumentée isole l’import applicatif, l’ouverture SQLite, la construction Fastify et l’écoute ; ses résultats varient (3 410,53 ms au total), ce qui interdit d’attribuer une latence constante à SQLite.

Les faits observés localisent un coût important dans le chargement du graphe de nombreux petits fichiers JavaScript. La cause Windows précise (cache, antivirus, stockage ou autre) n’est pas démontrée : aucun antivirus désactivé, aucune exclusion système, aucun cache vidé ou prérempli pour obtenir le résultat. Les essais instrumentés ne sont pas mêlés à la série nominale.

Un premier diagnostic a échoué car `--import` recevait un chemin Windows au lieu d’une URL `file:`. Il est conservé dans `startup-diagnostic-v2-attempt-01.txt` ; correction du script de test, pas du produit.

## Correction concrète

Le serveur conserve TypeScript strict, Node 24.22.1, Fastify 5.12.7, EJS 6.0.1, cookies 11.1.3, SQLite/pilote 13.0.3 et tous les réglages/contrôles existants. Aucun changement des délais de session, opérations, transactions, requêtes, contenus ou critères.

Ajout d’**esbuild 0.28.2**, outil de build local verrouillé, licence MIT, moteur déclaré Node ≥18 ; métadonnées et SRI conservés dans `evidence/esbuild-metadata-v2.json`. L’[API officielle esbuild](https://esbuild.github.io/api/#bundle) documente l’assemblage et la conservation de [paquets externes](https://esbuild.github.io/api/#external). Cette adaptation ajoute une étape de build désormais nécessaire au lanceur ; elle ne prétend pas que la conception initiale avait déjà prouvé un assemblage. Elle est motivée par les chargements mesurés.

`build.mjs` exécute d’abord le même compilateur TypeScript strict, puis assemble les dépendances JavaScript en ESM Node 24, sans minification ni désactivation de contrôle. Interop CJS via `createRequire`. `better-sqlite3` reste externe pour conserver la résolution et le chargement officiel du prébuild natif Windows ; son SHA-256 reste **E21E5EFD71FBA66578E95B62554D9028064A80DAFD7221BF8A8EF155DE8D240A**, identique à V1. Les commentaires légaux externes et cartes de source restent des fichiers locaux non servis.

`Start.ps1` lance `dist/server.bundle.js` après compilation/assemblage réussis ; l’initialisation et les commandes npm suivent les entrées assemblées. Un échec de build invalide les anciens bundles et le manifeste. Une [injection d’erreur TypeScript dans une copie isolée](../work/belle-rive-lot1/evidence/measures/buildguard-v2-NNb2qQ/report.json) confirme le refus et l’absence d’anciens bundles disponibles : aucun contournement de typage.

Le build produit un manifeste des sources, verrou, ressources, entrées d’assemblage et sorties. Les tests regroupés et navigateur utilisent `runtime.bundle.js`, créé depuis les mêmes modules et options. Les reprises séparées exécutent réellement `server.bundle.js` en processus enfant ; aucun simple mock de démarrage.

Le graphe verrouillé passe de 83 à **110 entrées**, options d’autres plateformes incluses ; toutes ont licence déclarée, URL et SRI dans `licenses-integrities-startup-v2.json`. Les dépendances applicatives directes ne changent pas. Installation sans scripts, aucun runtime global remplacé. [Audit npm du nouveau graphe](../work/belle-rive-lot1/evidence/npm-audit-startup-v2.json) : zéro vulnérabilité signalée dans cette exécution, sans conclusion de sécurité globale, de support LTS esbuild ni d’autorisation générale de redistribution.

## Comparaison primaire préétablie M-11 / démarrage M-12

[Protocole fixé avant mesure, build et fixture](../work/belle-rive-lot1/evidence/measures/reprise-v2-q61tdC/protocol-before-measure.json) ; [résultats bruts](../work/belle-rive-lot1/evidence/measures/reprise-v2-q61tdC/report.json). Trois paires, ancien puis nouveau lanceur dans des dossiers neufs distincts. **Arbre complet `node_modules` copié dans les deux cas** : pas de comparaison favorable par retrait d’une partie de la livraison. Même base S2 initiale, première invocation sans chauffe dans chaque dossier. Construction et copie hors mesure, comme dans le protocole V1 accepté. Délai d’observation 60 s distinct du budget 5 s.

| Paire | Ancien lanceur, ms | Assemblage 0.1.1, ms | Budget pour chaque mesure |
|---|---:|---:|---:|
| 1 | 4 956,73 | 683,78 | ≤5 000 |
| 2 | 3 354,05 | 725,13 | ≤5 000 |
| 3 | 3 295,36 | 718,54 | ≤5 000 |

Les anciens lancements réussissent cette fois aussi dans ces trois paires : ils ne sont ni supprimés ni remplacés par le seul ancien échec. Cette variabilité interdit de généraliser « l’ancien échoue toujours ». L’assemblage réduit ici nettement le coût et laisse une marge mesurée, sans oublier les dépassements antérieurs.

Pour chaque lancement : page publique attendue, ancienne session refusée au redémarrage, authentification, origine et CSRF invalides refusés, opération initiale retrouvée, sauvegarde/confirmation/publication, rejeu de la même opération sans doublon, anciennes révisions inchangées, intégrité SQLite et clés étrangères après arrêt. Les six processus s’arrêtent avec code 0 et sans témoin `.running` résiduel. Arrêts corrigés : environ 20 à 24 ms dans cette série ; aucune terminaison forcée utilisée pour cette comparaison.

[Profil complémentaire assemblé](../work/belle-rive-lot1/evidence/measures/diagnostic-bundle-v2-Yi9qeE/report.json) : **54 chargements** observés, somme des callbacks de chargement 452,18 ms, résolution 18,66 ms et écoute confirmée à 845,32 ms. Le pilote natif reste chargé normalement. Ce profil instrumenté corrobore le mécanisme ; il n’est pas substitué aux trois mesures nominales ci-dessus.

## Rejeux et nouveaux résultats

Windows 11 Pro 10.0.26200 x64, i9-14900HX, mémoire déclarée 68 406 091 776 octets, runtime portable inchangé. Alimentation et charge de fond toujours non maîtrisées ; aucune autre machine ou cache disque physiquement froid déclaré.

| Contrôle concerné | Résultat exécuté et preuve | Portée |
|---|---|---|
| Compilation/assemblage | Succès strict, manifeste `build-0.1.1-before-tests-v2.json` | Ni `any` global ni skipLibCheck permissif |
| M-01 à M-07, A-07 automatisé | [8 tests regroupés réussis contre l’assemblage](../work/belle-rive-lot1/evidence/core-bundle-v2-attempt-01.txt) | S0–S9, conflits, rollback, idempotence, session/CSRF/origine, dix renouvellements pour chaque limite |
| M-05/06/07/08/09, A-04/05/07 automatisés | [Chromium et Firefox Playwright](../work/belle-rive-lot1/evidence/browser-data/run-BsyRze/report.json), séquence complète réussie | Perte réelle de socket, récupération, sauvegarde, erreur/focus, avertissement/prolongation, déconnexion, quatre largeurs ; pas revue humaine ni AT |
| M-11 entrée réelle | Six lancements/reprises ci-dessus, plus reprise M-12 complète | Même machine, copies neuves ; pas panne physique |
| Refus du lanceur | [Base absente, modèle inconnu, témoin et port occupé refusés](../work/belle-rive-lot1/evidence/measures/launch-guards-v2-nQCAKG/report.json) | Pas de port/hôte de repli ; marqueur original préservé |
| Non-exposition | Bundles, carte de source, build.mjs et lockfile : 404 par l’entrée réellement lancée | Liste fermée de ressources publiques inchangée |
| Garde de build | Ancien assemblage invalidé sur erreur TypeScript attendue dans une copie | Aucun serveur lancé par ce contrôle négatif |

[Rejeu M-12 complet](../work/belle-rive-lot1/evidence/measures/run-WcBqIv/report.json), selon le [protocole V2 conservant tous les budgets](../work/belle-rive-lot1/evidence/protocol-startup-v2.md) :

| Objet | Nouveau résultat | Budget inchangé |
|---|---|---|
| 11 destinations HTML/recherche, 10 mesures après chauffe chacune | Médianes 5,37 à 8,45 ms ; maximum 12,74 ms | Médiane ≤200, max ≤500 ms |
| 10 enregistrements sur copies identiques | Médiane 18,03 ms ; max 20,44 ms | Médiane ≤500, max ≤1000 ms |
| 10 publications sur copies identiques | Médiane 19,50 ms ; max 22,53 ms | Médiane ≤500, max ≤1000 ms |
| 3 démarrages dans le dossier de mesure | 263,14 / 267,56 / 247,47 ms | Max ≤5 000 ms |
| Copie de reprise supplémentaire | r2 et opération retrouvées, intégrité `ok`, arrêt propre | Démonstration de reprise, distincte des trois chronométrages primaires |

Les ressources publiques, gabarit et CSS ne changent pas. Les anciens contrôles de poids, 129 liens et variantes graphiques restent des preuves historiques identifiées ; ils ne sont pas renommés en nouvelle exécution. Les captures navigateur de cette version sont conservées dans `run-BsyRze`, sans résultat axe ni JavaScript défavorable détecté dans ce rejeu, sans conformité déduite.

## Conservation et limites finales

Anciennes sources par Git/archives, bilan V1, logs, échecs et données restent conservés ; aucune ancienne mesure ni archive réécrite. Notice V1 recopiée sous `NOTICE_LOT1_V1.md`, notice active mise à jour vers les entrées assemblées. Nouveau manifeste/ZIP/empreintes V2 distincts. Les copies volumineuses d’installation restent sur le disque ; le manifeste exclut leurs duplications, pas leurs rapports. Les bases restent locales et fictives, pas de secret/cookie dans les preuves.

Le dépassement de reprise est **corrigé dans les trois essais nominaux de cette version et de cette machine**, budget inchangé ; les faits défavorables précédents restent valides pour V1. Pas de qualification universelle, d’acceptation humaine, de garantie de sécurité ou d’exploitation. Aucun recrutement, service municipal réel, hébergement ou exposition réseau. Serveurs de recette arrêtés à l’issue des vérifications.
