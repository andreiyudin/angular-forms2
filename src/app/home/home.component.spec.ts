import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common'
import { HomeRouting } from './home.routing';
import { ProductionModule } from './production/production.module';
import { ConfigSystemModule } from '../home/config-sys/config-sys.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
xdescribe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, NavbarComponent],
      imports: [
        CommonModule,
        HomeRouting,
        ProductionModule,
        ConfigSystemModule,
        RouterTestingModule,
      ],
      providers:[AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
