# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                                   FRONTEND                                   #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# Obtener la ultima version de NGINX
FROM nginx:latest

# Copiar los archivos compilados del frontend a la carpeta html
# de NGINX para servir la aplicacion (de la GUI)
COPY ./perpetuus-gui/dist/perpetuus-gui/ /usr/share/nginx/html/

# Copiar el archivo de configuracion de NGINX y hacer que reemplaze
# la configuracion por defecto en la imagen
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                                    BACKEND                                   #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# OBTENER UNA VERSION ESPECIFICA DE NODE
# Instalar nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# Instalar node con nvm
RUN nvm install 20.16.0

# Trabajar sobre el directorio donde se va a guardar el codigo para
# ejecutar con node
WORKDIR /usr/src/perpetuus/api

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

# Exponer el puerto 9000 para conexiones
EXPOSE 9000

# Ejecutar la aplicacion (del API)
RUN node index.js

# Instalar pm2 globalmente en la imagen y escribir su archivo de
# configuracion
RUN npm install pm2 --global
RUN echo 'module.exports = {\n\
  apps : [{\n\
    script: "/usr/src/tickets-api/index.js",\n\
    name: "TICKETS-API",\n\
    instances: "max",\n\
    max_memory_restart: "600M",\n\
    exec_mode: "cluster",\n\
    env: {\n\
    NODE_ENV: "production",\n\
    }\n\
  }]\n\
};\n' \
>> ./ecosystem.config.js

RUN pm2-suntime start ecosystem.config.js

# ---------------------------------------------------------------------------- #