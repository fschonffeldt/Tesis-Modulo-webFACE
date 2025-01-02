import Joi from "joi";

// Esquema para validar los datos del correo
export const emailSchema = Joi.object({
    to: Joi.string()
        .email({ tlds: { allow: false } }) // Valida que sea un email válido
        .required()
        .messages({
            "string.empty": "El campo 'to' es obligatorio.",
            "string.email": "El campo 'to' debe ser un correo electrónico válido.",
        }),
    subject: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "El campo 'subject' es obligatorio.",
            "string.min": "El campo 'subject' debe tener al menos 3 caracteres.",
        }),
    message: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.empty": "El campo 'message' es obligatorio.",
            "string.min": "El campo 'message' debe tener al menos 5 caracteres.",
        }),
});
