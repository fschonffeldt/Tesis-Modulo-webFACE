const Reporte = require("../models/reporte.model");

// Obtener todos los reportes de un aviso
exports.getReportesByAviso = async (req, res) => {
  try {
    const { avisoId } = req.params;

    const reportes = await Reporte.find({ avisoId }).populate("avisoId", "titulo descripcion");
    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ message: "Error al obtener reportes", error });
  }
};

// Listar todos los reportes (para administradores/moderadores)
exports.getAllReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find().populate("avisoId", "titulo descripcion");
    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ message: "Error al obtener reportes", error });
  }
};
