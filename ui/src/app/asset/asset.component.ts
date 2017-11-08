import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ServerDataSource } from 'ng2-smart-table';
import * as moment from 'moment';

//environment
import { environment } from '../../environments/environment';


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
			addButtonContent: 'Add',
		},
		edit: {
			confirmSave: true,
		},
		delete: {
			confirmDelete: true,
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
					editable: false,
					addable: false,
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

	title = 'Asset Management Application';
	source: ServerDataSource;
	assets:Asset[];
	errorMessage:any;

	constructor( http: Http, protected dataService:DataService ) { 
		console.log('AssetComponent const called...');
		this.source = new ServerDataSource(http, { endPoint: `${environment.apiUrl}/assets/asset_paging`});
		this.source.setPaging(1, 10, true);
	}
 
	onCreateCall(event) {
		try {
			console.log("Event create triggered...");
			this.dataService.createAsset(event.newData); 
			event.confirm.resolve(event.newData);
		} catch(e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	onEditCall(event) {
		try {
			console.log(`Event edit triggered on id: ${event.newData.id}`); 
			this.dataService.updateAsset(event.newData, event.newData.id); 
			event.confirm.resolve(event.newData);
		} catch(e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}
	
	onPostCall(event) {
		try {
		event.confirm.resolve(event.newData);
		console.log(event.newData); //this contains the new edited data
		this.dataService.createAsset(event.newData);
		} catch(e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		} 
	}

	onDeleteCall(event) {
		try {
			console.log("Event delete triggered..."); 
			console.log(` test: ${event.data}` );
			this.dataService.deleteAsset(event.data); 
			event.confirm.resolve(event.data);
		} catch(e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	loadAssets() {
				this.dataService.getAssets('desc').subscribe(
		data => {
			console.log(data);
			this.assets = data;
		},
		err => {
			console.log("Error occured.")
		});
	}

	dateFormat(dateString, type = "date"){
		var date = new Date(dateString);
 		var momentDate = moment(date,"DD/MM/YYYY");

 		if (type == "datetime"){
 			return momentDate.format("DD/MM/YYYY HH:mm:ss");
 		}else{
 			return momentDate.format("DD/MM/YYYY");
 		}
 	}

	ngOnInit() {
		console.log('ngOnInit called...');
				this.loadAssets();
	}
}
