import { Component, OnInit } from '@angular/core';

import { Asset, IAsset } from './../asset';


@Component({
	selector: 'app-asset-create',
	templateUrl: './asset-create.component.html',
	styleUrls: ['./asset-create.component.css']
})
export class AssetCreateComponent implements OnInit {
	title = 'Asset Management Application';
	
  newAsset = new Asset();
  
	constructor() { 
    console.log('AssetCreateComponent const called...');
    console.log(this.newAsset);
  }

	ngOnInit() {
    console.log('ngOnInit called...')
  }
  
  createAsset(){
		console.log("Hello.... createAsset() method works!");
		console.log(this.newAsset);
	}
}


