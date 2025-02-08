const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Carpeta para guardar las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Nombre único para evitar colisiones
  },
});

// Filtrar tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPEG y PNG'));
  }
};

// Inicializar Multer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5 MB por archivo
  fileFilter,
});

module.exports = upload;
