import { Head } from '@inertiajs/react';
import CtaCard from '@/components/khaslana/dashboard/cta-card';
import { useAuth } from '@/hooks/use-auth';
import AppLayout from '@/layouts/app-layout';
import { product } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: product().url,
    },
];

export default function Product() {
    const { user } = useAuth();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Products' />
            {!user.is_umkm ? (
                <CtaCard />   
            ) : (
                <>
                    {/* header */}
                    <div className="flex flex-col align-items-center gap-2">
                        <h1 className="text-3xl font-bold">
                            Product
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your products
                        </p>
                    </div>
        
                    {/* content */}
                    <div>ini content</div>
                </>
            )}
        </AppLayout>
    )
}