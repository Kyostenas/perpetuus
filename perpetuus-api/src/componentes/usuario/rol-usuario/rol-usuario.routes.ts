import { Router } from 'express';
import { 
    crear_rol, 
    obtener_rol_id, 
    obtener_roles_todo 
} from './rol-usuario.controller';

const RUTA_ROL = () => {
    const router = Router();

    router.post('/', crear_rol);
    router.get('/', obtener_roles_todo);
    router.get('/id/:id', obtener_rol_id);
    router.get('/termino/:termino', (req, res) => {});
    router.put('/id/:id', (req, res) => {});
    router.delete('/id/:id', (req, res) => {});

    return router
};

export { RUTA_ROL }