const Reporte = require("../models/reporte.model");
const Aviso = require("../models/aviso.model");
const { sendEmail } = require("../services/email.service");

// Obtener todos los reportes de un aviso
exports.getReportesByAviso = async (req, res) => {
  try {
    const { avisoId } = req.params;

    const reportes = await Reporte.find({ avisoId }).populate("avisoId", "titulo descripcion");
    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ message: "Error al obtener reportes", error });
  }
};

// Listar todos los reportes agrupados por avisoId
exports.getAllReportes = async (req, res) => {
  try {
    const reportes = await Reporte.aggregate([
      {
        $group: {
          _id: "$avisoId",
          usuarios: { $push: "$usuario" }, // Lista de usuarios que reportaron
          totalReportes: { $sum: 1 }, // Contador de reportes
          gravedad: { $push: "$gravedad" } // Lista de niveles de gravedad
        }
      },
      {
        $lookup: {
          from: "avisos",
          localField: "_id",
          foreignField: "_id",
          as: "aviso"
        }
      },
      { $unwind: "$aviso" },
      {
        $project: {
          _id: 1,
          aviso: 1,
          usuarios: 1,
          totalReportes: 1,
          gravedad: 1
        }
      }
    ]);

    res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes agrupados:", error);
    res.status(500).json({ message: "Error al obtener reportes agrupados", error });
  }
};

// Dar de baja un aviso reportado y notificar al usuario
exports.darDeBajaAviso = async (req, res) => {
  try {
      const { avisoId } = req.params;

      // Buscar el aviso
      const aviso = await Aviso.findOne({ id: avisoId }); // Se usa `id` porque ahora es un UUID en el modelo
      if (!aviso) {
          return res.status(404).json({ message: "Aviso no encontrado" });
      }

      // Cambiar estado del aviso a "Desactivado"
      aviso.estado = "Desactivado";
      await aviso.save();

      // Enviar correo de notificación al usuario
      if (aviso.contacto && aviso.contacto.email) {
          const subject = "🔴 Tu aviso ha sido desactivado";
          const text = `Hola,

Lamentamos informarte que tu aviso titulado "${aviso.titulo}" ha sido desactivado por incumplir las normas de nuestra plataforma.

Si crees que se trata de un error, por favor contáctanos.`;

          const html = `<p>Hola,</p>
          <p>Lamentamos informarte que tu aviso titulado <strong>"${aviso.titulo}"</strong> ha sido desactivado por incumplir las normas de nuestra plataforma.</p>
          `;

          await sendEmail(aviso.contacto.email, subject, text, html);
      }

      res.status(200).json({ message: "Aviso desactivado correctamente y notificación enviada.", aviso });
  } catch (error) {
      console.error("Error al dar de baja el aviso:", error);
      res.status(500).json({ message: "Error al dar de baja el aviso", error });
  }
};

exports.actualizarAvisoReportado = async (req, res) => {
  try {
    const { avisoId } = req.params;
    const { titulo, descripcion, precio, categoria } = req.body;

    // Buscar el aviso
    const aviso = await Aviso.findById(avisoId);
    if (!aviso) {
      return res.status(404).json({ message: "Aviso no encontrado" });
    }

    // Actualizar solo los campos que se envían
    if (titulo) aviso.titulo = titulo;
    if (descripcion) aviso.descripcion = descripcion;
    if (precio) aviso.precio = precio;
    if (categoria) aviso.categoria = categoria;

    await aviso.save();

    res.status(200).json({ message: "Aviso actualizado correctamente", aviso });
  } catch (error) {
    console.error("Error al actualizar el aviso reportado:", error);
    res.status(500).json({ message: "Error al actualizar el aviso", error });
  }
};
