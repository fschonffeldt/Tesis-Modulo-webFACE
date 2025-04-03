const Aviso = require("../models/aviso.model");
const Reporte = require ("../models/reporte.model");
const { schemaAviso } = require('../schema/aviso.schema');
const Tag = require("../models/tag.model"); // Importar el modelo de Tag
const natural = require("natural");
const stemmer = natural.PorterStemmerEs;

// Crear un nuevo aviso

exports.createAviso = async (req, res) => {
  try {
    console.log("Petición recibida en createAviso");
    const { titulo, descripcion, precio, contacto, tags = [] } = req.body;

    if (!contacto || !contacto.telefono) {
      return res.status(400).json({ message: "El número de teléfono es obligatorio." });
    }

    const usuarioEmail = req.email;
    if (!usuarioEmail) {
      return res.status(400).json({ message: "El email del usuario es obligatorio." });
    }

    const imagenes = req.files && req.files.length > 0 
      ? req.files.map(file => `uploads/${file.filename}`) 
      : [];

    const tagsArray = Array.isArray(tags)
      ? tags.map(tag => tag.trim().toLowerCase())
      : typeof tags === 'string'
        ? tags.split(',').map(tag => tag.trim().toLowerCase())
        : [];

    const nuevoAviso = new Aviso({
      titulo,
      descripcion,
      precio,
      contacto: {
        telefono: contacto.telefono,
        email: usuarioEmail,
      },
      imagenes,
      tags: tagsArray,
    });

    const avisoGuardado = await nuevoAviso.save();
    console.log("Aviso guardado en la base de datos:", avisoGuardado);

   // Guardar o actualizar tags
    if (tags.length > 0) {
      for (const tag of tags) {
        const originalTag = tag.trim();
        const normalizedTag = stemmer.stem(originalTag.toLowerCase());

        const existente = await Tag.findOne({ normalizedTag });
        if (existente) {
          existente.cantidadUsos += 1;
          await existente.save();
        } else {
          await Tag.create({ originalTag, normalizedTag });
        }
      }
    }


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
    const avisoId = req.params.id;
    console.log("ID recibido para actualizar:", avisoId);

    const { titulo, descripcion, precio, contacto, tags = [] } = req.body;

    const aviso = await Aviso.findOne({ id: avisoId });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Verificación de permisos
    if (aviso.contacto.email !== req.email) {
      return res.status(403).json({ message: "No tienes permiso para modificar este aviso" });
    }

    // Actualización de campos básicos
    aviso.titulo = titulo || aviso.titulo;
    aviso.descripcion = descripcion || aviso.descripcion;
    aviso.precio = precio || aviso.precio;

    if (contacto && contacto.telefono) {
      aviso.contacto.telefono = contacto.telefono;
    }

    // 📌 Convertir los tags a array si vienen como string
    let parsedTags = [];

    if (Array.isArray(tags)) {
      parsedTags = tags;
    } else if (typeof tags === "string") {
      parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }

    // 📌 Guardar tags en el aviso
    if (parsedTags.length > 0) {
      aviso.tags = parsedTags;

      for (const tag of parsedTags) {
        const normalized = natural.PorterStemmerEs.stem(tag.toLowerCase());

        const existente = await Tag.findOne({ normalizedTag: normalized });
        if (existente) {
          existente.cantidadUsos += 1;
          await existente.save();
        } else {
          await Tag.create({
            originalTag: tag,
            normalizedTag: normalized
          });
        }
      }
    }

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
    const { gravedad } = req.body;

    const usuarioEmail = req.email; // 👈 Asegurate de que viene del token

    const puntos = gravedad === "Leve" ? 1 : gravedad === "Media" ? 3 : 5;

    // Buscar el aviso
    const aviso = await Aviso.findOne({ id: avisoId });
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Crear un nuevo reporte con solo el email como string
    const nuevoReporte = new Reporte({
      avisoId: aviso._id,
      usuario: usuarioEmail, // 👈 solo el string del email
      gravedad
    });

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

// Buscar avisos por tag (normalizado)
exports.getAvisosByTag = async (req, res) => {
  try {
    const queryTag = req.query.tag;
    if (!queryTag) {
      return res.status(400).json({ message: "Tag requerido en query param." });
    }

    const normalized = natural.PorterStemmerEs.stem(queryTag.toLowerCase());

    const avisos = await Aviso.find({ "tags.normalized": normalized });

    res.status(200).json(avisos);
  } catch (error) {
    console.error("Error al filtrar por tag:", error);
    res.status(500).json({ message: "Error al filtrar por tag" });
  }
};
