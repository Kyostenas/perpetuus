import { Router, Request, Response } from 'express';
import { ruta_rol } from './rol-usuario.controller';
import { _Request } from '../../../tipos-personalizados';

const RUTA_ROL = () => {
    const router = Router();

    // (o-----------------------------------------( CRUD ))
    
    router.post('/', async (req: _Request, res: Response) => { 
        return await ruta_rol.crear_rol(req, res) });
    router.get('/', async (req: _Request, res: Response) => { 
        return await ruta_rol.obtener_roles_todo(req, res) });
    router.get('/id/:id', async (req: _Request, res: Response) => { 
        return await ruta_rol.obtener_rol_id(req, res) });
    router.get('/termino/:termino', async (req: _Request, res: Response) => { 
        return await ruta_rol.obtener_rol_termino(req, res) });
    router.put('/', async (req: _Request, res: Response) => { 
        return await ruta_rol.modificar_rol(req, res) });
    router.delete('/id/:id', async (req: _Request, res: Response) => { 
        return await ruta_rol.eliminar_rol_id(req, res) });


    // (o-----------------------------------------( ACCIONES EXTRA ))
        
    // PERMISOS
    router.post('/permisos', async (req: _Request, res: Response) => { 
        return await ruta_rol.crear_permisos_en_rol_id(req, res) });
    router.get('/permisos', async (req: _Request, res: Response) => { 
        return await ruta_rol.obtener_permisos_disponibles(req, res) });
    router.delete('/permisos', async (req: _Request, res: Response) => { 
        return await ruta_rol.eliminar_permisos_en_rol_id(req, res) });
    
    // SUPER ADMIN
    router.post('/super-admin', async (req: _Request, res: Response) => { 
        return await ruta_rol.crear_rol_super_admin(req, res) }); 


    return router
};

export { RUTA_ROL }