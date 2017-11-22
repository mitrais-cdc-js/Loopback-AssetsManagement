import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { Category } from '../category/category';

@Injectable()
export class CategoryService {

	constructor( public http: Http ) {
				console.log('CategoryService const called...');
		}


	getCategories(order = 'asc') {
		return this.http.get(`${environment.apiUrl}/categories?filter=%7B%22order%22%3A%20%22createDate%20${order}%22%20%7D`)
			.map((res: Response) => res.json());
	}

	getCategory(id) {
        return this.http.get(`${environment.apiUrl}/categories/` + id)
        .map((res: Response) => res.json()).toPromise();
    }


	createCategory(category: Category) {
		console.log('createCategory called...');
		return this.http.post(`${environment.apiUrl}/categories`, category)
			.map((res: Response) => res.json()).toPromise();
	}

	deleteCategory(category: Category) {
		console.log('deleteCategory called...');
		return this.http.delete(`${environment.apiUrl}/categories/${category.id}`)
			.map((res: Response) => res.json()).toPromise();
	}

	updateCategory(category: Category) {
		console.log('updateCategory called...');
		return this.http.put(`${environment.apiUrl}/categories/${category.id}`, category)
			.map((res: Response) => res.json()).toPromise();
	}
	
}
