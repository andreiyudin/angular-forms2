import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { MagnetsFormComponent } from './magnets-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MagnetsService } from '../db-services/magnets.service';

import { MockAuthService } from '../../../../auth/mock-auth.service';
import { AuthService } from '../../../../auth/auth.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule,BaseRequestOptions,Http} from '@angular/http';
import { SharedModule } from '../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
  }
};

xdescribe('MagnetsFormComponent', () => {
  let component: MagnetsFormComponent;
  let fixture: ComponentFixture<MagnetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MagnetsFormComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        FormsModule,
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        { provide: Http, useValue: mockHttpProvider }, 
         MagnetsService,
        { provide: AuthService, useClass: MockAuthService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
