import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';

@Component({
  selector: 'date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {
  @Output() filtersSelected: EventEmitter<any> = new EventEmitter();
  @Input() filters;
  dateFilterForm: FormGroup;

  constructor() {

  }

  ngOnInit() {
    this.dateFilterForm = new FormGroup(
      {
        from: new FormControl(this.filters.from, null),
        to: new FormControl(this.filters.to, null),
        nbPeriods: new FormControl(this.filters.nbPeriods, null),
        period: new FormControl(this.filters.period, null),
      }
    );
    this.changePeriodRange();
  }

  changeDate() {
    this.dateFilterForm.controls['nbPeriods'].setValue('');
    this.dateFilterForm.controls['to'].setValue(moment(this.dateFilterForm.controls['to'].value).format('YYYY-MM-DD'));
    this.dateFilterForm.controls['from'].setValue(moment(this.dateFilterForm.controls['from'].value).format('YYYY-MM-DD'));
    this.filtersSelected.emit(this.dateFilterForm.value);
  }

  changePeriodRange() {
    let periods = this.dateFilterForm.controls['period'].value;
    let nbPeriods = this.dateFilterForm.controls['nbPeriods'].value;

    if (!nbPeriods) {
      nbPeriods = 1;
      this.dateFilterForm.controls['nbPeriods'].setValue(nbPeriods);
    }

    if (!periods) {
      periods = 'Jour',
      this.dateFilterForm.controls['period'].setValue(periods);
    }

    if (periods && periods != 'Dernier') {
      let newFromFilter = '';
      switch (periods) {
        case 'Jour':
          newFromFilter = moment(this.dateFilterForm.controls['to'].value).subtract(nbPeriods, 'days').format('YYYY-MM-DD');
          break;
        case 'Semaine':
          newFromFilter = moment(this.dateFilterForm.controls['to'].value).subtract(nbPeriods, 'weeks').format('YYYY-MM-DD');
          break;
        case 'Mois':
          newFromFilter = moment(this.dateFilterForm.controls['to'].value).subtract(nbPeriods, 'months').format('YYYY-MM-DD');
          break;
      }
      this.dateFilterForm.controls['to'].setValue(moment(this.dateFilterForm.controls['to'].value).format('YYYY-MM-DD'));
      this.dateFilterForm.controls['from'].setValue(newFromFilter);

    }

    this.filtersSelected.emit(this.dateFilterForm.value);
  }



}
