const Aviso = require("../models/aviso.model");

// Crear un nuevo aviso

exports.createAviso = async (req, res) => {
    try {
      console.log("Petición recibida en createAviso"); 
      const { titulo, descripcion, precio, categoria, contacto } = req.body;
      console.log("Datos recibidos en el body:", req.body); 
  
      const usuarioEmail = req.email; // Usamos req.email directamente del middleware
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
    const avisoId = req.params.id;
    const { titulo, descripcion, precio, categoria, contacto } = req.body;

    const avisoActualizado = await Aviso.findOneAndUpdate(
      { id: avisoId }, // Busca por el campo `id`
      { titulo, descripcion, precio, categoria, contacto },
      { new: true, select: "-usuarioEmail" }, // Excluir usuarioEmail de la respuesta
    );

    if (!avisoActualizado) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    res.status(200).json(avisoActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el aviso", error });
  }
};

// Eliminar un aviso
exports.deleteAviso = async (req, res) => {
  try {
    const avisoId = req.params.id;
    
    // Eliminar el aviso usando el campo `id` directamente
    const avisoEliminado = await Aviso.findOneAndDelete({ id: avisoId }); // Usa directamente `id: avisoId`

    if (!avisoEliminado) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    res.status(200).json({ message: "Aviso eliminado" });
  } catch (error) {
    console.error("Error al eliminar el aviso:", error);
    res.status(500).json({ message: "Error al eliminar el aviso", error });
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

    // Si el aviso ha alcanzado el límite de reportes, desactívalo
    const limiteReportes = 3; // Puedes ajustar este límite
    if (aviso.reportes >= limiteReportes) {
      aviso.estado = "Desactivado";
    }

    await aviso.save();
    res.status(200).json({ message: "Reporte registrado", estado: aviso.estado });
  } catch (error) {
    res.status(500).json({ message: "Error al reportar el aviso", error });
  }
};
