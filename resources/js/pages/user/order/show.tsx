import { Head } from '@inertiajs/react';

import ShowIndex from '@/components/khaslana/order/show/show-index';
import UnusedNavLayout from '@/layouts/unused-nav-layout';
import { list, show } from '@/routes/order';
import type { Order } from '@/types/order';
import type { BreadcrumbItem } from '@/types';

interface ShowProps {
    order: Order;
}

export default function About({
    order,
}: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Riwayat Pesanan',
            href: list().url,
        },
        {
            title: 'Detail Pesanan',
            href: show(order.id).url,
        },
    ];

    return (
        <UnusedNavLayout backHref='/order/list' breadcrumbs={breadcrumbs}>
            <Head title='Show Order'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <ShowIndex order={order} />
        </UnusedNavLayout>
    );
}
