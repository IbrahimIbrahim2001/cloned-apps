
import { Outlet } from 'react-router'
import BottomNavbar from './components/bottomNavbar'
import AppBar from './components/appBar'

export default function ServicesLayout() {
    return (
        <>
            <>
                <AppBar />
                <Outlet />
            </>
            <BottomNavbar />
        </>
    )
}
