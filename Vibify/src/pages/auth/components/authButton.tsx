import { Button } from "@/components/ui/button";

export default function AuthButton({ text }: { text: string }) {
    return (
        <div className="flex justify-center sm:justify-end">
            <Button className="rounded-2xl" type="submit">{text}</Button>
        </div>
    )
}
