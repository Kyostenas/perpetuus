import { ChangeDetectorRef, Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef } from '@angular/core';
import { ControlDropdownsService } from 'src/app/services/utiles/estructurales/control-dropdowns/control-dropdowns.service';
import { UtilidadesService } from 'src/app/services/utiles/varios/utilidades/utilidades.service';

@Directive({
  selector: '[bs-dropdown]',
  standalone: true
})
export class BootstrapDropdownDirective implements OnInit, OnDestroy {

  // (o==================================================================o)
  //   #region INICIALIZACION (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control_dropdowns: ControlDropdownsService,
    private cdr: ChangeDetectorRef,
    private utiles: UtilidadesService,
  ) { }

  ngOnInit(): void {
    // this.construir_dropdown()
    this.elemento_padre = this.el.nativeElement
  }

  ngOnDestroy(): void {
    this.no_eliminar = false
    this.ocultar()
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion INICIALIZACION (FIN)
  // (o==================================================================o)
  
  // (o==================================================================o)
  //   #region INPUTS, OUTPUTS Y VARIABLES (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  @Input('bs-dropdown') contenido_dropdown!: string
  @Input('plantilla') plantilla_dropdown!: TemplateRef<any>
  @Input('contexto_plantilla') contexto_plantilla = {}
  @Input('mostrar_con_click') mostrar_con_click: boolean = false
  @Input('no_eliminar') no_eliminar: boolean = false
  @Input('padding') padding: number = 5
  @Output('dropdown_destruido') emisor_dropdown_destruido: EventEmitter<void> = new EventEmitter()
  @Output('mostrando_dropdown') emisor_mostrando_dropdown: EventEmitter<boolean> = new EventEmitter()

  private elemento_padre!: HTMLElement
  private dropdown?: HTMLElement
  private vista_embebida!: EmbeddedViewRef<any>
  private se_esta_mostrando: boolean = false
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion INPUTS, OUTPUTS Y VARIABLES (FIN)
  // (o==================================================================o)

  // (o==================================================================o)
  //   #region DETECTORES DE EVENTOS (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  @HostListener('mouseenter') 
  onMouseEnter() {
    if (!this.mostrar_con_click) {
      this.mostrar()
    }
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    if (!this.mostrar_con_click) {
      this.ocultar()
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.mostrar_con_click) {
      const TARGET = event.target as HTMLElement
      const ESTA_DENTRO_DROPDOWN = this.control_dropdowns
        .elemento_esta_dentro_de_dropdown(TARGET as Node)
      const ESTA_DENTRO_PADRE = this.elemento_padre.contains(event.target as Node)
      const ESTA_EN_ESTE_DROP_DOWN = this.dropdown?.contains(event.target as Node)
      if (!this.se_esta_mostrando) {
        this.mostrar()
      } else {
        if (
          (!ESTA_DENTRO_DROPDOWN && ESTA_DENTRO_PADRE) 
          || !ESTA_EN_ESTE_DROP_DOWN 
        ) {
          this.ocultar()
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dropdown) return
    const TARGET = event.target as HTMLElement
    const ESTA_DENTRO_DROPDOWN = this.control_dropdowns
      .elemento_esta_dentro_de_dropdown(TARGET as Node)
    const ESTA_DENTRO_PADRE = this.elemento_padre.contains(event.target as Node)
    const ESTA_DENTRO = ESTA_DENTRO_DROPDOWN || ESTA_DENTRO_PADRE
    const NIVEL_PARENTESCO =  this.utiles.obtener_nivel_de_descendencia_entre_nodos_html(
      <HTMLElement>this.dropdown, event.target as HTMLElement
    )
    if (
      (
        this.se_esta_mostrando 
        && !ESTA_DENTRO 
        && this.mostrar_con_click 
      ) || (
        NIVEL_PARENTESCO < 0
        && !ESTA_DENTRO_PADRE
      )
    ) {
      this.ocultar()
    }
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion DETECTORES DE EVENTOS (FIN)
  // (o==================================================================o)
  
  // (o==================================================================o)
  //   #region PROCESAMIENTO DE DROPDOWN (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  construir_dropdown() {
    if (!!this.dropdown) return
    if (!this.elemento_padre) {
      this.elemento_padre = this.el.nativeElement
    }
    this.dropdown = this.renderer.createElement('ul')
    this.renderer.addClass(this.dropdown, 'dropdown-menu')
    this.renderer.setStyle(this.dropdown, 'max-width', '15vw')
    this.renderer.addClass(this.dropdown, 'shadow')
    this.renderer.addClass(this.dropdown, 'border-hover-secondary')
    this.renderer.addClass(this.dropdown, 'shadow-hover-lg')
    this.renderer.addClass(this.dropdown, 'scale-hover-md')
    this.renderer.addClass(this.dropdown, 'text-center')
    this.renderer.setStyle(this.dropdown, 'padding', `${this.padding}px`)

    if (this.contenido_dropdown) {
      this.renderer.setProperty(
        this.dropdown, 
        'innerHTML', 
        `
          ${this.contenido_dropdown}
        `
      )
    } else if (this.plantilla_dropdown) {
      this.vista_embebida = this.plantilla_dropdown
        .createEmbeddedView(this.contexto_plantilla)
      this.vista_embebida.rootNodes.forEach(node => {
        this.renderer.appendChild(this.dropdown, node)
        // node.detectChanges()
        try {
          this.cdr.detectChanges()
          this.vista_embebida.detectChanges()
        } catch {}
      })
    } else {
      this.renderer.setProperty(
        this.dropdown, 
        'innerHTML', 
        '<li><a class="dropdown-item rounded border-hover border-hover-primary"><i class="bi bi-ban"></i></a></li>'
      )
    }
    this.aplicar_estilos_personalizados()
    this.control_dropdowns.registrar_dropdown(<HTMLElement>this.dropdown)
    this.renderer.appendChild(this.elemento_padre, this.dropdown)
  }

  destruir_dropdown() {
    if (!this.dropdown) return
    this.renderer.removeChild(this.elemento_padre, this.dropdown)
    this.control_dropdowns.eliminar_dropdown(<HTMLElement>this.dropdown)
    delete this.dropdown
    this.emisor_dropdown_destruido.emit()
  }

  mostrar() {
    if (!!this.dropdown) return
    this.se_esta_mostrando = true
    if (!this.dropdown) {
      this.construir_dropdown()
    }
    try {
      this.cdr.detectChanges()
      this.vista_embebida.detectChanges()
    } catch {}
    setTimeout(() => {
      this.renderer.addClass(this.dropdown, 'show');
    }, 0)
    this.emitir_mostrando()
  }

  ocultar() {
    if (!this.dropdown) return
    this.se_esta_mostrando = false
    this.renderer.removeClass(this.dropdown, 'show');
    if (!this.no_eliminar) {
      setTimeout(() => {
        this.destruir_dropdown()
      }, 0)
    }
    this.emitir_mostrando()
  }

  emitir_mostrando() {
    this.emisor_mostrando_dropdown.emit(this.se_esta_mostrando)
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion PROCESAMIENTO DE DROPDOWN (FIN)
  // (o==================================================================o)
  
  // (o==================================================================o)
  //   #region ESTILOS PERSONALIZADOS INTERNOS (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  private encontrar_todos_los_elementos_shadow_root(elemento: HTMLElement, query: string) {
    const elementos: HTMLElement[] = Array.from(elemento.querySelectorAll(query))
    elemento.childNodes.forEach((child: any) => {
      if (child.shadowRoot) {
        elementos.push(...this.encontrar_todos_los_elementos_shadow_root(
          child.shadowRoot,
          query)
        )
      }
    })
    return elementos
  }

  private encontrar_todos_los_elementos_solo_query_selector(elemento: HTMLElement, query: string) {
    const elementos = Array.from(
      (<HTMLElement>this.dropdown)
        .querySelectorAll(query)
    )
    return elementos
  }

  private obtener_hijos(elemento: HTMLElement, query: string) {
    return [
      ...this.encontrar_todos_los_elementos_shadow_root(elemento, query),
      ...this.encontrar_todos_los_elementos_solo_query_selector(elemento, query),
    ]
  }
  
  private aplicar_estilos_personalizados() {
    const elementosHR = this.obtener_hijos(<HTMLElement>this.dropdown, 'hr.hr-completo')
    const elementosCompletos = this.obtener_hijos(<HTMLElement>this.dropdown, '.recuadro-completo')
    const paddingUsado = this.padding
    let iElemenCompleto = 0
    elementosCompletos.forEach(elemCompleto => {
      if (iElemenCompleto === 0) {
        this.renderer.setStyle(elemCompleto, 'margin-top', `-${paddingUsado}px`)
      }
      if ((iElemenCompleto - 1) === elementosCompletos.length) {
        this.renderer.setStyle(elemCompleto, 'margin-bottom', `-${paddingUsado}px`)
      }
      this.renderer.setStyle(elemCompleto, 'width', `calc(100% + ${2 * paddingUsado}px)`)
      this.renderer.setStyle(elemCompleto, 'margin-left', `-${paddingUsado}px`)
      this.renderer.setStyle(elemCompleto, 'margin-right', `-${paddingUsado}px`)
      this.renderer.setStyle(elemCompleto, 'margin-top', `0px`)
      this.renderer.setStyle(elemCompleto, 'margin-bottom', `0px`)
      iElemenCompleto++
    })
    elementosHR.forEach(elementoHR => {
      this.renderer.setStyle(elementoHR, 'width', `calc(100% + ${2 * paddingUsado}px)`)
      this.renderer.setStyle(elementoHR, 'margin-left', `-${paddingUsado}px`)
      this.renderer.setStyle(elementoHR, 'margin-right', `-${paddingUsado}px`)
      this.renderer.setStyle(elementoHR, 'border-color', 'white')
      this.renderer.setStyle(elementoHR, 'background-color', 'white')
      this.renderer.setStyle(elementoHR, 'border-width', '1px')
      this.renderer.setStyle(elementoHR, 'box-sizing', 'border-box')
    })
  }

  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion ESTILOS PERSONALIZADOS INTERNOS (FIN)
  // (o==================================================================o)



}


