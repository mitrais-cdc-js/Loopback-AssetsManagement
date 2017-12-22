import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// services
import { ChecklistService } from '../../services/checklist.service';
import { AlertService } from '../../_services/index';
import { DialogService }  from '../../dialog.service';

import { Checklist } from '../checklist';

@Component({
	selector: 'app-checklist-create',
	templateUrl: '../checklist-form.component.html',
	styleUrls: ['../checklist-form.component.css']
})

export class ChecklistCreateComponent implements OnInit {
    checklist =  {
		id: "",
		name: ""
    }
    
    // checklist = new Checklist();
    
	constructor(
        protected checklistService: ChecklistService, 
		private router: Router,
		private alertService: AlertService,
		public dialogService: DialogService
    ) { }

	ngOnInit() {
        
        console.log("id" + this.checklist.id);
    }
    
    onSubmit(form: NgForm) {
		console.log(form.value); 
		let inputFields = form.value;
		let newChecklist = {
			id: null,
			name: inputFields.name,
			createdAt: new Date()
		}
		
		this.checklistService.createChecklist(newChecklist)
	    .then( checklist => {
	      console.log(checklist);
		  this.alertService.success('asset checklist created!');
		  setTimeout((router: Router) => {
			  this.router.navigate(['/checklists']);
		  }, 1000);
	    }).catch( e => {
		  console.log(e);
		  let error = e.json();
		  console.log(error);
		//   this.alertService.error(error.error.message);
		this.alertService.error('Could not create the asset checklist');
	    });
	}

}
