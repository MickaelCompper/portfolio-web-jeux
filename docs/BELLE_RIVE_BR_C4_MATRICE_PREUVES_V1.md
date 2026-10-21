# Belle-Rive — BR-C4 — Matrice de preuve appliquée

Version 1 — 21 octobre 2026. **Plan de preuve rempli pour le candidat Belle-Rive, pas résultats de recette.**

Références : [stratégie générique](ETAPE_1_PREUVES_ET_RECETTE_V1.md), [clôture ultérieure](ETAPE_1_CLOTURE.md), [comportements C-01 à C-25](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md), [corpus S0 à S9](BELLE_RIVE_BR_C2_CORPUS_V1.md), [revue graphique existante](BELLE_RIVE_BR_C3_REVUE_V1.md).

## Compétence → démonstration → preuve → limite

| Axe | Démonstration spécifique | Pièce existante / future | Conclusion autorisée et limite |
|---|---|---|---|
| Concevoir des parcours compréhensibles | P1 mairie, P2 événement, P3 médiathèque et liens entre contenus | Fiches BR-C1, architecture BR-C2 et vues BR-C3 existent ; observation humaine future M-10 | Les choix sont documentés ; compréhension non prouvée |
| Développer une expérience interactive soignée | Consultation, recherche et états difficiles ; brouillon/publication persistants | Spécification BR-C4 disponible ; version produit, journaux et recettes M-01 à M-07 futurs | Aucun développement prouvé ; image fixe insuffisante |
| Préparer une livraison examinable | Lancement local, version, scénarios séparés, historique et reprise | Dossier de conception existant ; notice, manifeste logiciel et M-11/M-12 futurs | Dossier examinable ; aucune livraison logicielle ni reprise prouvée |
| Accessibilité transversale | Clavier, structure, erreurs, zoom et alternatives sur les trois parcours et l’édition | Quelques calculs de palette BR-C3 existent ; M-08/M-09 futurs | Mesures limitées de couleurs ; aucune conformité ou accessibilité produit établie |

La matrice appliquée est désormais rédigée en conception BR-C4. Le report historique de l’étape 1 reste conservé comme tel ; aucune réussite rétroactive de son ancien critère D07 ni réouverture de sa clôture. L’acceptation documentaire de cette nouvelle matrice reste distincte de ses exécutions futures.

## Cadre d’exécution futur

**État commun de toutes les lignes M : applicable, prévu non exécuté ; date d’exécution absente ; version produit absente ; résultat non testé/non mesuré ; preuve d’exécution absente ; responsable d’exécution à attribuer avant lancement.** Les pièces de conception sont des prérequis, pas des résultats.

Avant tout test autorisé : identifier build, sources, dépendances, appareil, système, navigateur/version, scénario et horloge ; conserver la copie initiale des données. Ne pas exécuter sur un exemplaire contenant des preuves à préserver. Chaque ligne donne un critère proposé avant exécution ; toute évolution de critère produit une nouvelle version justifiée.

| ID et lien | Critère proposé | Protocole futur | Pièces à conserver et limite |
|---|---|---|---|
| M-01 — P1-01 à 03, C-01/03 | IP-01 accessible par accueil/rubrique et recherche ; S2 indique après-midi fermé et matin maintenu ; S7 n’invente aucun horaire | Parcours manuel des deux entrées en S0/S2/S7 ; comparer texte aux données de référence | Journal, captures datées et révisions ; succès fonctionnel distinct de compréhension |
| M-02 — P2-01 à 03, C-05 | Date, public, conditions et lieu présents ; annulation cohérente dans accueil, agenda, recherche et EQ-01 ; frontière temporelle exacte | S0, S4, S5 puis quatre instants BR-C2 ; automatisation des calculs et inspection des vues séparées | Résultats bruts et captures ; pas de disponibilité réelle ni service d’agenda prouvé |
| M-03 — P3-01 à 03, C-04/06 | Sept jours et plages exacts ; adresse fictive ; accès inconnu ; état vide utile | EQ-01 en S0/S4/S6 ; vérifier liens aller/retour et absence de carte nécessaire | Relevé données/vues ; aucune preuve d’accès physique |
| M-04 — C-07 à 11 | Résultats BR-C2 exacts ; accents/casse neutralisés ; brouillons absents ; zéro/vide/panne distincts ; >120 caractères refusés sans troncature silencieuse | Cas BR-C2 plus ponctuation, espaces, 120/121 caractères, titre de brouillon distinct ; panne contrôlée du service | Liste exhaustive des entrées/sorties, réponse serveur et observation ; pas de recherche générale ou sémantique |
| M-05 — ED-01/02/05, C-12 à 17 | r1 publique pendant brouillon r2 ; r2 persistante après succès et redémarrage ; r1/r2 conservées après r3 | Scénario S1→S2→S3, lecture publique par deux entrées et redémarrage entre étapes | Journal opérations/révisions, export avant/après, captures ; simulation visuelle non recevable comme preuve de persistance |
| M-06 — ED-03/04, C-18 à 23 | Aucun faux succès ni double publication ; validation échouée conserve r1 ; réponse perdue vérifiable ; onglet ancien refusé | S8/S9 ; erreur avant validation, perte de réponse après validation, double confirmation, deuxième onglet ; mécanisme d’injection décrit avant essai | Horodatages réels, identifiants d’opération, état persistant et messages ; couverture limitée aux pannes injectées |
| M-07 — C-02/19/24/25 | Brouillons non lisibles publiquement ; sortie non enregistrée explicite ; dépendance du lieu non supprimée silencieusement ; écriture non autorisée refusée | Lecture directe sans droit, requêtes d’écriture sans session/protection, lieu référencé ; vérifier absence de modification en stockage ; panne enregistrement | Requêtes expurgées des secrets, états avant/après et anomalies ; revue ciblée, pas audit de sécurité global |
| M-08 — clavier et structure | Trois parcours et scénario éditorial entièrement atteignables au clavier ; focus visible ; titres, noms et erreurs compréhensibles | Contrôles automatiques puis parcours manuel distinct ; lecture d’une page et d’une erreur avec technologie d’assistance identifiée | Rapports séparés, critères évalués et écarts ; référentiel et couverture à fixer avant audit, aucun taux global déduit |
| M-09 — présentation | Aucun texte utile perdu à 320/390/768/1440 px ou zoom 200 % ; toutes les plages lisibles ; action cible 44 px ; contraste des états évalué | Captures sur navigateur/version identifiés ; zoom ; mesures et revue manuelle ; une largeur CSS n’est pas un appareil réel | Dimensions, mesures et captures ; autres supports non évalués ; aucun « mobile validé » à partir des seules planches |
| M-10 — P1/P2/P3-04, ED-06 | Sans aide initiale : restituer la visite du 18 novembre, les conditions/annulation, les horaires du lieu et l’inconnu physique ; distinguer brouillon/publication | Session humaine groupée décrite ci-dessous, une personne à la fois | Verbatims, aides, erreurs, abandons et résultats par tâche ; échantillon exploratoire sans généralisation |
| M-11 — livraison/reprise | Notice permet lancement et arrêt local ; reprise d’une copie identifiée retrouve la révision attendue ; archives préservées | Installation/lancement dans environnement propre à préciser, export puis restauration sur copie ; si autre machine disponible, essai distinct | Notice, dépendances, logs et empreintes ; ne pas annoncer seconde machine sans essai réel |
| M-12 — qualité technique et coût d’usage | Aucun lien interne cassé dans le corpus ; aucune ressource distante indispensable ; temps et poids mesurés selon protocole préétabli | Inventaire des destinations ; réseau observé ; 10 mesures après démarrage sur même appareil et données, médiane et maximum | Appareil, outils, conditions, mesures ; budget temporel encore ouvert, à fixer avant essais ; aucune performance déclarée acceptable sans ce budget |
| M-13 — présentation honnête | Nature fictive/personnelle, contributions et simulations cohérentes ; aucun faux lien d’essai ; ressources traçables | Revue croisée future étude Voir/Essayer/Examiner, notice et version essayable ; registre de ressources | Relevé des affirmations et pièces ; droits ouverts conservés, aucune conformité juridique globale |

## Session humaine groupée proposée

Après réalisation et autorisation d’essai, proposer trois adultes volontaires, sans en faire un échantillon représentatif ; aucun recrutement ni contact engagé ici. Une session par personne regroupe les mêmes tâches :

1. Depuis l’accueil, déterminer si une visite à la mairie est possible l’après-midi du 18 novembre ; expliquer la réponse avec ses mots.
2. Retrouver l’événement, ses conditions, puis examiner sa variante annulée clairement annoncée comme autre état ; expliquer ce que l’on peut conclure.
3. Retrouver la médiathèque, ses plages du samedi et l’information sur l’accès physique.
4. Dans l’outil éditorial, préparer la modification, expliquer ce qui est public avant et après confirmation ; aucune action externe réelle.
5. Expliquer la nature du projet et les limites des preuves consultées.

Critère par tâche proposé : réponse factuellement correcte et issue atteinte sans aide ; sinon consigner « avec aide », « non abouti », « abandon » ou « non concluant » et le fait observé. Pas de score moyen effaçant une confusion sur l’annulation ou la publication. Une aide nécessaire ou un abandon est conservé et appelle une analyse, pas une reformulation favorable. Aucun seuil de durée ou de satisfaction imposé. Les tâches éditoriales devront être contextualisées si la personne n’a jamais édité de contenu.

Avant la session : accord sur la participation et les notes, supports, conservation et anonymisation ; aucun enregistrement par défaut. Pas de nom réel requis dans les contenus de démonstration. Participants, dispositifs et modalités restent à confirmer avant toute invitation.

## Rapport futur et règles de suite

Chaque contrôle exécuté devra recevoir : date, version, environnement, protocole effectivement suivi, observations, résultat limité, pièce réelle, anomalie et responsable de suite. Une exécution interrompue conserve sa couverture. Aucun lien de preuve d’exécution n’est créé artificiellement dans ce dossier.

Bloquants proposés pour présenter un essai comme fidèle à ce lot : fuite de brouillon, fausse confirmation de publication, annulation masquée, donnée réelle présentée comme fictive ou inversement, écriture non autorisée, étape principale impraticable. Conserver l’échec et corriger, ou retirer l’affirmation/fonction concernée en faisant arbitrer la réduction ; ne pas baisser le critère pour obtenir une réussite.

Pas de PASS global mêlant documentaire, technique et humain. Le budget de performance, le détail de l’évaluation d’accessibilité et les environnements de reprise sont encore ouverts ; ils devront être fixés avant leurs essais. La matrice est un plan applicable, pas une recette prête à exécuter sans ces compléments et sans autorisation de réalisation.
