import { Model } from "mongoose";
import { seleccionarCampoCualquierNivelProfundo } from "../../utils/general.utils";

/**
 * Agrega el campo 'text_search_value' utilizando los campos indicados en `campos`
 *
 * ## ATENCION
 * Debe agregarse este campo (text_search_value) en el esquema para el que se
 * use esta funcion.
 *
 * Esta funcion esta pensada para usarse en un post hook.
 *
 * @param documento El documento de mongo al cual agregarle el campo 'text_search_value'.
 * @param campos Nombres de los campos a usar.
 * @param modelo El modelo al que el documento en cuestion corresponde.
 * @param next La funcion next que proviene desde el post hook.
 * @param opciones Opciones extra para procesar el resultado o alterar el comportamiento de la funcion
 */
export async function create_text_search_field(
    documento: any,
    campos: string[],
    modelo: Model<any>,
    opciones: {
        usarComoFuncion?: boolean;
    } = {},
) {
    if (opciones?.usarComoFuncion === undefined) {
        opciones.usarComoFuncion = false;
    }
    try {
        /* Si el documento no tiene _id, probablemente
       no existe. De cualquier forma, no hacer nada si
       no tiene ese campo */
        if (!!documento?._id) {
            let documentoPopulado = null;
            if (!!opciones.usarComoFuncion) {
                try {
                    documentoPopulado = documento.toObject();
                } catch {
                    documentoPopulado = documento;
                }
            } else {
                try {
                    documentoPopulado = (
                        await modelo.findById(documento._id)
                    ).toObject();
                } catch {
                    documentoPopulado = await modelo.findById(documento._id);
                }
            }
            let busqueda = campos
                .map((un_campo) => {
                    let valor_campo = seleccionarCampoCualquierNivelProfundo(
                        documentoPopulado,
                        un_campo,
                        '.',
                    );
                    if (
                        Object.prototype.toString.call(valor_campo) ==
                        '[object Array]'
                    ) {
                        valor_campo = [...new Set(valor_campo)];
                        valor_campo = valor_campo.join(' ');
                    }
                    if (!!valor_campo) {
                        try {
                            return valor_campo.toString();
                        } catch {
                            return String(valor_campo);
                        }
                    }
                })
                .filter((x) => x !== undefined)
                .join(' ');
            if (!!opciones.usarComoFuncion) {
                return busqueda;
            } else {
                await modelo.updateOne(
                    { _id: documento._id },
                    { text_search_value: busqueda },
                );
            }
        }
    } catch (err: any) {
        console.log('ERROR: No se pudo crear un campo de busqueda');
        console.log(new Error(err));
        if (!!opciones.usarComoFuncion) {
            throw err;
        }
    }
}