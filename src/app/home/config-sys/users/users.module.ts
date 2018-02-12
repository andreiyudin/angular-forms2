import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { FormsModule } from '@angular/forms';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersComponent } from './users-list/users-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { UsersService } from './db-services/users.service';
import { BatchesService } from '../../../shared/db-services/batches.service';


@NgModule(
    {
        declarations: [
            UsersFormComponent,
            UsersComponent
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
            UsersService,
            BatchesService,
        ]

    })


export class UsersModule {

}