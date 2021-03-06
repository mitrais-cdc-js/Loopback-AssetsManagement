import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

import * as moment from 'moment';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomDateRenderComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;

  paddyHelper(n, p, c) {
    const pad_char = typeof c !== 'undefined' ? c : '0';
    const pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
  }

  ngOnInit() {
    console.log(this.value);
    const date = moment(this.value);
    const temp = this.paddyHelper( date.get('date'), 2, '0' ) + '/' +  this.paddyHelper( (date.get('month') + 1), 2, '0') + '/' +  date.get('year');
    this.renderValue = temp;
  }
}
