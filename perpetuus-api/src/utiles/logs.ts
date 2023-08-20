const reset = '\x1b[0m';
const fore = {
    _black: '\x1b[0;30m',
    _red: '\x1b[0;31m',
    _green: '\x1b[0;32m',
    _yellow: '\x1b[0;33m',
    _blue: '\x1b[0;34m',
    _purple: '\x1b[0;35m',
    _cyan: '\x1b[0;36m',
    _white: '\x1b[0;37m',
    bold_black: '\x1b[1;30m',
    bold_red: '\x1b[1;31m',
    bold_green: '\x1b[1;32m',
    bold_yellow: '\x1b[1;33m',
    bold_blue: '\x1b[1;34m',
    bold_purple: '\x1b[1;35m',
    bold_cyan: '\x1b[1;36m',
    bold_white: '\x1b[1;37m',
    sub_black: '\x1b[4;30m',
    sub_red: '\x1b[4;31m',
    sub_green: '\x1b[4;32m',
    sub_yellow: '\x1b[4;33m',
    sub_blue: '\x1b[4;34m',
    sub_purple: '\x1b[4;35m',
    sub_cyan: '\x1b[4;36m',
    sub_white: '\x1b[4;37m',
    strong_black: '\x1b[0;90m',
    strong_red: '\x1b[0;91m',
    strong_green: '\x1b[0;92m',
    strong_yellow: '\x1b[0;93m',
    strong_blue: '\x1b[0;94m',
    strong_purple: '\x1b[0;95m',
    strong_cyan: '\x1b[0;96m',
    strong_white: '\x1b[0;97m',
    bold_strong_black: '\x1b[1;90m',
    bold_strong_red: '\x1b[1;91m',
    bold_strong_green: '\x1b[1;92m',
    bold_strong_yellow: '\x1b[1;93m',
    bold_strong_blue: '\x1b[1;94m',
    bold_strong_purple: '\x1b[1;95m',
    bold_strong_cyan: '\x1b[1;96m',
    bold_strong_white: '\x1b[1;97m',
};
const back = {
    _black: '\x1b[40m',
    _red: '\x1b[41m',
    _green: '\x1b[42m',
    _yellow: '\x1b[43m',
    _blue: '\x1b[44m',
    _purple: '\x1b[45m',
    _cyan: '\x1b[46m',
    _white: '\x1b[47m',
    strong_black: '\x1b[0;100m',
    strong_red: '\x1b[0;101m',
    strong_green: '\x1b[0;102m',
    strong_yellow: '\x1b[0;103m',
    strong_blue: '\x1b[0;104m',
    strong_purple: '\x1b[0;105m',
    strong_cyan: '\x1b[0;106m',
    strong_white: '\x1b[0;107m',
};

import path from 'path';
import { NOMBRES_FECHA } from './nombres_fecha';
import { limpiar_codigos_ansi, partcion_arbitraria_arreglo } from './utiles_generales';



function obtener_nombre_archivo_origen(origen: string) {
    return path.basename(origen, path.extname(origen));
}

function aplicar_color_a_archivo_origen(texto: string, color: string): texto_color {
    let revised = obtener_nombre_archivo_origen(texto)
    let texto_color = `[${color}${revised}${reset}]`
    let tam_texto = `[${revised}]`.length
    return {texto: texto_color, tam_texto};
}

function aplicar_colo_a_prefijo(texto: string, color: string): texto_color {
    let revised = obtener_nombre_archivo_origen(texto)
    let texto_color = `(${color}${revised}${reset})`
    let tam_texto = `(${revised})`.length
    return {texto: texto_color, tam_texto};
}

function aplicar_color(texto: string, color: string): texto_color {
    let texto_color = `${color}${texto}${reset}`
    let tam_texto = `${texto}`.length
    return {texto: texto_color, tam_texto};
}

function formatear_ceros(numero: number, cantidad_ceros: number) {
    let tam = String(numero).length;
    if (tam < cantidad_ceros) {
        let ceros = '0'.repeat(cantidad_ceros - tam);
        return `${ceros}${numero}`;
    } else {
        return numero;
    }
}

const INFO = 'INFO';
const NOTICE = 'NOTICE';
const WARNING = 'WARNING';
const DANGER = 'ERROR';
const SUCCESS = 'OK';

const TAM_PRED_CONSOLA = 90
const TAM_CONSOLA: number = (process.stdout.columns ?? TAM_PRED_CONSOLA) - 1
const TAM_MINIMO_CONTENIDO = 70


/*(o==================================================================o)
    SECCION DE COLORES (INICIO)
    para imprimir mensajes en consola
  (o-----------------------------------------------------------\/-----o)*/

function info(origen: string, texto: string): texto_color {
    let prefijo = aplicar_colo_a_prefijo(
        INFO, fore._cyan
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_cyan
    );
    let texto_final = `${prefijo.texto} ${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = prefijo.tam_texto + traza_con_color.tam_texto + texto.length + 2
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function notice(origen: string, texto: string): texto_color {
    let prefijo = aplicar_colo_a_prefijo(
        NOTICE, fore._purple
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_purple
    );
    let texto_final = `${prefijo.texto} ${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = prefijo.tam_texto + traza_con_color.tam_texto + texto.length + 2
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function warning(origen: string, texto: string): texto_color {
    let prefijo = aplicar_colo_a_prefijo(
        WARNING, fore._yellow
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_yellow
    );
    let texto_final = `${prefijo.texto} ${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = prefijo.tam_texto + traza_con_color.tam_texto + texto.length + 2
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function danger(origen: string, texto: string): texto_color {
    let prefijo = aplicar_colo_a_prefijo(
        DANGER, fore._red
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_red
    );
    let texto_final = `${prefijo.texto} ${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = prefijo.tam_texto + traza_con_color.tam_texto + texto.length + 2
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function success(origen: string, texto: string): texto_color {
    let prefijo = aplicar_colo_a_prefijo(
        SUCCESS, fore._green
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_green
    );
    let texto_final = `${prefijo.texto} ${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = prefijo.tam_texto + traza_con_color.tam_texto + texto.length + 2
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function _neutral_log(origen: string, texto: string, negritas = false): texto_color {
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._white
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_final = `${traza_con_color.texto} ${texto}`;
    let tam_tx_fnl = texto_final.length
    return {texto: texto_final, tam_texto: tam_tx_fnl};
}

function _http_request(tipo: string, contenido: string) {
    let contenido_con_color = aplicar_color(
        contenido, fore._cyan
    );
    
    let nuevo_log = _timestamp_log(
        tipo, 
        contenido_con_color.texto,
        contenido_con_color.tam_texto,
        fore._black + back._cyan
    );
    console.log(nuevo_log.texto);
}

function _timestamp_log(
    tipo: string, 
    contenido: string, 
    tam_contenido: number = 0,
    color_personalizado_tipo: string = '-',
    color_personalizado_fecha: string = '-',
): texto_color {
    let fecha = new Date();
    let dia_semana = fecha.getDay();
    let dia_mes = fecha.getDate();
    let nombre_dia = NOMBRES_FECHA.dias[dia_semana];
    let mes = fecha.getMonth();
    let nombre_mes = NOMBRES_FECHA.meses[mes];
    let year = fecha.getFullYear();
    let hora = formatear_ceros(fecha.getHours(), 2);
    let minutos = formatear_ceros(fecha.getMinutes(), 2);
    let segundos = formatear_ceros(fecha.getSeconds(), 2);
    let hora_formateada = `${hora}:${minutos}:${segundos}`;
    let fecha_formateada = `${year}/${mes}/${dia_mes} ${hora_formateada}`;

    let fecha_con_clor: texto_color;
    if (color_personalizado_fecha !== '-') {
        fecha_con_clor = aplicar_color(
            fecha_formateada, color_personalizado_fecha
        );
    } else {
        fecha_con_clor = aplicar_color(
            fecha_formateada, fore.strong_black
        );
    }

    let tipo_con_color: texto_color;
    if (color_personalizado_tipo !== '-') {
        tipo_con_color = aplicar_color(
            `[${tipo}]`, color_personalizado_tipo
        );
    } else {
        tipo_con_color = aplicar_color(
            `[${tipo}]`, fore._black + back._white
        );
    }

    let texto_a_color = `${fecha_con_clor.texto} ${tipo_con_color.texto} ${contenido}`;
    let tam_texto = fecha_con_clor.tam_texto + tipo_con_color.tam_texto + tam_contenido + 2;
    let tam_traza = fecha_con_clor.tam_texto + tipo_con_color.tam_texto + 1;

    return {texto: texto_a_color, tam_texto, tam_traza};

}

function ajustar_a_tam_consola(
    solo_contenido: string, 
    contenido_y_traza: string,
    tam_contenido_y_traza_sin_color: number,
    tam_traza_sin_color: number = 0,
) {
    let log_a_usar = [contenido_y_traza]

    let tam_contenido_orig = solo_contenido.length
    let tam_cont_traz_orig = contenido_y_traza.length
    let tam_partes = TAM_CONSOLA - tam_traza_sin_color - 1
    
    if (tam_contenido_y_traza_sin_color > TAM_CONSOLA && tam_partes > TAM_MINIMO_CONTENIDO) {
        let partes_particion = [];
        let a_reducir = tam_contenido_y_traza_sin_color - TAM_CONSOLA;
        let contador_tam_restante_contenido = solo_contenido.length
        while (a_reducir > 0 &&
            (contador_tam_restante_contenido > TAM_MINIMO_CONTENIDO)
        ) {
            partes_particion.push(tam_partes)
            a_reducir -= tam_partes;
            contador_tam_restante_contenido -= tam_partes
        }
        partes_particion.push(contador_tam_restante_contenido)
        let partes_obtenidas = partcion_arbitraria_arreglo(
            solo_contenido.split(''),
            partes_particion
        )
        log_a_usar = partes_obtenidas
            .map(una_parte => una_parte.join(''))
        console.log(log_a_usar)
    }
    return log_a_usar
}

function log(
    tipo: string,
    funcion: any,
    origen: string,
    texto: string,
    multilinea: boolean = false,
    separador: string = '\n'
) {
    if (multilinea) {
        let lineas = texto.split(separador)
        for (let iLinea = 0; iLinea < lineas.length; iLinea++) {
            const linea = lineas[iLinea];
            let texto_color: texto_color = funcion(origen, linea);
            let contenido = texto_color.texto;
            let tam_contenido_sin_color = texto_color.tam_texto;
            let log_completo = _timestamp_log(tipo, contenido, tam_contenido_sin_color);
            let logs_ajustados = ajustar_a_tam_consola(
                contenido, 
                log_completo.texto,
                log_completo.tam_texto,
                log_completo.tam_traza
            );
            logs_ajustados.map(un_log => {
                // let log_completo_imprimir = _timestamp_log(tipo, un_log);
                // console.log(log_completo_imprimir.texto);
                console.log(un_log)
            });
        }
    } else {
        let texto_color: texto_color = funcion(origen, texto);
        let contenido = texto_color.texto
        let tam_contenido_sin_color = texto_color.tam_texto;
        let log_completo = _timestamp_log(tipo, contenido, tam_contenido_sin_color);
        let logs_ajustados = ajustar_a_tam_consola(
            contenido, 
            log_completo.texto,
            log_completo.tam_texto,
            log_completo.tam_traza,
        )
        logs_ajustados.map(un_log => {
            let log_completo_imprimir = _timestamp_log(tipo, un_log)
            console.log(log_completo_imprimir);
        })
    }
}


interface texto_color {
    texto: string;
    tam_texto: number;
    tam_traza?: number;
}



// (o-----------------------------------------( OBJETO CONTENEDOR ))

export const syslog = {
    log: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', _neutral_log, origen, texto, multilinea, separador) },
    info: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', info, origen, texto, multilinea, separador) },
    notice: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', notice, origen, texto, multilinea, separador) },
    warning: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', warning, origen, texto, multilinea, separador) },
    danger: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', danger, origen, texto, multilinea, separador) },
    success: function (
        origen: string,
        texto: string,
        multilinea: boolean = true,
        separador: string = '\n'
    ) { log('LOG', success, origen, texto, multilinea, separador) },
    __request: function (
        tipo_request: string, direccion: string
    ) { _http_request(tipo_request, direccion) }
};


/*(o-----------------------------------------------------------/\-----o)
    SECCION DE COLORES (FIN)
  (o==================================================================o)*/

