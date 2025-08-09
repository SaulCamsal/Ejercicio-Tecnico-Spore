//Importamos nuevamente la  biblioteca mongoose para MongoDB
const mongoose = require('mongoose');

// y definimos el esquema del modelo de vehículo.
//Plates debe ser unico y requerido, al igual que la marca, color y modelo.
//Position es un objeto que contiene latitud y longitud, ambos requeridos.
//Owner es un ObjectId que hace referencia al modelo User, permitiendo asociar un vehículo a un usuario.
const vehicle_schema = new mongoose.Schema({
    plates: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Vehicle', vehicle_schema);