import { Rol, RolInput, Permiso, RolDocument } from '../rol-usuario/rol-usuario.model';
import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module)

// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los roles
// (o-----------------------------------------------------------\/-----o)

async function crear_rol(nombre: string, descripcion: string, permisos: Permiso[]) {
    const rol_input: RolInput = { nombre, descripcion, permisos };
    const rol_creado =  await Rol.create(rol_input);
    syslog.debug(`ROL CREADO: ${rol_creado}`);
    return rol_creado;
}

async function obtener_roles_todo() {
    return await Rol.find().sort('-creadetedAt');
}

async function obtener_rol_id(id: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findById(id);
    syslog.debug(`ROL OBTENIDO POR ID ${rol}`);
    return rol;
}

async function obtener_rol_termino(id_busqueda_entera: string) {
    syslog.debug(`ID BUSQUEDA ENTERA: ${id_busqueda_entera}`);
    const rol = await Rol.find({ busqueda: id_busqueda_entera });
    syslog.debug(`ROL OBTENIDO POR TÉRMINO ${rol}`);
    return rol;
}

async function modificar_rol(id: string, cuerpo: RolDocument) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findByIdAndUpdate(id, cuerpo);
    syslog.log(`ROL MODIFICADO: ${rol}`);
    // return rol;
}

async function eliminar_rol_id(id: string) {
    syslog.debug(`ID ROL: ${id}`);
    const rol = await Rol.findOneAndDelete({ _id: id })
    syslog.log(`ROL ELIMINADO: ${rol}`);
    // return rol;    
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