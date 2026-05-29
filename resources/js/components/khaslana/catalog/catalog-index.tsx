import { HeroSection } from '@/components/khaslana/catalog/hero-section';
import { PaginationSection } from '@/components/khaslana/catalog/pagination-section';
import { ProductCard } from '@/components/khaslana/catalog/product-card';
import type { PaginatedProducts } from '@/types/paginated-product';

interface Category {
    name: string;
}

interface CatalogIndexProps {
    categories: Category[];
    products: PaginatedProducts;
}

export default function CatalogIndex({
    categories,
    products,
}: CatalogIndexProps) {
    return (
        <div className="flex flex-col w-full px-6 pt-32 lg:px-[70px] mx-auto">
            <HeroSection categories={categories} />

            {/* TODO: on going */}
            {/* <FeaturedProduct /> */}
            <ProductCard products={products.data} />
            <PaginationSection products={products} />
        </div>
    );
}