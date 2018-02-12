import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { ScheduleComponent } from './schedule.component';
import { OrderService } from './services/order-service';
import { MachineService } from './services/machine-service';
import { PackagingOrderService } from './services/packaging-order-service';
import { mockHttpProvider } from '../../shared/mock-http-provider/mock-http-provider';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA } from '@angular/core/src/metadata/ng_module';
import * as _ from "lodash";

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [OrderService, PackagingOrderService, MachineService,
        { provide: Http, useValue: mockHttpProvider }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;

    let orderService = TestBed.get(OrderService)
    let packagingOrderService = TestBed.get(PackagingOrderService)

    let orders = (orderService.getFakeOrders());

    spyOn(orderService, 'getOrders').and.returnValue(Observable.of(orderService.getFakeOrders()));
    spyOn(packagingOrderService, 'getPackagingOrders').and.returnValue(Observable.of(packagingOrderService.getFakePackagingOrders()));

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should get the orders', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.orders.length).toEqual(17);
    });
  });

  it('should get the packaging orders', async () => {

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.packagingOrders.length).toEqual(14);
    });

  });

  it('should get the correct order unassigned quantity', async () => {

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.orders[10].notAssignedQty).toEqual(2690);
    });

  });

  it('should call the modelize functions', () => {
    let orderService = TestBed.get(OrderService)
    let fakeOrderService = new OrderService(null);
    let packagingOrderService = TestBed.get(PackagingOrderService)

    component.orders = fakeOrderService.getFakeOrders();

    spyOn(orderService, 'getOrdersNotAssigned');
    spyOn(orderService, 'joinPackagingOrdersToOrders');
    spyOn(packagingOrderService, 'sumPackagingOrders');

    component.modelize();

    expect(orderService.joinPackagingOrdersToOrders).toHaveBeenCalled();
    expect(orderService.getOrdersNotAssigned).toHaveBeenCalled();
    expect(packagingOrderService.sumPackagingOrders).toHaveBeenCalledTimes(component.orders.length);

  });

  it('should show the right number of machine order list',()=>{
    let machineService = new MachineService(null);
    component.machines = machineService.getFakeBreadPackagingMachines();

    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('packaging-order-list'));

    
    expect(de.length).toEqual(component.machines.length);
  }); 

  it('should show an error message, if there is a db error', async () => {

    expect(true).toBeFalsy();
  })


});
