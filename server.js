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

io.on('connection', (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Quand un utilisateur choisit son nom
  socket.on('entrer', (nom) => {
    socket.nom = nom;
    utilisateurs.push(nom);

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
    utilisateurs = utilisateurs.filter(n => n !== socket.nom);
    io.emit('depart', socket.nom);
  });
});
