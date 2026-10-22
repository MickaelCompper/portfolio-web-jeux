# Belle-Rive — correction de la confirmation éditoriale, 0.1.3

21 octobre 2026. Intervention locale pendant la séance P01, après conservation de l’échec rapporté sur 0.1.2. Aucun push, déploiement ou acceptation humaine nouvelle.

## Faits et incertitudes

Le participant rapporte une page interprétée comme « OK », titre non retenu, puis un lien menant à « Publication à vérifier / Opération non trouvée ». Le stockage de sa copie confirme r1 publique, brouillon enregistré et zéro opération. Son message et cette absence de publication sont conservés ; le bouton initial effectivement actionné reste inconnu.

La copie a été arrêtée proprement et figée avant reproduction : SHA-256 `5a003438d1c66093a7d09a77dc683e2ef44f0c45d707600c350ea2793b3ea552`. Aucune publication par l’agent dans la copie du participant. Les variantes de test partent de copies isolées du même brouillon.

Reproduction 0.1.2 : la confirmation offre immédiatement « Vérifier le résultat de cette opération », avant tout clic de publication. Suivre ce lien conduit exactement au texte rapporté, avec r1 et zéro opération. Sur une seconde copie, le bouton final publie r2 et une seule opération. Cela établit un chemin ambigu reproductible ; cela ne prouve pas que le participant a suivi ce chemin ni qu’il n’a pas cliqué sur Publier. Rapport : `work/belle-rive-lot1/evidence/human-session-20261021-O44Zh8/publication-repro-v1-VNZ5RI/report.json`.

Lecture de code séparée : le navigateur utilisait tout HTTP 2xx du POST pour naviguer vers l’opération sans vérifier un accusé lié à cet identifiant. Ce constat n’établit pas qu’une réponse HTTP 200 inattendue explique le cas humain. Il motive un contrôle ciblé, distinct de la clarification d’interface.

## Changements

- Confirmation explicitement marquée « Brouillon enregistré — pas encore publié » ; le seul bouton qui déclenche la publication est nommé avant le résumé.
- Lien de récupération déplacé dans une aide « Si une réponse de publication a été interrompue », avec explication de l’usage. Le lien n’est plus présenté comme l’étape normale de confirmation.
- Après persistance réussie, le serveur renvoie `X-Belle-Rive-Operation` avec l’identifiant de la demande. Le navigateur exige cet accusé exact avant navigation automatique vers le résultat. Un 200 nu ou un identifiant différent produit une incertitude à vérifier, sans succès annoncé ni réessai automatique.

Transactions, historique, identifiant de tentative, protections session/CSRF/origine, reprise après réponse perdue et budgets restent inchangés. Le prébuild SQLite, le runtime et les dépendances directes ne changent pas. Aucune remise à zéro de la copie humaine. La clarification n’efface pas son échec initial et ne crée pas une réussite sans aide.

## Contrôles exécutés

Compilation TypeScript stricte puis assemblage 0.1.3 réussis. Huit tests regroupés réussis (`core-0.1.3.txt` dans le dossier P01), incluant refus, stockage, scénarios, sessions et dix renouvellements par limite.

Huit cas navigateur sur copies isolées, Chromium Playwright 156.0.8078.4 et Firefox Playwright 157.0 : nominal et rejeu, réponse 200 sans accusé, accusé différent et rupture de socket après COMMIT. État non publié explicite et aide de récupération hors parcours nominal vérifiés. Cas nominaux : r2, une opération et deux révisions ; cas 200 inattendu/mauvais accusé : r1 et zéro opération, incertitude affichée ; réponse perdue après COMMIT : r2 et une opération retrouvées par vérification. Aucun doublon. Rapport et captures : `publication-regression-v3-Zgxfl9/report.json`, dans le dossier P01. Source reproductible : `tests/publication-clarity-v3.mjs`.

Ces résultats automatisés restent distincts du retour humain, de Brave non instrumenté, d’une revue AT et d’une qualification de performance 0.1.3 non rejouée. Le seul fait de relancer la copie ne valide pas la compréhension de la nouvelle confirmation : reprise humaine encore à recueillir.
