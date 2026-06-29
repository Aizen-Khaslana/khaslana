import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VerificationFormData = {
    owner_name: string;
    nik: string;
    npwp: string;
    nib: string;
    file_path: File | null;
};

interface Props {
    data: VerificationFormData;

    setData: (
    key: keyof VerificationFormData,
    value: VerificationFormData[keyof VerificationFormData]
) => void;

    errors: Record<string, string>;

    disabled: boolean;
}

export default function VerificationInfo({
    data,
    setData,
    errors,
    disabled,
}: Props) {
    return (
        <div className="space-y-6">

            <div>

                <h3 className="text-lg font-semibold">
                    Informasi Verifikasi
                </h3>

                <p className="text-sm text-muted-foreground">
                    Lengkapi data sesuai identitas resmi pemilik UMKM.
                </p>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>
                        Nama Pemilik
                        <span className="text-red-400"> *</span>
                    </Label>

                    <Input
                        disabled={disabled}
                        placeholder="Nama sesuai KTP"
                        value={data.owner_name}
                        onChange={(e) =>
                            setData(
                                "owner_name",
                                e.target.value
                            )
                        }
                        className="
                            mt-2
                            border-gray-500/30
                            focus-visible:border-[#99FF33]
                            focus-visible:ring-0
                        "
                    />

                    {errors.owner_name && (
                        <p className="text-sm text-red-500">
                            {errors.owner_name}
                        </p>
                    )}

                </div>

                <div className="space-y-2">

                    <Label>
                        NIK
                        <span className="text-red-400"> *</span>
                    </Label>

                    <Input
                        disabled={disabled}
                        placeholder="16 Digit"
                        value={data.nik}
                        onChange={(e) =>
                            setData(
                                "nik",
                                e.target.value
                            )
                        }
                        className="
                            mt-2
                            border-gray-500/30
                            focus-visible:border-[#99FF33]
                            focus-visible:ring-0
                        "
                    />

                    {errors.nik && (
                        <p className="text-sm text-red-500">
                            {errors.nik}
                        </p>
                    )}

                </div>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">

                    <Label>
                        NPWP
                        <span className="text-red-400"> *</span>
                    </Label>

                    <Input
                        disabled={disabled}
                        placeholder="NPWP"
                        value={data.npwp}
                        onChange={(e) =>
                            setData(
                                "npwp",
                                e.target.value
                            )
                        }
                        className="
                            mt-2
                            border-gray-500/30
                            focus-visible:border-[#99FF33]
                            focus-visible:ring-0
                        "
                    />

                    {errors.npwp && (
                        <p className="text-sm text-red-500">
                            {errors.npwp}
                        </p>
                    )}

                </div>

                <div className="space-y-2">

                    <Label>
                        NIB
                        <span className="text-red-400"> *</span>
                    </Label>

                    <Input
                        disabled={disabled}
                        placeholder="Nomor Induk Berusaha"
                        value={data.nib}
                        onChange={(e) =>
                            setData(
                                "nib",
                                e.target.value
                            )
                        }
                        className="
                            mt-2
                            border-gray-500/30
                            focus-visible:border-[#99FF33]
                            focus-visible:ring-0
                        "
                    />

                    {errors.nib && (
                        <p className="text-sm text-red-500">
                            {errors.nib}
                        </p>
                    )}

                </div>

            </div>

        <div className="space-y-2">

            <Label>
                Foto KTP
                <span className="text-red-400"> *</span>
            </Label>

            <Input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                disabled={disabled}
                className="
                    mt-2
                    border-gray-500/30
                    focus-visible:border-[#99FF33]
                    focus-visible:ring-0
                "
                onChange={(e) => {

                    const file =
                        e.target.files?.[0] ?? null;

                    setData(
                        "file_path",
                        file
                    );

                }}
            />

            {errors.file_path && (

                <p className="text-sm text-red-500">

                    {errors.file_path}

                </p>

            )}

        </div>

        </div>
    );
}