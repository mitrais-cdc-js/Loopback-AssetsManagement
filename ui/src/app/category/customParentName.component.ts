import { Component, Input, OnInit } from '@angular/core';

import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
    {{renderValue}}
  `,
})
export class CustomParentNameComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string;
  @Input() rowData: any;
  
  ngOnInit() {
    console.log(this.value);
    
    const temp = 'test parent';
    this.renderValue = temp;
  }
}
