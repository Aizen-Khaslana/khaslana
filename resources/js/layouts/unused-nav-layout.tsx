import { Head } from "@inertiajs/react"
import { Breadcrumbs } from '@/components/breadcrumbs';
import Footer from "@/components/khaslana/footer"
import Back from "@/layouts/components/back";
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

type UnusedNavLayoutProps = {
    children: React.ReactNode;
    backHref: string;
    breadcrumbs?: BreadcrumbItemType[];
}

export default function UnusedNavLayout({ children, backHref, breadcrumbs = [] }: UnusedNavLayoutProps) {
    return (
        <div className="w-full overflow-x-hidden">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen h-auto">
                <div className="flex flex-col px-6 lg:px-17.5 pt-12">
                    <div className="flex justify-between">
                        <Back href={backHref} />
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}