import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common'
import { NoteHistoricalComponent } from './notes-historical.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, RequestOptions,BaseRequestOptions } from '@angular/http';
import { NotesService } from '../db-services/notes.service';

import { FormsModule } from '@angular/forms';

const mockHttpProvider = {
  deps: [ MockBackend, BaseRequestOptions ],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
  }
};

xdescribe('NoteHistoricalComponent', () => {
  let component: NoteHistoricalComponent;
  let fixture: ComponentFixture<NoteHistoricalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteHistoricalComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        FormsModule
      ],

      providers: [

        { provide: Http, useValue: mockHttpProvider },
       NotesService,
        MockBackend,
        BaseRequestOptions
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
