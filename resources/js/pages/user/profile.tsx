import { Transition } from "@headlessui/react";
import { Form, Head, Link } from "@inertiajs/react";
import React from "react";
import ProfileController from "@/actions/App/Http/Controllers/Settings/ProfileController";
import DefaultProfile from "@/assets/icons/default-profile.png";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import UnusedNavLayout from "@/layouts/unused-nav-layout";
import { home } from "@/routes";
import { send } from "@/routes/verification";

interface ProfileProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Profile({
    mustVerifyEmail,
    status,
}: ProfileProps) {
    const { user } = useAuth();

    const [preview, setPreview] = React.useState<string | null>(
        user.profile_photo ?? null
    );

    return (
        <UnusedNavLayout backHref={home().url}>
            <Head title="Profil Saya" />

            <div className="w-full mb-6">
                {/* heading */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold">Profil Saya</h1>
                    <p className="text-base text-muted-foreground">Kelola informasi akun Anda</p>
                </div>
                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                >
                    {({
                        processing,
                        recentlySuccessful,
                        errors,
                    }) => (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
                            {/* left section */}
                            <div className="col-span-1 p-4">
                                <img
                                    src={preview ?? DefaultProfile}
                                    alt={user.name}
                                    className="
                                        w-64 md:w-full aspect-square
                                        rounded-full mx-auto
                                        border-4 border-[#99FF33]
                                        object-cover
                                        shadow-md
                                    "
                                />
                                <div className="flex-1 mt-6">
                                    <Input
                                        id="profile_photo"
                                        type="file"
                                        name="profile_photo"
                                        accept="image/*"
                                        className="
                                            cursor-pointer
                                            border-white/10
                                            bg-[#272431]
                                            text-white
                                            file:text-white
                                        "
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                    <p className="mt-2 text-xs md:text-sm text-white/50">
                                        Format JPG, JPEG, PNG
                                        maksimal 2MB
                                    </p>
                                </div>
                                <InputError
                                    className="mt-2"
                                    message={errors.profile_photo}
                                />
                            </div>

                            {/* right section */}
                            <div className="col-span-3 space-y-4 p-4">
                                <div className="flex flex-col">
                                    <Label htmlFor="name" className="text-sm md:text-base">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={user.name}
                                        required
                                        autoComplete="name"
                                        placeholder="Masukkan nama lengkap"
                                        className="mt-2 border-gray-500/30 focus-visible:border-[#99FF33] focus-visible:ring-0 transition-all duration-200"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label htmlFor="username" className="text-sm md:text-base">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        defaultValue={user.username}
                                        required
                                        autoComplete="username"
                                        placeholder="Masukkan username Anda"
                                        className="mt-2 border-gray-500/30 focus-visible:border-[#99FF33] focus-visible:ring-0 transition-all duration-200"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.username}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Label htmlFor="email" className="text-sm md:text-base">Alamat Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        defaultValue={user.email}
                                        required
                                        autoComplete="email"
                                        placeholder="Masukkan email Anda"
                                        className="mt-2 border-gray-500/30 focus-visible:border-[#99FF33] focus-visible:ring-0 transition-all duration-200"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                    {mustVerifyEmail &&
                                        user.email_verified_at === null && (
                                            <div>
                                                <p className="-mt-4 text-sm text-muted-foreground">
                                                    Your email address is
                                                    unverified.{' '}
                                                    <Link
                                                        href={send()}
                                                        as="button"
                                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                    >
                                                        Click here to resend the
                                                        verification email.
                                                    </Link>
                                                </p>
    
                                                {status ===
                                                    'verification-link-sent' && (
                                                    <div className="mt-2 text-sm font-medium text-green-600">
                                                        A new verification link has
                                                        been sent to your email
                                                        address.
                                                    </div>
                                                )}
                                            </div>
                                    )}
                                </div>
                                <div className="flex">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="
                                            mt-2
                                            bg-[#99FF33]
                                            border border-[#99FF33]
                                            hover:bg-[#1E1B26]
                                            hover:text-[#99FF33]
                                            transition-colors duration-200
                                            hover:cursor-pointer
                                        "
                                    >
                                        {processing ? 'Menyimpan' : 'Simpan Perubahan'}
                                    </Button>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p
                                            className="
                                                text-sm
                                                text-[#99FF33]/60
                                            "
                                        >
                                            Berhasil disimpan
                                        </p>
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </UnusedNavLayout>
    );
}