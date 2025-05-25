const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const alquileresRouter = require('./controllers/alquileresController');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/alquileres', alquileresRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Microservicio Alquileres escuchando en http://localhost:${PORT}`);
});
