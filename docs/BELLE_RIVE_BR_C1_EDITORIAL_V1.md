# Belle-Rive — BR-C1 — Scénario éditorial

Version 1 — 21 octobre 2026 — Conception uniquement ; mécanisme proposé, non validé ni réalisé.

Base acquise : [cadrage validé](BELLE_RIVE_VALIDATION_CADRAGE.md). Liens : [parcours V1](BELLE_RIVE_BR_C1_PARCOURS_V1.md), [périmètre V1](BELLE_RIVE_BR_C1_PERIMETRE_V1.md).

## Objectif et acteur hypothétiques

Une personne chargée des contenus dans l’équipe fictive prépare une fermeture exceptionnelle de l’accueil de la mairie. Elle doit distinguer ce qu’elle prépare de ce que le public peut lire. Ce rôle est un personnage de scénario, pas un compte, une équipe réelle ou une responsabilité contractuelle attribuée.

Recommandation : modifier IP-01, plutôt que créer une seconde fiche publique d’horaires. Cela limite les contradictions et donne un changement vérifiable. Le mode d’administration, l’authentification éventuelle d’un outil et le stockage restent ouverts ; aucun CMS choisi. Aucun compte usager public ajouté.

## État initial proposé

- IP-01 publiée, révision de scénario r1 : horaires ordinaires indiqués dans la fiche P1 ; aucune exception.
- Accueil, rubrique et recherche renvoient à cette fiche. Recommandation : éviter de recopier les horaires dans leurs résumés.
- Date de préparation fictive : 10 novembre 2026. Exception à préparer : 18 novembre, après-midi fermé, matin maintenu. Ces dates ne sont pas des publications exécutées.

## Déroulement à concevoir

| Étape | Action fictive | Retour et état attendus |
|---|---|---|
| 1 — Créer un brouillon | Ouvrir IP-01 et préparer une nouvelle révision depuis r1 | Brouillon r2 nommé ; r1 reste la version publique |
| 2 — Modifier | Ajouter date, période et texte « Accueil fermé mercredi 18 novembre après-midi ; ouverture maintenue de 9 h à 12 h » | Les horaires ordinaires restent distincts de l’exception |
| 3 — Relire | Vérifier titre, contenu, date et période ; consulter une représentation de la version préparée si le futur outil le permet | Mention « Brouillon — non publié » ; aucun partage présenté comme public |
| 4 — Publier explicitement | Confirmer la publication de la révision relue | Retour identifiant r2 comme publiée ; confirmation seulement après succès effectif |
| 5 — Retrouver le public | Consulter IP-01 par la rubrique puis la recherche | r2 visible, exception présente, même contenu ; brouillon non listé séparément |
| 6 — Reprendre après l’exception | Préparer une révision r3 retirant l’avis arrivé à échéance, puis publier explicitement | Horaire ordinaire conservé ; historique r1/r2 préservé selon mécanisme à choisir |

La création d’un brouillon est ici la préparation d’une révision de contenu existant. La création libre de nouvelles pages n’est pas nécessaire pour montrer ce scénario ; son éventuel ajout demanderait de préciser le périmètre. Retrait manuel de l’exception recommandé pour le premier lot : aucune programmation automatique de publication ou de dépublication promise.

## Échecs à prévoir, sans fonction supposée disponible

| Situation | Comportement recommandé | Limite à rendre visible |
|---|---|---|
| Date ou période absente | Empêcher la publication de l’exception ; indiquer le champ à corriger et conserver la saisie | Les champs obligatoires seront spécifiés en BR-C2 |
| Sortie avant enregistrement | Avertir d’une modification non enregistrée si le futur outil sait la détecter | Ne jamais afficher « enregistré » sans persistance confirmée |
| Enregistrement échoué | Message explicite ; distinguer contenu saisi et brouillon enregistré | Conservation exacte à définir selon architecture |
| Publication échouée | Ne pas annoncer un succès ; identifier la dernière version publique connue et proposer une nouvelle tentative | La récupération effective devra être testée |
| Ancienne information encore affichée | Signaler une divergence lors de la vérification publique ; conserver l’anomalie | Cache/index et cohérence sont des choix techniques ouverts |
| Erreur éditoriale après publication | Préparer une correction et la publier comme nouvelle révision | Pas de bouton de restauration promis ; aucune suppression silencieuse de l’historique |

L’édition simultanée par plusieurs personnes et les circuits de validation à plusieurs rôles sont différés. Le scénario s’effectue avec un seul acteur fictif. Cette simplification ne prouve pas une aptitude à l’exploitation municipale.

## Critères et pièces futures

| ID | Critère proposé | Preuve future |
|---|---|---|
| ED-01 | Avant publication de r2, seul r1 est consultable dans les surfaces publiques | Journal des états et captures du brouillon, de la rubrique et de la recherche |
| ED-02 | Après succès, IP-01 affiche r2 et son exception par les deux entrées | Recette datée avec identifiants de contenu/révision |
| ED-03 | Une exception incomplète ne produit pas une publication annoncée réussie | Cas de champs manquants et observation du retour |
| ED-04 | Un échec de publication n’est pas présenté comme un succès | Échec contrôlé sur future architecture ; état public observé et limites conservées |
| ED-05 | La correction conserve une trace des versions antérieures | Pièces r1/r2/r3 et historique selon mécanisme retenu |
| ED-06 | Une personne distingue brouillon, enregistré et publié | Session de compréhension distincte des contrôles techniques ; réponses et aides conservées |

**État commun : prévu, non exécuté ; résultat non testé ; pièce d’exécution absente.** Aucun écran d’administration, stockage, versionnement logiciel ou publication n’existe du fait de cette rédaction. Les identifiants r1/r2/r3 désignent seulement des états de scénario.

## Recommandation pour la suite

BR-C2 décrira les champs et les sources uniques des contenus. BR-C4 comparera les moyens techniques permettant réellement de préparer, publier et conserver les révisions. Si une future présentation n’est qu’une simulation, elle devra le dire et ne pourra établir ED-01 à ED-05 comme preuves de persistance ou de publication effective.
