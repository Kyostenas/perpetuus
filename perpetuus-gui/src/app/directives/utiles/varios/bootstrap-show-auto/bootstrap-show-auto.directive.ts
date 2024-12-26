import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bs-show-auto]',
  standalone: true
})
export class BootstrapShowAutoDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      const ELEMENTO = this.elementRef.nativeElement
      this.renderer2.addClass(ELEMENTO, 'hide')
      this.renderer2.addClass(ELEMENTO, 'fade')
      this.renderer2.addClass(ELEMENTO, 'showing')
      setTimeout(() => {
        this.renderer2.removeClass(ELEMENTO, 'hide')
        this.renderer2.addClass(ELEMENTO, 'show')
        setTimeout(() => {
          this.renderer2.removeClass(ELEMENTO, 'showing')
        }, 50)
      }, 50)
    }, 0)
  }

}
