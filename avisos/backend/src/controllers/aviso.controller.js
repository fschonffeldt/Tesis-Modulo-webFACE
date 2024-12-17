const Aviso = require("../models/aviso.model");

// Crear un nuevo aviso

exports.createAviso = async (req, res) => {
    try {
      console.log("Petición recibida en createAviso"); 
      const { titulo, descripcion, precio, categoria, contacto } = req.body;
      console.log("Datos recibidos en el body:", req.body); 
  
      const usuarioEmail = req.email;
      console.log("Email del usuario autenticado:", usuarioEmail);
  
      const nuevoAviso = new Aviso({
        titulo,
        descripcion,
        precio,
        categoria,
        contacto: {
          telefono: contacto.telefono, // El usuario proporciona el teléfono
          email: usuarioEmail, // El email se establece automáticamente desde req.email
        },
      });
  
      const avisoGuardado = await nuevoAviso.save();
      console.log("Aviso guardado en la base de datos:", avisoGuardado);
  
      // Remueve el campo email antes de enviar la respuesta
      const avisoSinEmail = avisoGuardado.toObject();
      delete avisoSinEmail.contacto.email;
  
      res.status(201).json(avisoSinEmail);
    } catch (error) {
      console.error("Error al crear el aviso:", error); 
      res.status(500).json({ message: "Error al crear el aviso", error });
    }
  };

// Obtener todos los avisos sin información de contacto
exports.getAvisos = async (req, res) => {
    try {
      let avisos;
  
      // Verifica si el usuario está autenticado (si existe req.user)
      if (req.user) {
        // Usuario autenticado: incluye los datos de contacto
        avisos = await Aviso.find();
      } else {
        // Usuario no autenticado: excluye los datos de contacto
        avisos = await Aviso.find().select("-contacto -usuarioEmail");
      }
  
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


exports.reportAviso = async (req, res) => {
  try {
    const avisoId = req.params.id;
    const aviso = await Aviso.findOne({ id: avisoId });

    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    aviso.reportes += 1;

   
    const limiteReportes = 3; 
    if (aviso.reportes >= limiteReportes) {
      aviso.estado = "Desactivado";
    }

    await aviso.save();
    res.status(200).json({ message: "Reporte registrado", estado: aviso.estado });
  } catch (error) {
    res.status(500).json({ message: "Error al reportar el aviso", error });
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
