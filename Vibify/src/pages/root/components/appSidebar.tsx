import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Bookmark, Heart, Home, LibraryBig, Pin, Search } from "lucide-react"
import { Link, useLocation } from "react-router"
import { LinkItem } from "../types/linkItem"

// Menu items.
const items = [
    {
        title: "Home",
        url: "home",
        icon: Home,
    },
    {
        title: "Pin",
        url: "#",
        icon: Pin,
    },
    {
        title: "Saved",
        url: "#",
        icon: Bookmark,
    },
    {
        title: "Liked songs",
        url: "liked-songs",
        icon: Heart,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "your Library",
        url: "your-library",
        icon: LibraryBig,
    },
]

export default function AppSidebar() {
    return (
        <Sidebar variant="sidebar" collapsible="icon" className="group hidden sm:flex text-primary-foreground border-background">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarHeader className="px-2">
                        <SidebarGroupLabel className="text-primary mb-3">
                            <p>logo</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary-foreground bg-clip-text text-transparent animate-gradient-x">
                                Vibify
                            </p>
                        </SidebarGroupLabel>
                    </SidebarHeader>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <LinkElement key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}


function LinkElement({ item }: { item: LinkItem }) {
    const { pathname } = useLocation()
    const isActive = pathname.includes(item.url)
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild className="text-md  px-3 transition-all group-data-[state=collapsed]:mx-0" tooltip={item.title}>
                <Link to={item.url} className={cn(
                    "flex items-center gap-2 font-medium",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary focus:text-primary"
                )}>

                    <item.icon className={`size-4 shrink-0 ${(item.title === "Liked songs" && isActive) ? "fill-primary" : null}`} />
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}