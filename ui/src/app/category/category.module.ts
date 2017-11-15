import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CategoryComponent } from './category.component';
import { CategoryService } from '../services/category.service';

const assetRouting: ModuleWithProviders = RouterModule.forChild([
		{
			path: 'categories',
			component: CategoryComponent,
		}
]);


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		assetRouting,
	],
	declarations: [
		CategoryComponent
	],
	providers: [
		CategoryService
	]
})
export class CategoriesModule { }
