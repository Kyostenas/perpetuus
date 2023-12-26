import { Request, Response } from 'express';
import { Rol, RolInput } from '../rol-usuario/rol-usuario.model';
import { Resp } from '../../../utiles/response';
import { syslog as _syslog } from '../../../utiles/logs';
const syslog = _syslog(module)



// (o==================================================================o)
//   CRUD BASICO (INICIO)
//   para los roles
// (o-----------------------------------------------------------\/-----o)

const crear_rol = async (req: Request, res: Response) => {
    const { descripcion, nombre } = req.body;
    if (!nombre || !descripcion) {
        return new Resp(
            res, __filename, 
            { mensaje: 'Se require el nombre del rol' }
        )._422_unprocessable();
    }
    try {
        const rol_input: RolInput = { nombre, descripcion };
        const nuevo_rol = await  Rol.create(rol_input)
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

const obtener_roles_todo = async (req: Request, res: Response) => {
    try {
        const roles = await Rol.find().sort('-creadetedAt')
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

const obtener_rol_id = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        syslog.log(`ID: ${id}`)
        const rol = await Rol.findById(id);
        if (!rol) {
            return new Resp(
                res, __filename, 
                { 
                    mensaje: 'No existe un rol con ese id', 
                }
            )._404_not_found();
        }
        syslog.log(`${rol}`)
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

const modificar_rol = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cuerpo = req.body
        syslog.log(`ID: ${id}`)
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


// (o-----------------------------------------------------------/\-----o)
//   CRUD BASICO (FIN)
// (o==================================================================o)



export { 
    crear_rol, 
    obtener_roles_todo,
    obtener_rol_id,
};
