const express = require('express');
const router = express.Router();
const Vendedor = require('../modelos/vendedoresM');
const Venta = require('../modelos/ventasM');
const Cliente = require('../modelos/clientesM')

// Controlador para crear un vendedor
router.post('/crear', async (req, res) => {
  try {
    const nuevoVendedor = new Vendedor(req.body);
    const vendedorGuardado = await nuevoVendedor.save();
    res.json(vendedorGuardado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el vendedor.' });
  }
});

// Controlador para obtener todos los vendedores
router.get('/obtener', async (req, res) => {
  try {
    const vendedores = await Vendedor.find();
    res.json(vendedores);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los vendedores.' });
  }
});

// Controlador para obtener un vendedor por ID con su historial de ventas
router.get('/obtener/:vendedorId', async (req, res) => {
  const vendedorId = req.params.vendedorId;
  let vendedor = await Vendedor.findById(vendedorId)
  let ventas = await Venta.find({vendedor: vendedorId})
  .populate('vehiculoVendido')

  let cliente = await Cliente.findById(ventas[0].cliente)
  

  ventas.forEach( venta => {
    venta.cliente = cliente
  })
  vendedor.historialDeVentas = ventas


   res.json(vendedor)
  }
);

// Controlador para actualizar un vendedor por ID
router.put('/actualizar/:vendedorId', async (req, res) => {
  const vendedorId = req.params.vendedorId;
  try {
    const vendedorActualizado = await Vendedor.findByIdAndUpdate(vendedorId, req.body, { new: true });
    if (!vendedorActualizado) {
      return res.status(404).json({ error: 'Vendedor no encontrado.' });
    }
    res.json(vendedorActualizado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar el vendedor.' });
  }
});

// Controlador para borrar un vendedor por ID
router.delete('/borrar/:vendedorId', async (req, res) => {
  const vendedorId = req.params.vendedorId;
  try {
    const vendedorBorrado = await Vendedor.findByIdAndRemove(vendedorId);
    if (!vendedorBorrado) {
      return res.status(404).json({ error: 'Vendedor no encontrado.' });
    }
    res.json(vendedorBorrado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo borrar el vendedor.' });
  }
});

module.exports = router;
