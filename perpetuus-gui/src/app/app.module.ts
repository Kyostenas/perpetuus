// (o-----------------------------------------( IMPORTACIONES ))
import { BrowserModule } from '@angular/platform-browser';

// FECHAS EN ESPAÑOL
import { NgModule, LOCALE_ID } from '@angular/core';
import localePy from '@angular/common/locales/es-MX';
import {
  registerLocaleData,
  APP_BASE_HREF,
  CommonModule,
} from '@angular/common';

// RUTAS
import { APP_ROUTES } from './app.routes';

// COMPONENTES
import { AppComponent } from './app.component';

// MODULOS
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localePy, 'es-MX');

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserModule,
    APP_ROUTES,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    // Configuraciones de idioma.
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LOCALE_ID, useValue: 'es-MX' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
