import { Router } from 'express';
import { crear_rol } from './rol-usuario.controller';

const RUTA_ROL = () => {
    const router = Router();

    router.post('/roles', crear_rol);
    router.get('/roles', (req, res) => {});
    router.get('/roles/id/:id', (req, res) => {});
    router.get('/roles/termino/:termino', (req, res) => {});
    router.put('/roles/:id', (req, res) => {});
    router.delete('/roles/:id', (req, res) => {});

    return router
};

export { RUTA_ROL }