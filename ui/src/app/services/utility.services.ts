import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as moment from 'moment';

@Injectable()
export class UtilityService {

    constructor( public http: Http ) {
        console.log('UtilityService const called...');
    }

    dateFormat(date) {
        const momentDate = moment(date, 'DD/MM/YYYY');
        return momentDate.format('DD/MM/YYYY');
    }
}
