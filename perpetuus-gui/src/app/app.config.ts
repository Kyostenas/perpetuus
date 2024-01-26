import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";




export const APP_CONFIG: ApplicationConfig = {
    providers: [
        provideRouter( APP_ROUTES ),
        importProvidersFrom([
            HttpClientModule,
        ]),
    ],
};