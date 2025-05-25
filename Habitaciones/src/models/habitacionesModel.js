const db = require('mysql2/promise');

const pool = db.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'habitaciones_db'
});

// Crear habitación
async function crearHabitacion(ciudad, descripcion, propietario_id, costo) {
  return await pool.query(
    'INSERT INTO habitaciones (ciudad, descripcion, propietario_id, costo) VALUES (?, ?, ?, ?)',
    [ciudad, descripcion, propietario_id, costo]
  );
}

// Obtener habitaciones disponibles
async function traerHabitacionesDisponibles() {
  const [rows] = await pool.query('SELECT * FROM habitaciones WHERE estado = "disponible"');
  return rows;
}

// Actualizar estado
async function actualizarEstadoHabitacion(id, estado) {
  return await pool.query('UPDATE habitaciones SET estado = ? WHERE id = ?', [estado, id]);
}

module.exports = {
  crearHabitacion,
  traerHabitacionesDisponibles,
  actualizarEstadoHabitacion
};
