import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, RequestOptions,BaseRequestOptions } from '@angular/http';
import { MetalDetectionsService } from '../db-services/metal-detections.service';
import { FormsModule } from '@angular/forms';
import { MetalDetectionFormComponent } from './metal-detection-form.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MockAuthService } from '../../../../auth/mock-auth.service';
import { AuthService } from '../../../../auth/auth.service';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions); 
  }
};



  xdescribe('MetalDetectionFormComponent', () => {
    let component: MetalDetectionFormComponent;
    let fixture: ComponentFixture<MetalDetectionFormComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          MetalDetectionFormComponent,
        ],
        imports: [
          CommonModule,
          RouterTestingModule,
          FormsModule,
          SharedModule,
          ReactiveFormsModule
        ],
  
        providers: [
  
          { provide: Http, useValue: mockHttpProvider },
           MetalDetectionsService,
          { provide: AuthService, useClass: MockAuthService },
          MockBackend,
          BaseRequestOptions
        ]
  
      })
        .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(MetalDetectionFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });

