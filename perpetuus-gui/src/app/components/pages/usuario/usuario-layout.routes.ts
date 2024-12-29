import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layout/user-layout/user-layout.component";

export const USARIO_ROUTES: Routes = [{
    path: '',
    component: UserLayoutComponent,
    providers: [],
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: '',
        },
    ],
}]; 