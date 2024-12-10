# Tesis Módulo Web FACE 🏫

Aplicación web desarrollada para la Facultad de Ciencias Empresariales (FACE) de la Universidad del Bío-Bío, que permite gestionar avisos clasificados y promover actividades grupales de manera eficiente.

---

## Características Principales

- **Gestión de Avisos Clasificados**: Publicación y gestión de avisos relacionados con compra/venta de artículos y servicios.
- **Promoción de Actividades Grupales**: Detalles y horarios de actividades organizadas dentro de la universidad.

---


## Tecnologías Utilizadas

**Lenguajes**
-JavaScript: Usado en el backend y frontend.
-PHP v7.4: Utilizado en el entorno WordPress.

**Frameworks y Librerías**
*Frontend:**
-React.js (v18.2.0): Biblioteca para construir interfaces dinámicas.
-Vite.js: Herramienta de desarrollo para aplicaciones rápidas.

*Backend:**
-Express.js (v4.18.2): Framework para crear APIs RESTful.
-Mongoose (v7.5.2): ORM para interactuar con MongoDB.
-WordPress (v6.6.2): CMS para la gestión de contenido.

**Bases de Datos**
-MongoDB (v8.0.3): Base de datos NoSQL.
-MySQL/MariaDB (v10.5): Base de datos relacional para WordPress.

> ⚠️ **Nota**: Usar estas versiones garantiza la compatibilidad y estabilidad del proyecto.

---

Requisitos Previos
Sistema Operativo Recomendado
El entorno recomendado es Ubuntu Bullseye 11. Puedes instalarlo en un entorno físico, virtual o Docker.

Dependencias Necesarias

1. Instalar Git
Ejecuta el siguiente comando:

```bash
sudo apt-get install git
```


2. Instalar Docker y Docker Compose
Ejecuta los siguientes comandos para instalar Docker:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian bullseye stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-compose-plugin
```
Instalación
1. Clonar el repositorio
Ejecuta el siguiente comando:

```bash
git clone https://github.com/fschonffeldt/Tesis-Modulo-webFACE.git
cd Tesis-Modulo-webFACE
```
2. Configurar las variables de entorno
Configuración del backend:

```bash
cd backend/src/config
cp .env.example .env
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

Ejecución
Con Docker
Ejecuta el siguiente comando desde la raíz del proyecto:

```bash
#docker-compose up --build
```

Accede a las siguientes URLs:

Frontend: http://localhost:5173
Backend: http://localhost:3000

