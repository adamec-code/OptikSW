import { useParams } from "react-router-dom";
import { OrderData } from "../../interfaces/OrderInterfaces";
import OrderDetail from "./OrderDetail/OrderDetail";
import config from "../../config";
import useFetch, { FetchResult } from "react-fetch-hook";


function Order() {

    const { id } = useParams();
    
    const orderDetailDataUrl = config.baseUrl + "/orders/" + id;
    const result = useFetch(orderDetailDataUrl) as FetchResult<OrderData>;

    const orderDetail = result.data
        ? <OrderDetail order={result.data} />
        : <div className="alert alert-danger" role="alert">Neexistující zakázka!</div>

    return(
        <>
            <h1>Detail zakázky</h1>
            {orderDetail}
        </>
    )
}

export default Order;