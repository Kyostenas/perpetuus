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

# Forzar a que el bash de este dockerfile pase a ser una 
# "bash login shell". Esto significa que cada "RUN", "CMD" y
# "ENTRYPOINT" subsequente se ejecutara en el usuario actual
# y hara "source" al ~/.basrc automaticamente, solo si se
# ejecutan en forma shell.
# Ver: https://stackoverflow.com/a/57344191/13132076
SHELL ["/bin/bash", "--login", "-c"]

# OBTENER UNA VERSION ESPECIFICA DE NODE
# Instalar nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# Instalar node con nvm
RUN nvm install 20.16.0

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

# Exponer el puerto 9000 para conexiones
EXPOSE 9000

# Instalar pm2 globalmente en la imagen y escribir su archivo de
# configuracion
RUN npm install pm2 --global
RUN pm2 install typescript
# RUN echo 'module.exports = {\n\
#   apps : [{\n\
#     script: "/usr/src/perpetuus-api/index.ts",\n\
#     name: "PERPETUUS-APP",\n\
#     instances: "max",\n\
#     max_memory_restart: "600M",\n\
#     exec_mode: "cluster",\n\
#     env: {\n\
#     NODE_ENV: "production",\n\
#     }\n\
#   }]\n\
# };\n' \
# >> ./ecosystem.config.js
COPY ./ecosystem.config.js ./


# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                          EJECUCIONES AL USAR IMAGEN                          #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# NOTA
# Estos comando se ejecutan cuando se despliega la imagen
# con el docker compose, y sirven para que al hacerlo
# la aplicacion quede "levantada"

# Ejecutar el backend
CMD ts-node --transpile-only ./perpetuus-api/src/index.ts
CMD pm2 start ecosystem.config.js


# ---------------------------------------------------------------------------- #