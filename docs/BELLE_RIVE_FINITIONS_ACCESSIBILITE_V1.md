# Belle-Rive — Finition D-04 : checklist d’accessibilité

21 octobre 2026 — V1. Plan détaillé, **aucun audit produit exécuté**. Référence : [WCAG 2.2 W3C](https://www.w3.org/TR/WCAG22/), niveaux A/AA, selon la préparation acceptée. Le texte normatif fait autorité ; les contrôles ci-dessous sont des applications originales au projet, pas une reproduction ou une traduction exhaustive de la norme.

## Mode d’emploi et inventaire des vues

Pour chaque vue × critère applicable, consigner avant recette : méthode, version, environnement, résultat observé, pièce et anomalie. À ce stade, tout résultat est **non testé**, preuve produit absente. « NA prévu » est une hypothèse d’absence de fonction à confirmer sur la réalisation, jamais un succès de test. Pas de taux calculé. 4.1.1, supprimé de WCAG 2.2, n’est pas ajouté comme critère de conformité ; AAA hors périmètre normatif accepté, objectifs projet supplémentaires conservés.

| Vue/état | Description et variante | Compléments au socle transversal |
|---|---|---|
| V01 | Accueil S0 | Illustration décorative ; trois entrées ; événement et horloge de scénario |
| V02 | Informations pratiques | Liens IP-01/IP-02, résumés et titre de rubrique |
| V03 | IP-01 S0/S2/S7 et exception passée | Structure des horaires, exception datée, inconnu non assimilé à fermé |
| V04 | IP-02 | Étapes ordonnées, liens utiles, limite administrative |
| V05 | Agenda non terminé / passé / vide S0/S4/S5 | Sélection nommée ; dates et annulation ; accès aux passés |
| V06 | EV-01 annoncé/annulé/passé | Public, conditions et lien du lieu ; statut écrit |
| V07 | Équipements | Lien EQ-01 et résumé |
| V08 | EQ-01 S0/S4/S6 | Plages horaires, accès physique inconnu, événement associé ou absence |
| V09 | Recherche avec résultats / zéro / saisie vide | Nom du champ, requête conservée, nombre et sorties |
| V10 | Recherche indisponible / requête trop longue | Erreur distincte de zéro ; message explicite et champ modifiable |
| V11 | Contenu indisponible et lieu lié manquant | Titre et explication, sorties par rubrique/recherche |
| V12 | Connexion et refus/temporisation | Secret collable, erreur liée au champ, aucun test cognitif ajouté |
| V13 | Brouillon et enregistrement échoué | Libellés, champs structurés, état enregistré/non enregistré, saisie conservée |
| V14 | Validation refusée S8/S9 | Synthèse d’erreurs liée aux champs et focus |
| V15 | Confirmation et conflit d’onglet | Résumé avant action ; retour au brouillon ; aucune action au simple focus |
| V16 | Résultat publié / publication à vérifier / réessai | Succès distingué d’incertitude ; consultation du résultat et révision |
| V17 | Session expirée et déconnexion | Reconnexion, explication de l’état, gestion de la saisie et des délais à arbitrer ci-dessous |

Socle « toutes vues » : critères applicables de structure, lecture, navigation, clavier, focus, langues, couleurs, taille, cohérence et composants ci-dessous. Formulaires : V09/V10 et V12–V17. Contenus horaires/dates : V01/V03/V05/V06/V08/V16. Une erreur technique ne dispense pas de ce socle.

## Registre A/AA exhaustif par identifiant

AM = automatique + manuel ; M = manuel ; AT = technologie d’assistance. Les IDs renvoient au texte W3C. Chaque ligne ci-dessous conserve une observation future par vue, pas un résultat global. Les lignes NA prévues sont vérifiées contre l’inventaire réellement livré.

| ID | Applicabilité de conception et contrôle spécifique Belle-Rive | Méthode / pièce future |
|---|---|---|
| 1.1.1 | V01/V08 et éventuels pictogrammes : l’illustration ne porte aucune adresse ou instruction exclusive ; texte des actions conservé | AM+AT ; arbre accessible et relevé |
| 1.2.1 | NA prévu : aucun média audio seul ou vidéo seule ; confirmer inventaire sans média ajouté | M ; inventaire |
| 1.2.2 | NA prévu : aucune vidéo enregistrée avec son | M ; inventaire |
| 1.2.3 | NA prévu : aucune séquence audiovisuelle | M ; inventaire |
| 1.2.4 | NA prévu : aucune diffusion en direct | M ; inventaire |
| 1.2.5 | NA prévu : aucune vidéo nécessitant une description | M ; inventaire |
| 1.3.1 | Toutes : titres et régions ; V03/V08 horaires associés aux jours ; V14 erreurs reliées aux champs | AM+AT ; structures relevées |
| 1.3.2 | Toutes : ordre de lecture utile ; petit écran sans intercaler l’image entre un champ et son erreur | M+AT ; séquence lue |
| 1.3.3 | Toutes : aucun « bouton à droite » comme seule indication ; préciser le nom « Vérifier le résultat » | M ; textes |
| 1.3.4 | Toutes : aucune orientation physique imposée ; V13 champs utilisables en portrait/paysage | M ; captures |
| 1.3.5 | À confirmer V12/V13 : pas de nom/adresse personnelle saisi, secret de lancement particulier ; vérifier les champs réellement ajoutés avant NA motivé | M ; liste des champs |
| 1.4.1 | V03/V05/V06/V14/V16 : fermé, annulé, erreur, enregistré et incertain écrits ; pas de sens porté par seule couleur | M ; captures sans couleur |
| 1.4.2 | NA prévu : aucun son automatique | M ; inventaire réseau/médias |
| 1.4.3 | Toutes : mesurer les textes réellement affichés, y compris bandeau fictif, petits liens et erreurs | AM+M ; couples et tailles |
| 1.4.4 | Toutes : zoom 200 % sans perte des plages ni boutons de confirmation | M ; captures comparées |
| 1.4.5 | Toutes : titres et horaires en texte, pas dans des images ; planches seulement hors produit | M ; inspection rendu |
| 1.4.10 | Toutes : 320 px et scénario de reflow prévu par la référence ; pas de défilement horizontal de page ; horaires restructurables | M ; captures et dimensions |
| 1.4.11 | Toutes : contours de champs, focus et états distinctifs réellement utilisés mesurés | M ; mesures et états |
| 1.4.12 | Toutes : appliquer les paramètres d’espacement du référentiel ; vérifier longues erreurs et navigation | M ; captures avant/après |
| 1.4.13 | À confirmer : aucun survol informatif prévu ; si aide au survol/focus ajoutée, tester sa fermeture et sa consultation | M ; inventaire et séquence |
| 2.1.1 | Toutes : parcours et édition complets sans pointeur ; connexion, recherche, correction et vérification d’opération compris | M ; journal clavier |
| 2.1.2 | Toutes : sortie de chaque composant ; aucun piège à la confirmation ou après erreur | M ; journal clavier |
| 2.1.4 | NA prévu : aucun raccourci par caractère unique ; confirmer scripts livrés | M ; inventaire commandes |
| 2.2.1 | V12/V17 : délai de session et temporisation ; conflit de conception AV-01 ci-dessous, non résolu par une simple reconnexion | M ; protocole après arbitrage |
| 2.2.2 | NA prévu : aucune animation persistante, carrousel ou actualisation automatique ; vérifier annonce d’état non animée | M ; observation |
| 2.3.1 | Toutes : aucun clignotement ; vérifier SVG et styles des erreurs | M ; inventaire/observation |
| 2.4.1 | Toutes : lien d’évitement vers contenu principal ; édition séparée de navigation publique | M+AT ; séquence |
| 2.4.2 | Toutes : titre de destination précis, y compris « Publication à vérifier » et indisponibilités | AM+M ; liste titres |
| 2.4.3 | Toutes : ordre cohérent ; V14 focus sur synthèse puis champs ; pas de saut vers l’illustration | M ; séquence |
| 2.4.4 | Toutes : liens nommés selon leur destination ; EV annulé nommé comme tel ; pas de « cliquez ici » isolé | AM+AT ; liste liens |
| 2.4.5 | V01–V11 : rubriques et recherche comme accès complémentaires aux fiches ; examiner les étapes éditoriales selon leurs exceptions de processus | M ; chemins observés |
| 2.4.6 | Toutes : libellés de date, début, fin et secret précis ; titres expliquant chaque état | M+AT ; relevé |
| 2.4.7 | Toutes : focus visible sur liens, champs et actions, erreurs comprises | M ; captures focus |
| 2.4.11 | Toutes : focus non entièrement masqué par bandeau, défilement ou synthèse ; pas de pied flottant prévu | M ; captures focus |
| 2.5.1 | NA prévu : aucun geste multipoint ou tracé requis | M ; inventaire interactions |
| 2.5.2 | Actions de V09/V12–V16 : déclenchement au relâchement ; publication non déclenchée au contact initial | M ; essais pointeur |
| 2.5.3 | Toutes : nom accessible contient le texte visible, notamment « Publier cette révision » | AM+AT ; noms comparés |
| 2.5.4 | NA prévu : aucune commande par mouvement | M ; inventaire |
| 2.5.7 | NA prévu : aucune réorganisation par glisser ; formulaires explicites | M ; inventaire |
| 2.5.8 | Toutes : examiner le critère AA et ses exceptions ; objectif projet de 44 px conservé séparément, pas assimilé au minimum normatif | M ; dimensions et écarts |
| 3.1.1 | Toutes : français déclaré sur documents | AM+AT ; relevé |
| 3.1.2 | À confirmer : contenus français, mots techniques non automatiquement marqués comme changement de langue ; traiter toute phrase étrangère ajoutée | M+AT ; inventaire |
| 3.2.1 | Toutes : aucun changement de page ou publication au simple focus | M ; journal |
| 3.2.2 | Formulaires : modifier une date ne publie pas ; rechercher reste une soumission explicite | M ; journal |
| 3.2.3 | Toutes : ordre des trois rubriques stable ; navigation éditoriale cohérente entre ses vues | M ; comparaison |
| 3.2.4 | Toutes : « enregistré », « publié », « annulé » et « à vérifier » ne changent pas de sens selon la vue | M+AT ; relevé des libellés |
| 3.2.6 | À confirmer : aucune aide/contact réel prévu ; si bloc d’aide à l’édition retenu, même position relative dans les vues concernées | M ; inventaire |
| 3.3.1 | V10/V12/V14/V15 : identifier erreur et champ, pas seulement un cadre rouge ou un code HTTP | AM+AT ; déclenchement contrôlé |
| 3.3.2 | Formulaires : instructions avant saisie, champs requis explicités, pas de placeholder comme seul libellé | M+AT ; relevé |
| 3.3.3 | V10/V14 : correction proposée sans inventer date ni période ; pas d’indication sensible sur secret erroné | M ; messages |
| 3.3.4 | V15 : révision publique modifiée seulement après résumé et confirmation ; analyser applicabilité aux données modifiables et conserver une revue explicite | M ; avant/après et décision |
| 3.3.7 | V13–V17 : conserver les données déjà saisies quand possible ; examiner toute redemande due à sécurité plutôt que la justifier automatiquement | M ; séquence avec erreurs |
| 3.3.8 | V12/V17 : collage et gestionnaire autorisés, aucun captcha ou mémorisation imposée ; vérifier le secret de lancement avec AT | M+AT ; séquence |
| 4.1.2 | Toutes : noms, rôles, états ; champs marqués invalides quand nécessaire ; pas de fausses actions décoratives dans le produit | AM+AT ; arbre et annonces |
| 4.1.3 | V09/V10/V13–V16 : annonce d’état si actualisation sans navigation ; pas de double annonce si nouvelle page avec titre/focus appropriés | M+AT ; transcription |

## Cas de recette détaillés et rattachement M

| Cas | Étapes futures | Critère d’observation / pièce |
|---|---|---|
| A-01 — M-08 | Clavier V01→V02→V03→V04, puis V07→V08→V06 ; retour rubrique ; lien d’évitement | Ordre, focus et noms notés à chaque action ; aucun piège |
| A-02 — M-04/08 | Rechercher « médiathèque », « piscine », espaces seuls, 121 caractères ; injecter indisponibilité | Cinq états distincts, saisie corrigible, annonces et sorties consignées |
| A-03 — M-01/03/09 | V03 S2/S7, V08 S0/S6 ; zoom et espacement ; toutes largeurs acceptées | Toutes plages et inconnus lisibles, aucune information par seule couleur ; captures |
| A-04 — M-05/08 | Connexion V12 avec collage ; V13 enregistrer ; V15 confirmer ; V16 résultat | Contrôles nommés et atteignables ; états annoncés sans publication involontaire |
| A-05 — M-06/08 | V14 période manquante, V15 onglet ancien, V16 réponse perdue | Focus/erreurs utiles ; données conservées selon contrat ; incertitude non annoncée comme succès |
| A-06 — M-08/09 | NVDA/Firefox sur V03/V06/V08/V09 et V12–V16, versions consignées | Ordre de lecture, jours/plages, statut d’événement et erreurs restitués ; transcription |
| A-07 — M-08 | Expiration et prolongation selon décision AV-01, puis reconnexion | Ne peut pas être déclaré prêt sans arbitrage temporel ; aucune dérogation supposée |
| A-08 — M-13 | Inventaire média/scripts et revue des 17 vues contre toutes les lignes | NA prévus confirmés ou requalifiés ; critères non évalués conservés |

Pour M-01 à M-07, ces cas ajoutent une dimension accessible sans remplacer leurs preuves de données/persistance. M-10 demeure une session humaine indépendante. M-11/M-12 ne deviennent pas des critères d’accessibilité par agrégation.

## AV-01 — Délai éditorial à arbitrer

La préparation acceptée prévoit 30 minutes d’inactivité et un plafond de session de 4 heures. Une conservation de brouillon ou un message de reconnexion ne suffit pas, à lui seul, à établir 2.2.1. Aucune exception de sécurité n’est présumée applicable.

**Proposition nouvelle, non adoptée :** garder l’inactivité à 30 minutes et avertir deux minutes avant son échéance ; une action « Prolonger la session » réinitialise ce délai. Remplacer le plafond absolu de 4 heures par une échéance de 4 heures renouvelable explicitement, elle aussi annoncée deux minutes avant, sans plafond qui empêcherait les prolongations. Autoriser au moins dix prolongations successives pour chaque limite rencontrée ; l’action conserve le travail et reste protégée par session, origine et jeton. Une activité ordinaire ne prolonge pas silencieusement l’échéance de quatre heures. Sans réponse, expiration, invalidation et reconnexion selon le contrat, sans publication automatique. L’arrêt du processus et la déconnexion invalident toujours la session.

Cette proposition facilite un essai du critère tout en conservant une expiration effective en absence d’action ; elle ne constitue pas un résultat de conformité. Les valeurs et le plafond demeurent ceux de la préparation tant que la modification n’est pas acceptée. Si acceptée, consigner une V2 de la règle d’accès et dessiner l’avertissement avant réalisation, sans diminuer les protections d’origine/CSRF.

AV-01 est un vrai arbitrage de conception entre une règle acceptée et un objectif d’évaluation ; il est regroupé dans le bilan de finition. D-04 est rédigé comme checklist, mais la résolution de ce point et l’applicabilité réelle de chaque critère restent explicites. Aucun résultat, audit ou conformité juridique déduit.
