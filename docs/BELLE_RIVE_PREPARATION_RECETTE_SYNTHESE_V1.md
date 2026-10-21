# Belle-Rive — Préparation technique : recette et synthèse

Version 1 — 21 octobre 2026. Préparation documentaire uniquement, soumise à examen. Aucun nouveau jalon ou autorisation de réalisation déduit.

## Dossier produit

- [Dépendances et versions candidates](BELLE_RIVE_PREPARATION_DEPENDANCES_V1.md).
- [Stockage, publication et reprise](BELLE_RIVE_PREPARATION_STOCKAGE_V1.md).
- [Accès éditorial et lancement](BELLE_RIVE_PREPARATION_ACCES_LANCEMENT_V1.md).
- La présente proposition de paramètres pour compléter la [matrice M-01 à M-13](BELLE_RIVE_BR_C4_MATRICE_PREUVES_V1.md).

La [validation BR-C4](BELLE_RIVE_BR_C4_VALIDATION.md) porte déjà sur l’orientation locale et le contrat de comportements. Les précisions présentes sont nouvelles et proposées ; les fichiers BR-C1 à BR-C4 et les preuves graphiques restent inchangés. L’étape 1 du portfolio reste clôturée.

## Environnements de recette proposés

| Niveau | Environnement prévu | Portée |
|---|---|---|
| E1 — Local nominal | Windows de la machine de réalisation ; architecture, processeur, mémoire et stockage à relever ; Edge stable, version exacte consignée avant essais | Référence locale pour fonctionnalités et budgets ci-dessous ; aucun matériel déjà caractérisé |
| E2 — Autre moteur | Firefox stable, version exacte consignée, même machine | Recette des trois parcours et de l’édition ; séparer résultats d’Edge |
| E3 — Assistance | NVDA avec Firefox, versions exactes consignées | Lecture des trois parcours, résultats, formulaire éditorial et erreurs ; pas d’échantillon humain handicapé déduit |
| E4 — Largeurs et zoom | 320, 390, 768 et 1440 px CSS ; zoom 200 % ; clavier ; cibles de 44 px | Objectifs BR-C4 maintenus ; émulation de largeur distincte d’un téléphone physique |
| E5 — Reprise | Même machine, autre dossier propre sans données initiales ; copie archivée identifiée | Prouve seulement une reprise locale si exécutée. Autre machine et téléphone physique restent non évalués tant qu’indisponibles |

Aucune installation de navigateur ou technologie d’assistance effectuée. Avant exécution, l’absence d’un environnement impose de noter non exécuté, pas de remplacer silencieusement sa portée. Les versions exactes des outils se relèvent au moment des tests ; ne pas inventer aujourd’hui leur disponibilité future.

## Budgets proposés pour M-12

Ce sont des objectifs de conception choisis pour un petit démonstrateur local ; aucune mesure ou promesse de performance. Fixer leur acceptation documentaire avant mesure, puis conserver les échecs sans réviser les seuils pour les faire disparaître.

| Objet | Seuil proposé | Protocole futur borné |
|---|---|---|
| Réponse HTML/recherche locale | Médiane ≤200 ms, maximum ≤500 ms par destination | Processus déjà prêt ; une requête d’échauffement exclue, puis 10 requêtes séquentielles depuis le même outil, sans autre charge volontaire ; mesure aller-retour locale jusqu’au dernier octet, sans rendu navigateur |
| Confirmation d’enregistrement/publication réussie | Médiane ≤500 ms, maximum ≤1000 ms | Dix opérations valides sur des copies identiques réinitialisées hors mesure ; de l’envoi à la réponse confirmée ; pas de moyenne mélangeant échec, reprise ou attente volontaire |
| Démarrage | ≤5 s | De l’invocation réelle à l’écoute confirmée, trois départs après arrêt propre ; maximum conservé ; installation/compilation non incluses |
| Poids initial de chaque page | ≤750 Kio transférés, cache navigateur vide | HTML, CSS, JavaScript et images locaux de la page, somme des octets du réseau observé ; état et compression consignés |
| Dépendances externes au runtime | Zéro requête distante nécessaire aux parcours | Réseau observé pendant les trois parcours et l’édition ; mise à jour éventuelle du navigateur distinguée des requêtes de l’application |

Ces budgets ne mesurent ni la vitesse perçue par une personne ni la charge multiutilisateur ; aucun objectif d’exploitation. Enregistrer conditions d’alimentation, charge de fond, versions, données et mesures brutes. Si un écart apparaît, conserver son ampleur et sa cause recherchée ; proposer une évolution versionnée du produit ou du besoin, sans rétroactivité sur le résultat.

## Évaluation d’accessibilité proposée M-08/M-09

Référence de travail : [WCAG 2.2, recommandation W3C](https://www.w3.org/TR/WCAG22/), niveaux A et AA pour les critères applicables aux pages retenues. Objectifs complémentaires du projet : cibles 44 px et zoom 200 %, conservés même lorsqu’ils dépassent ou ne résument pas un critère précis du référentiel. Cette couverture est une proposition technique, pas une conclusion juridique sur un référentiel obligatoire ni une déclaration de conformité globale.

Périmètre : accueil, trois rubriques, quatre détails, recherche avec succès/vide/zéro/indisponibilité, connexion éditoriale, brouillon, erreurs et résultat de publication. Variantes S2, S4, S7 et erreurs C-18 à C-23 incluses pour ce qu’elles changent dans l’interface. Avant essai : établir pour chacune la liste des critères applicables, non applicables motivés et non évalués. Aucun taux de conformité produit à partir d’un outil automatique.

Méthodes séparées : analyse automatisée ; examen manuel clavier, focus, ordre et structure ; noms et messages à la technologie d’assistance ; contrastes des couples réellement utilisés ; agrandissement et reflow. Couvrir notamment 1.1.1, 1.3.1, 1.3.2, 1.4.3, 1.4.4, 1.4.10, 1.4.11, 2.1.1, 2.1.2, 2.4.1, 2.4.3, 2.4.6, 2.4.7, 2.4.11, 2.5.8, 3.3.1, 3.3.2, 4.1.2 et 4.1.3, sans limiter à ces exemples la revue des critères applicables. Le compte rendu conservera chaque méthode et ses limites ; la session humaine M-10 restera une preuve distincte.

## Preuves, anomalies et règles de livraison

Pour chaque exécution future : ID M/C/S, build, dépendances verrouillées, version du stockage, copie de données, horloge de scénario et date réelle, protocole, environnement, observations brutes, résultat et pièces. Résultats défavorables, refus, aides et abandons humains conservés. Ne pas remplacer un ancien rapport par celui d’une correction ; relier les deux.

Prévoir un manifeste de livraison et des empreintes des sources partageables, données fictives, notice et rapports ; exclure secrets, cookies et traces sensibles. Les empreintes identifient les fichiers sans valider leur contenu. Les numéros de versions et les emplacements de preuves ne seront réels qu’après création ; aucun faux lien d’essai.

Les bloquants BR-C4 restent applicables : fuite de brouillon, fausse confirmation, annulation masquée, écriture non autorisée ou parcours principal impraticable. Ne pas agréger documentaire, technique et humain en PASS unique. La réalisation, son lancement et sa publication sont des autorisations distinctes de l’acceptation de ces documents.

## Revue de préparation de ce passage

Effectué : vérification du dossier actif portfolio ; lecture de la validation et des contrats BR-C4 ; recherche mémoire ciblée sans résultat pertinent utilisé ; consultation des sources officielles citées ; rédaction et relecture des quatre documents ; vérification de présence des cibles de liens locaux. Les versions candidates proviennent des sources consultées, aucune installation ou compatibilité locale n’a été vérifiée. Les recherches de release du parseur formbody n’ont pas fourni une source exploitable ; aucun numéro de ce paquet n’est inventé, l’adaptateur de formulaires plats est décrit sans ce paquet.

Points encore ouverts avant réalisation : distribution/commande de compilation TypeScript, types complémentaires et compatibilité effective Windows du pilote ; revue des avis de sécurité ; caractéristiques de la machine et versions des outils de recette. Ces points techniques sont explicités, sans nouvelle fonction ou seuil assoupli. Aucun arbitrage utilisateur indispensable ne bloque la lecture du dossier.

**Recommandation : accepter ou ajuster les précisions de stockage, accès local et budgets regroupés dans ce dossier.** Cela restera une validation de conception. Aucun développement, installation produit, création de base, serveur, test produit, contact externe ou publication exécuté. La préparation ne clôt pas automatiquement toute la conception et n’autorise pas de commencer le code.
