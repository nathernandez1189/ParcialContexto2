const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usuariosModel = require('../models/usuariosModel');

// Crear usuario
router.post('/', async (req, res) => {
  const { nombre_completo, usuario, password, rol } = req.body;

  try {
    const existente = await usuariosModel.traerUsuarioPorUsuario(usuario);
    if (existente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usuariosModel.crearUsuario(nombre_completo, usuario, hashedPassword, rol);

    res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Login (verificación sin token)
router.post('/login', async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const user = await usuariosModel.traerUsuarioPorUsuario(usuario);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: user.id,
        nombre_completo: user.nombre_completo,
        rol: user.rol
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al validar credenciales' });
  }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuariosModel.traerUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await usuariosModel.traerUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
});

module.exports = router;
