import { useAuth } from "@/hooks/use-auth";

interface Review {
    id: number;
    rating: number;
    comment: string;
    user: {
        id: number;
        name: string;
    };
}

interface Product {
    id: number;
    name: string;
    description: string;
    reviews?: Review[];
}

export default function ReviewSection() {
    const { user } = useAuth();

    return (
        <div>
            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-3xl">Ulasan Pembeli</h3>
                <p className="font-medium text-[#adaaaa]">Apa kata mereka tentang kualitas produk ini.</p>
            </div>
            
            <div></div> 
        </div>
    )
}