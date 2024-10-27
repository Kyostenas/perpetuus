#!/bin/bash

# ENTRYPOINT PARA EL CONTENEDOR DE LA APP DE PERPETUUS
# Esta script se va a ejecutar siempre que se instancie un contenedor
# de la aplicacion de perpetuus (solo cuando se crea).
# Se indica en la ultima linea del Dockerfile con el comando 
# "ENTRYPOINT"

# Agregar una linea al crontab del contenedor para que se renueve el
# certificado de letsencrypt. Se debe correr todos los dias a las
# 11:00 p. m.
echo "==> agregando crontab para renovar certificados de letsencrypt"
echo "0 23 * * * certbot renew --dry-run" | crontab -

# Ejecutar pm2 dentro de la imagen
echo "==> arrancando PM2"
pm2 start /pm2-config/ecosystem.config.js

# Iniciar nginx dentro de la imagen
echo "==> arrancando el servidor NGINX"
nginx

echo "==> fin del entry point"

# echo "==> solo se debe ejecutar 1 vez"

/bin/bash