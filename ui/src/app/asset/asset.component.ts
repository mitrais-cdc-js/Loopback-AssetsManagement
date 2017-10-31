import { Component, OnInit } from '@angular/core';

//services
import { DataService } from '../services/data.services';

//module
import { Asset } from './asset'; 

@Component({
		selector: 'app-asset',
		templateUrl: './asset.component.html',
		styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
	
	title = 'Asset Management Application';
	
	assets:Asset[];
	errorMessage:any;

   	settings = {
	  	columns: {
		    description: {
		    	title: "description"
		    },
			model: {
				title: "model"
			},
			serial: {
				title: "serial"
			},
			productionDate: {
				title: "productionDate",
				filter: false
			},
			createDate: {
				title: "createDate",
				filter: false
			},
			status: {
				title: "status",
				filter: false
			}
	  	}
	};

	constructor( private dataService:DataService ) { 
		console.log('AssetComponent const called...')
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
