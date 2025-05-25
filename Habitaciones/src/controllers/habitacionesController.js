const express = require('express');
const router = express.Router();
const axios = require('axios');
const habitacionesModel = require('../models/habitacionesModel');

// Crear habitación
router.post('/', async (req, res) => {
  const { ciudad, descripcion, propietario_id, costo } = req.body;

  try {
    // Validar que el propietario exista
    const response = await axios.get(`http://localhost:3001/usuarios/${propietario_id}`);
    const propietario = response.data;

    if (propietario.rol !== 'propietario') {
      return res.status(403).json({ error: 'El usuario no tiene rol de propietario' });
    }

    await habitacionesModel.crearHabitacion(ciudad, descripcion, propietario_id, costo);

    res.status(201).json({ mensaje: 'Habitación registrada correctamente' });

  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'Propietario no encontrado' });
    }
    console.error(err.message);
    res.status(500).json({ error: 'Error al registrar habitación' });
  }
});

// Ver habitaciones disponibles
router.get('/disponibles', async (req, res) => {
  try {
    const habitaciones = await habitacionesModel.traerHabitacionesDisponibles();
    res.json(habitaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar habitaciones disponibles' });
  }
});

// Cambiar estado habitación
router.patch('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    await habitacionesModel.actualizarEstadoHabitacion(id, estado);
    res.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado de la habitación' });
  }
});

// Ver habitaciones por propietario
router.get('/propietario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const habitaciones = await habitacionesModel.traerHabitacionesPorPropietario(id);
    res.json(habitaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar habitaciones del propietario' });
  }
});


module.exports = router;
