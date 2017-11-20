import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CategoryComponent } from './category.component';
import { CategoryService } from '../services/category.service';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

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
  		}
]);


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		assetRouting,
	],
	declarations: [
		CategoryComponent,
		CategoryCreateComponent,
		CategoryEditComponent
	],
	providers: [
		CategoryService
	]
})
export class CategoriesModule { }
