"use strict";

const jwt = require("jsonwebtoken");
const { ACCESS_JWT_SECRET } = require("../config/configEnv");
const { respondError } = require("../utils/resHandler");

/**
 * Verifica el token de acceso, excepto para rutas públicas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return respondError(
        req,
        res,
        401,
        "No autorizado",
        "No hay token válido"
      );
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) return respondError(req, res, 403, "No autorizado", err.message);
      req.email = decoded.email;
      req.roles = decoded.roles;
      next();
    });
  } catch (error) {
    console.error("Error en el middleware de autenticación:", error.message);
    respondError(req, res, 500, "Error interno del servidor");
  }
};

module.exports = verifyJWT;
