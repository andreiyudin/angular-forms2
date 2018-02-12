import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';

import { LSSolver } from '../../tools/solver';
import { ScheduleComponent } from '../schedule/schedule.component';
import { OrderListComponent } from '../schedule/order-list/order-list.component';
import { PackagingOrderListComponent } from '../schedule/packaging-order-list/packaging-order-list.component';
import { OrderService } from '../schedule/services/order-service';
import { PackagingOrderService } from '../schedule/services/packaging-order-service';
import { MachineService } from '../schedule/services/machine-service';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule(
    {
        declarations: [
            ScheduleComponent,
            OrderListComponent,
            PackagingOrderListComponent,
            OrderFormComponent
        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MomentModule,
            FormsModule,
        ],
        providers: [
            LSSolver,
            OrderService,
            PackagingOrderService,
            MachineService
        ]
    })


export class ScheduleModule {

}