import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module)

import { Usuario, UsuarioInput, UsuarioDocument } from '../usuario/usuario.model';
import { Rol } from '../rol-usuario/rol-usuario.model';
import { NOMBRE_ROL_SUPER_ADMIN, NOMBRE_USUARIO_SUPER_ADMIN } from '../../../utils/constantes.utils';


// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los usuario
// (o-----------------------------------------------------------\/-----o)

async function crear_usuario(
    nombres: string,
    apellidos: string,
    correo?: string,
    numero_celular?: string,
) {
    if (nombres === NOMBRE_USUARIO_SUPER_ADMIN) {
        throw 'Esta prohibido usar ese nombre'
    }
    if (apellidos === NOMBRE_USUARIO_SUPER_ADMIN) {
        throw 'Esta prohibido usar ese nombre'
    }
    const usuario_input: UsuarioInput = { 
        nombres, apellidos, correo, numero_celular
    };
    syslog.debug(`USUARIO INPUT: ${JSON.stringify(
        usuario_input, undefined, 2
    )}`);
    let nuevo_usuario = new Usuario(usuario_input);
    syslog.debug(`USUARIO CREADO: ${nuevo_usuario}`);
    await Usuario.create(nuevo_usuario);
}

async function obtener_usuarios_todo() {
    return await Usuario
        .find()
        .sort('-creadetedAt')
        .select('-__v');
}

async function obtener_usuario_id(id: string) {
    syslog.debug(`ID USUARIO: ${id}`);
    const usuario = await Usuario
        .findById(id)
        .select('-__v');
    syslog.debug(`USUARIO OBTENIDO POR ID ${usuario}`);
    return usuario;
}

async function obtener_usuario_termino(termino: string) {
    syslog.debug(`TERMINO DE BÚSQUEDA: ${termino}`);
    const usuario = await Usuario
        .find({ $text: { $search: termino }})
        .select('-__v');
    syslog.debug(`USUARIO OBTENIDO POR TÉRMINO ${usuario}`);
    return usuario;
}

async function modificar_usuario(
    id: string,
    nombres: string,
    apellidos: string,
    correo?: string,
    numero_celular?: string,
) {
    syslog.debug(`ID USUARIO: ${id}`);
    const rol = await Usuario.findOneAndUpdate({ _id: id }, { 
        nombres, apellidos, correo, numero_celular 
    });
    syslog.debug(`USUARIO MODIFICADO: `, JSON.stringify(rol));
}

async function eliminar_usuario_id(id: string, usuario_comprobar: UsuarioDocument) {
    syslog.debug(`ID ROL: ${id}`);
    await Usuario.findOneAndDelete({ _id: id });
    syslog.warning(`ROL ELIMINADO: `, usuario_comprobar?.nombres);
}

// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)


async function cambiar_rol_a_usuario(_id: string, rol: string) {
    await Usuario.findOneAndUpdate({ _id }, { $set: { rol }});
}

async function quitar_rol_a_usuario(_id: string) {
    await Usuario.findOneAndUpdate({ _id }, { $unset: { rol: true }});
}

async function crear_usuario_super_admin() {
    const rol_super_admin = await Rol.find({ super_admin: true });
    const no_existe_rol_super_admin = rol_super_admin.length === 0;
    if (no_existe_rol_super_admin) {
        throw `No existe el rol ${NOMBRE_ROL_SUPER_ADMIN}`;
    }
    const usuario_super_admin = await Usuario.find({ nombres: NOMBRE_USUARIO_SUPER_ADMIN });
    let ya_existe_usuario_super_admin = usuario_super_admin.length > 0;
    if (ya_existe_usuario_super_admin) {
        throw `Ya existe el usuario ${NOMBRE_USUARIO_SUPER_ADMIN}`;
    }

    const rol_a_usar = rol_super_admin[0];
    const usuario_input: UsuarioInput = {
        nombres: NOMBRE_USUARIO_SUPER_ADMIN,
        apellidos: NOMBRE_USUARIO_SUPER_ADMIN,
        correo: 'admin@perpetuus.mx',
        rol: rol_a_usar._id,
    };
    await Usuario.create(usuario_input);
}






const servicio_usuario = { 
    crear_usuario, 
    obtener_usuarios_todo,
    obtener_usuario_id,
    obtener_usuario_termino,
    modificar_usuario,
    eliminar_usuario_id,

    cambiar_rol_a_usuario,
    quitar_rol_a_usuario,
    crear_usuario_super_admin,
};

export { servicio_usuario }