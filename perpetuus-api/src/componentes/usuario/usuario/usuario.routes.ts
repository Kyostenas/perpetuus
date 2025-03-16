import { Router, Response, Request } from 'express';
import { controlador_usuario } from './usuario.controller';
import { tiene_permiso, PERMISOS } from '../../../middlewares/permisos/contiene-el-permiso.middleware';


const RUTA_USUARIO = () => {
    const router = Router();

    // (o-----------------------------------------( CRUD ))
    
    router.post('/',
        tiene_permiso(PERMISOS.USUARIO.CREAR),
        async (req: Request, res: Response) => {
            return await controlador_usuario.crear_usuario(req, res) 
        }
    );
    router.get('/', 
        tiene_permiso(PERMISOS.USUARIO.OBTENER),
        async (req: Request, res: Response) => { 
            return await controlador_usuario.obtener_usuarios_todo(req, res)
        }
    );
    router.get('/id/:id', 
        tiene_permiso(PERMISOS.USUARIO.OBTENER),
        async (req: Request, res: Response) => { 
            return await controlador_usuario.obtener_usuario_id(req, res) 
        }
    );
    // router.get('/termino/:termino', 
    //     tiene_permiso(PERMISOS.USUARIO.OBTENER),
    //     async (req: Request, res: Response) => { 
    //         return await controlador_usuario.obtener_usuario_termino(req, res) 
    //     }
    // );
    router.put('/', 
        tiene_permiso(PERMISOS.USUARIO.MODIFICAR),
        async (req: Request, res: Response) => { 
            return await controlador_usuario.modificar_usuario(req, res) 
        }
    );
    router.delete('/id/:id', 
        tiene_permiso(PERMISOS.USUARIO.ELIMINAR),
        async (req: Request, res: Response) => { 
            return await controlador_usuario.eliminar_usuario_id(req, res) 
        }
    );


    // (o-----------------------------------------( ACCIONES EXTRA ))
        
    // ROL
    router.put('/rol', 
        tiene_permiso(PERMISOS.USUARIO.ROL.AGREGAR),
        async (req: Request, res: Response) => { 
        return await controlador_usuario.cambiar_rol_a_usuario(req, res) 
    });
    router.delete('/rol', 
        tiene_permiso(PERMISOS.USUARIO.ROL.ELIMINAR),
        async (req: Request, res: Response) => { 
        return await controlador_usuario.quitar_rol_a_usuario(req, res) 
    });
    
    // SUPER ADMIN
    // router.post('/super-admin', async (req: Request, res: Response) => { 
    //     return await controlador_usuario.crear_usuario_super_admin(req, res) }); 


    return router
};

export { RUTA_USUARIO }