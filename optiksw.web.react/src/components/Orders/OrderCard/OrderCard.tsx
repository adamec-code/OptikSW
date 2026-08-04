import "./OrderCard.css";
import { OrderData } from "../../../interfaces/OrderInterfaces";
import OrderMeasurements from "../OrderMeasurements/OrderMeasurements";

function OrderCard({ data }: { data: OrderData }) {
  return (
    <div className="order-wrapper">
      <h3>
        Zakázka {data.prefix}-{data.number}
      </h3>
      <OrderMeasurements
        id={data.number.toString()}
        name="Dálka"
        distanceType="distance"
        data={data.distance}
      />
      <OrderMeasurements
        id={data.number.toString()}
        name="Blízko"
        distanceType="nearby"
        data={data.nearby}
      />
      <h3 className="order-price">
        Celková cena: {data.nearby?.price ?? 0 + data.distance?.price ?? 0} Kč
      </h3>
      <div className="order-customer">
        <div className="order-customer-name">
          <span className="order-customer-label">Zákazník:</span>
          <span className="order-customer-value">{data.customerFullName}</span>
        </div>
        <div className="order-customer-address">
          <span className="order-customer-label">Adresa:</span>
          <span className="order-customer-value">
            {data.customerFullAddress}
          </span>
        </div>
        <div className="order-customer-phone">
          <span className="order-customer-label">Telefon:</span>
          <span className="order-customer-value">{data.customerPhone}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
