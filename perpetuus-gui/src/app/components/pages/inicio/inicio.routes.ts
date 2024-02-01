import { Routes } from "@angular/router";
import { PublicLayoutComponent } from "../../layout/public-layout/public-layout.component";
import { LandingComponent } from "./landing/landing.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";


export const INICIO_ROUTES: Routes = [{
    path: '',
    component: PublicLayoutComponent,
    providers: [],
    children: [
        {
            path: '',
            component: LandingComponent, 
        },
        {
            path: 'signin',
            component: SigninComponent,
        },
        {
            path: 'signup',
            component: SignupComponent,
        },
    ]
}];