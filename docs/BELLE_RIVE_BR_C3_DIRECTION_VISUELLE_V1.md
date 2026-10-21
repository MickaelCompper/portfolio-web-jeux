# Belle-Rive — BR-C3 — Direction visuelle proposée

Version 1 — 21 octobre 2026. Proposition à examiner ; conception statique uniquement.

## Intention et statut

Le « Continue » autorise la poursuite de la conception BR-C3 ; il ne vaut pas validation esthétique des vues produites. Le [cadrage accepté](BELLE_RIVE_VALIDATION_CADRAGE.md) est conservé, les détails [BR-C1](BELLE_RIVE_BR_C1_PERIMETRE_V1.md) et [BR-C2](BELLE_RIVE_BR_C2_ARCHITECTURE_V1.md) restent des propositions de travail. L’étape 1 du portfolio reste clôturée.

**Recommandation : une composition éditoriale claire autour du papier, de la rivière et des berges.** Elle reprend de la direction V2 du portfolio la hiérarchie typographique, les espaces, les tons naturels et le soin apporté à l’illustration. Elle propose à Belle-Rive son bleu propre et une scène dessinée à plat, sans imposer un univers commun aux autres concepts.

Il s’agit de quatre planches vectorielles fixes exportées en PNG, pas d’un site. Les éléments ressemblant à des liens ou champs ne sont pas actifs. Le petit script de dessin sert uniquement à produire ces documents graphiques ; aucun développement fonctionnel du portail.

## Planches examinables

| Planche | Contenu et état | Fichiers |
|---|---|---|
| Accueil | Trois parcours ; événement annoncé, scénario S0 | [PNG](../outputs/BELLE_RIVE_BR_C3_ACCUEIL_V1.png) · [SVG](../outputs/BELLE_RIVE_BR_C3_ACCUEIL_V1.svg) |
| Détail | EQ-01, horaires complets, accès inconnu, événement annulé en variante S4 | [PNG](../outputs/BELLE_RIVE_BR_C3_DETAIL_V1.png) · [SVG](../outputs/BELLE_RIVE_BR_C3_DETAIL_V1.svg) |
| Compositions étroites | Accueil S0 et détail S4, chacun dessiné à 390 px | [PNG](../outputs/BELLE_RIVE_BR_C3_MOBILE_V1.png) · [SVG](../outputs/BELLE_RIVE_BR_C3_MOBILE_V1.svg) |
| États difficiles | Deux extraits indépendants : exception S2 et recherche sans résultat S0 | [PNG](../outputs/BELLE_RIVE_BR_C3_ETATS_V1.png) · [SVG](../outputs/BELLE_RIVE_BR_C3_ETATS_V1.svg) |

Le changement annoncé/annulé entre accueil et détail est intentionnel : ce sont deux variantes séparées, pas une session du même portail. Sur un futur produit, chaque variante devra rester cohérente entre toutes les surfaces. Les deux états de la dernière planche ne représentent pas une page unique.

## Règles proposées

| Élément | Proposition | Raison et limite |
|---|---|---|
| Fond | Papier `#F7F4EC` | Lecture calme ; sans texture sur les textes dans cette V1 |
| Texte | Encre `#203B42` | Hiérarchie par taille et espacement, pas par texte gris très pâle |
| Action principale | Bleu rivière `#174F62` | Relier navigation et identité ; pas de fonction ajoutée par le graphisme |
| Surfaces secondaires | Vert clair `#DCE5D6`, variante de carte `#EBEFE5` | Séparer les blocs d’information |
| Annulation | Texte `#783B28`, fond `#F1E3DC` | Mot « ANNULÉ » et message explicite, indépendants de la couleur |
| Exception | Texte `#665018`, fond `#F2E9CC` | Avis daté avant les horaires, plage maintenue écrite |
| Titres | Georgia, environ 25–54 px selon la vue | Caractère éditorial ; choix proposé, pas de police téléchargée |
| Lecture | Segoe UI, généralement 17–22 px sur grand format | Police locale pour ce rendu Windows ; remplacement et métriques à contrôler ailleurs |
| Mise en page large | 1440 px ; marges 64 px ; contenu principal à gauche du détail | Informations utiles prioritaires ; formats fixes, aucun seuil adaptatif validé |
| Mise en page étroite | 390 px ; marges 20 px ; une colonne | Navigation visible, recherche sur sa ligne, rubriques empilées |
| Horaires étroits | Jour puis plages dans une ligne | Conserver toutes les plages et fermetures ; certains jours n’ont qu’une ouverture l’après-midi |
| Images | Illustration géométrique originale de rive | Ambiance imaginaire ; aucun bâtiment identifié, aucune carte ni photo documentaire |

Les petites légendes et la navigation étroite sont des paramètres de travail : taille, agrandissement, retour à la ligne et surfaces tactiles devront être affinés sur une réalisation. Prévoir des cibles d’action d’au moins 44 px de haut comme objectif de conception ; ce n’est pas une mesure exécutée sur ces liens dessinés. La disposition des horaires devra également rester lisible si les textes grossissent.

## Présentation et contenu

L’indication « Démonstration personnelle — commune et données fictives » est visible en tête et répétée en pied. L’accueil privilégie les trois entrées plutôt qu’un carrousel ou des actualités non prévues. Les horaires ne sont pas dupliqués sur les cartes.

L’événement annulé conserve son titre et sa date ; il n’y a pas d’action d’inscription. L’inconnu sur l’accès physique est nommé sans pictogramme de conformité. Le champ de recherche illustré est une intention de commande, pas un champ utilisable ; sa saisie, son nom accessible et ses états seront spécifiés en BR-C4.

Sur mobile, l’illustration de l’accueil passe après les informations et l’événement. La fiche étroite privilégie le texte et ne reprend pas son illustration latérale ; la description et la limite sur l’emprunt restent présentes. Les identifiants techniques S0/S4/EQ-01 et les mentions « vue fixe » sont des annotations de conception, à ne pas transformer en contenu public du futur portail.

## Provenance et reproductibilité

Textes issus du [corpus BR-C2](BELLE_RIVE_BR_C2_CORPUS_V1.md), parfois abrégés pour les extraits ; aucune nouvelle donnée territoriale réelle. Illustration et composition créées dans le [script de dessin](../work/BR_C3_generer_planches_v1.py), avec assistance Codex. Aucun logo municipal, contact réel ou média externe utilisé.

SVG contenant des textes et formes, sans JavaScript, lien actif ou police embarquée. Rendu PNG local par Sharp dans l’environnement fourni. Georgia et Segoe UI sont appelées comme polices locales ; leurs fichiers ne sont pas livrés. Les conditions d’une éventuelle diffusion de ressources et le choix de polices pour un futur site restent à examiner avant publication. Aucun avis juridique déduit.

## Revue et suite

Voir le [compte rendu de vérification visuelle](BELLE_RIVE_BR_C3_REVUE_V1.md). Les rendus fixes ont été inspectés ; cela ne prouve ni l’usage, ni l’accessibilité, ni la compatibilité d’un produit.

**Arbitrage visuel regroupé :** cette direction — palette papier/bleu/berges, typographie éditoriale et illustration de rive — convient-elle comme base pour Belle-Rive ? Les ajustements de densité, de taille et de détail peuvent être exprimés ensemble. En l’absence de réponse, l’orientation reste proposée. Aucune validation utilisateur de BR-C3 consignée à ce stade.

Après examen de l’orientation, BR-C4 pourra préciser les comportements, comparer les moyens techniques et renseigner la matrice appliquée. Le présent dossier n’autorise aucun développement, publication ou test produit.
