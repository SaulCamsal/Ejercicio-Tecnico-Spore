const User = require('../models/user.model');
const Vehicle = require('../models/vehicle.model');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios (solo admin)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

// Obtener usuario actual
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password').populate('vehicles');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    let update = updateData;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      update,
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  updateUser
};