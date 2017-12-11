import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { CategoryComponent } from './category.component';
import { CategoryService } from '../services/category.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryViewComponent } from './category-view/category-view.component';

// import alert service and component
import { AlertComponent } from '../_directives/index';
import { AlertService } from '../_services/index';

const assetRouting: ModuleWithProviders = RouterModule.forChild([
		{
			path: 'categories',
			component: CategoryComponent,
		},
		{
			path: 'categories/create',
			component: CategoryCreateComponent
		},
		{
    		path: 'categories/edit/:id',
    		component: CategoryEditComponent
		},
		{
			path: 'categories/:id',
			component: CategoryViewComponent
		}
		  
]);


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
    assetRouting,
    Ng2SmartTableModule,
	],
	declarations: [
		CategoryComponent,
		CategoryCreateComponent,
		CategoryEditComponent,
		CategoryViewComponent,
		AlertComponent
	],
	providers: [
		CategoryService,
		AlertService
	]
})
export class CategoriesModule { }
