"use strict";
const express = require("express");
const { getReportesByAviso, getAllReportes, darDeBajaAviso, actualizarAvisoReportado } = require("../controllers/reporte.controller");

/** Middleware de autenticación */
const verifyJWT = require("../middlewares/authentication.middleware.js");

/** Middleware de autorización */
const { isAdmin, isUser } = require("../middlewares/authorization.middleware.js");

const router = express.Router();

// 🔹 Middleware de autenticación para todas las rutas protegidas
router.use(verifyJWT);

// 🔹 Obtener reportes de un aviso (Debe estar autenticado como usuario o admin)
router.get("/:avisoId", isUser, getReportesByAviso);

// 🔹 Obtener todos los reportes (Solo para administradores o moderadores)
router.get("/", isAdmin, getAllReportes);

// 🔹 Dar de baja un aviso reportado (Solo Admin)
router.put("/desactivar/:avisoId", isAdmin, darDeBajaAviso);

// 🔹 Actualizar un aviso reportado (Solo Admin)
router.put("/actualizar/:avisoId", isAdmin, actualizarAvisoReportado);

module.exports = router;
