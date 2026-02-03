const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all services
router.get('/', (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add service
router.post('/', (req, res) => {
  const { title, description, status, user_id } = req.body;

  db.query(
    'INSERT INTO services (title, description, status, user_id) VALUES (?,?,?,?)',
    [title, description, status, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Service added' });
    }
  );
});
// Delete service
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM services WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Service deleted' });
    }
  );
});
// Update service
router.put('/:id', (req, res) => {
  const { title, description, status } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE services SET title=?, description=?, status=? WHERE id=?',
    [title, description, status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Service updated' });
    }
  );
});




module.exports = router;
