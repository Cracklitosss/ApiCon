const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  dirección: {
    type: String,
  },
  contacto: {
    numeroCelular: {
      type: String,
      required: true,
    },
  },
  historialDeCompras: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venta',
    },
  ],
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
