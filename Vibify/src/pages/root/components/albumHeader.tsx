import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { CgPlayListAdd } from "react-icons/cg";
import { useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDialog } from "../services/Home/context/dialogContext";
interface PlayerHeaderProps {
    onClose: () => void
}

export function PlayerHeader({ onClose }: PlayerHeaderProps) {
    return (
        <div className="flex items-center justify-between p-6 pb-4 pt-12">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
                <ChevronDown className="h-6 w-6" />
            </Button>
            <div className="text-center">
                <p className="text-sm text-gray-300">PLAYING FROM PLAYLIST</p>
                <p className="font-medium">Current Playlist</p>
            </div>
            <OptionsMenu />
        </div>
    )
}

function OptionsMenu() {
    const isMobile = useIsMobile()
    const [drawerOpen, setDrawerOpen] = useState(false) // State for Drawer
    const [dropdownOpen, setDropdownOpen] = useState(false) // State for DropdownMenu

    const { openDialog } = useDialog()

    const handleClick = useCallback(() => {
        openDialog("addTrack")
        // Explicitly close the Drawer/DropdownMenu when the dialog is opened
        if (isMobile) {
            setDrawerOpen(false)
        } else {
            setDropdownOpen(false)
        }
    }, [openDialog, isMobile])
    if (isMobile) return (
        <>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <MoreHorizontal className="h-6 w-6" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="min-h-fit text-muted text-xl px-4 bg-zinc-900">
                    <div className="flex items-center justify-start gap-x-4 h-12" onClick={handleClick}>
                        <CgPlayListAdd className="size-5 mt-2" />
                        <p>add to playlist</p>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
    return (
        <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger>
                    <MoreHorizontal className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background/90 text-muted/90 mx-10 border-0 w-56">
                    <DropdownMenuItem className="focus:bg-[#FAFAFA1A] focus:text-muted hover:font-semibold hover:animate-in" onClick={handleClick}>
                        <CgPlayListAdd className="size-5 mt-2" />
                        <p>add to playlist</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
