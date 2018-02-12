import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import { PackagingOrderService } from '../services/packaging-order-service';

@Component({
  selector: 'packaging-order-list',
  templateUrl: './packaging-order-list.component.html',
  styleUrls: ['./packaging-order-list.component.css']
})
export class PackagingOrderListComponent implements OnInit {
  @Input() title;
  @Input() orders = [];
  @Output() updateOrders = new EventEmitter();

  test = false;
  constructor(private packagingOrderService: PackagingOrderService) { }

  ngOnInit() {

  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {

    event.dataTransfer.setData('draggedPackagingOrder', JSON.stringify(this.packagingOrderService.getOrderByElement(this.orders, event.srcElement)));

  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {

    event.preventDefault();

  }

  @HostListener('drop', ['$event']) onDrop(event) {

    let msg = {
      src: JSON.parse(event.dataTransfer.getData('draggedPackagingOrder')),
      dest: this.packagingOrderService.getOrderByElement(this.orders, event.srcElement.parentElement)
    }

    this.updateOrders.emit(msg);

  }




}
