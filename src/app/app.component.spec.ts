import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { httpFactory } from "./shared/http/http.factory";
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        AuthModule,
        HomeModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{
        provide: Http,
        useFactory: httpFactory,
        deps: [XHRBackend, RequestOptions],
      },{provide: APP_BASE_HREF, useValue : '/' }],

    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Prograin-MES');
  }));


});
