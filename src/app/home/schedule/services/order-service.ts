import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';
import 'rxjs/Rx';
import * as _ from "lodash";

enum States {
    NotAssigned = 0,
    Assigned,
    Processing,
    Ended
}

@Injectable()
export class OrderService {
    private headers = new Headers;

    public States = States;

    constructor(private http: Http) {

    }

    getOrders() {
        return Observable.of(this.getFakeOrders());
        // return this.http.get('orders/', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    }

    joinPackagingOrdersToOrders(orders, packagingOrders) {
        orders.forEach(function (order, i, a) {
            order.packagingOrders = _.filter(packagingOrders, { "orderId": order.orderId }) || [];
        });
    }

    adjustDateTime(orders) {
        orders = orders.json();

        orders.forEach(inventoryTransfer => {
            orders.datetime = moment(orders.datetime).format("YYYY-MM-DD HH:mm");
        });

        return orders;
    }

    getOrdersNotAssigned(orders) {
        return _.filter(orders, (o) => { return o.notAssignedQty > 0 })
    }

    private handleError(error: any) {
        return Observable.throw(error.json());
    }

    // [
    //     '{{repeat(17, 17)}}',
    //      {   
    //         orderId:'{{index()}}',
    //         sku:'{{integer(100, 200)}}',
    //            state:'{{integer(0, 3)}}',
    //         quantity:'{{integer(1200, 3343)}}'
    //      }
    // ]

    getFakeOrders() {
        return [
            {
                "orderId": 0,
                "sku": 141,
                "state": 0,
                "quantity": 2799,
                "notAssignedQty": 0
            },
            {
                "orderId": 1,
                "sku": 143,
                "state": 1,
                "quantity": 2514,
                "notAssignedQty": 0
            },
            {
                "orderId": 2,
                "sku": 135,
                "state": 0,
                "quantity": 1529,
                "notAssignedQty": 0
            },
            {
                "orderId": 3,
                "sku": 133,
                "state": 2,
                "quantity": 2431,
                "notAssignedQty": 0
            },
            {
                "orderId": 4,
                "sku": 122,
                "state": 0,
                "quantity": 2934,
                "notAssignedQty": 0
            },
            {
                "orderId": 5,
                "sku": 141,
                "state": 2,
                "quantity": 3045,
                "notAssignedQty": 0
            },
            {
                "orderId": 6,
                "sku": 197,
                "state": 0,
                "quantity": 1597,
                "notAssignedQty": 0
            },
            {
                "orderId": 7,
                "sku": 185,
                "state": 0,
                "quantity": 1627,
                "notAssignedQty": 0
            },
            {
                "orderId": 8,
                "sku": 197,
                "state": 0,
                "quantity": 2866,
                "notAssignedQty": 0
            },
            {
                "orderId": 9,
                "sku": 171,
                "state": 3,
                "quantity": 2760,
                "notAssignedQty": 12
            },
            {
                "orderId": 10,
                "sku": 183,
                "state": 3,
                "quantity": 7500,
                "notAssignedQty": 11
            },
            {
                "orderId": 11,
                "sku": 188,
                "state": 1,
                "quantity": 1331,
                "notAssignedQty": 10
            },
            {
                "orderId": 12,
                "sku": 171,
                "state": 0,
                "quantity": 2597,
                "notAssignedQty": 0
            },
            {
                "orderId": 13,
                "sku": 143,
                "state": 3,
                "quantity": 1804,
                "notAssignedQty": 0
            },
            {
                "orderId": 14,
                "sku": 128,
                "state": 1,
                "quantity": 3206,
                "notAssignedQty": 0
            },
            {
                "orderId": 15,
                "sku": 138,
                "state": 0,
                "quantity": 2426,
                "notAssignedQty": 0
            },
            {
                "orderId": 16,
                "sku": 171,
                "state": 0,
                "quantity": 3323,
                "notAssignedQty": 0
            }
        ]
    }


}
