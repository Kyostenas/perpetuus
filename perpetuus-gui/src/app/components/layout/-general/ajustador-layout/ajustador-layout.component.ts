import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { BootstrapHideAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-hide-auto/bootstrap-hide-auto.directive';
import { BootstrapShowAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-show-auto/bootstrap-show-auto.directive';

@Component({
  selector: 'app-ajustador-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ajustador-layout.component.html',
  styleUrl: './ajustador-layout.component.scss'
})
export class AjustadorLayoutComponent {

  clases_display_sticky_barra_arriba = `
    d-none 
    d-sm-none 
    d-md-none 
    d-lg-block 
    d-xl-block 
    d-xxl-block
  `
  clases_display_sticky_barra_abajo = `
    d-block 
    d-sm-block 
    d-m
    d-block 
    d-lg-none 
    d-xl-none 
    d-xxl-none
    sticky-bottom
    mt-5
  `


  // (o==================================================================o)
  //   #region BOTON SCROLL UP (INICIO)
  // (o-----------------------------------------------------------\/-----o)
  
  mostrar_boton_top: boolean = false
  elemento_scroll!: HTMLElement
  scroll_ventana(event: Event) {
    if (!this.elemento_scroll)
    this.elemento_scroll = event.target as HTMLElement
    if (this.elemento_scroll.scrollTop > 100) {
      this.mostrar_boton_top = true
    } else {
      this.mostrar_boton_top = false
    }
  }

  scroll_hasta_arriba() {
    this.elemento_scroll.scrollTo({top: 0, behavior: 'instant'})
    window.scrollTo({top: 0})
  }
  
  // (o-----------------------------------------------------------/\-----o)
  //   #endregion BOTON SCROLL UP (FIN)
  // (o==================================================================o)
  
  
}
