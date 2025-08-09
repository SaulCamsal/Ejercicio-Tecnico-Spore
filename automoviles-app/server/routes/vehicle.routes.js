const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const checkRole = require('../middlewares/role');
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  updateVehiclePosition,
  deleteVehicle
} = require('../controllers/vehicle.controller');

router.post('/', verifyToken, createVehicle);
router.get('/', verifyToken, getVehicles);
router.get('/:id', verifyToken, getVehicleById);
router.put('/:id', verifyToken, updateVehicle);
router.put('/:id/position', verifyToken, updateVehiclePosition);
router.delete('/:id', verifyToken, deleteVehicle);

// Ruta solo para admin
router.get('/admin/all', verifyToken, checkRole(['admin']), (req, res) => {
  // Implementación adicional si es necesaria
});

module.exports = router;