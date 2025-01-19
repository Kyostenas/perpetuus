import { PERMISOS_MENU_PERPETUUS } from "src/app/config/permisos-gui.config";
import { RolUsuario } from "./rol-usuario.model";

export class UsuarioEnviar {
    constructor(
        public nombres: string,
        public apellidos: string,
        public nombre_usuario: string,
        public contrasena: string,
        public numero_celular: string,
        public correo?: string,
    ) {}
}

export class UsuarioRecibir {
    _id!: string
    nombres?: string
    apellidos?: string
    nombre_usuario?: string
    correo?: string
    numero_celular?: string
    rol?: RolUsuario
    createdAt?: Date
    updatedAt?: Date

    constructor(datos: DATOS_USUARIO_RECIBIR) {
        this._id = datos._id
        this.nombres = datos.nombres
        this.apellidos = datos.apellidos
        this.nombre_usuario = datos.nombre_usuario
        this.correo = datos.correo
        this.numero_celular = datos.numero_celular
        this.rol = datos.rol
        this.createdAt = datos.createdAt
        this.updatedAt = datos.updatedAt
    }

    get nombre_completo(): string {
        let nombres = this.nombres ?? '';
        let apellidos = this.apellidos ?? '';
        let nombre_completo = [nombres, apellidos].join(' ');
        return nombre_completo;
    }

    get primer_nombre(): string {
        let nombres = this.nombres ?? '';
        let primer_nombre = nombres.split(' ')[0];
        return primer_nombre;
    }

    get primer_apellido(): string {
        let apellidos = this.apellidos ?? '';
        let primer_apellido = apellidos.split(' ')[0];
        return primer_apellido;
    }
}

export interface DESCRIPCION_MENU {
    nombre: string
    simbolo: string
    link: string
    ruta_completa: string
    permiso: PERMISOS_MENU_PERPETUUS | 'LIBRE'
    es_sub_menu: boolean
    nivel: number
    descripcion?: string
    sub_menus?: DESCRIPCION_MENU[]
}

interface DATOS_USUARIO_RECIBIR {
    _id: string,
    nombres?: string,
    apellidos?: string,
    nombre_usuario?: string,
    correo?: string,
    numero_celular?: string,
    rol?: RolUsuario,
    createdAt?: Date,
    updatedAt?: Date,
}
