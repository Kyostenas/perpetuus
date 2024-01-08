import { Rol, RolInput, Permiso, RolDocument } from '../rol-usuario/rol-usuario.model';
import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module)

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
    return await Rol.find().sort('-creadetedAt').select('-busqueda');
}

async function obtener_rol_id(id: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findById(id).select('-busqueda');
    syslog.debug(`ROL OBTENIDO POR ID ${rol}`);
    return rol;
}

async function obtener_rol_termino(id_busqueda_entera: string) {
    syslog.debug(`ID BUSQUEDA ENTERA: ${id_busqueda_entera}`);
    const rol = await Rol.find({ busqueda: id_busqueda_entera });
    syslog.debug(`ROL OBTENIDO POR TÉRMINO ${rol}`);
    return rol;
}

async function modificar_rol(id: string, nombre: string, descripcion: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findOneAndUpdate({ _id: id }, { nombre, descripcion });
    syslog.debug(`ROL MODIFICADO: `, JSON.stringify(rol));
}

async function eliminar_rol_id(id: string) {
    syslog.debug(`ID ROL: ${id}`);

    const rol_comprobar = await Rol.findById(id)
    if (!rol_comprobar) throw 'No se puede eliminar este rol porque no existe'
    if (rol_comprobar.super_admin) throw 'No se puede eliminar este rol porque es un administrador'

    await Rol.findOneAndDelete({ _id: id })
    syslog.warning(`ROL ELIMINADO: `, rol_comprobar?.nombre);
}

// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)


const servicio_rol = { 
    crear_rol, 
    obtener_roles_todo,
    obtener_rol_id,
    obtener_rol_termino,
    modificar_rol,
    eliminar_rol_id,
};

export { servicio_rol }