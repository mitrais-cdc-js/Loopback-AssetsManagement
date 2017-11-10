import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

// services
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {

  asset = {};

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getAssetDetail(this.route.snapshot.params['id']);
  }

  getAssetDetail(id) {
    this.dataService.getAsset(id)
    .then( asset => {
      asset.installedDate = (asset.installedDate === null) ? '' : this.dateFormat(new Date(asset.installedDate));
      asset.scheduledReplacementDate = (asset.scheduledReplacementDate === null) ? '' : this.dateFormat(new Date(asset.scheduledReplacementDate));
      asset.lastRecertificationDate = (asset.lastRecertificationDate === null) ? '' : this.dateFormat(new Date(asset.lastRecertificationDate));
      asset.nextRecertificationDate = (asset.nextRecertificationDate === null) ? '' : this.dateFormat(new Date(asset.nextRecertificationDate));
      asset.productionDate = (asset.productionDate === null) ? '' : this.dateFormat(new Date(asset.productionDate));
      asset.geolocation = (asset.geolocation === null) ? '' : asset.geolocation.lat + ',' + asset.geolocation.lng;

      this.asset = asset;
    })
    .catch(e => console.log(e));
  }

  dateFormat(date) {
    const momentDate = moment(date, 'DD/MM/YYYY');
    return momentDate.format('DD/MM/YYYY');
  }

  removeEmptyAttr(obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  updateAsset(id, form: NgForm) {
    const assetId = this.route.snapshot.params['id'];
    const editAsset = form.value;
    editAsset.geolocation = (editAsset.geolocation === '') ? null : editAsset.geolocation;
    editAsset.installedDate = (editAsset.installedDate === '') ? null : editAsset.installedDate;
    editAsset.scheduledReplacementDate = (editAsset.scheduledReplacementDate === '') ? null : editAsset.scheduledReplacementDate;
    editAsset.lastRecertificationDate = (editAsset.lastRecertificationDate === '') ? null : editAsset.lastRecertificationDate;
    editAsset.nextRecertificationDate = (editAsset.nextRecertificationDate === '') ? null : editAsset.nextRecertificationDate;

    this.dataService.updateAsset(editAsset, assetId)
    .then( asset => {
      console.log(asset);
      this.router.navigate(['/assets']);
    }).catch(e => {
      console.log(e);
    });
  }

}
