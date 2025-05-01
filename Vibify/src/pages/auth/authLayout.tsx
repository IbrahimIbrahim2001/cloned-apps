import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function AuthLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname === '/signup' || pathname === '/signup/') {
            navigate('/signup/email', { replace: true });
        }
    }, [pathname, navigate]);

    return (
        <div className="w-full h-svh sm:flex items-start sm:justify-center pt-20 sm:pt-32 px-8 sm:px-0">

            <Outlet />
        </div>
    )
}
