import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bs-hide-auto]',
  standalone: true
})
export class BootstrapHideAutoDirective implements OnInit {

  constructor(
      private elementRef: ElementRef,
      private renderer2: Renderer2,
  ) { }

  /**
   * Milisegundos para ocultar el elemento. Por defecto son `1000 ms`.
   */
  @Input('bs-hide-auto') ms_para_ocultar?: number = 1000
  @Input('no-ocultar') no_ocultar?: boolean = false

  ngOnInit(): void {
    if (!this.no_ocultar) {
      setTimeout(() => {
        const ELEMENTO = this.elementRef.nativeElement
        this.renderer2.addClass(ELEMENTO, 'showing')
        setTimeout(() => {
          this.renderer2.addClass(ELEMENTO, 'hide')
          setTimeout(() => {
            this.renderer2.removeClass(ELEMENTO, 'showing')
            this.renderer2.removeClass(ELEMENTO, 'show')

            const BODY = this.elementRef.nativeElement.querySelector('body')
            this.renderer2.removeChild(BODY, ELEMENTO)
          }, 50)
        }, 50)
      }, this.ms_para_ocultar)
    }
  }

}
