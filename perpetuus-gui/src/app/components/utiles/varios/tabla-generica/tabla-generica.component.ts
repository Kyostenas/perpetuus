import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, Pipe, TemplateRef } from '@angular/core';
import { BootstrapDropdownDirective } from 'src/app/directives/utiles/varios/bootsrap-dropdown/bootstrap-dropdown.directive';
import { BootstrapTooltipDirective } from 'src/app/directives/utiles/varios/bootstrap-tooltip/bootstrap-tooltip.directive';
import { PipeDinamicoPipe } from 'src/app/pipes/utiles/pipe-dinamico/pipe-dinamico.pipe';
import { UtilidadesService } from 'src/app/services/utiles/varios/utilidades/utilidades.service';

@Component({
  selector: 'app-tabla-generica',
  imports: [
    BootstrapDropdownDirective,
    BootstrapTooltipDirective,
    CommonModule,
    PipeDinamicoPipe,
  ],
  templateUrl: './tabla-generica.component.html',
  styleUrl: './tabla-generica.component.scss'
})
export class TablaGenericaComponent implements OnInit {

  constructor(
    private utiles: UtilidadesService
  ) {

  } 

  ngOnInit(): void {
    this.detectar_movil
  }

  // (o==================================================================o)
  //   #region VARIABLES (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  // (o-----------------------------------------( INPUTS Y OUTPUTS ))

  @Input('datos_tabla') datos_tabla!: OPCIONES_TABLA_GENERICA
  @Output('ordenes_columnas') emisor_ordenes_columnas: EventEmitter<typeof this.ordenes_columnas> = new EventEmitter()

  // (o-----------------------------------------( SOLO VARIABLES ))
   
  modo: 'tabla' | 'columnas' = 'tabla'
  ordenes_columnas: {[type: string]: {orden: 1 | -1, campo: string, titulo: string}}= {}
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion VARIABLES (FIN)
  // (o==================================================================o)

  // (o==================================================================o)
  //   #region RESPONSIVIDAD MOVIL (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  @HostListener('window:resize')
  detectar_movil() {
    let en_disp_movil = this.utiles
      .detectar_dispositivo()
    this.modo = en_disp_movil? 'columnas' : 'tabla'
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion RESPONSIVIDAD MOVIL (FIN)
  // (o==================================================================o)

  // (o==================================================================o)
  //   #region ORDENAMIENTO DE COLUMNAS (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  ordenar_ascendente(campo_columna: string, nombre_real: string) {
    this.ordenes_columnas[campo_columna] = {
      campo: campo_columna,
      titulo: nombre_real,
      orden: -1
    }
    this.emitir_ordenamiento()
  }

  ordenar_descendente(campo_columna: string, nombre_real: string) {
    this.ordenes_columnas[campo_columna] = {
      campo: campo_columna,
      titulo: nombre_real,
      orden:  1
    }
    this.emitir_ordenamiento()
  }

  no_ordenar(campo_columna: string) {
    delete this.ordenes_columnas[campo_columna]
    this.emitir_ordenamiento()
  }

  emitir_ordenamiento() {
    this.emisor_ordenes_columnas.emit(this.ordenes_columnas)
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion ORDENAMIENTO DE COLUMNAS (FIN)
  // (o==================================================================o)
  
}

export interface COLUMNA_TABLA_GENERICA {
  alineacion?: 'izquierda' | 'centro' | 'derecha',
  tooltip_encabezado?: TOOLTIP_TABLA_GENERICA,
  evitar_deteccion_de_click?: boolean,
  contenido: CONTENIDO_TABLA_GENERICA,
  titulo: string,
}

export interface TOOLTIP_TABLA_GENERICA {
  contenido?: string,
  callback_contenido?: any,
  pipe?: Pipe,
  pipe_args?: any[],
  template_tooltip?: TemplateRef<any>,
}

export interface CONTENIDO_TABLA_GENERICA {
  callback_clase?: any,
  template?: TemplateRef<any>
  callback?: any,
  pipe?: Pipe,
  pipe_args?: any[],
  campo: string,
  tooltip?: TOOLTIP_TABLA_GENERICA,
}

export interface OPCIONES_FILA_TABLA_GENERICA {
  
}

export interface OPCIONES_TABLA_GENERICA {
  opciones_fila?: OPCIONES_FILA_TABLA_GENERICA,
  titulo?: string,
  sub_titulo?: string,
  posicion_sub_titulo?: 'inicio' | 'fin',
  mostrar_paginador?: boolean,
  mostrar_buscador?: boolean,
  mostrar_botones?: {
    todo?: boolean
    modo?: boolean,
    copia_portapapeles?: boolean,
    descarga_excel?: boolean,
    descarga_pdf?: boolean,
  },
  mostrar_ordenadores?: boolean,
  mostrar_seleccionador_layout?: boolean,
  mostrar_indice_fila?: boolean,
  columnas: COLUMNA_TABLA_GENERICA[],
  documentos: any[],
}