import mongoose, { Schema, Model, Document, mongo } from "mongoose";
import { PERMISOS_PERPETUUS } from "../../../config/roles/permisos-api.config";

// type Capacidad = {
//     metodo: ('post' | 'put' | 'get' | 'delete')[];
//     subcapacidades: string[];
// };

// type Permiso = {
//     ruta: string;
//     capacidades: Capacidad[];
    
// };

type RolDocument = Document & {
    _id: string;
    nombre: string;
    descripcion: string;
    permisos?: PERMISOS_PERPETUUS[];
    super_admin?: boolean;
    __v?: number;
};

type RolInput = {
    nombre: RolDocument['nombre'];
    descripcion: RolDocument['descripcion'];
    permisos?: RolDocument['permisos'];
    super_admin?: RolDocument['super_admin'];
};

const ROL_SCHEMA = new Schema(
    {
        super_admin: {
            type: Boolean,
            default: false,
        },
        nombre: {
            type: Schema.Types.String,
            required: [true, 'Nombre de rol requerido'],
            unique: true,
        },
        descripcion: {
            type: Schema.Types.String,
        },
        permisos: [{
            type: Schema.Types.String,
        }]
    },
    {
        collection: 'roles',
        timestamps: true,
    }
);

ROL_SCHEMA.index({ '$**': 'text' });


// (o==================================================================o)
//   POST MIDDLEWARE (INICIO)
// (o-----------------------------------------------------------\/-----o)


// (o-----------------------------------------------------------/\-----o)
//   POST MIDDLEWARE (FIN)
// (o==================================================================o)

const MODELO_ROL: Model<RolDocument> = mongoose.model<RolDocument>('Rol', ROL_SCHEMA);
export { MODELO_ROL as Rol, RolInput, RolDocument }; 