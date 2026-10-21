# Belle-Rive — BR-C2 — Modèle des contenus

Version 1 — 21 octobre 2026. Spécification documentaire proposée ; aucun schéma logiciel ou stockage créé.

Références : [architecture](BELLE_RIVE_BR_C2_ARCHITECTURE_V1.md), [corpus](BELLE_RIVE_BR_C2_CORPUS_V1.md), [scénario éditorial BR-C1](BELLE_RIVE_BR_C1_EDITORIAL_V1.md).

## Champs communs

« Obligatoire » désigne une règle de publication recommandée pour le futur produit, pas un contrôle actuellement implémenté. Un brouillon incomplet peut être préparé ; il ne doit pas être annoncé publiable tant que les champs requis manquent.

| Champ | Forme attendue | Règle proposée |
|---|---|---|
| Identifiant | IP-01, IP-02, EV-01, EQ-01 | Stable et unique ; indépendant des changements de titre |
| Type | Information pratique / événement / équipement | Obligatoire, un seul type |
| Titre | Texte court explicite | Obligatoire, non vide |
| Résumé | Une ou deux phrases | Obligatoire ; sans recopier horaires ou statut changeant |
| Corps | Sections textuelles ordonnées | Obligatoire ; aucune information essentielle uniquement en image |
| Termes éditoriaux | Liste de mots ou expressions | Facultatif ; valeurs explicites du corpus ; pour la recherche limitée |
| Contexte | « Fictif — démonstration personnelle » | Obligatoire ; mention visible dans le socle et près des données d’adresse/date utiles |
| Provenance | Origine du texte, contribution, ressource éventuelle | Obligatoire dans le dossier ; corpus rédigé avec assistance Codex, sans source municipale réelle |
| Révision | Identifiant r1/r2/r3 et date de scénario | Obligatoire ; distinct de la version du document et d’une date réelle de vérification |
| État éditorial | Brouillon / publié / historique | État porté par chaque révision ; une seule révision publique par contenu |
| Liens associés | Identifiants typés | Facultatif, sauf lieu d’événement ; pas de lien public actif vers un brouillon |

Les dates éditoriales du corpus seront accompagnées de « Date éditoriale fictive ». Un horodatage futur de publication réellement exécutée devra être stocké et présenté séparément. Aucun auteur municipal réel inventé.

## Information pratique

| Champ spécifique | Obligation et règle |
|---|---|
| Objet de la fiche | Obligatoire ; expliciter ce qu’elle permet de savoir |
| Horaires ordinaires | Facultatifs selon l’objet ; requis pour IP-01 ; jours et plages séparés, jours fermés explicites |
| Exceptions | Liste facultative ; chaque entrée exige date, début/fin de période affectée, effet et texte de remplacement utile |
| Adresse et entrée | Facultatives selon l’objet ; requises pour IP-01 ; mention « adresse fictive » |
| Informations associées | IP-01 → IP-02 ; IP-02 → IP-01 ; pas d’autre démarche présumée |
| Limite administrative | Requise pour IP-02 : orientation fictive, aucune instruction réglementaire |

Pour IP-01, l’exception du 18 novembre concerne 14 h–17 h et ne modifie pas la plage 9 h–12 h. Une exception sans date ou période n’est pas publiable. Une absence d’horaire dans une variante dégradée doit être explicitement représentée comme inconnue ; elle ne vaut pas fermeture.

## Événement

| Champ spécifique | Obligation et règle |
|---|---|
| Début, fin, fuseau | Obligatoires ; fin strictement après début ; date complète et heures ; Europe/Paris proposé |
| État d’organisation | Annoncé / annulé ; obligatoire et indépendant de l’état éditorial |
| Message d’annulation | Obligatoire si annulé ; motif facultatif, inconnu autorisé ; aucune date de report inventée |
| Public | Obligatoire ; préciser âge et accompagnement pour EV-01 |
| Conditions | Obligatoires ; distinguer gratuité, inscription et limites ; aucune disponibilité temps réel |
| Équipement lié | Obligatoire, EQ-01 dans ce corpus ; référence à une fiche publiée |
| Statut temporel | Dérivé de l’horloge de scénario ; ne pas saisir manuellement « à venir » dans le résumé |

Si EQ-01 manque, conserver le brouillon d’événement mais signaler la référence manquante avant publication. Le comportement en cas de retrait ultérieur du lieu sera détaillé en BR-C4 : ne pas créer d’adresse de secours silencieuse.

## Équipement

| Champ spécifique | Obligation et règle |
|---|---|
| Activité / description | Obligatoire ; limitée à ce que le scénario décrit |
| Adresse et entrée | Obligatoires ; textes fictifs ; pas de géolocalisation |
| Horaires ordinaires | Obligatoires pour EQ-01 ; plusieurs plages par jour possibles |
| Accès physique | Champ obligatoire avec état « documenté dans le scénario » ou « non documenté » ; ici non documenté |
| Événements associés | Relation déduite des événements publiés référant EQ-01 ; pas une liste éditée à la main |

L’état « documenté dans le scénario » ne pourrait attester que des informations inventées. Aucun contrôle de bâtiment ni label d’accessibilité physique.

## Révisions et responsabilité éditoriale

Un contenu possède une révision publiée et peut avoir une révision en préparation. Publier une nouvelle révision doit rendre la précédente historique, sans la supprimer. Une annulation d’événement est une modification de contenu, pas une dépublication. L’erreur de publication doit laisser un état compréhensible ; atomicité, reprise et persistance restent des exigences à étudier en BR-C4.

Le seul acteur du scénario prépare et publie. Aucun circuit d’approbation, édition concurrente, annuaire de personnes ou rôle contractuel ajouté. Les comptes nécessaires à un éventuel outil éditorial ne sont pas déterminés ; les comptes usagers restent exclus.

## Médias et données absentes

Le corpus ne nécessite ni photographie, pièce jointe, téléphone, courriel réel, formulaire ou logo officiel. Des médias pourront être proposés en BR-C3 avec provenance et conditions d’utilisation à documenter ; ils ne remplaceront pas les informations textuelles. Aucun lien de contact fictif rendu cliquable.

## Vérifications futures à spécifier en BR-C4

Prévoir contrôle des champs requis, cohérence des heures, références valides, exclusion des brouillons, conservation des révisions et concordance entre détail et listes. Chaque contrôle devra avoir un protocole, une version et une preuve distincts. **Prévu, non exécuté ; résultat non testé.** Ce modèle ne constitue ni une preuve de sécurité ni une conformité administrative ou juridique.
