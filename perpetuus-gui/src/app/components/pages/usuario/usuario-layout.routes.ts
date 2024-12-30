import { Routes } from "@angular/router";

export const USARIO_ROUTES: Routes = [{
    path: '',
    loadComponent: () => import('../../layout/user-layout/user-layout.component')
        .then(x => x.UserLayoutComponent),
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
        },
    ],
}]; 