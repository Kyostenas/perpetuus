import { Router, Request, Response } from 'express';
import { ruta_rol } from './rol-usuario.controller';
import { tiene_permiso, PERMISOS } from '../../../middlewares/permisos/contiene-el-permiso.middleware';

const RUTA_ROL = () => {
    const router = Router();

    // (o-----------------------------------------( CRUD ))
    
    router.post('/', 
        tiene_permiso(PERMISOS.ROL.CREAR),
        async (req: Request, res: Response) => { 
            return await ruta_rol.crear_rol(req, res)
        }
    );
    router.get('/', 
        tiene_permiso(PERMISOS.ROL.OBTENER),
        async (req: Request, res: Response) => { 
            return await ruta_rol.obtener_roles_todo(req, res)
        }
    );
    router.get('/id/:id', 
        tiene_permiso(PERMISOS.ROL.OBTENER),
        async (req: Request, res: Response) => { 
            return await ruta_rol.obtener_rol_id(req, res)
        }
    );
    router.get('/termino/:termino', 
        tiene_permiso(PERMISOS.ROL.OBTENER),
        async (req: Request, res: Response) => { 
            return await ruta_rol.obtener_rol_termino(req, res)
        }
    );
    router.put('/', 
        tiene_permiso(PERMISOS.ROL.MODIFICAR),
        async (req: Request, res: Response) => { 
            return await ruta_rol.modificar_rol(req, res)
        }
    );
    router.delete('/id/:id', 
        tiene_permiso(PERMISOS.ROL.ELIMINAR),
        async (req: Request, res: Response) => { 
            return await ruta_rol.eliminar_rol_id(req, res)
        }
    );


    // (o-----------------------------------------( ACCIONES EXTRA ))
        
    // PERMISOS
    router.post('/permisos', 
        tiene_permiso(PERMISOS.ROL.PERMISO.AGREGAR),
        async (req: Request, res: Response) => { 
            return await ruta_rol.crear_permisos_en_rol_id(req, res)
        }
    );
    router.get('/permisos', 
        tiene_permiso(PERMISOS.ROL.PERMISO.OBTENER),
        async (req: Request, res: Response) => { 
            return await ruta_rol.obtener_permisos_disponibles(req, res)
        }
    );
    router.delete('/permisos', 
        tiene_permiso(PERMISOS.ROL.PERMISO.ELIMINAR),
        async (req: Request, res: Response) => { 
            return await ruta_rol.eliminar_permisos_en_rol_id(req, res)
        }
    );
    
    // SUPER ADMIN
    // router.post('/super-admin', async (req: Request, res: Response) => { 
    //     return await ruta_rol.crear_rol_super_admin(req, res) }); 


    return router
};

export { RUTA_ROL }