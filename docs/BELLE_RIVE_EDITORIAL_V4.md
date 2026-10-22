# Belle-Rive — prévisualisation comparative et qualité V4

22 octobre 2026 — version locale 0.2.0. Aucun push ni déploiement.

## Réalisé

« Lieux publics » remplace « Équipements » dans la navigation, l’accueil et les libellés de rubrique. L’URL historique `/rubrique/equipements` est conservée pour les liens existants. Les données et preuves historiques ne sont pas réécrites.

Préparer un brouillon valide affiche les champs modifiés, leur valeur actuellement publique et la valeur après publication, y compris une suppression. Un aperçu utilise le même partiel EJS que la fiche publique, avec les autres contenus actuellement publiés. Le texte est échappé ; les liens restent dirigés vers les fiches publiques actuelles. Une saisie non enregistrée ne fait pas partie de l’aperçu. La comparaison est défilante et accessible au clavier sur petit écran. Le détail complet reste consultable.

La confirmation indique explicitement que le brouillon n’est pas publié et décrit l’effet du bouton final sur la copie locale. L’accusé lié à l’opération, la vérification après réponse perdue, les refus de conflit et l’historique restent conservés. Prévisualiser ne crée ni révision ni opération.

Depuis « Édition et opérations », le tableau de qualité distingue versions publiques et brouillons enregistrés. Les règles signalent les erreurs de validation bloquantes, événements terminés, exceptions passées et accès physique explicitement inconnu. Les liens ouvrent le champ concerné. Aucun changement automatique ; « aucun signal » ne signifie ni véracité ni conformité. Horloge du scénario explicitement affichée. Le tableau reste authentifié et ne constitue pas un audit RGAA ou physique.

## Contrôles exécutés et preuves

- Compilation TypeScript stricte et assemblage réussis ; manifeste conservé dans les dossiers de tests.
- Huit tests existants réussis : `work/belle-rive-lot1/evidence/editorial-v4-6HJ5IR/core.txt`.
- Règles et parcours Chromium 156.0.8078.4 / Firefox 157.0 réussis : `editorial-v4-io2yI5/report.json`, captures comparaison et qualité. Accès refusé sans session, libellé, cinq différences, texte hostile échappé, absence de fuite publique, lecture sans publication, publication unique, historique et refus de demande ancienne vérifiés. Sources : `tests/editorial-v4.mjs`.
- Huit cas de régression de publication réussis : `human-session-20261021-O44Zh8/publication-regression-v3-sXGqqw/report.json`. Le lanceur historique porte un libellé 0.1.3 codé en dur ; le manifeste `build-before-tests.json` atteste le build 0.2.0 réellement exécuté. Annotation séparée `editorial-v4-6HJ5IR/publication-replay-provenance.json`, original conservé.

Les tests publient exclusivement dans des copies synthétiques isolées. La copie de recette humaine n’est pas publiée par l’agent.

## Échecs et limites conservés

Premier essai navigateur bloqué par chemin de cache absent : `editorial-v4-4Xlr92/report.json`. Deuxième essai bloqué par le réseau du bac à sable : `editorial-v4-PCJMS7/report.json`. Firefox du lanceur historique a également échoué dans le bac à sable avant exécution (registre Windows / sortie 3221225477). Rejeu hors bac à sable sur boucle locale seulement, sans téléchargement ni exposition distante, réussi. Une commande auxiliaire de modification a échoué sur l’échappement shell avant écriture ; remplacée par un fichier `.mjs`. La première capture montrait des colonnes mobiles trop étroites ; conservée dans `editorial-v4-6HJ5IR`, correction et nouveau rejeu dans `editorial-v4-io2yI5`.

Notes P01 V1–V15, échec de publication 0.1.2, preuves 0.1.3, échec de démarrage 7,24 s et archives V1/V2 conservés. Aucun HUMAN_PASS nouveau. Tests sur navigateurs automatisés, pas recette Brave humaine ou audit lecteur d’écran. Performance 0.2.0 non requalifiée ; budget inchangé de 5 s, sans revendication nouvelle. Règles limitées au corpus actuel ; aucun contrôle sémantique automatique de la véracité du texte.
