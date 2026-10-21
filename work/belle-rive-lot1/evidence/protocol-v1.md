# Protocole fixé avant mesures — 21 octobre 2026

Build 0.1.0, TypeScript strict 7.0.2 ; Node portable 24.22.1 Windows x64 ; dépendances exactes package-lock.json. Sources et manifeste de build seront figés par empreinte avant mesure. Données format 1, corpus BR-C2 V1. Pas de moteur ni donnée distante à l’exécution.

Fonctionnel : copies neuves identifiées par scénario S0–S9 ; horloge fictive stockée, horloge de sécurité contrôlée uniquement par injection interne dans la fabrique de tests (aucun endpoint de réglage). Publication : injection avant COMMIT et rupture réelle de socket après COMMIT en processus de test. Jamais activable dans le lanceur utilisateur.

M-12 : aller-retour HTTP réel à 127.0.0.1:4317, dernier octet reçu ; une chauffe puis 10 mesures séquentielles par destination. Médiane ≤200 ms, max ≤500 ms. Enregistrement et publication : 10 copies S0 identiques, préparation/authentification hors mesure, médiane ≤500 ms, max ≤1000 ms. Démarrage : 3 processus neufs, invocation à notification d’écoute, max ≤5 s. Pas de réduction de budgets après mesure.

Pages : cache navigateur vide par contexte, octets des corps et en-têtes réseau consignés, seuil 750 Kio par page ; aucune compression applicative. Observer requêtes de l’application lors des parcours publics et édition ; exigence zéro requête distante. Aucun processus de charge volontaire ajouté ; charge de fond et alimentation à relever, sinon limite explicite.

Présentation : Edge installé si disponible, 320/390/768/1440 px CSS, captures et débordement ; zoom 200 % distinct à consigner. Axe automatisé sur les vues atteintes, sans conclusion de conformité. Les essais clavier automatiques ne valent pas revue manuelle ni NVDA/Firefox. M-10 et A-06 restent non exécutés en l’absence d’observation humaine/technologie d’assistance.

Conservation : rapports numérotés, traces sans secret/cookie/jeton/corps éditorial ni recherche personnelle ; données fictives archivables. Les échecs initiaux sont conservés, correctifs liés à une nouvelle exécution.
