# Belle-Rive — Préparation technique : stockage et transactions

Version 1 — 21 octobre 2026. Modèle documentaire proposé ; aucun SQL, migration ou base créé.

Références : [BR-C4 validé](BELLE_RIVE_BR_C4_VALIDATION.md), [contenus](BELLE_RIVE_BR_C2_MODELE_CONTENUS_V1.md), [comportements](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md).

## Entités logiques

| Entité | Données et contraintes proposées |
|---|---|
| Contenu | Identifiant stable IP/EV/EQ ; type immuable ; référence publique nullable ; compteur de concurrence. La référence publique doit désigner une révision du même contenu |
| Brouillon | Un brouillon par contenu ; corps structuré, génération d’enregistrement, base publique attendue, dernier instant réel d’enregistrement. Modifiable avant publication ; jamais exposé dans les vues publiques |
| Révision conservée | Identifiant interne, contenu propriétaire, numéro r, données structurées et version de leur format, provenance et date éditoriale fictive ; instant réel de publication séparé. Une révision publiée devient immuable |
| Opération de publication | Identifiant unique, empreinte de la demande canonique, contenu/base/génération attendus, révision résultante, instant réel, résultat. Rejouer la même opération ne crée pas une autre révision |
| État de scénario | Identifiant S et horloge fictive, version du corpus, origine de la copie de travail. Aucun changement via le portail public |
| Version du stockage | Version du modèle et historique des évolutions. Migration future sur copie, jamais directement sur une archive de preuve |

Les brouillons enregistrés sont persistants, mais chaque frappe n’est pas une révision historique. Les révisions r1/r2/r3 et opérations publiées sont conservées ; les anciens enregistrements intermédiaires du même brouillon ne sont pas promis. Un nouveau brouillon ne modifie jamais une ancienne révision.

Les champs détaillés IP/EV/EQ restent ceux de BR-C2. Recommandation : corps structuré versionné par type, sans HTML ; champs de date/organisation et relation d’événement suffisamment explicités pour validation. Les références critiques sont contraintes dans le modèle relationnel, pas seulement cachées dans du texte libre. Les données d’adresse et d’horaire du lieu ne sont pas recopiées dans EV-01.

## Invariants

1. Au plus une référence publique et un brouillon courant par contenu ; révision publique appartenant au même contenu.
2. Aucune suppression des révisions publiées ni des résultats de publication dans ce lot. Retrait éditorial non nécessaire ; s’il est introduit plus tard, dépendances du lieu à contrôler.
3. Toute nouvelle publication produit une révision immuable et un résultat d’opération cohérents dans une seule transaction.
4. Une demande réutilisant le même identifiant avec un contenu différent est refusée ; ne jamais retourner le succès de la première demande pour un autre texte.
5. Un brouillon enregistré depuis un onglet ancien est refusé sur génération incompatible ; comparaison requise à l’enregistrement et à la publication.
6. Les lectures publiques ne sélectionnent jamais une révision « la plus récente » par date : elles suivent exclusivement la référence publique.
7. Toutes les relations nécessaires à une page sont lues dans la même transaction de lecture, puis rendues depuis cet instantané ; aucune transaction maintenue ouverte pendant la saisie ou l’envoi réseau.

## Publication, séquence logique

Après contrôle de session et de requête : ouvrir une transaction d’écriture, retrouver l’opération si déjà réussie et comparer l’empreinte ; sinon relire brouillon, génération et base publique attendues ; valider les champs et les relations ; créer la révision immuable ; déplacer la référence publique ; retirer le brouillon courant correspondant ; conserver le résultat d’opération ; valider la transaction. Répondre ensuite, en redirigeant vers un résultat éditorial consultable.

En cas d’erreur avant validation : annuler la transaction, relire si nécessaire ; brouillon précédemment enregistré et ancienne référence publique conservés. En cas de perte de réponse après validation possible : afficher « publication à vérifier », relire l’opération authentifiée, puis seulement décider d’un réessai avec le même identifiant. Une opération non trouvée après reprise peut être retentée avec ce même identifiant et la même demande ; une divergence d’empreinte ou de base exige une nouvelle préparation explicite.

Le résultat d’opération persiste au redémarrage, contrairement à la session. Après réauthentification, l’outil permet de retrouver les opérations récentes et la version publique. Aucun identifiant d’opération utilisé comme secret d’accès. Les échecs non validés peuvent être notés dans le journal technique expurgé ; on ne prétend pas qu’ils sont conservés dans une transaction annulée.

## Réglages et limites proposés

Un processus, une base locale sur disque local hors dossier servi au navigateur. Contrôle des clés étrangères à chaque ouverture, avec vérification effective de son activation : SQLite documente ce réglage dans sa [référence officielle](https://www.sqlite.org/foreignkeys.html). Clés composites ou validation transactionnelle pour l’appartenance contenu/révision ; une simple clé étrangère d’identifiant ne suffit pas à cet invariant.

Proposition de départ : journal classique DELETE, synchronisation FULL, attente de verrou bornée à 1 seconde, transactions courtes. Pas de WAL nécessaire pour ce lot à un acteur. Ces réglages sont des exigences à appliquer puis relever, pas des garanties déjà obtenues. Échec d’obtention du verrou : message de réessai, aucune boucle infinie. Contrôles de format et de relations avant publication, validation serveur indépendante des seules contraintes SQL.

## Copie, reprise et scénarios

Recommandation pour le premier lot : copie **après arrêt propre et fermeture de toutes les connexions**, avec nom de destination nouveau, empreinte et manifeste des révisions. Ne pas copier uniquement le fichier principal d’une base active ou interrompue. Si une sauvegarde à chaud devient nécessaire, étudier le mécanisme dédié décrit par [SQLite](https://www.sqlite.org/backup.html) plutôt que le supposer équivalent à une copie de fichier.

Une archive issue d’un arrêt brutal conserve tous les fichiers auxiliaires concernés et l’original intact ; récupération seulement sur copie, puis vérification de l’intégrité et des relations. Ne pas supprimer manuellement un journal pour forcer l’ouverture. Échec de récupération : conserver les pièces et conclure non récupéré, sans prétendre retrouver les dernières écritures.

Restaurer S0 ou S4 signifie préparer une autre copie de travail à partir d’un corpus identifié ; aucune réinitialisation destructive dans le portail. La chaîne S1→S2→S3 reste un scénario continu ; les autres variantes repartent de S0 selon BR-C2. Les variantes volontairement invalides S7/S8/S9 ne doivent pas contaminer le corpus nominal ni désactiver ses règles de validation.

Preuves futures M-05/M-06/M-11 : états avant/après, opérations, erreurs injectées, redémarrage et restauration sur copie. **Non exécuté, résultat non testé.** Ni sauvegarde externalisée, ni résilience matérielle, ni exploitation durable démontrée.
