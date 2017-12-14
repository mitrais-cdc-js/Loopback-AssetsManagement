import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';


import { ViewCell } from 'ng2-smart-table';

// services
import { CategoryService } from '../services/category.service';
import { Category } from './category';

@Component({
	// template: `
	// 	{{renderValue}}
    // `,
    templateUrl: './parent.component.html',
})
export class CustomParentNameComponent implements ViewCell, OnInit {

	renderValue: string;
    categoryName: string = '';

	@Input() value: string;
	@Input() rowData: any;
	
    constructor( public http: Http, protected categoryService: CategoryService) {

       
    }

	ngOnInit() {
        // console.log(this.value);
        // this.renderValue = "induk";
        this.categoryService.getCategoryById(this.value).subscribe(
            category => {
                console.log(category.name);
                this.renderValue = "test";
                //
            }
        )
	}
}
