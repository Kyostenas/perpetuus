import { Request } from 'express';

export interface _Request extends Request {
    usuario?: {
        _id?: string;
        nombre?: string;
        nombre_usuario?: string;
        correo?: string;
        rol?: string;
    }
}