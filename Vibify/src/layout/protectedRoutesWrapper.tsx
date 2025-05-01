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

    //must be changed
    if (isAuthenticated === null) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}