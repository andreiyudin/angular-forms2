import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { DowntimeReasonsFormComponent } from './downtime-reasons-form/downtime-reasons-form.component';
import { DowntimeReasonsListComponent } from './downtime-reasons-list/downtime-reasons-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DowntimeReasonsService } from './db-services/downtime-reasons.service';
import { BatchesService } from '../../../shared/db-services/batches.service';


@NgModule(
    {
        declarations: [
            DowntimeReasonsFormComponent,
            DowntimeReasonsListComponent
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
            DowntimeReasonsService,
            BatchesService,
        ]

    })


export class DowntimeReasonsModule {

}