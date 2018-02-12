import { Component, OnInit, Input, HostListener, EventEmitter, Output,ElementRef} from '@angular/core';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Input() contextMenu;
  @Output() idSelected: EventEmitter<any> = new EventEmitter( );

  constructor(private _elementRef: ElementRef) {
    this.contextMenu = {};

  }

  ngOnInit() {

  }

  selectItem(item) {
    this.idSelected.emit(item);
    this.contextMenu.show = false;
  }


}
