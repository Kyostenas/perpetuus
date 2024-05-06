import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { AuthService } from './services/inicio/signin/auth.service';

const rutas_exentas = [
  '/',
  '/inicio',
  '/inicio/signin',
];


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    // APP_ROUTES,
    HttpClientModule,
  ],  
  providers: [
    // Configuraciones de idioma.
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private auth_service: AuthService,
  ) {
    router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        if (!rutas_exentas.includes(event.url)) {
          this.auth_service
            .validar_sesion()
            .subscribe(hay_sesion => {
              if (!hay_sesion) {
                this.router.navigate(['']);
              }
            })
        }
      }
    })
  }

  title = 'perpetuus-gui';
}