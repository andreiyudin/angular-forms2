import { PackagingOrderService } from './packaging-order-service';
import { MachineService } from '../services/machine-service';

beforeEach(() => {


});

describe('Service: OrderService', () => {

    it('should sum the packaging orders', () => {
        let packagingOrderService = new PackagingOrderService(null);
        let packagingOrders = packagingOrderService.getFakePackagingOrders();

        let sum = packagingOrderService.sumPackagingOrders(packagingOrders);

        expect(sum).toEqual(35763);
    });


    it('should separate the orders by machine id', () => {
        let packagingOrderService = new PackagingOrderService(null);
        let packagingOrders = packagingOrderService.getFakePackagingOrders();

        let machine1Orders = packagingOrderService.getPackagingOrdersByMachineId(packagingOrders, 1);

        expect(machine1Orders.length).toEqual(3);
    });

    it('should put the packaging orders to the right machine', () => {

        let packagingOrderService = new PackagingOrderService(null);
        let machineService = new MachineService(null);

        let packagingOrders = packagingOrderService.getFakePackagingOrders();
        let machines = machineService.getFakeBreadPackagingMachines();

        packagingOrderService.splitOrdersByMachineId(machines, packagingOrders);

        expect(machines[0].orders.length).toEqual(3);

    });

    it('should retrieve the correct order by an element structure', () => {
        let packagingOrderService = new PackagingOrderService(null);
        let packagingOrders = packagingOrderService.getFakePackagingOrders();

        let element = {
            attributes: {
                packagingOrderId: {
                    value: '1'
                }
            }
        };


        let order = packagingOrderService.getOrderByElement(packagingOrders, element);

        expect(order.packagingOrderId).toEqual(parseInt(element.attributes.packagingOrderId.value));

    });

    it('should sort the orders by position and reassign them', () => {
        let packagingOrderService = new PackagingOrderService(null);

        let fakeMachineData = [{
            "orders":
                [{ "position": 4 }, { "position": 4.1 }, { "position": 1 }, { "position": 2.2 }]
        }]

        packagingOrderService.orderByPosition(fakeMachineData);

        expect(fakeMachineData[0].orders[0].position).toEqual(1);
        expect(fakeMachineData[0].orders[fakeMachineData[0].orders.length-1].position).toEqual(fakeMachineData[0].orders.length);

    });

});