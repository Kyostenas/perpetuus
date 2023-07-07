import mongoose, { Schema, Model, Document } from "mongoose";

type RolDocument = Document & {
    nombre: string;
    descripcion: string;
};

type RolInput = {
    nombre: RolDocument['nombre'];
    descripcion: RolDocument['descripcion'];
};

const rolSchema = new Schema(
    {
        nombre: {
            type: Schema.Types.String,
            required: true,
            unique: true,
        },
        descripcion: {
            type: Schema.Types.String,
        },
    },
    {
        collecion: 'roles',
        timestamps: true,
    }
);

const Rol: Model<RolDocument> = mongoose.model<RolDocument>('Rol', rolSchema);
export { Rol, RolInput, RolDocument }; 