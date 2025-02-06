const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  comensales: {
    type: Number,
    required: true,
  },
  tiempo: {
    type: String,
    required: true,
  },
  ingredientes: {
    type: [String],
    required: true,
  },
  pasos: {
    type: [String],
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }],
});

module.exports = mongoose.model('Recipe', recipeSchema);