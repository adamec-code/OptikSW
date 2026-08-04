import './OrderDetail.css';
import { OrderData } from "../../../interfaces/OrderInterfaces";
import OrderCard from "../OrderCard/OrderCard";

function OrderDetail({ order } : { order: OrderData})
{
    return (
        <section>
            <div className="filter-panel">
                <div className="float-end">
                    <button onClick={() => history.back()} className="btn btn-primary">Zpět</button>
                </div>
                <h2>{order.prefix}-{order.number}</h2>
                <p>Status: {order.orderStatus}</p>
            </div>
            <OrderCard data={order} />
        </section>
    )
}

export default OrderDetail;