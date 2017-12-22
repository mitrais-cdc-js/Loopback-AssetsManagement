import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChecklistComponent } from './checklist.component';
import { ChecklistCreateComponent } from './checklist-create/checklist-create.component';
import { ChecklistEditComponent } from './checklist-edit/checklist-edit.component';

const checklistRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'checklists',
    component: ChecklistComponent,
  }

]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    checklistRouting
  ],
  declarations: [
    ChecklistComponent,
    ChecklistCreateComponent,
    ChecklistEditComponent
  ]
})
export class ChecklistModule { }
