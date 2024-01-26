import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';


// const appRoutes: Routes = [

// ];


// export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
//     useHash: false,
    // setupTestingRouter: undefined,
    // canceledNavigationResolution: undefined,
    // paramsInheritanceStrategy: undefined,
    // titleStrategy: undefined,
    // urlUpdateStrategy: undefined,
    // urlHandlingStrategy: undefined,
    // malformedUriErrorHandler: undefined,
// });


export const APP_ROUTES: Routes = [
    { path: '', component: LandingComponent },
    { path: '**', redirectTo: '/' },
    { path: '**', redirectTo: '' },
];