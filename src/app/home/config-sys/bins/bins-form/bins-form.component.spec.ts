import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { BinsFormComponent } from './bins-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BinsService } from '../db-services/bins.service';
import { AuthService } from '../../../../auth/auth.service';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('Integration Test bins-form', () => {
  let component: BinsFormComponent;
  let fixture: ComponentFixture<BinsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BinsFormComponent],
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
        BinsService,
        BinsService,
        BinsService,
        AuthService,
        { provide: Http, useValue: mockHttpProvider },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinsFormComponent);
    component = fixture.componentInstance;


    let binService = TestBed.get(BinsService)
    let binsService = TestBed.get(BinsService)
    let authService = TestBed.get(AuthService)

    spyOn(binsService, 'getBins').and.returnValue(Observable.from([]));
    spyOn(authService, 'getUserRights').and.returnValue(Observable.from([]));
    spyOn(binService, 'getBinById').and.returnValue(Observable.of([{'binId':234,'counts':1}]));

    fixture.detectChanges();

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load the bin info when the param passed is not "new"', () => {
    let binService = TestBed.get(BinsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 4 });

    expect(binService.getBinById).toHaveBeenCalled();

  });

  it('should NOT load the bin info when the param passed is "new"', () => {
    let binService = TestBed.get(BinsService)
    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

    route.push({ 'id': 'new' });

    expect(binService.getBinById).not.toHaveBeenCalled();

  });

  it('should disable the erase button, if the bin is used', async(() => {
    let button = fixture.debugElement.query(By.css('.btn-delete'));

    component.new = false;
    component.bin.counts = 1;

    fixture.detectChanges();
    expect(button.nativeElement.disabled).toBeTruthy();
  }));

  describe('When saving', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BinsFormComponent);
      component = fixture.componentInstance;

      let binService = TestBed.get(BinsService)

      spyOn(binService, 'update').and.returnValue(Observable.from([]));
      spyOn(binService, 'create').and.returnValue(Observable.from([]));
    });

    it('should NOT update the database, if the form is invalid', () => {
      let binService = TestBed.get(BinsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(binService.update).not.toHaveBeenCalled();
    });

    it('should NOT create a new element, if the form is invalid', () => {
      let binService = TestBed.get(BinsService)
      let form = {
        valid: false
      }
      component.save(form);

      expect(binService.create).not.toHaveBeenCalled();
    });


    it('should update the database, if the new property is false and the form is valid', () => {
      let binService = TestBed.get(BinsService)
      component.new = false;
      let form = {
        valid: true
      }
      component.save(form);

      expect(binService.update).toHaveBeenCalled();
    });

    it('should create a new instance, if the new property is true and the form is valid', () => {
      let binService = TestBed.get(BinsService)
      component.new = true;
      let form = {
        valid: true
      }
      component.save(form);
      expect(binService.create).toHaveBeenCalled();
    });

    it('should NOT create an instance in the database, if the new property is defined', () => {
      let binService = TestBed.get(BinsService)
      component.new = false;
      let form = {
        value: {
          binId: 4
        },
        valid: true
      }
      expect(binService.create).not.toHaveBeenCalled();
    });
  });

  describe('When saving and error occurs', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(BinsFormComponent);
      component = fixture.componentInstance;

      let binService = TestBed.get(BinsService)

      spyOn(binService, 'update').and.returnValue(Observable.throw(Error));
      spyOn(binService, 'create').and.returnValue(Observable.throw(Error));
      spyOn(component, 'showErrorMsg').and.returnValue(Observable.throw(Error));

    });

    it('should show an error message for the attempt of creating a new instance', () => {
      let form = {
        value: {
          binId: ''
        },
        valid: true
      }

      component.save(form);

      expect(component.showErrorMsg).toHaveBeenCalled();
    });

    it('should show an error message for the attempt of updating instance', () => {
      let form = {
        value: {
          binId: 4
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

    it('should reset the bin object', () => {
      expect(component.bin).toEqual({});
    });

    it('should reset the form', () => {
      expect(component.binForm.pristine).toBeTruthy();
    });
  });

  describe('When getting the bin,', () => {

    beforeEach(() => {
      let button = fixture.debugElement.query(By.css('.btn-delete'));
    });



  });

});
