import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase-client";
import { useNavigate } from "react-router";

export default function SettingsPage() {
    const navigate = useNavigate();
    const handleSignout = async () => {
        await supabase.auth.signOut();
        navigate("../")
    }
    return (
        <div>
            <Button variant="destructive" onClick={handleSignout}>Sign out</Button>
        </div>
    )
}
