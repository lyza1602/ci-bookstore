
const http = require("node:http");
const { books } = require("./books.json");

const server = http.createServer((req, res) => {
  const match = req.url.match(/^\/books\/(\d+)$/);

  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && match) {
    const id = Number(match[1]);
    const book = books.find(b => b.id === id);

    if (book) {
      res.writeHead(200);
      return res.end(JSON.stringify(book));
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ error: "Livre introuvable" }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Route introuvable" }));
});

if (require.main === module) {
  server.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
  });
}

module.exports = server;
