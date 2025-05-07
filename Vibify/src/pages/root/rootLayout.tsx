import { Outlet } from "react-router";
import AppSidebar from "./components/appSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function RootLayout() {
    return (
        <div className="select-none">
            <SidebarProvider>
                <SidebarTrigger className="hidden sm:block md:hidden py-5" />
                <AppSidebar /> {/*visible only on sm screens and above*/}
                <div className="p-3 mt-5  w-full sm:w-[calc(100vw-60px)] md:w-[calc(100vw-280px)]">
                    <Outlet />
                </div>
            </SidebarProvider>
        </div>
    )
}
