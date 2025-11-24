const express = require('express');
const router = express.Router();
const db = require('../config/db');
// GET all tasks
router.get('/', async (req, res) => {
  try {
    // Get query params with defaults
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const q = req.query.q || null;

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;
    if (limit > 50) limit = 50;

    const offset = (page - 1) * limit;

    // Base SQL queries
    let sql = 'SELECT * FROM tasks';
    let countSql = 'SELECT COUNT(*) AS total FROM tasks';
    const params = [];

    // Search by title
    if (q) {
      sql += ' WHERE title LIKE ?';
      countSql += ' WHERE title LIKE ?';
      params.push(`%${q}%`);
    }

    // Add pagination
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Execute queries
    const [rows] = await db.query(sql, params);
    const [countResult] = await db.query(countSql, q ? [`%${q}%`] : []);
    const totalTasks = countResult[0].total;
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      totalTasks,
      totalPages,
      currentPage: page,
      limit,
      data: rows
    });

  } catch (err) {
    console.error('Pagination route error:', err);  // <--- VERY IMPORTANT
    res.status(500).json({ error: 'Database error' });
  }
});

// POST create new task
router.post('/', async (req, res) => {
const { title, description } = req.body;
if (!title || title.trim() === '') {
return res.status(400).json({ error: 'Title is required' });
}
try {
const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
const [result] = await db.query(sql, [title, description || null]);
const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
res.status(201).json(newTask[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to create task' });
}
});
// PUT update task
router.put('/:id', async (req, res) => {
const { id } = req.params;
const { title, description, status } = req.body;
try {
const updates = [];
const values = [];
if (title !== undefined) { updates.push('title = ?'); values.push(title); }
if (description !== undefined) { updates.push('description = ?'); values.push(description); }
if (status !== undefined) { updates.push('status = ?'); values.push(status); }
if (updates.length === 0) {
return res.status(400).json({ error: 'No fields to update' });
}
values.push(id);
const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
const [result] = await db.query(sql, values);
if (result.affectedRows === 0) {
return res.status(404).json({ error: 'Task not found' });
}
const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
res.json(updated[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to update task' });
}
});
// DELETE task
router.delete('/:id', async (req, res) => {
const { id } = req.params;
try {
const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [id]);
if (result.affectedRows === 0) {
return res.status(404).json({ error: 'Task not found' });
}
res.status(204).send();
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Failed to delete task' });
}
});
module.exports = router;
