import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useOptionList } from "../hooks/useOptionsList";
import { DatabaseTrack, Track } from "../types/track";

// added  trackFromHistory cause you might want to remove a track from the history list and not currently playing
export default function OptionsMenu({ trackFromHistory }: { trackFromHistory?: Track | DatabaseTrack }) {
    const { drawerOpen, setDrawerOpen, dropdownOpen, setDropdownOpen, isMobile, optionsList } = useOptionList({
        trackFromHistory,
    })

    console.log(optionsList[5].visible)

    if (isMobile) return (
        <>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <MoreHorizontal className="h-6 w-6" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="min-h-fit text-muted text-xl px-4 bg-zinc-900">
                    {optionsList.map((option) => (
                        !option.disabled ?
                            <div key={option.id} className="flex items-center justify-start gap-x-4 h-12" onClick={option.onclick}>
                                {option.icon}
                                <p>{option.text}</p>
                            </div> : <div hidden={option.text === "remove from history"} key={option.text} className="flex items-center justify-start gap-x-4 h-12 text-muted/40">
                                {option.icon}
                                <p>{option.text}</p>
                            </div>
                    ))}
                </DrawerContent>
            </Drawer>
        </>
    )
    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-5" />
                        <span className="sr-only">More options</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="text-muted/90 border-0 w-56 mx-10">
                    {optionsList.map((option) => (
                        <DropdownMenuItem key={option.id} disabled={option.disabled} hidden={option.disabled && option.text === "remove from history"} className="focus:bg-[#FAFAFA1A] focus:text-muted hover:font-semibold hover:animate-in" onClick={option.onclick}>
                            {option.icon}
                            <p>{option.text}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}