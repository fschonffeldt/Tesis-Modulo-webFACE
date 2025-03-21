const Aviso = require("../models/aviso.model");
const Reporte = require ("../models/reporte.model");
const { schemaAviso } = require('../schema/aviso.schema');

// Crear un nuevo aviso

exports.createAviso = async (req, res) => {
  try {
    console.log("Petición recibida en createAviso");
    const { titulo, descripcion, precio, categoria, contacto} = req.body;

    // Validar que el contacto tiene un teléfono
    if (!contacto || !contacto.telefono) {
      return res.status(400).json({ message: "El número de teléfono es obligatorio." });
    }

    // Obtener el email del usuario autenticado
    const usuarioEmail = req.email;
    if (!usuarioEmail) {
      return res.status(400).json({ message: "El email del usuario es obligatorio." });
    }

    // Procesar imágenes si se subieron
    const imagenes = req.files && req.files.length > 0 
      ? req.files.map(file => `uploads/${file.filename}`) 
      : []; // Si no hay imágenes, inicializa como un arreglo vacío

    // Crear el nuevo aviso
    const nuevoAviso = new Aviso({
      titulo,
      descripcion,
      precio,
      categoria,
      contacto: {
        telefono: contacto.telefono, // Teléfono del body
        email: usuarioEmail, // Email autenticado
      },
      imagenes, // Almacenar las rutas de las imágenes (si existen)
    });

    // Guardar el aviso en la base de datos
    const avisoGuardado = await nuevoAviso.save();
    console.log("Aviso guardado en la base de datos:", avisoGuardado);

    res.status(201).json({ mensaje: "Aviso creado con éxito", aviso: avisoGuardado });
  } catch (error) {
    console.error("Error al crear el aviso:", error);
    res.status(500).json({ message: "Error al crear el aviso", error });
  }
};

// Obtener todos los avisos sin información de contacto
exports.getAvisos = async (req, res) => {
  try {
    const avisos = await Aviso.find(); // Incluye todos los datos, incluido el contacto
    res.status(200).json(avisos);
  } catch (error) {
    console.error("Error al obtener avisos:", error);
    res.status(500).json({ message: "Error al obtener avisos", error });
  }
};

// Obtener un aviso por ID, incluyendo la información de contacto si el usuario está autenticado
exports.getAvisoById = async (req, res) => {
  try {
    const avisoId = req.params.id;
    const aviso = await Aviso.findOne({ id: avisoId }).select("-usuarioEmail"); // Busca por el campo `id`

    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Si el usuario está autenticado, muestra la información de contacto
    const avisoData = req.user ? aviso : { ...aviso.toObject(), contacto: undefined };

    res.status(200).json(avisoData);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el aviso", error });
  }
};

// Actualizar un aviso
exports.updateAviso = async (req, res) => {
  try {
    const avisoId = req.params.id; // El ID personalizado (UUID)
    console.log("ID recibido para actualizar:", avisoId);

    const { titulo, descripcion, precio, categoria, contacto } = req.body;

    // Buscar el aviso usando el campo 'id' (UUID personalizado)
    const aviso = await Aviso.findOne({ id: avisoId });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Verificar si el usuario autenticado es el propietario del aviso
    if (aviso.contacto.email !== req.email) {
      return res.status(403).json({ message: "No tienes permiso para modificar este aviso" });
    }

    // Actualizar los campos del aviso solo si se envían en el body
    aviso.titulo = titulo || aviso.titulo;
    aviso.descripcion = descripcion || aviso.descripcion;
    aviso.precio = precio || aviso.precio;
    aviso.categoria = categoria || aviso.categoria;

    if (contacto && contacto.telefono) {
      aviso.contacto.telefono = contacto.telefono;
    }

    // Guardar los cambios
    const avisoActualizado = await aviso.save();
    res.status(200).json({ message: "Aviso actualizado correctamente", aviso: avisoActualizado });
  } catch (error) {
    console.error("Error al actualizar el aviso:", error);
    res.status(500).json({ message: "Error al actualizar el aviso", error });
  }
};

// Eliminar un aviso
exports.deleteAviso = async (req, res) => {
  try {
    const avisoId = req.params.id; // ID personalizado que viene de la URL
    console.log("ID recibido para eliminar:", avisoId);

    // Buscar el aviso usando el campo 'id' personalizado
    const aviso = await Aviso.findOne({ id: avisoId });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Verificar si el usuario autenticado es el propietario del aviso
    if (aviso.contacto.email !== req.email) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este aviso" });
    }

    // Eliminar el aviso usando el campo 'id'
    await Aviso.deleteOne({ id: avisoId });

    res.status(200).json({ message: "Aviso eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el aviso:", error);
    res.status(500).json({ message: "Error al eliminar el aviso", error });
  }
};

exports.getAvisosByUsuario = async (req, res) => {
  try {
      const usuarioEmail = req.email; // Obtén el email del usuario autenticado
      console.log("Email del usuario autenticado:", usuarioEmail);

      // Buscar avisos relacionados al email del usuario autenticado
      const avisos = await Aviso.find({ "contacto.email": usuarioEmail }).select("-usuarioEmail");
      console.log("Avisos encontrados para el usuario:", avisos);

      if (avisos.length === 0) {
          return res.status(404).json({ message: "No se encontraron avisos para este usuario" });
      }

      res.status(200).json(avisos);
  } catch (error) {
      console.error("Error al obtener avisos del usuario:", error);
      res.status(500).json({ message: "Error al obtener avisos del usuario", error });
  }
};


exports.getAvisosPublicos = async (req, res) => {
  try {
      const avisos = await Aviso.find().select("-contacto -usuarioEmail");
      res.status(200).json(avisos);
  } catch (error) {
      console.error("Error al obtener avisos públicos:", error);
      res.status(500).json({ message: "Error al obtener avisos públicos", error });
  }
};

exports.reportAviso = async (req, res) => {
  try {
    const { id: avisoId } = req.params;
    const { usuario, gravedad } = req.body;

    const puntos = gravedad === "Leve" ? 1 : gravedad === "Media" ? 3 : 5;

    // Buscar el aviso
    const aviso = await Aviso.findOne({ id: avisoId });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Crear un nuevo reporte
    const nuevoReporte = new Reporte({ avisoId: aviso._id, usuario, gravedad });
    await nuevoReporte.save();

    // Incrementar puntos en el aviso
    aviso.puntosReporte += puntos;
    if (aviso.puntosReporte >= 10) {
      aviso.estado = "Desactivado";
    }
    await aviso.save();

    res.status(200).json({ message: "Reporte registrado con éxito", reporte: nuevoReporte });
  } catch (error) {
    console.error("Error al reportar aviso:", error);
    res.status(500).json({ message: "Error al reportar aviso", error });
  }
};

exports.getAvisoContactInfo = async (req, res) => {
  try {
    const avisoId = req.params.id; // Obtén el ID del aviso desde los parámetros

    // Busca el aviso y selecciona únicamente el campo de contacto
    const aviso = await Aviso.findOne({ id: avisoId }).select("contacto");
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    res.status(200).json(aviso.contacto);
  } catch (error) {
    console.error("Error al obtener los datos de contacto:", error);
    res.status(500).json({ message: "Error al obtener los datos de contacto", error });
  }
};

// 📌 Renovar un aviso (extender la fecha de expiración 30 días más)
exports.renovarAviso = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el aviso
    const aviso = await Aviso.findOne({ id: id });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Verificar que el aviso no esté desactivado
    if (aviso.estado === "Desactivado") {
      return res.status(400).json({ message: "No se puede renovar un aviso desactivado" });
    }

    // Extender la fecha de expiración 30 días más
    const nuevaFechaExpiracion = new Date(aviso.fechaExpiracion);
    nuevaFechaExpiracion.setDate(nuevaFechaExpiracion.getDate() + 30);
    aviso.fechaExpiracion = nuevaFechaExpiracion;

    await aviso.save();

    res.status(200).json({ message: "✅ Aviso renovado con éxito", aviso });
  } catch (error) {
    console.error("Error al renovar aviso:", error);
    res.status(500).json({ message: "⚠️ Error interno al renovar aviso" });
  }
};

// 📌 Permitir que los usuarios desactiven sus propios avisos (sin correo)
exports.darDeBajaAvisoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEmail = req.email; // Obtener el email del usuario autenticado

    // Buscar el aviso
    const aviso = await Aviso.findOne({ id: id });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Verificar que el usuario autenticado es el dueño del aviso
    if (aviso.contacto.email !== usuarioEmail) {
      return res.status(403).json({ message: "No tienes permiso para dar de baja este aviso" });
    }

    // Cambiar estado del aviso a "Desactivado"
    aviso.estado = "Desactivado";
    await aviso.save();

    res.status(200).json({ message: "✅ Aviso desactivado correctamente", aviso });
  } catch (error) {
    console.error("Error al dar de baja el aviso:", error);
    res.status(500).json({ message: "Error al dar de baja el aviso", error });
  }
};