import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// services
import { CategoryService } from '../../services/category.service';

@Component({
	selector: 'app-category-create',
	templateUrl: '../category-form.component.html',
	styleUrls: ['../category-form.component.css']
})
export class CategoryCreateComponent implements OnInit {
	
	category = {
		id: "",
		name: "",
		description: "",
		parent_id: "",
		checklist: ""
	}

	categories = [];

	checklists = [
		{
			id: "monitor",
			name: "Monitor"
		},
		{
			id: "power_supply",
			name: "Power Supply"
		},
		{
			id: "pc",
			name: "Personal Computer"
		}
	]

	constructor(protected categoryService: CategoryService, private router: Router) { }

	ngOnInit() {
		this.getCategories();
	}

	onSubmit(form: NgForm) {
		console.log(form.value); 
		let inputFields = form.value;
		let newCategory = {
			name: inputFields.name,
			description: inputFields.description,
			parent_id: inputFields.parent_id,
			checklist: inputFields.checklist
		}
		
		this.categoryService.createCategory(newCategory)
	    .then( category => {
	      console.log(category);
	      this.router.navigate(['/categories']);
	    }).catch( e => {
	      console.log(e);
	    });
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
