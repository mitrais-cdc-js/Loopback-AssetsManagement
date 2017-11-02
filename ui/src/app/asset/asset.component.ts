import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ServerDataSource } from 'ng2-smart-table';

//services
import { DataService } from '../services/data.services';

//module
import { Asset } from './asset'; 
import { CustomDateRenderComponent } from "./customDateRender.component";

@Component({
  	selector: 'app-asset',
  	templateUrl: './asset.component.html',
    styleUrls: ['./asset.component.css'],
})

export class AssetComponent implements OnInit {
	
  settings = {
    columns: {
        model: {
          title: 'Model',
          editable: false,
          addable: false,
        },
        serial: {
          title: 'Serial Nr.',
        },
        batchNo: {
          title: 'Batch Nr.',
        },
        createDate: {
          title: 'Date of Creation',
          type: 'custom',
          renderComponent: CustomDateRenderComponent,
        },
        productionDate: {
          title: 'Date of Production',
        },
        description: {
          title: 'Description',
        },
    },
  };

  source: ServerDataSource;

	title = 'Asset Management Application';
	
	assets:Asset[];
	errorMessage:any;

	constructor( http: Http, protected dataService:DataService ) { 
    console.log('AssetComponent const called...');
    this.source = new ServerDataSource(http, { endPoint: 'http://localhost:3000/api/assets' });
	}

	loadAssets() {

        this.dataService.getAssets().subscribe(
		data => {
			console.log(data);
			this.assets = data;
		},
		err => {
			console.log("Error occured.")
		});
   	}

	ngOnInit() {
		console.log('ngOnInit called...');
      	this.loadAssets();
	}
}
