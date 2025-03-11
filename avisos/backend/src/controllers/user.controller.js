"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const UserService = require("../services/user.service");
const { userBodySchema, userIdSchema } = require("../schema/user.schema");
const { handleError } = require("../utils/errorHandler");
const User = require("../models/user.model");
const { generateVerificationCode } = require("../utils/codeGenerator");
const { sendEmail } = require("../services/email.service");



/**
 * Obtiene todos los usuarios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUsers(req, res) {
  try {
    // Llama al servicio para obtener los usuarios
    const usuarios = await UserService.getUsers();

    // Si no hay usuarios, devuelve una respuesta vacía
    if (!usuarios || usuarios.length === 0) {
      return respondSuccess(req, res, 204, []);
    }

    // Devuelve la lista de usuarios
    return respondSuccess(req, res, 200, usuarios);
  } catch (error) {
    handleError(error, "user.controller -> getUsers");
    return respondError(req, res, 500, "Error al obtener los usuarios.");
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createUser(req, res) {
  try {
    const { body } = req;

    // Validar el cuerpo de la solicitud con el esquema
    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) {
      return respondError(req, res, 400, bodyError.message);
    }

    // Llamar al servicio para crear el usuario
    const [newUser, userError] = await UserService.createUser(body);

    // Manejar errores del servicio
    if (userError) {
      return respondError(req, res, 400, userError);
    }

    // Validar que se haya creado un usuario
    if (!newUser) {
      return respondError(req, res, 400, "No se pudo crear el usuario.");
    }

    // Responder con éxito
    return respondSuccess(req, res, 201, newUser);
  } catch (error) {
    // Capturar errores inesperados y responder con error interno del servidor
    handleError(error, "user.controller -> createUser");
    return respondError(req, res, 500, "No se pudo crear el usuario.");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getUserById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [user, errorUser] = await UserService.getUserById(params.id);

    if (errorUser) return respondError(req, res, 404, errorUser);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> getUserById");
    respondError(req, res, 500, "No se pudo obtener el usuario");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateUser(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = userBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [user, userError] = await UserService.updateUser(params.id, body);

    if (userError) return respondError(req, res, 400, userError);

    respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> updateUser");
    respondError(req, res, 500, "No se pudo actualizar el usuario");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteUser(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = userIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const user = await UserService.deleteUser(params.id);
    !user
      ? respondError(
          req,
          res,
          404,
          "No se encontro el usuario solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, user);
  } catch (error) {
    handleError(error, "user.controller -> deleteUser");
    respondError(req, res, 500, "No se pudo eliminar el usuario");
  }
}

/**
 * Actualiza los roles de un usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateUserRoles(req, res) {
  try {
    const { params, body } = req;
    const userId = params.id; // ID del usuario al que se quiere modificar roles
    const { roles } = body;  // Nuevos roles enviados en el cuerpo de la solicitud

    // Validar que roles sea un array válido
    if (!Array.isArray(roles)) {
      return respondError(req, res, 400, "El campo 'roles' debe ser un array.");
    }

    // Llamar al servicio para actualizar roles
    const [updatedUser, error] = await UserService.updateUserRoles(userId, roles);

    // Manejar errores del servicio
    if (error) {
      return respondError(req, res, 400, error);
    }

    // Responder con el usuario actualizado
    respondSuccess(req, res, 200, updatedUser);
  } catch (error) {
    handleError(error, "user.controller -> updateUserRoles");
    respondError(req, res, 500, "No se pudieron actualizar los roles del usuario.");
  }
}

/**
 * Activa una cuenta de usuario mediante un código de verificación
 * @param {Object} req - Solicitud HTTP
 * @param {Object} res - Respuesta HTTP
 */
async function activateUser(req, res) {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "La cuenta ya está activada." });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Código de activación incorrecto." });
    }

    // ✅ Activar cuenta y borrar el código de activación
    user.isActive = true;
    user.verificationCode = null;
    await user.save();

    res.status(200).json({ message: "Cuenta activada con éxito. Ahora puedes iniciar sesión." });
  } catch (error) {
    console.error("Error en activateUser:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}



async function sendVerificationCode(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "La cuenta ya está activada. No es necesario otro código." });
    }

    // Generar y guardar el código de activación
    const verificationCode = generateVerificationCode();
    user.verificationCode = verificationCode;
    await user.save();

    // Enviar el código de activación por correo
    const subject = "Código de activación";
    const text = `Tu código de activación es: ${verificationCode}`;
    const html = `<p>Tu código de activación es: <strong>${verificationCode}</strong></p>`;

    await sendEmail(user.email, subject, text, html);

    res.status(200).json({ message: "Código de activación enviado a tu correo electrónico." });
  } catch (error) {
    console.error("Error en sendVerificationCode:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}



module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRoles,
  activateUser,
  sendVerificationCode,
};
