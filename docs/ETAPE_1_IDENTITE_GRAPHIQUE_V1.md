# Étape 1 — Identité graphique détaillée

Version 1 — 21 octobre 2026. Proposition de conception ; aucun développement.

## 1. Décisions et livrables

La stratégie de preuve et les grilles de `ETAPE_1_PREUVES_ET_RECETTE_V1.md` sont désormais validées par l’utilisateur. Les documents précédents restent conservés dans leur état historique. Les validations antérieures du positionnement, de l’identité personnelle, de la direction graphique générale, de la signature, de l’accroche, de la structure de l’accueil et du modèle d’étude de cas demeurent acquises.

Cette fiche propose les détails graphiques, sans présumer leur acceptation. Elle est accompagnée de deux planches comparatives réunies dans `../outputs/ETAPE_1_PLANCHES_GRAPHIQUES_V1.svg`. Ce document vectoriel illustre des principes graphiques ; ce n’est ni un site, ni une maquette fonctionnelle, ni une capture de démonstrateur. Aucun projet réel ou fictif n’y est sélectionné.

Belle-Rive, les six concepts et leur ordre restent ouverts. Le nom public demeure à renseigner. La clôture de l’étape 1 n’est pas déclarée.

## 2. Deux pistes comparées dans la direction validée

Les deux pistes déclinent la base éditoriale claire et les visuels expressifs déjà validés. La comparaison ne rouvre pas le choix d’un portfolio personnel.

| Piste | Expression | Atout | Vigilance |
|---|---|---|---|
| A — Papier et encre, recommandée | Fond ivoire, titres Georgia, textes Segoe UI, accent vert profond, composition généreuse | Relie lecture éditoriale, soin visuel et médiation ; personnalité discrète sans dépendre d’un univers de projet | Éviter les ornements patrimoniaux et les longs titres en capitales |
| B — Grille et couleur | Fond blanc, Segoe UI pour l’ensemble, blocs colorés et titres plus compacts | Lecture directe et continuité avec les interfaces interactives | Risque d’aspect générique si le soin des visuels manque |

**Recommandation : A.** Utiliser la chaleur du papier et la forme des titres pour l’identité personnelle, puis laisser aux projets leur propre langage visuel. B reste une alternative, pas une seconde identité à mélanger à parts égales.

## 3. Palette proposée

| Rôle | Couleur | Usage |
|---|---|---|
| Fond principal | `#F7F5EF` | Fond ivoire clair de lecture |
| Surface | `#FFFFFF` | Documents, cartes ou encarts ponctuels |
| Texte principal | `#202D32` | Titres, corps et informations essentielles |
| Texte secondaire | `#526168` | Légendes et métadonnées ; aucune baisse d’opacité supplémentaire |
| Accent principal | `#17645F` | Liens, action principale, repères de section |
| Accent expressif | `#A4412B` | Petite ponctuation, annotation ou illustration ; usage modéré |
| Teinte d’accompagnement | `#E3EEEA` | Fond d’encart ; texte principal foncé |
| Séparateur décoratif | `#D7DCD8` | Filets non indispensables à la compréhension ; pas de contour essentiel reposant sur ce seul gris |

Le vert est une couleur d’identité, pas un statut « réussi ». L’ocre rouge n’est pas réservé aux erreurs. Les états de preuve utilisent d’abord des libellés explicites ; ne jamais transformer une couleur en seul moyen d’information.

### Calculs de contraste exécutés sur les couleurs proposées

Calcul numérique effectué le 21 octobre 2026 : conversion des composantes sRGB en luminance linéaire, puis rapport `(L claire + 0,05) / (L sombre + 0,05)`. Valeurs arrondies à deux décimales, pour couleurs opaques uniformes.

| Premier plan / fond | Rapport calculé |
|---|---|
| Texte principal / ivoire | 12,99:1 |
| Texte secondaire / ivoire | 5,89:1 |
| Vert / ivoire | 6,37:1 |
| Blanc / vert | 6,94:1 |
| Ocre rouge / ivoire | 5,72:1 |
| Vert / blanc | 6,94:1 |

Ces calculs sont une vérification de paires de couleurs, pas un audit d’accessibilité. Les superpositions, images, états interactifs, rendus et associations non listées restent à vérifier. Ne pas écrire de texte directement sur une capture chargée ; utiliser une zone de légende séparée.

## 4. Typographies et hiérarchie proposées

**Titres : Georgia**, avec repli sur une police à empattements du système. **Corps et interface : Segoe UI**, puis Arial ou sans empattements du système. Aucun fichier de police téléchargé, copié ou incorporé à cette étape ; cette proposition utilise les familles disponibles dans l’environnement et des replis à vérifier ultérieurement sur les plateformes visées. La redistribution éventuelle d’une police nécessiterait une vérification propre.

| Rôle | Taille de référence proposée | Traitement |
|---|---|---|
| Accroche principale | 48–56 px sur grand format ; 32–36 px sur petit format | Georgia, graisse normale, interligne environ 1,15 ; alignement à gauche |
| Titre de section | 32–36 px ; 26–28 px sur petit format | Georgia ; interligne environ 1,2 |
| Titre de projet ou sous-section | 22–24 px | Segoe UI demi-gras ; interligne environ 1,3 |
| Corps | 18 px | Segoe UI, interligne environ 1,55–1,65 |
| Navigation et actions | 16–18 px | Segoe UI demi-gras ; libellés explicites |
| Légendes et métadonnées | 16 px | Segoe UI ; interligne environ 1,5 |

Ces valeurs guident une future maquette et ne fixent pas de hauteur de bloc. Permettre le retour à la ligne, l’agrandissement et la longueur réelle du nom. Viser environ 55–75 caractères par ligne pour les paragraphes, sans forcer de sauts manuels. Ne pas justifier les textes ; limiter les capitales aux rares repères courts.

Le nom public est la signature visuelle principale. Aucun monogramme, emblème civique ou logo complexe n’est nécessaire. La signature validée reste : « [Prénom Nom] — Conception et développement web & jeux vidéo ».

## 5. Composition et rythme

- Une largeur de composition de référence d’environ 1 200 px ; texte courant dans une colonne d’environ 680–760 px, ajustable à la typographie.
- Sur grand format, une introduction ou un projet peut associer texte et média ; sur petit format, une colonne avec texte puis média, dans l’ordre éditorial validé.
- Marges de référence : 48–64 px sur grand format et 20–24 px sur petit format. Espacement fondé sur des multiples de 8 px ; séparation entre sections d’environ 64–96 px, réduite selon le format.
- Un grand projet mis en avant, puis éventuellement deux colonnes de projets complémentaires ; une seule colonne sur petit format. Aucun emplacement vide pour atteindre un nombre de concepts.
- Cartes simples, bord fin si utile et arrondi léger d’environ 8 px ; pas d’ombre lourde. Les limites nécessaires à l’identification d’un contrôle devront utiliser une couleur suffisamment distincte, à vérifier au rendu.
- Tableaux de preuve lisibles et légendés ; prévoir une présentation adaptée aux petits formats sans supprimer les colonnes importantes. Leur comportement exact appartient à la future conception de l’interface.

Les tailles et espacements sont des propositions de départ, pas des mesures d’un écran réalisé.

## 6. Visuels et langage illustratif

**Captures de projet :** montrer une vue réellement pertinente de la version présentée. Garder les proportions ; si un détail est recadré, le signaler. Éviter les faux cadres de navigateur et mises en situation qui suggèrent un appareil ou un déploiement non testé.

**Cohérence des vignettes :** zone de référence proche de 16:10 pour la sélection, avec fond neutre et possibilité de marges internes lorsque le média possède un autre format. Ne pas couper une information importante pour remplir le cadre. Les études de cas peuvent montrer les proportions originales.

**Légendes :** titre, nature du projet, version et explication de la vue. Le statut « démonstrateur personnel » reste visible en texte, sans apparence de certification.

**Illustrations originales futures :** formes géométriques simples, aplats, silhouettes lisibles et détails choisis ; limiter les textures et effets décoratifs. L’illustration sert une idée précise. Le style du portfolio n’impose pas une palette ou un univers aux futurs jeux.

**Annotations :** traits sobres, numéros et courts commentaires hors des zones importantes. Une image annotée reste distincte d’une capture brute, avec sa version source.

**Absence de média :** dans les documents de conception, utiliser une zone explicitement intitulée « emplacement de média ». Ne pas produire une fausse capture pour combler un manque. Les formes abstraites des planches sont des exemples graphiques sans signification fonctionnelle.

## 7. Actions, états et repères

| Élément | Présentation proposée | Règle |
|---|---|---|
| Action principale | Fond vert, texte blanc, forme simple | Une priorité nette par bloc ; libellé orienté vers une destination réelle |
| Lien de texte | Vert, souligné | Reste identifiable sans perception de la couleur |
| Action secondaire | Lien souligné ou contour vert | Pas de concurrence visuelle avec l’action principale |
| Focus futur | Contour vert séparé du contrôle par un espace clair | Ne pas le supprimer ; visibilité à contrôler dans chaque contexte réel |
| Statut documentaire | Libellé foncé sur fond clair | « Prévu », « exécuté », « non testé », « non mesuré » ; pas de badge de réussite décoratif |
| Alerte ou anomalie | Titre explicite, texte et repère graphique | Aucun sens transmis par la couleur seule |

Prévoir des cibles d’action généreuses, de référence autour de 44 px de hauteur minimum, avec espaces entre actions ; vérifier les dimensions réelles et les exigences applicables au stade de la réalisation. Ces règles ne constituent pas des composants implémentés.

Pas d’animation nécessaire à la compréhension, de carrousel automatique ou de lecture vidéo automatique. Toute animation éventuellement proposée plus tard devra préserver la lecture et les préférences de réduction du mouvement. Aucun effet n’est développé ici.

## 8. Application aux trois entrées d’étude de cas

**Voir :** place généreuse aux médias légendés, à une narration courte et aux choix de conception ; fond ivoire et repères verts.

**Essayer :** encart clair avec état réel de disponibilité, conditions et action explicite. Une capture ne ressemble pas à un bouton de lancement si aucun essai n’existe.

**Examiner :** priorité aux textes, tableaux et liens de pièces ; hiérarchie stable, chiffres contextualisés, anomalies aussi visibles que les résultats favorables. Éviter l’accumulation de badges ou de pourcentages décoratifs.

Le langage graphique reste commun aux projets web et jeux. La couleur ne sépare pas les références clients des démonstrateurs ; leur nature est écrite.

## 9. Vérifications et arbitrages

**Effectué :** rédaction de cette fiche, création du document vectoriel comparatif et calcul des six paires de contraste listées. Les planches présentent des styles à examiner ; elles ne constituent pas une validation esthétique par l’utilisateur.

**À exécuter ultérieurement :** contrôle visuel du rendu dans les supports visés, polices et replis, retours à la ligne, petit écran, agrandissement, focus et commandes ; relecture par un lecteur extérieur. Aucun test produit, audit d’accessibilité ou essai utilisateur effectué ici.

**Critères proposés de validation de l’identité :**

1. Une piste est choisie explicitement ; la recommandation A n’est pas une décision acquise.
2. Palette, rôles typographiques et rythme conviennent au positionnement validé.
3. Le portfolio garde sa cohérence sans dépendre de Belle-Rive ou d’un projet précis.
4. Les visuels peuvent être expressifs sans masquer statut, rôle et preuves.
5. Les règles distinguent calcul de contraste, rendu futur et conformité non établie.

**État de l’étape 1 :** stratégie de preuve et grilles validées ; identité graphique détaillée proposée. Nom public, présentation factuelle, contact et inventaire des contenus restent à renseigner. Matrice appliquée à un premier candidat non remplie tant que la sélection reste ouverte. Consolidation et acceptation finale du dossier encore nécessaires ; aucune étape suivante n’est lancée.
