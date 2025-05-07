import supabase from "@/lib/supabase-client";
import { UserState } from "@/pages/root/store";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";

export async function login(
    email: string,
    password: string,
    navigate: NavigateFunction,
    setUserData: (data: Partial<UserState['user']>) => void
) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        toast("Error on log in, check your email and password", {
            style: {
                backgroundColor: "var(--popover)",
                color: "var(--primary-foreground)",
                border: "solid 1px oklch(63.7% 0.237 25.331)"
            }
        });
        return;
    }
    if (data) {
        setUserData(data.user.user_metadata)
        navigate("../home")
    }
}