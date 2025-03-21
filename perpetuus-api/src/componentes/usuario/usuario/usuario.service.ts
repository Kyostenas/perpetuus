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
    USER_MODEL,
    User,
} from '../usuario/usuario.model';
import { ROL_MODEL } from '../rol-usuario/rol-usuario.model';
import { generar_criterios_sort } from '../../../utils/busqueda-paginacion.utiles';
import { Types } from 'mongoose';

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
    user_id?: string,
) {
    if (nombre_usuario === NOMBRE_USUARIO_SUPER_ADMIN) {
        throw 'Esta prohibido usar ese nombre de usuario';
    }
    const contrasena_encriptada = bcrypt_hashsync(contrasena, 12);
    const usuario_input: User = {
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
    let nuevo_usuario = new USER_MODEL(usuario_input);
    syslog.debug(`USUARIO CREADO: ${nuevo_usuario}`);
    nuevo_usuario.metadata = {
        user_id,
        description: 'usuario creado'
    }
    await nuevo_usuario.save();
}

async function obtener_usuarios_todo(paginacion: Paginacion) {
    const { CRITERIOS_SORT, PROJECTION } = generar_criterios_sort(
        paginacion,
        false,
    );
    const DESDE = Number(paginacion.desde);
    const LIMITE = Number(paginacion.limite);
    let query_filtros = {};
    let total = await USER_MODEL.countDocuments(query_filtros);
    const resultado = await USER_MODEL.find(query_filtros, PROJECTION)
        .sort(CRITERIOS_SORT)
        .skip(DESDE)
        .limit(LIMITE)
        .select('-__v -contrasena -rfrsh_tkn_validity -rfrsh_tkn')
        .lean();
    return { resultado, total };
}

async function obtener_usuario_id(id: string) {
    syslog.debug(`ID USUARIO: ${id}`);
    const usuario = await USER_MODEL.findById(id).select(
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
    user_id?: string,
) {
    syslog.debug(`ID USUARIO: ${id}`);
    const rol = await USER_MODEL.findOneAndUpdate(
        { _id: id },
        {
            nombres,
            apellidos,
            correo,
            numero_celular,
        },
        {
            metadata: {
                user_id,
                description: 'usuario modificado'
            }
        }
    );
    syslog.debug(`USUARIO MODIFICADO: `, JSON.stringify(rol));
}

async function eliminar_usuario_id(
    id: string,
    usuario_comprobar: User,
) {
    syslog.debug(`ID ROL: ${id}`);
    await USER_MODEL.findOneAndDelete({ _id: id });
    syslog.warning(`ROL ELIMINADO: `, usuario_comprobar?.nombre_usuario);
}

// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)

async function cambiar_rol_a_usuario(_id: string, rol: string, user_id?: string) {
    const ROL = await ROL_MODEL.findOne({_id: rol}).lean()
    await USER_MODEL.findOneAndUpdate(
        { _id }, 
        { $set: { rol } },
        { metadata: {
            user_id,
            description: 'rol de usuario modificado',
            large_description: `el nuevo rol del usuario es: ${ROL?.nombre}`
        }}
    );
}

async function quitar_rol_a_usuario(_id: string, user_id?: string) {
    await USER_MODEL.findOneAndUpdate(
        { _id }, 
        { $unset: { rol: true } },
        { metadata: {
            user_id,
            description: 'rol de usuario removido'
        }}
    );
}

async function crear_usuario_super_admin() {
    const rol_super_admin = await ROL_MODEL.findOne({ super_admin: true }).lean();
    const no_existe_rol_super_admin = !rol_super_admin;
    if (no_existe_rol_super_admin) {
        throw `No existe el rol ${NOMBRE_ROL_SUPER_ADMIN}`;
    }
    const usuario_super_admin = await USER_MODEL.find({
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
    const usuario_input: User = {
        nombres: nombre,
        apellidos: apellido,
        nombre_usuario: NOMBRE_USUARIO_SUPER_ADMIN,
        contrasena: contrasena_encriptada,
        correo: CORREO_SUPER_ADMIN_TEMPORAL,
        rol: new Types.ObjectId(rol_a_usar._id.toString()),
    };
    const NEW_USER = new USER_MODEL(usuario_input)
    NEW_USER.metadata = {
        description: 'Se creó el usuario super administrador',
        large_description: 'Este usuario solo se puede crear externamente, por lo que no especifica qué usuario lo creó'
    }
    await NEW_USER.save();
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
