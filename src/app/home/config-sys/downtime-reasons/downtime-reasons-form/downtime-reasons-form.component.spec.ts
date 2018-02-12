import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { DowntimeReasonsFormComponent } from './downtime-reasons-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DowntimeReasonsService } from '../db-services/downtime-reasons.service';
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

describe('Integration Test downtimeReasons-form', () => {
  let component: DowntimeReasonsFormComponent;
  let fixture: ComponentFixture<DowntimeReasonsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DowntimeReasonsFormComponent],
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
        DowntimeReasonsService,
        BinsService,
        DowntimeReasonsService,
        AuthService,
        { provide: Http, useValue: mockHttpProvider },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DowntimeReasonsFormComponent);
    component = fixture.componentInstance;


    let downtimeReasonService = TestBed.get(DowntimeReasonsService)
    let downtimeReasonsService = TestBed.get(DowntimeReasonsService)
    let binsService = TestBed.get(BinsService)
    let authService = TestBed.get(AuthService)

    spyOn(downtimeReasonsService, 'getDowntimeReasonsCount').and.returnValue(Promise.resolve([{ "nbReasons": 2 }]));
    spyOn(downtimeReasonsService, 'getDowntimeReasons').and.returnValue(Observable.from([]));
    spyOn(binsService, 'getBins').and.returnValue(Observable.from([]));
    spyOn(authService, 'getUserRights').and.returnValue(Observable.from([]));
    spyOn(downtimeReasonService, 'getDowntimeReasonById').and.returnValue(Observable.of([{ 'downtimeReasonId': 234, 'counts': 1 }]));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load the downtimeReason info when the param passed is not "new"', () => {
    let downtimeReasonService = TestBed.get(DowntimeReasonsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 4 });

    expect(downtimeReasonService.getDowntimeReasonById).toHaveBeenCalled();

  });

  it('should NOT load the downtimeReason info when the param passed is "new"', () => {
    let downtimeReasonService = TestBed.get(DowntimeReasonsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 'new' });

    expect(downtimeReasonService.getDowntimeReasonById).not.toHaveBeenCalled();

  });

  it('should disable the erase button, if the downtimeReason is used', async(() => {
    let button = fixture.debugElement.query(By.css('.btn-delete'));

    component.new = false;
    component.downtimeReason.counts = 1;

    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTruthy();
  }));

  describe('When saving', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DowntimeReasonsFormComponent);
      component = fixture.componentInstance;

      let downtimeReasonService = TestBed.get(DowntimeReasonsService)

      spyOn(downtimeReasonService, 'update').and.returnValue(Observable.from([]));
      spyOn(downtimeReasonService, 'create').and.returnValue(Observable.from([]));
    });

    it('should NOT update the database, if the form is invalid', () => {
      let downtimeReasonService = TestBed.get(DowntimeReasonsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(downtimeReasonService.update).not.toHaveBeenCalled();
    });

    it('should NOT create a new element, if the form is invalid', () => {
      let downtimeReasonService = TestBed.get(DowntimeReasonsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(downtimeReasonService.create).not.toHaveBeenCalled();
    });


    it('should update the database, if the new property is false and the form is valid', () => {
      let downtimeReasonService = TestBed.get(DowntimeReasonsService)
      component.new = false;
      let form = {
        valid: true
      }
      component.save(form);

      expect(downtimeReasonService.update).toHaveBeenCalled();
    });

    it('should create a new instance, if the new property is true and the form is valid', async () => {
      let downtimeReasonService = TestBed.get(DowntimeReasonsService)
      component.new = true;
      let form = {
        value: {
          downtimeReasonId: 4
        },
        valid: true
      }

      component.save(form);

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(downtimeReasonService.create).toHaveBeenCalled();
      });

    });

    it('should NOT create an instance in the database, if the new property is defined', async () => {
      let downtimeReasonService = TestBed.get(DowntimeReasonsService)
      component.new = true;
      let form = {
        value: {
          downtimeReasonId: 4
        },
        valid: true
      }

      component.save(form);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(downtimeReasonService.create).toHaveBeenCalled();
      });
    });
  });

  describe('When saving and error occurs', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DowntimeReasonsFormComponent);
      component = fixture.componentInstance;

      let downtimeReasonService = TestBed.get(DowntimeReasonsService)

      spyOn(downtimeReasonService, 'update').and.returnValue(Observable.throw(Error));
      spyOn(downtimeReasonService, 'create').and.returnValue(Observable.throw(Error));
      spyOn(component, 'showErrorMsg').and.returnValue(Observable.throw(Error));

    });

    it('should show an error message for the attempt of creating a new instance', async () => {
      let form = {
        value: {
          downtimeReasonId: ''
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
          downtimeReasonId: 4
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

    it('should reset the downtimeReason object', () => {
      expect(component.downtimeReason).toEqual({});
    });

    it('should reset the form', () => {
      expect(component.downtimeReasonForm.pristine).toBeTruthy();
    });
  });

  describe('When getting the downtimeReason,', () => {

    beforeEach(() => {
      let button = fixture.debugElement.query(By.css('.btn-delete'));
    });



  });

});
