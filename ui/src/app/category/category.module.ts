import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CategoryComponent } from './category.component';

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
  	]
})
export class CategoriesModule { }
