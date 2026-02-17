const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', verifyToken, (req, res) => {
  const { service_id, description } = req.body;
  const user_id = req.user.id;

  if (!service_id || !description) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const sql = `
    INSERT INTO requests (user_id, service_id, description)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, service_id, description], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: 'Request created successfully',
      request_id: result.insertId
    });
  });
});

// Get my requests
router.get('/my-requests', verifyToken, (req, res) => {

  const userId = req.user.id;

  db.query(
    `
    SELECT r.*, s.title AS service_title
    FROM requests r
    JOIN services s ON r.service_id = s.id
    WHERE r.user_id = ?
    ORDER BY r.created_at DESC
    `,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});
// Get all requests (Admin only)
router.get('/all', verifyToken, roleMiddleware('admin'), (req, res) => {

  const sql = `
    SELECT r.*, u.name AS client_name, s.title AS service_title
    FROM requests r
    JOIN users u ON r.user_id = u.id
    JOIN services s ON r.service_id = s.id
    ORDER BY r.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
