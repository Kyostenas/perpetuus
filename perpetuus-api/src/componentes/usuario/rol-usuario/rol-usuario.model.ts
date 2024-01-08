import mongoose, { Schema, Model, Document, mongo } from "mongoose";
import { crear_campo_busqueda } from "../../../middlewares/busqueda/campos_busqueda.middleware";
import { ACCIONES_MONGOOSE } from "../../../utils/constantes.utils";

type Capacidad = {
    metodo: ('post' | 'put' | 'get' | 'delete')[];
    subcapacidades: string[];
};

type Permiso = {
    ruta: string;
    capacidades: Capacidad[];
    
};

type RolDocument = Document & {
    busqueda: string;
    nombre: string;
    descripcion: string;
    permisos?: Permiso[];
    super_admin?: boolean;
};

type RolInput = {
    nombre: RolDocument['nombre'];
    descripcion: RolDocument['descripcion'];
    permisos?: RolDocument['permisos'];
    super_admin?: RolDocument['super_admin'];
};

const rol_schema = new Schema(
    {
        busqueda: String,
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
            ruta: {
                type: Schema.Types.String,
                required: [true, 'Nombre de ruta de permiso requerida'],             
            },
            capacidades: [{
                metodo: {
                    type: Schema.Types.String,
                    enum: ['post', 'put', 'get', 'delete'],
                    required: true,
                },
                subcapacidades: {
                    type: [ Schema.Types.String ]
                }
            }]
        }]
    },
    {
        collection: 'roles',
        timestamps: true,
    }
);


// (o==================================================================o)
//   POST MIDDLEWARE (INICIO)
// (o-----------------------------------------------------------\/-----o)

const CAMPOS_BUSQUEDA = [
    'nombre', 
    'descripcion',
    'permisos.ruta',
    'permisos.capacidades.metodo',
    'permisos.capacidades.subcapacidades',
];

rol_schema.post(
    <RegExp><unknown>ACCIONES_MONGOOSE.SAVE, 
    async function (doc: any, next: Function) {
        await crear_campo_busqueda(
            doc,
            CAMPOS_BUSQUEDA,
            MODELO_ROL,
        )
        next();
    }
);

rol_schema.post(
    <RegExp><unknown>ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
    async function (doc: any, next: Function) {
        await crear_campo_busqueda(
            doc,
            CAMPOS_BUSQUEDA,
            MODELO_ROL,
        )
        next();
    }
);

// (o-----------------------------------------------------------/\-----o)
//   POST MIDDLEWARE (FIN)
// (o==================================================================o)

const MODELO_ROL: Model<RolDocument> = mongoose.model<RolDocument>('Rol', rol_schema);
export { MODELO_ROL as Rol, RolInput, RolDocument, Permiso }; 