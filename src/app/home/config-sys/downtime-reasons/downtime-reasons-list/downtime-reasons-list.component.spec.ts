import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { DowntimeReasonsListComponent } from './downtime-reasons-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpModule, BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { DowntimeReasonsService } from '../db-services/downtime-reasons.service';
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

describe('DowntimeReasonsListComponent', () => {
  let component: DowntimeReasonsListComponent;
  let fixture: ComponentFixture<DowntimeReasonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DowntimeReasonsListComponent],
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
        DowntimeReasonsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeReasonsListComponent);
    component = fixture.componentInstance;

    let downtimeReasonsService = TestBed.get(DowntimeReasonsService)
    let testData = downtimeReasonsService.getFakeDowntimeReasons();

    let spy = spyOn(downtimeReasonsService, 'getDowntimeReasons').and.returnValue(Observable.of(testData));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('When entering filters', () => {
    it('should return all the data, if the filter "all" is selected', () => {

      component.filters.downtimeReasonId = '';
      component.filters.all = true;

      component.filter();

      expect(component.filteredDowntimeReasons.length).toEqual(10);

    });

    it('should return the predefined data with the correct description criteria', () => {

      component.filters.description = 'commodo';

      component.filter();

      expect(component.filteredDowntimeReasons.length).toEqual(3);

    });


  });

});
