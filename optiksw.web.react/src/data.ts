import config from "./config";
import { OrderData } from "./interfaces/OrderInterfaces";



const orderData = fetch(config.baseUrl + "/orders")
    .then(response => response.json() as Promise<OrderData[]>)
    .catch((reason => console.error(reason.message)))
    ;

export const data: OrderData[] = await orderData as OrderData[];