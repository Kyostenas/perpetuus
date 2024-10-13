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
    # Esto es para indicarle a certbod que se quiere usar el
    # entorno de staging de Let's Encrypt al obtener los certificados.
    # Esto permite que se prueben las configuraciones establecidas
    # y se eviten los limites de solicitud de dominio (hay un limite
    # de 7 solicitudes cada 20 dias)
    --staging \
    # Especificar el dominio que se quiere certificar
    -d perpetuus.mx

# Mostar los certificados obtenidos para confirmar visualmente que
# todo este bien
echo "======== MOSTRANDO CERTIFICADOS PARA COMPROBAR QUE SE PUEDEN GENERAR ========"
docker-exec -t app_perpetuus certbot ls -al /etc/letsencrupt/live/perpetuus.mx
echo "============================================================================="
echo "==> Si todo esta correcto, ahora ejecutar 'instalar-certificados-en-app.sh'"
echo "==> FIN SCRIPT