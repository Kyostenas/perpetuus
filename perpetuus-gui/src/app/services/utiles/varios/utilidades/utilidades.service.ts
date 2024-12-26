// (o==================================================================o)
//   IMPORTACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

import { Injectable } from '@angular/core';
import ObjectID from 'bson-objectid';

import { URL_API } from 'src/app/config/config';

// (o-----------------------------------------------------------/\-----o)
//   IMPORTACIONES (FIN)
// (o==================================================================o)















// (o==================================================================o)
//   FECHA Y TIEMPO (INICIO)
// (o-----------------------------------------------------------\/-----o)

export const NOMBRES_MESES = {
  1: { largo: 'enero', corto: 'ene' },
  2: { largo: 'febrero', corto: 'feb' },
  3: { largo: 'marzo', corto: 'mar' },
  4: { largo: 'abril', corto: 'abr' },
  5: { largo: 'mayo', corto: 'may' },
  6: { largo: 'junio', corto: 'jun' },
  7: { largo: 'julio', corto: 'jul' },
  8: { largo: 'agosto', corto: 'ago' },
  9: { largo: 'septiembre', corto: 'sep' },
  10: { largo: 'octubre', corto: 'oct' },
  11: { largo: 'noviembre', corto: 'nov' },
  12: { largo: 'diciembre', corto: 'dic' },
}
export const NOMBRES_DIAS = {
  1: { largo: 'domingo', corto: 'dom' },
  2: { largo: 'lunes', corto: 'lun' },
  3: { largo: 'martes', corto: 'mar' },
  4: { largo: 'miércoles', corto: 'mié' },
  5: { largo: 'jueves', corto: 'jue' },
  6: { largo: 'viernes', corto: 'vie' },
  7: { largo: 'sábado', corto: 'sáb' },
}
export const ZONA_HORARIO_MEXICO = 'America/Mexico_City'
export const ZONA_HORARIA_MEXICO_UTC = 'GMT-06:00'
export const LOCALES_MEXICO = 'en-MX'

export const MILISEGUNDOS_SEGUNDO = 1000
export const MILISEGUNDOS_MINUTO = MILISEGUNDOS_SEGUNDO * 60
export const MILISEGUNDOS_HORA = MILISEGUNDOS_MINUTO * 60
export const MILISEGUNDOS_DIA = MILISEGUNDOS_HORA * 24
export const MILISEGUNDOS_SEMANA = MILISEGUNDOS_DIA * 7
export const MILISEGUNDOS_MES30 = MILISEGUNDOS_DIA * 30
export const MILISEGUNDOS_MES31 = MILISEGUNDOS_DIA * 31
export const MILISEGUNDOS_MES28 = MILISEGUNDOS_DIA * 28
export const MILISEGUNDOS_MES29 = MILISEGUNDOS_DIA * 29
export const MILISEGUNDOS_ANIO = MILISEGUNDOS_DIA * 365
export const MILISEGUNDOS_ANIOBIS = MILISEGUNDOS_DIA * 366

export const SEGUNDOS_MINUTO = 60
export const SEGUNDOS_HORA = SEGUNDOS_MINUTO * 60
export const SEGUNDOS_DIA = SEGUNDOS_HORA * 24
export const SEGUNDOS_SEMANA = SEGUNDOS_DIA * 7
export const SEGUNDOS_MES30 = SEGUNDOS_DIA * 30
export const SEGUNDOS_MES31 = SEGUNDOS_DIA * 31
export const SEGUNDOS_MES28 = SEGUNDOS_DIA * 28
export const SEGUNDOS_MES29 = SEGUNDOS_DIA * 29
export const SEGUNDOS_ANIO = SEGUNDOS_DIA * 365
export const SEGUNDOS_ANIOBIS = SEGUNDOS_DIA * 366

export const NOMBRE_CAMPO_USUARIO_LOCAL_STORAGE = 'usuario'
export const NOMBRE_CAMPO_ROL_LOCAL_STORAGE = 'rol_usuario'

// (o-----------------------------------------------------------/\-----o)
//   FECHA Y TIEMPO (FIN)
// (o==================================================================o)















// (o==================================================================o)
//   TIPOS BOOTSTRAP (INICIO)
// (o-----------------------------------------------------------\/-----o)


export type COLORES_BS_FONDO = 'bg-primary'
    | 'bg-primary-subtle'
    | 'bg-secondary'
    | 'bg-secondary-subtle'
    | 'bg-success'
    | 'bg-success-subtle'
    | 'bg-danger'
    | 'bg-danger-subtle'
    | 'bg-warning'
    | 'bg-warning-subtle'
    | 'bg-info'
    | 'bg-info-subtle'
    | 'bg-light'
    | 'bg-light-subtle'
    | 'bg-dark'
    | 'bg-dark-subtle'
    | 'bg-body-secondary'
    | 'bg-body-tertiary'
    | 'bg-body'
    | 'bg-black'
    | 'bg-white'
    | 'bg-transparent'

export type COLROES_BS_BORDES = 'border-primary'
    | 'border-primary'
    | 'border-secondary'
    | 'border-secondary'
    | 'border-success'
    | 'border-success'
    | 'border-danger'
    | 'border-danger'
    | 'border-warning'
    | 'border-warning'
    | 'border-info'
    | 'border-info'
    | 'border-light'
    | 'border-light'
    | 'border-dark'
    | 'border-dark'
    | 'border-black'
    | 'border-white'

export type COLORES_BS_TEXTO = 'text-primary'
    | 'text-primary-emphasis'
    | 'text-secondary'
    | 'text-secondary-emphasis'
    | 'text-success'
    | 'text-success-emphasis'
    | 'text-danger'
    | 'text-danger-emphasis'
    | 'text-warning'
    | 'text-warning-emphasis'
    | 'text-info'
    | 'text-info-emphasis'
    | 'text-light'
    | 'text-light-emphasis'
    | 'text-dark'
    | 'text-dark-emphasis'
    | 'text-body'
    | 'text-body-emphasis'
    | 'text-body-secondary'
    | 'text-body-tertiary'
    | 'text-black'
    | 'text-white'
    | 'text-black-50'
    | 'text-white-50'

export type POSICIONES_BS = 'top_left'
    | 'top_center'
    | 'top_right'
    | 'middle_left'
    | 'middle_center'
    | 'middle_right'
    | 'bottom_left'
    | 'bottom_center'
    | 'bottom_right'

export type COLORES_BS_ALERT = 'alert-primary'
    | 'alert-secondary'
    | 'alert-success'
    | 'alert-danger'
    | 'alert-warning'
    | 'alert-info'
    | 'alert-light'
    | 'alert-dark'

export const POSICIONES_BS_A_CLASES = {
  top_left: 'top-0 start-0',
  top_center: 'top-0 start-50 translate-middle-x',
  top_right: 'top-0 end-0',
  middle_left: 'top-50 start-0 translate-middle-y',
  middle_center: 'top-50 start-50 translate-middle',
  middle_right: 'top-50 end-0 translate-middle-y',
  bottom_left: 'bottom-0 start-0',
  bottom_center: 'bottom-0 start-50 translate-middle-x',
  bottom_right: 'bottom-0 end-0',
}

// (o-----------------------------------------------------------/\-----o)
//   TIPOS BOOTSTRAP (FIN)
// (o==================================================================o)















// (o==================================================================o)
//   VALIDACIONES (INICIO)
// (o-----------------------------------------------------------\/-----o)

export const REGEX_VALIDACION_CORREO = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g

// (o-----------------------------------------------------------/\-----o)
//   VALIDACIONES (FIN)
// (o==================================================================o)















@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  preparar_url_conexion_api(
    ruta: string[],
    parametros?: any,
  ) {
    const RUTA_FORMADA = ['', ...ruta].join('/');
    const URL_FORMADA = URL_API.concat(RUTA_FORMADA);
    console.warn(URL_FORMADA);
    return URL_FORMADA;
  }

  crear_bsonobj_id_para_variable() {
    return '_' + new ObjectID().toHexString();
  }

  consultar_local_storage(nombre_item: string): any {
    try {
      return JSON.parse(<string>localStorage.getItem(nombre_item))
    } catch {
      return {}
    }
  }

}
