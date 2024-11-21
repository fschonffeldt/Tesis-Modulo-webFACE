const express = require("express");
const { 
  createAviso, 
  getAvisos, 
  getAvisoById,
  getAvisosByUsuario,
  updateAviso, 
  deleteAviso,
  reportAviso,
} = require("../controllers/aviso.controller");
const router = express.Router();

router.post("/", createAviso); 
router.get("/", getAvisos);

router.get("/usuario", getAvisosByUsuario);
router.post("/:id/report", reportAviso);
router.put("/:id", updateAviso); 
router.delete("/:id", deleteAviso);

router.get("/:id", getAvisoById);

module.exports = router;
