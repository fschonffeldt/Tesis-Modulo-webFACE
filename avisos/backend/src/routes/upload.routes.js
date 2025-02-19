const express = require('express');
const upload = require('../config/upload-config');
const avisoController = require('../controllers/aviso.controller');

const router = express.Router();

// Subida de imágenes y creación del aviso
router.post('/', upload.array('images', 3), avisoController.createAviso);
router.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "../uploads", filename);
    
    // Enviar el archivo como respuesta
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error al enviar la imagen:", err);
        res.status(404).json({ message: "Imagen no encontrada" });
      }
    });
  });
module.exports = router;
