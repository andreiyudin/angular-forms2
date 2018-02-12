import {ProductsRouting} from './products.routing'
import { ProductsFormComponent } from './products-form/products-form.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";

describe('products-Routes',()=>{
    it('should contain a route for /users',()=>{
        expect(ProductsRouting.children).toContain({ path: 'form/:id', component: ProductsFormComponent,canActivate: [CanActivateOperator]  });
    });
});