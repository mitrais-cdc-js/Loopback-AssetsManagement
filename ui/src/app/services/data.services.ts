import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor( public http:Http ) {
        console.log('DataService const called...')
    }

    createAsset(asset) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(asset);

        return this.http.post('localhost:3000/api/assets/', body, options )
            .map((res: Response) => res.json());
    }

    getAssets() {
        return this.http.get('localhost:3000/api/assets')
            .map((res: Response) => res.json());
    }
}