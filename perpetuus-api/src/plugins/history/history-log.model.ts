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
    prop,
    Ref,
} from '@typegoose/typegoose';

/* UTILIDADES */
import { auto_increment } from '../auto-increment/auto-increment.plugin';
import text_search_index, {
    TextSearchIndexOptions,
} from '../text-search-index/text-search-index.plugin';
import { ACCIONES_MONGOOSE } from '../../utils/constantes.utils';

/* OTROS MODELOS */
import { User } from '../../componentes/usuario/usuario/usuario.model';

// (o-----------------------------------------------------------/\-----o)
//   #endregion IMPORTACIONES (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region ESQUEMA (INICIO)
// (o-----------------------------------------------------------\/-----o)

// const TEXT_SEARCH_FIELDS = [
//     'sequence',
//     'description',
//     'user.nombres',
//     'user.apellidos',
//     'user.nombre_usuario',
//     'collection',
//     'operation_type',
// ];

// const PATHS_TO_POPULATE: TextSearchIndexOptions['paths_to_populate'] = [
//     {
//         path: 'user',
//     },
// ];

@plugin(auto_increment<typeof HISTORY_LOG_MODEL>, { field: 'sequence' })
// @plugin(text_search_index<typeof HISTORY_LOG_MODEL>, {
//     fields: TEXT_SEARCH_FIELDS,
//     paths_to_populate: PATHS_TO_POPULATE,
// })
@Index({user: 1}, {name: 'user'})
@Index({collection_name: 1}, {name: 'collection_name'})
@Index({modified_document_id: 1}, {name: 'modified_document_id'})
@modelOptions({
    schemaOptions: {
        collection: 'history_log',
        timestamps: true,
    },
})
class HistoryLog implements GenericDocument {
    _id?: string | Schema.Types.ObjectId;

    @prop({unique: true})
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

    @prop({ default: true })
    public is_active?: boolean;

    @prop({
        ref: () => User
    })
    public user?: Ref<User>;

    @prop({
        required: [true, 'Se requiere el nombre de la colección'],
    })
    public collection_name!: string;

    @prop({
        required: [true, 'El id del documento modificado es obligatorio'],
    })
    public modified_document_id!: string;

    @prop({
        enum: {
            values: Object.values(ACCIONES_MONGOOSE),
            message: 'La operación "{VALUE}" no existe'
        },
        required: [true, 'Se requiere el tipo de operación'],
    })
    public operation_type!: string;

    @prop({ _id: false, default: [] })
    public movements: Movement[] = [];

    @prop({
        required: [true, 'Se requiere el delta (los cambios hechos)'],
    })
    public delta!: any;

    @prop()
    public large_description?: string;
}

class Movement {
    @prop({
        required: [true, 'Se requiere el nombre del campo del movimiento'],
    })
    public path!: string;

    @prop()
    public from!: string;

    @prop({ required: [true, 'No se puede crear un movimiento sin su valor'] })
    public value: any;

    @prop({
        required: [true, 'El tipo de movimiento es obligatorio'],
        enum: {
            values: ['replace', 'remove', 'add', 'move'],
            message: 'El tipo de operación "{VALUE}" no existe',
        },
    })
    public op!: string;
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion ESQUEMA (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region EXPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

const HISTORY_LOG_MODEL = getModelForClass(HistoryLog);
export { HISTORY_LOG_MODEL, HistoryLog };

// (o-----------------------------------------------------------/\-----o)
//   #endregion EXPORTACIONES (FIN)
// (o==================================================================o)
