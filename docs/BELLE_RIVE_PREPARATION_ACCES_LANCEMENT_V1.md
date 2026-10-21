# Belle-Rive — Préparation technique : accès et lancement local

Version 1 — 21 octobre 2026. Contrat documentaire proposé, aucune commande de lancement exécutée.

## Environnement borné

Une application, un processus, une origine proposée `http://127.0.0.1:4317`. Écoute exclusivement sur cette adresse IPv4 ; ni 0.0.0.0, ni adresse réseau locale, ni proxy ou tunnel. Port occupé : arrêt avec diagnostic, pas de changement silencieux d’origine. Aucun hôte alternatif autorisé par défaut, même `localhost`, afin de garder un contrat d’origine exact. Ces valeurs sont proposées, pas des ressources ouvertes.

Répertoires futurs distincts : sources ; ressources publiques explicitement autorisées ; données de travail ; secrets locaux ; archives et preuves. Seules les ressources publiques autorisées sont servies. Ni chemins de base, ni secrets, ni logs, ni docs de travail accessibles depuis une URL. Aucun nom de fichier provenant d’une requête utilisé directement comme chemin système.

## Accès éditorial proposé

Pas de compte usager. Pour l’acteur éditorial local : secret aléatoire de lancement, renouvelé à chaque démarrage, présenté seulement au terminal local du lanceur ; jamais en URL, dans les contenus ou les journaux. Saisie dans un formulaire de connexion local. Proposition : 32 octets aléatoires pour le secret et pour les identifiants de session ; génération cryptographique, pas pseudo-aléatoire de présentation. Aucun secret généré ici.

Après authentification : identifiant de session opaque dans un cookie, état serveur en mémoire ; rotation à la connexion ; expiration après 30 minutes d’inactivité et au plus 4 heures ; déconnexion explicite ; arrêt du processus invalide toutes les sessions. Le secret de démarrage ne sert pas de cookie de session. Vérifier en temps constant les valeurs sensibles de taille attendue. Les paramètres constituent une proposition de contrôle, pas une preuve de sécurité.

Cookie éditorial : HttpOnly, SameSite=Strict, sans Domain, Path=/edition ; non persistant dans le navigateur. Pour ce HTTP strictement local, Secure n’est pas imposé comme s’il existait un transport HTTPS ; cette limite est explicite et interdit d’étendre le dispositif à un réseau. Le [plugin de cookies](https://raw.githubusercontent.com/fastify/fastify-cookie/v11.1.3/README.md) décrit ces attributs, sans fournir le contrôle d’autorisation complet. Pas de préfixe `__Host-` incompatible avec ce contrat HTTP et ce chemin.

Limiter les essais de connexion : cinq échecs par minute pour l’instance, réponse de temporisation puis nouvelle tentative, pas de verrou permanent. Le formulaire de connexion est lui aussi protégé par origine exacte et jeton de formulaire temporaire ; les sessions authentifiées ne sont pas créées par une lecture simple. Aucun accès public au résultat d’opération ou à la prévisualisation d’un brouillon.

## Règles de requête

| Objet | Exigence proposée et future preuve M-07 |
|---|---|
| Origine / Host | Valider Host exact ; pour toute modification et connexion, Origin exact requis, absent ou différent refusé ; pas de CORS permissif, pas de confiance aux en-têtes de proxy |
| CSRF | Jeton imprévisible lié au formulaire/session, vérifié côté serveur ; SameSite seul insuffisant ; aucun changement par GET |
| Autorisation | Toute route éditoriale vérifie session et expiration ; ne pas se fier à la visibilité d’un bouton |
| Corps | Formulaires plats uniquement ; limite 64 Kio avant décodage ; types et champs autorisés ; doublons et champs inconnus rejetés ; aucun fichier |
| Sorties | Échappement des textes ; pas d’exécution HTML de la recherche ou des contenus ; messages publics sans trace système |
| En-têtes | HTML : cache no-store ; type explicite ; nosniff ; politique interdisant les ressources distantes et l’intégration en cadre ; scripts locaux sans inline. Politique CSP exacte à vérifier avec les vues réelles |
| Journal | Instant réel, identifiant de requête/opération, catégorie d’échec ; pas de secret, cookie, jeton, corps éditorial ou requête de recherche ; retirer la query string des traces automatiques |
| Erreur | 400 saisie structurellement invalide ; 403 origine/jeton/droit refusé ; 409 conflit de génération ; 413 corps trop grand ; 422 contenu à corriger ; 503 stockage/recherche indisponible ; page utile et sortie cohérente |

La recherche conserve sa limite métier de 120 caractères, comptés en points de code Unicode après décodage et avant neutralisation des accents. La limite de corps 64 Kio ne remplace pas cette règle. Requête excessive rejetée par la couche HTTP : message explicite, sans promesse de conserver des mégaoctets de saisie. Dans la limite de transport, la saisie >120 reste visible et corrigible selon C-11.

## Lancement et arrêt futurs, sans commandes exécutables ici

Avant démarrage : version du socle identifiée, copie de travail choisie, aucun écrasement d’un fichier existant, version du stockage compatible, secrets exclus des livrables, adresse/port contrôlés. Une base absente n’est pas créée silencieusement au démarrage : initialisation explicite sur destination nouvelle.

Au démarrage : ouvrir la copie de base ; appliquer et vérifier les réglages ; refuser un modèle inconnu sans migration automatique ; initialiser l’accès éditorial ; écouter l’origine prévue. Ne pas annoncer « prêt » avant succès de ces étapes. La notice future donnera la procédure réelle et vérifiée, pas une commande fictive dans cette conception.

À l’arrêt : refuser de nouvelles publications, terminer ou annuler la transaction courante selon son état, fermer les connexions, invalider les sessions ; annoncer l’arrêt confirmé. Un délai d’arrêt de 5 secondes est proposé avant diagnostic ; ne pas assimiler une terminaison forcée à un arrêt propre. Copie de sauvegarde seulement selon le [contrat de stockage](BELLE_RIVE_PREPARATION_STOCKAGE_V1.md).

## Limite de menace et statut

Les protections visent les requêtes de navigateur non autorisées, la fuite de brouillon et les erreurs du scénario local. Elles ne protègent pas contre une personne ou un logiciel contrôlant le compte Windows et lisant ses fichiers/son terminal. Aucune sécurité d’hébergement ou de service municipal déduite. Toute exposition réseau exige un autre cadrage.

Tout reste **proposé, non implémenté, non testé**. Aucun secret, session, cookie, port ou processus produit créé par cette fiche.
