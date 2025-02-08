import { Routes } from '@angular/router';
import { DoorDesignAddComponent } from './door-design-add/door-design-add.component';
import { DoorDesignEditComponent } from './door-design-edit/door-design-edit.component';
import { DoorDesignListComponent } from './door-design-list/door-design-list.component';
export const routes: Routes = [
    { path: '', redirectTo: 'door-design-list', pathMatch: 'full' },
    { path: 'door-design-list', component: DoorDesignListComponent },
    { path: 'door-design-add', component: DoorDesignAddComponent },
    { path: 'door-design-edit/:id', component: DoorDesignEditComponent }
];
