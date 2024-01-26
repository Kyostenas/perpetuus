import { ApplicationConfig, importProvidersFrom, isDevMode } from "@angular/core";
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";




export const APP_CONFIG: ApplicationConfig = {
    providers: [
        provideRouter( APP_ROUTES ),
        importProvidersFrom([
            HttpClientModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
              enabled: environment.production,
              // Register the ServiceWorker as soon as the application is stable
              // or after 30 seconds (whichever comes first).
              registrationStrategy: 'registerWhenStable:30000'
            }),
            // ServiceWorkerModule.register('ngsw-worker.js', {
            //   enabled: !isDevMode(),
            //   // Register the ServiceWorker as soon as the application is stable
            //   // or after 30 seconds (whichever comes first).
            //   registrationStrategy: 'registerWhenStable:30000'
            // }),            
        ]),
    ],
};