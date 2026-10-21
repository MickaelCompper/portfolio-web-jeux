# Étape 1 — Modèle d’étude de cas « Voir / Essayer / Examiner »

Version 1 — 21 octobre 2026. Gabarit éditorial proposé ; aucun développement.

## 1. Décisions et statut

Cette fiche prolonge le plan, la fiche de positionnement et la structure de l’accueil, conservés dans leurs versions initiales.

**Nouvelle décision utilisateur :** la structure éditoriale de l’accueil proposée dans `ETAPE_1_ACCUEIL_V1.md` est validée. Cela ne renseigne pas les contenus manquants et ne transforme pas les brouillons de présentation professionnelle en faits établis.

**Déjà validés :** positionnement, identité personnelle, direction graphique générale, signature et accroche.

**Proposé ici :** le modèle détaillé d’étude de cas, ses champs, ses règles de preuve et ses critères de validation. Sa rédaction ne constitue pas sa validation utilisateur.

Belle-Rive, les six concepts, leur sélection et leur ordre restent ouverts. Aucun projet n’est choisi par ce document. L’étape 1 reste en cours ; aucune publication ni réalisation de démonstrateur n’est engagée.

## 2. Principe de lecture

Une étude unique, trois entrées complémentaires. « Voir », « Essayer » et « Examiner » désignent des sections accessibles directement ; aucun essai ni parcours imposé n’est nécessaire pour consulter les preuves.

| Entrée | Question du lecteur | Contenu essentiel |
|---|---|---|
| Voir | Qu’a-t-il été conçu, pour qui et pourquoi ? | Besoin, rôle, visuels, scénario et décisions de conception |
| Essayer | Que puis-je faire et dans quelles conditions ? | Version disponible, consignes, scénario, limites et solution de consultation alternative |
| Examiner | Qu’est-ce qui est établi et que reste-t-il à vérifier ? | Périmètre, contributions, protocoles, résultats, anomalies et documents |

Le résumé initial doit suffire à identifier le projet et sa nature. Le texte principal privilégie les explications utiles à un lecteur métier ; les détails techniques sont reliés à leurs conséquences et placés dans « Examiner ».

## 3. Gabarit réutilisable

Les éléments entre crochets sont des champs à compléter. Ils ne seront pas publiés tels quels. Un champ sans information est renseigné comme inconnu, non testé ou non mesuré selon le cas ; il n’est jamais rempli par une supposition.

### En-tête — Le projet en bref

**[Titre du projet]**

> [Une phrase : besoin traité, public visé et réponse réalisée. Si le projet n’est pas réalisé, le dire explicitement et ne pas le présenter comme disponible.]

| Champ obligatoire | À renseigner |
|---|---|
| Nature | Démonstrateur personnel / référence client documentée / autre nature explicitée |
| Domaine | Web / jeu vidéo / autre domaine justifié |
| État de réalisation | Concept / prototype / version de démonstration / autre état défini et documenté |
| Contexte | Réel, fictif ou mixte ; distinguer les parties concernées |
| Besoin | Hypothèse de conception / observation documentée / demande client documentée |
| Public visé | [Public et contexte d’utilisation] |
| Ma contribution | [Rôles et périmètre exacts] |
| Autres contributions | [Personnes, composants, ressources et assistance IA ; renvoi au détail] |
| Date et version présentée | [Date ou période ; identifiant de version] |
| Disponibilité | Étude seule / médias disponibles / essai disponible et conditions / essai indisponible |

La nature du projet et son état sont deux informations distinctes : un démonstrateur personnel peut être abouti sans être une référence client. Une date de réalisation n’est pas une date de vérification.

**Navigation proposée :** « Voir le projet » · « Conditions d’essai » · « Examiner les preuves » · « Retour aux projets ».

### Voir — Comprendre le projet

**1. Le besoin et son origine**

> [Qui rencontre quelle difficulté, dans quelle situation ? Quelle est la source de ce constat ? Pour un besoin hypothétique, écrire par exemple : « Ce démonstrateur explore l’hypothèse suivante… ».]

**2. La réponse réalisée**

> [Ce qui existe effectivement et ce que le parcours permet de faire. Séparer les intentions futures dans une courte note distincte, si elles sont utiles.]

**3. Un scénario principal**

> [Situation de départ] → [action] → [retour observable] → [issue du parcours].

Décrire l’expérience sans présumer qu’elle a été comprise ou appréciée par des utilisateurs. Dans un jeu, distinguer l’action jouable, l’intention de médiation et un éventuel effet d’apprentissage, qui exige une évaluation propre.

**4. Des visuels commentés**

Chaque média doit expliquer un point précis : repérage, interaction, retour d’action ou état difficile. Une sélection courte est préférable à une galerie répétitive.

Légende type : `[Vue ou séquence] — [ce qu’elle permet d’observer] — version [ID], [date].`

Pour une vue de conception ou une image illustrative, préciser sa nature ; ne pas la faire passer pour une capture du logiciel. Prévoir un équivalent textuel pertinent. Documenter la provenance dans « Examiner ».

**5. Choix et arbitrages**

| Décision effectivement prise | Besoin ou contrainte | Alternative envisagée | Conséquence et limite |
|---|---|---|---|
| [À renseigner] | [À renseigner] | [Si documentée ; sinon non documentée] | [À renseigner] |

Ne pas reconstruire a posteriori une recherche utilisateur ou une comparaison qui n’a pas eu lieu.

### Essayer — Accéder à l’expérience

**État de l’essai :** [disponible / indisponible / non réalisé].

| Avant de commencer | Information attendue |
|---|---|
| Version | [ID de la version essayable ; différence éventuelle avec l’étude] |
| Accès | [Lien réel lorsque disponible ; aucun faux lien dans une version publique] |
| Vérification de l’accès | [Date, environnement et résultat de la dernière vérification, ou non vérifié] |
| Matériel et commandes | [Appareils, navigateur ou système, périphériques ; ce qui est testé et ce qui est seulement supposé compatible] |
| Données | [Fictives ou réelles, origine ; informations demandées et conservation si concernées] |
| Durée indicative | [Mesurée / estimation explicitée / non établie] |
| Limites utiles | [Fonctions simulées, absence d’envoi réel, contraintes d’accès ou autres limites effectives] |
| Aides et sortie | [Instructions, reprise, remise à zéro et sortie réellement disponibles] |

**Scénario guidé :**

1. [Point de départ et prérequis.]
2. [Action principale et retour attendu.]
3. [Issue à observer et manière de recommencer, si disponible.]

**Cas difficile :** [Une erreur, un refus ou une situation limite réellement gérée ; comportement attendu et limites. Ne pas inventer un contrôle absent.]

**Alternative à l’essai :** [Captures commentées ou vidéo disponible avec équivalent textuel ; préciser ce que ces médias montrent et ce qu’ils ne permettent pas de tester.]

Si l’essai est indisponible, expliquer brièvement son état, supprimer l’action de lancement et conserver la consultation de « Voir » et « Examiner ». Une vidéo ne constitue pas une preuve d’utilisation directe. Aucun téléchargement ou essai ne doit être requis pour connaître les limites.

### Examiner — Évaluer les faits et leurs limites

**1. Périmètre et contributions**

| Élément | Réalisé dans la version présentée | Exclu, simulé ou futur | Responsable ou contribution |
|---|---|---|---|
| [Fonction, contenu, graphisme, intégration…] | [Faits] | [Limites] | [Rôle exact ; tiers et assistance IA selon le cas] |

Préciser les outils, composants et dépendances qui influencent l’évaluation ou la reprise. Décrire les conditions de lancement et les documents de livraison disponibles. Ne pas annoncer de maintenance, d’exploitation ou de déploiement client sans éléments établis.

**2. Matrice des affirmations**

| Affirmation envisagée | Preuve attendue ou disponible | Version et source | Conclusion autorisée | Limite |
|---|---|---|---|---|
| [Une affirmation précise] | [Protocole, rapport, capture ou observation ; état explicite] | [ID et emplacement réel] | [Ce que la preuve établit] | [Ce qu’elle ne démontre pas] |

Une intention de conception peut être exposée comme intention. Une propriété du produit, une mesure ou un effet sur les usagers requiert une preuve adaptée.

**3. Vérifications et résultats**

| ID | Objet et critère défini | Nature du contrôle | Version et environnement | Protocole et date | Exécution | Résultat observé | Preuve et limite |
|---|---|---|---|---|---|---|---|
| [ID] | [Seuil ou critère avant exécution] | [Automatique / technique manuel / audit spécialisé / session utilisateur] | [Version, appareil, système et outils pertinents] | [Méthode ; date si exécuté] | [Prévu / exécuté / non exécuté] | [Conforme au critère / non conforme / partiel / non concluant / non testé ; détail factuel] | [Lien réel ou preuve absente ; limites] |

Pour un contrôle prévu, le résultat reste « non testé » ; une valeur attendue ne devient pas un résultat observé. Une exécution interrompue se décrit comme telle avec sa couverture réelle. Toute mesure chiffrée conserve unité, méthode, conditions et limites d’interprétation.

Séparer notamment :

- les contrôles automatiques et les vérifications techniques manuelles ;
- l’évaluation d’accessibilité et sa couverture précise ;
- les essais utilisateurs, avec contexte, effectif, aides, difficultés et observations ;
- les vérifications de compatibilité, de performance et d’installation effectivement exécutées.

Un succès automatique ne prouve ni la facilité d’usage, ni une conformité globale, ni un effet pédagogique. Un essai local ne démontre pas un fonctionnement sur une autre machine. Les versions et environnements non évalués sont signalés.

**4. Anomalies et inconnues**

| Élément | Effet observable ou question | État | Contournement vérifié | Suite éventuelle |
|---|---|---|---|---|
| [Anomalie ou inconnue] | [Faits et périmètre] | [Ouvert / corrigé, avec version / à vérifier] | [Disponible ou absent] | [Proposition, sans engagement implicite] |

Conserver les résultats défavorables. Une correction annoncée reste à vérifier sur la version concernée ; préserver les rapports antérieurs au lieu de les remplacer silencieusement.

**5. Médias, données et droits**

| Ressource | Origine et auteur | Licence ou autorisation et justificatif | Modifications et attribution | Restrictions ou état de revue |
|---|---|---|---|---|
| [Visuel, son, police, donnée, composant…] | [Source exacte] | [Document ou lien précis] | [À renseigner] | [Établi / ouvert ; restrictions] |

Une ressource trouvée en ligne n’est pas présumée réutilisable. Distinguer les droits sur une œuvre de ceux sur sa photographie. Ne pas rendre publics des éléments confidentiels, données personnelles ou documents clients sans conditions de présentation établies. Ce registre documentaire ne vaut pas avis juridique.

**6. Documents et conclusion**

Lister uniquement les documents disponibles : notice, rapport de tests, historique de version, sources ou extraits partageables, selon le projet. Aucun dépôt public de code n’est requis par ce modèle.

Conclusion type :

> Cette version permet d’observer [faits établis]. Les vérifications exécutées portent sur [périmètre]. [Limites ou inconnues] restent à examiner. [Évolutions éventuelles] sont des pistes proposées.

Terminer par « Retour aux projets » et, si les coordonnées sont disponibles, « Échanger sur un besoin similaire ». Ne pas présenter la transposition à un nouveau contexte comme déjà acquise.

## 4. Exemple de remplissage sans projet sélectionné

Cet exemple illustre le traitement des champs manquants. Il ne décrit aucun logiciel existant et ne sélectionne aucun des six concepts.

| Champ | Exemple documentaire |
|---|---|
| Titre | [Projet à sélectionner] |
| Nature | Démonstrateur personnel envisagé ; sélection ouverte |
| État | Aucune réalisation engagée par cette planification |
| Besoin | Hypothèse à définir après sélection |
| Rôle et contributions | À renseigner ; aucune réalisation attribuée à ce stade |
| Voir | Scénario et visuels à définir ; aucune capture de produit disponible dans cet exemple |
| Essayer | Non réalisé ; aucun lien de lancement |
| Examiner | Aucun test produit exécuté dans cette planification ; résultats non testés |
| Preuves | Matrice à compléter ; aucun résultat chiffré inventé |
| Droits | Ressources non sélectionnées ; revue à prévoir |
| Conclusion | Le modèle éditorial est rédigé ; les compétences d’un futur projet restent à démontrer |

## 5. Conditions d’utilisation et validation du modèle

Un concept peut être décrit dans les documents de travail sans intégrer la sélection publique de réalisations. Pour qu’une étude soit présentable, vérifier au minimum : nature et rôle exacts, périmètre réellement réalisé, version identifiable, contenu concret montrable, conditions de présentation des médias établies et absence d’affirmation non étayée. Un essai interactif n’est pas obligatoire si son indisponibilité est explicite et que l’étude reste utile.

**Critères proposés pour valider le gabarit :**

- Les trois entrées sont compréhensibles et consultables indépendamment.
- Le même modèle accueille web et jeu sans imposer un scénario de projet.
- Nature, état de réalisation, disponibilité et niveau de preuve restent distincts.
- Le rôle personnel, les contributions tierces et l’assistance IA peuvent être décrits précisément.
- Le besoin hypothétique ne devient pas un besoin client documenté.
- Les vérifications prévues, exécutées et leurs résultats ont des champs distincts.
- Une preuve autorise une conclusion délimitée ; les limites et résultats défavorables sont conservés.
- L’essai indisponible, les données simulées et les droits ouverts ont un traitement explicite.
- Les chiffres, témoignages, références clients et badges ne peuvent pas être ajoutés sans justification.

**État de vérification de ce livrable :** rédaction et relecture documentaire du modèle uniquement. Aucun test produit, essai utilisateur, contrôle de rendu ou audit d’accessibilité exécuté. Les critères ci-dessus ne constituent pas un résultat de recette d’un futur produit.

## 6. Suite dans l’étape 1

Le modèle est proposé à validation. La stratégie de preuve et la grille de recette globale restent à consolider dans l’étape 1 ; l’inventaire des contenus réels, le nom public et les choix graphiques détaillés restent à renseigner. Le choix d’un premier démonstrateur pourra faire l’objet d’un arbitrage distinct, sans imposer Belle-Rive ou l’un des six concepts.

La validation de la structure de l’accueil ne clôture pas le jalon C : le modèle détaillé et la stratégie de preuve ne sont pas encore acceptés dans leur ensemble. La clôture de l’étape 1 reste distincte de toute autorisation de développement ou publication.
