import { RouterModule, Routes,Route } from "@angular/router";
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users-list/users-list.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
export const UsersRouting: Route =
    {
        path: 'users',  children: [
            { path: 'form/:id', component: UsersFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'list', component: UsersComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 