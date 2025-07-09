import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";
export const UserName = () => {
    const [userName, setUserName] = useState<string | null>(null);
    useEffect(() => {
        const getUserName = async () => {
            const { data } = await supabase.auth.getUser();
            const un = data?.user?.user_metadata?.name || null;
            setUserName(un);
        };
        getUserName();
    }, []);

    return (
        <>
            <p className="text-lg font-bold">
                {userName ? `${userName}'s Liked Tracks` : "Liked Tracks:"}
            </p>
        </>
    )
}