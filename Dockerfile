# Hacer la imgane en base a ubuntu
FROM ubuntu:18.04

MAINTAINER Kyostenas (kyostenas@gmail.com)

# Instalacion de NGINX
RUN apt update -y
RUN apt install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt update -y
RUN apt install -y nginx

# Instalacion de certbot
RUN add-apt-repository ppa:certbot/certbot
RUN apt update -y
RUN apt install -y certbot python-certbot-nginx

# Quitar el modo daemon
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

# Agregar configuracion para NGINX en la carpeta de sites-avialable
ADD ./utilidades/nginx/perpetuus.mx /etc/nginx/sites-avialable/perpetuus.mx

# Crear links simbolicos para dichas configuraciones en la
# carpeta de sites-enabled
RUN ln -s /etc/nginx/sites-avialable/perpetuus.mx /etc/nginx/sites-enabled/perpetuus

# Cambiar la ruta actual de trabajo (aqui se va a quedar cuando el
# contenedor se genere tambien)
WORKDIR /etc/nginx

# Agregar un entrypoint (como una script de shell) en el directorio al
# que se acaba de establecer (paso anterior)
ADD ./utilidades/docker/docker-entrypoint.sh .

# Hacer que se ejecute cuando la imagen se despliega
ENTRYPOINT ["/etc/nginx/docker-entrypoint.sh"]

















# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                                   FRONTEND                                   #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# # Obtener la ultima version de NGINX
# # FROM nginx:latest

# # Copiar los archivos compilados del frontend a la carpeta html
# # de NGINX para servir la aplicacion (de la GUI)
# COPY ./perpetuus-gui/dist/perpetuus-gui/ /usr/share/nginx/html/

# # Copiar el archivo de configuracion de NGINX y hacer que reemplaze
# # la configuracion por defecto en la imagen
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# # COPY ./nginx.conf /etc/nginx/nginx.conf

# # :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
# #                                    BACKEND                                   #
# # :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# # Forzar a que el bash de este dockerfile pase a ser una 
# # "bash login shell". Esto significa que cada "RUN", "CMD" y
# # "ENTRYPOINT" subsequente se ejecutara en el usuario actual
# # y hara "source" al ~/.basrc automaticamente
# # Ver: https://stackoverflow.com/a/57344191/13132076
# SHELL ["/bin/bash", "--login", "-c"]

# # OBTENER UNA VERSION ESPECIFICA DE NODE
# # Instalar nvm
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# # Instalar node con nvm
# RUN nvm install 20.16.0

# # Trabajar sobre el directorio donde se va a guardar el codigo para
# # ejecutar con node
# WORKDIR /usr/src/perpetuus-api

# # Copiar el package.json y el package-lock.json para instalar todas
# # las librerias que no sean de desarrollo (el comando ci ejecuta una
# # instalacion limpia, usando el package-lock.json)
# COPY ./perpetuus-api/package*.json ./
# # Configurar el nivel de logs de npm
# ENV NPM_CONFIG_LOGLEVEL warn
# RUN npm ci --omit=dev

# # Copiar todosl los archivos del backend al directorio que tenemos
# # como "workdir" (directorio de trabajo)
# COPY ./perpetuus-api .

# # Exponer el puerto 9000 para conexiones
# EXPOSE 9000

# # Instalar pm2 globalmente en la imagen, instalar typescript
# # y copiar su archivo de configuracion
# RUN npm install pm2@latest --global
# RUN npm install -g typescript ts-node
# RUN pm2 install typescript
# COPY ./ecosystem.config.js ./

# # :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
# #                          EJECUCIONES AL USAR IMAGEN                          #
# # :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# # NOTA
# # Estos comando se ejecutan cuando se despliega la imagen
# # con el docker compose, y sirven para que al hacerlo
# # la aplicacion quede "levantada"


# # Instalar certificados
# CMD certbot certonly --standalone -d perpetuus.mx -n --agree-tos -m kyostenas@gmail.com --work-dir /home/perpetuus/certificados
# CMD nginx -t

# # Ejecutar el backend
# CMD pm2-runtime start ecosystem.config.js

# # Ejecutar el frontend
# CMD service nginx start

# ---------------------------------------------------------------------------- #