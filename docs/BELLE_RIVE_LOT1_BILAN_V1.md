# Belle-Rive — lot local 1, bilan mesuré V1

21 octobre 2026. Version **0.1.0 examinable localement**, réalisée dans `work/belle-rive-lot1` sur autorisation explicite de ce nouveau chat. La clôture de conception et l’étape 1 restent historiques et intactes. Aucun résultat de ce lot n’est une acceptation utilisateur. **Pas de PASS global : un démarrage de reprise dépasse le budget ; contrôles humains et assistance non exécutés.**

Accès : [notice réellement liée au lanceur et aux essais](../work/belle-rive-lot1/NOTICE.md), [socle et sources R-01/R-02](../work/belle-rive-lot1/DEPENDANCES_R01_R02_V1.md), [session humaine préparée, non exécutée](../work/belle-rive-lot1/SESSION_HUMAINE_PREPAREE_V1.md). Le serveur est arrêté en fin de recette ; l’URL locale nécessite un lancement selon la notice.

## Réalisation et périmètre

Application unique TypeScript strict/HTML serveur EJS/CSS/SQLite. Trois rubriques, quatre détails, recherche publique par mots entiers, états de recherche distincts, variantes S0–S9 sur copies séparées. Adresses et horaires fictifs, aucun service réel contacté par le produit. Palette, typographie locale et illustration originale reprises de la direction validée ; aucune photographie, logo institutionnel, police téléchargée ou donnée géographique réelle.

Édition locale des quatre contenus : brouillon persistant, génération et version de base contrôlées, validation avant confirmation dédiée, publication transactionnelle, révisions et opérations immuables, résultat récupérable après perte de réponse. L’empreinte canonique inclut identifiant/concurrence et JSON exact publié. Les données publiques suivent exclusivement leur référence de révision, jamais le brouillon ou un tri par date. Relations lues dans le même instantané. Pas de commande de retrait, de suppression ou de réinitialisation publique.

Contrôles Host et Origin exacts, CSRF, secret de lancement aléatoire renouvelé, sessions mémoire, cookie borné, temporisation de connexion, formulaires plats 64 Kio avec refus des champs inconnus/doublons, échappement EJS, liste fermée de ressources, no-store, CSP sans ressource distante et journal expurgé. Ces protections ont une couverture ciblée, pas une certification de sécurité. Le HTTP local et la menace d’un logiciel contrôlant le compte Windows restent des limites.

Seuls les téléchargements nécessaires à la réalisation/recette ont utilisé le réseau externe. Aucun hébergement, tunnel, écoute LAN/0.0.0.0, push, PR, compte usager, réservation, paiement, notification réelle ou contact externe. L’écoute est codée exclusivement sur `127.0.0.1:4317`, sans port de repli. L’observation réseau navigateur ne trouve aucune requête applicative distante dans les parcours exécutés.

## R-01 à R-03

R-01 : sources officielles actualisées et archivées, graphe exact verrouillé avec 83 entrées de paquets et leurs licences/SRI, cache vérifié, audit npm sans vulnérabilité signalée à cette date. Seize avis Fastify conservés, comparaison des plages avec 5.12.7 ; index vides et réponse SECURITY.md 404 du pilote explicitement conservés. Revue bornée, aucune absence de faille ou maintenance garantie. Détail dans le document de dépendances.

R-02 : Node 24.22.1 portable vérifié par SHA-256 ; TypeScript 7.0.2 natif Windows lancé et compilation stricte exécutée ; imports EJS/SQLite réels et appels natifs SQLite 3.53.4 exécutés. Aucun changement des familles ou versions directes, ni `any` global ni skipLibCheck permissif. La tentative initiale de compilation échouée reste archivée. Compatibilité établie seulement sur cette machine x64.

R-03 : inactivité 30 minutes ; durée quatre heures explicitement renouvelable. Navigation éditoriale et POST protégés valides réinitialisent l’inactivité ; ni saisie locale non transmise, ni lecture publique, ni vérification automatique d’état. L’échéance de durée ne bouge qu’à connexion/prolongation. Avertissement programmé deux minutes avant la plus proche limite, annonce sans compte à rebours permanent ; retour d’onglet relisant le serveur, expiration prioritaire si dépassée. Saisie conservée lors de prolongation ; aucune publication automatique. Dix prolongations pour chaque limite vérifiées aussi par HTTP protégé. La lecture effective des annonces avec NVDA et l’appréciation visuelle humaine ne sont pas déduites.

## Environnement et protocole

Windows 11 Pro 10.0.26200 x64, Intel Core i9-14900HX, mémoire déclarée 68 406 091 776 octets ; Node portable 24.22.1. Relevé via Node ; CIM était indisponible dans le bac à sable. Alimentation et charge de fond non mesurées ; aucune charge volontaire ajoutée. Aucun autre matériel qualifié.

[Protocole V1 fixé avant mesure](../work/belle-rive-lot1/evidence/protocol-v1.md), [précision V2 conservant les budgets](../work/belle-rive-lot1/evidence/protocol-v2.md). Sources, build, verrou et données identifiés avant chaque série dans `build-before-measure.json`. Une chauffe exclue puis dix requêtes séquentielles par destination ; dix copies S0 pour enregistrement/publication ; trois départs. Mesure HTTP jusqu’au dernier octet, sans rendu/perception humaine. Troisième série avec connexion fermée explicitement pour inclure le coût de connexion et éviter une socket d’instance arrêtée.

## Mesures conservées

Série de référence : [données brutes](../work/belle-rive-lot1/evidence/measures/run-YCwyEh/report.json). Elle termine les mesures HTTP mais s’interrompt au premier lancement de la copie propre ; cette interruption n’est pas effacée. La [reprise indépendante suivante](../work/belle-rive-lot1/evidence/measures/reprise-6oGk8G/report.json) termine sa vérification avec un dépassement du budget de démarrage.

| Objet | Mesure exécutée | Budget inchangé | Résultat limité |
|---|---|---|---|
| HTML/recherche, 11 destinations × 10 | Médianes 4,31 à 6,79 ms ; maximum 13,56 ms | Médiane ≤200, max ≤500 ms | Sous seuils sur cette machine/ces copies |
| Enregistrement, 10 copies | Médiane 18,22 ms ; max 20,86 ms | Médiane ≤500, max ≤1000 ms | Sous seuils |
| Publication, 10 copies | Médiane 17,37 ms ; max 22,57 ms | Médiane ≤500, max ≤1000 ms | Sous seuils |
| Démarrage dossier principal, 3 départs | 406,77 / 410,30 / 393,83 ms | Max ≤5 s | Sous seuil, arrêt et invalidation entre départs |
| Reprise dans dossier neuf | 7 239,73 ms, après un premier délai d’observation dépassé | ≤5 s | **ÉCHEC budget** ; cause non établie, aucun seuil assoupli |
| Pages publiques/connexion, 24 états observés | Maximum 10 890 octets, en-têtes et corps réseau, cache neuf, sans compression applicative | ≤750 Kio | Sous seuil pour ces états ; poids éditorial complet non mesuré |
| Requêtes distantes applicatives | 0 observée durant les parcours exécutés | 0 nécessaire | Portée des parcours seulement |

Les temps HTTP concernent le build serveur figé. L’ultime ajustement de minuterie du script navigateur n’en change pas le code serveur ; il a sa recette navigateur finale distincte. Les poids finaux sont ceux de la dernière série de variantes. Pas de performance perçue ni charge multiutilisateur qualifiée. Le dépassement de reprise empêche une qualification générale de démarrage conforme.

## Matrice M, sans fusion des preuves

| Matrice | Exécution et pièce | Limite maintenue |
|---|---|---|
| M-01 mairie | S0/S2/S7, contenus, exception, horaires et inconnu automatisés/capturés | Explication par une personne non observée |
| M-02 événement | Frontières exactes avant/début/fin, annulation et surfaces accueil/agenda/détail/recherche/lieu contrôlées | Compréhension humaine non observée |
| M-03 équipement | Plages et relations, absence d’événement S6 et inconnu physique contrôlés | Aucun contrôle de bâtiment ou appareil physique |
| M-04 recherche | Accents/casse, mots entiers, tous mots requis, zéro/vide/121 caractères/indisponibilité, échappement | Corpus limité aux quatre contenus |
| M-05 persistance | Brouillon distinct du public, r1/r2/r3 conservées, redémarrage/relecture, copie restaurée | Pas de résilience matérielle |
| M-06 incidents | Conflit ancien onglet, S8/S9, erreur avant COMMIT, idempotence, rupture réelle de socket après COMMIT et récupération | Pas toutes les pannes disque/OS ; injection interne au test, absente du lanceur |
| M-07 protection/session | Host/Origin/CSRF/session, corps, rate limit, fichiers privés, renouvellements et expiration vérifiés | Revue ciblée ; pas pentest exhaustif |
| M-08 accessibilité/clavier | Axe, lien d’évitement clavier automatisé, focus synthèse, séquence éditoriale automatisée | Parcours clavier manuel complet et AT non exécutés |
| M-09 présentation | 320/390/768/1440 px, débordement automatique, captures et inspection visuelle limitée par l’agent ; espacement sur 24 états | Zoom navigateur 200 %, mesures exhaustives des cibles 44 px et tous contrastes manuels non exécutés |
| M-10 humain | Session groupée préparée | **NON EXÉCUTÉ**, aucun participant ni verbatim |
| M-11 lancement/reprise | Initialisation explicite, 3 lancements/arrêts, copie/manifestes/intégrité/révision/opération retrouvées dans dossier neuf | Démarrage reprise hors budget ; autre machine et crash pendant écriture non qualifiés |
| M-12 usage technique | Mesures ci-dessus ; 129 vérifications de liens internes et zéro lien cassé parmi les liens essayés | Poids de toutes vues éditoriales non mesuré ; alimentation inconnue |
| M-13 honnêteté | Mentions fictives, provenance des ressources, notice et limites consignées | Aucune publication d’étude/code ni conformité juridique |

[Noyau final : 8 tests regroupés, tous réussis dans leur portée](../work/belle-rive-lot1/evidence/core-attempt-04.txt). [Navigateurs finaux : Chromium et Firefox Playwright](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/report.json), sans erreur JavaScript ni violation axe détectée sur les vues contrôlées. [Variantes finales : 24 états, 129 liens](../work/belle-rive-lot1/evidence/variants/run-ybJWIg/report.json), aucune violation axe détectée dans cette couverture. Cela n’équivaut pas à 55 critères validés ni à une conformité.

## Cas A et preuve graphique

| Cas | État réel |
|---|---|
| A-01 | Sous-ensemble automatisé : lien d’évitement et routes ; parcours manuel complet non exécuté |
| A-02 | États de recherche automatisés ; annonces AT non évaluées |
| A-03 | S2/S7/S6 et plages capturés, espacement automatisé ; zoom navigateur 200 % non exécuté |
| A-04 | Connexion/sauvegarde/confirmation/résultat automatisés sur deux moteurs ; pas session humaine |
| A-05 | S9 focus/saisie et réponse perdue essayés dans les navigateurs ; S8/conflit/rollback au noyau ; revue manuelle non exhaustive |
| A-06 | **NON EXÉCUTÉ : NVDA/Firefox non disponible pour cette recette** |
| A-07 | Délais/frontières/10 renouvellements pour chaque limite automatisés par modèle et HTTP ; avertissement/reprise d’onglet/prolongation essayés en navigateur ; lecture AT non exécutée |
| A-08 | Inventaire ressources et registre 55 × 17 vues tracés, sans taux ; décisions manuelles par vue encore ouvertes |

Le [registre de 935 cellules](../work/belle-rive-lot1/evidence/accessibility-register-v1.json) est une traçabilité produite après exécution depuis la checklist acceptée avant recette ; il n’est pas présenté comme un préenregistrement rétrospectif. Les lignes non évaluées restent explicites. Les fonctions absentes (audio/vidéo/mouvement/glisser/raccourci caractère) sont identifiées par inventaire, pas par réussite fictive.

Captures finales : [accueil large](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/chromium-1440-accueil.png), [accueil 320 px](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/chromium-320-accueil.png), [édition 320 px](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/chromium-edition-320.png), [erreur S9](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/chromium-erreur-S9.png), [publication à vérifier](../work/belle-rive-lot1/evidence/browser-data/run-pdOMMQ/chromium-publication-a-verifier.png). Inspection graphique limitée de captures par l’agent, distincte d’une appréciation utilisateur, de navigation humaine ou d’assistance.

## Échecs conservés et reports

Premiers accès DNS refusés en bac à sable, collecte SECURITY.md 404, première erreur de typage, deux erreurs du protocole noyau, accès navigateur loopback refusé, formulaire empêché par politique de référent, état de test réutilisé entre moteurs, avertissement axe de région corrigé, injection de style refusée par CSP : sorties conservées dans les tentatives numérotées. Les échecs de lancement et arrêts forcés de processus de recette sont conservés ; leurs copies de données ne sont pas réutilisées comme saines sans contrôle.

Le premier arrêt de recette fermait l’application et SQLite mais gardait le canal IPC ouvert : corrigé et rejoué. La deuxième série de mesure est interrompue par un échec fetch entre instances ; connexion explicitement fermée dans le protocole suivant. La reprise initiale dépasse 10 s d’observation et son processus a été terminé pour nettoyage ; la copie et son témoin restent préservés. L’essai indépendant suivant retrouve intégrité/révision/opération, s’arrête proprement mais dépasse toujours le budget 5 s. Aucun arrêt forcé assimilé à un arrêt propre, aucune récupération physique revendiquée.

Restent : performance de premier lancement d’une copie neuve ; Edge stable ; Firefox stable utilisateur ; NVDA/Firefox ; zoom réel 200 % ; revue manuelle exhaustive des 17 vues/55 critères et cibles ; observation humaine ; téléphone physique et autre machine ; panne pendant écriture. Ni invitation externe ni acceptation utilisateur fabriquée. Aucune étape de publication ou d’exploitation engagée.

## Conservation

`manifest-final-v1.json` identifie sources/build/données fictives/rapports/captures conservés ; archive source et preuves dans `archives/BELLE_RIVE_LOT1_V1.zip` avec empreinte adjacente. Les copies volumineuses de dépendances/outils/cache ne sont pas dupliquées dans cette archive : elles restent localement et sont identifiées par lock, inventaire SRI, sommes runtime et empreintes natives. Les empreintes identifient les fichiers, pas leur qualité ou acceptation. Aucun secret/cookie/jeton inclus.
