import { Head } from '@inertiajs/react';

import { CreatePost } from '@/components/khaslana/community/create-post';
import UnusedNavLayout from '@/layouts/unused-nav-layout';
import { community } from '@/routes';
import { myPosts, create } from '@/routes/community';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Komunitas',
        href: community().url,
    },
    {
        title: 'Kelola Postingan',
        href: myPosts().url,
    },
    {
        title: 'Buat Postingan',
        href: create().url,
    },
];

export default function Community() {
    return (
        <UnusedNavLayout backHref={myPosts().url} breadcrumbs={breadcrumbs}>
            <Head title='Buat Postingan'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <CreatePost />
        </UnusedNavLayout>
    );
}
