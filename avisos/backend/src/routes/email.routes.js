const express = require("express");
const { sendCustomEmail } = require("../controllers/email.controller.js");

const router = express.Router();

// Ruta para enviar correos
router.post("/send", sendCustomEmail);

module.exports = router;
