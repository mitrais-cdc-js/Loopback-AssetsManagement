import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

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
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
  }

  ngOnInit() {
    var date = new Date(this.value);
    
    var temp = this.paddyHelper( date.getDate(), 2, '0' ) + '/' +  this.paddyHelper( (date.getMonth() + 1), 2, '0') + '/' +  date.getFullYear();
    this.renderValue = temp;
  }


}