import {UsersRouting} from './users.routing'
import { UsersFormComponent } from './users-form/users-form.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";

describe('users-Routes',()=>{
    it('should contain a route for /users',()=>{
        expect(UsersRouting.children).toContain({ path: 'form/:id', component: UsersFormComponent,canActivate: [CanActivateOperator]  });
    });
});