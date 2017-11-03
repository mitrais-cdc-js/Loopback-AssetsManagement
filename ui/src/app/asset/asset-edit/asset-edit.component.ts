import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//services
import { DataService } from '../../services/data.services';

@Component({
  	selector: 'app-asset-edit',
  	templateUrl: './asset-edit.component.html',
  	styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
	
	asset = {}

  	constructor(private route: ActivatedRoute, private router: Router, private dataService:DataService) { }

  	ngOnInit() {
		this.getAssetDetail(this.route.snapshot.params['id']);
 	}

 	getAssetDetail(id){
 		
 		this.dataService.getAsset(id)
 		.then( asset => {

 			asset.installedDate = this.dateFormat(new Date(asset.installedDate));
 			asset.scheduledReplacementDate = this.dateFormat(new Date(asset.scheduledReplacementDate));
 			asset.lastRecertificationDate = this.dateFormat(new Date(asset.lastRecertificationDate));
 			asset.nextRecertificationDate = this.dateFormat(new Date(asset.nextRecertificationDate));
 			asset.productionDate = this.dateFormat(new Date(asset.productionDate));
 			asset.geolocation = asset.geolocation.lat + ',' + asset.geolocation.lng;
 			
 			this.asset = asset;
 		}).catch(e => console.log(e));
 	}

 	dateFormat(date){
 		return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
 	}

 	removeEmptyAttr(obj) {
	  	for (var propName in obj) { 
	    	if (obj[propName] === null || obj[propName] === undefined) {
	      		delete obj[propName];
	    	}
	  	}
	}

 	updateAsset(id){

 		var assetId = this.route.snapshot.params['id'];
 		
 		//this.asset.installedDate = this.dateFormat(new Date(this.asset.installedDate));
		//this.asset.scheduledReplacementDate = this.dateFormat(new Date(this.asset.scheduledReplacementDate));
		//this.asset.lastRecertificationDate = this.dateFormat(new Date(this.asset.lastRecertificationDate));
		//this.asset.nextRecertificationDate = this.dateFormat(new Date(this.asset.nextRecertificationDate));
		//this.asset.productionDate = this.dateFormat(new Date(this.asset.productionDate));
		//this.asset.geolocation = this.asset.geolocation.lat + ',' + this.asset.geolocation.lng;

 		console.log(this.asset);

 		this.dataService.updateAsset(this.asset, assetId)
 		.then( asset => {
 			console.log(asset);
 			this.router.navigate(['/assets']);
 		}).catch(e => { 
 			this.router.navigate(['/assets']);
 			console.log(e)
 		});
 	}

}
