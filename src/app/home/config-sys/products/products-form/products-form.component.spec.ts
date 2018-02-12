import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { ProductsFormComponent } from './products-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../db-services/products.service';
import { AuthService } from '../../../../auth/auth.service';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BinsService } from '../../../../shared/db-services/bins.service';
import { Observable, Subject } from 'rxjs';
import { MockBackend } from '@angular/http/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AlertComponent } from '../../../../shared/alert/alert.component';


const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }

}

describe('Integration Test products-form', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsFormComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        SharedModule,
        RouterTestingModule,
        HttpModule
      ],
      providers: [
        ProductsService,
        BinsService,
        ProductsService,
        AuthService,
        { provide: Http, useValue: mockHttpProvider },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;


    let productService = TestBed.get(ProductsService)
    let productsService = TestBed.get(ProductsService)
    let binsService = TestBed.get(BinsService)
    let authService = TestBed.get(AuthService)

    spyOn(productsService, 'getProducts').and.returnValue(Observable.from([]));
    spyOn(binsService, 'getBins').and.returnValue(Observable.from([]));
    spyOn(authService, 'getUserRights').and.returnValue(Observable.from([]));
    spyOn(productService, 'getProductById').and.returnValue(Observable.of([{'productId':234,'counts':1}]));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load the product info when the param passed is not "new"', () => {
    let productService = TestBed.get(ProductsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 4 });

    expect(productService.getProductById).toHaveBeenCalled();

  });

  it('should NOT load the product info when the param passed is "new"', () => {
    let productService = TestBed.get(ProductsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 'new' });

    expect(productService.getProductById).not.toHaveBeenCalled();

  });

  it('should disable the erase button, if the product is used', async(() => {
    let button = fixture.debugElement.query(By.css('.btn-delete'));

    component.new = false;
    component.product.counts = 1;

    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTruthy();
  }));

  describe('When saving', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductsFormComponent);
      component = fixture.componentInstance;

      let productService = TestBed.get(ProductsService)

      spyOn(productService, 'update').and.returnValue(Observable.from([]));
      spyOn(productService, 'create').and.returnValue(Observable.from([]));
    });

    it('should NOT update the database, if the form is invalid', () => {
      let productService = TestBed.get(ProductsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(productService.update).not.toHaveBeenCalled();
    });

    it('should NOT create a new element, if the form is invalid', () => {
      let productService = TestBed.get(ProductsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(productService.create).not.toHaveBeenCalled();
    });


    it('should update the database, if the new property is false and the form is valid', () => {
      let productService = TestBed.get(ProductsService)
      component.new = false;
      let form = {
        valid: true
      }
      component.save(form);

      expect(productService.update).toHaveBeenCalled();
    });

    xit('should create a new instance, if the new property is true and the form is valid', () => {
      let productService = TestBed.get(ProductsService)
      component.new = true;
      let form = {
        valid: true
      }
      component.save(form);
      expect(productService.create).toHaveBeenCalled();
    });

    it('should NOT create an instance in the database, if the new property is defined', () => {
      let productService = TestBed.get(ProductsService)
      component.new = false;
      let form = {
        value: {
          productId: 4
        },
        valid: true
      }
      expect(productService.create).not.toHaveBeenCalled();
    });
  });

  describe('When saving and error occurs', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductsFormComponent);
      component = fixture.componentInstance;

      let productService = TestBed.get(ProductsService)

      spyOn(productService, 'update').and.returnValue(Observable.throw(Error));
      spyOn(productService, 'create').and.returnValue(Observable.throw(Error));
      spyOn(component, 'showErrorMsg').and.returnValue(Observable.throw(Error));

    });

    it('should show an error message for the attempt of creating a new instance', () => {
      let form = {
        value: {
          productId: ''
        },
        valid: true
      }

      component.save(form);

      expect(component.showErrorMsg).toHaveBeenCalled();
    });

    it('should show an error message for the attempt of updating instance', () => {
      let form = {
        value: {
          productId: 4
        },
        valid: true
      }

      component.save(form);

      expect(component.showErrorMsg).toHaveBeenCalled();
    });

  });

  describe('When showing an error message', () => {

    it('should show the alert component containing "Erreur" word', () => {

      let de = fixture.debugElement.query(By.directive(AlertComponent));

      component.showErrorMsg();
      fixture.detectChanges();

      expect(de.nativeElement.innerHTML).toContain('Erreur');

    });

  });

  describe('When clicking on the add button', () => {
    beforeEach(() => {
      let button = fixture.debugElement.query(By.css('.btn-add'));
      button.triggerEventHandler('click', null);
    });

    it('should reset the new flag', () => {
      expect(component.new).toBeTruthy();
    });

    it('should reset the product object', () => {
      expect(component.product).toEqual({});
    });

    it('should reset the form', () => {
      expect(component.productForm.pristine).toBeTruthy();
    });
  });

  describe('When getting the product,', () => {

    beforeEach(() => {
      let button = fixture.debugElement.query(By.css('.btn-delete'));
    });



  });

});
