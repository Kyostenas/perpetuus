import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../layout/admin-layout/admin-layout.component";

export const ADMIN_ROUTES: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    providers: [],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
        },
    ],
}];