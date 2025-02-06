const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe' // Referencia a las recetas que pertenecen a este grupo
  }]
});

module.exports = mongoose.model('Group', groupSchema);
