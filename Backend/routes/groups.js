const express = require('express');
const Group = require('../models/Group');
const Recipe = require('../models/Recipe');
const router = express.Router();

// Crear grupo
router.post('/', async (req, res) => {
  const { name, recipes } = req.body;

  try {
    const newGroup = new Group({ name, recipes });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los grupos
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('recipes');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar grupo
router.delete('/:id', async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Grupo eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
