const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new require("socket.io")(server);


app.get('/', (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.listen(8888, () => {
  console.log("Serveur en écoute sur http://localhost:8888");
});

// Liste des utilisateurs connectés
let utilisateurs = [];
const MAX_USERS = 3; // limite à 3 joueurs

io.on('connection', (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Quand un utilisateur choisit son nom
  socket.on('entrer', (nom) => {
    // Vérifier la capacité au moment où l'utilisateur tente d'entrer (après avoir fourni un nom)
    if (utilisateurs.length >= MAX_USERS) {
      socket.emit("refus","Le salon est plein");
      socket.disconnect();
      return;
    }

    socket.nom = nom;
    utilisateurs.push(nom);

    io.emit('NbUser',utilisateurs.length);

    // On envoie à cet utilisateur la liste des utilisateurs
    socket.emit('bienvenue', { nom, utilisateurs });

    // On annonce aux autres qu'un nouveau est là
    socket.broadcast.emit('nouveau', nom);
  });

  // Réception d'un message
  socket.on('message', (msg) => {
    io.emit('message', { auteur: socket.nom, texte: msg });
  });

  // Déconnexion
  socket.on('disconnect', () => {
    if (socket.nom) {
      utilisateurs = utilisateurs.filter(n => n !== socket.nom);
      io.emit('depart', socket.nom);
      io.emit('NbUser',utilisateurs.length);
    } else {
      console.log('Un socket s\'est déconnecté avant d\'avoir choisi un nom.');
    }
  });


  
});
