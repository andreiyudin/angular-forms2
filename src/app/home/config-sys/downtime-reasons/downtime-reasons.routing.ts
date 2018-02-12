import { RouterModule, Routes,Route } from "@angular/router";
import { DowntimeReasonsFormComponent } from './downtime-reasons-form/downtime-reasons-form.component';
import { DowntimeReasonsListComponent } from './downtime-reasons-list/downtime-reasons-list.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
export const DowntimeReasonsRouting: Route =
    {
        path: 'downtimereasons',  children: [
            { path: 'form/:id', component: DowntimeReasonsFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'list', component: DowntimeReasonsListComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 