import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AjustadorLayoutComponent } from '../-general/ajustador-layout/ajustador-layout.component';
import { BarraInferiorComponent } from '../../utiles/barras/barra-inferior/barra-inferior.component';
import { LinkTextoBarraSuperior, LinkSimboloBarraSuperior } from '../../utiles/barras/barra-superior/barra-superior.component';
import { AuthService } from 'src/app/services/inicio/signin/auth.service';
import { BarraLateralMenuComponent } from '../../utiles/barras/barra-lateral-menu/barra-lateral-menu.component';
import { BarraBreadcrumbsComponent } from '../../utiles/barras/barra-breadcrumbs/barra-breadcrumbs.component';

@Component({
    selector: 'app-admin-layout',
    imports: [
        CommonModule,
        RouterModule,
        // BarraSuperiorComponent,
        BarraInferiorComponent,
        AjustadorLayoutComponent,
        // ModalNormalComponent,
        BarraLateralMenuComponent,
        BarraBreadcrumbsComponent,
    ],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private auth_service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.auth_service.validar_sesion()
    .subscribe({
      next: (sesion_es_valida) => {
        if (!sesion_es_valida) {
          this.router.navigate(['inicio/signin'])
        }
      },
      error: (error) => this.router.navigate(['inicio/signin'])
    })
  }

  // @ViewChild('modal_perfil', { static: false }) modal_perfil!: ModalNormalComponent;

  // private _id_modal!: string;

  // get id_modal(): string {
  //   return this._id_modal;
  // }

  // set id_modal(value: string) {
  //   this._id_modal = value;
  //   this.crear_links();
  // }

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
    // this.links_simbolo = [
    //   {
    //     texto: 'Perfil',
    //     data_bs_target: '#'.concat(this.id_modal),
    //     data_bs_toggle: 'modal',
    //     simbolo: 'bi-person-fill'
    //   },
    // ];
  }


  // abrir_modal() {
  //   this.modal_perfil.mostrar_modal()
  // }
}
