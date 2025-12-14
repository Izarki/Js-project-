# Js-project-

TRAN Valentin
Isaza Acosta Gabriel
<img width="1358" height="649" alt="Captura de pantalla 2025-12-14 153836" src="https://github.com/user-attachments/assets/c4a0c9ab-525b-4514-bc46-eb8c94bfd465" />
<img width="1348" height="633" alt="Captura de pantalla 2025-12-14 154129" src="https://github.com/user-attachments/assets/043ff26c-3e7a-4086-b6f6-12d89c1407c8" />
<img width="1344" height="633" alt="Captura de pantalla 2025-12-14 155632" src="https://github.com/user-attachments/assets/4674a5ee-0f13-4cc9-956a-c0ec50390164" />
<img width="1346" height="627" alt="Captura de pantalla 2025-12-14 154425" src="https://github.com/user-attachments/assets/2eaf1f36-9857-4c64-845f-0ed6242ad77a" />

- **Connexion et lobby** :
  - Écran de login simple (pseudo, max 15 caractères).
  - Limite à 2 joueurs maximum.
  - La partie démarre automatiquement quand les 2 joueurs sont connectés (après un court délai).
  - Gestion des erreurs (pseudo vide, déjà pris, partie pleine).

- **Mécanique de jeu** :
  - Un "tapis" (zone inférieure) où apparaissent progressivement des livres aléatoires tirés d'une liste prédéfinie.
  - 30 livres sont distribués au total (maxLivres = 30).
  - Les livres arrivent avec un délai (~10 secondes entre chaque), et disparaissent automatiquement après ~18 secondes si non placés.
  - Les joueurs drag & drop les livres du tapis vers l'une des **5 étagères**.
  - Insertion précise : le livre s'insère à la position où il est déposé sur l'étagère.

- **Système de points** (calculé à chaque placement) :
  - **Même auteur** : suite continue → points = n × (n-1) où n = longueur de la suite (ex : 2 livres = 2 pts, 3 = 6 pts).
  - **Même genre** : suite de ≥3 → points = n + (n-2).
  - **Même littérature** (ex : anglo-saxonne, russe...) : suite de ≥3 → points = n × 2 (seulement si le livre a ce champ).
  - **Ordre alphabétique par titre** : suite croissante de ≥3 → points = n × 3.
  - Les points s'additionnent si plusieurs critères sont remplis autour du livre placé.

- **Interface visuelle (D3.js)** :
  - Plateau SVG avec tapis marron et 5 étagères horizontales.
  - Livres représentés comme rectangles colorés selon leur **genre** (couleurs fixes prédéfinies).
  - Hauteur variable selon le **format** (poche=35px, medium=45px, grand=55px, maxi=65px).
  - Affichage sur le livre : nom de famille de l'auteur + genre.
  - Infobulle au survol : titre complet, auteur, genre, format, littérature (si présente).
  - Animation fluide pour l'arrivée des livres sur le tapis et pour le retour si dépôt invalide.

- **Chat en temps réel** :
  - Panel latéral avec envoi de messages (touche Entrée).
  - Messages système en vert pour les événements importants.

- **Fin de partie** :
  - Automatique quand 30 livres distribués ou si un joueur se déconnecte.
  - Modal avec annonce du gagnant (ou égalité) et scores.
  - Bouton "Rejouer" qui recharge la page.

- **Autres** :
  - Affichage en temps réel : score personnel, compteur de livres (x/30).
  - Notifications éphémères (vert pour points gagnés, rouge pour erreurs).

### Informations utiles supplémentaires

- **Base de données des livres** :
  - Tableau `LIVRES` contenant **155 livres** uniques.
  - Chaque livre a : titre, auteur, nom (souvent nom de famille), genre, format, et parfois littérature.
  - Genres présents : aventures, essai, fantasy, feelgood, humour, policier, poésie, roman, sf, thriller, théâtre (11 au total).
  - Formats : poche, medium, grand, maxi.
  - Littératures : allemande, anglo-saxonne, espagnole, grecque, italienne, russe, scandinave.
  - 81 auteurs différents représentés (beaucoup de classiques français et étrangers).

- **Technologies utilisées** :
  - Serveur : Node.js avec Express et Socket.IO (port 8888).
  - Client : HTML pur + D3.js v7 pour les graphiques interactifs + Socket.IO client.
  - Pas de persistance (tout en mémoire, reset à chaque partie).

- **Observations / points d'amélioration potentiels** :
  - Le jeu est strictement à 2 joueurs ; pas de mode solo ou plus de joueurs.
  - Les livres sont choisis avec remplacement possible (duplicatas autorisés car random sur l'array complet).
  - Quelques petites incohérences dans les données (ex : "Le parfum" de Süskind a "nom":"Tolkien" → erreur évidente ; orthographe "Vernes" au lieu de "Verne").
  - Pas de tour par tour : les deux joueurs jouent en simultané en temps réel (course aux bons placements).
  - Le serveur gère l'autorité unique (état partagé, calcul points côté serveur → anti-triche).
