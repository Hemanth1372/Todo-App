const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = await pool.query(
      'INSERT INTO todos (user_id, title, description, priority, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, title, description || null, priority || 'medium', due_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, priority, due_date, completed } = req.body;

    const todo = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (todo.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, priority = $3, due_date = $4, completed = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND user_id = $7 RETURNING *',
      [
        title !== undefined ? title : todo.rows[0].title,
        description !== undefined ? description : todo.rows[0].description,
        priority !== undefined ? priority : todo.rows[0].priority,
        due_date !== undefined ? due_date : todo.rows[0].due_date,
        completed !== undefined ? completed : todo.rows[0].completed,
        req.params.id,
        req.user.id,
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
