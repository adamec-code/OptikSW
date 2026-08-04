import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, ICellRendererParams, DateCellEditor } from 'ag-grid-community';
import { Observable } from 'rxjs'
import { DetailButtonCellEditor } from '../detail-button-cell/detail-button-cell.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  columnDefs: ColDef[] = [
    {headerName: 'Prefix', field: 'prefix', width: 100},
    {headerName: 'Číslo zakázky', field: 'number'},
    {headerName: 'Stav', field: 'orderStatus', width: 100},
    {headerName: 'Vytvořena', field: 'dateCreated', width: 200, cellRenderer: (params: ICellRendererParams) => {
        const date = new Date(params.value);
        return date.toLocaleString();
    }},
    {headerName: 'Detail', field: 'id', cellRenderer: DetailButtonCellEditor }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<any[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData$ = this.http
    .get<any[]>('https://localhost:7261/orders');
  }

  onGridReady(params: GridReadyEvent) {
    // fetch('https://localhost:7261/orders')
    //   .then(result => result.json())
    //   .then(rowData => {
    //     this.rowData = rowData;
    //   })
    //   .catch(reason => console.log(reason));
  }

  onCellClicked(params: CellClickedEvent) {
    console.log(params);
  }
}
