import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import enLang from "./locales/en.json"
import frLang from "./locales/fr.json"
import arLang from "./locales/ar.json"


const resources = {
    en: {
        translation: enLang
    },
    fr: {
        translation: frLang
    },
    ar: {
        translation: arLang
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;