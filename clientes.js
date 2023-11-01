const express = require('express');
const router = express.Router();
const Cliente = require('../modelos/clientesM');
const Venta = require('../modelos/ventasM');
// Controlador para crear un cliente
router.post('/crear', async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el cliente.' });
  }
});

// Controlador para obtener todos los clientes
router.get('/obtener', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los clientes.' });
  }
});

// Controlador para obtener un cliente por ID con su historial de compras
router.get('/obtener/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;
  let cliente = await Cliente.findById(clienteId)
  let compras = await Venta.find({ cliente: clienteId })
    .populate('vehiculoVendido')
    .populate('vendedor');

  cliente.historialDeCompras = compras;

  res.json(cliente);
});

// Controlador para actualizar un cliente por ID
router.put('/actualizar/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId, req.body, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    res.json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el cliente.' });
  }
});

// Controlador para borrar un cliente por ID
router.delete('/borrar/:clienteId', async (req, res) => {
  const clienteId = req.params.clienteId;
  try {
    const clienteBorrado = await Cliente.findByIdAndRemove(clienteId);
    if (!clienteBorrado) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    res.json(clienteBorrado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo borrar el cliente.' });
  }
});

module.exports = router;
