import { Request, Response } from 'express';
import { Rol } from '../rol-usuario/rol-usuario.model';
import { Resp } from '../../../utils/response.utils';
import { syslog as _syslog } from '../../../utils/logs.utils';
import { servicio_rol } from './rol-usuario.service';
const syslog = _syslog(module)



// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los roles
// (o-----------------------------------------------------------\/-----o)

async function crear_rol(req: Request, res: Response) {
    const { descripcion, nombre, permisos } = req.body;
    if (!nombre || !descripcion) {
        return new Resp(
            res, __filename, 
            { mensaje: 'Se require el nombre del rol' }
        )._422_unprocessable();
    }
    try {
        const nuevo_rol = await servicio_rol
            .crear_rol(nombre, descripcion, permisos)
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Rol creado', 
                datos: nuevo_rol 
            }
        )._201_created();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al crear', 
                error: err 
            }
        )._422_unprocessable();
    }
}

async function obtener_roles_todo(req: Request, res: Response) {
    try {
        const roles = await servicio_rol
            .obtener_roles_todo()
        return new Resp(
            res, __filename,
            {
                mensaje: 'Se obtuvieron todos los roles',
                datos: roles,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener todos los roles', 
                error: err 
            }
        )._422_unprocessable();
    }
}

async function obtener_rol_id(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const rol = await servicio_rol.obtener_rol_id(id)
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol obtenido usando un id',
                datos: rol,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener un rol por id', 
                error: err 
            }
        )._422_unprocessable();        
    }
}

async function obtener_rol_termino(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const rol = await servicio_rol.obtener_rol_termino(id)
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se encontró un rol relacionado a ese término', 
                }
            )._404_not_found();
        }
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol obtenido usando un termino',
                datos: rol,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener un rol por término', 
                error: err 
            }
        )._422_unprocessable();        
    }
}

async function modificar_rol(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const cuerpo = req.body
        const rol = await Rol.findById(id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        if (!cuerpo) {
            return new Resp(
                res, __filename,
                {
                    mensaje: 'Se requiren datos para modificar el rol'
                }
            )._422_unprocessable()
        }
        syslog.log(`ANTES: ${rol}`)        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener un rol por id', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function eliminar_rol_id(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const rol = await servicio_rol.eliminar_rol_id(id)
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol eliminado usando un id',
                datos: rol,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al eliminar un rol por id', 
                error: err 
            }
        )._422_unprocessable();        
    }
}


// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)


const ruta_rol = { 
    crear_rol, 
    obtener_roles_todo,
    obtener_rol_id,
    obtener_rol_termino,
    modificar_rol,
    eliminar_rol_id,
};


export { ruta_rol }
