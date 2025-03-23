import { Request, Response } from 'express';
import { syslog as _syslog } from '../../../utils/logs.utils';

import { ROL_MODEL } from '../rol-usuario/rol-usuario.model';
import { RolService } from './rol-usuario.service';

import { Resp } from '../../../utils/response.utils';
import { NOMBRE_ROL_SUPER_ADMIN } from '../../../utils/constantes.utils';
import { CRUD_Controller } from '../../../abstract-classes/crud/crud-controller.abstract';

export class RolController extends CRUD_Controller<typeof ROL_MODEL> {
    // (o==================================================================o)
    //   #region CRUD
    // (o-----------------------------------------------------------\/-----o)

    async create(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const BODY = { ...req.body, user_id: req.usuario?._id };
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().create,
            res_message: 'Rol creado',
            err_message: 'Error al crear rol',
            is_creation: true,
            filename: __filename,
            fields_to_validate: ['nombre', 'description', 'user_id'],
        });
    }
    async read(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.try_operation({
            res: res,
            operation: new RolService().read,
            res_message: 'Se obtuvieron todos los roles',
            err_message: 'Error al crear rol',
            is_creation: false,
            filename: __filename,
        });
    }
    async read_by_sequence(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.try_operation({
            res: res,
            body: req.params,
            operation: new RolService().read_by_sequence,
            res_message: 'Rol obtenido usando un consecutivo',
            err_message: 'Error al obtener un rol con su consecutivo',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: ['sequence'],
        });
    }
    async update(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const BODY = { ...req.body, ...req.params, user_id: req.usuario?._id };
        const SUPER_ADMIN = this.test_if_super_admin(BODY.sequence);
        if (!!SUPER_ADMIN) {
            return new Resp(res, __filename, {
                mensaje: `No se puede modificar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            })._403_forbidden();
        }
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().update,
            res_message: 'Rol modificado',
            err_message: 'Error al modificar un rol',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: [
                'nombre',
                'description',
                'sequence',
                'user_id',
            ],
        });
    }
    async activate(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const BODY = { ...req.body, ...req.params, user_id: req.usuario?._id };
        const SUPER_ADMIN = this.test_if_super_admin(BODY.sequence);
        if (!!SUPER_ADMIN) {
            return new Resp(res, __filename, {
                mensaje: `No se puede modificar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            })._403_forbidden();
        }
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().activate,
            res_message: 'Rol activado',
            err_message: 'Error al activar un rol',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: ['sequence', 'user_id'],
        });
    }
    async deactivate(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const BODY = { ...req.body, ...req.params, user_id: req.usuario?._id };
        const SUPER_ADMIN = this.test_if_super_admin(BODY.sequence);
        if (!!SUPER_ADMIN) {
            return new Resp(res, __filename, {
                mensaje: `No se puede modificar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            })._403_forbidden();
        }
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().deactivate,
            res_message: 'Rol desactivado',
            err_message: 'Error al desactivar un rol',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: ['sequence', 'user_id'],
        });
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion CRUD
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region EXTRA-ACTIONS
    // (o-----------------------------------------------------------\/-----o)

    async add_permissions_to_rol(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const rol = this.read_by_sequence(req, res);
        const BODY = {
            ...req.body,
            ...req.params,
            user_id: req.usuario?._id,
            rol,
        };
        const SUPER_ADMIN = this.test_if_super_admin(BODY.sequence);
        if (!!SUPER_ADMIN) {
            return new Resp(res, __filename, {
                mensaje: `No se puede modificar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            })._403_forbidden();
        }
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().crear_permisos_en_rol,
            res_message: 'Permiso/s agregado/s a rol',
            err_message: 'Hubo un error agregando permisos al rol',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: ['permissions', 'rol', 'user_id'],
        });
    }

    async remove_permissions_from_rol(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        const rol = this.read_by_sequence(req, res);
        const BODY = {
            ...req.body,
            ...req.params,
            user_id: req.usuario?._id,
            rol,
        };
        const SUPER_ADMIN = this.test_if_super_admin(BODY.sequence);
        if (!!SUPER_ADMIN) {
            return new Resp(res, __filename, {
                mensaje: `No se puede modificar el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            })._403_forbidden();
        }
        return this.try_operation({
            res: res,
            body: BODY,
            operation: new RolService().eliminar_permisos_en_rol,
            res_message: 'Permiso/s eliminado/s del rol',
            err_message: 'Hubo un error eliminando permisos del rol',
            not_found_message: 'No existe un rol con ese consecutivo',
            is_creation: false,
            filename: __filename,
            fields_to_validate: ['permissions', 'rol', 'user_id'],
        });
    }

    async creat_superadmin_rol(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.try_operation({
            res: res,
            operation: new RolService().crear_rol_super_admin,
            res_message: `Rol de ${NOMBRE_ROL_SUPER_ADMIN} creado`,
            err_message: `Error al crear el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            is_creation: false,
            filename: __filename,
        });
    }

    async get_permissions(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>> {
        return this.try_operation({
            res: res,
            operation: new RolService().obtener_permisos_disponibles,
            res_message: `Rol de ${NOMBRE_ROL_SUPER_ADMIN} creado`,
            err_message: `Error al crear el rol de ${NOMBRE_ROL_SUPER_ADMIN}`,
            is_creation: false,
            filename: __filename,
        });
    }

    private async test_if_super_admin(sequence: number) {
        const ROL = await this.model.findOne({ sequence }).lean();
        return ROL?.super_admin;
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion EXTRA-ACTIONS
    // (o==================================================================o)
}
