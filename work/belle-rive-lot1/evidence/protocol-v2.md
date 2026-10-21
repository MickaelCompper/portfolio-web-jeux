# Précision du transport et reprise des mesures — 21 octobre 2026

Le protocole V1 et tous les seuils restent conservés. Le premier essai a mis au jour le canal IPC de recette encore ouvert après fermeture fonctionnelle ; le lanceur le ferme désormais explicitement. Le deuxième essai a exécuté les trois démarrages et les lectures, puis a été interrompu par la réutilisation d’une connexion HTTP du client vers une instance arrêtée.

Précision avant le troisième essai : en-tête `Connection: close` sur toutes les requêtes de mesure ; chaque requête inclut donc l’établissement de sa connexion locale dans son temps. Dix copies identiques pour les écritures, authentification et préparation hors mesure. Aucun seuil ni échec antérieur modifié. Les séries interrompues restent identifiées et ne sont pas intégrées à une série réussie.

Conditions non maîtrisées : alimentation et charge de fond Windows non mesurées. Ces résultats restent locaux et ne qualifient pas un matériel tiers ni une charge d’exploitation. Le build et les empreintes des dépendances sont conservés avant chaque essai.
