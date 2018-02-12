import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { AdjustmentReasonsListComponent } from './adjustment-reasons-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpModule, BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { AdjustmentReasonsService } from '../db-services/adjustment-reasons.service';
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

describe('AdjustmentReasonsListComponent', () => {
  let component: AdjustmentReasonsListComponent;
  let fixture: ComponentFixture<AdjustmentReasonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustmentReasonsListComponent],
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
        AdjustmentReasonsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentReasonsListComponent);
    component = fixture.componentInstance;

    let adjustmentReasonsService = TestBed.get(AdjustmentReasonsService)
    let testData = adjustmentReasonsService.getFakeAdjustmentReasons();

    let spy = spyOn(adjustmentReasonsService, 'getAdjustmentReasons').and.returnValue(Observable.of(testData));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('When entering filters', () => {
    it('should return all the data, if the filter "all" is selected', () => {

      component.filters.adjustmentReasonId = '';
      component.filters.all = true;

      component.filter();

      expect(component.filteredAdjustmentReasons.length).toEqual(10);

    });

    it('should return the explanation data with the correct description criteria', () => {

      component.filters.description = 'commodo';

      component.filter();

      expect(component.filteredAdjustmentReasons.length).toEqual(3);

    });

   
  });

});
