# Belle-Rive — Dossier de conception consolidé

Version 1 — 21 octobre 2026. Consolidation documentaire pour examen ; conception non déclarée clôturée. Aucun développement autorisé par ce document.

## Le projet en une lecture

Belle-Rive est un futur démonstrateur personnel de portail de collectivité fictive. Il vise trois consultations : préparer une visite à la mairie, comprendre un événement et ses conditions, retrouver la médiathèque et ses accès. Ces besoins sont des hypothèses de conception, sans enquête ou commande client. Un scénario éditorial doit montrer la préparation d’un brouillon, une modification d’horaire, sa publication et la consultation de la bonne révision.

Le premier lot décrit quatre contenus : IP-01 mairie, IP-02 préparation de visite, EQ-01 médiathèque, EV-01 lecture. Leur corpus, leurs dates et adresses sont inventés ; aucune procédure administrative réelle, ouverture de bâtiment ou sortie culturelle n’est annoncée.

L’orientation acceptée est une petite application locale, rendue sur le serveur, TypeScript/HTML/CSS et SQLite, avec édition persistante limitée à un acteur, historique et recherche sur les seules versions publiques. Les versions de dépendances sont des candidats documentés, pas un socle installé ou compatible démontré.

La direction visuelle acceptée associe papier clair, bleu rivière, tons de berge, typographie éditoriale et illustration originale. Les planches sont des vues fixes ; elles ne constituent pas des pages fonctionnelles.

## Autorité des décisions

| Décision | Source de validation | Portée actuelle |
|---|---|---|
| Cadrage du portail | [Validation du cadrage](BELLE_RIVE_VALIDATION_CADRAGE.md) | Trois parcours, recherche limitée, scénario éditorial et exclusions |
| Direction visuelle BR-C3 V1 | [Validation graphique](BELLE_RIVE_BR_C3_VALIDATION.md) | Base visuelle et compositions présentées ; pas de recette produit |
| BR-C4 et option technique C | [Validation BR-C4](BELLE_RIVE_BR_C4_VALIDATION.md) | Contrat fonctionnel, orientation locale et plan de preuve appliqué |
| Préparation technique V1 | [Validation de préparation](BELLE_RIVE_PREPARATION_VALIDATION.md) | Stockage, protections, lancement, environnements et budgets comme exigences |
| Présente consolidation | Demande de rédaction de l’utilisateur | Livrable produit pour examen ; aucune acceptation ou clôture globale supposée |

Les notes de validation priment, pour leur périmètre, sur les mentions d’attente des documents rédigés auparavant. Elles ne rendent pas vrai ce qui reste hypothétique, non testé ou candidat. Les détails BR-C1/BR-C2 repris dans le contrat accepté servent la conception ; aucun blanc-seing sur tout ajout antérieur ou futur.

## Index des références

| Bloc | Documents de travail conservés |
|---|---|
| Origine et périmètre | [Cadrage V1](BELLE_RIVE_CADRAGE_V1.md) ; [synthèse BR-C1](BELLE_RIVE_BR_C1_PERIMETRE_V1.md) |
| Parcours et édition | [Trois fiches](BELLE_RIVE_BR_C1_PARCOURS_V1.md) ; [scénario éditorial](BELLE_RIVE_BR_C1_EDITORIAL_V1.md) |
| Architecture et données | [Arborescence/recherche](BELLE_RIVE_BR_C2_ARCHITECTURE_V1.md) ; [modèle des contenus](BELLE_RIVE_BR_C2_MODELE_CONTENUS_V1.md) ; [corpus S0–S9](BELLE_RIVE_BR_C2_CORPUS_V1.md) |
| Graphisme | [Direction V1](BELLE_RIVE_BR_C3_DIRECTION_VISUELLE_V1.md) ; [revue des rendus](BELLE_RIVE_BR_C3_REVUE_V1.md) |
| Comportements et moyens | [Règles C-01–C-25](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md) ; [comparaison technique](BELLE_RIVE_BR_C4_OPTIONS_TECHNIQUES_V1.md) ; [synthèse BR-C4](BELLE_RIVE_BR_C4_SYNTHESE_V1.md) |
| Preuves futures | [Matrice M-01–M-13](BELLE_RIVE_BR_C4_MATRICE_PREUVES_V1.md) |
| Préparation | [Dépendances candidates](BELLE_RIVE_PREPARATION_DEPENDANCES_V1.md) ; [stockage](BELLE_RIVE_PREPARATION_STOCKAGE_V1.md) ; [accès/lancement](BELLE_RIVE_PREPARATION_ACCES_LANCEMENT_V1.md) ; [recette et budgets](BELLE_RIVE_PREPARATION_RECETTE_SYNTHESE_V1.md) |
| État résiduel | [Bilan des points ouverts V1](BELLE_RIVE_POINTS_OUVERTS_V1.md) |
| Cadre du portfolio | [Clôture étape 1](ETAPE_1_CLOTURE.md) ; [gabarit Voir/Essayer/Examiner](ETAPE_1_ETUDE_DE_CAS_V1.md) ; [stratégie de preuve](ETAPE_1_PREUVES_ET_RECETTE_V1.md) |

Planches : [accueil S0](../outputs/BELLE_RIVE_BR_C3_ACCUEIL_V1.png), [médiathèque S4](../outputs/BELLE_RIVE_BR_C3_DETAIL_V1.png), [compositions étroites](../outputs/BELLE_RIVE_BR_C3_MOBILE_V1.png), [états difficiles](../outputs/BELLE_RIVE_BR_C3_ETATS_V1.png). S0 et S4 sont des variantes distinctes : aucune incohérence de statut d’une session fonctionnelle n’est justifiée par ces planches.

## Contrat du premier lot

| Domaine | Inclus dans la conception acceptée | Frontière |
|---|---|---|
| Consultation | Accueil, trois rubriques, quatre détails, liens entre lieu et événement | Aucun catalogue territorial exhaustif |
| Recherche | Titres/résumés/termes des versions publiques ; états vide, zéro, erreur ; limite 120 caractères | Pas de recherche web, sémantique ou de documents joints |
| Dates | Horloge fictive explicite ; à venir/en cours/passé ; annulation prioritaire ; exception horaire datée | Pas d’événement réel ou d’indicateur d’ouverture temps réel |
| Édition | Brouillon persistant, confirmation de publication, révisions immuables et opérations identifiées | Quatre contenus, un acteur ; pas de CMS général ou édition collaborative |
| Cohérence | Sources uniques, lecture publique par référence, transaction de publication, vérification après réponse perdue | Pas de mise à jour automatique d’une page déjà ouverte |
| Accès | Origine locale prévue 127.0.0.1:4317, session éditoriale, autorisations et protections d’écriture | Pas d’hébergement, tunnel ou exposition réseau |
| Reprise | Copies identifiées, arrêt propre, restauration sur autre copie de travail, archives préservées | Pas de garantie de sauvegarde d’exploitation ou de panne matérielle |

Restent exclus : réservation, paiement, comptes usagers, espace citoyen, notifications réelles, carte interactive, observatoire, musée, jeux, migration réelle et engagement de maintenance. Les cinq autres concepts, l’univers partagé et l’ordre global restent ouverts.

## Seuils acceptés, encore non mesurés

| Objet | Exigence documentaire acceptée | Source du protocole |
|---|---|---|
| Réponse locale HTML/recherche | Médiane ≤200 ms ; maximum ≤500 ms | Préparation recette, 10 requêtes après échauffement exclu |
| Enregistrement/publication valide | Médiane ≤500 ms ; maximum ≤1000 ms | 10 opérations sur copies identiques, pas de mélange avec pannes |
| Démarrage | Maximum ≤5 s sur trois départs propres | Installation et compilation exclues de cette mesure |
| Poids initial | ≤750 Kio par page, cache navigateur vide | Ressources de la page et compression consignées |
| Ressources distantes nécessaires | Zéro | Observation réseau de l’application |
| Présentation | Largeurs 320/390/768/1440 px, zoom 200 %, cibles 44 px | Contrôles manuels et mesures distincts des dessins |

Les protocoles complets et leurs limites restent dans la préparation recette, qui fait autorité ; ces rappels ne les remplacent pas. Aucun seuil abaissé par cette consolidation.

## État des preuves

| Nature | Ce qui existe | Ce qui n’en découle pas |
|---|---|---|
| Documentaire | Parcours, données fictives, architecture, contrats, matrice et validations explicites | Utilité observée ou réalisation logicielle |
| Graphique fixe | SVG/PNG BR-C3, inspection locale consignée, six calculs de couples de couleurs | Adaptation dynamique, navigation, audit d’accessibilité ou compréhension humaine |
| Documentation technique externe | Sources primaires citées dans la préparation, consultées lors de sa rédaction | Compatibilité installée, absence de vulnérabilité ou disponibilité future ; pas de nouvelle vérification web dans cette consolidation |
| Produit | Aucun portail fonctionnel ni base produit réalisé dans ce périmètre | Aucun PASS fonctionnel, de stockage, sécurité, performance ou reprise |
| Humain | Session groupée décrite, aucun essai réalisé | Aucun taux, verbatim, satisfaction ou compréhension démontré |

La matrice appliquée a été rédigée puis acceptée en BR-C4 comme plan ; tous ses contrôles produit restent futurs. Le report de l’étape 1 est un état historique conservé, sans réussite rétroactive ni réouverture de cette étape clôturée.

## Bilan et suite recommandée

La base de conception est documentée et ses principaux choix ont été acceptés. Le dossier n’est pas déclaré immédiatement exécutable : des précisions de chaîne de compilation, dépendances et écrans éditoriaux restent identifiées dans le bilan. Les vérifications de compatibilité et les tests produit ne sont pas des manques documentaires que l’on pourrait supprimer par une validation.

Recommandation dans le périmètre actuel : traiter en un passage documentaire les points de finition D-01 à D-04 du bilan, puis examiner une éventuelle clôture documentaire avec les reports nommés. Ni cette recommandation ni une telle clôture ne permettraient de commencer la réalisation sans instruction explicite.

## Traçabilité de cette consolidation

Dossier actif vérifié : `C:\Users\micka\Documents\ChatGPT\portfolio`. Lecture des notes de validation et de la préparation ; rapprochement des états historiques et actuels ; indexation des pièces ; revue des liens locaux et manifeste de conservation du dossier. Les constats restent documentaires. Aucune mémoire pertinente utilisée après recherche ciblée sans résultat.

Cette V1 ajoute une synthèse et un bilan sans réécrire les décisions ni les pièces sources. Le [manifeste associé](../outputs/BELLE_RIVE_CONSOLIDATION_MANIFESTE_V1.json) identifiera les fichiers présents à la consolidation ; il n’atteste ni qualité ni clôture et ne s’inclut pas lui-même. Une version future conservera cette V1 et documentera ses modifications.

**Aucune clôture globale, réalisation, installation produit, base, serveur, recette produit ou publication lancé par ce passage.**
