import { Injectable, TemplateRef } from '@angular/core';

import { COLORES_BS_FONDO, COLORES_BS_TEXTO, POSICIONES_BS } from '../utilidades/utilidades.service';

@Injectable({
  providedIn: 'root'
})
export class ControlNotificacionesService {

  especificacion: EspecificacionNotificacion = {
    tipo: 'toast',
    duracionEnMs: 5000,
    cuerpoMensaje: '¡Hola! Esta es una notificación...',
    posicion: 'top_right',
    ancho: '18vw'
  }
  
  constructor() { }
}


interface EspecificacionNotificacion {
  tipo: 'toast' | 'alert' | 'modal',
  duracionEnMs: number
  cuerpoMensaje: String
  posicion: POSICIONES_BS
  ancho: string
  color?: COLORES_BS_FONDO | COLORES_BS_TEXTO,
  simbolo?: string,
  titulo?: string,
  cuerpoTemplate?: TemplateRef<any>
}