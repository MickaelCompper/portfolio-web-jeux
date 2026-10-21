# Belle-Rive — Validation documentaire de BR-C4

21 octobre 2026.

## Décision utilisateur

Mickaël COMPPER a déclaré : « Validé pour BR-C4 et l’orientation technique proposée, toujours en conception uniquement. »

**BR-C4 V1 et l’orientation technique C sont validés sur le plan de la conception.** Cette décision accepte le contrat de comportements et d’erreurs, la comparaison technique et la matrice de preuve appliquée comme bases documentaires pour la suite.

Références acceptées :

- [Comportements et erreurs V1](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md).
- [Options techniques V1](BELLE_RIVE_BR_C4_OPTIONS_TECHNIQUES_V1.md).
- [Matrice de preuve appliquée V1](BELLE_RIVE_BR_C4_MATRICE_PREUVES_V1.md).
- [Synthèse V1](BELLE_RIVE_BR_C4_SYNTHESE_V1.md).

## Orientation retenue

Petite application locale avec rendu serveur, SQLite, quatre contenus et édition persistante limitée à leurs révisions ; recherche sur les seules versions publiques. Socle de conception : TypeScript côté serveur, gabarits HTML, CSS et JavaScript navigateur limité aux améliorations utiles.

Un seul acteur éditorial, accès de boucle locale, protections d’écriture explicites, conservation des révisions et identification des opérations de publication. Aucun hébergement ou accès réseau ajouté. Cette architecture reste à réaliser et à éprouver ; sa validation ne prouve aucune propriété du futur logiciel.

Runtime, bibliothèque HTTP, moteur de gabarits, pilote SQLite et versions restent à préciser dans la préparation technique documentaire. Les environnements de recette, le budget de performance et la couverture de l’évaluation d’accessibilité restent ouverts conformément à la matrice ; ils seront fixés avant les essais concernés, sans assouplissement rétrospectif des critères.

## Portée de la validation

La matrice appliquée est acceptée comme plan de preuve ; les contrôles M-01 à M-13 restent prévus, non exécutés, avec résultats non testés ou non mesurés et preuves produit absentes. Aucun PASS technique, humain, de sécurité ou de conformité n’est déclaré.

Les documents V1 restent inchangés. Leurs mentions « proposé » ou « non validé » décrivent leur état historique ; cette note consigne la décision ultérieure. Les détails BR-C1/BR-C2 repris explicitement dans le contrat BR-C4 servent cette base acceptée ; aucune validation générale de tout élément antérieur ou extérieur à ce contrat n’est déduite.

La direction visuelle [BR-C3 V1](BELLE_RIVE_BR_C3_VALIDATION.md) reste validée. L’étape 1 du portfolio reste clôturée, son report historique conservé sans réussite rétroactive. Belle-Rive reste fictive, démonstrateur personnel futur sans référence client ; les autres concepts, leur univers partagé et l’ordre global restent ouverts.

## Limite d’autorisation et suite

**Conception uniquement.** Aucun développement, installation de socle produit, création de base, lancement de site ou de démonstrateur fonctionnel, test produit, publication, hébergement ou engagement contractuel n’est autorisé par cette décision.

La suite recommandée dans ce périmètre est une fiche de préparation technique : dépendances et versions motivées, modèle de stockage documentaire, accès éditorial et protections, conditions de lancement et paramètres de recette encore ouverts. Cette recommandation ne crée pas un nouveau jalon validé ni une autorisation de réalisation. La présente opération consigne la décision ; elle ne lance pas cette préparation.
