import { RouterModule, Routes,Route } from "@angular/router";
import { NoteFormComponent } from './notes-form/notes-form.component';
import { NoteHistoricalComponent } from './notes-historical/notes-historical.component';
import { CanActivateOperator } from "../../../shared/auth-guard/canActivateOperator.service";
import { CanActivateAdmin} from "../../../shared/auth-guard/canActivateAdmin.service";

export const NotesRouting: Route =
    {
        path: 'notes',  children: [
            { path: 'form/:id', component: NoteFormComponent,canActivate: [CanActivateOperator]  },
            { path: 'form/edit/:id', component: NoteFormComponent,canActivate: [CanActivateAdmin]  },
            { path: 'historical', component: NoteHistoricalComponent,canActivate: [CanActivateOperator]  }
        ]
    };

 