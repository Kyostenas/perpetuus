import { syslog } from './logs';
import { Response, ErrorRequestHandler } from 'express';

export class Resp {
    constructor(
        public res: Response,
        public filename: any,
        public datos: DatosResponse,
    ) {}
    
    codigo_actual: string = '';

    get codigo_formateado(): string {
        return `<${this.codigo_actual}>`
    }

    private error_general() {
        this.datos.ok = false
        if (this.datos.error.hasOwnProperty('err')) {
            let errores_interfaz: string[] = [];
            this.datos.error.err.errors.map((campo: string) => {
                errores_interfaz.push(
                    this.datos.error.err.errors[campo].message
                );
            });
            this.datos.errores_interfaz = errores_interfaz;
        }

        syslog.danger(this.filename, `${this.codigo_formateado} ${this.datos.error}`);
        return this.datos;
    }

    private estatus_ok_general() {
        this.datos.ok = true;
        syslog.success(this.filename, `${this.codigo_formateado} ${this.datos.mensaje}`);
        return this.datos;
    }
    
    _200() {
        this.codigo_actual = '200'
        if (!this.res) {
            throw 'Respuesta vacía';
        }
        return this.res.status(200).json(this.estatus_ok_general());
    }
    
    _201() {
        this.codigo_actual = '201'
        if (!this.res) {
            throw 'Respuesta vacía';
        }
        return this.res.status(201).json(this.estatus_ok_general());
    }


    _400() {
        this.codigo_actual = '400'
        if (this.datos.error) {
            return this.res.status(400).json(this.error_general());
        }
    }

    _401() {
        this.codigo_actual = '401'
        if (this.datos.error) {
            return this.res.status(401).json(this.error_general());
        }
    }

    _404() {
        this.codigo_actual = '404'
        if (this.datos.error) {
            return this.res.status(404).json(this.error_general());
        }
    }

    _422() {
        this.codigo_actual = '422'
        if (this.datos.error) {
            return this.res.status(422).json(this.error_general());
        }
    }


    _500() {
        this.codigo_actual = '500'
        if (this.datos.error) {
            return this.res.status(500).json(this.error_general());
        } else {
            syslog.danger(this.filename, this.datos.toString());
            return this.res.status(500).json(this.datos);
        }
    }


}

export interface DatosResponse {
    mensaje: string;
    ok?: boolean;
    datos?: any;
    errores_interfaz?: string[];
    descripcion?: string;
    error?: any;
};