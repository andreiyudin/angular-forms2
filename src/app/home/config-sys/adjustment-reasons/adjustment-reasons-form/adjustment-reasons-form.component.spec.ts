import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { AdjustmentReasonsFormComponent } from './adjustment-reasons-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdjustmentReasonsService } from '../db-services/adjustment-reasons.service';
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

describe('Integration Test adjustmentReasons-form', () => {
  let component: AdjustmentReasonsFormComponent;
  let fixture: ComponentFixture<AdjustmentReasonsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustmentReasonsFormComponent],
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
        AdjustmentReasonsService,
        BinsService,
        AdjustmentReasonsService,
        AuthService,
        { provide: Http, useValue: mockHttpProvider },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentReasonsFormComponent);
    component = fixture.componentInstance;


    let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
    let adjustmentReasonsService = TestBed.get(AdjustmentReasonsService)
    let binsService = TestBed.get(BinsService)
    let authService = TestBed.get(AuthService)

    spyOn(adjustmentReasonsService, 'getAdjustmentReasons').and.returnValue(Observable.from([]));
    spyOn(adjustmentReasonsService, 'getAdjustmentReasonsCount').and.returnValue(Promise.resolve([{ "nbReasons": 2 }]));

    spyOn(binsService, 'getBins').and.returnValue(Observable.from([]));
    spyOn(authService, 'getUserRights').and.returnValue(Observable.from([]));
    spyOn(adjustmentReasonService, 'getAdjustmentReasonById').and.returnValue(Observable.of([{ 'adjustmentReasonId': 234, 'counts': 1 }]));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load the adjustmentReason info when the param passed is not "new"', () => {
    let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 4 });

    expect(adjustmentReasonService.getAdjustmentReasonById).toHaveBeenCalled();

  });

  it('should NOT load the adjustmentReason info when the param passed is "new"', () => {
    let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 'new' });

    expect(adjustmentReasonService.getAdjustmentReasonById).not.toHaveBeenCalled();

  });

  it('should disable the erase button, if the adjustmentReason is used', async(() => {
    let button = fixture.debugElement.query(By.css('.btn-delete'));

    component.new = false;
    component.adjustmentReason.counts = 1;

    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTruthy();
  }));

  describe('When saving', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AdjustmentReasonsFormComponent);
      component = fixture.componentInstance;

      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)

      spyOn(adjustmentReasonService, 'update').and.returnValue(Observable.from([]));
      spyOn(adjustmentReasonService, 'create').and.returnValue(Observable.from([]));
      spyOn(component, 'createNewReason').and.returnValue(Observable.throw(Error));
    });

    it('should NOT update the database, if the form is invalid', () => {
      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
      let form = {
        value: {
        },
        valid: true
      }
      component.save(form);

      expect(adjustmentReasonService.update).not.toHaveBeenCalled();
    });

    it('should NOT create a new element, if the form is invalid', () => {
      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
      let form = {
        value: {
        },
        valid: true
      }
      component.save(form);


      expect(adjustmentReasonService.create).not.toHaveBeenCalled();
    });


    it('should update the database, if the new property is false and the form is valid', () => {
      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
      component.new = false;
      let form = {
        value: {
        },
        valid: true
      }
      component.save(form);

      expect(adjustmentReasonService.update).toHaveBeenCalled();
    });

    it('should create a new instance, if the new property is true and the form is valid', async () => {
      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)

      component.new = true;
      let form = {
        value: {
        },
        valid: true
      }

      component.save(form);

      fixture.detectChanges();

      fixture.whenStable().then(() => { // wait for async getQuote
        fixture.detectChanges();        // update view with quote
        expect(component.createNewReason).toHaveBeenCalled();
      });

    });

    it('should NOT create an instance in the database, if the new property is defined', () => {
      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)
      component.new = false;
      let form = {
        value: {
          adjustmentReasonId: 4
        },
        valid: true
      }
      expect(adjustmentReasonService.create).not.toHaveBeenCalled();
    });
  });

  describe('When saving and error occurs', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AdjustmentReasonsFormComponent);
      component = fixture.componentInstance;

      let adjustmentReasonService = TestBed.get(AdjustmentReasonsService)

      spyOn(adjustmentReasonService, 'update').and.returnValue(Observable.throw(Error));
      spyOn(adjustmentReasonService, 'create').and.returnValue(Observable.throw(Error));
      spyOn(component, 'showErrorMsg').and.returnValue(Observable.throw(Error));

    });

    it('should show an error message for the attempt of creating a new instance', async () => {
      let form = {
        value: {
          adjustmentReasonId: ''
        },
        valid: true
      }

      component.save(form);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.showErrorMsg).toHaveBeenCalled();
      });


    });

    it('should show an error message for the attempt of updating instance', async () => {
      let form = {
        value: {
          adjustmentReasonId: 4
        },
        valid: true
      }

      component.save(form);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(component.showErrorMsg).toHaveBeenCalled();
      });

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

    it('should reset the adjustmentReason object', () => {
      expect(component.adjustmentReason).toEqual({});
    });

    it('should reset the form', () => {
      expect(component.adjustmentReasonForm.pristine).toBeTruthy();
    });
  });

  describe('When getting the adjustmentReason,', () => {

    beforeEach(() => {
      let button = fixture.debugElement.query(By.css('.btn-delete'));
    });



  });

});
