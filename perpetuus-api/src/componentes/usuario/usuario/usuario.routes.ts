import { Router, Request, Response } from 'express';
import { controlador_usuario } from './usuario.controller';
import { _Request } from '../../../tipos-personalizados';


const RUTA_USUARIO = () => {
    const router = Router();

    // (o-----------------------------------------( CRUD ))
    
    router.post('/', async (req: _Request, res: Response) => { 
        return await controlador_usuario.crear_usuario(req, res) });
    router.get('/', async (req: _Request, res: Response) => { 
        return await controlador_usuario.obtener_usuarios_todo(req, res) });
    router.get('/id/:id', async (req: _Request, res: Response) => { 
        return await controlador_usuario.obtener_usuario_id(req, res) });
    router.get('/termino/:termino', async (req: _Request, res: Response) => { 
        return await controlador_usuario.obtener_usuario_termino(req, res) });
    router.put('/', async (req: _Request, res: Response) => { 
        return await controlador_usuario.modificar_usuario(req, res) });
    router.delete('/id/:id', async (req: _Request, res: Response) => { 
        return await controlador_usuario.eliminar_usuario_id(req, res) });


    // (o-----------------------------------------( ACCIONES EXTRA ))
        
    // ROL
    router.put('/rol', async (req: _Request, res: Response) => { 
        return await controlador_usuario.cambiar_rol_a_usuario(req, res) });
    router.delete('/rol', async (req: _Request, res: Response) => { 
        return await controlador_usuario.quitar_rol_a_usuario(req, res) });
    
    // SUPER ADMIN
    router.post('/super-admin', async (req: _Request, res: Response) => { 
        return await controlador_usuario.crear_usuario_super_admin(req, res) }); 


    return router
};

export { RUTA_USUARIO }