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

  ngOnInit() {
    console.log(this.value);
    var date = new Date(this.value);
    
    var temp = date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
    this.renderValue = temp;
  }

}