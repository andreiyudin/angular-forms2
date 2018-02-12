import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from '../app.routing';
import { CommonModule } from '@angular/common'
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from "../shared/http/http.factory";
import {APP_BASE_HREF} from '@angular/common';


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule,ReactiveFormsModule,HttpModule,routing,CommonModule],
      providers: [{
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions],
      },{provide: APP_BASE_HREF, useValue : '/' }],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
