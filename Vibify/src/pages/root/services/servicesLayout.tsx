import { Outlet } from 'react-router'
import BottomNavbar from './components/bottomNavbar'
import AppBar from './components/appBar'
import MusicPlayer from './components/musicPlayer'

export default function ServicesLayout() {
    return (
        <>
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
