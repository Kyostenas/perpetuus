import mongoose from "mongoose";
import { seleccionarCampoCualquierNivelSimple } from "../../utils/general.utils";
import { syslog as _syslog } from '../../utils/logs.utils';
const syslog = _syslog(module)

export async function crear_campo_busqueda(documento: any, campos: string[], modelo: mongoose.Model<any>) {
    try {
        const documento_populado = await modelo.findById(documento._id);
        let busqueda = campos.map(un_campo => {
            let valor_campo = seleccionarCampoCualquierNivelSimple(
                documento_populado, un_campo, '.'
            );
            if (Object.prototype.toString.call(valor_campo) == '[object Array]') {
                valor_campo = valor_campo.join(' ');
            }
            try {
                return valor_campo.toString();
            } catch {
                return String(valor_campo);
            }
        }).join(' ');
        await modelo.updateOne({ _id: documento._id }, { busqueda: busqueda })
    } catch (err) {
        syslog.error(`Hubo un error al crear un campo de busqueda`)
        syslog.error(`${err}`)
    }

}