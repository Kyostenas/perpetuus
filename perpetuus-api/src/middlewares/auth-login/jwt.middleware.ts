import { verify as jwt_verify } from 'jsonwebtoken';

import { Resp } from '../../utils/response.utils';
import { controlador_auth } from '../../componentes/auth-login/auth.controller'
import { AUTH_SECRET } from '../../config/env/env.config';

const URLS_EXCENTAS = [
    '/api/v1/auth/signin'    
];

export function verificar_jwt(req: any, res: any, next: any) {
    if (!URLS_EXCENTAS.includes(req.url)) {
        let token = req.session?.token;
        if (!token) {
            return new Resp(
                res, __filename,
                {
                    mensaje: 'Token no provehido'
                }
            )._403_forbidden();
        }
    
        jwt_verify(token, <string>AUTH_SECRET, (err: any, decoded: any) => {
            if (err) {
                if (!!req.session) {
                    controlador_auth.cerrar_sesion(
                        req, res, 
                        'Se ha forzado el cierre de tus sesión porque ya no es válida'
                    )
                }
                return new Resp(
                    res, __filename,
                    {
                        mensaje: 'Acceso no autorizado'
                    }
                )._401_unauthorized();
            }
            req.usuario = decoded.usuario;
            next();
        })
    } else {
        next();
    }
}

const jwt_middleware = {
    verificar_jwt
};

export { jwt_middleware };