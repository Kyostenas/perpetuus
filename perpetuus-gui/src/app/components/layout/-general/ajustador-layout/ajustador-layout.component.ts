import { Component } from '@angular/core';

@Component({
  selector: 'app-ajustador-layout',
  standalone: true,
  imports: [],
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


}
