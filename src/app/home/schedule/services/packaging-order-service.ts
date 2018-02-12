import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';
import 'rxjs/Rx';
import * as _ from "lodash";


@Injectable()
export class PackagingOrderService {
    private headers = new Headers;

    constructor(private http: Http) {

    }

    getPackagingOrders() {
        return Observable.of(this.getFakePackagingOrders());
        // return this.http.get('packaging-orders/', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    }

    adjustDateTime(orders) {
        orders = orders.json();

        orders.forEach(inventoryTransfer => {
            orders.datetime = moment(orders.datetime).format("YYYY-MM-DD HH:mm");
        });

        return orders;
    }

    sumPackagingOrders(packagingOrders) {
        let sum = 0;

        packagingOrders.forEach(function (order, i, a) {
            sum += order.quantity;
        });

        return sum;
    }


    getPackagingOrdersByMachineId(orders, machineId) {
        return _.filter(orders, { "machineId": machineId })
    }

    splitOrdersByMachineId(machines, packagingOrders) {
        machines.forEach((machine, i, a) => {
            machine.orders = _.orderBy(_.filter(packagingOrders, { 'machineId': machine.machineId }), ['position'], ['asc'])
        });
    }

    orderByPosition(machines) {
        machines.forEach((machine, i, a) => {
            machine.orders = _.orderBy(machine.orders, ['position'], ['asc'])
            machine.orders.forEach(function (order, i, a) {
                order.position = i + 1;
            });
        });
    }


    getOrderByElement(orders, element) {

        let packagingOrderId = element["attributes"]["packagingOrderId"].value;
        let index = _.findIndex(orders, { "packagingOrderId": parseInt(packagingOrderId) });

        return orders[index];
    }

    // [
    //     '{{repeat(14, 14)}}',
    //       {   
    //         orderId:'{{integer(1, 17)}}',
    //         packagingOrderId:'{{index()}}',
    //         quantity:'{{integer(1200, 3343)}}'
    //       }
    //  ]
    getFakePackagingOrders() {
        return [
            {
                "orderId": 4,
                "packagingOrderId": 0,
                "sku": 3,
                "quantity": 3269,
                "machineId": 1,
                "position": 1

            },
            {
                "orderId": 15,
                "packagingOrderId": 1,
                "sku": 4,
                "quantity": 3076,
                "machineId": 2,
                "position": 1
            },
            {
                "orderId": 16,
                "packagingOrderId": 2,
                "sku": 5,
                "quantity": 1633,
                "machineId": 3,
                "position": 1
            },
            {
                "orderId": 9,
                "packagingOrderId": 3,
                "quantity": 2761,
                "sku": 6,
                "machineId": 3,
                "position": 2
            },
            {
                "orderId": 2,
                "packagingOrderId": 4,
                "quantity": 2298,
                "sku": 7,
                "machineId": 4,
                "position": 1
            },
            {
                "orderId": 10,
                "packagingOrderId": 5,
                "quantity": 2939,
                "sku": 7,
                "machineId": 2,
                "position": 2
            },
            {
                "orderId": 9,
                "packagingOrderId": 6,
                "quantity": 2834,
                "sku": 8,
                "machineId": 1,
                "position": 2
            },
            {
                "orderId": 10,
                "packagingOrderId": 7,
                "quantity": 1871,
                "sku": 9,
                "machineId": 2,
                "position": 3
            },
            {
                "orderId": 5,
                "packagingOrderId": 8,
                "quantity": 2717,
                "sku": 10,
                "machineId": 3,
                "position": 3
            },
            {
                "orderId": 3,
                "packagingOrderId": 9,
                "quantity": 2224,
                "sku": 11,
                "machineId": 4,
                "position": 2
            },
            {
                "orderId": 7,
                "packagingOrderId": 10,
                "quantity": 1526,
                "sku": 12,
                "machineId": 3,
                "position": 4
            },
            {
                "orderId": 1,
                "packagingOrderId": 11,
                "quantity": 3210,
                "sku": 13,
                "machineId": 2,
                "position": 4
            },
            {
                "orderId": 17,
                "packagingOrderId": 12,
                "quantity": 2081,
                "sku": 14,
                "machineId": 2,
                "position": 5
            },
            {
                "orderId": 6,
                "packagingOrderId": 13,
                "quantity": 3324,
                "sku": 15,
                "machineId": 1,
                "position": 3
            }
        ]
    }


}
