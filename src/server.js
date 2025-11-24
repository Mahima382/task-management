// server.js

// 1️⃣ Import express
const express = require('express');

// 2️⃣ Import your route file
const taskRouter = require('./routes/tasks');

// 3️⃣ Create an express application
const app = express();

// 4️⃣ Middleware to parse JSON requests
app.use(express.json()); // Parses application/json

// 5️⃣ hardcored db
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime()   // Seconds the server has been running
  });
});



// 7️⃣ Mount your router AFTER app is created
app.use('/tasks', taskRouter);

// 8️⃣ Start your server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
