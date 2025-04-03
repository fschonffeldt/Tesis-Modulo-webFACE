const mongoose = require("mongoose");

const reporteSchema = new mongoose.Schema({
  avisoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Aviso",
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  gravedad: {
    type: String,
    enum: ["Leve", "Media", "Grave"],
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Reporte", reporteSchema);