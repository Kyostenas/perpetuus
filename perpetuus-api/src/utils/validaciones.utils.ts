export function validar_existencia_de_campos(campos: string[], objeto: any): {
    valido: boolean;
    mensaje: string;
} {
    let campos_no_encontrados = [];
    let todos_correctos = true;
    for (let i_campo = 0; i_campo < campos.length; i_campo++) {
        const un_campo = campos[i_campo];
        try {
            let encontrado = objeto[un_campo];
            if (!encontrado) {
                campos_no_encontrados.push(un_campo)
                todos_correctos = false
            }
        } catch (err) {
            campos_no_encontrados.push(un_campo)
            todos_correctos = false
        }
    }
    if (todos_correctos) return {
        valido: true,
        mensaje: 'correcto',
    };
    let campos_error = campos_no_encontrados.join(', ');
    let mensaje_error = `Se requiere ${campos_error}`;
    return {
        valido: false,
        mensaje: mensaje_error,
    }
}