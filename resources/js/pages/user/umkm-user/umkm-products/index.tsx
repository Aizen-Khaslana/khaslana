import HeroSection from "@/components/khaslana/umkm-user/detail-umkm/hero-section"
import UnusedNavLayout from "@/layouts/unused-nav-layout"
import { detail } from "@/routes/umkm"
import type { Umkm } from "@/types/umkm"

interface UmkmProductProps {
    umkmData: Umkm[];
}

export default function Index({
    umkmData,
}: UmkmProductProps) {
    return (
        <UnusedNavLayout backHref={detail(umkmData.id).url}>
            <HeroSection umkmData={umkmData} />
        </UnusedNavLayout>
    )
}