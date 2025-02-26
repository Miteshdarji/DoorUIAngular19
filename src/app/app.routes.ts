import { Routes } from '@angular/router';
import { DoorDesignAddComponent } from './door-design-add/door-design-add.component';
import { DoorDesignEditComponent } from './door-design-edit/door-design-edit.component';
import { DoorDesignListComponent } from './door-design-list/door-design-list.component';
import { DoorMasterQuoteComponent } from './door-master-quote/door-master-quote.component';
import { CustomerQuoteComponent } from './customer-quote/customer-quote.component';
import { PullSheetComponent } from './pull-sheet/pull-sheet.component';
export const routes: Routes = [
    { path: '', redirectTo: 'door-design-add', pathMatch: 'full' },
    { path: 'door-design-list', component: DoorDesignListComponent },
    { path: 'door-design-add', component: DoorDesignAddComponent },
    { path: 'door-design-edit/:id', component: DoorDesignEditComponent },
    { path: 'door-master-quote', component: DoorMasterQuoteComponent },
    { path: 'customer-quote', component: CustomerQuoteComponent },
    { path: 'pull-sheet', component: PullSheetComponent }
];
