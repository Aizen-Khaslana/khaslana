import type { Order } from "@/types/order"

interface ListIndexProps {
    orders: Order[];
}

export default function ListIndex({
    orders,
}: ListIndexProps) {
    console.log(orders);
    return (
        <div>
            
        </div>
    )
}