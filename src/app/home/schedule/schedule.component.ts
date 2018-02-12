import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order-service';
import { PackagingOrderService } from './services/packaging-order-service';
import { MachineService } from './services/machine-service';
import * as _ from "lodash";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  orders;
  packagingOrders = [];
  ordersNotAssigned = [];
  machines = [];

  constructor(private orderService: OrderService, private packagingOrderService: PackagingOrderService, private machineService: MachineService) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    var arrayPromises = [];
    arrayPromises.push(this.orderService.getOrders().toPromise());
    arrayPromises.push(this.packagingOrderService.getPackagingOrders().toPromise());
    arrayPromises.push(this.machineService.getBreadPackagingMachines().toPromise());

    Promise.all(arrayPromises).then((items) => {
      this.orders = items[0];
      this.packagingOrders = items[1];
      this.machines = items[2];
      this.modelize();
    }).catch((errors) => {

    });
  }

  modelize() {

    this.orderService.joinPackagingOrdersToOrders(this.orders, this.packagingOrders);

    this.orders.forEach((order, i, a) => {
      order.notAssignedQty = order.quantity - this.packagingOrderService.sumPackagingOrders(order.packagingOrders);
    });

    this.ordersNotAssigned = this.orderService.getOrdersNotAssigned(this.orders);
    this.packagingOrderService.splitOrdersByMachineId(this.machines, this.packagingOrders);
    this.packagingOrderService.orderByPosition(this.machines);

  }

  updateOrders(msg) {
    let dest = this.getPackagingOrderById(msg.dest.packagingOrderId);
    let src = this.getPackagingOrderById(msg.src.packagingOrderId);

    src.machineId = dest.machineId;

    this.modelize();
  }

  getPackagingOrderById(packagingOrderId) {
    let index = _.findIndex(this.packagingOrders, { "packagingOrderId": parseInt(packagingOrderId) });
    return this.packagingOrders[index]
  }






}
