import { Router, Request, Response } from 'express';
import { controlador_auth } from './auth.controller';
import { auth_middleware } from '../../middlewares/auth-login/auth.middleware';
import { _Request } from '../../tipos-personalizados';

const RUTA_AUTH = () => {
    const router = Router();

    router.post('/signup', auth_middleware.usuario_correo_duplicado, 
        async (req: _Request, res: Response) => {
            return await controlador_auth.registrar_usuario(req, res) });

    router.post('/signin', async (req: _Request, res: Response) => {
        return await controlador_auth.iniciar_sesion(req, res) });
    router.post('/signout', async (req: _Request, res: Response) => {
        return await controlador_auth.cerrar_sesion(req, res) });
        
    router.post('/refresh-session/:rfrsh_tkn', async (req: _Request, res: Response) => {
        return await controlador_auth.refrescar_inicio_sesion(req, res) });

    return router;
};

export { RUTA_AUTH }