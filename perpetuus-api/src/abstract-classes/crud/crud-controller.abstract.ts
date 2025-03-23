import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { validar_existencia_de_campos } from '../../utils/validaciones.utils';
import { Resp } from '../../utils/response.utils';

export abstract class CRUD_Controller<T> {
    async try_operation({
        res,
        body,
        operation,
        res_message,
        err_message,
        not_found_message,
        is_creation,
        filename,
        fields_to_validate,
    }: {
        res: Response;
        body?: any;
        operation: Function;
        res_message: string;
        err_message: string;
        not_found_message?: string;
        is_creation: boolean;
        filename: string;
        fields_to_validate?: string[];
    }) {
        try {
            if (fields_to_validate) {
                const { valido, mensaje } = validar_existencia_de_campos(
                    fields_to_validate,
                    body,
                );
                if (!valido) {
                    return new Resp(res, filename, {
                        mensaje,
                    })._422_unprocessable();
                }
            }
            const result = !!body ? await operation(body) : await operation();
            if (is_creation && (!result)) {
                return new Resp(res, filename, {
                    mensaje: not_found_message ?? 'No encontrado'
                })._404_not_found()
            }
            const RESP = new Resp(res, filename, {
                mensaje: res_message,
                datos: result,
            });
            if (is_creation) {
                return RESP._201_created();
            } else {
                return RESP._200_ok();
            }
        } catch (err) {
            return new Resp(res, filename, {
                mensaje: err_message,
                error: err,
            })._422_unprocessable();
        }
    }
     
    model = <T>Model;

    abstract create(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
    abstract read(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
    abstract read_by_sequence(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
    abstract update(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
    abstract activate(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
    abstract deactivate(
        req: Request,
        res: Response,
    ): Promise<Response<any, Record<string, any>>>;
}
