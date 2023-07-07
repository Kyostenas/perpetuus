import { Request, Response } from 'express';
import { Rol, RolInput } from '../rol-usuario/rol-usuario.model';
import { Resp } from '../../../utiles/response';
import { syslog } from '../../../utiles/logs';

const crear_rol = async (req: Request, res: Response) => {
    const { descripcion, nombre } = req.body;

    if (!nombre || !descripcion) {
        return new Resp(res, __filename, { mensaje: 'Se require el nombre del rol' })._422();
    }

    const rol_input: RolInput = { nombre, descripcion };
    Rol.create(rol_input)
        .then(rol_creado => {
            return new Resp(res, __filename, { mensaje: 'Rol creado', datos: rol_creado })._201();
        })
        .catch(err => {
            return new Resp(res, __filename, { mensaje: 'Error al crear', error: err })._422();
        });
}

export { crear_rol };
