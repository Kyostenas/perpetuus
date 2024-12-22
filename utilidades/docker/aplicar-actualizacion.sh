#!/bin/bash

echo " ======================== ACTUALIZANDO PERPETUUS ======================== "

echo " ===> limpiando crontab"
crontab -r

echo " ----------------------------- (deteniendo y limpiando docker compose) "
docker compose stop
echo " ===> docker compose se ha detenido"

mapfile -t containers < <( docker ps -aq --filter=name='app_perpetuus' )
if (( ${#containers[@]} < 1 )) 
    then
        echo " ===> contenedores no encontrados"
    else
        echo " ===> eliminando conenedores"
        docker rm -f ${containers[@]}
fi

mapfile -t imgs < <( docker images -aq --filter=reference='kyostenas/perpetuus:latest' )
if (( ${#imgs[@]} < 1 )) 
    then
        echo " ===> imagenes no encontradas"
    else
        echo " ===> eliminando imagenes"
        docker rmi -f ${imgs[@]}
fi

echo " ----------------------------- (levantando servicios) "
# echo " ===> levantando solo el servicio de mongo de docker (base de datos)"
# docker compose up db_perpetuus -d

# echo " ===> levantando servicios restantes de docker"
docker compose up -d

echo " ===> fin script"

echo " ----------------------------- (ejecutando PM2 (API)) "
docker exec -t app_perpetuus pm2 start /usr/src/perpetuus-api/ecosystem.config.js

echo " ----------------------------- (agregando crontab para renovar certificados de letsencrypt) "
docker exec -t app_perpetuus echo "0 23 * * * certbot renew --dry-run" | crontab -

echo " =========================== ACTUALIZACION COMPLETADA ============================ "