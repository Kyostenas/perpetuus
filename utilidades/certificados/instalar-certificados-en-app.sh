#!/bin/bash

# Llamar el comando de certbot en el contenedor (ya debe haberse
# ejeutado el docker compose up)
    # --webroot 
        # Usar el plugin de webroot para que en ese lugar se 
        # guarden los certificados
    # --webroot-path=/var/www/html 
        # Definir el directorio que se considera el webroot
    # --email kyostenas@gmail.com 
        # Especificar un email para el registro y recuperacion de los
        # certificados. 
    # --no-eff-email 
        # No se quiere compartir el email con la Electronic Frontier
        # Foundation (EFF)
    # --agree-tos 
        # Estar de acuerdo con el acuerdo de subscripcion de ACME
    # --force-renewal 
        # Especificar el dominio que se quiere certificar
    # -d perpetuus.mx
        # Especificar el dominio que se quiere certificar
docker-exec -t app_perpetuus certbot certonly \
    --webroot \
    --webroot-path=/var/www/html \
    --email kyostenas@gmail.com \
    --no-eff-email \
    --agree-tos \
    --force-renewal \
    -d perpetuus.mx

echo "==> certificados generados"
echo "==> FIN SCRIPT