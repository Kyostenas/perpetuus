// (o==================================================================o)
//   #region IMPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

/* IMPORTACIONES EXTERNAS */
import { Schema } from "mongoose";
import { getModelForClass, modelOptions, plugin, post, pre, prop } from "@typegoose/typegoose";

/* UTILIDADES */
import { create_text_search_field } from '../../../middlewares/text-search/text-search.middleware';
import { arreglo_valores_profundos } from "../../../utils/general.utils";
import { PERMISOS_DISPONIBLES, PERMISOS_PERPETUUS } from "../../../config/roles/permisos-api.config";
import { ACCIONES_MONGOOSE } from "../../../utils/constantes.utils";

/* OTROS MODELOS */
import { auto_increment } from "../../../plugins/auto-increment/auto-increment.plugin";
import hystory_log_plugin from "../../../plugins/history/history-log.plugin";

// (o-----------------------------------------------------------/\-----o)
//   #endregion IMPORTACIONES (FIN)
// (o==================================================================o)


// (o==================================================================o)
//   #region ESQUEMA (INICIO)
// (o-----------------------------------------------------------\/-----o)

@plugin(hystory_log_plugin, {})
@plugin(auto_increment, {field: 'sequence'})
@post<Rol>(ACCIONES_MONGOOSE.SAVE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        ROL_MODEL,
    );
})
@post<Rol>(ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE, (rol) => {
    create_text_search_field(
        rol,
        TEXT_SEARCH_FIELDS,
        ROL_MODEL,
    );
})
@modelOptions({
    schemaOptions: {
        collection: 'roles',
        timestamps: true
    }
})
class Rol implements DocumentoGenerico {

    _id?: string | Schema.Types.ObjectId | undefined;
    
    @prop({unique: true})
    public sequence?: number;

    @prop()
    public description?: string;

    @prop()
    public text_search_value?: string;

    @prop({default: true})
    public is_active?: boolean;


    @prop({default: false})
    super_admin?: boolean

    @prop({
        required: [true, 'Nombre de rol requerido'],
        unique: true,
    })
    nombre!: string

    @prop({
        enum: {
            values: arreglo_valores_profundos(PERMISOS_DISPONIBLES),
            message: 'El permiso: "{value}" no existe'
        },
        type: () => [String],
        default: []
    })
    permisos?: PERMISOS_PERPETUUS[]
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
    'nombre',
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

const ROL_MODEL = getModelForClass(Rol)
export { ROL_MODEL, Rol }; 

// (o-----------------------------------------------------------/\-----o)
//   #endregion EXPORTACIONES (FIN)
// (o==================================================================o)
