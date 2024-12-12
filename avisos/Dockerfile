# Usamos la imagen base de Node.js
FROM node:20.14.0

# Configuración del Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci  # Instala las dependencias desde package-lock.json para asegurar consistencia
COPY backend .

# Configuración del Frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .

# Exponer los puertos necesarios
EXPOSE 3000
EXPOSE 5173

# Comando para iniciar ambos servicios
CMD ["sh", "-c", "cd /app/backend && npm start & cd /app/frontend && npm run dev -- --host 0.0.0.0"]
