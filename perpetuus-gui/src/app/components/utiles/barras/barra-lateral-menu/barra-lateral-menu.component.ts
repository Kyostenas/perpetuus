import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapHideAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-hide-auto/bootstrap-hide-auto.directive';
import { BootstrapShowAutoDirective } from 'src/app/directives/utiles/varios/bootstrap-show-auto/bootstrap-show-auto.directive';

@Component({
  selector: 'app-barra-lateral-menu',
  standalone: true,
  imports: [
    CommonModule,
    BootstrapShowAutoDirective,
    BootstrapHideAutoDirective,
    RouterModule,
  ],
  templateUrl: './barra-lateral-menu.component.html',
  styleUrl: './barra-lateral-menu.component.scss'
})
export class BarraLateralMenuComponent implements OnInit {

  constructor(

  ) {}

  completo: boolean = true

  lista_menu = [
    {
      simbolo: 'bi bi-person-bounding-box',
      texto: 'Perfil',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-person-gear',
      texto: 'Administrador',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-person-badge',
      texto: 'Tickets',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-person-badge',
      texto: 'RRHH',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-pc-display-horizontal',
      texto: 'Evaluaciones',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-lightbulb',
      texto: 'Base de conocimiento',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-boxes',
      texto: 'Almacén',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-gear',
      texto: 'Produccion',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-tools',
      texto: 'Mantenimiento',
      link: '/administracion'
    },
    {
      simbolo: 'bi bi-file-earmark-spreadsheet',
      texto: 'Reportes',
      link: '/administracion'
    },
  ]

  ngOnInit(): void {
    
  }
  
}
