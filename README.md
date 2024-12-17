# Tesis Módulo Web FACE 🏫

Aplicación web desarrollada para la Facultad de Ciencias Empresariales (FACE) de la Universidad del Bío-Bío, que permite gestionar avisos clasificados y promover actividades grupales de manera eficiente.

---

## Características Principales

- **Gestión de Avisos Clasificados**: Publicación y gestión de avisos relacionados con compra/venta de artículos y servicios.
- **Promoción de Actividades Grupales**: Detalles y horarios de actividades organizadas dentro de la universidad.

---


## Tecnologías Utilizadas

**Lenguajes**
   - JavaScript: Usado en el backend y frontend.
   - PHP v7.4: Utilizado en el entorno WordPress.

**Frameworks y Librerías**

**Frontend:**
   - React.js (v18.2.0): Biblioteca para construir interfaces dinámicas.
   - Vite.js: Herramienta de desarrollo para aplicaciones rápidas.

**Backend:**
   - Express.js (v4.18.2): Framework para crear APIs RESTful.
   - Mongoose (v7.5.2): ORM para interactuar con MongoDB.
   - WordPress (v6.6.2): CMS para la gestión de contenido.

**Bases de Datos**
   - MongoDB (v8.0.3): Base de datos NoSQL.
   - MySQL/MariaDB (v10.5): Base de datos relacional para WordPress.

> ⚠️ **Nota**: Usar estas versiones garantiza la compatibilidad y estabilidad del proyecto.

---

## Para iniciar
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

 ## Requisitos Previos
Sistema Operativo Recomendado
El entorno recomendado es Ubuntu 24.04.01. Puedes instalarlo en un entorno físico, virtual o Docker.

## Dependencias Necesarias

1. Instalar Git
Ejecuta el siguiente comando:

```bash
sudo apt-get install git
```

2. Instalar Docker
Ejecuta los siguientes comandos para instalar Docker Compose v2:

```bash
sudo apt install curl

sudo curl -L "https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Asigna permisos de ejecución a Docker Compose:
```bash
sudo chmod +x /usr/local/bin/docker-compose
```
Verifica la instalación ejecutando:
```bash
docker-compose --version
```
La salida debería verse similar a:
Docker Compose version v2.29.2


## Instalación del proyecto
1. Clonar el repositorio
Ejecuta el siguiente comando:

```bash
git clone https://github.com/fschonffeldt/Tesis-Modulo-webFACE.git
cd Tesis-Modulo-webFACE/avisos
```
2. Configurar las variables de entorno
Configuración del backend:

```bash
cd backend/src/config
nano .env
```

3. Creacion de BD en la nube con MongoDB:
   
3.1. **Crear una cuenta en MongoDB Atlas**  
   - Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).  
   - Regístrate o inicia sesión con tu cuenta existente.

3.2. **Crear un clúster y una base de datos**  
   3.2.1. Crea un clúster gratuito en la región de tu preferencia.  
   3.2.2. Accede a **Collections** y crea una nueva base de datos, por ejemplo: `avisosDB`.

3.3. **Crear un usuario y una contraseña**  
   3.3.1. Ve a **Database Access**.  
   3.3.2. Crea un nuevo usuario con permisos de lectura/escritura y asigna una contraseña segura.  
   - **Nota:** Guarda el usuario y contraseña, ya que los necesitarás para configurar el proyecto.

3.4. **Configurar la conexión en el archivo `.env`**  
   3.4.1. Ve a **Network Access** en MongoDB Atlas y agrega tu IP actual (`0.0.0.0/0` para permitir acceso desde cualquier IP).  
   3.4.2. Copia la cadena de conexión (**Connection String**) proporcionada por MongoDB Atlas.  
   3.4.3. Modifica la cadena en tu archivo `.env` para incluir el usuario, contraseña y base de datos que creaste.

    
Deberia quedar algo asi:
```bash
# Configuración del servidor
PORT= aquí va el puerto que vas a utilizar (ejemplo: 3000)
HOST= puede ir localhost, una IP o el dominio donde estará disponible el servidor (ejemplo: localhost)

# Configuración de la base de datos
DB_URL=mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<BASE_DE_DATOS>?retryWrites=true&w=majority&appName=<APP_NAME>

# Configuración de JWT
ACCESS_JWT_SECRET=Super!Tree5&Lemon$Sky@91WindFox
REFRESH_JWT_SECRET=Cactus$7MoonRiver5Bird*8OrangeStar

⚠️ **Nota** 
(ACCESS_JWT_SECRET y REFRESH_JWT_SECRET) son claves utilizadas para firmar y verificar la autenticidad de los tokens JWT en tu aplicación.
Estas claves garantizan que los tokens sean seguros y no puedan ser falsificados.
```

## Ejecución
Con Docker
Ejecuta el siguiente comando desde Tesis-Modulo-webFACE/avisos:

```bash
# docker-compose up --build
```

## Problemas con Docker
Si tienes problemas al iniciar Docker, puedes instalar las dependencias necesarias de la siguiente forma:

1. Instalar Node.js:
```bash
sudo apt install nodejs
```
2. Instalar nodemon y otras dependencias:
```bash
sudo npm install -g nodemon
npm install dotenv
```
3. Posiciónate en el directorio del backend:
```bash
cd Tesis-Modulo-webFACE/avisos/backend/src
npm start
```
4. En una nueva consola, sigue estos pasos para iniciar el frontend:
```bash
cd Tesis-Modulo-webFACE/avisos/frontend
```
5. Instala las dependencias necesarias con npm:
```bash
npm install vite
```
6. Ingresa a la URL que te entrega la consola, deberia ser algo asi http://localhost:5173/

