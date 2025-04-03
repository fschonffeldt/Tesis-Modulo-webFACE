"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const avisoroutes = require("./aviso.routes.js");
//const uploadRoutes = require('./upload.routes.js'); 
const reportRoutes = require("./reporte.routes.js");
const emailRoutes = require("./email.routes.js");
const estadisticasRoutes = require("./estadisticas.routes.js");
/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
router.use("/avisos", avisoroutes);
router.use("/reportes", reportRoutes);
router.use("/emails", emailRoutes);
router.use("/estadisticas", estadisticasRoutes);
// Exporta el enrutador
module.exports = router;
