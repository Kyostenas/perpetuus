export const ACCIONES_MONGOOSE = {
    AGGREGATE: 'aggregate',
    COUNT: 'count',
    COUNT_DOCUMENTS: 'countDocuments',
    DELETE_ONE: 'deleteOne',
    DELETE_MANY: 'deleteMany',
    ESTIMATED_DOCUMENT_COUNT: 'estimatedDocumentCount',
    FIND: 'find',
    FIND_BY_ID: 'findById',
    FIND_ONE: 'findOne',
    FIND_ONE_AND_DELETE: 'findOneAndDelete',
    FIND_ONE_AND_REMOVE: 'findOneAndRemove',
    FIND_ONE_AND_REPLACE: 'findOneAndReplace',
    FIND_ONE_AND_UPDATE: 'findOneAndUpdate',
    INIT: 'init',
    INSERT_MANY: 'insertMany',
    REMOVE: 'remove',
    REPLACE_ONE: 'replaceOne',
    SAVE: 'save',
    UPDATE: 'update',
    UPDATE_ONE: 'updateOne',
    UPDATE_MANY: 'updateMany',
    VALIDATE: 'validate',
}

export const TRADUCCIONES_ACCIONES_MONGOOSE = {
    aggregate: 'consultar de manera agrupada',
    count: 'contar',
    countDocuments: 'contar elementos',
    deleteOne: 'eliminar uno',
    deleteMany: 'eliminar varios',
    estimatedDocumentCount: 'contar de manera estimada elementos',
    find: 'encontrar',
    findById: 'encontrar por id',
    findOne: 'encontrar uno',
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
}

export const NOMBRE_ROL_SUPER_ADMIN = 'SUPER ADMINISTRADOR'
export const NOMBRE_USUARIO_SUPER_ADMIN = 'Super Usuario'
export const REGEX_VALIDACION_CORREO = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

