#!/bin/bash

echo " ============= LIIMPIANDO CONTENEDORES E IMAGENES DE DOCKER ============ "



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


echo " ============= CONTENEDORES E IMAGENES DE DOCKER LIMPADOS ============ "