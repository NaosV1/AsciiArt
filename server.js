const http = require('http');

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
];

function sendFrames(res, frames, index) {
    if (index >= frames.length) {
        res.end(); 
        return;
    }

    res.write('\x1B[2J\x1B[0f'); 

    frames[index].forEach(line => res.write(line + '\n'));

    setTimeout(() => {
        sendFrames(res, frames, index + 1);
    }, 100); 
}

const server = http.createServer((req, res) => {
    if (req.headers['user-agent'] && req.headers['user-agent'].includes('curl')) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        sendFrames(res, frames, 0);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Please use curl to access this resource.\n');
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
