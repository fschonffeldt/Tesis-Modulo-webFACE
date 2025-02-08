const express = require('express');
const upload = require('../config/upload-config');
const avisoController = require('../controllers/aviso.controller');

const router = express.Router();

// Subida de imágenes y creación del aviso
router.post('/', upload.array('images', 3), avisoController.createAviso);

module.exports = router;
