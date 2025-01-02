const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const avisoSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
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
  fechaExpiracion: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
  contacto: {
    telefono: { type: String, required: true },
    email: { type: String, required: true },
  },
  estado: {
    type: String,
    enum: ["Vigente", "Vencido", "Desactivado"],
    default: "Vigente",
  },
  puntosReporte: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Aviso", avisoSchema);
