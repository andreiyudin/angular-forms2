import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { ProductsListComponent } from './products-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpModule, BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { ProductsService } from '../db-services/products.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { Router } from "@angular/router";


const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
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
        MockBackend,
        BaseRequestOptions,
        { provide: Http, useValue: mockHttpProvider },
        { provide: XHRBackend, useClass: MockBackend },
        ProductsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;

    let productsService = TestBed.get(ProductsService)
    let testData = productsService.getFakeProducts();

    let spy = spyOn(productsService, 'getProducts').and.returnValue(Observable.of(testData));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('When entering filters', () => {
    it('should return all the active data when no filters is entered', () => {

      component.filters.productId = '';
      component.filters.inactive = false;

      component.filter();

      expect(component.filteredProducts.length).toEqual(7);

    });

    it('should return the active data with the correct productId', () => {

      component.filters.productId = '100';

      component.filter();

      expect(component.filteredProducts.length).toEqual(2);

    });

    it('should return all the active data, if the erase button is clicked!', () => {

      component.filters.productId = '';
      component.filters.inactive = false;

      component.filter();
      let button = fixture.debugElement.query(By.css('.btn-erase'));
      button.triggerEventHandler('click', null);

      expect(component.filteredProducts.length).toEqual(7);
    });

    it('should return all the active data, if the filters are empty and the inactive is clicked', () => {

      component.filters.productId = '';

      let button = fixture.debugElement.query(By.css('.btn-inactive'));
      button.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.filteredProducts.length).toEqual(10);
    });





  });


});
