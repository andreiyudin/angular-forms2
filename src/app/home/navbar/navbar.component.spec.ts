import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HomeRouting } from '../home.routing';
import { HomeComponent } from '../home.component';
import { ConfigSystemModule } from '../config-sys/config-sys.module';
import { AuthService } from '../../auth/auth.service';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, BaseRequestOptions, Http } from '@angular/http';

const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent,HomeComponent],
      imports: [
        CommonModule,
        HomeRouting,
        ConfigSystemModule,
        RouterTestingModule,
      ],
      providers:[AuthService,{ provide: Http, useValue: mockHttpProvider },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
