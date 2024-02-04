import { Request, Response } from 'express';

import { Usuario } from './usuario.model';

import { servicio_usuario } from './usuario.service';
import { Resp } from '../../../utils/response.utils';
import { validar_existencia_de_campos } from '../../../utils/validaciones.utils';
import { NOMBRE_ROL_SUPER_ADMIN, NOMBRE_USUARIO_SUPER_ADMIN } from '../../../utils/constantes.utils';
import { Rol } from '../rol-usuario/rol-usuario.model';



// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los usuarios
// (o-----------------------------------------------------------\/-----o)

async function crear_usuario(req: Request, res: Response) {
    try {
        console.log(JSON.stringify(req.body, undefined, 2))
        const { 
            nombres, 
            apellidos, 
            nombre_usuario,
            contrasena,
            correo, 
            numero_celular 
        } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            [
                'nombres', 
                'apellidos', 
                'nombre_usuario',
                'contrasena',
            ],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        const nuevo_usuario = await servicio_usuario
            .crear_usuario(
                nombres, 
                apellidos, 
                nombre_usuario,
                contrasena, 
                correo, 
                numero_celular
            );
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Usuario creado', 
                datos: nuevo_usuario 
            }
        )._201_created();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al crear usuario', 
                error: err 
            }
        )._422_unprocessable();
    }
}

async function obtener_usuarios_todo(req: Request, res: Response) {
    try {
        const usuarios = await servicio_usuario
            .obtener_usuarios_todo()
        return new Resp(
            res, __filename,
            {
                mensaje: 'Se obtuvieron todos los usuarios',
                datos: usuarios,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener todos los usuarios', 
                error: err 
            }
        )._422_unprocessable();
    }
}

async function obtener_usuario_id(req: Request, res: Response) {
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
        const usuario = await servicio_usuario.obtener_usuario_id(id)
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un usuario con ese id', 
                }
            )._404_not_found();
        }
        return new Resp(
            res, __filename,
            {
                mensaje: 'Usuario obtenido usando un id',
                datos: usuario,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener un usuario por id', 
                error: err 
            }
        )._422_unprocessable();        
    }
}

async function obtener_usuario_termino(req: Request, res: Response) {
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
        const usuario = await servicio_usuario.obtener_usuario_termino(termino)
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No se encontró un usuario relacionado a ese término', 
                }
            )._404_not_found();
        }
        return new Resp(
            res, __filename,
            {
                mensaje: 'Usuario obtenido usando un término',
                datos: usuario,
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al obtener un usuario por término', 
                error: err 
            }
        )._422_unprocessable();        
    }
}

async function modificar_usuario(req: Request, res: Response) {
    try {
        const { nombres, apellidos, correo, numero_celular, _id } = req.body
        const { valido, mensaje } = validar_existencia_de_campos(
            ['nombres', 'apellidos', 'correo', '_id'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }            
        const usuario = await Usuario.findById(_id);
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un usuario con ese id', 
                }
            )._404_not_found();
        }
        if (usuario.rol?.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: `No se puede modificar a ${NOMBRE_USUARIO_SUPER_ADMIN}`, 
                }
            )._403_forbidden();
        }  
        servicio_usuario.modificar_usuario(
            _id, 
            nombres, 
            apellidos, 
            correo, 
            numero_celular
        );
        return new Resp(
            res, __filename,
            {
                mensaje: 'Usuario modificado',
            },
        )._200_ok();        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al modificar un usuario por id', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function eliminar_usuario_id(req: Request, res: Response) {
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
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un usuario con ese id', 
                }
            )._404_not_found();
        }
        if (usuario.rol?.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: `No se puede eliminar a ${NOMBRE_USUARIO_SUPER_ADMIN}`, 
                }
            )._403_forbidden();
        }          
        await servicio_usuario.eliminar_usuario_id(id, usuario)
        return new Resp(
            res, __filename,
            {
                mensaje: 'Usuario eliminado usando un id',
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al eliminar un usuario por id', 
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

async function cambiar_rol_a_usuario(req: Request, res: Response) {
    try {
        const { rol, _id } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            ['rol', '_id'],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        const usuario = await Usuario.findById(_id);
        const rol_usuario = await Rol.findById(rol)
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un usuario con ese id', 
                }
            )._404_not_found();
        }
        if (usuario.rol?.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: `Nadie puede cambiar el rol del ${NOMBRE_USUARIO_SUPER_ADMIN}`, 
                }
            )._403_forbidden();
        }
        if (rol_usuario?.super_admin) {
            return new Resp(
                res, __filename,
                {
                    mensaje: `Nadie puede asignar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`
                }
            )._403_forbidden();
        }        
        await servicio_usuario
            .cambiar_rol_a_usuario(_id, rol);
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol de usuario modificado',
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al cambiar de rol al usuario', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function quitar_rol_a_usuario(req: Request, res: Response) {
    try {
        const { _id } = req.body;
        const { valido, mensaje } = validar_existencia_de_campos(
            [ '_id' ],
            req.body
        );
        if (!valido) {
            return new Resp(res, __filename, { mensaje })
                ._422_unprocessable();
        }
        const usuario = await Usuario.findById(_id);
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un usuario con ese id', 
                }
            )._404_not_found();
        }
        if (usuario.rol?.super_admin) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: `Nadie puede eliminar el rol del ${NOMBRE_USUARIO_SUPER_ADMIN}`, 
                }
            )._403_forbidden();
        }
        await servicio_usuario
            .quitar_rol_a_usuario(_id);
        return new Resp(
            res, __filename,
            {
                mensaje: 'Rol de usuario eliminado',
            },
        )._200_ok();
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al cambiar de rol al usuario', 
                error: err 
            }
        )._422_unprocessable();          
    }
}

async function crear_usuario_super_admin(req: Request, res: Response) {
    try {
        await servicio_usuario
            .crear_usuario_super_admin();
        return new Resp(
            res, __filename, 
            { 
                mensaje: `Usuario ${NOMBRE_USUARIO_SUPER_ADMIN} creado`, 
            }
        )._201_created();        
    } catch (err) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: `Error al crear el usuario ${NOMBRE_USUARIO_SUPER_ADMIN}`, 
                error: err 
            }
        )._422_unprocessable();          
    }
}


// (o-----------------------------------------------------------/\-----o)
//   ACCIONES EXTRA (FIN)
// (o==================================================================o)




const controlador_usuario = { 
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


export { controlador_usuario }