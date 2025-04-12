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

/**
 * Este es un tipo dinamico que permite extrar todas las llaves
 * (incluso anidadas) de un objeto y convertirlos en un solo
 * tipo.
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
 * Y si se quiere obtener un tipo de todas sus llaves, se hace
 * esto:
 * ```
 * export type TIPOS_OBJETO =
 *      ValoreAnidadosRecursivosDeObjeto<typeof OBJETO>
 * ```
 *
 * Que es equivalente a hacer:
 * ```
 * export type TIPOS_OBJETO = 'a' | 'b' | 'c.d'
 * ```
 *
 * La diferencia es que esto funciona dinamicamente y el tipado
 * es seguro, por lo que si permite el autocompletado.
 */
export type DeepKeys<OBJECT> = OBJECT extends any[] 
    ? never
    : OBJECT extends object
    ? {
        [KEY in keyof OBJECT]: KEY extends string
            ? OBJECT[KEY] extends (...args: any[]) => any
                ? never
                : Exclude<OBJECT[KEY], undefined> extends object
                ? `${KEY}` | `${KEY}.${DeepKeys<Exclude<OBJECT[KEY], undefined>>}`
                : `${KEY}`
            : never;
    }[keyof OBJECT]
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
