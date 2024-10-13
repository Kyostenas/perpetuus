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
        echo " ===> eliminando conenedores, excepto el de mongodb"
        docker rm -f ${containers[@]}
fi

mapfile -t imgs < <( docker images -aq --filter=reference='kyostenas/perpetuus:latest' )
if (( ${#imgs[@]} < 1 )) 
    then
        echo " ===> imagenes no encontradas"
    else
        echo " ===> eliminando imagenes, excepto la de mongodb"
        docker rmi -f ${imgs[@]}
fi

echo " ----------------------------- (levantando servicios) "
# echo " ===> levantando solo el servicio de mongo de docker (base de datos)"
# docker compose up db_perpetuus -d

# echo " ===> levantando servicios restantes de docker"
docker compose up -d

echo " ===> fin script"


echo " =========================== ACTUALIZACION COMPLETADA ============================ "