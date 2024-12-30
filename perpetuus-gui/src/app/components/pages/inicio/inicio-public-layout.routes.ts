import { Routes } from "@angular/router";


export const INICIO_ROUTES: Routes = [{
    path: '',
    loadComponent: () => import('../../layout/public-layout/public-layout.component')
        .then(x => x.PublicLayoutComponent),
    providers: [],
    children: [
        {
            path: '',
            loadComponent: () => import('./landing/landing.component')
                .then(x => x.LandingComponent),
        },
        {
            path: 'signin',
            loadComponent: () => import('./signin/signin.component')
                .then(x => x.SigninComponent),
        },
        {
            path: 'signup',
            loadComponent: () => import('./signup/signup.component')
                .then(x => x.SignupComponent),
        },
    ]
}];