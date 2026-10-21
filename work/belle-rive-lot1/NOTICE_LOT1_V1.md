# Belle-Rive — lancement local du lot 1

Version 0.1.0, 21 octobre 2026. Démonstrateur personnel fictif, sans service municipal réel. Sources, données et recette dans ce sous-dossier ; conception originale conservée dans `../../docs` et `../../outputs`.

## Ouvrir la version préparée

Dans PowerShell :

```powershell
Set-Location 'C:\Users\micka\Documents\ChatGPT\portfolio\work\belle-rive-lot1'
./Start.ps1
```

Le script compile avec le compilateur local puis lance seulement si la compilation réussit. La base `data/demo.sqlite`, initialisée explicitement en S0, est prête. Une base absente, une version inconnue, un verrou de lancement existant ou le port occupé provoquent un refus ; aucun autre port ni hôte n’est choisi. Aucun téléchargement n’est nécessaire pour utiliser l’installation présente.

Ouvrir [Belle-Rive local](http://127.0.0.1:4317). L’adresse fonctionne uniquement quand le serveur est lancé sur cette machine. L’édition est accessible depuis le pied de page. Son secret change à chaque lancement et est affiché uniquement dans le terminal du lanceur : le coller dans le formulaire de connexion. Ne pas copier ce terminal dans un rapport ou une capture. Aucun compte usager, aucune donnée réelle ni publication réseau.

Après préparation d’une modification : enregistrer le brouillon, préparer la publication, relire tous les champs, puis « Publier cette révision ». Cela change uniquement la copie locale. Pour une réponse perdue, vérifier l’opération par le lien affiché ou par la liste « Édition et opérations », y compris après reconnexion. Ne pas déduire d’un échec réseau que la transaction a échoué.

La saisie déclenche « modifications non enregistrées » ; elle n’est pas sauvegardée à chaque frappe. Un échec de sauvegarde laisse la saisie dans la page avec JavaScript actif. Sans confirmation, copier le texte avant de recharger. L’avertissement de sortie dépend du navigateur et ne garantit aucune conservation après fermeture. Les brouillons enregistrés et les opérations sont persistants.

## Arrêter et copier

Dans le terminal du lanceur, Ctrl+C appelle l’arrêt propre. Attendre « Arrêt propre confirmé ; connexions fermées, sessions invalidées. » avant toute copie. La fermeture a été testée par le canal de contrôle du processus appelant le même gestionnaire ; aucune manipulation clavier humaine de Ctrl+C n’est attestée. La session n’est jamais reprise après arrêt.

Copie après arrêt, vers une destination neuve :

```powershell
& ./tools/node-v24.22.1-win-x64/node.exe dist/cli.js copy data/demo.sqlite data/copie-01.sqlite
& ./tools/node-v24.22.1-win-x64/node.exe dist/cli.js verify data/copie-01.sqlite
./Start.ps1 -Database data/copie-01.sqlite
```

La copie refuse un témoin `.running`, un journal ou WAL présent. Elle conserve un manifeste SHA-256. Ne pas supprimer manuellement un journal SQLite. Après arrêt brutal : conserver intégralement l’original et ses auxiliaires ; vérifier que le processus est terminé ; préparer une autre copie de récupération avec tous les fichiers SQLite présents ; travailler uniquement sur cette copie, puis vérifier intégrité, relations et opérations. Le témoin du lanceur original reste conservé comme trace de l’arrêt brutal ; il ne prouve pas à lui seul qu’un processus tourne encore. Aucune commande de nettoyage destructif fournie. La reprise après panne physique ou interruption pendant écriture n’est pas qualifiée.

## Préparer une autre variante

Après arrêt, une destination nouvelle doit être initialisée explicitement :

```powershell
./Initialize.ps1 -Database data/essai-S4-01.sqlite -Scenario S4
./Start.ps1 -Database data/essai-S4-01.sqlite
```

S0–S9 sont disponibles. S1→S2→S3 reproduisent aussi les révisions conservées ; S6/S7 sont des copies dégradées, S8/S9 des brouillons invalides. Les variantes ne se changent pas par une route publique. Aucune réinitialisation de la base principale n’est proposée.

## Session et limites

Inactivité 30 minutes ; échéance de durée quatre heures. « Prolonger la session » renouvelle explicitement les deux échéances ; au moins dix prolongations pour chacune ont été vérifiées automatiquement. Navigation éditoriale authentifiée et formulaires protégés réinitialisent l’inactivité, jamais les quatre heures. Saisie locale, consultation publique et contrôle automatique d’état ne maintiennent pas la session. Avertissement deux minutes avant l’échéance la plus proche ; un onglet suspendu relit l’autorité serveur à son retour. Ni expiration ni reconnexion ne publient.

Le HTTP local utilise un cookie HttpOnly/SameSite=Strict, non Secure, limité à `/edition`. Ce dispositif reste limité à la boucle locale et ne protège pas contre un programme contrôlant le même compte Windows. La recherche peut apparaître dans l’historique local du navigateur ; l’application ne conserve ni recherche personnelle ni télémétrie. Les journaux techniques locaux n’incluent pas les secrets, cookies, jetons, corps ou requêtes de recherche.

Node portable 24.22.1 et les dépendances sont conservés dans le projet, sans remplacement global. Les sources et dépendances directes sont identifiées par `package.json`/`package-lock.json`. Le graphe téléchargé a été contrôlé, mais aucun audit de sécurité exhaustif ou engagement de maintenance n’est revendiqué. Autre machine, Edge stable, Firefox stable utilisateur, NVDA, téléphone physique, zoom navigateur 200 % et session humaine ne sont pas validés.

Les séries de performance et la reprise locale sont détaillées dans le rapport ; l’essai de reprise initial interrompu n’est pas effacé par un essai suivant.
