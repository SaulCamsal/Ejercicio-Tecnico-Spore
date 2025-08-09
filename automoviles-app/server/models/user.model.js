//Importamos biblioteca mongoose para manejar la base de datos MongoDB
const mongoose = require('mongoose');

// y definimos el esquema del modelo de usuario.
//Username debe ser unico y requerido, al igual que el password.
//Role puede ser admin o user, y por defecto es user. Si es admin podrá consultar todos los vehiculos
//Vehicles es un array de ObjectId que hace referencia al modelo Vehicle, permitiendo asociar varios vehículos a un usuario.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }]
});

module.exports = mongoose.model('User', userSchema);