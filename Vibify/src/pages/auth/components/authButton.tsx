import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AuthButton({ text, isSubmitting }: { text: string, isSubmitting?: boolean }) {
    return (
        <div className="flex justify-center sm:justify-end">
            <Button type="submit" className="rounded-2xl min-w-20" disabled={isSubmitting}>
                {isSubmitting ?
                    <Loader2 className="animate-spin" />
                    : text
                }
            </Button>
        </div>
    )
}
