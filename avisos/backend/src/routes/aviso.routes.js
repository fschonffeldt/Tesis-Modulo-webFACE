const express = require("express");
const { 
  createAviso, 
  getAvisos, 
  getAvisoById, 
  updateAviso, 
  deleteAviso,
} = require("../controllers/aviso.controller");
const router = express.Router();

// CRUD Aviso
router.post("/", createAviso); 
router.get("/", getAvisos);
router.get("/:id", getAvisoById);
router.put("/:id", updateAviso); 
router.delete("/:id", deleteAviso);

module.exports = router;
