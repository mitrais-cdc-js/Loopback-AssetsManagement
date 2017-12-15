import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';

import * as moment from 'moment';

// services
import { DataService } from '../../services/data.services';

// module
import { Asset } from '../asset';

@Component({
  selector: 'app-asset-view',
  templateUrl: './asset-view.component.html',
  styleUrls: ['./asset-view.component.css']
})
export class AssetViewComponent implements OnInit {

	asset = new Asset();

  	constructor(private dataService: DataService, private route: ActivatedRoute) { }

  	ngOnInit() {
  		console.log('asset view component');

  		this.dataService.getAsset(this.route.snapshot.params['id'])
  			.then( asset => {
  				asset.geolocation = (asset.geolocation === null) ? '' : asset.geolocation.lat + ',' + asset.geolocation.lng;
  				this.asset = asset;
  				console.log(this.asset);
  			}).catch( e => {
  				console.log(e);
  			})
  	}


  	dateFormat(dateString, type = 'date') {
		if (dateString){
			const date = new Date(dateString);
			const momentDate = moment(date, 'DD/MM/YYYY');
			if (type === 'datetime') {
				return momentDate.format('DD/MM/YYYY HH:mm:ss');
			} else {
				return momentDate.format('DD/MM/YYYY');
			}
		}else{
			return '';
		}
	}

}
