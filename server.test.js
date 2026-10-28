
const test = require("node:test");
const assert = require("node:assert/strict");
const server = require("./server");

test("GET /books/1 retourne le bon livre", async () => {
  const address = await startServer();

  try {
    const response = await fetch(`${address}/books/1`);
    const book = await response.json();

    assert.equal(response.status, 200);
    assert.equal(book.title, "Le Petit Prince");
  } finally {
    await stopServer();
  }
});

test("GET /books/99 retourne une erreur 404", async () => {
  const address = await startServer();

  try {
    const response = await fetch(`${address}/books/99`);

    assert.equal(response.status, 404);
  } finally {
    await stopServer();
  }
});

function startServer() {
  return new Promise(resolve => {
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      resolve(`http://127.0.0.1:${port}`);
    });
  });
}

function stopServer() {
  return new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  });
}
