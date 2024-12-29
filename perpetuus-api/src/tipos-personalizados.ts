import { Request } from 'express';

export interface _Request extends Request {
    usuario?: {
        _id?: string;
        nombre?: string;
        nombre_usuario?: string;
        correo?: string;
        rol?: string;

        /**
         * Esto solo se usa dentro del API. SIEMPRE debe llegar vacio
         * desde la GUI, porque en la primera se comprueba que el rol sea
         * el que el usuario tiene asignado. Si es correcta la
         * comprobacion, este arreglo se llena con los permisos del
         * rol correspondiente para ser comprobados con el guard.
         */
        permisos?: string[]

    }
    /**
     * Solo para usarse dentro del API. SIMPRE debe llegar vacio
     * desde la GUI. Es para mostrar un error cuando se deniega el
     * acceso porque no se tiene un permiso, cuyo valor se indica
     * aqui.
     */
    permiso_denegado?: string

}