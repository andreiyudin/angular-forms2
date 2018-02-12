import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { MagnetsFormComponent } from './magnets-form/magnets-form.component';
import { MagnetsHistoricalComponent } from './magnets-historical/magnets-historical.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MagnetsService } from './db-services/magnets.service';

@NgModule(
    {
        declarations: [
            MagnetsFormComponent,
            MagnetsHistoricalComponent
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
            MagnetsService
        ]

    })


export class MagnetsModule {

}