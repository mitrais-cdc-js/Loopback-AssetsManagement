import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, CanDeactivate } from '@angular/router';
import { Http } from '@angular/http';

import { ServerDataSource } from 'ng2-smart-table';
import * as moment from 'moment';

// environment
import { environment, config } from '../../environments/environment';


// services
import { DataService } from '../services/data.services';

// module
import { Asset } from './asset';
import { CustomDateRenderComponent } from './customDateRender.component';
import { CustomDateEditorComponent } from './customDateEditor.component';

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
		actions: {
			add: false,
			edit: false,
			delete: false,
			custom: [
				{
					name: 'view',
					title: 'View '
				},
				{
					name: 'edit',
					title: 'Edit '
				},
				{
					name: 'delete',
					title: 'Delete'
				}
			]
		},
		columns: {
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
				installedDate: {
					title: 'Installed Date',
					editable: false,
					addable: false,
					type: 'custom',
					renderComponent: CustomDateRenderComponent,
					filter: false
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
				},
				productionDate: {
					title: 'Date of Production',
					type: 'custom',
					renderComponent: CustomDateRenderComponent,
					editor: {
						type: 'custom',
						component: CustomDateEditorComponent,
					},
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
	assets: Asset[];
	errorMessage: any;
	currentPage: number;
	inputPage: number;
	pageCount: number;
	isFirstPage: boolean;
	isLastPage: boolean;

	selected = [];
	selectAll = false;

	constructor( http: Http, protected dataService: DataService, private router: Router) {
		console.log('AssetComponent const called...');
		this.source = new ServerDataSource(http, { endPoint: `${environment.apiUrl}/assets/asset_paging`});
		this.source.setPaging(1, 10, true);
	}

	
	onCreateCall(event) {
		try {
			console.log('Create triggered.');
			this.dataService.createAsset(event.newData);
			event.confirm.resolve(event.newData);
		} catch (e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	onEditCall(event) {
		try {
			console.log(`Edit triggered on: ${event.data.id}`);
			this.dataService.updateAsset(event.newData);
			event.confirm.resolve(event.newData);
		} catch (e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	onPostCall(event) {
		try {
		console.log(`Post triggered on: ${event.data.id}`);
		event.confirm.resolve(event.newData);
		this.dataService.createAsset(event.newData);
		} catch (e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	onDeleteCall(event) {
		try {

			if (confirm('Are you sure want to delete ' + event.data.model)) {
				console.log(`Delete triggered on: ${event.data.id}...`);
				this.dataService.deleteAsset(event.data);
				event.confirm.resolve(event.data);
			}
		} catch (e) {
			console.log((<Error>e).message);
			event.confirm.reject();
		}
	}

	onCustom(event){
		let asset = event.data;
		console.log(event.action);
		if (event.action == 'view'){
			this.router.navigate(['/assets/'+ asset.id ]);
		}else if (event.action == 'delete'){
			this.deleteAsset(asset);
		}else if (event.action == 'edit'){
			this.router.navigate(['/assets/edit/'+ asset.id ]);
		}
	}
	
	//#region Paging

	loadPage(page) {
		this.dataService.getAssets('desc', page).subscribe(
			data => {
				this.assets = data
			},
			err => {
				console.log('Error occured.')
			}
		);
		
		this.refreshPageCount()
	}

	goToFirstPage() {
		this.loadPage(1)
		this.currentPage = 1
		this.inputPage = this.currentPage
	}

	goToPrevPage() {
		this.loadPage(this.currentPage - 1)
		this.currentPage -= 1
		this.inputPage = this.currentPage
	}

	goToNextPage() {
		this.loadPage(this.currentPage + 1)
		this.currentPage += 1
		this.inputPage = this.currentPage
	}

	goToLastPage() {
		this.loadPage(this.pageCount)
		this.currentPage = this.pageCount
		this.inputPage = this.currentPage
	}

	goToSelectedPage() {
		if(this.inputPage > 0 && this.inputPage <= this.pageCount)
		{
			this.loadPage(this.inputPage)
			this.currentPage = this.inputPage
		}
	}

	refreshPageNavigation() {
		this.isFirstPage = this.currentPage <= 1
		this.isLastPage = this.currentPage >= this.pageCount
	}

	refreshPageCount() {
		this.dataService.getAssetCount().then(
			data => {
				this.pageCount = Math.ceil(data.count / config.pageLimit)
				this.refreshPageNavigation()
			}
		)
	}

	//#endregion

	dateFormat(dateString, type = 'date') {
		const date = new Date(dateString);
		const momentDate = moment(date, 'DD/MM/YYYY');
		if (type === 'datetime') {
			return momentDate.format('DD/MM/YYYY HH:mm:ss');
		} else {
			return momentDate.format('DD/MM/YYYY');
		}
	}

	deleteAsset(asset) {
		if (confirm('Are you sure want to delete ' + asset.model)) {
			this.dataService.deleteAsset(asset)
			.then( res => {
				console.log('deleted');
				// this.loadPage(this.currentPage);
				this.source.refresh();
			})
			.catch( err => console.log(err));
		}
	}

	exist(asset){
		return this.selected.indexOf(asset) > -1;
	}

	toggleSelection(asset){
		
		var idx = this.selected.indexOf(asset);
		console.log(idx);
		if (idx > -1){
			this.selected.splice(idx,1);
		}else{
			this.selected.push(asset);
		}
		console.log(this.selected);
		console.log("total asset: " + this.assets.length);
		console.log("total selected: " + this.selected.length);

		if (this.selected.length >= this.assets.length){
			this.selectAll = true;
		}else{
			this.selectAll = false;
		}
	}

	checkAll(){
		console.log('select all assets...' + this.selectAll);
		if (this.selectAll){
			console.log("checkall checked");
			var tempSelected = [];
			
			for(var i = 0; i < this.assets.length; i++) {
				tempSelected.push(this.assets[i]);
			}

			this.selected = tempSelected;
		}else{
			this.selected = [];
		}

		console.log(this.selected);
	}

	deleteMultiple(){
		console.log("delete multiple");
		console.log("selected asset: " + this.selected.length);

		if (this.selected.length < 1){
			alert("Please select asset that you want to delete");
		}else{
			if (confirm('Are you sure want to delete all selected assets? ')) {

				//======= Call the service method ==========
				this.dataService.deleteMultipleAssets(this.selected)
					.then( res => {
						console.log("total rows deleted: " + res.count);
						this.goToFirstPage();
					})	
			}
		}
	}

	ngOnInit() {
		console.log('ngOnInit called...');
		this.goToFirstPage()
	}
}
