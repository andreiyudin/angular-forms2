import {AdjustmentReasonsRouting} from './adjustment-reasons.routing'
import { AdjustmentReasonsFormComponent } from './adjustment-reasons-form/adjustment-reasons-form.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";

describe('adjustmentReasons-Routes',()=>{
    it('should contain a route for /users',()=>{
        expect(AdjustmentReasonsRouting.children).toContain({ path: 'form/:id', component: AdjustmentReasonsFormComponent,canActivate: [CanActivateOperator]  });
    });
});