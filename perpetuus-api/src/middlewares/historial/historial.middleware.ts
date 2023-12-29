// import objdiff from 'deep-object-diff'
// import mongoose from "mongoose"
// const db = mongoose.connection
// import Mongoose from 'mongoose'
// const ObjectID = Mongoose.Types.ObjectId
// // import { seleccionarCampoCualquierNivel } from '../../utils/varios'
// // import RegistroHistorial from '../../models/historial/registroHistorial.model'

// let usuario = ''

// const ACCIONES = {
//     AGGREGATE: 'aggregate',
//     COUNT: 'count',
//     COUNT_DOCUMENTS: 'countDocuments',
//     DELETE_ONE: 'deleteOne',
//     DELETE_MANY: 'deleteMany',
//     ESTIMATED_DOCUMENT_COUNT: 'estimatedDocumentCount',
//     FIND: 'find',
//     FIND_ONE: 'findOne',
//     FIND_ONE_AND_DELETE: 'findOneAndDelete',
//     FIND_ONE_AND_REMOVE: 'findOneAndRemove',
//     FIND_ONE_AND_REPLACE: 'findOneAndReplace',
//     FIND_ONE_AND_UPDATE: 'findOneAndUpdate',
//     INIT: 'init',
//     INSERT_MANY: 'insertMany',
//     REMOVE: 'remove',
//     REPLACE_ONE: 'replaceOne',
//     SAVE: 'save',
//     UPDATE: 'update',
//     UPDATE_ONE: 'updateOne',
//     UPDATE_MANY: 'updateMany',
//     VALIDATE: 'validate',
// }

// const TRADUCCIONES = {
//     aggregate: 'consultar de manera agrupada',
//     count: 'contar',
//     countDocuments: 'contar elementos',
//     deleteOne: 'eliminar uno',
//     deleteMany: 'eliminar varios',
//     estimatedDocumentCount: 'contar de manera estimada elementos',
//     find: 'encontrar',
//     findOne: 'encontrar uno',
//     findOneAndDelete: 'encontrar uno y eliminar',
//     findOneAndRemove: 'encontar uno y remover',
//     findOneAndReplace: 'encontrar uno y reemplazar',
//     findOneAndUpdate: 'encontrar uno y actualizar',
//     init: 'inicializar',
//     insertMany: 'insertar varios',
//     remove: 'remover',
//     replaceOne: 'reemplazar uno',
//     save: 'crear',
//     update: 'actualizar',
//     updateOne: 'actualizar uno',
//     updateMany: 'actualizar varios',
//     validate: 'validar',
// }




// let nuevoMovimiento = {
//     nombreCampo: [],
//     valorAnterior: '',
//     valorNuevo: '',
//     tipoMovimiento: ''
// }

// function limpiarNuevoMovimiento() {
//     nuevoMovimiento = {
//         nombreCampo: [],
//         valorAnterior: '',
//         valorNuevo: '',
//         tipoMovimiento: ''
//     }
// }

// /**
//  * Al usar `deep-object-diff` y hacer por ejemplo:
//  * ```
//  * const objdiff = require('deep-object-diff')
//  * 
//  * let diferencia = objdiff.detailedDiff(documentoAnterior, documentoNuevo)
//  * console.log(diferencia)
//  * ```
//  * 
//  * arroja un objeto de forma similar a:
//  * ```
//  * {
//  *   added: [Object: null prototype] { tipoDeProducto: 'MATERIA PRIMA' },
//  *   deleted: [Object: null prototype] {},
//  *   updated: [Object: null prototype] {
//  *     codigoInterno: 'sdf',
//  *     codigoProveedor: 'el crisolss',
//  *     observaciones: '__'
//  *   }
//  * }
//  * ```
//  * 
//  * Entonces, esta función solo puede recibir uno de los tres objetos que contiene:
//  * `added`, `deleted` o `updated`.
//  * 
//  * Lo que resulta son los movimientos registrados en esos objetos procesados en un
//  * arreglo listos para agregarse al registro de historial (en el campo `movimientos`)
//  * 
//  * @param {any} [objetoALeer] Un objeto de 3 específicamente generado por `deep-object-diff`
//  * @param {'editar' | 'crear' | 'eliminar'} [tipo] El nombre del tipo de movimiento
//  * @param {any} [original] El documento antes de ser modificado
//  * @param {boolean} [recursivo=false] **[NO USAR]** Indica si la función esta siendo usada recursivamente
//  * @param {string} [padre=undefined] **[NO USAR]** Nombre del campo padre si hay recursividad
//  * @returns {{
//  *    nombreCampo: [],
//  *    valorAnterior: '',
//  *    valorNuevo: '',
//  *    tipoMovimiento: ''
//  * }[]} Un arreglo con los movimientos preparados
//  */
// function procesarMovimientos(
//     objetoALeer: any, 
//     tipo: 'editar' | 'crear' | 'eliminar', 
//     original: any, 
//     recursivo: boolean = false, 
//     padre: any = undefined
// ) {
//     let movimientos: any = []

//     // Ciclar sobre las entradas del objeto
//     Object.entries(objetoALeer).map(entrada => {

//         let llave = entrada[0]
//         let valor = entrada[1]

//         // Guardar en un arreglo el nombre del campo
//         // de la entrada.
//         // Si se usa la recursividad, se guarda el campo
//         // de adentro en el siguiente espacio.
//         nuevoMovimiento.nombreCampo.push(llave)

//         // Ver si el campo es objeto
//         if (
//             typeof valor === 'object' &&
//             !Array.isArray(valor) &&
//             valor !== null
//         ) {
//             let campoPadre = nuevoMovimiento.nombreCampo[
//                 nuevoMovimiento.nombreCampo.length - 1
//             ]
//             if (!campoPadre) campoPadre = llave

//             // Si es objeto llamar a la misma función para plicar 
//             // recursividad y procesar campos profundos, pasando 
//             // el objeto en el campo en lugar del objetoALeer
//             movimientos.push(
//                 procesarMovimientos(
//                     objetoALeer[llave], 
//                     tipo, 
//                     original,
//                     true,
//                     campoPadre,
//                 )
//             )
//             let indicePadre = nuevoMovimiento.nombreCampo.indexOf(campoPadre)
//             nuevoMovimiento.nombreCampo = 
//                 nuevoMovimiento.nombreCampo.slice(0, indicePadre)
//         } else {
//             let temporal = nuevoMovimiento

//             // Si no es objeto llenar nuevo movimiento, agregar
//             // al arreglo de movimientos y limpiar objeto plantilla
//             nuevoMovimiento.nombreCampo = 
//                 nuevoMovimiento.nombreCampo.join('.')
//             nuevoMovimiento.tipoMovimiento = tipo
//             nuevoMovimiento.valorAnterior = 
//                 seleccionarCampoCualquierNivel(
//                     original,
//                     nuevoMovimiento.nombreCampo,
//                     '.'
//                 )
//             nuevoMovimiento.valorNuevo = valor
//             movimientos.push(nuevoMovimiento)

//             // limpar objeto plantilla del movimiento
//             limpiarNuevoMovimiento()

//             // Si hay recursión
//             if (recursivo) {
//                 nuevoMovimiento.nombreCampo = 
//                     temporal.nombreCampo.split('.').slice(0, -1)
//             }
//         }
//     })
//     return movimientos
// }

// /**
//  * ### ATENCIÓN
//  * 
//  * Para ser usado únicamente como `post` middleware de algún Schema de
//  * mongoose
//  * 
//  * ---
//  * 
//  * Crea un registro de historial con el `_id` del documento y del usuario
//  * que realiza el movimiento en la coleccion historiales
//  * 
//  * @param {any} [documento] El documento que se modificó o creó
//  * @param {function} [next] Función next del middleware post
//  * @param {Mongoose.Schema} [schema] El schema de mongo que se está trabajando
//  * @param {string} [accion] El nombre de la acción realizada (el nombre del post middleware)
//  * @returns {void}
//  */
// async function crearRegistroCambioModeloPost(documento, next, schema, accion) {
//     try {
//         // Si el nombre de la acción no existe, no hacer nada
//         if (!Object.values(ACCIONES).includes(accion)) return
    
//         // Marcar el documento recibido desde el "post middelware" como el
//         // original (anterior)
//         let documentoAnterior = JSON.parse(JSON.stringify(documento))
    
//         // Extraer el nombre de la coleccion desde la propiedad "options" del Schema
//         // que se recibe desde el "post middelware". Usar ese nombre conectar a esta misma
//         const nombreColeccion = schema.options.collection
//         const coleccion = db.collection(nombreColeccion)
//         // Traer todos los documentos de la colección como arreglo
//         let documentos = await coleccion.find().toArray()
//         // Filtrar solo el documento que tenga el mismo "_id" que el recién
//         // modificado
//         let documentoNuevo = JSON.parse(JSON.stringify(documentos.filter(
//             doc => String(doc._id) == String(documentoAnterior._id)
//         )[0]))
    
//         // Utilizar la libreria "deep-object-diff" para encontrar de manera
//         // detallada las diferencias entre el documento original (anterior) y el 
//         // modificado (nuevo)
//         let diferencia = objdiff.detailedDiff(documentoAnterior, documentoNuevo)
    
//         // Procesar los movimientos del registro
//         let added = JSON.parse(JSON.stringify(diferencia.added))
//         let deleted = JSON.parse(JSON.stringify(diferencia.deleted))
//         let updated = JSON.parse(JSON.stringify(diferencia.updated))
//         let creaciones = procesarMovimientos(added, 'crear', documentoAnterior)
//         let eliminaciones = procesarMovimientos(deleted, 'eliminar', documentoAnterior)
//         let ediciones = procesarMovimientos(updated, 'editar', documentoAnterior)
    
//         // Guardar todos los movimientos en un arreglo aplanado 
//         let movimientosHechos = [...creaciones, ...eliminaciones, ...ediciones].flat(20)
        
//         // Guardar el registro
//         let registroHistorial = new RegistroHistorial()
//         registroHistorial.usuario = usuario
//         registroHistorial.nombreColeccion = nombreColeccion
//         registroHistorial.idElementoModificado = documento._id
//         registroHistorial.tipoAccion = TRADUCCIONES[accion]
//         registroHistorial.movimientos = movimientosHechos
//         await registroHistorial.save()
//     } catch(err) {
//         console.log(new Error(`Algo salió mal al registrar un cambio en el historial: ${err}`))
//     }

//     // Llamar a next para que no se quede atorado aquí
//     next()
// }

// /**
//  * ### ATENCIÓN
//  * 
//  * Solo debe ser usado como middleware en los endpoints
//  * 
//  * ---
//  * 
//  * Esta función va a obtener el usuario desde el
//  * request al recibir una petición en algún endpoint
//  * y va a guardarlo en una variable en este
//  * modulo (`historial`).
//  */
// function prepararUsuario(req, res, next) {
//     // Guardar el usuario que viene en el request en la
//     // variable usuario declarada afuera de todas las funciones
//     usuario = new ObjectID(req.user._id)

//     // Llamar a next para que no se quede atorado aquí
//     next()
// }


// module.exports = {
//     ACCIONES,
//     crearRegistroCambioModeloPost,
//     prepararUsuario,
// }
















//     //  NO BORRAR ===== 

//     // let otro = procesarMovimientos({
//     //     codigoInterno: 'sdf',
//     //     codigoProveedor: 'el crisolss',
//     //     observaciones: {
//     //         amira2: {
//     //             b: 14,
//     //             c: 17,
//     //             otromas: {
//     //                 d: false
//     //             }
//     //         },
//     //         jeje: '__',
//     //         amira: {
//     //             b: 14,
//     //             otromas_: {
//     //                 otromas2: {
//     //                     otromas3: {
//     //                         d: false
//     //                     }
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }, 'ver', {
//     //     codigoInterno: 'sdfasdf',
//     //     codigoProveedor: 'ss__',
//     //     observaciones: {
//     //         jeje: '12__',
//     //         amira: {
//     //             b: 1
//     //         }
//     //     }
//     // })