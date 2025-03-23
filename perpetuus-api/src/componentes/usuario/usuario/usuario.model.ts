// (o==================================================================o)
//   #region IMPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

/* IMPORTACIONES EXTERNAS */
import { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;
import {
    getModelForClass,
    Index,
    modelOptions,
    plugin,
    post,
    prop,
    Ref,
} from '@typegoose/typegoose';

/* UTILIDADES */
import { validar_correo } from '../../../utils/validaciones.utils';
import { ACCIONES_MONGOOSE } from '../../../utils/constantes.utils';
import { create_text_search_field } from '../../../middlewares/text-search/text-search.middleware';

/* OTROS MODELOS */
import { Rol } from '../rol-usuario/rol-usuario.model';
import { auto_increment } from '../../../plugins/auto-increment/auto-increment.plugin';
import hystory_log_plugin from '../../../plugins/history/history-log.plugin';

// (o-----------------------------------------------------------/\-----o)
//   #endregion IMPORTACIONES (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region ESQUEMA (INICIO)
// (o-----------------------------------------------------------\/-----o)

@plugin(hystory_log_plugin, {})
@plugin(auto_increment, {field: 'sequence'})
@post<User>(ACCIONES_MONGOOSE.SAVE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        USER_MODEL,
    );
})
@post<User>(ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        USER_MODEL,
    );
})
@Index({text_search_value: 'text'}, {name: 'text_search_value'})
@modelOptions({
    schemaOptions: {
        collection: 'users',
        timestamps: true,
    },
})
class User implements DocumentoGenerico {

    _id?: string | Schema.Types.ObjectId | undefined;
    
    @prop({ unique: true })
    public sequence?: number;

    @prop()
    public description?: string;

    @prop()
    public text_search_value?: string;

    @prop({ default: true })
    public is_active?: boolean;
    

    @prop({ required: [true, 'Se requiere el nombre del usuario'] })
    public nombres!: string;

    @prop({ required: [true, 'Se requiren los apellidos del usuario'] })
    public apellidos!: string;

    @prop({
        required: [true, 'Se requiere nombre de usuario'],
        maxLength: [50, 'El tamaño máximo del usuario es de 50 caracteres'],
        minLength: [3, 'El tamaño mínimo del usuario es de 3 caracteres'],
        unique: true,
        options: {
            uniqueCaseInsensitive: true,
        },
    })
    public nombre_usuario!: string;

    @prop({ required: [true, 'Se requiere una contraseña'] })
    public contrasena!: string;

    @prop({
        validate: [validar_correo, 'Correo no válido'],
        options: {
            uniqueCaseInsensitive: true,
        },
        required: [true, 'Se requiere un correo'],
    })
    public correo!: string;

    @prop()
    public numero_celular?: string;

    @prop({ ref: () => Rol })
    public rol?: Ref<Rol>;

    @prop({ type: ObjectId })
    rfrsh_tkn?: string;

    @prop()
    rfrsh_tkn_validity?: Date;
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion ESQUEMA (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region BUSQUEDA (INICIO)
// (o-----------------------------------------------------------\/-----o)

const TEXT_SEARCH_FIELDS = [
    'description',
    'sequence',
    'nombres',
    'apellidos',
    'nombre_usuario',
    'correo',
    'numero_celular',
];

// (o-----------------------------------------------------------/\-----o)
//   #endregion BUSQUEDA (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region HISTORIAL (INICIO)
// (o-----------------------------------------------------------\/-----o)

// (o-----------------------------------------------------------/\-----o)
//   #endregion HISTORIAL (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region EXPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

const USER_MODEL = getModelForClass(User);
export { USER_MODEL, User };

// (o-----------------------------------------------------------/\-----o)
//   #endregion EXPORTACIONES (FIN)
// (o==================================================================o)
