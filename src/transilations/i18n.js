import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import en from "./en/transilation.json";
import ar from "./ar/transilation.json";
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

export const languageResources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
    resources: languageResources,
  });

export default i18n;
