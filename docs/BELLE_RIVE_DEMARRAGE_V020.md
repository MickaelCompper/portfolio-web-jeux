# Belle-Rive — démarrage 0.2.0, 22 octobre 2026

Budget fixé avant mesure : 5 000 ms maximum. Trois premières invocations de copies neuves du build préparé, chacune avec arbre node_modules complet, vues, ressources et même base S2 vérifiée par SHA-256. Copie et compilation hors chronométrage, aucun échauffement de la copie. Mesure immédiatement avant fork jusqu’au message IPC après écoute réussie. Délai d’observation 60 s distinct du budget. Protocole V2 repris pour le lanceur assemblé actuel uniquement ; aucun nouveau duel ancien/nouveau revendiqué.

| Essai | Démarrage | Seuil | Arrêt propre |
|---|---:|---:|---|
| 1 | 1 140,56 ms | ≤5 000 ms | oui |
| 2 | 1 041,45 ms | ≤5 000 ms | oui |
| 3 | 1 023,64 ms | ≤5 000 ms | oui |

Les trois essais respectent le budget sur cette machine. Reprise r2, opération et anciennes révisions retrouvées ; ancienne session refusée au redémarrage ; refus Origin/CSRF ; enregistrement, préparation, publication r3 et rejeu sans doublon dans les copies synthétiques. Arrêts code 0, absence de témoin résiduel, intégrité SQLite ok et clés étrangères sans anomalie. Secrets reçus en mémoire uniquement, stdout du serveur non conservé.

Preuves : `work/belle-rive-lot1/evidence/measures/reprise-v4-uGp1vU/protocol-before-measure.json`, `report.json`, `evidence/startup-v4-attempt-01.txt`, source `tests/reprise-v4.mjs`. Le protocole contient le manifeste du build 0.2.0 exécuté. Les dossiers d’installation complets restent localement présents.

Refus de lancement rejoués : base absente, version de stockage inconnue, témoin préexistant conservé, port occupé sans repli. Entrée serveur réelle : bundles, source map, script de build et lockfile non servis (404). Preuves `evidence/measures/launch-guards-v2-7ZcvkQ/report.json` et `evidence/launch-guards-v4-attempt-01.txt`. Le nom V2 identifie le lanceur de test historique réutilisé ; cette exécution porte sur le build 0.2.0.

Les échecs V1 à 7 239,73 ms, diagnostic à 7 769,15 ms, essai interrompu, mesures V2 et archives précédentes sont conservés sans remplacement. Aucun cache vidé ou prérempli, antivirus modifié ni seuil assoupli. Charge de fond et alimentation non maîtrisées : ni cache physiquement froid, ni autre machine, ni garantie universelle. Aucune acceptation humaine déduite. Aucun push, déploiement, tunnel ou écoute LAN ; seuls des serveurs 127.0.0.1:4317 ont été utilisés.

Après tests, une nouvelle copie de recette éditoriale est préparée avec original figé, notes séparées et secret uniquement dans le terminal. Elle contient une exception volontairement incomplète dans un brouillon, sans changement public. Le parcours humain s’arrête à la comparaison et à la prévisualisation : aucune publication demandée.

Archive de référence : `evidence/BELLE_RIVE_DEMARRAGE_V020_20261022_V2.zip`, SHA-256 `b12878f98e21e73f03992f0e6bb2c8b1218ae6d02550a801de00d8c40740a0f6`. La première archive reste conservée ; elle contenait deux entrées nommées `report.json`, ambiguës à l’extraction. V2 leur donne des noms distincts sans modifier les mesures.

Copie humaine : `evidence/human-editorial-v4-DxmhpC`, prête sur 127.0.0.1:4317. Original figé et métadonnées conservés ; aucune réponse humaine encore recueillie pour cette nouvelle séance.
