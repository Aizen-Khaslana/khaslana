import { Head } from '@inertiajs/react';

import CommunityIndex from '@/components/khaslana/community/community-index';
import UserLayout from '@/layouts/user-layout';
import type { Post } from '@/types/post';

interface IndexProps {
    posts: Post[];
}

export default function Community({
    posts,
}: IndexProps) {
    return (
        <UserLayout>
            <Head title='Komunitas'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <CommunityIndex posts={posts} />
        </UserLayout>
    );
}
