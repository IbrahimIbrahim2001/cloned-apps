import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSidebar from "./components/appSidebar";
import DialogProvider from "./services/Home/context/dialogContext";
import { AddTrackToPlaylistDialog } from "./components/addTrackToPlaylistDialog";

export default function RootLayout() {
    return (
        <div className="select-none">
            <DialogProvider>
                <AddTrackToPlaylistDialog />
                <SidebarProvider>
                    <AppSidebar /> {/*visible only on sm screens and above*/}
                    <div className="p-3 mt-5  w-full sm:min-w-[calc(100vw-60px)] md:min-w-[calc(100vw-280px)]">
                        <Outlet />
                    </div>
                </SidebarProvider>
            </DialogProvider>
        </div>
    )
}
