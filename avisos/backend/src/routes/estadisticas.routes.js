const express = require("express");
const router = express.Router();
const {
  getTopPublicadoresPorMes,
  getTopReportadoresPorMes,
  getTopTagsDelMes,
} = require("../controllers/estadisticas.controller");
router.get("/top-publicadores-mes", getTopPublicadoresPorMes);
router.get("/top-reportadores-mes", getTopReportadoresPorMes);
router.get("/top-tags-mes", getTopTagsDelMes);

module.exports = router;
