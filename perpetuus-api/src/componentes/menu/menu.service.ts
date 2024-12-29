// import { syslog as _syslog } from '../../utils/logs.utils';
// const syslog = _syslog(module)
import { PERMISOS_DISPONIBLES, PERMISOS_MENU_PERPETUUS, PERMISOS_PERPETUUS } from '../../config/roles/permisos-api.config';
import {  UsuarioDocument } from '../usuario/usuario/usuario.model';

// (o==================================================================o)
//   #region OBTENCIOIN DE LOS MENUS (INICIO)
// (o-----------------------------------------------------------\/-----o)

/**
 * Obtener los menus que el usuario podra ver en su barra lateral,
 * basandose en sus permisos.
 * 
 * @param [id_usuario] El id del usuario que esta haciendo login
 */
function obtener_menus(usuario: UsuarioDocument) {
    let menus_enviar: DESCRIPCION_MENU[] = []
    const PERMISOS_USUARIO: PERMISOS_PERPETUUS[] = usuario?.rol?.permisos || []
    for (let iMenu = 0; iMenu < MENUS.length; iMenu++) {
        const UN_MENU = MENUS[iMenu];
        let incluir = false
        if (UN_MENU.permiso === 'LIBRE') {
            incluir = true
        } else if (PERMISOS_USUARIO.includes(UN_MENU.permiso)) {
            incluir = true
        }
        if (incluir) {
            menus_enviar.push(UN_MENU)
        }
    }
    return menus_enviar
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion OBTENCIOIN DE LOS MENUS (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region LISTA DE TODOS LOS MENUS (INICIO)
// (o-----------------------------------------------------------\/-----o)

/**
 * Todos los menus existentes. Esto se manda a la GUI para generar
 * la barra lateral, basandose en los permisos que tienen el usuario.
 */
const MENUS: DESCRIPCION_MENU[] = [
    {
        nombre: 'Dashboard',
        simbolo: 'bi bi-pie-chart',
        link: 'dashboard',
        permiso: 'LIBRE'
    },
    {
        nombre: 'Panel Administrador',
        simbolo: 'bi bi-person-gear',
        link: 'panel-administrador',
        permiso: PERMISOS_DISPONIBLES.MENU._ADMIN,
        sub_menus: [
            {
                nombre: 'Roles',
                simbolo: 'bi bi-person-lines-fill',
                link: 'roles',
                permiso: PERMISOS_DISPONIBLES.MENU.ADMIN.ROL,
            },
            {
                nombre: 'Usuarios',
                simbolo: 'bi bi-person-circle',
                link: 'usuarios',
                permiso: PERMISOS_DISPONIBLES.MENU.ADMIN.USUARIO,
            },
            {
                nombre: 'Parámetros',
                simbolo: 'bi bi-person-sliders',
                link: 'parametros',
                permiso: PERMISOS_DISPONIBLES.MENU.ADMIN.PARAMETROS,
            },
        ]
    },
]

/**
 * La composicion de la descripcion de una entrada del menu que se
 * envia a la GUI para la barra lateral.
 */

interface DESCRIPCION_MENU {
    nombre: string
    simbolo: string
    link: string
    permiso: PERMISOS_MENU_PERPETUUS | 'LIBRE'
    descripcion?: string
    sub_menus?: DESCRIPCION_MENU[]
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion LISTA DE TODOS LOS MENUS (FIN)
// (o==================================================================o)

export {
    obtener_menus,
    MENUS,
    DESCRIPCION_MENU,
}