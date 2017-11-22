import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

// services
import { CategoryService } from '../services/category.service';

import { environment, config } from '../../environments/environment';

import { ServerDataSource } from 'ng2-smart-table';

import { Category } from './category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  settings = {
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        filter: true,
      },
      description: {
        title: 'Description',
        filter: false,
      }
    }
  };

  source: ServerDataSource;


	categories: Category[]
  	constructor(http: Http, protected categoryService: CategoryService) {
      this.source = new ServerDataSource(http, { endPoint: `${environment.apiUrl}/categories/category_paging`});
      this.source.setPaging(1, 2, true);
    }

  onCreateCall(event: any) {
    try {
      this.categoryService.createCategory(event.newData);
      event.confirm.resolve(event.newData);
    } catch (e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
  }

  onDeleteCall(event: any) {
    try {
      this.categoryService.deleteCategory(event.data);
      event.confirm.resolve(event.data);
    } catch (e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
  }

  onEditCall(event: any) {
    try {
      this.categoryService.updateCategory(event.newData);
      event.confirm.resolve(event.newData);
    } catch (e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
  }

  	ngOnInit() {
  		console.log('category component');
  		this.getCategories();
  	}


  	getCategories() {
		this.categoryService.getCategories().subscribe(
			data => {
				console.log(data);
				this.categories = data;
			},
			err => {
				console.log('Error occured.');
			}
		);
	}


}
