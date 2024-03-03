import { Types } from 'mongoose';
import { compareSync as bcrypt_comparesync } from 'bcryptjs';
import { sign as jwt_sign } from 'jsonwebtoken';

import { Usuario, UsuarioDocument } from '../usuario/usuario/usuario.model';

import { AUTH_SECRET } from '../../config/env/env.config';
import { SEGUNDOS_HORA } from '../../utils/constantes.utils';

function iniciar_sesion(usuario: UsuarioDocument, constrasena: string): {
    contrasena_valida: boolean;
    token_generado?: string;
} {
    const contrasena_valida = bcrypt_comparesync(
        constrasena,
        usuario.contrasena,
    );
    if (!contrasena_valida) return { contrasena_valida };
    const token_generado = jwt_sign(
        { usuario: {
            _id: usuario._id,
            nombre: `${usuario.nombres} ${usuario.apellidos}`,
            nombre_usuario: usuario.nombre_usuario,
            correo: usuario.correo,
            rol: usuario.rol,
        }},
        <string>AUTH_SECRET,
        {
            algorithm: 'HS256',
            allowInsecureKeySizes: false,
            expiresIn: SEGUNDOS_HORA,
        }
    );

    return { contrasena_valida, token_generado };
}

async function crear_refresh_token(usuario: UsuarioDocument) {
    const refresh_token_generado = new Types.ObjectId();
    let hoy = new Date();

    // 10 dias de validez para el refresh token
    let validez = new Date().setDate(hoy.getDate() + 10);
    await Usuario.findByIdAndUpdate(
        usuario._id,
        { 
            rfrsh_tkn: refresh_token_generado,
            rfrsh_tkn_validity: validez,
        },
        { useFindAndModify: false }
    );    
}

const servicio_auth = {
    iniciar_sesion,
    crear_refresh_token,    
};

export { servicio_auth };