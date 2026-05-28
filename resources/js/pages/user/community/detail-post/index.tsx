import { Head } from '@inertiajs/react';
import UnusedNavLayout from '@/layouts/unused-nav-layout';

export default function DetailPost() {
    return (
        <UnusedNavLayout backHref='/community'>
            <Head title='Buat Postingan'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
        </UnusedNavLayout>
    );
}
