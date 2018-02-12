import { RouterModule, Routes,Route } from "@angular/router";
import { AdjustmentReasonsFormComponent } from './adjustment-reasons-form/adjustment-reasons-form.component';
import { AdjustmentReasonsListComponent } from './adjustment-reasons-list/adjustment-reasons-list.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
export const AdjustmentReasonsRouting: Route =
    {
        path: 'adjustmentreasons',  children: [
            { path: 'form/:id', component: AdjustmentReasonsFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'list', component: AdjustmentReasonsListComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 