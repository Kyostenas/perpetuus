import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjustadorLayoutComponent } from '../-general/ajustador-layout/ajustador-layout.component';
import { BarraInferiorComponent } from '../../utiles/barras/barra-inferior/barra-inferior.component';
import { BarraSuperiorComponent, LinkTextoBarraSuperior, LinkSimboloBarraSuperior } from '../../utiles/barras/barra-superior/barra-superior.component';
import { ModalNormalComponent } from '../../utiles/flotantes/modal/modal-normal/modal-normal.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    AjustadorLayoutComponent,
    ModalNormalComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  constructor() {
  }

  @ViewChild('modal_perfil', { static: false }) modal_perfil!: ModalNormalComponent;

  links_texto: LinkTextoBarraSuperior[] = [
    {
      texto: 'Ingresar',
      href: 'inicio/signin'
    },
    {
      texto: 'Registrarse',
      href: 'inicio/signup'
    }
  ];

  links_simbolo: LinkSimboloBarraSuperior[] = [
    {
      texto: 'Perfil',
      href: '#',
      target: '',
      simbolo: 'bi-person-fill'
    },
  ];

  abrir_modal() {
    this.modal_perfil.mostrar_modal()
  }
}
