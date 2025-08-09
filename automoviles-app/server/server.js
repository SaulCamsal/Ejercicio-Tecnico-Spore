//Carga las variables de entorno del archivo .env
require('dotenv').config(); 
//Dependencias necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
// Crear las instancias de Express y Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(express.json());  //Parsear el cuerpo de las solicitudes JSON

//conexion a la base de datos MongoDB con la URI definida en el archivo .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));
//


//
//Rutas para manejar las diferentes rutas base 
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/vehicles', require('./routes/vehicle.routes'));

// Configuración de Socket.io para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Par la disponibilidad de la instancia de Socket.io en toda la aplicación
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
