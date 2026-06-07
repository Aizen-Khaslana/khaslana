import { Head } from '@inertiajs/react';

import ShowIndex from '@/components/khaslana/order/show/show-index';
import AppLayout from '@/layouts/app-layout';
import type { Order } from '@/types/order';

interface ShowProps {
    order: Order;
}

export default function ShowOrder({
    order,
}: ShowProps) {
    return (
        <AppLayout>
            <Head title='Show Order'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <ShowIndex order={order} />
        </AppLayout>
    );
}
