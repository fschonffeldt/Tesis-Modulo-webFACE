const express = require("express");
const { 
  createAviso, 
  getAvisos, 
  getAvisoById, 
  updateAviso, 
  deleteAviso,
} = require("../controllers/aviso.controller");
const router = express.Router();

// Definir rutas CRUD para Aviso
router.post("/", createAviso); // Crear un aviso
router.get("/", getAvisos); // Obtener todos los avisos
router.get("/:id", getAvisoById);// Obtener un aviso por ID
router.put("/:id", updateAviso); // Actualizar un aviso por ID
router.delete("/:id", deleteAviso);// Eliminar un aviso por ID

module.exports = router;
