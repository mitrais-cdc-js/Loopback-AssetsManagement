import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { Checklist } from '../checklist/checklist';

@Injectable()
export class ChecklistService {


	constructor( public http: Http ) {
        console.log('Checklist service const called...');
    }


    createChecklist(checklist: Checklist) {
		console.log('createchecklist called...');
		return this.http.post(`${environment.apiUrl}/checklists`, checklist)
			.map((res: Response) => res.json()).toPromise();
	}

}
