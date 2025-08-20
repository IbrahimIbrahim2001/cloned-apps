import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";


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

export default function LanguagesList() {
    const { t, i18n } = useTranslation();

    const handleLanguage = (languageKey: string) => {
        i18n.changeLanguage(languageKey);
    }

    const isActiveLang = i18n.language;
    return (
        <>
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
        </>
    )
}
