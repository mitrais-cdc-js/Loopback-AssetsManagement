import { Component, OnInit } from '@angular/core';

@Component({
  	selector: 'app-category-edit',
  	templateUrl: '../category-form.component.html',
  	styleUrls: ['../category-form.component.css']

})
export class CategoryEditComponent implements OnInit {

	category = {
		id: "",
		name: "",
		description: "",
		parent_id: ""
	}

  constructor() { }

  ngOnInit() {
  }

  	onSubmit() { 
  		console.log("test submit edit"); 
  	}

}
