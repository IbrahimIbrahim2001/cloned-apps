import { SidebarTrigger as BaseSidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BellRing, History, Menu, Settings } from "lucide-react"
import type React from "react"
import { Link, useLocation } from "react-router"
import ProfileImage from "../../components/profileImage"
import { LinkItem } from "../../types/linkItem"
import VibifyLogo from "@/components/shared/vibifyLogo"


const items = [
    {
        title: "Notifications",
        url: "/notifications",
        icon: BellRing,
    },
    {
        title: "History",
        url: "/history",
        icon: History,
    },

    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export default function AppBar() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-1 bg-background text-muted-foreground flex items-center justify-end px-3 sm:px-5 h-16  dark:bg-gray-950 dark:border-gray-800">
            <div className="w-full flex item-center">
                <SidebarTrigger />
                <div className="md:hidden flex">
                    <VibifyLogo width="30" height="30" />
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent animate-gradient-x">
                        Vibify
                    </p>
                </div>
            </div>
            <nav className="flex items-center space-x-1 sm:space-x-2">
                {items.map((item) =>
                (
                    <LinkElement key={item.title} item={item} />
                )
                )}
            </nav>
            <ProfileImage />
        </div>
    )
}

function LinkElement({ item }: { item: LinkItem }) {
    const { pathname } = useLocation()
    const isActive = pathname.includes(item.url)
    return (
        <Link
            key={item.title}
            to={item.url}
            className={`flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors relative group text-gray-500 hover:text-gray-900 hover:bg-gray-100  focus:text-primary ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary focus:text-primary"}`}
        >
            <item.icon className={`size-5 ${isActive && item.title === "Notifications" && "fill-primary"}`} />
            <span className="sr-only sm:not-sr-only sm:ml-2 sm:text-sm">{item.title}</span>

            {isActive && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"></span>}
        </Link>
    )
}



export function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof BaseSidebarTrigger>) {
    return (
        <BaseSidebarTrigger
            className={cn("hidden sm:flex hover:text-primary hover:bg-gray-100 focus:text-primary md:hidden", className)}
            {...props}
        >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
        </BaseSidebarTrigger>
    )
}
