import { Component, OnInit } from '@angular/core';

// services
import { CategoryService } from '../services/category.service';


import { Category } from './category';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	
	categories: Category[]
  	constructor(protected categoryService: CategoryService) { 

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
