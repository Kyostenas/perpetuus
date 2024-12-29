import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module)

import { Rol, RolInput, RolDocument } from '../rol-usuario/rol-usuario.model';
import { convertirArregloObjetosAObjeto } from '../../../utils/general.utils'

import { PERMISOS_DISPONIBLES } from '../../../config/roles/permisos-api.config';
import { NOMBRE_ROL_SUPER_ADMIN } from '../../../utils/constantes.utils';


// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los roles
// (o-----------------------------------------------------------\/-----o)

async function crear_rol(nombre: string, descripcion: string) {
    const rol_input: RolInput = { nombre, descripcion };
    syslog.debug(`ROL INPUT: ${JSON.stringify(rol_input, undefined, 2)}`);
    let nuevo_rol = new Rol(rol_input);
    syslog.debug(`ROL CREADO: ${nuevo_rol}`);
    await Rol.create(nuevo_rol);
}

async function obtener_roles_todo() {
    const roles = await Rol
        .find()
        .sort('-creadetedAt')
        .select('-__v');
    return roles.filter(rol => !rol.super_admin);
}

async function obtener_rol_id(id: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol
        .findById(id)
        .select('-__v');
    if (rol?.super_admin) return undefined;
    syslog.debug(`ROL OBTENIDO POR ID ${rol}`);
    return rol;
}

async function obtener_rol_termino(termino: string) {
    syslog.debug(`TERMINO DE BÚSQUEDA: ${termino}`);
    const roles = await Rol
        .find({ $text: { $search: termino }})
        .select('-__v');
    syslog.debug(`ROLES OBTENIDO POR TÉRMINO ${roles}`);
    return roles.filter(rol => !rol.super_admin);
}

async function modificar_rol(id: string, nombre: string, descripcion: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findOneAndUpdate({ _id: id }, { nombre, descripcion });
    syslog.debug(`ROL MODIFICADO: `, JSON.stringify(rol));
}

async function eliminar_rol_id(id: string, rol_comprobar: RolDocument) {
    syslog.debug(`ID ROL: ${id}`);
    await Rol.findOneAndDelete({ _id: id })
    syslog.warning(`ROL ELIMINADO: `, rol_comprobar?.nombre);
}

// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)



// (o==================================================================o)
//   ACCIONES EXTRA (INICIO)
//   cualquier otra cosa que no caiga en el CRUD convencional
// (o-----------------------------------------------------------\/-----o)

function mensaje_permiso_ya_existe(permiso: string) {
    return `Permiso "${permiso}" ya existe`;
}

function mensaje_permiso_no_existe(permiso: string) {
    return `Permiso "${permiso}" no existe`;
}


async function crear_permisos_en_rol_id(permisos_nuevos: string[], rol: RolDocument): Promise<{
    mensaje_res: string;
    advertencias: string[] | undefined;
}> {
    let creados = 0;
    let existentes = 0;
    let advertencia_pedazos = [];   
    let permisos_existentes = rol.permisos;
    let permisos_para_agregar = [];
    let nombres_existentes: String[] = [];
    if (permisos_existentes) {
        nombres_existentes = permisos_existentes.map(un_perm => un_perm);
    }
    for (let i_perm = 0; i_perm < permisos_nuevos.length; i_perm++) {
        const un_permiso_nuevo = permisos_nuevos[i_perm];
        if (nombres_existentes.includes(un_permiso_nuevo)) {
            existentes += 1;
            let advertencia = mensaje_permiso_ya_existe(un_permiso_nuevo);
            syslog.warning(advertencia);
            advertencia_pedazos.push(advertencia);
        } else {
            permisos_para_agregar.push(un_permiso_nuevo);
            creados += 1;
        }
    }
    if (creados > 0) {
        let permisos_totales = [
            ...(rol.permisos? rol.permisos : []),
            ...permisos_para_agregar
        ];
        await Rol.findByIdAndUpdate(rol._id, { permisos: permisos_totales });
    }
    let advertencias!: string[]
    if (advertencia_pedazos) {
        if (advertencia_pedazos.length > 0) {
            advertencias = advertencia_pedazos
        }
    }
    return {
        mensaje_res: `${creados} Permisos creados. ${existentes} Ya existen.`,
        advertencias
    }
}

async function eliminar_permisos_en_rol_id(permisos_a_eliminar: string[], rol: RolDocument): Promise<{
    mensaje_res: string;
    advertencias: string[] | undefined;
}> {
    let eliminados = 0;
    let conservados = 0;
    let advertencia_pedazos = [];   
    let permisos_existentes = rol.permisos;
    let nombres_existentes: String[] = [];
    if (permisos_existentes) {
        let permisos_para_conservar = permisos_existentes
        nombres_existentes = permisos_existentes.map(un_perm => un_perm);
        conservados = nombres_existentes.length
        for (let i_perm = 0; i_perm < permisos_a_eliminar.length; i_perm++) {
            const un_permiso_a_eliminar = permisos_a_eliminar[i_perm];
            if (nombres_existentes.includes(un_permiso_a_eliminar)) {
                conservados -= 1;
                eliminados += 1;
                permisos_para_conservar.filter(permiso => permiso !== un_permiso_a_eliminar)
            } else {
                let advertencia = mensaje_permiso_no_existe(un_permiso_a_eliminar);
                syslog.warning(advertencia);
                advertencia_pedazos.push(advertencia);
            }
        }
        if (eliminados > 0) {
            let permisos_totales = Object.values(permisos_para_conservar)
            await Rol.findByIdAndUpdate(rol._id, { permisos: permisos_totales });
        }
    }
    let advertencias!: string[]
    if (advertencia_pedazos) {
        if (advertencia_pedazos.length > 0) {
            advertencias = advertencia_pedazos
        }
    }
    return {
        mensaje_res: `${eliminados} Permisos eliminados. ${conservados} Se conservaron.`,
        advertencias
    }
}

async function crear_rol_super_admin() {
    let rol_super_admin = await Rol.find({ super_admin: true });
    let ya_existe = rol_super_admin.length > 0;
    if (ya_existe) throw `Ya existe el rol ${NOMBRE_ROL_SUPER_ADMIN}`;

    let rol_input: RolInput = {
        nombre: NOMBRE_ROL_SUPER_ADMIN,
        super_admin: true,
        descripcion: 'Este rol tiene acceso a todas las rutas'
            .concat(' con sus capacidades y sub-capacidades.'),
    };
    await Rol.create(rol_input);
}

async function obtener_permisos_disponibles() {
    return PERMISOS_DISPONIBLES
}

// (o-----------------------------------------------------------/\-----o)
//   ACCIONES EXTRA (FIN)
// (o==================================================================o)


const servicio_rol = { 
    crear_rol, 
    obtener_roles_todo,
    obtener_rol_id,
    obtener_rol_termino,
    modificar_rol,
    eliminar_rol_id,

    crear_permisos_en_rol_id,
    obtener_permisos_disponibles,
    eliminar_permisos_en_rol_id,
    crear_rol_super_admin,    
};

export { servicio_rol }