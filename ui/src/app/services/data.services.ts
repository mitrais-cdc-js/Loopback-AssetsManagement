import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment, config } from '../../environments/environment';
import * as moment from 'moment';

// class/model
import { Asset } from '../asset/asset';
import { ServiceError, ServiceResultCode } from './serviceResult';

@Injectable()
export class DataService {

    constructor( public http: Http ) {
        console.log('DataService const called...');
    }

    convertStringToDate(string) {
        return string.split('/')[1] + '/' + string.split('/')[0] + '/' + string.split('/')[2];
    }

    patchAsset(asset) {
        return this.http.patch(`${environment.apiUrl}/assets/`, asset)
            .map((res: Response) => res.json()).toPromise();
    }

    deleteAsset(asset) {
        return this.http.delete(`${environment.apiUrl}/assets/${asset.id}`)
            .map((res: Response) => res.json()).toPromise();
    }

    deleteMultipleAssets(assets) {
        console.log('delete multiple asset services');
        let ids = [];
        for (let i = 0; i < assets.length; i++) {
            ids.push(assets[i].id);
        }

        const queryStringIds = ids.join('&id=');
        console.log(queryStringIds);

        return this.http.delete(`${environment.apiUrl}/assets/delete?id=${queryStringIds}`)
            .map((res: Response) => res.json()).toPromise();
    }

    createAsset(asset) {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // let body = JSON.stringify(asset);

        asset.createDate = new Date();

        if (asset.productionDate) {
            if ( this.parseDateFormat(asset.productionDate, 'DD/MM/YYYY') ) {
                asset.productionDate = new Date(this.convertStringToDate(asset.productionDate));
            } else {
                throw new TypeError('Production Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.installedDate) {
            if ( this.parseDateFormat(asset.installedDate, 'DD/MM/YYYY') ) {
                asset.installedDate = new Date(this.convertStringToDate(asset.installedDate));
            } else {
                throw new TypeError('Installation Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.scheduledReplacementDate) {
            if ( this.parseDateFormat(asset.scheduledReplacementDate, 'DD/MM/YYYY') ) {
                asset.scheduledReplacementDate = new Date(this.convertStringToDate(asset.scheduledReplacementDate));
            } else {
                throw new TypeError('Schedule Replacement Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.lastRecertificationDate) {
            if ( this.parseDateFormat(asset.lastRecertificationDate, 'DD/MM/YYYY') ) {
                asset.lastRecertificationDate = new Date(this.convertStringToDate(asset.lastRecertificationDate));
            } else {
                throw new TypeError('Last Recertification Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.nextRecertificationDate) {
            if ( this.parseDateFormat(asset.nextRecertificationDate, 'DD/MM/YYYY') ) {
                asset.nextRecertificationDate = new Date(this.convertStringToDate(asset.nextRecertificationDate));
            } else {
                throw new TypeError('Next Recertification Date is not valid formated in DD/MM/YYYY');
            }
        }

        return this.http.post(`${environment.apiUrl}/assets`, asset)
            .map((res: Response) => res.json()).toPromise();
    }

    updateAsset(asset, assetId?: string) {
      if (asset === null || asset === undefined) {
        throw new ServiceError('asset cant be null', ServiceResultCode.VALUE_IS_NULL_OR_UNDEFINED);
      }

      if (asset.productionDate) {
          if ( this.parseDateFormat(asset.productionDate, 'DD/MM/YYYY') ) {
              asset.productionDate = new Date(this.convertStringToDate(asset.productionDate));
              asset.productionDate = asset.productionDate.toISOString();
              console.log(asset.productionDate);
          } else {
            throw new TypeError('Production Date is not valid formated in DD/MM/YYYY');
          }
      }

        if (asset.installedDate) {
            if ( this.parseDateFormat(asset.installedDate, 'DD/MM/YYYY') ) {
                asset.installedDate = new Date(this.convertStringToDate(asset.installedDate));
                asset.installedDate = asset.installedDate.toISOString();
            } else {
                throw new TypeError('Installation Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.scheduledReplacementDate) {
            if ( this.parseDateFormat(asset.scheduledReplacementDate, 'DD/MM/YYYY') ) {
                asset.scheduledReplacementDate = new Date(this.convertStringToDate(asset.scheduledReplacementDate));
                asset.scheduledReplacementDate = asset.scheduledReplacementDate.toISOString();
            } else {
                throw new TypeError('Schedule Replacement Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.lastRecertificationDate) {
            if ( this.parseDateFormat(asset.lastRecertificationDate, 'DD/MM/YYYY') ) {
                asset.lastRecertificationDate = new Date(this.convertStringToDate(asset.lastRecertificationDate));
                asset.lastRecertificationDate = asset.lastRecertificationDate.toISOString();
            } else {
                throw new TypeError('Last Recertification Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (asset.nextRecertificationDate) {
            if ( this.parseDateFormat(asset.nextRecertificationDate, 'DD/MM/YYYY') ) {
                asset.nextRecertificationDate = new Date(this.convertStringToDate(asset.nextRecertificationDate));
                asset.nextRecertificationDate = asset.nextRecertificationDate.toISOString();
            } else {
                throw new TypeError('Next Recertification Date is not valid formated in DD/MM/YYYY');
            }
        }

        if (assetId) {
          return this.http.put(`${environment.apiUrl}/assets/${assetId}`, asset)
          .map((res: Response) => res.json()).toPromise();
        } else {
            return this.http.put(`${environment.apiUrl}/assets/${asset.id}`, asset)
            .map((res: Response) => res.json()).toPromise();
        }
    }

    parseDateFormat(value: string, format: string): boolean {
        console.log(value);
        let result: boolean = false;
        result = moment(value, format, true).isValid();

        return result;
    }

    getAssets(order, page) {
        var skip = (page-1) * config.pageLimit
        return this.http.get(`${environment.apiUrl}/assets?filter=%7B%22order%22%3A%20%22createDate%20${order}%22%2C%20%22skip%22%3A%20${skip}%2C%20%22limit%22%3A%20${config.pageLimit}%7D`)
        .map((res: Response) => res.json());
    }

    getAsset(id) {
        return this.http.get(`${environment.apiUrl}/assets/` + id + `?tsp=${timeStamp}`)
        .map((res: Response) => res.json()).toPromise();
    }

    getAssetCount() {
        return this.http.get(`${environment.apiUrl}/assets/count`)
        .map((res: Response) => res.json()).toPromise();
    }
}
