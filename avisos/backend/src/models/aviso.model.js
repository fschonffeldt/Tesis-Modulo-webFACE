const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


const avisoSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4, // Genera un UUID por defecto
        unique: true,
      },
  titulo: {
    type: String,
    required: true,
    trim: true,
    immutable: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now,
  },
  contacto: {
    telefono: { type: String, required: true },
    email: { type: String, required: true },
  },
});

module.exports = mongoose.model("Aviso", avisoSchema);
