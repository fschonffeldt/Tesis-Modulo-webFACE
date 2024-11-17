const cron = require("node-cron");
const Aviso = require("../models/aviso.model");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Tarea programada para ejecutarse diariamente a medianoche
cron.schedule("0 0 * * *", async () => {
  console.log("Revisando avisos...");

  const ahora = new Date();
  const unaSemanaAntes = new Date(ahora.getTime() + 7 * 24 * 60 * 60 * 1000);

  try {
    // Avisos por vencer en una semana
    const avisosPorVencer = await Aviso.find({
      estado: "Vigente",
      fechaExpiracion: { $lte: unaSemanaAntes, $gt: ahora },
    });

    avisosPorVencer.forEach(async (aviso) => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: aviso.contacto.email,
        subject: "Su aviso está por expirar",
        text: `Su aviso "${aviso.titulo}" expirará pronto. Ingrese para renovarlo o darlo de baja.`,
      });
    });

    // Avisos ya vencidos
    const avisosVencidos = await Aviso.find({
      estado: "Vigente",
      fechaExpiracion: { $lte: ahora },
    });

    avisosVencidos.forEach(async (aviso) => {
      aviso.estado = "Vencido";
      await aviso.save();

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: aviso.contacto.email,
        subject: "Su aviso ha expirado",
        text: `Su aviso "${aviso.titulo}" ha expirado y está ahora inactivo.`,
      });
    });

    console.log("Tarea cron completada.");
  } catch (error) {
    console.error("Error en la tarea programada de avisos:", error);
  }
});
