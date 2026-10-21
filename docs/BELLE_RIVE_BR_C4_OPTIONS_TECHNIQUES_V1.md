# Belle-Rive — BR-C4 — Options techniques et recommandation

Version 1 — 21 octobre 2026. Étude de conception ; aucune installation, expérimentation ou décision technique utilisateur déduite.

## Question à résoudre

Faire consulter quatre contenus, rechercher uniquement leurs versions publiques et préparer/publier une exception d’horaire avec historique persistant. La [direction graphique](BELLE_RIVE_BR_C3_VALIDATION.md) est validée ; le [contrat fonctionnel proposé](BELLE_RIVE_BR_C4_COMPORTEMENTS_V1.md) doit guider le choix, sans réservation ni espace usager.

## Comparaison qualitative

Les appréciations ci-dessous sont des inférences de conception adaptées au lot, pas un benchmark de coût ou de performance.

| Option | Intérêt | Travail et risque pour Belle-Rive | Position recommandée |
|---|---|---|---|
| A — Site statique et fichiers versionnés | Consultation et contenu faciles à conserver dans des versions identifiables | Publication par génération/remplacement de fichiers à orchestrer ; outil de brouillon/publication non fourni par le simple site ; une animation de publication ne prouverait pas la persistance | Adapté si l’éditorial devient une étude documentaire, ce qui réduirait la démonstration prévue ; non retenu comme recommandation principale |
| B — WordPress local et présentation spécifique | Éditeur, prévisualisation et historique existants ; expérience de CMS pertinente pour le domaine collectivités | Types/champs, recherche exacte, séparation d’une révision de travail d’un contenu déjà publié, droits, restauration et fidélité graphique à vérifier ; ne pas supposer le contrat C-12 à C-25 acquis par défaut | Alternative crédible si la priorité devient la maîtrise d’un CMS existant |
| C — Petite application locale, rendu serveur et SQLite | Un même modèle pour contenus publics, révisions et recherche ; scénario et erreurs précisément observables | Développer formulaire éditorial, validation, autorisation, protections, reprise et notice ; charge supplémentaire réelle, aucune aptitude d’exploitation déduite | Recommandation pour le démonstrateur borné, sous réserve de validation du périmètre d’édition et de ses protections |

Pas de score agrégé : A réduit le poids de l’outil mais ne couvre pas seule la preuve éditoriale ; B réutilise un outil mais nécessite une vérification spécifique ; C donne un contrôle précis au prix de code et de preuves à produire.

## Appuis documentaires vérifiés le 21 octobre 2026

WordPress documente l’historique des brouillons enregistrés et mises à jour publiées ainsi que la comparaison/restauration des révisions. Cela établit l’existence du mécanisme documenté, pas sa couverture des champs Belle-Rive ou d’un brouillon parallèle à une fiche publiée. [Documentation officielle des révisions](https://wordpress.org/documentation/article/revisions/).

La documentation WordPress décrit aussi les prévisualisations selon plusieurs largeurs ; une prévisualisation reste distincte d’un essai sur appareil. [Documentation officielle de prévisualisation](https://wordpress.org/documentation/article/how-to-use-the-preview-function/).

SQLite documente les transactions explicites, validation/annulation, plusieurs lectures simultanées et une seule écriture simultanée. Cela soutient la proposition d’une bascule transactionnelle, sans prouver le futur code, les protections ou la conservation après tout type de panne. [Documentation officielle des transactions](https://www.sqlite.org/lang_transaction.html).

Aucune version de logiciel choisie, installée ou testée. Les documentations peuvent évoluer ; vérifier à nouveau les versions retenues avant réalisation.

## Architecture recommandée C, à valider

Une seule application locale rend les vues publiques et un petit outil éditorial distinct. Pas d’application monopage nécessaire, moteur externe de recherche, service distant ou orchestration de plusieurs serveurs. Le navigateur affiche des pages et soumet des formulaires ; le serveur décide des autorisations et de la publication.

Modèle logique : contenus stables → révisions conservées → référence vers la révision publique ; opérations de publication identifiées avec résultat persistant. Cette description n’est ni un schéma SQL ni une base créée. Recherche calculée sur les quatre révisions publiques, sans index externe ; relations résolues depuis les mêmes références publiques. Date du scénario séparée de l’horodatage réel des opérations.

Publication : revalider les données et la révision de départ, conserver la révision à publier, modifier la référence publique et consigner le résultat dans une transaction. Si réponse perdue, retrouver ce résultat avant de réessayer. Les pages déjà ouvertes ne se mettent pas à jour automatiquement.

**Socle de langage recommandé : TypeScript côté serveur et gabarits HTML rendus sur le serveur, CSS pour la présentation ; JavaScript navigateur limité aux améliorations utiles.** Ce choix est une préférence de cohérence de code et de lisibilité, sans performance mesurée. Runtime, bibliothèque HTTP, gabarits, pilote SQLite et versions restent à arrêter dans une fiche de dépendances avant le premier code, selon disponibilité, compatibilité et maintenance documentées. Aucun ajout de framework n’est nécessaire à la décision de périmètre présente.

## Frontières de livraison proposées

- Première exécution future sur la machine locale uniquement, accès de boucle locale ; aucune exposition réseau ou hébergement implicite.
- Outil éditorial limité aux révisions des quatre contenus, un acteur ; pas de gestion générale des pages, médias ou utilisateurs.
- Notice de lancement et d’arrêt, restauration d’un état de scénario depuis une copie identifiée, export des contenus et révisions, manifeste et rapports. Une remise à zéro future utilise une copie de travail sans écraser les preuves.
- Conserver les originaux et anciennes versions. Copie de sauvegarde et reprise à vérifier localement ; aucune garantie de sauvegarde d’exploitation ou de maintenance.
- Secrets hors fichiers présentables ; autorisations et protections d’écriture nécessaires même en local ; aucune allégation de sécurité globale.

L’administration locale est un moyen de démonstration, pas une offre municipale exploitable. Un hébergement futur imposerait une étude distincte des accès, mises à jour, sauvegardes, journaux et responsabilités.

## Arbitrage regroupé

Proposition à accepter ou ajuster : **retenir l’option C pour un futur démonstrateur local, avec édition persistante des quatre contenus et protections minimales explicites, sans exposition réseau.** Cela ne vaut pas autorisation de réalisation. L’option B reste disponible si l’utilisateur préfère démontrer l’intégration d’un CMS existant. Le choix exact des bibliothèques est un détail de préparation technique à documenter, pas un motif pour développer maintenant.
