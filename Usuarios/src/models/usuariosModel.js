const db = require('mysql2/promise');

const pool = db.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'usuarios_db'
});

// Consultar todos los usuarios
async function traerUsuarios() {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
}

// Consultar usuario por ID
async function traerUsuario(id) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
}

// Consultar usuario por nombre de usuario (login)
async function traerUsuarioPorUsuario(usuario) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
}

// Crear nuevo usuario
async function crearUsuario(nombre_completo, usuario, password, rol) {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre_completo, usuario, password, rol) VALUES (?, ?, ?, ?)',
    [nombre_completo, usuario, password, rol]
  );
  return result;
}

// Actualizar usuario
async function actualizarUsuario(id, nombre_completo, usuario, password, rol) {
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre_completo = ?, usuario = ?, password = ?, rol = ? WHERE id = ?',
    [nombre_completo, usuario, password, rol, id]
  );
  return result;
}

// Eliminar usuario
async function eliminarUsuario(id) {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result;
}

module.exports = {
  traerUsuarios,
  traerUsuario,
  traerUsuarioPorUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
