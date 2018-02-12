import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MetalDetectionModule } from './metal-detection/metal-detection.module';
import { MagnetsModule } from './magnets/magnets.module';
import { NotesModule } from './notes/notes.module';
import { RouterModule, Routes } from '@angular/router';
import { MachinesService } from '../../shared/db-services/machines.service';

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
            MetalDetectionModule,
            MagnetsModule,
            RouterModule,
            NotesModule
        ],
        providers: [
            MachinesService
        ]

    })


export class ProductionModule {

}