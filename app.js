const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  const task = {
    id: tasks.length + 1,
    title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Complete task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.completed = true;
  res.json(task);
});

// Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;