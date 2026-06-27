import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollText } from "lucide-react";

interface Props {
    notes: string | null;
}

export default function NotesDialog({ notes }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="
                        flex items-center gap-1
                        text-sm
                        hover:text-[#99FF33]
                        transition-colors
                        cursor-pointer
                    "
                >
                    <ScrollText size={16} />
                    Catatan
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Catatan Pembeli</DialogTitle>

                    <DialogDescription>
                        Catatan yang diberikan pembeli untuk pesanan ini.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-3 rounded-lg border bg-muted/30 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {notes || "Pembeli tidak memberikan catatan."}
                </div>
            </DialogContent>
        </Dialog>
    );
}