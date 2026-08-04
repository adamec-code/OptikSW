import { useRef } from "react"

interface OrderStatusButtonProps
{
    id: string,
    number: number,
    prefix: string,
    status: string
}

function OrderStatusButton({id, number, prefix, status}: OrderStatusButtonProps)
{
    const ref = useRef(null);
    return(
        <button ref={ref.current} onClick={() => {
            console.log(id);
            console.log(number);
            console.log(prefix);
            console.log(status);
        }} />
    )
}

export default OrderStatusButton;