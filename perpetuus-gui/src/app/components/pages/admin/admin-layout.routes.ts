import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";
import { DashboardComponent } from "../admin-usuario/dashboard/dashboard.component";

export const ADMIN_ROUTES: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    providers: [],
    children: [
        { 
            path: '', 
            pathMatch: 'full',
            redirectTo: 'dashboard'
        },
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'panel-administrador',
            loadChildren: () => import('./panel-administrador/panel-administrador.routes')
                .then(rutas => rutas.PANEL_ADMINISTRACION_ROUTES)
        },
    ],
}];