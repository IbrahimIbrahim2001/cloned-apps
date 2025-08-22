import VibifyLogo from "@/components/shared/vibifyLogo";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
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
        <div className="relative w-full h-svh flex items-start sm:justify-center">
            <ShootingStars />
            <StarsBackground />
            <div className="absolute inset-0  flex items-center justify-center z-0 opacity-10">
                <VibifyLogo width="300" height="300" />
            </div>
            <div
                className="w-full h-svh z-10 sm:flex items-start sm:justify-center pt-20 sm:pt-32 px-4 sm:px-0">
                <Outlet />
            </div>
        </div>
    )
}