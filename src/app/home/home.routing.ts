import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ProductsRouting } from './config-sys/products/products.routing';
import { UsersRouting } from './config-sys/users/users.routing';
import { ScheduleComponent } from './schedule/schedule.component';
import { CanActivateOperator } from "../shared/auth-guard/canActivateOperator.service";

const APP_ROUTES: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [CanActivateOperator], children: [
            { path: 'schedule', component: ScheduleComponent },
            ProductsRouting,
            UsersRouting,
        ]
    },
];

export const HomeRouting = RouterModule.forChild(APP_ROUTES);
