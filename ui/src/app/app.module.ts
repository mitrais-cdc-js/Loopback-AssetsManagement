import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AssetComponent } from './asset/asset.component';
import { AssetCreateComponent } from './asset/asset-create/asset-create.component';

import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		AssetComponent,
		AssetCreateComponent,
		HeaderComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot([
			{
				path: '',
				component: HomeComponent
			},
				{
					path: 'assets/create',
					component: AssetCreateComponent
				}
		])
	],
	providers: [],
	bootstrap: [AppComponent]
	
})
export class AppModule { }
