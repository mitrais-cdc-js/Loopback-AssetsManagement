import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
 			console.log(asset.installedDate.toISOString().slice(0,10).replace(/-/g,""));
 			this.asset = asset;
 		}).catch(e => console.log(e));
 	}

}
