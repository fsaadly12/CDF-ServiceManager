const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const requestController = require('../controllers/request.controller');


// CLIENT
router.post(
  '/',
  verifyToken,
  roleMiddleware('client'),
  requestController.createRequest
);

router.get(
  '/my-requests',
  verifyToken,
  roleMiddleware('client'),
  requestController.getMyRequests
);

router.put(
  '/:id/accept',
  verifyToken,
  roleMiddleware('client'),
  requestController.acceptRequest
);

router.put(
  '/:id/reject',
  verifyToken,
  roleMiddleware('client'),
  requestController.rejectRequest
);


// ADMIN + EMPLOYEE
router.get(
  '/',
  verifyToken,
  requestController.getAllRequests
);

router.put(
  '/:id/price',
  verifyToken,
  requestController.setPrice
);

module.exports = router;