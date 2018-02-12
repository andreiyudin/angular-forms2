import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFilterComponent } from './date-filter.component';
import { By } from '@angular/platform-browser';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateFilterComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
    component.filters = {
      from: '2017-01-01',
      to: '2017-04-01'
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should change the from filter,when it has been changed to month period', () => {
    component.dateFilterForm.controls['period'].setValue('Mois');
    component.dateFilterForm.controls['nbPeriods'].setValue('2');

    component.changePeriodRange();

    expect(component.dateFilterForm.controls['from'].value).toEqual('2017-02-01')

  });

  it('should change the from filter,when it has been changed to day period', () => {
    component.dateFilterForm.controls['period'].setValue('Jour');
    component.dateFilterForm.controls['nbPeriods'].setValue('8');

    component.changePeriodRange();


    expect(component.dateFilterForm.controls['from'].value).toEqual('2017-03-24')
  });

  it('should change the from filter,when it has been changed to week period', () => {
    component.dateFilterForm.controls['period'].setValue('Semaine');
    component.dateFilterForm.controls['nbPeriods'].setValue('2');

    component.changePeriodRange();

    expect(component.dateFilterForm.controls['from'].value).toEqual('2017-03-18')
  });


});
