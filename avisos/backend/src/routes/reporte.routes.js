const express = require("express");
const { getReportesByAviso, getAllReportes } = require("../controllers/reporte.controller");

const router = express.Router();

// Obtener reportes de un aviso
router.get("/:avisoId", getReportesByAviso);

// Obtener todos los reportes (para moderadores)
router.get("/", getAllReportes);

module.exports = router;
