// (o==================================================================o)
//   #region IMPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

/* IMPORTACIONES EXTERNAS */
import { Schema } from 'mongoose';
import {
    getModelForClass,
    Index,
    modelOptions,
    plugin,
    post,
    prop,
} from '@typegoose/typegoose';

/* UTILIDADES */
import { ACCIONES_MONGOOSE } from '../../utils/constantes.utils';
import { create_text_search_field } from '../../middlewares/text-search/text-search.middleware';

/* OTROS MODELOS */
import { auto_increment } from '../auto-increment/auto-increment.plugin';

// (o-----------------------------------------------------------/\-----o)
//   #endregion IMPORTACIONES (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region ESQUEMA (INICIO)
// (o-----------------------------------------------------------\/-----o)

@plugin(auto_increment, {field: 'sequence'})
@post<HistoryLog>(ACCIONES_MONGOOSE.SAVE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        HISTORY_LOG_MODEL,
    );
})
@post<HistoryLog>(ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        HISTORY_LOG_MODEL,
    );
})
@Index({text_search_value: 'text'}, {name: 'text_search_value'})
@modelOptions({
    schemaOptions: {
        collection: 'history_log',
        timestamps: true,
    },
})
class HistoryLog implements DocumentoGenerico {

    _id?: string | Schema.Types.ObjectId
    
    @prop()
    public sequence?: number;

    @prop({
        maxlength: [
            250,
            'El largo máximo para la descripción del movimiento es 250 caracteres',
        ],
    })
    public description?: string;

    @prop()
    public text_search_value?: string;

    @prop({ default: true})
    public is_active?: boolean;

    @prop({
        // required: [true, 'Se requiere el usuario que hace el movimiento'],
    })
    public user!: string

    @prop({
        required: [true, 'Se requiere el nombre de la colección'],
    })
    public collection_name!: string

    @prop({
        required: [true, 'El id del documento modificado es obligatorio'],
    })
    public modified_document_id!: string

    @prop({
        required: [true, 'El tipo de registro es necesario'],
        enum: {
            values: ['CREADO', 'MODIFICADO'],
            message: 'El tipo de registro "{VALUE}" no existe',
        },
    })
    public log_type!: string

    @prop({
        required: [true, 'Se requiere el tipo de operación']
    })
    public operation_type!: string

    @prop({_id: false, default: []})
    public movements: Movement[] = [];

    @prop()
    public large_description?: string;
}

class Movement {
    @prop({
        required: [true, 'Se requiere el nombre del campo del movimiento'],
    })
    public field_name!: string

    @prop()
    public previous_value!: any

    @prop({required: [true, 'No se puede crear un movimiento sin el valor nuevo']})
    public new_value: any | undefined

    @prop({
        required: [true, 'El tipo de movimiento es obligatorio'],
        enum: {
            values: ['crear', 'eliminar', 'editar'],
            message: 'El tipo de movimiento "{VALUE}" no existe',
        },
    })
    public movement_type!: string
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion ESQUEMA (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region BUSQUEDA (INICIO)
// (o-----------------------------------------------------------\/-----o)

const TEXT_SEARCH_FIELDS = [
    'sequence',
    'description',
    'user.nombres',
    'user.apellidos',
    'user.nombre_usuario',
    'collection',
    'operation_type'
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

const HISTORY_LOG_MODEL = getModelForClass(HistoryLog);
export { HISTORY_LOG_MODEL, HistoryLog };

// (o-----------------------------------------------------------/\-----o)
//   #endregion EXPORTACIONES (FIN)
// (o==================================================================o)
