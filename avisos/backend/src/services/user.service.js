"use strict";
// Importa el modelo de datos 'User'
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const { generateVerificationCode } = require("../utils/codeGenerator");
const { sendEmail } = require("./email.service");


class UserService {
  /**
   * Crear un usuario con roles personalizados
   * @param {Object} data - Datos del usuario
   * @returns {Object} - Usuario creado
   */
  static async createUser({ username, email, password, roles }) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw { status: 400, message: "El correo ya está registrado." };
      }

      let validRole = null;
      if (roles) {
        validRole = await Role.findOne({ name: roles });
        if (!validRole) {
          throw { status: 400, message: "El rol proporcionado no es válido." };
        }
      } else {
        const defaultRole = await Role.findOne({ name: "user" });
        if (!defaultRole) {
          throw { status: 500, message: "Rol predeterminado 'user' no encontrado." };
        }
        validRole = defaultRole;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles: validRole._id,
      });

      const savedUser = await newUser.save();

      return {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: validRole.name,
      };
    } catch (error) {
      handleError(error, "UserService -> createUser");
    }
  }

  /**
   * Obtener todos los usuarios
   * @returns {Array} - Lista de usuarios
   */
  static async getUsers() {
    try {
      const users = await User.find().populate("roles", "name");
  
      return users.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name).join(", "), // Convierte los roles a un string separado por comas
      }));
    } catch (error) {
      handleError(error, "UserService -> getUsers");
      throw new Error("Error al obtener la lista de usuarios.");
    }
  }

  /**
   * Obtener un usuario por ID
   * @param {String} id - ID del usuario
   * @returns {Object} - Usuario encontrado
   */
  static async getUserById(id) {
    try {
      const user = await User.findById(id).populate("roles", "name");
      if (!user) {
        throw { status: 404, message: "Usuario no encontrado." };
      }
      return {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.name,
      };
    } catch (error) {
      handleError(error, "UserService -> getUserById");
    }
  }

  /**
   * Actualizar un usuario
   * @param {String} id - ID del usuario
   * @param {Object} data - Datos a actualizar
   * @returns {Object} - Usuario actualizado
   */
  static async updateUser(id, data) {
    try {
      const { username, email, roles } = data;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        throw { status: 404, message: "Usuario no encontrado." };
      }

      let validRole = null;
      if (roles) {
        validRole = await Role.findOne({ name: roles });
        if (!validRole) {
          throw { status: 400, message: "El rol proporcionado no es válido." };
        }
      }

      const updateData = {
        ...(username && { username }),
        ...(email && { email }),
        ...(validRole && { roles: validRole._id }),
      };

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      }).populate("roles", "name");

      if (!updatedUser) {
        throw { status: 404, message: "Usuario no encontrado." };
      }

      return {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        roles: updatedUser.roles.name,
      };
    } catch (error) {
      handleError(error, "UserService -> updateUser");
    }
  }

/**
 * Actualiza los roles de un usuario
 * @param {String} userId - ID del usuario a actualizar
 * @param {Array} roles - Nuevos roles a asignar
 * @returns {Array} - Usuario actualizado o mensaje de error
 */
static async updateUserRoles(userId, roles) {
  try {
    // Validar que roles sea un array válido
    if (!Array.isArray(roles)) {
      return [null, "El campo 'roles' debe ser un array válido."];
    }

    // Verificar si los roles existen en la base de datos
    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length !== roles.length) {
      return [null, "Uno o más roles proporcionados no son válidos."];
    }

    // Mapear los IDs de los roles encontrados
    const roleIds = rolesFound.map((role) => role._id);

    // Actualizar los roles del usuario en la base de datos
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { roles: roleIds },
      { new: true } // Devuelve el documento actualizado
    ).populate("roles", "name");

    if (!updatedUser) {
      return [null, "Usuario no encontrado."];
    }

    return [updatedUser, null];
  } catch (error) {
    handleError(error, "UserService -> updateUserRoles");
    return [null, "Error interno del servidor."];
  }
}

  /**
   * Eliminar un usuario
   * @param {String} id - ID del usuario
   * @param {String} currentUserId - ID del usuario que solicita la eliminación
   * @returns {Object} - Mensaje de éxito
   */
  static async deleteUser(id, currentUserId) {
    try {
      if (!id || !currentUserId) {
        throw { status: 400, message: "IDs inválidos." };
      }

      const userToDelete = await User.findById(id).populate("roles", "name");
      if (!userToDelete) {
        throw { status: 404, message: "Usuario no encontrado." };
      }

      const isAdmin = userToDelete.roles && userToDelete.roles.name === "admin";

      if (isAdmin) {
        const remainingAdmins = await User.countDocuments({
          roles: { $elemMatch: { name: "admin" } },
        });
        if (remainingAdmins <= 1) {
          throw { status: 400, message: "No se puede eliminar el último administrador." };
        }

        if (currentUserId === id) {
          throw { status: 400, message: "No puedes eliminarte como el único administrador restante." };
        }
      }

      await User.findByIdAndDelete(id);

      return { message: "Usuario eliminado exitosamente." };
    } catch (error) {
      handleError(error, "UserService -> deleteUser");
    }
  }

  /**
   * Registra un nuevo usuario con verificación de correo electrónico
   * @param {Object} data - Datos del usuario
   * @returns {Array} - Usuario creado o mensaje de error
   */
  static async registerUser({ username, email, password, roles }) {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return [null, "El correo ya está registrado."];
      }

      const verificationCode = generateVerificationCode();
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles,
        verificationCode, // Código para verificar la cuenta
        isActive: false,   // La cuenta está desactivada por defecto
      });

      await newUser.save();

      // Enviar correo con el código de verificación
      const htmlContent = `
        <h1>Bienvenido a AVISOS</h1>
        <p>Gracias por registrarte. Para activar tu cuenta, usa este código:</p>
        <h2>${verificationCode}</h2>
        <p>Si no solicitaste esta cuenta, ignora este mensaje.</p>
      `;

      const emailResult = await sendEmail(
        email,
        "Código de Verificación",
        `Tu código de verificación es: ${verificationCode}`, // Texto plano
        htmlContent                                        // Contenido HTML
      );

      if (!emailResult) {
        return [null, "Error al enviar el correo de verificación."];
      }

      return [newUser, null];
    } catch (error) {
      handleError(error, "UserService -> registerUser");
      return [null, "Error interno del servidor."];
    }
  }

}

module.exports = UserService;

