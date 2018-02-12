import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.css']
})
export class PopOverComponent implements OnInit {
  @Input() popover: any;

  constructor() {

  }

  ngOnInit() {
    this.popover = this.popover || {};
  }


  @HostListener('drop', ['$event']) onDrop(event) {

    event.preventDefault();

  }

  @HostListener('dragover', ['$event']) onDragOver(event) {

    event.preventDefault();

  }


}
