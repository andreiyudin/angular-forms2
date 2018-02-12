import { async, ComponentFixture, TestBed ,} from '@angular/core/testing';
import { UsersService } from '../db-services/users.service';
import { UsersComponent } from './users-list.component';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core'

const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

describe('UserListComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ RouterTestingModule ],
      schemas:[NO_ERRORS_SCHEMA],
      providers:[UsersService,
        { provide: Http, useValue: mockHttpProvider }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    let usersService = TestBed.get(UsersService)
    spyOn(usersService, 'getUsers').and.returnValue(Observable.from([]));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  
});
