# Préparation de l’archive consolidée

22 octobre 2026. Serveur humain arrêté proprement avant copie (state.json STOPPED).

Tentative 1 refusée par le garde d’archive sur busy.sqlite.running : inspection confirme qu’il s’agit du témoin volontaire du contrôle négatif « lancement avec témoin préexistant ». Il est conservé, sans suppression ni interprétation comme serveur actif. Autres copies complètes historiques exclues de la sélection et conservées localement.

Tentative 2 refusée par le détecteur de clés sensibles sur authorization dans les snapshots de séance : ce champ contient la phrase de description « User explicitly requested a guided grouped local acceptance session retaining difficulties/failures; no external publication », pas un en-tête HTTP ou un jeton. Exception limitée à ce préfixe descriptif ; contrôles secret, cookie, CSRF et jetons maintenus. Aucune donnée sensible détectée au-delà de ces faux positifs. Ce contrôle de sélection ne constitue pas un audit général de sécurité.

Le lanceur Python local émet « Failed to find real location of C:\Python314\python.exe » mais exécute le script ; les codes de sortie et la vérification explicite de ZIP/empreintes déterminent le résultat de l’archivage. Les refus précédents n’avaient créé ni archive ni manifeste final.

L’archive consolidée exclut les ZIP imbriqués pour éviter les duplications ; archives V1/V2/V4 et démarrage conservées séparément. Les bases fictives figées, rapports et captures sont inclus, jamais les outils téléchargés ou les dépendances dupliquées. Le dépôt public reçoit code et preuves, pas de déploiement du site.
