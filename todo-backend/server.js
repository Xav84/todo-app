const express = require("express");
const cors = require("cors");
const fs = require("fs"); // Node.js module for file system operations
const path = require("path"); // Node.js module for handling file paths

const app = express();
const PORT = 3001;

// Path to the JSON file used as a simple database
const dbPath = path.join(__dirname, "todos.json");

// --- Middleware ---
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming requests with JSON payloads

const readTodos = () => {
  if (!fs.existsSync(dbPath)) {
    // If file doesn't exist, create it with an empty array
    fs.writeFileSync(dbPath, "[]", "utf8");
    return [];
  }
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(dbPath, JSON.stringify(todos, null, 2), "utf8");
};

// --- Routes API ---

app.get("/todos/count", (req, res) => {
  const todos = readTodos();
  res.json({ count: todos.length });
});

app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todos = readTodos();
  const now = Date.now();
  const newTodo = {
    id: now,
    text: req.body.text,
    desc: req.body.desc || "",
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const now = Date.now();
  let updatedTodo = null;

  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      updatedTodo = {
        ...todo,
        ...updatedData,
        updatedAt: now,
      };
      return updatedTodo;
    }
    return todo;
  });

  if (updatedTodo) {
    writeTodos(newTodos);
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  const todos = readTodos();
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  const newTodos = todos.filter((todo) => todo.id !== id);

  if (newTodos.length < initialLength) {
    writeTodos(newTodos);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
