import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase-client";
import { useNavigate } from "react-router";

export default function HomePage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("../")
    }
    return (
        <div>
            Home
            <Button type="button" variant="destructive" onClick={handleLogout}>Sign out</Button>
        </div>
    )
}
