const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vehiculoRoutes = require('./controllers/vehiculos');
const clienteRoutes = require('./controllers/clientes');
const ventaRoutes = require('./controllers/ventas');
const vendedorRoutes = require('./controllers/vendedores');
const devolucionRoutes = require('./controllers/devolucion');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://Carlos:12345@cluster0.e7uiwte.mongodb.net/concesionario', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión a MongoDB establecida');
});

app.use(bodyParser.json());

app.use('/vehiculos', vehiculoRoutes);
app.use('/clientes', clienteRoutes);
app.use('/ventas', ventaRoutes);
app.use('/vendedores', vendedorRoutes);
app.use('/devoluciones', devolucionRoutes);
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
