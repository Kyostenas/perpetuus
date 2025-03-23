import { DocumentType, plugin } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import mongoose, { CallbackError } from 'mongoose';
import { detailedDiff } from 'deep-object-diff';
import { HISTORY_LOG_MODEL } from './history-log.model';
import {
    revisarTipo,
    seleccionarCampoCualquierNivelProfundo,
} from '../../utils/general.utils';
import { ACCIONES_MONGOOSE } from '../../utils/constantes.utils';

// (o==================================================================o)
//   #region VARIABLES (INICIO)
// (o-----------------------------------------------------------\/-----o)

const TRADUCCIONES: Record<string, string> = {
    aggregate: 'consultar de manera agrupada',
    count: 'contar',
    countDocuments: 'contar elementos',
    deleteOne: 'eliminar uno',
    deleteMany: 'eliminar varios',
    estimatedDocumentCount: 'contar de manera estimada elementos',
    find: 'encontrar',
    findOne: 'encontrar uno',
    findById: 'encontrar uno por id',
    findByIdAndUpdate: 'encontrar uno por id y actualizar',
    findOneAndDelete: 'encontrar uno y eliminar',
    findOneAndRemove: 'encontar uno y remover',
    findOneAndReplace: 'encontrar uno y reemplazar',
    findOneAndUpdate: 'encontrar uno y actualizar',
    init: 'inicializar',
    insertMany: 'insertar varios',
    remove: 'remover',
    replaceOne: 'reemplazar uno',
    save: 'crear',
    update: 'actualizar',
    updateOne: 'actualizar uno',
    updateMany: 'actualizar varios',
    validate: 'validar',
};

interface Movement {
    field_name: string[] | string;
    previous_value: any;
    new_value: any;
    movement_type: 'crear' | 'editar' | 'eliminar' | '';
}

interface HistoryLogOptions {
    // collection_name?: string;
    excluded_fields?: string[];
    forced_included_files?: string[];
}

let movement: Movement = {
    field_name: [],
    previous_value: null,
    new_value: null,
    movement_type: '',
};
let field_name_no_number: string[] | string = [];
let camposAExcluir: string[] = [];

// (o-----------------------------------------------------------/\-----o)
//   #endregion VARIABLES (FIN)
// (o==================================================================o)

// (o==================================================================o)
//   #region PLUGIN (INICIO)
// (o-----------------------------------------------------------\/-----o)

// (o-----------------------------------------------------------/\-----o)
//   #endregion PLUGIN (FIN)
// (o==================================================================o)

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
            const metadata = this.metadata ?? {description: ''};
            generate_history_log(
                this,
                schema,
                options,
                ACCIONES_MONGOOSE.SAVE,
                metadata,
                next,
            );
        },
    );
    schema.pre(
        ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
        async function (
            this: mongoose.Query<any, any>,
            next: (err?: CallbackError) => void,
        ) {
            const metadata = this.getOptions().metadata ?? {description: ''};
            const query = this.getQuery()
            const doc = await this.model.findOne(query)
            generate_history_log(
                doc,
                schema,
                options,
                ACCIONES_MONGOOSE.FIND_ONE_AND_UPDATE,
                metadata,
                next,
            );
        },
    );
}

// (o==================================================================o)
//   #region FUNCIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

async function generate_history_log<T>(
    _this: DocumentType<T>,
    schema: Schema<T>,
    options: HistoryLogOptions = {},
    operation_type: ValoresAnidadosRecursivosDeObjeto<
        typeof ACCIONES_MONGOOSE,
        string
    >,
    metadata: DocumentMetadata,
    next: any,
) {
    const {
        excluded_fields: excludedFields = ['_id'],
        forced_included_files: forcedIncludedFields = [],
    } = options;
    try {
        const doc = _this;
        camposAExcluir = [
            ...excludedFields,
            ...((doc as any).excludedFields || []),
        ].filter((campo) => !forcedIncludedFields.includes(String(campo)));

        // const metadata = doc.metadata ?? { user_id: null, description: '' };
        const nombreColeccion = _this.collection.name;
        const documentoAnterior = JSON.parse(
            JSON.stringify(
                doc.isNew
                    ? {}
                    : await doc.collection.findOne({
                          _id: new Types.ObjectId(<string>doc._id),
                      }),
            ),
        );
        const documentoNuevo = JSON.parse(JSON.stringify(doc));

        const diferencia = detailedDiff(documentoAnterior, documentoNuevo);
        const movements_done = [
            ...process_movements(diferencia.added, 'crear', documentoAnterior),
            ...process_movements(
                diferencia.deleted,
                'eliminar',
                documentoAnterior,
            ),
            ...process_movements(
                diferencia.updated,
                'editar',
                documentoAnterior,
            ),
        ].flat();

        if (movements_done.length > 0 || doc.isNew) {
            const registroHistorial = new HISTORY_LOG_MODEL({
                user: metadata.user_id,
                collection: nombreColeccion,
                modified_document_id: doc._id,
                log_type: doc.isNew ? 'CREADO' : 'MODIFICADO',
                movements: movements_done,
                operation_type,
                description: metadata.description,
                large_description: metadata.large_description,
            });
            await registroHistorial.save();
        }
        next();
    } catch (err: any) {
        console.log(err)
        next(
            new Error(
                `No se pudo crear un registro de historial: ${err.message}`,
            ),
        );
    }
}

function limpiarNuevoMovimiento(): void {
    field_name_no_number = [];
    movement = {
        field_name: [],
        previous_value: '',
        new_value: '',
        movement_type: '',
    };
}

function process_movements(
    objetoALeer: any,
    tipo: 'crear' | 'editar' | 'eliminar',
    original: any,
    recursivo = false,
    padre?: string,
): Movement[] {
    let movimientos: Movement[] = [];

    Object.entries(objetoALeer).forEach(([llave, valor]) => {
        if (camposAExcluir.includes(llave)) return;

        if (Array.isArray(movement.field_name)) {
            movement.field_name.push(llave);
        }

        if (
            typeof valor === 'object' &&
            !Array.isArray(valor) &&
            valor !== null
        ) {
            const campoPadre =
                movement.field_name[movement.field_name.length - 1] || llave;
            movimientos.push(
                ...process_movements(
                    objetoALeer[llave],
                    tipo,
                    original,
                    true,
                    campoPadre,
                ),
            );
            const indicePadre = movement.field_name.indexOf(campoPadre);
            movement.field_name = movement.field_name.slice(0, indicePadre);
        } else {
            const temporal = { ...movement };

            if (Array.isArray(movement.field_name)) {
                field_name_no_number = movement.field_name
                    .filter((campo) => !revisarTipo(campo, 'Number'))
                    .join('.');
                movement.field_name = movement.field_name.join('.');
            }
            movement.movement_type = tipo;
            movement.previous_value = seleccionarCampoCualquierNivelProfundo(
                original,
                movement.field_name,
                '.',
                {
                    reemplazoValorIndefinido: '',
                    valorError: '',
                    aplanarSubArreglos: true,
                },
            );

            if (revisarTipo(movement.previous_value, 'Array')) {
                movement.previous_value = movement.previous_value.filter(
                    (v: any) => v !== '',
                );
                if (movement.previous_value.length === 0)
                    delete movement.previous_value;
            }

            if (typeof field_name_no_number === 'string') {
                if (camposAExcluir.includes(field_name_no_number)) return;
            }

            movement.new_value = valor;
            movimientos.push({ ...movement });
            limpiarNuevoMovimiento();

            if (recursivo && typeof temporal.field_name === 'string') {
                movement.field_name = temporal.field_name
                    .split('.')
                    .slice(0, -1);
            }
        }
    });

    return movimientos;
}

// (o-----------------------------------------------------------/\-----o)
//   #endregion FUNCIONES (FIN)
// (o==================================================================o)

export default hystory_log_plugin;
