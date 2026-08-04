import { TableRow } from "react-data-table-component";

export interface IOrderEyeMeasurement
{
    sphere : number,
    cylinder: number,
    angle: number,
    pupilDistance: number,
}

export interface IOrderEyeMeasurementData
{
    rightEye: IOrderEyeMeasurement,
    leftEye: IOrderEyeMeasurement,
    layer: string,
    layerPrice: number,
    frames: string,
    framesPrice: number,
    price: number,
}

export interface OrderData extends TableRow
{
    id: string, 
    number: number, 
    prefix: string, 
    customerFullName: string,
    customerFullAddress: string,
    customerCity: string,
    customerPhone: string,
    orderStatus: string, 
    dateCreated: string,
    distance: IOrderEyeMeasurementData,
    nearby: IOrderEyeMeasurementData
}

export interface OrdersProps {
    data: OrderData[]
}