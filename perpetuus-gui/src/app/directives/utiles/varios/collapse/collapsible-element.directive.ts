import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[collapse]',
})
export class CollapsibleElementDirective implements OnInit {
    // (o==================================================================o)
    //   #region INITIALIZATION
    // (o-----------------------------------------------------------\/-----o)

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

    ngOnInit(): void {
      this.html_element = this.elementRef.nativeElement
      this.renderer2.setStyle(this.html_element, 'transition', 'all 600ms')
      setTimeout(() => {
        this.original_height = this.html_element.offsetHeight
        this.original_width = this.html_element.offsetWidth
      }, 100)
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion INITIALIZATION
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region INPUTS
    // (o-----------------------------------------------------------\/-----o)

    @Input('collapse') set _showing(collapsing: boolean) {
        console.log(collapsing)
        console.log(this.orientation)
        setTimeout(() => {
          if (collapsing) {
            switch (this.orientation) {
              case 'horizontal':
                this.collapse_element_horizontally()
                break;
              case 'vertical':
                this.collapse_element_vertically()
                break;
              default:
                break;
            }
          } else {
            switch (this.orientation) {
              case 'horizontal':
                this.extend_element_horizontally()
                break;
              case 'vertical':
                this.extend_element_vertically()
                break;
              default:
                break;
            }
          }
        }, 0)
    }
    @Input({required: true}) orientation!: 'vertical' | 'horizontal'

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion INPUTS
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region VARABLES
    // (o-----------------------------------------------------------\/-----o)
    
    html_element!: HTMLElement
    original_height!: number
    original_width!: number
    
    // (o-----------------------------------------------------------/\-----o)
    //   #endregion VARABLES
    // (o==================================================================o)

    // (o==================================================================o)
    //   #region ACTIONS
    // (o-----------------------------------------------------------\/-----o)

    collapse_element_vertically() {
      this.renderer2.setStyle(this.html_element, 'height', '0px')
    }

    extend_element_vertically() {
      this.renderer2.removeStyle(this.html_element, 'height')
    }

    collapse_element_horizontally() {
      this.renderer2.setStyle(this.html_element, 'width', '0px')
    }

    extend_element_horizontally() {
      this.renderer2.removeStyle(this.html_element, 'width')
    }

    // (o-----------------------------------------------------------/\-----o)
    //   #endregion ACTIONS
    // (o==================================================================o)
}
