const Vehicle = require('../models/vehicle.model');
const User = require('../models/user.model');

// Controlador para manejar las operaciones de vehículos
//Crear un nuevo vehiculo
const createVehicle = async (req, res) => {
    try {
        const { plates, brand, color, model, position } = req.body;
        //const owner = req.user._id; // Asignar el ID del usuario autenticado

        const newVehicle = new Vehicle({
            plates,
            brand,
            color,
            model,
            position: { lat, lng },
            owner: req.user._id
        });

        const saved_vehicle = await newVehicle.save();

        // Agregar el vehículo al array de vehículos del usuario que lo crea
        await User.findByIdAndUpdate(
            req.userId,
            { $push: { vehicles: newVehicle._id } }
        );

        // Agregar vehículo al usuario
        await User.findByIdAndUpdate(
            req.userId,
            { $push: { vehicles: savedVehicle._id } }
        );

        res.status(201).json(savedVehicle);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Las placas ya están registradas' });
        }
        res.status(500).json({ message: 'Error al crear vehículo' });
    }
};

// Obtener todos los vehículos (según rol)
const getVehicles = async (req, res) => {
    try {
        let vehicles;
        if (req.userRole === 'admin') {
            vehicles = await Vehicle.find().populate('owner', 'username');
        } else {
            vehicles = await Vehicle.find({ owner: req.userId }).populate('owner', 'username');
        }
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vehículos' });
    }
};

// Obtener un vehículo por ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({
            _id: req.params.id,
            $or: [
                { owner: req.userId },
                ...(req.userRole === 'admin' ? [{}] : [])
            ]
        }).populate('owner', 'username');

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener vehículo' });
    }
};

// Actualizar un vehículo
const updateVehicle = async (req, res) => {
    try {
        const { plates, brand, color, model } = req.body;

        const updatedVehicle = await Vehicle.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.userId
            },
            { plates, brand, color, model },
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado o no autorizado' });
        }

        // Emitir actualización a través de Socket.io
        const io = req.app.get('io');
        io.emit('vehicle_updated', updatedVehicle);

        res.json(updatedVehicle);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Las placas ya están registradas' });
        }
        res.status(500).json({ message: 'Error al actualizar vehículo' });
    }
};

// Actualizar posición de vehículo
const updateVehiclePosition = async (req, res) => {
    try {
        const { lat, lng } = req.body;

        const updatedVehicle = await Vehicle.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.userId
            },
            { position: { lat, lng } },
            { new: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado o no autorizado' });
        }

        // Emitir actualización de posición en tiempo real
        const io = req.app.get('io');
        io.emit('position_updated', {
            vehicleId: updatedVehicle._id,
            position: updatedVehicle.position
        });

        res.json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar posición' });
    }
};

// Eliminar un vehículo
const deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await Vehicle.findOneAndDelete({
            _id: req.params.id,
            owner: req.userId
        });

        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehículo no encontrado o no autorizado' });
        }

        // Remover vehículo del usuario
        await User.findByIdAndUpdate(
            req.userId,
            { $pull: { vehicles: deletedVehicle._id } }
        );

        res.json({ message: 'Vehículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar vehículo' });
    }
};

module.exports = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    updateVehiclePosition,
    deleteVehicle
};