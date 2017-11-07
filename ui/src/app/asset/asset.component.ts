import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ServerDataSource } from 'ng2-smart-table';

//environment
import { environment } from '../../environments/environment';


//services
import { DataService } from '../services/data.services';

//module
import { Asset } from './asset'; 
import { CustomDateRenderComponent } from "./customDateRender.component";

@Component({
		selector: 'app-asset',
		templateUrl: './asset.component.html',
		styleUrls: ['./asset.component.css'],
})

export class AssetComponent implements OnInit {
	
  settings = {

    add: {
      confirmCreate: true,
      addButtonContent: 'Add',
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    },

    columns: {
        id: {
          title: 'ID',
          editable: false,
          addable: false,
          filter: false,
        },
        model: {
          title: 'Model',
          editable: true,
          addable: true,
          filter: false,
        },
        serial: {
          title: 'Serial Nr.',
          filter: false,
        },
        batchNo: {
          title: 'Batch Nr.',
          filter: false,
        },
        createDate: {
          title: 'Date of Creation',
          editable: false,
          addable: false,
          type: 'custom',
          renderComponent: CustomDateRenderComponent,
          filter: false,
          sort: true,
          sortDirection: 'DESC'
        },
        productionDate: {
          title: 'Date of Production',
          type: 'custom',
          renderComponent: CustomDateRenderComponent,
          filter: false,
        },
        description: {
          title: 'Description',          
          filter: false,
        },
    },
  };

	title = 'Asset Management Application';
  source: ServerDataSource;
	assets:Asset[];
	errorMessage:any;

	constructor( http: Http, protected dataService:DataService ) { 
    console.log('AssetComponent const called...');
    this.source = new ServerDataSource(http, { endPoint: `${environment.apiUrl}/assets/asset_paging`});
    this.source.setPaging(1, 5, true);
  }
 
  onCreateCall(event) {
    try {
      console.log("Event create triggered...");
      this.dataService.createAsset(event.newData); 
      event.confirm.resolve(event.newData);
    } catch(e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
  }

  onEditCall(event) {
    try {
      console.log(`Event edit triggered on id: ${event.newData.id}`); 
      this.dataService.updateAsset(event.newData, event.newData.id); 
      event.confirm.resolve(event.newData);
    } catch(e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
	}
	
	onPostCall(event) {
    try {
		event.confirm.resolve(event.newData);
		console.log(event.newData); //this contains the new edited data
    this.dataService.createAsset(event.newData);
    } catch(e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    } 
	}

  onDeleteCall(event) {
    try {
      console.log("Event delete triggered..."); 
      this.dataService.deleteAsset(event.newData); 
      event.confirm.resolve(event.newData);
    } catch(e) {
      console.log((<Error>e).message);
      event.confirm.reject();
    }
  }


	onSort(): void {
		this.loadSortedAssets();
	}

	loadAssets() {
				this.dataService.getAssets().subscribe(
		data => {
			console.log(data);
			this.assets = data;
		},
		err => {
			console.log("Error occured.")
		});
	}

	loadSortedAssets() {
				this.dataService.getSortedAssets('desc').subscribe(
		data => {
			console.log(data);
			this.assets = data;
		},
		err => {
			console.log("Error occured.")
		});
	}

	dateFormat(dateString){
		var date = new Date(dateString);
		return date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
	}

	ngOnInit() {
		console.log('ngOnInit called...');
				this.loadAssets();
	}
}
