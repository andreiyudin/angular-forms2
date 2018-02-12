import { RouterModule, Routes,Route } from "@angular/router";
import { BinsFormComponent } from './bins-form/bins-form.component';
import { BinsListComponent } from './bins-list/bins-list.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
export const BinsRouting: Route =
    {
        path: 'bins',  children: [
            { path: 'form/:id', component: BinsFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'list', component: BinsListComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 