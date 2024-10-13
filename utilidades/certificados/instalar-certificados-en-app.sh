#!/bin/bash

# Llamar el comando de certbot en el contenedor (ya debe haberse
# ejeutado el docker compose up)
docker-exec -t app_perpetuus certbot certonly \
    # Usar el plugin de webroot para que en ese lugar se 
    # guarden los certificados
    --webroot \
    # Definir el directorio que se considera el webroot
    --webroot-path=/var/www/html \
    # Especificar un email para el registro y recuperacion de los
    # certificados. 
    --email kyostenas@gmail.com \
    # No se quiere compartir el email con la Electronic Frontier
    # Foundation (EFF)
    --no-eff-email \
    # Estar de acuerdo con el acuerdo de subscripcion de ACME
    --agree-tos \
    # Indicarle a certbot que se quiere solicitar un nuevo certificado
    # con el mismo dominio en caso de que ya exista uno (generado
    # previamente)
    --force-renewal \
    # Especificar el dominio que se quiere certificar
    -d perpetuus.mx

echo "==> certificados generados"
echo "==> FIN SCRIPT