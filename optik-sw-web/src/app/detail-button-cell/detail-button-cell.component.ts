import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'
import { ICellRendererParams } from 'ag-grid-community'

export interface IDetailButtonCell
{
  buttonText: string;
}

@Component({
  selector: 'app-detail-button-cell',
  template: `
    <button (click)="onClick($event)">
      {{buttonText}}
    </button>
  `,
  styles: [
  ]
})
export class DetailButtonCellEditor implements ICellRendererAngularComp {

  value!: string;
  buttonText!: string;
  
  agInit(params: ICellRendererParams & IDetailButtonCell) : void {
    this.value = params.value;
    this.buttonText = params.buttonText ?? "Detail";
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }

  onClick($event: MouseEvent) {
    alert('The value is '+this.value+'.')
  }
}
