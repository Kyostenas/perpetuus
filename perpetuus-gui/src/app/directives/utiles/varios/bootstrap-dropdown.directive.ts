import { Directive, ElementRef, EmbeddedViewRef, HostListener, Input, OnInit, Renderer2, TemplateRef } from '@angular/core';

@Directive({
  selector: '[bs-dropdown]',
  standalone: true
})
export class BootstrapDropdownDirective implements OnInit {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.construir_dropdown()
  }

  @Input('bs-dropdown') contenido_dropdown!: string
  @Input('plantilla') plantilla_dropdown!: TemplateRef<any>

  private dropdown!: HTMLElement
  private vista_embebida!: EmbeddedViewRef<any>

  construir_dropdown() {
    this.dropdown = this.renderer.createElement('ul')
    this.renderer.addClass(this.dropdown, 'dropdown-menu')

    if (this.contenido_dropdown) {
      this.renderer.setProperty(
        this.dropdown, 
        'innerHTML', 
        this.contenido_dropdown
      )
    } else if (this.plantilla_dropdown) {
      this.vista_embebida = this.plantilla_dropdown
        .createEmbeddedView({})
      this.vista_embebida.rootNodes.forEach(node => {
        this.renderer.appendChild(this.dropdown, node)
      })
    } else {
      this.renderer.setProperty(
        this.dropdown, 
        'innerHTML', 
        '<li><a class="dropdown-item"><i class="bi bi-ban"></i></a></li>'
      )
    }
    this.renderer.appendChild(this.el.nativeElement, this.dropdown)
  }

  @HostListener('mouseenter') 
  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'show');
    this.renderer.addClass(this.dropdown, 'show');
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'show');
    this.renderer.removeClass(this.dropdown, 'show');
  }

}


