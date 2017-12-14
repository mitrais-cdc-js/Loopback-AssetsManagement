import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';

// services
import { CategoryService } from '../services/category.service';

import { environment, config } from '../../environments/environment';

import { ServerDataSource } from 'ng2-smart-table';

import { Category } from './category';
import { CustomParentNameComponent } from './customParentName.component';

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
    actions: {
			add: false,
			edit: false,
			delete: true,
			custom: [
				{
					name: 'view',
					title: 'View '
				},
				{
					name: 'edit',
					title: 'Edit '
				}
			]
		},
    columns: {
      name: {
        title: 'Name',
        filter: false,
      },
      description: {
        title: 'Description',
        filter: false,
      },
      parent_id: {
        title: 'Parent',
        filter: false,
        type: 'custom',
        renderComponent: CustomParentNameComponent,
      }
    }
  };

  source: ServerDataSource;


	categories: Category[]
  	constructor(http: Http, protected categoryService: CategoryService, private router: Router) {
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
      if (confirm('Are you sure want to delete ' + event.data.name)) {
        this.categoryService.deleteCategory(event.data);
        console.log('category deleted');
        this.source.refresh();
        event.confirm.resolve(event.data);
      }
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


  onCustom(event){
		let category = event.data;
		console.log(event.action);
		if (event.action == 'view'){
			this.router.navigate(['/categories/'+ category.id ]);
		}else if (event.action == 'edit'){
			this.router.navigate(['/categories/edit/'+ category.id ]);
		}
  }
  
  // deleteCategory(category) {
	// 	if (confirm('Are you sure want to delete ' + category.id)) {
	// 		this.categoryService.deleteCategory(category)
	// 		.then( res => {
	// 			console.log('deleted');
	// 			this.getCategories();
	// 		})
	// 		.catch( err => console.log(err));
	// 	}
	// }

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
