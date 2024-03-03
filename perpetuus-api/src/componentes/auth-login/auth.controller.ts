import { Request, Response } from 'express';

import { Resp } from '../../utils/response.utils';

import { controlador_usuario } from '../usuario/usuario/usuario.controller';
import { servicio_auth } from './auth.service';

import { Usuario } from '../usuario/usuario/usuario.model';



async function registrar_usuario(req: Request, res: Response) {
    controlador_usuario.crear_usuario(req, res);
}

async function iniciar_sesion(req: Request, res: Response) {
    try {
        const usuario = await Usuario.findOne({
            nombre_usuario: req.body.nombre_usuario
        });
        if (!usuario) {
            return new Resp(
                res, __filename, 
                { mensaje: 'Usuario o contraseña incorrectos' }
            )._401_unauthorized();              
        }

        const {
            contrasena_valida,
            token_generado,
        } = servicio_auth.iniciar_sesion(usuario, req.body.contrasena);
        if (!contrasena_valida) {
            return new Resp(
                res, __filename, 
                { mensaje: 'Usuario o contraseña incorrectos' }
            )._401_unauthorized();             
        } else {
            // Crear refresh token
            await servicio_auth.crear_refresh_token(usuario);
        }

        // Agregar token a la sesion
        if (!req.session) throw 'No hay sesión'
        req.session.token = token_generado;

        let usuario_enviar = await Usuario
            .findById(usuario._id)
            .select('-__v -contrasena -rfrsh_tkn_validity -rfrsh_tkn')
            .lean();
        delete usuario.rol?.permisos
        delete usuario.rol?.__v
        let nombre_completo = `${usuario.nombres} ${usuario.apellidos}`
        return new Resp(
            res, __filename, 
            { 
                mensaje: `¡Hola de nuevo! ${nombre_completo}`, 
                datos: usuario_enviar,
            }
        )._200_ok();
    } catch (error) {
        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al iniciar sesión', 
                error
            }
        )._422_unprocessable();        
    }
}

async function cerrar_sesion(req: Request, res: Response, mensaje = 'Hasta pronto...') {
    try {
        req.session = null;
        return new Resp(
            res, __filename, 
            { mensaje }
        )._200_ok();        
    } catch (error) {

        // todo: ¿Usar this.next(error)?

        return new Resp(
            res, __filename, 
            { 
                mensaje: 'Error al cerrar sesión', 
                error
            }
        )._422_unprocessable();        
    }
}



const controlador_auth = {
    registrar_usuario,
    iniciar_sesion,
    cerrar_sesion,
};

export { controlador_auth };
