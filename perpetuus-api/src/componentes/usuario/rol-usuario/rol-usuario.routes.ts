import { Router } from 'express';
import { ruta_rol } from './rol-usuario.controller';

const RUTA_ROL = () => {
    const router = Router();

    router.post('/', ruta_rol.crear_rol);
    router.get('/', ruta_rol.obtener_roles_todo);
    router.get('/id/:id', ruta_rol.obtener_rol_id);
    router.get('/termino/:termino', ruta_rol.obtener_rol_termino);
    router.put('/id/:id', ruta_rol.modificar_rol);
    router.delete('/id/:id', ruta_rol.eliminar_rol_id);

    return router
};

export { RUTA_ROL }