# Belle-Rive — Bilan des points encore ouverts

Version 1 — 21 octobre 2026. État documentaire, complément du [dossier consolidé](BELLE_RIVE_DOSSIER_CONSOLIDE_V1.md). Aucun nouveau périmètre adopté.

## Lecture du bilan

Les validations du cadrage, de BR-C3, BR-C4 et de la préparation sont acquises. Un point n’est pas ouvert simplement parce qu’une ancienne fiche porte « proposé ». Ce bilan sépare ce qui demande encore une précision de conception, ce qui nécessite une réalisation autorisée et ce qui reste extérieur au lot.

Les identifiants ci-dessous servent au suivi du dossier ; ils ne créent pas des jalons contractuels. Tous les points ouverts sont consignés sans résultat inventé. Les responsables indiquent qui pourra décider ou réaliser, sans mandat ou disponibilité supposés.

## Précisions documentaires restantes

| ID | Point et origine | Effet | Traitement recommandé et condition de résolution |
|---|---|---|---|
| D-01 | Distribution/commande de compilation TypeScript, format de modules et types complémentaires — préparation dépendances | La famille technique est acceptée, mais une notice de compilation concrète n’est pas définie | Agent de conception : fiche sourcée précisant paquet/distribution, entrée/sortie, modules et versions/types compatibles déclarés ; distinguer commande documentée de compilation exécutée. À préciser avant premier code ; aucune réouverture du choix TypeScript |
| D-02 | Versions candidates, outil navigateur de recette, revue des avis de sécurité — préparation dépendances | Pas de gel reproductible complet ni conclusion d’absence de vulnérabilité | Agent de conception : relever métadonnées et avis applicables à une date, proposer le jeu exact et ses limites ; à rafraîchir avant installation autorisée. Le verrouillage transitif et la compatibilité réelle restent T-01 |
| D-03 | Écrans éditoriaux, confirmation, résultat d’opération, erreurs et focus — contrats C-12 à C-24 | Comportements définis, mais seules les vues publiques de référence sont dessinées | Agent de conception : une séquence statique annotée connexion→brouillon→confirmation→résultat, avec refus de validation et publication à vérifier. Décliner les erreurs sans ajouter de fonction. Précision visuelle, pas nouvelle validation du principe d’édition |
| D-04 | Liste exhaustive des critères d’accessibilité applicables par vue et découpage des treize groupes M | Méthodes et couverture acceptées ; checklist détaillée non remplie | Agent de conception : relier chaque vue/état aux critères à examiner et aux cas de recette ; non-applicabilité motivée ou « à confirmer sur réalisation ». Pas de taux ou d’audit fictif |

D-03 et D-04 sont des besoins de finition identifiés dans cette consolidation, pas des contrôles déjà exécutés ni de nouvelles obligations rétroactives. Ils peuvent être traités en conception ou reportés explicitement lors d’un examen documentaire. D-01/D-02 sont déjà annoncés ouverts dans la préparation validée. Aucun de ces points ne justifie d’installer ou lancer un produit maintenant.

## Vérifications dépendant d’une réalisation autorisée

| ID | Point | Preuve nécessaire et échéance | État / porteur futur |
|---|---|---|---|
| T-01 | Compatibilité Windows/runtime/pilote, compilation et dépendances transitives | Environnement réel identifié, installation autorisée, fichier de verrouillage, compilation et chargement natif ; avant première recette | Non exécuté ; agent de réalisation à désigner après autorisation |
| T-02 | Application réelle des invariants et protections | M-05 à M-07 : historique, concurrence, réponse perdue, autorisations, origine, CSRF et absence de fuite ; avant présenter ces propriétés comme réalisées | Non testé ; agent de réalisation/recette |
| T-03 | Rendu, clavier, reflow, technologies d’assistance | M-08/M-09 sur versions et supports déclarés ; petites légendes, navigation étroite, polices et focus compris | Non testé ; vérifications automatiques et manuelles distinctes |
| T-04 | Budgets et empreinte réseau | M-12 selon seuils acceptés, machine et mesures brutes ; aucune révision de seuil pour forcer un succès | Non mesuré ; exécutant recette à attribuer |
| T-05 | Notice exécutable, arrêt, copie et restauration | M-11 : lancement propre, copie cohérente, reprise dans autre dossier ; seconde machine distincte si disponible | Non testé ; agent de réalisation/recette |
| T-06 | Fidélité des parcours, recherche et états temporels | M-01 à M-04, S0–S9 et instants frontières ; captures et journaux d’une même version | Non testé ; agent de réalisation/recette |

Ces vérifications ne bloquent pas la rédaction de la conception ; elles bloquent les affirmations techniques correspondantes. Même une clôture documentaire ne les transformerait pas en succès.

## Conditions de sessions et moyens

| ID | Point | Condition et limite |
|---|---|---|
| H-01 | Caractéristiques de machine et disponibilité Edge/Firefox/NVDA | Relever versions et moyens avant recette ; installation ou configuration d’outil seulement dans une phase autorisée ; indisponibilité = non exécuté, pas équivalence supposée |
| H-02 | Participants et modalités de session humaine | M-10 : trois adultes proposés, consentement/notes/anonymisation et supports à confirmer avant invitation ; aucun recrutement ou contact engagé |
| H-03 | Compréhension et difficultés réelles | Résultats futurs par tâche, aides, erreurs, refus et abandons conservés ; la validation de l’utilisateur concepteur ne remplace pas ces observations |
| H-04 | Autre machine et téléphone physique | Disponibilité inconnue ; absence d’essai explicitée. Les dessins 390 px et la reprise dans un second dossier ne sont pas ces preuves |

## Hors premier lot et décisions ultérieures

| ID | Sujet | État et recommandation |
|---|---|---|
| X-01 | Région, population, histoire, emblème et carte détaillée | Non fixés ; non nécessaires aux quatre contenus. Ne pas les inventer pour « compléter » le dossier |
| X-02 | Univers partagé, cinq autres concepts et ordre global | Ouverts ; aucune planification imposée par Belle-Rive |
| X-03 | Réservation, paiement, comptes usagers, notifications, carte interactive et fonctions des autres concepts | Exclus ; ne sont pas des lacunes à combler dans le premier lot |
| X-04 | Publication de l’étude/du code, polices distribuées, hébergement, accès réseau | Non autorisés ; revue des ressources/conditions de présentation et nouveau cadrage si envisagés. Polices locales utilisées pour les planches, sans fichiers de police livrés |
| X-05 | Maintenance, exploitation, migration réelle, responsabilités contractuelles | Hors engagement ; aucune capacité professionnelle ou institutionnelle déduite du démonstrateur |

## Ce qui a été tranché et ne doit plus être redemandé

- Nature fictive et personnelle ; trois parcours, recherche limitée, scénario éditorial et exclusions.
- Direction graphique BR-C3 V1.
- Option technique C locale, rendu serveur, TypeScript et SQLite, édition limitée et contrat de publication.
- Modèle documentaire de stockage, protections locales, conditions de lancement et budgets de recette acceptés.
- Matrice appliquée comme plan ; conservation des anciennes versions et des futurs échecs ; étape 1 clôturée avec son report historique.

Les versions exactes et preuves d’exécution ne sont pas couvertes comme résultats par ces décisions. Si une incompatibilité oblige plus tard à changer une exigence acceptée, elle devra être exposée et documentée, pas corrigée silencieusement dans une ancienne fiche.

## Recommandation de conduite

Prochain travail utile dans l’autorisation actuelle : traiter D-01 à D-04 en un lot de finition documentaire, avec sources et séquence éditoriale statique. Regrouper ensuite les seuls arbitrages nouveaux ; ne pas demander de revalider les acquis ci-dessus.

La clôture éventuelle de conception devra nommer les livrables acceptés, les reports documentaires et les preuves produit encore absentes. Elle restera distincte d’une autorisation de développement, de lancement, de tests ou de publication. À ce passage, aucune clôture n’est prononcée et aucun de ces travaux n’est lancé.
