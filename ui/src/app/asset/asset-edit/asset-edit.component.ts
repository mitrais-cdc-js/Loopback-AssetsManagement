import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

// services
import { DataService } from '../../services/data.services';
import { UtilityService } from '../../services/utility.services';
import { CategoryService } from '../../services/category.service';
// model
import { Asset } from './../asset';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  asset = new Asset()
  autoCalculate: boolean = true

  categories = [];

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private categoryService: CategoryService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.getAssetDetail(this.route.snapshot.params['id']);

    this.categoryService.getCategories().
    subscribe(
      categories => {
        console.log(categories);
        this.categories = categories;
      },
      err => {
        console.log(err)
      }
    )
  }

  getAssetDetail(id) {
    this.dataService.getAsset(id)
    .then( asset => {
      asset.installedDate = (asset.installedDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.installedDate));
      asset.scheduledReplacementDate = (asset.scheduledReplacementDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.scheduledReplacementDate));
      asset.lastRecertificationDate = (asset.lastRecertificationDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.lastRecertificationDate));
      asset.nextRecertificationDate = (asset.nextRecertificationDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.nextRecertificationDate));
      asset.productionDate = (asset.productionDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.productionDate));
      asset.geolocation = (asset.geolocation === null) ? '' : asset.geolocation.lat + ',' + asset.geolocation.lng;

      this.asset = asset;
    })
    .catch(e => console.log(e));
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

  toggleAutoCalculate() {
    this.autoCalculate = !this.autoCalculate
    this.recalculateReplacementDate()
  }

  recalculateReplacementDate() {
    if(this.autoCalculate && this.asset.installedDate !== null && this.asset.lifeSpan !== null) {
      const days = this.asset.lifeSpan * 7
      var tempDate = new Date(this.dataService.convertStringToDate(this.asset.installedDate))

      tempDate = new Date(tempDate.getTime() + (days * 86400000))
      this.asset.scheduledReplacementDate = this.utilityService.dateFormat(tempDate)
    }
  }
}
