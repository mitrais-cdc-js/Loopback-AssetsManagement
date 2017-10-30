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

    createAsset( asset:Asset ) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(asset);

        return this.http.post('http://localhost:3000/api/assets/', body, options )
            .map((res: Response) => res.json());
    }

    getAssets() {
        return this.http.get('http://localhost:3000/api/assets')
            .map((res: Response) => res.json());
    }
}