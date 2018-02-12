import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { MetalDetectionFormComponent } from './metal-detection-form/metal-detection-form.component';
import { MetalDetectionHistoricalComponent } from './metal-detection-historical/metal-detection-historical.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MetalDetectionsService } from './db-services/metal-detections.service';

@NgModule(
    {
        declarations: [
            MetalDetectionFormComponent,
            MetalDetectionHistoricalComponent
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
            MetalDetectionsService
        ]

    })


export class MetalDetectionModule {

}