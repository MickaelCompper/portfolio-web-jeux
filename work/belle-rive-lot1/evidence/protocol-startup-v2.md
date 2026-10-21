# Protocole de non-régression 0.1.1 — fixé avant la nouvelle mesure M-12

Budget de démarrage inchangé : **maximum 5 000 ms**, invocation Node du build préparé jusqu’à confirmation d’écoute. Aucun échauffement, pas de déplacement de chargement vers une tâche cachée, aucun cache prérempli requis. Compilation/assemblage et copie hors chronométrage, comme dans V1. Observation 60 s distincte du seuil de réussite 5 s.

La comparaison primaire M-11 est préenregistrée dans `reprise-v2-*/protocol-before-measure.json` : trois paires de dossiers neufs, arbre complet de dépendances copié pour les deux lanceurs, même fichier SQLite initial SHA-256, origine 127.0.0.1:4317, révision/historique/opération, droits et publication/rejeu puis arrêt propre. Les essais instrumentés servent au diagnostic, pas à choisir ou éliminer un échantillon de la comparaison.

Rejeu M-12 : même méthode V1/V2 transport : une chauffe exclue puis dix requêtes séquentielles par destination HTML/recherche, Connection: close, médiane ≤200 ms et max ≤500 ms. Dix copies identiques pour enregistrement/publication, authentification et préparation hors mesure, médiane ≤500 ms et max ≤1000 ms. Trois démarrages du dossier de mesure puis une reprise neuve, tous résultats bruts conservés. Build 0.1.1 : `dist/build-manifest.json`, sources exactes, package-lock et runtime portable 24.22.1 ; esbuild 0.28.2 seulement au build. Aucun autre seuil modifié.

Noyau et navigateurs rejoués contre `runtime.bundle.js`, construit depuis les mêmes modules et options que `server.bundle.js`. Tests HTTP en processus séparés sur le vrai `server.bundle.js` dans chaque copie de reprise. Le refus d’un build erroné est exécuté sur une copie isolée avec anciens bundles sentinelles. Aucune altération des sources produit pour l’injection.

Portée : même machine Windows x64, copies nouvelles à première invocation ; aucune prétention de cache disque froid, de contrôle antivirus, de charge de fond/alimentation, de seconde machine, d’essai humain ou d’AT. Les échecs V1 (7,24 s et délai d’observation dépassé) restent inchangés et archivés.
