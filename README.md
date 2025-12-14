# Js-project-

TRAN Valentin
Isaza Acosta Gabriel
<img width="1358" height="649" alt="Captura de pantalla 2025-12-14 153836" src="https://github.com/user-attachments/assets/c4a0c9ab-525b-4514-bc46-eb8c94bfd465" />
<img width="1348" height="633" alt="Captura de pantalla 2025-12-14 154129" src="https://github.com/user-attachments/assets/043ff26c-3e7a-4086-b6f6-12d89c1407c8" />
<img width="1344" height="633" alt="Captura de pantalla 2025-12-14 155632" src="https://github.com/user-attachments/assets/4674a5ee-0f13-4cc9-956a-c0ec50390164" />
<img width="1346" height="627" alt="Captura de pantalla 2025-12-14 154425" src="https://github.com/user-attachments/assets/2eaf1f36-9857-4c64-845f-0ed6242ad77a" />

- **Connexion et lobby** :
  - Écran de login (max 15 caractères)
  - Limite à 2 joueurs maximum
  - La partie démarre automatiquement quand les 2 joueurs sont connectés (après un court délai)
  - Gestion des erreurs (nom vide,nom déjà pris,2joueurs conectés)

- **Système de points** (calculé à chaque placement) :
  - **Même auteur** : points = n × (n-1) où n = longueur de la suite (ex : 2 livres = 2 pts, 3 = 6 pts).
  - **Même genre** : points = n + (n-2).
  - **Même littérature** : points = n × 2 (seulement si le livre a ce champ).
  - **Ordre alphabétique par titre** : points = n × 3.

- **D3** :
  - Livres représentés comme rectangles colorés selon leur **genre** (couleurs fixes prédéfinies)
  - Hauteur variable selon le **format** (poche=35px, medium=45px, grand=55px, maxi=65px)
  - Affichage sur le livre : nom de famille de l'auteur + genre
  - Information de livre au survol : titre complet, auteur, genre, format, littérature
  - Drag avec un arret de la transition sur le tapis et une gestion d'erreur sur drop si le livre n'est pas sur une étagère
    
- **Chat en temps réel** :
  - Panel latéral avec envoi de messages (touche Entrée).
  - Messages système en vert pour les événements importants.

- **Fin de partie** :
  - Automatique quand 30 livres distribués ou si un joueur se déconnecte.
  - Afffichage de fin avec annonce du gagnant (ou égalité) et scores.
  - Bouton "Rejouer" qui recharge la page.

- **Autres** :
  - Affichage en temps réel : score personnel, compteur de livres (x/30).
  - Notifications éphémères (vert pour points gagnés, rouge pour erreurs).

