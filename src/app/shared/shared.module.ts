import { AlertComponent } from './alert/alert.component';
import { CommonModule, NgClass } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component';
import { PopOverComponent } from './pop-over/pop-over.component';
import { TypeaheadComponent } from './typeahead/typeahead.component'
import { BinsService } from './db-services/bins.service'
import { ProductsService } from './db-services/products.service';
import { DateFilterComponent } from './date-filter/date-filter.component'


@NgModule(
    {
        declarations: [
            AlertComponent,
            ContextMenuComponent,
            ConfirmPopupComponent,
            PopOverComponent,
            TypeaheadComponent,
            DateFilterComponent,
        ],
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule 
        ],
        exports: [
            AlertComponent,
            ContextMenuComponent,
            ConfirmPopupComponent,
            PopOverComponent,
            TypeaheadComponent,
            DateFilterComponent
        ],
        providers: [
            BinsService,
            ProductsService
        ]


    })


export class SharedModule {

}