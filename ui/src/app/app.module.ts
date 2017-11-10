import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AssetsModule } from './asset/asset.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';

// services
import { DataService } from './services/data.services';

// 3rd part
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NavigationComponent } from './navigation/navigation.component';

// define routes
const appRoutes: Routes = [
  {
    path: '',	component: HomeComponent
  }
];

const RootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpModule,
    AssetsModule,
    RootRouting,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
