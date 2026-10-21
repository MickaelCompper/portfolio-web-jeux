# Belle-Rive — BR-C2 — Architecture de l’information

Version 1 — 21 octobre 2026. Conception uniquement. Détails proposés, sans validation utilisateur déduite de « Continue ».

Base : [cadrage validé](BELLE_RIVE_VALIDATION_CADRAGE.md), [périmètre BR-C1](BELLE_RIVE_BR_C1_PERIMETRE_V1.md), [parcours](BELLE_RIVE_BR_C1_PARCOURS_V1.md). BR-C1 est repris comme proposition de travail, sans nouvelle validation de ses détails. L’étape 1 reste clôturée.

## Organisation recommandée

Une navigation courte par type de besoin suffit pour quatre contenus. Pas de menu institutionnel exhaustif, de sous-menus territoriaux ou de filtres sans utilité dans ce corpus.

```text
Accueil
├── Informations pratiques
│   ├── Venir à l’accueil de la mairie (IP-01)
│   └── Préparer une visite à l’accueil (IP-02)
├── Agenda
│   └── Histoires au bord de l’eau (EV-01)
├── Équipements
│   └── Médiathèque des Rives (EQ-01)
└── Recherche → résultats / aucun résultat / saisie vide
```

Cette arborescence décrit des destinations futures, pas des pages créées ou des liens essayables. Un détail ouvert directement doit donner accès à sa rubrique et à l’accueil.

## Contenu des vues

| Vue | Ordre de lecture recommandé | Issue et liens |
|---|---|---|
| Socle commun | Nom Belle-Rive ; mention « Démonstration personnelle — commune et données fictives » ; navigation ; accès à la recherche | Retour accueil ; trois rubriques accessibles ; statut fictif également dans le pied de page |
| Accueil | Titre « Les informations utiles à Belle-Rive » ; courte présentation ; trois entrées nommées ; prochain événement du scénario | IP-01 via la rubrique ; EQ-01 via les équipements ; EV-01 via l’agenda et la sélection |
| Informations pratiques | Titre ; introduction ; deux liens avec leurs résumés | Ouvrir IP-01 ou IP-02 ; pas de dossier administratif complet suggéré |
| IP-01 | Titre et résumé ; exception si présente ; horaires ordinaires ; adresse et entrée ; préparation de visite ; date éditoriale fictive | IP-02 ; retour à la rubrique |
| IP-02 | Titre et résumé ; trois étapes préparatoires ; limite administrative ; date éditoriale fictive | IP-01 ; retour à la rubrique |
| Agenda | Titre ; mention de la date de référence ; événements non terminés, annulés compris avec statut ; accès « Événements passés » | Même vue avec sélection passée, sans calendrier interactif ; détail EV-01 |
| EV-01 | Statut ; titre ; date et heures ; public ; conditions ; description ; lieu et lien ; date éditoriale fictive | EQ-01 ; retour agenda ; aucune action de réservation |
| Équipements | Titre ; résumé de EQ-01 | Ouvrir EQ-01 ; aucun filtre pour un seul lieu |
| EQ-01 | Titre et résumé ; adresse et entrée ; horaires ; accès physique non documenté ; événements associés ; date éditoriale fictive | EV-01 avec statut ; retour équipements |
| Résultats | Requête conservée ; nombre ; liens avec type, résumé et statut/date d’événement | Modifier la recherche ; ouvrir le contenu ; rubriques accessibles |

Sur petit écran, conserver cet ordre utile avant l’illustration. Les dispositions graphiques précises relèvent de BR-C3. La navigation clavier, le focus et les retours d’erreur relèveront des spécifications BR-C4, puis de vérifications sur une réalisation autorisée.

## Sources uniques et relations

- IP-01 porte les horaires de mairie ; IP-02 renvoie à IP-01 sans les recopier.
- EQ-01 porte l’adresse, l’entrée et les horaires de médiathèque. EV-01 référence EQ-01 ; si son détail affiche l’adresse, elle doit provenir de la révision publique de EQ-01.
- Le bloc des événements de EQ-01 est déduit des événements liés au lieu, pas saisi séparément.
- Résumés, listes et sélection d’accueil proviennent de la révision publique du contenu. Le statut d’annulation reste visible partout où EV-01 est présenté.
- Une révision brouillon ne remplace pas ces données publiques avant publication réussie. Les moyens de garantir cette cohérence restent à choisir en BR-C4.

Recommandation : ne pas recopier les horaires dans les cartes de liste ou d’accueil. Cela réduit les surfaces susceptibles de diverger après une modification.

## Recherche limitée : contrat proposé

Le corpus recherché comprend uniquement les quatre contenus dont une révision est publiée, y compris l’événement passé ou annulé. Les pages d’accueil et de rubrique ne constituent pas des résultats. Aucun brouillon, historique de révision, document joint ou contenu web externe.

Champs recherchés : titre, résumé, termes éditoriaux. Comparaison sans distinction de casse ni d’accents ; espaces multiples réduits ; mots séparés par les espaces. Chaque mot saisi doit être présent comme mot entier dans au moins un de ces champs. Aucune correction de faute, gestion des synonymes, recherche dans le corps ou classement intelligent promis. Les termes éditoriaux permettent seulement des correspondances explicitement documentées.

Ordre proposé : titre en ordre alphabétique français, puis identifiant en cas d’égalité. Aucun filtre ou pagination pour quatre contenus. Les détails d’implémentation et limites de saisie seront examinés en BR-C4.

| Saisie de référence | Résultat attendu dans le corpus V1, non testé |
|---|---|
| horaires mairie | IP-01 uniquement |
| médiathèque | EV-01 et EQ-01, dans cet ordre par titre |
| MEDIATHEQUE | Identique à « médiathèque » |
| piscine | Aucun résultat ; conserver la requête et proposer les rubriques |
| Espaces seuls | Invitation « Saisissez un ou plusieurs mots » ; aucun résultat calculé |
| médiathèqe | Aucun résultat ; aucune correction automatique annoncée |

Une panne de recherche se présente comme une indisponibilité, jamais comme « aucun résultat ». La page garde l’accès aux rubriques. Aucun historique personnel, suivi de recherche ou collecte de données ajouté à ce périmètre.

## Temps et variantes proposés

Les dates sont des données de scénario. Référence principale fixe : **10 novembre 2026 à 10 h, Europe/Paris**. C’est une horloge fictive annoncée, distincte de la date réelle de consultation et de rédaction. Aucun positionnement régional de Belle-Rive déduit de ce fuseau.

Pour un événement non annulé : avant le début = « À venir » ; du début inclus à la fin exclue = « En cours » ; dès la fin = « Passé ». « En cours » complète les états BR-C1 pour éviter une frontière ambiguë ; cette précision est proposée. Une annulation prévaut dans le libellé public à toute date ; le classement passé/non terminé utilise néanmoins la fin du créneau. L’agenda conserve ainsi les annulations non terminées, pour avertir avant déplacement.

Pour l’exception de mairie : ne pas masquer automatiquement l’avis après sa date. Tant que la révision r2 reste publique, le texte daté reste lisible ; après l’échéance, le présenter comme exception passée à retirer, sans laisser entendre une fermeture actuelle. Le retrait explicite par r3 suit le scénario éditorial. Aucun indicateur « ouvert maintenant ».

## États sans contenu

- Agenda non terminé vide : « Aucun événement à venir ou en cours dans cette démonstration » ; accès aux événements passés et aux rubriques.
- Événements du lieu vides : « Aucun événement annoncé dans cette démonstration » ; conserver les informations du lieu.
- Détail inexistant ou non publié : « Ce contenu n’est pas disponible » ; retour rubrique et recherche ; aucune fuite de brouillon.
- Donnée facultative inconnue : libellé explicite défini dans le modèle ; ne pas déduire une valeur favorable.

## Suite et état

Compagnons : [modèle des contenus](BELLE_RIVE_BR_C2_MODELE_CONTENUS_V1.md), [corpus et variantes](BELLE_RIVE_BR_C2_CORPUS_V1.md). Les intitulés, le contrat de recherche et le traitement temporel sont des propositions cohérentes pour la suite, pas des fonctions réalisées. Aucun arbitrage utilisateur indispensable à ce stade ; identité et choix techniques restent ouverts. BR-C3 pourra traduire cette architecture en proposition visuelle statique, avant accord sur son orientation.
