import { TableRow } from "react-data-table-component";

export interface CustomerData extends TableRow
{
    id: string,
    titleBefore: string,
    firstName: string,
    lastName: string,
    titleAfter: string,
    birthNumber: string,
    phone: string,
    addressId: string,
}

export interface CustomerProps {
    data: CustomerData[]
}