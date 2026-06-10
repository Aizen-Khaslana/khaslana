import { Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/types/product";
import { product as productRoute } from "@/routes";

interface ShowIndexProps {
    product: Product;
}

export default function ShowIndex({
    product,
}: ShowIndexProps) {
    console.log(product);
    return (
        <div className="space-y-6">
            <Card className="bg-transparent border-2 border-[#99FF33]/50">
                <CardContent className="space-y-4 text-white/90">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-[#99FF33]">
                            Detail Produk Anda
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Lihat detail produk yang akan dijual
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="whitespace-nowrap">Nama Produk</Label>
                        <Input
                            value={product.name}
                            readOnly
                            className="border-[#99FF33]/40 text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="whitespace-nowrap">Deskripsi Produk</Label>
                        <Textarea
                            value={product.description}
                            readOnly
                            className="border-[#99FF33]/40 text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="whitespace-nowrap">Kategori Produk</Label>
                        <Input
                            value={product.category?.name}
                            readOnly
                            className="border-[#99FF33]/40 text-white"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="whitespace-nowrap">Foto Produk</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {product.product_images?.map((image) => (
                                <img
                                    key={image.id}
                                    src={`/storage/${image.image}`}
                                    className="h-full w-full rounded-xl border border-[#99FF33]/40 object-contain"
                                />
                            ))}
                        </div>
                    </div>
                    {product.product_variants?.map((variant) => (
                        <div
                            key={variant.id}
                            className="border border-[#99FF33]/40 rounded-xl p-4"
                        >
                            <div className="text-[#99FF33] font-medium">
                                {variant.attribute_values
                                    ?.map(
                                        value =>
                                            `${value.attribute?.name}: ${value.value}`
                                    )
                                    .join(' | ')}
                            </div>

                            <div className="mt-2">
                                Harga:
                                Rp {Number(variant.price).toLocaleString('id-ID')}
                            </div>

                            <div>
                                Stok: {' '}
                                {variant.stock}
                            </div>
                        </div>
                    ))}
                    <Link
                        href={productRoute().url}
                        className="
                            rounded-lg py-1.5 px-5
                            bg-[#99FF33]
                            border border-[#99FF33]
                            text-[#1E1B26]
                            hover:bg-[#1E1B26]
                            hover:text-[#99FF33]
                            transition-colors duration-200
                            cursor-pointer
                        "
                    >
                        Kembali
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}