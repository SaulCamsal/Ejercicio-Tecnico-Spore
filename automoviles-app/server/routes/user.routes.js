const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const {
  getUsers,
  getCurrentUser,
  updateUser
} = require('../controllers/user.controller');

router.get('/', verifyToken, checkRole(['admin']), getUsers);
router.get('/me', verifyToken, getCurrentUser);
router.put('/me', verifyToken, updateUser);

module.exports = router;