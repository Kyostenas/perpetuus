import { ApplicationConfig, importProvidersFrom, isDevMode, provideExperimentalCheckNoChangesForDebug, provideExperimentalZonelessChangeDetection } from "@angular/core";
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { APP_ROUTES } from "./app.routes";
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "src/environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { JsonAStringPipe } from "./pipes/utiles/json-a-string/json-a-string.pipe";




export const APP_CONFIG: ApplicationConfig = {
    providers: [
        provideRouter(
            APP_ROUTES,
            withPreloading( PreloadAllModules ),
            // withDebugTracing(),
        ),
        importProvidersFrom([
            // ServiceWorkerModule.register('ngsw-worker.js', {
            //   enabled: environment.production,
            //   // Register the ServiceWorker as soon as the application is stable
            //   // or after 30 seconds (whichever comes first).
            //   registrationStrategy: 'registerWhenStable:30000'
            // }),
            // ServiceWorkerModule.register('ngsw-worker.js', {
            //   enabled: !isDevMode(),
            //   // Register the ServiceWorker as soon as the application is stable
            //   // or after 30 seconds (whichever comes first).
            //   registrationStrategy: 'registerWhenStable:30000'
            // }),
            BrowserModule,
        ]),
        provideHttpClient(
            withFetch(), 
            withInterceptorsFromDi(),
        ),
        provideExperimentalZonelessChangeDetection(),
    ],
};