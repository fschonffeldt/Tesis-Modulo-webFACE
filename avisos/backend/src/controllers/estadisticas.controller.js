const Aviso = require("../models/aviso.model");
const Reporte = require("../models/reporte.model");

// 🔹 Publicadores por mes
exports.getTopPublicadoresPorMes = async (req, res) => {
  try {
    const { mes, anio } = req.query;

    const fechaInicio = new Date(`${anio}-${mes}-01`);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setMonth(fechaInicio.getMonth() + 1);

    const topUsuarios = await Aviso.aggregate([
      {
        $match: {
          fechaPublicacion: { $gte: fechaInicio, $lt: fechaFin }
        }
      },
      {
        $group: {
          _id: "$contacto.email",
          totalAvisos: { $sum: 1 }
        }
      },
      { $sort: { totalAvisos: -1 } },
      { $limit: 10 }
    ]);

    res.json(topUsuarios);
  } catch (error) {
    console.error("Error en publicadores por mes:", error);
    res.status(500).json({ message: "Error al generar estadísticas." });
  }
};

// 🔹 Reportadores por mes
exports.getTopReportadoresPorMes = async (req, res) => {
  try {
    const { mes, anio } = req.query;

    const fechaInicio = new Date(`${anio}-${mes}-01`);
    const fechaFin = new Date(fechaInicio);
    fechaFin.setMonth(fechaInicio.getMonth() + 1);

    const topReportadores = await Reporte.aggregate([
      {
        $match: {
          fecha: { $gte: fechaInicio, $lt: fechaFin }
        }
      },
      {
        $group: {
          _id: "$usuario",
          totalReportes: { $sum: 1 }
        }
      },
      { $sort: { totalReportes: -1 } },
      { $limit: 10 }
    ]);

    res.json(topReportadores);
  } catch (error) {
    console.error("Error en reportadores por mes:", error);
    res.status(500).json({ message: "Error al generar estadísticas." });
  }
};

// Tags más utilizados en el mes actual
exports.getTopTagsDelMes = async (req, res) => {
  try {
    const ahora = new Date();
    const inicioDelMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

    const topTags = await Aviso.aggregate([
      {
        $match: {
          fechaPublicacion: { $gte: inicioDelMes }
        }
      },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          cantidad: { $sum: 1 }
        }
      },
      { $sort: { cantidad: -1 } },
      { $limit: 10 }
    ]);

    res.json(topTags);
  } catch (error) {
    console.error("Error al obtener top tags del mes:", error);
    res.status(500).json({ message: "Error al obtener estadísticas de tags" });
  }
};
