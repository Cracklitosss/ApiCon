const mongoose = require('mongoose');

const vendedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  historialDeVentas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venta',
    },
  ],
  contacto: {
    numeroCelular: {
      type: String,
      required: true,
    },
  },
});

const Vendedor = mongoose.model('Vendedore', vendedorSchema);

module.exports = Vendedor;
