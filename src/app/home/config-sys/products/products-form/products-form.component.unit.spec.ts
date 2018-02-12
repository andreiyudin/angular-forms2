import { ProductsFormComponent } from './products-form.component';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { ProductsService } from '../db-services/products.service';
import { BinsService } from '../../../../shared/db-services/bins.service';
import { Observable } from 'rxjs/Observable';

class ActivatedRouteStub {
    
      parent = {
        params: Observable.of({})
      };
    
      set testParams(params: any) {
        this.parent.params = Observable.of(params);
      }
    }

describe('Unit Test products-Form', () => {
    let component: ProductsFormComponent;
    let productsService: ProductsService; 
    let binsService: BinsService; 
    let productService: ProductsService; 
    let authService: AuthService; 

    beforeEach(() => {
        productsService = new ProductsService(null);
        binsService = new BinsService(null);
        authService = new AuthService(null);
        component = new ProductsFormComponent(productsService, null,null);
    });

    describe('When Entering a Product', () => {
        it('should indicate a valid control if the product not exist', () => {
            let control = new FormControl(4, null);
            component.products = [{ "productId": 1 }, { "productId": 2 }, { "productId": 3 }];
            let res = component.isProductIdNotExist(control);
            expect(res).toBe(null);
        });

        it("should indicate a invalid control if the product exist", () => {
            let control = new FormControl(1, null);
            component.products = [{ "productId": 1 }, { "productId": 2 }, { "productId": 3 }];
            let res = component.isProductIdNotExist(control);
            expect(res.present.valid).toBeFalsy();
        });
    });


});
