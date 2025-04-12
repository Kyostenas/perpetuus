import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    computed,
    effect,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Pipe,
    signal,
    TemplateRef,
    WritableSignal,
} from '@angular/core';
import { BootstrapDropdownDirective } from 'src/app/directives/utiles/varios/bootsrap-dropdown/bootstrap-dropdown.directive';
import { BootstrapTooltipDirective } from 'src/app/directives/utiles/varios/bootstrap-tooltip/bootstrap-tooltip.directive';
import { PipeDinamicoPipe } from 'src/app/pipes/utiles/pipe-dinamico/pipe-dinamico.pipe';
import { ControlQueriesUrlService } from 'src/app/services/utiles/estructurales/control-queries-url/control-queries-url.service';
import { DeteccionViewportService } from 'src/app/services/utiles/estructurales/deteccion-viewport/deteccion-viewport.service';
import { UtilidadesService } from 'src/app/services/utiles/varios/utilidades/utilidades.service';
import { DeepKeys, Paginacion } from 'src/app/utiles/tipos-personalizados';
import { PaginadorGenericoComponent } from '../paginador-generico/paginador-generico.component';

@Component({
    selector: 'app-tabla-generica',
    imports: [
        BootstrapDropdownDirective,
        BootstrapTooltipDirective,
        CommonModule,
        PipeDinamicoPipe,
        PaginadorGenericoComponent,
    ],
    templateUrl: './tabla-generica.component.html',
    styleUrl: './tabla-generica.component.scss',
})
export class TablaGenericaComponent implements OnInit, OnDestroy {
    constructor(
        private utiles: UtilidadesService,
        private viewport: DeteccionViewportService,
        private cdr: ChangeDetectorRef,
        private control_queries: ControlQueriesUrlService
    ) {
        // this.control_queries.queries.paginacion.accion.definir()
        // this.control_queries.queries.filtros<Paginacion>().accion.definir()
        effect(() => {
            const QUERY_OBTENIDA =
                this.control_queries.query_actual().paginacion;
            this.detallePaginacion.update((value) => QUERY_OBTENIDA);
            this.emisor_paginacion.emit(QUERY_OBTENIDA);
        });
    }

    ngOnInit(): void {
        if (!this.control_queries.query_actual().paginacion) {
            const QUERY_DEFECTO = {
                limite: 5,
                desde: 0,
                pagina_actual: 1,
                total_elementos: 0,
                total_de_paginas: 0,
                campos_ordenamiento: {},
            };
            this.detallePaginacion.update((value) => QUERY_DEFECTO);
            this.emisor_paginacion.emit(QUERY_DEFECTO);
            this.control_queries.queries.paginacion.accion.definir(
                QUERY_DEFECTO
            );
        } else {
            const QUERY_OBTENIDA =
                this.control_queries.query_actual().paginacion;
            this.detallePaginacion.update((value) => QUERY_OBTENIDA);
            this.emisor_paginacion.emit(QUERY_OBTENIDA);
        }
    }

    ngOnDestroy(): void {
        this.control_queries.queries.paginacion.accion.ocultar();
    }

    // (o==================================================================o)
    //   #region VARIABLES (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    // (o-----------------------------------------( INPUTS Y OUTPUTS ))

    datos_tabla: WritableSignal<OPCIONES_TABLA_GENERICA<any>> = signal({
        columnas: [],
        documentos: [],
    });
    columnas_computed = computed(() => this.datos_tabla().columnas);
    @Input('datos_tabla')
    set _datos_tabla(datos: OPCIONES_TABLA_GENERICA<any>) {
        this.sobreescribir_valores_por_defecto(datos);
        this.datos_tabla.update((current_value) => ({
            ...current_value,
            ...datos,
        }));
    }
    @Input('documentos') documentos: any[] = [];
    @Output('paginacion')
    emisor_paginacion: EventEmitter<Paginacion> = new EventEmitter();
    @Output('click_fila')
    emisor_click_fila: EventEmitter<OPCIONES_FILA_TABLA_GENERICA> =
        new EventEmitter();

    // (o-----------------------------------------( SOLO VARIABLES ))

    modo: WritableSignal<'tabla' | 'columnas'> =
        this.viewport.modo_tabla_generica;
    modo_viewport: WritableSignal<'movil' | 'escritorio'> =
        this.viewport.modo_viewport;
    ordenes_columnas: WritableSignal<Paginacion['campos_ordenamiento']> =
        signal({});
    // datos_tabla!: OPCIONES_TABLA_GENERICA
    detallePaginacion: WritableSignal<Paginacion> = signal({
        desde: 0,
        limite: 5,
        pagina_actual: 1,
        total_elementos: 0,
        total_de_paginas: 0,
        campos_ordenamiento: {},
    });

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion VARIABLES (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region ORDENAMIENTO DE COLUMNAS (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    ordenar_ascendente(campo_columna: string, nombre_real: string) {
        this.ordenes_columnas.update((value: any) => {
            value[campo_columna] = {
                campo: campo_columna,
                titulo: nombre_real,
                orden: -1,
            };
            return value;
        });
        this.emitir_ordenamiento();
    }

    ordenar_descendente(campo_columna: string, nombre_real: string) {
        this.ordenes_columnas.update((value: any) => {
            value[campo_columna] = {
                campo: campo_columna,
                titulo: nombre_real,
                orden: 1,
            };
            return value;
        });
        this.emitir_ordenamiento();
    }

    no_ordenar(campo_columna: string) {
        this.ordenes_columnas.update((value: any) => {
            delete value[campo_columna];
            return value;
        });
        this.emitir_ordenamiento();
    }

    emitir_ordenamiento() {
        let paginacion: Paginacion = {
            ...this.detallePaginacion(),
            campos_ordenamiento: this.ordenes_columnas(),
        };
        this.detallePaginacion.update((value) => paginacion);
        this.control_queries.queries.paginacion.accion.definir(paginacion);
        this.emisor_paginacion.emit(paginacion);
    }

    resultado_paginacion_paginador(resultado_paginacion: Paginacion) {
        let paginacion: Paginacion = {
            ...resultado_paginacion,
            campos_ordenamiento: this.ordenes_columnas(),
        };
        // this.detallePaginacion.update((value) => paginacion);
        this.control_queries.queries.paginacion.accion.definir(paginacion);
        // this.emisor_paginacion.emit(paginacion);
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion ORDENAMIENTO DE COLUMNAS (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region ACCIONES TABLA (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    definir_modo(modo: 'tabla' | 'columnas') {
        this.modo.update(() => modo);
    }

    definir_cantidad_columnas(cantidad: 1 | 2 | 3 | 4 | 5 = 3) {}

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion ACCIONES TABLA (FIN)
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region VALORES POR DEFECTO (INICIO)
    // (o-----------------------------------------------------------\/-----o)

    sobreescribir_valores_por_defecto(datos: OPCIONES_TABLA_GENERICA<any>) {
        this.si_no_existe(datos, 'mostrar_boton_seleccion', false);
        this.si_no_existe(datos, 'mostrar_boton_copia_portapapeles', true);
        this.si_no_existe(datos, 'mostrar_boton_descarga_excel', true);
        this.si_no_existe(datos, 'mostrar_boton_descarga_pdf', true);
        this.si_no_existe(datos, 'mostrar_boton_layout', true);
        this.si_no_existe(datos, 'mostrar_indice_fila', false);
        this.si_no_existe(datos, 'mostrar_paginador', true);
        this.si_no_existe(datos, 'mostrar_buscador', true);
        this.si_no_existe(datos, 'posicion_sub_titulo', 'bottom');
        this.si_no_existe(datos, 'mostrar_ordenadores', true);
    }

    si_no_existe(datos: any, valor_buscar: string, reemplazo_por_si_no: any) {
        if (
            !(datos[valor_buscar] !== undefined && datos[valor_buscar] !== null)
        ) {
            datos[valor_buscar] = reemplazo_por_si_no;
        }
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion VALORES POR DEFECTO (FIN)
    // (o==================================================================o)
}

export interface CLICK_FILA_TABLA_GENERICA {}

export interface COLUMNA_TABLA_GENERICA<OBJETO> {
    alineacion?: 'izquierda' | 'centro' | 'derecha';
    tooltip_encabezado?: TOOLTIP_TABLA_GENERICA;
    evitar_deteccion_de_click?: boolean;
    contenido: CONTENIDO_TABLA_GENERICA<OBJETO>;
    titulo: string;
}

export interface TOOLTIP_TABLA_GENERICA {
    contenido?: string;
    callback_contenido?: any;
    pipe?: Pipe;
    pipe_args?: any[];
    template_tooltip?: TemplateRef<any>;
}

export interface CONTENIDO_TABLA_GENERICA<OBJETO> {
    callback_clase?: any;
    template?: TemplateRef<any>;
    callback?: any;
    pipe?: Pipe;
    pipe_args?: any[];
    campo: DeepKeys<OBJETO>;
    tooltip?: TOOLTIP_TABLA_GENERICA;
}

export interface OPCIONES_FILA_TABLA_GENERICA {
    i_fila: number;
    documento: any;
}

export interface OPCIONES_TABLA_GENERICA<OBJETO> {
    opciones_fila?: OPCIONES_FILA_TABLA_GENERICA;
    titulo?: string;
    sub_titulo?: string;
    posicion_sub_titulo?: 'inicio' | 'fin';
    mostrar_paginador?: boolean;
    mostrar_buscador?: boolean;
    mostrar_boton_seleccion?: boolean;
    mostrar_boton_copia_portapapeles?: boolean;
    mostrar_boton_descarga_excel?: boolean;
    mostrar_boton_descarga_pdf?: boolean;
    mostrar_boton_layout?: boolean;
    mostrar_indice_fila?: boolean;
    mostrar_ordenadores?: boolean;
    columnas: COLUMNA_TABLA_GENERICA<OBJETO>[];
}
