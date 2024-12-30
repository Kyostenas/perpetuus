import { Routes } from "@angular/router";


export const PANEL_ADMINISTRACION_ROUTES: Routes = [{
    path: '',
    loadComponent: () => import('../../admin-usuario/panel-de-sub-menus/panel-de-sub-menus.component')
        .then(x => x.PanelDeSubMenusComponent),
    children: [
        {
            path: 'roles',
            loadComponent: () => import('./administracion-roles/administracion-roles.component')
                .then(x => x.AdministracionRolesComponent),
        },
        {
            path: 'usuarios',
            loadComponent: () => import('./administracion-usuarios/administracion-usuarios.component')
                .then(x => x.AdministracionUsuariosComponent),
        },
        {
            path: 'parametros',
            loadComponent: () => import('./administracion-parametros/administracion-parametros.component')
                .then(x => x.AdministracionParametrosComponent),
        },
    ],
}];