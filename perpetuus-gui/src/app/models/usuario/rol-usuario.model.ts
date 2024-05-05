export class CapacidadPermisoRolUsuario {
    constructor(
        public metodo: ('post' | 'put' | 'get' | 'delete')[],
        public subcapacidades: string[],
    ) {}
}

export class PermisoRolUsuario {
    constructor(
        public ruta: string,
        public capacidades: CapacidadPermisoRolUsuario[],
    ) {}
}

export class RolUsuario {
    constructor(
        public _id?: string,
        public nombre?: string,
        public descripcion?: string,
        public permisos?: PermisoRolUsuario[],
        public super_admin?: boolean,
    ) {}
}
