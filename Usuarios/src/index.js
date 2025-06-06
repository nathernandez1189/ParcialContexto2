const express = require('express');
const cors = require('cors');        
const morgan = require('morgan');
const usuariosRouter = require('./controllers/usuariosController');

const app = express();
app.use(cors());                      
app.use(morgan('dev'));
app.use(express.json());
app.use('/usuarios', usuariosRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Microservicio Usuarios escuchando en http://localhost:${PORT}`);
});
