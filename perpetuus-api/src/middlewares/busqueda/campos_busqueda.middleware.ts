import { seleccionarCampoCualquierNivelSimple } from "../../utils/general.utils";

export async function crear_campo_busqueda(documento: any, campos: string[]) {
    let busqueda = campos.map(un_campo => {
        let valor_campo = seleccionarCampoCualquierNivelSimple(
            documento, un_campo, '.'
        );
        try {
            return valor_campo.toString();
        } catch {
            return String(valor_campo);
        }
    }).join(' ');
    documento.busqueda = busqueda
    await documento.save()
}