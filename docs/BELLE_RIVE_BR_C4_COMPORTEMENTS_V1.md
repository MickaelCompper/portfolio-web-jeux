# Belle-Rive — BR-C4 — Comportements et erreurs

Version 1 — 21 octobre 2026. Conception uniquement ; spécifications proposées.

Base : [cadrage validé](BELLE_RIVE_VALIDATION_CADRAGE.md), [architecture BR-C2](BELLE_RIVE_BR_C2_ARCHITECTURE_V1.md), [corpus et variantes](BELLE_RIVE_BR_C2_CORPUS_V1.md), [validation graphique BR-C3](BELLE_RIVE_BR_C3_VALIDATION.md). Le cadrage et la direction visuelle sont acquis ; les détails fonctionnels restent proposés. Aucun code produit ni test lancé.

## Navigation et consultation

| ID | Déclencheur | Comportement attendu proposé | Sortie / difficulté |
|---|---|---|---|
| C-01 | Ouvrir accueil, rubrique ou détail | Titre unique de page, navigation commune, mention fictive ; détail rattaché à sa rubrique | Lien retour à la rubrique et accueil ; pas de retour dépendant exclusivement de l’historique du navigateur |
| C-02 | Suivre un lien de fiche | Ouvrir la révision publique du contenu identifié | Identifiant inconnu ou sans publication : page de contenu indisponible, sans révéler un brouillon ; recherche et rubrique accessibles |
| C-03 | Lire IP-01 | Horaires ordinaires complets ; exception datée avant ceux-ci en S2 ; matin maintenu explicite | Horaire absent en S7 : « Horaires non renseignés dans cette démonstration » ; jamais « fermé » par défaut |
| C-04 | Lire EQ-01 et son événement | Adresse/horaires issus de EQ-01 ; événement issu de EV-01, avec annulation si S4 | Accès physique non documenté ; aucun événement en S6 : texte explicite ; aucun label physique déduit |
| C-05 | Lire EV-01 | Date, heures, public, conditions et lien du lieu ; annulation prioritaire sur le libellé temporel | Aucun bouton d’inscription ou compteur de places ; aucun report inventé |
| C-06 | Ouvrir une liste vide | Titre et texte d’absence adaptés ; agenda : lien vers passés | Ne pas afficher d’erreur technique pour une sélection normalement vide |

Aucune modification d’état par simple consultation. Rechargement et accès direct doivent fonctionner. Pour un futur rendu serveur : vrais liens et formulaires, pas de dépendance à un routage entièrement côté navigateur pour ces parcours.

## Recherche

Reprise du contrat BR-C2 : seuls titre, résumé et termes éditoriaux des révisions publiques ; mots entiers, tous les mots requis, casse/accents neutralisés ; tri alphabétique français par titre puis identifiant. Une faute n’est pas corrigée automatiquement. Précisions proposées : normaliser apostrophes et ponctuation en séparateurs de mots dans les champs et la requête ; retirer les marques diacritiques après décomposition Unicode ; ne pas éliminer les petits mots. Ainsi « de l’eau » exige les mots de, l et eau. Recherche « horaires mairie » limitée à IP-01 dans S0.

| ID | État/action | Retour proposé |
|---|---|---|
| C-07 | Saisie puis validation par bouton ou Entrée | Requête dans la destination de résultats, conservée dans le champ ; nombre de résultats et liens typés ; date/statut pour EV-01 |
| C-08 | Saisie vide après normalisation | « Saisissez un ou plusieurs mots » ; pas de calcul de résultats ; nom du champ toujours visible |
| C-09 | Zéro résultat | « Aucun résultat pour “…” » ; possibilité de modifier la requête et trois rubriques ; aucune panne déduite |
| C-10 | Service de recherche indisponible | « La recherche est momentanément indisponible » ; réessai et rubriques ; ne pas montrer zéro résultat |
| C-11 | Plus de 120 caractères saisis | Refuser la recherche avec message de limite, conserver la saisie dans le formulaire ; aucune troncature silencieuse |

La requête est du texte, jamais une instruction ou du HTML à exécuter. Aucun historique personnel, télémétrie ou service de recherche externe prévu. Les journaux techniques futurs ne devront pas enregistrer le texte des requêtes par défaut ; la présence éventuelle dans l’historique local du navigateur sera décrite dans la notice.

## Temps du scénario

Horloge principale fixe : 10 novembre 2026, 10 h, Europe/Paris ; affichée près de la sélection d’agenda. Début inclus et fin exclue pour « en cours » ; passé dès la fin ; annulation prioritaire dans le libellé. Une annulation bascule parmi les passés selon la fin du créneau, pas selon la date d’annulation. Les variantes temporelles restent des jeux distincts préparés pour la future recette, sans commande publique de voyage dans le temps ajoutée.

L’exception r2 de mairie est future avant le 18 novembre, applicable ce jour-là, passée après cette date. Son retrait reste une publication explicite r3. Si encore affichée après échéance, titre « Exception passée — 18 novembre 2026 » ; aucune fermeture actuelle suggérée. Aucun changement automatique des horaires ordinaires.

## Édition : états et transitions

Un seul acteur éditorial fictif ; pas d’espace usager. Les noms r1/r2/r3 sont des révisions de scénario, distinctes des versions livrées du futur logiciel.

| ID | Action et précondition | Résultat attendu / preuve future |
|---|---|---|
| C-12 | Préparer r2 depuis r1 publiée | Formulaire marqué « Brouillon — non publié » ; r1 publique inchangée ; saisie seule distincte d’un enregistrement |
| C-13 | Enregistrer le brouillon | Enregistrement confirmé seulement après persistance réussie ; identifiant et date réelle d’enregistrement visibles dans l’outil ; r2 rechargeable après redémarrage |
| C-14 | Demander publication | Revalider tous les champs BR-C2 ; résumé des modifications et action explicite « Publier cette révision » ; aucune publication depuis une prévisualisation |
| C-15 | Confirmer une publication valide | Une opération transactionnelle bascule la référence publique vers r2, conserve r1 et enregistre le résultat de l’opération ; succès après confirmation de persistance |
| C-16 | Consulter après publication | Toute nouvelle requête utilise la révision publique courante ; mêmes données pour détail, résultats, agenda et relations |
| C-17 | Corriger après publication | Nouvelle révision ; historique conservé ; pas de suppression silencieuse ni restauration destructive |

Chaque requête publique utilise une vue cohérente des révisions publiées. Une page déjà ouverte avant publication peut rester ancienne jusqu’au rechargement : aucune diffusion en temps réel promise. Pour le premier lot recommandé : pas de cache applicatif des contenus ni d’index de recherche indépendant ; pages de contenu revalidées à chaque requête. La politique HTTP exacte sera fixée avant réalisation, sans prétendre supprimer les pages déjà affichées.

## Erreurs éditoriales et récupération

| ID | Situation | Traitement proposé |
|---|---|---|
| C-18 | Date, période, lieu ou champ requis manquant ; fin avant début ; plages incohérentes | Publication bloquée ; synthèse d’erreurs et indication près du champ ; conserver la saisie ; aucun changement public |
| C-19 | Échec d’enregistrement | « Le brouillon n’a pas été enregistré » ; conserver la saisie tant que la page reste ouverte ; réessai explicite ; aucune conservation après fermeture promise |
| C-20 | Échec de transaction avant validation | Annuler les modifications de cette publication ; conserver dernière version publique et brouillon enregistré ; ne pas annoncer un succès |
| C-21 | Réponse perdue après éventuelle validation | « Publication à vérifier » ; consulter le résultat de l’opération par identifiant avant réessai ; ne pas affirmer que r1 est encore publique sans contrôle |
| C-22 | Double confirmation / réessai | Même identifiant d’opération pour une même tentative ; résultat unique ; ne pas créer deux publications ; nouvelle modification = nouvelle opération |
| C-23 | Formulaire devenu ancien dans un second onglet | Comparer la révision de départ à la version actuelle ; refuser l’écrasement et inviter à recharger après copie de la saisie ; édition collaborative exclue |
| C-24 | Sortie avec saisie non enregistrée | Avertissement si la plateforme le permet, sans bloquer la sortie ; libellé persistant « modifications non enregistrées » dans l’outil |
| C-25 | Retrait du lieu encore lié à un événement public | Refuser le retrait éditorial tant que la dépendance existe ; pas de commande de retrait nécessaire au premier scénario. Si incohérence de stockage injectée pour recette, afficher « Informations du lieu indisponibles », conserver le statut d’événement et relever l’anomalie |

La réussite transactionnelle du stockage ne garantit pas seule les retours d’interface : C-21 reste nécessaire. Un arrêt brutal ne doit pas être assimilé à une annulation certaine ; après reprise, relire l’état persistant. Aucune résistance à une panne physique de disque ni sauvegarde d’exploitation revendiquée.

## Accès, sécurité et accessibilité à concevoir

Outil éditorial recommandé uniquement en local, sur interface de boucle locale, séparé du parcours public et protégé contre les écritures non autorisées. Boucle locale seule insuffisante : session éditoriale, contrôle d’autorisation côté serveur, vérification d’origine et protection des requêtes de modification à définir et vérifier avant toute utilisation. Écritures par actions explicites, jamais par lien de consultation. Aucun mot de passe ou secret dans un livrable public. Pas d’envoi réel ni de téléversement de fichier dans ce lot.

Objectifs de conception : liens et boutons sémantiques, libellé de recherche permanent, titres hiérarchisés, lien d’évitement, ordre clavier logique, focus repérable et non masqué, erreurs associées aux champs et synthèse atteignable. Pour une navigation serveur, destination titrée ; pour un changement dynamique, annonce de statut sans déplacement arbitraire du focus. Après erreur de formulaire, orienter vers la synthèse sans effacer la saisie.

Viser des cibles d’action de 44 px, une lecture à 200 % et une composition à 320 px sans perte de texte ni défilement horizontal de page ; ces objectifs ne sont pas des résultats ou une conformité. L’illustration de rive est décorative si le texte porte toute l’information ; pas de description géographique factice. La vérification spécialisée future devra définir sa couverture et sa référence avant exécution.

Tous les comportements C-01 à C-25 sont proposés, **non implémentés, non testés**. Les critères et pièces attendues sont dans la [matrice appliquée](BELLE_RIVE_BR_C4_MATRICE_PREUVES_V1.md).
