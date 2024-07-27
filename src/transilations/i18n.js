import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import en from "./en/transilation.json";
import ar from "./ar/transilation.json";
import LanguageDetector from "i18next-browser-languagedetector";

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false, 
    },
    resources: languageResources,
  });

export default i18n;
