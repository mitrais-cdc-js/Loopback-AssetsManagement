import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AssetComponent } from './asset/asset.component';
import { AssetCreateComponent } from './asset/asset-create/asset-create.component';

import { HomeComponent } from './home/home.component';

//services
import { DataService } from './services/data.services';

//define routes
const appRoutes:Routes = [
	{ path: '',	component: HomeComponent },
	{ path: 'assets', component: AssetComponent },
	{ path: 'assets/create', component: AssetCreateComponent }
];

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
		HttpModule,
		RouterModule.forRoot( appRoutes )
	],
	providers: [DataService],
	bootstrap: [AppComponent]
	
})
export class AppModule { }
