import type { Order } from "@/types/order"

interface ListIndexProps {
    orders: Order[];
}

export default function ListIndex({
    orders,
}: ListIndexProps) {
    console.log(orders);
    return (
        <>
            <div>
                <span className="font-semibold text-4xl">Riwayat <span className="text-[#99ff33]">Pesanan</span></span>
            </div>
            
               
        </>
    )
}