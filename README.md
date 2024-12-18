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
El entorno usado fue Ubuntu 24.04.01 y un servidor virtual con Debian Bullseye. Puedes instalarlo en un entorno físico, virtual o Docker.

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
```
⚠️ **Nota** 
(ACCESS_JWT_SECRET y REFRESH_JWT_SECRET) son claves utilizadas para firmar y verificar la autenticidad de los tokens JWT en tu aplicación.
Estas claves garantizan que los tokens sean seguros y no puedan ser falsificados.

⚠️ **Nota** 
Si no tienes una base de datos en MongoDB puedes crearla de la siguiente forma.

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

Vuelve al paso 2 para poder configurar las variables de entorno nuevamente.


## Restaurar el Dump de Datos (Backup de MongoDB)
El proyecto viene con un backup en la siguiente ruta Tesis-Modulo-webFACE/avisos/frontend, para poder ejecutarlo sigue estos pasos:

1. Instalar MongoDB Tools:
```bash
wget https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.10.0.tgz
tar -zxvf mongodb-database-tools-*.tgz
sudo cp mongodb-database-tools-*/bin/* /usr/local/bin/
```
2. Restaurar el dump en MongoDB Atlas usando mongorestore:

```bash
mongorestore --uri="mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<BASE_DE_DATOS>" ./backup
```
**Debes poner la base de datos que creaste en mongoDB**

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
apt install npm
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
5. Instala las dependencias necesarias con npm e inicia:
```bash
npm install vite
npm run dev
```
6. Ingresa a la URL que te entrega la consola, deberia ser algo asi http://localhost:5173/

## Instalación en Servidor Virtual
- Se deben seguir las mismas instrucciones del apartado **dependencias necesarias**, exceptuando la instalación de docker y las instrucciones de **problemas con el docker** sin iniciar el backend con npm start ni el frontend con npm run dev.
- En el paso 2 el .env del backend debe quedar de la siguiente forma
```bash
# Configuración del servidor
PORT= 80 
HOST= IP servidor (ejemplo: 146.83.194.142)

# Configuración de la base de datos
DB_URL=mongodb+srv://<USUARIO>:<CONTRASEÑA>@<CLUSTER>.mongodb.net/<BASE_DE_DATOS>?retryWrites=true&w=majority&appName=<APP_NAME>

# Configuración de JWT
ACCESS_JWT_SECRET=Super!Tree5&Lemon$Sky@91WindFox
REFRESH_JWT_SECRET=Cactus$7MoonRiver5Bird*8OrangeStar
```

- Hecho lo anterior se debe instalar PM2:
```bash
npm install pm2@latest -g
```

- Ahora se debe correr el backend desde Tesis-Modulo-webFACE/avisos/backend con el siguiente comando:
```bash
pm2 start src/index.js
```
- Para el *Frontend* se deben seguir los siguientes pasos
1. Ubicados en la ruta Tesis-Modulo-webFACE/avisos/frontend, agregamos un nuevo .env con el siguiente contenido
*VITE_BASE_URL=http://IP:<Puerto 80 -> 4 digitos>/api*
Se debe poner la IP a la cual tengas acceso y los 4 digitos del puerto 80 que tengas, deberia quedar algo como esto

```bash
nano .env
# ejemplo: *VITE_BASE_URL=http://146.83.194.142:1532/api*
```
2. Una vez guardado, contruyes el frontend con:
```bash
npm run build
```
3. Por último se debe iniciar el frontend:

```bash
pm2 start npm -- run preview
```
4. Finalmente te diriges a la página con la IP que asignaste y el puerto
- ejemplo: http://146.83.194.142:1532/ 

## Construido con

- **Frontend:** [React.js](https://reactjs.org/) y [Vite.js](https://vitejs.dev/)
- **Backend:** [Express.js](https://expressjs.com/) y [Mongoose](https://mongoosejs.com/)
- **Bases de Datos:** [MongoDB](https://www.mongodb.com/) y [MySQL/MariaDB](https://mariadb.org/)
- **CMS:** [WordPress](https://wordpress.org/)
- **Lenguajes:** JavaScript (Node.js y React) y PHP


