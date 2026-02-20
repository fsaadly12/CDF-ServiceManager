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




module.exports = router;
