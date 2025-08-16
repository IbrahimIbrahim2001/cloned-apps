import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoutesWrapper() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setIsAuthenticated(!!session)
            } catch (error) {
                console.error('Auth check error:', error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setIsAuthenticated(!!session)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    if (isAuthenticated === null) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen">

                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="oklch(0.58 0.25 288.25)"
                            strokeWidth="8"
                            strokeDasharray="50 100"
                            strokeLinecap="round"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 40 40"
                                to="360 40 40"
                                dur="1s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <rect
                            x="36"
                            y="20"
                            width="8"
                            height="24"
                            rx="4"
                            fill="oklch(0.58 0.25 288.25)"
                        >
                            <animate
                                attributeName="y"
                                values="20;30;20"
                                dur="1s"
                                repeatCount="indefinite"
                                keyTimes="0;0.5;1"
                            />
                            <animate
                                attributeName="height"
                                values="24;8;24"
                                dur="1s"
                                repeatCount="indefinite"
                                keyTimes="0;0.5;1"
                            />
                        </rect>
                    </svg>
                </div>
            </>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}