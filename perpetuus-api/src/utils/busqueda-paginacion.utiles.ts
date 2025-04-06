import { Request } from 'express';

export function obtener_paginacion(request: Request): Paginacion {
    if (!!request.query['paginacion']) {
        return JSON.parse(<string>request.query['paginacion']) as Paginacion;
    } else {
        const PAGINACION: Paginacion = {
            campos_ordenamiento: {},
            desde: 0,
            limite: 5,
            pagina_actual: 0,
            total_de_paginas: 0,
            total_elementos: 0,
        };
        return PAGINACION;
    }
}

export function generar_criterios_sort(
    paginacion: Paginacion,
    es_busqueda_texto: boolean,
) {
    const CRITERIOS_SORT: { [type: string]: any } = {};
    const PROJECTION: { [type: string]: any } = {};

    for (let [nombre_campo, especificacion] of Object.entries(
        paginacion.campos_ordenamiento,
    )) {
        CRITERIOS_SORT[nombre_campo] = especificacion.orden;
    }
    if (es_busqueda_texto) {
        CRITERIOS_SORT.score = { $meta: 'textScore' };
        PROJECTION.score = { $meta: 'textScore' };
    }

    return { CRITERIOS_SORT, PROJECTION };
}
