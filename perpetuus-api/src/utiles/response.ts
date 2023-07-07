import { syslog } from './logs';
import { Response, ErrorRequestHandler } from 'express';

export class Resp {
    constructor(
        public res: Response,
        public datos: DatosResponse,
    ) {}

    private error_general() {
        this.datos.ok = false
        if (this.datos.error.toString().includes('Error:')) {
            let error_separado = this.datos.error.toString.split('\n')
            this.datos.varias_lineas_error = error_separado
        }
        if (this.datos.error.hasOwnProperty('err')) {
            let errores_interfaz: string[] = []
            this.datos.error.err.errors.map((campo: string) => {
                errores_interfaz.push(
                    this.datos.error.err.errors[campo].message
                )
            })
            this.datos.errores_interfaz = errores_interfaz
        }

        syslog.danger(__filename, this.datos.mensaje)
        this.datos.varias_lineas_error?.map((una_linea: string) => {
            syslog.danger(__filename, una_linea)
        })
        if (this.datos.error.toString().includes('Error:')) {
            let error = new Error(this.datos.error)
            error.stack?.split('\n').map((linea: string) => {
                syslog.danger(__filename, linea)
            })
        }

        return this.datos
    }

    private estatus_ok_general() {
        this.datos.ok = true
        return this.datos
    }


    _400() {
        if (this.datos.error) {
            return this.res.status(400).json(this.error_general())
        }
    }

    _401() {
        if (this.datos.error) {
            return this.res.status(401).json(this.error_general())
        }
    }

    _500() {
        if (this.datos.error) {
            return this.res.status(500).json(this.error_general())
        } else {
            syslog.danger(__filename, this.datos.toString())
            return this.res.status(500).json(this.datos)
        }
    }

    _200() {
        if (!this.res) {
            throw 'Respuesta vacía'
        }
        return this.res.status(200).json(this.estatus_ok_general())
    }

}

export interface DatosResponse {
    mensaje: string;
    ok?: boolean;
    datos?: any;
    varias_lineas_error?: string[];
    errores_interfaz?: string[];
    descripcion?: string;
    error?: any;
}