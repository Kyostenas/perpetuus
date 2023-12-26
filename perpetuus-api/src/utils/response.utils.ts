import { syslog as _syslog } from './logs.utils';
const syslog = _syslog(module)
import { Response, ErrorRequestHandler } from 'express';


/**
 * # Response
 * 
 * Una forma simple y estandarizada de generar respuestas
 * http con una sola clase, utilizando el estandar 
 * [RFC 9110](https://httpwg.org/specs/rfc9110.html#overview.of.status.codes)
 * que se puede ver a detalle en 
 * [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
 * 
 * El objetivo es mantener las respuestas consistentes y fáciles
 * de escribir.
 * 
 * ---
 * 
 * | DESCRIPCIÓN                     | RANGO     |
 * | :------------------------------ | --------: |
 * | Respuestas informativas         | 100 - 199 |
 * | Respuestas exitosas             | 200 - 299 |
 * | Mensajes de redirección         | 300 - 399 |
 * | Respuestas de error de cliente  | 400 - 499 |
 * | Respuestas de error de servidor | 500 - 499 |
 * 
 */
export class Resp {
    constructor(
        public res: Response,
        public filename: any,
        public datos: DatosResponse,
    ) {}


    // (o==================================================================o)
    //   UTILIDADES (INICIO)
    // (o-----------------------------------------------------------\/-----o)
    
    private codigo_actual: string = '';

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

        syslog.error(`${this.codigo_formateado} ${this.datos.error}`, this.filename);
        return this.datos;
    }

    private estatus_ok_general() {
        this.datos.ok = true;
        syslog.success(`${this.codigo_formateado} ${this.datos.mensaje}`, this.filename);
        return this.datos;
    }
    
    // (o-----------------------------------------------------------/\-----o)
    //   UTILIDADES (FIN)
    // (o==================================================================o)
    



    // (o==================================================================o)
    //   CODIGOS DE RESPUESTA (INICIO)
    // (o-----------------------------------------------------------\/-----o)
    

    // (o-----------------------------------------( EXITOSAS ))
    
    /**
     * ## `200 OK`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200).
     * 
     * Solicitud exitosa. El contexto de resultado exitoso cambia por método:
     * 
     * - `GET`: El recurso se obtuvo y se transmitio en el cuerpo del mensaje.
     * - `PUT`/`POST`: El recurso resultado del procedimiento se transimitió en
     *      el cuerpo del mensaje.
     */
    _200_ok() {
        this.codigo_actual = '200 OK'
        if (!this.res) {
            throw 'Respuesta vacía';
        }
        return this.res.status(200).json(this.estatus_ok_general());
    }

    /**
     * ## `201 Created`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201).
     * 
     * Solicitud exitosa que creo un nuevo recurso como resultado. Normalmente se usa
     * para solicitudes `POST` o algunas `PUT`.
     */    
    _201_created() {
        this.codigo_actual = '201 CREATED'
        if (!this.res) {
            throw 'Respuesta vacía';
        }
        return this.res.status(201).json(this.estatus_ok_general());
    }


    // (o-----------------------------------------( ERROR CLIENTE ))
    
    /**
     * ## `400 Bad Request`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400).
     * 
     * El servidor no puede o no va a procesar la solicitud por algo que se percibe
     * como un **error de cliente**.
     */        
    _400_bad_request() {
        this.codigo_actual = '400 BAD REQUEST'
        if (!this.datos.error) {
            throw 'Respuesta de error vacía';
        }
        return this.res.status(400).json(this.error_general());
    }
    
    /**
     * ## `401 Unauthorized (Unauthenticated)`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401).
     * 
     * **No autorizado** aquí se refiere en realidad a **`No autenticado`**.
     * Significa que el cliente se debe autenticar para poder recibir la respuesta
     * solicitada.
     */        
    _401_unauthorized() {
        this.codigo_actual = '401 UNAUTHORIZED'
        if (this.datos.error) {
            return this.res.status(401).json(this.error_general());
        }
    }

    /**
     * ## `404 Not Found`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404).
     * 
     * El servidor no puede encontrar el recurso.
     * 
     * En el **navegador** es que la **URL** no es reconocida. En el **API**
     * puede ser que la ruta sea válida pero no existe el recurso.
     */     
    _404_not_found() {
        this.codigo_actual = '404 NOT FOUND'
        if (this.datos.error) {
            return this.res.status(404).json(this.error_general());
        }
    }
    
    /**
     * ## `422 Unprocessable Content`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422).
     * 
     * Hubo una solicitud correcta, pero no se le pudo dar seguimiento por
     * errores semanticos.
     */     
    _422_unprocessable() {
        this.codigo_actual = '422 UNPROCESSABLE'
        if (!this.datos.error) {
            throw 'Respuesta de error vacía'
        }
        return this.res.status(422).json(this.error_general());
    }
    
    
    // (o-----------------------------------------( ERROR SERVIDOR ))
    
    /**
     * ## `500 Internal Server Error`
     * 
     * Detalles [aquí](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500).
     * 
     * El servidor se encontró con una situación a la que no sabe como
     * responder (error interno).
     */     
    _500_internal_server_error() {
        this.codigo_actual = '500 INTERNAL ERROR'
        if (!this.datos.error) {
            syslog.error(this.datos.toString(), this.filename);
            return this.res.status(500).json(this.datos);
        }
        return this.res.status(500).json(this.error_general());
    }
    
    // (o-----------------------------------------------------------/\-----o)
    //   CODIGOS DE RESPUESTA (FIN)
    // (o==================================================================o)
    


}

/**
 * # DatosResponse
 * 
 * Estructura genérica para cualquier respuesta http
 * generada en `response.ts`.
 */
export interface DatosResponse {
    /**
     * ## mensaje
     * Cadena de texto que tiene una descripción rápida, 
     * motivo, contexto, etc. De la respuesta.
     */
    mensaje: string;
    /**
     * ## ok
     * Booleano que indica si está todo bien (no hay error).
     */  
    ok?: boolean;
    /**
     * ## datos
     * Un objeto de cualquier estructura que contiene los datos
     * de la respuesta.
     */  
    datos?: any;
    /**
     * ## errores_interfaz
     * Errores para mostrar en el **frontend**.
     */  
    errores_interfaz?: string[];
    /**
     * ## descripcion
     * Detalles en extra de la respuesta.
     */  
    descripcion?: string;
    /**
     * ## error
     * Objeto cualesquiera del error.
     */  
    error?: any;
};