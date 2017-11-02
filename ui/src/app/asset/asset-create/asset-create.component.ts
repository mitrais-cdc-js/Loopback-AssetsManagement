import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//services
import { DataService } from '../../services/data.services';

//model
import { Asset } from './../asset';


@Component({
	selector: 'app-asset-create',
	templateUrl: './asset-create.component.html',
	styleUrls: ['./asset-create.component.css']
})
export class AssetCreateComponent implements OnInit {
	title = 'Asset Management Application';
	
	//newAsset = new Asset();
	
	constructor( private dataService:DataService ) { 
		console.log('AssetCreateComponent const called...');
	
	}

	ngOnInit() {
		console.log('ngOnInit called...');

		//this.dataService
	}

	createAsset(form: NgForm){

		this.dataService.createAsset(form.value)
		
		/*this.dataService.createAsset(form.value)
		.then( asset => {
			console.log(asset);
		}).catch( e => {
			console.log(e);
		})*/
	}
}


