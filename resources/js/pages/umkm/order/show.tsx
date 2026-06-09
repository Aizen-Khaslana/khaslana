import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import type { Order } from '@/types/order';
import ShowDashoardOrder from '@/components/khaslana/dashboard/order/show-index';
import { BreadcrumbItem } from '@/types';
import { order as orderRoute } from '@/routes/dashboard';
import { show } from '@/routes/dashboard/order';

interface ShowProps {
    order: Order;
}

export default function ShowOrder({
    order,
}: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Order',
            href: orderRoute().url,
        },
        {
            title: 'Detail Order',
            href: show(order.id).url,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Show Order'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <ShowDashoardOrder order={order} />
        </AppLayout>
    );
}
