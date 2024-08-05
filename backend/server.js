const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const users = [{ username: "admin", password: "pass" }];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt", { username, password });
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    console.log("Login successful", user);
    res.json({ message: "Login successful", user });
  } else {
    console.log("Invalid credentials", { username, password });
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 10.99,
    imageUrl: "https://example.com/great-gatsby.jpg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 8.99,
    imageUrl: "https://example.com/to-kill-a-mockingbird.jpg",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 12.99,
    imageUrl: "https://example.com/1984.jpg",
  },
];

const clients = [];
let order = { items: [], totalPrice: 0 };

const carts = {};

// Book Routes
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.post("/api/books", (req, res) => {
  const book = { id: books.length + 1, ...req.body };
  books.push(book);
  res.json(book);
});

app.put("/api/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
  } else {
    res.status(404).send("Book not found");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Book not found");
  }
});

// Client Routes
app.get("/api/clients", (req, res) => {
  res.json(clients);
});

app.post("/api/clients", (req, res) => {
  const client = { id: clients.length + 1, ...req.body };
  clients.push(client);
  res.json(client);
});

app.put("/api/clients/:id", (req, res) => {
  const index = clients.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients[index] = { ...clients[index], ...req.body };
    res.json(clients[index]);
  } else {
    res.status(404).send("Client not found");
  }
});

app.delete("/api/clients/:id", (req, res) => {
  const index = clients.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    clients.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("Client not found");
  }
});

// Cart Routes
app.post('/api/cart', (req, res) => {
  const { username, book } = req.body;
  if (!carts[username]) {
    carts[username] = [];
  }
  carts[username].push(book);
  res.status(200).send(carts[username]);
});

app.get('/api/cart/:username', (req, res) => {
  const { username } = req.params;
  res.status(200).send(carts[username] || []);
});

app.delete("/api/cart/:username/:bookId", (req, res) => {
  const { username, bookId } = req.params;
  if (carts[username]) {
    carts[username] = carts[username].filter((book) => book.id != bookId);
    res.status(200).send(carts[username]);
  } else {
    res.status(404).send("Cart not found");
  }
});


// Order Routes
app.get("/api/order", (req, res) => {
  res.json(order);
});

app.post("/api/order", (req, res) => {
  order = req.body;
  res.json(order);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
