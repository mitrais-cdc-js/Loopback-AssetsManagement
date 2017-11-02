import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AssetCreateComponent } from './asset-create/asset-create.component';
import { AssetComponent } from './asset.component';

import { CustomDateRenderComponent } from './customDateRender.component';

const assetRouting: ModuleWithProviders = RouterModule.forChild([
	{
		path: 'assets',
		component: AssetComponent,
	},
	{
		path: 'assets/create',
		component: AssetCreateComponent,
	},
]);

@NgModule({
<<<<<<< HEAD
  imports: [
    CommonModule,
    FormsModule,
    assetRouting,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    CustomDateRenderComponent, 
  ],
  declarations: [
    AssetComponent,
    AssetCreateComponent,
    CustomDateRenderComponent,
  ]
=======
	imports: [
		CommonModule,
		FormsModule,
		assetRouting,
		Ng2SmartTableModule
	],
	declarations: [
		AssetComponent,
		AssetCreateComponent,
	]
>>>>>>> 4a5e4dcd87b0e0bd07303c1e87072d0a16840e20
})
export class AssetsModule { }
