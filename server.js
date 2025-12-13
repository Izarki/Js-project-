const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const LIVRES = [{"titre":"La vie devant soi", "auteur":"Emile Ajar", "nom":"Ajar", "genre":"roman", "format":"medium"},
{"titre":"Antigone", "auteur":"Jean Anouilh", "nom":"Anouilh", "genre":"théâtre", "format":"poche"},
{"titre":"Fondation", "auteur":"Isaac Asimov", "nom":"Asimov", "genre":"sf", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Fondation et empire", "auteur":"Isaac Asimov", "nom":"Asimov", "genre":"sf", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Seconde Fondation", "auteur":"Isaac Asimov", "nom":"Asimov", "genre":"sf", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Le Père Goriot", "auteur":"Honoré de Balzac", "nom":"de Balzac", "genre":"roman", "format":"medium"},
{"titre":"La peau de chagrin", "auteur":"Honoré de Balzac", "nom":"de Balzac", "genre":"roman", "format":"medium"},
{"titre":"Eugénie Grandet", "auteur":"Honoré de Balzac", "nom":"de Balzac", "genre":"roman", "format":"medium"},
{"titre":"Le grand secret", "auteur":"René Barjavel", "nom":"Barjavel", "genre":"roman", "format":"medium"},
{"titre":"La nuit des temps", "auteur":"René Barjavel", "nom":"Barjavel", "genre":"roman", "format":"medium"},
{"titre":"Les fleurs du mal", "auteur":"Charles Baudelaire", "nom":"Baudelaire", "genre":"poésie", "format":"poche"},
{"titre":"Le maître et Marguerite", "auteur":"Mikhaïl Boulgakov", "nom":"Boulgakov", "genre":"roman", "littérature":"russe", "format":"medium"},
{"titre":"Les hauts de Hurle-Vent", "auteur":"Emily Brontë", "nom":"Brontë", "genre":"roman", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Jane Eyre", "auteur":"Charlotte Brontë", "nom":"Brontë", "genre":"roman", "littérature":"anglo-saxonne","format":"medium"},
{"titre":"Le temps est assassin", "auteur":"Michel Bussi", "nom":"Bussi", "genre":"thriller", "format":"medium"},
{"titre":"Mourir sur Seine", "auteur":"Michel Bussi", "nom":"Bussi", "genre":"thriller", "format":"medium"},
{"titre":"Sang Famille", "auteur":"Michel Bussi", "nom":"Bussi", "genre":"thriller", "format":"medium"},
{"titre":"La peste", "auteur":"Albert Camus", "nom":"Camus", "genre":"roman", "format":"medium"},
{"titre":"L'étranger", "auteur":"Albert Camus", "nom":"Camus", "genre":"roman", "format":"medium"},
{"titre":"E=mc2, mon amour", "auteur":"Patrick Cauvin", "nom":"Cauvin", "genre":"roman", "littérature":"anglo-saxonne","format":"grand"},
{"titre":"C'était le Pérou", "auteur":"Patrick Cauvin", "nom":"Cauvin", "genre":"roman", "littérature":"anglo-saxonne","format":"grand"},
{"titre":"Les ritals", "auteur":"Cavana", "nom":"Cavana", "genre":"roman", "format":"poche"},
{"titre":"Voyage au bout de la nuit", "auteur":"Louis Ferdinand Céline", "nom":"Céline", "genre":"roman", "format":"grand"},
{"titre":"Mort sur le Nil", "auteur":"Agatha Christie", "nom":"Christie", "genre":"policier", "littérature":"anglo-saxonne","format":"poche"},
{"titre":"Cartes sur table", "auteur":"Agatha Christie", "nom":"Christie", "genre":"policier", "littérature":"anglo-saxonne","format":"poche"},
{"titre":"Le meurtre de Roger Acroyd", "auteur":"Agatha Christie", "nom":"Christie", "genre":"policier", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"L'heure zéro", "auteur":"Agatha Christie", "nom":"Christie", "genre":"policier", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Meurtre en Mésopotamie", "auteur":"Agatha Christie", "nom":"Christie", "genre":"policier", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Le meurtre de l'Orient Express", "auteur":"Agatha Christie", "nom":"Christie", "littérature":"anglo-saxonne", "genre":"policier", "format":"poche"},
{"titre":"Ne le dis à personne", "auteur":"Harlan Coben", "nom":"Coben", "genre":"thriller", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Une chance de trop", "auteur":"Harlan Coben", "nom":"Coben", "genre":"thriller", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Le poète", "auteur":"Michael Connelly", "nom":"Connelly", "genre":"policier", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"La blonde en béton", "auteur":"Michael Connelly", "nom":"Connelly", "genre":"policier", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Les égouts de Los Angeles", "auteur":"Michael Connelly", "nom":"Connelly", "genre":"policier", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Le Cid", "auteur":"Pierre Corneille", "nom":"Corneille", "genre":"théâtre", "format":"poche"},
{"titre":"Tout le bleu du ciel", "auteur":"Mélissa Da Costa", "nom":"Da Costa", "genre":"feelgood", "format":"grand"},
{"titre":"Je revenais des autres", "auteur":"Mélissa Da Costa", "nom":"Da Costa", "genre":"feelgood", "format":"grand"},
{"titre":"Don Quichotte", "auteur":"Miguel de Cervantes", "nom":"de Cervantes", "genre":"roman", "littérature":"espagnole", "format":"grand"},
{"titre":"Robinson Crusoé", "auteur":"Daniel Defoe", "nom":"Defoe", "genre":"aventures", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Blade runner", "auteur":"Philip K. Dick", "nom":"Dick", "genre":"sf", "littérature":"anglo-saxonne",  "format":"poche"},
{"titre":"Ubik", "auteur":"Philip K. Dick", "nom":"Dick", "genre":"sf", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Les androïdes rêvent-ils de moutons électriques", "auteur":"Philip K. Dick", "nom":"Dick", "genre":"sf", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Crime et châtiment", "auteur":"Fiodor Dostoïevski", "nom":"Dostoïevski", "genre":"roman", "littérature":"russe", "format":"medium"},
{"titre":"Les frères Karamazov", "auteur":"Fiofor Dostoïevski", "nom":"Dostoïevski", "littérature":"russe", "genre":"roman", "format":"medium"},
{"titre":"Les trois mousquetaires", "auteur":"Alexandre Dumas", "nom":"Dumas", "genre":"aventures", "format":"grand"},
{"titre":"Le Comte de Monte-Cristo", "auteur":"Alexandre Dumas", "nom":"Dumas", "genre":"aventures", "format":"grand"},
{"titre":"L'amant", "auteur":"Marguerite Duras", "nom":"Duras", "genre":"roman", "format":"grand"},
{"titre":"Le monde perdu", "auteur":"Arthur Conan Doyle", "nom":"Doyle", "genre":"aventures", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Les chiens des Baskerville", "auteur":"Arthur Conan Doyle", "nom":"Doyle", "genre":"policier", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Une étude en rouge", "auteur":"Arthur Conan Doyle", "nom":"Doyle", "genre":"policier", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Le nom de la rose", "auteur":"Umberto Eco", "nom":"Eco", "genre":"roman", "littérature":"italienne", "format":"grand"},
{"titre":"Liberté", "auteur":"Paul Eluard", "nom":"Eluard", "genre":"poésie", "format":"poche"},
{"titre":"Ne vous fâchez pas, Imogène !", "auteur":"Exbrayat", "nom":"Exbrayat", "genre":"policier", "format":"poche"},
{"titre":"Amour et sparadrap", "auteur":"Exbrayat", "nom":"Exbrayat", "genre":"policier", "format":"poche"},
{"titre":"La puce à l'oreille", "auteur":"Georges Feydeau", "nom":"Feydeau", "genre":"théâtre", "format":"poche"},
{"titre":"Madame Bovary", "auteur":"Gustave Flaubert", "nom":"Flaubert", "genre":"roman", "format":"medium"},
{"titre":"Les déferlantes", "auteur":"Claudie Gallay", "nom":"Gallay", "genre":"roman", "format":"medium"},
{"titre":"La promesse de l'aube", "auteur":"Romain Gary", "nom":"Gary", "genre":"roman", "format":"medium"},
{"titre":"Education européenne", "auteur":"Romain Gary", "nom":"Gary", "genre":"roman", "format":"medium"},
{"titre":"Les rivières pourpres", "auteur":"Jean-Christophe Grangé", "nom":"Grangé", "genre":"thriller", "format":"medium"},
{"titre":"Le vol des cigognes", "auteur":"Jean-Christophe Grangé", "nom":"Grangé", "genre":"thriller", "format":"medium"},
{"titre":"L'empire des loups", "auteur":"Jean-Christophe Grangé", "nom":"Grangé", "genre":"thriller", "format":"medium"},
{"titre":"Tu comprendras quand tu seras plus grande", "auteur":"Virginie Grimaldi", "nom":"Grimaldi", "genre":"feelgood", "format":"medium"},
{"titre":"Sapiens, une brève histoire de l'humanité", "auteur":"Yuval Noah Harari", "nom":"Harari", "genre":"essai", "format":"maxi"},
{"titre":"Dune", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "format":"medium"},
{"titre":"Le messie de Dune", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Les enfants de Dune", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"L'Empereur-Dieu de Dune", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Les Hérétiques de Dune", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"La Maison des mères", "auteur":"Franck Herbert", "nom":"Herbert", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"L'iliade", "auteur":"Homère", "nom":"Homère", "genre":"poésie", "littérature":"grecque", "format":"poche"},
{"titre":"L'odyssée", "auteur":"Homère", "nom":"Homère", "genre":"poésie", "littérature":"grecque", "format":"poche"},
{"titre":"Les misérables", "auteur":"Victor Hugo", "nom":"Hugo", "genre":"roman", "format":"grand"},
{"titre":"Notre-Dame de Paris", "auteur":"Victor Hugo", "nom":"Hugo", "genre":"roman", "format":"grand"},
{"titre":"Les travailleurs de la mer", "auteur":"Victor Hugo", "nom":"Hugo", "genre":"roman", "format":"grand"},
{"titre":"Trois hommes dans un bateau", "auteur":"Jerome K. Jerome", "nom":"Jerome", "genre":"humour",  "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Millénium : Les Hommes qui n'aimaient pas les femmes", "auteur":"Stieg Larsson", "nom":"Larsson", "genre":"policier", "littérature":"scandinave", "format":"grand"},
{"titre":"Millénium : La Fille qui rêvait d'un bidon d'essence et d'une allumette", "nom":"Larsson", "auteur":"Stieg Larsson", "genre":"policier", "littérature":"scandinave", "format":"grand"},
{"titre":"Millénium : La Reine dans le palais des courants d'air", "auteur":"Stieg Larsson", "nom":"Larsson", "genre":"policier", "littérature":"scandinave", "format":"grand"},
{"titre":"L'espion qui venait du froid", "auteur":"John Le Carré", "nom":"Le Carré", "genre":"thriller", "format":"grand"},
{"titre":"La Taupe", "auteur":"John Le Carré", "nom":"Le Carré", "genre":"thriller", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Comme un collégien", "auteur":"John Le Carré", "nom":"Le Carré", "genre":"thriller", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Les gens de Smiley", "auteur":"John Le Carré", "nom":"Le Carré", "genre":"thriller", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Complètement cramé", "auteur":"Gilles Legardinier", "nom":"Legardinier", "genre":"feelgood", "format":"medium"},
{"titre":"Le grand monde", "auteur":"Pierre Lemaître", "nom":"Lemaître", "genre":"roman", "format":"medium"},
{"titre":"La robe de mariée", "auteur":"Pierre Lemaître", "nom":"Lemaître", "genre":"roman", "format":"medium"},
{"titre":"Alex", "auteur":"Pierre Lemaître", "nom":"Lemaître", "genre":"roman", "format":"medium"},
{"titre":"Le mystère de la chambre jaune", "auteur":"Gaston Leroux", "genre":"policier", "format":"poche"},
{"titre":"L'appel de la forêt", "auteur":"Jack London", "genre":"aventures", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"La ruée vers l'or", "auteur":"Jack London", "nom":"London", "genre":"aventures", "littérature":"anglo-saxonne","format":"medium"},
{"titre":"Croc Blanc", "auteur":"Jack London", "nom":"London", "genre":"aventures", "littérature":"anglo-saxonne","format":"medium"},
{"titre":"Belliou la Fumée", "auteur":"Jack London", "nom":"London", "genre":"aventures", "littérature":"anglo-saxonne","format":"medium"},
{"titre":"Bal-Ami", "auteur":"Guy de Maupassant", "nom":"de Maupassant", "genre":"roman", "format":"poche"},
{"titre":"Boule de suif", "auteur":"Guy de Maupassant", "nom":"de Maupassant", "genre":"roman", "format":"poche"},
{"titre":"Le horla", "auteur":"Guy de Maupassant", "nom":"de Maupassant", "genre":"roman", "format":"poche"},
{"titre":"Une vie", "auteur":"Guy de Maupassant", "nom":"de Maupassant", "genre":"roman", "format":"poche"},
{"titre":"Mademoiselle Fifi", "auteur":"Guy de Maupassant", "nom":"de Maupassant", "genre":"roman", "format":"poche"},
{"titre":"La femme de ménage voit tout", "auteur":"Freida McFadden", "nom":"McFadden", "genre":"thriller", "format":"grand"},
{"titre":"Moby Dick", "auteur":"Herman Melville", "nom":"Melville", "genre":"aventures", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Don Juan", "auteur":"Molière", "nom":"Molière", "genre":"théâtre", "format":"poche"},
{"titre":"Les précieuses ridicules", "auteur":"Molière", "nom":"Molière", "genre":"théâtre", "format":"poche"},
{"titre":"L'avare", "auteur":"Molière", "nom":"Molière", "genre":"théâtre", "format":"poche"},
{"titre":"L'école des femmes", "auteur":"Molière", "nom":"Molière", "genre":"théâtre", "format":"poche"},
{"titre":"On ne badine pas avec l'amour", "auteur":"Alfred de Musset", "nom":"de Musset", "genre":"théâtre", "format":"poche"},
{"titre":"Lolita", "auteur":"Vladimir Nabokov", "nom":"Nabokov", "genre":"roman", "littérature":"russe", "format":"medium"},
{"titre":"Hygiène de l'assassin", "auteur":"Amélie Nothomb", "nom":"Nothomb", "genre":"roman", "format":"poche"},
{"titre":"1984", "auteur":"George Orwell", "nom":"Orwell", "genre":"roman", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"La valse lente des tortues", "auteur":"Katherine Pancol", "nom":"Pancol", "genre":"feelgood", "format":"medium"},
{"titre":"Les yeux jaunes des crocodiles", "auteur":"Katherine Pancol", "nom":"Pancol", "genre":"feelgood", "format":"medium"},
{"titre":"Changer l'eau des fleurs", "auteur":"Valérie Perrin", "nom":"Perrin", "genre":"feelgood", "format":"medium"},
{"titre":"Eugène Onéguine", "auteur":"Alexandre Pouchkine", "nom":"Pouchkine", "genre":"poésie", "littarature":"russe", "format":"maxi"},
{"titre":"Du côté de chez Swann", "auteur":"Marcel Proust", "nom":"Proust", "genre":"roman", "format":"medium"},
{"titre":"Cyrano de Bergerac", "auteur":"Edmond Rostand", "nom":"Rostand", "genre":"théâtre", "format":"poche"},
{"titre":"Une saison en enfer", "auteur":"Arthur Rimbaud", "nom":"Rimbaud", "genre":"poésie", "format":"poche"},
{"titre":"Le bateau ivre", "auteur":"Arthur Rimbaud", "nom":"Rimbaud", "genre":"poésie", "format":"poche"},
{"titre":"Le Petit Prince", "auteur":"Antoine de Saint-Exupéry", "nom":"de Saint-Exupéry", "genre":"poésie", "format":"medium"},
{"titre":"La petite Fadette", "auteur":"George Sand", "nom":"Sand", "genre":"roman", "format":"poche"},
{"titre":"Huis clos", "auteur":"Jean-Paul Sartre", "nom":"Sartre", "genre":"théâtre", "format":"medium"},
{"titre":"L'être et le néant", "auteur":"Jean-Paul Sartre", "nom":"Sartre", "genre":"essai", "format":"medium"},
{"titre":"La nausée", "auteur":"Jean-Paul Sartre", "nom":"Sartre", "genre":"essai", "format":"medium"},
{"titre":"L'humanisme est un existentialisme", "auteur":"Jean-Paul Sartre", "nom":"Sartre", "genre":"essai", "format":"medium"},
{"titre":"Le vieux qui lisait des romans d'amour", "auteur":"Luis Sepulveda", "nom":"Sepulveda", "genre":"roman", "littérature":"espagnole", "format":"poche"},
{"titre":"Journal d'un tueur sentimental", "auteur":"Luis Sepulveda", "nom":"Sepulveda", "genre":"roman", "littérature":"espagnole", "format":"poche"},
{"titre":"Roméo et Juliette", "auteur":"William Shakespeare", "nom":"Shakespeare", "genre":"théâtre", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"Macbeth", "auteur":"William Shakespeare", "nom":"Shakespeare", "genre":"théâtre", "format":"poche"},
{"titre":"Hamlet", "auteur":"William Shakespeare", "nom":"Shakespeare", "genre":"théâtre", "format":"poche"},
{"titre":"L'assassin habite au 21", "auteur":"S.A. Steeman", "nom":"Steeman", "genre":"policier", "format":"poche"},
{"titre":"L'île au trésor", "auteur":"Robert Louis Stevenson", "nom":"Stevenson", "genre":"aventures", "format":"grand"},
{"titre":"Le rouge et le noir", "auteur":"Stendhal", "nom":"Stendhal", "genre":"roman", "format":"grand"},
{"titre":"Des souris et des hommes", "auteur":"John Steinbeck", "nom":"Steinbeck", "genre":"roman", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Les raisins de la colère", "auteur":"John Steinbeck", "nom":"Steinbeck", "genre":"roman", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Le parfum", "auteur":"Patrick Süskind", "nom":"Tolkien", "genre":"roman", "littérature":"allemande", "format":"medium"},
{"titre":"Le Hobbit", "auteur":"J. R. R. Tolkien", "nom":"Tolkien", "genre":"fantasy", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Le seigneur des anneaux", "auteur":"J. R. R. Tolkien", "nom":"Tolkien", "genre":"fantasy", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Guerre et paix", "auteur":"Léon Tolstoï", "nom":"Tolstoï", "genre":"roman", "littérature":"russe", "format":"grand"},
{"titre":"Huckleberry Finn", "auteur":"Mark Twain", "nom":"Twain", "genre":"aventures", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Les aventures de Tom Sawyer", "auteur":"Mark Twain", "nom":"Twain", "genre":"aventures", "littérature":"anglo-saxonne", "format":"grand"},
{"titre":"Le monde des non-A", "auteur":"A.E. Van Vogt", "nom":"Van Vogt", "genre":"sf", "littérature":"anglo-saxonne", "format":"medium"},
{"titre":"Le tour du monde en 80 jours", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"Vingt mille lieues sous les mers", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"Voyage au centre de la terre", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"De la Terre à la Lune", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"Michel Strogoff", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"Cinq semaines en ballon", "auteur":"Jules Vernes", "nom":"Vernes", "genre":"aventures", "format":"medium"},
{"titre":"J'irai cracher sur vos tombes", "auteur":"Boris Vian", "nom":"Vian", "genre":"roman", "format":"medium"},
{"titre":"Le portrait de Dorian Gray", "auteur":"Oscar Wilde", "nom":"Wilde", "genre":"thriller", "format":"medium"},
{"titre":"Merci, Jeeves", "auteur":"P.G. Wodehouse", "nom":"Wodehouse", "genre":"humour", "littérature":"anglo-saxonne", "format":"poche"},
{"titre":"L'ombre du vent", "auteur":"Carlos Luis Zafon", "nom":"Zafon", "genre":"roman", "littérature":"espagnole", "format":"medium"},
{"titre":"Le jeu de l'Ange", "auteur":"Carlos Luis Zafon", "nom":"Zafon", "genre":"roman", "littérature":"espagnole", "format":"medium"},
{"titre":"Le prisonnier du ciel", "auteur":"Carlos Luis Zafon", "nom":"Zafon", "genre":"roman", "littérature":"espagnole", "format":"medium"},
{"titre":"Le labyrinthe des esprits", "auteur":"Carlos Luis Zafon", "nom":"Zafon", "genre":"roman", "littérature":"espagnole", "format":"medium"},
{"titre":"Marina", "auteur":"Carlos Luis Zafon", "nom":"Zafon", "genre":"roman", "littérature":"espagnole", "format":"medium"},
{"titre":"Germinal", "auteur":"Emile Zola", "nom":"Zola", "genre":"roman", "format":"medium"},
{"titre":"L'assommoir", "auteur":"Emile Zola", "nom":"Zola", "genre":"roman", "format":"medium"},
{"titre":"La bête humaine", "auteur":"Emile Zola", "nom":"Zola", "genre":"roman", "format":"medium"}]

// ====================== ÉTAT DU JEU ======================
let joueurs = {};
let partie = {
	enCours: false,
	tapis: [],
	etageres: [[], [], [], [], []], 
	livreSuivantTimer: null,
	maxLivres: 30,
	livresDistribues: 0
};

// ====================== ROUTE HTTP ======================
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// ====================== CONNEXION SOCKET ======================
io.on('connection', (socket) => {
	// console.log(`[CONNEXION] Nouvelle connexion: ${socket.id}`);

	// ========== PHASE 1: ENTRÉE DES JOUEURS ==========
	socket.on('entree', (nom) => {
		nom = nom.trim();
		if (!nom || nom.length === 0 || joueurs[nom] || Object.keys(joueurs).length >= 2) {
			const msg = !nom ? 'Le nom ne peut pas être vide.' : joueurs[nom] ? 'Ce nom est déjà pris.' : 'La partie est déjà complète.';
			socket.emit('erreur-entree', msg);
			return;
		}

		socket.nom = nom;
		joueurs[nom] = { nom: nom, socketId: socket.id, points: 0 };
		console.log(`[ENTRÉE] ${nom} a rejoint la partie.`);
		
		socket.emit('entree-validee', { nom: nom, joueurs: Object.values(joueurs) });
		io.emit('joueurs-maj', { joueurs: Object.values(joueurs), nbJoueurs: Object.keys(joueurs).length });

		if (Object.keys(joueurs).length === 2 && !partie.enCours) {
			setTimeout(demarrerPartie, 2000);
		}
	});

	// ========== PHASE 2: PLACEMENT DES LIVRES ==========
	socket.on('placer-livre', (data) => {
		const nomJoueur = socket.nom;

		if (!nomJoueur || !joueurs[nomJoueur] || !partie.enCours) return;

		const indexLivre = partie.tapis.findIndex(l => l.id === data.livreId);
		if (indexLivre === -1 || data.etagereIndex < 0 || data.etagereIndex > 4) {
			socket.emit('erreur', "Livre ou étagère invalide");
			return;
		}

		const livre = partie.tapis.splice(indexLivre, 1)[0];
		partie.etageres[data.etagereIndex].splice(data.position, 0, livre);

		const pointsGagnes = calculerPoints(partie.etageres[data.etagereIndex], data.position);
		joueurs[nomJoueur].points += pointsGagnes;

		if (pointsGagnes > 0) {
			console.log(`[PLACEMENT] ${nomJoueur} place "${livre.titre}" et gagne ${pointsGagnes} points (Total: ${joueurs[nomJoueur].points})`);
		}

		io.emit('livre-place', {
			joueur: nomJoueur, livre: livre, etagereIndex: data.etagereIndex, position: data.position,
			pointsGagnes: pointsGagnes, nouveauScore: joueurs[nomJoueur].points, etageres: partie.etageres
		});

		io.emit('maj-tapis', partie.tapis);
		io.emit('maj-joueurs', Object.values(joueurs));
	});

	// ========== PHASE 3: CHAT ==========
	socket.on('message', (msg) => {
		if (!socket.nom || msg.trim().length === 0) return;
		console.log(`[CHAT] ${socket.nom}: ${msg.trim()}`);
		io.emit('message', { nom: socket.nom, message: msg.trim(), timestamp: Date.now() });
	});

	// ========== PHASE 4: DÉCONNEXION ==========
	socket.on('disconnect', () => {
		if (!socket.nom) return;
		const nom = socket.nom;
		console.log(`[DÉCONNEXION] ${nom} s'est déconnecté.`);

		delete joueurs[nom];
		if (partie.enCours) terminerPartie(`${nom} s'est déconnecté.`);

		io.emit('joueurs-maj', { joueurs: Object.values(joueurs), nbJoueurs: Object.keys(joueurs).length });
	});
});

// ====================== GESTION DE LA PARTIE ======================
function demarrerPartie() {
	partie.enCours = true;
	partie.tapis = [];
	partie.etageres = [[], [], [], [], []]; 
	partie.livresDistribues = 0;

	console.log("[PARTIE] La partie commence !");
	
	io.emit('partie-demarre', { message: 'La partie commence !', maxLivres: partie.maxLivres });

	setTimeout(ajouterLivreAuTapis, 1000);
	setTimeout(ajouterLivreAuTapis, 3000);
}

function ajouterLivreAuTapis() {
	if (!partie.enCours) return;

	if (partie.livresDistribues >= partie.maxLivres) {
		terminerPartie('Tous les livres ont été distribués !');
		return;
	}

	// WARNING: Assuming LIVRES constant is available from the original code
	const livreBase = LIVRES[Math.floor(Math.random() * LIVRES.length)];
	const livre = { ...livreBase, id: Date.now() + '-' + Math.random().toString(36).substr(2, 9), timestamp: Date.now() };

	partie.tapis.push(livre);
	partie.livresDistribues++;

	// console.log(`[LIVRE] Nouveau livre ajouté: "${livre.titre}" (${partie.livresDistribues}/${partie.maxLivres})`);

	io.emit('nouveau-livre', livre);
	io.emit('maj-tapis', partie.tapis);

	const delai = 8000 + Math.random() * 4000;
	partie.livreSuivantTimer = setTimeout(ajouterLivreAuTapis, delai);

	setTimeout(() => retirerLivreDuTapis(livre.id), 20000);
}

function retirerLivreDuTapis(livreId) {
	const index = partie.tapis.findIndex(l => l.id === livreId);
	if (index !== -1) {
		const livre = partie.tapis.splice(index, 1)[0];
		// console.log(`[LIVRE] Livre retiré du tapis: "${livre.titre}"`);
		io.emit('livre-retire', { livreId: livreId });
		io.emit('maj-tapis', partie.tapis);
	}
}

function terminerPartie(raison) {
	partie.enCours = false;
	clearTimeout(partie.livreSuivantTimer);
	
	console.log(`[FIN] Partie terminée: ${raison}`);

	const joueursArray = Object.values(joueurs);
	if (joueursArray.length === 2) {
		joueursArray.sort((a, b) => b.points - a.points);
		const gagnant = joueursArray[0];
		const perdant = joueursArray[1];

		const message = gagnant.points === perdant.points 
			? `Égalité ! ${gagnant.nom} et ${perdant.nom} ont ${gagnant.points} points.`
			: `${gagnant.nom} gagne avec ${gagnant.points} points contre ${perdant.points} !`;
			
		io.emit('partie-terminee', {
			raison: raison, gagnant: gagnant.nom, scoreGagnant: gagnant.points,
			perdant: perdant.nom, scorePerdant: perdant.points, message: message
		});
	} else {
		io.emit('partie-terminee', { raison: raison, message: 'La partie est terminée.' });
	}

	partie.tapis = [];
	partie.etageres = [[], [], [], [], []];
}

// ====================== CALCUL DES POINTS ======================
function calculerPoints(etagere, positionNouveau) {
	let points = 0;

	points += verifierMemeAuteur(etagere, positionNouveau);
	points += verifierMemeGenre(etagere, positionNouveau);
	points += verifierMemeLitterature(etagere, positionNouveau);
	points += verifierOrdreAlphabetique(etagere, positionNouveau);

	return points;
}

function verifierMemeAuteur(etagere, pos) {
	if (etagere.length < 2) return 0;
	const livre = etagere[pos];
	let count = 1;
	for (let i = pos - 1; i >= 0 && etagere[i].auteur === livre.auteur; i--) count++;
	for (let i = pos + 1; i < etagere.length && etagere[i].auteur === livre.auteur; i++) count++;
	if (count >= 2) return count * (count - 1);
	return 0;
}

function verifierMemeGenre(etagere, pos) {
	if (etagere.length < 3) return 0;
	const livre = etagere[pos];
	let count = 1;
	for (let i = pos - 1; i >= 0 && etagere[i].genre === livre.genre; i--) count++;
	for (let i = pos + 1; i < etagere.length && etagere[i].genre === livre.genre; i++) count++;
	if (count >= 3) return count + (count - 2);
	return 0;
}

function verifierMemeLitterature(etagere, pos) {
	const livre = etagere[pos];
	if (!livre.littérature || etagere.length < 3) return 0;
	let count = 1;
	for (let i = pos - 1; i >= 0 && etagere[i].littérature === livre.littérature; i--) count++;
	for (let i = pos + 1; i < etagere.length && etagere[i].littérature === livre.littérature; i++) count++;
	if (count >= 3) return count * 2;
	return 0;
}

function verifierOrdreAlphabetique(etagere, pos) {
	if (etagere.length < 3) return 0;
	let count = 1;

	// Check left
	for (let i = pos - 1; i >= 0 && etagere[i].titre <= etagere[i + 1].titre; i--) count++;

	// Check right
	for (let i = pos + 1; i < etagere.length && etagere[i - 1].titre <= etagere[i].titre; i++) count++;

	if (count >= 3) return count * 3;
	return 0;
}

// ====================== DÉMARRAGE DU SERVEUR ======================
const PORT = 8888;
server.listen(PORT, () => {
	console.log(`[SERVEUR] Écoute sur http://localhost:${PORT}`);
});
