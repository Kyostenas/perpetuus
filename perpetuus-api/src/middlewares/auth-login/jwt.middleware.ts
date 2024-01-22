import { verify as jwt_verify } from 'jsonwebtoken';

import { Resp } from '../../utils/response.utils';
import { AUTH_SECRET } from '../../config/env/env.config';

export function verificar_jwt(req: any, res: any, next: any) {
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
}

const jwt_middleware = {
    verificar_jwt
};

export { jwt_middleware };