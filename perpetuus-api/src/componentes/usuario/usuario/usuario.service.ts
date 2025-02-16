import { hashSync as bcrypt_hashsync } from 'bcryptjs';

import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module);

import {
    CONTRASENA_SUPER_ADMIN_TEMPORAL,
    CORREO_SUPER_ADMIN_TEMPORAL,
    NOMBRE_ROL_SUPER_ADMIN,
    NOMBRE_USUARIO_SUPER_ADMIN,
} from '../../../utils/constantes.utils';

import {
    Usuario,
    UsuarioInput,
    UsuarioDocument,
} from '../usuario/usuario.model';
import { Rol } from '../rol-usuario/rol-usuario.model';
import { AUTH_SECRET } from '../../../config/env/env.config';
import { Paginacion } from '../../../tipos-personalizados';
import { generar_criterios_sort } from '../../../utils/busqueda-paginacion.utiles';

// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los usuario
// (o-----------------------------------------------------------\/-----o)

async function crear_usuario(
    nombres: string,
    apellidos: string,
    nombre_usuario: string,
    contrasena: string,
    correo: string,
    numero_celular?: string,
) {
    if (nombre_usuario === NOMBRE_USUARIO_SUPER_ADMIN) {
        throw 'Esta prohibido usar ese nombre de usuario';
    }
    const contrasena_encriptada = bcrypt_hashsync(contrasena, 12);
    const usuario_input: UsuarioInput = {
        nombres,
        apellidos,
        nombre_usuario,
        contrasena: contrasena_encriptada,
        correo,
        numero_celular,
    };
    syslog.debug(
        `USUARIO INPUT: ${JSON.stringify(usuario_input, undefined, 2)}`,
    );
    let nuevo_usuario = new Usuario(usuario_input);
    syslog.debug(`USUARIO CREADO: ${nuevo_usuario}`);
    await Usuario.create(nuevo_usuario);
}

async function obtener_usuarios_todo(paginacion: Paginacion) {
    const { CRITERIOS_SORT, PROJECTION } = generar_criterios_sort(
        paginacion,
        false,
    );
    const DESDE = Number(paginacion.desde);
    const LIMITE = Number(paginacion.limite);
    let query_filtros = {};
    let total = await Usuario.countDocuments(query_filtros);
    const resultado = await Usuario.find(query_filtros, PROJECTION)
        .sort(CRITERIOS_SORT)
        .skip(DESDE)
        .limit(LIMITE)
        .select('-__v -contrasena -rfrsh_tkn_validity -rfrsh_tkn')
        .lean();
    return { resultado, total };
}

async function obtener_usuario_id(id: string) {
    syslog.debug(`ID USUARIO: ${id}`);
    const usuario = await Usuario.findById(id).select(
        '-__v -contrasena -rfrsh_tkn_validity -rfrsh_tkn',
    );
    syslog.debug(`USUARIO OBTENIDO POR ID ${usuario}`);
    return usuario;
}

// async function obtener_usuario_termino(termino: string) {
//     syslog.debug(`TERMINO DE BÚSQUEDA: ${termino}`);
//     const usuario = await Usuario
//         .find({ $text: { $search: termino }})
//         .select('-__v -contrasena -rfrsh_tkn_validity -rfrsh_tkn');
//     syslog.debug(`USUARIO OBTENIDO POR TÉRMINO ${usuario}`);
//     return usuario;
// }

async function modificar_usuario(
    id: string,
    nombres: string,
    apellidos: string,
    correo?: string,
    numero_celular?: string,
) {
    syslog.debug(`ID USUARIO: ${id}`);
    const rol = await Usuario.findOneAndUpdate(
        { _id: id },
        {
            nombres,
            apellidos,
            correo,
            numero_celular,
        },
    );
    syslog.debug(`USUARIO MODIFICADO: `, JSON.stringify(rol));
}

async function eliminar_usuario_id(
    id: string,
    usuario_comprobar: UsuarioDocument,
) {
    syslog.debug(`ID ROL: ${id}`);
    await Usuario.findOneAndDelete({ _id: id });
    syslog.warning(`ROL ELIMINADO: `, usuario_comprobar?.nombre_usuario);
}

// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)

async function cambiar_rol_a_usuario(_id: string, rol: string) {
    await Usuario.findOneAndUpdate({ _id }, { $set: { rol } });
}

async function quitar_rol_a_usuario(_id: string) {
    await Usuario.findOneAndUpdate({ _id }, { $unset: { rol: true } });
}

async function crear_usuario_super_admin() {
    const rol_super_admin = await Rol.findOne({ super_admin: true }).lean();
    const no_existe_rol_super_admin = !rol_super_admin;
    if (no_existe_rol_super_admin) {
        throw `No existe el rol ${NOMBRE_ROL_SUPER_ADMIN}`;
    }
    const usuario_super_admin = await Usuario.find({
        nombre_usuario: NOMBRE_USUARIO_SUPER_ADMIN,
    });
    let ya_existe_usuario_super_admin = usuario_super_admin.length > 0;
    if (ya_existe_usuario_super_admin) {
        throw `Ya existe el usuario ${NOMBRE_USUARIO_SUPER_ADMIN}`;
    }

    const rol_a_usar = rol_super_admin;
    const nombre = NOMBRE_USUARIO_SUPER_ADMIN.split(' ')[0];
    const apellido = NOMBRE_USUARIO_SUPER_ADMIN.split(' ')[1];
    const contrasena_encriptada = bcrypt_hashsync(
        CONTRASENA_SUPER_ADMIN_TEMPORAL,
        12,
    );
    const usuario_input: UsuarioInput = {
        nombres: nombre,
        apellidos: apellido,
        nombre_usuario: NOMBRE_USUARIO_SUPER_ADMIN,
        contrasena: contrasena_encriptada,
        correo: CORREO_SUPER_ADMIN_TEMPORAL,
        rol: rol_a_usar._id,
    };
    await Usuario.create(usuario_input);
}

const servicio_usuario = {
    crear_usuario,
    obtener_usuarios_todo,
    obtener_usuario_id,
    // obtener_usuario_termino,
    modificar_usuario,
    eliminar_usuario_id,

    cambiar_rol_a_usuario,
    quitar_rol_a_usuario,
    crear_usuario_super_admin,
};

export { servicio_usuario };
