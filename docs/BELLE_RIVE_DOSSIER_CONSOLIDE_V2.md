# Belle-Rive — Dossier de conception consolidé V2

21 octobre 2026 — Conception uniquement. Référence de lecture actualisée, sans clôture globale ni autorisation de réalisation.

## Objet et évolution depuis V1

Cette V2 intègre les quatre finitions validées et le remplacement du plafond de session par une échéance renouvelable. Le [dossier V1](BELLE_RIVE_DOSSIER_CONSOLIDE_V1.md), le [bilan V1](BELLE_RIVE_POINTS_OUVERTS_V1.md), les sources et les manifestes précédents restent conservés. Aucun budget ni exclusion n’est modifié.

Les quatre finitions ne sont plus à refaire ou à faire accepter : leur validation est acquise. AV-01 n’est plus un arbitrage ouvert. Les compléments d’interface créés après cette décision restent identifiés comme propositions, sans élargir implicitement la validation à leur rendu.

## Projet et périmètre accepté

Belle-Rive est un futur démonstrateur personnel de portail de collectivité fictive, sans référence client. Besoins et publics hypothétiques, contenus et coordonnées de lieux inventés : aucune procédure administrative réelle, ouverture d’équipement ou organisation d’événement n’est attestée.

| Élément | Base de conception |
|---|---|
| Parcours publics | Préparer une visite à la mairie ; comprendre un événement et ses conditions ; retrouver la médiathèque et ses accès |
| Corpus | IP-01 mairie, IP-02 préparation de visite, EQ-01 médiathèque, EV-01 lecture ; variantes S0–S9 isolées |
| Pages | Accueil, trois rubriques, quatre détails, recherche et états difficiles ; liens entre équipement et événement |
| Recherche | Titres/résumés/termes éditoriaux des seules révisions publiques ; mots entiers, accents/casse neutralisés ; limite 120 caractères ; vide/zéro/indisponibilité distincts |
| Édition | Un acteur, quatre contenus ; brouillon persistant, confirmation explicite, révisions conservées, opération identifiée et vérification après réponse perdue |
| Architecture | Application locale unique, rendu serveur, TypeScript/HTML/CSS et SQLite ; pas d’index de recherche externe |
| Accès | Origine prévue 127.0.0.1:4317, autorisations et protections de requête ; aucun hébergement ou accès réseau |
| Graphisme | Papier clair, bleu rivière, berges, typographie éditoriale et illustration originale ; planches publiques BR-C3 et séquence éditoriale fixe validées |

Restent exclus : réservation, paiement, comptes usagers, espace citoyen, notifications réelles, carte interactive, observatoire, musée, jeux, migration réelle et promesse de maintenance/exploitation. Univers partagé, cinq autres concepts et ordre global restent ouverts. L’étape 1 du portfolio demeure clôturée avec son report historique, sans réussite rétroactive.

## Registre des validations

| Référence | Décision et limite |
|---|---|
| [Cadrage accepté](BELLE_RIVE_VALIDATION_CADRAGE.md) | Portail, parcours, recherche limitée, scénario éditorial, exclusions |
| [BR-C3 accepté](BELLE_RIVE_BR_C3_VALIDATION.md) | Direction visuelle et compositions publiques, aucune recette produit |
| [BR-C4 accepté](BELLE_RIVE_BR_C4_VALIDATION.md) | Comportements, orientation technique locale, matrice appliquée comme plan |
| [Préparation acceptée](BELLE_RIVE_PREPARATION_VALIDATION.md) | Modèle de stockage, protections, lancement et budgets comme exigences |
| [Finitions et AV-01 acceptés](BELLE_RIVE_FINITIONS_VALIDATION.md) | Compilation/types, jeu direct exact, vues éditoriales, checklist ; échéance de session renouvelable |
| Présente consolidation V2 | Mise à jour demandée ; aucun accord de clôture globale ou de développement déduit |

Les notes de validation ultérieures font autorité sur les mentions historiques « proposé »/« non validé ». L’acceptation porte sur les documents et leurs limites ; elle ne transforme ni une version candidate en installation vérifiée, ni une checklist en audit, ni une image en fonction.

## Session : règle actuelle V2

La [règle de session V2](BELLE_RIVE_PREPARATION_SESSION_V2.md) remplace uniquement l’ancien plafond absolu de la préparation d’accès V1.

- Inactivité : 30 minutes ; avertissement deux minutes avant expiration.
- Durée : échéance de quatre heures renouvelable explicitement, sans plafond absolu empêchant les prolongations ; au moins dix prolongations successives possibles pour chaque limite.
- L’action protégée « Prolonger la session » réinitialise les deux échéances depuis confirmation serveur ; l’activité ordinaire ne prolonge pas silencieusement les quatre heures.
- Sans action : expiration et reconnexion, sans publication automatique. Arrêt et déconnexion invalident toujours la session ; protections d’origine, de session et de jeton conservées.

La nouvelle [vue fixe d’avertissement](../outputs/BELLE_RIVE_SESSION_AVERTISSEMENT_V2.png) et les précisions d’interface de la fiche V2 sont des compléments proposés après décision. Le principe de renouvellement est acquis, sans nouveau vote nécessaire. Les détails d’activité reconnue, d’onglet suspendu et d’annonce se vérifieront selon le contrat V2 et les protocoles A-07/M-07/M-08 ; aucun comportement accessible déjà prouvé.

## Index complet de reprise

| Bloc | Références |
|---|---|
| Origine | [Cadrage V1](BELLE_RIVE_CADRAGE_V1.md), [périmètre BR-C1](BELLE_RIVE_BR_C1_PERIMETRE_V1.md) |
| Parcours | [Trois fiches](BELLE_RIVE_BR_C1_PARCOURS_V1.md), [scénario éditorial](BELLE_RIVE_BR_C1_EDITORIAL_V1.md) |
| Contenus | [Architecture](BELLE_RIVE_BR_C2_ARCHITECTURE_V1.md), [modèle](BELLE_RIVE_BR_C2_MODELE_CONTENUS_V1.md), [corpus](BELLE_RIVE_BR_C2_CORPUS_V1.md) |
| Visuel public | [Direction BR-C3](BELLE_RIVE_BR_C3_DIRECTION_VISUELLE_V1.md), [revue](BELLE_RIVE_BR_C3_REVUE_V1.md), [accueil](../outputs/BELLE_RIVE_BR_C3_ACCUEIL_V1.png), [détail](../outputs/BELLE_RIVE_BR_C3_DETAIL_V1.png), [étroit](../outputs/BELLE_RIVE_BR_C3_MOBILE_V1.png), [états](../outputs/BELLE_RIVE_BR_C3_ETATS_V1.png) |
| Contrat fonctionnel | [C-01 à C-25](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md), [options techniques](BELLE_RIVE_BR_C4_OPTIONS_TECHNIQUES_V1.md), [synthèse BR-C4](BELLE_RIVE_BR_C4_SYNTHESE_V1.md) |
| Preuve | [M-01 à M-13](BELLE_RIVE_BR_C4_MATRICE_PREUVES_V1.md), [checklist 55 critères/17 vues et A-01 à A-08](BELLE_RIVE_FINITIONS_ACCESSIBILITE_V1.md) |
| Technique détaillée | [Dépendances initiales](BELLE_RIVE_PREPARATION_DEPENDANCES_V1.md), [compilation/types précisés](BELLE_RIVE_FINITIONS_COMPILATION_V1.md), [jeu direct exact/avis](BELLE_RIVE_FINITIONS_DEPENDANCES_V1.md), [stockage](BELLE_RIVE_PREPARATION_STOCKAGE_V1.md) |
| Accès et recette | [Accès/lancement V1](BELLE_RIVE_PREPARATION_ACCES_LANCEMENT_V1.md) amendé par [session V2](BELLE_RIVE_PREPARATION_SESSION_V2.md), [environnements et budgets](BELLE_RIVE_PREPARATION_RECETTE_SYNTHESE_V1.md) |
| Édition visuelle | [Description](BELLE_RIVE_FINITIONS_EDITORIAL_V1.md), [six vues fixes](../outputs/BELLE_RIVE_FINITIONS_EDITORIAL_V1.png), [bilan de finition](BELLE_RIVE_FINITIONS_BILAN_V1.md) |
| État final de ce passage | [Bilan des points ouverts V2](BELLE_RIVE_POINTS_OUVERTS_V2.md) |
| Portfolio | [Clôture étape 1](ETAPE_1_CLOTURE.md), [gabarit Voir/Essayer/Examiner](ETAPE_1_ETUDE_DE_CAS_V1.md), [stratégie de preuve](ETAPE_1_PREUVES_ET_RECETTE_V1.md) |

## Budgets conservés, aucune mesure exécutée

Réponse HTML/recherche locale : médiane ≤200 ms et maximum ≤500 ms ; enregistrement/publication réussie : médiane ≤500 ms et maximum ≤1000 ms ; démarrage ≤5 s ; page initiale ≤750 Kio ; zéro requête distante nécessaire. Les protocoles acceptés demeurent dans la préparation recette, notamment nombre de mesures, échauffement et conditions de copie.

Objectifs de présentation : largeurs 320/390/768/1440 px, zoom 200 %, cibles 44 px. Edge, Firefox, NVDA/Firefox et reprise dans un dossier propre sont prévus, sans disponibilité ou compatibilité supposées. Une émulation étroite et un second dossier ne valent ni téléphone physique ni seconde machine.

## Bilan des preuves et statut final du passage

| Nature | État réel |
|---|---|
| Documents et décisions | Rédigés, liens de reprise disponibles, validations explicites conservées |
| Dessins fixes | BR-C3, six vues éditoriales et avertissement V2 créés et inspectés localement selon leurs notes ; aucune interface fonctionnelle |
| Palette | Six calculs de couples conservés dans BR-C3, sans audit global |
| Sources externes | Références et revue limitée des avis datées dans les finitions ; aucune nouvelle vérification web dans cette consolidation |
| Logiciel, sécurité, stockage et reprise | Aucun produit réalisé ; tests non exécutés |
| Accessibilité et performance | Checklist/protocoles disponibles ; résultats non testés/non mesurés |
| Compréhension humaine | Session prévue ; aucun participant, verbatim ou résultat inventé |

Les finitions D-01 à D-04 sont traitées et acceptées dans leur portée documentaire ; AV-01 est tranché. Le reliquat est décrit dans le bilan V2 : compatibilité réelle, chaîne transitive, revue de sécurité partielle à compléter, moyens et recettes futures. Les compléments proposés de session ne rouvrent pas l’arbitrage acquis.

**Aucun nouvel arbitrage indispensable n’est identifié pour cette consolidation.** La prochaine décision de gouvernance pourrait être l’acceptation d’une clôture documentaire avec les limites nommées ; elle n’est pas prononcée ici. Il n’est pas nécessaire de fabriquer des tests ou d’inventer un nouveau lot de fonctions pour dresser ce bilan.

## Conservation et contrôles de ce passage

Dossier actif portfolio vérifié ; notes de validation, V1 et règle V2 relues ; statuts rapprochés ; liens locaux contrôlés et empreintes consignées dans le [manifeste V2](../outputs/BELLE_RIVE_CONSOLIDATION_MANIFESTE_V2.json). Les versions antérieures restent intactes ; le README est orienté vers cette V2. Recherche mémoire ciblée sans résultat pertinent utilisé.

Le manifeste identifie des fichiers, pas leur qualité ni leur acceptation. Aucun développement, installation produit, création de base, lancement, test produit, publication ou exposition réseau exécuté ou autorisé par cette consolidation. **Conception uniquement.**
