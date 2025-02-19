const express = require("express");
const upload = require("../config/upload-config"); // Configuración de Multer
const { 
  createAviso, 
  getAvisos, 
  getAvisoById,
  getAvisosByUsuario,
  updateAviso, 
  deleteAviso,
  reportAviso,
  getAvisosPublicos,
} = require("../controllers/aviso.controller");
const path = require("path");

const authenticationMiddleware = require("../middlewares/authentication.middleware");
const router = express.Router();

// Ruta para obtener avisos públicos (sin autenticación)
router.get("/public", getAvisosPublicos);
// Middleware de autenticación
router.use(authenticationMiddleware);

// Ruta para crear un aviso con subida de imágenes
router.post('/', upload.array('images', 3), createAviso);

// Rutas adicionales
router.get("/", getAvisos);
router.get("/usuario", getAvisosByUsuario);
router.put("/:id", updateAviso);
router.delete("/:id", deleteAviso);
router.get("/:id", getAvisoById);
router.post("/:id/reportes", reportAviso);

module.exports = router;
