import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase-client";
import { useNavigate } from "react-router";
import PageHeader from "../components/pageHeader";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import ReactCountryFlag from "react-country-flag"
import UploadProfileImageForm from "./components/uploadProfileImageForm";

const languagesList = [
    {
        text: "French ",
        key: "fr",
        flag: "fr",
    },
    {
        text: "عربي",
        key: "ar",
        flag: "ae",

    },
    {
        text: "English ",
        key: "en",
        flag: "us"
    }
]


export default function SettingsPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const handleSignout = async () => {
        await supabase.auth.signOut();
        navigate("../")
    }
    const settingsTranslate = t("Settings")

    const handleLanguage = (languageKey: string) => {
        i18n.changeLanguage(languageKey);
    }

    const isActiveLang = i18n.language;
    return (
        <div>
            <PageHeader text={settingsTranslate} />
            <p className="text-xl font-bold mb-3 hidden sm:block">{settingsTranslate}:</p>
            <div className="max-w-md sm:mx-auto sm:p-6 space-y-6 px-2">
                <UploadProfileImageForm />
                <div className="mx-3">
                    <div className="mb-2">
                        <p className="flex text-xl items-center gap-x-2 mb-2">{t("Language Preferences")}<Languages />:</p>
                        <div className="flex gap-x-2 items-center">
                            {languagesList.map(ele => (
                                <Button key={ele.key} variant={isActiveLang === ele.key ? "secondary" : "ghost"} onClick={() => handleLanguage(ele.key)}
                                >
                                    <ReactCountryFlag
                                        countryCode={ele.flag}
                                        svg
                                        cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                                        cdnSuffix="svg"
                                        className="w-8 h-6 rounded-sm"
                                        title={ele.text}
                                    /> {ele.text}
                                </Button>

                            ))}
                        </div>
                    </div>
                    <Button variant="destructive" onClick={handleSignout}>{t("Sign out")}</Button>
                </div>
            </div>
        </div>
    )
}
