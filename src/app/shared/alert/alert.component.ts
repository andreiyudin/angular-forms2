import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() alertMessage;

  constructor() {

  }

  ngOnInit() {
    this.alertMessage = this.alertMessage || {"timeout":0}
  }

  ngOnChanges(changes: any) {
    
    this.alertMessage = this.alertMessage || {};
    if (this.alertMessage.timeout > 0) {
      this.clearMessage(this.alertMessage.timeout);
    }

  }

  clearMessage(time) {
    setTimeout(() => {
      this.alertMessage = {};
    }, time);
  }

  
}
