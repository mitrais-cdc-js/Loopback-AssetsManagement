import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

import * as moment from 'moment';


@Component({
    template: `
        DD/MM/YYYY: <input [ngClass]="inputClass"
        #name
        class="form-control short-input"
        [name]="cell.getId()"
        [disabled]="!cell.isEditable()"
        [placeholder]="cell.getTitle()"
        (click)="onClick.emit($event)"
        (keyup)="updateValue()"
        (keydown.enter)="onEdited.emit($event)"
        (keydown.esc)="onStopEditing.emit()"><br>
        <div [hidden]="true" [innerHTML]="cell.getValue()" #htmlValue></div>
    `,
})
export class CustomDateEditorComponent extends DefaultEditor implements AfterViewInit {

    @ViewChild('name') name: ElementRef;
    @ViewChild('htmlValue') htmlValue: ElementRef;

    constructor() {
        super();
      }

    ngAfterViewInit() {
        if (this.cell.newValue !== '') {
          this.name.nativeElement.value = this.getDateString();
        }
    }

    getDateString(): string {
        const date = moment(this.htmlValue.nativeElement.innerText);
        const temp = this.paddyHelper( date.get('date'), 2, '0' ) + '/' +  this.paddyHelper( (date.get('month') + 1), 2, '0') + '/' +  date.get('year');
        return `${temp}`;
    }

    updateValue() {
        const temp = this.name.nativeElement.value;
        this.cell.newValue = temp;
    }

    paddyHelper(n, p, c) {
        const pad_char = typeof c !== 'undefined' ? c : '0';
        const pad = new Array(1 + p).join(pad_char);
        return (pad + n).slice(-pad.length);
    }
}
