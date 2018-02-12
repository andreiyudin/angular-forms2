import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigSystemModule } from './config-sys/config-sys.module';
import { ConfigService } from '../shared/services/config.service';
import { CanActivateOperator } from "../shared/auth-guard/canActivateOperator.service";
import { CanActivateAdmin } from "../shared/auth-guard/canActivateAdmin.service";


@NgModule(
    {
        declarations: [
            NavbarComponent,
            HomeComponent,
        ],
        imports: [
            CommonModule,
            HomeRouting,
            ConfigSystemModule,
            ScheduleModule
        ],
        providers: [ConfigService, CanActivateOperator, CanActivateAdmin]
    })


export class HomeModule {

}