import { Outlet } from 'react-router'
import BottomNavbar from './components/bottomNavbar'
import AppBar from './components/appBar'
import MusicPlayer from './components/musicPlayer'
import React from 'react'
const LazyCreatePlaylistDialog = React.lazy(() => import("./components/createPlaylistDialog"))
export default function ServicesLayout() {
    return (
        <>
            <LazyCreatePlaylistDialog />
            <>
                <AppBar />
                <MusicPlayer />
                <div className='my-8 '>
                    <Outlet />
                </div>
            </>
            <BottomNavbar />
        </>
    )
}
