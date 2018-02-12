import {BinsRouting} from './bins.routing'
import { BinsFormComponent } from './bins-form/bins-form.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";

describe('bins-Routes',()=>{
    it('should contain a route for /users',()=>{
        expect(BinsRouting.children).toContain({ path: 'form/:id', component: BinsFormComponent,canActivate: [CanActivateOperator]  });
    });
});