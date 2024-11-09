# instalando debian bulleyes viene con apache y php, quizas las librerias de abajo no son necesarias
FROM debian:bulleyes-slim

# extensiones necesarias para ejecutar WordPress y plugins
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli opcache

# Copia todos los archivos del proyecto en el directorio del servidor
# va en la entrega final
COPY . /var/www/html

# Establece los permisos correctos para los archivos de WordPress
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Habilita mod_rewrite para Apache
RUN a2enmod rewrite

# Configuración de Apache para permitir .htaccess
# es mas optimo con sid 
RUN echo "<Directory /var/www/html>\n\
    AllowOverride All\n\
    </Directory>" > /etc/apache2/conf-available/override.conf \
    && a2enconf override

# Expone el puerto 80
EXPOSE 80

# Inicia Apache
# puede que no funcione en la entrega final
CMD ["apache2-foreground"]
