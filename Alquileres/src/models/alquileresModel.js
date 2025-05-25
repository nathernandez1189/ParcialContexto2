const db = require('mysql2/promise');

const pool = db.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'alquileres_db'
});

// Crear un nuevo alquiler
async function crearAlquiler(propietario_id, arrendatario_id, habitacion_id, fecha_inicio, nombre_propietario, nombre_arrendatario) {
  return await pool.query(
    'INSERT INTO alquileres (propietario_id, arrendatario_id, habitacion_id, fecha_inicio, nombre_propietario, nombre_arrendatario) VALUES (?, ?, ?, ?, ?, ?)',
    [propietario_id, arrendatario_id, habitacion_id, fecha_inicio, nombre_propietario, nombre_arrendatario]
  );
}

// Obtener todos los alquileres
async function traerAlquileres() {
  const [rows] = await pool.query('SELECT * FROM alquileres');
  return rows;
}

// Obtener alquileres por propietario
async function traerAlquileresPorPropietario(id) {
  const [rows] = await pool.query('SELECT * FROM alquileres WHERE propietario_id = ?', [id]);
  return rows;
}

// Obtener alquileres por arrendatario (NUEVA FUNCIÓN)
async function traerAlquileresPorArrendatario(id) {
  const [rows] = await pool.query('SELECT * FROM alquileres WHERE arrendatario_id = ?', [id]);
  return rows;
}

// Recuerda exportarla:
module.exports = {
  crearAlquiler,
  traerAlquileres,
  traerAlquileresPorPropietario,
  traerAlquileresPorArrendatario // <-- agrega aquí también
};