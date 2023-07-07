import { syslog } from './logs';
import { Response, ErrorRequestHandler } from 'express';

export class Resp {
    constructor(
        public res: Response,
        public filename: any,
        public datos: DatosResponse,
    ) {}

    private error_general() {
        this.datos.ok = false
        // if (this.datos.error.toString().includes('Error:')) {
        //     let error_separado = this.datos.error.toString.split('\n')
        //     this.datos.varias_lineas_error = error_separado
        // }
        if (this.datos.error.hasOwnProperty('err')) {
            let errores_interfaz: string[] = []
            this.datos.error.err.errors.map((campo: string) => {
                errores_interfaz.push(
                    this.datos.error.err.errors[campo].message
                )
            })
            this.datos.errores_interfaz = errores_interfaz
        }

        syslog.danger(this.filename, this.datos.mensaje)
        // this.datos.varias_lineas_error?.map((una_linea: string) => {
        //     syslog.danger(this.file, una_linea)
        // })
        syslog.danger(this.filename, this.datos.error)
        if (this.datos.error.toString().includes('Error:')) {
            let error = new Error(this.datos.error)
            syslog.danger(this.filename, error.toString(), true)
            // error.stack?.split('\n').map((linea: string) => {
            //     syslog.danger(this.file, linea)
            // })
        }

        return this.datos
    }

    private estatus_ok_general() {
        this.datos.ok = true
        return this.datos
    }
    
    _200() {
        if (!this.res) {
            throw 'Respuesta vacía'
        }
        syslog.success(this.filename, this.datos.mensaje)
        return this.res.status(200).json(this.estatus_ok_general())
    }
    
    _201() {
        if (!this.res) {
            throw 'Respuesta vacía'
        }
        syslog.success(this.filename, this.datos.mensaje)
        return this.res.status(201).json(this.estatus_ok_general())
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

    _422() {
        if (this.datos.error) {
            return this.res.status(422).json(this.error_general())
        }
    }


    _500() {
        if (this.datos.error) {
            return this.res.status(500).json(this.error_general())
        } else {
            syslog.danger(this.filename, this.datos.toString())
            return this.res.status(500).json(this.datos)
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
}