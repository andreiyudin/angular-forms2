import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { NoteFormComponent } from './notes-form/notes-form.component';
import { NoteHistoricalComponent } from './notes-historical/notes-historical.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NotesService } from './db-services/notes.service';

@NgModule(
    {
        declarations: [
            NoteFormComponent,
            NoteHistoricalComponent
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
            NotesService
        ]

    })


export class NotesModule {

}