import {DowntimeReasonsRouting} from './downtime-reasons.routing'
import { DowntimeReasonsFormComponent } from './downtime-reasons-form/downtime-reasons-form.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";

describe('downtimeReasons-Routes',()=>{
    it('should contain a route for /users',()=>{
        expect(DowntimeReasonsRouting.children).toContain({ path: 'form/:id', component: DowntimeReasonsFormComponent,canActivate: [CanActivateOperator]  });
    });
});