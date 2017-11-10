import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// services
import { DataService } from '../../services/data.services';

// model
import { Asset } from './../asset';


@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css']
})
export class AssetCreateComponent implements OnInit {
  title = 'Asset Management Application';

  // newAsset = new Asset();

  constructor( private dataService: DataService, private router: Router ) {
    console.log('AssetCreateComponent const called...');
  }

  ngOnInit() {
    console.log('ngOnInit called...');
    // this.dataService
  }

  createAsset(form: NgForm) {

    const newAsset = form.value;
    newAsset.geolocation = (newAsset.geolocation === '') ? null : newAsset.geolocation;
    newAsset.installedDate = (newAsset.installedDate === '') ? null : newAsset.installedDate;
    newAsset.scheduledReplacementDate = (newAsset.scheduledReplacementDate === '') ? null : newAsset.scheduledReplacementDate;
    newAsset.lastRecertificationDate = (newAsset.lastRecertificationDate === '') ? null : newAsset.lastRecertificationDate;
    newAsset.nextRecertificationDate = (newAsset.nextRecertificationDate === '') ? null : newAsset.nextRecertificationDate;

    console.log(newAsset);

    this.dataService.createAsset(newAsset)
    .then( asset => {
      console.log(asset);
      this.router.navigate(['/assets']);
    }).catch( e => {
      console.log(e);
    });
  }
}


