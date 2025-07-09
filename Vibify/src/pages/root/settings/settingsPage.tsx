import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase-client";
import { useNavigate } from "react-router";
import PageHeader from "../components/pageHeader";

export default function SettingsPage() {
    const navigate = useNavigate();
    const handleSignout = async () => {
        await supabase.auth.signOut();
        navigate("../")
    }
    return (
        <div>
            <PageHeader text="Settings" />
            <p className="text-xl font-bold mb-3 hidden sm:block">Settings:</p>
            <Button variant="destructive" onClick={handleSignout}>Sign out</Button>
        </div>
    )
}
