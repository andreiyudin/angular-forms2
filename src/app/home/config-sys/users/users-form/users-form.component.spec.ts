import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '../../../../shared/alert/alert.component';
import { ConfirmPopupComponent } from '../../../../shared/confirm-popup/confirm-popup.component';
import { UsersFormComponent } from './users-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../db-services/users.service';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable, Subject } from 'rxjs';


const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};


describe('UserFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFormComponent,AlertComponent,ConfirmPopupComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule
      ],
      providers:[UsersService,{ provide: Http, useValue: mockHttpProvider }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;

    let usersService = TestBed.get(UsersService)

    spyOn(usersService, 'getUser').and.returnValue(Observable.from([]));

    fixture.detectChanges();
  });

  it('should be created', () => {

    expect(component).toBeTruthy();
  });

});
