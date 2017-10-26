import { Component, OnInit } from '@angular/core';

import { Asset, IAsset } from './asset'; 

@Component({
  	selector: 'app-asset',
  	templateUrl: './asset.component.html',
  	styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
	
	title = 'Asset Management Application';

  constructor() { 
    console.log('AssetComponent const called...')
  }

  ngOnInit() {
    console.log('ngOnInit called...')
  }
}
