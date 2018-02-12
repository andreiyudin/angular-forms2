import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { OrderListComponent } from './order-list.component';
import { mockHttpProvider } from '../../../shared/mock-http-provider/mock-http-provider';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OrderService } from 'app/home/schedule/services/order-service';


describe('orderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent],
      providers: [
        { provide: Http, useValue: mockHttpProvider }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
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











});
