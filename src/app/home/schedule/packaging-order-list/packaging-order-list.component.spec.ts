import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { PackagingOrderListComponent } from './packaging-order-list.component';
import { mockHttpProvider } from '../../../shared/mock-http-provider/mock-http-provider';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OrderService } from 'app/home/schedule/services/order-service';
import { PackagingOrderService } from '../services/packaging-order-service';

export const mockEvent = {
  event: {
    "dataTransfer": {
      "getData": function (data) {
        return "[{}]";
      }
    },
    "srcElement": {
      "parentElement": {

      }
    },
  }
};

describe('PackagingOrderListComponent', () => {
  let component: PackagingOrderListComponent;
  let fixture: ComponentFixture<PackagingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PackagingOrderListComponent],
      providers: [
        { provide: Http, useValue: mockHttpProvider }, PackagingOrderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagingOrderListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the right title', () => {
    let de = fixture.debugElement.query(By.css('.title'));
    component.title = 'Machine 1';
    fixture.detectChanges();
    expect(de.nativeElement.innerText).toEqual(component.title);
  });

  it('should show the correct number of orders', async () => {
    let orderService = new OrderService(null);
    component.orders = orderService.getFakeOrders();

    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.order'));

    expect(de.length).toEqual(17);

  });

  it('should call the function to retrieve the orders, when an order is dropped', () => {
    let packagingOrderService = TestBed.get(PackagingOrderService);

    let event = {
      "dataTransfer": {
        "getData": function (data) {
          return "[{}]";
        }
      },
      "srcElement": {
        "parentElement": {

        }
      },
    }

    spyOn(packagingOrderService, 'getOrderByElement').and.returnValue({});

    component.onDrop(event);

    expect(packagingOrderService.getOrderByElement).toHaveBeenCalledWith(component.orders, event.srcElement.parentElement);

  });




});
