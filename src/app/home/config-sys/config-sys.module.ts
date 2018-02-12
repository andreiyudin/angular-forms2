import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { BinsModule } from './bins/bins.module';
import { UsersModule } from './users/users.module';
import { DowntimeReasonsModule } from './downtime-reasons/downtime-reasons.module';
import { AdjustmentReasonsModule } from './adjustment-reasons/adjustment-reasons.module';

import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


@NgModule(
    {
        declarations: [

        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MomentModule,
            FormsModule,
            SharedModule,
            RouterModule,
            ProductsModule,
            BinsModule,
            UsersModule,
            DowntimeReasonsModule,
            AdjustmentReasonsModule
        ],
        providers: [
    
        ]
    })


export class ConfigSystemModule {

}