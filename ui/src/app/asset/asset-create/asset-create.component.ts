import { Component, OnInit } from '@angular/core';

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
	
  newAsset = new Asset();
  
	constructor( private dataService:DataService ) { 
    console.log('AssetCreateComponent const called...');
    console.log(this.newAsset);
  }

	ngOnInit() {
    console.log('ngOnInit called...');

    this.dataService
  }
  
  createAsset(){
		console.log("Hello.... createAsset() method works!");
    console.log(this.newAsset);
    
    let temp = this.newAsset;
    this.dataService.createAsset(temp).subscribe(
      error => {
        console.error("Error saving food!");
       // return Observable.throw(error);
      }
    )
  }
}


