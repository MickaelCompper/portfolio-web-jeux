# Portfolio Web & Jeux vidéo

## Belle-Rive — correctif local 0.1.1

Le [bilan de correction V2](docs/BELLE_RIVE_REPRISE_CORRECTION_V2.md) documente le diagnostic et l’assemblage local du serveur. Trois reprises neuves mesurées à 0,684 / 0,725 / 0,719 s, sous le budget inchangé de 5 s ; contrôles concernés rejoués et preuves V1 conservées. [Notice active](work/belle-rive-lot1/NOTICE.md). Aucun déploiement ni acceptation utilisateur déduits. Le paragraphe suivant décrit le lot initial 0.1.0.

## Belle-Rive — premier lot local réalisé

Le 21 octobre 2026, une instruction distincte a autorisé le premier lot de réalisation et sa recette locale. Version 0.1.0 examinable dans [work/belle-rive-lot1](work/belle-rive-lot1/NOTICE.md) ; [bilan mesuré V1 et limites](docs/BELLE_RIVE_LOT1_BILAN_V1.md). Aucune publication ni acceptation utilisateur déduite. Un démarrage de reprise dépasse le budget de 5 s ; humain, assistance et plusieurs environnements restent non évalués. Les paragraphes historiques ci-dessous sont conservés.

Portfolio personnel de développement web et de jeux vidéo : démonstrateurs interactifs, conception, études de cas et preuves techniques. Les démonstrateurs personnels ne sont pas des références clients.

Dépôt distant : `git@github.com:MickaelCompper/portfolio-web-jeux.git`.

## Structure du dépôt

```text
docs/       Plans, conception, décisions et validations versionnées
projects/   Prochains démonstrateurs, chacun dans son sous-dossier
assets/     Médias partagés et informations de droits
tests/      Futurs tests transversaux
reports/    Futurs rapports sélectionnés
work/       Travaux existants, scripts et prototype Belle-Rive
outputs/    Planches, captures et manifestes existants
archives/   Versions historiques conservées
```

Le prototype existant reste dans `work/belle-rive-lot1` : [instructions de lancement](work/belle-rive-lot1/NOTICE.md), [dépendances](work/belle-rive-lot1/package.json), tests dans `work/belle-rive-lot1/tests/` et preuves dans `work/belle-rive-lot1/evidence/`. Suivre sa notice pour l'installation et l'initialisation : les dépendances, le runtime portable et la base locale ne sont pas distribués par Git. Les secrets affichés au lancement ne doivent pas être enregistrés dans le dépôt.

## Conception et preuves

- [Plan de l'étape 1](docs/ETAPE_1_PLAN.md) et [clôture documentaire](docs/ETAPE_1_CLOTURE.md).
- [Conception Belle-Rive consolidée V2](docs/BELLE_RIVE_DOSSIER_CONSOLIDE_V2.md).
- Les constats historiques ci-dessous correspondent à leurs étapes respectives ; consulter les documents et preuves de chaque version pour son état effectif. Cette réorganisation ne prononce aucune validation supplémentaire.

Conserver sources, lockfiles, documents de conception et preuves sélectionnées. Le `.gitignore` exclut dépendances téléchargées, compilations, caches, secrets et bases locales ; il ne supprime aucun fichier. Les livrables volumineux pourront être distribués séparément dans les Releases. Aucune licence de redistribution générale n'est accordée par ce README.

Le README antérieur à cette organisation est conservé dans `archives/README_AVANT_STRUCTURE_GIT_2026-10-21.md`. Les sections suivantes sont conservées comme historique.

Dossier de travail commun : C:\Users\micka\Documents\ChatGPT\portfolio

## État au 21 octobre 2026

Les deux conversations sont rattachées au projet portfolio. Le rattachement au projet ne change pas automatiquement leur dossier actif : vérifier ce dossier dans l’interface avant les prochains travaux.

- Conversation de cadrage : 01a15d85-13ed-7280-9f17-d0bfb35f1591
- Planification étape 1 : 01a15d95-b283-7aa0-8689-f1f3cc432a54

## Clôture documentaire de l’étape 1 — 21 octobre 2026

L’utilisateur a accepté l’accueil V2 et la clôture documentaire de l’étape 1 avec les limites et le report convenus. Référence actuelle : [note de clôture](docs/ETAPE_1_CLOTURE.md), avec liens vers les livrables validés. Les documents et versions antérieurs sont conservés comme historique.

Aucune réalisation disponible ; matrice de preuve appliquée à un premier candidat reportée explicitement. Belle-Rive, les six concepts et leur ordre restent ouverts. Aucun développement, création de site, publication ou démonstrateur n’est autorisé par cette clôture.

## Organisation des fichiers

- docs/ETAPE_1_PLAN.md : copie du plan produit dans le second chat.
- work/ : futurs travaux.
- outputs/ : livrables.
- archives/ : archives futures.

Les anciens dossiers ont été inspectés : aucun fichier présent, seulement work/ et outputs/ vides dans le second. Ils sont conservés sans suppression. Aucun développement ni publication autorisé par cette opération.

## Belle-Rive — Accès au dossier de conception consolidé

**Conception clôturée sur le plan documentaire le 21 octobre 2026**, après acceptation du dossier consolidé V2 et du bilan final, avec leurs limites et points ouverts. Référence actuelle : [note de clôture de conception](docs/BELLE_RIVE_CONCEPTION_CLOTURE.md). Aucun développement ni test produit autorisé ou lancé par cette clôture. Les paragraphes de consolidation ci-dessous conservent leur état historique antérieur à cette décision.

Mise à jour documentaire du 21 octobre 2026. Les états ci-dessus relatent l’historique de l’étape 1 ; la sélection et la conception de Belle-Rive ont depuis progressé selon leurs validations distinctes. L’étape 1 reste clôturée.

- [Dossier de conception consolidé V2](docs/BELLE_RIVE_DOSSIER_CONSOLIDE_V2.md) : référence actuelle intégrant les finitions validées et la règle de session V2 ; [V1 conservée](docs/BELLE_RIVE_DOSSIER_CONSOLIDE_V1.md).
- [Bilan final des points ouverts V2](docs/BELLE_RIVE_POINTS_OUVERTS_V2.md) : état actuel des finitions, reliquats et preuves futures ; [V1 conservée](docs/BELLE_RIVE_POINTS_OUVERTS_V1.md).
- [Validation de la préparation technique](docs/BELLE_RIVE_PREPARATION_VALIDATION.md), après validation du cadrage, de BR-C3 et de BR-C4.

Le cadrage, la direction visuelle, le contrat BR-C4 et la préparation technique sont validés dans leurs périmètres documentaires. La consolidation ne prononce pas une clôture globale. Aucun portail fonctionnel ni test produit réalisé ; conception uniquement, sans autorisation de développement, lancement ou publication. Les autres concepts, leur univers partagé et l’ordre global restent ouverts.

Les [quatre finitions et l’arbitrage AV-01 sont validés](docs/BELLE_RIVE_FINITIONS_VALIDATION.md). La [règle de session V2](docs/BELLE_RIVE_PREPARATION_SESSION_V2.md) remplace le plafond absolu de quatre heures par une échéance explicitement renouvelable avec avertissement deux minutes avant. La compatibilité effective, la revue de sécurité encore partielle et les recettes futures restent des limites explicites du dossier.

