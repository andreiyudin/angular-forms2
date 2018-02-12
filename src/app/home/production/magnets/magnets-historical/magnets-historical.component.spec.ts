import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { MagnetsHistoricalComponent } from './magnets-historical.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpModule, BaseRequestOptions, Http,XHRBackend } from '@angular/http';
import { MagnetsService } from '../db-services/magnets.service';

import { MockBackend, MockConnection } from '@angular/http/testing';

const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};

xdescribe('MagnetsHistoricalComponent', () => {
  let component: MagnetsHistoricalComponent;
  let fixture: ComponentFixture<MagnetsHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MagnetsHistoricalComponent],
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
         MagnetsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnetsHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
