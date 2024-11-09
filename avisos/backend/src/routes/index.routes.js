"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Enrutador de Tareas  */
import tareaRoutes from "./tarea.routes.js";

import tareaRealizada from "./tareaRealizada.routes.js";

import comentarioRoutes from "./comentario.routes.js";

import ticketRoutes from "./ticket.routes.js";

import { generatePDF} from '../utils/generarPDF.js'
/** Instancia del enrutador */
const router = Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Defina la ruta para la tarea /api/tarea
router.use("/tarea", authenticationMiddleware, tareaRoutes);

// define las rutas para la tarea realizada /api/tareaRealizada

router.use("/tareaRealizada", authenticationMiddleware, tareaRealizada);

// Defina la ruta para la tarea /api/ticket
router.use("/ticket", authenticationMiddleware, ticketRoutes);

router.use("/comentario",authenticationMiddleware, comentarioRoutes);

router.use("/generatePDF", authenticationMiddleware,generatePDF);
// Exporta el enrutador
export default router;
