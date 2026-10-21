# Belle-Rive — Accès éditorial : règle de session V2

21 octobre 2026. Conception uniquement. Modification acceptée par la [validation des finitions](BELLE_RIVE_FINITIONS_VALIDATION.md).

## Portée et antériorité

Cette V2 remplace le plafond absolu de quatre heures et complète les avertissements de délai de la [préparation d’accès V1](BELLE_RIVE_PREPARATION_ACCES_LANCEMENT_V1.md). Toutes ses autres protections restent applicables. Aucun secret, cookie ou session réelle créé.

## Règle acceptée et précision de fonctionnement

| Objet | Contrat V2 |
|---|---|
| Inactivité | Échéance après 30 minutes ; avertissement deux minutes avant |
| Durée de session | Échéance après quatre heures depuis connexion ou prolongation explicite ; plus de plafond absolu non renouvelable |
| Avertissement | Deux minutes avant la plus proche échéance, message nommé et action « Prolonger la session » ; si les deux limites approchent, une seule notification utile |
| Prolongation | Action explicite protégée par session valide, origine et jeton ; réinitialise l’inactivité à 30 minutes et l’échéance de durée à quatre heures depuis sa confirmation serveur |
| Répétition | Au moins dix prolongations successives possibles pour chaque limite ; aucun plafond de renouvellement arbitraire prévu dans ce lot |
| Activité ordinaire | Peut réinitialiser l’inactivité selon les interactions éditoriales reconnues ; ne repousse jamais silencieusement l’échéance de quatre heures |
| Absence de réponse | Expiration à l’échéance, session invalidée ; reconnexion nécessaire, sans publication automatique |
| Arrêt/déconnexion | Invalidation maintenue ; aucune prolongation ne survit à l’arrêt du processus |

La précision proposée pour l’activité reconnue est une action humaine de consultation/navigation ou de formulaire éditorial authentifiée, et non un polling automatique. La saisie locale ne sera réputée connue du serveur que si une indication protégée d’activité est effectivement prévue ; aucune promesse de maintien automatique à partir de frappes non transmises. La commande explicite de prolongation reste disponible pour éviter cette ambiguïté.

## Présentation et incidents à spécifier dans la réalisation

[Vue d’avertissement SVG](../outputs/BELLE_RIVE_SESSION_AVERTISSEMENT_V2.svg) · [PNG](../outputs/BELLE_RIVE_SESSION_AVERTISSEMENT_V2.png). Proposition de composition fixe complémentaire aux vues acceptées, sans commande active.

Message proposé : « Votre session va expirer dans deux minutes. Prolongez-la pour continuer l’édition. Cette action ne publie pas vos modifications. » Afficher une heure d’expiration confirmée seulement sur le produit réel. Pas de compte à rebours annoncé à chaque seconde. Annonce accessible une fois à l’apparition ; action atteignable au clavier, sans piège modal ou publication déclenchée au focus.

Le serveur reste l’autorité sur les échéances. Onglet suspendu ou retour tardif : vérifier la session ; ne pas annoncer deux minutes restantes si elles sont déjà écoulées. Si les deux délais se rapprochent, le plus proche commande l’expiration. Une nouvelle notification n’apparaît qu’à une nouvelle échéance après prolongation, sans répétition intrusive permanente.

Ne confirmer la prolongation qu’après réponse serveur réussie. Si réponse perdue : « Prolongation à vérifier », relire l’état authentifié avant d’annoncer une nouvelle échéance. Si expirée : expliquer la reconnexion, sans prolonger rétroactivement. Brouillon déjà enregistré conservé ; saisie non enregistrée conservée dans la page tant que possible, sans garantie après fermeture et sans stockage secret dans le navigateur. Ne jamais publier à la reconnexion.

## Protocole futur A-07 / M-07 / M-08

Prévoir une horloge contrôlée de recette, distincte de l’horloge fictive des événements : vérifier les limites à deux minutes avant, juste avant et à l’expiration ; dix prolongations successives ; limites simultanées ; onglet suspendu ; réponse perdue ; refus pour session expirée, origine ou jeton invalide ; arrêt et déconnexion. Conserver échéances serveur, états et annonces sans jeton ni cookie dans les traces.

La prolongation doit conserver la saisie sans publier. La notification doit être lue et actionnée au clavier et avec NVDA/Firefox selon les environnements acceptés. L’applicabilité et le résultat de chaque critère WCAG restent à observer sur le futur produit ; aucune conformité déduite de la validation de cette règle.

**État : règle documentaire acceptée ; illustration complémentaire et précisions d’interface proposées ; aucune implémentation ni recette exécutée.**
