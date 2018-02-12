import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { MetalDetectionHistoricalComponent } from './metal-detection-historical.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, RequestOptions,BaseRequestOptions } from '@angular/http';
import { MetalDetectionsService } from '../db-services/metal-detections.service';

import { FormsModule } from '@angular/forms';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
  }
};

xdescribe('MetalDetectionHistoricalComponent', () => {
  let component: MetalDetectionHistoricalComponent;
  let fixture: ComponentFixture<MetalDetectionHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MetalDetectionHistoricalComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        FormsModule
      ],

      providers: [

        { provide: Http, useValue: mockHttpProvider },
       MetalDetectionsService,
        MockBackend,
        BaseRequestOptions
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetalDetectionHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
