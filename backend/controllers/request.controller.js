const db = require('../config/db');

// 1️⃣ Client create request
exports.createRequest = (req, res) => {
  const { service_id, description } = req.body;
  const user_id = req.user.id;

  db.query(
    'INSERT INTO requests (user_id, service_id, description) VALUES (?, ?, ?)',
    [user_id, service_id, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Request created successfully' });
    }
  );
};

// 2️⃣ Client get his requests
exports.getMyRequests = (req, res) => {
  db.query(
    'SELECT * FROM requests WHERE user_id = ?',
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// 3️⃣ Employee/Admin get all requests
exports.getAllRequests = (req, res) => {
  db.query(
    `SELECT r.*, u.name AS client_name, s.title AS service_title
     FROM requests r
     JOIN users u ON r.user_id = u.id
     JOIN services s ON r.service_id = s.id`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// 4️⃣ Set price (employee/admin)
exports.setPrice = (req, res) => {
  const { price } = req.body;
  const requestId = req.params.id;

  db.query(
    'UPDATE requests SET price = ?, status = "PRICED" WHERE id = ?',
    [price, requestId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Price set successfully' });
    }
  );
};

// 5️⃣ Client accept
exports.acceptRequest = (req, res) => {
  db.query(
    'UPDATE requests SET status = "ACCEPTED" WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Request accepted' });
    }
  );
};

// 6️⃣ Client reject
exports.rejectRequest = (req, res) => {
  db.query(
    'UPDATE requests SET status = "REJECTED" WHERE id = ? AND user_id = ?',
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Request rejected' });
    }
  );
};