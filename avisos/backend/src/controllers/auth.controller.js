"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { sendEmail } = require("../services/email.service"); // Servicio de envío de correos
const AuthServices = require("../services/auth.service"); // Servicio de autenticación
const { authLoginBodySchema } = require("../schema/auth.schema");

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function login(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = authLoginBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    // Buscar usuario en la base de datos
    const user = await AuthServices.findUserByEmail(body.email);
    if (!user) return respondError(req, res, 404, "Usuario no encontrado.");

    // 🚨 Verificar si la cuenta está activada
    if (!user.isActive) {
      return respondError(req, res, 403, "Cuenta no activada. Revisa tu correo.");
    }

   // 🔥 Solo verifica el código de activación si el usuario NO está activado
if (!user.isActive) {
  if (body.password !== user.verificationCode) {
    return respondError(req, res, 401, "Código de activación incorrecto.");
  }
}

    // Generar tokens
    const [accessToken, refreshToken, errorToken] = await AuthServices.login(body);

    if (errorToken) return respondError(req, res, 400, errorToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    respondSuccess(req, res, 200, { accessToken });

  } catch (error) {
    handleError(error, "auth.controller -> login");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Cierra la sesión del usuario
 * @async
 * @function logout
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");
    res.clearCookie("jwt", { httpOnly: true });
    respondSuccess(req, res, 200, { message: "Sesión cerrada correctamente" });
  } catch (error) {
    handleError(error, "auth.controller -> logout");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function refresh(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return respondError(req, res, 400, "No hay token");

    const [accessToken, errorToken] = await AuthServices.refresh(cookies);

    if (errorToken) return respondError(req, res, 400, errorToken);

    respondSuccess(req, res, 200, { accessToken });
  } catch (error) {
    handleError(error, "auth.controller -> refresh");
    respondError(req, res, 400, error.message);
  }
}


/**
 * Restablece la contraseña del usuario
 * @async
 * @function forgotPassword
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return respondError(req, res, 400, "El correo electrónico es obligatorio.");
    }

    const { newPassword } = await AuthServices.forgotPassword(email);

    const subject = "Restablecimiento de contraseña";
    const message = `Hola, tu contraseña ha sido restablecida. Tu nueva contraseña es: ${newPassword}`;
    const htmlMessage = `<p>Hola, Tu nueva contraseña es: <b>${newPassword}</b></p>`;

    await sendEmail(email, subject, message, htmlMessage);

    respondSuccess(req, res, 200, {
      message: "Nueva contraseña enviada al correo.",
    });
  } catch (error) {
    handleError(error, "auth.controller -> forgotPassword");
    respondError(req, res, error.status || 500, error.message || "Error interno del servidor.");
  }
}

module.exports = {
  login,
  logout,
  refresh,
  forgotPassword,
};
