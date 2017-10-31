import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AssetsModule } from './asset/asset.module';

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

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
    HttpModule,
    AssetsModule,
    rootRouting,
	],
	providers: [DataService],
	bootstrap: [AppComponent]

})
export class AppModule { }
