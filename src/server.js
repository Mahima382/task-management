// server.js

// 1️⃣ Import express
const express = require('express');

// 2️⃣ Import your route file
const taskRouter = require('./routes/tasks');

// 3️⃣ Create an express application
const app = express();

// 4️⃣ Middleware to parse JSON requests
app.use(express.json()); // Parses application/json

// 5️⃣ In-memory task storage (temporary)
const tasks = [
  { id: 1, title: 'Sample Task1', completed: false },
  { id: 2, title: 'Sample Task2', completed: true },
  { id: 3, title: 'Sample Task3', completed: false }
];
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    // Force return 500 as your assignment wants
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
  next();
});
// 6️⃣ Make tasks available to routes
app.locals.tasks = tasks;

// 7️⃣ Mount your router AFTER app is created
app.use('/tasks', taskRouter);

// 8️⃣ Start your server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
