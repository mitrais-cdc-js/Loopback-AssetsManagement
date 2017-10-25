import { Component, OnInit } from '@angular/core';

import { Asset } from './../asset';

@Component({
	selector: 'app-asset-create',
	templateUrl: './asset-create.component.html',
	styleUrls: ['./asset-create.component.css']
})
export class AssetCreateComponent implements OnInit {
	title = 'Asset Management Application';
	
	newAsset = new Asset();
	constructor() { }

	ngOnInit() {
	
	}


	createAsset(){
		console.log("Hello.... createAsset() method works!");
	}

}
