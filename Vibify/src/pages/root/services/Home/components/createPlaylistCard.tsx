import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CgPlayListAdd } from "react-icons/cg";
import { useDialog } from "../context/dialogContext";
export default function CreatePlaylistCard() {
    const { openDialog } = useDialog();
    const handleClick = () => {
        openDialog();
    }
    return (
        <Card className="text-primary-foreground bg-background w-[170px] border-none relative">
            <div onClick={handleClick} className="relative aspect-square w-full overflow-hidden rounded-md  transition-all duration-300 ease-in-out transform group delay-1000  group-hover/card:scale-[1.02] bg-gradient-to-bl from-primary via-accent to-primary-foreground">
                <div className="flex justify-center items-center h-full">
                    <CgPlayListAdd className="size-12" />
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <CardHeader className="p-0 pb-1 space-y-0">
                    <CardTitle className="text-sm font-medium line-clamp-1">Add playlist</CardTitle>
                </CardHeader>
            </div>
        </Card>
    )
}
