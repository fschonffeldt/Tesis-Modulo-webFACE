const express = require('express');
const upload = require('../config/upload-config'); // Ajusta la ruta correctamente
const router = express.Router();

router.post('/upload', upload.array('images', 3), (req, res) => {
    console.log('Body:', req.body); // Verifica si hay datos en el cuerpo
    console.log('Archivos subidos:', req.files); // Verifica los archivos procesados
  
    try {
      const files = req.files.map(file => file.path);
      res.status(200).json({ message: 'Imágenes subidas con éxito', files });
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      res.status(500).json({ message: 'Error al subir imágenes', error });
    }
  });
  