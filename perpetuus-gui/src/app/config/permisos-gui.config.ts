import { ValoresAnidadosRecursivosDeObjeto } from '../utiles/tipos-personalizados';

export const PERMISOS_DISPONIBLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    _ADMIN: 'MENU.ADMIN',
    MENU: {
        _ADMIN: 'MENU.ADMIN',
        ADMIN: {
            ROL: 'MENU.ADMIN.ROLES',
            USUARIO: 'MENU.ADMIN.USUARIO',
            PARAMETROS: 'MENU.ADMIN.PARAMETROS'
        },
    },
    ROL: {
        CREAR: 'ROL.CREAR',
        OBTENER: 'ROL.OBTENER',
        MODIFICAR: 'ROL.MODIFICAR',
        ELIMINAR: 'ROL.ELIMINAR',
        PERMISO: {
            AGREGAR: 'ROL.PERMISO.AGREGAR',
            OBTENER: 'ROL.PERMISO.OBTENER',
            ELIMINAR: 'ROL.PERMISO.ELIMINAR',
        }
    },
    USUARIO: {
        CREAR: 'USUARIO.CREAR',
        OBTENER: 'USUARIO.OBTENER',
        MODIFICAR: 'USUARIO.MODIFICAR',
        ELIMINAR: 'USUARIO.ELIMINAR',
        ROL: {
            AGREGAR: 'USUARIO.ROL.AGREGAR',
            ELIMINAR: 'USUARIO.ROL.ELIMINAR',
        }
    }
} as const;

export type PERMISOS_PERPETUUS = 
    ValoresAnidadosRecursivosDeObjeto<
        typeof PERMISOS_DISPONIBLES, string
    >

export type PERMISOS_MENU_PERPETUUS = 
    ValoresAnidadosRecursivosDeObjeto<
        typeof PERMISOS_DISPONIBLES.MENU, string
    >