import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChecklistComponent } from './checklist.component';

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
    ChecklistComponent
  ]
})
export class ChecklistModule { }
