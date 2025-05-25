const express = require('express');
const morgan = require('morgan');
const habitacionesRouter = require('./controllers/habitacionesController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/habitaciones', habitacionesRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Microservicio Habitaciones escuchando en http://localhost:${PORT}`);
});
