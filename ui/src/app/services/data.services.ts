import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

import * as moment from 'moment';

//module
import { Asset } from '../asset/asset'; 

@Injectable()
export class DataService {

    constructor( public http:Http ) {
        console.log('DataService const called...');
    }


    convertStringToDate(string){
        return string.split('/')[1] + "/" + string.split('/')[0] + "/" + string.split('/')[2];
    }

    createAsset(asset) {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //let body = JSON.stringify(asset);
        
        asset.createDate = new Date();
        
        if (asset.productionDate) {
            if( this.parseDateFormat(asset.productionDate, "DD/MM/YYYY") ) {
                asset.productionDate = new Date(this.convertStringToDate(asset.productionDate));
            } else {
                throw new TypeError("Production Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.installedDate) {
            if( this.parseDateFormat(asset.installedDate, "DD/MM/YYYY") ) {
                asset.installedDate = new Date(this.convertStringToDate(asset.installedDate));
            } else {
                throw new TypeError("Installation Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.scheduledReplacementDate) {
            if( this.parseDateFormat(asset.scheduledReplacementDate, "DD/MM/YYYY") ) {
                asset.scheduledReplacementDate = new Date(this.convertStringToDate(asset.scheduledReplacementDate));
            } else {
                throw new TypeError("Schedule Replacement Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.lastRecertificationDate) {
            if( this.parseDateFormat(asset.lastRecertificationDate, "DD/MM/YYYY") ) {
                asset.lastRecertificationDate = new Date(this.convertStringToDate(asset.lastRecertificationDate));
            } else {
                throw new TypeError("Last Recertification Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.nextRecertificationDate) {
            if( this.parseDateFormat(asset.nextRecertificationDate, "DD/MM/YYYY") ) {
                asset.nextRecertificationDate = new Date(this.convertStringToDate(asset.nextRecertificationDate));
            } else {
                throw new TypeError("Next Recertification Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        return this.http.post('http://localhost:3000/api/assets/', asset)
            .map((res: Response) => res.json()).toPromise();
    }

    updateAsset(asset, assetId) {
        if (asset.productionDate) {
            if( this.parseDateFormat(asset.productionDate, "DD/MM/YYYY") ) {
                asset.productionDate = new Date(this.convertStringToDate(asset.productionDate));
            } else {
                throw new TypeError("Production Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.installedDate) {
            if( this.parseDateFormat(asset.installedDate, "DD/MM/YYYY") ) {
                asset.installedDate = new Date(this.convertStringToDate(asset.installedDate));
            } else {
                throw new TypeError("Installation Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.scheduledReplacementDate) {
            if( this.parseDateFormat(asset.scheduledReplacementDate, "DD/MM/YYYY") ) {
                asset.scheduledReplacementDate = new Date(this.convertStringToDate(asset.scheduledReplacementDate));
            } else {
                throw new TypeError("Schedule Replacement Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.lastRecertificationDate) {
            if( this.parseDateFormat(asset.lastRecertificationDate, "DD/MM/YYYY") ) {
                asset.lastRecertificationDate = new Date(this.convertStringToDate(asset.lastRecertificationDate));
            } else {
                throw new TypeError("Last Recertification Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        if (asset.nextRecertificationDate) {
            if( this.parseDateFormat(asset.nextRecertificationDate, "DD/MM/YYYY") ) {
                asset.nextRecertificationDate = new Date(this.convertStringToDate(asset.nextRecertificationDate));
            } else {
                throw new TypeError("Next Recertification Date is not valid formated in DD/MM/YYYY"); 
            }
        }

        return this.http.put(`http://localhost:3000/api/assets/${assetId}`, asset)
            .map((res: Response) => res.json()).toPromise();
    }

    parseDateFormat(value:string, format:string) : boolean {

        console.log(value);
        let result:boolean = false;
        result = moment(value, format, true).isValid();

        return result;
    }

    getAssets() {
        return this.http.get('http://localhost:3000/api/assets')
            .map((res: Response) => res.json());
    }

    getSortedAssets(order) {
        return this.http.get(`http://localhost:3000/api/assets/sort_create_date?sort=${order}`)
            .map((res: Response) => res.json());
    }
}