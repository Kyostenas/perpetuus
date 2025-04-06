/**
 * Este es un tipo dinamico que permite extrar todos los valores
 * (incluso anidados) de un objeto y convertirlos en un solo
 * tipo. El objeto que se use se debe definir asi:
 * ```
 * const OBJETO = {
 *      a: 'valor1',
 *      b: 'valor2',
 *      c: {
 *          d: 'valor3'
 *      },
 * } as const;
 * ```
 *
 * Y si se quiere obtener un tipo de todos sus valores, se hace
 * esto:
 * ```
 * export type TIPOS_OBJETO =
 *      ValoreAnidadosRecursivosDeObjeto<typeof OBJETO, string>
 * ```
 *
 * Que es equivalente a hacer:
 * ```
 * export type TIPOS_OBJETO = 'valor1' | 'valor2' | 'valor3'
 * ```
 *
 * La diferencia es que esto funciona dinamicamente y el tipado
 * es seguro, por lo que si permite el autocompletado.
 */
export type ValoresAnidadosRecursivosDeObjeto<T, tipo_valor> = T extends object
    ? T[keyof T] extends infer V
        ? V extends tipo_valor
            ? V
            : ValoresAnidadosRecursivosDeObjeto<V, tipo_valor>
        : never
    : never;

export type Paginacion = {
    limite: number;
    desde: number;
    pagina_actual: number;
    total_de_paginas: number;
    total_elementos: number;
    campos_ordenamiento: {
        [type: string]: {
            campo: string;
            titulo: string;
            orden: 1 | -1;
        };
    };
};
