# Belle-Rive — bilan consolidé de recette V5

22 octobre 2026. Sources finales 0.2.1. Recette locale sur Windows 11, participant P01 sur PC portable avec Brave (version non recueillie). Séance guidée du concepteur, déclarations par chat ; pas d’observation directe ou de recrutement indépendant. Ce bilan conserve les résultats mixtes, aides et omissions. Aucun HUMAN_PASS global ni acceptation commerciale déduit.

## Résultat humain et limites

| Parcours | Retour recueilli | Limites et difficultés conservées |
|---|---|---|
| Visite mairie, exception | 9–12 h maintenu, fermeture après-midi ; « c’est clair » | Navigation/source et autonomie non observées |
| Événement | 21/11, 15–16 h, médiathèque, adresse, gratuit et sans réservation ; aucune difficulté déclarée | Âge, accompagnement et capacité non reformulés |
| Lieu / accès physique | Réponse initiale « fermé le samedi », Place de la Mairie, accès introuvable | Mauvaise fiche : mairie par Informations pratiques, également fiche de préparation. Échec initial conservé. Aide explicite vers médiathèque donnée. Après aide : bons horaires/adresse et texte d’information inconnue ; entrée non reformulée, compréhension en propres mots non établie |
| Annulation | Séance annulée, aucune date annoncée | Décision de déplacement non explicitée |
| Édition initiale | Brouillon non visible, refus pour texte manquant compris ; effet de publication/historique compris | Tentative 0.1.2 interprétée comme « OK » puis opération introuvable ; r1, zéro opération confirmés. Bouton initial exact inconnu. Ambiguïté reproduite séparément, sans attribuer ce chemin au participant |
| Édition après clarification 0.1.3 | « pass » ; contrôle technique r2, une opération, historique r1/r2 | Réussite après correction et consignes ; titre/message exact non recueillis. Ne supprime pas l’échec précédent |
| Tableau de qualité 0.2.0 | Accès physique inconnu et texte d’exception manquant distingués, public inchangé ; aucune difficulté déclarée | Déclaration guidée, pas validation indépendante |
| Comparaison / aperçu 0.2.1 | Ajout d’exception, fermeture après-midi et matin maintenu compris ; public inchangé, aucune difficulté, aucune publication déclarée | Contrôle SQLite indépendant : r1, zéro opération, brouillon génération 4 conservé. Aucun test humain de publication finale dans cette copie |

Débrief : usage envisagé pour présenter à une mairie en précisant les données fictives. Priorités exprimées : « Lieux publics » et publication claire. C’est l’intention du concepteur, pas un retour de mairie ou une intention d’achat externe. Demande de suppression des mentions publiques d’IA, puis critique de répétition des avertissements conservées dans les notes. La provenance historique reste archivée.

Verbatims, versions et aides : `work/belle-rive-lot1/evidence/human-session-20261021-O44Zh8/NOTES_V1.md` à `NOTES_V15.md`, événements et snapshots ; puis `evidence/human-editorial-v4-DxmhpC/NOTES_V1.md` à `NOTES_V3.md`, `participant-events.jsonl`, `session-v2.json`, `preview-after-human-v1.json`. Les états initiaux ne sont pas réécrits.

## Évolutions livrées

- 0.1.2 : retrait du crédit d’assistance en pied de page.
- 0.1.3 : état « pas encore publié », récupération hors chemin nominal, accusé serveur lié à l’opération avant annonce de succès.
- 0.2.0 : comparaison des champs modifiés, aperçu au même rendu que la fiche, tableau authentifié de qualité public/brouillons, libellé « Lieux publics ». Historique, protections et refus maintenus. Aucune correction automatique des informations.
- 0.2.1 : rappels d’habillage allégés, bandeau général et limites utiles conservés. Bases, textes enregistrés et preuves historiques inchangés par cet allégement. Aucune nouvelle dépendance applicative.

## Preuves techniques exécutées

Compilation stricte et assemblage 0.2.1 réussis ; huit tests regroupés réussis, six pages HTML contrôlées (`human-editorial-v4-DxmhpC/core-0.2.1.txt`, `copy-check-0.2.1.json`, `build-0.2.1.json`).

0.2.0 : Chromium 156.0.8078.4 et Firefox 157.0, règles de qualité, authentification, comparaison, aperçu échappé, absence de fuite, publication unique, historique et conflit : succès (`editorial-v4-io2yI5/report.json` et captures). Huit cas de publication nominale/rejeu, réponse 200 sans accusé, mauvais accusé et socket perdue après COMMIT : succès (`human-session-20261021-O44Zh8/publication-regression-v3-sXGqqw/report.json`). Libellé de version 0.1.3 codé en dur dans ce dernier lanceur ; manifeste atteste 0.2.0, annotation de provenance conservée.

Démarrage 0.2.0, trois copies neuves complètes, première invocation sans chauffe : **1 140,56 / 1 041,45 / 1 023,64 ms**, budget inchangé **≤5 000 ms**. Reprise, protections, historique, rejeu sans doublon, intégrité et arrêts propres : succès. Refus base absente/version inconnue/témoin/port occupé et non-exposition des artefacts : succès. Protocole fixé avant mesures, copie/build exclus du chronométrage. Voir `BELLE_RIVE_DEMARRAGE_V020.md`. Le changement d’habillage 0.2.1 n’a pas de mesure de démarrage propre ; ces chiffres ne lui sont pas réattribués.

## Échecs conservés et portée

Démarrage V1 7 239,73 ms, diagnostic 7 769,15 ms, essai interrompu et mesures V2 restent valides et conservés. Échecs de scripts de diagnostic/échappement, cache navigateur absent, accès réseau du bac à sable refusé et lancement Firefox dans le bac à sable conservés ou décrits ; rejeux autorisés sur boucle locale distingués. Première comparaison mobile trop étroite conservée en capture, correction et rejeu distincts. Première archive de démarrage avec deux noms report.json identiques conservée ; archive V2 à noms distincts fait référence.

Pas de qualification sur autre machine, panne physique, téléphone physique, lecteur d’écran ou audit RGAA complet. Les tests automatisés et déclarations humaines ne prouvent ni conformité générale, ni sécurité exhaustive, ni aptitude d’un service municipal réel. Horloge et données fictives ; aucune information physique inconnue transformée en accessibilité confirmée.

## Conservation et transfert autorisé

Serveur de la seconde séance arrêté proprement avant archivage des bases. Copies complètes de dépendances/outils conservées localement, exclues du transfert ; sources, verrous, manifestes, rapports, captures, états fictifs et archives sélectionnés conservés dans une nouvelle archive avec SHA-256 et contrôle de chaque entrée. Les anciens ZIP restent inchangés. Les bases fictives sont dans l’archive ; aucun secret, cookie, jeton de formulaire ou HTML éditorial privé n’y est attendu et le contrôle de sélection est conservé.

Push demandé explicitement vers `origin/master`, dépôt public `MickaelCompper/portfolio-web-jeux` : rend le code et les preuves sélectionnées publics. Cela ne déploie ni n’expose l’application. Aucun tunnel, écoute LAN ou service hébergé créé. Le résultat effectif du commit/push sera donné après exécution, sans le présumer ici.
