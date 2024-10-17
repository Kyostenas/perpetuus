# Hacer la imgane en base a ubuntu
FROM ubuntu:24.04

MAINTAINER Kyostenas (kyostenas@gmail.com)

# Instalacion de crontab
RUN apt update -y
RUN apt install rsyslog -y
RUN rsyslogd

# Instalacion de CURL
RUN apt install curl -y

# Instalacion de NGINX
RUN apt install -y software-properties-common
RUN apt install nginx -y

# Instalacion de certbot usando python (se instala previamente
# python3 y python3-venv asi como todo lo que requieren)
RUN apt install python3 python3-venv libaugeas0 -y
RUN apt install python3-certbot-nginx -y
RUN apt install python3-venv python3-pip libaugeas0 -y
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot

# Quitar el modo daemon
# RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
# RUN chown -R www-data:www-data /var/lib/nginx

# Agregar configuracion para NGINX en la carpeta de sites-avialable
ADD ./utilidades/nginx/perpetuus.mx /etc/nginx/sites-avialable/perpetuus.mx

# Crear links simbolicos para dichas configuraciones en la
# carpeta de sites-enabled
RUN ln -s /etc/nginx/sites-avialable/perpetuus.mx /etc/nginx/sites-enabled/perpetuus



# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
# INSERCION DE LOS ARCHIVOS DE LA GUI ::::::::::::::::::::::::::::::::
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
# Copiar los archivos compilados del frontend a la carpeta html
# de NGINX para servir la aplicacion (de la GUI)
COPY ./perpetuus-gui/dist/perpetuus-gui/ /var/www/html
    
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
# INSERCION DE LOS ARCHIVOS DEL API Y CONFIGURACION ::::::::::::::::::
# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

# Forzar a que el bash de este dockerfile pase a ser una 
# "bash login shell". Esto significa que cada "RUN", "CMD" y
# "ENTRYPOINT" subsequente se ejecutara en el usuario actual
# y hara "source" al ~/.basrc automaticamente cuando se ejecutan
# en modo shell (sin arrays)
# Ver: https://stackoverflow.com/a/60137919/13132076
SHELL ["/bin/bash", "--login", "-i", "-c"]

# OBTENER UNA VERSION ESPECIFICA DE NODE USANDO NVM
ENV NODE_VERSION 20.16.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# RUN nvm install $NODE_VERSION

# Trabajar sobre el directorio donde se va a guardar el codigo para
# ejecutar con node
WORKDIR /usr/src/perpetuus-api

# Copiar el package.json y el package-lock.json para instalar todas
# las librerias que no sean de desarrollo (el comando ci ejecuta una
# instalacion limpia, usando el package-lock.json)
COPY ./perpetuus-api/package*.json ./
# Configurar el nivel de logs de npm
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm ci --omit=dev

# Copiar todosl los archivos del backend al directorio que tenemos
# como "workdir" (directorio de trabajo)
COPY ./perpetuus-api .

# Instalar pm2 globalmente en la imagen, instalar typescript
# y copiar su archivo de configuracion
RUN npm install pm2@latest --global
RUN npm install -g typescript ts-node
RUN pm2 install typescript
COPY ./utilidades/pm2/ecosystem.config.js .

# ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



# Cambiar la ruta actual de trabajo (aqui se va a quedar cuando el
# contenedor se genere tambien)
WORKDIR /etc/nginx

# Agregar un entrypoint (como una script de shell) en el directorio al
# que se acaba de establecer (paso anterior)
ADD ./utilidades/docker/docker-entrypoint.sh .

# Hacer que se ejecute cuando la imagen se despliega
CMD ["/etc/nginx/docker-entrypoint.sh"]