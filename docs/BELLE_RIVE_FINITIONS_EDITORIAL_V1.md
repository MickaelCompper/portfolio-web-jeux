# Belle-Rive — Finition D-03 : vues éditoriales fixes

21 octobre 2026 — V1 proposée ; aucun formulaire, compte ou publication créé.

[Planche PNG](../outputs/BELLE_RIVE_FINITIONS_EDITORIAL_V1.png) · [source SVG](../outputs/BELLE_RIVE_FINITIONS_EDITORIAL_V1.svg) · [script de dessin](../work/BELLE_RIVE_FINITIONS_DESSIN_EDITORIAL_V1.py).

La planche reprend papier, encre et bleu de la direction BR-C3 acceptée. Six compositions montrent une séquence et ses branches ; chacune est un extrait de vue, pas une application ou un état exécuté. Texte lisible et annotations de focus séparés des futures commandes. IP-01, dates et horaires sont ceux du corpus fictif ; OP-DEMO-02 est une référence illustrative sans valeur de secret. Aucun horodatage réel de publication inventé.

| Vue dessinée | État | Contrat et sortie |
|---|---|---|
| 01 — Connexion | Champ vide, aucun secret réel | Collage autorisé ; ouvrir l’édition après contrôle futur ; erreur associée au champ ; C-12 et M-07 |
| 02 — Brouillon | S1 après saisie, non enregistré | Base r1 publique ; enregistrer avant confirmation ; après succès seulement, date réelle d’enregistrement ; C-12/13 |
| 03 — Validation refusée | S9, période manquante | Synthèse puis lien/accès au champ ; conserver les autres saisies ; C-18 |
| 04 — Confirmation | Données corrigées et brouillon enregistré | Résumé explicite, retour au brouillon, action « Publier cette révision » ; C-14/15 |
| 05 — Publication à vérifier | Réponse perdue, validation peut avoir eu lieu | Vérifier résultat avec la même opération avant réessai ; ne pas annoncer un échec certain ; C-21/22 |
| 06 — Résultat confirmé | S2, r2 publique dans le scénario | Lien public, r1 conservée ; date réelle seulement lors d’une réalisation ; C-16/17 |

Parcours nominal dessiné : 01→02→04→06. La vue 03 précède un retour au brouillon corrigé. La vue 05 est une branche d’incertitude issue de 04 ; après vérification, 06 seulement si résultat confirmé, sinon explication et réessai contrôlé selon stockage. Pas de retour aveugle « republier ».

## États complémentaires spécifiés sans nouvel écran

- Secret incorrect : message générique, champ secret vidé ; pas d’autre donnée perdue. Temporisation après cinq échecs selon contrat accepté.
- Enregistrement échoué : conserver la saisie dans la page et indiquer non enregistré ; aucune garantie après fermeture.
- Conflit d’onglet : message nommant la divergence de révision/génération ; possibilité de copier la saisie avant rechargement ; aucune fusion automatique.
- Session expirée : explication, accès à la reconnexion, aucune publication automatique au retour ; délai et prolongation à arbitrer AV-01 dans la checklist.
- Déconnexion : invalider la session et revenir à une page nommée, sans supprimer brouillons ou historique persistants.

Les annotations « focus » sont des exigences futures, pas une simulation de navigation. Pas de boîte modale nécessaire : confirmation dans une page dédiée, avec titre et retour explicite. Sur petit écran, les zones sont prévues empilées, labels conservés et actions sur plusieurs lignes si nécessaire ; cette planche ne démontre pas le reflow ni une adaptation à 320 px.

## Revue graphique locale

Rendu SVG→PNG et inspection locale à consigner dans le bilan de finition. Relecture des états et textes par comparaison aux contrats, pas de recette d’usage. Les six vues n’attestent ni protection d’accès, ni persistance, ni bon déplacement du focus. Les tests M-05 à M-09 et la session M-10 restent non exécutés.
