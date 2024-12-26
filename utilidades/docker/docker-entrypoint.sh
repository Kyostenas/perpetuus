#!/bin/bash

# ENTRYPOINT PARA EL CONTENEDOR DE LA APP DE PERPETUUS
# Esta script se va a ejecutar siempre que se instancie un contenedor
# de la aplicacion de perpetuus (solo cuando se crea).
# Se indica en la ultima linea del Dockerfile con el comando 
# "ENTRYPOINT"

# Asegurarse de que la instalacion global de PM2 es accesible
echo "==> modificando el PATH"
export PATH=$PATH:/root/.nvm/versions/node/v20.16.0/bin
echo "Current PATH: $PATH"

# Agregar una linea al crontab del contenedor para que se renueve el
# certificado de letsencrypt. Se debe correr todos los dias a las
# 11:00 p. m.
echo "==> agregando crontab para renovar certificados de letsencrypt"
echo "0 23 * * * certbot renew --dry-run" | crontab -

# Ejecutar pm2 dentro de la imagen
# echo "==> arrancando PM2"
which pm2
which pm2-runtime
which nvm
sleep 15
pm2 start /usr/src/perpetuus-api/ecosystem.config.js

# Iniciar nginx dentro de la imagen
echo "==> arrancando el servidor NGINX"
nginx

echo "==> solo se debe ejecutar 1 vez"
echo "==> fin del entry point"

/bin/bash