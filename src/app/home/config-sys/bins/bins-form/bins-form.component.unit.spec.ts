import { BinsFormComponent } from './bins-form.component';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { BinsService } from '../db-services/bins.service';
import { Observable } from 'rxjs/Observable';

class ActivatedRouteStub {
    
      parent = {
        params: Observable.of({})
      };
    
      set testParams(params: any) {
        this.parent.params = Observable.of(params);
      }
    }

describe('Unit Test bins-Form', () => {
    let component: BinsFormComponent;
    let binsService: BinsService; 
    let binService: BinsService; 
    let authService: AuthService; 

    beforeEach(() => {
        binsService = new BinsService(null);
        binsService = new BinsService(null);
        authService = new AuthService(null);
        component = new BinsFormComponent(binsService, null,null);
    });

    describe('When Entering a Bin', () => {
        it('should indicate a valid control if the bin not exist', () => {
            let control = new FormControl(4, null);
            component.bins = [{ "binId": 1 }, { "binId": 2 }, { "binId": 3 }];
            let res = component.isBinIdNotExist(control);
            expect(res).toBe(null);
        });

        it("should indicate a invalid control if the bin exist", () => {
            let control = new FormControl(1, null);
            component.bins = [{ "binId": 1 }, { "binId": 2 }, { "binId": 3 }];
            let res = component.isBinIdNotExist(control);
            expect(res.present.valid).toBeFalsy();
        });
    });


});
