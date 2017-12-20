import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// services
import { CategoryService } from '../../services/category.service';
import { AlertService } from '../../_services/index';
import { DialogService }  from '../../dialog.service';
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

	hasChild = false;

	constructor(
		protected categoryService: CategoryService, 
		private router: Router,
		private alertService: AlertService,
		public dialogService: DialogService
	) { }

	ngOnInit() {
		this.getParentCategories();
	}

	onSubmit(form: NgForm) {
		console.log(form.value); 
		let inputFields = form.value;
		let newCategory = {
			id: null,
			name: inputFields.name,
			description: inputFields.description,
			parent_id: inputFields.parent_id,
			checklist: inputFields.checklist,
			createdAt: new Date()
		}
		
		this.categoryService.createCategory(newCategory)
	    .then( category => {
	      console.log(category);
		  this.alertService.success('asset category created!');
		  setTimeout((router: Router) => {
			  this.router.navigate(['/categories']);
		  }, 1000);
	    }).catch( e => {
		  console.log(e);
		  let error = e.json();
		  console.log(error);
		//   this.alertService.error(error.error.message);
		this.alertService.error('Could not create the asset category');
	    });
	}

	onCancel(event){
		var hasChangeForm = false;
		console.log(this.category);
		for (var property in this.category){
			if (this.category[property] != "" && this.category[property] != undefined){
			hasChangeForm = true;
			}
		}

		console.log("change form " + hasChangeForm);
		if (hasChangeForm == true){
			var confirmDialog = this.dialogService.confirm('Discard changes?');
			confirmDialog.subscribe(response => {
				if (response == true){
					this.router.navigate(['/categories']);
				}
			})
			console.log("dialog : " , confirmDialog);
		}else{
			this.router.navigate(['/categories']);
		}
	}

	getParentCategories() {
		this.categoryService.getParentCategories().subscribe(
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
