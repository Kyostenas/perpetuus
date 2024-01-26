import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

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
  title = 'perpetuus-gui';
}
