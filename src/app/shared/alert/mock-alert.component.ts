import { Directive, OnInit, Input, Output } from '@angular/core';

@Directive({
    selector: 'alert'
  })
  export class MockAlertComponent{
    @Input() alertMessage;

  }