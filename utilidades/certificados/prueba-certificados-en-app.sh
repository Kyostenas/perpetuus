#!/bin/bash

# Esta es una script de prueba para ver se es posible hacer la
# solicitud de certificacion de letsencrypt con certbod.
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
    # --staging 
        # Esto es para indicarle a certbod que se quiere usar el
        # entorno de staging de Let's Encrypt al obtener los certificados.
        # Esto permite que se prueben las configuraciones establecidas
        # y se eviten los limites de solicitud de dominio (hay un limite
        # de 7 solicitudes cada 20 dias)
    # -d perpetuus.mx
        # Especificar el dominio que se quiere certificar
docker exec -t app_perpetuus certbot certonly \
    --webroot \
    --webroot-path=/var/www/html \
    --email kyostenas@gmail.com \
    --no-eff-email \
    --agree-tos \
    --staging \
    -d perpetuus.mx

echo "==> Si todo esta correcto, ahora ejecutar 'instalar-certificados-en-app.sh'"
echo "==> FIN SCRIPT"