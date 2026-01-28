const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const serviceRoutes = require('./routes/service.routes');
app.use('/api/services', serviceRoutes);

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('CDF ServiceManager API running...');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
