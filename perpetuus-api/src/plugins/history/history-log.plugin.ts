import { DocumentType } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import mongoose, { CallbackError } from 'mongoose';
import { HISTORY_LOG_MODEL } from './history-log.model';
import { ACCIONES_MONGOOSE } from '../../utils/constantes.utils';
import { syslog as _syslog } from '../../utils/logs.utils';
const syslog = _syslog(module)
import jsonpatch from 'jsondiffpatch/formatters/jsonpatch'
import * as jsondiffpatch from 'jsondiffpatch'
const JSONDIFFPATCH_INSTANCE = jsondiffpatch.create({
    arrays: {
        detectMove: true,
        includeValueOnMove: true
    },
})

// (o==================================================================o)
//   #region VARIABLES (INICIO)
// (o-----------------------------------------------------------\/-----o)
interface HistoryLogOptions {
    // collection_name?: string;
    // excluded_fields?: string[];
    // forced_included_files?: string[];
}

let field_name_no_number: string[] | string = [];
let camposAExcluir: string[] = [];

// (o-----------------------------------------------------------/\-----o)
//   #endregion VARIABLES (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region PLUGIN (INICIO)
// (o-----------------------------------------------------------\/-----o)

function hystory_log_plugin<T>(
    schema: Schema<T>,
    options: HistoryLogOptions = {},
) {
    schema.pre(
        ACCIONES_MONGOOSE.SAVE,
        async function (
            this: DocumentType<T>,
            next: (err?: CallbackError) => void,
        ) {
            const metadata = this.metadata ?? { description: '' };
            generate_history_log(
                this,
                undefined,
                schema,
                options,
                ACCIONES_MONGOOSE.SAVE,
                metadata,
                next,
            );
        },
    );

    /* Store the state of the document before it's modified */
    schema.pre(
        ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
        async function (
            this: mongoose.Query<any, any>,
            next: (err?: CallbackError) => void,
        ) {
            const ORIGINAL_DOC = await this.model
                .findOne(this.getFilter())
                .lean();
            this._original_document = ORIGINAL_DOC;
            try {
                next();
            } catch {}
        },
    );

    /* Trigger history log */
    schema.post(
        ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
        async function (
            this: mongoose.Query<any, any>,
            next: (err?: CallbackError) => void,
        ) {
            const metadata = this.getOptions().metadata ?? { description: '' };
            const query = this.getQuery();
            const doc = await this.model.findOne(query);
            generate_history_log(
                doc,
                this,
                schema,
                options,
                ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
                metadata,
                next,
            );
        },
    );
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion PLUGIN (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region FUNCIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

async function generate_history_log<T>(
    document: DocumentType<T>,
    query: mongoose.Query<any, any> | undefined,
    schema: Schema<T>,
    options: HistoryLogOptions = {},
    operation_type: ValoresAnidadosRecursivosDeObjeto<
        typeof ACCIONES_MONGOOSE,
        string
    >,
    metadata: DocumentMetadata,
    next: any,
) {
    try {
        const doc = document;
        const ES_NUEVO = doc.isNew;
        const collection_name = document.collection.name;
        let previous_doc = null
        if (!!query) {
            previous_doc = query._original_document
        } else {
            previous_doc = JSON.parse(
                JSON.stringify(
                    ES_NUEVO
                        ? {}
                        : await doc.collection.findOne({
                              _id: new Types.ObjectId(<string>doc._id),
                          }),
                ),
            );
        }
        const new_doc = JSON.parse(JSON.stringify(doc));
        const DELTA = JSONDIFFPATCH_INSTANCE.diff(
            previous_doc, 
            new_doc
        )
        const JSON_PATCH = new jsonpatch().format(DELTA)
        const registroHistorial = new HISTORY_LOG_MODEL({
            user: metadata.user_id,
            collection_name: collection_name,
            modified_document_id: doc._id,
            log_type: ES_NUEVO ? 'CREADO' : 'MODIFICADO',
            delta: DELTA,
            movements: JSON_PATCH,
            operation_type,
            description: metadata.description,
            large_description: metadata.large_description,
        });
        await registroHistorial.save();
        try {
            next();
        } catch {}
    } catch (err: any) {
        try {
            next(
                new Error(
                    `No se pudo crear un registro de historial: ${err.message}`,
                ),
            );
        } catch (_err) {
            syslog.error(`Primero hubo un error: ${err}\nLuego otro: ${err}`)
        }
    }
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion FUNCIONES (FIN)
// (o==================================================================o)

export default hystory_log_plugin;
