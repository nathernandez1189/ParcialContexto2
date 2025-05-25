const express = require('express');
const router = express.Router();
const axios = require('axios');
const alquileresModel = require('../models/alquileresModel');

// Crear alquiler
router.post('/', async (req, res) => {
  const { propietario_id, arrendatario_id, habitacion_id } = req.body;
  const fecha_inicio = new Date().toLocaleString('sv-SE', { timeZone: 'America/Bogota' }).replace(' ', 'T');

  try {
    // 1. Validar que la habitación esté disponible
    const habitacionesResponse = await axios.get('http://localhost:3002/habitaciones/disponibles');
    const habitacion = habitacionesResponse.data.find(h => h.id === habitacion_id);
    if (!habitacion) {
      return res.status(400).json({ error: 'La habitación no está disponible o no existe' });
    }

    // 2. Obtener nombres desde usuarios
    const propResponse = await axios.get(`http://localhost:3001/usuarios/${propietario_id}`);
    const arrResponse = await axios.get(`http://localhost:3001/usuarios/${arrendatario_id}`);
    const propietario = propResponse.data;
    const arrendatario = arrResponse.data;

    // 3. Registrar alquiler (usando modelo)
    await alquileresModel.crearAlquiler(
      propietario_id,
      arrendatario_id,
      habitacion_id,
      fecha_inicio,
      propietario.nombre_completo,
      arrendatario.nombre_completo
    );

    // 4. Actualizar estado de la habitación
    await axios.patch(`http://localhost:3002/habitaciones/${habitacion_id}/estado`, {
      estado: 'no disponible'
    });

    res.status(201).json({ mensaje: 'Alquiler registrado correctamente' });

  } catch (err) {
    console.error('Error al registrar alquiler:', err.message);
    res.status(500).json({ error: 'Error al registrar el alquiler' });
  }
});

// Obtener todos los alquileres
router.get('/', async (req, res) => {
  try {
    const data = await alquileresModel.traerAlquileres();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los alquileres' });
  }
});

// Obtener alquileres por propietario
router.get('/propietario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await alquileresModel.traerAlquileresPorPropietario(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alquileres del propietario' });
  }
});
// Obtener alquileres por arrendatario (NUEVO ENDPOINT)
router.get('/arrendatario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await alquileresModel.traerAlquileresPorArrendatario(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener alquileres del arrendatario' });
  }
});

module.exports = router;
