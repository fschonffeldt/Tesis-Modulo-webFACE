"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const usuarioController = require("../controllers/user.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Ruta pública para activar la cuenta
router.post("/activate", usuarioController.activateUser);
router.post("/send-verification", usuarioController.sendVerificationCode);


// Define el middleware de autenticación para todas las rutas protegidas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/", usuarioController.getUsers);
router.post("/", authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/:id", usuarioController.getUserById);
router.put(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.updateUser
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.deleteUser
);

// Nueva ruta para actualizar roles
router.put(
  "/:id/roles",
  authorizationMiddleware.isAdmin, // Middleware que verifica si el usuario es administrador
  usuarioController.updateUserRoles // Llama al método del controlador
);

// Exporta el enrutador
module.exports = router;
