const http = require('http');

// Définir les grandes frames de l'animation
const frames = [
    [
        "     .--.______, ,;_;,",
        "  .-` / , \\    //`   `",
        " /    \\   /'._/'",
        "|    _  |; (_  ;",
        "; -'/ ` |_\\__/ |",
        " \\   `-._      |",
        "  `\"\"\"\"\"`      |",
        "   `\"\"\"\"\"`     |",
        "    `\"\"\"\"`    /",
        "     `\"\"`  .`",
        "       ;  /",
        "       ! /",
        "       ;!",
        "      ;`",
        "     !`",
        "     `"
    ],
    [
    "     .--.______, ,;_;,",
    "  .-` / , \\    //`   `",
    " /    \\   /'._/'",
    "|    _  |; (_  ;",
    "; -'/ ` |_\\__/ -",
    " \\   `-._BITE  -",
    "  `\"\"\"\"\"`      |",
    "   `\"\"\"\"\"`     |",
    "    `\"\"\"\"`    /",
    "     `\"\"`  .`",
    "       ;  /",
    "       ! /",
    "       ;!",
    "      ;`",
    "     !`",
    "     `"
]
    // Ajouter d'autres grandes frames ici
];

// Fonction pour envoyer chaque grande frame avec un délai
function sendFrames(res, frames, index) {
    if (index >= frames.length) {
        res.end(); // Terminer la réponse lorsque toutes les grandes frames sont envoyées
        return;
    }

    // Effacer la console avant d'afficher la grande frame suivante
    res.write('\x1B[2J\x1B[0f'); // Codes ANSI pour effacer la console

    // Envoyer chaque ligne de la grande frame
    frames[index].forEach(line => res.write(line + '\n'));

    setTimeout(() => {
        sendFrames(res, frames, index + 1); // Envoyer la prochaine grande frame après un délai
    }, 100); // Délai de 0.5 seconde (500 millisecondes)
}

// Créer un serveur
const server = http.createServer((req, res) => {
    // Vérifier si la requête provient de curl
    if (req.headers['user-agent'] && req.headers['user-agent'].includes('curl')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        sendFrames(res, frames, 0); // Commencer à envoyer les grandes frames
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Please use curl to access this resource.\n');
    }
});

// Démarrer le serveur sur le port 3000
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
