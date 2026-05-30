import { Head } from '@inertiajs/react';
import CatalogIndex from '@/components/khaslana/catalog/catalog-index';
import UserLayout from '@/layouts/user-layout';
import type { PaginatedProducts } from '@/types/paginated-product';

interface Category {
    name: string;
}

interface CatalogProps {
    categories: Category[];
    products: PaginatedProducts;
}

export default function Catalog({
    categories,
    products
}: CatalogProps) {
    return (
        <UserLayout>
            <Head title="Katalog">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <CatalogIndex categories={categories} products={products} />
        </UserLayout>
    );
}