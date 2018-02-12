import { OrderService } from './order-service';
import { PackagingOrderService } from './packaging-order-service';

beforeEach(() => {


});

describe('Service: OrderService', () => {

    it('should join packagingOrder to Order', () => {
        let orderService = new OrderService(null);
        let orders = orderService.getFakeOrders();
        let packagingOrderService = new PackagingOrderService(null);
        let packagingOrders = packagingOrderService.getFakePackagingOrders();

        orderService.joinPackagingOrdersToOrders(orders, packagingOrderService.getFakePackagingOrders());
        
        expect(orders[10]["packagingOrders"].length).toEqual(2);
    });



    it('should get the correct unassigned orders', () => {
        let orderService = new OrderService(null);
        let orders = orderService.getFakeOrders();

        let ordersNotAssigned = orderService.getOrdersNotAssigned(orders);

        expect(ordersNotAssigned.length).toEqual(3);
    });





});