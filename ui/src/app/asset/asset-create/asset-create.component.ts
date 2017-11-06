import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
	
	constructor( private dataService:DataService, private router: Router ) { 
		console.log('AssetCreateComponent const called...');
	
	}

	ngOnInit() {
		console.log('ngOnInit called...');

		//this.dataService
	}

	createAsset(form: NgForm){
		
		this.dataService.createAsset(form.value)
		.then( asset => {
			console.log(asset);
			this.router.navigate(['/assets']);
		}).catch( e => {
			console.log(e);
		})
	}
}


