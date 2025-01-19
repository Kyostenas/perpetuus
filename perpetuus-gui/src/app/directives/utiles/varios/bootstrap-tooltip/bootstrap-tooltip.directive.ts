import { ChangeDetectorRef, Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit, Renderer2, TemplateRef } from '@angular/core';
import { Tooltip } from 'bootstrap';
import { UtilidadesService } from 'src/app/services/utiles/varios/utilidades/utilidades.service';

@Directive({
  selector: '[bs-tooltip]'
})
export class BootstrapTooltipDirective implements OnInit, OnDestroy {
  
  // (o==================================================================o)
  //   #region INICIALIZACION (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  constructor(
    private el: ElementRef,
    // private renderer: Renderer2,
    // private cdr: ChangeDetectorRef,
    // private utiles: UtilidadesService,
  ) { }

  ngOnInit(): void {
    this.construir_tooltip()
  }

  ngOnDestroy(): void {
    this.destruir_tooltip() 
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion INICIALIZACION (FIN)
  // (o==================================================================o)
  
  // (o==================================================================o)
  //   #region INPUTS, OUTPUTS Y VARIABLES (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  @Input('bs-tooltip') contenido!: string
  @Input('plantilla') plantilla!: TemplateRef<any>
  @Input('clase_tooltip') clase: 'tooltip-primary'
    | 'tooltip-secondary'
    | 'tooltip-success'
    | 'tooltip-info'
    | 'tooltip-warning'
    | 'tooltip-danger'
    | 'tooltip-light'
    | 'tooltip-dark'
    | 'tooltip-black'
    | 'tooltip-white' = 'tooltip-black'
  @Input('posicion') posicion: 'top' 
    | 'left' 
    | 'right' 
    | 'bottom' = 'bottom'

  private elemento_padre!: HTMLElement
  private tooltip?: Tooltip
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion INPUTS, OUTPUTS Y VARIABLES (FIN)
  // (o==================================================================o)
  
  // (o==================================================================o)
  //   #region PROCESAMIENTO DEL TOOLTIP (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  construir_tooltip() {
    if (!this.elemento_padre) {
      this.elemento_padre = this.el.nativeElement
    }
    this.elemento_padre.setAttribute('data-bs-toggle', 'tooltip')
    this.elemento_padre.setAttribute('data-bs-placement', this.posicion)
    this.elemento_padre.setAttribute('data-bs-custom-class', this.clase)
    this.elemento_padre.setAttribute('data-bs-title', this.contenido)
    this.elemento_padre.setAttribute('data-bs-html', 'true')
    this.tooltip = new Tooltip(this.elemento_padre)
  }

  destruir_tooltip() {
    this.tooltip?.dispose()
    delete this.tooltip
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion PROCESAMIENTO DEL TOOLTIP (FIN)
  // (o==================================================================o)


  
}
