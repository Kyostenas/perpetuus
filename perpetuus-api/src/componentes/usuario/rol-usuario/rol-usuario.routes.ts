import { Router, Request, Response } from 'express';
import { ruta_rol } from './rol-usuario.controller';

const RUTA_ROL = () => {
    const router = Router();

    router.post('/', async (req: Request, res: Response) => { 
        return await ruta_rol.crear_rol(req, res) });
    router.get('/', async (req: Request, res: Response) => { 
        return await ruta_rol.obtener_roles_todo(req, res) });
    router.get('/id/:id', async (req: Request, res: Response) => { 
        return await ruta_rol.obtener_rol_id(req, res) });
    router.get('/termino/:termino', async (req: Request, res: Response) => { 
        return await ruta_rol.obtener_rol_termino(req, res) });
    router.put('/id/:id', async (req: Request, res: Response) => { 
        return await ruta_rol.modificar_rol(req, res) });
    router.delete('/id/:id', async (req: Request, res: Response) => { 
        return await ruta_rol.eliminar_rol_id(req, res) });

    return router
};

export { RUTA_ROL }