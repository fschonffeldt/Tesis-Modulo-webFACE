const express = require("express");
const { 
  createAviso, 
  getAvisos, 
  getAvisoById,
  getAvisosByUsuario,
  updateAviso, 
  deleteAviso,
  reportAviso,
  getAvisosPublicos,
  getAvisoContactInfo,
} = require("../controllers/aviso.controller");

const authenticationMiddleware = require("../middlewares/authentication.middleware");
const router = express.Router();

router.get("/public", getAvisosPublicos);

router.use(authenticationMiddleware); 

router.post("/", createAviso); 
router.get("/", getAvisos);

router.get("/usuario", getAvisosByUsuario);
router.put("/:id", updateAviso); 
router.delete("/:id", deleteAviso);
router.get("/:id/contacto", getAvisoContactInfo);

router.get("/:id", getAvisoById);

router.post("/:id/reportes", reportAviso);

module.exports = router;
