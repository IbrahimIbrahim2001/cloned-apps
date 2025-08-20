import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase-client";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PageHeader from "../components/pageHeader";
import UploadProfileImageForm from "./components/uploadProfileImageForm";
import LanguagesList from "./components/languagesList";


export default function SettingsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleSignout = async () => {
        await supabase.auth.signOut();
        navigate("../")
    }
    const settingsTranslate = t("Settings")

    return (
        <div>
            <PageHeader text={settingsTranslate} />
            <p className="text-xl font-bold mb-3 hidden sm:block">{settingsTranslate}:</p>
            <div className="max-w-md sm:mx-auto sm:p-6 space-y-6 px-2">
                <UploadProfileImageForm />
                <div className="mx-3">
                    <LanguagesList />
                    <Button variant="destructive" onClick={handleSignout}>{t("Sign out")}</Button>
                </div>
            </div>
        </div>
    )
}
