import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

// services
import { DataService } from '../../services/data.services';
import { UtilityService } from '../../services/utility.services';
import { CategoryService } from '../../services/category.service';

// model
import { Asset } from './../asset';

@Component({
	selector: 'app-asset-create',
	templateUrl: './asset-create.component.html',
	styleUrls: ['./asset-create.component.css']
})

export class AssetCreateComponent implements OnInit {
  asset: Asset
	title = 'Asset Management Application';
	autoCalculate: boolean = true
  validReplacementDate: boolean = true
  categories = [];
  
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
  
  constructor( private dataService: DataService, private utilityService: UtilityService, private categoryService: CategoryService,  private router: Router,
    public fb: FormBuilder ) {
		console.log('AssetCreateComponent const called...');
	}

	ngOnInit() {
		console.log('ngOnInit called...');
    
    // init
    this.asset = new Asset()

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

  createAsset() {
    this.asset.geolocation = (this.asset.geolocation === '') ? null : this.asset.geolocation;
    this.asset.installedDate = (this.asset.installedDate === '') ? null : this.asset.installedDate;
    this.asset.scheduledReplacementDate = (this.asset.scheduledReplacementDate === '') ? null : this.asset.scheduledReplacementDate;
    this.asset.lastRecertificationDate = (this.asset.lastRecertificationDate === '') ? null : this.asset.lastRecertificationDate;
    this.asset.nextRecertificationDate = (this.asset.nextRecertificationDate === '') ? null : this.asset.nextRecertificationDate;

    console.log("createAsset :::::::::::: " + this.asset);

    this.dataService.createAsset(this.asset)
    .then( asset => {
      console.log(asset);
      this.router.navigate(['/assets']);
    }).catch( e => {
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