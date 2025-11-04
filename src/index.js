const express = require('express');
const app = express();
const port = 3000;
const tasks = [
  { id: 1, title: "Learn Node.js", completed: false, priority: "high", createdAt: new Date() },
  { id: 2, title: "Build REST API", completed: false, priority: "medium", createdAt: new Date() },
  { id: 3, title: "Learn MySQL", completed: false, priority: "high", createdAt: new Date() },
  { id: 4, title: "Setup Postman", completed: true, priority: "low", createdAt: new Date() },
  { id: 5, title: "Practice Git", completed: false, priority: "medium", createdAt: new Date() }
];
app.get('/', (req, res) => {
       res.send('Task Management API is running!');
});
app.get('/tasks', (req, res) => {
       res.json(tasks);
});
app.get("/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});
// GET /task/:id
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});


app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);
});
