import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

// services
import { DataService } from '../../services/data.services';
import { UtilityService } from '../../services/utility.services';
import { CategoryService } from '../../services/category.service';
import { DialogService }  from '../../dialog.service';

// model
import { Asset } from './../asset';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {

  asset = new Asset()
  oldAssetData = new Asset()
  autoCalculate: boolean = false
  validReplacementDate: boolean = true
  categories = [];
  changeStatus: boolean = false;
  
  public frmAsset = this.fb.group({
    riskLevel: [""],
    complienceStatus: [""],
    installedDate: [""],
    description: ["", Validators.required],
    lifeSpan: [""],
    scheduledReplacementDate: [""],
    recertificationInterval: [""],
    lastRecertificationDate: [""],
    lastRecertificationResult: [""],
    nextRecertificationDate: [""],
    model: ["", Validators.required],
    serial: ["", Validators.required],
    batchNo: ["", Validators.required],
    relatedDeliveryOrder: [""],
    geolocation: [""],
    productionDate: ["", Validators.required],
    status: [""],
    history: [""],
    categoryId: [""]
  });

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private categoryService: CategoryService, 
    private utilityService: UtilityService, public fb: FormBuilder,public dialogService: DialogService) { }


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
      console.log(this.asset["id"]);
      this.oldAssetData = asset;
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

  canDeactivate(): Observable<boolean> | boolean {
    
    var hasChangeForm = this.compareAssetValue();
    
    hasChangeForm.then( result => {
      this.changeStatus = result; // true
      
    });
    console.log(this.changeStatus);
    
    console.log(this.asset);
    console.log(this.oldAssetData);

    // return hasChangeForm.map((result:boolean) => {
    //   changeStatus = result;
    // })

    // console.log(changeStatus); // false ??

    // if (changeStatus){
    //   return this.dialogService.confirm('Discard changes?');
    // }else{
    //   return true;
    // }
    return this.dialogService.confirm('Discard changes?');
  }

  compareAssetValue(){
    var hasChangeForm = false;
    return this.dataService.getAsset(this.asset["id"])
      .then( asset => {
        
        asset.installedDate = (asset.installedDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.installedDate));
        asset.scheduledReplacementDate = (asset.scheduledReplacementDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.scheduledReplacementDate));
        asset.lastRecertificationDate = (asset.lastRecertificationDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.lastRecertificationDate));
        asset.nextRecertificationDate = (asset.nextRecertificationDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.nextRecertificationDate));
        asset.productionDate = (asset.productionDate === null) ? '' : this.utilityService.dateFormat(new Date(asset.productionDate));
        asset.geolocation = (asset.geolocation === null) ? '' : asset.geolocation.lat + ',' + asset.geolocation.lng;

          for (var property in this.asset){
        
            if (this.asset[property] != asset[property]){
              hasChangeForm = true;
              console.log(property+ " -- change: " + this.asset[property] + " | " + asset[property]);
            }
            
          }

          return hasChangeForm;

      });
  }

  updateAsset(id) {
    const assetId = this.route.snapshot.params['id'];
    this.asset.geolocation = (this.asset.geolocation === '') ? null : this.asset.geolocation;
    this.asset.installedDate = (this.asset.installedDate === '') ? null : this.asset.installedDate;
    this.asset.scheduledReplacementDate = (this.asset.scheduledReplacementDate === '') ? null : this.asset.scheduledReplacementDate;
    this.asset.lastRecertificationDate = (this.asset.lastRecertificationDate === '') ? null : this.asset.lastRecertificationDate;
    this.asset.nextRecertificationDate = (this.asset.nextRecertificationDate === '') ? null : this.asset.nextRecertificationDate;

    this.dataService.updateAsset(this.asset, assetId)
    .then( asset => {
      console.log(asset);
      this.router.navigate(['/assets']);
    }).catch(e => {
      console.log(e);
    });
  }

  toggleAutoCalculate() {
    this.autoCalculate = !this.autoCalculate

    if(this.autoCalculate) {
      this.frmAsset.get('scheduledReplacementDate').disable()
    } else {
      this.frmAsset.get('scheduledReplacementDate').enable()
    }
    
    this.recalculateReplacementDate()
    this.validateReplacementDate()
  }
  
  validateReplacementDate() {
    if(this.asset.installedDate !== '' && this.asset.scheduledReplacementDate !== '') {
      var installedDate = new Date(this.dataService.convertStringToDate(this.asset.installedDate))
      var scheduledReplacementDate = new Date(this.dataService.convertStringToDate(this.asset.scheduledReplacementDate))
      this.validReplacementDate = scheduledReplacementDate >= installedDate

      if(!this.validReplacementDate) {
        this.frmAsset.get('scheduledReplacementDate').setErrors({"invalidDate":true})
      }
    } else {      
      this.validReplacementDate = true
      this.frmAsset.get('scheduledReplacementDate').setErrors(null)
    }
  }

  recalculateReplacementDate() {
    if(this.autoCalculate && this.asset.installedDate !== '' && this.asset.lifeSpan !== undefined) {
      const days = this.asset.lifeSpan * 7
      var tempDate = new Date(this.dataService.convertStringToDate(this.asset.installedDate))

      tempDate = new Date(tempDate.getTime() + (days * 86400000))
      this.asset.scheduledReplacementDate = this.utilityService.dateFormat(tempDate)
      this.validReplacementDate = true
    }
  }
}
