const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Ruta para agregar una nueva receta
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, descripcion, comensales, tiempo, ingredientes, pasos, createdBy, groups } = req.body;
    const receta = new Recipe({
      nombre,
      descripcion,
      comensales,
      tiempo,
      ingredientes: JSON.parse(ingredientes),
      pasos: JSON.parse(pasos),
      imagen: req.file ? req.file.path : null,
      createdBy,
      groups: JSON.parse(groups),
    });

    await receta.save();
    res.status(201).json({ mensaje: 'Receta agregada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la receta: ' + error.message });
  }
});

// Obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const recetas = await Recipe.find().populate('createdBy').populate('groups');
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar receta
router.delete('/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Receta eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;