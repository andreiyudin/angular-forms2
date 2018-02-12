import { RouterModule, Routes,Route } from "@angular/router";
import { MetalDetectionFormComponent } from './metal-detection-form/metal-detection-form.component';
import { MetalDetectionHistoricalComponent } from './metal-detection-historical/metal-detection-historical.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
import { CanActivateAdmin} from "../../../shared/auth-guard/canActivateAdmin.service";

export const MetalDetectionRouting: Route =
    {
        path: 'metal-detection',  children: [
            { path: 'form/:id', component: MetalDetectionFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'form/edit/:id', component: MetalDetectionFormComponent,canActivate: [CanActivateAdmin]  },
            { path: 'historical', component: MetalDetectionHistoricalComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 