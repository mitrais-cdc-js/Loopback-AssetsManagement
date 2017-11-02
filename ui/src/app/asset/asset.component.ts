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

    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },

    columns: {
        model: {
          title: 'Model',
          editable: true,
          addable: true,
          filter: false,
        },
        serial: {
          title: 'Serial Nr.',
          filter: false,
        },
        batchNo: {
          title: 'Batch Nr.',
          filter: false,
        },
        createDate: {
          title: 'Date of Creation',
          type: 'custom',
          renderComponent: CustomDateRenderComponent,
          filter: false,
        },
        productionDate: {
          title: 'Date of Production',
          type: 'custom',
          renderComponent: CustomDateRenderComponent,
          filter: false,
        },
        description: {
          title: 'Description',
          filter: false,
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
  

  onPostCall(event) {
    event.confirm.resolve(event.newData);
    console.log(event.newData); //this contains the new edited data
    this.dataService.createAsset(event.newData); 
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
