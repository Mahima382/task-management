# Task Management API

A simple REST API for managing tasks, built with **Node.js** and **Express**.  
This project demonstrates setting up an Express server, creating routes, and handling tasks data with a RESTful API approach.

---

## Project Structure

task-management/
├─ package.json
├─ package-lock.json
├─ README.md
└─ src/
├─ index.js
└─ routes/
└─ tasks.js

## Setup Instructions

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd task-management
Install dependencies: npm install
Start the server

npm start: The server runs at: http://localhost:3000

You should see in the console:
Server running at http://localhost:3000


API Endpoints

1. GET /
Description: Returns a welcome message.
URL: http://localhost:3000/
Response: Task Management API is running!

2. GET /tasks
Description: Returns a list of all tasks.
URL: http://localhost:3000/tasks
Response (200 OK):

[
  { "id": 1, "title": "Learn Node.js", "completed": false, "priority": "high", "createdAt": "2025-11-04T13:59:04.342Z" },
  { "id": 2, "title": "Build REST API", "completed": false, "priority": "medium", "createdAt": "2025-11-04T13:59:04.342Z" },
  { "id": 3, "title": "Learn MySQL", "completed": false, "priority": "high", "createdAt": "2025-11-04T13:59:04.342Z" },
  { "id": 4, "title": "Setup Postman", "completed": true, "priority": "low", "createdAt": "2025-11-04T13:59:04.342Z" },
  { "id": 5, "title": "Practice Git", "completed": false, "priority": "medium", "createdAt": "2025-11-04T13:59:04.342Z" }
]


3. GET /tasks/:id
Description: Returns a task by its ID.
Error Handling:
Non-numeric ID → 400 Bad Request
Task not found → 404 Not Found

Examples:

Valid ID:
GET /tasks/2
Response:
{
  "id": 2,
  "title": "Build REST API",
  "completed": false,
  "priority": "medium",
  "createdAt": "2025-11-04T13:59:04.342Z"
}
ID not found:
GET /tasks/999
Response:
{
  "error": "Task not found"
}
Invalid ID format:
GET /tasks/abc
Response:
{
  "error": "Invalid ID format"
}

4. GET /health
Description: Returns API health status.
URL: http://localhost:3000/health
Response:
{
  "status": "healthy",
  "uptime": 12.345678
}