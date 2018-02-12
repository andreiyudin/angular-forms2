import { RouterModule, Routes,Route } from "@angular/router";
import { MagnetsFormComponent } from './magnets-form/magnets-form.component';
import { MagnetsHistoricalComponent } from './magnets-historical/magnets-historical.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
import { CanActivateAdmin } from "../../../shared/auth-guard/canActivateAdmin.service";

export const MagnetsRouting: Route =
    {
        path: 'magnets',  children: [
            { path: 'form/:id', component: MagnetsFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'form/edit/:id', component: MagnetsFormComponent,canActivate: [CanActivateAdmin]  },
            { path: 'historical', component: MagnetsHistoricalComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 