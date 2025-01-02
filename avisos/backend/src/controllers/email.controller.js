const { sendEmail } = require("../services/email.service.js");

const sendCustomEmail = async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        const info = await sendEmail(to, subject, message, `<p>${message}</p>`);
        res.status(200).json({
            success: true,
            message: "Correo enviado con éxito.",
            data: info,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error durante el envío de correo.",
            error: error.message,
        });
    }
};

module.exports = {
    sendCustomEmail,
};
