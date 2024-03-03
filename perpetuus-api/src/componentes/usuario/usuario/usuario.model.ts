import mongoose, { Schema, Model, Document } from 'mongoose';

import { validar_correo } from "../../../utils/validaciones.utils";
import { RolDocument } from "../rol-usuario/rol-usuario.model";
import { ACCIONES_MONGOOSE } from '../../../utils/constantes.utils';

type UsuarioDocument = Document & {
    nombres: string;
    apellidos: string;
    nombre_usuario: string;
    correo: string;
    contrasena: string;
    numero_celular?: string;
    rol?: RolDocument;
};

type UsuarioInput = {
    nombres: UsuarioDocument['nombres'];
    apellidos: UsuarioDocument['apellidos'];
    nombre_usuario: UsuarioDocument['nombre_usuario'];
    correo: UsuarioDocument['correo'];
    contrasena: UsuarioDocument['contrasena'];
    numero_celular?: UsuarioDocument['numero_celular'];
    rol?: string;
};


const USUARIO_SCHEMA = new Schema(
    {
        nombres: {
            type: Schema.Types.String,
            required: [true, 'Se require el nombre del usuario'],
        },
        apellidos: {
            type: Schema.Types.String,
            required: [true, 'Se requiren los apellidos del usuario'],
        },
        nombre_usuario: {
            type: Schema.Types.String,
            required: [true, 'Se requiere nombre de usuario'],
            maxLength: [50, 'El tamaño máximo del usuario es de 50 caracteres'],
            minLength: [3, 'El tamaño mínimo del usuario es de 3 caracteres'],
            unique: true,
            uniqueCaseInsensitive: true,            
        },
        contrasena: {
            type: Schema.Types.String,
            required: [true, 'Se requiere una contraseña'],
        },
        correo: {
            type: Schema.Types.String,
            validate: [validar_correo, 'Correo no válido'],
            // required: [true, 'Se requiere un correo'],
            // unique: true,
            uniqueCaseInsensitive: true,
        },
        numero_celular: {
            type: Schema.Types.String,
        },
        rol: {
            type: Schema.Types.ObjectId,
            ref: 'Rol',
        },
        rfrsh_tkn: {
            type: Schema.Types.String,
        },
        rfrsh_tkn_validity: {
            type: Schema.Types.Date
        }
    },
    {
        collection: 'usuarios',
        timestamps: true,
    }
);
    
USUARIO_SCHEMA.index({ '$**': 'text' });


// (o==================================================================o)
//   MIDDLEWARE (INICIO)
// (o-----------------------------------------------------------\/-----o)

function popular(query: any, next: any) {
    query.populate('rol');
    next();
}

USUARIO_SCHEMA.pre(RegExp(ACCIONES_MONGOOSE.FIND), 
    function (this: any, next: any) { popular(this, next) }
);
USUARIO_SCHEMA.pre(RegExp(ACCIONES_MONGOOSE.FIND_ONE), 
    function (this: any, next: any) { popular(this, next) }
);
USUARIO_SCHEMA.pre(RegExp(ACCIONES_MONGOOSE.FIND_BY_ID), 
    function (this: any, next: any) { popular(this, next) }
);

// (o-----------------------------------------------------------/\-----o)
//   MIDDLEWARE (FIN)
// (o==================================================================o)



const MODELO_USUARIO: Model<UsuarioDocument> = 
    mongoose.model<UsuarioDocument>('Usuario', USUARIO_SCHEMA);
export { MODELO_USUARIO as Usuario, UsuarioInput, UsuarioDocument};