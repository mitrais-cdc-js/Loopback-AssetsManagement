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

	constructor( private dataService:DataService ) { 
		console.log('AssetComponent const called...')

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

	}
}
