import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

//module
import { Asset } from '../asset/asset'; 

@Injectable()
export class DataService {

    constructor( public http:Http ) {
        console.log('DataService const called...')
    }


    convertStringToDate(string){
        return string.split('/')[1] + "/" + string.split('/')[0] + "/" + string.split('/')[2];
    }

    createAsset(asset) {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        //let body = JSON.stringify(asset);
        
        console.log("halloo");

        asset.createDate = new Date();
        
        console.log(asset.installedDate);

        if (asset.productionDate){
            asset.productionDate = new Date(this.convertStringToDate(asset.productionDate));
        }

        if (asset.installedDate){
            asset.installedDate = new Date(this.convertStringToDate(asset.installedDate));
        }

        if (asset.scheduledReplacementDate){
            asset.scheduledReplacementDate = new Date(this.convertStringToDate(asset.scheduledReplacementDate));
        }

        if (asset.lastRecertificationDate){
            asset.lastRecertificationDate = new Date(this.convertStringToDate(asset.lastRecertificationDate));
        }

        if (asset.nextRecertificationDate){
            asset.nextRecertificationDate = new Date(this.convertStringToDate(asset.nextRecertificationDate));
        }


        /* sample data
        asset.riskLevel = 1;
        asset.geolocation = '-7.800386,110.3937263'; 
        asset.model = 'Model Test';
        asset.serial = 'Serial Test2';
        asset.batchNo = 'Batch No32432';
        asset.productionDate = new Date();
        asset.description = 'asasdasd';
        asset.installedDate = new Date();
        asset.scheduledReplacementDate = new Date();
        asset.lastRecertificationDate = new Date();
        asset.nextRecertificationDate = new Date();
        */ 

        console.log(asset);
        return this.http.post('http://localhost:3000/api/assets/', asset)
        .map((res: Response) => res.json()).toPromise();
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