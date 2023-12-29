import mongoose, { Schema, Model, Document } from "mongoose";

type Permiso = {
    ruta: string;
    tipo: ('post' | 'put' | 'get' | 'delete')[]
};

type RolDocument = Document & {
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

const Rol: Model<RolDocument> = mongoose.model<RolDocument>('Rol', rolSchema);
export { Rol, RolInput, RolDocument, Permiso }; 