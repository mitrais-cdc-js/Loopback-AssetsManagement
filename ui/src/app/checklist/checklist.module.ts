import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChecklistComponent } from './checklist.component';
import { ChecklistCreateComponent } from './checklist-create/checklist-create.component';
import { ChecklistEditComponent } from './checklist-edit/checklist-edit.component';

import { ChecklistService } from '../services/checklist.service'
// import alert service and component
// import { AlertComponent } from '../_directives/index';
// import { AlertService } from '../_services/index';

const checklistRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'checklists',
		component: ChecklistComponent,
    },
    {
        path: 'checklists/create',
        component: ChecklistCreateComponent
    }

]);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		checklistRouting
	],
	declarations: [
        // AlertComponent,
		ChecklistComponent,
		ChecklistCreateComponent,
        ChecklistEditComponent,
        
    ],
    providers: [
        ChecklistService
		// AlertService
	]
})
export class ChecklistModule { }
