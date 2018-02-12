import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routing } from '../app.routing';
import { AuthService } from './auth.service';

@NgModule(
    {
        declarations: [
            AuthComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            routing
        ]

    })


export class AuthModule {

}