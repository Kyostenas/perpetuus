import { Routes } from '@angular/router';


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
    { 
        path: '', 
        pathMatch: 'full',
        redirectTo: 'inicio'
    },
    {
        path: 'inicio',
        loadChildren: () => import('./components/pages/inicio/inicio.routes')
            .then(rutas => rutas.INICIO_ROUTES),
    },
    {
        path: 'adorador',
        loadChildren: () => import('./components/pages/usuario/usuario.routes')
            .then(rutas => rutas.USARIO_ROUTES),
    },
    {
        path: 'coordinacion',
        loadChildren: () => import('./components/pages/admin/admin.routes')
            .then(rutas => rutas.ADMIN_ROUTES),
    },
    { path: '**', redirectTo: '/' },
    { path: '*', redirectTo: '' },
];