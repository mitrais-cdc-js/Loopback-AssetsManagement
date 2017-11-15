import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

	constructor( public http: Http ) {
        console.log('CategoryService const called...');
    }


    getCategories(order = 'asc'){
    	return this.http.get(`${environment.apiUrl}/categories?filter=%7B%22order%22%3A%20%22createDate%20${order}%22%20%7D`)
        .map((res: Response) => res.json());
    }
}
