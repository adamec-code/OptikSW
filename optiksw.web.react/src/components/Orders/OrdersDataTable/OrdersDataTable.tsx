import "./OrdersDataTable.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { OrderData, OrdersProps } from "../../../interfaces/OrderInterfaces";
import moment from "moment";
import OrderCard from "../OrderCard/OrderCard";
import { NoData } from "../../Common/NoData";
import React from "react";

const columns: TableColumn<OrderData>[] = [
  {
    name: "ID",
    selector: (row: OrderData) => row.id,
    sortable: false,
    omit: true,
  },
  {
    id: "number",
    name: "Číslo zakázky",
    selector: (row: OrderData) => row.prefix + "-" + row.number,
    sortable: true,
    width: "120px",
  },
  {
    name: "Zákazník",
    selector: (row: OrderData) => row.customerFullName + ", " + row.customerCity,
    sortable: true,
    width: "40%",
  },
  {
    name: "Status",
    selector: (row: OrderData) => row.orderStatus,
    sortable: true,
  },
  {
    name: "Založena",
    selector: (row: OrderData) => row.dateCreated,
    sortable: true,
    format: (row: OrderData) =>
      moment(row.dateCreated).format("DD.MM.yyyy HH:mm:ss"),
  },
];

function OrdersDataTable({ data }: OrdersProps) {
  return (
    <DataTable
      columns={columns}
      defaultSortFieldId="number"
      defaultSortAsc={false}
      data={data}
      noDataComponent={NoData}
      highlightOnHover
      striped
      pagination
      expandableRows
      expandableRowsComponent={OrderCard}
      onRowClicked={(
        row: OrderData,
        _e: React.MouseEvent<Element, MouseEvent>
      ) => window.location.assign("/orders/" + row.id.toString())}
      // onRowMouseEnter={(row, _index) => console.log(row)}
    />
  );
}

export default OrdersDataTable;
