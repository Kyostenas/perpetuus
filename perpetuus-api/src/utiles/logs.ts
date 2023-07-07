const reset =           '\x1b[0m';
const fore = {
    _black:             '\x1b[0;30m',
    _red:               '\x1b[0;31m',
    _green:             '\x1b[0;32m',
    _yellow:            '\x1b[0;33m',
    _blue:              '\x1b[0;34m',
    _purple:            '\x1b[0;35m',
    _cyan:              '\x1b[0;36m',
    _white:             '\x1b[0;37m',
    bold_black:         '\x1b[1;30m',
    bold_red:           '\x1b[1;31m',
    bold_green:         '\x1b[1;32m',
    bold_yellow:        '\x1b[1;33m',
    bold_blue:          '\x1b[1;34m',
    bold_purple:        '\x1b[1;35m',
    bold_cyan:          '\x1b[1;36m',
    bold_white:         '\x1b[1;37m',
    sub_black:          '\x1b[4;30m',
    sub_red:            '\x1b[4;31m',
    sub_green:          '\x1b[4;32m',
    sub_yellow:         '\x1b[4;33m',
    sub_blue:           '\x1b[4;34m',
    sub_purple:         '\x1b[4;35m',
    sub_cyan:           '\x1b[4;36m',
    sub_white:          '\x1b[4;37m',
    strong_black:       '\x1b[0;90m',
    strong_red:         '\x1b[0;91m',
    strong_green:       '\x1b[0;92m',
    strong_yellow:      '\x1b[0;93m',
    strong_blue:        '\x1b[0;94m',
    strong_purple:      '\x1b[0;95m',
    strong_cyan:        '\x1b[0;96m',
    strong_white:       '\x1b[0;97m',
    bold_strong_black:  '\x1b[1;90m',
    bold_strong_red:    '\x1b[1;91m',
    bold_strong_green:  '\x1b[1;92m',
    bold_strong_yellow: '\x1b[1;93m',
    bold_strong_blue:   '\x1b[1;94m',
    bold_strong_purple: '\x1b[1;95m',
    bold_strong_cyan:   '\x1b[1;96m',
    bold_strong_white:  '\x1b[1;97m',
};
const back = {
    _black:              '\x1b[40m',
    _red:                '\x1b[41m',
    _green:              '\x1b[42m',
    _yellow:             '\x1b[43m',
    _blue:               '\x1b[44m',
    _purple:             '\x1b[45m',
    _cyan:               '\x1b[46m',
    _white:              '\x1b[47m',
    strong_black:        '\x1b[0;100m',
    strong_red:          '\x1b[0;101m',
    strong_green:        '\x1b[0;102m',
    strong_yellow:       '\x1b[0;103m',
    strong_blue:         '\x1b[0;104m',
    strong_purple:       '\x1b[0;105m',
    strong_cyan:         '\x1b[0;106m',
    strong_white:        '\x1b[0;107m',
};

import path from 'path';
import { NOMBRES_FECHA } from './nombres_fecha';



function obtener_nombre_archivo_origen(origen: string) {
    return path.basename(origen, path.extname(origen));
}

function aplicar_color_a_archivo_origen(texto: string, color: string) {
    let revised = obtener_nombre_archivo_origen(texto)
    return `${color}[${revised}]${reset}`;
}

function aplicar_colo_a_prefijo(texto: string, color: string) {
    let revised = obtener_nombre_archivo_origen(texto)
    return `${color}(${revised})${reset}`;
}

function aplicar_color(texto: string, color: string) {
    return `${color}${texto}${reset}`;
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

const INFO =    'INFO';
const NOTICE =  'NOTI';
const WARNING = 'WARN';
const DANGER =  ' ERR';
const SUCCESS = '  OK';


/*(o==================================================================o)
    SECCION DE COLORES (INICIO)
    para imprimir mensajes en consola
  (o-----------------------------------------------------------\/-----o)*/

function info(origen: string, texto: string): string {
    let prefijo = aplicar_colo_a_prefijo(
        INFO, fore._black + back._cyan
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._black + back._cyan
    );
    let texto_con_color = aplicar_color(
        texto, fore._cyan
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function notice(origen: string, texto: string): string {
    let prefijo = aplicar_colo_a_prefijo(
        NOTICE, back._purple
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, back._purple
    );
    let texto_con_color = aplicar_color(
        texto, fore.strong_purple
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function warning(origen: string, texto: string): string {
    let prefijo = aplicar_colo_a_prefijo(
        WARNING, fore._black + back._yellow
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._black + back._yellow
    );
    let texto_con_color = aplicar_color(
        texto, fore.strong_yellow
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function danger(origen: string, texto: string): string {
    let prefijo = aplicar_colo_a_prefijo(
        DANGER, fore.bold_white + back._red
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.bold_white + back._red
    );
    let texto_con_color = aplicar_color(
        texto, fore.strong_red
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function success(origen: string, texto: string): string {
    let prefijo = aplicar_colo_a_prefijo(
        SUCCESS, fore._black + back._green
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._black + back._green
    );
    let texto_con_color = aplicar_color(
        texto, fore._green
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function _info_quiet(origen: string, texto: string, negritas=false): string {
    let prefijo = aplicar_colo_a_prefijo(
        INFO, fore._cyan + back._black
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._cyan + back._black
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}
function _notice_quiet(origen: string, texto: string, negritas=false): string {
    let prefijo = aplicar_colo_a_prefijo(
        NOTICE, fore.strong_purple + back._black
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_purple + back._black
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function _warning_quiet(origen: string, texto: string, negritas=false): string {
    let prefijo = aplicar_colo_a_prefijo(
        WARNING, fore.strong_yellow + back._black
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_yellow + back._black
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function _danger_quiet(origen: string, texto: string, negritas=false): string {
    let prefijo = aplicar_colo_a_prefijo(
        DANGER, fore.strong_red + back._black
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore.strong_red + back._black
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function _success_quiet(origen: string, texto: string, negritas=false): string {
    let prefijo = aplicar_colo_a_prefijo(
        SUCCESS, fore._green + back._black
    );
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._green + back._black
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${prefijo} ${traza_con_color} ${texto_con_color}`;
}

function _neutral_log(origen: string, texto: string, negritas=false): string {
    let traza_con_color = aplicar_color_a_archivo_origen(
        origen, fore._black + back._white
    );
    let blanco = '';
    if (negritas) {
        blanco = fore.bold_white;
    } else {
        blanco = fore._white;
    }
    let texto_con_color = aplicar_color(
        texto, blanco
    );
    return `${traza_con_color} ${texto_con_color}`;
}

function _http_request(tipo: string, contenido: string) {
    let contenido_con_color = aplicar_color(
        contenido, fore._cyan
    );
    let nuevo_log = _timestamp_log(tipo, contenido_con_color);
    console.log(nuevo_log);
}

function _timestamp_log(tipo: string, contenido: string) {
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
    let fecha_formateada = `${nombre_mes} ${dia_mes}, ${year}, ${hora_formateada}`;

    let fecha_con_clor = aplicar_color(
        fecha_formateada, fore.strong_black 
    );
    let tipo_con_color = aplicar_color(
        `[${tipo}]`, fore._black + back._white
    );

    return `${fecha_con_clor} ${tipo_con_color} ${contenido}`;

}

function log(tipo: string, contenido: string) {
    let nuevo_log = _timestamp_log(tipo, contenido);
    console.log(nuevo_log);
}


// (o-----------------------------------------( OBJETO CONTENEDOR ))

export const syslog = {
    log: function(origen: string, texto: string) {log('LOG', _neutral_log(origen, texto))},
    info: function(origen: string, texto: string) {log('LOG', info(origen, texto))},
    notice: function(origen: string, texto: string) {log('LOG', notice(origen, texto))},
    warning: function(origen: string, texto: string) {log('LOG', warning(origen, texto))},
    danger: function(origen: string, texto: string) {log('LOG', danger(origen, texto))},
    success: function(origen: string, texto: string) {log('LOG', success(origen, texto))},
    _info_quiet: function(origen: string, texto: string) {log('LOG', _info_quiet(origen, texto))},
    _notice_quiet: function(origen: string, texto: string) {log('LOG', _notice_quiet(origen, texto))},
    _warning_quiet: function(origen: string, texto: string) {log('LOG', _warning_quiet(origen, texto))},
    _danger_quiet: function(origen: string, texto: string) {log('LOG', _danger_quiet(origen, texto))},
    _success_quiet: function(origen: string, texto: string) {log('LOG', _success_quiet(origen, texto))},
    __request: function(tipo_request: string, direccion: string) {_http_request(tipo_request, direccion)}
};


/*(o-----------------------------------------------------------/\-----o)
    SECCION DE COLORES (FIN)
  (o==================================================================o)*/
  
