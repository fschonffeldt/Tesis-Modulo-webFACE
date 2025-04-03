const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  originalTag: {
    type: String,
    required: true,
  },
  normalizedTag: {
    type: String,
    required: true,
    lowercase: true,
  },
  cantidadUsos: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model('Tag', tagSchema);
