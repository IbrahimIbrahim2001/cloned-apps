import supabase from "@/lib/supabase-client";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";

export const signUp = async (
    email: string,
    password: string,
    name: string,
    navigate: NavigateFunction
) => {
    try {
        if (!email || !password || !name) {
            toast.error("Please fill in all required fields");
            return;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
                data: {
                    displayName: name,
                    name: name,
                }
            },
        });

        if (authError) {
            console.error('Signup error:', authError);
            if (authError.status === 400 && authError.message.includes('already registered')) {
                toast.error("This email is already registered. Please sign in instead.");
                navigate("../login");
            } else {
                toast.error(`Signup failed: ${authError.message}`);
                navigate("../");
            }
            return;
        }

        if (authData.user && !authData.user.identities?.length) {
            toast.error("This email is already registered");
            navigate("../../login");
            return;
        }

        if (authData.user) {
            toast.success("User signed up successfully! Please check your email for verification.", {
                style: {
                    backgroundColor: "var(--popover)",
                    color: "var(--primary-foreground)",
                    border: "solid 1px oklch(72.3% 0.219 149.579)"
                },
                duration: 5000
            });
            navigate("../../login");
            return;
        }

    } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
        navigate("../");
    }
};