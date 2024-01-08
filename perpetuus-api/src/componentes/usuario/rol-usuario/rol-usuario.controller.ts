import { Request, Response } from 'express';
import { syslog as _syslog } from '../../../utils/logs.utils';
const syslog = _syslog(module)

import { Rol } from '../rol-usuario/rol-usuario.model';
import { servicio_rol } from './rol-usuario.service';

import { Resp } from '../../../utils/response.utils';
import { validar_existencia_de_campos } from '../../../utils/validaciones.utils';



// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los roles
// (o-----------------------------------------------------------\/-----o)

async function crear_rol(req: Request, res: Response) {
    try {
        const { descripcion, nombre } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['nombre', 'descripcion'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        const nuevo_rol = await servicio_rol
            .crear_rol(nombre, descripcion);
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
        const { valido, mensaje } = validar_existencia_de_campos(
            ['nombre', 'descripcion'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }        
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
        const { termino } = req.params;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['termino'],
            req.params
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }              
        const rol = await servicio_rol.obtener_rol_termino(termino)
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
                mensaje: 'Rol obtenido usando un término',
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
        const { nombre, descripcion, _id } = req.body
        const { valido, mensaje } = validar_existencia_de_campos(
            ['nombre', 'descripcion', '_id'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }            
        const rol = await Rol.findById(_id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        if (rol.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se puede modificar el rol de administrador', 
                }
            )._403_forbidden();
        }  
        servicio_rol.modificar_rol(_id, nombre, descripcion);
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol modificado',
            },
        )._200_ok();        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al modificar un rol por id', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function eliminar_rol_id(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['id'],
            req.params
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }            
        const rol = await Rol.findById(id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        if (rol.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se puede eliminar el rol de administrador', 
                }
            )._403_forbidden();
        }          
        await servicio_rol.eliminar_rol_id(id, rol)
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol eliminado usando un id',
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


// (o==================================================================o)
//   ACCIONES EXTRA (INICIO)
//   cualquier otra cosa que no caiga en el CRUD convencional
// (o-----------------------------------------------------------\/-----o)

async function crear_permisos_en_rol_id(req: Request, res: Response) {
    try {
        const { permisos, _id } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['permisos', '_id'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        let rol = await Rol.findById(_id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        if (rol.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se pueden crear permisos en el rol de administrador', 
                }
            )._403_forbidden();
        }            
        const { 
            mensaje_res,
            advertencias
        } = await servicio_rol
            .crear_permisos_en_rol_id(permisos, rol);
        return new Resp(
            res, __filename, 
            { 
                mensaje: mensaje_res,
                advertencias: advertencias,
            }
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al crear ese o esos permisos', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function eliminar_permisos_en_rol_id(req: Request, res: Response) {
    try {
        const { permisos, _id } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['permisos', '_id'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        let rol = await Rol.findById(_id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        if (rol.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se pueden eliminar permisos en el rol de administrador', 
                }
            )._403_forbidden();
        }               
        const { 
            mensaje_res,
            advertencias
        } = await servicio_rol
            .eliminar_permisos_en_rol_id(permisos, rol);
        return new Resp(
            res, __filename, 
            { 
                mensaje: mensaje_res,
                advertencias: advertencias,
            }
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al eleminar ese o esos permisos', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function crear_rol_super_admin(req: Request, res: Response) {
    try {
        await servicio_rol
            .crear_rol_super_admin();
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Rol de "SUPER ADMIN" creado', 
            }
        )._201_created();        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al crear el rol de super admin', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function obtener_permisos_disponibles(req: Request, res: Response) {
    try {
        const permisos = await servicio_rol
            .obtener_permisos_disponibles();
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Permisos obtenidos',
                datos: permisos,
            }
        )._200_ok();        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener los permisos disponibles', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

// (o-----------------------------------------------------------/\-----o)
//   ACCIONES EXTRA (FIN)
// (o==================================================================o)


const ruta_rol = { 
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


export { ruta_rol }
