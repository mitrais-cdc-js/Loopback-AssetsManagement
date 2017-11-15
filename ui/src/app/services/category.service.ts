import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

	constructor( public http: Http ) {
        console.log('CategoryService const called...');
    }

}
