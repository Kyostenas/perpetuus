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
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf















# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                                    BACKEND                                   #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# Forzar a que el bash de este dockerfile pase a ser una 
# "bash login shell". Esto significa que cada "RUN", "CMD" y
# "ENTRYPOINT" subsequente se ejecutara en el usuario actual
# y hara "source" al ~/.basrc automaticamente
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

# Instalar pm2 globalmente en la imagen, instalar typescript
# y copiar su archivo de configuracion
RUN npm install pm2@latest --global
RUN npm install -g typescript ts-node
RUN pm2 install typescript
COPY ./ecosystem.config.js ./















# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #
#                          EJECUCIONES AL USAR IMAGEN                          #
# :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: #

# NOTA
# Estos comando se ejecutan cuando se despliega la imagen
# con el docker compose, y sirven para que al hacerlo
# la aplicacion quede "levantada"

# Ejecutar el backend
CMD pm2-runtime start ecosystem.config.js















# ---------------------------------------------------------------------------- #