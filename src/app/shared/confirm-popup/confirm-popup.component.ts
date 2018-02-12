import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {
  @Input() confirmPopup: any;
  @Output() response: EventEmitter<any> = new EventEmitter();
 
  constructor() {

  }

  ngOnInit() {

  }

  ok() {
    this.confirmPopup.responseSubject.next(true)
  }

  cancel() {
    this.confirmPopup.responseSubject.next(false)
  }

}
