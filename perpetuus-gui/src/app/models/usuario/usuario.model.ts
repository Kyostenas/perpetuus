
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

export class UsuarioRecivir {
    constructor(
        public _id: string,
        public nombres?: string,
        public apellidos?: string,
        public nombre_usuario?: string,
        public correo?: string,
        public numero_celular?: string,
        public rol?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}

    get nombre_completo(): string {
        let nombres = this.nombres ?? '';
        let apellidos = this.apellidos ?? '';
        let nombre_completo = nombres.concat(apellidos);
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