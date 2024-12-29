import { Routes } from "@angular/router";
import { PanelDeSubMenusComponent } from "../../admin-usuario/panel-de-sub-menus/panel-de-sub-menus.component";
import { AdministracionRolesComponent } from "./administracion-roles/administracion-roles.component";
import { AdministracionUsuariosComponent } from "./administracion-usuarios/administracion-usuarios.component";
import { AdministracionParametrosComponent } from "./administracion-parametros/administracion-parametros.component";


export const PANEL_ADMINISTRACION_ROUTES: Routes = [{
    path: '',
    component: PanelDeSubMenusComponent,
    providers: [],
    children: [
        {
            path: 'roles',
            component: AdministracionRolesComponent,
        },
        {
            path: 'usuarios',
            component: AdministracionUsuariosComponent,
        },
        {
            path: 'parametros',
            component: AdministracionParametrosComponent,
        },
    ],
}];