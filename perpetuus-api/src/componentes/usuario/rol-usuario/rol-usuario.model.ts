import mongoose, { Schema, Model, Document } from "mongoose";
import { crear_campo_busqueda } from "../../../middlewares/busqueda/campos_busqueda.middleware";

type Capacidad = {
    metodo: ('post' | 'put' | 'get' | 'delete')[];
    subcapacidades: string[];
};

type Permiso = {
    ruta: string;
    capacidades: Capacidad[];
};

type RolDocument = Document & {
    busqueda: String;
    nombre: string;
    descripcion: string;
    permisos: Permiso[];
};

type RolInput = {
    nombre: RolDocument['nombre'];
    descripcion: RolDocument['descripcion'];
    permisos: RolDocument['permisos'];
};

const rolSchema = new Schema(
    {
        busqueda: String,
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
                required: [true, 'Nombre de permiso requerido'],             
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

rolSchema.post('save', async function (doc: any, next: Function) {
    await crear_campo_busqueda(
        doc,
        ['nombre', 'descripcion']
    )
    next();
});

const Rol: Model<RolDocument> = mongoose.model<RolDocument>('Rol', rolSchema);
export { Rol, RolInput, RolDocument, Permiso }; 