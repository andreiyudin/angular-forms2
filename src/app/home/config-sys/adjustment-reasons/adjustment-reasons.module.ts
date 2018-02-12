import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { AdjustmentReasonsFormComponent } from './adjustment-reasons-form/adjustment-reasons-form.component';
import { AdjustmentReasonsListComponent } from './adjustment-reasons-list/adjustment-reasons-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AdjustmentReasonsService } from './db-services/adjustment-reasons.service';
import { BatchesService } from '../../../shared/db-services/batches.service';


@NgModule(
    {
        declarations: [
            AdjustmentReasonsFormComponent,
            AdjustmentReasonsListComponent
        ],
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MomentModule,
            FormsModule,
            SharedModule,
            RouterModule
        ],
        providers: [
            AdjustmentReasonsService,
            BatchesService,
        ]

    })


export class AdjustmentReasonsModule {

}