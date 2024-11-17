const Joi = require("joi");

// Definición del esquema completo
const schemaAviso = Joi.object({
  telefono: Joi.string()
    .pattern(/^\+56\d{9}$/) 
    .optional() 
    .allow(null) 
    .messages({
      "string.pattern.base": "El número de teléfono debe comenzar con +56 seguido de los 9 dígitos.",
    }),
  
  descripcion: Joi.string()
    .max(600)
    .required()
    .messages({
      "string.max": "La descripción no puede exceder los 600 caracteres.",
      "string.empty": "La descripción es obligatoria.",
      "any.required": "La descripción es obligatoria.",
    }),
  
  titulo: Joi.string()
    .pattern(/^(?!.*\d)(\b[a-zA-Z]+\b(?:\s+\b[a-zA-Z]+\b){1,5})$/) 
    .required()
    .messages({
      "string.pattern.base": "El título debe tener min 2 palabras y max 6, ademas no debe contener números.",
      "string.empty": "El título es obligatorio.",
      "any.required": "El título es obligatorio.",
    }),
});

// Ejemplo de validación
const { error } = schemaAviso.validate({
  telefono: null,
  descripcion: "Esta es una descripción válida.",
  titulo: "Título de ejemplo",
});

if (error) {
  console.error(error.details[0].message);
} else {
  console.log("Validación correcta");
}
