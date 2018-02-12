import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { BinsFormComponent } from './bins-form/bins-form.component';
import { BinsListComponent } from './bins-list/bins-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BinsService } from './db-services/bins.service';
import { BatchesService } from '../../../shared/db-services/batches.service';


@NgModule(
    {
        declarations: [
            BinsFormComponent,
            BinsListComponent
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
            BinsService,
            BatchesService,
        ]

    })


export class BinsModule {

}