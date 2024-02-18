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

  private _id_modal!: string;

  get id_modal(): string {
    return this._id_modal;
  }

  set id_modal(value: string) {
    this._id_modal = value;
    this.crear_links();
  }

  links_texto!: LinkTextoBarraSuperior[];
  links_simbolo!: LinkSimboloBarraSuperior[];

  crear_links() {
    this.links_texto = [
      {
        texto: 'Ingresar',
        href: 'inicio/signin'
      },
      {
        texto: 'Registrarse',
        href: 'inicio/signup'
      }
    ];
    this.links_simbolo = [
      {
        texto: 'Perfil',
        data_bs_target: '#'.concat(this.id_modal),
        data_bs_toggle: 'modal',
        simbolo: 'bi-person-fill'
      },
    ];
  }


  abrir_modal() {
    this.modal_perfil.mostrar_modal()
  }
}
