import { RouterModule, Routes,Route } from "@angular/router";
import { ProductsFormComponent } from './products-form/products-form.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
export const ProductsRouting: Route =
    {
        path: 'products',  children: [
            { path: 'form/:id', component: ProductsFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'list', component: ProductsListComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 