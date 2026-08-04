import DataTable, { TableColumn } from "react-data-table-component";
import { CustomerData, CustomerProps } from "../../../interfaces/CustomerInterfaces";
import CustomerAddress from "../CustomerAddress/CustomerAddress";
import { NoData, SelectableRows } from "../../Common/NoData";

const columns: TableColumn<CustomerData>[] = [
    {
      name: "ID",
      selector: (row: CustomerData) => row.id,
      sortable: false,
      omit: true,
    },
    {
      name: "Titul před",
      selector: (row: CustomerData) => row.titleBefore,
      sortable: true,
      width: "40px",
    },
    {
      id: "lastName",
      name: "Příjmení",
      selector: (row: CustomerData) => row.lastName,
      sortable: true,
      width: "200px",
    },
    {
      name: "Jméno",
      selector: (row: CustomerData) => row.firstName,
      sortable: true,
      width: "120px",
    },
    {
      name: "Titul za",
      selector: (row: CustomerData) => row.titleAfter,
      sortable: true,
      width: "40px",
    },
    {
      name: "Telefon",
      selector: (row: CustomerData) => row.phone,
      sortable: true,
      width: "200px",
    },
    {
      name: "Rodné číslo / datum narození",
      selector: (row: CustomerData) => row.birthNumber,
      sortable: true,
    },
  ];

function CustomersDataTable ({ data } : CustomerProps)
{
    return (
        <DataTable
            columns={columns}
            defaultSortFieldId="lastName"
            data={data}
            noDataComponent={NoData}
            selectableRowsComponent={SelectableRows}
            highlightOnHover
            striped
            pagination
            expandableRows
            expandableRowsComponent={CustomerAddress}
            />
    );
}

export default CustomersDataTable;