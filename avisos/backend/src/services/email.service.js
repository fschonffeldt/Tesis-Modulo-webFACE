const nodemailer = require("nodemailer");
const { emailConfig } = require("../config/configEnv.js");

const sendEmail = async (to, subject, text, html) => {
    try {
        const domain = to.includes("@alumnos.ubiobio.cl") ? "alumnos" : "personal";
        const config = emailConfig[domain];

        const transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        });

        const mailOptions = {
            from: `"AVISOS" <${config.user}>`,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error enviando el correo:", error.message);
        throw new Error("No se pudo enviar el correo: " + error.message);
    }
};

module.exports = {
    sendEmail,
};
