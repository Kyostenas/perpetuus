# Hacer la imgane en base a ubuntu
FROM ubuntu:24.04

LABEL maintainer="Kyostenas <kyostenas@gmail.com>"

# Forzar a que el bash de este dockerfile pase a ser una 
# "bash login shell". Esto significa que cada "RUN", "CMD" y
# "ENTRYPOINT" subsequente se ejecutara en el usuario actual
# y hara "source" al ~/.basrc automaticamente cuando se ejecutan
# en modo shell (sin arrays)
# Ver: https://stackoverflow.com/a/60137919/13132076
SHELL ["/bin/bash", "--login", "-i", "-c"]

# Especificar la versión de NODE
ENV NODE_VERSION 20.16.0
# Configurar el nivel de logs de npm
ENV NPM_CONFIG_LOGLEVEL warn

# Agregar configuracion para NGINX en la carpeta de sites-avialable
COPY ./utilidades/nginx/perpetuus.mx /etc/nginx/sites-avialable/perpetuus.mx
# Copiar los archivos compilados del frontend a la carpeta html
# de NGINX para servir la aplicacion (de la GUI)
COPY ./perpetuus-gui/dist/perpetuus-gui/ /var/www/html
# Copiar el archivo de configuracion de PM2 para el backend
COPY ./utilidades/pm2/ecosystem.config.js /pm2-config
# Agregar un entrypoint (como una script de shell) en el directorio al
# que se acaba de establecer (paso anterior)
COPY ./utilidades/docker/docker-entrypoint.sh /entry-point
# Copiar todos los archivos del backend al directorio que tenemos
# como "workdir" (directorio de trabajo)
COPY ./perpetuus-api /usr/src/perpetuus-api



# Instalacion de crontab
RUN apt update -y && \
    apt install rsyslog -y && \
    rsyslogd

# Instalacion de CURL
RUN apt install curl -y

# Instalacion de NGINX
RUN apt install -y software-properties-common && \
    apt install nginx -y

# Instalacion de certbot usando python (se instala previamente
# python3 y python3-venv asi como todo lo que requieren)
RUN apt install python3 python3-venv libaugeas0 -y && \
    apt install python3-certbot-nginx -y && \
    apt install python3-venv python3-pip libaugeas0 -y && \
    python3 -m venv /opt/certbot/ && \
    /opt/certbot/bin/pip install --upgrade pip && \
    /opt/certbot/bin/pip install certbot

# Quitar el modo daemon
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
    chown -R www-data:www-data /var/lib/nginx

# Crear links simbolicos para dichas configuraciones en la
# carpeta de sites-enabled
RUN ln -s /etc/nginx/sites-avialable/perpetuus.mx /etc/nginx/sites-enabled/perpetuus

# OBTENER UNA VERSION ESPECIFICA DE NODE USANDO NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash && \
    nvm install $NODE_VERSION

# Instalar dependencias de npm en backend
RUN cd /usr/src/perpetuus-api && \
    npm ci --omit=dev

# Instalar pm2 globalmente en la imagen, instalar typescript
RUN npm install pm2@latest --global && \
    npm install -g typescript ts-node && \
    pm2 install typescript



# Hacer que se ejecute cuando la imagen se despliega
CMD ["/entry-point/docker-entrypoint.sh"]