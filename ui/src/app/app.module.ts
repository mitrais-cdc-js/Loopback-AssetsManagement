import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AssetsModule } from './asset/asset.module';
import { CategoriesModule } from './category/category.module';
import { ChecklistModule } from './checklist/checklist.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';

// services
import { DataService } from './services/data.services';
import { UtilityService } from './services/utility.services';
import { DialogService }           from './dialog.service';
import { CanDeactivateGuard }       from './can-deactivate-guard.service';

// 3rd part
import { Ng2SmartTableModule } from 'ng2-smart-table';



// define routes
const appRoutes: Routes = [
  {
    path: '',	component: HomeComponent
  }
];

const RootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Ng2SmartTableModule,
    HttpModule,
    AssetsModule,
    CategoriesModule,
    ChecklistModule,
    RootRouting,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent
  ],
  providers: [DataService, UtilityService, DialogService,CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
