import { Types } from 'mongoose';
import { compareSync as bcrypt_comparesync } from 'bcryptjs';
import { sign as jwt_sign } from 'jsonwebtoken';

import { Usuario, UsuarioDocument } from '../usuario/usuario/usuario.model';

import { AUTH_SECRET } from '../../config/env/env.config';
import { SEGUNDOS_HORA } from '../../utils/constantes.utils';
import { _Request } from '../../tipos-personalizados';

function generar_token_inicio_sesion(usuario: UsuarioDocument, constrasena: string): {
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
            rol: usuario.rol?._id,
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
    let validez = new Date(hoy.setDate(hoy.getDate() + 10));
    let modificado = await Usuario.findOneAndUpdate(
        { _id: usuario._id },
        { $set: { 
            rfrsh_tkn: refresh_token_generado,
            rfrsh_tkn_validity: validez,
        }},
        { useFindAndModify: false, new: true }
    );
}

async function refrescar_token_inicio_sesion(usuario: UsuarioDocument, refresh_token: string) {
    let debe_iniciar_de_nuevo = false;
    const REFRESH_TOKEN_ACTUAL = await Usuario
        .findById(usuario._id)
        .select('rfrsh_tkn rfrsh_tkn_validity');
    if (!(refresh_token === String(REFRESH_TOKEN_ACTUAL?.rfrsh_tkn))) {
        debe_iniciar_de_nuevo = true;
        return { debe_iniciar_de_nuevo }
    }
    let es_valido = false;
    if (!!REFRESH_TOKEN_ACTUAL?.rfrsh_tkn_validity) {
        es_valido = new Date(REFRESH_TOKEN_ACTUAL?.rfrsh_tkn_validity) >= new Date();
    }
    if (!es_valido) {
        debe_iniciar_de_nuevo = true;
        return { debe_iniciar_de_nuevo }
    } else {
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
        return { debe_iniciar_de_nuevo, token_generado }
    }
}

function validar_sesion(req: _Request) {
    let sesion_valida = true
    if (!req.session) sesion_valida = false
    return { sesion_valida }
}


const servicio_auth = {
    generar_token_inicio_sesion,
    crear_refresh_token,
    refrescar_token_inicio_sesion,
    validar_sesion,
};

export { servicio_auth };