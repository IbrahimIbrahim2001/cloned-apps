import supabase from "@/lib/supabase-client"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router"

export default function SessionWrapper() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const location = useLocation()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession()
                setIsAuthenticated(!!session)
                console.log("Session check:", session ? "Authenticated" : "Not authenticated")
            } catch (error) {
                console.error("Auth check error:", error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            const authState = !!session
            console.log("Auth state changed:", authState ? "Authenticated" : "Not authenticated")
            setIsAuthenticated(authState)
        })

        return () => subscription.unsubscribe()
    }, [])
    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }
    if (isAuthenticated) {
        const publicRoutes = [
            "/",
            "/login",
            "/signup",
            "/signup/email",
            "/signup/password",
            "/signup/name",
            "/forget-password",
        ]

        if (publicRoutes.includes(location.pathname)) {
            console.log("Authenticated user trying to access public route, redirecting to /home")
            return <Navigate to="/home" replace />
        }
    }
    return <Outlet />
}
